#!/usr/bin/env python3
"""Pre-publication claim gate (schema 2, October 6, 2026): every number, dose, guideline statement and absolute
statement must carry a verdict that supports it, bound to its exact wording, its cited sources and its table header.

The ledger (reports/audit-v2/claims-ledger.json) maps a v2 binding key to a status and its check history. The key
hashes the page, the normalized claim text, the identity of every cited reference (DOI, else PMID, else the
normalized reference line, so renumbering keeps the binding and a citation swap breaks it), the table header and the
schema version. Formatting-only edits (emphasis, spacing, case, HTML entities) keep the key. The schema 1 ledger is
frozen in reports/audit-v2/claims-ledger-v1.json; `migrate` carried its entries over with explicit legacy statuses.

Statuses and what the gate does with them:
  verified-supported    a reviewer opened a source that supports the claim       pass (high-risk: needs 2 independent checks)
  verified-corrected    applied correction re-checked in its final text          pass
  not-applicable        operative teaching / technique wording, no factual claim  pass (never for dose or guideline claims)
  corrected-unconfirmed an applied correction not yet re-checked in final text   FAIL
  source-needed         no source could be opened                                 pass with warning; high-risk FAILS
  legacy-*              schema 1 records carried over; content unchanged since    pass, reported as NOT verified
High-risk claims are doses, guideline/regulatory statements and contraindications. A failing claim passes only with an
unexpired owner decision in reports/audit-v2/claim-exceptions.json ({key: {owner, decision, expires: YYYY-MM-DD}}).
There is no bulk baseline: `baseline` refuses.

  python3 scripts/review/gate.py check [FILES...]        exit 1 if any claim fails (default: all pages)
  python3 scripts/review/gate.py pending [--kind K] [--recheck] [--legacy] [--challenge RATE] [--seed S] [--out DIR] [FILES...]
        write failing claims as claim-check batches; --legacy adds legacy-unverified high-risk claims; --challenge adds a
        random share of passing verified-supported claims for an independent challenge; --recheck adds every claim
  python3 scripts/review/gate.py record WORKDIR          record a finished, validated check run (see orchestrate.py)
  python3 scripts/review/gate.py stats [--json]          counts by status and kind (what is verified vs carried over)
  python3 scripts/review/gate.py migrate                 (one-off) schema 1 -> 2; writes the migration summary

Claim kinds: "dose", "guideline", "number" and "absolute" (see the regular expressions below), excluding negated
hedges such as "is not a universal rule". Lines inside JSX components, imports and figures are not extracted; those
surfaces are listed for manual review in reports/quality/coverage-matrix.md.
"""
import hashlib, json, os, re, sys, glob, datetime, random

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import claims as C  # noqa: E402

SCHEMA = 2
LEDGER = os.path.join(ROOT, "reports/audit-v2/claims-ledger.json")
LEDGER_V1 = os.path.join(ROOT, "reports/audit-v2/claims-ledger-v1.json")
BASELINE = os.path.join(ROOT, "reports/audit-v2/claims-baseline.json")
EXCEPTIONS = os.path.join(ROOT, "reports/audit-v2/claim-exceptions.json")
SECTIONS = ["01", "02", "03", "04", "05", "07", "08"]
ABS = re.compile(r"\b(always|never|contraindicat\w*|eliminat\w+|no risk|zero risk|all patients|every patient|the only|"
                 r"gold standard|safest|guarantee\w*|invariabl\w+|universal(?:ly)?|mandatory|impossible|proven|"
                 r"absolute(?:ly)?|definitive(?:ly)?|first-line|standard of care)\b", re.I)
