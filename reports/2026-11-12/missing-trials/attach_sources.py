#!/usr/bin/env python3
"""Give every report of the listed trials a local source file so the claim checkers read the same text.
For a report whose source.file is null or missing: use trials-2026-11-12/<doi slug>.fulltext.txt or <doi slug>.txt
(or pmid_<PMID>.txt), fetching the Crossref/PubMed/PMC record first when no file exists; source.level stays as the
author recorded it. source.file is not part of any claim
binding, so this never changes a claim key. Usage: attach_sources.py ID [ID ...] (writes the repo file and the work copy)."""
import json, re, subprocess, sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent; ROOT = HERE.parents[2]
SD = ROOT / "reports/audit-v2/sources-local/trials-2026-11-12"


def slug(d):
    return re.sub(r"[^a-z0-9]+", "_", d.lower()).strip("_")


def local(r):
    cands = []
    if r.get("doi"):
        s = slug(r["doi"]); cands += [SD / f"{s}.fulltext.txt", SD / f"{s}.txt"]
    if r.get("pmid"):
        cands += [SD / f"pmid_{r['pmid']}.txt"]
    return next((c for c in cands if c.exists()), None)


changed = 0
for tid in sys.argv[1:]:
    p = ROOT / "src/data/clinical-evidence/trials" / f"{tid}.json"
    d = json.loads(p.read_text()); dirty = False
    for r in d["reports"]:
        src = r.setdefault("source", {})
        if src.get("file") and pathlib.Path(src["file"]).is_file():
            continue
        f = local(r)
        if not f and (r.get("doi") or r.get("pmid")):
            arg = f"{r['doi']}={r.get('pmid') or ''}".rstrip("=") if r.get("doi") else None
            if arg:
                subprocess.run([sys.executable, str(HERE / "fetch_sources.py"), "--dois", arg], capture_output=True)
            f = local(r)
        if f:
            src["file"] = str(f)
            dirty = True; changed += 1
            print(tid, r["id"], "->", f.name, src["level"])
        else:
            print(tid, r["id"], "NO LOCAL SOURCE", r.get("doi"), r.get("pmid"))
    if dirty:
        txt = json.dumps(d, indent=2, ensure_ascii=False) + "\n"
        p.write_text(txt)
        w = HERE / "work" / tid / f"{tid}.json"
        if w.parent.exists():
            w.write_text(txt)
print("attached", changed)
