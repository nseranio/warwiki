#!/usr/bin/env node
/**
 * migrate-stable-ref-ids.js  (DRY RUN BY DEFAULT)
 *
 * Generates a *parallel* stable anchor next to every numbered reference
 * anchor, so that future citation renumbering doesn't silently break
 * inbound tooltip / search links.
 *
 * Convention added:
 *   Before:  <a id="ref12"></a>12. Hautmann RE, Volkmer B, ... 2021;205(1):174-182.
 *   After:   <a id="ref12"></a><a id="ref-hautmann-2021-jurol"></a>12. Hautmann RE, ...
 *
 * The stable ID is derived from: first author surname + year + journal slug.
 * Numbered IDs are preserved so existing <sup>[[12]](#ref12)</sup> inline
 * citations keep working unchanged.
 *
 * Usage:
 *   node scripts/migrate-stable-ref-ids.js              # dry run — prints diff
 *   node scripts/migrate-stable-ref-ids.js --write      # write changes
 *   node scripts/migrate-stable-ref-ids.js --write docs/01-foundations  # narrower
 *
 * Recommended workflow:
 *   1. Dry run on one directory, eyeball the proposed stable IDs.
 *   2. --write on that directory; spot-check the resulting MDX builds.
 *   3. Expand outward.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const WRITE = argv.includes('--write');
const targetArg = argv.find(a => !a.startsWith('--') && a !== 'docs');
const TARGET = path.join(ROOT, targetArg || 'docs');

function* walkMdx(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMdx(p);
    else if (entry.isFile() && entry.name.endsWith('.mdx')) yield p;
  }
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stableIdFor(refBody) {
  // Heuristic: first author surname token, year (4 digits), journal in italics if present.
  const surnameMatch = refBody.match(/^([A-Z][A-Za-zÀ-ÿ'-]+)\b/);
  const yearMatch = refBody.match(/\b(19|20)\d{2}\b/);
  const journalMatch = refBody.match(/\*([^*]+?)\*/);
  const surname = surnameMatch ? slugify(surnameMatch[1]) : 'anon';
  const year = yearMatch ? yearMatch[0] : 'nd';
  const journal = journalMatch ? slugify(journalMatch[1]).split('-').slice(0, 2).join('-') : '';
  return ['ref', surname, year, journal].filter(Boolean).join('-');
}

const ANCHOR_RE = /<a id="ref(\d+)"><\/a>(\s*\d+\.\s*)([^\n]+)/g;

let totalFiles = 0;
let touchedFiles = 0;
let totalAnchors = 0;
let collisions = 0;

for (const file of walkMdx(TARGET)) {
  totalFiles += 1;
  const src = fs.readFileSync(file, 'utf8');
  const seenInFile = new Set();
  let touched = false;

  const next = src.replace(ANCHOR_RE, (match, num, sep, body) => {
    // Already migrated? Skip.
    const lookahead = src.slice(src.indexOf(match) + match.length, src.indexOf(match) + match.length + 80);
    if (/<a id="ref-[a-z0-9-]+"><\/a>/.test(match) || /^<a id="ref-/.test(lookahead)) {
      return match;
    }
    let stable = stableIdFor(body);
    if (seenInFile.has(stable)) {
      collisions += 1;
      stable += `-${num}`;
    }
    seenInFile.add(stable);
    totalAnchors += 1;
    touched = true;
    return `<a id="ref${num}"></a><a id="${stable}"></a>${sep}${body}`;
  });

  if (touched && next !== src) {
    touchedFiles += 1;
    if (WRITE) fs.writeFileSync(file, next);
  }
}

console.log(
  `${WRITE ? 'Wrote' : '[dry run] Would write'} stable IDs in ${touchedFiles} of ${totalFiles} files.`
);
console.log(`  Anchors added: ${totalAnchors}`);
console.log(`  Per-file collisions (resolved with numeric suffix): ${collisions}`);
if (!WRITE) console.log('\nRe-run with --write to apply.');
