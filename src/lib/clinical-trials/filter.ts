/**
 * Site qualification, radius, search and ranking.
 * A study appears once (by NCT ID) with its qualifying sites underneath.
 * Radius applies to each qualifying site, and studies sort by their nearest
 * qualifying site, never by the first location in the record.
 */
import {distanceMiles} from './geo.ts';
import type {IndexSite, IndexStudy, RegistryStatus} from './types.ts';

export type StatusView = 'recruiting' | 'unreported' | 'upcoming' | 'all';

export const VIEW_LABELS: Record<StatusView, string> = {
  recruiting: 'Recruiting sites',
  unreported: 'Site status unreported',
  upcoming: 'Not yet recruiting or by invitation',
  all: 'All statuses',
};

const UPCOMING = new Set<RegistryStatus>(['NOT_YET_RECRUITING', 'ENROLLING_BY_INVITATION']);

/** Does this site count for the chosen status view? */
export function siteQualifies(study: IndexStudy, site: IndexSite, view: StatusView): boolean {
  switch (view) {
    case 'recruiting':
      return study.st === 'RECRUITING' && site.st === 'RECRUITING';
    case 'unreported':
      return study.st === 'RECRUITING' && !site.st;
    case 'upcoming':
      if (study.st === 'RECRUITING') return !!site.st && UPCOMING.has(site.st);
      if (UPCOMING.has(study.st)) return !site.st || site.st === 'RECRUITING' || UPCOMING.has(site.st);
      return false;
    case 'all':
      return true;
  }
}

/** The study and site labels disagree in a way a reader should see. */
export function statusConflict(study: IndexStudy, site: IndexSite): string | undefined {
  if (site.st === 'RECRUITING' && study.st !== 'RECRUITING') {
    return `Site listed as recruiting, but the study's overall status is ${statusLabel(study.st).toLowerCase()}.`;
  }
  return undefined;
}

export function statusLabel(st?: RegistryStatus): string {
  if (!st) return 'Not reported';
  const map: Record<string, string> = {
    RECRUITING: 'Recruiting',
    NOT_YET_RECRUITING: 'Not yet recruiting',
    ENROLLING_BY_INVITATION: 'Enrolling by invitation',
    ACTIVE_NOT_RECRUITING: 'Active, not recruiting',
    SUSPENDED: 'Suspended',
    TEMPORARILY_NOT_AVAILABLE: 'Temporarily not available',
    COMPLETED: 'Completed',
    TERMINATED: 'Terminated',
    WITHDRAWN: 'Withdrawn',
    WITHHELD: 'Withheld',
    UNKNOWN: 'Unknown',
  };
  return map[st] ?? st.replace(/_/g, ' ').toLowerCase();
}

/** Why a study is not in the default "recruiting near you" results. */
export function enrollingExclusionReason(study: IndexStudy): string | undefined {
  if (study.st !== 'RECRUITING') return `Overall study status is ${statusLabel(study.st).toLowerCase()}; enrolling results need a study that is recruiting.`;
  if (!study.sites.some(s => s.st === 'RECRUITING')) return 'No US site is listed as recruiting.';
  return undefined;
}

export interface Origin {
  lat: number;
  lon: number;
}

export interface SiteHit {
  site: IndexSite;
  index: number;
  /** Miles; undefined when the site has no usable coordinates. */
  distance?: number;
  conflict?: string;
}

export interface StudyHit {
  study: IndexStudy;
  sites: SiteHit[];
  nearest?: number;
  /** Qualifying sites without usable coordinates (not counted as nearby). */
  unlocated: number;
}

export function siteDistance(site: IndexSite, origin?: Origin): number | undefined {
  if (!origin || site.g === 'bad' || typeof site.la !== 'number' || typeof site.lo !== 'number') return undefined;
  return distanceMiles(origin.lat, origin.lon, site.la, site.lo);
}

export function normalizeSearch(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[‐-―_/-]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export interface SiteOptions {
  view: StatusView;
  origin?: Origin;
  /** Miles; ignored without an origin. */
  radius?: number;
  /** Institution / city filter applied to sites. */
  siteQuery?: string;
}

/** Qualifying sites for one study, sorted nearest first (unlocated last). */
export function studySites(study: IndexStudy, opts: SiteOptions): StudyHit | null {
  const siteTokens = opts.siteQuery ? normalizeSearch(opts.siteQuery).split(' ').filter(Boolean) : [];
  const hits: SiteHit[] = [];
  let unlocated = 0;
  study.sites.forEach((site, index) => {
    if (!siteQualifies(study, site, opts.view)) return;
    if (siteTokens.length) {
      const hay = normalizeSearch(`${site.f} ${site.c ?? ''} ${site.s ?? ''} ${site.z ?? ''} ${(site.pi ?? []).join(' ')}`);
      if (!siteTokens.every(t => hay.includes(t))) return;
    }
    const distance = siteDistance(site, opts.origin);
    if (opts.origin) {
      if (distance === undefined) {
        unlocated++;
        return;
      }
      if (opts.radius !== undefined && distance > opts.radius) return;
    }
    hits.push({site, index, distance, conflict: statusConflict(study, site)});
  });
  // With an origin, a study whose only qualifying sites lack coordinates comes back with no sites
  // so the caller can list it separately as "location not usable", never as nearby.
  if (!hits.length && !unlocated) return null;
  hits.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity) || a.site.f.localeCompare(b.site.f));
  return {study, sites: hits, nearest: hits[0]?.distance, unlocated};
}

/** Searchable text for one study: identifiers, titles, conditions, interventions, sponsor, officials, sites and site PIs. */
export function studyHaystack(study: IndexStudy, aliasGroups: string[][] = []): string {
  const parts = [
    study.id, study.acr, ...(study.ids ?? []), study.t, ...study.cond, ...(study.kw ?? []),
    ...study.iv.flatMap(i => [i.n, ...(i.o ?? [])]), study.sp, ...(study.off ?? []),
    ...study.sites.flatMap(s => [s.f, s.c, ...(s.pi ?? [])]),
  ].filter(Boolean) as string[];
  let hay = ` ${normalizeSearch(parts.join(' | '))} `;
  for (const group of aliasGroups) {
    const norm = group.map(normalizeSearch);
    if (norm.some(term => hay.includes(` ${term} `) || hay.includes(` ${term}`))) hay += ` ${norm.join(' ')} `;
  }
  return hay;
}

export function matchesQuery(haystack: string, query: string): boolean {
  const tokens = normalizeSearch(query).split(' ').filter(Boolean);
  return tokens.every(t => haystack.includes(t));
}

export const NCT_RE = /\bNCT\s?0*(\d{1,8})\b/i;

export function parseNct(query: string): string | null {
  const m = query.match(NCT_RE);
  return m ? `NCT${m[1].padStart(8, '0')}` : null;
}

export function countSites(hits: StudyHit[]): number {
  return hits.reduce((n, h) => n + h.sites.length, 0);
}

export function isDefaultType(study: IndexStudy, includeObservational: boolean, includeNonTreatment: boolean): boolean {
  if (study.type === 'OBSERVATIONAL') return includeObservational;
  if (study.type !== 'INTERVENTIONAL') return includeObservational;
  return includeNonTreatment || study.pp === 'TREATMENT';
}
