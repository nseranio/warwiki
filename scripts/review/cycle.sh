#!/bin/zsh
# Apply pending agreed edits, then lint and build. Prints problems; commits nothing.
cd "$(dirname $0)/../.."
L=reports/audit-v2/sources-local/full-review
python3 scripts/review/apply.py apply | head -3
npm run lint > $L/lint.log 2>&1; LINT=$?; echo LINT=$LINT
grep -A12 "✗" $L/lint.log | head -40
npm run build > $L/build.log 2>&1; BUILD=$?; echo BUILD=$BUILD
grep -A3 "MDX compilation failed" $L/build.log | grep -v "^--" | head -30
git checkout -- src/data/stats.json 2>/dev/null
[ "$LINT" = 0 ] && [ "$BUILD" = 0 ]
