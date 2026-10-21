#!/usr/bin/env python3
"""Find "facts only" candidates (STYLE.md section 12, October 21 list) and write claim-mode batches.

    python3 scripts/voice/facts_extract.py [--out WORKDIR] [--exclude-modified] [--pages a.mdx b.mdx ...]
    python3 scripts/voice/facts_extract.py --lint [--all | --pages ...]   (advisory: strong patterns on changed pages; never fails)

Candidates are deliberately broad (every sentence with "not", "matters", "rather than", "alone", ...): the
reviewer brief (scripts/review/facts-brief.md) decides cut or keep. Without --out it prints counts only.
With --out it writes WORKDIR/units.json and WORKDIR/batches/<slug>.json for
scripts/review/orchestrate.py --claims --brief facts --verify-brief facts-verify.
"""
import glob, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# Broad net for the sweep.
PATTERNS = [
    r"\bnot\b", r"\bcannot\b", r"n't\b",
    r"\bmatters?\b(?! of\b)", r"\brather than\b", r"\balone\b", r"\b(?:most |only |especially )?useful (?:when|if|for)\b",
    r"\b(?:on )?this page\b", r"\bbelongs? to (?:a|an|the|that)\b", r"\bpertains? to\b", r"\billustrates?\b",
    r"\b(?:best|should be) (?:understood|read|interpreted)\b",
    r"\b(?:The|This|That) (?:contrast|distinction|difference|caveat|limitation|point|nuance) (?:supports|matters|is|means|explains)\b",
    r"\b(?:importantly|notably|crucially|critically|worth noting|it is important|key point)\b",
]
RX = re.compile("|".join(f"(?:{p})" for p in PATTERNS), re.I)
# Strong tells for the advisory lint: almost always commentary in this corpus.
STRONG = [
    r"\bmatters?\b(?! of\b)",
    r"\b\w+ alone (?:does not|do not|is not|are not|cannot|is insufficient|does not establish)\b",
    r"\b(?:does|do|did|can|cannot) not (?:establish|replace|describe|measure|assign|explain|define|specify|guarantee|imply|mean|serve as|substitute)\b",
    r"\bcannot serve as\b",
    r"\b(?:This|These|It|They) (?:is|are) (?:a|an)? ?[^.,;]{0,60}, (?:rather than|not) (?:a|an|the)\b",
    r"\b(?:is|are) (?:a )?(?:tendencies|estimates|prompts?) [^.]{0,40}\b(?:rather than|not)\b",
    r"\b(?:most |only )?useful when\b",
    r"\bshould not be (?:read|taken|interpreted|treated|equated|extrapolated|generalized)\b",
    r", although [^.]{0,120}\b(?:does|do|did|can|cannot) not\b",
    r"\b(?:on )?this page\b",
]
STRONG_RX = re.compile("|".join(f"(?:{p})" for p in STRONG), re.I)
SENT = re.compile(r"[^.!?]*?(?:[.!?](?:<sup>.*?</sup>)?(?=\s|$)|$)", re.S)
SKIP_DIRS = ("/07-roots/surgeons/", "docs/resources/surgeons/")


def pages(args):
    if "--pages" in args:
        return [p for p in args[args.index("--pages") + 1:] if p.endswith(".mdx")]
    out = []
    for p in glob.glob(os.path.join(ROOT, "docs/**/*.mdx"), recursive=True):
        rel = os.path.relpath(p, ROOT)
        if any(d in rel for d in SKIP_DIRS) or os.path.basename(rel).startswith("_"):
            continue
        out.append(rel)
    return sorted(out)


def candidates(rel, rx=RX):
    lines = open(os.path.join(ROOT, rel)).read().split("\n")
    in_refs = in_front = in_code = False
    for i, line in enumerate(lines, 1):
        if i == 1 and line.strip() == "---":
            in_front = True
            continue
        if in_front:
            in_front = line.strip() != "---"
            continue
        if line.lstrip().startswith("```"):
            in_code = not in_code
            continue
        if re.match(r"^#{1,3} +(References|Bibliography)", line):
            in_refs = True
        elif re.match(r"^#{1,3} ", line):
            in_refs = False
        if in_code or in_refs or line.startswith(("import ", "<a id=", "export ", "#")):
            continue
        if not rx.search(line):
            continue
        if line.lstrip().startswith("|"):  # keep table rows whole
            yield i, line
            continue
        for s in SENT.findall(line):
            if s.strip() and rx.search(s):
                yield i, s.strip()


def main():
    args = sys.argv[1:]
    if "--lint" in args:
        everywhere = [(rel, line, text) for rel in pages(args) for line, text in candidates(rel, STRONG_RX)]
        if "--all" in args or "--pages" in args:
            shown = everywhere
        else:  # pages changed in the working tree (new writing)
            out = subprocess.run(["git", "status", "--porcelain", "docs"], cwd=ROOT, capture_output=True, text=True).stdout
            changed = {l[3:].strip() for l in out.splitlines()}
            shown = [h for h in everywhere if h[0] in changed]
        for rel, line, text in shown:
            print(f"{rel}:{line}: {re.sub(r'<sup>.*?</sup>', '', text)[:160]}")
        print(f"Facts-only advisory (STYLE.md section 12): {len(shown)} commentary-pattern sentence(s) "
              f"{'listed' if '--all' in args or '--pages' in args else 'on changed pages'}; "
              f"{len(everywhere)} site-wide on {len({h[0] for h in everywhere})} pages. Advisory; never fails.")
        return
    modified = set()
    if "--exclude-modified" in args:
        out = subprocess.run(["git", "status", "--porcelain", "docs"], cwd=ROOT, capture_output=True, text=True).stdout
        modified = {l[3:] for l in out.splitlines()}
    units, total, npages = [], 0, 0
    work = os.path.join(ROOT, args[args.index("--out") + 1]) if "--out" in args else None
    batch, bpages = [], []

    def flush():
        nonlocal batch, bpages
        if not batch:
            return
        slug = f"f{len(units) + 1:04d}"
        units.append("claims/" + slug)
        if work:
            json.dump({"page": bpages[0], "pages": bpages, "claims": batch},
                      open(os.path.join(work, "batches", slug + ".json"), "w"), indent=1)
        batch, bpages = [], []
    if work:
        os.makedirs(os.path.join(work, "batches"), exist_ok=True)
    for rel in pages(args):
        if rel in modified:
            continue
        c = list(candidates(rel))
        if not c:
            continue
        npages += 1
        for line, text in c:
            batch.append({"page": rel, "line": line, "text": text, "id": f"f{len(units) + 1:04d}#{len(batch) + 1}"})
            total += 1
        bpages.append(rel)
        if len(batch) >= 30:
            flush()
    flush()
    if work:
        json.dump(units, open(os.path.join(work, "units.json"), "w"), indent=1)
    print(f"{total} candidate sentences on {npages} pages in {len(units)} batches")


if __name__ == "__main__":
    main()
