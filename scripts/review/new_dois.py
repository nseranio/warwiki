import sys,re; sys.path.insert(0,'scripts/review')
from apply import accepted
items,_=accepted(); s=set(); p=set()
for v in items:
    for r in v.get('new_refs') or []:
        l=r.get('line','')
        m=re.search(r'doi:\[(10\.[^\]]+)\]',l)
        if m: s.add(m.group(1))
        else:
            m=re.search(r'PMID:\[(\d+)\]',l)
            if m: p.add(m.group(1))
print('D',' '.join(sorted(s))); print('P',' '.join(sorted(p)))
