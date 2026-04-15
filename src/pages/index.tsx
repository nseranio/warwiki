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
