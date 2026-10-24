"""Merge Codex surgeon extractions, check each name against the video's own text,
canonicalize name variants, link site profiles, and write one JSON per site."""
import json, re, sys, unicodedata, collections, glob

def fold(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()

def toks(name):
    return [t for t in re.split(r"[\s.]+", fold(name)) if t]

meta = json.load(open('meta.json'))
out, rejects = {}, []
for b in sorted(glob.glob('batch*')):
    ins = [json.loads(l) for l in open(f'{b}/input.jsonl')]
    outs = [json.loads(l) for l in open(f'{b}/output.jsonl') if l.strip()]
    got = {o['id']: o for o in outs}
    missing = [i['id'] for i in ins if i['id'] not in got]
    if missing: print(b, 'missing', len(missing), file=sys.stderr)
    for i in ins:
        o = got.get(i['id'], {'people': []})
        text = fold(' '.join([i['title'], i['channel'], i['description'], ' '.join(i['tags'])]))
        squashed = re.sub(r'[^a-zЀ-￿]', '', text)
        keep = []
        for p in o.get('people', []):
            name = re.sub(r'\s+', ' ', p.get('name', '')).strip()
            role = p.get('role')
            t = toks(name)
            if not t or role not in ('surgeon', 'presenter', 'author'):
                rejects.append((i['id'], name, 'shape')); continue
            last = max(t, key=len)
            ok = re.search(r'(?<![a-z])' + re.escape(last) + r'(?![a-z])', text) or (len(last) > 3 and last in squashed)
            if not ok:
                rejects.append((i['id'], name, 'not in text', i['title'], i['channel'])); continue
            if any(fold(name) == fold(k['name']) for k in keep): continue
            keep.append({'name': name, 'role': role, 'basis': p.get('basis')})
        out[i['id']] = keep

# Canonicalize variants of one person: same full first name + last name.
def key(name):
    t = toks(name)
    return (t[0], t[-1]) if len(t) >= 2 and len(t[0]) > 2 else None
forms = collections.defaultdict(collections.Counter)
for ps in out.values():
    for p in ps:
        k = key(p['name'])
        if k: forms[k][p['name']] += 1
canon = {}
for k, c in forms.items():
    best = sorted(c.items(), key=lambda x: (-x[1], -len(x[0])))[0][0]
    for f in c: canon[f] = best
# Hand-checked aliases (spelling variants, initials, surname-only forms from the same channel).
aliases = json.load(open('aliases.json'))
for vid, ps in out.items():
    fixed = []
    for p in ps:
        p['name'] = canon.get(p['name'], p['name'])
        p['name'] = aliases.get(p['name'], p['name'])
        if p['name'] and not any(f['name'] == p['name'] for f in fixed): fixed.append(p)
    out[vid] = fixed

json.dump({'videos': out, 'rejects': rejects}, open('merged.json', 'w'), ensure_ascii=False, indent=1)
n = sum(1 for v in out.values() if v)
print('videos with a person:', n, 'of', len(out), '| names:', len({p['name'] for v in out.values() for p in v}), '| rejects:', len(rejects))
