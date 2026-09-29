#!/usr/bin/env node
'use strict';

/**
 * Landing-page card descriptions (section-stack-desc / toc-desc) should be one
 * plain sentence. Flag cards that run long or read as slash-separated lists.
 * See STYLE.md, "Landing-page cards".
 */
const fs = require('node:fs');
const path = require('node:path');

const MAX_WORDS = 25;
const MAX_SLASHES = 2;
const DOCS = path.join(__dirname, '..', 'docs');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return p.endsWith('.mdx') ? [p] : [];
  });
}

const issues = [];
let total = 0;
for (const file of walk(DOCS)) {
  const text = fs.readFileSync(file, 'utf8');
  const re = /<span className="(?:section-stack-desc|toc-desc)">([\s\S]*?)<\/span>/g;
  let m;
  while ((m = re.exec(text))) {
    total += 1;
    const desc = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const words = desc.split(' ').length;
    const slashes = (desc.match(/ \/ /g) || []).length;
    const problems = [];
    if (words > MAX_WORDS) problems.push(`${words} words (max ${MAX_WORDS})`);
    if (slashes > MAX_SLASHES) problems.push(`slash-separated list (${slashes} slashes)`);
    if (problems.length) {
      issues.push(`${path.relative(process.cwd(), file)}: ${problems.join('; ')}: "${desc.slice(0, 80)}..."`);
    }
  }
}

if (issues.length) {
  console.error(`✗ Card descriptions: ${issues.length} of ${total} need shortening (see STYLE.md, "Landing-page cards").`);
  for (const i of issues) console.error(`  ${i}`);
  process.exit(1);
}
console.log(`✓ Card descriptions: ${total} cards, all within ${MAX_WORDS} words.`);
