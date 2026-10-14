#!/usr/bin/env python3
"""Mark rows defer-gate in a decisions file: rows that fail the claim gate on their own (find_gate_rows.py output) and
applied rows whose sentence or replacement carries a reference that orphans.py reports as newly uncited.
Usage: mark_deferred.py <pass2.tsv> <decisions.tsv> <gate-rows.txt> <orphans.txt>"""
import csv, re, sys
csv.field_size_limit(10**7)
rows = {r["id"]: r for r in csv.DictReader(open(sys.argv[1]), delimiter="\t")}
dec = list(csv.reader(open(sys.argv[2]), delimiter="\t"))
gate = {l.split()[0] for l in open(sys.argv[3]) if l.strip()}
orph = {}
for l in open(sys.argv[4]):
    f, *refs = l.split()
    orph[f] = refs
n = 0
for d in dec[1:]:
    d += [""] * (5 - len(d))
    if d[1] != "apply":
        continue
    r = rows[d[0]]
    why = []
    if d[0] in gate:
        why.append("claim gate: edit changes a gated claim unit")
    for ref in orph.get(r["page"], []):
        tag = f"(#{ref})" if ref.startswith("ref") else f"[^{ref[2:]}]"
        if tag in r["sentence"]:
            why.append(f"leaves {ref} uncited; needs reference removal and renumbering")
    if why:
        d[1] = "defer-gate"; d[4] = "; ".join([x for x in [d[4]] + why if x]); n += 1
csv.writer(open(sys.argv[2], "w"), delimiter="\t", lineterminator="\n").writerows(dec)
print(n, "rows deferred")
