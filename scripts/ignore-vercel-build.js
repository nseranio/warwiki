#!/usr/bin/env node
/** Vercel ignored-build contract: exit 0 skips; exit 1 builds. Fail open. */
const {execFileSync} = require('node:child_process');
const previous = process.env.VERCEL_GIT_PREVIOUS_SHA;
if (!previous || !/^[0-9a-f]{7,40}$/i.test(previous)) {
  console.log('Build: no previous deployment revision is available.');
  process.exit(1);
}
try {
  const changed = execFileSync('git', ['diff', '--name-only', '-z', previous, 'HEAD'], {encoding: 'utf8'})
    .split('\0').filter(Boolean);
  // Only known authoring-only paths can skip a build. New/unknown paths,
  // article content, media, APIs, dependencies and config always build.
  const authoringOnly = name => /^(reports\/|social-assets\/)/.test(name)
    || /^(AGENTS\.md|CLAUDE\.md|CHANGELOG\.md|README\.md)$/.test(name);
  if (changed.length > 0 && changed.every(authoringOnly)) {
    console.log(`Skip: all ${changed.length} changes are authoring-only reports or notes.`);
    process.exit(0);
  }
  console.log('Build: site inputs changed or no changes could be established.');
} catch {
  console.log('Build: previous revision could not be compared safely.');
}
process.exit(1);
