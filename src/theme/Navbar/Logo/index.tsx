import React, {useEffect, useId, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// Keep this small component identical in both independent repositories.
const references = [
  {name: 'WARWIKI', url: 'https://warwiki.org', specialty: 'Reconstruction & functional urology', color: 'war'},
  {name: 'WHITWIKI', url: 'https://whitwiki.org', specialty: 'Urologic oncology', color: 'whit'},
];

export default function NavbarLogo() {
  const {siteConfig} = useDocusaurusContext();
  const {pathname} = useLocation();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div ref={container} className={styles.brand} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <Link to="/" className={`navbar__brand ${styles.home}`} aria-label={`${siteConfig.title} home`}>
        <b className="navbar__title text--truncate">{siteConfig.title}</b>
      </Link>
      <button ref={trigger} type="button" className={styles.trigger}
        aria-label="Switch reference" aria-expanded={open} aria-controls={panelId}
        onClick={() => setOpen(value => !value)}>
        <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
          <path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </button>
      {open && <nav id={panelId} className={styles.panel} aria-label="Sister references">
        <p className={styles.label}>Choose a reference</p>
        <ul>
          {references.map(reference => {
            const current = reference.name === siteConfig.title;
            return <li key={reference.name}>
              <a href={current ? '/' : reference.url} className={styles.choice}
                aria-current={current ? 'true' : undefined} onClick={() => setOpen(false)}>
                <span className={styles.row}>
                  <strong className={styles[reference.color]}>{reference.name}</strong>
                  {current && <span className={styles.current}>Current</span>}
                </span>
                <span className={styles.specialty}>{reference.specialty}</span>
              </a>
            </li>;
          })}
        </ul>
      </nav>}
    </div>
  );
}
