'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {checkContent} = require('../check-content-preservation');

// Actual public Lone Star placeholder before the September 20 restoration.
const removedLoneStar = `---
title: Lone Star Retractor System
sidebar_position: 2
---

# Lone Star Retractor System

The Lone Star is a self-retaining surgical retractor system.

## Evidence orientation

The inherited page contained device specifications, clinical applications, comparative and safety assertions, manufacturer claims, and retraction instructions. These details were not re-adjudicated against complete current instrument, procedure, and clinical-evidence packages in this review and have been removed.

## Related pages

- [Perineal Bookwalter](/docs/foundations/tools/instruments/retractors/perineal-bookwalter)
- [Bookwalter](/docs/foundations/tools/instruments/retractors/bookwalter)
- [Heaney Retractor](/docs/foundations/tools/instruments/retractors/heaney-retractor)

## Evidence boundary

The inherited page was read in full. Its source packages and procedure-specific evidence were not adjudicated. This page is not an instrument-selection or operative-retraction protocol.
`;

test('rejects the actual blanket-deletion Lone Star regression', () => {
  assert.equal(checkContent(removedLoneStar).length, 1);
});

test('rejects minor wording and wrapping variants of blanket deletion', () => {
  for (const text of [
    'These instructions were not retained because their sources were not fully reviewed.',
    '**Content removed** pending full-text review.',
    'This information has been removed because it is unverified.',
    'These details were not\nre-adjudicated and have been removed.',
    'Status: removed-unadjudicated-details',
  ]) assert.ok(checkContent(text).length, text);
});

test('allows useful manufacturer-based teaching without clinical trials', () => {
  const page = `# Retractor setup
The manufacturer supplies reusable frames and single-use elastic stays.
Inspect the frame, place the stays under direct vision and adjust traction to the tissue.
Manufacturer instructions support setup; comparative clinical trials are lacking.
Follow the model-specific IFU for reprocessing and compatibility.`;
  assert.deepEqual(checkContent(page), []);
});

test('allows clinical uncertainty and actual removal of tissue, mesh or devices', () => {
  for (const text of [
    'Evidence is uncertain. Exposed mesh may be removed after individualized assessment.',
    'The drain was removed after its indication ended; the evidence for a fixed postoperative day is not verified.',
    'The patient did not retain the pessary. Instructions for reinsertion were provided.',
    'An unsupported superiority claim was removed after checking the manufacturer documentation.',
  ]) assert.deepEqual(checkContent(text), [], text);
});

test('allows historical context and ordinary empty stubs', () => {
  assert.deepEqual(checkContent('# Sims\nThe statue was removed in 2018 after public protest.'), []);
  assert.deepEqual(checkContent('---\ntitle: Future technique\n---\n\n# Future technique\n\nContent coming soon.'), []);
  assert.deepEqual(checkContent(''), []);
});

test('ignores internal metadata, comments and quoted code examples', () => {
  const page = `---
evidenceNote: "Content removed pending source review."
---
<!-- Content removed pending source review. -->
{/* Content removed pending source review. */}
\`\`\`md
Content removed pending source review.
\`\`\`
# Useful instrument page
Select the manufacturer-specified blade and inspect it before use.`;
  assert.deepEqual(checkContent(page), []);
});