HEDGE = re.compile(r"\b(?:not|no|nor|neither|cannot|can't|does not|do not|did not|is not|are not|was not|without|unproven|un)\b[\w\s,-]{0,25}$", re.I)
DOSE = re.compile(r"\b\d+(?:\.\d+)?\s?(?:mg|mcg|µg|mL|U|IU|units|mg/kg|mL/kg|mg/day|mg/m2|mmol)\b")
GUIDE = re.compile(r"\b(AUA|EAU|NICE|ACOG|AUGS|SUFU|ICS|IUGA|WHO|ASCRS|BAUS|CUA|SIU|ESGO|RCOG|WPATH|AAGL|ACR|IDSA|CDC|FDA|ISSVD|GURS|SMSNA|ICSM|AAST|ACS|EAST|WSES|ESSM)\b[^.|]{0,80}\b("
                   r"recommend\w*|suggest\w*|advis\w*|endorse\w*|Strong|Moderate|Conditional|Expert Opinion|Clinical Principle|"
                   r"weak|Grade [A-C]|approv\w*|clear\w*|contraindicat\w*|indicat\w*|label\w*)", re.I)
STRONG = re.compile(r"\d(?:[\d.,]*)\s?%|\b\d+\s?/\s?\d+\b|\b(?:OR|HR|RR|IRR|aOR|aHR)\b|\bCI\b|\bn\s?=\s?\d|"
                    r"\b(?:mean|median)\b[^.|]{0,40}\d")
CONTRA = re.compile(r"contraindicat", re.I)
DOI = re.compile(r"\b10\.\d{4,9}/[^\s\])>\"']+", re.I)
PMID = re.compile(r"\bPMID:?\s*(\d{5,9})\b", re.I)

SUPPORTED = {"verified-supported", "verified-corrected"}
PASS_LEGACY = {"legacy-supported", "legacy-fuzzy-fixed", "legacy-voice", "legacy-rejection-only",
               "legacy-source-needed", "legacy-not-applicable", "legacy-baseline"}
V1_MAP = {"ok": "legacy-supported", "fixed": "legacy-fuzzy-fixed", "voice": "legacy-voice",
          "ok-verifier": "legacy-rejection-only", "source-needed": "legacy-source-needed", "style": "legacy-not-applicable"}
NO_SOURCE = {"", "none", "n/a", "na", "null"}


def norm(t):
    t = re.sub(r"<sup>.*?</sup>", "", t)
    t = C.CITE.sub("", t)
    t = re.sub(r"\[\d+(?:[,–-]\s?\d+)*\]", "", t)
    t = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = t.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")
    t = re.sub(r"[*_`]", "", t)
    return re.sub(r"\s+", " ", t).strip(" -|.;:").lower()


def key1(page, text):
    """Schema 1 key (text only; citations and context were not bound). Kept for migration and history."""
    return hashlib.sha1((page + "|" + norm(text)).encode()).hexdigest()[:16]


def ref_identity(line):
    """Stable identity of a reference-list line: DOI, else PMID, else its normalized words (renumbering keeps it)."""
    if not line or line.startswith("(reference not found"):
        return "missing"
    m = DOI.search(line)
    if m:
        return "doi:" + m.group(0).rstrip(".,;").lower()
    m = PMID.search(line)
    if m:
        return "pmid:" + m.group(1)
    words = re.sub(r"[^a-z0-9]+", " ", norm(line)).strip()
    return "txt:" + hashlib.sha1(words.encode()).hexdigest()[:12]


def cells(t):
    """Table rows compare cell by cell, so spacing around the pipes is formatting, not meaning."""
    t = t or ""
    return "|".join(c.strip() for c in t.strip().strip("|").split("|")) if t.lstrip().startswith("|") else t


def key2(page, text, refs, header, section=""):
    """Binding key: claim wording + cited source identities + direct source links + table header + section heading
    + schema version. The same sentence under two headings (cystitis vs pyelonephritis) gets two bindings."""
    ids = sorted({ref_identity(r) for r in refs} | {"url:" + x.lower() for x in re.findall(r"\]\((https?://[^)\s]+)\)", text)})
    body = "|".join([page, norm(cells(text)), "refs:" + ",".join(ids), "hdr:" + norm(cells(header)),
                     "sec:" + norm(section or ""), f"schema:{SCHEMA}"])
    return "v2:" + hashlib.sha1(body.encode()).hexdigest()[:20]


