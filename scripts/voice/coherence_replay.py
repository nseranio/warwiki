#!/usr/bin/env python3
"""Replay coherence rewrites on pages the sweep reverted (claims still failing after the gate rounds).

    python3 scripts/voice/coherence_replay.py --root REPO NEW_NAME

For every page in <runs>/coherence-*-b*/reverted.json: reapply the batch's agreed rewrite edits, except any edit
containing a claim the last gate round marked unverifiable or source-needed (that section keeps its original,
already-verified wording), then reapply the agreed gate corrections from each gate round in order. Writes
<runs>/NEW_NAME/touched.json for `coherence_sweep.py gate` (GATE_ROUNDS=5) and `publish`.
"""
import glob, hashlib, json, os, re, sys

A = sys.argv[1:]
ROOT = os.path.abspath(A[A.index("--root") + 1]); del A[A.index("--root"):A.index("--root") + 2]
NAME = A[0]
RUNS = os.path.join(ROOT, "reviews/runs" if "whitwiki" in ROOT.lower() else "reports/audit-v2/sources-local")


def plain(t):
    t = re.sub(r"<sup>.*?</sup>|\[\^\d+\]|<[^>]+>|\*\*|\*", "", t)
    return re.sub(r"\s+", " ", t).strip().lower()


def verdicts(d, page):
    out = []
    for f in sorted(glob.glob(os.path.join(d, "verdicts", "*.jsonl"))):
        for l in open(f):
            try:
                v = json.loads(l)
            except Exception:
                continue
            if v.get("page") == page and v.get("verdict") in ("agree", "modify") and (v.get("edit") or {}).get("old"):
                out.append(v)
    return out


def failing(batch, page):
    gates = sorted(glob.glob(batch + "-gate*"))
    if not gates:
        return []
    g = gates[-1]
    st = {}
    for f in glob.glob(os.path.join(g, "status", "*.jsonl")):
        for l in open(f):
            try:
                x = json.loads(l); st[x["claim_id"]] = x
            except Exception:
                pass
    bad = []
    for f in glob.glob(os.path.join(g, "batches", "*.json")):
        for c in json.load(open(f))["claims"]:
            if c["page"] == page and st.get(c["id"], {}).get("status") in ("unverifiable", "source-needed"):
                bad.append(plain(c["text"])[:60])
    return bad


touched, report = [], []
for rv in sorted(glob.glob(os.path.join(RUNS, "coherence-*-b*/reverted.json"))):
    batch = os.path.dirname(rv)
    for page in json.load(open(rv)):
        p = os.path.join(ROOT, page)
        s = open(p).read()
        bad = failing(batch, page)
        used = skipped = 0
        for v in verdicts(batch, page):
            o, n = v["edit"]["old"], v["edit"]["new"]
            if any(b and b in plain(n) for b in bad):
                skipped += 1; continue
            if s.count(o) == 1:
                s = s.replace(o, n); used += 1
        fixes = 0
        for g in sorted(glob.glob(batch + "-gate*")):
            for v in verdicts(g, page):
                o, n = v["edit"]["old"], v["edit"]["new"]
                if s.count(o) == 1:
                    s = s.replace(o, n); fixes += 1
        if used or fixes:
            open(p, "w").write(s); touched.append(page)
        report.append(f"{page}: {used} rewrite edits, {skipped} kept original (unverifiable claim), {fixes} gate corrections")
os.makedirs(os.path.join(RUNS, NAME, "batches"), exist_ok=True)
json.dump(touched, open(os.path.join(RUNS, NAME, "touched.json"), "w"), indent=1)
print("\n".join(report)); print(f"{len(touched)} pages touched -> {NAME}")
