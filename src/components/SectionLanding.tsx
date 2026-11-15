import React, {useEffect, useState} from 'react';
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
 * the group's own landing page when it has one; otherwise the title is plain text
 * and every page in the group is listed under it.
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

type Entry = readonly [string, React.ReactNode];

function Card({item, entries, here, level}: {item: PropSidebarItem; entries: Entry[]; here: string; level: 2 | 3}): React.ReactElement | null {
  if (item.type !== 'link' && item.type !== 'category') return null;
  const hrefs = allHrefs(item);
  const match = entries.find(([href]) => hrefs.includes(href));
  const desc = match?.[1];
  if (item.type === 'link') {
    return (
      <Link className="wk-sl-card wk-sl-card--single" to={item.href} id={slug(item.label)}>
        <span className="wk-sl-card-title">{item.label}</span>
        {desc && <span className="wk-sl-card-desc">{desc}</span>}
      </Link>
    );
  }
  const rows = rowsOf(item.items).filter(row => norm(row.href) !== here && norm(row.href) !== norm(item.href ?? ''));
  // A group without its own landing page has no title link: its pages are all listed below it.
  const titleHref = item.href;
  const id = slug(item.label);
  const H = level === 2 ? 'h2' : 'h3';
  return (
    <section className="wk-sl-card" id={id} aria-labelledby={`landing-${id}`}>
      <H id={`landing-${id}`} className="wk-sl-card-title">
        {titleHref ? <Link to={titleHref}>{item.label}</Link> : item.label}
      </H>
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
}

/** Pinned row of group buttons: smooth scroll to a group, and the group in view stays highlighted. */
function JumpNav({ids}: {ids: ReadonlyArray<readonly [string, string]>}): React.ReactElement {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map(([id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target.id, e.isIntersecting));
      const first = ids.find(([id]) => seen.get(id));
      if (first) setActive(first[0]);
    }, {rootMargin: '-140px 0px -55% 0px'});
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [ids.map(([id]) => id).join('|')]);
  useEffect(() => {
    // keep the highlighted button visible in the row on a phone
    if (!active) return;
    document.querySelector(`.wk-sl-jump a[data-id="${active}"]`)?.scrollIntoView({block: 'nearest', inline: 'center'});
  }, [active]);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: 'start'});
    history.replaceState(null, '', `#${id}`);
    setActive(id);
  };
  return (
    <nav className="wk-sl-jump" aria-label="Groups on this page">
      {ids.map(([id, label]) => (
        <a key={id} href={`#${id}`} data-id={id} aria-current={active === id ? 'true' : undefined} onClick={e => go(e, id)}>{label}</a>
      ))}
    </nav>
  );
}

/** A group's children as cards: its subgroups, plus one card for pages that sit directly in it. */
function childCards(group: PropSidebarItem & {type: 'category'}): PropSidebarItem[] {
  const kids = group.items.filter(i => !hidden(i));
  const direct = kids.filter(i => i.type === 'link');
  const cats = kids.filter(i => i.type === 'category');
  if (!direct.length) return cats;
  const loose = {type: 'category', label: cats.length ? `More in ${group.label}` : group.label, items: direct, collapsed: false, collapsible: false} as unknown as PropSidebarItem;
  return cats.length ? [...cats, loose] : [loose];
}

export default function SectionLanding({cards = {}, sections = false}: {cards?: Record<string, React.ReactNode>; sections?: boolean}): React.ReactElement | null {
  const sidebar = useDocsSidebar();
  const here = norm(useLocation().pathname);
  if (!sidebar) return null;
  const entries: Entry[] = Object.entries(cards).map(([href, desc]) => [norm(href), desc] as const);
  // A group's landing page (the link of a top-level category, as in Clinical Care)
  // lists that group's contents; a section landing lists the whole sidebar.
  const group = sidebar.items.find(item => item.type === 'category' && item.href && norm(item.href) === here);
  const scope = group && group.type === 'category' ? group.items : sidebar.items;
  const items = scope.filter(item =>
    !hidden(item) && !(item.type === 'link' && (norm(item.href) === here || item.docId?.endsWith('/index'))));
  if (sections) {
    // Hub: each group is a heading with every subgroup and page listed under it,
    // so no page is reachable only from the sidebar.
    const groups = items.filter((i): i is PropSidebarItem & {type: 'category'} => i.type === 'category');
    return (
      <div className="wk-sl-hub">
        <JumpNav ids={groups.map(g => [slug(g.label), g.label] as const)} />
        {groups.map(g => {
          const id = slug(g.label);
          const desc = entries.find(([href]) => g.href && norm(g.href) === href)?.[1];
          return (
            <section key={g.label} className="wk-sl-section" id={id} aria-labelledby={`hub-${id}`}>
              <h2 id={`hub-${id}`} className="wk-sl-section-title">{g.href ? <Link to={g.href}>{g.label}</Link> : g.label}</h2>
              {desc && <p className="wk-sl-section-desc">{desc}</p>}
              <div className="wk-sl">
                {childCards(g).map((c, i) => <Card key={'label' in c ? c.label : i} item={c} entries={entries} here={here} level={3} />)}
              </div>
            </section>
          );
        })}
      </div>
    );
  }
  return (
    <div className="wk-sl">
      {items.map(item => <Card key={'href' in item && item.href ? item.href : 'label' in item ? item.label : String(item.type)} item={item} entries={entries} here={here} level={2} />)}
    </div>
  );
}
