const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validDate, makeQuery, collectTopic, normalize, mergeRecords } = require('../literature-watch');
const { checkContent } = require('../check-citations');
const topic = {id:'test', terms:['urethroplasty']};
test('citation validation catches misleading labels and duplicate destinations', () => {
  const issues = checkContent('<sup>[[1]](#ref2)</sup><a id="ref2"></a><a id="ref2"></a>');
  assert.ok(issues.some(i=>i.includes('label 1 links to ref2')));
  assert.ok(issues.some(i=>i.includes('duplicate ref2')));
  assert.deepEqual(checkContent('<sup>[[1]](#ref1)</sup><a id="ref1"></a>'), []);
});
test('search rejects impossible dates and includes late indexing with publication cutoff', () => {
  assert.equal(validDate('2026-02-30'), false);
  assert.throws(()=>makeQuery(topic,'2026-09-11','2026-06-28'));
  const query = makeQuery(topic,'2026-06-28','2026-09-11');
  assert.match(query,/FIRST_IDATE/); assert.match(query,/FIRST_PDATE:\[1900-01-01 TO 2026-09-11\]/);
});
test('collector follows every cursor and fails on incomplete pagination', async () => {
  let calls=0;
  const fetcher=async url=>({ok:true,json:async()=>{
    calls++;
    if(calls===1)return {hitCount:2,resultList:{result:[{id:'1'}]},nextCursorMark:'next'};
    assert.equal(url.searchParams.get('cursorMark'),'next');
    return {hitCount:2,resultList:{result:[{id:'2'}]}};
  }});
  const result=await collectTopic(topic,'2026-06-28','2026-09-11',fetcher);
  assert.equal(result.records.length,2);assert.equal(calls,2);
  await assert.rejects(collectTopic(topic,'2026-06-28','2026-09-11',async()=>({ok:true,json:async()=>({hitCount:2,resultList:{result:[{id:'1'}]}})})),/Incomplete/);
});
test('dedup retains topic membership and identifies retraction signals without quality claims', () => {
  const base={id:'123',pmid:'123',source:'MED',title:'Trial',doi:'10.1/ABC',pubTypeList:{pubType:['Retracted Publication']}};
  const merged=mergeRecords([normalize(base,'a'),normalize(base,'b')]);
  assert.equal(merged.length,1);assert.deepEqual(merged[0].topics,['a','b']);
  assert.equal(merged[0].prioritySignal,'correction-or-retraction-check');
  assert.equal(merged[0].doi,'10.1/abc');
});
