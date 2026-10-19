#!/usr/bin/env python3
"""Collect every defer-gate row of the October 14 sweep (plus the citation-audit restored caveats) into one
candidates/decisions pair for apply_fixes.py. Plain deletes of a sentence ending in a citation become
"delete keep citation", unless the preceding sentence already ends with its own citation and every source in
the deleted citation is cited elsewhere on the page (then a plain delete leaves no claim without a source and does
not add sources to the preceding claim). Owner-question rows and rows in SKIP are excluded. Usage: collect.py."""
import csv, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[4]
csv.field_size_limit(10**7)
H = pathlib.Path(__file__).resolve().parent; S = H.parent
OWNER = {"s069", "t26-01", "t26-06", "t26-07", "f04-10-02", "t47-20", "t48-08", "t49-03", "t50-01", "t51-05",
         "t51-07", "t51-09", "t52-05"} | {f"f04-10-{i:02d}" for i in range(5, 13)}
SKIP = {"ba:t01-19"}   # caveat already removed when the sentence gained a <Rec> badge (October 17)
CITE = re.compile(r"((?:<sup>(?:(?!<sup>).)*</sup>)|(?:\[\^\d+\])+)$")
FOLDERS = [("ev", "02-evaluation"), ("sp", "05-special-populations"), ("ba", "04-surgical-techniques/batch-a"),
           ("bb", "04-surgical-techniques/batch-b"), ("bc", "04-surgical-techniques/batch-c"),
           ("bd", "04-surgical-techniques/batch-d"), ("f25", "followup/sections-02-05"),
           ("f04", "followup/04-surgical-techniques"), ("lb", "followup/leftover-busy"),
           ("ca", "followup/citation-audit")]
cands, decs, fields = [], [], None
for tag, d in FOLDERS:
    ca = tag == "ca"
    rows = list(csv.DictReader(open(S / d / ("restored-pass2.tsv" if ca else "pass2-codex.tsv")), delimiter="\t"))
    byid = {r["id"]: r for r in rows}
    fields = fields or list(rows[0].keys())
    for dr in csv.reader(open(S / d / ("restored-decisions.tsv" if ca else "decisions.tsv")), delimiter="\t"):
        if not dr or dr[0] == "id": continue
        dr += [""] * (5 - len(dr))
        if dr[1] != ("apply" if ca else "defer-gate") or dr[0] in OWNER: continue
        r = dict(byid[dr[0]]); nid = f"{tag}:{dr[0]}"; r["id"] = nid
        fix = (dr[2] or r["fix"]).strip()
        if nid in SKIP: continue
        if fix == "delete" and CITE.search(r["sentence"]): fix = "delete keep citation"
        if fix == "delete keep citation":
            t = (ROOT / r["page"][r["page"].index("docs/"):]).read_text(); i = t.find(r["sentence"])
            rest = t[:i] + t[i + len(r["sentence"]):] if i >= 0 else t
            srcs = re.findall(r"\(#(ref\d+)\)", r["sentence"]) + re.findall(r"\[\^(\d+)\](?!:)", r["sentence"])
            elsewhere = all((f"(#{x})" in rest) if x.startswith("ref") else re.search(rf"\[\^{x}\](?!:)", rest) for x in srcs)
            if i > 0 and re.search(r"(</sup>|\[\^\d+\])\s*$", t[:i]) and t[t.rfind("\n", 0, i) + 1:i].strip() and elsewhere:
                fix = "delete"
        cands.append(r); decs.append([nid, "apply", fix, dr[3], dr[4]])
with open(H / "candidates.tsv", "w") as f:
    w = csv.DictWriter(f, fields, delimiter="\t", lineterminator="\n", extrasaction="ignore"); w.writeheader(); w.writerows(cands)
with open(H / "decisions.tsv", "w") as f:
    w = csv.writer(f, delimiter="\t", lineterminator="\n"); w.writerow(["id", "decision", "fix_override", "text_override", "note"]); w.writerows(decs)
print(len(decs), "rows")
