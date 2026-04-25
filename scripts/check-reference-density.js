#!/usr/bin/env node
/**
 * Advisory reference-density report.
 *
 * This intentionally exits 0. It is meant to keep thin, low-reference pages
 * visible without blocking small routing or hygiene patches.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const STATUS_FILE = path.join(DOCS_DIR, '_STATUS.md');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function loadStubs() {
  if (!fs.existsSync(STATUS_FILE)) return new Set();
  const status = fs.readFileSync(STATUS_FILE, 'utf8');
  return new Set([...status.matchAll(/`(docs\/[^`]+)`/g)].map((m) => m[1]));
}

function wordCount(text) {
  return (text.match(/[A-Za-z0-9][A-Za-z0-9'-]*/g) || []).length;
}

function main() {
  const stubs = loadStubs();
  const candidates = [];

  for (const file of walk(DOCS_DIR)) {
    const rel = path.relative(REPO_ROOT, file);
    if (rel === 'docs/_STATUS.md') continue;
    if (stubs.has(rel)) continue;
    if (/\/index\.mdx?$/.test(rel)) continue;
    if (/\/database\.mdx?$/.test(rel)) continue;
    if (rel.includes('/07-roots/surgeons/')) continue;

    const raw = fs.readFileSync(file, 'utf8');
    const body = raw.replace(/^---[\s\S]*?---\s*/m, '');
    const words = wordCount(body);
    const refs = (body.match(/<a id=["']ref\d+["']><\/a>/g) || []).length;

    if (words >= 500 && words <= 1500 && refs <= 5) {
      candidates.push({ rel, words, refs });
    }
  }

  candidates.sort((a, b) => a.refs - b.refs || a.words - b.words);

  if (candidates.length === 0) {
    console.log('✓ Reference-density advisory: no thin low-reference article pages found.');
    return;
  }

  console.log(`ℹ Reference-density advisory: ${candidates.length} filled-ish pages may need more evidence.`);
  for (const c of candidates.slice(0, 25)) {
    console.log(`  ${c.rel} (${c.words} words, ${c.refs} refs)`);
  }
}

main();