def is_absolute(text):
    plain = C.CITE.sub("", text)
    for m in ABS.finditer(plain):
        if not HEDGE.search(plain[:m.start()][-40:]):
            return True
    return False


def high_risk(u):
    return "dose" in u["kinds"] or "guideline" in u["kinds"] or ("absolute" in u["kinds"] and bool(CONTRA.search(u["text"])))


def units_of(path):
    """Every sentence or table row on the page that states a number or an absolute; with its cited refs."""
    s = open(os.path.join(ROOT, path)).read()
    refs = C.refs_of(s)
    body = s.split("\n## References")[0]
    out, header, in_fm, in_code, tcites, section = [], None, False, False, set(), ""
    lines = body.split("\n")
    for i, line in enumerate(lines, 1):
        if i == 1 and line.strip() == "---":
            in_fm = True; continue
        if in_fm:
            if line.strip() == "---": in_fm = False
            continue
        if line.strip().startswith("```"):
            in_code = not in_code; continue
        if not in_code and re.match(r"#{2,4} ", line):
            section = line
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
            if DOSE.search(plain):
                kinds.append("dose")
            if GUIDE.search(plain):
                kinds.append("guideline")
            if not kinds or not norm(u):
                continue
            nums = sorted({int(a or b) for a, b in C.CITE.findall(u)})
            inherited = False
            if not nums:  # cited at paragraph or table level rather than on the sentence or row itself
                nums = sorted(tcites if line.startswith("|") else {int(x or y) for x, y in C.CITE.findall(line)})
                inherited = bool(nums)
            rl = [{"n": n, "text": refs.get(n, "(reference not found on page)")} for n in nums]
            unit = {"line": i, "text": u.strip(), "table_header": ctx, "kinds": kinds, "section": section,
                    "key": key2(path, u, [r["text"] for r in rl], ctx, section), "key1": key1(path, u),
                    "cite": "paragraph" if inherited else ("own" if nums else "none"), "refs": rl}
            unit["high_risk"] = high_risk(unit)
            out.append(unit)
    return out


def load(p, default):
    return json.load(open(p)) if os.path.exists(p) else default


def save_ledger(led):
    tmp = LEDGER + ".tmp"
    json.dump(led, open(tmp, "w"), indent=0, sort_keys=True)
    os.replace(tmp, LEDGER)


def targets(args):
    return [os.path.relpath(os.path.abspath(a), ROOT) for a in args if a.endswith(".mdx")] or C.pages(SECTIONS)


def independent_ok(e):
    """Number of distinct runs whose check opened a source and found support (or a verifier's explicit support)."""
    return len({c.get("run") for c in e.get("checks", []) if c.get("s") in ("ok", "verifier-supports")})


def verdict(u, e, exceptions, today=None):
    """(passes, reason) for one current claim unit and its ledger entry (or None)."""
    today = today or datetime.date.today().isoformat()
    x = exceptions.get(u["key"])
    if x and re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(x.get("expires", ""))) and x["expires"] >= today \
            and str(x.get("owner", "")).strip() and str(x.get("decision", "")).strip():
        return True, "owner-exception"
    if not e:
        return False, "new or changed claim; not verified"
    s = e.get("s")
    if s in PASS_LEGACY:
        return True, s
    if s in SUPPORTED:
        n = independent_ok(e)
        if n < 1:
            return False, "no supporting check on record"
        if u["high_risk"] and n < 2:
            return False, "high-risk claim needs a second independent check"
        return True, s
    if s == "not-applicable":
        if u["kinds"] != ["absolute"] or u["high_risk"]:
            return False, "only non-numeric, non-high-risk wording can be not-applicable"
        return True, s
    if s == "source-needed":
        return False, "new or changed claim without a source"
    if s == "flagged":
        return False, "open error finding; no supporting check"
    if s == "corrected-unconfirmed":
        return False, "applied correction not yet re-checked in its final text"
    return False, f"unknown status {s!r}"


