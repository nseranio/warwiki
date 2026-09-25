#!/usr/bin/env python3
"""Pass 1 voice tooling (STYLE-draft-v3 sections 1-2 and 5).

  pass1.py extract PAGE [--out batch.json]
      Pull only the prose paragraphs and list items that contain Pass 1
      patterns into a JSON batch with stable IDs. Headings, tables, JSX
      components, image lines, captions, code, front matter and References are
      never included.

  pass1.py apply PAGE BATCH EDITED [--out revised.mdx | --inplace]
      Re-insert edited text by ID, then run check_voice_diff against the
      original. Units that break a per-unit invariant (citation markers, link
      targets, numbers, list marker) are reverted individually. Nothing is
      written unless the whole-page check prints PASS.

EDITED is a JSON object {id: new_text} with exactly the IDs in BATCH.
"""
import argparse, collections, hashlib, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_voice_diff import check, CITE, LINK, NUM  # noqa: E402

LIST_RX = re.compile(r'^(\s*)([-*+]|\d+[.)])\s+')
BOLD = re.compile(r'\*\*[^*\n]+\*\*')

TRIGGERS = [
    ('em_dash', re.compile('—')),
    ('arrow', re.compile('→')),
    ('plus_or_equals_word', re.compile(r'\s[+=]\s(?!\d)')),
    ('vs', re.compile(r'\bvs\.?\s', re.I)),
    ('tilde', re.compile(r'~\s?\d')),
    ('slash_or', re.compile(r'\b[A-Za-z]{3,}/[A-Za-z]{3,}\b')),
    ('signposting', re.compile(r'\b(importantly|notably|interestingly|of note|it is worth noting|this highlights|this underscores|taken together|overall,|ultimately,|in summary|in conclusion)\b', re.I)),
    ('empty_evaluation', re.compile(r'\b(crucial|critical|essential|key|vital|paramount|pivotal|robust|promising|excellent|powerful|innovative|remarkable|well-established|workhorse|gold[- ]standard)\b', re.I)),
    ('editorial_brief', re.compile(r'\b(framed for|sits between|anchored on|the lens|the playbook|home run|the takeaway|owned by)\b', re.I)),
    ('contrast_tic', re.compile(r'\brather than\b|\bnot [^.\n]{1,40}— ', re.I)),
    ('generic_closer', re.compile(r'\b(individuali[sz]ed|shared decision[- ]making|careful (patient )?selection|further research is needed)\b', re.I)),
    ('reader_address', re.compile(r"\b(you|your|we|our|let's)\b", re.I)),
    ('shouting', re.compile(r'!|\b[A-Z]{4,}\b(?<!\bAUA)(?<!\bEAU)(?<!\bSUFU)')),
]

def neutral(s):
    """Text with citations, links, tags and inline code removed, for pattern tests."""
    s = CITE.sub('', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'\]\([^)]*\)', ']', s)
    s = re.sub(r'`[^`]*`', '', s)
    return s

def split_page(t):
    m = re.match(r'^---\n.*?\n---\n', t, flags=re.S)
    head = m.end() if m else 0
    idx = t.find('\n## References')
    end = idx if idx >= 0 else len(t)
    return head, end

def units(text, head, end):
    """Yield (start_line, end_line, lines) for each prose unit in the body."""
    lines = text.split('\n')
    pos, line_start = 0, []
    for l in lines:
        line_start.append(pos); pos += len(l) + 1
    first = next(i for i, p in enumerate(line_start) if p >= head) if head else 0
    last = len(lines)
    for i, p in enumerate(line_start):
        if p >= end: last = i; break
    out, cur, in_code, jsx_depth, prev_image = [], None, False, 0, False
    def flush():
        nonlocal cur
        if cur: out.append(cur)
        cur = None
    for i in range(first, last):
        l = lines[i]
        if l.lstrip().startswith('```'):
            flush(); in_code = not in_code; continue
        if in_code: continue
        stripped = l.strip()
        if jsx_depth > 0:
            flush()
            jsx_depth += len(re.findall(r'<[A-Za-z][^>]*(?<!/)>', l)) - len(re.findall(r'</[A-Za-z]', l)) - l.count('/>')
            if '/>' in l and jsx_depth < 0: jsx_depth = 0
            jsx_depth = max(jsx_depth, 0)
            continue
        if not stripped:
            flush(); prev_image = False; continue
        skip = (stripped.startswith(('#', '|', ':::', 'import ', '![', '---', '<!--'))
                or (stripped.startswith('<') and not stripped.startswith(('<sup', '<a id', '<em', '<strong', '<b>', '<i>'))))
        if stripped.startswith('!['): prev_image = True; flush(); continue
        if skip:
            flush()
            if stripped.startswith('<') and not stripped.startswith(('<sup', '<a id')):
                opens = len(re.findall(r'<[A-Za-z][^>]*(?<!/)>', stripped)) - len(re.findall(r'</[A-Za-z]', stripped))
                if opens > 0 and '/>' not in stripped: jsx_depth = opens
                elif re.match(r'<[A-Za-z][\w.]*\b[^>]*$', stripped): jsx_depth = 1  # multi-line opening tag
            continue
        if prev_image and (stripped.startswith('*') and stripped.endswith('*')):  # caption
            flush(); continue
        m = LIST_RX.match(l)
        if m:
            flush(); cur = [i, i, [l]]
        elif cur is None:
            cur = [i, i, [l]]
        else:
            cur[1] = i; cur[2].append(l)
        prev_image = False
    flush()
    return lines, out

