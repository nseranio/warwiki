const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validDate, makeQuery, collectTopic, normalize, mergeRecords, shortlist, markdown } = require('../literature-watch');
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
const candidate = (id, title, types = [], journal = {}) => normalize({id, source:'MED', title, pubTypeList:{pubType:types}, journalInfo:{journal}, firstPublicationDate:'2026-09-01'}, 'test');
test('high-yield screening recognizes title and Cochrane journal cues despite delayed index labels', () => {
  assert.equal(candidate('1','Interventions for urinary incontinence',[],{title:'Cochrane Database of Systematic Reviews'}).screening.category,'cochrane-review');
  assert.equal(candidate('2','Interventions for urinary incontinence',[],{medlineAbbreviation:'Cochrane Database Syst Rev'}).screening.category,'cochrane-review');
  assert.equal(candidate('3','A Cochrane review of pelvic floor treatment').screening.category,'cochrane-review');
  assert.equal(candidate('4','Pelvic floor treatment: a systematic review and meta-analysis').screening.category,'systematic-review');
  const trial = candidate('5','A randomised trial of continence treatments');
  assert.equal(trial.screening.category,'randomized-trial');
  assert.match(trial.screening.reasons.join(' '),/Title cue/);
  assert.match(trial.screening.editorialCheck,/study size/);
  assert.doesNotMatch(trial.screening.reasons.join(' '),/large|high.quality|practice.changing/);
});
test('protocols, letters, case reports and exploratory trials stay out of the default shortlist', () => {
  for (const [title, types] of [
    ['Randomized controlled trial protocol for continence surgery',['Randomized Controlled Trial']],
    ['Letter: Systematic review of prolapse care',['Letter']],
    ['Device safety alert: a case report',['Case Reports']],
    ['Randomized trial of a new approach: an exploratory pilot',['Randomized Controlled Trial']],
    ['Feasibility of a randomized comparison',['Randomized Controlled Trial']],
    ['Post-hoc analysis of a randomized trial',['Randomized Controlled Trial']]
  ]) {
    const record = candidate(title,title,types);
    assert.equal(record.screening.shortlistEligible,false,title);
    assert.ok(record.screening.exclusions.length,title);
  }
  const corrected = normalize({id:'corrected',source:'MED',title:'A pilot randomized trial',pubTypeList:{pubType:['Randomized Controlled Trial']},commentCorrectionList:{commentCorrection:[{type:'ErratumIn',id:'notice',source:'MED'}]}},'test');
  assert.equal(corrected.screening.category,'correction-or-retraction');
  assert.equal(corrected.screening.shortlistEligible,true);
  assert.ok(corrected.screening.exclusions.length);
});
test('ordinary safety, surgical correction and nonrandomized titles do not imply high-yield notices or trials', () => {
  assert.equal(candidate('1','Surgical correction of pelvic organ prolapse').screening.category,'other');
  assert.equal(candidate('correction','Correction of pelvic organ prolapse').screening.category,'other');
  assert.equal(candidate('retraction','Retraction of the foreskin during examination').screening.category,'other');
  assert.equal(candidate('2','Safety and efficacy of a new device').screening.category,'other');
  assert.equal(candidate('3','A non-randomized controlled comparison').screening.category,'other');
  assert.equal(candidate('4','Adherence to guidelines in daily practice').screening.category,'other');
  assert.equal(candidate('5','FDA device recall for a continence implant').screening.category,'safety-notice');
  assert.equal(candidate('6','Guideline update on urinary incontinence').screening.category,'guideline');
  assert.equal(candidate('7','Long-term outcomes of a multicentre study').screening.category,'multicenter-long-term');
  assert.equal(candidate('8','Outcomes of a multicentre study').screening.category,'other');
  assert.equal(candidate('9','Retraction Note: Outcomes of a continence trial').screening.category,'correction-or-retraction');
  assert.equal(candidate('10','Outcomes of a continence trial: Erratum').screening.category,'correction-or-retraction');
});
test('Cochrane protocols declared only in abstracts remain excluded through every screening pass', () => {
  // CD016320 has a review-like title and Journal Article indexing despite being
  // a protocol. Do not copy or save the source abstract into the public inbox.
  const base = {id:'41574662',source:'MED',title:'Bipolar coagulation techniques versus the clamp-crush technique for elective liver resection',pubTypeList:{pubType:['Journal Article']},journalInfo:{journal:{title:'Cochrane Database of Systematic Reviews'}}};
  const record = normalize({...base,abstractText:'<h4>Objectives</h4>This is a protocol for a <i>Cochrane</i> Review (intervention). We will assess benefits and harms.'},'test');
  assert.equal(record.cochraneProtocolInAbstract,true);
  assert.equal(record.screening.shortlistEligible,false);
  assert.match(record.screening.exclusions.join(' '),/Abstract explicitly/);
  assert.equal(shortlist([record]).selected.length,0);
  const output = markdown({from:'2026-01-01',to:'2026-09-12',records:[record],searches:[]});
  assert.doesNotMatch(output,/\|.*Bipolar coagulation/);
  assert.equal(JSON.stringify(record).includes('We will assess'),false);
  const corrected = normalize({...base,abstractText:'This is a protocol for a Cochrane Review.',commentCorrectionList:{commentCorrection:[{type:'ErratumIn',id:'notice',source:'MED'}]}},'test');
  assert.equal(shortlist([corrected]).selected[0].screening.category,'correction-or-retraction');
  for (const abstractText of ['We followed a published protocol. This review includes randomized trials.',undefined]) {
    assert.equal(normalize({...base,abstractText},'test').screening.category,'cochrane-review');
  }
});
test('shortlist ranks explicit evidence cues and never hides correction/safety notices behind a cap', () => {
  const trial = candidate('trial','Randomized trial of continence care');
  const guideline = candidate('guideline','Guidelines on continence care');
  const cochrane = candidate('cochrane','Continence treatment',[],{title:'Cochrane Database of Systematic Reviews'});
  assert.deepEqual(shortlist([trial,cochrane,guideline],2).selected.map(r=>r.id),['MED:guideline','MED:cochrane']);
  const notice = candidate('notice','Correction to a randomized trial');
  const safety = candidate('safety','Device recall affecting a continence implant');
  const result = shortlist([trial,notice,safety],1);
  assert.deepEqual(result.selected.map(r=>r.id),['MED:notice','MED:safety']);
  assert.equal(result.omittedEligibleCount,1);
  assert.throws(()=>shortlist([trial],0),/positive integer/);
  const reviews = Array.from({length:10},(_,i)=>candidate(`review${i}`,`Systematic review of treatment ${i}`));
  const balanced = shortlist([...reviews,trial,candidate('long','Long-term outcomes of a multicenter study')],4);
  assert.deepEqual(balanced.selected.map(r=>r.screening.category),['systematic-review','systematic-review','randomized-trial','multicenter-long-term']);
});
test('Markdown leads with a concise shortlist while all additional records remain available in JSON', () => {
  const records = [candidate('trial','Randomized trial of continence care'),...Array.from({length:100},(_,i)=>candidate(`case${i}`,`Unusual case report ${i}`,['Case Reports']))];
  const before = JSON.stringify(records);
  const output = markdown({from:'2026-06-03',to:'2026-09-11',records,searches:[]});
  assert.ok(output.indexOf('## High-yield screening shortlist')<output.indexOf('## Search coverage'));
  assert.match(output,/100 other records remain available/);
  assert.match(output,/\[complete metadata file\]\(latest\.json\)/);
  assert.match(output,/size unverified/);
  assert.doesNotMatch(output,/Unusual case report/);
  assert.equal(JSON.stringify(records),before);
  assert.equal(records.length,101);
});
