#!/usr/bin/env python3
"""Advisory per-page style metrics (STYLE-draft-v3). Not part of `npm run lint`.

usage: voice-report.py [PATH ...] [--top N] [--sort KEY] [--json]

PATH is a file or directory (default: docs/). Rates are per 1,000 prose words.
Prose excludes front matter, headings, tables, JSX, images and References.
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_voice_diff import STYLE, split, prose_lines, words  # noqa: E402

def page_metrics(path):
    t = open(path, encoding='utf-8').read()
    _, body, _ = split(t)
    prose = prose_lines(body)
    w = words(prose)
    m = {'words': w}
    for k, rx in STYLE.items(): m[k] = round(len(rx.findall(prose)) / max(w, 1) * 1000, 1)
    m['sentences_over_40w'] = sum(1 for s in re.split(r'(?<=[.!?])\s+', prose) if words(s) > 40)
    return m

def files(paths):
    for p in paths:
        if os.path.isfile(p): yield p
        else:
            for root, _, fs in os.walk(p):
                for f in sorted(fs):
                    if f.endswith(('.md', '.mdx')): yield os.path.join(root, f)

def main():
    a = sys.argv[1:]
    top = int(a[a.index('--top') + 1]) if '--top' in a else 15
    key = a[a.index('--sort') + 1] if '--sort' in a else 'em_dash'
    paths = [x for i, x in enumerate(a) if not x.startswith('--') and (i == 0 or a[i - 1] not in ('--top', '--sort'))] or ['docs']
    rows = {f: page_metrics(f) for f in files(paths)}
    tot_w = sum(m['words'] for m in rows.values())
    totals = {k: round(sum(m[k] * m['words'] for m in rows.values()) / max(tot_w, 1), 1) for k in list(STYLE) }
    if '--json' in a:
        print(json.dumps({'pages': rows, 'site_per_1k': totals, 'words': tot_w}, indent=1)); return 0
    print(f'{len(rows)} pages, {tot_w:,} prose words. Site rates per 1,000 words:')
    print('  ' + ', '.join(f'{k} {v}' for k, v in totals.items()))
    print(f'\nTop {top} pages by {key}:')
    for f, m in sorted(rows.items(), key=lambda kv: -kv[1].get(key, 0))[:top]:
        print(f"  {m[key]:>6}  {m['words']:>6}w  {f}")
    return 0

if __name__ == '__main__':
    sys.exit(main())
