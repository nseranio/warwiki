"""Flag low title overlap for source investigation; never infer clinical validity."""
import json,re,unicodedata,subprocess
from pathlib import Path
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
current=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(require('./scripts/audit-references').auditReferences()))"],cwd=ROOT))
metadata={}
for line in (HERE/'reference-metadata.jsonl').read_text().splitlines():
 try:
  item=json.loads(line)
  if item.get('status')=='found':metadata[item['doi']]=item
 except ValueError:continue # A running collector may be writing its final line.
stop=set('the and for with from after before using versus between following patients study review systematic a an of in on to by or as is'.split())
def tokens(t):
 t=''.join(c for c in unicodedata.normalize('NFKD',re.sub('<[^>]+>',' ',t)) if not unicodedata.combining(c))
 return {w for w in re.findall(r'\w+',t.lower()) if len(w)>2 and w not in stop}
signals=[];matched=0
for record in current['identifiers']:
 if record['kind']!='doi' or record['value'] not in metadata:continue
 matched+=1
 registered=' '.join(metadata[record['value']]['metadata'].get('title') or [])
 b=tokens(registered)
 for occurrence in record['occurrences']:
  claimed=occurrence.get('title',{}).get('text','');a=tokens(claimed)
  if min(len(a),len(b))<3:continue
  overlap=len(a&b)/min(len(a),len(b))
  if overlap<=0.2:signals.append({'doi':record['value'],'file':occurrence['file'],'line':occurrence['line'],'claimedTitle':claimed,'registeredTitle':registered,'overlap':round(overlap,3)})
result={'generatedAt':datetime.now(timezone.utc).isoformat(),'methodology':'Automated token-overlap signal from current source references and the cached Crossref metadata scan (completed for the original 10,956-DOI snapshot; current additions may not yet be cached). Low overlap is not a proven citation error; translations, abstract compilations and shortened titles can false-positive. Missing registration is not proof of fabrication. Corrections require primary-source identity and claim review.','metadataRecordsFound':len(metadata),'currentDOIs':sum(i['kind']=='doi' for i in current['identifiers']),'currentDOIsMatchedToCache':matched,'suspectedMismatches':signals}
(HERE/'reference-title-signals.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k!='suspectedMismatches'},indent=2))
for s in signals:print(s['doi'],s['file'],s['claimedTitle'],'=>',s['registeredTitle'])
