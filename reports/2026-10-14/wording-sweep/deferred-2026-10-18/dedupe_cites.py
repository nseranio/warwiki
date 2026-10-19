#!/usr/bin/env python3
"""Drop repeated sources inside one citation group (<sup>[[5]](#ref5)[[1]](#ref1)[[5]](#ref5)</sup> or [^5][^2][^5])
on lines that differ from HEAD, keeping the first occurrence. Usage: dedupe_cites.py FILES..."""
import re, subprocess, sys
def dd(m):
    seen, out = set(), []
    for c in re.findall(r"\[\[\d+\]\]\(#ref\d+\)", m.group(1)):
        if c not in seen: seen.add(c); out.append(c)
    return "<sup>" + "".join(out) + "</sup>"
def ddf(m):
    seen, out = set(), []
    for c in re.findall(r"\[\^\d+\]", m.group(0)):
        if c not in seen: seen.add(c); out.append(c)
    return "".join(out)
for f in sys.argv[1:]:
    old = set(subprocess.run(["git", "show", f"HEAD:{f}"], capture_output=True, text=True).stdout.splitlines())
    lines = open(f).read().split("\n"); n = 0
    for k, l in enumerate(lines):
        if l in old: continue
        new = re.sub(r"<sup>((?:\[\[\d+\]\]\(#ref\d+\))+)</sup>", dd, l)
        new = re.sub(r"(?:\[\^\d+\](?!:))+", ddf, new)
        if new != l: lines[k] = new; n += 1
    if n: open(f, "w").write("\n".join(lines)); print(f, n)
