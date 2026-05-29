#!/usr/bin/env node
/**
 * fetch-youtube-playlists.js
 *
 * Pulls every playlist + every video on a YouTube channel into a
 * machine-readable JSON cache the Video Library can ingest.
 *
 * Usage:
 *   YT_API_KEY=... node scripts/fetch-youtube-playlists.js
 *
 * Optional flags:
 *   --handle @warwikihq        Channel handle to resolve (default: @warwikihq)
 *   --channel-id UCxxxxxx      Skip handle resolution and use this channel ID
 *   --out path/to/file.json    Output path (default: src/data/videos.generated.json)
 *
 * Output JSON shape:
 *   {
 *     channelId, channelTitle, fetchedAt,
 *     playlists: [{ id, title, itemCount, items: [{ id, title, publishedAt, duration, views, position }] }]
 *   }
 *
 * Notes:
 *   - Uses YouTube Data API v3. Quota cost per run ≈ 1 + N + (P * pages).
 *     For the WARWIKI channel (~90 playlists, ~1500 videos) expect ~200 units —
 *     well under the 10,000/day default quota.
 *   - We fetch contentDetails + statistics on each video (one batched call per
 *     50 videos) to capture ISO-8601 duration (the `MM:SS` corner badge) and
 *     viewCount (used to rank which video to surface on a wiki page).
 */

const fs = require('node:fs');
const path = require('node:path');

// Load .env without requiring a dependency.
function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    const [, key, val] = m;
    if (!process.env[key]) process.env[key] = val.replace(/^["']|["']$/g, '');
  }
}
loadDotEnv(path.resolve(__dirname, '..', '.env'));

const args = process.argv.slice(2);
function flag(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
}

const API_KEY = process.env.YT_API_KEY;
if (!API_KEY) {
  console.error('Missing YT_API_KEY. Add it to .env or export it.');
  process.exit(1);
}

const HANDLE = flag('handle', '@warwikihq');
const CHANNEL_ID_OVERRIDE = flag('channel-id', null);
const OUT_PATH = path.resolve(
  __dirname,
  '..',
  flag('out', 'src/data/videos.generated.json'),
);

const BASE = 'https://www.googleapis.com/youtube/v3';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function api(endpoint, params, { attempts = 6 } = {}) {
  const url = new URL(`${BASE}/${endpoint}`);
  url.searchParams.set('key', API_KEY);
  for (const [k, v] of Object.entries(params)) {
    if (v != null) url.searchParams.set(k, v);
  }

  let lastErr;
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(url);
    if (res.ok) return res.json();
    const text = await res.text();
    lastErr = new Error(`YouTube API ${endpoint} ${res.status}: ${text}`);
    // Retry on 403 (referrer-cache drift across edge nodes), 429 (rate limit),
    // and any 5xx. Other errors fail fast.
    if (res.status !== 403 && res.status !== 429 && res.status < 500) throw lastErr;
    const wait = Math.min(30_000, 1_000 * Math.pow(2, i));
    process.stderr.write(`    (retry ${i + 1}/${attempts} after ${wait}ms — ${res.status})\n`);
    await sleep(wait);
  }
  throw lastErr;
}

async function resolveChannelId(handle) {
  // Handles like @warwikihq use the channels.list?forHandle endpoint (v3, 2023+).
  const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
  const data = await api('channels', {
    part: 'id,snippet',
    forHandle: cleanHandle,
  });
  const channel = data.items?.[0];
  if (!channel) throw new Error(`Could not resolve channel for handle ${cleanHandle}`);
  return { id: channel.id, title: channel.snippet.title };
}

async function* paginate(endpoint, params) {
  let pageToken;
  do {
    const data = await api(endpoint, { ...params, pageToken, maxResults: 50 });
    for (const item of data.items ?? []) yield item;
    pageToken = data.nextPageToken;
  } while (pageToken);
}

async function listAllPlaylists(channelId) {
  const playlists = [];
  for await (const p of paginate('playlists', {
    part: 'snippet,contentDetails',
    channelId,
  })) {
    playlists.push({
      id: p.id,
      title: p.snippet.title,
      description: p.snippet.description,
      itemCount: p.contentDetails.itemCount,
    });
  }
  return playlists;
}

async function listPlaylistItems(playlistId) {
  const items = [];
  for await (const it of paginate('playlistItems', {
    part: 'snippet,contentDetails',
    playlistId,
  })) {
    // Skip deleted/private items (videoId still present but title is "Deleted video").
    if (!it.contentDetails?.videoId) continue;
    items.push({
      videoId: it.contentDetails.videoId,
      title: it.snippet.title,
      publishedAt: it.contentDetails.videoPublishedAt ?? it.snippet.publishedAt,
      position: it.snippet.position,
    });
  }
  return items;
}

// videos.list accepts up to 50 IDs at a time for a batched lookup. We pull
// contentDetails (ISO-8601 duration for the corner badge) and statistics
// (viewCount, used to rank which video to surface on a wiki page) together.
async function fetchVideoMeta(videoIds) {
  const out = new Map();
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const data = await api('videos', {
      part: 'contentDetails,statistics',
      id: batch.join(','),
    });
    for (const v of data.items ?? []) {
      out.set(v.id, {
        duration: v.contentDetails?.duration ?? null,
        // viewCount is a string in the API; coerce to number, default 0 for
        // videos with stats hidden by the uploader.
        views: v.statistics?.viewCount != null ? Number(v.statistics.viewCount) : 0,
      });
    }
  }
  return out;
}

function iso8601ToMmss(iso) {
  if (!iso) return null;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return null;
  const h = parseInt(m[1] ?? '0', 10);
  const min = parseInt(m[2] ?? '0', 10);
  const s = parseInt(m[3] ?? '0', 10);
  const totalMin = h * 60 + min;
  return `${String(totalMin).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

async function main() {
  let channelId = CHANNEL_ID_OVERRIDE;
  let channelTitle = HANDLE;
  if (!channelId) {
    const resolved = await resolveChannelId(HANDLE);
    channelId = resolved.id;
    channelTitle = resolved.title;
  }
  console.log(`Channel: ${channelTitle} (${channelId})`);

  const playlists = await listAllPlaylists(channelId);
  console.log(`Found ${playlists.length} playlists; expanding…`);

  // Expand each playlist serially to keep the quota math predictable and to
  // produce a stable progress log.
  for (const pl of playlists) {
    const items = await listPlaylistItems(pl.id);
    pl.items = items;
    process.stdout.write(`  ${pl.title} — ${items.length} items\n`);
  }

  // Batch-fetch duration + view count across all videos.
  const allVideoIds = playlists.flatMap(p => p.items.map(i => i.videoId));
  const uniqueIds = Array.from(new Set(allVideoIds));
  console.log(`Fetching duration + views for ${uniqueIds.length} unique videos…`);
  const meta = await fetchVideoMeta(uniqueIds);
  for (const pl of playlists) {
    for (const item of pl.items) {
      const m = meta.get(item.videoId);
      item.duration = iso8601ToMmss(m?.duration);
      item.views = m?.views ?? 0;
    }
  }

  const payload = {
    channelId,
    channelTitle,
    handle: HANDLE,
    fetchedAt: new Date().toISOString(),
    playlists,
  };

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`\nWrote ${OUT_PATH}`);
  console.log(
    `${playlists.length} playlists, ${allVideoIds.length} total items (${uniqueIds.length} unique).`,
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
