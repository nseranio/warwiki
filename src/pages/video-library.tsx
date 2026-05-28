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
      </main>
    </Layout>
  );
}
