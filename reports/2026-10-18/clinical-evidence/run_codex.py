#!/usr/bin/env python3
"""Codex author runner for the Clinical Evidence trial files and pages (one trial per job).
Usage: run_codex.py <work dir> [--parallel N] [--only id,id,...]
Writes <work>/<id>/{prompt.md,log.txt,final.md,<id>.json,<id>.mdx,notes.md}; skips trials whose outputs exist."""
import json, os, re, signal, subprocess, sys, time, pathlib
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
work = pathlib.Path(sys.argv[1]).resolve(); work.mkdir(parents=True, exist_ok=True)
par = int(sys.argv[sys.argv.index("--parallel") + 1]) if "--parallel" in sys.argv else 3
assign = json.load(open(HERE / "assignments.json"))
only = sys.argv[sys.argv.index("--only") + 1].split(",") if "--only" in sys.argv else list(assign)
brief = (HERE / "brief.md").read_text()
src = (ROOT / "src/data/trials.ts").read_text()

def old_record(tid):
    m = re.search(r"\n  \{\n    id: '" + re.escape(tid) + r"',.*?\n  \},", src, re.S)
    return m.group(0).strip() if m else "(none)"

def log(m):
    line = f"{time.strftime('%H:%M:%S')} {m}"; print(line, flush=True)
    open(work / "run.log", "a").write(line + "\n")

running = {}
STALL = 1500  # a job whose log has not grown for 25 minutes is hung (October 19: four jobs froze at once); kill it
def reap():
    for k, p in list(running.items()):
        if p.poll() is not None:
            log(f"finish {k} rc={p.returncode}"); del running[k]
        elif time.time() - os.path.getmtime(work / k / "log.txt") > STALL:
            os.killpg(p.pid, signal.SIGTERM); p.wait(); log(f"killed {k} (stalled)"); del running[k]

for tid in only:
    d = work / tid
    if (d / f"{tid}.json").exists() and (d / f"{tid}.mdx").exists() and (d / "notes.md").exists():
        continue
    while len(running) >= par:
        reap(); time.sleep(20)
    d.mkdir(exist_ok=True)
    a = assign[tid]
    prompt = (brief + f"\n\n## Inputs\n\nTRIAL ID: {tid}\nAREA: {json.dumps(a['area'])}\n"
              f"DECISIONS: {json.dumps([{'id': i, 'lane': l} for i, l in a['decisions']])}\n"
              f"OTHER TRIAL IDS: {', '.join(t for t in assign if t != tid)}\n\nOLD JOURNAL CLUB RECORD:\n```ts\n{old_record(tid)}\n```\n\nOUT_DIR: {d}\n")
    (d / "prompt.md").write_text(prompt)
    running[tid] = subprocess.Popen(["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", str(d),
        "-c", 'model="gpt-6-sol"', "-c", 'model_reasoning_effort="high"', "-c", 'service_tier="default"',
        "-o", str(d / "final.md"), prompt], stdin=subprocess.DEVNULL, stdout=open(d / "log.txt", "w"),
        stderr=subprocess.STDOUT, start_new_session=True)
    log(f"launch {tid}")
while running:
    reap(); time.sleep(20)
log("exit")
