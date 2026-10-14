#!/usr/bin/env python3
"""Default cite-preserving deletes: in a decisions file, set fix_override to "delete keep citation" for applied rows
whose effective fix is delete and whose sentence ends with a citation. Usage: keep_cites.py <pass2.tsv> <decisions.tsv>"""
import csv, re, sys
csv.field_size_limit(10**7)
rows = {r["id"]: r for r in csv.DictReader(open(sys.argv[1]), delimiter="\t")}
dec = list(csv.reader(open(sys.argv[2]), delimiter="\t"))
CITE = re.compile(r"((?:<sup>(?:(?!<sup>).)*</sup>)|(?:\[\^\d+\])+)$")
n = 0
for d in dec[1:]:
    d += [""] * (5 - len(d))
    if d[1] == "apply" and (d[2] or rows[d[0]]["fix"]).strip() == "delete" and CITE.search(rows[d[0]]["sentence"]):
        d[2] = "delete keep citation"; n += 1
csv.writer(open(sys.argv[2], "w"), delimiter="\t", lineterminator="\n").writerows(dec)
print(n, "deletes set to keep their citation")
