const test = require('node:test');
const assert = require('node:assert/strict');
const {inspectMetadata} = require('../check-evidence-sources');
const record = {id: 'trial-2026', source: {doi: '10.1000/example'}, correction: {status: 'not-identified'}};
test('metadata match is case-insensitive; absence does not count as success', () => {
  assert.deepEqual(inspectMetadata(record, {doi: '10.1000/EXAMPLE'}).errors, []);
  assert.ok(inspectMetadata(record, undefined).errors.length);
  assert.ok(inspectMetadata(record, {doi: '10.1000/wrong'}).errors.length);
});
test('editorials are not corrections but new errata need editorial review', () => {
  assert.deepEqual(inspectMetadata(record, {doi: record.source.doi, commentCorrectionList: {commentCorrection: [{type: 'Comment in'}]}}).notices, []);
  const result = inspectMetadata(record, {doi: record.source.doi, commentCorrectionList: {commentCorrection: [{type: 'Erratum in'}]}});
  assert.equal(result.notices.length, 1);
  assert.ok(result.errors.some(error => error.includes('New correction')));
});
test('retracted publications require reassessment even when a correction is recorded', () => {
  assert.ok(inspectMetadata({...record, correction: {status: 'correction-notice'}}, {doi: record.source.doi, pubTypeList: {pubType: ['Retracted Publication']}}).errors.some(error => error.includes('Retraction')));
});
