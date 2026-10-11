#!/usr/bin/env python3
"""Conservative DOI discovery for unlinked content-page references.

Run from the repo root: python3 scripts/refs/discover_plain_dois.py
The JSON cache is local/ignored; the TSV and report are review artifacts.
"""
import csv
import difflib
import html
import json
import pathlib
import random
import re
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "reports/2026-10-11"
CACHE = ROOT / "reports/audit-v2/sources-local/doi-discovery-2026-10-11-cache.json"
REF = re.compile(r'^(?:<a id="[^"]*"></a>\s*)*(?:(\d+)\.\s*(?:<a id="[^"]*"></a>\s*)*(.*)|\[\^(\d+)\]:\s*(.*))$')
DOI = re.compile(r"10\.\d{4,9}/", re.I)
PMID = re.compile(r"\bPMID\s*:?[\s\[]*(\d{6,9})\b", re.I)
AGENT = "WARWIKI-doi-discovery/1.0 (mailto:warwikihq@gmail.com)"
EMAIL = "warwikihq@gmail.com"
last_request = 0.0


def norm(s):
    s = html.unescape(re.sub(r"<[^>]*>|\[[^]]*\]\([^)]*\)", " ", s or ""))
    s = s.translate(str.maketrans({"ł": "l", "Ł": "L", "ø": "o", "Ø": "O", "ß": "ss", "æ": "ae", "Æ": "Ae"}))
    s = "".join(c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c))
    return " ".join(re.findall(r"[a-z0-9]+", s.lower()))


def fold(s):
    return norm(s).replace(" ", "")


def metadata(text):
    q = re.search(r'["“]([^"”]{8,})["”]', text)
    if q:
        title = q.group(1)
    else:
        start = re.search(r"(?:et al|[A-Z]{1,4})\.\s+", text)
        body = text[start.end():] if start else ""
        title = re.split(r"\s+In:\s+|\s+\*[^*]+\*", body, 1)[0].rstrip(". ")
    leading = text.split(',')[0].split('.')[0].strip()
    # Family names with particles are retained; initials and punctuation are dropped.
    author = re.sub(r"\s+[A-Z]{1,4}$", "", leading).strip()
    yrs = [int(y) for y in re.findall(r"\b(?:19|20)\d{2}\b", text)]
    loc = re.search(r"\b((?:19|20)\d{2})\s*;\s*([A-Za-z]?\d+)(?:\([^)]*\))?\s*:\s*([A-Za-z]?\d+)", text)
    journal = re.search(r"\*([^*]+)\*\.?\s*(?:19|20)\d{2}\s*;", text)
    book = re.search(r"\bIn:\s*.*?\*([^*]+)\*", text)
    book_page = re.search(r"(?:19|20)\d{2}:([A-Za-z]?\d+)", text) if book else None
    return dict(title=title, author=author, year=int(loc.group(1)) if loc else (yrs[0] if yrs else None),
                journal=journal.group(1).rstrip(".") if journal else None, volume=loc.group(2) if loc else None,
                firstpage=loc.group(3) if loc else None, book=book.group(1) if book else None,
                bookpage=book_page.group(1) if book_page else None)


def references():
    rows = []
    for path in sorted((ROOT / "docs").rglob("*.mdx")):
        inside = False
        for lineno, line in enumerate(path.read_text().splitlines(), 1):
            if line.startswith("## References"):
                inside = True
                continue
            if inside and line.startswith("## "):
                inside = False
            if not inside:
                continue
            m = REF.match(line.strip())
            if not m:
                continue
            n, body = (m.group(1), m.group(2)) if m.group(1) else (m.group(3), m.group(4))
            if DOI.search(body):
                continue
            # Already linked guidelines, device documents and websites are outside
            # the plain-text queue. A PMID link is still eligible for a DOI.
            if "http" in body and not re.search(r"pubmed\.ncbi\.nlm\.nih\.gov/\d+", body):
                continue
            rows.append(dict(page=str(path.relative_to(ROOT)), line=lineno, number=n, text=body,
                             raw=line, pmid=(PMID.search(body).group(1) if PMID.search(body) else None),
                             **metadata(body)))
    return rows


