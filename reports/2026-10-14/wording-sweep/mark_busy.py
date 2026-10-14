#!/usr/bin/env python3
"""Mark every apply/defer-gate row on a busy page (uncommitted gate-wave edits in the main checkout) as defer.
Usage: mark_busy.py <pass2.tsv> <decisions.tsv> <busy list>"""
import csv, sys
csv.field_size_limit(10**7)
rows = {r["id"]: r for r in csv.DictReader(open(sys.argv[1]), delimiter="\t")}
busy = set(open(sys.argv[3]).read().split())
dec = list(csv.reader(open(sys.argv[2]), delimiter="\t"))
n = 0
for d in dec[1:]:
    d += [""] * (5 - len(d))
    if d[1] in ("apply", "defer-gate") and rows[d[0]]["page"] in busy:
        d[1] = "defer"; d[4] = "; ".join(x for x in [d[4], "page busy: gate-wave edits in the main checkout"] if x); n += 1
csv.writer(open(sys.argv[2], "w"), delimiter="\t", lineterminator="\n").writerows(dec)
print(n, "rows on busy pages deferred")
