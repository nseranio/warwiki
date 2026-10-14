import React from 'react';

export interface PodcastEpisode {
  title: string;
  show: string; // e.g. "BackTable Urology, Ep. 66"
  url: string;
  guests?: string;
  year?: string;
}

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function PodcastCards({ episodes }: { episodes: PodcastEpisode[] }): React.ReactElement {
  return (
    <div className="web-grid">
      {episodes.map((e) => (
        <a key={e.url} className="web-card web-card--podcast" href={e.url} target="_blank" rel="noopener noreferrer">
          <div className="web-card-name">{e.title}</div>
          <div className="web-card-desc">
            {e.show}
            {e.year ? ` (${e.year})` : ''}
            {e.guests ? ` · ${e.guests}` : ''}
          </div>
          <div className="web-card-url">{host(e.url)}</div>
        </a>
      ))}
    </div>
  );
}
