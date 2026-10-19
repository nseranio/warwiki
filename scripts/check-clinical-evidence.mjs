import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dir = resolve(root, 'src/data/clinical-evidence');
const errors = [];
const issue = (where, message) => errors.push(`${where}: ${message}`);
const read = file => {
  try { return JSON.parse(readFileSync(file, 'utf8')); }
  catch (error) { issue(file, `cannot parse JSON: ${error.message}`); return null; }
};
const required = (value, field, where) => {
  if (value === undefined || value === null || value === '') issue(where, `missing ${field}`);
};
const oneOf = (value, values, field, where) => {
  if (!values.includes(value)) issue(where, `invalid ${field}: ${String(value)}; expected ${values.join(', ')}`);
};
const date = (value, field, where, nullable = false) => {
  if (nullable && value === null) return;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) issue(where, `invalid ISO ${field}: ${String(value)}`);
};
const areas = ['female-sui','oab','prolapse','male-sui','bph','stricture','sexual-medicine','fistula','bowel','infection','diversion','perioperative'];
const verdicts = ['positive','negative','mixed','noninferior','inconclusive','descriptive'];
const roles = ['primary','key-secondary','secondary','exploratory','descriptive'];
const kinds = ['primary','updated','final-os','pro','biomarker','secondary','post-hoc','correction','abstract'];
const relationTypes = ['builds-on','confirms','conflicts','supersedes','parallel','extends'];
const decisions = read(resolve(dir, 'decisions.json')) ?? [];
const events = read(resolve(dir, 'events.json')) ?? [];
const trialFiles = readdirSync(resolve(dir, 'trials')).filter(name => name.endsWith('.json')).sort();
const trials = trialFiles.map(name => [name, read(resolve(dir, 'trials', name))]).filter(([, value]) => value);
const trialIds = new Set(trials.map(([, trial]) => trial.id));
const decisionIds = new Set(decisions.map(decision => decision.id));
const decisionMap = new Map(decisions.map(decision => [decision.id, decision]));
const reportIds = new Set();

for (const decision of decisions) {
  const at = `decisions.json/${decision.id ?? '?'}`;
  for (const field of ['id','area','title','question']) required(decision[field], field, at);
  oneOf(decision.area, areas, 'area', at);
  if (!Array.isArray(decision.lanes) || !decision.lanes.length) issue(at, 'lanes must be a nonempty array');
  else {
    const seen = new Set();
    for (const lane of decision.lanes) {
      required(lane.id, 'lane.id', at); required(lane.label, 'lane.label', at);
      if (seen.has(lane.id)) issue(at, `duplicate lane ${lane.id}`);
      seen.add(lane.id);
    }
  }
  if (!Array.isArray(decision.compare)) issue(at, 'compare must be an array');
}
if (decisionIds.size !== decisions.length) issue('decisions.json', 'duplicate decision id');

