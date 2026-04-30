#!/usr/bin/env node
/**
 * WARWIKI citation normalization
 *
 * For every doc with a `## References` section that uses plain numbered
 * references (`1. Author...`) without anchor tags, this script:
 *
 *   1. Inserts <a id="refN"></a> anchor tags on each reference line so the
 *      WARWIKI inline cite pattern `<sup>[[N]](#refN)</sup>` can resolve.
 *   2. Converts any plain `[N]` bracket cites in the body to the WARWIKI
 *      standard inline pattern `<sup>[[N]](#refN)</sup>` (only inside body
 *      prose; the references block is left alone).
 *
 * Skips:
 *   - Files that already use `<a id="refN">` anchors (already normalized).
 *   - Files using footnote-style `[^N]` (GAS articles — different convention).
 *   - Files where the references section is a stub ("*To be built out.*",
 *     "*Coming soon.*", "*Pending.*", or empty).
 *
 * Run: node scripts/normalize-citations.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const DRY_RUN = process.argv.includes('--dry-run');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function normalize(content) {
  // Skip if already using <a id="ref> anchors
  if (/<a id="ref\d+"/.test(content)) return null;
  // Skip if using footnote style
  if (/\[\^\d+\]/.test(content)) return null;

  const refSectionMatch = content.match(/(\n## References\s*\n)([\s\S]*)$/);
  if (!refSectionMatch) return null;

  const refHeader = refSectionMatch[1];
  const refBody = refSectionMatch[2];
  const beforeRefs = content.slice(0, refSectionMatch.index);

  // Skip stub bibliographies
  const stubPatterns = /^\s*\*(To be built out|Coming soon|Pending|TBD|To be filled|To be added|Forthcoming)\.?\*\s*$/im;
  if (stubPatterns.test(refBody.trim()) || refBody.trim() === '') return null;

  // Find numbered references — supports `1.`, `**1.**`, `1)` styles
  const refLines = refBody.split('\n');
  const refNumbers = [];
  const newRefBody = refLines.map((line) => {
    // Match a line that starts with N. (number period) — possibly inside bold
    const m = line.match(/^(\s*)(?:\*\*)?(\d+)\.(?:\*\*)?\s+(.+)$/);
    if (!m) return line;
    const [, indent, num, rest] = m;
    refNumbers.push(parseInt(num, 10));
    return `${indent}<a id="ref${num}"></a>${num}. ${rest}`;
  }).join('\n');

  if (refNumbers.length === 0) return null;

  // Convert plain [N] brackets in body to <sup>[[N]](#refN)</sup>
  // Be conservative: only convert standalone [N] not inside markdown link []() or other bracket contexts
  // Do NOT touch already-formatted [[N]] cites
  let newBeforeRefs = beforeRefs;
  // Pattern: [N] not preceded by [ or ( and not followed by (
  // Use lookbehind/lookahead. Convert "...word[N]..." → "...word<sup>[[N]](#refN)</sup>..."
  // Only convert if the number N appears in our reference list
  newBeforeRefs = newBeforeRefs.replace(/(?<![\[\(\w-])\[(\d+)\](?!\()/g, (full, n) => {
    const num = parseInt(n, 10);
    if (!refNumbers.includes(num)) return full;
    return `<sup>[[${num}]](#ref${num})</sup>`;
  });

  return newBeforeRefs + refHeader + newRefBody;
}

const files = walk(DOCS_DIR);
let changed = 0;
let skipped = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = normalize(content);
  if (newContent === null || newContent === content) {
    skipped++;
    continue;
  }
  if (!DRY_RUN) {
    fs.writeFileSync(file, newContent);
  }
  changed++;
  console.log(`${DRY_RUN ? '[dry-run] ' : ''}${path.relative(REPO_ROOT, file)}`);
}

console.log(`\n${DRY_RUN ? '[dry-run] ' : ''}Files changed: ${changed}`);
console.log(`Files skipped (already normalized, footnote style, stubs, or no refs): ${skipped}`);
