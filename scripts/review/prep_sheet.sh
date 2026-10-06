#!/bin/zsh
# usage: scripts/review/prep_sheet.sh <run> -> writes review sheet text to $SHEET_DIR/<run>.txt (default /tmp) and checks new DOIs on Crossref
cd /Users/joyboy/Documents/WARWIKI/warwiki
SP=${SHEET_DIR:-/tmp}  # where the readable sheet <run>.txt is written
export REVIEW_WORK=reports/audit-v2/sources-local/$1
python3 scripts/review/apply.py list | tail -1 | cut -c1-60
python3 - > $SP/$1.txt <<'PY'
import sys,re; sys.path.insert(0,'scripts/review')
from apply import accepted
strip=lambda s: re.sub(r'<sup>.*?</sup>','',s).strip()
n=0
for v in accepted()[0]:
    o,nw=v['edit']['old'],v['edit']['new']
    if strip(o)==strip(nw) and not v.get('new_refs'): n+=1; continue
    print('=====',v['id'],v['severity'],v['page'].split('/')[-1]); print('WHY:',(v.get('reason') or '')[:260]); print('OLD:',o[:380]); print('NEW:',nw[:560])
    for r in v.get('new_refs') or []: print('REF:',r['line'][:220])
print('marker-only edits:',n)
PY
wc -c < $SP/$1.txt
python3 scripts/review/new_dois.py | grep ^D | cut -c3- | tr ' ' '\n' | grep . | while read d; do curl -s "https://api.crossref.org/works/$d" | python3 -c "
import sys,json
try:
  m=json.load(sys.stdin)['message']; print('OK',m['DOI'],'|',m['title'][0][:70],'|',m.get('issued',{}).get('date-parts'),[a.get('family') for a in m.get('author',[])][:1])
except Exception as e: print('FAIL $d')"; done
