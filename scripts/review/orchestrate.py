#!/usr/bin/env python3
"""Full-site second review: keep Codex reviewer and verifier agents busy until every page is reviewed and verified.

Usage: nohup python3 scripts/review/orchestrate.py [--reviewers 8] [--verifiers 3] > WORK/orchestrator.out 2>&1 &
State, findings and verdicts live in reports/audit-v2/sources-local/full-review/ (gitignored); the script resumes
from state.json if restarted. Reviewers and verifiers are read-only on the repo and write only to their job folders.
Touch WORK/STOP to stop launching new jobs (running jobs finish).
"""
import json, os, re, subprocess, sys, time, glob, shutil, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ARGV = sys.argv[1:]
WORK = os.path.join(ROOT, ARGV[ARGV.index("--work") + 1]) if "--work" in ARGV else os.path.join(ROOT, "reports/audit-v2/sources-local/full-review")
ONLY = json.load(open(os.path.join(ROOT, ARGV[ARGV.index("--pages") + 1]))) if "--pages" in ARGV else None  # sample run: fixed page list
FULL_BRIEF = "--full-brief" in ARGV  # use the full reviewer brief for every tier
CLAIMS = "--claims" in ARGV
REVIEW_BRIEF = ARGV[ARGV.index("--brief") + 1] if "--brief" in ARGV else "claims"          # claims mode: which brief file key
VERIFY_BRIEF = ARGV[ARGV.index("--verify-brief") + 1] if "--verify-brief" in ARGV else "verify"  # claim-level check: units are claim batches in WORK/batches (scripts/review/claims.py extract)
BRIEFS = (("full", "reviewer-brief.md"), ("light", "reviewer-brief-light.md"), ("verify", "verifier-brief.md"), ("claims", "claim-checker-brief.md"), ("decide", "claim-decision-brief.md"),
          ("voice", "voice-brief.md"), ("voice-verify", "voice-verifier-brief.md"))


def brief(k):
    return open(os.path.join(ROOT, "scripts/review", dict(BRIEFS)[k])).read()
ARGS = sys.argv[1:]
NR = int(ARGS[ARGS.index("--reviewers") + 1]) if "--reviewers" in ARGS else 8
NV = int(ARGS[ARGS.index("--verifiers") + 1]) if "--verifiers" in ARGS else 3
PAGES_PER_REVIEW, PAGES_PER_VERIFY, TIMEOUT = 2, 4, 120 * 60
EFFORT = ARGS[ARGS.index("--effort") + 1] if "--effort" in ARGS else "high"   # A/B Oct 3: high keeps ~75-80% of ultra yield at ~half the tokens
TIER = ARGS[ARGS.index("--tier") + 1] if "--tier" in ARGS else "default"
MODEL = ARGS[ARGS.index("--model") + 1] if "--model" in ARGS else "gpt-6-sol"  # pinned: the global default can change under a run     # no priority surcharge
PILOT = os.path.join(ROOT, "reports/2026-10-03/full-review-pilot")


def log(msg):
    line = f"{datetime.datetime.now():%m-%d %H:%M:%S} {msg}"
    print(line, flush=True)
    open(os.path.join(WORK, "orchestrator.log"), "a").write(line + "\n")


def slug(p):
    if p.startswith("claims/"):
        return p[len("claims/"):]
    return p[len("docs/"):-len(".mdx")].replace("/", "__")


def page_list():
    q = json.load(open(os.path.join(ROOT, "reports/audit-v2/queue.json")))["pages"]
    items = q if isinstance(q, list) else [dict(file=k, **v) for k, v in q.items()]
    tier = {(i["file"] if i["file"].startswith("docs/") else "docs/" + i["file"]): i["tier"] for i in items}
    pages = [os.path.relpath(p, ROOT) for p in glob.glob(os.path.join(ROOT, "docs/**/*.mdx"), recursive=True)]
    pages = [p for p in pages if not p.endswith("index.mdx") and "/07-roots/surgeons/" not in p and not os.path.basename(p).startswith("_")]
    order = {1: 0, 2: 1, 3: 2, 4: 3}
    return sorted(pages, key=lambda p: (order.get(tier.get(p, 3), 2), p)), tier


