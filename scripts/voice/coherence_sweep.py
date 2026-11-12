#!/usr/bin/env python3
"""Coherence sweep driver (STYLE.md section 14, "Point first"), one batch at a time, for WARWIKI or WHITWIKI.

    python3 scripts/voice/coherence_sweep.py --root REPO select  NAME N   # pick N not-yet-swept clean pages
    python3 scripts/voice/coherence_sweep.py --root REPO rewrite NAME     # Codex author + verifier, check, apply
    python3 scripts/voice/coherence_sweep.py --root REPO gate    NAME     # claim gate on final text (up to 3 rounds)
    python3 scripts/voice/coherence_sweep.py --root REPO publish NAME "message"

Work dirs live in the repo's gitignored run folder (WARWIKI reports/audit-v2/sources-local/, WHITWIKI reviews/runs/).
Pages swept are recorded in <runs>/coherence-done.json, so `select` never repeats a page. `gate` reverts any page
whose claims still fail after three rounds (listed in NAME/reverted.json). `publish` stages only the batch's pages and
the batch's own claim-ledger entries, so other sessions' uncommitted work in the same checkout is never committed.
"""
import glob, json, os, re, subprocess, sys

ARGS = sys.argv[1:]
ROOT = os.path.abspath(ARGS[ARGS.index("--root") + 1]) if "--root" in ARGS else \
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if "--root" in ARGS:
    i = ARGS.index("--root"); del ARGS[i:i + 2]
WHIT = "whitwiki" in ROOT.lower()
RUNS = "reviews/runs" if WHIT else "reports/audit-v2/sources-local"
LEDGER = "reviews/claims-ledger.json" if WHIT else "reports/audit-v2/claims-ledger.json"
LINTS = ["lint:citations", "lint:orphans", "lint:figures"] + ([] if WHIT else ["lint:scope", "lint:links", "lint:ref-dupes"])
HERE = os.path.dirname(os.path.abspath(__file__))
DONE = os.path.join(ROOT, RUNS, "coherence-done.json")


def sh(cmd, env=None, check=False, quiet=False):
    e = dict(os.environ, **(env or {}))
    r = subprocess.run(cmd, cwd=ROOT, shell=isinstance(cmd, str), env=e, capture_output=True, text=True)
    if not quiet:
        print((r.stdout + r.stderr).strip()[-3000:], flush=True)
    if check and r.returncode:
        sys.exit(f"failed: {cmd}")
    return r


def wd(name, suffix=""):
    return os.path.join(RUNS, name + suffix)


def load(p, d):
    p = os.path.join(ROOT, p) if not os.path.isabs(p) else p
    return json.load(open(p)) if os.path.exists(p) else d


def dump(p, x):
    json.dump(x, open(os.path.join(ROOT, p), "w"), indent=1)


def touched(name):
    a = load(os.path.join(wd(name), "applied.json"), {})
    return sorted({v["page"] for v in a.values() if str(v.get("status", "")).startswith("applied")})


def fill_agree_edits(work):
    """A verifier sometimes agrees without copying the edit: take it from the author's finding."""
    fd = {}
    for f in glob.glob(os.path.join(ROOT, work, "findings", "*.jsonl")):
        for l in open(f):
            if l.strip():
                try:
                    x = json.loads(l); fd[x.get("claim_id")] = x
                except Exception:
                    pass
    for f in glob.glob(os.path.join(ROOT, work, "verdicts", "*.jsonl")):
        out = []
        for l in open(f):
            if not l.strip():
                continue
            try:
                v = json.loads(l)
            except Exception:
                continue
            if v.get("verdict") == "agree" and not v.get("edit") and v.get("claim_id") in fd:
                v["edit"] = fd[v["claim_id"]].get("edit")
            out.append(json.dumps(v))
        open(f, "w").write("\n".join(out) + "\n")


def orchestrate(work, *extra):
    sh(["python3", "scripts/review/orchestrate.py", "--work", work, "--claims", *extra, "--effort", "high", "--tier", "default"])


def select(name, n):
    done = set(load(DONE, []))
    skip = os.path.join(ROOT, RUNS, "coherence-skip.tmp.json")
    json.dump(sorted(done), open(skip, "w"))
    sh(["python3", os.path.join(HERE, "coherence_extract.py"), "--root", ROOT, "--exclude-modified", "--skip-file", skip,
        "--limit", str(n), "--out", os.path.join(ROOT, wd(name))], check=True)


