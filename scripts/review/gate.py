#!/usr/bin/env python3
"""Pre-publication claim gate: every number and absolute statement must be verified before it is published.

The ledger (reports/audit-v2/claims-ledger.json) records each verified claim by a hash of its page and
normalized text, with status, source and date. The baseline (reports/audit-v2/claims-baseline.json) lists
claims that existed before the gate and are still being worked through (uncited numbers, unchecked absolutes).
A claim that is in neither file is NEW or CHANGED and fails the gate.

  python3 scripts/review/gate.py check [FILES...]        exit 1 if any claim is unverified (default: all pages)
  python3 scripts/review/gate.py pending [--include-baseline] [FILES...]  write the unverified claims as claim-check batches
                                                         (then: orchestrate.py --work <dir> --claims; apply; cycle)
  python3 scripts/review/gate.py record WORKDIR          add verified claims from a finished check run to the ledger
  python3 scripts/review/gate.py baseline                (one-off) put every currently unverified claim in the baseline
  python3 scripts/review/gate.py stats

Claim kinds: "number" (a statistic: %, n/N, OR/HR/RR, CI, n =, mean/median value, durations and sizes) and
"absolute" (always, never, contraindicated, eliminates, no risk, all/every patient(s), the only, gold standard,
safest, guarantees, invariably, mandatory, impossible, proven, definitive, first-line, standard of care),
excluding negated hedges such as "is not a universal rule" or "cannot establish".
"""
import hashlib, json, os, re, sys, glob, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import claims as C  # noqa: E402

LEDGER = os.path.join(ROOT, "reports/audit-v2/claims-ledger.json")
BASELINE = os.path.join(ROOT, "reports/audit-v2/claims-baseline.json")
SECTIONS = ["01", "02", "03", "04", "05", "07", "08"]
ABS = re.compile(r"\b(always|never|contraindicat\w*|eliminat\w+|no risk|zero risk|all patients|every patient|the only|"
                 r"gold standard|safest|guarantee\w*|invariabl\w+|universal(?:ly)?|mandatory|impossible|proven|"
                 r"absolute(?:ly)?|definitive(?:ly)?|first-line|standard of care)\b", re.I)
HEDGE = re.compile(r"\b(?:not|no|nor|neither|cannot|can't|does not|do not|did not|is not|are not|was not|without|unproven|un)\b[\w\s,-]{0,25}$", re.I)
STRONG = re.compile(r"\d(?:[\d.,]*)\s?%|\b\d+\s?/\s?\d+\b|\b(?:OR|HR|RR|IRR|aOR|aHR)\b|\bCI\b|\bn\s?=\s?\d|"
                    r"\b(?:mean|median)\b[^.|]{0,40}\d")


def norm(t):
    t = re.sub(r"<sup>.*?</sup>", "", t)
    t = C.CITE.sub("", t)
    t = re.sub(r"\[\d+(?:[,–-]\s?\d+)*\]", "", t)
    t = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = t.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")
    t = re.sub(r"[*_`]", "", t)
    return re.sub(r"\s+", " ", t).strip(" -|.;:").lower()


def key(page, text):
    return hashlib.sha1((page + "|" + norm(text)).encode()).hexdigest()[:16]


def is_absolute(text):
    plain = C.CITE.sub("", text)
    for m in ABS.finditer(plain):
        if not HEDGE.search(plain[:m.start()][-40:]):
            return True
    return False


