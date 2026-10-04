#!/usr/bin/env python3
"""Remove an uncited numbered reference from a page and renumber later references and their citations.

Usage: python3 scripts/review/drop_ref.py PAGE N
Refuses if reference N is still cited. Handles both '<a id="refN"></a>N. ...' and 'N. <a id="refN"></a>...' lines.
"""
import re, sys

page, n = sys.argv[1], int(sys.argv[2])
s = open(page).read()
if re.search(rf"\[\[{n}\]\]\(#ref{n}\)", s):
    sys.exit(f"ref{n} is still cited; not removing")
line = re.compile(rf'^(?:<a id="ref{n}"></a>{n}\.|{n}\. <a id="ref{n}"></a>)[^\n]*\n(?:\n)?', re.M)
s, k = line.subn("", s, count=1)
if not k:
    sys.exit(f"reference line {n} not found")


def shift(m):
    v = int(m.group(1))
    return m.group(0).replace(str(v), str(v - 1)) if v > n else m.group(0)


s = re.sub(r"\[\[(\d+)\]\]\(#ref\d+\)", lambda m: f"[[{int(m.group(1)) - 1}]](#ref{int(m.group(1)) - 1})" if int(m.group(1)) > n else m.group(0), s)
s = re.sub(r'<a id="ref(\d+)"></a>(\d+)\.', lambda m: f'<a id="ref{int(m.group(1)) - 1}"></a>{int(m.group(2)) - 1}.' if int(m.group(1)) > n else m.group(0), s)
s = re.sub(r'^(\d+)\. <a id="ref(\d+)"></a>', lambda m: f'{int(m.group(1)) - 1}. <a id="ref{int(m.group(2)) - 1}"></a>' if int(m.group(2)) > n else m.group(0), s, flags=re.M)
open(page, "w").write(s)
print(f"removed ref{n}; later references renumbered")
