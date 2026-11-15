"""Inventory: PubMed cost-study counts per page title, both sites. Output TSV."""
import os,re,sys,json,time,urllib.request,urllib.parse
SITES={'WARWIKI':('/Users/joyboy/Documents/WARWIKI/warwiki',['docs/01-foundations/pharmacology','docs/01-foundations/tools/biomaterials','docs/01-foundations/surgical-principles','docs/02-evaluation','docs/03-clinical-conditions','docs/04-surgical-techniques','docs/05-special-populations']),
       'WHITWIKI':('/Users/joyboy/Documents/WHITWIKI/whitwiki',['docs/cancers','docs/treatment-atlas','docs/foundations/pharmacology','docs/foundations/perioperative-care','docs/foundations/surgical-principles','docs/survivorship'])}
COST='("cost-effectiveness"[tiab] OR "cost effectiveness"[tiab] OR "cost-utility"[tiab] OR "economic evaluation"[tiab] OR "cost analysis"[tiab] OR "cost-benefit"[tiab] OR "cost minimization"[tiab] OR "cost-minimization"[tiab] OR "budget impact"[tiab])'
TRIAL='(randomized controlled trial[pt] OR randomised[tiab] OR randomized[tiab])'
STOP={'and','or','the','of','for','in','a','an','with','to','vs','versus','procedure','device','condition','overview','chooser','principles','management','technique','techniques','surgery','repair'}
def esearch(term):
    u='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?'+urllib.parse.urlencode({'db':'pubmed','term':term,'retmode':'json','retmax':0})
    for a in range(5):
        try:
            n=int(json.load(urllib.request.urlopen(u,timeout=30))['esearchresult']['count']); time.sleep(0.4); return n
        except Exception as e:
            time.sleep(2+3*a)
    return -1
out=open(sys.argv[1],'w'); out.write('site\tfile\ttitle\tquery\tcost_hits\ttrial_hits\texisting_cost_lines\twords\n')
for site,(root,dirs) in SITES.items():
    for d in dirs:
        for dp,_,fs in os.walk(os.path.join(root,d)):
            for fn in sorted(fs):
                if not fn.endswith('.mdx') or fn=='index.mdx': continue
                p=os.path.join(dp,fn); t=open(p).read()
                m=re.search(r'^title:\s*"?([^"\n]+)"?',t,re.M)
                if not m: continue
                title=m.group(1).strip()
                q=re.sub(r'\(.*?\)|—.*$|–.*$|:.*$','',title)
                q=re.sub(r'[^\w\s/-]',' ',q).replace('/',' ')
                words=[w for w in q.split() if w.lower() not in STOP]
                if not words: continue
                query=' '.join(words)
                n=esearch(f'({query}) AND {COST}')
                tr=esearch(f'({query}) AND {COST} AND {TRIAL}') if n>0 else 0
                existing=len(re.findall(r'cost-effective|ICER|QALY|\bcost(?:s|ed)? (?:less|more)\b|[$£€]\d',t,re.I))
                out.write(f'{site}\t{os.path.relpath(p,root)}\t{title}\t{query}\t{n}\t{tr}\t{existing}\t{len(t.split())}\n'); out.flush()