def units_of(path):
    """Every sentence or table row on the page that states a number or an absolute; with its cited refs."""
    s = open(os.path.join(ROOT, path)).read()
    refs = C.refs_of(s)
    body = s.split("\n## References")[0]
    out, header, in_fm, in_code, tcites = [], None, False, False, set()
    lines = body.split("\n")
    for i, line in enumerate(lines, 1):
        if i == 1 and line.strip() == "---":
            in_fm = True; continue
        if in_fm:
            if line.strip() == "---": in_fm = False
            continue
        if line.strip().startswith("```"):
            in_code = not in_code; continue
        if in_code or line.lstrip().startswith(("import ", "export ", "<VideoCards", "![", "#")):
            continue
        if line.startswith("|"):
            if i == 1 or not lines[i - 2].startswith("|"):
                header = line
                j = i - 1  # table citations: any row, plus the paragraph just above the table
                while j < len(lines) and lines[j].startswith("|"):
                    j += 1
                tcites = {int(x or y) for x, y in C.CITE.findall("\n".join(lines[max(0, i - 4):j]))}
            if re.match(r"^\|[\s:|-]+\|?$", line) or line == header:
                continue
            us, ctx = [line], header
        else:
            us, ctx = C.sentences(line), None
        for u in us:
            plain = C.CITE.sub("", u)
            kinds = []
            if STRONG.search(plain) or (C.STAT.search(plain) and C.CITE.search(u)):
                kinds.append("number")
            if is_absolute(u):
                kinds.append("absolute")
            if not kinds or not norm(u):
                continue
            nums = sorted({int(a or b) for a, b in C.CITE.findall(u)})
            inherited = False
            if not nums:  # cited at paragraph or table level rather than on the sentence or row itself
                nums = sorted(tcites if line.startswith("|") else {int(x or y) for x, y in C.CITE.findall(line)})
                inherited = bool(nums)
            out.append({"line": i, "text": u.strip(), "table_header": ctx, "kinds": kinds, "key": key(path, u),
                        "cite": "paragraph" if inherited else ("own" if nums else "none"),
                        "refs": [{"n": n, "text": refs.get(n, "(reference not found on page)")} for n in nums]})
    return out


def load(p, default):
    return json.load(open(p)) if os.path.exists(p) else default


def targets(args):
    return [os.path.relpath(os.path.abspath(a), ROOT) for a in args if a.endswith(".mdx")] or C.pages(SECTIONS)


def unverified(pages, include_baseline=False):
    led = load(LEDGER, {})
    base = set() if include_baseline else set(load(BASELINE, []))
    bad = []
    for p in pages:
        if not os.path.exists(os.path.join(ROOT, p)):
            continue
        for u in units_of(p):
            if u["key"] not in led and u["key"] not in base:
                bad.append((p, u))
    return bad


