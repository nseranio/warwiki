#!/usr/bin/env node
/**
 * Build static/trial-finder/zcta.json (ZIP -> [lat, lon]) from the US Census
 * Bureau Gazetteer ZCTA file (public domain, U.S. government work).
 *
 *   node --experimental-strip-types scripts/clinical-trials/build-zcta.ts [year]
 *
 * ZCTAs approximate USPS ZIP areas; PO-box-only and some single-organisation
 * ZIPs have no ZCTA and the finder says so instead of guessing. Coordinates are
 * the Census internal points, rounded to 3 decimals (about 100 m).
 * Rerun once a year when the Census publishes a new Gazetteer.
 */
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const year = process.argv[2] ?? '2025';
const url = `https://www2.census.gov/geo/docs/maps-data/data/gazetteer/${year}_Gazetteer/${year}_Gaz_zcta_national.zip`;
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const out = path.join(ROOT, 'static/trial-finder/zcta.json');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'zcta-'));
const zip = path.join(dir, 'zcta.zip');
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
fs.writeFileSync(zip, Buffer.from(await res.arrayBuffer()));
const text = execFileSync('unzip', ['-p', zip], {maxBuffer: 64 * 1024 * 1024}).toString('utf8');
fs.rmSync(dir, {recursive: true, force: true});

const lines = text.split(/\r?\n/).filter(Boolean);
const sep = lines[0].includes('|') ? '|' : '\t';
const header = lines[0].split(sep).map(h => h.trim());
const iz = header.indexOf('GEOID');
const ilat = header.indexOf('INTPTLAT');
const ilon = header.indexOf('INTPTLONG');
if (iz < 0 || ilat < 0 || ilon < 0) throw new Error(`Unexpected Gazetteer header: ${header.join(',')}`);
const table: Record<string, [number, number]> = {};
for (const line of lines.slice(1)) {
  const cols = line.split(sep).map(c => c.trim());
  const z = cols[iz];
  const lat = Number(cols[ilat]);
  const lon = Number(cols[ilon]);
  if (!/^\d{5}$/.test(z) || !Number.isFinite(lat) || !Number.isFinite(lon)) continue;
  table[z] = [Math.round(lat * 1000) / 1000, Math.round(lon * 1000) / 1000];
}
const count = Object.keys(table).length;
if (count < 30000) throw new Error(`Only ${count} ZCTAs parsed`);
fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, JSON.stringify(table));
fs.writeFileSync(path.join(path.dirname(out), 'zcta-source.json'), `${JSON.stringify({source: 'U.S. Census Bureau Gazetteer Files, ZIP Code Tabulation Areas', year, url, count, builtAt: new Date().toISOString(), note: 'ZCTA internal points approximate ZIP locations; not every USPS ZIP has a ZCTA.'}, null, 2)}\n`);
console.log(`Wrote ${count} ZCTAs to ${path.relative(ROOT, out)}`);
