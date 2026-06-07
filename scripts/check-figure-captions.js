#!/usr/bin/env node
/**
 * WARWIKI figure-caption check
 *
 * A markdown image embed must be its OWN paragraph: there must be a blank line
 * between the `![alt](/img/...)` line and the italic caption (or any following
 * text). Without it, CommonMark keeps the image and caption in the same <p>;
 * the <img> is inline, so on wide content columns the caption flows BESIDE the
 * image instead of below it — appearing cut off / bleeding into the figure.
 *
 * This guards the house embed pattern:
 *     ![alt](/img/diagrams/x.svg)
 *     <blank line>
 *     *Caption … (Original WARWIKI schematic)*
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

// Standalone image embed pointing at a static /img/ asset (one per line).
const IMG_LINE = /^!\[.*\]\(\/img\/[^)]+\)\s*$/;

const offenders = [];
let embedCount = 0;

for (const file of walk(DOCS_DIR)) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!IMG_LINE.test(lines[i])) continue;
    embedCount++;
    const next = i + 1 < lines.length ? lines[i + 1] : '';
    if (next.trim() !== '') {
      offenders.push({
        file: path.relative(REPO_ROOT, file),
        line: i + 1,
        next: next.trim().slice(0, 60),
      });
    }
  }
}

if (offenders.length) {
  console.error(`✗ Figure-caption check: ${offenders.length} image embed(s) not followed by a blank line:`);
  for (const o of offenders) {
    console.error(`  ${o.file}:${o.line} → next line: "${o.next}…"`);
  }
  console.error('\n  Insert a blank line between the image and its caption so the image is its own paragraph.');
  process.exit(1);
}

console.log(`✓ Figure-caption check: ${embedCount} /img/ embeds, all separated from their captions by a blank line.`);
