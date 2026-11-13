#!/usr/bin/env python3
"""Install reviewed fix-pass outputs: work-fix/<wave>/<id>/<id>.{json,mdx} -> site tree and work/<id>/.
Usage: install_fix.py WAVE [id ...]   (default: every id in work-fix/WAVE with notes.md). Skips ids in work-fix/WAVE/veto.txt."""
import json, pathlib, sys, shutil
HERE = pathlib.Path(__file__).resolve().parent; ROOT = HERE.parents[2]
wave = sys.argv[1]; base = HERE / "work-fix" / wave
veto = set((base / "veto.txt").read_text().split()) if (base / "veto.txt").exists() else set()
ids = sys.argv[2:] or sorted(p.name for p in base.iterdir() if p.is_dir() and (p / "notes.md").exists())
for tid in ids:
    if tid in veto: continue
    d = base / tid
    data = json.loads((d / f"{tid}.json").read_text())
    txt = json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    for dst in (ROOT / "src/data/clinical-evidence/trials" / f"{tid}.json", HERE / "work" / tid / f"{tid}.json"):
        if dst.parent.exists(): dst.write_text(txt)
    for dst in (ROOT / "docs/06-clinical-evidence/studies" / f"{tid}.mdx", HERE / "work" / tid / f"{tid}.mdx"):
        if dst.parent.exists(): shutil.copy(d / f"{tid}.mdx", dst)
    print("installed", tid)
