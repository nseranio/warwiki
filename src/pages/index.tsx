import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {usePluginData} from '@docusaurus/useGlobalData';

import stats from '@site/src/data/stats.json';

import styles from './index.module.css';

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

type RecentPage = {
  title: string;
  permalink: string;
  section: string;
  sectionKey: string;
  updatedAt: number;
};

type HomeData = {
  recent: RecentPage[];
  sections: Record<string, number>;
  videos: number;
};

// Fill the DocSearch modal with a suggested query. The chip is also a plain
// link to the search page, used when the modal input cannot be found.
function searchFor(query: string) {
  openSearch();
  const started = Date.now();
  const fill = () => {
    const input = document.querySelector<HTMLInputElement>('.DocSearch-Input');
    if (input) {
      // Give DocSearch a moment to attach its handlers; a query typed into
      // the input as it mounts is shown but never searched.
      window.setTimeout(() => {
        const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        setValue?.call(input, query);
        input.dispatchEvent(new Event('input', {bubbles: true}));
        input.focus();
      }, 200);
    } else if (Date.now() - started < 2000) {
      window.setTimeout(fill, 50);
    } else {
      window.location.assign(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  window.setTimeout(fill, 50);
}

const SUGGESTED_SEARCHES = [
  'Urethral stricture',
  'Sacrocolpopexy',
  'Sacral neuromodulation',
  'Urodynamics',
];

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
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
          <span className={styles.heroSearchPlaceholder}>Where should we start?</span>
          <span className={styles.heroSearchKeys}>
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </span>
        </button>
        <div className={styles.trySearches}>
          <span className={styles.tryLabel}>Try:</span>
          {SUGGESTED_SEARCHES.map((query) => (
            <a
              key={query}
              href={`/search?q=${encodeURIComponent(query)}`}
              className={styles.tryChip}
              onClick={(event) => {
                event.preventDefault();
                searchFor(query);
              }}>
              {query}
            </a>
          ))}
        </div>
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

type SectionCard = {
  key: string;
  accent: string;
  title: string;
  to: string;
  description: string;
  cta: string;
};

const SECTION_CARDS: SectionCard[] = [
  {
    key: 'foundations',
    accent: 'foundations',
    title: 'Foundations',
    to: '/docs/foundations',
    description: 'Anatomy, surgical principles and skills, perioperative care, pharmacology, instruments and biomaterials.',
    cta: 'Explore Foundations',
  },
  {
    key: 'evaluation',
    accent: 'evaluation',
    title: 'Evaluation',
    to: '/docs/evaluation',
    description: 'History, examination, imaging, urodynamics and laboratory workup before reconstruction.',
    cta: 'Explore Evaluation',
  },
  {
    key: 'clinical-conditions',
    accent: 'conditions',
    title: 'Clinical Conditions',
    to: '/docs/clinical-conditions',
    description: 'Storage and voiding disorders, pelvic support, neurogenic bladder, upper tract, fistula, genital and pelvic pain.',
    cta: 'Explore Conditions',
  },
  {
    key: 'surgical-techniques',
    accent: 'atlas',
    title: 'Treatment Atlas',
    to: '/docs/surgical-techniques',
    description: 'Searchable technique databases for urethral, bladder, upper-tract, prolapse, fistula and prosthetic surgery.',
    cta: 'Open the Atlas',
  },
  {
    key: 'special-populations',
    accent: 'populations',
    title: 'Special Populations',
    to: '/docs/special-populations',
    description: 'Trauma and emergencies, gender-affirming care, cancer survivorship, women’s health and lifelong care.',
    cta: 'Explore Populations',
  },
];

function HomepageSections() {
  const {sections, videos} = usePluginData('warwiki-home-data') as HomeData;
  return (
    <section className={styles.homeSection} aria-labelledby="browse-heading">
      <div className={styles.homeSectionHeader}>
        <Heading as="h2" id="browse-heading" className={styles.homeHeading}>Browse the library</Heading>
      </div>
      <div className={styles.sectionGrid}>
        {SECTION_CARDS.map((card) => (
          <Link key={card.key} to={card.to} className={styles.sectionCard} data-accent={card.accent}>
            <span className={styles.sectionCount}>
              {sections[card.key] ? `${sections[card.key].toLocaleString()} pages` : '\u00a0'}
            </span>
            <span className={styles.sectionTitle}>{card.title}</span>
            <span className={styles.sectionDesc}>{card.description}</span>
            <span className={styles.sectionCta}>{card.cta} →</span>
          </Link>
        ))}
        <Link to="/video-library" className={styles.sectionCard} data-accent="video">
          <span className={styles.sectionCount}>{videos > 0 ? `${videos.toLocaleString()} videos` : '\u00a0'}</span>
          <span className={styles.sectionTitle}>Video Library</span>
          <span className={styles.sectionDesc}>Operative videos grouped by topic, searchable and playable inline.</span>
          <span className={styles.sectionCta}>Watch →</span>
        </Link>
      </div>
    </section>
  );
}

function HomepageRecent() {
  const {recent} = usePluginData('warwiki-home-data') as HomeData;
  if (!recent?.length) return null;
  return (
    <section className={styles.homeSection} aria-labelledby="recent-heading">
      <div className={styles.homeSectionHeader}>
        <Heading as="h2" id="recent-heading" className={clsx(styles.homeHeading, styles.homeHeadingSmall)}>Recently updated</Heading>
      </div>
      <div className={styles.recentGrid}>
        {recent.map((page) => (
          <Link key={page.permalink} to={page.permalink} className={styles.recentCard} data-accent={SECTION_CARDS.find((c) => c.key === page.sectionKey)?.accent}>
            <span className={styles.recentTag}>{page.section}</span>
            <span className={styles.recentTitle}>{page.title}</span>
            <span className={styles.recentDate}>{formatDate(page.updatedAt)}</span>
          </Link>
        ))}
      </div>
    </section>
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
      <main className={styles.homepageRoot}>
        <HomepageHeader />
        <HomepageSections />
        <HomepageRecent />
        <HomepageSocialFooter />
      </main>
    </Layout>
  );
}