def rewrite(name):
    w = wd(name)
    orchestrate(w, "--brief", "coherence", "--verify-brief", "coherence-verify", "--reviewers", "4", "--verifiers", "2")
    fill_agree_edits(w)
    env = {"REVIEW_WORK": w}
    bad = sh(["python3", os.path.join(HERE, "coherence_check.py"), "--root", ROOT], env=env).stdout.split()
    sh(["python3", "scripts/review/apply.py", "list"], env=env)
    sh(["python3", "scripts/review/apply.py", "apply"] + (["--skip", *bad] if bad else []), env=env)
    t = touched(name)
    dump(os.path.join(w, "touched.json"), t)
    pages = [json.load(open(f))["page"] for f in glob.glob(os.path.join(ROOT, w, "batches", "*.json"))]
    print(f"rewrite {name}: {len(pages)} pages reviewed, {len(t)} changed, {len(bad)} edits failed the mechanical check")


def gate_fails(pages):
    if not pages:
        return []
    r = sh(["python3", "scripts/review/gate.py", "check", *pages], quiet=True)
    return sorted({m.group(1) for m in re.finditer(r"^(docs/\S+\.mdx):\d+:", r.stdout + r.stderr, re.M)})


def gate(name):
    t = load(os.path.join(wd(name), "touched.json"), [])
    for k in range(1, 4):
        fails = gate_fails(t)
        print(f"gate round {k}: {len(fails)} of {len(t)} pages have failing claims", flush=True)
        if not fails:
            break
        g = wd(name, f"-gate{k}")
        sh(["python3", "scripts/review/gate.py", "pending", "--out", g, *fails])
        dump(os.path.join(g, "touched.json"), t)
        orchestrate(g, "--reviewers", "2", "--verifiers", "1")
        sh(["python3", "scripts/review/gate.py", "record", g])
        env = {"REVIEW_WORK": g}
        sh(["python3", "scripts/review/apply.py", "list"], env=env)
        sh(["python3", "scripts/review/apply.py", "apply"], env=env)
        sh(["python3", "scripts/review/gate.py", "record", g])
    fails = gate_fails(t)
    if fails:
        for p in fails:
            sh(["git", "checkout", "--", p])
        dump(os.path.join(wd(name), "reverted.json"), fails)
        print(f"reverted {len(fails)} pages whose claims still fail: {fails}")


def publish(name, msg):
    t = [p for p in load(os.path.join(wd(name), "touched.json"), []) if p not in load(os.path.join(wd(name), "reverted.json"), [])]
    t = [p for p in t if sh(["git", "diff", "--quiet", "--", p], quiet=True).returncode]
    pages = [json.load(open(f))["page"] for f in glob.glob(os.path.join(ROOT, wd(name), "batches", "*.json"))]
    if t:
        if gate_fails(t):
            sys.exit("claim gate fails on touched pages: not publishing")
        for s in LINTS:
            if sh(["npm", "run", "-s", s], quiet=True).returncode:
                print(sh(["npm", "run", "-s", s], quiet=True).stdout[-2000:]); sys.exit(f"{s} fails: not publishing")
        b = sh(["npm", "run", "build"], quiet=True)
        sh(["git", "checkout", "--", "src/data/stats.json"], quiet=True)
        if b.returncode:
            print((b.stdout + b.stderr)[-3000:]); sys.exit("build fails: not publishing")
        sh(["git", "diff", "--check", "--", *t], check=True)
        # stage the ledger as HEAD plus this batch's own entries
        head = json.loads(sh(["git", "show", f"HEAD:{LEDGER}"], quiet=True).stdout)
        cur = load(LEDGER, {})
        mine = {k: v for k, v in cur.items() if f'"run": "{name}' in json.dumps(v)}
        head.update(mine)
        tmp = os.path.join(ROOT, RUNS, name, "ledger-staged.json")
        json.dump(head, open(tmp, "w"), indent=0, sort_keys=True)
        blob = sh(["git", "hash-object", "-w", tmp], quiet=True).stdout.strip()
        sh(["git", "update-index", "--cacheinfo", f"100644,{blob},{LEDGER}"], check=True)
        sh(["git", "add", "--", *t], check=True)
        sh(["git", "commit", "-q", "-m", msg + "\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"], check=True)
        sh(["git", "push", "-q", "origin", "main"])
        print(f"published {len(t)} pages, {len(mine)} ledger entries")
    done = set(load(DONE, [])) | set(pages)
    json.dump(sorted(done), open(DONE, "w"), indent=0)


if __name__ == "__main__":
    cmd, name = ARGS[0], ARGS[1]
    {"select": lambda: select(name, int(ARGS[2])), "rewrite": lambda: rewrite(name), "gate": lambda: gate(name),
     "publish": lambda: publish(name, ARGS[2])}[cmd]()