def evaluate(pages, kind=None):
    led, exc = load(LEDGER, {}), load(EXCEPTIONS, {})
    rows = []
    for p in pages:
        if not os.path.exists(os.path.join(ROOT, p)):
            continue
        for u in units_of(p):
            if kind and kind not in u["kinds"]:
                continue
            ok, why = verdict(u, led.get(u["key"]), exc)
            rows.append((p, u, ok, why))
    return rows


def unverified(pages, kind=None):
    return [(p, u) for p, u, ok, _ in evaluate(pages, kind) if not ok]


def write_batches(out, bypage):
    os.makedirs(os.path.join(out, "batches"), exist_ok=True)
    units, cur = [], []

    def flush():
        if not cur:
            return
        uid = f"claims/g{len(units) + 1:04d}__" + cur[0]["page"][len("docs/"):-len(".mdx")].replace("/", "__")[:80]
        for j, u in enumerate(cur):
            u["id"] = f"{uid.split('/', 1)[1]}#{j + 1}"
        # the checker sees the claim, its kinds and its sources, never a prior verdict
        claims = [{k: u[k] for k in ("id", "page", "line", "text", "table_header", "kinds", "cite", "refs", "key")} for u in cur]
        json.dump({"page": cur[0]["page"], "claims": claims}, open(os.path.join(out, "batches", uid.split("/", 1)[1] + ".json"), "w"), indent=1)
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
    return units


def read_jsonl(path, errors):
    rows = []
    for n, line in enumerate(open(path), 1):
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except Exception:
            errors.append(f"{os.path.basename(path)}:{n}: not JSON")
    return rows


