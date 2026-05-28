import React, { useEffect, useMemo, useState } from 'react';
import { VIDEOS, type VideoEntry } from '@site/src/data/videos';

const IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

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
    return VIDEOS.filter(v => {
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
  }, [search, channel, topic, playlist]);

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
        </div>
        <div className="td-count vl-count">
          {filtered.length} of {VIDEOS.length} videos
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="td-empty">No videos match your filters.</div>
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
