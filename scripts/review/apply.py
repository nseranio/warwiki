#!/usr/bin/env python3
"""Collect verified review findings and apply the agreed edits.

  python3 scripts/review/apply.py list [--section PREFIX]      -> WORK/review-sheet.md (pending agreed edits, high first)
  python3 scripts/review/apply.py apply [--section PREFIX] [--skip ID ...]
      Applies agreed or modified edits (verifier verdict agree/modify) whose `old` text occurs exactly once in the
      current page. Pages with uncommitted changes not made by this tool are skipped. Applied and skipped edits are
      recorded in WORK/applied.json, so each finding is applied once.
"""
import json, os, re, sys, glob, hashlib, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
WORK = os.path.join(ROOT, os.environ.get("REVIEW_WORK", "reports/audit-v2/sources-local/full-review"))
LEDGER = os.path.join(WORK, "applied.json")


def write(p, orig, s):
    """Write s, stripping trailing whitespace from lines the edit introduced (an edit can end mid-line)."""
    had = set(orig.split("\n"))
    open(p, "w").write("\n".join(l if l in had else l.rstrip() for l in s.split("\n")))


def fid(v):
    return hashlib.sha1((v["page"] + (v.get("edit") or {}).get("old", "") + v.get("finding", "")).encode()).hexdigest()[:10]


def minimal_hunks(old, new, ctx=60):
    """Split an edit into its changed regions, each with up to ctx characters of unchanged context."""
    import difflib
    sm = difflib.SequenceMatcher(None, old, new, autojunk=False)
    out = []
    for tag, a, b, c, d in sm.get_opcodes():
        if tag == "equal":
            continue
        a0, b0 = max(0, a - ctx), min(len(old), b + ctx)
        pre, post = old[a0:a], old[b:b0]
        out.append((pre + old[a:b] + post, pre + new[c:d] + post))
    merged = []
    for o, n in out:  # overlapping context: fall back to no hunks
        if merged and o[:20] in merged[-1][0]:
            return None
        merged.append((o, n))
    return merged


def accepted(section=None):
    led = json.load(open(LEDGER)) if os.path.exists(LEDGER) else {}
    out = []
    for f in sorted(glob.glob(os.path.join(WORK, "verdicts", "*.jsonl"))):
        for line in open(f):
            if not line.strip():
                continue
            try:
                v = json.loads(line)
            except Exception:
                continue
            if v.get("verdict") not in ("agree", "modify") or not v.get("edit") or not v["edit"].get("old"):
                continue
            if section and not v["page"].startswith(section):
                continue
            v["id"] = fid(v)
            if v["id"] not in led:
                out.append(v)
    rank = {"high": 0, "medium": 1, "low": 2}
    return sorted(out, key=lambda v: (v["page"], rank.get(v.get("severity"), 3))), led


