#!/usr/bin/env python3
"""Reference registry: every DOI-bearing reference in docs/, compared with Crossref.

Usage: python3 scripts/refs/registry.py            # extract, fetch missing Crossref records (cached), compare
       python3 scripts/refs/registry.py --offline  # compare from the cache only
Cache: reports/audit-v2/sources-local/crossref-full-cache.json (gitignored).
Output: reports/audit-v2/sources-local/ref-registry.json (every citation, parsed)
        reports/audit-v2/sources-local/mismatches.json and summary.md
Flags are review signals, not verdicts: group authors, online-first years and supplements produce false positives.
"""
import html, json, re, sys, pathlib, urllib.request, urllib.parse, concurrent.futures as cf, collections, time

ROOT = pathlib.Path(__file__).resolve().parents[2]
LOCAL = ROOT / "reports/audit-v2/sources-local"
CACHE = LOCAL / "crossref-full-cache.json"
OUTDIR = ROOT / "reports/2026-10-03/ref-registry"
REF = re.compile(r'^(?:<a id="[^"]*"></a>\s*)*(?:(\d+)\.\s*(?:<a id="[^"]*"></a>\s*)*(.*)|\[\^(\d+)\]:\s*(.*))$')
DOI = re.compile(r"10\.\d{4,9}/[^\s>\]\"'<]+")
UA = {"User-Agent": "WARWIKI-refregistry/1.0 (mailto:warwikihq@gmail.com)"}
STOP = set("the of and for with in on a an to from by at as after versus vs study trial review patients".split())


def clean(d):
    d = urllib.parse.unquote(html.unescape(d.replace("\\", ""))).rstrip(".,;:")
    while d.endswith(")") and d.count(")") > d.count("("):
        d = d[:-1].rstrip(".,;:")
    return d.lower()


def words(s):
    return {w for w in re.findall(r"[a-z]{4,}", (s or "").lower()) if w not in STOP}


def fold(s):
    import unicodedata
    s = "".join(c for c in unicodedata.normalize("NFKD", s or "") if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z]", "", s)


def parse(text):
    """Pull first author, year, volume, issue and first page from an AMA-style line."""
    body = re.sub(r"\(?https?://\S+", " ", text)
    body = re.sub(r"doi:\s*\[[^\]]*\]", " ", body, flags=re.I)
    au = re.match(r"\W*([^\s,.;]+(?:[ -](?:de|van|der|von|da|del|la|le|El|Al)[^\s,.;]*)*)", body)
    m = re.search(r"\b((?:19|20)\d{2})[^;:\d]{0,25};\s*([A-Za-z]?\d+)?\s*(?:\(([^)]*)\))?\s*:\s*([A-Za-z]{0,2}\d+)", body)
    yr = m.group(1) if m else (re.search(r"\b(19|20)\d{2}\b", body) or [None])[0]
    return {
        "author": au.group(1).strip("*\"'“”") if au else None,
        "year": int(yr) if yr else None,
        "volume": m.group(2) if m else None,
        "issue": m.group(3) if m else None,
        "page": m.group(4) if m else None,
    }


def extract():
    rows = []
    for f in sorted((ROOT / "docs").rglob("*.mdx")):
        rel = str(f.relative_to(ROOT))
        for i, line in enumerate(f.read_text().splitlines(), 1):
            m = REF.match(line.strip())
            if not m:
                continue
            num, text = (m.group(1), m.group(2)) if m.group(1) else (m.group(3), m.group(4))
            ds = [clean(d) for d in DOI.findall(text)]
            if not ds:
                continue
            rows.append({"file": rel, "line": i, "n": num, "doi": ds[0], "text": text, **parse(text)})
    return rows


def crossref(doi):
    url = "https://api.crossref.org/works/" + urllib.parse.quote(doi, safe="/()")
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                m = json.load(r)["message"]
            years = set()
            for k in ("issued", "published-print", "published-online", "published"):
                p = m.get(k, {}).get("date-parts", [[None]])[0]
                if p and p[0]:
                    years.add(p[0])
            au = m.get("author") or []
            return {
                "ok": True,
                "title": " ".join(m.get("title") or []),
                "container": " ".join(m.get("container-title") or []),
                "short": " ".join(m.get("short-container-title") or []),
                "authors": [a.get("family") or a.get("name") or "" for a in au[:6]],
                "n_authors": len(au),
                "years": sorted(years),
                "issued": (m.get("issued", {}).get("date-parts", [[None]])[0] or [None])[0],
                "volume": m.get("volume"),
                "issue": m.get("issue"),
                "page": m.get("page"),
                "type": m.get("type"),
            }
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return {"ok": False}
            time.sleep(2 * (i + 1))
        except Exception:
            time.sleep(2 * (i + 1))
    return {"ok": None}


