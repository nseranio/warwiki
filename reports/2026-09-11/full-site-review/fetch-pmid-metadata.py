"""Read-only PMID identity audit; never mark a page or clinical claim verified."""
import json,re,subprocess,time,urllib.request,urllib.parse,unicodedata
from pathlib import Path
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
current=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(require('./scripts/audit-references').auditReferences()))"],cwd=ROOT))
refs=[r for r in current['identifiers'] if r['kind']=='pmid']
cache=HERE/'pmid-metadata.jsonl';records={}
if cache.exists():
 for line in cache.read_text().splitlines():
  try:
   r=json.loads(line)
   if r.get('status')=='found':records[r['pmid']]=r
  except ValueError:pass
remaining=[r['value'] for r in refs if r['value'] not in records]
print(json.dumps({'currentPMIDs':len(refs),'cached':len(records),'toFetch':len(remaining)}),flush=True)
with cache.open('a') as f:
 for i in range(0,len(remaining),50):
  ids=remaining[i:i+50];query='SRC:MED AND ('+' OR '.join('EXT_ID:'+n for n in ids)+')'
  url='https://www.ebi.ac.uk/europepmc/webservices/rest/search?'+urllib.parse.urlencode({'query':query,'format':'json','resultType':'core','pageSize':100})
  result=None
  for attempt in range(3):
   try:
    req=urllib.request.Request(url,headers={'User-Agent':'WARWIKI-reference-audit/1.0 (https://warwiki.org)'})
    result=json.load(urllib.request.urlopen(req,timeout=45));break
   except Exception as e:
    if attempt==2:print(json.dumps({'batch':i,'error':str(e)}),flush=True)
    else:time.sleep(2**(attempt+1))
  found={r['id']:r for r in (result or {}).get('resultList',{}).get('result',[]) if r.get('source')=='MED'}
  for n in ids:
   r=found.get(n)
   rec={'pmid':n,'status':'found' if r else 'not-found' if result is not None else 'lookup-error','checkedAt':datetime.now(timezone.utc).isoformat(),'source':'https://www.ebi.ac.uk/europepmc/webservices/rest/search','metadata':{k:r.get(k) for k in ['title','doi','pmcid','authorString','firstPublicationDate','journalInfo','pageInfo','isRetracted']} if r else None}
   records[n]=rec;f.write(json.dumps(rec,ensure_ascii=False)+'\n')
  f.flush();print(json.dumps({'completedNew':min(i+50,len(remaining))}),flush=True);time.sleep(0.5)
stop=set('the and for with from after before using versus between following patients study review systematic a an of in on to by or as is'.split())
def tokens(t):
 t=''.join(c for c in unicodedata.normalize('NFKD',t) if not unicodedata.combining(c))
 return {w for w in re.findall(r'\w+',t.lower()) if len(w)>2 and w not in stop}
signals=[];noTitle=[]
for ref in refs:
 r=records.get(ref['value'],{})
 if r.get('status')!='found':continue
 title=r['metadata'].get('title','');b=tokens(title)
 for o in ref['occurrences']:
  claimed=o.get('title',{}).get('text','');a=tokens(claimed)
  if min(len(a),len(b))<3:
   noTitle.append({'pmid':ref['value'],'file':o['file'],'line':o['line'],'registeredTitle':title});continue
  overlap=len(a&b)/min(len(a),len(b))
  if overlap<=.2:signals.append({'pmid':ref['value'],'file':o['file'],'line':o['line'],'claimedTitle':claimed,'registeredTitle':title,'registeredDOI':r['metadata'].get('doi'),'overlap':round(overlap,3)})
out={'generatedAt':datetime.now(timezone.utc).isoformat(),'methodology':'Primary PubMed records retrieved through Europe PMC. Frozen current-source snapshot; pages may be edited during collection. Automated title overlap is a review signal, not proof of error, full-paper reading or clinical validation. PMID-only citations and DOI/PMID pairs remain independent until verified.','currentPMIDs':len(refs),'currentPMIDsFound':sum(records.get(r['value'],{}).get('status')=='found' for r in refs),'unresolvedIdentifiers':[r['value'] for r in refs if records.get(r['value'],{}).get('status')!='found'],'suspectedMismatches':signals,'occurrencesWithoutComparableTitle':noTitle}
(HERE/'pmid-title-signals.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({'found':out['currentPMIDsFound'],'suspectedMismatches':len(signals),'withoutComparableTitle':len(noTitle)}),flush=True)
