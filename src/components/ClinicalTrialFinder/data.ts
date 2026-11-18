/** Browser-side loading for the trial finder. Snapshot files are first-party; live checks go to ClinicalTrials.gov with the NCT ID only. */
import {normalizeStudy} from '@site/src/lib/clinical-trials/normalize';
import type {Manifest, PoolFile, PoolId, StudyDetail, IndexStudy} from '@site/src/lib/clinical-trials/types';
import type {ZctaTable} from '@site/src/lib/clinical-trials/geo';

const BASE = '/trial-finder/data';

async function getJson<T>(url: string, signal?: AbortSignal, cache: RequestCache = 'default'): Promise<T> {
  const res = await fetch(url, {signal, cache, headers: {Accept: 'application/json'}});
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function loadManifest(signal?: AbortSignal): Promise<Manifest> {
  return getJson<Manifest>(`${BASE}/manifest.json`, signal, 'no-cache');
}

export async function loadPool(pool: PoolId, signal?: AbortSignal): Promise<PoolFile> {
  const file = await getJson<PoolFile>(`${BASE}/pools/${pool}.json`, signal, 'no-cache');
  if (file.schema !== 1 || file.pool !== pool || !Array.isArray(file.studies)) throw new Error('Unexpected pool file');
  return file;
}

export async function loadDetail(nct: string, signal?: AbortSignal): Promise<StudyDetail | null> {
  if (!/^NCT\d{8}$/.test(nct)) return null;
  const res = await fetch(`${BASE}/studies/${nct}.json`, {signal, cache: 'no-cache'});
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as StudyDetail;
}

let zctaPromise: Promise<ZctaTable> | null = null;
export function loadZcta(): Promise<ZctaTable> {
  zctaPromise ??= getJson<ZctaTable>('/trial-finder/zcta.json').catch(err => {
    zctaPromise = null;
    throw err;
  });
  return zctaPromise;
}

export interface LiveRecord {
  index: IndexStudy;
  detail: StudyDetail;
  checkedAt: string;
}

/** Fetch one record directly from ClinicalTrials.gov. Sends only the NCT ID. */
export async function liveLookup(nct: string, signal?: AbortSignal): Promise<LiveRecord | null> {
  if (!/^NCT\d{8}$/.test(nct)) return null;
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), 15000);
  const onAbort = () => timeout.abort();
  signal?.addEventListener('abort', onAbort);
  try {
    const res = await fetch(`https://clinicaltrials.gov/api/v2/studies/${nct}`, {signal: timeout.signal, headers: {Accept: 'application/json'}});
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (text.length > 20 * 1024 * 1024) throw new Error('Record too large');
    const raw = JSON.parse(text);
    let zcta: ZctaTable | undefined;
    try {
      zcta = await loadZcta();
    } catch {
      zcta = undefined;
    }
    const checkedAt = new Date().toISOString();
    const {index, detail} = await normalizeStudy(raw, {zcta, retrievedAt: checkedAt});
    return {index, detail, checkedAt};
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

/* ---------- Shortlist: study and site identifiers only ---------- */

export interface ShortlistItem {
  nct: string;
  /** Site key (facility | city | zip) chosen when saved. */
  site?: string;
}

const KEY = 'warwiki:trial-shortlist:v1';

export function readShortlist(): ShortlistItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter(i => typeof i?.nct === 'string' && /^NCT\d{8}$/.test(i.nct)).map(i => ({nct: i.nct, site: typeof i.site === 'string' ? i.site.slice(0, 300) : undefined})) : [];
  } catch {
    return [];
  }
}

export function writeShortlist(items: ShortlistItem[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items.map(i => ({nct: i.nct, site: i.site}))));
  } catch {
    // Storage unavailable (private mode): the shortlist lasts for this page view only.
  }
}

export {siteKey} from '@site/src/lib/clinical-trials/detail';
