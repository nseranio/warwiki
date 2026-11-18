#!/usr/bin/env node
/**
 * Reconstructive & Functional Urology Trial Finder (WARWIKI): refresh the registry snapshot.
 *
 *   node --experimental-strip-types scripts/clinical-trials/refresh.ts [--out static/trial-finder/data]
 *
 * Retrieves every query in src/lib/clinical-trials/pools.ts from the public
 * ClinicalTrials.gov API v2, exhausts pagination, checks the retrieved count
 * against the API's total, normalises, and swaps the new snapshot into place
 * only when every query completed. Any failure exits non-zero and leaves the
 * last good snapshot untouched. Raw responses are never written to disk.
 */
import fs from 'node:fs';
import path from 'node:path';
import {QUERIES, QUERY_VERSION, POOL_ORDER, type RegistryQuery, type PoolHint} from '../../src/lib/clinical-trials/pools.ts';
import {normalizeStudy} from '../../src/lib/clinical-trials/normalize.ts';
import {checkAnnotations} from '../../src/lib/clinical-trials/annotations.ts';
import {compactDetail} from '../../src/lib/clinical-trials/detail.ts';
import {outOfScope} from '../../src/lib/clinical-trials/classify.ts';
import type {IndexStudy, Manifest, PoolFile, PoolId, StudyAnnotation, StudyDetail} from '../../src/lib/clinical-trials/types.ts';
import type {ZctaTable} from '../../src/lib/clinical-trials/geo.ts';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const API = 'https://clinicaltrials.gov/api/v2';
const PAGE_SIZE = 200;
const MAX_PAGES = 60;
const TIMEOUT_MS = 90_000;
const MAX_BYTES = 80 * 1024 * 1024;
const STALE_AFTER_HOURS = Number(process.env.TRIAL_STALE_HOURS ?? 48);
/** A pool shrinking by more than this share against the previous snapshot fails the refresh. */
const MAX_DROP = Number(process.env.TRIAL_MAX_DROP ?? 0.35);
const FIELDS = [
  'IdentificationModule', 'StatusModule', 'SponsorCollaboratorsModule', 'DescriptionModule', 'ConditionsModule',
  'DesignModule', 'ArmsInterventionsModule', 'EligibilityModule', 'ContactsLocationsModule', 'LargeDocumentModule',
].join(',');

const args = process.argv.slice(2);
const outArg = args.indexOf('--out');
const OUT = path.resolve(ROOT, outArg >= 0 ? args[outArg + 1] : 'static/trial-finder/data');
const ZCTA_PATH = path.join(ROOT, 'static/trial-finder/zcta.json');
const ANNOTATIONS_PATH = path.join(ROOT, 'src/data/clinical-trial-finder/annotations.json');

const log = (...m: unknown[]) => console.log(`[trial-refresh ${new Date().toISOString()}]`, ...m);

