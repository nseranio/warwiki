#!/usr/bin/env python3
"""Drop numbered references no longer cited on a page (after cuts), renumbering with drop_ref.py.

Usage: python3 scripts/review/drop_uncited.py PAGE [PAGE ...]
"""
import os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
for page in sys.argv[1:]:
    s = open(page).read()
    defined = sorted({int(n) for n in re.findall(r'<a id="ref(\d+)"></a>', s)}, reverse=True)
    cited = {int(n) for n in re.findall(r"\[\[\d+\]\]\(#ref(\d+)\)", s)} | {int(n) for n in re.findall(r'href="#ref(\d+)"', s)} | {int(n) for n in re.findall(r"\(#ref(\d+)\)", s)}
    gone = [n for n in defined if n not in cited]
    for n in gone:  # highest first so lower numbers stay valid
        subprocess.run([sys.executable, os.path.join(HERE, "drop_ref.py"), page, str(n)], check=True)
    if gone:
        print(f"{page}: dropped uncited reference(s) {sorted(gone)}")
