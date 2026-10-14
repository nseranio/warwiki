#!/usr/bin/env python3
"""Apply reviewed wording-sweep fixes.
Usage: apply_fixes.py <candidates.tsv> <decisions.tsv> [--dry]
candidates.tsv: merged pass-2 rows with an `id` column.
decisions.tsv: id<TAB>decision(apply|skip|defer)<TAB>fix override (optional)<TAB>text override (optional)<TAB>note
Fixes: delete | delete keep citation | rewrite | fold into previous paragraph | move to <heading text>.
"delete keep citation" removes the sentence but moves its trailing citation (<sup>…</sup> or [^N] footnotes) onto the
end of the previous sentence, unless that sentence already ends with the same citation."""
import csv, re, sys, pathlib
csv.field_size_limit(10**7)
rows = {r["id"]: r for r in csv.DictReader(open(sys.argv[1]), delimiter="\t")}
dec = [r for r in csv.reader(open(sys.argv[2]), delimiter="\t") if r and not r[0].startswith("#") and r[0] != "id"]
dry = "--dry" in sys.argv
ROOT = pathlib.Path(__file__).resolve().parents[3]
texts, fails = {}, []

def remove(t, s):
    i = t.find(s)
    if i < 0:
        return None
    j = i + len(s)
    ls, le = t.rfind("\n", 0, i) + 1, t.find("\n", j)
    le = len(t) if le < 0 else le
    if t[ls:i].strip() in ("", ">", "-") and t[j:le].strip() == "":   # whole line/paragraph
        t = t[:ls] + t[le + 1:]
        return re.sub(r"\n{3,}", "\n\n", t)
    if j < len(t) and t[j] == " ":
        return t[:i] + t[j + 1:]
    if i > 0 and t[i - 1] == " ":
        return t[:i - 1] + t[j:]
    return t[:i] + t[j:]

for d in dec:
    d += [""] * (5 - len(d))
    rid, decision, fix_o, text_o = d[0], d[1], d[2], d[3]
    if decision != "apply":
        continue
    r = rows[rid]
    page = r["page"]
    p = ROOT / page[page.index("docs/"):]
    t = texts.get(p) or p.read_text()
    fix, s = (fix_o or r["fix"]).strip(), r["sentence"]
    new = (text_o or r["proposed_text"]).strip()
    if fix == "delete":
        u = remove(t, s)
    elif fix == "delete keep citation":
        m = re.search(r"((?:<sup>(?:(?!<sup>).)*</sup>)|(?:\[\^\d+\])+)$", s)
        i = t.find(s)
        if not m or i < 1 or t[i - 1] != " ":
            u = None
        else:
            cite, head = m.group(1), t[:i - 1]
            if head.endswith(cite):
                u = head + t[i + len(s):]
            elif head.endswith("</sup>") and cite.startswith("<sup>"):   # merge into the existing citation group
                u = head[:-len("</sup>")] + cite[len("<sup>"):] + t[i + len(s):]
            else:
                u = head + cite + t[i + len(s):]
    elif fix == "rewrite":
        u = t.replace(s, new, 1) if s in t else None
    elif fix.startswith("fold"):
        u = remove(t, s)
        if u is not None:
            i = t.find(s); ls = t.rfind("\n", 0, i) + 1
            m = u[:ls].rstrip("\n")   # end of the previous paragraph
            u = m + " " + new + u[len(m):] if new else u
    elif fix.startswith("move to"):
        target = fix[len("move to"):].strip().lstrip("#").strip().lower()
        u = remove(t, s)
        if u is not None:
            hs = [m for m in re.finditer(r"^#{2,4} (.+)$", u, re.M) if target in m.group(1).lower()]
            if not hs:
                u = None
            else:
                e = hs[0].end()
                u = u[:e] + "\n\n" + new + "\n" + u[e:]
                u = re.sub(r"\n{3,}", "\n\n", u)
    else:
        u = None
    if u is None:
        fails.append((rid, fix, s[:80]))
        continue
    texts[p] = u
for p, t in texts.items():
    if not dry:
        p.write_text(t)
    print("edited", p.relative_to(ROOT))
for f in fails:
    print("FAIL", *f)
