#!/bin/zsh
# usage: scripts/review/publish_batch.sh <run-name> <commit message>
set -e
cd /Users/joyboy/Documents/WARWIKI/warwiki
D=reports/audit-v2/sources-local/$1
F=$(mktemp)
python3 -c "import json;print('\n'.join(json.load(open('$D/touched.json'))))" > $F
[ -s $F ] || { echo "nothing touched"; exit 0; }
xargs sed -i '' -E 's/[[:space:]]+$//' < $F
cp $F $F.g; [ -s $F.g ] && { xargs python3 scripts/review/gate.py check < $F.g > /dev/null || { echo "CLAIM GATE FAILS: not publishing"; xargs python3 scripts/review/gate.py check < $F.g | head; exit 1; }; }
grep -q "✗" $D/lint.log && { echo "LINT FAILED: not publishing"; grep -A3 "✗" $D/lint.log | head; exit 1; }
grep -q "\[SUCCESS\]" $D/build.log || { echo "BUILD LOG HAS NO SUCCESS: not publishing"; exit 1; }
xargs git diff --check -- < $F
xargs git add -- < $F
git add src/data/surgeon-citations reports/audit-v2/claims-ledger.json
git commit -q -m "$2

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q origin main || echo "PUSH FAILED: commit is local; retry later"
echo '[]' > $D/touched.json
git log --oneline -1
git status --short | grep -v '^??' || true
