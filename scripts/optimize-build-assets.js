#!/usr/bin/env node
/**
 * Compress gallery previews in the disposable build output. Always encode from
 * the committed source, preserving dimensions, URLs and every original/PDF.
 * Repeated runs cannot compound JPEG loss. No image optimization API is used.
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'static/img/handouts');
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
  const names = (await fs.readdir(SOURCE)).filter(name => name.endsWith('.jpg')).sort();
  let before = 0;
  let after = 0;
  let next = 0;
  const workers = Array.from({length: 4}, async () => {
    while (next < names.length) {
      const name = names[next++];
      const input = await fs.readFile(path.join(SOURCE, name));
      const destination = path.join(OUTPUT, name);
      // Fail clearly if invoked without a successful site build.
      await fs.access(destination);
      const encoded = await sharp(input).jpeg({quality: 72, mozjpeg: true}).toBuffer();
      const optimized = encoded.length < input.length ? encoded : input;
      await fs.writeFile(destination, optimized);
      before += input.length;
      after += optimized.length;
    }
  });
  await Promise.all(workers);
  console.log(`Handout previews: ${names.length} files; ${(before / 1e6).toFixed(2)} MB → ${(after / 1e6).toFixed(2)} MB; saved ${((before - after) / 1e6).toFixed(2)} MB (${(100 * (1 - after / before)).toFixed(1)}%). Originals and PDF downloads unchanged.`);
}

main().catch(error => {
  console.error(`Build asset optimization failed: ${error.message}`);
  process.exitCode = 1;
});
