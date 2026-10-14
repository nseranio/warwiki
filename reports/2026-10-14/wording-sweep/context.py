#!/usr/bin/env python3
"""Print each pass-2 row with its heading and surrounding paragraph text (for review).
Usage: context.py <pass2.tsv> [ids...] [--width N]"""
import csv, sys, pathlib, re
csv.field_size_limit(10**7)
ROOT = pathlib.Path(__file__).resolve().parents[3]
args = [a for a in sys.argv[2:] if not a.startswith("--") and not a.isdigit()]
wd = int(sys.argv[sys.argv.index("--width") + 1]) if "--width" in sys.argv else 350
for r in csv.DictReader(open(sys.argv[1]), delimiter="\t"):
    if args and r["id"] not in args: continue
    t = (ROOT / r["page"]).read_text(); s = r["sentence"]; i = t.find(s)
    if i < 0: print(f"[{r['id']}] NOT FOUND"); continue
    hs = [m.group(0) for m in re.finditer(r"^#{2,4} .+$", t[:i], re.M)]
    ps = t.rfind("\n\n", 0, i) + 2; pe = t.find("\n\n", i + len(s)); pe = len(t) if pe < 0 else pe
    before, after = t[max(ps, i - wd):i], t[i + len(s):min(pe, i + len(s) + wd)]
    print(f"[{r['id']}] {r['fix']} | {hs[-1] if hs else '(opening)'}\n  …{before}<<{s[:120]}…>>{after}…".replace("\n", " ⏎ "))