def record(work, today=None):
    """Record a check run. Support comes only from a check that opened a source; a rejected correction is not
    support for the original; applied edits become corrected-unconfirmed until a final-text check confirms them."""
    today = today or datetime.date.today().isoformat()
    run = os.path.basename(os.path.normpath(work))
    led = load(LEDGER, {})
    errors, claims_by_id, cur_units = [], {}, {}
    for b in glob.glob(os.path.join(work, "batches", "*.json")):
        d = json.load(open(b))
        for c in d["claims"]:
            if c["id"] in claims_by_id:
                sys.exit(f"duplicate claim id {c['id']} in {work}: refusing to record")
            claims_by_id[c["id"]] = c.get("page", d["page"]), c
    # only batches whose every claim has exactly one status line count (a partial or failed batch records nothing)
    status_rows = {}
    for f in glob.glob(os.path.join(work, "status", "*.jsonl")):
        for r in read_jsonl(f, errors):
            status_rows.setdefault(r.get("claim_id"), []).append(r)
    batch_of = lambda cid: cid.rsplit("#", 1)[0]
    complete = {}
    for cid in claims_by_id:
        b = batch_of(cid)
        complete[b] = complete.get(b, True) and len(status_rows.get(cid, [])) == 1

    def current(p):
        if p not in cur_units:
            cur_units[p] = {u["key"]: u for u in units_of(p)} if os.path.exists(os.path.join(ROOT, p)) else {}
        return cur_units[p]

    def bound(cid):
        """The claim's current unit if the page still has the exact claim the checker saw (same binding key)."""
        p, c = claims_by_id[cid]
        k = c.get("key")
        if not k or not k.startswith("v2:"):
            k = key2(p, c["text"], [r.get("text", "") for r in c.get("refs", [])], c.get("table_header"))
        return current(p).get(k)

    def add_check(u, chk, status=None):
        e = led.setdefault(u["key"], {"s": "new", "d": today})
        e.setdefault("checks", []).append(dict(chk, run=run, d=today))
        if status:
            e["s"], e["d"] = status, today
        return e

    n = {"ok": 0, "not-applicable": 0, "source-needed": 0, "verifier-supports": 0, "corrected-unconfirmed": 0, "stale": 0, "ignored": 0}
    n["incomplete-batches"] = sum(1 for v in complete.values() if not v)
    for cid, rows in status_rows.items():
        for r in rows[:1]:
            if cid not in claims_by_id or not complete[batch_of(cid)]:
                n["ignored"] += 1; continue
            u = bound(cid)
            if not u:
                n["stale"] += 1; continue
            e = led.get(u["key"], {})
            st, src = r.get("status"), (r.get("source_opened") or "").strip()
            chk = {"s": st, "src": src[:160], "q": (r.get("quote") or "")[:300], "access": r.get("access", "")}
            if st == "ok" and src.lower() not in NO_SOURCE and chk["q"].strip() \
                    and chk["access"] not in ("not-accessed", "metadata-only"):
                new = "verified-corrected" if e.get("s") in ("corrected-unconfirmed", "verified-corrected") else "verified-supported"
                add_check(u, chk, new); n["ok"] += 1
            elif st == "style" and u["kinds"] == ["absolute"] and not u["high_risk"]:
                keep = e.get("s") in SUPPORTED
                add_check(u, chk, None if keep else "not-applicable"); n["not-applicable"] += 1
            elif st == "unverifiable":
                was = e.get("s") or ""
                add_check(u, chk, None if was in SUPPORTED else
                          ("legacy-source-needed" if was.startswith("legacy-") else "source-needed")); n["source-needed"] += 1
            elif st == "error":
                add_check(u, chk)  # a finding: its verifier verdict and any applied edit decide what happens next
            else:
                n["ignored"] += 1
    # A verifier rejecting a finding refutes the finding, not proves the claim. It counts as an independent
    # supporting check only when the verifier explicitly states the original is supported and quotes the source.
    # A confirmed finding (agree/modify/no_edit on high or medium) flags the claim: it fails until the corrected
    # text replaces it or a later check supports it. Findings that share a page and 120-character prefix are
    # ambiguous and match nothing unless the verdict names its claim_id.
    findings, ambiguous = {}, set()
    for ff in glob.glob(os.path.join(work, "findings", "*.jsonl")):
        for r in read_jsonl(ff, errors):
            fk = (r.get("page"), (r.get("finding") or "")[:120])
            if fk in findings:
                ambiguous.add(fk)
            findings[fk] = r
    applied = load(os.path.join(work, "applied.json"), {})
    import apply as A  # noqa: E402
    for vf in glob.glob(os.path.join(work, "verdicts", "*.jsonl")):
        for v in read_jsonl(vf, errors):
            fk = (v.get("page"), (v.get("finding") or "")[:120])
            r = findings.get(fk)
            if not r or (fk in ambiguous and v.get("claim_id") != r.get("claim_id")) or r.get("claim_id") not in claims_by_id:
                continue
            u = bound(r["claim_id"])
            if not u:
                continue
            vetoed = str(applied.get(A.fid(v), {}).get("status", "")).startswith(("skip", "veto"))
            if v.get("verdict") in ("agree", "modify", "no_edit") and r.get("severity") in ("high", "medium") and not vetoed:
                add_check(u, {"s": "confirmed-error", "src": (v.get("reason") or "")[:160]}, "flagged"); n["flagged"] = n.get("flagged", 0) + 1
                continue
            if v.get("verdict") != "reject":
                continue
            if v.get("original_supported") is True and (v.get("quote") or "").strip() and (v.get("source_opened") or "").strip().lower() not in NO_SOURCE:
                e = led.get(u["key"], {})
                add_check(u, {"s": "verifier-supports", "src": v["source_opened"][:160], "q": v["quote"][:300]},
                          None if e.get("s") in SUPPORTED else "verified-supported"); n["verifier-supports"] += 1
            else:
                add_check(u, {"s": "verifier-reject", "src": (v.get("reason") or "")[:160]})
    # Applied edits: every claim unit wholly inside the applied new text is corrected-unconfirmed (exact containment
    # after normalization; no fuzzy overlap). Units the edit changed only partly are new claims and fail anyway.
    if applied:
        for vf in glob.glob(os.path.join(work, "verdicts", "*.jsonl")):
            for v in read_jsonl(vf, errors):
                e = v.get("edit") or {}
                if not e.get("new") or not str(applied.get(A.fid(v), {}).get("status", "")).startswith("applied"):
                    continue
                p = v.get("page", "")
                newn = norm(e["new"])
                for u in current(p).values() if os.path.exists(os.path.join(ROOT, p)) else []:
                    nu = norm(u["text"])
                    if nu and nu in newn and led.get(u["key"], {}).get("s") not in SUPPORTED:
                        # the verifier judged this wording against the source: one check; the final-text check is another
                        chk = [{"s": "verifier-supports", "run": run + ":verifier", "d": today, "src": (v.get("reason") or "")[:160]}]
                        led[u["key"]] = {"s": "corrected-unconfirmed", "d": today, "fix": A.fid(v), "run": run,
                                         "checks": led.get(u["key"], {}).get("checks", []) + chk}
                        n["corrected-unconfirmed"] += 1
    for e in led.values():  # an error check on a claim with no prior record leaves it failing, with its history
        if e.get("s") == "new":
            e["s"] = "flagged"
    save_ledger(led)
    print(f"recorded {n}; ledger has {len(led)}" + (f"; {len(errors)} unreadable lines" if errors else ""))
    return n, errors


