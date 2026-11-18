/** Referral-preparation summary: study and site facts only, no patient details. */
import {statusLabel} from './filter.ts';
import type {Contact, DetailSite, Manifest, RegistryDate, StudyDetail, StudyMatch} from './types.ts';

export function formatRegistryDate(d?: RegistryDate | string): string {
  if (!d) return 'not reported';
  const raw = typeof d === 'string' ? d : d.d;
  const type = typeof d === 'string' ? undefined : d.t;
  const m = raw.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!m) return raw;
  const month = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 1)).toLocaleString('en-US', {month: 'long', timeZone: 'UTC'});
  const text = m[3] ? `${month} ${Number(m[3])}, ${m[1]}` : `${month} ${m[1]}`;
  return type === 'ESTIMATED' ? `${text} (estimated)` : text;
}

export function formatTimestamp(iso?: string): string {
  if (!iso) return 'unknown';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short'});
}

export function contactLine(c: Contact): string {
  return [c.name, c.role && c.role !== 'CONTACT' && roleLabel(c.role), c.phone && `${c.phone}${c.ext ? ` ext. ${c.ext}` : ''}`, c.email].filter(Boolean).join(' · ');
}

export function roleLabel(role?: string): string {
  if (!role) return '';
  const map: Record<string, string> = {
    PRINCIPAL_INVESTIGATOR: 'Principal investigator',
    SUB_INVESTIGATOR: 'Sub-investigator',
    CONTACT: 'Contact',
    STUDY_CHAIR: 'Study chair',
    STUDY_DIRECTOR: 'Study director',
  };
  return map[role] ?? role.replace(/_/g, ' ').toLowerCase();
}

export interface SummaryInput {
  detail: StudyDetail;
  site?: DetailSite;
  distance?: number;
  match?: StudyMatch;
  manifest?: Pick<Manifest, 'refreshedAt' | 'source'>;
  /** Short description of the disease state chosen in the finder (no patient identifiers). */
  diseaseState?: string;
  liveCheckedAt?: string;
}

export function referralSummary(input: SummaryInput): string {
  const {detail, site, match} = input;
  const lines: string[] = [];
  const name = detail.acronym ? `${detail.acronym}: ${detail.briefTitle}` : detail.briefTitle;
  lines.push(name);
  lines.push(`${detail.id} · https://clinicaltrials.gov/study/${detail.id}`);
  if (detail.ids?.length) lines.push(`Other IDs: ${detail.ids.join(', ')}`);
  const ivs = detail.interventions.filter(i => !/^PROCEDURE$|^OTHER$/.test(i.type ?? '')).map(i => i.name);
  if (ivs.length) lines.push(`Intervention: ${ivs.join('; ')}`);
  if (detail.design.phases?.length) lines.push(`Phase: ${detail.design.phases.map(p => p.replace('PHASE', 'Phase ').replace('EARLY_Phase 1', 'Early phase 1')).join('/')}`);
  if (detail.sponsor) lines.push(`Sponsor: ${detail.sponsor}`);
  lines.push('');
  lines.push(`Overall study status (registry): ${statusLabel(detail.status.overall)}`);
  lines.push(`Registry last update posted: ${formatRegistryDate(detail.status.lastUpdatePosted)}; status verified: ${formatRegistryDate(detail.status.verified)}`);
  if (input.manifest) lines.push(`Snapshot retrieved from ${input.manifest.source.name}: ${formatTimestamp(input.manifest.refreshedAt)}`);
  if (input.liveCheckedAt) lines.push(`Live registry record checked: ${formatTimestamp(input.liveCheckedAt)}`);
  lines.push('');
  if (site) {
    lines.push(`Site: ${site.f}${site.c ? `, ${site.c}` : ''}${site.s ? `, ${site.s}` : ''}${site.z ? ` ${site.z}` : ''}`);
    lines.push(`Site status (registry): ${statusLabel(site.st)}`);
    if (input.distance !== undefined) lines.push(`Approximate straight-line distance: ${Math.round(input.distance)} mi`);
    const siteContacts = (site.contacts ?? []).filter(c => c.phone || c.email || c.name);
    if (siteContacts.length) for (const c of siteContacts) lines.push(`Site-listed: ${contactLine(c)}`);
    else lines.push('No site-specific contact listed in the registry.');
  } else {
    lines.push('Site: none selected');
  }
  const central = (detail.central ?? []).filter(c => c.phone || c.email);
  if (central.length) for (const c of central) lines.push(`Central study contact (not site-specific): ${contactLine(c)}`);
  lines.push('');
  if (input.diseaseState) lines.push(`Disease state searched: ${input.diseaseState}`);
  if (match?.cohorts.length) {
    for (const c of match.cohorts) lines.push(`Cohort: ${c.label} (${c.outcome === 'relevant' ? 'potentially relevant' : c.outcome === 'clarify' ? 'needs clarification' : 'excluded by a cohort rule'}): ${c.description}`);
  }
  const unknowns = [...new Set([...(match?.unknowns ?? []), ...(match?.cohorts.flatMap(c => c.unknowns) ?? [])])];
  if (unknowns.length) {
    lines.push('Not yet confirmed:');
    for (const u of unknowns) lines.push(`- ${u}`);
  }
  lines.push('');
  lines.push('Questions for the study coordinator:');
  lines.push('- Is this site screening now, and is the relevant cohort open?');
  lines.push('- Is a slot available, and how long is the screening window?');
  lines.push('- Which records are needed before screening (prior treatments and dates, operative notes, imaging, urodynamics or cystoscopy)?');
  lines.push('- How should the referral be sent, and to whom?');
  lines.push('');
  lines.push('Registry information only. Eligibility, cohort availability and enrollment are decided by the study team.');
  return lines.join('\n');
}
