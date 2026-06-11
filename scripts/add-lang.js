#!/usr/bin/env node
/* Add a language code to the languages array of the given handout slugs in
 * src/data/handouts.ts.
 *   Usage: node scripts/add-lang.js <code> <slug1> <slug2> ...
 * Idempotent: skips a slug that already lists the code. Generalizes the
 * earlier add-zh-lang.js so each new language just passes a different code. */
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'data', 'handouts.ts');
let src = fs.readFileSync(file, 'utf8');
const [code, ...slugs] = process.argv.slice(2);
if (!code || !slugs.length) {
  console.error('usage: node scripts/add-lang.js <code> <slug...>');
  process.exit(1);
}
let changed = 0;
const missing = [];
for (const slug of slugs) {
  const re = new RegExp(`slug: '${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}'`);
  const m = re.exec(src);
  if (!m) { missing.push(slug); continue; }
  const start = m.index;
  const nextEntry = src.indexOf('\n  {', start + 1);
  const blockEnd = nextEntry === -1 ? src.length : nextEntry;
  const block = src.slice(start, blockEnd);
  const langRe = /languages: \[([^\]]*)\]/;
  const lm = langRe.exec(block);
  if (lm) {
    if (new RegExp(`'${code}'`).test(lm[1])) continue;
    const newBlock = block.replace(langRe, `languages: [${lm[1].trim()}, '${code}']`);
    src = src.slice(0, start) + newBlock + src.slice(blockEnd);
    changed++;
  } else {
    const lineEnd = src.indexOf('\n', start);
    src = src.slice(0, lineEnd + 1) + `    languages: ['${code}'],\n` + src.slice(lineEnd + 1);
    changed++;
  }
}
fs.writeFileSync(file, src);
console.log(`updated ${changed} entries for '${code}'`);
if (missing.length) console.log('MISSING slugs:', missing.join(', '));
