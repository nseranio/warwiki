#!/usr/bin/env python3
"""For registry flags of kind wrong_doi or doi_not_found, search Crossref for the cited work.

Usage: python3 scripts/refs/candidates.py
Reads reports/audit-v2/sources-local/mismatches.json; writes candidates.json beside it (both gitignored) (top 3 Crossref
bibliographic matches per flagged citation, with title, authors, year, journal, volume, page and score).
Cache: reports/audit-v2/sources-local/crossref-search-cache.json (gitignored).
"""
import json, re, pathlib, urllib.request, urllib.parse, concurrent.futures as cf, time

ROOT = pathlib.Path(__file__).resolve().parents[2]
DIR = ROOT / "reports/2026-10-03/ref-registry"
LOCAL = ROOT / "reports/audit-v2/sources-local"
CACHE = ROOT / "reports/audit-v2/sources-local/crossref-search-cache.json"
UA = {"User-Agent": "WARWIKI-refregistry/1.0 (mailto:warwikihq@gmail.com)"}


def query_text(text):
    t = re.sub(r"\(?https?://\S+", " ", text)
    t = re.sub(r"doi:\s*\[[^\]]*\]", " ", t, flags=re.I)
    t = re.sub(r"PMID:?\s*\d+|\[PMID[^\]]*\]", " ", t)
    return re.sub(r"[*\"“”\[\]()]", " ", t)[:300]


def search(q):
    url = "https://api.crossref.org/works?rows=3&select=DOI,title,author,issued,container-title,volume,page,score&query.bibliographic=" + urllib.parse.quote(q)
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                items = json.load(r)["message"]["items"]
            return [{
                "doi": it.get("DOI", "").lower(),
                "title": " ".join(it.get("title") or []),
                "authors": [a.get("family") or a.get("name") or "" for a in (it.get("author") or [])[:4]],
                "year": ((it.get("issued") or {}).get("date-parts") or [[None]])[0][0],
                "journal": " ".join(it.get("container-title") or []),
                "volume": it.get("volume"), "page": it.get("page"), "score": round(it.get("score", 0), 1),
            } for it in items]
        except Exception:
            time.sleep(3 * (i + 1))
    return None


def main():
    flags = json.loads((LOCAL / "mismatches.json").read_text())["flags"]
    want = [f for f in flags if any(k in f["kind"] for k in ("wrong_doi", "title_mismatch", "doi_not_found"))]
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    qs = sorted({query_text(f["text"]) for f in want} - {k for k, v in cache.items() if v is not None})
    print(f"{len(want)} flagged citations, {len(qs)} searches to run", flush=True)
    with cf.ThreadPoolExecutor(4) as ex:
        for q, res in zip(qs, ex.map(search, qs)):
            cache[q] = res
    CACHE.write_text(json.dumps(cache))
    out = [{"file": f["file"], "line": f["line"], "n": f["n"], "doi": f["doi"], "kind": f["kind"], "text": f["text"],
            "doi_resolves_to": f.get("crossref"), "candidates": cache.get(query_text(f["text"]))} for f in want]
    (LOCAL / "candidates.json").write_text(json.dumps(out, indent=1, ensure_ascii=False))
    print(f"wrote {len(out)} entries")


if __name__ == "__main__":
    main()
