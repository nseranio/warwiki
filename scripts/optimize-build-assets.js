#!/usr/bin/env node
/**
 * Handout assets in the build output. While handouts are paused, remove the
 * generated copies (sources in static/ are preserved). When restored with
 * WARWIKI_INCLUDE_HANDOUTS=true, report the published payload; PDFs and WebP
 * previews are committed already optimized, so nothing is re-encoded.
 */
const fs = require('node:fs/promises');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'build/img/handouts');

async function main() {
  if (process.env.WARWIKI_INCLUDE_HANDOUTS !== 'true') {
    // Retire only generated deployment copies; preserve all committed sources.
    await fs.access(path.join(ROOT, 'build/index.html'));
    await fs.rm(path.join(ROOT, 'build/handouts'), {recursive: true, force: true});
    await fs.rm(OUTPUT, {recursive: true, force: true});
    console.log('Handout PDFs and previews omitted from deployment. Sources preserved; restore with WARWIKI_INCLUDE_HANDOUTS=true.');
    return;
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
