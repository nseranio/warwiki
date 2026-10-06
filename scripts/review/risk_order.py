import json,os,re,glob,collections,subprocess,statistics
ROOT='/Users/joyboy/Documents/WARWIKI/warwiki'; os.chdir(ROOT)
L='reports/audit-v2/sources-local/'
err=collections.Counter(); sampled=set()
for d in ['residual-sample','residual-sample-2','residual-sample-3']:
    for p in json.load(open(L+d+'/pages.json')): sampled.add(p)
    for x in json.load(open(L+d+'/high-confirmed.json')):
        if x.get('category')=='accuracy': err[x['page']]+=1
# churn since Oct 2
out=subprocess.run(['git','log','--since=2026-10-02','--until=2026-10-04T09:00','--numstat','--format=','--','docs'],capture_output=True,text=True).stdout
churn=collections.Counter()
for l in out.splitlines():
    a=l.split('\t')
    if len(a)==3 and a[0].isdigit(): churn[a[2]]+=int(a[0])+int(a[1])
def feats(p):
    s=open(p).read(); body=s.split('## References')[0]
    words=len(re.findall(r'\w+',body))
    refs=len(re.findall(r'<a id="ref\d+"></a>',s))+len(re.findall(r'^\[\^\d+\]:',s,re.M))
    nums=len(re.findall(r'\d+(?:\.\d+)?\s?%|\bn\s?=\s?\d|\b\d+/\d+\b',body))
    trows=[l for l in body.splitlines() if l.startswith('|') and ('<sup>' in l or '[^' in l)]
    studyrows=sum(1 for l in trows if re.search(r'(19|20)\d\d',l))
    named=len(set(re.findall(r'\b[A-Z][a-z]+(?: et al\.?)? \(?(?:19|20)\d\d\)?',body)))
    return dict(words=words,refs=refs,nums=nums,numdens=nums/max(words,1)*1000,studyrows=studyrows,named=named,churn=churn.get(p,0),
                surg=int(p.startswith('docs/04-')), cond=int(p.startswith('docs/03-')), found=int(p.startswith('docs/01-')))
def rank(v):
    o=sorted(range(len(v)),key=lambda i:v[i]); r=[0]*len(v)
    for k,i in enumerate(o): r[i]=k
    return r
def spear(x,y):
    rx,ry=rank(x),rank(y); return statistics.correlation(rx,ry)
S=[p for p in sampled if os.path.exists(p)]
F={p:feats(p) for p in S}
y=[err[p] for p in S]
for k in F[S[0]]:
    print(f"{k:10s} rho={spear([F[p][k] for p in S],y):+.2f}")
json.dump({'err':{p:err[p] for p in S}},open('/tmp/sampled.json','w'))

def score_all(pages):
    Fa={p:feats(p) for p in pages}
    keys=['numdens','nums','named','churn','studyrows']
    R={k:rank([Fa[p][k] for p in pages]) for k in keys}
    sc={}
    for i,p in enumerate(pages):
        sc[p]=sum(R[k][i] for k in keys)/len(keys)/len(pages) + 0.15*(Fa[p]['cond']+Fa[p]['surg'])
    return sc,Fa
sc,_=score_all(S)
print('rho score', round(spear([sc[p] for p in S],y),2))
top=sorted(S,key=lambda p:-sc[p])
for frac in (1/3,1/2):
    k=int(len(S)*frac); print(f'top {frac:.0%} of sampled pages hold {sum(err[p] for p in top[:k])}/{sum(y)} errors')
allp=[p for p in glob.glob('docs/**/*.mdx',recursive=True) if not p.endswith('index.mdx') and '/07-roots/surgeons/' not in p and not os.path.basename(p).startswith('_') and '## References' in open(p).read()]
sca,Fa=score_all(allp)
order=sorted(allp,key=lambda p:-sca[p])
json.dump(order,open(L+'risk-order.json','w'),indent=0)
print(len(allp),'pages scored; top 10:'); [print(' ',p, Fa[p]) for p in order[:10]]
