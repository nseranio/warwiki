"""Merge exact-scope review records; never infer clinical verification from an inventory."""
import hashlib,json,subprocess,sys
import importlib.util
sys.dont_write_bytecode=True
from pathlib import Path
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
inventory=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(require('./scripts/audit-content').inventory()))"],cwd=ROOT))
records={}
for name in ['clinical-conditions.json','urethral-upper-tract.json','pharmacology.json','root-reviewed-pages.json','surgical-rest.json','surgical-bladder.json','surgical-diversion.json','surgical-genital.json','special-populations.json','evaluation.json','foundations-rest.json','radiation-effects.json','bowel-principles.json','access-closure.json','vascular-exposure.json','flap-principles.json','pelvic-support-anatomy.json','resources-history.json','site-data.json','tools.json','surgical-fistula.json','surgical-incontinence.json','perioperative-care.json','post-checkpoint-reviews.json','content-restoration.json']:
 p=HERE/name
 if not p.exists():continue
 report=json.loads(p.read_text())
 for rec in report.get('pages',[]):records.setdefault(rec['file'],[]).append({**rec,'recordFile':name})
 for rec in report.get('companionCorrections',[]):records.setdefault(rec['file'],[]).append({**rec,'status':'updated','recordFile':name})
# New claim-level batches supplement, rather than overwrite, historical source work.
# Historical records may be stale; only matching hashes receive current-page credit below.
spec=importlib.util.spec_from_file_location('audit_checker',ROOT/'reports/2026-09-20/check-audit-batch.py')
checker=importlib.util.module_from_spec(spec);spec.loader.exec_module(checker)
for p in sorted((HERE/'claim-batches').glob('*.json')):
 report=json.loads(p.read_text())
 errors=checker.validate(report,ROOT,require_current=False)
 if errors:raise ValueError(f'{p}: '+ '; '.join(errors))
 for rec in report['pages']:
  records.setdefault(rec['file'],[]).append({**rec,'recordFile':str(p.relative_to(HERE)),'sources':report['sources'],'reviewedAt':report['reviewedAt']})
pages=[]
for page in inventory['articles']:
 file=page['file'];sha=hashlib.sha256((ROOT/file).read_bytes()).hexdigest()
 checks=records.get(file,[])
 current=[c for c in checks if c.get('sourceSha256')==sha]
 def read(c):return c.get('fullTextRead') is True or c.get('readScope','').lower().startswith('full mdx text')
 full=any(read(c) for c in current)
 status='unreviewed'
 if any(c.get('editorialRestoration') is True for c in current) and not any(c.get('auditDisposition') in ['complete','not-clinical'] for c in current):
  status='restored-pending-review'
 elif current:
  status='updated' if any(c.get('status')=='updated' for c in current) else 'checked' if full and any(c.get('status')=='checked' for c in current) else 'unresolved'
 elif any(c.get('sourceSha256') for c in checks):status='changed-since-review'
 elif checks:status='unresolved' if any(c.get('status')=='unresolved' for c in checks) else 'unreviewed'
 claims=[c for c in current if c.get('auditDisposition')]
 disposition=claims[-1]['auditDisposition'] if claims else 'not-recorded'
 pages.append({'file':file,'title':page['title'],'section':page['section'],'kind':page['kind'],'status':status,'fullTextReadForCurrentContent':full,'clinicalVerificationComplete':any(c.get('clinicalVerificationComplete') is True for c in current),'auditDisposition':disposition,'sourceSha256':sha,'reviewRecords':checks})
summary={'pages':len(pages),'fullTextReadForCurrentContent':sum(p['fullTextReadForCurrentContent'] for p in pages),'clinicalVerificationComplete':sum(p['clinicalVerificationComplete'] for p in pages),'statusCounts':{s:sum(p['status']==s for p in pages) for s in sorted({p['status'] for p in pages})},'claimAuditDispositionCounts':{s:sum(p['auditDisposition']==s for p in pages) for s in sorted({p['auditDisposition'] for p in pages})}}
result={'generatedAt':datetime.now(timezone.utc).isoformat(),'methodology':'Every documentation source file is listed. Actual reading, scoped source checks and complete clinical verification are distinct. Missing records stay unreviewed; content changed after the recorded SHA256 must be checked again. Structural checks and metadata lookups do not establish clinical correctness. Editorial restorations are tracked separately and do not establish a fresh source review. This is an ongoing audit, not certification that the whole site is error-free.','summary':summary,'pages':pages}
(HERE/'page-ledger.json').write_text(json.dumps(result,indent=2)+'\n')
lines=['# Whole-site page review','',result['methodology'],'',f"Current snapshot: {summary['pages']} pages; {summary['fullTextReadForCurrentContent']} with full-text reading recorded against current content; {summary['clinicalVerificationComplete']} fully clinically verified.",'','| Section | Pages | Full text read | Updated | Unreviewed |','|---|---:|---:|---:|---:|']
for sec in sorted({p['section'] for p in pages}):
 group=[p for p in pages if p['section']==sec]
 lines.append(f"| {sec} | {len(group)} | {sum(p['fullTextReadForCurrentContent'] for p in group)} | {sum(p['status']=='updated' for p in group)} | {sum(p['status']=='unreviewed' for p in group)} |")
lines+=['','[Full page-by-page ledger](page-ledger.json) contains paths, exact scope, sources, unresolved claims and content hashes. Domain reports record what was corrected.','', 'Claim-level audit dispositions: '+json.dumps(summary['claimAuditDispositionCounts'])+'. These supplement the historical read/update counts; not-recorded means no new claim-level closure record, not that all prior source work is discarded. Partial/blocked pages remain unfinished.','', 'The separate reference-metadata scans check DOI registration and PubMed identifier/title identity. DOI and PMID caches reflect their collection snapshots; current additions may be uncached. Missing records or title-overlap flags require source investigation, not an automatic claim that a paper is false. Metadata matching does not establish that a cited claim is supported or that its full paper was read.','']
(HERE/'README.md').write_text('\n'.join(lines))
print(json.dumps(summary,indent=2))
