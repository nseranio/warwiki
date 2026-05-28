import React from 'react';
import Layout from '@theme/Layout';
import VideoLibrary from '@site/src/components/VideoLibrary';

export default function VideoLibraryPage() {
  return (
    <Layout
      title="Video Library"
      description="Searchable, filterable library of curated operative and didactic videos for reconstructive urology and urogynecology."
    >
      <main className="container margin-vert--lg" style={{ maxWidth: 1280 }}>
        <h1>Video Library</h1>
        <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.95rem', maxWidth: 760 }}>
          A searchable index of curated operative and didactic videos across reconstructive
          urology, functional urology, and urogynecology — drawn from the{' '}
          <a href="https://www.youtube.com/@warwikihq/playlists" target="_blank" rel="noopener noreferrer">
            WARWIKI YouTube channel
          </a>{' '}
          and partner channels (GURS, TURNS, AUGS, society video libraries). Filter by topic or
          playlist, or search any title; click any thumbnail to play inline.
        </p>

        <VideoLibrary />

        <details style={{ marginTop: '2.5rem', fontSize: '0.85rem' }}>
          <summary>About this library</summary>
          <p>
            Entries are stored in <code>src/data/videos.ts</code>. Each record carries an optional{' '}
            <code>articleSlug</code> back-link so a thumbnail can route into the corresponding wiki
            page. Subspecialty tagging follows the same "prove it" convention as the{' '}
            <a href="/quiz">quiz</a>: claim GURS or URPS only when the content is something the
            other fellowship would not be expected to own; default to <em>combined</em> otherwise.
          </p>
          <p>
            The seed set below contains placeholder entries. Real videos will be ingested
            programmatically from the WARWIKI playlists via a future YouTube Data API extractor.
          </p>
        </details>
      </main>
    </Layout>
  );
}
