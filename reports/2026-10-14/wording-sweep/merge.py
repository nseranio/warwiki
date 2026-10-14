#!/usr/bin/env python3
"""Merge Codex job TSVs into one pass-2 file with id, found and busy columns.
Usage: merge.py <codex work dir> <id prefix> <busy-pages.txt> [--by-job] > pass2-codex.tsv
--by-job: ids are <prefix><job>-<n> (stable while later jobs are still running); only finished jobs are merged."""
import csv, sys, pathlib
csv.field_size_limit(10**7)
ROOT = pathlib.Path(__file__).resolve().parents[3]
work, pre, busy = pathlib.Path(sys.argv[1]), sys.argv[2], set(open(sys.argv[3]).read().split())
cols = ["page", "line", "sentence", "problem", "fix", "proposed_text", "confidence", "touches_claim", "reason"]
w = csv.writer(sys.stdout, delimiter="\t", lineterminator="\n")
w.writerow(["id"] + cols + ["found", "busy"])
n = 0
byjob = "--by-job" in sys.argv
for f in sorted(work.glob("j*/findings.tsv")):
    if byjob and not (f.parent / "final.md").exists():
        continue
    k = 0
    for r in csv.DictReader(open(f), delimiter="\t", quoting=csv.QUOTE_NONE):
        if not r.get("page"):
            continue
        page = r["page"][r["page"].index("docs/"):]
        for c in ("sentence", "proposed_text"):   # Codex sometimes CSV-quotes cells that contain double quotes
            v = r.get(c) or ""
            if len(v) > 1 and v[0] == v[-1] == '"' and '""' in v:
                r[c] = v[1:-1].replace('""', '"')
        n += 1; k += 1
        found = "yes" if (r.get("sentence") or "") in (ROOT / page).read_text() else "no"
        w.writerow([f"{pre}{f.parent.name[1:]}-{k:02d}" if byjob else f"{pre}{n:03d}", page] + [(r.get(c) or "") for c in cols[1:]] + [found, "yes" if page in busy else "no"])
