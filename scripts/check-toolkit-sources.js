#!/usr/bin/env node
/**
 * Clinical Toolkit source check.
 *
 * For every toolkit item in src/data/toolkit:
 * - each tagged page in `pages` exists;
 * - each sourced figure appears in the body and its numbers appear on the
 *   named WARWIKI page, at a valid heading or explicit anchor;
 * - every numeric figure in a counseling body is covered by a source.
 *
 * The registry is TypeScript, so this script reads it as text: it extracts
 * page paths, source blocks and bodies with regular expressions. Keep the
 * registry's object layout simple (one property per line) for this to work.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'src/data/toolkit');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

const anchorCache = new Map();
function anchorsFor(page) {
  if (anchorCache.has(page)) return anchorCache.get(page);
  const text = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const anchors = new Set();
  for (const m of text.matchAll(/^#{1,6}\s+(.+?)\s*(?:\{#([\w-]+)\})?\s*$/gm)) {
    anchors.add(m[2] || slugify(m[1]));
  }
  for (const m of text.matchAll(/\bid=["']([\w-]+)["']/g)) anchors.add(m[1]);
  anchorCache.set(page, anchors);
  return anchors;
}

function sectionFor(page, anchor) {
  const content = fs.readFileSync(path.join(ROOT, page), 'utf8');
  if (!anchor || /^ref\d+$/.test(anchor)) return content;
  const headings = [...content.matchAll(/^(#{1,6})\s+(.+?)\s*(?:\{#([\w-]+)\})?\s*$/gm)];
  const index = headings.findIndex(m => (m[3] || slugify(m[2])) === anchor);
  if (index < 0) return content;
  const depth = headings[index][1].length;
  const end = headings.slice(index + 1).find(m => m[1].length <= depth)?.index ?? content.length;
  return content.slice(headings[index].index, end);
}

const problems = [];
let checked = 0;
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.ts') && f !== 'types.ts');
const constants = {};

for (const file of files) {
  const text = fs.readFileSync(path.join(DIR, file), 'utf8');
  for (const m of text.matchAll(/const\s+(\w+)\s*=\s*\n?\s*'([^']+\.mdx?)'/g)) constants[m[1]] = m[2];
}

for (const file of files) {
  const text = fs.readFileSync(path.join(DIR, file), 'utf8');
  // Split into item blocks on "id:" properties.
  const blocks = text.split(/\n\s*\{\s*\n\s*id:\s*/).slice(1);
  for (const block of blocks) {
    const id = (block.match(/^['"]([\w-]+)['"]/) || [])[1] || '(unknown id)';
    const pagesMatch = block.match(/pages:\s*\[([^\]]*)\]/);
    const pages = pagesMatch
      ? [...pagesMatch[1].matchAll(/'([^']+)'|\b([A-Z_]+)\b/g)].map((m) => m[1] || constants[m[2]]).filter(Boolean)
      : [];
    for (const p of pages) {
      if (!fs.existsSync(path.join(ROOT, p))) problems.push(`${file} ${id}: tagged page missing: ${p}`);
    }
    const bodyMatch = block.match(/body:\s*`([\s\S]*?)`\s*,\s*\n/);
    const body = bodyMatch ? bodyMatch[1] : '';
    if (!body.startsWith('Template: a structure to complete, not a record. Replace every *** and choose one option in each [ ].') &&
        !(body.startsWith('${NOTICE}') && text.includes("const NOTICE = 'Template: a structure to complete, not a record. Replace every *** and choose one option in each [ ].';"))) {
      problems.push(`${file} ${id}: missing template notice`);
    }
    if (!/sources:\s*\[/.test(block)) problems.push(`${file} ${id}: missing sources array`);
    if (block.includes("kind: 'counseling'")) {
      const sourceFigures = [...block.matchAll(/\{\s*figure:\s*['"]([^'"]+)['"]/g)].map(m => m[1]).join(' ');
      const numbers = value => [...value.matchAll(/\d[\d,.]*/g)].map(m => m[0].replace(/[,.]$/, ''));
      for (const number of new Set(numbers(body))) {
        if (!numbers(sourceFigures).includes(number)) problems.push(`${file} ${id}: unsourced counseling number ${number}`);
      }
    }
    for (const s of block.matchAll(/\{\s*figure:\s*(['"`])([\s\S]*?)\1\s*,\s*page:\s*(?:(['"])([^'"]+)\3|([A-Z_]+))\s*(?:,\s*anchor:\s*(['"])([^'"]+)\6)?/g)) {
      checked += 1;
      const figure = s[2];
      const page = s[4] || constants[s[5]];
      const anchor = s[7];
      if (!anchor) problems.push(`${file} ${id}: source anchor missing for "${figure}"`);
      if (!fs.existsSync(path.join(ROOT, page))) {
        problems.push(`${file} ${id}: source page missing for "${figure}": ${page}`);
        continue;
      }
      if (anchor && !anchorsFor(page).has(anchor)) {
        problems.push(`${file} ${id}: anchor "#${anchor}" not found on ${page} (figure "${figure}")`);
      }
      if (body && !body.includes(figure)) {
        problems.push(`${file} ${id}: figure "${figure}" listed in sources but not found in the template body`);
      }
      const pageText = sectionFor(page, anchor);
      for (const number of new Set([...figure.matchAll(/\d[\d,.]*/g)].map(m => m[0].replace(/[,.]$/, '')))) {
        if (!pageText.includes(number)) problems.push(`${file} ${id}: source page lacks ${number} for "${figure}"`);
      }
    }
  }
}

if (problems.length) {
  console.error(`✗ Toolkit sources: ${problems.length} issue(s) in ${checked} sourced figures`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`✓ Toolkit sources: ${checked} sourced figures, pages and anchors valid.`);