def stats(as_json=False):
    led, exc = load(LEDGER, {}), load(EXCEPTIONS, {})
    from collections import Counter
    tot, kinds, high, fails = Counter(), Counter(), Counter(), Counter()
    for p in C.pages(SECTIONS):
        for u in units_of(p):
            e = led.get(u["key"])
            st = e["s"] if e else "unverified"
            tot[st] += 1
            for k in u["kinds"]:
                kinds[f"{k}:{st}"] += 1
            if u["high_risk"]:
                high[st] += 1
            ok, why = verdict(u, e, exc)
            if not ok:
                fails[why] += 1
    out = {"by_status": dict(tot), "high_risk_by_status": dict(high), "by_kind": dict(kinds), "failing": dict(fails),
           "verified": sum(v for s, v in tot.items() if s in SUPPORTED),
           "carried_over_not_verified": sum(v for s, v in tot.items() if s.startswith("legacy-") and s != "legacy-supported"),
           "units": sum(tot.values())}
    print(json.dumps(out, indent=1, sort_keys=True) if as_json else
          "\n".join(f"{k}: {v}" for k, v in out.items()))
    return out


def migrate(today=None):
    """Schema 1 -> 2. Every current claim unit found in the v1 ledger gets a v2 binding with an explicit legacy status;
    nothing is relabelled as verified. The v1 ledger is preserved verbatim as claims-ledger-v1.json."""
    today = today or datetime.date.today().isoformat()
    v1 = load(LEDGER, {})
    if any(k.startswith("v2:") for k in v1):
        sys.exit("ledger is already schema 2")
    base = set(load(BASELINE, []))
    json.dump(v1, open(LEDGER_V1, "w"), indent=0, sort_keys=True)
    led, summary, high = {}, {}, {}
    for p in C.pages(SECTIONS):
        for u in units_of(p):
            o = v1.get(u["key1"])
            if o:
                s = V1_MAP.get(o.get("s"), "legacy-unknown")
                if s == "legacy-supported" and (o.get("src") or "").strip().lower() in NO_SOURCE:
                    s = "legacy-fuzzy-fixed"  # an ok without an opened source is not evidence of support
            elif u["key1"] in base:
                s = "legacy-baseline"
            else:
                s = "unverified"
            summary[s] = summary.get(s, 0) + 1
            if u["high_risk"]:
                high[s] = high.get(s, 0) + 1
            if o or u["key1"] in base:
                led[u["key"]] = {"s": s, "d": today, "v1": u["key1"], "v1_d": (o or {}).get("d", ""),
                                 "src": (o or {}).get("src", "")[:160], "q": (o or {}).get("q", "")[:300]}
    save_ledger(led)
    json.dump({"date": today, "v1_entries": len(v1), "v2_entries": len(led), "current_units_by_status": summary,
               "high_risk_by_status": high}, open(os.path.join(ROOT, "reports/quality/gate-migration.json"), "w"), indent=1)
    print(json.dumps({"v1": len(v1), "v2": len(led), "by_status": summary, "high_risk": high}, indent=1))


