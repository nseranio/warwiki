import {describe, expect, it} from 'vitest';
import {annotationState} from './annotations';
import {studySites, siteQualifies, studyHaystack, matchesQuery, parseNct, enrollingExclusionReason, countSites} from './filter';
import {distanceMiles, lookupZip, parseZip} from './geo';
import {evaluateStudy, inDiseaseState} from './match';
import {normalizeStudy, sha16} from './normalize';
import {classifyPools} from './pools';
import {referralSummary} from './summary';
import type {IndexSite, IndexStudy, StudyAnnotation} from './types';
import {retrieveQuery} from '../../../scripts/clinical-trials/refresh.ts';

const PALO_ALTO = {lat: 37.397, lon: -122.167};
const site = (f: string, la: number, lo: number, st?: string, extra: Partial<IndexSite> = {}): IndexSite => ({f, la, lo, ...(st ? {st} : {}), ...extra});

function study(over: Partial<IndexStudy> = {}): IndexStudy {
  return {id: 'NCT00000001', t: 'Test study', type: 'INTERVENTIONAL', pp: 'TREATMENT', st: 'RECRUITING', cond: ['Bladder Cancer'], iv: [], pools: ['continence'], tags: ['oab'], sig: [], sites: [], eh: 'abc', ...over};
}

describe('site status and radius', () => {
  it('a nearby non-recruiting site plus a distant recruiting site is not a nearby recruiting match', () => {
    const s = study({sites: [site('Stanford', 37.44, -122.14, 'ACTIVE_NOT_RECRUITING'), site('Boston', 42.36, -71.06, 'RECRUITING')]});
    expect(studySites(s, {view: 'recruiting', origin: PALO_ALTO, radius: 100})).toBeNull();
    const nationwide = studySites(s, {view: 'recruiting'});
    expect(nationwide?.sites.map(h => h.site.f)).toEqual(['Boston']);
  });

  it('never promotes a missing site status to recruiting', () => {
    const s = study({sites: [site('Unlabelled', 37.44, -122.14)]});
    expect(siteQualifies(s, s.sites[0], 'recruiting')).toBe(false);
    expect(siteQualifies(s, s.sites[0], 'unreported')).toBe(true);
  });

  it('requires the overall study status to be recruiting too, and flags the conflict', () => {
    const s = study({st: 'ACTIVE_NOT_RECRUITING', sites: [site('Stale site', 37.44, -122.14, 'RECRUITING')]});
    expect(studySites(s, {view: 'recruiting', origin: PALO_ALTO, radius: 100})).toBeNull();
    const all = studySites(s, {view: 'all', origin: PALO_ALTO, radius: 100});
    expect(all?.sites[0].conflict).toMatch(/overall status is active, not recruiting/);
    expect(enrollingExclusionReason(s)).toMatch(/active, not recruiting/);
  });

  it('sorts by the nearest qualifying site, not the first listed location', () => {
    const s = study({sites: [site('Far', 40.7, -74.0, 'RECRUITING'), site('Near', 37.44, -122.14, 'RECRUITING'), site('Middle', 34.05, -118.24, 'RECRUITING')]});
    const hit = studySites(s, {view: 'recruiting', origin: PALO_ALTO, radius: 5000});
    expect(hit?.sites.map(h => h.site.f)).toEqual(['Near', 'Middle', 'Far']);
    expect(hit?.nearest).toBeLessThan(5);
  });

  it('includes a site exactly on the radius boundary and excludes one just beyond', () => {
    const d = distanceMiles(PALO_ALTO.lat, PALO_ALTO.lon, 37.8, -122.27);
    const s = study({sites: [site('Edge', 37.8, -122.27, 'RECRUITING')]});
    expect(studySites(s, {view: 'recruiting', origin: PALO_ALTO, radius: d})).not.toBeNull();
    expect(studySites(s, {view: 'recruiting', origin: PALO_ALTO, radius: d - 0.01})).toBeNull();
  });

  it('keeps sites without usable coordinates out of nearby results but reports them', () => {
    const s = study({sites: [{f: 'No coords', st: 'RECRUITING'}, site('Bad geo', 37.44, -122.14, 'RECRUITING', {g: 'bad'})]});
    const hit = studySites(s, {view: 'recruiting', origin: PALO_ALTO, radius: 100});
    expect(hit?.sites).toHaveLength(0);
    expect(hit?.unlocated).toBe(2);
  });

  it('counts studies and sites separately', () => {
    const a = studySites(study({sites: [site('A1', 37.44, -122.14, 'RECRUITING'), site('A2', 37.5, -122.2, 'RECRUITING')]}), {view: 'recruiting'});
    const b = studySites(study({id: 'NCT00000002', sites: [site('B1', 37.44, -122.14, 'RECRUITING')]}), {view: 'recruiting'});
    expect(countSites([a!, b!])).toBe(3);
  });
});

