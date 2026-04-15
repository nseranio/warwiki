import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

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

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <svg
        className={styles.heroLines}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true">
        <defs>
          <linearGradient id="heroLineStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="20%" stopColor="rgba(200,220,255,0.5)" />
            <stop offset="80%" stopColor="rgba(150,190,240,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="heroLineStrokeFaint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(180,210,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <g fill="none" strokeWidth="1.25" stroke="url(#heroLineStroke)">
          <path className={styles.line1} d="M -100 220 C 300 120, 700 420, 1100 260 S 1700 140, 1900 300" />
          <path className={styles.line2} d="M -100 340 C 350 260, 750 560, 1150 380 S 1700 280, 1900 440" />
          <path className={styles.line3} d="M -100 480 C 400 400, 800 700, 1200 520 S 1700 420, 1900 580" />
        </g>
        <g fill="none" strokeWidth="1" stroke="url(#heroLineStrokeFaint)">
          <path className={styles.line4} d="M -100 140 C 250 60, 650 320, 1050 180 S 1700 60, 1900 220" />
          <path className={styles.line5} d="M -100 620 C 400 540, 800 820, 1200 660 S 1700 560, 1900 720" />
          <path className={styles.line6} d="M -100 780 C 350 700, 750 960, 1150 820 S 1700 720, 1900 880" />
        </g>
        <g fill="rgba(200,220,255,0.55)" className={styles.dots}>
          <circle cx="180" cy="220" r="2.5" />
          <circle cx="520" cy="340" r="2" />
          <circle cx="880" cy="280" r="2.5" />
          <circle cx="1240" cy="400" r="2" />
          <circle cx="1420" cy="520" r="2.5" />
          <circle cx="340" cy="560" r="2" />
          <circle cx="760" cy="640" r="2.5" />
          <circle cx="1100" cy="720" r="2" />
        </g>
      </svg>
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
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The functional reconstructive urology wiki.">
      <HomepageHeader />
    </Layout>
  );
}
