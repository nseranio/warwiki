import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import ArticleListener from '@site/src/components/ArticleListener';
import CitationTooltips from '@site/src/components/CitationTooltips';
import EvidenceStatus from '@site/src/components/EvidenceStatus';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): React.ReactElement {
  const { frontMatter } = useDoc();
  const review = frontMatter as typeof frontMatter & {
    evidenceUpdated?: unknown; evidenceNote?: unknown; lastReviewed?: unknown; reviewer?: unknown;
  };
  // Hide TTS on any page that sets hide_title: true — all section landings,
  // sub-section landings, and database index pages use this convention.
  // True article pages do not set hide_title, so they always get the player.
  const showListener = !frontMatter.hide_title;

  return (
    <>
      {!frontMatter.hide_title && <EvidenceStatus evidenceUpdated={review.evidenceUpdated} evidenceNote={review.evidenceNote} lastReviewed={review.lastReviewed} reviewer={review.reviewer} />}
      {showListener && <ArticleListener />}
      <Content {...props} />
      <CitationTooltips />
    </>
  );
}
