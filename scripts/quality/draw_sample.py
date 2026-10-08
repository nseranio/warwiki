#!/usr/bin/env python3
"""Draw a reproducible simple random sample of eligible clinical/foundational pages.

  python3 scripts/quality/draw_sample.py --n 60 --seed 20261007 --out reports/quality/residual-sample-4.json
  python3 scripts/quality/draw_sample.py --n 60 --seed 20261008 --exclude reports/quality/residual-sample-4.json --out ...

Frame: every MDX page in docs/01-05 (hub index pages included), excluding surgeon profiles and files starting with "_".
Sections 07 (history and lineage) and 08 (resources) are outside the frame. Sampling is without replacement with equal
inclusion probability n/N; the frame, revision and seed are written before any review so the draw can be reproduced.
"""
import glob, json, os, random, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
a = sys.argv[1:]
n = int(a[a.index("--n") + 1]); seed = int(a[a.index("--seed") + 1]); out = a[a.index("--out") + 1]
frame = sorted(os.path.relpath(p, ROOT) for sec in ("01", "02", "03", "04", "05")
               for p in glob.glob(os.path.join(ROOT, "docs", sec + "*", "**", "*.mdx"), recursive=True)
               if "/07-roots/surgeons/" not in p and not os.path.basename(p).startswith("_"))
excluded = []
if "--exclude" in a:  # pages from an earlier sample (repaired with knowledge of its findings) leave the frame
    excluded = json.load(open(os.path.join(ROOT, a[a.index("--exclude") + 1])))["pages"]
    frame = [p for p in frame if p not in set(excluded)]
pages = sorted(random.Random(seed).sample(frame, n))
rev = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT).decode().strip()
json.dump({"revision": rev, "seed": seed, "n": n, "frame_size": len(frame), "inclusion_probability": n / len(frame),
           "frame_rule": __doc__.split("\n\n")[1].strip(), "excluded": excluded, "pages": pages, "frame": frame}, open(os.path.join(ROOT, out), "w"), indent=1)
print(f"{n} of {len(frame)} pages at {rev[:8]} -> {out}")