def request(url, json_result=True, method="GET"):
    global last_request
    for attempt in range(5):
        delay = 0.4 - (time.monotonic() - last_request)
        if delay > 0:
            time.sleep(delay)
        last_request = time.monotonic()
        try:
            req = urllib.request.Request(url, headers={"User-Agent": AGENT}, method=method)
            if "doi.org/" in url:
                # Inspect the DOI resolver's redirect itself, not the publisher's access rules.
                opener = urllib.request.build_opener(NoRedirect)
                resp = opener.open(req, timeout=30)
            else:
                resp = urllib.request.urlopen(req, timeout=30)
            with resp:
                return json.load(resp) if json_result else (resp.status, resp.headers.get("Location"))
        except urllib.error.HTTPError as e:
            if "doi.org/" in url and e.code in (301, 302, 303, 307, 308):
                return e.code, e.headers.get("Location")
            if e.code == 404:
                return None
            if e.code == 429 or e.code >= 500:
                retry = e.headers.get("Retry-After")
                time.sleep(min(60, float(retry) if retry and retry.isdigit() else 2 ** attempt))
                continue
            return None
        except (OSError, ValueError):
            time.sleep(2 ** attempt)
    return None


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def pubmed(pmid):
    url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?" + urllib.parse.urlencode(
        dict(db="pubmed", id=pmid, retmode="json", tool="WARWIKI_DOI_Discovery", email=EMAIL))
    data = request(url)
    item = (data or {}).get("result", {}).get(pmid, {})
    if not item:
        return None
    return dict(doi=next((x.get("value") for x in item.get("articleids", []) if x.get("idtype") == "doi"), None),
                title=item.get("title"), authors=[a.get("name", "").split()[0] for a in item.get("authors", [])[:1]],
                years=[int(y) for y in re.findall(r"\b(?:19|20)\d{2}\b", " ".join((item.get("pubdate", ""), item.get("epubdate", ""))))],
                journal=item.get("source"), volume=item.get("volume"), page=item.get("pages", "").split("-")[0],
                source="PubMed")


def pubmed_search(row):
    if not row["journal"] or len(norm(row["title"]).split()) < 4:
        return []
    query = f'"{row["title"].strip(". ")}"[Title]'
    url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?" + urllib.parse.urlencode(
        dict(db="pubmed", term=query, retmode="json", retmax=3, tool="WARWIKI_DOI_Discovery", email=EMAIL))
    data = request(url)
    return (data or {}).get("esearchresult", {}).get("idlist", [])


def crossref(row):
    q = re.sub(r"\[[^]]*\]\([^)]*\)", " ", row["text"])
    q = re.sub(r"\bPMID\s*:?\s*\d+", " ", q, flags=re.I)[:350]
    url = "https://api.crossref.org/works?" + urllib.parse.urlencode(dict(
        rows=5, select="DOI,title,author,issued,published-print,published-online,container-title,short-container-title,volume,page,type",
        **{"query.bibliographic": q, "mailto": EMAIL}))
    data = request(url)
    out = []
    for item in (data or {}).get("message", {}).get("items", []):
        years = []
        for key in ("issued", "published-print", "published-online"):
            parts = item.get(key, {}).get("date-parts", [[]])[0]
            if parts and isinstance(parts[0], int):
                years.append(parts[0])
        out.append(dict(doi=item.get("DOI"), title=" ".join(item.get("title") or []),
                        authors=[x.get("family") or x.get("name") or "" for x in (item.get("author") or [])[:1]],
                        years=years, journal=" ".join(item.get("container-title") or []),
                        short_journal=" ".join(item.get("short-container-title") or []),
                        volume=item.get("volume"), page=item.get("page"), type=item.get("type"), source="Crossref"))
    return out


def first_page(s):
    m = re.match(r"[A-Za-z]?-?(\d+)", str(s or ""))
    return m.group(1) if m else None


def volume_key(s):
    m = re.match(r"\s*([A-Za-z]?\d+)", str(s or ""))
    return m.group(1).lstrip("0") if m else None


