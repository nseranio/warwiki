/**
 * Snapshot detail files carry contacts keyed by site instead of repeating the
 * site list the pool index already holds (keeps the deployed snapshot small).
 * Live registry checks keep the full site list.
 */
import type {Contact, DetailSite, IndexStudy, StudyDetail} from './types.ts';

export function siteKey(site: {f: string; c?: string; z?: string}): string {
  return `${site.f}|${site.c ?? ''}|${site.z ?? ''}`;
}

export function compactDetail(d: StudyDetail): StudyDetail {
  const siteContacts: Record<string, {contacts?: Contact[]; country?: string}> = {};
  for (const s of d.sites ?? []) {
    if (!s.contacts?.length && !s.country) continue;
    const key = siteKey(s);
    if (!siteContacts[key]) siteContacts[key] = {...(s.contacts?.length ? {contacts: s.contacts} : {}), ...(s.country ? {country: s.country} : {})};
  }
  const {summary: _summary, sites: _sites, ...rest} = d;
  return {
    ...rest,
    interventions: d.interventions.map(({description: _d, ...iv}) => iv),
    sites: [],
    siteContacts,
  };
}

/** Rebuild the site list from the index entry when the detail file is compact. */
export function hydrateDetail(d: StudyDetail, study?: IndexStudy): StudyDetail {
  if (d.sites?.length || !d.siteContacts || !study) return d;
  const sites: DetailSite[] = study.sites.map(s => ({...s, ...(d.siteContacts?.[siteKey(s)] ?? {})}));
  return {...d, sites};
}
