#!/usr/bin/env python3
"""Select pages for a Pass 1 sweep batch (see STYLE.md and the warwiki-voice-editor agent).

usage: sweep_select.py [--tier N ...] [--n 60] [--reverse]  -> prints one page path per line

Excludes: pages already in reports/voice/status.json, pages with uncommitted
changes, the next 30 pages of the audit queue, and pages with fewer than 3
Pass 1 units. Default tiers 4, 3, 2, 1 in that order; queue order within a tier (--reverse for the end of a tier first).
"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pass1 import extract  # noqa: E402

def main():
    a = sys.argv[1:]
    tiers = [int(a[i + 1]) for i, x in enumerate(a) if x == '--tier'] or [4, 3, 2, 1]
    n = int(a[a.index('--n') + 1]) if '--n' in a else 60
    q = json.load(open('reports/audit-v2/queue.json'))['pages']
    items = q if isinstance(q, list) else [dict(path=k, **v) for k, v in q.items()]
    done = set(json.load(open('reports/voice/status.json')).get('pages', {})) if os.path.exists('reports/voice/status.json') else set()
    dirty = {l[3:].strip() for l in subprocess.check_output(['git', 'status', '--short']).decode().splitlines()}
    nxt = {l.split('|')[1].strip() for l in subprocess.check_output(['python3', 'scripts/audit/audit.py', 'next', '30']).decode().splitlines() if '|' in l}
    out = []
    for t in tiers:
        cand = [i for i in items if i.get('tier') == t]
        if '--reverse' in a: cand.reverse()
        for i in cand:
            p = i.get('file')
            if not p or p in done or p in dirty or p in nxt or not os.path.exists(p): continue
            if len(extract(p)[2]) < 3: continue
            out.append(p)
            if len(out) >= n: break
        if len(out) >= n: break
    print('\n'.join(out))

if __name__ == '__main__':
    main()