async function fetchJson(url: string, attempt = 1): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {signal: controller.signal, headers: {Accept: 'application/json', 'User-Agent': 'WHITWIKI-trial-finder/1 (public registry snapshot)'}});
    if (res.status === 429 || res.status >= 500) throw new RetryableError(`HTTP ${res.status}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const text = await res.text();
    if (text.length > MAX_BYTES) throw new Error(`Response over ${MAX_BYTES} bytes for ${url}`);
    return JSON.parse(text);
  } catch (err) {
    const retryable = err instanceof RetryableError || (err as Error).name === 'AbortError' || (err as Error).name === 'TypeError';
    if (retryable && attempt < 5) {
      const wait = 2000 * 2 ** (attempt - 1);
      log(`retry ${attempt} in ${wait} ms: ${(err as Error).message}`);
      await new Promise(r => setTimeout(r, wait));
      return fetchJson(url, attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
class RetryableError extends Error {}

export async function retrieveQuery(q: RegistryQuery, fetcher: (url: string) => Promise<any> = fetchJson): Promise<{studies: any[]; totalCount: number}> {
  const studies = new Map<string, any>();
  let token: string | undefined;
  let totalCount: number | undefined;
  for (let page = 0; page < MAX_PAGES; page++) {
    const params = new URLSearchParams({...q.params, pageSize: String(PAGE_SIZE), fields: FIELDS, format: 'json'});
    if (page === 0) params.set('countTotal', 'true');
    if (token) params.set('pageToken', token);
    const body = await fetcher(`${API}/studies?${params}`);
    if (!body || !Array.isArray(body.studies)) throw new Error(`Query ${q.id}: unexpected response shape on page ${page + 1}`);
    if (page === 0) {
      if (typeof body.totalCount !== 'number') throw new Error(`Query ${q.id}: no totalCount`);
      totalCount = body.totalCount;
    }
    for (const s of body.studies) {
      const id = s?.protocolSection?.identificationModule?.nctId;
      if (typeof id !== 'string') throw new Error(`Query ${q.id}: study without NCT id`);
      studies.set(id, s);
    }
    token = body.nextPageToken;
    if (!token) break;
    if (page === MAX_PAGES - 1) throw new Error(`Query ${q.id}: pagination did not finish within ${MAX_PAGES} pages`);
  }
  if (totalCount === undefined) throw new Error(`Query ${q.id}: no pages`);
  if (studies.size !== totalCount) throw new Error(`Query ${q.id}: retrieved ${studies.size} of ${totalCount}; snapshot not replaced`);
  return {studies: [...studies.values()], totalCount};
}

function readJson<T>(file: string): T | undefined {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return undefined;
  }
}

/** One study per line, so daily diffs stay small and readable. */
function poolJson(file: PoolFile): string {
  const head = JSON.stringify({schema: file.schema, version: file.version, pool: file.pool});
  return `${head.slice(0, -1)},"studies":[\n${file.studies.map(s => JSON.stringify(s)).join(',\n')}\n]}\n`;
}

async function main() {
  const startedAt = new Date().toISOString();
  const version = startedAt.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const zcta = readJson<ZctaTable>(ZCTA_PATH);
  if (!zcta || Object.keys(zcta).length < 30000) throw new Error('static/trial-finder/zcta.json missing or incomplete; run build-zcta.ts first');
  const annotations = readJson<StudyAnnotation[]>(ANNOTATIONS_PATH) ?? [];
  const previous = readJson<Manifest>(path.join(OUT, 'manifest.json'));

  const apiVersion = await fetchJson(`${API}/version`);
  log('API', apiVersion);

  const raw = new Map<string, any>();
  const hints = new Map<string, PoolHint[]>();
  const queryStats: Record<string, {totalCount: number; retrieved: number}> = {};
  for (const q of QUERIES) {
    const {studies, totalCount} = await retrieveQuery(q);
    queryStats[q.id] = {totalCount, retrieved: studies.length};
    log(`${q.id}: ${studies.length} of ${totalCount}`);
    for (const s of studies) {
      const id = s.protocolSection.identificationModule.nctId;
      raw.set(id, s);
      const h = hints.get(id) ?? [];
      if (q.basket) h.push({basket: true});
      for (const p of q.pools) h.push({pool: p});
      hints.set(id, h);
    }
  }

  const index: IndexStudy[] = [];
  const details: StudyDetail[] = [];
  let noUsSites = 0;
  let noPool = 0;
  const outScope: Record<string, number> = {};
  for (const [id, s] of raw) {
    const {index: idx, detail} = await normalizeStudy(s, {zcta, hints: hints.get(id)});
    if (!idx.sites.length) {
      noUsSites++;
      continue;
    }
    if (!idx.pools.length) {
      noPool++;
      continue;
    }
    const why = outOfScope(idx.t, idx.acr, idx.cond, idx.ages);
    if (why) {
      outScope[why] = (outScope[why] ?? 0) + 1;
      continue;
    }
    index.push(idx);
    details.push(detail);
  }
  index.sort((a, b) => a.id.localeCompare(b.id));

  const pools = {} as Manifest['pools'];
  const poolFiles: PoolFile[] = [];
  for (const pool of POOL_ORDER) {
    const studies = index.filter(s => s.pools.includes(pool));
    const sites = studies.reduce((n, s) => n + s.sites.length, 0);
    const prev = previous?.pools?.[pool]?.studies;
    if (!studies.length) throw new Error(`Pool ${pool} is empty after normalisation`);
    if (prev && studies.length < prev * (1 - MAX_DROP)) throw new Error(`Pool ${pool} fell from ${prev} to ${studies.length} studies; snapshot not replaced (set TRIAL_MAX_DROP to override after checking)`);
    poolFiles.push({schema: 1, version, pool, studies});
    pools[pool] = {
      file: `pools/${pool}.json`,
      studies: studies.length,
      sites,
      queries: QUERIES.filter(q => q.pools.includes(pool)).map(q => ({id: q.id, ...queryStats[q.id]})),
    };
  }

  const annotationChecks = checkAnnotations(annotations, new Map(details.map(d => [d.id, d])));
  for (const c of annotationChecks.filter(c => c.state !== 'current')) log(`annotation ${c.nct} "${c.cohort}": ${c.state}`);

  const manifest: Manifest = {
    schema: 1,
    version,
    queryVersion: QUERY_VERSION,
    source: {name: 'ClinicalTrials.gov API v2', api: API, apiVersion: apiVersion?.apiVersion, dataTimestamp: apiVersion?.dataTimestamp},
    startedAt,
    refreshedAt: new Date().toISOString(),
    staleAfterHours: STALE_AFTER_HOURS,
    pools,
    totals: {studies: index.length, sites: index.reduce((n, s) => n + s.sites.length, 0)},
    annotationChecks,
    limits: [
      'United States locations only; non-US sites are counted but not listed.',
      `Studies whose overall status is ${['RECRUITING', 'NOT_YET_RECRUITING', 'ENROLLING_BY_INVITATION', 'ACTIVE_NOT_RECRUITING', 'SUSPENDED'].join(', ')}; completed, terminated and withdrawn studies are reached by NCT lookup.`,
      `Studies with no US location listed are left out (${noUsSites} this refresh).`,
      `Out of WARWIKI scope and left out: ${Object.entries(outScope).map(([k, v]) => `${v} ${k}`).join(', ') || 'none'} (judged on title and first two conditions; oncology-primary studies stay in only when the title names a functional or reconstructive topic, and are listed on WHITWIKI's GU Oncology Trial Finder).`,
      'Disease-setting tags come from registry wording and are not clinician review.',
    ],
  };

  // Write the complete snapshot to a staging folder, then swap it into place.
  const staging = `${OUT}.staging-${process.pid}`;
  fs.rmSync(staging, {recursive: true, force: true});
  fs.mkdirSync(path.join(staging, 'pools'), {recursive: true});
  fs.mkdirSync(path.join(staging, 'studies'), {recursive: true});
  for (const pf of poolFiles) fs.writeFileSync(path.join(staging, 'pools', `${pf.pool}.json`), poolJson(pf));
  for (const d of details) fs.writeFileSync(path.join(staging, 'studies', `${d.id}.json`), `${JSON.stringify(compactDetail(d))}\n`);
  fs.writeFileSync(path.join(staging, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  const written = fs.readdirSync(path.join(staging, 'studies')).length;
  if (written !== details.length) throw new Error(`Staging wrote ${written} of ${details.length} study files`);

  const old = `${OUT}.old-${process.pid}`;
  if (fs.existsSync(OUT)) fs.renameSync(OUT, old);
  fs.renameSync(staging, OUT);
  fs.rmSync(old, {recursive: true, force: true});
  log(`snapshot ${version}: ${manifest.totals.studies} studies, ${manifest.totals.sites} US sites`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => {
    console.error(`[trial-refresh] FAILED: ${(err as Error).stack ?? err}`);
    console.error('[trial-refresh] The previous snapshot was left in place.');
    process.exit(1);
  });
}
