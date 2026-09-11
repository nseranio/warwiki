import React, {useEffect, useState} from 'react';
import { Analytics } from '@vercel/analytics/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({ children }: { children: React.ReactNode }) {
  const {siteConfig} = useDocusaurusContext();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

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
      {children}
      {analyticsEnabled && <Analytics />}
    </>
  );
}