def load_state():
    path = os.path.join(WORK, "state.json")
    if os.path.exists(path):
        return json.load(open(path))
    if CLAIMS:
        units = json.load(open(os.path.join(WORK, "units.json")))
        st = {"pages": {u: {"status": "pending", "tier": 3, "tries": 0} for u in units}, "jobs": {}, "n": 0}
        for sub in ("findings", "verdicts", "status"):
            os.makedirs(os.path.join(WORK, sub), exist_ok=True)
        return st
    pages, tier = page_list()
    if ONLY is not None:
        pages = [p for p in pages if p in set(ONLY)]
    st = {"pages": {p: {"status": "pending", "tier": tier.get(p, 3), "tries": 0} for p in pages}, "jobs": {}, "n": 0}
    os.makedirs(os.path.join(WORK, "findings"), exist_ok=True)
    os.makedirs(os.path.join(WORK, "verdicts"), exist_ok=True)
    for f in ([] if ONLY is not None else glob.glob(os.path.join(PILOT, "*.jsonl"))):  # pilot pages: reviewed already
        rows = [json.loads(l) for l in open(f) if l.strip()]
        if rows and rows[0]["page"] in st["pages"]:
            p = rows[0]["page"]
            shutil.copy(f, os.path.join(WORK, "findings", slug(p) + ".jsonl"))
            st["pages"][p]["status"] = "reviewed"
    return st


def save(st):
    tmp = os.path.join(WORK, "state.json.tmp")
    json.dump(st, open(tmp, "w"), indent=1)
    os.replace(tmp, os.path.join(WORK, "state.json"))


def launch(st, kind, pages):
    st["n"] += 1
    jid = f"{kind[0]}{st['n']:04d}"
    d = os.path.join(WORK, "jobs", jid)
    os.makedirs(d, exist_ok=True)
    if kind == "review" and CLAIMS:
        u = pages[0]
        prompt = (brief(REVIEW_BRIEF) + f"\n\nINPUT: {os.path.join(WORK, 'batches', slug(u) + '.json')}\nslug: {slug(u)}\nOUTPUT_DIR: {d}\n")
    elif kind == "review":
        b = brief("light" if not FULL_BRIEF and all(st["pages"][p]["tier"] == 4 for p in pages) else "full")
        names = "\n".join(f"- {p}  ->  write OUTPUT_DIR/{slug(p)}.jsonl and OUTPUT_DIR/{slug(p)}.summary.md" for p in pages)
        prompt = (b.replace("OUTPUT_DIR/<page-basename>", "OUTPUT_DIR/<slug given below>")
                  + f"\n\nPAGES (review each fully, one after the other; use these exact output file names):\n{names}\nOUTPUT_DIR: {d}\n")
    else:
        files = "\n".join(f"- {os.path.join(WORK, 'findings', slug(p) + '.jsonl')}" for p in pages)
        prompt = brief(VERIFY_BRIEF) + f"\n\nINPUT finding files:\n{files}\nOUTPUT: {os.path.join(d, 'verdicts.jsonl')}\n"
    open(os.path.join(d, "prompt.md"), "w").write(prompt)
    proc = subprocess.Popen(["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", d,
                             "-c", f'model="{MODEL}"', "-c", f'model_reasoning_effort="{EFFORT}"', "-c", f'service_tier="{TIER}"',
                             "-o", os.path.join(d, "final.md"), prompt],
                            stdin=subprocess.DEVNULL, stdout=open(os.path.join(d, "log.txt"), "w"), stderr=subprocess.STDOUT,
                            start_new_session=True)
    st["jobs"][jid] = {"kind": kind, "pages": pages, "pid": proc.pid, "start": time.time(), "dir": d}
    for p in pages:
        st["pages"][p]["status"] = "reviewing" if kind == "review" else "verifying"
    log(f"launch {jid} {kind} {len(pages)} pages: {', '.join(slug(p) for p in pages)}")
    return proc


