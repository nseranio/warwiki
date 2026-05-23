#!/usr/bin/env node
/**
 * check-freshness.js
 *
 * Advisory lint that scans every MDX page in `docs/` for a `lastReviewed:`
 * frontmatter date and reports pages that haven't been reviewed within the
 * configured window.
 *
 * Thresholds (default):
 *   - WARN  (yellow)   > 18 months since lastReviewed
 *   - STALE (red)      > 30 months since lastReviewed
 *   - MISSING          no lastReviewed field at all
 *
 * The script is intentionally non-blocking: it exits 0 even when stale
 * pages exist. CI runs it after the main lint suite as an advisory.
 *
 * Usage:
 *   node scripts/check-freshness.js
 *   node scripts/check-freshness.js --warn-months 12 --stale-months 24
 *   node scripts/check-freshness.js --json   # machine-readable output
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');

const argv = process.argv.slice(2);
function flag(name, fallback) {
  const i = argv.indexOf('--' + name);
  if (i === -1) return fallback;
  return argv[i + 1];
}
const WARN_MONTHS = Number(flag('warn-months', 18));
const STALE_MONTHS = Number(flag('stale-months', 30));
const AS_JSON = argv.includes('--json');

function* walkMdx(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMdx(p);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      yield p;
    }
  }
}

function parseFrontmatter(src) {
  if (!src.startsWith('---')) return {};
  const end = src.indexOf('\n---', 3);
  if (end === -1) return {};
  const block = src.slice(3, end);
  const out = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return out;
}

function monthsSince(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

const results = { stale: [], warn: [], missing: [], fresh: 0, totalReviewed: 0 };

for (const file of walkMdx(DOCS)) {
  // Skip section index/landing pages — freshness is a per-article concern.
  if (path.basename(file) === 'index.mdx') continue;
  const src = fs.readFileSync(file, 'utf8');
  const fm = parseFrontmatter(src);
  const rel = path.relative(ROOT, file);

  if (!fm.lastReviewed) {
    results.missing.push({ file: rel, lastReviewed: null });
    continue;
  }

  const months = monthsSince(fm.lastReviewed);
  results.totalReviewed += 1;
  if (months == null) {
    results.warn.push({ file: rel, lastReviewed: fm.lastReviewed, months: null, reason: 'unparseable' });
    continue;
  }
  if (months >= STALE_MONTHS) {
    results.stale.push({ file: rel, lastReviewed: fm.lastReviewed, months });
  } else if (months >= WARN_MONTHS) {
    results.warn.push({ file: rel, lastReviewed: fm.lastReviewed, months });
  } else {
    results.fresh += 1;
  }
}

if (AS_JSON) {
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

const total = results.stale.length + results.warn.length + results.fresh + results.missing.length;
console.log(`ℹ Freshness advisory: ${total} articles scanned.`);
console.log(`  ${results.fresh} fresh / ${results.warn.length} warn (>${WARN_MONTHS} mo) / ${results.stale.length} stale (>${STALE_MONTHS} mo) / ${results.missing.length} unreviewed.`);

if (results.stale.length > 0) {
  console.log(`\n  Most stale (review urgently):`);
  results.stale
    .sort((a, b) => b.months - a.months)
    .slice(0, 15)
    .forEach(r => console.log(`    ${r.months} mo  ${r.file}  (last: ${r.lastReviewed})`));
}

if (results.warn.length > 0) {
  console.log(`\n  Stale soon (>${WARN_MONTHS} mo):`);
  results.warn
    .sort((a, b) => (b.months ?? 0) - (a.months ?? 0))
    .slice(0, 15)
    .forEach(r => console.log(`    ${r.months} mo  ${r.file}  (last: ${r.lastReviewed})`));
}

if (results.missing.length > 0) {
  console.log(`\n  ${results.missing.length} articles have no lastReviewed frontmatter.`);
  console.log(`  Add \`lastReviewed: YYYY-MM-DD\` to article frontmatter to enable tracking.`);
}

// Advisory, never fails CI.
process.exit(0);
