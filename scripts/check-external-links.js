#!/usr/bin/env node
/**
 * check-external-links.js
 *
 * Samples external URLs (http/https) referenced from MDX in `docs/` and
 * HEADs them to detect link rot. Designed to be run by a nightly CI cron;
 * exits non-zero only when at least one sampled link returns a 4xx/5xx
 * (so the workflow can open an issue).
 *
 * Usage:
 *   node scripts/check-external-links.js                    # default sample 100
 *   node scripts/check-external-links.js --sample 500       # larger sweep
 *   node scripts/check-external-links.js --all              # check everything
 *   node scripts/check-external-links.js --json             # machine-readable
 *   node scripts/check-external-links.js --domain doi.org   # filter
 *
 * Notes:
 *   - DOI links (doi.org) get a GET (HEAD frequently returns 405) with a
 *     short timeout, no body read.
 *   - 429 (rate-limit) and 403 (likely bot block) are reported as
 *     "soft-fail" and do not count as broken.
 *   - Sampled deterministically per day for reproducibility unless --seed
 *     is provided.
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
const SAMPLE = argv.includes('--all') ? Infinity : Number(flag('sample', 100));
const AS_JSON = argv.includes('--json');
const DOMAIN_FILTER = flag('domain', null);
const SEED = flag('seed', new Date().toISOString().slice(0, 10));
const CONCURRENCY = Number(flag('concurrency', 10));
const TIMEOUT_MS = Number(flag('timeout', 8000));

const URL_RE = /https?:\/\/[^\s)"'<>\]`]+/g;

function* walkMdx(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMdx(p);
    else if (entry.isFile() && entry.name.endsWith('.mdx')) yield p;
  }
}

const linkMap = new Map();
for (const file of walkMdx(DOCS)) {
  const src = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file);
  const matches = src.match(URL_RE) || [];
  for (const raw of matches) {
    // Strip trailing punctuation commonly seen at sentence ends.
    const url = raw.replace(/[.,;:!?]+$/, '');
    if (DOMAIN_FILTER && !url.includes(DOMAIN_FILTER)) continue;
    if (!linkMap.has(url)) linkMap.set(url, rel);
  }
}

const allLinks = Array.from(linkMap.entries());
const total = allLinks.length;

// Deterministic shuffle seeded by SEED so the sample is reproducible
// within a day but rotates across days.
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
allLinks.sort((a, b) => hashStr(SEED + a[0]) - hashStr(SEED + b[0]));

const sample = allLinks.slice(0, Math.min(SAMPLE, allLinks.length));

async function check([url, file]) {
  const isDoi = url.includes('doi.org/') || url.includes('doi:');
  const method = isDoi ? 'GET' : 'HEAD';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'warwiki-linkcheck/1.0 (+https://warwiki.io)' },
    });
    clearTimeout(timer);
    return { url, file, status: res.status, ok: res.ok, soft: res.status === 429 || res.status === 403 };
  } catch (err) {
    clearTimeout(timer);
    return { url, file, status: 0, ok: false, soft: false, error: err.name === 'AbortError' ? 'timeout' : err.message };
  }
}

async function runPool(items, fn, concurrency) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

(async () => {
  if (!AS_JSON) {
    console.log(`External-link check: ${total} unique external URLs, sampling ${sample.length} (seed=${SEED}).`);
  }
  const results = await runPool(sample, check, CONCURRENCY);
  const broken = results.filter(r => !r.ok && !r.soft);
  const soft = results.filter(r => r.soft);

  const report = {
    seed: SEED,
    total,
    sampled: sample.length,
    okCount: results.filter(r => r.ok).length,
    softCount: soft.length,
    broken,
    soft,
  };

  if (AS_JSON) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`  ✓ ${report.okCount} ok / ⚠ ${soft.length} soft (429/403) / ✗ ${broken.length} broken`);
    if (broken.length) {
      console.log(`\n  Broken:`);
      broken.slice(0, 25).forEach(b => console.log(`    [${b.status || b.error}] ${b.url}\n      from ${b.file}`));
      if (broken.length > 25) console.log(`    ...and ${broken.length - 25} more`);
    }
  }

  process.exit(broken.length > 0 ? 1 : 0);
})();