describe('ZIP handling', () => {
  const table = {'00601': [18.181, -66.75] as [number, number], '94304': [37.397, -122.167] as [number, number]};
  it('keeps leading zeros and accepts ZIP+4', () => {
    expect(parseZip('00601')).toBe('00601');
    expect(parseZip('94304-1234')).toBe('94304');
    expect(lookupZip('00601', table)).toEqual({kind: 'ok', zip: '00601', lat: 18.181, lon: -66.75});
  });
  it('distinguishes an invalid ZIP from a valid ZIP without coordinates', () => {
    expect(lookupZip('9430', table).kind).toBe('invalid');
    expect(lookupZip('99999', table)).toEqual({kind: 'noCoordinates', zip: '99999'});
  });
});

describe('cohort matching', () => {
  const ann = (cohorts: StudyAnnotation['cohorts'], eh = 'abc'): StudyAnnotation => ({nct: 'NCT00000001', eh, sourceUpdate: '2026-11-18', reviewStatus: 'editor-checked', reviewer: 'test', reviewedOn: '2026-11-18', cohorts});
  const refractoryOab = {label: 'Refractory idiopathic OAB', description: 'After medication failure, no prior third-line', oab: {etiology: 'idiopathic' as const, medsFailed: 'required' as const, thirdLine: 'excluded' as const}, passages: ['x'], section: 'Inclusion Criteria'};
  const neurogenic = {label: 'Neurogenic', description: 'NDO', oab: {etiology: 'neurogenic' as const}, passages: ['x'], section: 'Inclusion Criteria'};
  const oabCtx = (o: Partial<{etiology: string; sex: string; line: string}>) => ({pool: 'continence' as const, state: 'oab' as const, oab: {etiology: 'unknown', sex: 'unknown', line: 'unknown', ...o} as never});

  it('refractory idiopathic OAB after medication fits; untreated OAB is excluded', () => {
    expect(evaluateStudy(study(), oabCtx({etiology: 'idiopathic', line: 'medication'}), ann([refractoryOab])).outcome).toBe('relevant');
    expect(evaluateStudy(study(), oabCtx({etiology: 'idiopathic', line: 'none'}), ann([refractoryOab])).outcome).toBe('excluded');
  });

  it('unknown treatment history stays unknown: needs clarification', () => {
    expect(evaluateStudy(study(), oabCtx({etiology: 'idiopathic'}), ann([refractoryOab])).outcome).toBe('clarify');
  });

  it('one cohort excluding does not exclude the study when another cohort fits', () => {
    const m = evaluateStudy(study(), oabCtx({etiology: 'neurogenic', line: 'none'}), ann([refractoryOab, neurogenic]));
    expect(m.outcome).toBe('relevant');
    expect(m.cohorts.map(c => c.outcome)).toEqual(['excluded', 'relevant']);
  });

  it('a changed eligibility text stops the annotation from excluding', () => {
    const m = evaluateStudy(study({eh: 'changed'}), oabCtx({etiology: 'idiopathic', line: 'none'}), ann([refractoryOab], 'abc'));
    expect(m.outcome).toBe('unreviewed');
    expect(m.annotationState).toBe('criteriaChanged');
  });

  it('male SUI after radiation: a cohort excluding radiation excludes; unknown radiation clarifies', () => {
    const a = ann([{label: 'Male SUI', description: 'Post-prostatectomy SUI, no radiation', sui: {sex: 'male', radiation: 'excluded'}, passages: ['x'], section: 'Inclusion Criteria'}]);
    const c = (radiation: string) => ({pool: 'continence' as const, state: 'sui' as const, sui: {sex: 'male', priorSurgery: 'none', radiation} as never});
    expect(evaluateStudy(study({tags: ['sui']}), c('yes'), a).outcome).toBe('excluded');
    expect(evaluateStudy(study({tags: ['sui']}), c('unknown'), a).outcome).toBe('clarify');
    expect(evaluateStudy(study({tags: ['sui']}), c('no'), a).outcome).toBe('relevant');
  });

  it('stricture location and prior urethroplasty', () => {
    const a = ann([{label: 'Bulbar, recurrent after urethrotomy', description: 'x', stricture: {locations: ['bulbar'], priorEndoscopic: 'required', priorUrethroplasty: 'excluded'}, passages: ['x'], section: 'Inclusion Criteria'}]);
    const c = (location: string, prior: string) => ({pool: 'stricture' as const, state: 'stricture' as const, stricture: {location, prior, lichen: 'unknown'} as never});
    expect(evaluateStudy(study({tags: ['stricture']}), c('bulbar', 'endoscopic'), a).outcome).toBe('relevant');
    expect(evaluateStudy(study({tags: ['stricture']}), c('penile', 'endoscopic'), a).outcome).toBe('excluded');
    expect(evaluateStudy(study({tags: ['stricture']}), c('bulbar', 'urethroplasty'), a).outcome).toBe('excluded');
  });

  it('prolapse: uterus and stage', () => {
    const a = ann([{label: 'Uterine prolapse', description: 'x', prolapse: {uterus: 'required', minStage: 2}, passages: ['x'], section: 'Inclusion Criteria'}]);
    const c = (uterus: string, stage: string) => ({pool: 'urogyn' as const, state: 'prolapse' as const, prolapse: {compartment: 'apical', uterus, priorRepair: 'none', stage} as never});
    expect(evaluateStudy(study({tags: ['prolapse']}), c('present', '3'), a).outcome).toBe('relevant');
    expect(evaluateStudy(study({tags: ['prolapse']}), c('absent', '3'), a).outcome).toBe('excluded');
    expect(evaluateStudy(study({tags: ['prolapse']}), c('present', '1'), a).outcome).toBe('excluded');
    expect(evaluateStudy(study({tags: ['prolapse']}), c('unknown', 'unknown'), a).outcome).toBe('clarify');
  });

  it('a time-limited or partial third-line exclusion never hard-excludes', () => {
    const a = ann([{label: 'x', description: 'x', oab: {thirdLine: 'checkExcluded'}, passages: ['x'], section: 'Exclusion Criteria'}]);
    expect(evaluateStudy(study(), oabCtx({line: 'thirdLine'}), a).outcome).toBe('clarify');
    expect(evaluateStudy(study(), oabCtx({line: 'medication'}), a).outcome).toBe('relevant');
  });

  it('without an annotation a study is registry text only, never excluded', () => {
    const m = evaluateStudy(study({sig: ['thirdLine']}), oabCtx({etiology: 'neurogenic'}));
    expect(m.outcome).toBe('unreviewed');
    expect(m.reasons.join(' ')).toMatch(/sacral neuromodulation/);
  });

  it('an annotated cohort places a study in its disease state even without a text tag', () => {
    expect(inDiseaseState(study({tags: []}), 'oab', ann([refractoryOab]))).toBe(true);
    expect(inDiseaseState(study({tags: []}), 'oab')).toBe(false);
  });

  it('annotation state: passage must still be in the text', () => {
    const a = ann([{...refractoryOab, passages: ['failed medication']}]);
    expect(annotationState(a, {eh: 'abc', eligibility: {text: 'Inclusion: failed medication'}})).toBe('current');
    expect(annotationState(a, {eh: 'abc', eligibility: {text: 'Inclusion: none'}})).toBe('passageMissing');
    expect(annotationState(a, {eh: 'zzz', eligibility: {text: 'failed medication'}})).toBe('criteriaChanged');
  });
});

