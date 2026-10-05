#!/usr/bin/env python3
"""Retractions, expressions of concern and corrections for every DOI cited in docs/.

Usage: python3 scripts/refs/retractions.py
Queries Crossref for notices that update each cited DOI (filter=updates:<doi>; includes Retraction Watch data),
40 DOIs per request. Cache: reports/audit-v2/sources-local/crossref-updates-cache.json (gitignored).
Output: reports/audit-v2/sources-local/retractions.json (every notice, with the pages citing the DOI).
Retractions and expressions of concern need action; corrections need a check that the cited figures are unaffected.
"""
import json, re, pathlib, urllib.request, urllib.parse, time, collections, html

ROOT = pathlib.Path(__file__).resolve().parents[2]
LOCAL = ROOT / "reports/audit-v2/sources-local"
CACHE = LOCAL / "crossref-updates-cache.json"
OUT = LOCAL / "retractions.json"
UA = {"User-Agent": "WARWIKI-refregistry/1.0 (mailto:warwikihq@gmail.com)"}
DOI = re.compile(r"(?:doi\.org/|doi:\s*\[?)(10\.\d{4,9}/[^\s>\]\"'<]+)", re.I)


def clean(d):
    d = urllib.parse.unquote(html.unescape(d.replace("\\", ""))).rstrip(".,;:")
    while d.endswith(")") and d.count(")") > d.count("("):
        d = d[:-1].rstrip(".,;:")
    return d.lower()


def cited():
    pages = collections.defaultdict(set)
    for f in ROOT.glob("docs/**/*.mdx"):
        for line in f.read_text().splitlines():
            if re.match(r'^\s*(?:<a id="[^"]*"></a>\s*)*(?:\d+\.|\[\^\d+\]:)', line):
                for m in DOI.finditer(line):
                    pages[clean(m.group(1))].add(str(f.relative_to(ROOT)))
    return pages


def main():
    pages = cited()
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    todo = [d for d in pages if d not in cache]
    print(len(pages), "cited DOIs;", len(todo), "to query")
    for i in range(0, len(todo), 40):
        chunk = todo[i:i + 40]
        q = ",".join("updates:" + d for d in chunk)
        url = "https://api.crossref.org/works?" + urllib.parse.urlencode({"filter": q, "rows": 200})
        for attempt in range(4):
            try:
                with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                    items = json.load(r)["message"]["items"]
                break
            except Exception as e:  # noqa: BLE001
                if attempt == 3:
                    print("failed chunk", i, e); items = None
                time.sleep(3 * (attempt + 1))
        if items is None:
            continue
        for d in chunk:
            cache[d] = []
        for it in items:
            for u in it.get("update-to") or []:
                d = (u.get("DOI") or "").lower()
                if d in cache:
                    cache[d].append({"notice": it.get("DOI"), "type": u.get("type"), "label": u.get("label"),
                                     "source": u.get("source"), "date": (u.get("updated") or {}).get("date-parts"),
                                     "title": (it.get("title") or [""])[0][:200]})
        if i % 800 == 0:
            CACHE.write_text(json.dumps(cache)); print(i, "done")
        time.sleep(0.3)
    CACHE.write_text(json.dumps(cache))
    out = []
    for d, notes in cache.items():
        if d in pages and notes:
            seen = {(n["notice"], n["type"]) for n in notes}
            notes = [n for n in notes if (n["notice"], n["type"]) in seen and not seen.discard((n["notice"], n["type"]))]
            out.append({"doi": d, "pages": sorted(pages[d]), "notices": notes})
    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False))
    c = collections.Counter(n["type"] for o in out for n in o["notices"])
    print("DOIs with notices:", len(out), dict(c))


if __name__ == "__main__":
    main()
