import React, { useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { PATIENT_HANDOUTS, handoutPdfPath } from '@site/src/data/handouts';
import { TOOLKIT_ITEMS, type ToolkitItem } from '@site/src/data/toolkit';

type Kind = ToolkitItem['kind'] | 'handout';
type Entry = { id: string; kind: Kind; title: string; summary: string; topic: string; body: string; item?: ToolkitItem; pdf?: string };
const ORDER: Kind[] = ['op-note', 'counseling', 'patient-instructions', 'clinic-note', 'handout'];
const LABELS: Record<Kind, string> = {
  'op-note': 'Operative note templates', counseling: 'Counseling templates',
  'patient-instructions': 'Patient instructions', 'clinic-note': 'Clinic note templates',
  handout: 'Patient handouts',
};

// These handouts belong to the four topics in the first content wave. Registry
// metadata and assets remain in handouts.ts; no PDF entry is duplicated here.
const HANDOUT_TOPICS: Record<string, string> = {
  'stress-urinary-incontinence-male': 'Male SUI', 'artificial-urinary-sphincter': 'Male SUI',
  'male-urethral-sling': 'Male SUI', 'proact-adjustable-balloons': 'Male SUI',
  'stress-urinary-incontinence-female': 'Female SUI', 'mid-urethral-sling': 'Female SUI',
  'urethral-bulking': 'Female SUI', 'act-adjustable-balloons': 'Female SUI',
  'urethroplasty': 'Urethral stricture', 'perineal-urethrostomy': 'Urethral stricture',
  'optilume-urethral-stricture': 'Urethral stricture', 'endoscopic-urethroplasty': 'Urethral stricture',
  'buccal-mucosa-graft': 'Urethral stricture', 'retrograde-urethrogram': 'Urethral stricture',
  'overactive-bladder': 'OAB', 'bladder-botox': 'OAB', 'sacral-neuromodulation': 'OAB',
  'percutaneous-tibial-nerve-stimulation': 'OAB', 'implantable-tibial-nerve-stimulation': 'OAB',
  'pelvic-floor-exercises-bladder-training': 'OAB',
};

function sourceToDocId(source: string): string {
  return source.replace(/^docs\//, '').replace(/\.mdx?$/, '').split('/')
    .map(part => part.replace(/^\d+-/, '')).join('/');
}

function CopyButton({ body }: { body: string }) {
  const [status, setStatus] = useState('Copy');
  const copy = async () => {
    try { await navigator.clipboard.writeText(body); setStatus('Copied'); }
    catch { setStatus('Copy failed'); }
    window.setTimeout(() => setStatus('Copy'), 2000);
  };
  return <button type="button" className="ct-copy" onClick={copy}>{status}</button>;
}

export default function ClinicalToolkit(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const handoutsEnabled = siteConfig.customFields?.handoutsEnabled === true;
  const allDocs = useAllDocsData();
  const docPaths = useMemo(() => {
    const paths = new Map<string, string>();
    for (const plugin of Object.values(allDocs)) for (const version of plugin.versions)
      for (const doc of version.docs) paths.set(doc.id, doc.path);
    return paths;
  }, [allDocs]);
  const entries = useMemo<Entry[]>(() => {
    const templates: Entry[] = TOOLKIT_ITEMS.map(item => ({
      id: item.id, kind: item.kind, title: item.title, summary: item.summary,
      topic: item.topic, body: item.body, item,
    }));
    if (!handoutsEnabled) return templates;
    return [...templates, ...PATIENT_HANDOUTS.filter(h => HANDOUT_TOPICS[h.slug]).map(h => ({
      id: `handout-${h.slug}`, kind: 'handout' as const, title: h.title,
      summary: h.description, topic: HANDOUT_TOPICS[h.slug], body: '',
      pdf: handoutPdfPath(h.slug, 'en'),
    }))];
  }, [handoutsEnabled]);
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<Kind | 'all'>('all');
  const [topic, setTopic] = useState('all');
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!entries.some(entry => entry.id === id)) return;
      setQuery(''); setKind('all'); setTopic('all'); setOpen(id);
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({block: 'start'}));
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [entries]);

  const filtered = useMemo(() => entries.filter(entry => {
    if (kind !== 'all' && entry.kind !== kind) return false;
    if (topic !== 'all' && entry.topic !== topic) return false;
    const haystack = `${entry.title} ${entry.summary} ${entry.topic} ${entry.body}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  }), [entries, kind, topic, query]);
  const topics = ['Male SUI', 'Female SUI', 'Urethral stricture', 'OAB'];
  const toggle = (id: string) => {
    const next = open === id ? null : id;
    setOpen(next);
    window.history.replaceState(null, '', window.location.pathname + window.location.search + (next ? `#${next}` : ''));
  };
  const docLink = (page: string, anchor?: string) => {
    const route = docPaths.get(sourceToDocId(page));
    return route ? `${route}${anchor ? `#${anchor}` : ''}` : undefined;
  };

  return <div className="ct-wrap">
    <div className="ct-controls">
      <input className="ph-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search titles, topics and template text…" aria-label="Search clinical toolkit" />
      <select className="ph-filter" value={kind} onChange={e => setKind(e.target.value as Kind | 'all')} aria-label="Filter by type">
        <option value="all">All types</option>
        {ORDER.filter(value => value !== 'handout' || handoutsEnabled).map(value => <option value={value} key={value}>{LABELS[value]}</option>)}
      </select>
      <select className="ph-filter" value={topic} onChange={e => setTopic(e.target.value)} aria-label="Filter by topic">
        <option value="all">All topics</option>
        {topics.map(value => <option value={value} key={value}>{value}</option>)}
      </select>
    </div>
    <p className="ph-resultcount" aria-live="polite">{filtered.length} of {entries.length} resources</p>
    {filtered.length === 0 && <p className="ph-empty">No resources match those filters.</p>}
    {ORDER.map(group => {
      const groupEntries = filtered.filter(entry => entry.kind === group);
      if (!groupEntries.length) return null;
      return <section className="ct-group" key={group}>
        <h2>{LABELS[group]} <span className="ph-count">{groupEntries.length}</span></h2>
        <div className="ct-list">{groupEntries.map(entry => <article className="ct-item" id={entry.id} key={entry.id}>
          <button type="button" className="ct-heading" aria-expanded={open === entry.id} aria-controls={`${entry.id}-detail`} onClick={() => toggle(entry.id)}>
            <span><strong>{entry.title}</strong><small>{entry.topic} · {entry.summary}</small></span><span aria-hidden="true">{open === entry.id ? '−' : '+'}</span>
          </button>
          {open === entry.id && <div className="ct-detail" id={`${entry.id}-detail`}>
            {entry.pdf ? <Link to={entry.pdf} target="_blank" rel="noopener noreferrer">Download patient handout (PDF) ↗</Link> : <>
              <div className="ct-actions"><CopyButton body={entry.body} /><span>Checked against WARWIKI {entry.item?.updated}</span></div>
              <pre className="ct-template">{entry.body}</pre>
              {!!entry.item?.sources.length && <div className="ct-links"><h3>Sources for figures</h3><ul>{entry.item.sources.map((source, i) => {
                const href = docLink(source.page, source.anchor);
                return <li key={`${source.figure}-${i}`}>{source.figure} — {href ? <Link to={href}>WARWIKI source</Link> : source.page}</li>;
              })}</ul></div>}
              {!!entry.item?.pages.length && <div className="ct-links"><h3>Related pages</h3><ul>{entry.item.pages.map(page => {
                const href = docLink(page);
                return <li key={page}>{href ? <Link to={href}>{page.split('/').pop()?.replace(/\.mdx?$/, '').replace(/-/g, ' ')}</Link> : page}</li>;
              })}</ul></div>}
            </>}
          </div>}
        </article>)}</div>
      </section>;
    })}
  </div>;
}
