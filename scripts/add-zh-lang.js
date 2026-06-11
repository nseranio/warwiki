#!/usr/bin/env node
/* One-off: add 'zh' to the languages array of the given handout slugs in
 * src/data/handouts.ts. Usage: node scripts/add-zh-lang.js slug1 slug2 ...
 * Idempotent: skips a slug that already lists 'zh'. */
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'data', 'handouts.ts');
let src = fs.readFileSync(file, 'utf8');
const slugs = process.argv.slice(2);
let changed = 0;
const missing = [];
for (const slug of slugs) {
  // find the entry block starting at slug: '<slug>'
  const re = new RegExp(`slug: '${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}'`);
  const m = re.exec(src);
  if (!m) { missing.push(slug); continue; }
  // search forward to the next "languages:" or the entry's closing "},"
  const start = m.index;
  const nextEntry = src.indexOf("\n  {", start + 1);
  const blockEnd = nextEntry === -1 ? src.length : nextEntry;
  const block = src.slice(start, blockEnd);
  const langRe = /languages: \[([^\]]*)\]/;
  const lm = langRe.exec(block);
  if (lm) {
    if (/'zh'/.test(lm[1])) continue; // already has zh
    const newLangs = `languages: [${lm[1].trim()}, 'zh']`;
    const newBlock = block.replace(langRe, newLangs);
    src = src.slice(0, start) + newBlock + src.slice(blockEnd);
    changed++;
  } else {
    // no languages array: insert one after the slug line
    const lineEnd = src.indexOf('\n', start);
    src = src.slice(0, lineEnd + 1) + `    languages: ['zh'],\n` + src.slice(lineEnd + 1);
    changed++;
  }
}
fs.writeFileSync(file, src);
console.log(`updated ${changed} entries`);
if (missing.length) console.log('MISSING slugs:', missing.join(', '));
