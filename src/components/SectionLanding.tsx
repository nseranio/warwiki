import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItem} from '@docusaurus/plugin-content-docs';

/**
 * Section landing built from the sidebar (ported from WHITWIKI), so it always
 * matches the pages that exist. Each top-level category becomes one card listing
 * its visible pages; a nested category is one row that opens it. Hidden pages
 * (sidebar-hidden-item) stay hidden. `cards` maps a card's link (the category
 * link or any page inside it) to its one-line description; the card title opens
 * that link, so a group can still open on its first sidebar page.
 */

type Row = {label: string; href: string};

const norm = (href: string) => href.replace(/\/$/, '');

function hidden(item: PropSidebarItem): boolean {
  return 'className' in item && !!item.className?.includes('sidebar-hidden');
}

function firstHref(items: PropSidebarItem[]): string | undefined {
  for (const item of items) {
    if (hidden(item)) continue;
    if (item.type === 'link') return item.href;
    if (item.type === 'category') {
      const href = item.href ?? firstHref(item.items);
      if (href) return href;
    }
  }
  return undefined;
}

function allHrefs(item: PropSidebarItem): string[] {
  if (item.type === 'link') return [norm(item.href)];
  if (item.type === 'category') return [...(item.href ? [norm(item.href)] : []), ...item.items.flatMap(allHrefs)];
  return [];
}

function rowsOf(items: PropSidebarItem[]): Row[] {
  return items.flatMap((item): Row[] => {
    if (hidden(item)) return [];
    if (item.type === 'link') return [{label: item.label, href: item.href}];
    if (item.type === 'category') {
      const href = item.href ?? firstHref(item.items);
      return href ? [{label: item.label, href}] : [];
    }
    return [];
  });
}

function slug(label: string): string {
  return label.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function SectionLanding({cards = {}}: {cards?: Record<string, React.ReactNode>}): React.ReactElement | null {
  const sidebar = useDocsSidebar();
  const here = norm(useLocation().pathname);
  if (!sidebar) return null;
  const entries = Object.entries(cards).map(([href, desc]) => [norm(href), desc] as const);
  const items = sidebar.items.filter(item =>
    !hidden(item) && !(item.type === 'link' && (norm(item.href) === here || item.docId?.endsWith('/index'))));
  return (
    <div className="wk-sl">
      {items.map(item => {
        if (item.type !== 'link' && item.type !== 'category') return null;
        const hrefs = allHrefs(item);
        const match = entries.find(([href]) => hrefs.includes(href));
        const desc = match?.[1];
        if (item.type === 'link') {
          return (
            <Link key={item.href} className="wk-sl-card wk-sl-card--single" to={item.href} id={slug(item.label)}>
              <span className="wk-sl-card-title">{item.label}</span>
              {desc && <span className="wk-sl-card-desc">{desc}</span>}
            </Link>
          );
        }
        const rows = rowsOf(item.items).filter(row => norm(row.href) !== here && norm(row.href) !== norm(item.href ?? ''));
        const titleHref = match?.[0] ?? item.href ?? rows[0]?.href;
        const id = slug(item.label);
        return (
          <section key={item.label} className="wk-sl-card" id={id} aria-labelledby={`landing-${id}`}>
            <h2 id={`landing-${id}`} className="wk-sl-card-title">
              {titleHref ? <Link to={titleHref}>{item.label}</Link> : item.label}
            </h2>
            {desc && <p className="wk-sl-card-desc">{desc}</p>}
            {rows.length > 0 && (
              <ul className="wk-sl-rows">
                {rows.map(row => (
                  <li key={row.href}>
                    <Link className="wk-sl-row" to={row.href}>{row.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
