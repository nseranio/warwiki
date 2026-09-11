#!/usr/bin/env node
/**
 * Temporary build-input mitigation for image-size 2.0.2's unpatched parser
 * loops (CVE-2025-71329/71330). Inspect signatures without invoking a decoder.
 * Remove/revisit when Docusaurus can use a patched upstream release.
 */
const fs = require('node:fs');
const path = require('node:path');
const BLOCKED_EXTENSIONS = new Set(['.icns', '.jxl', '.heif', '.heic', '.avif', '.avis']);
const HEIF_BRANDS = new Set(['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1', 'msf1', 'avif', 'avis']);

function blockedFormat(header, filename = '') {
  const extension = path.extname(filename).toLowerCase();
  if (BLOCKED_EXTENSIONS.has(extension)) return extension.slice(1);
  if (header.subarray(0, 4).toString('ascii') === 'icns') return 'icns';
  if (header[0] === 0xff && header[1] === 0x0a) return 'jxl';
  if (header.subarray(4, 8).toString('ascii') === 'JXL ') return 'jxl';
  if (header.subarray(4, 8).toString('ascii') === 'ftyp' && HEIF_BRANDS.has(header.subarray(8, 12).toString('ascii'))) return 'heif/avif';
  return null;
}

function checkSourceImages(directories) {
  const blocked = [];
  let checkedFiles = 0;
  function visit(directory) {
    if (!fs.existsSync(directory)) return;
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile()) {
        const header = Buffer.alloc(16);
        const descriptor = fs.openSync(file, 'r');
        try { fs.readSync(descriptor, header, 0, 16, 0); } finally { fs.closeSync(descriptor); }
        checkedFiles++;
        const format = blockedFormat(header, file);
        if (format) blocked.push({file, format});
      }
    }
  }
  directories.forEach(visit);
  return {checkedFiles, blocked};
}

if (require.main === module) {
  const root = path.resolve(__dirname, '..');
  const result = checkSourceImages(['static', 'docs', 'src'].map(folder => path.join(root, folder)));
  if (result.blocked.length) {
    console.error('Build stopped: image-size has unpatched parser issues for these source image formats. Convert trusted images to PNG/JPEG/WebP/SVG before adding them.');
    for (const item of result.blocked) console.error(`  ${path.relative(root, item.file)} (${item.format})`);
    process.exitCode = 1;
  } else console.log(`Image format guard: ${result.checkedFiles} source files checked; no blocked ICNS/JXL/HEIF/AVIF inputs.`);
}
module.exports = {blockedFormat, checkSourceImages};