describe('search', () => {
  const s = study({id: 'NCT04640623', acr: 'SunRISe-1', iv: [{n: 'TAR-200', ty: 'DRUG'}], sites: [site('Stanford Cancer Institute Palo Alto', 37.44, -122.14, 'RECRUITING', {pi: ['Ali R. Khaki']})], ids: ['EA8192']});
  const hay = studyHaystack(s, [['TAR-200', 'gemcitabine intravesical system', 'Inlexzo']]);
  it('finds NCT, acronym, intervention, alias, institution, investigator and group number', () => {
    for (const q of ['NCT04640623', 'sunrise 1', 'TAR 200', 'tar-200', 'inlexzo', 'stanford', 'khaki', 'ea8192']) expect(matchesQuery(hay, q)).toBe(true);
    expect(matchesQuery(hay, 'pembrolizumab')).toBe(false);
  });
  it('parses NCT numbers', () => {
    expect(parseNct('nct04628767')).toBe('NCT04628767');
    expect(parseNct('see NCT 04628767')).toBe('NCT04628767');
    expect(parseNct('EA8192')).toBeNull();
  });
});

describe('normalisation and pools', () => {
  const raw = {
    protocolSection: {
      identificationModule: {nctId: 'NCT09999999', briefTitle: 'A <b>trial</b>', acronym: 'X'},
      statusModule: {overallStatus: 'RECRUITING', statusVerifiedDate: '2026-07', lastUpdatePostDateStruct: {date: '2026-11-18', type: 'ACTUAL'}},
      designModule: {studyType: 'INTERVENTIONAL', designInfo: {primaryPurpose: 'TREATMENT'}},
      conditionsModule: {conditions: ['Overactive Bladder']},
      eligibilityModule: {eligibilityCriteria: 'Inclusion Criteria:\n* high grade UTUC\n\nExclusion Criteria:\n* none'},
      contactsLocationsModule: {
        centralContacts: [{name: 'Central', role: 'CONTACT', phone: '555-0100'}],
        locations: [
          {facility: 'Site A', status: 'RECRUITING', city: 'Palo Alto', state: 'California', zip: '94304', country: 'United States', geoPoint: {lat: 37.44, lon: -122.14}, contacts: [{name: 'Dr A', role: 'PRINCIPAL_INVESTIGATOR'}]},
          {facility: 'Site B', city: 'Toronto', country: 'Canada'},
          {facility: 'Site C', city: 'Nowhere', state: 'Ohio', country: 'United States'},
        ],
      },
    },
  };
  it('keeps US sites, counts non-US, keeps missing status missing, and records month precision', async () => {
    const {index, detail} = await normalizeStudy(raw, {hints: [{pool: 'continence'}]});
    expect(index.sites.map(s => s.f)).toEqual(['Site A', 'Site C']);
    expect(index.nonUs).toBe(1);
    expect(index.sites[1].st).toBeUndefined();
    expect(index.sites[0].pi).toEqual(['Dr A']);
    expect(index.ver).toBe('2026-07');
    expect(index.tags).toContain('oab');
    expect(index.eh).toBe(await sha16(raw.protocolSection.eligibilityModule.eligibilityCriteria));
    expect(detail.central?.[0].phone).toBe('555-0100');
    expect(index.t).toBe('A <b>trial</b>');
  });
});

