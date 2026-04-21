#!/usr/bin/env node
/**
 * WARWIKI scope check
 *
 * Flags articles whose TITLE or H1 names a topic that falls outside the
 * reconstructive / functional / urogynecologic scope (endourology and
 * primary urologic oncology are excluded — see feedback_site_scope.md).
 *
 * Body mentions are fine (post-PCNL stricture, post-cystectomy reconstruction,
 * RUF after prostatectomy) — so this only scans titles and H1 headings.
 *
 * Exit 0 = clean. Exit 1 = one or more titles flagged.
 */

const fs = require('fs');
const path = require('path');

// Terms that should never be the PRIMARY topic of a WARWIKI article.
// Case-insensitive substring match on title/H1.
const FORBIDDEN = [
  'pcnl',
  'percutaneous nephrolithotomy',
  'ureteroscopy for stones',
  'nephrolithiasis',
  'urolithiasis',
  'kidney stone',
  'ureteral stone',
  'staghorn',
  'shockwave lithotripsy',
  'eswl',
  'radical cystectomy for bladder cancer',
  'radical nephrectomy for cancer',
  'radical nephrectomy for rcc',
  'renal cell carcinoma treatment',
  'prostate cancer screening',
  'prostate cancer treatment',
  'bladder cancer staging',
  'bladder cancer treatment',
  'upper tract urothelial carcinoma',
];

const ALLOWLIST_PATHS = [
  // If any article legitimately needs one of these in its title, add here.
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function extractTitleAndH1(content) {
  const lines = content.split('\n');
  let title = '';
  let h1 = '';
  let inFrontmatter = false;
  let fmDone = false;
  for (const line of lines) {
    if (line.trim() === '---') {
      if (!inFrontmatter) inFrontmatter = true;
      else { fmDone = true; inFrontmatter = false; }
      continue;
    }
    if (inFrontmatter && !fmDone) {
      const m = line.match(/^title:\s*["']?(.+?)["']?\s*$/);
      if (m) title = m[1];
    } else if (fmDone) {
      const m = line.match(/^#\s+(.+)$/);
      if (m) { h1 = m[1]; break; }
    }
  }
  return { title, h1 };
}

function main() {
  const docsDir = path.resolve(__dirname, '..', 'docs');
  const files = walk(docsDir);
  const flagged = [];

  for (const file of files) {
    const rel = path.relative(path.resolve(__dirname, '..'), file);
    if (ALLOWLIST_PATHS.some((p) => rel.includes(p))) continue;

    const content = fs.readFileSync(file, 'utf8');
    const { title, h1 } = extractTitleAndH1(content);
    const target = `${title} ${h1}`.toLowerCase();

    for (const term of FORBIDDEN) {
      if (target.includes(term)) {
        flagged.push({ file: rel, title, h1, term });
        break;
      }
    }
  }

  if (flagged.length === 0) {
    console.log(`✓ Scope check: ${files.length} files, no out-of-scope titles found.`);
    process.exit(0);
  }

  console.error(`✗ Scope check: ${flagged.length} file(s) with out-of-scope titles:`);
  for (const f of flagged) {
    console.error(`  ${f.file}`);
    console.error(`    title: "${f.title}"  h1: "${f.h1}"`);
    console.error(`    flagged term: "${f.term}"`);
  }
  console.error('');
  console.error('If any of these is intentionally in scope (e.g. post-treatment reconstruction),');
  console.error('add the path to ALLOWLIST_PATHS in scripts/check-scope.js.');
  process.exit(1);
}

main();
