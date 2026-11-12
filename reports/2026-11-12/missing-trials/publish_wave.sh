#!/bin/zsh
# Publish one wave of new trials from a clean worktree (ported from WHITWIKI's missing-trials kit, November 12, 2026).
# Usage: [EXTRA=paths.txt] [PRUNE=1] publish_wave.sh WAVE_LIST_FILE COMMIT_MESSAGE_FILE [--push]
# Builds the commit from HEAD + the wave's trial files + decisions.json + EXTRA paths + a ledger of HEAD entries plus
# the current claim keys on the wave's pages; runs lint (claim gate included), typecheck and build there (prebuild
# regenerates trials.generated.json and surgeon citations); commits in the worktree; with --push, pushes to origin
# main and moves the main checkout's branch to it.
set -e
setopt pipefail
ROOT=/Users/joyboy/Documents/WARWIKI/warwiki
LIST=${1:A}; MSG=${2:A}; PUSH=$3
WT=/private/tmp/claude-501/-Users-joyboy--claude-spares-spare-wWyOmu/dd436380-879d-498d-ac22-671e08737c21/scratchpad/wt-warwiki
cd $ROOT
git worktree remove --force $WT 2>/dev/null || true
git worktree add --detach $WT HEAD >/dev/null
ln -s $ROOT/node_modules $WT/node_modules
FILES=()
for i in $(cat $LIST); do FILES+=(src/data/clinical-evidence/trials/$i.json docs/06-clinical-evidence/studies/$i.mdx); done
FILES+=(src/data/clinical-evidence/decisions.json)
# Optional EXTRA=<file>: further repo paths (one per line), such as edited existing pages or kit files.
if [[ -n "$EXTRA" ]]; then for x in $(cat ${EXTRA:A}); do FILES+=($x); done; fi
for f in $FILES; do mkdir -p $WT/$(dirname $f); cp $f $WT/$f; done
# PRUNE=1: drop decision points and lanes no trial uses yet (partial waves), in the worktree copy only.
if [[ -n "$PRUNE" ]]; then python3 $ROOT/reports/2026-11-12/missing-trials/prune_decisions.py $WT; fi
python3 - $WT ${FILES[@]} <<'PY'
import json, sys, subprocess, os
wt, files = sys.argv[1], sys.argv[2:]
root = os.getcwd()
sys.path.insert(0, os.path.join(root, 'scripts/review'))
import gate
head = json.loads(subprocess.check_output(['git', 'show', 'HEAD:reports/audit-v2/claims-ledger.json']))
cur = json.load(open(gate.LEDGER))
keys = set()
for f in files:
    if f.endswith('decisions.json') or not f.endswith(('.mdx', '.json')) or not (f.startswith('docs/') or f.startswith('src/data/clinical-evidence/trials/')):
        continue
    for u in gate.units_of(f):
        keys.add(u['key'])
added = 0
for k in keys:
    if k in cur and head.get(k) != cur[k]:
        head[k] = cur[k]; added += 1
json.dump(head, open(os.path.join(wt, 'reports/audit-v2/claims-ledger.json'), 'w'), indent=0, sort_keys=True)
print('ledger: HEAD +', added, 'entries for', len(keys), 'claim keys')
PY
cd $WT
node scripts/build-clinical-evidence.mjs >/dev/null
npm run lint > lint.log 2>&1 || { grep -iE "error|fail|✗" lint.log | head -30; tail -15 lint.log; exit 1; }
grep -E "Claim gate" lint.log | tail -1; rm lint.log
npm run typecheck 2>&1 | tail -2
npm run build > build.log 2>&1 || { tail -30 build.log; exit 1; }
tail -3 build.log; rm build.log
git checkout -q -- src/data/stats.json 2>/dev/null || true
git add ${FILES[@]} reports/audit-v2/claims-ledger.json src/data/clinical-evidence/trials.generated.json
git add -u src/data/surgeon-citations src/data/surgeon-profiles src/data/clinical-evidence 2>/dev/null || true
git status --short | grep -v '^??' | grep -v '^[AM] ' | head -10 || true
git diff --cached --stat | tail -1
git commit -q -F $MSG
git log -1 --oneline
if [[ "$PUSH" == "--push" ]]; then
  git push origin HEAD:main
  NEW=$(git rev-parse HEAD)
  cd $ROOT
  git update-ref refs/heads/main $NEW
  git reset -q -- . 2>/dev/null || true
  # generated files were rebuilt in the worktree; take the committed versions here
  git checkout -q -- src/data/clinical-evidence/trials.generated.json src/data/surgeon-citations src/data/surgeon-profiles 2>/dev/null || true
  git status --short | grep -v '^??' | head
fi
