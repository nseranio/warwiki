#!/usr/bin/env node
/**
 * WARWIKI orphan-page check
 *
 * Docusaurus auto-generates a sidebar from the docs/ tree, so any page in a
 * visible category is reachable via the sidebar. The real orphan risk is in
 * hidden categories (className: "sidebar-hidden-category" — used for
 * flaps/, grafts/, surgeons/, procedures/) where pages are only reachable
 * through links from other articles.
 *
 * This check walks all hidden-category pages and verifies each has at least
 * one inbound link from elsewhere in docs/.
 *
 * Exit 0 = clean. Exit 1 = one or more orphans.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');

// Paths whose pages are linked DYNAMICALLY by React components (from
// src/data/*.ts data sources) rather than via static Markdown links. Orphan
// check skips these — the component is the source of truth for reachability.
const DYNAMIC_LINK_PREFIXES = [
  // Surgeon profiles — rendered by SurgeonDirectory/SurgeonTree from src/data/surgeons.ts
  'docs/07-roots/surgeons/',
  // Incontinence procedure pages — rendered by GenericDatabase from female/male/oab database pages
  'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/',
  // Prolapse repair technique pages — rendered by GenericDatabase from the prolapse landing
  'docs/04-surgical-techniques/04g-prolapse-repair/anterior/',
  'docs/04-surgical-techniques/04g-prolapse-repair/apical/',
  'docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/',
  'docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/',
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function findHiddenCategoryDirs(dir, hidden = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    const categoryJson = path.join(full, '_category_.json');
    if (fs.existsSync(categoryJson)) {
      try {
        const cfg = JSON.parse(fs.readFileSync(categoryJson, 'utf8'));
        if (cfg.className && String(cfg.className).includes('sidebar-hidden-category')) {
          hidden.push(full);
        }
      } catch (_) { /* ignore bad JSON */ }
    }
    findHiddenCategoryDirs(full, hidden);
  }
  return hidden;
}

// Normalize a doc file path to its served URL.
//   docs/01-foundations/surgical-principles/sutures.mdx → /docs/foundations/surgical-principles/sutures
//   docs/01-foundations/anatomy-physiology/oral-cavity/oral-cavity.mdx → /docs/foundations/anatomy-physiology/oral-cavity
//   docs/07-roots/index.mdx → /docs/roots
function fileToUrl(file) {
  let rel = path.relative(DOCS_DIR, file).replace(/\.mdx?$/, '');
  const parts = rel.split(path.sep).map((p, i) => (i === 0 ? p.replace(/^\d+-/, '') : p));
  // filename === parent dirname → collapse (Docusaurus quirk)
  if (parts.length >= 2 && parts[parts.length - 1] === parts[parts.length - 2]) parts.pop();
  // index → parent
  if (parts[parts.length - 1] === 'index') parts.pop();
  return '/docs/' + parts.join('/');
}

function collectLinks(content) {
  const urls = new Set();
  // Markdown links: ](...)
  const re = /\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    let t = m[1].trim().split('#')[0].split('?')[0];
    if (!t.startsWith('/docs/')) continue;
    if (t.length > 1 && t.endsWith('/')) t = t.slice(0, -1);
    urls.add(t);
  }
  // JSX href attributes: href="..."
  const hre = /href=["']([^"']+)["']/g;
  while ((m = hre.exec(content)) !== null) {
    let t = m[1].trim().split('#')[0].split('?')[0];
    if (!t.startsWith('/docs/')) continue;
    if (t.length > 1 && t.endsWith('/')) t = t.slice(0, -1);
    urls.add(t);
  }
  return urls;
}

function main() {
  const allFiles = walk(DOCS_DIR);
  const hiddenDirs = findHiddenCategoryDirs(DOCS_DIR);
  const hiddenFiles = allFiles.filter((f) =>
    hiddenDirs.some((hd) => f.startsWith(hd + path.sep))
  );

  // Build set of every URL linked anywhere in docs/
  const linkedUrls = new Set();
  for (const f of allFiles) {
    const content = fs.readFileSync(f, 'utf8');
    for (const url of collectLinks(content)) linkedUrls.add(url);
  }

  const orphans = [];
  for (const f of hiddenFiles) {
    // Index pages in hidden dirs are the category landings — their parent article
    // typically links to the sub-pages, not the index. Skip them.
    if (path.basename(f).match(/^index\.mdx?$/)) continue;
    const rel = path.relative(REPO_ROOT, f);
    // Skip pages linked by React components (see DYNAMIC_LINK_PREFIXES).
    if (DYNAMIC_LINK_PREFIXES.some((p) => rel.startsWith(p))) continue;
    const url = fileToUrl(f);
    if (!linkedUrls.has(url)) {
      orphans.push({ file: rel, url });
    }
  }

  if (orphans.length === 0) {
    console.log(`✓ Orphan check: ${hiddenFiles.length} hidden-category pages, all linked.`);
    process.exit(0);
  }

  console.error(`✗ Orphan check: ${orphans.length} hidden-category page(s) with no inbound links:`);
  for (const o of orphans) {
    console.error(`  ${o.file}`);
    console.error(`    URL: ${o.url}`);
  }
  console.error('');
  console.error('Hidden-category pages must be linked from at least one visible article.');
  process.exit(1);
}

main();
