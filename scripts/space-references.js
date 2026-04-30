#!/usr/bin/env node
/**
 * One-off fix: when reference list entries are stacked on consecutive lines
 * without blank-line separators, markdown renders them as one paragraph.
 *
 * This script inserts a blank line between every consecutive `<a id="refN">`
 * reference line so they render as proper bibliography entries — the standard
 * across the rest of the site.
 *
 * Run: node scripts/space-references.js [--dry-run]
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

function fix(content) {
  // Insert blank line between consecutive ref-anchor lines
  // Pattern: `<a id="refN">…\n<a id="refM">…` → `<a id="refN">…\n\n<a id="refM">…`
  const out = content.replace(
    /(<a id="ref\d+"><\/a>[^\n]*)\n(<a id="ref\d+"><\/a>)/g,
    '$1\n\n$2'
  );
  // Repeat to catch chains of >2 (regex only matches non-overlapping)
  let prev = out;
  let next = out;
  do {
    prev = next;
    next = prev.replace(
      /(<a id="ref\d+"><\/a>[^\n]*)\n(<a id="ref\d+"><\/a>)/g,
      '$1\n\n$2'
    );
  } while (next !== prev);
  return next;
}

const files = walk(DOCS_DIR);
let changed = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = fix(content);
  if (newContent === content) continue;
  if (!DRY_RUN) fs.writeFileSync(file, newContent);
  changed++;
  console.log(`${DRY_RUN ? '[dry-run] ' : ''}${path.relative(REPO_ROOT, file)}`);
}

console.log(`\n${DRY_RUN ? '[dry-run] ' : ''}Files changed: ${changed}`);
