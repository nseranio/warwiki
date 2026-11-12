#!/usr/bin/env python3
"""Codex runner: add missing reports to existing WARWIKI trial families (November 12, 2026; one family per job).
Usage: run_codex_reports.py [--parallel N] [--only id,...]
Writes work-reports/<id>/{prompt.md,log.txt,final.md,<id>.json,<id>.mdx,notes.md}; skips families whose outputs exist.
Stops launching when work-reports/STOP exists."""
import json, os, signal, subprocess, sys, time, pathlib, collections
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SRC = str(ROOT / "reports/audit-v2/sources-local/trials-2026-11-12")
work = HERE / "work-reports"; work.mkdir(exist_ok=True)
LOG = work / "run.log"
A = sys.argv[1:]
par = int(A[A.index("--parallel") + 1]) if "--parallel" in A else 3
gaps = json.load(open(ROOT / "reports/2026-11-11/trial-gaps/warwiki-missing-trials.json"))
g = collections.OrderedDict()
for x in gaps["reports_to_add"]:
    g.setdefault(x["existing_trial"], []).append(x)
only = A[A.index("--only") + 1].split(",") if "--only" in A else list(g)
brief = (HERE / "brief-reports.md").read_text()

def log(m):
    line = f"{time.strftime('%H:%M:%S')} {m}"; print(line, flush=True)
    open(LOG, "a").write(line + "\n")

running = {}
STALL = 1500
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
    reps = "\n".join(f"- {x['citation']} (PMID {x.get('pmid')}). Why: {x['why']}" for x in g[tid])
    prompt = brief + f"\n\n## Inputs\n\nTRIAL ID: {tid}\n\nREPORTS TO ADD (written by another agent; verify every detail):\n{reps}\n\nOUT_DIR: {d}\n"
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
