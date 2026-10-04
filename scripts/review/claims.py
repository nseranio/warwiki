#!/usr/bin/env python3
"""Extract cited numeric claims from WARWIKI pages for claim-level source checking.

  python3 scripts/review/claims.py extract [--sections 03,04] [--per-batch 30] [--out DIR]
      Writes DIR/batches/<unit>.json (one page or part of one page per batch) and DIR/units.json.
  python3 scripts/review/claims.py count [--sections ...]

A claim is a prose sentence or table row (with its header row) that contains a statistic
(percentage, n/N, n =, OR/HR/RR/CI, mean/median value, follow-up duration) and a citation
marker. The reference-list lines the claim cites are attached so the checker opens the right source.
"""
import json, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STAT = re.compile(r"\d(?:[\d.,]*)\s?%|\b\d+\s?/\s?\d+\b|\bn\s?=\s?\d|\b(?:OR|HR|RR|IRR|aOR|aHR|CI|SUCRA)\b|"
                  r"\b(?:mean|median|average)\b[^.|]{0,40}\d|\d+(?:\.\d+)?\s?(?:months?|mo|years?|yr|weeks?|days?)\b|"
                  r"\b\d+(?:\.\d+)?\s?(?:cm|mm|mL|Fr|mg|cc)\b")
CITE = re.compile(r"\[\[(\d+)\]\]\(#ref\d+\)|\[\^(\d+)\]")


def refs_of(s):
    out = {}
    for m in re.finditer(r'^(?:<a id="ref(\d+)"></a>\s*\d+\.\s*|(\d+)\.\s*<a id="ref\d+"></a>\s*)(.*)$', s, re.M):
        out[int(m.group(1) or m.group(2))] = m.group(3).strip()
    for m in re.finditer(r"^\[\^(\d+)\]:\s*(.*)$", s, re.M):
        out[int(m.group(1))] = m.group(2).strip()
    return out


def sentences(line):
    # split prose on sentence ends that are followed by a space and a capital/quote/markup, keeping citations attached
    out, start = [], 0
    for m in re.finditer(r"[.!?](?:<sup>(?:(?!</sup>).)*</sup>)?(?=\s+[A-Z*\[(\"“])", line):
        out.append(line[start:m.end()]); start = m.end()
    out.append(line[start:])
    return [p for p in out if p.strip()]


def claims_of(path):
    s = open(path).read()
    refs = refs_of(s)
    body = s.split("\n## References")[0]
    lines = body.split("\n")
    out, header, in_fm, in_code = [], None, False, False
    for i, line in enumerate(lines, 1):
        if i == 1 and line.strip() == "---":
            in_fm = True; continue
        if in_fm:
            if line.strip() == "---": in_fm = False
            continue
        if line.strip().startswith("```"):
            in_code = not in_code; continue
        if in_code or line.lstrip().startswith(("import ", "export ", "<VideoCards", "![")):
            continue
        if line.startswith("|"):
            if header is None or (i > 1 and not lines[i - 2].startswith("|")):
                header = line
            if re.match(r"^\|[\s:|-]+\|?$", line):
                continue
            units = [line]
            ctx = header if header != line else None
        else:
            header = None
            units = sentences(line)
            ctx = None
        for u in units:
            nums = {int(a or b) for a, b in CITE.findall(u)}
            if nums and STAT.search(CITE.sub("", u)):
                out.append({"line": i, "text": u.strip(), "table_header": ctx,
                            "refs": [{"n": n, "text": refs.get(n, "(reference not found on page)")} for n in sorted(nums)]})
    return out


def pages(sections):
    ps = []
    for sec in sections:
        ps += glob.glob(os.path.join(ROOT, "docs", sec + "*", "**", "*.mdx"), recursive=True)
    ps = [os.path.relpath(p, ROOT) for p in ps]
    return sorted(p for p in ps if not p.endswith("index.mdx") and "/07-roots/surgeons/" not in p and not os.path.basename(p).startswith("_"))


def main():
    a = sys.argv[1:]
    cmd = a[0] if a else "count"
    secs = (a[a.index("--sections") + 1] if "--sections" in a else "03,04").split(",")
    per = int(a[a.index("--per-batch") + 1]) if "--per-batch" in a else 30
    out = os.path.join(ROOT, a[a.index("--out") + 1]) if "--out" in a else os.path.join(ROOT, "reports/audit-v2/sources-local/claim-check")
    total, units = 0, []
    if cmd == "extract":
        os.makedirs(os.path.join(out, "batches"), exist_ok=True)
    for p in pages(secs):
        cs = claims_of(os.path.join(ROOT, p))
        total += len(cs)
        if cmd != "extract" or not cs:
            continue
        for k in range(0, len(cs), per):
            chunk = cs[k:k + per]
            uid = "claims/" + p[len("docs/"):-len(".mdx")].replace("/", "__") + (f"__part{k // per + 1}" if len(cs) > per else "")
            for j, c in enumerate(chunk):
                c["id"] = f"{uid.split('/', 1)[1]}#{k + j + 1}"
            json.dump({"page": p, "claims": chunk}, open(os.path.join(out, "batches", uid.split("/", 1)[1] + ".json"), "w"), indent=1)
            units.append(uid)
    if cmd == "extract":
        json.dump(units, open(os.path.join(out, "units.json"), "w"), indent=1)
    print(f"{total} claims on {len(pages(secs))} pages" + (f"; {len(units)} batches -> {out}" if cmd == "extract" else ""))


if __name__ == "__main__":
    main()
