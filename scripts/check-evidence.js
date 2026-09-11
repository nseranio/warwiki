#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const REQUIRED_PATHWAYS = ['female-ui', 'pop', 'male-ui', 'bph', 'male-stricture', 'ed', 'female-ruti'];
const filled = value => typeof value === 'string' && value.trim().length > 0;
const url = value => { try { return new URL(value).protocol === 'https:'; } catch { return false; } };
const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

function validateEvidence(data, {root = ROOT, checkFiles = true, today = new Date().toISOString().slice(0, 10)} = {}) {
  const errors = [];
  if (data?.schemaVersion !== 1) errors.push('Unsupported evidence schemaVersion');
  if (!filled(data?.scope)) errors.push('Missing evidence scope');
  if (!Array.isArray(data?.records) || !data.records.length) return [...errors, 'No evidence records'];
  const seen = new Set();
  const dois = new Set();
  for (const record of data.records) {
    const id = record?.id || '(missing id)';
    const fail = message => errors.push(`${id}: ${message}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || seen.has(id)) fail('invalid or duplicate id');
    seen.add(id);
    for (const field of ['label', 'design', 'population', 'comparison', 'followUp', 'applicability']) if (!filled(record?.[field])) fail(`missing ${field}`);
    for (const field of ['title', 'authors']) if (!filled(record?.source?.[field])) fail(`missing source.${field}`);
    if (!Number.isInteger(record?.source?.year) || record.source.year < 1900 || record.source.year > Number(today.slice(0, 4))) fail('invalid publication year');
    const doi = record?.source?.doi;
    if (!filled(doi) || !/^10\.\d{4,9}\/\S+$/i.test(doi) || dois.has(doi.toLowerCase())) fail('invalid or duplicate DOI');
    if (filled(doi)) dois.add(doi.toLowerCase());
    if (!url(record?.source?.url)) fail('source URL must use HTTPS');
    if (!(record?.sampleSize?.randomized === null || (Number.isInteger(record?.sampleSize?.randomized) && record.sampleSize.randomized > 0))) fail('randomized sample size must be positive or explicitly null');
    if (!filled(record?.sampleSize?.analysis)) fail('missing denominator explanation');
    if (!Array.isArray(record?.endpoints) || !record.endpoints.length) fail('no endpoints');
    else for (const endpoint of record.endpoints) for (const field of ['name', 'timepoint', 'result', 'uncertainty']) if (!filled(endpoint?.[field])) fail(`endpoint missing ${field}`);
    if (!Array.isArray(record?.limitations) || !record.limitations.length || record.limitations.some(item => !filled(item))) fail('missing limitations');
    if (!['abstract', 'selected-full-text'].includes(record?.access?.level)) fail('invalid source-access level');
    if (!url(record?.access?.url)) fail('invalid source-access URL');
    for (const field of ['access', 'correction']) if (!date(record?.[field]?.checkedAt) || record[field].checkedAt > today) fail(`invalid or future ${field} date`);
    if (!['not-identified', 'not-assessed', 'correction-notice', 'retracted', 'expression-of-concern'].includes(record?.correction?.status)) fail('invalid correction status');
    if (!filled(record?.correction?.note)) fail('missing correction scope');
    if (record?.correction?.status === 'correction-notice' && !url(record.correction.url)) fail('correction notice needs a source URL');
    if (record?.correction?.status === 'retracted' || record?.correction?.status === 'expression-of-concern') fail('flagged publication must be removed from clinical comparison pending reassessment');
  }
  const pathways = data.pathways || {};
  for (const id of REQUIRED_PATHWAYS) if (!pathways[id]) errors.push(`Missing core pathway: ${id}`);
  const used = new Set();
  const docs = new Set();
  for (const [id, pathway] of Object.entries(pathways)) {
    if (!filled(pathway?.label)) errors.push(`${id}: missing label`);
    const doc = pathway?.docPath;
    const safeDoc = typeof doc === 'string' && /^docs\/.+\.mdx$/.test(doc) && !doc.split('/').includes('..');
    if (!safeDoc || docs.has(doc)) errors.push(`${id}: invalid or duplicate canonical docPath`);
    docs.add(doc);
    if (!Array.isArray(pathway?.recordIds) || !pathway.recordIds.length) errors.push(`${id}: no study records`);
    else {
      if (new Set(pathway.recordIds).size !== pathway.recordIds.length) errors.push(`${id}: duplicate study reference`);
      for (const ref of pathway.recordIds) { if (!seen.has(ref)) errors.push(`${id}: unknown study ${ref}`); used.add(ref); }
    }
    if (checkFiles && safeDoc) {
      const file = path.resolve(root, doc);
      if (!fs.existsSync(file)) errors.push(`${id}: canonical page missing`);
      else if (!fs.readFileSync(file, 'utf8').includes(`<EvidenceTable pathwayId="${id}"`)) errors.push(`${id}: canonical page does not render its evidence comparison`);
    }
  }
  for (const id of seen) if (!used.has(id)) errors.push(`${id}: orphan evidence record`);
  return errors;
}
if (require.main === module) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/evidence-registry.json'), 'utf8'));
  const errors = validateEvidence(data);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`Evidence registry: ${data.records.length} studies across ${Object.keys(data.pathways).length} canonical pathways; fields, references and page bindings valid.`);
}
module.exports = {validateEvidence};