def triggers_in(text):
    body = LIST_RX.sub('', text.strip().split('\n')[0]) + ' ' + ' '.join(text.strip().split('\n')[1:])
    n = neutral(body)
    hits = [name for name, rx in TRIGGERS if rx.search(n)]
    # bold: anywhere except a leading run-in label at the start of the unit
    lead = re.match(r'\s*\*\*[^*\n]+\*\*[.:]?', n)
    rest = n[lead.end():] if lead else n
    if BOLD.search(rest) or re.match(r'\s*\*\*[^*\n]+\*\*\s*—', n): hits.append('bold_in_sentence')
    return hits

def unit_id(start, text):
    return f'L{start + 1}-' + hashlib.sha1(text.encode()).hexdigest()[:6]

def extract(path):
    t = open(path).read()
    head, end = split_page(t)
    lines, us = units(t, head, end)
    items = []
    for s, e, ls in us:
        text = '\n'.join(ls)
        hits = triggers_in(text)
        if hits: items.append({'id': unit_id(s, text), 'text': text, 'patterns': hits, '_s': s, '_e': e})
    return t, lines, items

def unit_checks(orig, new):
    """Per-unit invariants. Returns a list of problems (empty = OK)."""
    bad = []
    mo, mn = LIST_RX.match(orig), LIST_RX.match(new)
    if (mo.group(0) if mo else None) != (mn.group(0) if mn else None): bad.append('list marker/indent changed')
    if collections.Counter(CITE.findall(orig)) != collections.Counter(CITE.findall(new)): bad.append('citation markers changed')
    lo = collections.Counter(a or b for a, b in LINK.findall(orig)); ln = collections.Counter(a or b for a, b in LINK.findall(new))
    if set(lo) != set(ln): bad.append('link targets changed')
    no = collections.Counter(n.replace(' ', '') for n in NUM.findall(CITE.sub('', orig)))
    nn = collections.Counter(n.replace(' ', '') for n in NUM.findall(CITE.sub('', new)))
    if set(no) - set(nn): bad.append(f'numbers lost: {sorted(set(no) - set(nn))}')
    if re.findall(r'<[^>]+>', orig) != re.findall(r'<[^>]+>', new) and \
       collections.Counter(re.findall(r'<(?!/?sup\b)[^>]+>', orig)) != collections.Counter(re.findall(r'<(?!/?sup\b)[^>]+>', new)):
        bad.append('markup changed')
    if not new.strip(): bad.append('empty')
    return bad

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest='cmd', required=True)
    e = sub.add_parser('extract'); e.add_argument('page'); e.add_argument('--out')
    a = sub.add_parser('apply'); a.add_argument('page'); a.add_argument('batch'); a.add_argument('edited')
    a.add_argument('--out'); a.add_argument('--inplace', action='store_true'); a.add_argument('--report')
    args = ap.parse_args()
    if args.cmd == 'extract':
        t, lines, items = extract(args.page)
        batch = {'page': args.page, 'sha1': hashlib.sha1(t.encode()).hexdigest(),
                 'items': [{k: v for k, v in i.items() if not k.startswith('_')} for i in items]}
        out = json.dumps(batch, indent=1, ensure_ascii=False)
        if args.out: open(args.out, 'w').write(out + '\n')
        else: print(out)
        print(f'{len(items)} units with Pass 1 patterns', file=sys.stderr)
        return 0
    t, lines, items = extract(args.page)
    batch = json.load(open(args.batch)); edited = json.load(open(args.edited))
    if hashlib.sha1(t.encode()).hexdigest() != batch['sha1']:
        print('FAIL: page changed since extract'); return 2
    ids = [i['id'] for i in items]
    if sorted(ids) != sorted(i['id'] for i in batch['items']) or set(edited) != set(ids):
        print('FAIL: edited IDs do not match batch IDs', sorted(set(ids) ^ set(edited))[:5]); return 2
    reverted, changed = [], 0
    new_lines = list(lines)
    for it in sorted(items, key=lambda x: -x['_s']):
        new = edited[it['id']].rstrip('\n')
        if new == it['text']: continue
        probs = unit_checks(it['text'], new)
        if probs:
            reverted.append((it['id'], probs)); continue
        new_lines[it['_s']:it['_e'] + 1] = new.split('\n'); changed += 1
    revised = '\n'.join(new_lines)
    res = check(t, revised)
    print('FAIL' if res['fails'] else 'PASS', f"units changed {changed}/{len(items)}, reverted {len(reverted)}, prose words {res['prose_words'][0]} -> {res['prose_words'][1]}")
    for uid, p in reverted: print('  REVERTED', uid, '; '.join(p))
    for f in res['fails']: print('  FAIL:', f)
    for w in res['warns']: print('  WARN:', w)
    print('  style per 1k words (before -> after):', ', '.join(f'{k} {x}->{y}' for k, (x, y) in res['style_per_1k'].items()))
    if args.report:
        json.dump({'changed': changed, 'units': len(items), 'reverted': reverted, 'check': res}, open(args.report, 'w'), indent=1, ensure_ascii=False)
    if res['fails']: return 1
    if args.inplace: open(args.page, 'w').write(revised)
    elif args.out: open(args.out, 'w').write(revised)
    return 0

if __name__ == '__main__':
    sys.exit(main())
