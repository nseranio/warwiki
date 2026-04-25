#!/usr/bin/env node
/**
 * WARWIKI internal-link check
 *
 * Docusaurus catches markdown doc links, but raw JSX/HTML links such as
 * <a href="/docs/..."> can bypass that validation. This script builds the
 * route map from docs/ source files and verifies every /docs/ markdown link
 * and href attribute points to a known route.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function frontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    data[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function fileToUrl(file, content) {
  const fm = frontmatter(content);
  if (fm.slug) {
    let slug = fm.slug.startsWith('/') ? fm.slug : `/${fm.slug}`;
    if (slug !== '/' && slug.endsWith('/')) slug = slug.slice(0, -1);
    return `/docs${slug}`;
  }

  let rel = path.relative(DOCS_DIR, file).replace(/\.mdx?$/, '');
  const parts = rel.split(path.sep).map((part, index) => {
    if (index === 0) return part.replace(/^\d+-/, '');
    // Match Docusaurus' number-prefix behavior for pages like
    // 5-alpha-reductase-inhibitors.mdx -> alpha-reductase-inhibitors.
    return part.replace(/^\d+-/, '');
  });

  if (parts[parts.length - 1] === 'index') parts.pop();
  if (parts.length >= 2 && parts[parts.length - 1] === parts[parts.length - 2]) parts.pop();

  return `/docs/${parts.join('/')}`.replace(/\/$/, '');
}

function normalizeUrl(url) {
  let clean = url.trim().split('#')[0].split('?')[0];
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean;
}

function collectDocLinks(content) {
  const links = [];
  let m;

  const markdownLinkRe = /\]\((\/docs\/[^)#?\s]+)(?:[?#][^)]+)?\)/g;
  while ((m = markdownLinkRe.exec(content)) !== null) links.push(normalizeUrl(m[1]));

  const hrefRe = /href=["']([^"']+)["']/g;
  while ((m = hrefRe.exec(content)) !== null) {
    if (m[1].startsWith('/docs/')) links.push(normalizeUrl(m[1]));
  }

  return links;
}

function main() {
  const files = walk(DOCS_DIR);
  const routes = new Set();
  const source = new Map();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const url = fileToUrl(file, content);
    routes.add(url);
    source.set(file, content);
  }

  const problems = [];
  for (const file of files) {
    const rel = path.relative(REPO_ROOT, file);
    const links = collectDocLinks(source.get(file));
    for (const link of links) {
      if (!routes.has(link)) problems.push({ rel, link });
    }
  }

  if (problems.length === 0) {
    console.log(`✓ Internal link check: ${files.length} files, no broken /docs/ links.`);
    process.exit(0);
  }

  console.error(`✗ Internal link check: ${problems.length} broken /docs/ link(s):`);
  for (const p of problems) console.error(`  ${p.rel} -> ${p.link}`);
  process.exit(1);
}

main();
