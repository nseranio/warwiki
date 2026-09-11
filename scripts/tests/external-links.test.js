const { test } = require('node:test');
const assert = require('node:assert/strict');
const { extractUrls } = require('../check-external-links');

test('preserves parentheses inside DOI paths and removes the Markdown delimiter', () => {
  const doi = 'https://doi.org/10.1016/S0140-6736(21)00393-7';
  assert.deepEqual(extractUrls(`[Lancet](${doi})`), [doi]);
  assert.deepEqual(extractUrls(`[Source](https://example.org/a(b(c)d)e)`), ['https://example.org/a(b(c)d)e']);
});

test('preserves Markdown, autolink, reference and JSX URL extraction', () => {
  const urls = [
    'https://doi.org/10.1016/s0029-7844(03)00368-5',
    'https://example.org/path%28encoded%29?x=1&y=2',
    'http://example.org/reference',
    'https://example.org/jsx(a)',
    'https://example.org/expression',
  ];
  const source = `[Paper](${urls[0]} "Optional title")
<${urls[1]}>
[source]: ${urls[2]}
<a href="${urls[3]}">Source</a>
<Link href={'${urls[4]}'} />`;
  assert.deepEqual(extractUrls(source), urls);
});

test('trims prose punctuation and unmatched enclosing parentheses without dropping DOI suffixes', () => {
  const doi = 'https://doi.org/10.1016/S0140-6736(21)00393-7';
  assert.deepEqual(extractUrls(`See (${doi}). Then https://example.org/page, and https://example.org/end!`), [doi, 'https://example.org/page', 'https://example.org/end']);
  assert.deepEqual(extractUrls(`[paper](${doi})and following prose`), [doi]);
  assert.deepEqual(extractUrls('No external references here.'), []);
});
