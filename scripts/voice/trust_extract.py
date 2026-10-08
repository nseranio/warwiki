#!/usr/bin/env python3
"""Find 'trust the reader' candidates (STYLE.md section 12) and write claim-mode batches.

    python3 scripts/voice/trust_extract.py [--out WORKDIR] [--exclude-modified] [--pages a.mdx b.mdx ...]

Without --out it prints counts only. With --out it writes WORKDIR/units.json and WORKDIR/batches/<slug>.json
for scripts/review/orchestrate.py --claims --brief trust --verify-brief trust-verify.
"""
import glob, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PATTERNS = [
    r"\b(?:does|do|did|cannot|can ?not) not? ?(?:establish|prove|show|demonstrate|determine)\b",
    r"\b(?:does|do|did) not (?:establish|prove|show|demonstrate|determine|mean|imply|support (?:routine|a|using))\b",
    r"\b[Dd]o not (?:transfer|extrapolate|generalize|apply|combine|infer|promise|call|treat|read|equate|assume)\b",
    r"\bis not (?:a|an) (?:trial|study|comparison|universal|substitute|proxy|measure|recommendation|endorsement)\b",
    r"\bshould not be (?:read|taken|interpreted|ranked|compared|collapsed|counted|presented|treated|extrapolated|generalized|equated|assumed)\b",
    r"\bnot (?:a universal|universally|every (?:patient|operation|repair|case|stricture|block|setting))\b",
    r", not only\b",
    r"\bThis is (?:a|an) [^.]{3,80}, not\b",
    r"\b(?:limit|limits|limiting|preclude|precludes)\b[^.]{0,30}\bcausal\b|\bcannot be attributed\b",
    r"\b(?:inspected|indexed) (?:abstract|record|results)|not independently (?:assessed|verified|reviewed)|full (?:notice )?text was not",
    r"\b(?:These|Those|Such) (?:observations|figures|data|results|findings|series|studies|reports|rates|numbers|estimates) (?:do|does|did) not\b",
    r"\bnot proof\b|\bis not evidence\b|\bnot evidence (?:for|of|that)\b",
    r"\bnot (?:a|an) (?:population-wide|class-wide|general)\b",
]
RX = re.compile("|".join(f"(?:{p})" for p in PATTERNS))
SENT = re.compile(r"[^.!?]*?(?:[.!?](?:<sup>.*?</sup>)?(?=\s|$)|$)", re.S)


def pages(args):
    if "--pages" in args:
        return args[args.index("--pages") + 1:]
    out = []
    for p in glob.glob(os.path.join(ROOT, "docs/**/*.mdx"), recursive=True):
        rel = os.path.relpath(p, ROOT)
        if "/07-roots/surgeons/" in rel or os.path.basename(rel).startswith("_"):
            continue
        out.append(rel)
    return sorted(out)


def candidates(rel):
    lines = open(os.path.join(ROOT, rel)).read().split("\n")
    in_refs = in_front = False
    for i, line in enumerate(lines, 1):
        if i == 1 and line.strip() == "---":
            in_front = True
            continue
        if in_front:
            in_front = line.strip() != "---"
            continue
        if re.match(r"^#{1,3} +(References|Bibliography)", line):
            in_refs = True
        elif re.match(r"^#{1,3} ", line):
            in_refs = False
        if in_refs or line.startswith(("import ", "<a id=", "export ")):
            continue
        if not RX.search(line):
            continue
        # keep table rows whole; split prose into sentences
        if line.lstrip().startswith("|"):
            yield i, line
            continue
        for s in SENT.findall(line):
            if s.strip() and RX.search(s):
                yield i, s.strip()


def main():
    args = sys.argv[1:]
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
        slug = f"t{len(units) + 1:04d}"
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
            batch.append({"page": rel, "line": line, "text": text, "id": f"t{len(units) + 1:04d}#{len(batch) + 1}"})
            total += 1
        bpages.append(rel)
        if len(batch) >= 25:
            flush()
    flush()
    if work:
        json.dump(units, open(os.path.join(work, "units.json"), "w"), indent=1)
    print(f"{total} candidate sentences on {npages} pages in {len(units)} batches")


if __name__ == "__main__":
    main()
