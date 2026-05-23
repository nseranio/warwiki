#!/usr/bin/env node
/**
 * measure-build.js
 *
 * Wraps `npm run build` to record wall-clock time, page count, and approx
 * peak memory into `build-perf.log`. Append-only — over time the file is a
 * baseline that surfaces regressions before they bite the authoring loop.
 *
 * Usage:
 *   node scripts/measure-build.js
 *   npm run bench:build
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const LOG = path.join(ROOT, 'build-perf.log');

function fmtMs(ms) {
  const s = ms / 1000;
  const m = Math.floor(s / 60);
  const rem = (s - m * 60).toFixed(1);
  return m > 0 ? `${m}m ${rem}s` : `${rem}s`;
}

const stats = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/stats.json'), 'utf8'));
  } catch {
    return { articles: null, references: null };
  }
})();

const start = Date.now();
let peakRss = 0;
const sampler = setInterval(() => {
  const rss = process.memoryUsage().rss;
  if (rss > peakRss) peakRss = rss;
}, 500);

const child = spawn('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' });

child.on('exit', code => {
  clearInterval(sampler);
  const elapsed = Date.now() - start;
  const line = [
    new Date().toISOString(),
    `code=${code}`,
    `elapsed=${fmtMs(elapsed)}`,
    `articles=${stats.articles}`,
    `refs=${stats.references}`,
    `node=${process.version}`,
    `host=${os.hostname()}`,
    `peakRssMB=${(peakRss / 1024 / 1024).toFixed(0)}`,
  ].join('\t');
  fs.appendFileSync(LOG, line + '\n');
  console.log('\n' + line);
  process.exit(code ?? 0);
});
