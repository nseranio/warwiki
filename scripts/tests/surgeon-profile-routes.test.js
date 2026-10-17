const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');

function profiles(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? profiles(file) : entry.name.endsWith('.mdx') ? [file] : [];
  });
}

test('published surgeon profiles are not redirected to the directory', () => {
  const base = path.join(root, 'docs/07-roots/surgeons');
  const routes = new Set(profiles(base).map(file =>
    `/docs/roots/surgeons/${path.relative(base, file).replaceAll(path.sep, '/').replace(/\.mdx$/, '')}`));
  const {redirects} = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  const conflicts = redirects.filter(rule => routes.has(rule.source) && rule.destination === '/docs/roots/surgical-lineage');
  assert.deepEqual(conflicts, [], 'A restored profile must open instead of redirecting back to the directory.');
});