def main():
    a = sys.argv[1:]
    cmd = a[0] if a else "list"
    section = a[a.index("--section") + 1] if "--section" in a else None
    skip = set(a[a.index("--skip") + 1:]) if "--skip" in a else set()
    items, led = accepted(section)
    if cmd == "list":
        lines = [f"# Review sheet ({len(items)} agreed edits pending)", ""]
        for v in items:
            lines += [f"## {v['id']} [{v.get('severity')}] {v['page']} ({v['verdict']})", f"Finding: {v.get('finding','')}",
                      f"Verifier: {v.get('reason','')}", f"- OLD: {v['edit']['old']}", f"- NEW: {v['edit']['new']}", ""]
        open(os.path.join(WORK, "review-sheet.md"), "w").write("\n".join(lines))
        bysev = {}
        for v in items:
            bysev[v.get("severity")] = bysev.get(v.get("severity"), 0) + 1
        print(len(items), bysev, "->", os.path.join(WORK, "review-sheet.md"))
        return
    dirty = {l[3:].strip() for l in subprocess.check_output(["git", "status", "--short"], cwd=ROOT).decode().splitlines() if l[:2].strip()}
    mine = set(json.load(open(os.path.join(WORK, "touched.json")))) if os.path.exists(os.path.join(WORK, "touched.json")) else set()
    applied, skipped = [], []
    added_on_page = {}
    sheet = os.path.join(WORK, "review-sheet.md")
    reviewed = set(re.findall(r"^## (\w{10}) ", open(sheet).read(), re.M)) if os.path.exists(sheet) else set()
    items = [v for v in items if v["id"] in reviewed]  # only edits listed on the sheet Claude reviewed
    for v in items:
        if v["id"] in skip:
            led[v["id"]] = {"status": "vetoed", "page": v["page"]}; continue
        p = os.path.join(ROOT, v["page"])
        if v["page"] in dirty and v["page"] not in mine:
            skipped.append((v, "page has uncommitted changes from another session")); continue
        s = orig = open(p).read()
        old, new = v["edit"]["old"], v["edit"]["new"]
        new = re.sub(r"(?<![&\w])<(?=\s?[\d.=])", "&lt;", new)
        refs = v.get("new_refs") or []
        foot = re.findall(r"^\[\^(\d+)\]:", s, re.M)
        if refs and foot and not re.search(r'<a id="ref\d+"></a>', s):  # footnote-style page (GAS)
            nxt = max(int(x) for x in foot) + 1
            add = []
            for r in refs:
                k = r.get("key"); line = r.get("line", "").strip()
                if not k or not line:
                    continue
                line = re.sub(r"(?<![&\w])<(?=\s?[\d.=])", "&lt;", line)
                new = re.sub(rf"\[\[{k}\]\]\(#ref{k}\)", f"[^{nxt}]", new)
                add.append(f"[^{nxt}]: {line}")
                nxt += 1
            new = re.sub(r"<sup>((?:\[\^\d+\])+)</sup>", r"\1", new)
            if re.search(r"\[\[R\d+\]\]", new) or not add:
                skipped.append((v, "unresolved new-reference placeholder")); continue
            last = list(re.finditer(r"^\[\^\d+\]:.*$", s, re.M))[-1]
            s = s[:last.end()] + "\n" + "\n".join(add) + s[last.end():]
            refs = []
        plain = re.findall(r"^(\d+)\. ", s.split("\n## References", 1)[1], re.M) if "\n## References" in s else []
        if refs and plain and not re.search(r'<a id="ref\d+"></a>', s) and not foot:  # plain numbered list, [N] markers (database pages)
            nxt = max(int(x) for x in plain) + 1
            add = []
            for r in refs:
                k = r.get("key"); line = r.get("line", "").strip()
                if not k or not line:
                    continue
                line = re.sub(r"(?<![&\w])<(?=\s?[\d.=])", "&lt;", line)
                new = re.sub(rf"\[\[{k}\]\]\(#ref{k}\)", f"[{nxt}]", new)
                add.append(f"{nxt}. {line}")
                nxt += 1
            new = re.sub(r"<sup>((?:\[\d+\])+)</sup>", r"\1", new)
            if re.search(r"\[\[R\d+\]\]", new) or not add:
                skipped.append((v, "unresolved new-reference placeholder")); continue
            s = s.rstrip("\n") + "\n" + "\n".join(add) + "\n"
            refs = []
        if refs and not plain and not foot and not re.search(r'<a id="ref\d+"></a>', s) and "\n## References" not in s:
            s = s.rstrip("\n") + "\n\n## References\n\n---\n\n<a id=\"ref0\"></a>"  # placeholder anchor; replaced below
        if refs:  # a "new" reference already on the page (same DOI) reuses its number
            have = {}
            for ln in s.split("\n## References", 1)[-1].split("\n"):
                dm = re.search(r"doi:\s*\[(10\.[^\]]+)\]", ln); nm = re.search(r'id="ref(\d+)"', ln)
                if dm and nm:
                    have[dm.group(1).lower().rstrip(".")] = nm.group(1)
            keep = []
            for r in refs:
                dm = re.search(r"doi:\s*\[(10\.[^\]]+)\]", r.get("line", ""))
                hit = have.get(dm.group(1).lower().rstrip(".")) if dm else None
                if hit and r.get("key"):
                    new = new.replace(f"[[{r['key']}]](#ref{r['key']})", f"[[{hit}]](#ref{hit})")
                else:
                    keep.append(r)
            refs = keep
            if not refs and re.search(r"\[\[R\d+\]\]", new):
                skipped.append((v, "unresolved new-reference placeholder")); continue
        if refs:
            nums = [int(x) for x in re.findall(r'<a id="ref(\d+)"></a>', s)]
            nxt = (max(nums) if nums else 0) + 1
            add = []
            for r in refs:
                k = r.get("key"); line = r.get("line", "").strip()
                if not k or not line:
                    continue
                line = re.sub(r"(?<![&\w])<(?=\s?[\d.=])", "&lt;", line)
                line = re.sub(r"(?<=[\s(])>(?=\s?[\d.=])", "&gt;", line)
                new = new.replace(f"[[{k}]](#ref{k})", f"[[{nxt}]](#ref{nxt})")
                add.append(f'<a id="ref{nxt}"></a>{nxt}. {line}')
                nxt += 1
            if re.search(r"\[\[R\d+\]\]", new) or not add:
                skipped.append((v, "unresolved new-reference placeholder")); continue
            anchors = list(re.finditer(r'^(?:<a id="ref\d+"></a>|\d+\. <a id="ref\d+"></a>).*$', s, re.M))
            if not anchors:
                skipped.append((v, "new reference on a page without numbered anchors")); continue
            last = anchors[-1]
            added_on_page.setdefault(v["page"], []).extend(int(re.match(r'(?:<a id="ref)?(\d+)', a).group(1)) for a in add)
            if re.match(r"\d+\. <a id", last.group(0)):  # number-first style
                add = [re.sub(r'^<a id="ref(\d+)"></a>(\d+)\. ', r'\2. <a id="ref\1"></a>', a) for a in add]
            s = s[:last.end()] + "\n\n" + "\n\n".join(add) + s[last.end():]
            s = s.replace('<a id="ref0"></a>\n\n', "", 1)
        if not refs and re.search(r"\[\[R\d+\]\]", new):
            prev = added_on_page.get(v["page"], [])
            if len(prev) == 1:
                new = re.sub(r"\[\[R\d+\]\]\(#refR\d+\)", f"[[{prev[0]}]](#ref{prev[0]})", new)
            else:
                skipped.append((v, "placeholder citation without a matching new reference")); continue
        new = re.sub(r"(?<=[\s(])>(?=\s?[\d.=])", "&gt;", new)
        new = "\n".join(l.rstrip() for l in new.split("\n"))
        n = s.count(old)
        if n == 0:
            hunks = minimal_hunks(old, new)
            if hunks and all(s.count(o) == 1 for o, _ in hunks):
                for o, nn in hunks:
                    s = s.replace(o, nn)
                write(p, orig, s)
                led[v["id"]] = {"status": "applied (minimal hunks)", "page": v["page"], "severity": v.get("severity")}
                mine.add(v["page"]); applied.append(v); continue
        if n != 1:
            led[v["id"]] = {"status": f"not applied: old found {n} times", "page": v["page"]}
            skipped.append((v, f"old found {n} times")); continue
        write(p, orig, s.replace(old, new))
        led[v["id"]] = {"status": "applied", "page": v["page"], "severity": v.get("severity")}
        mine.add(v["page"]); applied.append(v)
    json.dump(led, open(LEDGER, "w"), indent=1)
    json.dump(sorted(mine), open(os.path.join(WORK, "touched.json"), "w"))
    print(f"applied {len(applied)} edits on {len({v['page'] for v in applied})} pages; skipped {len(skipped)}")
    for v, why in skipped:
        print("  skip", v["id"], v["page"], why)


if __name__ == "__main__":
    main()