def finish(st, jid, ok):
    j = st["jobs"].pop(jid)
    d = j["dir"]
    for p in j["pages"]:
        ps = st["pages"][p]
        if j["kind"] == "review":
            f = os.path.join(d, slug(p) + ".jsonl")
            if os.path.exists(f):
                shutil.copy(f, os.path.join(WORK, "findings", slug(p) + ".jsonl"))
                sf = os.path.join(d, slug(p) + ".status.jsonl")
                if CLAIMS and os.path.exists(sf):
                    shutil.copy(sf, os.path.join(WORK, "status", slug(p) + ".status.jsonl"))
                rows = [l for l in open(f) if l.strip()]
                needs = any(json.loads(l).get("severity") in ("high", "medium") or json.loads(l).get("category") == "reference" for l in rows)
                ps["status"] = "reviewed" if needs else "done"
                ps["findings"] = len(rows)
            else:
                ps["tries"] += 1
                ps["status"] = "pending" if ps["tries"] < 2 else "failed"
        else:
            v = os.path.join(d, "verdicts.jsonl")
            if os.path.exists(v):
                ps["status"] = "done"
            else:
                ps["tries"] += 1
                ps["status"] = "reviewed" if ps["tries"] < 3 else "failed"
    if j["kind"] == "verify" and os.path.exists(os.path.join(d, "verdicts.jsonl")):
        shutil.copy(os.path.join(d, "verdicts.jsonl"), os.path.join(WORK, "verdicts", jid + ".jsonl"))
    log(f"finish {jid} {j['kind']} ok={ok} minutes={(time.time() - j['start']) / 60:.0f}")


class Orphan:
    """Stand-in for Popen for a job started by a previous orchestrator run."""
    def __init__(self, pid):
        self.pid, self.returncode = pid, None

    def poll(self):
        try:
            os.kill(self.pid, 0); return None
        except OSError:
            self.returncode = 0; return 0


def main():
    os.makedirs(WORK, exist_ok=True)
    st = load_state()
    procs = {}
    for jid, j in list(st["jobs"].items()):  # restart: adopt jobs whose codex process is still alive
        try:
            os.kill(j["pid"], 0); procs[jid] = Orphan(j["pid"]); log(f"adopt running job {jid}")
        except OSError:
            log(f"stale job {jid}; collect output")
            finish(st, jid, True)
    save(st)
    while True:
        for jid, proc in list(procs.items()):
            j = st["jobs"][jid]
            if proc.poll() is not None:
                finish(st, jid, proc.returncode == 0); procs.pop(jid)
            elif time.time() - j["start"] > TIMEOUT:
                try: os.killpg(proc.pid, 9)
                except Exception: pass
                log(f"timeout {jid}"); finish(st, jid, False); procs.pop(jid)
        stop = os.path.exists(os.path.join(WORK, "STOP"))
        if not stop:
            nr = sum(1 for j in st["jobs"].values() if j["kind"] == "review")
            nv = sum(1 for j in st["jobs"].values() if j["kind"] == "verify")
            pend = [p for p, s in st["pages"].items() if s["status"] == "pending"]
            while nr < NR and pend:
                batch = []
                t = st["pages"][pend[0]]["tier"]
                while pend and len(batch) < (1 if CLAIMS else PAGES_PER_REVIEW) and (st["pages"][pend[0]]["tier"] == 4) == (t == 4):
                    batch.append(pend.pop(0))
                jp = launch(st, "review", batch); procs[f"r{st['n']:04d}"] = jp; nr += 1
            ready = [p for p, s in st["pages"].items() if s["status"] == "reviewed"]
            while nv < NV and ready and (len(ready) >= PAGES_PER_VERIFY or not pend):
                batch, ready = ready[:PAGES_PER_VERIFY], ready[PAGES_PER_VERIFY:]
                jp = launch(st, "verify", batch); procs[f"v{st['n']:04d}"] = jp; nv += 1
        save(st)
        counts = {}
        for s in st["pages"].values():
            counts[s["status"]] = counts.get(s["status"], 0) + 1
        open(os.path.join(WORK, "progress.json"), "w").write(json.dumps({"time": time.time(), "counts": counts, "running": len(procs)}))
        if not procs and (stop or all(s["status"] in ("done", "failed") for s in st["pages"].values())):
            log(f"exit {counts}"); break
        time.sleep(20)


if __name__ == "__main__":
    main()
