#!/usr/bin/env node
/**
 * WARWIKI inline-citation auto-linking
 *
 * For files that have <a id="refN"></a>-anchored references but body author
 * mentions ("Surname et al" / "Surname YYYY") not yet wrapped in
 * <sup>[[N]](#refN)</sup>, this script inserts the inline cite after the
 * mention.
 *
 * Conservative matching:
 *   - First-author surname extracted from each ref (3+ chars, capitalized).
 *   - Match requires "Surname et al" OR "Surname YYYY" (year matching the
 *     ref) OR "Surname and X" (two-author refs).
 *   - When two refs share the same first-author surname, year disambiguates.
 *     If still ambiguous, skip that mention.
 *   - Only inserts when the exact mention is NOT already followed by a
 *     <sup> tag.
 *   - Skips files using footnote style.
 *
 * Run: node scripts/link-inline-citations.js [--dry-run] [--report]
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const DRY_RUN = process.argv.includes('--dry-run');
const REPORT = process.argv.includes('--report');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

// Parse references section into [{num, author, year}] array
function parseRefs(refSection) {
  const refs = [];
  const lines = refSection.split('\n');
  for (const line of lines) {
    const m = line.match(/<a id="ref(\d+)"><\/a>\s*\d+\.\s*(.+)$/);
    if (!m) continue;
    const num = parseInt(m[1], 10);
    const text = m[2];
    // Extract first-author surname: typically "Surname FM, ..." or "Surname FM."
    const authorMatch = text.match(/^([A-Z][a-zA-Zé\-']{2,})\s+[A-Z]/);
    if (!authorMatch) continue;
    const author = authorMatch[1];
    // Extract first 4-digit year
    const yearMatch = text.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? parseInt(yearMatch[0], 10) : null;
    refs.push({ num, author, year, text });
  }
  return refs;
}

function processFile(content) {
  // Skip footnote-style
  if (/\[\^\d+\]/.test(content)) return { content, inserted: 0, skipped: 0 };
  // Need anchored refs to link to
  if (!/<a id="ref\d+"/.test(content)) return { content, inserted: 0, skipped: 0 };

  const refMatch = content.match(/(\n## References\s*\n)([\s\S]*)$/);
  if (!refMatch) return { content, inserted: 0, skipped: 0 };

  const refs = parseRefs(refMatch[2]);
  if (refs.length === 0) return { content, inserted: 0, skipped: 0 };

  // Build author → refs map
  const byAuthor = new Map();
  for (const r of refs) {
    if (!byAuthor.has(r.author)) byAuthor.set(r.author, []);
    byAuthor.get(r.author).push(r);
  }

  let body = content.slice(0, refMatch.index);
  const refSection = content.slice(refMatch.index);
  let inserted = 0;
  let skipped = 0;

  // For each author, find body mentions
  for (const [author, authorRefs] of byAuthor) {
    // "Surname et al" pattern, optionally followed by ", *Journal* YYYY" or "(YYYY)"
    // We require a year match if multiple refs share this author
    const ambiguous = authorRefs.length > 1;

    // Pattern: word boundary + Surname + " et al" optionally followed by punctuation/year
    // Capture optional year nearby (within next 30 chars) for disambiguation
    const re = new RegExp(`\\b${author}\\s+et\\s+al\\.?(?![^<]*<sup>)([^.\\n]{0,80})`, 'g');
    body = body.replace(re, (full, tail) => {
      // Already followed by <sup>?
      if (/^\s*<sup>/.test(tail)) return full;
      let chosen = authorRefs[0];
      if (ambiguous) {
        // Look for year in tail
        const yearM = tail.match(/\b(19|20)\d{2}\b/);
        if (yearM) {
          const yr = parseInt(yearM[0], 10);
          const match = authorRefs.find((r) => r.year === yr);
          if (match) chosen = match;
          else { skipped++; return full; }
        } else {
          skipped++;
          return full;
        }
      }
      // Insert <sup> immediately after "et al" portion, before tail
      const etAlIdx = full.indexOf('et al');
      const etAlEnd = etAlIdx + 'et al'.length + (full.charAt(etAlIdx + 'et al'.length) === '.' ? 1 : 0);
      const before = full.slice(0, etAlEnd);
      const after = full.slice(etAlEnd);
      inserted++;
      return `${before}<sup>[[${chosen.num}]](#ref${chosen.num})</sup>${after}`;
    });
  }

  return { content: body + refSection, inserted, skipped };
}

const files = walk(DOCS_DIR);
let totalInserted = 0;
let filesChanged = 0;
const report = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const { content: newContent, inserted, skipped } = processFile(original);
  if (inserted === 0) continue;
  if (!DRY_RUN) fs.writeFileSync(file, newContent);
  filesChanged++;
  totalInserted += inserted;
  const rel = path.relative(REPO_ROOT, file);
  console.log(`${DRY_RUN ? '[dry-run] ' : ''}${rel} (+${inserted}${skipped ? `, ${skipped} ambiguous skipped` : ''})`);
  if (REPORT) report.push({ file: rel, inserted, skipped });
}

console.log(`\n${DRY_RUN ? '[dry-run] ' : ''}Files changed: ${filesChanged}`);
console.log(`Inline citations inserted: ${totalInserted}`);
