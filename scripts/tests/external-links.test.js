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

test('checks the actual resource when a server rejects HEAD without downloading its body', async t => {
  const http = require('node:http');
  const { check } = require('../check-external-links');
  const requests = [];
  const server = http.createServer((req, res) => {
    requests.push(`${req.method} ${req.url}`);
    if (req.method === 'HEAD') { res.writeHead(req.url === '/unsupported' ? 405 : 404); res.end(); }
    else if (req.url === '/missing') { res.writeHead(404); res.end(); }
    else { res.writeHead(200, {'Content-Type': 'application/pdf'}); res.write('header'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => { server.closeAllConnections(); server.close(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const route of ['/manual', '/unsupported']) {
    const result = await check([base + route, 'source.mdx'], {timeoutMs: 1000});
    assert.equal(result.ok, true);
    assert.equal(result.method, 'GET');
  }
  const missing = await check([base + '/missing', 'source.mdx'], {timeoutMs: 1000});
  assert.equal(missing.status, 404);
  assert.equal(missing.ok, false);
  assert.equal(missing.soft, false);
  assert.deepEqual(requests, ['HEAD /manual', 'GET /manual', 'HEAD /unsupported', 'GET /unsupported', 'HEAD /missing', 'GET /missing']);
});

test('records invalid destinations as failures rather than aborting the full report', async () => {
  const { check } = require('../check-external-links');
  const result = await check(['https://', 'source.mdx']);
  assert.equal(result.ok, false);
  assert.equal(result.status, 0);
  assert.ok(result.error);
});