describe('referral summary', () => {
  it('labels central contacts, keeps missing contacts missing and carries no patient fields', () => {
    const text = referralSummary({
      detail: {schema: 1, id: 'NCT04628767', briefTitle: 'Durvalumab before surgery', status: {overall: 'RECRUITING', lastUpdatePosted: {d: '2026-11-18', t: 'ACTUAL'}, verified: '2026-07'}, design: {type: 'INTERVENTIONAL'}, conditions: [], interventions: [], eligibility: {}, sites: [], central: [{name: 'Central desk', phone: '555-0100'}]},
      site: {f: 'Stanford Cancer Institute Palo Alto', c: 'Palo Alto', s: 'CA', st: 'RECRUITING'},
    });
    expect(text).toMatch(/No site-specific contact listed/);
    expect(text).toMatch(/Central study contact \(not site-specific\): Central desk/);
    expect(text).toMatch(/status verified: July 2026/);
    expect(text).not.toMatch(/patient name|date of birth|MRN/i);
  });
});

describe('refresh retrieval', () => {
  const q = {id: 't', pools: ['continence' as const], label: 't', params: {}};
  const page = (ids: string[], next?: string, total?: number) => ({studies: ids.map(id => ({protocolSection: {identificationModule: {nctId: id}}})), nextPageToken: next, totalCount: total});
  it('exhausts pagination and checks the total', async () => {
    const pages = [page(['NCT00000001', 'NCT00000002'], 'p2', 3), page(['NCT00000003'])];
    const r = await retrieveQuery(q, async () => pages.shift());
    expect(r.studies).toHaveLength(3);
  });
  it('fails (so the last snapshot is kept) when the retrieved count falls short', async () => {
    const pages = [page(['NCT00000001'], undefined, 2)];
    await expect(retrieveQuery(q, async () => pages.shift())).rejects.toThrow(/retrieved 1 of 2/);
  });
  it('a completed query with zero results is a real zero, not a failure', async () => {
    const r = await retrieveQuery(q, async () => page([], undefined, 0));
    expect(r.studies).toHaveLength(0);
    expect(r.totalCount).toBe(0);
  });
});

