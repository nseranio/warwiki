#!/bin/zsh
# Apply pending agreed edits, then lint and build. Prints problems; commits nothing.
cd "$(dirname $0)/../.."
L=reports/audit-v2/sources-local/full-review
python3 scripts/review/apply.py apply | head -3
# references left uncited by applied edits: remove and renumber (reported)
node scripts/check-citations.js 2>&1 | python3 -c "
import sys,re,subprocess
cur=None
for line in sys.stdin:
    m=re.match(r'\s+(docs/\S+\.mdx)\s*$',line)
    if m: cur=m.group(1); continue
    m=re.search(r'has <a id=\"ref(\d+)\"> anchor but no citation',line)
    if m and cur:
        print('orphan', cur, m.group(1)); subprocess.run(['python3','scripts/review/drop_ref.py',cur,m.group(1)])
"
npm run lint > $L/lint.log 2>&1; LINT=$?; echo LINT=$LINT
grep -A12 "✗" $L/lint.log | head -40
npm run build > $L/build.log 2>&1; BUILD=$?; echo BUILD=$BUILD
grep -A3 "MDX compilation failed" $L/build.log | grep -v "^--" | head -30
git checkout -- src/data/stats.json 2>/dev/null
[ "$LINT" = 0 ] && [ "$BUILD" = 0 ]
