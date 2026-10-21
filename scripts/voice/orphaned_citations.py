#!/usr/bin/env python3
"""Find (and with --fix restore) citations lost when the facts sweep cut a cited sentence or clause.

Usage: python3 scripts/voice/orphaned_citations.py [--rev REV] [--fix] PAGE [PAGE ...]
Compares each page with git REV (default HEAD). Two cases:
  1. a sentence with no marker of its own whose next sentence in REV carried markers, when that sentence is gone;
  2. a sentence whose trailing cited clause was cut, leaving no marker.
--fix appends the lost markers to the sentence, mapped to the page's current reference numbers by reference text;
a reference that was dropped as uncited is appended to the end of the list again.
"""
import re, subprocess, sys

args = sys.argv[1:]
rev = "HEAD"
if "--rev" in args:
    rev = args[args.index("--rev") + 1]; args = [a for a in args if a not in ("--rev", rev)]
FIX = "--fix" in args
args = [a for a in args if a != "--fix"]
SUP = re.compile(r"(?:<sup>.*?</sup>)+")
REFLINE = re.compile(r'^<a id="ref(\d+)"></a>((?:<a id="ref-[^"]+"></a>)?)(\d+)\.\s*(.*)$')
REFLINE2 = re.compile(r'^(\d+)\. <a id="ref(\d+)"></a>((?:<a id="ref-[^"]+"></a>)?)\s*(.*)$')  # "N. <a id="refN"></a>text"


def sentences(line):
    out, start = [], 0
    for m in re.finditer(r"[.!?](?:<sup>.*?</sup>)*(?=\s+[A-Z*(\[]|\s*$)", line):
        out.append(line[start:m.end()].strip()); start = m.end()
    if line[start:].strip():
        out.append(line[start:].strip())
    return out


bare = lambda s: SUP.sub("", s).strip()
refnums = lambda s: re.findall(r"\(#ref(\d+)\)", s)


def reflist(text):
    out = {}
    for l in text.split("\n"):
        m = REFLINE.match(l)
        if m:
            out[int(m.group(1))] = (m.group(2), m.group(4), 1)
            continue
        m = REFLINE2.match(l)
        if m:
            out[int(m.group(2))] = (m.group(3), m.group(4), 2)
    return out


total = 0
for page in args:
    old = subprocess.run(["git", "show", f"{rev}:{page}"], capture_output=True, text=True).stdout
    new = open(page).read()
    new_lines = new.split("\n")
    new_bare = {}
    for i, line in enumerate(new_lines):
        for s in sentences(line):
            new_bare.setdefault(bare(s), []).append((i, s))
    lost = []  # (new sentence text without markers, line index, [old ref numbers])
    for line in old.split("\n"):
        if line.lstrip().startswith(("|", "<a id", "import ", "#")):
            continue
        ss = sentences(line)
        for k, s in enumerate(ss):
            if not refnums(s) or bare(s) in new_bare:
                continue
            nxt_prev = ss[k - 1] if k else None
            # case 1: previous sentence relied on this one's markers
            if nxt_prev and not refnums(nxt_prev):
                for i, cur in new_bare.get(bare(nxt_prev), []):
                    if not refnums(cur):
                        lost.append((cur, i, refnums(s)))
            # case 2: a clause of this sentence survives without its markers
            b = bare(s).rstrip(".")
            for nb, occ in new_bare.items():
                core = nb.rstrip(".")
                if len(core) > 40 and core != b and b.startswith(core) and b[len(core):len(core) + 1] in (",", ";", " ", ":", "—"):
                    for i, cur in occ:
                        if not refnums(cur):
                            lost.append((cur, i, refnums(s)))
    seen = set()
    lost = [x for x in lost if not (x[0], x[1]) in seen and not seen.add((x[0], x[1]))]
    lost = [x for x in lost if len(bare(x[0])) >= 12]
    for cur, i, nums in lost:
        print(f"{page}: «{bare(cur)[:140]}» lost citation(s) {nums}")
    total += len(lost)
    if not FIX or not lost:
        continue
    oldrefs, newrefs = reflist(old), reflist(new)
    by_text = {t: n for n, (_, t, _) in newrefs.items()}
    style = next(iter(newrefs.values()))[2] if newrefs else 1
    append = []
    def mapnum(n):
        t = oldrefs.get(int(n), (None, None, None))[1]
        if t is None:
            return None
        if t in by_text:
            return by_text[t]
        nn = max(list(newrefs) + [r for r, _, _ in append] or [0]) + 1
        append.append((nn, oldrefs[int(n)][0], t)); by_text[t] = nn
        return nn
    for cur, i, nums in lost:
        mapped = [m for m in (mapnum(n) for n in nums) if m]
        if not mapped or len(bare(cur)) < 12 or new_lines[i].count(cur) != 1:
            print(f"  could not restore on line {i + 1}"); continue
        sup = "<sup>" + "".join(f"[[{m}]](#ref{m})" for m in dict.fromkeys(mapped)) + "</sup>"
        new_lines[i] = new_lines[i].replace(cur, cur + sup)
    if append:
        last = max(j for j, l in enumerate(new_lines) if REFLINE.match(l) or REFLINE2.match(l))
        add = []
        for nn, par, t in append:
            add += ["", f'<a id="ref{nn}"></a>{par}{nn}. {t}' if style == 1 else f'{nn}. <a id="ref{nn}"></a>{par}{t}']
        new_lines[last + 1:last + 1] = add
        print(f"  re-added reference(s) {[a[0] for a in append]}")
    open(page, "w").write("\n".join(new_lines))
print(f"{total} sentence(s) without a citation after a cut", file=sys.stderr)
