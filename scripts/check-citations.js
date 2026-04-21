#!/usr/bin/env node
/**
 * WARWIKI citation integrity check
 *
 * For every article, verifies:
 *   - Every cited ref (<sup>[[N]](#refN)</sup>) has a matching <a id="refN">
 *   - Every anchor <a id="refN"> is cited at least once
 *   - Citation numbering has no gaps (1, 2, 3 not 1, 3, 4)
 *   - Footnote style [^N] / [^N]: is internally consistent (GAS articles)
 *
 * Exit 0 = clean. Exit 1 = one or more articles with citation issues.
 */

const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function checkFile(file, rel) {
  const content = fs.readFileSync(file, 'utf8');
  const issues = [];

  // Superscript citation pattern: <sup>[[N]](#refN)</sup>  — may chain
  const refLinkRe = /\[\[(\d+)\]\]\(#ref\d+\)/g;
  const cited = new Set();
  let m;
  while ((m = refLinkRe.exec(content)) !== null) cited.add(parseInt(m[1], 10));

  // Anchor pattern: <a id="refN"></a>
  const anchorRe = /<a\s+id=["']ref(\d+)["']\s*><\/a>/g;
  const anchors = new Set();
  while ((m = anchorRe.exec(content)) !== null) anchors.add(parseInt(m[1], 10));

  // Skip files with no citation structure at all.
  if (cited.size === 0 && anchors.size === 0) {
    // Check footnote style as a fallback.
    const fnRefRe = /\[\^(\d+)\](?!:)/g;
    const fnDefRe = /^\[\^(\d+)\]:/gm;
    const fnCited = new Set();
    const fnDefined = new Set();
    while ((m = fnRefRe.exec(content)) !== null) fnCited.add(parseInt(m[1], 10));
    while ((m = fnDefRe.exec(content)) !== null) fnDefined.add(parseInt(m[1], 10));
    if (fnCited.size === 0 && fnDefined.size === 0) return [];
    for (const n of fnCited) if (!fnDefined.has(n)) issues.push(`footnote [^${n}] cited but not defined`);
    for (const n of fnDefined) if (!fnCited.has(n)) issues.push(`footnote [^${n}] defined but not cited`);
    return issues;
  }

  for (const n of cited) if (!anchors.has(n)) issues.push(`cites ref${n} but no <a id="ref${n}"> anchor`);
  for (const n of anchors) if (!cited.has(n)) issues.push(`has <a id="ref${n}"> anchor but no citation`);

  // Gap check — find max, look for holes.
  const all = [...cited, ...anchors];
  if (all.length > 0) {
    const max = Math.max(...all);
    for (let i = 1; i <= max; i++) {
      if (!cited.has(i) && !anchors.has(i)) issues.push(`gap at ref${i} (max is ref${max})`);
    }
  }

  return issues;
}

function main() {
  const docsDir = path.resolve(__dirname, '..', 'docs');
  const files = walk(docsDir);
  const problems = [];

  for (const file of files) {
    const rel = path.relative(path.resolve(__dirname, '..'), file);
    const issues = checkFile(file, rel);
    if (issues.length > 0) problems.push({ rel, issues });
  }

  if (problems.length === 0) {
    console.log(`✓ Citation check: ${files.length} files, no issues.`);
    process.exit(0);
  }

  console.error(`✗ Citation check: ${problems.length} file(s) with issues:`);
  for (const p of problems) {
    console.error(`  ${p.rel}`);
    for (const i of p.issues) console.error(`    - ${i}`);
  }
  process.exit(1);
}

main();
