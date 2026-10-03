#!/usr/bin/env node
/**
 * WARWIKI patient-handout source check.
 *
 * Missing source files are errors. Missing mappings and source pages committed
 * after a handout's review date are advisories; they do not fail lint.
 */

const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const HANDOUTS_FILE = path.join(ROOT, 'src/data/handouts.ts');

function parseHandouts(src) {
  const list = src.split('export const PATIENT_HANDOUTS: PatientHandout[] = [')[1];
  if (!list) throw new Error('PATIENT_HANDOUTS list not found.');

  const entries = [];
  for (const match of list.matchAll(/^  \{\n([\s\S]*?)^  \},?$/gm)) {
    const body = match[1];
    const slug = body.match(/^    slug: ['"]([^'"]+)['"],/m)?.[1];
    if (!slug) throw new Error('Handout entry has no slug.');
    const sourceField = body.match(/^    sourcePages: \[([\s\S]*?)\],/m)?.[1];
    const sourcePages = sourceField
      ? [...sourceField.matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1])
      : [];
    const reviewedAgainst = body.match(/^    reviewedAgainst: ['"](\d{4}-\d{2}-\d{2})['"],/m)?.[1];
    entries.push({slug, sourcePages, reviewedAgainst});
  }
  if (entries.length === 0) throw new Error('No handout entries parsed.');
  return entries;
}

function lastCommitDate(page) {
  return execFileSync('git', ['log', '-1', '--format=%cs', '--', page], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

function main() {
  const handouts = parseHandouts(fs.readFileSync(HANDOUTS_FILE, 'utf8'));
  const missing = [];
  const unmapped = [];
  for (const {slug, sourcePages} of handouts) {
    if (sourcePages.length === 0) unmapped.push(slug);
    for (const page of sourcePages) {
      if (!page.startsWith('docs/') || !page.endsWith('.mdx') ||
          path.normalize(page) !== page || !fs.statSync(path.join(ROOT, page), {throwIfNoEntry: false})?.isFile()) {
        missing.push(`${slug}: ${page}`);
      }
    }
  }

  if (missing.length) {
    console.error(`✗ Handout sources: ${missing.length} missing or invalid source page(s):`);
    for (const item of missing) console.error(`  ${item}`);
    process.exitCode = 1;
    return;
  }

  console.log(`ℹ Handout source advisory: ${handouts.length} handouts, ${handouts.length - unmapped.length} mapped.`);
  if (unmapped.length) {
    console.log(`  ${unmapped.length} handout(s) have no sourcePages:`);
    for (const slug of unmapped) console.log(`    ${slug}`);
  }

  let gitAvailable = false;
  try {
    gitAvailable = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim() === 'false';
  } catch (_) { /* git unavailable or not a repository */ }
  if (!gitAvailable) {
    console.log('  Date advisory skipped (git unavailable or shallow repository).');
    return;
  }

  const dates = new Map();
  const stale = [];
  try {
    for (const {slug, sourcePages, reviewedAgainst} of handouts) {
      if (!reviewedAgainst) continue;
      for (const page of sourcePages) {
        if (!dates.has(page)) dates.set(page, lastCommitDate(page));
        const changed = dates.get(page);
        if (changed && changed > reviewedAgainst) {
          stale.push(`${slug}: ${page} changed ${changed} (reviewed ${reviewedAgainst})`);
        }
      }
    }
  } catch (_) {
    console.log('  Date advisory skipped (git unavailable).');
    return;
  }
  console.log(`  ${stale.length} source-page mapping(s) changed after review (${new Set(stale.map((s) => s.split(':')[0])).size} handout(s)).`);
  for (const item of stale) console.log(`  ${item}`);
}

if (require.main === module) main();

module.exports = {parseHandouts};
