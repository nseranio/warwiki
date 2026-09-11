const test = require('node:test');
const assert = require('node:assert/strict');
const { buildQueue, videoBaseline, checkFeedUrl } = require('../media-review-queue');
const videoSource = '// Fetched at: 2026-06-23T00:00:00Z\nconst CHUNK_0 = [{id:"abcdefghijk", title:"Existing title", playlist:"Reconstruction"}, {id:"ABCDEFGHIJK", title:"Absent title", playlist:"Reconstruction"}];';
const podcastSource = '# MDX heading\nexport const feeds = [{ id: "feed", name: "Official podcast", url: "https://example.org/podcast" }];\nexport const episodes = [{ feed: "feed", title: "Existing episode", ep: "1", url: "https://example.org/episode/1" }];';
test('parses only literal metadata without executing source code', () => {
  global.mediaExecuted = false;
  const source = videoSource + '\nthrow new Error("must not execute"); const malicious = {id: (()=>{global.mediaExecuted=true;return "01234567890"})(), title:"Bad", playlist:"Bad"};';
  assert.equal(videoBaseline(source).length, 2);
  assert.equal(global.mediaExecuted, false);
  delete global.mediaExecuted;
});
test('deduplicates playlist memberships, keeps date provenance, and leaves new/changed media pending', () => {
  const item = { videoId: '01234567890', title: 'New video', publishedAt: '2026-09-01T00:00:00Z' };
  const queue = buildQueue({ videoSource, podcastSource, asOf: '2026-09-11', collection: {
    fetchedAt: '2026-09-11T01:00:00Z', playlists: [{ title: 'A', items: [item, { videoId: 'abcdefghijk', title: 'Changed title' }] }, { title: 'B', items: [item] }] } });
  assert.equal(queue.collection.uniqueVideos, 2);
  assert.equal(queue.candidates.length, 2);
  assert.deepEqual(queue.candidates[0].playlists, ['A', 'B']);
  assert.equal(queue.candidates[0].placementDecision.status, 'pending');
  assert.equal(queue.candidates[0].metadataObservedAt, '2026-09-11T01:00:00Z');
  assert.equal(queue.absentFromCollection.length, 1);
  assert.match(queue.absentFromCollection[0].reason, /not proof/);
  assert.equal(queue.podcastFeedReview[0].existingEpisodes.length, 1);
  assert.equal(queue.podcastFeedReview[0].urlCheck.status, 'not checked');
});
test('missing collection does not imply a current all-clear', () => {
  const queue = buildQueue({ videoSource, podcastSource, asOf: '2026-09-11' });
  assert.equal(queue.collection.fetchedAt, null);
  assert.match(queue.collection.status, /not collected/);
  assert.deepEqual(queue.absentFromCollection, []);
  assert.throws(() => buildQueue({ videoSource, podcastSource, asOf: 'invalid' }), /valid/);
});
test('provider access limits remain indeterminate; 405 retries GET without clinical verification claims', async () => {
  const limited = await checkFeedUrl('https://example.org', async () => ({ status: 403, ok: false }));
  assert.match(limited.status, /manual check/);
  const methods = [];
  const available = await checkFeedUrl('https://example.org', async (_, options) => { methods.push(options.method); return { status: methods.length === 1 ? 405 : 200, ok: methods.length !== 1 }; });
  assert.deepEqual(methods, ['HEAD', 'GET']);
  assert.equal(available.status, 'reachable');
  assert.match(available.scope, /no claim/);
});
