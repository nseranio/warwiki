#!/usr/bin/env python3
"""Codex fix pass for trials whose claims failed the gate (one trial per job).
Usage: run_codex_fix.py --wave NAME --runs RUN_DIR[,RUN_DIR...] [--unavailable FILE] [--parallel N] [--only id,...]
Copies the current tree files to work-fix/<wave>/<id>/, lists each failing claim (gate.py check) with the latest
checker note from the run dirs, and asks Codex to fix or remove them. Review the diffs, then install with install_fix.py."""
import json, os, signal, subprocess, sys, time, pathlib, glob, shutil, re, collections
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT / "scripts/review"))
import gate
A = sys.argv[1:]
wave = A[A.index("--wave") + 1]
runs = A[A.index("--runs") + 1].split(",")
par = int(A[A.index("--parallel") + 1]) if "--parallel" in A else 4
unavail = (pathlib.Path(A[A.index("--unavailable") + 1]).read_text() if "--unavailable" in A else "")
ids = [x for x in (HERE / f"wave-{wave}.txt").read_text().split()]
if "--only" in A:
    ids = A[A.index("--only") + 1].split(",")
work = HERE / "work-fix" / wave; work.mkdir(parents=True, exist_ok=True)
LOG = work / "run.log"
brief = (HERE / "brief-fix.md").read_text()
# latest checker notes by (page, normalized text)
notes = collections.defaultdict(list)
for rd in runs:
    cl = {}
    for f in glob.glob(str(ROOT / rd / "batches/*.json")):
        for c in json.load(open(f))["claims"]:
            cl[c["id"]] = c
    for f in glob.glob(str(ROOT / rd / "status/*.jsonl")):
        for l in open(f):
            if l.strip():
                v = json.loads(l); c = cl.get(v["claim_id"])
                if c and v.get("status") != "ok":
                    notes[(c["page"], gate.norm(c["text"]))].append(f"{v.get('status')}: {v.get('locator','')}")
    for f in glob.glob(str(ROOT / rd / "verdicts/*.jsonl")):
        for l in open(f):
            if l.strip():
                v = json.loads(l)
                if v.get("finding") and v.get("verdict") in ("agree", "modify"):
                    notes[(v["page"], "FINDING")].append(f"finding ({v.get('verdict')}): {v['finding']} | verifier: {(v.get('reason') or '')[:400]} | proposed: {json.dumps(v.get('edit'))[:400]}")

def log(m):
    line = f"{time.strftime('%H:%M:%S')} {m}"; print(line, flush=True)
    open(LOG, "a").write(line + "\n")

def failing(tid):
    pages = [f"src/data/clinical-evidence/trials/{tid}.json", f"docs/06-clinical-evidence/studies/{tid}.mdx"]
    out = []
    for p, u, ok, why in gate.evaluate(pages):
        if ok or why.startswith("high-risk claim needs a second"):
            continue
        n = notes.get((p, gate.norm(u["text"])), [])
        out.append(f"- {p} :: {u['line']} :: {why}\n  CLAIM: {u['text'][:700]}\n  CHECKER: {' || '.join(dict.fromkeys(n))[:900] or 'none recorded'}")
    for p in pages:
        for n in notes.get((p, "FINDING"), []):
            out.append(f"- {p} :: FINDING :: {n}")
    return out

running = {}
def reap():
    for k, p in list(running.items()):
        if p.poll() is not None:
            log(f"finish {k} rc={p.returncode}"); del running[k]
        elif time.time() - os.path.getmtime(work / k / "log.txt") > 1500:
            os.killpg(p.pid, signal.SIGTERM); p.wait(); log(f"killed {k} (stalled)"); del running[k]

for tid in ids:
    d = work / tid
    if (d / "notes.md").exists():
        continue
    fl = failing(tid)
    if not fl:
        continue
    while len(running) >= par:
        reap(); time.sleep(15)
    d.mkdir(exist_ok=True)
    shutil.copy(ROOT / f"src/data/clinical-evidence/trials/{tid}.json", d / f"{tid}.json")
    shutil.copy(ROOT / f"docs/06-clinical-evidence/studies/{tid}.mdx", d / f"{tid}.mdx")
    shutil.copy(d / f"{tid}.json", d / f"{tid}.orig.json"); shutil.copy(d / f"{tid}.mdx", d / f"{tid}.orig.mdx")
    prompt = (brief + f"\n\n## Inputs\n\nTRIAL ID: {tid}\nOUT_DIR: {d}\n\nUNAVAILABLE SOURCES:\n{unavail or 'none listed'}\n\n"
              f"FAILING CLAIMS ({len(fl)}):\n" + "\n".join(fl) + "\n")
    (d / "prompt.md").write_text(prompt)
    running[tid] = subprocess.Popen(["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", str(d),
        "--add-dir", str(ROOT / "reports/audit-v2/sources-local/trials-2026-11-12"), "-c", "sandbox_workspace_write.network_access=true",
        "-c", 'model="gpt-6-sol"', "-c", 'model_reasoning_effort="high"', "-c", 'service_tier="default"',
        "-o", str(d / "final.md"), prompt], stdin=subprocess.DEVNULL, stdout=open(d / "log.txt", "w"),
        stderr=subprocess.STDOUT, start_new_session=True)
    log(f"launch {tid} ({len(fl)} claims)")
while running:
    reap(); time.sleep(15)
log("exit")
