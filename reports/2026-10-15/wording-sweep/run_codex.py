#!/usr/bin/env python3
"""Pass 2 runner: Codex reads batches of pages and writes TSV findings.
Usage: run_codex.py <docs subdir> <work dir> [--parallel N] [--per-job N]"""
import os, sys, subprocess, time, pathlib, json
ROOT = pathlib.Path(__file__).resolve().parents[3]
sub, work = sys.argv[1], pathlib.Path(sys.argv[2]).resolve()
par = int(sys.argv[sys.argv.index("--parallel") + 1]) if "--parallel" in sys.argv else 3
per = int(sys.argv[sys.argv.index("--per-job") + 1]) if "--per-job" in sys.argv else 7
brief = (pathlib.Path(__file__).parent / "brief.md").read_text()
pages = sorted(str(p) for p in (ROOT / sub).rglob("*.mdx"))
jobs = [pages[i:i + per] for i in range(0, len(pages), per)]
work.mkdir(parents=True, exist_ok=True)
running = {}
def log(m):
    line = f"{time.strftime('%H:%M:%S')} {m}"; print(line, flush=True)
    open(work / "run.log", "a").write(line + "\n")
for n, batch in enumerate(jobs):
    d = work / f"j{n:02d}"; out = d / "findings.tsv"
    if out.exists() and (d / "final.md").exists():
        continue
    while len(running) >= par:
        for k, p in list(running.items()):
            if p.poll() is not None:
                log(f"finish {k} rc={p.returncode}"); del running[k]
        time.sleep(15)
    d.mkdir(exist_ok=True)
    prompt = brief + "\n\nPAGES:\n" + "\n".join(f"- {p}" for p in batch) + f"\n\nOUTPUT: {out}\n"
    (d / "prompt.md").write_text(prompt)
    running[d.name] = subprocess.Popen(["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", str(d),
        "-c", 'model="gpt-6-sol"', "-c", 'model_reasoning_effort="high"', "-c", 'service_tier="default"',
        "-o", str(d / "final.md"), prompt], stdin=subprocess.DEVNULL, stdout=open(d / "log.txt", "w"),
        stderr=subprocess.STDOUT, start_new_session=True)
    log(f"launch {d.name} {len(batch)} pages")
for k, p in running.items():
    p.wait(); log(f"finish {k} rc={p.returncode}")
log("exit")