describe('compact snapshot detail', () => {
  it('keeps contacts by site and rebuilds the site list from the index', async () => {
    const {compactDetail, hydrateDetail} = await import('./detail');
    const detail = {schema: 1 as const, id: 'NCT00000001', briefTitle: 'x', status: {overall: 'RECRUITING'}, design: {type: 'INTERVENTIONAL'}, conditions: [], interventions: [{name: 'Drug', description: 'long text'}], eligibility: {}, summary: 'long',
      sites: [{f: 'A', c: 'X', z: '00601', st: 'RECRUITING', contacts: [{name: 'Coordinator', phone: '555'}]}, {f: 'B', c: 'Y'}]};
    const compact = compactDetail(detail);
    expect(compact.sites).toEqual([]);
    expect(compact.summary).toBeUndefined();
    expect(compact.interventions[0].description).toBeUndefined();
    const idx = study({sites: [{f: 'A', c: 'X', z: '00601', st: 'RECRUITING', la: 18.2, lo: -66.7}, {f: 'B', c: 'Y'}]});
    const full = hydrateDetail(compact, idx);
    expect(full.sites[0].contacts?.[0].name).toBe('Coordinator');
    expect(full.sites[0].la).toBe(18.2);
    expect(full.sites[1].contacts).toBeUndefined();
  });
});

describe('scope gate', () => {
  it('keeps functional studies, drops oncology-primary, stones, infertility and child-only studies', async () => {
    const {outOfScope} = await import('./classify');
    expect(outOfScope('Sacral Neuromodulation for Male Overactive Bladder', 'MOAB', ['Overactive Bladder', 'Urinary Urgency Incontinence', 'Prostate Cancer'])).toBeNull();
    expect(outOfScope('Artificial Urinary Sphincter After Radical Prostatectomy for Prostate Cancer', undefined, ['Prostate Cancer'])).toBeNull();
    expect(outOfScope('A Study of TAR-200', 'SunRISe-1', ['Bladder Cancer'])).toBe('oncology');
    expect(outOfScope('Ureteroscopy for Kidney Stones', undefined, ['Nephrolithiasis'])).toBe('stones and endourology');
    expect(outOfScope('Varicocele Repair', undefined, ['Male Infertility'])).toBe('infertility');
    expect(outOfScope('Bladder Training in Children', undefined, ['Enuresis'], ['CHILD'])).toBe('children only');
    expect(outOfScope('Melatonin for Prevention of Kidney Injury', undefined, ['Acute Kidney Injury'])).toBe('not urologic');
  });
});
