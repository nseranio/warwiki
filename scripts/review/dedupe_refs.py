#!/usr/bin/env python3
"""Merge duplicate references (same DOI listed twice in one page's reference list).

  python3 scripts/review/dedupe_refs.py [--check] [FILES...]   (default: every page)

Citations of a duplicate are pointed at the first copy, repeated markers inside one <sup> collapse,
and the duplicate line is removed with later references renumbered (scripts/review/drop_ref.py).
--check only reports duplicates and exits 1 if any are found.
"""
import glob, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def dois(s):
    if "\n## References" not in s:
        return {}
    out = {}
    for line in s.split("\n## References", 1)[1].split("\n"):
        m = re.search(r"doi:\s*\[(10\.[^\]]+)\]", line) or re.search(r"https?://(?:dx\.)?doi\.org/(10\.\S+?)\)(?:\s|$|\.|,)", line)
        n = re.search(r'id="ref(\d+)"', line) or re.match(r"\[\^(\d+)\]:", line) or re.match(r"(\d+)\. ", line)
        if m and n:
            out.setdefault(m.group(1).lower().rstrip("."), []).append(int(n.group(1)))
    return {d: sorted(v) for d, v in out.items() if len(v) > 1}


def merge(path):
    s = open(path).read()
    dup = dois(s)
    if not dup:
        return 0
    # every duplicate number -> the first copy
    remap = {n: v[0] for v in dup.values() for n in v[1:]}
    for old, keep in remap.items():
        s = re.sub(rf"\[\[{old}\]\]\(#ref{old}\)", f"[[{keep}]](#ref{keep})", s)
        s = re.sub(rf"\[\^{old}\](?!:)", f"[^{keep}]", s)
    s = re.sub(r"(\[\[(\d+)\]\]\(#ref\2\))(?:\1)+", r"\1", s)  # collapse adjacent repeats
    s = re.sub(r"(\[\^(\d+)\])(?:\1)+", r"\1", s)
    open(path, "w").write(s)
    for old in sorted(remap, reverse=True):
        if re.search(rf"^\[\^{old}\]:", s, re.M):  # footnote page: drop the duplicate definition only
            s = open(path).read()
            s = re.sub(rf"^\[\^{old}\]:.*\n?", "", s, count=1, flags=re.M)
            open(path, "w").write(s)
        else:
            subprocess.run(["python3", os.path.join(ROOT, "scripts/review/drop_ref.py"), path, str(old)], check=False)
    return len(remap)


def main():
    a = sys.argv[1:]
    check = "--check" in a
    files = [f for f in a if f.endswith(".mdx")] or glob.glob(os.path.join(ROOT, "docs/**/*.mdx"), recursive=True)
    total = 0
    for f in files:
        if check:
            d = dois(open(f).read())
            if d:
                print(os.path.relpath(f, ROOT), d)
                total += sum(len(v) - 1 for v in d.values())
        else:
            n = merge(f)
            if n:
                print(f"{os.path.relpath(f, ROOT)}: merged {n}")
                total += n
    print(f"{total} duplicate reference(s)")
    if check and total:
        sys.exit(1)


if __name__ == "__main__":
    main()
