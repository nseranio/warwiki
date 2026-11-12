#!/usr/bin/env python3
"""Install finished drafts: work/<id>/<id>.json -> src/data/clinical-evidence/trials, <id>.mdx -> docs/06-clinical-evidence/studies.
Usage: install.py [id ...]   (default: every work/<id> with all three outputs). Skips ids listed in held.txt."""
import json, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent; ROOT = HERE.parents[2]
held = set((HERE / "held.txt").read_text().split()) if (HERE / "held.txt").exists() else set()
ids = sys.argv[1:] or sorted(p.name for p in (HERE / "work").iterdir() if p.is_dir())
n = 0
for tid in ids:
    d = HERE / "work" / tid
    j, m = d / f"{tid}.json", d / f"{tid}.mdx"
    if tid in held or not (j.exists() and m.exists() and (d / "notes.md").exists()):
        continue
    data = json.loads(j.read_text())
    (ROOT / "src/data/clinical-evidence/trials" / f"{tid}.json").write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    (ROOT / "docs/06-clinical-evidence/studies" / f"{tid}.mdx").write_text(m.read_text())
    n += 1
print("installed", n)
