const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {checkRenderedLinks, extractDataLinks} = require('../check-rendered-links');

function fixture(t, files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'warwiki-links-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  for (const [name, content] of Object.entries(files)) {
    const destination = path.join(root, name);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.writeFileSync(destination, content);
  }
  return root;
}

test('checks clean routes, relative links, entities, encoded anchors and named legacy anchors', async t => {
  const buildDir = fixture(t, {
    'index.html': '<a href="/docs/one?x=1&amp;y=2#t%C3%A9st">one</a><a href="/docs/two/#legacy">two</a><a href="https://outside.example/missing">external</a>',
    'docs/one.html': '<h2 id="tést">Heading</h2><a href="two/#legacy">relative</a><a href="#top">top</a>',
    'docs/two/index.html': '<a name="legacy"></a><a href="/asset.pdf#page=2">pdf</a>',
    'asset.pdf': 'fixture',
  });
  const result = await checkRenderedLinks({buildDir});
  assert.equal(result.htmlPages, 3);
  assert.deepEqual(result.issues, []);
  assert.equal(result.checkedLinks, 5);
});

test('fails missing routes and fragments including data links hidden behind UI state', async t => {
  const root = fixture(t, {
    'build/index.html': '<a href="/missing">bad</a><a href="/docs/one#absent">bad anchor</a>',
    'build/docs/one.html': '<h2 id="present">Existing</h2>',
    'src/rows.ts': "const rows = [{slug: '/docs/unrendered'}, {href: '/docs/one#hidden-missing'}]",
  });
  const result = await checkRenderedLinks({buildDir: path.join(root, 'build'), sourceDirs: [path.join(root, 'src')]});
  assert.equal(result.dataLinks, 2);
  assert.equal(result.issues.length, 4);
  assert.equal(result.issues.filter(x => x.reason === 'missing local destination').length, 2);
});

test('handles same-site absolute URLs and ignores non-navigation protocols and text fragments', async t => {
  const buildDir = fixture(t, {
    'index.html': '<a href="https://www.warwiki.org/docs/one#ok">valid</a><a href="mailto:test@example.org">email</a><a href="tel:123">phone</a><a href="#:~:text=hello">text</a><a href="/docs/one#ok:~:text=hello">text with anchor</a>',
    'docs/one.html': '<h2 id="ok"></h2>',
  });
  assert.deepEqual((await checkRenderedLinks({buildDir})).issues, []);
});

test('data extraction checks MDX and JSON literals without executing source or guessing computed URLs', () => {
  assert.deepEqual(extractDataLinks("export const rows=[{slug: '/docs/existing#anchor'}, {href: `/docs/${danger()}`}, {slug: '/docs/' + suffix}]", 'index.mdx'), ['/docs/existing#anchor']);
  assert.deepEqual(extractDataLinks('{"rows":[{"href":"/docs/hidden"},{"url":"https://example.org"}]}', 'rows.json'), ['/docs/hidden']);
});

test('fails clearly for missing/incomplete builds', async t => {
  const buildDir = fixture(t, {'docs/one.html': '<h1>Partial</h1>'});
  await assert.rejects(() => checkRenderedLinks({buildDir}), /complete build/);
});

test('validates rendered image, script and stylesheet destinations without requesting external media', async t => {
  const buildDir = fixture(t, {
    'index.html': '<link rel="stylesheet" href="/assets/site.css"><script src="/assets/missing.js"></script><img src="/img/missing.svg"><img src="https://outside.example/image.jpg"><img src="data:image/png;base64,abc">',
    'assets/site.css': 'body {}',
  });
  const result = await checkRenderedLinks({buildDir});
  assert.equal(result.checkedLinks, 3);
  assert.deepEqual(result.issues.map(x => x.href).sort(), ['/assets/missing.js', '/img/missing.svg']);
});

test('includes hidden clinic assessment/treatment and article destinations in the source check', () => {
  assert.deepEqual(extractDataLinks("{assessment: \'/docs/assessment\', treatment: \'/docs/treatment\', articleSlug: \'/docs/article\'}", 'clinic.ts'), ['/docs/assessment', '/docs/treatment', '/docs/article']);
});

test('rejects raw clinical warning markup while allowing rendered alerts and literal code examples', async t => {
  const buildDir = fixture(t, {
    'index.html': '<p>:::warning Balloon safety\nInsert correctly.</p><p>:::danger Severe reaction</p>',
    'valid.html': '<div class="alert alert--warning"><strong>Balloon safety</strong></div><pre><code>:::warning[Example]</code></pre><script>":::danger hidden"</script>',
  });
  const result = await checkRenderedLinks({buildDir});
  assert.equal(result.issues.length, 2);
  assert.ok(result.issues.every(issue => issue.from === 'index.html' && issue.reason.startsWith('unrendered admonition')));
});
