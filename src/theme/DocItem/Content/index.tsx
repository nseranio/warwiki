import React from 'react';
import { useLocation } from '@docusaurus/router';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import ArticleListener from '@site/src/components/ArticleListener';
import CitationTooltips from '@site/src/components/CitationTooltips';

type Props = WrapperProps<typeof ContentType>;

// Top-level section landings where the TTS player should NOT appear.
// These are navigational hub pages, not articles meant to be read aloud.
const LANDING_PATHS = new Set([
  '/docs/foundations',
  '/docs/evaluation',
  '/docs/clinical-conditions',
  '/docs/surgical-techniques',
  '/docs/special-populations',
  '/docs/journal-club',
  '/docs/resources',
  '/docs/roots',
]);

function isLandingPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, '');
  return LANDING_PATHS.has(normalized);
}

export default function ContentWrapper(props: Props): JSX.Element {
  const { pathname } = useLocation();
  const showListener = !isLandingPath(pathname);

  return (
    <>
      {showListener && <ArticleListener />}
      <Content {...props} />
      <CitationTooltips />
    </>
  );
}
