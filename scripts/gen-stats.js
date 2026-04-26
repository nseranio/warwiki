#!/usr/bin/env node
/**
 * WARWIKI homepage stats generator.
 *
 * Walks docs/ and computes:
 *   - articles: count of substantive MDX/MD pages (excludes _STATUS, _category_,
 *     index/landing pages with hide_title:true, and stubs explicitly marked
 *     "*Stub — to be built out.*" or "*Coming soon.*")
 *   - references: total count of unique reference anchors across all pages
 *     (counts <a id="refN"> footnote anchors AND GAS-style [^N]: footnote
 *     definitions; each anchor counted once per page)
 *
 * Writes the result as JSON to src/data/stats.json. The homepage imports this
 * file at build time. Run automatically before `npm run build` via the
 * prebuild script in package.json, or manually via `npm run stats`.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const OUT_FILE = path.join(REPO_ROOT, 'src/data/stats.json');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function isStub(content) {
  return /\*Stub\s*—\s*to be built out\.\*|\*Coming soon\.\*/i.test(content);
}

function isLandingOnly(content) {
  // Pages with hide_title:true are landings/section indexes — count them as
  // articles only if they have substantive prose beyond the section-stack list.
  // Heuristic: hide_title pages with < 1200 chars are pure landings.
  if (!/hide_title:\s*true/i.test(content)) return false;
  return content.length < 1200;
}

function countRefAnchors(content) {
  let total = 0;
  // <a id="refN"> style — used in most clinical articles
  const anchorMatches = content.match(/<a\s+id\s*=\s*["']ref\d+["']/gi);
  if (anchorMatches) total += anchorMatches.length;
  // GAS-style footnote definitions [^N]: ...
  const footnoteMatches = content.match(/^\[\^[\w-]+\]:\s/gm);
  if (footnoteMatches) total += footnoteMatches.length;
  return total;
}

function isExcluded(filename) {
  const base = path.basename(filename);
  return base === '_STATUS.md' || base.startsWith('_');
}

function main() {
  const files = walk(DOCS_DIR).filter((f) => !isExcluded(f));

  let articles = 0;
  let references = 0;

  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    if (isStub(content)) continue;
    if (isLandingOnly(content)) continue;
    articles += 1;
    references += countRefAnchors(content);
  }

  // Round references down to nearest 100 for a cleaner display number;
  // we'll display with a "+" so the headline understates and stays honest.
  const referencesRounded = Math.floor(references / 100) * 100;

  const stats = {
    articles,
    references,
    referencesRounded,
    generatedAt: new Date().toISOString(),
  };

  // Ensure target dir exists
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(stats, null, 2) + '\n');

  console.log(`✓ Stats generated: ${articles} articles, ${references} references → src/data/stats.json`);
}

main();
