#!/usr/bin/env python3
"""Drop decision points and lanes that no trial file uses yet, in a publish worktree (so a partial wave shows no empty
timelines). Usage: prune_decisions.py WORKTREE. Rewrites WORKTREE/src/data/clinical-evidence/{decisions,timeline-groups}.json."""
import json, glob, sys, pathlib
wt = pathlib.Path(sys.argv[1]); d = wt / "src/data/clinical-evidence"
used = set()
for f in glob.glob(str(d / "trials/*.json")):
    for x in json.load(open(f))["decisions"]:
        used.add((x["id"], x["lane"]))
dec = json.load(open(d / "decisions.json")); kept = []
for x in dec:
    x["lanes"] = [l for l in x["lanes"] if (x["id"], l["id"]) in used]
    if x["lanes"]:
        kept.append(x)
ids = {x["id"] for x in kept}
groups = json.load(open(d / "timeline-groups.json"))
for g in groups:
    g["items"] = [i for i in g["items"] if i[0] in ids]
(d / "decisions.json").write_text(json.dumps(kept, indent=2, ensure_ascii=False) + "\n")
(d / "timeline-groups.json").write_text(json.dumps(groups, indent=2, ensure_ascii=False) + "\n")
print("pruned to", len(kept), "decisions;", sum(len(x["lanes"]) for x in kept), "lanes")
