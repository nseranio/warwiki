import React, { useEffect, useMemo, useState } from 'react';
import { VIDEOS, type VideoEntry } from '@site/src/data/videos';

const IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

type SortMode = 'playlist' | 'recent' | 'longest' | 'shortest' | 'alpha';
type ViewMode = 'grid' | 'grouped';

const SORT_OPTIONS: Array<{ id: SortMode; label: string }> = [
  { id: 'playlist', label: 'Playlist order' },
  { id: 'recent', label: 'Recently uploaded' },
  { id: 'longest', label: 'Longest first' },
  { id: 'shortest', label: 'Shortest first' },
  { id: 'alpha', label: 'Alphabetical' },
];

function durationToSeconds(d: string | undefined): number {
  if (!d) return 0;
  const parts = d.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
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
        <div className="vl-meta">
          <span className="vl-meta-channel">{v.channel}</span>
          <span className="vl-meta-dot">·</span>
          <span className="vl-meta-playlist">{v.playlist}</span>
        </div>
        {(v.topic || v.articleSlug) && (
          <div className="vl-chip-row">
            {v.topic && <span className="vl-chip vl-chip--topic">{v.topic}</span>}
            {v.articleSlug && (
              <a className="vl-chip vl-chip--link" href={v.articleSlug}>
                Open article →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VideoLibrary() {
  const [search, setSearch] = useState('');
  const [channel, setChannel] = useState('All');
  const [topic, setTopic] = useState('All');
  const [playlist, setPlaylist] = useState('All');
  const [sort, setSort] = useState<SortMode>('playlist');
  const [view, setView] = useState<ViewMode>('grid');

  const channels = useMemo(
    () => ['All', ...Array.from(new Set(VIDEOS.map(v => v.channel))).sort()],
    [],
  );
  const topics = useMemo(
    () => ['All', ...Array.from(new Set(VIDEOS.map(v => v.topic).filter(Boolean))).sort()],
    [],
  );
  // Playlist options narrow to the active topic so the dropdown only ever
  // shows playlists that actually have results under the current view.
  const playlists = useMemo(() => {
    const scoped = VIDEOS.filter(v => topic === 'All' || v.topic === topic);
    return ['All', ...Array.from(new Set(scoped.map(v => v.playlist))).sort()];
  }, [topic]);

  useEffect(() => {
    if (playlist !== 'All' && !playlists.includes(playlist)) setPlaylist('All');
  }, [playlists, playlist]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const result = VIDEOS.filter(v => {
      if (channel !== 'All' && v.channel !== channel) return false;
      if (topic !== 'All' && v.topic !== topic) return false;
      if (playlist !== 'All' && v.playlist !== playlist) return false;
      if (q) {
        const haystack = [
          v.title,
          v.channel,
          v.playlist,
          v.topic,
          ...(v.tags ?? []),
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    // Sort. 'playlist' keeps the registry's natural order (already sorted by
    // topic → playlist → title in the generator).
    if (sort === 'playlist') return result;

    const sorted = result.slice();
    if (sort === 'recent') {
      sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    } else if (sort === 'longest') {
      sorted.sort((a, b) => durationToSeconds(b.duration) - durationToSeconds(a.duration));
    } else if (sort === 'shortest') {
      sorted.sort((a, b) => {
        const da = durationToSeconds(a.duration);
        const db = durationToSeconds(b.duration);
        // Treat 0-duration (unknown) as "very long" so it sinks to the bottom
        // under shortest-first rather than dominating the head.
        return (da || Infinity) - (db || Infinity);
      });
    } else if (sort === 'alpha') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [search, channel, topic, playlist, sort]);

  // For grouped view: bucket the filtered+sorted result by topic. Groups are
  // emitted in the order they first appear in `filtered`, so the active sort
  // mode determines group order too (e.g., under "Recently uploaded" the
  // topic that has the newest video appears first).
  const grouped = useMemo(() => {
    if (view !== 'grouped') return null;
    const map = new Map<string, VideoEntry[]>();
    for (const v of filtered) {
      const key = v.topic || 'Other';
      const arr = map.get(key);
      if (arr) arr.push(v);
      else map.set(key, [v]);
    }
    return Array.from(map.entries());
  }, [view, filtered]);

  return (
    <div className="vl-wrapper">
      <div className="vl-controls">
        <input
          type="search"
          placeholder="Search videos by title, tag, or playlist…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="td-search vl-search"
          aria-label="Search videos"
        />
        <div className="vl-selects">
          {channels.length > 2 && (
            <select
              value={channel}
              onChange={e => setChannel(e.target.value)}
              className="td-select"
              aria-label="Filter by channel"
            >
              {channels.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All channels' : c}
                </option>
              ))}
            </select>
          )}
          <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="td-select"
            aria-label="Filter by topic"
          >
            {topics.map(t => (
              <option key={t} value={t}>
                {t === 'All' ? 'All topics' : t}
              </option>
            ))}
          </select>
          <select
            value={playlist}
            onChange={e => setPlaylist(e.target.value)}
            className="td-select"
            aria-label="Filter by playlist"
          >
            {playlists.map(p => (
              <option key={p} value={p}>
                {p === 'All' ? 'All playlists' : p}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortMode)}
            className="td-select"
            aria-label="Sort videos"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="vl-view-toggle" role="tablist" aria-label="View mode">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'grid'}
            className={`vl-view-btn${view === 'grid' ? ' vl-view-btn--active' : ''}`}
            onClick={() => setView('grid')}
            title="Flat grid"
          >
            Grid
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'grouped'}
            className={`vl-view-btn${view === 'grouped' ? ' vl-view-btn--active' : ''}`}
            onClick={() => setView('grouped')}
            title="Grouped by topic"
          >
            Grouped
          </button>
        </div>
        <div className="td-count vl-count">
          {filtered.length} of {VIDEOS.length} videos
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="td-empty">No videos match your filters.</div>
      ) : view === 'grouped' && grouped ? (
        <div className="vl-grouped">
          {grouped.map(([topicName, items]) => (
            <section key={topicName} className="vl-group">
              <h2 className="vl-group-heading">
                {topicName}
                <span className="vl-group-count">{items.length}</span>
              </h2>
              <div className="vc-grid vl-grid">
                {items.map((v, i) => (
                  <VideoCard key={`${v.id}-${i}`} v={v} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="vc-grid vl-grid">
          {filtered.map((v, i) => (
            <VideoCard key={`${v.id}-${i}`} v={v} />
          ))}
        </div>
      )}
    </div>
  );
}
