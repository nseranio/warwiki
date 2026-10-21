#!/usr/bin/env python3
"""After cut edits: collapse double spaces, stray " ." / ",." and repeated adjacent citations on prose lines
that differ from git HEAD.

Usage: python3 scripts/voice/tidy_cuts.py PAGE [PAGE ...]
"""
import re, subprocess, sys

for page in sys.argv[1:]:
    old = set(subprocess.run(["git", "show", f"HEAD:{page}"], capture_output=True, text=True).stdout.split("\n"))
    lines = open(page).read().split("\n")
    fixed = 0
    for i, line in enumerate(lines):
        if line in old or line.lstrip().startswith("|") or not line.strip():
            continue
        new = re.sub(r"(?<=\S)  +(?=\S)", " ", line)
        new = re.sub(r" +([.,;:])(?=\s|$|<sup)", r"\1", new)
        new = re.sub(r",\.", ".", new)
        new = re.sub(r"(?<![.])\.\.(?!\.)", ".", new)
        # a cut can leave the same citation twice in a row: [[3]](#ref3)</sup><sup>[[3]](#ref3) or [[3]](#ref3)[[3]](#ref3)
        new = re.sub(r"(\[\[(\d+)\]\]\(#ref\2\))(?:</sup><sup>)?\1", r"\1", new)
        if new != line:
            lines[i] = new
            fixed += 1
    if fixed:
        open(page, "w").write("\n".join(lines))
        print(f"{page}: tidied {fixed} line(s)")
