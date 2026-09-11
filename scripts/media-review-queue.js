#!/usr/bin/env node
// Compare collected metadata to the published registry without editing pages,
// generating clinical claims, or automatically promoting videos into the site.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const ROOT = path.resolve(__dirname, '..');
function literalObject(node) {
  if (!ts.isObjectLiteralExpression(node)) return null;
  const result = {};
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : null;
    if (!name) continue;
    if (ts.isStringLiteral(prop.initializer) || ts.isNumericLiteral(prop.initializer)) result[name] = prop.initializer.text;
    else if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) result[name] = true;
    else if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) result[name] = false;
  }
  return result;
}
function arrayConstant(source, name) {
  const start = source.indexOf(`export const ${name} =`);
  if (start === -1) throw new Error(`Missing static ${name} array`);
  const parsed = ts.createSourceFile('media-source.ts', source.slice(start), ts.ScriptTarget.Latest, true);
  const init = parsed.statements[0]?.declarationList?.declarations[0]?.initializer;
  if (!init || !ts.isArrayLiteralExpression(init)) throw new Error(`${name} must remain a static array for review tooling`);
  return init.elements.map(literalObject).filter(Boolean);
}
function videoBaseline(source) {
  const parsed = ts.createSourceFile('videos.ts', source, ts.ScriptTarget.Latest, true);
  const videos = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const value = literalObject(node);
      if (value.id && value.title && value.playlist) videos.push(value);
    }
    ts.forEachChild(node, visit);
  }
  visit(parsed);
  return videos;
}
function canonicalVideoUrl(id) {
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) throw new Error(`Invalid YouTube video identifier: ${id}`);
  return `https://www.youtube.com/watch?v=${id}`;
}
function buildQueue({ videoSource, podcastSource, collection = null, asOf }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf) || Number.isNaN(Date.parse(asOf))) throw new Error('A valid --date YYYY-MM-DD is required');
  const videos = videoBaseline(videoSource);
  const feeds = arrayConstant(podcastSource, 'feeds');
  const episodes = arrayConstant(podcastSource, 'episodes');
  const byId = new Map(videos.map(v => [v.id, v]));
  const collected = new Map();
  if (collection) {
    if (!Array.isArray(collection.playlists) || !collection.fetchedAt || Number.isNaN(Date.parse(collection.fetchedAt))) throw new Error('Collection must include fetchedAt and playlists from the existing YouTube collector');
    for (const playlist of collection.playlists) for (const item of playlist.items || []) {
      if (!item.videoId) continue;
      canonicalVideoUrl(item.videoId);
      if (!collected.has(item.videoId)) collected.set(item.videoId, { ...item, playlists: [] });
      collected.get(item.videoId).playlists.push(playlist.title);
    }
  }
  const candidates = [];
  for (const [id, item] of [...collected].sort(([a], [b]) => a.localeCompare(b))) {
    const previous = byId.get(id);
    const reason = !previous ? 'new to published registry' : /^(?:deleted|private) video$/i.test(item.title || '') ? 'provider marks unavailable' : previous.title !== item.title ? 'title changed' : null;
    if (!reason) continue;
    candidates.push({ id, title: item.title, url: canonicalVideoUrl(id), reason,
      ...(previous ? { previousTitle: previous.title } : {}), playlists: [...new Set(item.playlists)].sort(),
      providerPublishedAt: item.publishedAt || null, providerDateCaveat: 'Collector can fall back to playlist-addition date when video publication date is missing; verify on provider page.', metadataObservedAt: collection.fetchedAt,
      verification: 'Provider metadata collected; playback, educational quality, publication date and topical placement require review.',
      placementDecision: { status: 'pending', targetPage: null, rationale: null, reviewer: null, reviewedOn: null } });
  }
  const missing = collection ? videos.filter(v => !collected.has(v.id)).map(v => ({ id: v.id, title: v.title, url: canonicalVideoUrl(v.id), reason: 'absent from current channel playlists; not proof the video was deleted' })).sort((a, b) => a.id.localeCompare(b.id)) : [];
  return { schemaVersion: 1, asOf,
    methodology: 'Source-only media review queue. Static metadata is parsed without evaluating source code. URLs identify provider pages; HTTP reachability and provider metadata do not verify clinical content or playable media. No site registry, article, clinical claim, or curated flag is changed.',
    baseline: { registryFetchedAt: videoSource.match(/Fetched at:\s*(\S+)/)?.[1] || null, videoCount: videos.length, podcastEpisodeCount: episodes.length,
      podcastPublicationDates: 'Not consistently recorded in the existing curated episode array; confirm on provider pages before adding dates.' },
    collection: collection ? { fetchedAt: collection.fetchedAt, playlistCount: collection.playlists.length, uniqueVideos: collected.size,
      ageDays: Math.floor((Date.parse(`${asOf}T23:59:59Z`) - Date.parse(collection.fetchedAt)) / 86400000) } : { fetchedAt: null, status: 'not collected; use videos:fetch with a report output path' },
    candidates, absentFromCollection: missing,
    podcastFeedReview: feeds.map(feed => ({ id: feed.id, name: feed.name, url: feed.url,
      existingEpisodes: episodes.filter(episode => episode.feed === feed.id).map(episode => ({ title: episode.title, episode: episode.ep || null, url: episode.url })),
      urlCheck: { status: 'not checked', checkedAt: null },
      editorialTask: 'Check provider episodes since the last actual media update; verify episode date, guest/topic and relevance, then decide library/article placement. Do not derive clinical recommendations from titles.',
      placementDecision: { status: 'pending', reviewer: null, reviewedOn: null, rationale: null } })) };
}
async function checkFeedUrl(url, fetcher = fetch) {
  const checkedAt = new Date().toISOString();
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') throw new Error('Only HTTPS provider URLs are supported');
    let response = await fetcher(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) });
    if (response.status === 405) response = await fetcher(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(8000) });
    await response.body?.cancel();
    return { status: response.ok ? 'reachable' : [403, 429].includes(response.status) ? 'access limited; manual check needed' : 'review response', checkedAt,
      httpStatus: response.status, finalUrl: response.url || url, scope: 'URL availability only; no claim or episode verification' };
  } catch (error) {
    return { status: 'check failed; manual check needed', checkedAt, error: error.name === 'TimeoutError' ? 'timeout' : 'network/URL error', scope: 'No conclusion about whether provider content exists' };
  }
}
function markdownQueue(queue) {
  const lines = ['# Media review queue', '', queue.methodology, '',
    `As of ${queue.asOf}. Published baseline: ${queue.baseline.videoCount} videos (metadata collected ${queue.baseline.registryFetchedAt || 'date unknown'}), ${queue.baseline.podcastEpisodeCount} curated podcast episodes.`, '',
    queue.collection.fetchedAt ? `Compared playlist collection from ${queue.collection.fetchedAt}: ${queue.collection.uniqueVideos} unique videos in ${queue.collection.playlistCount} playlists (${queue.collection.ageDays} days old).` : 'No new playlist collection was supplied; this queue does not establish that no new videos exist.', '',
    `${queue.candidates.length} video metadata changes need review; ${queue.absentFromCollection.length} published videos are absent from the collected playlists. Absence is not proof of deletion.`, '', '## Video decisions', ''];
  if (!queue.candidates.length) lines.push('No metadata changes in the supplied comparison. Check the collection date before treating this as a current refresh.');
  for (const item of queue.candidates.slice(0, 100)) lines.push(`- [${item.title}](${item.url}) — ${item.reason}; provider date ${item.providerPublishedAt || 'unknown'}. Pending placement/quality review.`);
  lines.push('', '## Podcast source review', '', 'Publication dates are not consistently stored in the curated episode baseline. Each feed remains an editorial review task, regardless of HTTP availability.', '');
  for (const feed of queue.podcastFeedReview) lines.push(`- [${feed.name}](${feed.url}) — ${feed.existingEpisodes.length} existing episodes; URL ${feed.urlCheck.status}${feed.urlCheck.httpStatus ? ` (HTTP ${feed.urlCheck.httpStatus})` : ''}${feed.urlCheck.checkedAt ? ` at ${feed.urlCheck.checkedAt}` : ''}; episode selection and placement pending.`);
  lines.push('', 'Complete comparison and per-item decision fields are in the companion JSON. Existing collector: `npm run videos:fetch -- --out reports/YYYY-MM-DD/youtube-review-source.json`. Create a queue with `npm run media:review -- --date YYYY-MM-DD --collection reports/YYYY-MM-DD/youtube-review-source.json --verify-feeds --out reports/YYYY-MM-DD/media-review-queue.json --markdown reports/YYYY-MM-DD/media-review-queue.md`. Do not run `videos:build` or `videos:sync` for an unattended review queue.');
  return `${lines.join('\n')}\n`;
}
async function main() {
  const args = process.argv.slice(2);
  function option(name, fallback) {
    const i = args.indexOf(name);
    if (i === -1) return fallback;
    if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`${name} requires a value`);
    return args[i + 1];
  }
  const collection = option('--collection');
  const queue = buildQueue({ videoSource: fs.readFileSync(path.join(ROOT, 'src/data/videos.ts'), 'utf8'),
    podcastSource: fs.readFileSync(path.join(ROOT, 'docs/08-resources/podcasts.mdx'), 'utf8'),
    collection: collection ? JSON.parse(fs.readFileSync(collection, 'utf8')) : null,
    asOf: option('--date', new Date().toISOString().slice(0, 10)) });
  if (args.includes('--verify-feeds')) {
    for (let i = 0; i < queue.podcastFeedReview.length; i += 2) {
      await Promise.all(queue.podcastFeedReview.slice(i, i + 2).map(async feed => { feed.urlCheck = await checkFeedUrl(feed.url); }));
    }
  }
  for (const [flag, content] of [['--out', JSON.stringify(queue, null, 2) + '\n'], ['--markdown', markdownQueue(queue)]]) {
    const out = option(flag);
    if (out) { fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, content); }
  }
  console.log(JSON.stringify({ baseline: queue.baseline, collection: queue.collection, candidates: queue.candidates.length, absentFromCollection: queue.absentFromCollection.length,
    feeds: queue.podcastFeedReview.map(feed => ({ name: feed.name, urlCheck: feed.urlCheck })) }, null, 2));
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { literalObject, arrayConstant, videoBaseline, buildQueue, checkFeedUrl };
