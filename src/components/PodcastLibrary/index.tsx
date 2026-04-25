import React, { useMemo, useState } from 'react';
import styles from './styles.module.css';

export interface Feed {
  id: string;
  name: string;
  url: string;
  color: string;
  description?: string;
}

export interface Topic {
  id: string;
  title: string;
}

export interface Episode {
  title: string;
  feed: string; // feed id
  ep?: string; // episode number like "158" or "289"
  guest?: string;
  url: string;
  takeaway: string;
  topic: string; // topic id
  year?: string;
}

interface Props {
  episodes: Episode[];
  topics: Topic[];
  feeds: Feed[];
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function PodcastLibrary({ episodes, topics, feeds }: Props): React.ReactElement {
  const [search, setSearch] = useState('');

  const feedById = useMemo(() => {
    const m = new Map<string, Feed>();
    feeds.forEach((f) => m.set(f.id, f));
    return m;
  }, [feeds]);

  const q = search.toLowerCase().trim();
  const filtered = useMemo(() => {
    if (!q) return episodes;
    return episodes.filter((e) => {
      const feed = feedById.get(e.feed);
      const hay = [
        e.title,
        e.guest || '',
        e.takeaway,
        feed?.name || '',
        feed?.id || '',
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [episodes, feedById, q]);

  const grouped = useMemo(() => {
    const byTopic = new Map<string, Episode[]>();
    topics.forEach((t) => byTopic.set(t.id, []));
    filtered.forEach((e) => {
      if (!byTopic.has(e.topic)) byTopic.set(e.topic, []);
      byTopic.get(e.topic)!.push(e);
    });
    return byTopic;
  }, [filtered, topics]);

  const showingSearch = q.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <input
          type="search"
          placeholder="Search episodes, guests, topics…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
          aria-label="Search podcast episodes"
        />
        <span className={styles.count}>
          {showingSearch ? filtered.length : episodes.length} episodes
        </span>
      </div>

      {!showingSearch && (
        <nav className={styles.topicNav} aria-label="Jump to topic">
          {topics.map((t) => {
            const count = grouped.get(t.id)?.length || 0;
            if (!count) return null;
            return (
              <a key={t.id} href={`#${slugify(t.title)}`} className={styles.topicChip}>
                {t.title}
                <span className={styles.topicCount}>{count}</span>
              </a>
            );
          })}
        </nav>
      )}

      {showingSearch && filtered.length === 0 && (
        <div className={styles.empty}>No episodes match "{search}".</div>
      )}

      {topics.map((t) => {
        const items = grouped.get(t.id) || [];
        if (!items.length) return null;
        return (
          <section key={t.id} className={styles.topicSection} id={slugify(t.title)}>
            <h2 className={styles.topicHeader}>{t.title}</h2>
            <div className={styles.cardList}>
              {items.map((ep, i) => {
                const feed = feedById.get(ep.feed);
                return (
                  <a
                    key={`${ep.url}-${i}`}
                    href={ep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                    style={{ '--feed-color': feed?.color || '#888' } as React.CSSProperties}
                  >
                    <span className={styles.feedTab} aria-hidden="true" />
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{ep.title}</h3>
                      <div className={styles.cardMeta}>
                        <span className={styles.feedName} style={{ color: feed?.color }}>
                          {feed?.name || ep.feed}
                        </span>
                        {ep.ep && (
                          <>
                            <span className={styles.metaDot}>·</span>
                            <span>Ep {ep.ep}</span>
                          </>
                        )}
                        {ep.year && (
                          <>
                            <span className={styles.metaDot}>·</span>
                            <span>{ep.year}</span>
                          </>
                        )}
                        {ep.guest && (
                          <>
                            <span className={styles.metaDot}>·</span>
                            <span className={styles.guest}>{ep.guest}</span>
                          </>
                        )}
                      </div>
                      <p className={styles.takeaway}>{ep.takeaway}</p>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.externalIcon}
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/**
 * Compact feed directory — rendered as a separate component for the
 * "Full feeds to subscribe to" bottom block.
 */
export function PodcastFeedList({ feeds }: { feeds: Feed[] }): React.ReactElement {
  return (
    <ul className={styles.feedList}>
      {feeds.map((f) => (
        <li key={f.id}>
          <a
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.feedCard}
            style={{ '--feed-color': f.color } as React.CSSProperties}
          >
            <span className={styles.feedTab} aria-hidden="true" />
            <div className={styles.feedCardBody}>
              <div className={styles.feedCardTitle}>{f.name}</div>
              {f.description && <div className={styles.feedCardDesc}>{f.description}</div>}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
