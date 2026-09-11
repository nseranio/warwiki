#!/usr/bin/env node
// Source metadata only. No generated clinical advice and no paid API.
const fs = require('node:fs');
const path = require('node:path');
const config = require('../config/literature-watch.json');
function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
}
function makeQuery(topic, from, to) {
  if (!validDate(from) || !validDate(to) || from > to) throw new Error('Invalid date window');
  const terms = topic.terms.map(term => {
    if (/["\\]/.test(term)) throw new Error('Unsupported query term');
    return `(TITLE:"${term}" OR ABSTRACT:"${term}")`;
  }).join(' OR ');
  // Include late indexing, but never label a future publication as published.
  return `(${terms}) AND SRC:MED AND FIRST_PDATE:[1900-01-01 TO ${to}] AND (FIRST_PDATE:[${from} TO ${to}] OR FIRST_IDATE:[${from} TO ${to}])`;
}
async function getJson(url, fetcher) {
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetcher(url, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'WARWIKI-literature-watch/1.0 (https://warwiki.org)' } });
      if (!response.ok) throw new Error(`Europe PMC HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      failure = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt));
    }
  }
  throw failure;
}
async function collectTopic(topic, from, to, fetcher = fetch) {
  const query = makeQuery(topic, from, to);
  let cursor = '*';
  const records = [];
  const seenCursors = new Set();
  let hitCount;
  for (let page = 0; page < 30; page++) {
    if (seenCursors.has(cursor)) throw new Error(`Repeated cursor: ${topic.id}`);
    seenCursors.add(cursor);
    const url = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
    url.search = new URLSearchParams({ query, format: 'json', resultType: 'core', pageSize: '100', cursorMark: cursor });
    const data = await getJson(url, fetcher);
    if (!Number.isInteger(data.hitCount) || !Array.isArray(data.resultList?.result)) throw new Error(`Malformed response: ${topic.id}`);
    if (hitCount !== undefined && hitCount !== data.hitCount) throw new Error(`Search changed during pagination: ${topic.id}; rerun`);
    hitCount = data.hitCount;
    records.push(...data.resultList.result);
    if (records.length >= hitCount) return { query, hitCount, records };
    if (!data.nextCursorMark || data.resultList.result.length === 0) throw new Error(`Incomplete results: ${topic.id}`);
    cursor = data.nextCursorMark;
  }
  throw new Error(`Safety page limit reached for ${topic.id}; narrow the window`);
}
function normalize(record, topicId) {
  if (!record.id || !record.title) throw new Error('Publication missing identity or title');
  const publicationTypes = record.pubTypeList?.pubType || [];
  const corrections = (record.commentCorrectionList?.commentCorrection || []).map(c => ({type:c.type, id:c.id, source:c.source}));
  return { id: `${record.source}:${record.id}`, pmid:record.pmid || null, doi:record.doi?.toLowerCase() || null,
    title: record.title, authors: record.authorString || '', journal:record.journalInfo?.journal?.medlineAbbreviation || '',
    firstPublicationDate:record.firstPublicationDate || null, firstIndexDate:record.firstIndexDate || null,
    publicationTypes, corrections, topics:[topicId],
    prioritySignal: /retract|correction|erratum|expression of concern/i.test(record.title + ' ' + publicationTypes.join(' ') + corrections.map(c=>c.type).join(' ')) ? 'correction-or-retraction-check' : /randomized|meta-analysis|systematic review|guideline/i.test(publicationTypes.join(' ')) ? 'higher-priority-screen' : 'screen',
    url:`https://europepmc.org/article/${encodeURIComponent(record.source)}/${encodeURIComponent(record.id)}` };
}
function mergeRecords(items) {
  const result = [];
  const identities = new Map();
  for (const item of items) {
    const keys = [item.id, ...(item.pmid ? ['pmid:'+item.pmid] : []), ...(item.doi ? ['doi:'+item.doi] : [])];
    const existing = keys.map(k=>identities.get(k)).find(Boolean);
    if (existing) {
      existing.topics = [...new Set([...existing.topics, ...item.topics])];
      keys.forEach(k=>identities.set(k, existing));
    } else {
      result.push(item); keys.forEach(k=>identities.set(k, item));
    }
  }
  return result.sort((a,b)=>(b.firstPublicationDate || '').localeCompare(a.firstPublicationDate || '') || a.id.localeCompare(b.id));
}
const cell = s => String(s || '').replace(/[\r\n|]/g, ' ').replace(/[<>]/g, '').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
function markdown(report) {
  return [`# WARWIKI literature inbox — ${report.to}`, '',
    `Search window: **${report.from} through ${report.to}**. ${report.records.length} deduplicated records.`, '',
    '**Screening candidates, not verified clinical updates.** Publication-type labels may lag indexing; priority signals do not establish study quality. Read the paper, verify dates and outcomes, check corrections/retractions, and compare the current page before editing. The overlap intentionally includes older papers indexed recently. Abstracts and full text are not republished here.', '',
    '## Search coverage', '', ...report.searches.map(s=>`- ${s.topic}: ${s.hitCount} records; query: \`${s.query}\``), '',
    '## Official sources requiring a separate review', '', ...config.guidelineSources.map(s=>`- [${s.name}](${s.url})`), '',
    '## Candidates', '', '| First published | Paper | Journal | Topics | Screening signal |', '|---|---|---|---|---|',
    ...report.records.map(r=>`| ${r.firstPublicationDate || 'Verify date'} | [${cell(r.title)}](${r.url})${r.doi ? ` — DOI: ${cell(r.doi)}` : ''} | ${cell(r.journal)} | ${r.topics.join(', ')} | ${r.prioritySignal} |`), '',
    'This is a scoped MEDLINE/PubMed-source search through Europe PMC, not an exhaustive systematic review. Society statements, regulatory alerts, unindexed papers, and conference abstracts need separate checks.', ''].join('\n');
}
async function main() {
  const args = process.argv.slice(2);
  const flag = (name, fallback) => { const i=args.indexOf(name); if(i<0)return fallback; if(!args[i+1]||args[i+1].startsWith('--'))throw new Error(`${name} requires a value`); return args[i+1]; };
  const to = flag('--to', new Date().toISOString().slice(0,10));
  if(!validDate(to)) throw new Error('Invalid --to date');
  const from = flag('--from', new Date(Date.parse(to) - config.lookbackDays*86400000).toISOString().slice(0,10));
  const out = flag('--out-dir', 'reports/literature-inbox');
  const searches = [], items = [];
  for (const topic of config.topics) {
    const data = await collectTopic(topic, from, to);
    searches.push({topic:topic.id, query:data.query, hitCount:data.hitCount});
    items.push(...data.records.map(r=>normalize(r,topic.id)));
    console.log(`${topic.id}: ${data.hitCount} records`);
  }
  const report = {schemaVersion:1, from, to, source:'Europe PMC REST, SRC:MED', searches, records:mergeRecords(items)};
  // Publish outputs only after every topic succeeds; a partial scan is an error.
  fs.mkdirSync(out, {recursive:true});
  fs.writeFileSync(path.join(out,'latest.json'), JSON.stringify(report,null,2)+'\n');
  fs.writeFileSync(path.join(out,'latest.md'), markdown(report));
  console.log(`Saved ${report.records.length} candidates to ${out}`);
}
if(require.main===module) main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={validDate,makeQuery,collectTopic,normalize,mergeRecords,markdown};
