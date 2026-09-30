#!/usr/bin/env python3
"""Split index.json into page batches for incorporation agents.

Existing target pages are grouped by folder into batches of roughly
TARGET findings (a page is never split). Findings whose target page does
not exist yet (new_page proposals) go to batches/new-pages.json for a
separate decision pass.
"""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
TARGET = 45
d = json.load(open(os.path.join(HERE, 'index.json')))
F = {f['id']: f for f in d['findings']}
os.makedirs(os.path.join(HERE, 'batches'), exist_ok=True)
existing, missing = [], []
for page, ids in d['by_page'].items():
    (existing if page != '(none)' and os.path.exists(os.path.join(REPO, page)) else missing).append((page, ids))
existing.sort()
batches, cur, n, curdir = [], [], 0, None
for page, ids in existing:
    pdir = '/'.join(page.split('/')[:3])
    if cur and (n + len(ids) > TARGET * 1.3 or (pdir != curdir and n >= TARGET * 0.6)):
        batches.append(cur); cur, n = [], 0
    cur.append((page, ids)); n += len(ids); curdir = pdir
if cur: batches.append(cur)
summary = []
for i, b in enumerate(batches, 1):
    name = f'b{i:02d}'
    json.dump({'batch': name, 'pages': {p: [F[x] for x in ids] for p, ids in b}},
              open(os.path.join(HERE, 'batches', name + '.json'), 'w'), indent=1, default=str)
    summary.append((name, len(b), sum(len(ids) for _, ids in b), b[0][0].split('/')[1:4]))
json.dump({'batch': 'new-pages', 'pages': {p: [F[x] for x in ids] for p, ids in missing}},
          open(os.path.join(HERE, 'batches', 'new-pages.json'), 'w'), indent=1, default=str)
for s in summary: print(*s)
print('new-pages', len(missing), sum(len(i) for _, i in missing))
