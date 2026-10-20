import React, { useEffect, useMemo, useState } from 'react';
import { VIDEOS, type VideoEntry } from '@site/src/data/videos';

/**
 * Searchable video library, laid out like WHITWIKI's: a search box with the
 * result count, one-tap topic buttons, playlist and sort selects, then the
 * videos grouped by playlist. Filters are mirrored in the URL
 * (?q=&topic=&playlist=&sort=) so a view can be shared and survives Back.
 */

const IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

type SortMode = 'playlist' | 'recent' | 'popular' | 'longest' | 'shortest' | 'alpha';
const PAGE_SIZE = 24;

const SORT_OPTIONS: Array<{ id: SortMode; label: string }> = [
  { id: 'playlist', label: 'By playlist' },
  { id: 'recent', label: 'Newest' },
  { id: 'popular', label: 'Most viewed' },
  { id: 'longest', label: 'Longest' },
  { id: 'shortest', label: 'Shortest' },
  { id: 'alpha', label: 'A–Z' },
];

// Topic buttons run from the largest topic to the smallest, with "Other" last.
const TOPICS: string[] = (() => {
  const counts = new Map<string, number>();
  for (const v of VIDEOS) if (v.topic) counts.set(v.topic, (counts.get(v.topic) ?? 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => Number(a[0] === 'Other') - Number(b[0] === 'Other') || b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);
})();

function durationToSeconds(d: string | undefined): number {
  if (!d) return 0;
  return d.split(':').map(Number).reduce((total, part) => total * 60 + part, 0);
}

function PlayIcon() {
  return (
    <span className="vc-play-icon" aria-hidden="true">
      <svg viewBox="0 0 68 48" width="56" height="40">
        <path
          d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
          fill="#E02020"
        />
        <path d="M 45,24 27,14 27,34" fill="#FFFFFF" />
      </svg>
    </span>
  );
}

function VideoCard({ v }: { v: VideoEntry }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="vc-card vl-card">
      <div className="vc-media">
        {playing ? (
          <iframe
            className="vc-iframe"
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow={IFRAME_ALLOW}
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="vc-thumb-btn"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${v.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="vc-thumb-img"
            />
            <PlayIcon />
            {v.duration && <span className="vl-duration">{v.duration}</span>}
          </button>
        )}
      </div>
      <div className="vc-body vl-body">
        <div className="vc-title">{v.title}</div>
        {v.topic && <span className="vl-chip">{v.topic}</span>}
        <div className="vl-meta">
          {v.channel && (
            <>
              <span className="vl-meta-channel">{v.channel}</span>
              <span aria-hidden="true"> · </span>
            </>
          )}
          <span>{v.playlist}</span>
          {v.year ? <span> · {v.year}</span> : null}
        </div>
        {v.articleSlug && (
          <a className="vl-meta" href={v.articleSlug}>
            Read the article
          </a>
        )}
      </div>
    </div>
  );
}

export default function VideoLibrary() {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('All');
  const [playlist, setPlaylist] = useState('All');
  const [sort, setSort] = useState<SortMode>('playlist');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Defaults render on the server; the URL is read after hydration, and only
  // then is it written back (`fromUrl` gates the writer).
  const [fromUrl, setFromUrl] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const tp = params.get('topic');
    const pl = params.get('playlist');
    const so = params.get('sort');
    if (q) setSearch(q);
    if (tp && TOPICS.includes(tp)) setTopic(tp);
    if (pl && VIDEOS.some(v => v.playlist === pl)) setPlaylist(pl);
    if (so && SORT_OPTIONS.some(o => o.id === so)) setSort(so as SortMode);
    setFromUrl(true);
  }, []);

  useEffect(() => {
    if (!fromUrl) return;
    const url = new URL(window.location.href);
    const values: Record<string, string> = {
      q: search.trim(),
      topic: topic === 'All' ? '' : topic,
      playlist: playlist === 'All' ? '' : playlist,
      sort: sort === 'playlist' ? '' : sort,
    };
    for (const [k, v] of Object.entries(values)) {
      if (v) url.searchParams.set(k, v);
      else url.searchParams.delete(k);
    }
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url.href);
  }, [fromUrl, search, topic, playlist, sort]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, topic, playlist, sort]);

  // Playlist options narrow to the active topic.
  const playlists = useMemo(() => {
    const scoped = VIDEOS.filter(v => topic === 'All' || v.topic === topic);
    return ['All', ...Array.from(new Set(scoped.map(v => v.playlist))).sort()];
  }, [topic]);

  useEffect(() => {
    if (playlist !== 'All' && !playlists.includes(playlist)) setPlaylist('All');
  }, [playlists, playlist]);

  const filtered = useMemo(() => {
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
    const result = VIDEOS.filter(v => {
      if (topic !== 'All' && v.topic !== topic) return false;
      if (playlist !== 'All' && v.playlist !== playlist) return false;
      if (terms.length) {
        const haystack = [v.title, v.channel, v.playlist, v.topic, ...(v.tags ?? [])].join(' ').toLowerCase();
        if (!terms.every(term => haystack.includes(term))) return false;
      }
      return true;
    });

    // 'playlist' keeps the registry's natural order (topic, then playlist, then title).
    if (sort === 'playlist') return result;

    const sorted = result.slice();
    if (sort === 'recent') sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    else if (sort === 'popular') sorted.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    else if (sort === 'longest') sorted.sort((a, b) => durationToSeconds(b.duration) - durationToSeconds(a.duration));
    // Unknown durations sink to the bottom under shortest-first.
    else if (sort === 'shortest')
      sorted.sort((a, b) => (durationToSeconds(a.duration) || Infinity) - (durationToSeconds(b.duration) || Infinity));
    else if (sort === 'alpha') sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [search, topic, playlist, sort]);

  // Playlist order shows one section per playlist; the other sorts show a single list.
  const groups = useMemo(() => {
    const shown = filtered.slice(0, visibleCount);
    if (sort !== 'playlist') return [['', shown] as [string, VideoEntry[]]];
    const byPlaylist = new Map<string, VideoEntry[]>();
    for (const v of shown) byPlaylist.set(v.playlist, [...(byPlaylist.get(v.playlist) ?? []), v]);
    return Array.from(byPlaylist.entries());
  }, [filtered, visibleCount, sort]);
  const countIn = (name: string) => filtered.filter(v => v.playlist === name).length;

  return (
    <div className="vl-wrapper">
      <div className="vl-controls">
        <div className="vl-search-row">
          <input
            type="search"
            placeholder="Search videos"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search videos"
          />
          <span className="vl-count" aria-live="polite">
            {filtered.length} of {VIDEOS.length}
          </span>
        </div>
        <div className="vl-topics" role="group" aria-label="Topic">
          {['All', ...TOPICS].map(name => (
            <button type="button" key={name} aria-pressed={topic === name} onClick={() => setTopic(name)}>
              {name}
            </button>
          ))}
        </div>
        <div className="vl-selects">
          <select value={playlist} onChange={e => setPlaylist(e.target.value)} aria-label="Filter by playlist">
            {playlists.map(p => (
              <option key={p} value={p}>
                {p === 'All' ? 'All playlists' : p}
              </option>
            ))}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value as SortMode)} aria-label="Sort videos">
            {SORT_OPTIONS.map(o => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="vl-empty">No videos match that search.</p>
      ) : (
        <div id="video-results">
          {groups.map(([name, items]) => (
            <section key={name || 'all'} className="vl-group">
              {name && (
                <h2 className="vl-group-heading">
                  {name}
                  <span className="vl-group-count">{countIn(name)}</span>
                </h2>
              )}
              <div className="vc-grid">
                {items.map((v, i) => (
                  <VideoCard key={`${v.playlist}-${v.id}-${i}`} v={v} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
      {visibleCount < filtered.length && (
        <button
          type="button"
          className="button button--secondary vl-more"
          aria-controls="video-results"
          onClick={() => setVisibleCount(count => count + PAGE_SIZE)}
        >
          Show {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more videos
        </button>
      )}
    </div>
  );
}
