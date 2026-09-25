#!/usr/bin/env python3
"""Invariant + style checker for a WARWIKI voice-only rewrite.

usage: check_voice_diff.py ORIGINAL REVISED [--json]

Hard invariants (FAIL): frontmatter, imports, JSX/component lines, image lines,
table rows, heading text, References section, citation-marker multiset, link
targets. Soft signals (WARN): numbers that disappeared or appeared, >20% word
loss. Style metrics are reported per 1,000 prose words, before -> after.
"""
import re, sys, json, collections

def split(t):
    fm = ''
    m = re.match(r'^---\n.*?\n---\n', t, flags=re.S)
    if m: fm, t = m.group(0), t[m.end():]
    idx = t.find('\n## References')
    body, refs = (t[:idx], t[idx:]) if idx >= 0 else (t, '')
    return fm, body, refs

def lines_where(body, pred):
    return [l.rstrip() for l in body.split('\n') if pred(l)]

def prose_lines(body):
    out, in_code = [], False
    for l in body.split('\n'):
        if l.startswith('```'): in_code = not in_code; continue
        if in_code or l.startswith(('import ', '|', '!', '<', '#')): continue
        out.append(l)
    return '\n'.join(out)

CITE = re.compile(r'\[\[(\d+)\]\]\(#ref\1\)')
LINK = re.compile(r'\]\(([^)\s]+)\)|href="([^"]+)"')
NUM = re.compile(r'(?<![\w#])(\d+(?:[.,]\d+)*(?:\s?%)?)')
STYLE = {
    'em_dash': re.compile('—'),
    'bold': re.compile(r'\*\*[^*\n]+\*\*'),
    'arrow_in_prose': re.compile('→'),
    'signposting': re.compile(r'\b(importantly|notably|interestingly|of note|it is worth noting|this highlights|this underscores|taken together|overall,|ultimately,|in summary|in conclusion)\b', re.I),
    'empty_evaluation': re.compile(r'\b(crucial|critical|essential|key|vital|paramount|pivotal|robust|promising|excellent|powerful|innovative|remarkable|well-established|gold[- ]standard)\b', re.I),
    'generic_closer': re.compile(r'\b(individuali[sz]ed|shared decision[- ]making|careful (patient )?selection|further research is needed)\b', re.I),
    'contrast_tic': re.compile(r'\brather than\b|\bnot [^.\n]{1,40}— ', re.I),
    'this_opener': re.compile(r'(^|[.!?]\s)This (is|means|makes|matters|reflects)\b'),
    'reader_address': re.compile(r'\b(you|your|we|our|let\'s)\b', re.I),
}

def words(s): return len(re.findall(r'\b\w+\b', re.sub(r'<[^>]+>', '', s)))

