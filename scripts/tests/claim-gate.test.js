const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

test('claim gate (schema 2) and orchestrator validation regression tests pass', () => {
  const r = spawnSync('python3', ['-W', 'ignore', path.resolve(__dirname, '../review/tests/test_gate.py')], {encoding: 'utf8'});
  assert.equal(r.status, 0, r.stdout + r.stderr);
});
