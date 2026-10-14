#!/usr/bin/env python3
"""Find applied deletions that stripped the only citation from the sentence before them.
For each applied delete row whose sentence ends with a citation (<sup>…</sup> or [^N]), look at the pre-sweep text:
if the text before the sentence on the same line is a sentence that ends without its own citation, the deletion
removed that sentence's citation. Prints: id <TAB> page <TAB> citation <TAB> anchor (last 100 chars before the sentence).
Usage: audit_cites.py <base commit> <pass2.tsv> <decisions.tsv> [<pass2.tsv> <decisions.tsv> ...]"""
import csv, re, subprocess, sys
csv.field_size_limit(10**7)
base, pairs = sys.argv[1], sys.argv[2:]
CITE = re.compile(r"((?:<sup>(?:(?!<sup>).)*</sup>)|(?:\[\^\d+\])+)$")
cache = {}
def old(page):
    if page not in cache:
        cache[page] = subprocess.run(["git", "show", f"{base}:{page}"], capture_output=True, text=True).stdout
    return cache[page]
for k in range(0, len(pairs), 2):
    rows = {r["id"]: r for r in csv.DictReader(open(pairs[k]), delimiter="\t")}
    for d in csv.reader(open(pairs[k + 1]), delimiter="\t"):
        if not d or d[0] not in rows or d[1] != "apply":
            continue
        d += [""] * (5 - len(d))
        r = rows[d[0]]
        fix = (d[2] or r["fix"]).strip()
        if fix != "delete":
            continue
        s = r["sentence"]; m = CITE.search(s)
        if not m:
            continue
        t = old(r["page"]); i = t.find(s)
        if i < 0:
            continue
        ls = t.rfind("\n", 0, i) + 1
        prefix = t[ls:i].rstrip()
        if prefix.strip() in ("", "-", ">", "*") or prefix.endswith(":") or re.fullmatch(r"\s*(\d+\.|-|>)\s*", prefix):
            continue
        if CITE.search(prefix):
            continue
        print(f"{d[0]}\t{r['page']}\t{m.group(1)}\t{prefix[-100:]}")
