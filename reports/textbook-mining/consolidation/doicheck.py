"""Check that every DOI in newly added reference lines resolves on PubMed to
the cited first author and year.

Usage (from the repo root):
  git diff -U0 docs | grep -E '^\+.*<a id="ref' > /tmp/newrefs.txt
  python3 reports/textbook-mining/consolidation/doicheck.py /tmp/newrefs.txt

DOIs containing parentheses are truncated by the regex and reported as NOT
FOUND; check those by hand with scripts/audit/pubmed.py doi.
"""
import re,subprocess,sys,unicodedata
def norm(s): return unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()
lines=open(sys.argv[1]).read().splitlines()
bad=[];nodoi=[]
for l in lines:
    m=re.search(r'doi\.org/(10\.[^)\s\]]+)',l)
    if not m:
        nodoi.append(l[:170]); continue
    doi=m.group(1).rstrip('.')
    first=re.sub(r'^\+<a id="ref\d+"></a>\d+\.\s*','',l).split(',')[0].split(' ')[0]
    yr=re.search(r'\b(19|20)\d{2}\b',l.split('*')[-1] if '*' in l else l)
    out=subprocess.run(['python3','scripts/audit/pubmed.py','doi',doi],capture_output=True,text=True).stdout
    rec=re.search(r'^PMID \d+\n(.+)$',out,re.M)
    if not rec:
        bad.append(('NOT FOUND',doi,l[:160])); continue
    r=rec.group(1)
    if norm(first) not in norm(r.split(',')[0]) or (yr and yr.group(0) not in r):
        bad.append(('MISMATCH',doi,'PAGE: '+l[:150],'PUBMED: '+r[:150]))
print(len(lines),'refs;',len(bad),'problems;',len(nodoi),'without DOI')
for b in bad: print(*b,sep='\n  '); print()
print('--- no DOI ---'); print('\n'.join(nodoi))
