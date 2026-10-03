const {test} = require('node:test');
const assert = require('node:assert/strict');
const {parseHandouts} = require('../check-handout-sources');

test('handout parser reads source pages and review dates without importing TypeScript', () => {
  const src = `export const PATIENT_HANDOUTS: PatientHandout[] = [
  {
    slug: 'mapped',
    sourcePages: [
      'docs/first.mdx',
      'docs/second.mdx',
    ],
    reviewedAgainst: '2026-10-01',
  },
  {
    slug: 'unmapped',
  },
];`;
  assert.deepEqual(parseHandouts(src), [
    {slug: 'mapped', sourcePages: ['docs/first.mdx', 'docs/second.mdx'], reviewedAgainst: '2026-10-01'},
    {slug: 'unmapped', sourcePages: [], reviewedAgainst: undefined},
  ]);
});
