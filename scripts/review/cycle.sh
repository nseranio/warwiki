#!/bin/zsh
# Apply pending agreed edits, then lint and build. Prints problems; commits nothing.
cd "$(dirname $0)/../.."
L=${REVIEW_WORK:-reports/audit-v2/sources-local/full-review}
python3 scripts/review/apply.py apply | head -40
# references left uncited by applied edits: remove and renumber (reported)
node scripts/check-citations.js 2>&1 | python3 -c "
import sys,re,subprocess
cur=None
orph={}
for line in sys.stdin:
    m=re.match(r'\s+(docs/\S+\.mdx)\s*$',line)
    if m: cur=m.group(1); continue
    m=re.search(r'has <a id=\"ref(\d+)\"> anchor but no citation',line)
    if m and cur: orph.setdefault(cur,[]).append(int(m.group(1)))
for f,ns in orph.items():
    for n in sorted(ns, reverse=True):
        print('orphan', f, n); subprocess.run(['python3','scripts/review/drop_ref.py',f,str(n)])
"
# record the run (schema 2): checks that opened a source support claims; claims rewritten by applied edits become
# corrected-unconfirmed and fail the gate until a final-text check: gate.py pending <touched files> --out <dir>,
# orchestrate.py --work <dir> --claims --reviewers 1 --verifiers 1, then gate.py record <dir>
[ -d $L/status ] && python3 scripts/review/gate.py record $L
npm run lint > $L/lint.log 2>&1; LINT=$?; echo LINT=$LINT
grep -A3 "unverified" $L/lint.log | head -20
grep -A12 "✗" $L/lint.log | head -40
npm run build > $L/build.log 2>&1; BUILD=$?; echo BUILD=$BUILD
grep -A3 "MDX compilation failed" $L/build.log | grep -v "^--" | head -30
git checkout -- src/data/stats.json 2>/dev/null
[ "$LINT" = 0 ] && [ "$BUILD" = 0 ]
