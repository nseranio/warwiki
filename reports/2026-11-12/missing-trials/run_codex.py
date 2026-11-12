#!/usr/bin/env python3
"""Codex author runner for WARWIKI's missing trials (November 12, 2026; one trial per job; ported from WHITWIKI's kit).
Usage: run_codex.py [--parallel N] [--only id,id,...] [--tier 1|2]
Writes work/<id>/{prompt.md,log.txt,final.md,<id>.json,<id>.mdx,notes.md}; skips trials whose outputs exist.
Stops launching when work/STOP exists."""
import json, os, signal, subprocess, sys, time, pathlib
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SRC = str(ROOT / "reports/audit-v2/sources-local/trials-2026-11-12")
work = HERE / "work"; work.mkdir(exist_ok=True)
A = sys.argv[1:]
par = int(A[A.index("--parallel") + 1]) if "--parallel" in A else 4
assign = json.load(open(HERE / "assignments.json"))
leads = json.load(open(HERE / "leads.json"))
tier = int(A[A.index("--tier") + 1]) if "--tier" in A else None
only = A[A.index("--only") + 1].split(",") if "--only" in A else [t for t in assign if tier is None or assign[t]["tier"] == tier]
brief = (HERE / "brief.md").read_text()
existing = sorted(p.stem for p in (ROOT / "src/data/clinical-evidence/trials").glob("*.json"))
others = sorted(set(existing) | set(assign))


def log(m):
    line = f"{time.strftime('%H:%M:%S')} {m}"; print(line, flush=True)
    open(work / "run.log", "a").write(line + "\n")

running = {}
STALL = 1500  # a job whose log has not grown for 25 minutes is hung; kill it
def reap():
    for k, p in list(running.items()):
        if p.poll() is not None:
            log(f"finish {k} rc={p.returncode}"); del running[k]
        elif time.time() - os.path.getmtime(work / k / "log.txt") > STALL:
            os.killpg(p.pid, signal.SIGTERM); p.wait(); log(f"killed {k} (stalled)"); del running[k]

for tid in only:
    d = work / tid
    if all((d / f).exists() for f in (f"{tid}.json", f"{tid}.mdx", "notes.md")):
        continue
    while len(running) >= par:
        reap(); time.sleep(20)
    if (work / "STOP").exists():
        log("STOP file found; not launching more"); break
    d.mkdir(exist_ok=True)
    a = assign[tid]
    prompt = (brief + f"\n\n## Inputs\n\nTRIAL ID: {tid}\nAREA: {json.dumps(a['area'])}\n"
              f"DECISIONS: {json.dumps([{'id': i, 'lane': l} for i, l in a['decisions']])}\n"
              f"OTHER TRIAL IDS: {', '.join(t for t in others if t != tid)}\n\nLEAD: {leads[tid]}\n\nOUT_DIR: {d}\n")
    (d / "prompt.md").write_text(prompt)
    running[tid] = subprocess.Popen(["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", str(d),
        "--add-dir", SRC, "-c", "sandbox_workspace_write.network_access=true",
        "-c", 'model="gpt-6-sol"', "-c", 'model_reasoning_effort="high"', "-c", 'service_tier="default"',
        "-o", str(d / "final.md"), prompt], stdin=subprocess.DEVNULL, stdout=open(d / "log.txt", "w"),
        stderr=subprocess.STDOUT, start_new_session=True)
    log(f"launch {tid}")
while running:
    reap(); time.sleep(20)
log("exit")