def match(row, cand):
    au = bool(cand.get("authors")) and fold(cand["authors"][0]) == fold(row["author"])
    valid_years = [y for y in cand.get("years", []) if isinstance(y, int)]
    yr = bool(row["year"] and valid_years) and min(abs(row["year"] - y) for y in valid_years) <= 1
    rt, ct = norm(row["title"]), norm(cand.get("title"))
    sim = difflib.SequenceMatcher(None, rt, ct).ratio() if rt and ct else 0
    journal = bool(row["journal"]) and fold(row["journal"]) in {fold(cand.get("journal")), fold(cand.get("short_journal"))}
    loc_known = bool(row["volume"] and row["firstpage"] and cand.get("volume") and cand.get("page"))
    loc_equal = loc_known and volume_key(row["volume"]) == volume_key(cand["volume"]) and first_page(row["firstpage"]) == first_page(cand["page"])
    loc = journal and loc_equal
    chapter = True
    if row["book"]:
        cited_book, found_book = fold(row["book"].split(":")[0]), fold(cand.get("journal"))
        chapter = bool(cited_book and found_book and (cited_book.startswith(found_book) or found_book.startswith(cited_book)))
        if row["bookpage"]:
            chapter = chapter and first_page(row["bookpage"]) == first_page(cand.get("page"))
    accepted = au and yr and chapter and (not loc_known or loc_equal) and ((sim >= .9 and len(rt.split()) >= 4) or loc)
    evidence = f"{cand['source']}: author={au}; year={yr} ({row['year']} vs {cand.get('years')}); title={sim:.3f}; journal/volume/page={loc}; location-consistent={not loc_known or loc_equal}; chapter/book/page={chapter}; candidate={cand.get('title')}"
    return accepted, sim, evidence


def doi_resolves(doi):
    url = "https://doi.org/" + urllib.parse.quote(doi, safe="/()" )
    for method in ("HEAD", "GET"):
        got = request(url, False, method)
        if got and got[0] in (301, 302, 303, 307, 308) and got[1]:
            return True, got[1]
    return False, ""


