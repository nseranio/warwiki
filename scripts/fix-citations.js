#!/usr/bin/env node
/**
 * WARWIKI citation auto-fix
 *
 * For each flagged file:
 *   - Finds all cited refs (<sup>[[N]](#refN)</sup>) and all anchors (<a id="refN">).
 *   - Renumbers cited+anchored refs to a contiguous 1..K sequence (preserving
 *     their existing relative order).
 *   - Removes anchor lines for refs that are anchored but never cited (orphan
 *     references).
 *   - Detects refs that are cited but have no anchor (orphan citations) and
 *     SKIPS the file with a warning — those can't be fixed automatically
 *     (they'd need a real source added or the citation removed).
 *
 * Footnote style [^N] / [^N]: handled the same way.
 *
 * Run: node scripts/fix-citations.js [--dry-run]
 *
 * The body of the article is not otherwise touched.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const DRY_RUN = process.argv.includes('--dry-run');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function analyze(content) {
  const cited = new Set();
  const anchors = new Set();
  const citeRe = /\[\[(\d+)\]\]\(#ref\d+\)/g;
  const anchorRe = /<a\s+id=["']ref(\d+)["']\s*><\/a>/g;
  let m;
  while ((m = citeRe.exec(content)) !== null) cited.add(parseInt(m[1], 10));
  while ((m = anchorRe.exec(content)) !== null) anchors.add(parseInt(m[1], 10));
  return { cited, anchors };
}

function analyzeFootnotes(content) {
  const cited = new Set();
  const defined = new Set();
  const citeRe = /\[\^(\d+)\](?!:)/g;
  const defRe = /^\[\^(\d+)\]:/gm;
  let m;
  while ((m = citeRe.exec(content)) !== null) cited.add(parseInt(m[1], 10));
  while ((m = defRe.exec(content)) !== null) defined.add(parseInt(m[1], 10));
  return { cited, defined };
}

function fixSuperscriptStyle(content, rel) {
  const { cited, anchors } = analyze(content);
  if (cited.size === 0 && anchors.size === 0) return { content, changed: false, warnings: [] };

  const warnings = [];
  const orphanCitations = [...cited].filter((n) => !anchors.has(n));
  if (orphanCitations.length > 0) {
    warnings.push(`SKIP ${rel}: cited refs without anchors: ${orphanCitations.join(', ')}`);
    return { content, changed: false, warnings };
  }

  // Keep: refs that are both cited and anchored. Renumber preserving numeric order.
  const keep = [...cited].filter((n) => anchors.has(n)).sort((a, b) => a - b);
  const orphanAnchors = [...anchors].filter((n) => !cited.has(n));

  // If no renumbering needed AND no orphans, this file is already clean.
  const alreadyContiguous = keep.every((n, i) => n === i + 1);
  if (alreadyContiguous && orphanAnchors.length === 0) {
    return { content, changed: false, warnings };
  }

  const remap = new Map();
  keep.forEach((oldN, i) => remap.set(oldN, i + 1));

  let out = content;

  // 1) Rewrite superscript citations: [[old]](#refold) → [[new]](#refnew)
  out = out.replace(/\[\[(\d+)\]\]\(#ref(\d+)\)/g, (whole, a, b) => {
    const n = parseInt(a, 10);
    if (parseInt(b, 10) !== n) return whole; // malformed — leave alone
    const nw = remap.get(n);
    if (!nw) return whole;
    return `[[${nw}]](#ref${nw})`;
  });

  // 2) Remove orphan anchor lines entirely. They look like:
  //    <a id="refN"></a>N. Author. "Title." ...
  // We delete the whole line AND its trailing blank line if any.
  for (const n of orphanAnchors) {
    const lineRe = new RegExp(
      `^<a\\s+id=["']ref${n}["']\\s*></a>[^\\n]*\\n?(?:\\s*\\n)?`,
      'm'
    );
    out = out.replace(lineRe, '');
  }

  // 3) Rewrite kept anchor lines: renumber id AND the visible leading number.
  //    First pass — change "<a id=\"refOLD\"></a>OLD. " → placeholder token to avoid
  //    re-matching when NEW collides with another OLD value.
  const tokens = [];
  for (const [oldN, newN] of remap) {
    const anchorLineRe = new RegExp(
      `(^<a\\s+id=["'])ref${oldN}(["']\\s*></a>)${oldN}\\.\\s`,
      'm'
    );
    const token = `\u0000ANCHOR${oldN}\u0000`;
    out = out.replace(anchorLineRe, (whole, pre, post) => {
      tokens.push({ token, pre, post, newN });
      return `${token}`;
    });
  }
  for (const t of tokens) {
    out = out.replace(t.token, `${t.pre}ref${t.newN}${t.post}${t.newN}. `);
  }

  return { content: out, changed: out !== content, warnings };
}

function fixFootnoteStyle(content, rel) {
  const { cited, defined } = analyzeFootnotes(content);
  if (cited.size === 0 && defined.size === 0) return { content, changed: false, warnings: [] };

  const warnings = [];
  const orphanCitations = [...cited].filter((n) => !defined.has(n));
  if (orphanCitations.length > 0) {
    warnings.push(`SKIP footnotes in ${rel}: cited without definition: ${orphanCitations.join(', ')}`);
    return { content, changed: false, warnings };
  }

  const keep = [...cited].filter((n) => defined.has(n)).sort((a, b) => a - b);
  const orphanDefs = [...defined].filter((n) => !cited.has(n));

  const alreadyContiguous = keep.every((n, i) => n === i + 1);
  if (alreadyContiguous && orphanDefs.length === 0) return { content, changed: false, warnings };

  const remap = new Map();
  keep.forEach((oldN, i) => remap.set(oldN, i + 1));

  let out = content;

  // Remove orphan definition lines: [^N]: ...
  for (const n of orphanDefs) {
    const lineRe = new RegExp(`^\\[\\^${n}\\]:[^\\n]*\\n?`, 'm');
    out = out.replace(lineRe, '');
  }

  // Renumber via tokens to avoid collisions.
  const tokens = [];
  for (const [oldN, newN] of remap) {
    const token = `\u0000FN${oldN}\u0000`;
    // Citations
    out = out.replace(new RegExp(`\\[\\^${oldN}\\](?!:)`, 'g'), token + 'C');
    // Definitions
    out = out.replace(new RegExp(`^\\[\\^${oldN}\\]:`, 'm'), token + 'D');
    tokens.push({ oldN, newN });
  }
  for (const t of tokens) {
    out = out.replace(new RegExp(`\u0000FN${t.oldN}\u0000C`, 'g'), `[^${t.newN}]`);
    out = out.replace(new RegExp(`\u0000FN${t.oldN}\u0000D`, 'g'), `[^${t.newN}]:`);
  }

  return { content: out, changed: out !== content, warnings };
}

function main() {
  const files = walk(DOCS_DIR);
  const allWarnings = [];
  let filesChanged = 0;
  let filesSkipped = 0;

  for (const file of files) {
    const rel = path.relative(REPO_ROOT, file);
    let content = fs.readFileSync(file, 'utf8');

    const sup = fixSuperscriptStyle(content, rel);
    allWarnings.push(...sup.warnings);
    if (sup.changed) content = sup.content;

    const fn = fixFootnoteStyle(content, rel);
    allWarnings.push(...fn.warnings);
    if (fn.changed) content = fn.content;

    if (sup.warnings.length > 0 || fn.warnings.length > 0) filesSkipped++;
    if (!sup.changed && !fn.changed) continue;
    if (!DRY_RUN) fs.writeFileSync(file, content);
    filesChanged++;
    console.log(`${DRY_RUN ? '[dry-run] ' : ''}Fixed ${rel}`);
  }

  console.log('');
  console.log(`${DRY_RUN ? '[dry-run] ' : ''}Files rewritten: ${filesChanged}`);
  console.log(`Files skipped (orphan citations): ${filesSkipped}`);
  if (allWarnings.length > 0) {
    console.log('');
    console.log('Warnings:');
    for (const w of allWarnings) console.log(`  ${w}`);
  }
}

main();