def main():
    a = sys.argv[1:]
    cmd = a[0] if a else "check"
    if cmd == "check":
        bad = unverified(targets(a[1:]))
        for p, u in bad[:200]:
            print(f"{p}:{u['line']}: unverified {'+'.join(u['kinds'])}: {norm(u['text'])[:140]}")
        if bad:
            print(f"\nClaim gate: {len(bad)} new or changed claim(s) are not verified. Run "
                  "`python3 scripts/review/gate.py pending <files>` and the Codex check (see scripts/review/gate.py), "
                  "or ask Claude to run the gate.", file=sys.stderr)
            sys.exit(1)
        print("Claim gate: all numbers and absolute statements are verified or baselined.")
    elif cmd == "pending":
        out = os.path.join(ROOT, "reports/audit-v2/sources-local/gate-" + datetime.date.today().isoformat())
        os.makedirs(os.path.join(out, "batches"), exist_ok=True)
        bypage = {}
        for p, u in unverified(targets([x for x in a[1:] if x != "--include-baseline"]), "--include-baseline" in a):
            bypage.setdefault(p, []).append(u)
        units, cur, n = [], [], 0
        def flush():
            nonlocal_cur = cur[:]
            if not nonlocal_cur:
                return
            uid = f"claims/g{len(units) + 1:04d}__" + nonlocal_cur[0]["page"][len("docs/"):-len(".mdx")].replace("/", "__")[:80]
            for j, u in enumerate(nonlocal_cur):
                u["id"] = f"{uid.split('/', 1)[1]}#{j + 1}"
            json.dump({"page": nonlocal_cur[0]["page"], "claims": nonlocal_cur}, open(os.path.join(out, "batches", uid.split("/", 1)[1] + ".json"), "w"), indent=1)
            units.append(uid)
            cur.clear()
        for p, us in bypage.items():  # pack neighbouring pages into batches of about 30 claims
            if cur and len(cur) + len(us) > 30:
                flush()
            for u in us:
                u["page"] = p
                cur.append(u)
                if len(cur) >= 40:
                    flush()
        flush()
        json.dump(units, open(os.path.join(out, "units.json"), "w"), indent=1)
        print(f"{sum(len(v) for v in bypage.values())} unverified claims on {len(bypage)} pages -> {out} ({len(units)} batches)")
        print(f"next: nohup python3 scripts/review/orchestrate.py --work {os.path.relpath(out, ROOT)} --claims --effort high --tier default &")
    elif cmd == "record":
        work = os.path.join(ROOT, a[1])
        led = load(LEDGER, {})
        today = datetime.date.today().isoformat()
        claims_by_id = {}
        for b in glob.glob(os.path.join(work, "batches", "*.json")):
            d = json.load(open(b))
            for c in d["claims"]:
                claims_by_id[c["id"]] = (d["page"], c)
        n = 0
        for f in glob.glob(os.path.join(work, "status", "*.jsonl")):
            for line in open(f):
                try:
                    r = json.loads(line)
                except Exception:
                    continue
                if r.get("claim_id") not in claims_by_id:
                    continue
                p, c = claims_by_id[r["claim_id"]]
                p = c.get("page", p)
                cur = {u["key"] for u in units_of(p)} if os.path.exists(os.path.join(ROOT, p)) else set()
                k = key(p, c["text"])
                if r.get("status") in ("ok", "style") and k in cur:
                    led[k] = {"s": r["status"], "src": (r.get("source_opened") or "")[:160], "q": (r.get("quote") or "")[:300], "d": today}; n += 1
                elif r.get("status") == "unverifiable" and k in cur:
                    led[k] = {"s": "source-needed", "src": (r.get("source_opened") or "")[:160], "d": today}; n += 1
        # checker said error but the adversarial verifier rejected the finding: the claim stands as verified
        findings = {}
        for ff in glob.glob(os.path.join(work, "findings", "*.jsonl")):
            for line in open(ff):
                try:
                    r = json.loads(line)
                except Exception:
                    continue
                findings[(r.get("page"), (r.get("finding") or "")[:120])] = r
        for vf in glob.glob(os.path.join(work, "verdicts", "*.jsonl")):
            for line in open(vf):
                try:
                    v = json.loads(line)
                except Exception:
                    continue
                r = findings.get((v.get("page"), (v.get("finding") or "")[:120]))
                if v.get("verdict") != "reject" or not r or r.get("claim_id") not in claims_by_id:
                    continue
                p, c = claims_by_id[r["claim_id"]]
                p = c.get("page", p)
                k = key(p, c["text"])
                if os.path.exists(os.path.join(ROOT, p)) and k in {u["key"] for u in units_of(p)}:
                    led[k] = {"s": "ok-verifier", "src": (v.get("reason") or "")[:160], "d": today}; n += 1
        # claims rewritten by applied, verified edits count as verified in their new form
        applied = load(os.path.join(work, "applied.json"), {})
        for vf in glob.glob(os.path.join(work, "verdicts", "*.jsonl")):
            for line in open(vf):
                try:
                    v = json.loads(line)
                except Exception:
                    continue
                e = v.get("edit") or {}
                if not e.get("new"):
                    continue
                import apply as A  # noqa: E402
                if not str(applied.get(A.fid(v), {}).get("status", "")).startswith("applied"):
                    continue
                p = v["page"]
                if not os.path.exists(os.path.join(ROOT, p)):
                    continue
                newn = norm(e["new"])
                import difflib
                for u in units_of(p):
                    nu = norm(u["text"])
                    if not nu or u["key"] in led:
                        continue
                    m = difflib.SequenceMatcher(None, nu, newn, autojunk=False).find_longest_match(0, len(nu), 0, len(newn))
                    if nu in newn or newn in nu or m.size >= min(60, 0.5 * len(nu)):
                        led[u["key"]] = {"s": "fixed", "src": (v.get("reason") or "")[:160], "d": today}; n += 1
        json.dump(led, open(LEDGER, "w"), indent=0, sort_keys=True)
        print(f"recorded {n} verified claims; ledger has {len(led)}")
    elif cmd == "baseline":
        bad = unverified(C.pages(SECTIONS))
        base = sorted(set(load(BASELINE, [])) | {u["key"] for _, u in bad})
        json.dump(base, open(BASELINE, "w"), indent=0)
        print(f"baseline: {len(base)} claims")
    elif cmd == "stats":
        led, base = load(LEDGER, {}), set(load(BASELINE, []))
        from collections import Counter
        tot, kinds = Counter(), Counter()
        for p in C.pages(SECTIONS):
            for u in units_of(p):
                st = led.get(u["key"], {}).get("s") or ("baseline" if u["key"] in base else "unverified")
                tot[st] += 1
                for k in u["kinds"]:
                    kinds[(k, st)] += 1
        print(dict(tot)); print(dict(kinds))


if __name__ == "__main__":
    main()
