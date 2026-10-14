#!/usr/bin/env python3
"""List references that an edit left uncited (anchor present, no (#refN) link), compared with HEAD.
Usage: orphans.py FILES..."""
import re, subprocess, sys
def orphans(t):
    ids = re.findall(r'<a id="(ref\d+)"></a>', t)
    out = {i for i in ids if f"(#{i})" not in t}
    for n in set(re.findall(r"^\[\^(\d+)\]:", t, re.M)):   # GAS footnotes
        if len(re.findall(rf"\[\^{n}\](?!:)", t)) == 0:
            out.add(f"fn{n}")
    return out
for f in sys.argv[1:]:
    old = subprocess.run(["git", "show", f"HEAD:{f}"], capture_output=True, text=True).stdout
    new = orphans(open(f).read()) - orphans(old)
    if new:
        print(f, " ".join(sorted(new, key=lambda x: (x[:2], int(x[2:].lstrip("f"))))))
