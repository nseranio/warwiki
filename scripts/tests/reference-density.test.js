const test = require('node:test');
const assert = require('node:assert/strict');
const { assessArticle } = require('../check-reference-density');
const prose = 'clinical evidence '.repeat(1300);
test('long articles with unlinked references stay in advisory queue', () => {
  const result = assessArticle(`---\ntitle: A clinical article\n---\n${prose}\n## References\n1. Author. Study. doi:10.1000/study`, 'docs/03-conditions/article.mdx');
  assert.equal(result.reason, 'unlinked bibliography');
  assert.equal(result.words, 2600);
  assert.equal(result.unlinkedBibliographyEntries, 1);
});
test('actual indexes/databases and explicit stubs do not enter the advisory queue', () => {
  for (const file of ['docs/03-conditions/index.mdx', 'docs/03-conditions/topic-database.mdx']) assert.equal(assessArticle(prose, file), null);
  for (const fm of ['title: Condition Database', 'hide_title: true']) assert.equal(assessArticle(`---\n${fm}\n---\n${prose}`, 'docs/03-conditions/collection.mdx'), null);
  assert.equal(assessArticle(`*Stub — to be built out\n${prose}`, 'docs/03-conditions/stub.mdx'), null);
});
test('linked alphabetic reference IDs and footnotes count as structured citations', () => {
  const refs = Array.from({ length: 6 }, (_, i) => `<a id="refA${i}"></a>A${i}. Author. Title. doi:10.1000/${i}`).join('\n');
  assert.equal(assessArticle(`${prose}\n## References\n${refs}`, 'docs/03-conditions/article.mdx'), null);
  const footnotes = Array.from({ length: 6 }, (_, i) => `[^${i}]: Author. Title.`).join('\n');
  assert.equal(assessArticle(`${prose}\n${footnotes}`, 'docs/03-conditions/article.mdx'), null);
});
