#!/bin/zsh
# Unattended coherence sweep: batches of N pages until none remain, MAX batches or a STOP file appears.
# usage: scripts/voice/coherence_loop.sh <repo root> <batch prefix> <N> <MAX>
# Stop cleanly between batches: touch <runs>/coherence-STOP
HERE=$(cd "$(dirname $0)" && pwd)
ROOT=$1; PREFIX=$2; N=$3; MAX=$4
[[ $ROOT == *WHITWIKI* ]] && RUNS=$ROOT/reviews/runs || RUNS=$ROOT/reports/audit-v2/sources-local
LOG=$RUNS/coherence-loop.log
for i in $(seq 1 $MAX); do
  [ -e $RUNS/coherence-STOP ] && { echo "$(date) STOP file: ending" >> $LOG; break; }
  NAME=$PREFIX-b$(printf %02d $i)
  [ -d $RUNS/$NAME ] && [ -e $RUNS/$NAME/published ] && continue
  echo "$(date) $NAME select" >> $LOG
  [ -d $RUNS/$NAME ] || python3 $HERE/coherence_sweep.py --root $ROOT select $NAME $N >> $LOG 2>&1
  [ "$(cat $RUNS/$NAME/units.json 2>/dev/null)" = "[]" ] && { echo "$(date) no candidates left: done" >> $LOG; break; }
  echo "$(date) $NAME rewrite" >> $LOG
  python3 $HERE/coherence_sweep.py --root $ROOT rewrite $NAME >> $LOG 2>&1
  echo "$(date) $NAME gate" >> $LOG
  python3 $HERE/coherence_sweep.py --root $ROOT gate $NAME >> $LOG 2>&1
  echo "$(date) $NAME publish" >> $LOG
  if python3 $HERE/coherence_sweep.py --root $ROOT publish $NAME auto >> $LOG 2>&1; then
    touch $RUNS/$NAME/published; echo "$(date) $NAME PUBLISHED" >> $LOG
  else
    echo "$(date) $NAME PUBLISH FAILED: stopping" >> $LOG; break
  fi
done
echo "$(date) loop exit" >> $LOG
