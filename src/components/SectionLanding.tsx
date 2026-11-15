import React, {useEffect, useRef, useState} from 'react';
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

/**
 * Row of group buttons that smooth-scroll to a group. Pinned (the Clinical Care hub): it stays under
 * the navbar and the group in view stays highlighted. Unpinned (section landings): a quiet wrapping
 * index at the top of the page, with no highlight to track.
 */
function JumpNav({ids, pinned = true}: {ids: ReadonlyArray<readonly [string, string]>; pinned?: boolean}): React.ReactElement {
  // The first group starts highlighted, as the area filter's "All" does on Clinical Evidence.
  const [active, setActive] = useState<string | null>(pinned ? ids[0]?.[0] ?? null : null);
  const navRef = useRef<HTMLElement>(null);
  // While a click-scroll runs, the observer must not move the highlight (it would flicker through the groups passed).
  const locked = useRef(false);
  const unlock = useRef<() => void>(() => {});
  useEffect(() => () => unlock.current(), []);
  useEffect(() => {
    if (!pinned) return undefined;
    const els = ids.map(([id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target.id, e.isIntersecting));
      if (locked.current) return;
      const first = ids.find(([id]) => seen.get(id));
      if (first) setActive(first[0]);
    }, {rootMargin: '-140px 0px -55% 0px'});
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [pinned, ids.map(([id]) => id).join('|')]);
  useEffect(() => {
    // Keep the highlighted button visible in the row on a phone. Scroll the row only, sideways:
    // element.scrollIntoView would also scroll the page, and in Safari and Firefox that cancels
    // the smooth scroll a click has started, so the page barely moves.
    const nav = navRef.current;
    if (!pinned || !active || !nav || nav.scrollWidth <= nav.clientWidth) return;
    const btn = nav.querySelector<HTMLElement>(`a[data-id="${active}"]`);
    if (btn) nav.scrollTo({left: btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2});
  }, [active]);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Hold the highlight on the clicked group until the page stops moving: scrollend where the
    // browser has it, else 150 ms after the last scroll event; 300 ms if it never moves; 3 s at most.
    unlock.current();
    locked.current = true;
    let idle = 0;
    const done = () => {
      window.clearTimeout(idle);
      window.clearTimeout(cap);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', done);
      locked.current = false;
      unlock.current = () => {};
    };
    const onScroll = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(done, 150);
    };
    const cap = window.setTimeout(done, 3000);
    idle = window.setTimeout(done, 300);
    window.addEventListener('scroll', onScroll, {passive: true});
    if ('onscrollend' in window) window.addEventListener('scrollend', done);
    unlock.current = done;
    setActive(id);
    el.scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: 'start'});
    history.replaceState(null, '', `#${id}`);
  };
  return (
    <nav className={pinned ? 'wk-sl-jump' : 'wk-sl-jump wk-sl-jump--index'} aria-label="Groups on this page" ref={navRef}>
      {ids.map(([id, label]) => (
        <a key={id} href={`#${id}`} data-id={id} aria-current={pinned && active === id ? 'true' : undefined} onClick={e => go(e, id)}>{label}</a>
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

type Props = {
  cards?: Record<string, React.ReactNode>;
  /** Hub layout: each top-level group is a heading with its subgroups and pages (Clinical Care). */
  sections?: boolean;
  /** Section landing: a row of jump links to each card at the top of the page. */
  jump?: boolean;
  /** Shorter button text for long card titles, keyed by the card title. */
  jumpLabels?: Record<string, string>;
  /** Extra jump targets after the cards: [element id, button text], e.g. a heading further down the page. */
  jumpExtra?: ReadonlyArray<readonly [string, string]>;
};

export default function SectionLanding({cards = {}, sections = false, jump = false, jumpLabels = {}, jumpExtra = []}: Props): React.ReactElement | null {
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
  const grid = (
    <div className="wk-sl">
      {items.map(item => <Card key={'href' in item && item.href ? item.href : 'label' in item ? item.label : String(item.type)} item={item} entries={entries} here={here} level={2} />)}
    </div>
  );
  if (!jump) return grid;
  const targets = items.flatMap(item => ('label' in item && (item.type === 'link' || item.type === 'category') ? [[slug(item.label), jumpLabels[item.label] ?? item.label] as const] : []));
  return (
    <>
      <JumpNav ids={[...targets, ...jumpExtra]} pinned={false} />
      {grid}
    </>
  );
}
