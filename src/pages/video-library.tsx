import React from 'react';
import Layout from '@theme/Layout';
import VideoLibrary from '@site/src/components/VideoLibrary';

export default function VideoLibraryPage() {
  return (
    <Layout
      title="Video Library"
      description="Searchable, filterable library of curated operative and didactic videos for reconstructive urology and urogynecology."
    >
      <main className="container margin-vert--lg vl-page">
        <h1>Video Library</h1>
        <p className="vl-intro">
          Operative and didactic videos for reconstructive urology, functional urology and urogynecology from the{' '}
          <a href="https://www.youtube.com/@warwikihq/playlists" target="_blank" rel="noopener noreferrer">
            WARWIKI YouTube channel
          </a>{' '}
          playlists. Tap a topic to narrow the list, filter by playlist, or search any title; videos play in place.
        </p>

        <VideoLibrary />
      </main>
    </Layout>
  );
}
