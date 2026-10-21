#!/usr/bin/env python3
"""Flag risky edits on a facts-sweep review sheet for Claude to read (the rest are routine cuts).

Usage: REVIEW_WORK=<dir> python3 scripts/voice/facts_risk.py [--all]
Reads WORK/review-sheet.md (from apply.py list) and prints edits whose removed text has a number, a guideline,
recommendation or label word, or whose replacement adds words not in the original. Prints counts at the end.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
WORK = os.path.join(ROOT, os.environ["REVIEW_WORK"])
RISK = re.compile(r"<Rec|\b(?:AUA|EAU|NCCN|SUFU|AUGS|ACOG|NICE|ICS|IUGA|ERAS|ASCO|SUO|ASTRO|ESMO|SIU|CUA|BAUS|FDA|IFU)\b|"
                  r"recommend|advis|guideline|contraindicat|label|boxed|black.box|must|never|avoid|do not use|unsafe|"
                  r"emergenc|urgent|death|mortality|fatal|sepsis|injur", re.I)
strip = lambda s: re.sub(r"<sup>.*?</sup>|\[\[\d+\]\]\(#ref\d+\)", "", s)
entries, cur = [], None
for line in open(os.path.join(WORK, "review-sheet.md")):
    if line.startswith("## ") and "docs/" in line:
        p = line.split()
        cur = {"id": p[1], "page": p[3], "verdict": p[-1].strip("()\n"), "old": "", "new": ""}
        entries.append(cur)
    elif cur and line.startswith("- OLD: "):
        cur["old"] = line[7:].rstrip("\n")
    elif cur and line.startswith("- NEW: "):
        cur["new"] = line[7:].rstrip("\n")
flag = []
for e in entries:
    old, new = strip(e["old"]), strip(e["new"])
    removed = old if not new.strip() else " ".join(w for w in old.split() if w not in set(new.split()))
    added = [w for w in re.findall(r"[A-Za-z0-9%.\-]+", new) if w.lower().strip(".") not in old.lower()]
    why = []
    if re.search(r"\d", removed):
        why.append("number")
    m = RISK.search(removed)
    if m:
        why.append(m.group(0))
    if added:
        why.append("adds: " + " ".join(added[:6]))
    if e["verdict"] == "modify":
        why.append("modified")
    if why or "--all" in sys.argv:
        flag.append((e, why))
for e, why in flag:
    print(f"{e['id']} {e['page'].replace('docs/', '')} [{'; '.join(why)}]\n  - {strip(e['old'])[:400]}\n  + {strip(e['new'])[:400]}")
print(f"\n{len(flag)} of {len(entries)} edits flagged for reading")