def fetch(dois):
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    todo = [d for d in dois if d not in cache or cache[d].get("ok") is None]
    print(f"{len(dois)} DOIs, {len(todo)} to fetch", flush=True)
    with cf.ThreadPoolExecutor(8) as ex:
        for k, (d, res) in enumerate(zip(todo, ex.map(crossref, todo)), 1):
            cache[d] = res
            if k % 500 == 0:
                CACHE.write_text(json.dumps(cache))
                print(k, flush=True)
    CACHE.write_text(json.dumps(cache))
    return cache


def first_page(p):
    m = re.match(r"[A-Za-z]{0,2}-?(\d+)", str(p or ""))
    return m.group(1) if m else None


def compare(rows, cache):
    flags = []
    by_doi = collections.defaultdict(list)
    for r in rows:
        by_doi[r["doi"]].append(r)
        c = cache.get(r["doi"], {})
        if c.get("ok") is False:
            flags.append({**r, "kind": "doi_not_found"})
            continue
        if not c.get("ok"):
            continue
        cited_auth = fold(r["author"])
        cr_auth = [fold(a) for a in c["authors"]]
        head = fold(r["text"][:120])
        overlap = len(words(c["title"]) & words(r["text"])) / max(1, len(words(c["title"])))
        cochrane = r["doi"].startswith("10.1002/14651858") or "cochrane" in (c.get("container") or "").lower()
        why = []
        if cr_auth and cr_auth[0] and cr_auth[0] not in head and cr_auth[0] in fold(r["text"]) and len(re.findall(r"\b(?:19|20)\d{2}\b", r["text"])) > 1:
            why.append("compound_line")
        elif overlap < 0.4:
            auth_ok = not cr_auth or any(a and a in head for a in cr_auth[:3])
            why.append("title_mismatch_same_author" if auth_ok else "wrong_doi")
        else:
            if cr_auth and cited_auth and cr_auth[0] and cr_auth[0] not in cited_auth and cited_auth not in cr_auth[0] and cr_auth[0] not in head:
                why.append("first_author")
            if r["year"] and c["years"] and min(abs(r["year"] - y) for y in c["years"]) > 1:
                why.append("year")
            elif r["year"] and c["years"] and min(abs(r["year"] - y) for y in c["years"]) == 1:
                why.append("year_off_by_one")
            if not cochrane and r["volume"] and c.get("volume") and r["volume"].lstrip("0") != str(c["volume"]).lstrip("0"):
                why.append("volume")
            if not cochrane and r["page"] and c.get("page") and "-" in str(c["page"]) + "-" and first_page(r["page"]) != first_page(c["page"]) and len(first_page(r["page"]) or "") < 6:
                why.append("page")
        if why:
            flags.append({**r, "kind": ",".join(why), "title_overlap": round(overlap, 2),
                          "crossref": {k: c.get(k) for k in ("title", "authors", "years", "container", "volume", "issue", "page")}})
    divergent = []
    for d, rs in by_doi.items():
        if len({r["file"] for r in rs}) < 2:
            continue
        keys = {(fold(r["author"]), r["year"], r["volume"], first_page(r["page"])) for r in rs}
        if len(keys) > 1:
            divergent.append({"doi": d, "variants": sorted({json.dumps(k) for k in keys}), "files": sorted({r["file"] for r in rs})})
    return flags, divergent, by_doi


def main():
    rows = extract()
    dois = sorted({r["doi"] for r in rows})
    cache = json.loads(CACHE.read_text()) if "--offline" in sys.argv and CACHE.exists() else fetch(dois)
    flags, divergent, by_doi = compare(rows, cache)
    LOCAL.mkdir(parents=True, exist_ok=True)
    (LOCAL / "ref-registry.json").write_text(json.dumps(rows))
    OUTDIR.mkdir(parents=True, exist_ok=True)
    (LOCAL / "mismatches.json").write_text(json.dumps({"flags": flags, "divergent": divergent}, indent=1, ensure_ascii=False))
    kinds = collections.Counter(k for f in flags for k in f["kind"].split(","))
    multi = sum(1 for rs in by_doi.values() if len({r['file'] for r in rs}) > 1)
    lines = ["# Reference registry: Crossref comparison", "",
             f"Generated by `python3 scripts/refs/registry.py`. {len(rows)} DOI-bearing references, {len(dois)} distinct DOIs, {multi} cited on more than one page.", "",
             "| Signal | References |", "|---|---|"]
    for k, n in kinds.most_common():
        lines.append(f"| {k} | {n} |")
    lines += ["", f"DOIs whose citations differ between pages (author, year, volume or first page): **{len(divergent)}**", "",
              "Signals are for triage. Group authors, online-first years, supplements and parsing limits produce false positives."]
    (OUTDIR / "summary.md").write_text("\n".join(lines) + "\n")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
