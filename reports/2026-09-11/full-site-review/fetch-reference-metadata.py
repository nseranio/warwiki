import json,urllib.request,urllib.parse,urllib.error,time,threading,concurrent.futures,html,re,sys
from pathlib import Path
from datetime import datetime,timezone
root=Path(__file__).resolve().parent
refs=json.loads((root/'reference-input.json').read_text())['identifiers']
refs=[r for r in refs if r['kind']=='doi']
cache=root/'reference-metadata.jsonl'
seen={}
if cache.exists():
 for line in cache.read_text().splitlines():
  try:
   r=json.loads(line)
   if r.get('status') in ['found','not-in-crossref']:seen[r['doi']]=r
  except ValueError:pass
lock=threading.Lock();next_request=0
# At most 4 starts/second, four concurrent requests, cached responses and backoff.
def throttle():
 global next_request
 with lock:
  delay=max(0,next_request-time.monotonic());next_request=max(next_request,time.monotonic())+.26
 if delay:time.sleep(delay)
def fetch(ref):
 doi=ref['value'];url='https://api.crossref.org/works/'+urllib.parse.quote(doi,safe='')
 base={'doi':doi,'source':url,'checkedAt':datetime.now(timezone.utc).isoformat()}
 for attempt in range(3):
  throttle()
  req=urllib.request.Request(url,headers={'User-Agent':'WARWIKI-reference-audit/1.0 (https://warwiki.org)'})
  try:
   with urllib.request.urlopen(req,timeout=25) as res:
    data=json.load(res)['message']
   return {**base,'status':'found','metadata':{k:data.get(k) for k in ['DOI','title','author','container-title','published','published-online','published-print','type','volume','issue','page','article-number','update-to','relation']}}
  except urllib.error.HTTPError as e:
   if e.code==404:return {**base,'status':'not-in-crossref'}
   if e.code in [429,500,502,503,504] and attempt<2:
    time.sleep(min(60,max(2**(attempt+1),int(e.headers.get('Retry-After','0')) if e.headers.get('Retry-After','').isdigit() else 0)));continue
   return {**base,'status':'lookup-error','httpStatus':e.code}
  except Exception as e:
   if attempt<2:time.sleep(2**(attempt+1));continue
   return {**base,'status':'lookup-error','error':type(e).__name__}
remaining=[r for r in refs if r['value'] not in seen]
limit=int(sys.argv[1]) if len(sys.argv)>1 else len(remaining)
print(json.dumps({'total':len(refs),'cached':len(seen),'requested':min(limit,len(remaining))}),flush=True)
with cache.open('a') as out, concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for i,rec in enumerate(pool.map(fetch,remaining[:limit]),1):
  out.write(json.dumps(rec,ensure_ascii=False)+'\n');out.flush();seen[rec['doi']]=rec
  if i%50==0:print(json.dumps({'completedNew':i,'totalRecorded':len(seen),'lastStatus':rec['status']}),flush=True)
print(json.dumps({'completed':True,'totalRecorded':len(seen)}),flush=True)
