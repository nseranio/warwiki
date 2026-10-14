#!/usr/bin/env python3
"""Pass 1: deterministic candidates for the three October 14 wording problems.
Usage: python3 pass1_regex.py <docs subdir> > pass1-regex.tsv"""
import re, sys, pathlib

RX_BOX = re.compile(r'^(>\s*)?\*\*[^*]*(Guideline|Recommendation|Statement|Consensus)[^*]*\*\*')
RX_REBUT = re.compile("|".join(x.strip() for x in r"""\bis not (the|a) (prevalence|universal|substitute|measure|trial|proof|rule)\b
\brather than (a|an) (change|true|real|difference)\b
\bshould not be (read|interpreted|taken|transferred|extrapolated)\b
\bdoes not (establish|prove|show that|mean that)\b
\bdo not (establish|prove|transfer)\b
\bnot (independently )?(assessed|verified|reviewed)\b
\bin the (inspected|available) abstract\b
^(This|The present) (page|article|section|chapter) (covers|focuses|describes|addresses|reviews)
\b(is|are) described here\b
\bThis (broad|symptom-based|estimate|figure|result|finding)[^.]{0,60}\bis not\b
\bnot a (universal|substitute|trial|guarantee)\b""".split("\n")), re.I)
RX_STUDY = re.compile(r'^[A-Z][A-Za-z\'\-]+( and [A-Z][A-Za-z\'\-]+| et al\.?)? \((1[89]|20)\d\d\)')

def sentences(s):
    return re.split(r'(?<=[.!?])\s+(?=[A-Z<])', s)

print("page\tline\tsentence\tproblem\tproposed_fix\tsection")
for f in sorted(pathlib.Path(sys.argv[1]).rglob("*.mdx")):
    sec, refs = "(opening)", False
    for i, line in enumerate(f.read_text().splitlines(), 1):
        if line.startswith("## "):
            sec = line[3:].strip(); refs = sec.lower().startswith("reference")
        if refs or line.startswith(("import ", "#", "|", "<a id")):
            continue
        if RX_BOX.match(line):
            print(f"{f}\t{i}\t{line[:300]}\tguideline-box\tcheck: duplicate of later section?\t{sec}")
            continue
        if RX_STUDY.match(line) and len(line) > 120:
            print(f"{f}\t{i}\t{line[:300]}\tstandalone-study\tcheck fit in section\t{sec}")
        for s in sentences(line):
            if RX_REBUT.search(s):
                print(f"{f}\t{i}\t{s[:300]}\trebuttal-scope\tdelete or rewrite\t{sec}")
