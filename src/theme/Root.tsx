import React, {useEffect, useState} from 'react';
import { Analytics } from '@vercel/analytics/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';

// Top-level docs section → accent key used by html[data-section] in custom.css.
const SECTION_ACCENTS: Record<string, string> = {
  foundations: 'foundations',
  evaluation: 'evaluation',
  'clinical-conditions': 'conditions',
  'surgical-techniques': 'atlas',
  'special-populations': 'populations',
};

export default function Root({ children }: { children: React.ReactNode }) {
  const {siteConfig} = useDocusaurusContext();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const {pathname} = useLocation();
  const [, root, section] = pathname.split('/');
  const accent = root === 'docs' ? SECTION_ACCENTS[section] : undefined;

  useEffect(() => {
    // Static previews do not serve Vercel's analytics endpoint. Match the
    // configured public origin after hydration, keeping SSR and previews quiet.
    setAnalyticsEnabled(
      process.env.NODE_ENV === 'production' &&
      window.location.origin === new URL(siteConfig.url).origin &&
      navigator.onLine,
    );
  }, [siteConfig.url]);

  return (
    <>
      {/* Rendered into the server HTML, so the section accent never flashes. */}
      <Head>
        <html data-section={accent ?? 'none'} />
      </Head>
      {children}
      {analyticsEnabled && <Analytics />}
    </>
  );
}
