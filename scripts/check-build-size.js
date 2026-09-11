#!/usr/bin/env node
/** Read-only deployment-output inventory; run after npm run build. */
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : entry.isFile() ? [{path: path.relative(BUILD, file), bytes: fs.statSync(file).size}] : [];
  });
}

if (!fs.existsSync(BUILD)) {
  console.error('No build output found. Run npm run build first.');
  process.exit(1);
}
const files = walk(BUILD);
const extensions = {};
for (const file of files) {
  const extension = path.extname(file.path) || '(none)';
  extensions[extension] ??= {files: 0, bytes: 0};
  extensions[extension].files++;
  extensions[extension].bytes += file.bytes;
}
const video = fs.readFileSync(path.join(BUILD, 'video-library.html'));
const result = {
  measuredAt: new Date().toISOString(),
  note: 'Local build output bytes, not Vercel billed storage. Retention, metering and older deployments are separate.',
  totalFiles: files.length,
  totalBytes: files.reduce((sum, file) => sum + file.bytes, 0),
  extensions,
  videoLibrary: {htmlBytes: video.length, gzipBytes: zlib.gzipSync(video).length, renderedCards: (video.toString().match(/vc-card vl-card/g) || []).length},
  largestFiles: files.sort((a, b) => b.bytes - a.bytes).slice(0, 12),
};
const maxArgument = process.argv.find(argument => argument.startsWith('--max-mb='));
const maxMb = maxArgument ? Number(maxArgument.split('=')[1]) : null;
if (maxMb !== null && (!Number.isFinite(maxMb) || maxMb <= 0)) {
  console.error('Use a positive deployment budget, for example --max-mb=500.');
  process.exit(1);
}
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Build: ${result.totalFiles} files, ${(result.totalBytes / 1e6).toFixed(2)} MB`);
  for (const [extension, values] of Object.entries(extensions).sort((a, b) => b[1].bytes - a[1].bytes)) {
    console.log(`${extension}: ${values.files} files, ${(values.bytes / 1e6).toFixed(2)} MB`);
  }
  console.log(`Video library: ${result.videoLibrary.renderedCards} initial cards, ${video.length} HTML bytes, ${result.videoLibrary.gzipBytes} gzip bytes`);
  console.log(result.note);
}
if (maxMb !== null && result.totalBytes > maxMb * 1e6) {
  console.error(`Deployment output exceeds the ${maxMb} MB budget: ${(result.totalBytes / 1e6).toFixed(2)} MB. Review large assets before deploying.`);
  process.exitCode = 1;
}
