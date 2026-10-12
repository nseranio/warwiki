// Delete the pre-October 3, 2026 article audio (tts-1 voices) from Vercel Blob.
// Current Marin/gpt-4o-mini-tts audio shares the tts/audio/ prefix but was
// uploaded after the switch (commit b801aa11, 2026-10-03 11:28 EDT), so only
// older files are removed. Dry run by default; pass --delete to delete.
// Usage: BLOB_READ_WRITE_TOKEN=... node scripts/delete-old-tts-audio.mjs [--delete]
import { list, del } from '@vercel/blob';

const CUTOVER = new Date('2026-10-03T15:28:55Z');
const doDelete = process.argv.includes('--delete');
const old = [];
let kept = 0;
let cursor;
do {
  const page = await list({ prefix: 'tts/audio/', cursor, limit: 1000 });
  for (const b of page.blobs) {
    if (new Date(b.uploadedAt) < CUTOVER) old.push(b);
    else kept += 1;
  }
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

const mb = (old.reduce((s, b) => s + b.size, 0) / 1e6).toFixed(1);
console.log(`Old (before cutover): ${old.length} files, ${mb} MB. Current (kept): ${kept}.`);
if (!doDelete) {
  console.log('Dry run. Re-run with --delete to remove the old files.');
} else {
  for (let i = 0; i < old.length; i += 100) await del(old.slice(i, i + 100).map((b) => b.url));
  console.log(`Deleted ${old.length} files.`);
}
