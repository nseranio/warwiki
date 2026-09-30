#!/usr/bin/env python3
"""Parse textbook-mining findings (YAML blocks in findings/<BOOK>/chNNN.md)
into one JSON index grouped by target WARWIKI page.

Usage: python3 build_index.py [findings_dir ...] > /dev/null
Writes index.json and pages.tsv next to this script.
"""
import sys, os, re, json, glob, yaml
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
dirs = sys.argv[1:] or [os.path.expanduser('~/Desktop/WARWIKI-textbook-mining/findings')]
SKIP = {'AUACORE'}

def norm_target(t):
    if not t: return ''
    t = t.strip().strip('`')
    if t.startswith('/Users/'):
        t = t.split('/warwiki/', 1)[-1]
    return t

findings, errors = [], []
for d in dirs:
    for f in sorted(glob.glob(os.path.join(d, '*', 'ch*.md'))):
        book = os.path.basename(os.path.dirname(f))
        if book in SKIP: continue
        txt = open(f, encoding='utf-8').read()
        # Findings are YAML list items starting "- id:", fenced or not.
        # Split into per-item chunks and parse each one on its own.
        lines = txt.split('\n')
        chunks, cur = [], None
        for ln in lines:
            if re.match(r'^\s*- id:\s*[A-Z0-9]+-\d+-\d+', ln):
                if cur: chunks.append(cur)
                cur = [ln]
            elif cur is not None:
                if ln.startswith('```') or re.match(r'^#{1,6} ', ln):
                    chunks.append(cur); cur = None
                else:
                    cur.append(ln)
        if cur: chunks.append(cur)
        for ch in chunks:
            ind = len(ch[0]) - len(ch[0].lstrip())
            blk = '\n'.join(l[ind:] if l[:ind].strip() == '' else l for l in ch)
            try:
                data = yaml.safe_load(blk)
            except Exception as e:
                # retry: trim trailing lines until it parses
                data = None
                for cut in range(1, min(15, len(ch))):
                    try:
                        data = yaml.safe_load('\n'.join(blk.split('\n')[:-cut])); break
                    except Exception: pass
                if data is None:
                    errors.append((f, ch[0].strip(), str(e)[:100])); continue
            if isinstance(data, dict): data = [data]
            for it in data or []:
                if not isinstance(it, dict) or 'id' not in it: continue
                it['book'] = book
                it['source_file'] = f
                it['target_file'] = norm_target(it.get('target_file'))
                findings.append(it)

# de-dup ids (a finding id can appear twice if a book was re-run)
seen = {}
for it in findings: seen[it['id']] = it
findings = list(seen.values())

by_page = defaultdict(list)
for it in findings:
    by_page[it['target_file'] or '(none)'].append(it['id'])

json.dump({'findings': findings, 'by_page': by_page}, open(os.path.join(HERE, 'index.json'), 'w'), indent=1, default=str)
prio = {'high': 0, 'medium': 1, 'low': 2}
with open(os.path.join(HERE, 'pages.tsv'), 'w') as out:
    out.write('target_file\texists\tn\thigh\tmedium\tlow\tconflict\tnew_page\tbooks\n')
    rows = []
    for p, ids in by_page.items():
        its = [seen[i] for i in ids]
        c = lambda k, v: sum(1 for x in its if str(x.get(k, '')).strip() == v)
        exists = os.path.exists(os.path.join(REPO, p)) if p != '(none)' else False
        books = ','.join(sorted({x['book'] for x in its}))
        rows.append((p, exists, len(its), c('priority','high'), c('priority','medium'), c('priority','low'), c('type','conflict'), c('type','new_page'), books))
    for r in sorted(rows, key=lambda r: (-r[3], -r[4], -r[2])):
        out.write('\t'.join(map(str, r)) + '\n')
print(f'{len(findings)} findings, {len(by_page)} target pages, {len(errors)} parse errors', file=sys.stderr)
for e in errors[:20]: print('ERR', e, file=sys.stderr)
