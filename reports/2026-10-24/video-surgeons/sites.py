"""Write src/data/video-surgeons.json for WARWIKI and WHITWIKI from merged.json."""
import json, re, unicodedata, collections

def fold(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()
def toks(name):
    return [t for t in re.split(r"[\s.\-]+", fold(name)) if t]

W = '/Users/joyboy/Documents/WARWIKI/warwiki'
H = '/Users/joyboy/Documents/WHITWIKI/whitwiki'
merged = json.load(open('merged.json'))['videos']
meta = json.load(open('meta.json'))

def warwiki_profiles():
    src = open(f'{W}/src/data/surgeons.ts').read()
    out = []
    for block in re.split(r'\n  \{', src):
        p = re.search(r"\bpath: '([^']+)'", block); n = re.search(r"\bname: '((?:[^'\\]|\\.)+)'", block)
        if p and n: out.append((n.group(1).replace("\\'", "'"), p.group(1)))
    return out
def whitwiki_profiles():
    return [(q['name'], q['path']) for q in json.load(open(f'{H}/src/data/genealogy/people.json')) if q.get('path')]

def matcher(profiles):
    by_last = collections.defaultdict(list)
    for name, path in profiles:
        t = toks(name); by_last[t[-1]].append((t[0], name, path))
    def find(name):
        t = toks(name)
        if len(t) < 2: return None
        cands = by_last.get(t[-1], [])
        exact = [c for c in cands if c[0] == t[0]]
        if len(exact) == 1: return exact[0][2]
        # Chris / Christopher; a bare initial needs a unique surname
        near = [c for c in cands if (len(t[0]) >= 3 and (c[0].startswith(t[0]) or t[0].startswith(c[0])))
                or (len(t[0]) == 1 and c[0][0] == t[0])]
        return near[0][2] if len(near) == 1 and len(cands) == 1 else None
    return find

def write(root, ids, profiles, with_channel):
    find = matcher(profiles); linked = set()
    videos = {}
    for vid in sorted(ids):
        people = []
        for p in merged.get(vid, []):
            e = {'name': p['name'], 'role': p['role']}
            prof = find(p['name'])
            if prof: e['profile'] = prof; linked.add((p['name'], prof))
            people.append(e)
        entry = {}
        if with_channel and vid in meta: entry['channel'] = meta[vid]['channel'].strip()
        if people: entry['people'] = people
        elif not with_channel: continue
        entry.setdefault('people', [])
        videos[vid] = entry
    data = {'_note': 'Surgeons and presenters named in each video\'s YouTube title, description or uploading channel '
                     '(Codex extraction, every name checked against the video\'s own text; October 24, 2026). '
                     'Rebuild: reports/2026-10-24/video-surgeons/ in the WARWIKI repo.',
            'videos': videos}
    json.dump(data, open(f'{root}/src/data/video-surgeons.json', 'w'), ensure_ascii=False, indent=1)
    print(root.split('/')[-1], 'videos', len(videos), 'with people', sum(1 for v in videos.values() if v['people']), 'profiles linked', len(linked))
    return linked

wids = {it['videoId'] for p in json.load(open(f'{W}/src/data/videos.generated.json'))['playlists'] for it in p['items']}
hids = {v['id'] for g in json.load(open(f'{H}/src/data/videos-oncology.json'))['groups'] for v in g['videos']}
hids |= {m for m in re.findall(r"id: '([^']+)'", open(f'{H}/src/data/videos.ts').read()) if not m.startswith('uvj-')}
lw = write(W, wids, warwiki_profiles(), True)
lh = write(H, hids, whitwiki_profiles(), False)
json.dump({'warwiki': sorted(lw), 'whitwiki': sorted(lh)}, open('linked.json', 'w'), ensure_ascii=False, indent=1)