for (const [file, trial] of trials) {
  const at = `trials/${file}`;
  for (const field of ['id','name','question','verdict','verdictNote','takeaway']) required(trial[field], field, at);
  if (file !== `${trial.id}.json`) issue(at, 'file name must equal trial id');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trial.id)) issue(at, 'id must be kebab-case');
  if (!Array.isArray(trial.aliases)) issue(at, 'aliases must be an array');
  if (trial.nct !== null && !/^NCT\d{8}$/.test(trial.nct ?? '')) issue(at, 'nct must be null or NCT plus eight digits');
  if (!Array.isArray(trial.area) || !trial.area.length) issue(at, 'area must be a nonempty array');
  else for (const area of trial.area) oneOf(area, areas, 'area', at);
  oneOf(trial.verdict, verdicts, 'verdict', at);
  if (trial.verdictNote?.trim().split(/\s+/).length >= 20) issue(at, 'verdictNote must be under 20 words');
  if (trial.takeaway?.trim().split(/\s+/).length > 45) issue(at, 'takeaway must be at most 45 words');
  if (!Array.isArray(trial.decisions) || !trial.decisions.length) issue(at, 'decisions must be a nonempty array');
  else for (const placement of trial.decisions) {
    if (!decisionIds.has(placement.id)) issue(at, `unknown decision ${placement.id}`);
    else if (!decisionMap.get(placement.id).lanes.some(lane => lane.id === placement.lane)) issue(at, `unknown lane ${placement.id}/${placement.lane}`);
  }
  const design = trial.design ?? {};
  for (const field of ['phase','blinding','type']) required(design[field], `design.${field}`, at);
  if (typeof design.randomized !== 'boolean') issue(at, 'design.randomized must be boolean');
  oneOf(design.type, ['superiority','noninferiority','single-arm','cohort','diagnostic'], 'design.type', at);
  if (!Number.isInteger(design.n) || design.n <= 0) issue(at, 'design.n must be a positive integer');
  required(design.locator, 'design.locator for enrollment and arm counts', at);
  if (!Array.isArray(design.arms) || !design.arms.length) issue(at, 'design.arms must be nonempty');
  const armKeys = new Set((design.arms ?? []).map(arm => arm.key));
  if (armKeys.size !== design.arms?.length) issue(at, 'duplicate design arm key');
  for (const arm of design.arms ?? []) {
    required(arm.key, 'arm.key', at); required(arm.label, 'arm.label', at);
    oneOf(arm.role, ['experimental','control','single'], 'arm.role', at);
  }
  if (!Array.isArray(trial.reports) || !trial.reports.length) issue(at, 'reports must be nonempty');
  if (trial.reports?.filter(report => report.kind === 'primary').length !== 1) issue(at, 'exactly one primary report required');
  let lastDate = '';
  for (const report of trial.reports ?? []) {
    const rat = `${at}/${report.id ?? '?'}`;
    for (const field of ['id','kind','label','published','citation','followUp']) required(report[field], field, rat);
    if (reportIds.has(report.id)) issue(rat, 'duplicate report id');
    reportIds.add(report.id);
    if (!report.id?.startsWith(trial.id + '-')) issue(rat, 'report id must start with trial id');
    oneOf(report.kind, kinds, 'kind', rat);
    date(report.published, 'published', rat);
    date(report.cutoff, 'cutoff', rat, true);
    if (report.published < lastDate) issue(rat, 'reports must be ordered by published date');
    lastDate = report.published;
    if (!report.doi && !report.pmid && !report.noDoi) issue(rat, 'doi or pmid required, or noDoi reason');
    if (/\d/.test(report.followUp) && !report.followUpLocator) issue(rat, 'numeric followUp needs followUpLocator');
    if (!report.source || !('file' in report.source)) issue(rat, 'source.file field required (may be null)');
    date(report.source?.checked, 'source.checked', rat);
    if (!Array.isArray(report.results) || !Array.isArray(report.harms) || !Array.isArray(report.delivery)) issue(rat, 'results, harms and delivery must be arrays');
    for (const result of report.results ?? []) {
      const wat = `${rat}/result ${result.endpoint ?? '?'}`;
      for (const field of ['endpoint','role','measure','locator']) required(result[field], field, wat);
      oneOf(result.role, roles, 'role', wat);
      if (['primary','key-secondary'].includes(result.role)) {
        if (!('met' in result)) issue(wat, 'met required for primary/key-secondary result');
        else if (result.met === null) {
          if (report.source?.level !== 'abstract') issue(wat, 'met:null allowed only for abstract-level report source');
        } else if (![true,false,'not-tested'].includes(result.met)) issue(wat, 'met must be true, false, not-tested, or abstract-level null');
      }
      if (result.values && Object.keys(result.values).some(key => !armKeys.has(key))) issue(wat, 'result values keys must match design.arm keys');
      if (result.effect) {
        oneOf(result.effect.type, ['HR','RR','OR','difference','none'], 'effect.type', wat);
        if (result.effect.ci && (!Array.isArray(result.effect.ci) || result.effect.ci.length !== 2 || result.effect.ci.some(x => typeof x !== 'number'))) issue(wat, 'effect.ci must be two numbers');
      }
    }
    for (const collection of ['harms','delivery']) for (const fact of report[collection] ?? []) {
      const wat = `${rat}/${collection} ${fact.label ?? '?'}`;
      required(fact.label, 'label', wat); required(fact.locator, 'locator', wat);
      if (fact.values && Object.keys(fact.values).some(key => !armKeys.has(key))) issue(wat, 'values keys must match design.arm keys');
    }
  }
  if (!Array.isArray(trial.relations)) issue(at, 'relations must be an array');
  for (const relation of trial.relations ?? []) {
    oneOf(relation.type, relationTypes, 'relation.type', at);
    if (!trialIds.has(relation.target)) issue(at, `relation target does not exist: ${relation.target}`);
    required(relation.note, 'relation.note', at);
    if (relation.note?.trim().split(/\s+/).length >= 25) issue(at, `relation note to ${relation.target} must be under 25 words`);
  }
  if (trial.page !== null) {
    const expected = `/docs/clinical-evidence/studies/${trial.id}`;
    if (trial.page !== expected) issue(at, `page must be ${expected} or null`);
    if (!existsSync(resolve(root, `docs/06-clinical-evidence/studies/${trial.id}.mdx`))) issue(at, `page MDX missing: ${expected}`);
  }
  const status = trial.status ?? {};
  oneOf(status.sourceRead, ['full-text','abstract','none'], 'status.sourceRead', at);
  if (status.claimsChecked !== null) date(status.claimsChecked, 'status.claimsChecked', at);
  if (status.clinicalReview !== null) {
    required(status.clinicalReview?.by, 'clinicalReview.by', at);
    date(status.clinicalReview?.date, 'clinicalReview.date', at);
  }
}
if (trialIds.size !== trials.length) issue('trials', 'duplicate trial id');
for (const file of readdirSync(resolve(root, 'docs/06-clinical-evidence/studies')).filter(name => name.endsWith('.mdx'))) {
  if (!trialIds.has(file.slice(0, -4))) issue('studies/' + file, 'MDX page has no trial file');
}
for (const event of events) {
  const at = `events.json/${event.id ?? '?'}`;
  for (const field of ['id','date','kind','body','title','checked']) required(event[field], field, at);
  date(event.date, 'date', at); date(event.checked, 'checked', at);
  oneOf(event.kind, ['regulatory','guideline','practice'], 'kind', at);
  if (event.kind === 'guideline') {
    required(event.version, 'version', at); required(event.statement, 'statement', at);
  }
  if (!event.url && !event.privateLocator) issue(at, 'official url or privateLocator required');
  if (event.url && !/^https:\/\//.test(event.url)) issue(at, 'url must be https');
  if (!Array.isArray(event.trials) || !Array.isArray(event.decisions)) issue(at, 'trials and decisions must be arrays');
  for (const id of event.trials ?? []) if (!trialIds.has(id)) issue(at, `unknown trial ${id}`);
  for (const id of event.decisions ?? []) if (!decisionIds.has(id)) issue(at, `unknown decision ${id}`);
}
// Page bindings (from WHITWIKI check-trial-integrity): each page shows its own trial and cites its primary report.
for (const [, trial] of trials) {
  if (!trial.page) continue;
  const file = resolve(root, `docs/06-clinical-evidence/studies/${trial.id}.mdx`);
  if (!existsSync(file)) continue;
  const article = readFileSync(file, 'utf8');
  for (const component of ['TrialBottomLine', 'TrialQuickHit', 'InConversation', 'ReportHistory'])
    if (!article.includes(`<${component} id="${trial.id}" />`)) issue(`studies/${trial.id}.mdx`, `missing <${component} id="${trial.id}" />`);
  const primaryDoi = trial.reports?.find(report => report.kind === 'primary')?.doi;
  if (primaryDoi && !article.toLowerCase().includes(primaryDoi.toLowerCase())) issue(`studies/${trial.id}.mdx`, 'primary report DOI absent from page');
}
// Every decision appears in exactly one timeline group on the landing page.
const groups = read(resolve(dir, 'timeline-groups.json')) ?? [];
const grouped = groups.flatMap(group => group.items.map(([id]) => id));
for (const id of decisionIds) if (grouped.filter(item => item === id).length !== 1) issue('timeline-groups.json', `decision ${id} must appear in exactly one group`);
for (const id of grouped) if (!decisionIds.has(id)) issue('timeline-groups.json', `unknown decision ${id}`);
for (const group of groups) if (!areas.includes(group.id)) issue('timeline-groups.json', `unknown area ${group.id}`);
if (errors.length) {
  console.error(`Clinical evidence validation failed (${errors.length}):\n${errors.map(x => '  - ' + x).join('\n')}`);
  process.exit(1);
}
console.log(`Clinical evidence validation passed: ${trials.length} trial families, ${decisions.length} decisions, ${events.length} events.`);
