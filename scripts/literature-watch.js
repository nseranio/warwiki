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
const SCREENING_ORDER = ['correction-or-retraction', 'safety-notice', 'guideline', 'cochrane-review', 'systematic-review', 'randomized-trial', 'multicenter-long-term', 'other'];
const SCREENING_LABELS = {
  'correction-or-retraction': 'Correction / retraction check',
  'safety-notice': 'Explicit safety notice',
  guideline: 'Guideline candidate',
  'cochrane-review': 'Cochrane review candidate',
  'systematic-review': 'Systematic review / meta-analysis candidate',
  'randomized-trial': 'Randomized trial candidate — size unverified',
  'multicenter-long-term': 'Multicenter long-term candidate',
  other: 'Additional screening'
};
const signalText = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[‐‑‒–—−]/g, '-');
function screenRecord(record) {
  const title = signalText(record.title);
  const types = (record.publicationTypes || []).map(signalText);
  const journal = signalText(`${record.journal || ''} ${record.journalTitle || ''}`);
  const corrections = (record.corrections || []).map(c => signalText(c.type)).join(' ');
  const reasons = [], exclusions = [];
  const cue = (pattern, label, includeTitle = true) => {
    const matchingType = (record.publicationTypes || []).find(value => pattern.test(signalText(value)));
    if (matchingType) { reasons.push(`Indexed type: ${matchingType}`); return true; }
    if (includeTitle && pattern.test(title)) { reasons.push(`Title cue: ${label}`); return true; }
    return false;
  };
  // Notices always remain visible, including a correction attached to an otherwise
  // excluded study. These are checks for the editor, not proof of a changed finding.
  let category = 'other';
  const correctionTitle = /^(?:correction|retraction)\s*[:(]|\b(?:erratum|corrigendum|retraction note|retraction notice|expression of concern|retracted article|retracted publication)\b|\b(?:correction|retraction) (?:to|notice)\b/.test(title);
  if (correctionTitle || /retract|correction|erratum|corrigendum|expression of concern/.test(`${types.join(' ')} ${corrections}`)) {
    category = 'correction-or-retraction';
    if (correctionTitle) reasons.push('Title cue: correction / retraction / expression-of-concern notice');
    for (const type of record.publicationTypes || []) if (/retract|correction|erratum|corrigendum|expression of concern/.test(signalText(type))) reasons.push(`Indexed type: ${type}`);
    for (const correction of record.corrections || []) if (/retract|correction|erratum|corrigendum|expression of concern/.test(signalText(correction.type))) reasons.push(`Linked notice type: ${correction.type}`);
  }
  const excludedCues = [
    [/\bcase reports?\b|\bcase series\b/, 'Case report / case series'],
    [/\bletters?\b|\bcorrespondence\b|\beditorials?\b|\bcomment(?:ary)?\b/, 'Letter / commentary / editorial'],
    [/\bprotocols?\b|\bpreprints?\b/, 'Protocol / preprint'],
    [/\bexploratory\b|\bpilot\b|\bfeasibility\b|\bproof[- ]of[- ]concept\b|\bpost[- ]hoc\b/, 'Exploratory / pilot / feasibility / post-hoc report']
  ];
  for (const [pattern, label] of excludedCues) {
    if (pattern.test(`${title} ${types.join(' ')}`)) exclusions.push(label);
  }
  if (category !== 'correction-or-retraction' && exclusions.length === 0) {
    if (cue(/\bsafety (?:alert|communication|warning|notice)\b|\b(?:drug|device|product) recall\b/, 'explicit safety alert / recall')) category = 'safety-notice';
    else if (cue(/\b(?:practice )?guidelines?\b/, 'guideline', false) || cue(/\b(?:clinical practice |evidence[- ]based )guidelines?\b|\bguidelines? (?:on|for|update|amendment|from|by)\b|\b(?:updated?|amended) guidelines?\b|\bconsensus (?:statement|guidance|recommendations)\b/, 'guideline / consensus guidance')) category = 'guideline';
    else if (/\bcochrane\b/.test(`${journal} ${title}`)) {
      category = 'cochrane-review';
      reasons.push(/\bcochrane\b/.test(journal) ? 'Journal cue: Cochrane' : 'Title cue: Cochrane');
    } else if (cue(/\bsystematic (?:review|reviews)\b|\bmeta[- ]analys(?:is|es)\b/, 'systematic review / meta-analysis')) category = 'systematic-review';
    else if (cue(/\brandomi[sz]ed controlled trial\b/, 'randomized controlled trial', false)) category = 'randomized-trial';
    else if (!/\bnon[- ]?randomi[sz]ed\b|\bnot randomi[sz]ed\b/.test(title) && /\brandomi[sz]ed\b/.test(title) && /\btrial\b|\bcontrolled\b|\bcomparison\b/.test(title)) {
      category = 'randomized-trial';
      reasons.push('Title cue: randomized trial / controlled comparison');
    } else if (/\bmulti[- ]cent(?:er|re)\b|\bmulticent(?:er|re)\b/.test(`${title} ${types.join(' ')}`) && /\blong[- ]term\b/.test(title)) {
      category = 'multicenter-long-term';
      reasons.push('Title / indexed type indicates multicenter; title explicitly says long-term');
    }
  }
  if (category === 'other') reasons.push(exclusions.length ? 'Excluded from the default shortlist by report-type cues; retained for separate review' : 'No selected high-yield metadata cue; retained for separate review');
  return { category, shortlistEligible: category !== 'other', reasons, exclusions, editorialCheck: config.screening.editorialCheck };
}
function normalize(record, topicId) {
  if (!record.id || !record.title) throw new Error('Publication missing identity or title');
  const rawTypes = record.pubTypeList?.pubType || [];
  const publicationTypes = Array.isArray(rawTypes) ? rawTypes : [rawTypes];
  const corrections = (record.commentCorrectionList?.commentCorrection || []).map(c => ({type:c.type, id:c.id, source:c.source}));
  const normalized = { id: `${record.source}:${record.id}`, pmid:record.pmid || null, doi:record.doi?.toLowerCase() || null,
    title: record.title, authors: record.authorString || '', journal:record.journalInfo?.journal?.medlineAbbreviation || '',
    journalTitle:record.journalInfo?.journal?.title || '',
    firstPublicationDate:record.firstPublicationDate || null, firstIndexDate:record.firstIndexDate || null,
    publicationTypes, corrections, topics:[topicId],
    url:`https://europepmc.org/article/${encodeURIComponent(record.source)}/${encodeURIComponent(record.id)}` };
  normalized.screening = screenRecord(normalized);
  normalized.prioritySignal = normalized.screening.category === 'correction-or-retraction' ? 'correction-or-retraction-check' : normalized.screening.shortlistEligible ? 'higher-priority-screen' : 'screen';
  return normalized;
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
function shortlist(records, limit = config.screening.maxPrimaryCandidates) {
  if (!Number.isInteger(limit) || limit < 1) throw new Error('Shortlist limit must be a positive integer');
  const ranked = records.map(record => ({...record, screening:screenRecord(record)}))
    .filter(record => record.screening.shortlistEligible)
    .sort((a,b) => SCREENING_ORDER.indexOf(a.screening.category) - SCREENING_ORDER.indexOf(b.screening.category)
      || (b.firstPublicationDate || '').localeCompare(a.firstPublicationDate || '') || a.id.localeCompare(b.id));
  const notices = ranked.filter(record => ['correction-or-retraction', 'safety-notice'].includes(record.screening.category));
  const remaining = ranked.filter(record => !['correction-or-retraction', 'safety-notice'].includes(record.screening.category));
  // Share the remaining slots across categories: a large batch of reviews must
  // not crowd every trial or long-term multicenter candidate out of the inbox.
  const groups = SCREENING_ORDER.slice(2,-1).map(category => remaining.filter(record => record.screening.category === category));
  const selected = [...notices];
  while (selected.length < limit && groups.some(group => group.length)) {
    for (const group of groups) {
      if (selected.length >= limit) break;
      if (group.length) selected.push(group.shift());
    }
  }
  selected.sort((a,b) => SCREENING_ORDER.indexOf(a.screening.category) - SCREENING_ORDER.indexOf(b.screening.category)
    || (b.firstPublicationDate || '').localeCompare(a.firstPublicationDate || '') || a.id.localeCompare(b.id));
  return {selected, eligibleCount:ranked.length, omittedEligibleCount:ranked.length-selected.length, additionalCount:records.length-ranked.length};
}
function markdown(report) {
  const primary = shortlist(report.records);
  const categoryCounts = Object.fromEntries(SCREENING_ORDER.map(category => [category, 0]));
  for (const record of report.records) categoryCounts[screenRecord(record).category]++;
  return [`# WARWIKI literature inbox — ${report.to}`, '',
    `Search window: **${report.from} through ${report.to}**. ${report.records.length} deduplicated records.`, '',
    '**Screening candidates, not verified clinical updates.** Start with major guidelines, Cochrane reviews, large trials and findings likely to change practice. The shortlist uses explicit publication-type, title and journal cues; it cannot establish that a guideline is authoritative, a trial is large, or a result changes practice. Publication-type labels may lag indexing. Case reports/series, letters/editorials, protocols/preprints and exploratory/pilot/feasibility/post-hoc reports are excluded by default; correction or retraction signals override that exclusion.', '',
    config.screening.editorialCheck + ' Verify publisher dates, outcomes and correction status, then compare the current page before editing. The overlap intentionally includes older papers indexed recently. Abstracts and full text are not republished here.', '',
    '## High-yield screening shortlist', '',
    `${primary.selected.length} shown from ${primary.eligibleCount} records with selected metadata cues. The main list is capped at ${config.screening.maxPrimaryCandidates}, with all correction/retraction and explicit safety notices kept even if that exceeds the cap. Remaining slots are shared across candidate types so a large batch of reviews does not hide every trial. Priority is for screening only.`, '',
    '| First published | Paper | Candidate type | Why it appears |', '|---|---|---|---|',
    ...primary.selected.map(r=>`| ${r.firstPublicationDate || 'Verify date'} | [${cell(r.title)}](${r.url}) — ${cell(r.journal || r.journalTitle)}; ${cell(r.topics.join(', '))} | ${SCREENING_LABELS[r.screening.category]} | ${cell(r.screening.reasons.join('; '))}${r.screening.exclusions.length ? `; notice overrides: ${cell(r.screening.exclusions.join(', '))}` : ''} |`),
    ...(primary.selected.length ? [] : ['| — | No selected metadata cues in this window; review official sources and the full metadata file. | — | — |']), '',
    '## Other records and traceability', '',
    `The [complete metadata file](latest.json) retains every record, DOI, topic, publication-type label, screening reason and exclusion. ${primary.omittedEligibleCount} additional shortlist-eligible records exceed the display cap; ${primary.additionalCount} other records remain available for separate review. Nothing is deleted from the JSON because of screening rank.`, '',
    '| Metadata category | Records |', '|---|---|',
    ...SCREENING_ORDER.map(category=>`| ${SCREENING_LABELS[category]} | ${categoryCounts[category]} |`), '',
    '## Search coverage', '', ...report.searches.map(s=>`- ${s.topic}: ${s.hitCount} records; query: \`${s.query}\``), '',
    '## Official sources requiring a separate review', '', ...config.guidelineSources.map(s=>`- [${s.name}](${s.url})`), '',
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
  const report = {schemaVersion:2, from, to, source:'Europe PMC REST, SRC:MED', screeningPolicy:config.screening, searches, records:mergeRecords(items)};
  // Publish outputs only after every topic succeeds; a partial scan is an error.
  fs.mkdirSync(out, {recursive:true});
  fs.writeFileSync(path.join(out,'latest.json'), JSON.stringify(report,null,2)+'\n');
  fs.writeFileSync(path.join(out,'latest.md'), markdown(report));
  console.log(`Saved ${report.records.length} candidates to ${out}`);
}
if(require.main===module) main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={validDate,makeQuery,collectTopic,normalize,mergeRecords,screenRecord,shortlist,markdown};
