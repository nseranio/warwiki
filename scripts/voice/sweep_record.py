#!/usr/bin/env python3
"""After a Pass 1 sweep batch: check each page against HEAD, revert failures,
prepare judge folders, and record results in reports/voice/status.json.

usage: sweep_record.py LISTFILE [--sample 0.2]

For every page: runs check_voice_diff against git HEAD. FAIL -> `git checkout -- page`
(only for pages that were clean before the batch) and logged. PASS -> recorded with
before/after style metrics. Writes <workdir>/original.mdx and pass1.mdx for judging
and prints the pages the judge should review (WARN pages plus a random sample).
"""
import json, os, random, subprocess, sys, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_voice_diff import check  # noqa: E402

def main():
    lst = [l.strip() for l in open(sys.argv[1]) if l.strip()]
    frac = float(sys.argv[sys.argv.index('--sample') + 1]) if '--sample' in sys.argv else 0.2
    sp = 'reports/voice/status.json'
    st = json.load(open(sp)) if os.path.exists(sp) else {'pages': {}, 'reverted': {}}
    random.seed(len(lst))
    judge, ok, failed, unchanged = [], 0, [], 0
    for p in lst:
        cur = open(p).read()
        head = subprocess.run(['git', 'show', f'HEAD:{p}'], capture_output=True, text=True).stdout
        if cur == head: unchanged += 1; continue
        r = check(head, cur)
        wd = 'reports/voice/work/' + p.replace('/', '__').replace('.mdx', '')
        os.makedirs(wd, exist_ok=True)
        if r['fails']:
            subprocess.check_call(['git', 'checkout', '--', p])
            st['reverted'][p] = r['fails'][:3]; failed.append(p); continue
        open(wd + '/original.mdx', 'w').write(head); open(wd + '/pass1.mdx', 'w').write(cur)
        st['pages'][p] = {'date': str(datetime.date.today()), 'words': r['prose_words'], 'style_per_1k': r['style_per_1k'], 'warns': r['warns']}
        ok += 1
        if r['warns'] or random.random() < frac: judge.append(wd)
    json.dump(st, open(sp, 'w'), indent=1, ensure_ascii=False)
    print(f'ok {ok}, unchanged {unchanged}, reverted {len(failed)}')
    for p in failed: print('REVERTED', p, st['reverted'][p])
    print('JUDGE:'); print('\n'.join(judge))

if __name__ == '__main__':
    main()
