#!/usr/bin/env python3
"""Codex enrich pass: bring trials up to newly supplied full texts or guidelines (November 12, 2026; one trial per job).
Usage: run_codex_enrich.py SOURCES.json [--parallel N]
SOURCES.json maps trial id -> list of "report <report id>: <file>" or "guideline: <file>" lines.
Writes work-fix/enrich/<id>/{<id>.json,<id>.mdx,prompt.md,log.txt,final.md,notes.md}; install with install_fix.py enrich."""
import json, os, signal, subprocess, sys, time, pathlib, shutil
HERE = pathlib.Path(__file__).resolve().parent; ROOT = HERE.parents[2]
src = json.load(open(sys.argv[1]))
par = int(sys.argv[sys.argv.index("--parallel") + 1]) if "--parallel" in sys.argv else 4
work = HERE / "work-fix" / "enrich"; work.mkdir(parents=True, exist_ok=True)
brief = (HERE / "brief-enrich.md").read_text()
def log(m):
    line = f"{time.strftime('%H:%M:%S')} {m}"; print(line, flush=True); open(work / "run.log", "a").write(line + "\n")
running = {}
def reap():
    for k, p in list(running.items()):
        if p.poll() is not None: log(f"finish {k} rc={p.returncode}"); del running[k]
        elif time.time() - os.path.getmtime(work / k / "log.txt") > 1500:
            os.killpg(p.pid, signal.SIGTERM); p.wait(); log(f"killed {k} (stalled)"); del running[k]
for tid, lines in src.items():
    d = work / tid
    if (d / "notes.md").exists(): continue
    while len(running) >= par: reap(); time.sleep(15)
    d.mkdir(exist_ok=True)
    shutil.copy(ROOT / f"src/data/clinical-evidence/trials/{tid}.json", d / f"{tid}.json")
    shutil.copy(ROOT / f"docs/06-clinical-evidence/studies/{tid}.mdx", d / f"{tid}.mdx")
    prompt = brief + f"\n\n## Inputs\n\nTRIAL ID: {tid}\nOUT_DIR: {d}\n\nNEW SOURCES:\n" + "\n".join(f"- {l}" for l in lines) + "\n"
    (d / "prompt.md").write_text(prompt)
    running[tid] = subprocess.Popen(["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", str(d),
        "-c", 'model="gpt-6-sol"', "-c", 'model_reasoning_effort="high"', "-c", 'service_tier="default"',
        "-o", str(d / "final.md"), prompt], stdin=subprocess.DEVNULL, stdout=open(d / "log.txt", "w"),
        stderr=subprocess.STDOUT, start_new_session=True)
    log(f"launch {tid}")
while running: reap(); time.sleep(15)
log("exit")
