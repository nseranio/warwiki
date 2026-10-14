#!/bin/bash
# Apply all reviewed rows, then hold back the defer-gate rows as a patch on top of the published state.
# Usage: split_deferred.sh <section dir> <docs subdir>
# decisions.tsv: rows to hold back carry decision "defer-gate"; this script treats them as apply for the full state.
set -e
S=$1; D=$2; A=reports/2026-10-15/wording-sweep/apply_fixes.py
git checkout -- "$D"
awk -F'\t' 'BEGIN{OFS="\t"} $2=="defer-gate"{$2="apply"} {print}' $S/decisions.tsv > $S/.decisions-full.tsv
python3 $A $S/pass2-codex.tsv $S/.decisions-full.tsv > /dev/null
mkdir -p $S/.full; git diff --name-only -- "$D" | while read f; do mkdir -p "$S/.full/$(dirname $f)"; cp "$f" "$S/.full/$f"; done
git checkout -- "$D"
python3 $A $S/pass2-codex.tsv $S/decisions.tsv
git stash list >/dev/null
rm -f $S/deferred-claim-edits.patch
(cd $S/.full && find docs -name '*.mdx') | while read f; do
  diff -u --label "a/$f" --label "b/$f" "$f" "$S/.full/$f" >> $S/deferred-claim-edits.patch || true
done
rm -rf $S/.full $S/.decisions-full.tsv
echo "deferred patch: $(grep -c '^+++' $S/deferred-claim-edits.patch 2>/dev/null || echo 0) files"
