#!/usr/bin/env node
/** Advisory only: highlight substantial articles with sparse or unlinked references. */
const fs = require('node:fs');
const path = require('node:path');
const { citationUnits } = require('./audit-references');
const ROOT = path.resolve(__dirname, '..');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : /\.mdx?$/.test(file) ? [file] : [];
  });
}
function assessArticle(raw, file) {
  if (!/^docs\/0[1-5]-/.test(file)) return null;
  if (/\/(?:index|(?:.*-)?database)\.mdx?$/.test(file) || /\/_/.test(file) || file.includes('/07-roots/surgeons/')) return null;
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1] || '';
  if (/hide_title:\s*true/.test(frontmatter) || /\b(?:database|directory|library|index)\b/i.test(title)) return null;
  if (/\*Stub\s*—\s*to be built out|\*Coming soon\./i.test(raw)) return null;
  const body = raw.replace(/^---[\s\S]*?---\s*/, '');
  const prose = body.split(/^#{1,3}[^\n]*\bReferences\b[^\n]*$/m)[0];
  const words = (prose.match(/[\p{L}\p{N}][\p{L}\p{N}'-]*/gu) || []).length;
  const units = citationUnits(body).filter(unit => unit.bibliography);
  const refs = new Set(units.filter(unit => unit.anchor).map(unit => unit.anchor)).size;
  const unlinkedBibliographyEntries = units.filter(unit => !unit.anchor).length;
  // No upper word limit: long articles with unlinked bibliographies used to
  // disappear from this advisory despite having the largest review burden.
  if (words < 500 || refs > 5) return null;
  return { file, words, refs, unlinkedBibliographyEntries,
    reason: unlinkedBibliographyEntries && !refs ? 'unlinked bibliography' : 'few structured references' };
}
function report(root = ROOT) {
  const statusFile = path.join(root, 'docs/_STATUS.md');
  const status = fs.existsSync(statusFile) ? fs.readFileSync(statusFile, 'utf8') : '';
  const stubs = new Set([...status.matchAll(/`(docs\/[^`]+)`/g)].map(m => m[1]));
  return walk(path.join(root, 'docs')).flatMap(file => {
    const rel = path.relative(root, file);
    if (stubs.has(rel)) return [];
    const result = assessArticle(fs.readFileSync(file, 'utf8'), rel);
    return result ? [result] : [];
  }).sort((a, b) => a.refs - b.refs || b.words - a.words || a.file.localeCompare(b.file));
}
if (require.main === module) {
  const candidates = report();
  const args = process.argv.slice(2);
  const index = args.indexOf('--out');
  if (index !== -1) {
    const out = args[index + 1];
    if (!out || out.startsWith('--')) throw new Error('--out requires a path');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify({ advisory: true, candidates }, null, 2) + '\n');
  }
  console.log(candidates.length
    ? `ℹ Reference-density advisory: ${candidates.length} substantial articles need a structure/evidence review (not a clinical quality score).`
    : '✓ Reference-density advisory: no substantial low-reference articles found.');
  for (const item of candidates.slice(0, 25)) console.log(`  ${item.file} (${item.words} source words; ${item.refs} structured refs; ${item.unlinkedBibliographyEntries} unlinked entries; ${item.reason})`);
}
module.exports = { assessArticle, report };
