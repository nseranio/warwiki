#!/usr/bin/env python3
"""Find DOIs for journal-style references that lack one.

Usage: python3 scripts/refs/find_dois.py
Input: journal-pattern reference lines without a DOI (built here from docs/).
For a line with a PMID, the DOI comes from the PubMed record after its first author and year are checked.
Otherwise the top Crossref bibliographic hits are scored on title overlap, first author, year, volume and first page.
Output (gitignored): reports/audit-v2/sources-local/doi-discovery.json with tier high / medium / none per line.
Nothing is written to docs/; the high tier is applied separately after review.
"""
import json, re, time, pathlib, unicodedata, urllib.request, urllib.parse, concurrent.futures as cf

ROOT = pathlib.Path(__file__).resolve().parents[2]
LOCAL = ROOT / "reports/audit-v2/sources-local"
CACHE = LOCAL / "doi-discovery-cache.json"
UA = {"User-Agent": "WARWIKI-refregistry/1.0 (mailto:warwikihq@gmail.com)"}
REF = re.compile(r'^(?:<a id="[^"]*"></a>\s*)*(?:(\d+)\.\s*(?:<a id="[^"]*"></a>\s*)*(.*)|\[\^(\d+)\]:\s*(.*))$')
STOP = set("the of and for with in on a an to from by at as after versus vs study trial review patients".split())


def fold(s):
    s = "".join(c for c in unicodedata.normalize("NFKD", s or "") if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z]", "", s)


def words(s):
    return {w for w in re.findall(r"[a-z]{4,}", (s or "").lower()) if w not in STOP}


def lines():
    out = []
    for f in sorted((ROOT / "docs").rglob("*.mdx")):
        inref = False
        for i, line in enumerate(f.read_text().splitlines(), 1):
            if line.startswith("## References"):
                inref = True
            if not inref and not line.startswith("[^"):
                continue
            m = REF.match(line.strip())
            if not m:
                continue
            t = m.group(2) or m.group(4) or ""
            if re.search(r"10\.\d{4,9}/", t) or not re.search(r"\b(19|20)\d{2}\s*;\s*\d+", t):
                continue
            pm = re.search(r"PMID:?\s*\[?(\d{6,9})", t)
            y = re.search(r"\b((?:19|20)\d{2})\s*;\s*([A-Za-z]?\d+)?\s*(?:\([^)]*\))?\s*:?\s*([A-Za-z]?\d+)?", t)
            au = re.match(r"\W*([^\s,.;]+)", t)
            out.append({"file": str(f.relative_to(ROOT)), "line": i, "text": t, "pmid": pm.group(1) if pm else None,
                        "author": au.group(1) if au else None, "year": int(y.group(1)) if y else None,
                        "volume": y.group(2) if y else None, "page": y.group(3) if y else None})
    return out


def get(url):
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                return json.load(r)
        except Exception:
            time.sleep(2 * (i + 1))
    return None


def pubmed(pmid):
    j = get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=" + pmid)
    time.sleep(0.4)
    if not j or pmid not in j.get("result", {}):
        return None
    s = j["result"][pmid]
    return {"doi": next((x["value"].lower() for x in s.get("articleids", []) if x["idtype"] == "doi"), None),
            "authors": [a["name"].split()[0] for a in s.get("authors", [])][:3], "year": int((s.get("pubdate") or "0")[:4] or 0),
            "title": s.get("title", ""), "volume": s.get("volume"), "page": (s.get("pages") or "").split("-")[0]}


def crossref(text):
    q = re.sub(r"\(?https?://\S+|PMID:?\s*\[?\d+\]?|[*\"“”\[\]()]", " ", text)[:300]
    j = get("https://api.crossref.org/works?rows=3&select=DOI,title,author,issued,volume,page,container-title&query.bibliographic=" + urllib.parse.quote(q))
    if not j:
        return None
    return [{"doi": it.get("DOI", "").lower(), "title": " ".join(it.get("title") or []),
             "authors": [a.get("family") or a.get("name") or "" for a in (it.get("author") or [])[:3]],
             "year": ((it.get("issued") or {}).get("date-parts") or [[None]])[0][0],
             "volume": it.get("volume"), "page": (it.get("page") or "").split("-")[0],
             "journal": " ".join(it.get("container-title") or [])} for it in j["message"]["items"]]


def score(r, c):
    ov = len(words(c["title"]) & words(r["text"])) / max(1, len(words(c["title"])))
    au = bool(c["authors"]) and fold(c["authors"][0]) and fold(c["authors"][0]) in fold(r["text"][:80])
    yr = c["year"] and r["year"] and abs(int(c["year"]) - r["year"]) == 0
    vol = (not r["volume"] or not c.get("volume") or str(c["volume"]).lstrip("0") == r["volume"].lstrip("0"))
    pg = (not r["page"] or not c.get("page") or re.sub(r"\D", "", str(c["page"])) == re.sub(r"\D", "", r["page"]))
    tier = "high" if ov >= 0.7 and au and yr and vol and pg else ("medium" if ov >= 0.5 and (au or yr) else "none")
    return tier, round(ov, 2)


def resolve(r):
    if r["pmid"]:
        p = pubmed(r["pmid"])
        if p and p["doi"]:
            c = {"doi": p["doi"], "title": p["title"], "authors": p["authors"], "year": p["year"], "volume": p["volume"], "page": p["page"]}
            tier, ov = score(r, c)
            return {**r, "source": "pubmed", "candidate": c, "tier": tier, "overlap": ov}
    hits = crossref(r["text"]) or []
    best = None
    for c in hits:
        tier, ov = score(r, c)
        if best is None or ["none", "medium", "high"].index(tier) > ["none", "medium", "high"].index(best[0]) or (tier == best[0] and ov > best[1]):
            best = (tier, ov, c)
    if not best:
        return {**r, "source": "crossref", "candidate": None, "tier": "none", "overlap": 0}
    return {**r, "source": "crossref", "candidate": best[2], "tier": best[0], "overlap": best[1], "others": hits}


def main():
    rows = lines()
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    todo = [r for r in rows if r["text"] not in cache]
    print(f"{len(rows)} lines, {len(todo)} to resolve", flush=True)
    with cf.ThreadPoolExecutor(4) as ex:
        for k, res in enumerate(ex.map(resolve, todo), 1):
            cache[res["text"]] = res
            if k % 100 == 0:
                CACHE.write_text(json.dumps(cache)); print(k, flush=True)
    CACHE.write_text(json.dumps(cache))
    out = [{**cache[r["text"]], "file": r["file"], "line": r["line"]} for r in rows]
    (LOCAL / "doi-discovery.json").write_text(json.dumps(out, indent=1, ensure_ascii=False))
    from collections import Counter
    print(Counter(o["tier"] for o in out), Counter(o["source"] for o in out))


if __name__ == "__main__":
    main()