def main():
    rows = references()
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {"queries": {}, "pubmed": {}, "pubmed_search": {}, "doi": {}}
    cache.setdefault("queries", {}); cache.setdefault("pubmed", {}); cache.setdefault("pubmed_search", {}); cache.setdefault("doi", {})
    print(f"{len(rows)} eligible references; {len(set(r['text'] for r in rows))} unique", flush=True)
    # The cache permits safe restart, with every network response retained for review.
    for i, row in enumerate(rows, 1):
        if row["pmid"] and row["pmid"] not in cache["pubmed"]:
            cache["pubmed"][row["pmid"]] = pubmed(row["pmid"])
        if row["text"] not in cache["queries"]:
            cache["queries"][row["text"]] = crossref(row)
        if i % 25 == 0:
            CACHE.parent.mkdir(parents=True, exist_ok=True)
            CACHE.write_text(json.dumps(cache, ensure_ascii=False))
            print(f"searched {i}/{len(rows)}", flush=True)
    CACHE.write_text(json.dumps(cache, ensure_ascii=False))
    # Search PubMed for journal articles still without a verified Crossref DOI.
    for i, row in enumerate(rows, 1):
        candidates = list(cache["queries"].get(row["text"]) or [])
        if row["pmid"] and cache["pubmed"].get(row["pmid"]):
            candidates.insert(0, cache["pubmed"][row["pmid"]])
        if any(c.get("doi") and match(row, c)[0] for c in candidates):
            continue
        key = row["text"]
        if key not in cache["pubmed_search"]:
            cache["pubmed_search"][key] = pubmed_search(row)
        for pmid in cache["pubmed_search"][key]:
            if pmid not in cache["pubmed"]:
                cache["pubmed"][pmid] = pubmed(pmid)
        if i % 25 == 0:
            CACHE.write_text(json.dumps(cache, ensure_ascii=False))
            print(f"PubMed fallback {i}/{len(rows)}", flush=True)
    CACHE.write_text(json.dumps(cache, ensure_ascii=False))
    decisions = []
    for row in rows:
        candidates = list(cache["queries"].get(row["text"]) or [])
        if row["pmid"] and cache["pubmed"].get(row["pmid"]):
            candidates.insert(0, cache["pubmed"][row["pmid"]])
        for pmid in cache["pubmed_search"].get(row["text"], []):
            if cache["pubmed"].get(pmid):
                candidates.append({**cache["pubmed"][pmid], "pmid": pmid})
        scored = [(match(row, c), c) for c in candidates]
        good = [(m, c) for m, c in scored if m[0]]
        distinct = {c.get("doi", "").lower() for _, c in good if c.get("doi")}
        pick = (next(((m, c) for m, c in good if c.get("doi")), None) if len(distinct) == 1 else
                next(((m, c) for m, c in good if c.get("source") == "PubMed"), None) if not distinct else None)
        decision, identifier, evidence = "none", "", "No candidate met author, year, and exact-title or journal/volume/page checks."
        if len(distinct) > 1:
            decision, evidence = "ambiguous", "Multiple different DOIs passed: " + ", ".join(sorted(distinct))
        elif pick:
            m, cand = pick
            doi = cand.get("doi")
            if doi:
                cross = next((c for c in cache["queries"].get(row["text"], []) or []
                              if (c.get("doi") or "").lower() == doi.lower()), None)
                if cand.get("source") == "PubMed" and (not cross or not match(row, cross)[0]):
                    decision, evidence = "ambiguous", m[2] + "; Crossref metadata does not confirm the DOI belongs to this cited item"
                    decisions.append({**row, "decision": decision, "identifier": identifier, "evidence": evidence})
                    continue
                if doi not in cache["doi"]:
                    cache["doi"][doi] = doi_resolves(doi)
                if cache["doi"][doi][0]:
                    decision, identifier, evidence = "added DOI", doi, m[2] + "; doi.org redirect=" + cache["doi"][doi][1]
                else:
                    decision, evidence = "ambiguous", m[2] + "; doi.org did not resolve"
            elif (cand.get("pmid") or row["pmid"]) and "pubmed.ncbi.nlm.nih.gov" not in row["text"]:
                identifier = cand.get("pmid") or row["pmid"]
                decision, evidence = "added PMID", m[2] + "; PubMed record verified, no DOI"
            else:
                evidence = m[2] + "; no DOI; PMID already linked or unavailable"
        elif scored and max(x[0][1] for x in scored) >= .75:
            decision, evidence = "ambiguous", max(scored, key=lambda x:x[0][1])[0][2]
        decisions.append({**row, "decision": decision, "identifier": identifier, "evidence": evidence})
    CACHE.write_text(json.dumps(cache, ensure_ascii=False))
    # Changes are limited to one suffix on each exact original line.
    by_page = {}
    for row in decisions:
        if row["decision"] not in ("added DOI", "added PMID"):
            continue
        suffix = (f" doi:[{row['identifier']}](https://doi.org/{row['identifier']})" if row["decision"] == "added DOI" else
                  f" [PMID {row['identifier']}](https://pubmed.ncbi.nlm.nih.gov/{row['identifier']}/)")
        by_page.setdefault(row["page"], []).append((row["line"], row["raw"], suffix))
    for page, edits in by_page.items():
        path = ROOT / page
        lines = path.read_text().splitlines(keepends=True)
        for lineno, raw, suffix in edits:
            old = lines[lineno-1]
            if old.rstrip("\n\r") != raw:
                raise RuntimeError(f"Concurrent edit at {page}:{lineno}")
            lines[lineno-1] = raw + suffix + ("\n" if old.endswith("\n") else "")
        path.write_text("".join(lines))
    OUT.mkdir(parents=True, exist_ok=True)
    with (OUT / "doi-discovery.tsv").open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["page", "ref number", "reference text", "decision", "DOI or PMID", "match evidence"], delimiter="\t")
        w.writeheader()
        for r in decisions:
            w.writerow({"page":r["page"], "ref number":r["number"], "reference text":r["text"],
                        "decision":r["decision"], "DOI or PMID":r["identifier"], "match evidence":r["evidence"]})
    from collections import Counter
    counts = Counter(r["decision"] for r in decisions)
    added = [r for r in decisions if r["decision"].startswith("added")]
    examples = random.Random(20261011).sample(added, min(20, len(added)))
    report = ["# DOI discovery (October 11, 2026)", "", f"Scanned: **{len(rows)}** plain-text or PMID-only references under `## References`.",
              "", f"Added DOI: **{counts['added DOI']}**; added PMID: **{counts['added PMID']}**; ambiguous: **{counts['ambiguous']}**; none: **{counts['none']}**.",
              "", "Existing references with non-PubMed links were outside this plain-text queue. The ledger includes every scanned line; ambiguous lines were left intact.",
              "", "## Random added examples", ""]
    for r in examples:
        report += [f"- `{r['page']}:{r['number']}` — {r['identifier']}. {r['evidence']}"]
    (OUT / "doi-discovery.md").write_text("\n".join(report) + "\n")
    print(dict(counts), flush=True)


if __name__ == "__main__":
    main()
