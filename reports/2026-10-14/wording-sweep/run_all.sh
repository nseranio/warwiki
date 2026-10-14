#!/bin/bash
cd "$(dirname "$0")/../../.."
W=reports/2026-10-14/wording-sweep
for s in 02-evaluation 05-special-populations 04-surgical-techniques; do
  python3 reports/2026-10-15/wording-sweep/run_codex.py docs/$s $W/$s/codex --parallel 3 --per-job 7 --skip $W/busy-pages.txt
done
