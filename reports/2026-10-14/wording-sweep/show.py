#!/usr/bin/env python3
"""Compact review listing: id, page, heading, fix, the sentence, the proposal and 140 characters of lead-in.
Usage: show.py <pass2.tsv> [id prefixes...]"""
import csv, sys, pathlib, re
csv.field_size_limit(10**7)
ROOT = pathlib.Path(__file__).resolve().parents[3]
pre = sys.argv[2:]
last = None
for r in csv.DictReader(open(sys.argv[1]), delimiter="\t"):
    if pre and not any(r["id"].startswith(p) for p in pre): continue
    t = (ROOT / r["page"]).read_text(); s = r["sentence"]; i = t.find(s)
    if r["page"] != last:
        print(f"## {r['page'][len('docs/04-surgical-techniques/'):] if '04-surgical' in r['page'] else r['page']}"); last = r["page"]
    if i < 0:
        print(f"[{r['id']}] NOT FOUND: {s[:200]}"); continue
    hs = [m.group(0) for m in re.finditer(r"^#{2,4} .+$", t[:i], re.M)]
    ps = t.rfind("\n\n", 0, i) + 2
    lead = t[max(ps, i - 140):i].replace("\n", " ⏎ ")
    nxt = t[i + len(s):i + len(s) + 80].split("\n\n")[0].replace("\n", " ⏎ ")
    print(f"[{r['id']}] {r['problem'][:4]}/{r['fix']}/{r['confidence'][0]} | {hs[-1][:50] if hs else '(opening)'}\n  …{lead}<<{s}>>{nxt}…")
    if r["proposed_text"] and r["fix"] != "delete":
        print(f"  P: {r['proposed_text']}")
