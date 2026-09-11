const test = require('node:test');
const assert = require('node:assert/strict');
const {validateEvidence} = require('../check-evidence');
const source = require('../../src/data/evidence-registry.json');
const check = data => validateEvidence(data, {checkFiles: false, today: '2026-09-11'});

test('curated registry has explicit denominators, uncertainty and all seven pathways', () => {
  assert.deepEqual(check(source), []);
});
test('missing uncertainty and absent source access fail closed', () => {
  const data = structuredClone(source);
  delete data.records[0].endpoints[0].uncertainty;
  data.records[0].access.url = 'javascript:alert(1)';
  assert.ok(check(data).some(error => error.includes('uncertainty')));
  assert.ok(check(data).some(error => error.includes('source-access URL')));
});
test('duplicate identifiers and missing study bindings are rejected', () => {
  const data = structuredClone(source);
  data.records.push(structuredClone(data.records[0]));
  data.pathways.pop.recordIds.push('missing-study');
  assert.ok(check(data).some(error => error.includes('duplicate id')));
  assert.ok(check(data).some(error => error.includes('unknown study')));
});
test('retractions, impossible dates and future checks require intervention', () => {
  const data = structuredClone(source);
  data.records[0].correction.status = 'retracted';
  data.records[1].access.checkedAt = '2026-02-30';
  data.records[2].correction.checkedAt = '2027-01-01';
  assert.ok(check(data).some(error => error.includes('flagged publication')));
  assert.equal(check(data).filter(error => error.includes('invalid or future')).length, 2);
});
test('canonical paths cannot escape docs or repeat the same article', () => {
  const data = structuredClone(source);
  data.pathways.pop.docPath = 'docs/../outside.mdx';
  data.pathways.ed.docPath = data.pathways.bph.docPath;
  assert.equal(check(data).filter(error => error.includes('canonical docPath')).length, 2);
});
