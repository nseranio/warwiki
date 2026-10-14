#!/usr/bin/env python3
"""Find which applied rows make the claim gate fail: for each page with failures, re-apply that page's rows one at a
time on the HEAD text and run gate.py check on the page. Prints the ids that fail on their own.
Usage: find_gate_rows.py <pass2.tsv> <decisions.tsv> FILES...   (restores the files to their current text afterwards)"""
import csv, subprocess, sys, pathlib, tempfile
csv.field_size_limit(10**7)
HERE = pathlib.Path(__file__).resolve().parent; ROOT = HERE.parents[2]
APPLY = ROOT / "reports/2026-10-15/wording-sweep/apply_fixes.py"
pass2, decs, files = sys.argv[1], sys.argv[2], sys.argv[3:]
rows = {r["id"]: r for r in csv.DictReader(open(pass2), delimiter="\t")}
dec = [r for r in csv.reader(open(decs), delimiter="\t") if r and r[0] in rows and r[1] == "apply"]
for f in files:
    cur = (ROOT / f).read_text()
    head = subprocess.run(["git", "show", f"HEAD:{f}"], capture_output=True, text=True, cwd=ROOT).stdout
    for d in [d for d in dec if rows[d[0]]["page"] == f]:
        (ROOT / f).write_text(head)
        with tempfile.NamedTemporaryFile("w", suffix=".tsv", delete=False) as t:
            t.write("\t".join(d) + "\n")
        subprocess.run(["python3", APPLY, pass2, t.name], capture_output=True, cwd=ROOT)
        g = subprocess.run(["python3", "scripts/review/gate.py", "check", f], capture_output=True, text=True, cwd=ROOT)
        if g.returncode:
            print(d[0], f)
    (ROOT / f).write_text(cur)
