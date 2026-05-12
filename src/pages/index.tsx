import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import stats from '@site/src/data/stats.json';

import styles from './index.module.css';

const SEARCH_PLACEHOLDERS = [
  'Where should we start?',
  "What's the chief complaint?",
  'Mobilize, spatulate, search.',
  'Tension-free results ahead.',
  'Restore continuity.',
  'Anastomose to an answer.',
  'Bridge the gap.',
  'Choose your approach.',
  "What's holding you up?",
  'Reconstruct your question here.',
  'Continence in three sentences or fewer.',
  "What's the fistula du jour?",
  'Pressure-flow into the literature.',
  'Two-stage your search.',
  'Diversion welcome.',
  'Stricture-free search guaranteed.',
  'Detrusor your curiosity here.',
  'Spatulate widely.',
  'Tension-free, watertight, multilayered answers.',
  "What's leaking your attention?",
];

function openSearch() {
  const btn = document.querySelector<HTMLButtonElement>('.navbar .DocSearch-Button');
  if (btn) {
    btn.click();
  } else {
    document.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'k', metaKey: true, ctrlKey: true, bubbles: true}),
    );
  }
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  // SSR renders the first placeholder; client picks a random one after mount
  // to avoid hydration mismatch.
  const [placeholder, setPlaceholder] = useState(SEARCH_PLACEHOLDERS[0]);
  useEffect(() => {
    const idx = Math.floor(Math.random() * SEARCH_PLACEHOLDERS.length);
    setPlaceholder(SEARCH_PLACEHOLDERS[idx]);
  }, []);
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          <Link to="/docs/foundations" className={styles.heroTitleLink}>
            {siteConfig.title}
          </Link>
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <button
          type="button"
          className={styles.heroSearch}
          onClick={openSearch}
          aria-label="Open search">
          <svg
            className={styles.heroSearchIcon}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className={styles.heroSearchPlaceholder}>{placeholder}</span>
          <span className={styles.heroSearchKeys}>
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </span>
        </button>
        <p className={styles.heroStats}>
          <span className={styles.heroStatsNumber}>{stats.articlesRounded.toLocaleString()}+</span>{' '}
          <span className={styles.heroStatsLabel}>articles</span>
          <span className={styles.heroStatsDot} aria-hidden="true">·</span>
          <span className={styles.heroStatsNumber}>{stats.referencesRounded.toLocaleString()}+</span>{' '}
          <span className={styles.heroStatsLabel}>references</span>
        </p>
      </div>
    </header>
  );
}

type SocialLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://youtube.com/@warwikihq',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com/warwikihq',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: 'https://tiktok.com/@warwiki7',
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.5 2h3.3c.2 2 1.1 3.7 2.6 4.8 1 .8 2.3 1.2 3.6 1.2v3.6c-1.7 0-3.4-.5-4.9-1.4v6.7a6.7 6.7 0 1 1-6.7-6.7c.4 0 .8 0 1.2.1v3.7a3 3 0 1 0 2.1 2.9V2z" />
      </svg>
    ),
  },
  {
    href: 'https://twitter.com/warwikihq',
    label: 'Twitter / X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82L4.99 21.75H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
      </svg>
    ),
  },
];

function HomepageSocialFooter() {
  return (
    <section className={styles.socialFooter} aria-labelledby="social-heading">
      <div className={styles.socialInner}>
        <p id="social-heading" className={styles.socialLabel}>Follow WARWIKI</p>
        <div className={styles.socialIcons}>
          {SOCIAL_LINKS.map(({href, label, icon}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={styles.socialIconLink}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The functional reconstructive urology wiki.">
      <div className={styles.homepageRoot}>
        <HomepageHeader />
        <HomepageSocialFooter />
      </div>
    </Layout>
  );
}
