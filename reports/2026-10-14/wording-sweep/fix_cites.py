#!/usr/bin/env python3
"""Reattach citations stripped by caveat deletions (audit_cites.py output).
For each row, find the last sentence of the pre-sweep text before the deleted sentence in the current page and append
the deleted sentence's citation to it (merging <sup> groups); report rows it cannot place.
Usage: fix_cites.py <stripped.tsv> [--dry]"""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[3]
dry = "--dry" in sys.argv
SENT = re.compile(r"(?<=[.!?;:])\s+(?=[A-Z*<\[(])")
texts, out = {}, []
for line in open(sys.argv[1]):
    rid, page, cite, anchor = line.rstrip("\n").split("\t")
    p = ROOT / page
    t = texts.get(p) or p.read_text()
    last = SENT.split(anchor)[-1].strip()
    if len(last) < 25:   # too short to be a safe anchor: use the whole anchor tail
        last = anchor.strip()
    n = t.count(last)
    if n != 1:
        out.append(f"MANUAL\t{rid}\t{page}\tfound {n}\t{last[-80:]}"); continue
    j = t.find(last) + len(last)
    nxt = t[j:j + 6]
    if nxt.startswith("<sup>") or nxt.startswith("[^"):
        out.append(f"CITED\t{rid}\t{page}\talready followed by a citation"); continue
    if cite.startswith("<sup>") and t[:j].endswith("</sup>"):
        t = t[:j - 6] + cite[5:] + t[j:]
    else:
        t = t[:j] + cite + t[j:]
    texts[p] = t
    out.append(f"FIXED\t{rid}\t{page}")
if not dry:
    for p, t in texts.items():
        p.write_text(t)
print("\n".join(out))
