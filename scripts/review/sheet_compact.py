#!/usr/bin/env python3
"""Compact view of pending agreed edits: high findings in one line each, plus risk flags for any severity."""
import sys, re, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from apply import accepted
items, _ = accepted()
for v in items:
    o, n = v["edit"]["old"], v["edit"]["new"]
    flags = []
    if len(n.strip()) < 0.6 * len(o.strip()): flags.append("SHRINK")
    if re.search(r'<a id="ref\d+"', n) and not re.search(r'<a id="ref\d+"', o): flags.append("NEWREF")
    if re.search(r"\b(Strong|Moderate|Conditional|Expert Opinion|weak|strong)\b", n) != re.search(r"\b(Strong|Moderate|Conditional|Expert Opinion|weak|strong)\b", o): flags.append("STRENGTH")
    if v.get("severity") == "high" or flags:
        print(f"[{v.get('severity')[0].upper()}] {v['id']} {v['page'].split('/')[-1][:40]} {' '.join(flags)} | {v.get('finding','')[:150]} || {v.get('reason','')[:110]}")
