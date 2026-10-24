import json,re
W='/Users/joyboy/Documents/WARWIKI/warwiki/src/data/videos.generated.json'
H='/Users/joyboy/Documents/WHITWIKI/whitwiki/src/data/videos-oncology.json'
w=set(); h=set()
for p in json.load(open(W))['playlists']:
    for it in p['items']: w.add(it['videoId'])
for g in json.load(open(H))['groups']:
    for v in g['videos']: h.add(v['id'])
src=open('/Users/joyboy/Documents/WHITWIKI/whitwiki/src/data/videos.ts').read()
for m in re.finditer(r"id: '([^']+)'",src):
    if not m.group(1).startswith('uvj-'): h.add(m.group(1))
print(len(w),len(h),len(w|h))
json.dump(sorted(w|h),open('ids.json','w'))
