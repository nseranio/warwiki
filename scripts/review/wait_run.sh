#!/bin/zsh
# usage: scripts/review/wait_run.sh <min_new_done> <max_minutes> <run> [run...]
cd /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local
N=$1; M=$2; shift 2
cnt() { for r in "$@"; do python3 -c "
import json; s=json.load(open('$r/state.json')); print(sum(1 for v in s['pages'].values() if v.get('status')=='done'))"; done | paste -sd+ - | bc; }
base=$(cnt "$@"); start=$(date +%s)
while true; do
  sleep 60
  now=$(cnt "$@"); alive=$(pgrep -f "orchestrate.py" | wc -l | tr -d ' ')
  if [ $((now-base)) -ge $N ] || [ $(( ($(date +%s)-start)/60 )) -ge $M ] || [ "$alive" = 0 ]; then
    echo "done base=$base now=$now alive=$alive"; for r in "$@"; do tail -1 $r/orchestrator.log; grep -c "ok=False" $r/orchestrator.log; done; break; fi
done
