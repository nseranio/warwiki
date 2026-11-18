/**
 * ClinicalTrials.gov API v2 study record -> finder index entry and detail record.
 * Runs in Node (refresh script) and in the browser (live registry check).
 * Only US locations are kept; the non-US count is recorded.
 */
import {classifyPools, type PoolHint} from './pools.ts';
import {GEO_MISMATCH_MILES, distanceMiles, stateAbbr, zip5, type ZctaTable} from './geo.ts';
import {textSignals, warwikiTags} from './classify.ts';
import type {Contact, DetailSite, IndexIntervention, IndexSite, IndexStudy, RegistryDate, SettingTag, StudyDetail} from './types.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Raw = any;

export async function sha16(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest).slice(0, 8), b => b.toString(16).padStart(2, '0')).join('');
}

/** ClinicalTrials.gov escapes Markdown characters (`\>=`); show them plainly. */
export function unescapeRegistryText(text?: string): string | undefined {
  if (text == null) return undefined;
  return text.replace(/\\([\\`*_{}[\]()#+\-.!<>=~|^])/g, '$1');
}

function rdate(struct?: {date?: string; type?: string}): RegistryDate | undefined {
  if (!struct?.date) return undefined;
  return struct.type ? {d: struct.date, t: struct.type} : {d: struct.date};
}

function clean(s?: string): string | undefined {
  const v = s?.replace(/\s+/g, ' ').trim();
  return v ? v : undefined;
}

function contact(c: Raw): Contact {
  const out: Contact = {};
  if (clean(c.name)) out.name = clean(c.name);
  if (c.role) out.role = c.role;
  if (clean(c.phone)) out.phone = clean(c.phone);
  if (clean(c.phoneExt)) out.ext = clean(c.phoneExt);
  if (clean(c.email)) out.email = clean(c.email);
  return out;
}

const US = new Set(['United States', 'Puerto Rico', 'Guam', 'U.S. Virgin Islands', 'Virgin Islands (U.S.)', 'American Samoa', 'Northern Mariana Islands']);

function siteGeo(loc: Raw, zcta?: ZctaTable): Pick<IndexSite, 'la' | 'lo' | 'g'> {
  const z = zip5(loc.zip);
  const centroid = z && zcta ? zcta[z] : undefined;
  const lat = loc.geoPoint?.lat;
  const lon = loc.geoPoint?.lon;
  if (typeof lat === 'number' && typeof lon === 'number') {
    if (centroid && distanceMiles(lat, lon, centroid[0], centroid[1]) > GEO_MISMATCH_MILES) return {g: 'bad'};
    return {la: Math.round(lat * 1000) / 1000, lo: Math.round(lon * 1000) / 1000};
  }
  if (centroid) return {la: centroid[0], lo: centroid[1], g: 'zip'};
  return {};
}

export interface NormalizeOptions {
  /** Omit for snapshot files; set for live checks. */
  retrievedAt?: string;
  zcta?: ZctaTable;
  /** Pools the retrieval query put this study in (disease pools and basket hints). */
  hints?: PoolHint[];
}

export async function normalizeStudy(raw: Raw, opts: NormalizeOptions): Promise<{index: IndexStudy; detail: StudyDetail}> {
  const ps = raw.protocolSection ?? {};
  const idm = ps.identificationModule ?? {};
  const stm = ps.statusModule ?? {};
  const dsm = ps.designModule ?? {};
  const cnd = ps.conditionsModule ?? {};
  const aim = ps.armsInterventionsModule ?? {};
  const elg = ps.eligibilityModule ?? {};
  const clm = ps.contactsLocationsModule ?? {};
  const spm = ps.sponsorCollaboratorsModule ?? {};
  const dsc = ps.descriptionModule ?? {};

  const id: string = idm.nctId;
  if (!/^NCT\d{8}$/.test(id ?? '')) throw new Error(`Bad NCT id: ${id}`);

  const eligibilityText: string | undefined = elg.eligibilityCriteria ?? undefined;
  const eh = eligibilityText ? await sha16(eligibilityText) : undefined;

  const ids = [...new Set([
    idm.orgStudyIdInfo?.id,
    ...(idm.secondaryIdInfos ?? []).filter((s: Raw) => s.type !== 'NIH').map((s: Raw) => s.id),
  ].map(clean).filter((v): v is string => !!v && v !== id && !/^NCI-\d{4}-\d+$/.test(v)))];

  const interventions = (aim.interventions ?? []).map((iv: Raw) => ({
    type: iv.type,
    name: clean(iv.name) ?? 'Unnamed intervention',
    description: clean(iv.description),
    otherNames: (iv.otherNames ?? []).map(clean).filter(Boolean),
  }));
  const iv: IndexIntervention[] = interventions.map((x: Raw) => {
    const o: IndexIntervention = {n: x.name};
    if (x.type) o.ty = x.type;
    if (x.otherNames?.length) o.o = x.otherNames;
    return o;
  });

  let nonUs = 0;
  const detailSites: DetailSite[] = [];
  for (const loc of clm.locations ?? []) {
    if (!US.has(loc.country)) {
      nonUs++;
      continue;
    }
    const contacts: Contact[] = (loc.contacts ?? []).map(contact);
    const pis = contacts.filter(c => /INVESTIGATOR/.test(c.role ?? '') && c.name).map(c => c.name as string);
    const site: DetailSite = {f: clean(loc.facility) ?? 'Facility not named', ...siteGeo(loc, opts.zcta)};
    if (clean(loc.city)) site.c = clean(loc.city);
    const s = stateAbbr(loc.state ?? (loc.country !== 'United States' ? loc.country : undefined));
    if (s) site.s = s;
    if (zip5(loc.zip)) site.z = zip5(loc.zip);
    if (loc.status) site.st = loc.status;
    if (pis.length) site.pi = pis;
    if (loc.country && loc.country !== 'United States') site.country = loc.country;
    if (contacts.length) site.contacts = contacts;
    detailSites.push(site);
  }
  const sites: IndexSite[] = detailSites.map(({contacts: _c, country: _k, ...rest}) => rest);

  const titles = [idm.briefTitle, idm.officialTitle, idm.acronym].filter(Boolean);
  const conditions: string[] = (cnd.conditions ?? []).map(clean).filter(Boolean);
  const keywords: string[] = (cnd.keywords ?? []).map(clean).filter(Boolean);
  const classifyInput = {titles, conditions, keywords, eligibility: eligibilityText};
  const pools = classifyPools(opts.hints ?? [], classifyInput);
  const tags = new Set<SettingTag>(warwikiTags(classifyInput));

  const officials = (clm.overallOfficials ?? []).map((o: Raw) => ({name: clean(o.name), affiliation: clean(o.affiliation), role: o.role}));

  const index: IndexStudy = {
    id,
    t: clean(idm.briefTitle) ?? id,
    type: dsm.studyType ?? 'UNKNOWN',
    st: stm.overallStatus ?? 'UNKNOWN',
    cond: conditions,
    iv,
    pools,
    tags: [...tags],
    sig: textSignals(classifyInput),
    sites,
  };
  if (clean(idm.acronym)) index.acr = clean(idm.acronym);
  if (ids.length) index.ids = ids;
  if (dsm.phases?.length) index.ph = dsm.phases;
  if (dsm.designInfo?.primaryPurpose) index.pp = dsm.designInfo.primaryPurpose;
  const upd = rdate(stm.lastUpdatePostDateStruct);
  if (upd) index.upd = upd;
  if (stm.statusVerifiedDate) index.ver = stm.statusVerifiedDate;
  const start = rdate(stm.startDateStruct);
  if (start) index.start = start;
  if (keywords.length) index.kw = keywords;
  if (clean(spm.leadSponsor?.name)) index.sp = clean(spm.leadSponsor?.name);
  if (eh) index.eh = eh;
  if (nonUs) index.nonUs = nonUs;
  const off = officials.map((o: Raw) => o.name).filter(Boolean);
  if (off.length) index.off = off;
  if ((clm.centralContacts ?? []).length) index.cc = true;
  if (Array.isArray(elg.stdAges) && elg.stdAges.length) index.ages = elg.stdAges;

  const largeDocs = raw.documentSection?.largeDocumentModule?.largeDocs ?? [];
  const documents = largeDocs
    .filter((d: Raw) => typeof d.filename === 'string' && /^[\w.-]+$/.test(d.filename))
    .map((d: Raw) => ({
      label: d.label || [d.hasProtocol && 'Protocol', d.hasSap && 'Statistical analysis plan', d.hasIcf && 'Informed consent form'].filter(Boolean).join(', ') || 'Study document',
      url: `https://cdn.clinicaltrials.gov/large-docs/${id.slice(-2)}/${id}/${d.filename}`,
    }));

  const detail: StudyDetail = {
    schema: 1,
    retrievedAt: opts.retrievedAt,
    id,
    briefTitle: index.t,
    officialTitle: clean(idm.officialTitle),
    acronym: index.acr,
    ids: index.ids,
    summary: unescapeRegistryText(dsc.briefSummary?.trim()),
    status: {
      overall: index.st,
      whyStopped: clean(stm.whyStopped),
      verified: stm.statusVerifiedDate,
      lastUpdatePosted: upd,
      firstPosted: rdate(stm.studyFirstPostDateStruct),
      start,
      primaryCompletion: rdate(stm.primaryCompletionDateStruct),
      completion: rdate(stm.completionDateStruct),
    },
    design: {
      type: index.type,
      phases: index.ph,
      allocation: dsm.designInfo?.allocation,
      model: dsm.designInfo?.interventionModel ?? dsm.designInfo?.observationalModel,
      purpose: index.pp,
      masking: dsm.designInfo?.maskingInfo?.masking,
      enrollment: dsm.enrollmentInfo ? {count: dsm.enrollmentInfo.count, type: dsm.enrollmentInfo.type} : undefined,
    },
    conditions,
    keywords: keywords.length ? keywords : undefined,
    arms: (aim.armGroups ?? []).map((a: Raw) => ({label: clean(a.label) ?? 'Arm', type: a.type, description: unescapeRegistryText(clean(a.description)), interventions: a.interventionNames})),
    interventions,
    eligibility: {
      text: eligibilityText,
      sex: elg.sex,
      minimumAge: elg.minimumAge,
      maximumAge: elg.maximumAge,
      healthyVolunteers: elg.healthyVolunteers,
    },
    eh,
    sponsor: index.sp,
    collaborators: (spm.collaborators ?? []).map((c: Raw) => clean(c.name)).filter(Boolean),
    officials,
    central: (clm.centralContacts ?? []).map(contact),
    sites: detailSites,
    nonUs: nonUs || undefined,
    documents: documents.length ? documents : undefined,
  };
  return {index, detail: JSON.parse(JSON.stringify(detail)) as StudyDetail};
}
