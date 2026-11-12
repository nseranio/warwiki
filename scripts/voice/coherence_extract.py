#!/usr/bin/env python3
"""Find sections that read as back-to-back study results (STYLE.md section 14, "Point first") and write
claim-mode batches for the coherence sweep.

    python3 scripts/voice/coherence_extract.py [--root REPO] [--out WORKDIR] [--exclude-modified] [--pages a.mdx ...]
        [--limit N] [--skip-file JSON]

A section (## or ### block) is a candidate when any paragraph or list item in it stacks results:
  - 3 or more "result sentences" (a sentence with a digit and a citation marker), or
  - 2 or more sentences that repeat the same statistic (a decimal, a percentage or a 4+ digit count), or
  - 6 or more sentences with 2 or more result sentences.
The reviewer brief (scripts/review/coherence-brief.md) decides whether to rewrite or keep each section.
Without --out it prints counts only. With --out it writes WORKDIR/units.json and WORKDIR/batches/<slug>.json
(one page per batch) for scripts/review/orchestrate.py --claims --brief coherence --verify-brief coherence-verify.
"""
import glob, json, os, re, subprocess, sys

ARGS = sys.argv[1:]
ROOT = os.path.abspath(ARGS[ARGS.index("--root") + 1]) if "--root" in ARGS else \
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SKIP_DIRS = ("/07-roots/surgeons/", "/surgeons/", "/06-clinical-evidence/studies/", "/clinical-evidence/studies/")
SKIP_HEADINGS = re.compile(r"^(References|Bibliography|See Also|Videos|Further Reading|Podcasts?|Related)\b", re.I)
SUP = re.compile(r"<sup>.*?</sup>|\[\^\d+\]")
STAT = re.compile(r"\b\d+\.\d+\b|\b\d+(?:\.\d+)?%|\b\d{1,3}(?:,\d{3})+\b|\b\d{4,}\b")
YEAR = re.compile(r"^(1[89]|20)\d\d$")


def pages():
    if "--pages" in ARGS:
        i = ARGS.index("--pages") + 1
        out = []
        while i < len(ARGS) and not ARGS[i].startswith("--"):
            out.append(ARGS[i]); i += 1
        return out
    out = []
    for p in glob.glob(os.path.join(ROOT, "docs/**/*.mdx"), recursive=True):
        rel = os.path.relpath(p, ROOT)
        if any(d in "/" + rel for d in SKIP_DIRS) or os.path.basename(rel).startswith("_") or rel.endswith("index.mdx"):
            continue
        out.append(rel)
    return sorted(out)


def blocks(text):
    """Yield (heading, start_line, end_line, [(line_no, block_text)]) for each ## / ### section."""
    lines = text.split("\n")
    start = 0
    if lines and lines[0].strip() == "---":
        for j in range(1, len(lines)):
            if lines[j].strip() == "---":
                start = j + 1
                break
    sec, head, sline, in_code = [], "(opening)", start + 1, False
    cur, cur_line = [], None
    out = []

    def end_block():
        nonlocal cur, cur_line
        if cur:
            sec.append((cur_line, " ".join(cur)))
        cur, cur_line = [], None

    def end_section(endl):
        nonlocal sec
        end_block()
        if not SKIP_HEADINGS.match(head):
            out.append((head, sline, endl, sec))
        sec = []
    for i in range(start, len(lines)):
        l = lines[i]
        if l.lstrip().startswith("```"):
            in_code = not in_code
        if in_code:
            continue
        m = re.match(r"^(#{2,3}) +(.*)", l)
        if m:
            end_section(i)
            head, sline = m.group(2).strip(), i + 1
            continue
        s = l.strip()
        if not s or s.startswith(("|", "<", "!", "import ", "export ", "---", ":::", "{/*", "*From", "_From")):
            end_block()
            continue
        if re.match(r"^([-*+]|\d+\.) ", s):  # each list item is its own block
            end_block()
            cur, cur_line = [re.sub(r"^([-*+]|\d+\.) ", "", s)], i + 1
            continue
        if cur_line is None:
            cur_line = i + 1
        cur.append(s)
    end_section(len(lines))
    return out


def score(block):
    norm = re.sub(r"([.;])((?:<sup>.*?</sup>|\[\^\d+\])+)", r"\2\1", block)  # marker before the stop, then split
    raw = [s for s in re.split(r"(?<=[.;])\s+(?=[A-Z(])", norm) if s.strip()]
    sents = raw
    results = sum(1 for s in raw if re.search(r"\d", SUP.sub("", s)) and SUP.search(s))
    seen, dup = {}, 0
    for k, s in enumerate(raw):
        for n in set(STAT.findall(SUP.sub("", s))):
            if YEAR.match(n):
                continue
            if n in seen and seen[n] != k:
                dup += 1
            seen.setdefault(n, k)
    reasons = []
    if results >= 3:
        reasons.append(f"{results} result sentences")
    if dup >= 2:
        reasons.append(f"{dup} repeated statistics")
    if len(sents) >= 6 and results >= 2:
        reasons.append(f"{len(sents)} sentences")
    return reasons


def main():
    modified = set()
    if "--exclude-modified" in ARGS:
        out = subprocess.run(["git", "status", "--porcelain", "docs"], cwd=ROOT, capture_output=True, text=True).stdout
        modified = {l[3:].strip() for l in out.splitlines()}
    skip = set(json.load(open(ARGS[ARGS.index("--skip-file") + 1]))) if "--skip-file" in ARGS else set()
    limit = int(ARGS[ARGS.index("--limit") + 1]) if "--limit" in ARGS else None
    work = os.path.join(os.getcwd(), ARGS[ARGS.index("--out") + 1]) if "--out" in ARGS else None
    if work:
        os.makedirs(os.path.join(work, "batches"), exist_ok=True)
    units, nsec = [], 0
    for rel in pages():
        if rel in modified or rel in skip:
            continue
        text = open(os.path.join(ROOT, rel)).read()
        found = []
        for head, s, e, blks in blocks(text):
            why = sorted({r for ln, b in blks for r in score(b)})
            if why:
                found.append({"heading": head, "lines": [s, e], "why": why})
        if not found:
            continue
        slug = f"c{len(units) + 1:04d}"
        claims = [{"page": rel, "line": f["lines"][0], "id": f"{slug}#{k + 1}",
                   "text": f"Section \"{f['heading']}\" (lines {f['lines'][0]}-{f['lines'][1]}): {'; '.join(f['why'])}"}
                  for k, f in enumerate(found)]
        nsec += len(found)
        units.append("claims/" + slug)
        if work:
            json.dump({"page": rel, "pages": [rel], "claims": claims},
                      open(os.path.join(work, "batches", slug + ".json"), "w"), indent=1)
        if limit and len(units) >= limit:
            break
    if work:
        json.dump(units, open(os.path.join(work, "units.json"), "w"), indent=1)
    print(f"{nsec} candidate sections on {len(units)} pages")


if __name__ == "__main__":
    main()
