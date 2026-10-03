#!/usr/bin/env python3
"""Same source, different numbers: compare what different pages say a shared reference reported.

For every DOI cited on two or more pages, collect the sentences on each page that cite it (inline
<sup>[[N]](#refN)</sup> markers or [^N] footnotes) and the percentages, n = values and ratios in them.
Clusters where pages attach different numbers to the same source are written to
reports/audit-v2/sources-local/same-source.json for triage (a difference is often legitimate: subgroups,
different outcomes or time points).
Usage: python3 scripts/consistency/same_source.py
"""
import json, re, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "reports/audit-v2/sources-local/same-source.json"
REFLINE = re.compile(r'^(?:<a id="[^"]*"></a>\s*)*(?:(\d+)\.\s*(?:<a id="[^"]*"></a>\s*)*(.*)|\[\^(\d+)\]:\s*(.*))$')
DOI = re.compile(r"doi:\s*\[(10\.[^\]\s]+)\]", re.I)
NUM = re.compile(r"(\d+(?:\.\d+)?)\s?%|\bn\s?=\s?(\d[\d,]*)|\b(\d+)\s?(?:/|of)\s?(\d+)\b")


def page_refs(text):
    refs = {}
    for line in text.splitlines():
        m = REFLINE.match(line.strip())
        if not m:
            continue
        n = m.group(1) or m.group(3)
        d = DOI.search(m.group(2) or m.group(4) or "")
        if d:
            refs[n] = d.group(1).lower()
    return refs


def citing_sentences(text):
    body = text.split("\n## References")[0]
    body = re.sub(r"^\[\^\d+\]:.*$", "", body, flags=re.M)
    for s in re.split(r"(?<=[.!?])\s+(?=[A-Z*])|\n+", body):
        nums = re.findall(r"#ref(\d+)\)|\[\^(\d+)\]", s)
        if nums:
            yield s, {a or b for a, b in nums}


def numbers(s):
    out = set()
    clean = re.sub(r"<sup>.*?</sup>|\[\^\d+\]", "", s)
    for m in NUM.finditer(clean):
        if m.group(1):
            out.add(m.group(1) + "%")
        elif m.group(2):
            out.add("n=" + m.group(2).replace(",", ""))
        else:
            out.add(f"{m.group(3)}/{m.group(4)}")
    return out


def main():
    by = collections.defaultdict(lambda: collections.defaultdict(list))
    for f in sorted((ROOT / "docs").rglob("*.mdx")):
        rel = str(f.relative_to(ROOT))
        text = f.read_text()
        refs = page_refs(text)
        for s, ns in citing_sentences(text):
            cited = {refs[n] for n in ns if n in refs}
            if len(cited) != 1:
                continue  # only sentences that cite a single source
            nums = numbers(s)
            if nums:
                by[cited.pop()][rel].append({"sentence": re.sub(r"\s+", " ", s).strip()[:600], "numbers": sorted(nums)})
    clusters = []
    for doi, pages in by.items():
        if len(pages) < 2:
            continue
        sets = [set().union(*(set(x["numbers"]) for x in v)) for v in pages.values()]
        if all(s == sets[0] for s in sets):
            continue
        shared_any = set.intersection(*sets)
        clusters.append({"doi": doi, "pages": pages, "shared": sorted(shared_any)})
    OUT.write_text(json.dumps(clusters, indent=1, ensure_ascii=False))
    print(f"DOIs with single-source numeric sentences on 2+ pages and differing numbers: {len(clusters)}; "
          f"sentences: {sum(len(v) for c in clusters for v in c['pages'].values())}")


if __name__ == "__main__":
    main()
