#!/usr/bin/env node
/** Validate actual generated routes/fragments and static data-driven link literals. */
const fs = require('node:fs');
const path = require('node:path');

function walk(directory, suffixes) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file, suffixes) : suffixes.some(suffix => entry.name.endsWith(suffix)) ? [file] : [];
  });
}

function routeFor(file, buildDir) {
  const relative = path.relative(buildDir, file).split(path.sep).join('/');
  return '/' + relative.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
}

function extractHtml(document, parse) {
  const root = parse(document);
  const ids = new Set();
  const links = [];
  const unrenderedAdmonitions = [];
  let canonical;
  let base;
  function visit(node, literal = false) {
    const isLiteral = literal || ['pre', 'code', 'script', 'style'].includes(node.tagName);
    if (!isLiteral && node.nodeName === '#text' && /(?:^|\n)\s*:::(?:note|tip|info|warning|danger|caution|important|success|secondary)\b/.test(node.value)) {
      unrenderedAdmonitions.push(node.value.trim().split('\n')[0].slice(0, 160));
    }
    const attrs = Object.fromEntries((node.attrs || []).map(a => [a.name, a.value]));
    if (attrs.id) ids.add(attrs.id);
    if (node.tagName === 'a' && attrs.name) ids.add(attrs.name);
    if (node.tagName === 'base' && attrs.href) base = attrs.href;
    if (node.tagName === 'link' && attrs.rel === 'canonical') canonical = attrs.href;
    if (['a', 'area'].includes(node.tagName) && attrs.href) links.push(attrs.href);
    if (['img', 'script', 'iframe', 'source', 'audio', 'video'].includes(node.tagName) && attrs.src) links.push(attrs.src);
    if (node.tagName === 'video' && attrs.poster) links.push(attrs.poster);
    if (node.tagName === 'link' && /\b(?:stylesheet|icon|preload|modulepreload)\b/.test(attrs.rel || '') && attrs.href) links.push(attrs.href);
    for (const child of node.childNodes || []) visit(child, isLiteral);
  }
  visit(root);
  return {ids, links, canonical, base, unrenderedAdmonitions};
}

// Tables/decision trees can hide rows until a filter/tab is used. Check their
// literal destinations in addition to rendered <a> tags. No source is executed.
function extractDataLinks(source, filename) {
  const result = [];
  if (filename.endsWith('.json')) {
    const visit = value => {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) {
        if (['slug', 'href', 'to', 'url', 'link', 'articleSlug', 'assessment', 'treatment', 'route', 'destination'].includes(key) && typeof child === 'string' && child.startsWith('/docs/')) result.push(child);
        else visit(child);
      }
    };
    visit(JSON.parse(source));
  } else {
    // This also covers inline JavaScript data objects embedded in MDX, where a
    // TypeScript-only parser cannot safely interpret the surrounding Markdown.
    const pattern = /\b(?:slug|href|to|url|link|articleSlug|assessment|treatment|route|destination)\s*:\s*(['"`])(\/docs\/[^'"`\r\n]*?)\1(?!\s*\+)/g;
    for (const match of source.matchAll(pattern)) {
      if (!match[2].includes('${') && !match[2].includes('\\')) result.push(match[2]);
    }
  }
  return [...new Set(result)];
}

function decode(value) {
  try { return decodeURIComponent(value); } catch { return null; }
}

async function checkRenderedLinks({buildDir, sourceDirs = [], siteUrl = 'https://warwiki.org'} = {}) {
  if (!buildDir || !fs.existsSync(path.join(buildDir, 'index.html'))) throw new Error('A complete build/index.html is required. Run npm run build first.');
  const {parse} = await import('parse5');
  const pages = new Map();
  const htmlFiles = walk(buildDir, ['.html']);
  const site = new URL(siteUrl);
  const origins = new Set([site.origin]);
  if (!site.hostname.startsWith('www.')) origins.add(`${site.protocol}//www.${site.host}`);
  for (const file of htmlFiles) {
    const page = extractHtml(fs.readFileSync(file, 'utf8'), parse);
    page.file = file;
    page.route = routeFor(file, buildDir);
    pages.set(file, page);
  }
  const issues = [];
  let checkedLinks = 0;
  let dataLinks = 0;
  const seen = new Set();
  function check(href, from, base) {
    if (!href.trim() || href.startsWith('#:~:text=')) return;
    let url;
    try { url = new URL(href, base); } catch { issues.push({from, href, reason: 'invalid URL'}); return; }
    if (!['http:', 'https:'].includes(url.protocol) || !origins.has(url.origin)) return;
    const key = `${from}\0${url.href}`;
    if (seen.has(key)) return;
    seen.add(key);
    checkedLinks++;
    const pathname = decode(url.pathname);
    if (pathname === null || pathname.includes('\0') || pathname.includes('\\')) {
      issues.push({from, href, reason: 'invalid encoded path'}); return;
    }
    const relative = pathname.replace(/^\/+/, '');
    const candidates = [relative, relative + '.html', path.join(relative, 'index.html')];
    const file = candidates.map(p => path.resolve(buildDir, p)).find(p => p.startsWith(path.resolve(buildDir) + path.sep) && fs.existsSync(p) && fs.statSync(p).isFile());
    if (!file) { issues.push({from, href, reason: 'missing local destination'}); return; }
    const hash = decode(url.hash.slice(1).split(':~:text=')[0]);
    if (hash === null) { issues.push({from, href, reason: 'invalid encoded fragment'}); return; }
    if (!hash || hash.toLowerCase() === 'top' || !file.endsWith('.html')) return;
    if (!pages.get(file)?.ids.has(hash)) issues.push({from, href, reason: `missing section #${hash}`, target: path.relative(buildDir, file)});
  }
  for (const page of pages.values()) {
    for (const text of page.unrenderedAdmonitions) {
      issues.push({from: path.relative(buildDir, page.file), href: text, reason: 'unrendered admonition; use directive syntax such as :::warning[Title]'});
    }
    const pageUrl = new URL(page.route, site);
    const base = page.base ? new URL(page.base, pageUrl) : pageUrl;
    for (const href of page.links) check(href, path.relative(buildDir, page.file), base);
  }
  for (const directory of sourceDirs) for (const file of walk(directory, ['.ts', '.tsx', '.json', '.mdx'])) {
    if (/\.(?:test|spec)\.[tj]sx?$/.test(file) || /[\\/]test[\\/]/.test(file)) continue;
    for (const href of extractDataLinks(fs.readFileSync(file, 'utf8'), file)) {
      dataLinks++;
      check(href, `source:${path.relative(process.cwd(), file)}`, site);
    }
  }
  return {htmlPages: htmlFiles.length, checkedLinks, dataLinks, issues};
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const result = await checkRenderedLinks({buildDir: path.join(root, 'build'), sourceDirs: [path.join(root, 'docs'), path.join(root, 'src')]});
  if (process.argv.includes('--json')) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`Rendered link check: ${result.htmlPages} HTML pages, ${result.checkedLinks} local links/assets, ${result.dataLinks} data-link literals.`);
    for (const issue of result.issues) console.error(`  ${issue.from} → ${issue.href}: ${issue.reason}`);
    console.log(result.issues.length ? `${result.issues.length} rendered content/link issues.` : 'All local destinations, section anchors and admonition markup passed.');
  }
  if (result.issues.length) process.exitCode = 1;
}
if (require.main === module) main().catch(error => {console.error(error.message); process.exitCode = 1;});
module.exports = {checkRenderedLinks, extractDataLinks, extractHtml, routeFor};