def check(orig_t, rev_t):
    fo, bo, ro = split(orig_t); fr, br, rr = split(rev_t)
    fails, warns = [], []
    if fo != fr: fails.append('frontmatter changed')
    if ro.strip() != rr.strip(): fails.append('References section changed')
    for name, pred in [
        ('import lines', lambda l: l.startswith('import ')),
        ('component/JSX lines', lambda l: l.lstrip().startswith('<') and not l.lstrip().startswith(('<sup', '<a id'))),
        ('image lines', lambda l: l.startswith('![')),
        ('headings', lambda l: l.startswith('#')),
    ]:
        a, b = lines_where(bo, pred), lines_where(br, pred)
        if a != b:
            gone = [x for x in a if x not in b][:3]; new = [x for x in b if x not in a][:3]
            fails.append(f'{name} changed (orig {len(a)}, rev {len(b)}); removed e.g. {gone}; added e.g. {new}')
    # Tables: prose inside cells may change; structure, first-column labels,
    # numbers and citation markers per row may not.
    def rows(b): return [l.strip() for l in b.split('\n') if l.startswith('|')]
    def cells(r): return [c.strip() for c in r.strip('|').split('|')]
    def unbold(s): return re.sub(r'\*\*', '', s).strip()
    ta, tb = rows(bo), rows(br)
    if len(ta) != len(tb):
        fails.append(f'table row count changed {len(ta)} -> {len(tb)}')
    else:
        for i, (x, y) in enumerate(zip(ta, tb)):
            cx, cy = cells(x), cells(y)
            if len(cx) != len(cy): fails.append(f'table row {i+1}: cell count {len(cx)} -> {len(cy)}'); continue
            if unbold(cx[0]) != unbold(cy[0]): fails.append(f'table row {i+1}: first-column label changed {cx[0]!r} -> {cy[0]!r}')
            if collections.Counter(CITE.findall(x)) != collections.Counter(CITE.findall(y)): fails.append(f'table row {i+1}: citation markers changed')
            nx = collections.Counter(n.replace(' ', '') for n in NUM.findall(CITE.sub('', x)))
            ny = collections.Counter(n.replace(' ', '') for n in NUM.findall(CITE.sub('', y)))
            if nx != ny: fails.append(f'table row {i+1}: numbers changed, missing {sorted((nx-ny).elements())} added {sorted((ny-nx).elements())}')
    co, cr = collections.Counter(CITE.findall(bo)), collections.Counter(CITE.findall(br))
    if co != cr:
        fails.append(f'citation markers changed: missing {dict(co - cr)}, extra {dict(cr - co)}')
    lo = collections.Counter(a or b for a, b in LINK.findall(bo)); lr = collections.Counter(a or b for a, b in LINK.findall(br))
    if set(lo) != set(lr):
        fails.append(f'link targets changed: missing {sorted(set(lo) - set(lr))[:5]}, extra {sorted(set(lr) - set(lo))[:5]}')
    strip_c = lambda s: CITE.sub('', s)
    no = collections.Counter(n.replace(' ', '') for n in NUM.findall(strip_c(prose_lines(bo))))
    nr = collections.Counter(n.replace(' ', '') for n in NUM.findall(strip_c(prose_lines(br))))
    lost = sorted((no - nr).elements()); added = sorted((nr - no).elements())
    lost_distinct = sorted(set(lost) - set(nr))
    if lost_distinct: warns.append(f'numbers no longer anywhere in prose: {lost_distinct}')
    if added: warns.append(f'numbers added to prose: {sorted(set(added) - set(no))}')
    wo, wr = words(prose_lines(bo)), words(prose_lines(br))
    if wr < 0.8 * wo: warns.append(f'prose words fell {wo} -> {wr} ({(wr - wo) / wo:+.0%})')
    po, pr = prose_lines(bo), prose_lines(br)
    conn = re.compile(r'\b(since|because|therefore|thus|hence|so that)\b', re.I)
    if len(conn.findall(pr)) > len(conn.findall(po)):
        warns.append(f'causal connectives added: {len(conn.findall(po))} -> {len(conn.findall(pr))} (STYLE section 3 forbids adding them)')
    style = {k: (round(len(rx.findall(po)) / max(wo, 1) * 1000, 1), round(len(rx.findall(pr)) / max(wr, 1) * 1000, 1)) for k, rx in STYLE.items()}
    return {'fails': fails, 'warns': warns, 'prose_words': (wo, wr), 'style_per_1k': style}

if __name__ == '__main__':
    r = check(open(sys.argv[1]).read(), open(sys.argv[2]).read())
    if '--json' in sys.argv: print(json.dumps(r, indent=1))
    else:
        print('FAIL' if r['fails'] else 'PASS', f"prose words {r['prose_words'][0]} -> {r['prose_words'][1]}")
        for f in r['fails']: print('  FAIL:', f)
        for w in r['warns']: print('  WARN:', w)
        print('  style per 1k words (before -> after):', ', '.join(f'{k} {a}->{b}' for k, (a, b) in r['style_per_1k'].items()))
    sys.exit(1 if r['fails'] else 0)
