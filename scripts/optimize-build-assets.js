#!/usr/bin/env node
/**
 * Handout assets in the build output. English handouts publish by default;
 * WARWIKI_INCLUDE_HANDOUTS=false removes all generated copies. Translated PDFs
 * and previews are removed unless WARWIKI_INCLUDE_HANDOUT_TRANSLATIONS=true
 * (they predate the current English text). Sources in static/ are preserved;
 * committed assets are already optimized, so nothing is re-encoded.
 */
const fs = require('node:fs/promises');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'build/img/handouts');

// Markdown images are bundled into build/assets/images under hashed names, so
// the plain copies Docusaurus also makes from static/ go unused. Remove a copy
// only when no built file references its /img/... path.
const MARKDOWN_IMAGE_DIRS = ['img/figures', 'img/anatomy', 'img/wound-healing'];

async function builtText() {
  const chunks = [];
  const walk = async dir => {
    for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(html|js|css|xml|json|txt)$/.test(entry.name)) chunks.push(await fs.readFile(full, 'utf8'));
    }
  };
  await walk(path.join(ROOT, 'build'));
  return chunks.join('\n');
}

async function removeUnreferencedImageCopies() {
  const text = await builtText();
  let removed = 0; let bytes = 0;
  for (const rel of MARKDOWN_IMAGE_DIRS) {
    const dir = path.join(ROOT, 'build', rel);
    let names = [];
    try { names = await fs.readdir(dir); } catch { continue; }
    for (const name of names) {
      if (text.includes(`/${rel}/${name}`)) continue;
      bytes += (await fs.stat(path.join(dir, name))).size;
      await fs.rm(path.join(dir, name), {force: true});
      removed += 1;
    }
  }
  console.log(`Unreferenced static image copies removed: ${removed} files (${(bytes / 1e6).toFixed(2)} MB).`);
}

async function main() {
  await removeUnreferencedImageCopies();
  if (process.env.WARWIKI_INCLUDE_HANDOUTS === 'false') {
    // Retire only generated deployment copies; preserve all committed sources.
    await fs.access(path.join(ROOT, 'build/index.html'));
    await fs.rm(path.join(ROOT, 'build/handouts'), {recursive: true, force: true});
    await fs.rm(OUTPUT, {recursive: true, force: true});
    console.log('Handout PDFs and previews omitted from deployment (WARWIKI_INCLUDE_HANDOUTS=false). Sources preserved.');
    return;
  }
  if (process.env.WARWIKI_INCLUDE_HANDOUT_TRANSLATIONS !== 'true') {
    // English files are <slug>.pdf and <slug>.webp; translations carry a
    // language code (<slug>.<code>.pdf, <slug>.<code>.jpg).
    let removed = 0;
    for (const dir of [path.join(ROOT, 'build/handouts'), OUTPUT]) {
      for (const name of await fs.readdir(dir)) {
        if (name.split('.').length > 2) {
          await fs.rm(path.join(dir, name), {force: true});
          removed += 1;
        }
      }
    }
    console.log(`Translated handout assets omitted from deployment: ${removed} files.`);
  }
  // Thumbnails are committed already optimized (cropped WebP), so the restore
  // path only reports the published handout payload; nothing is re-encoded.
  const sizeOf = async dir => {
    let total = 0; let count = 0;
    for (const name of await fs.readdir(dir)) {
      total += (await fs.stat(path.join(dir, name))).size; count += 1;
    }
    return {total, count};
  };
  const pdfs = await sizeOf(path.join(ROOT, 'build/handouts'));
  const thumbs = await sizeOf(OUTPUT);
  console.log(`Handouts published: ${pdfs.count} PDFs (${(pdfs.total / 1e6).toFixed(2)} MB), ${thumbs.count} previews (${(thumbs.total / 1e6).toFixed(2)} MB).`);
}

main().catch(error => {
  console.error(`Build asset optimization failed: ${error.message}`);
  process.exitCode = 1;
});
