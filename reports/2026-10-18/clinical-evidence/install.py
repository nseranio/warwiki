#!/usr/bin/env python3
"""Copy finished Codex outputs into the site: trial file -> src/data/clinical-evidence/trials, page ->
docs/06-clinical-evidence/studies. Merges adjacent citation groups (</sup><sup>) into one, as on other WARWIKI pages.
Usage: install.py <work dir> [id ...]"""
import json, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parents[3]
work = pathlib.Path(sys.argv[1])
ids = sys.argv[2:] or sorted(p.name for p in work.iterdir() if p.is_dir())
for tid in ids:
    d = work / tid
    j, m = d / f"{tid}.json", d / f"{tid}.mdx"
    if not (j.exists() and m.exists()):
        print("missing", tid); continue
    data = json.loads(j.read_text())
    (ROOT / "src/data/clinical-evidence/trials" / f"{tid}.json").write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    page = re.sub(r"</sup>\s*<sup>", "", m.read_text())
    (ROOT / "docs/06-clinical-evidence/studies" / f"{tid}.mdx").write_text(page)
    print("installed", tid)