def main():
    a = sys.argv[1:]
    cmd = a[0] if a else "check"
    if cmd == "check":
        rows = evaluate(targets(a[1:]))
        bad = [(p, u, why) for p, u, ok, why in rows if not ok]
        warn = sum(1 for *_, ok, why in rows if ok and why.startswith(("source-needed", "legacy-")))
        for p, u, why in bad[:200]:
            print(f"{p}:{u['line']}: {why} [{'+'.join(u['kinds'])}]: {norm(u['text'])[:140]}")
        if bad:
            print(f"\nClaim gate: {len(bad)} claim(s) fail. Run `python3 scripts/review/gate.py pending <files>`, the Codex "
                  "check (orchestrate.py --claims --reviewers 1 --verifiers 1) and `gate.py record <work>`.", file=sys.stderr)
            sys.exit(1)
        print(f"Claim gate: {len(rows)} claims pass ({warn} carried over or source-needed, not counted as verified).")
    elif cmd == "pending":
        out = os.path.join(ROOT, "reports/audit-v2/sources-local/gate-" + datetime.date.today().isoformat())
        if "--out" in a:
            out = os.path.join(ROOT, a[a.index("--out") + 1])
        kind = a[a.index("--kind") + 1] if "--kind" in a else None
        rate = float(a[a.index("--challenge") + 1]) if "--challenge" in a else 0.0
        rng = random.Random(int(a[a.index("--seed") + 1]) if "--seed" in a else 20261006)
        files = [x for x in a[1:] if x.endswith(".mdx")]
        if os.path.exists(os.path.join(out, "units.json")):
            sys.exit(f"{out} already holds a run; use a new --out (each run needs its own ID)")
        bypage, picked = {}, {"failing": 0, "legacy-high-risk": 0, "challenge": 0, "recheck": 0}
        for p, u, ok, why in evaluate(targets(files), kind):
            why_pick = None
            if not ok:
                why_pick = "failing"
            elif "--recheck" in a:
                why_pick = "recheck"
            elif "--legacy" in a and u["high_risk"] and why.startswith("legacy-") and why != "legacy-supported":
                why_pick = "legacy-high-risk"
            elif rate and why == "verified-supported" and rng.random() < rate:
                why_pick = "challenge"
            if why_pick:
                picked[why_pick] += 1
                bypage.setdefault(p, []).append(u)
        units = write_batches(out, bypage)
        print(f"{sum(picked.values())} claims {picked} on {len(bypage)} pages -> {out} ({len(units)} batches)")
        print(f"next: nohup python3 scripts/review/orchestrate.py --work {os.path.relpath(out, ROOT)} --claims "
              "--reviewers 1 --verifiers 1 --effort high --tier default &")
    elif cmd == "record":
        record(os.path.join(ROOT, a[1]))
    elif cmd == "baseline":
        sys.exit("There is no bulk baseline (schema 2). Use claim-exceptions.json with an owner, decision and expiry.")
    elif cmd == "stats":
        stats("--json" in a)
    elif cmd == "migrate":
        migrate()


if __name__ == "__main__":
    main()
