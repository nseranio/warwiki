/** Distances, US state names and ZIP handling for the trial finder. */

const EARTH_RADIUS_MI = 3958.8;

/** Straight-line (great-circle) distance in miles. Not travel distance. */
export function distanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.min(1, Math.sqrt(a)));
}

export const STATE_ABBR: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA', Colorado: 'CO', Connecticut: 'CT',
  Delaware: 'DE', 'District of Columbia': 'DC', Florida: 'FL', Georgia: 'GA', Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL',
  Indiana: 'IN', Iowa: 'IA', Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
  Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS', Missouri: 'MO', Montana: 'MT',
  Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA',
  'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT',
  Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV', Wisconsin: 'WI', Wyoming: 'WY',
  'Puerto Rico': 'PR', Guam: 'GU', 'Virgin Islands': 'VI', 'U.S. Virgin Islands': 'VI', 'American Samoa': 'AS',
  'Northern Mariana Islands': 'MP',
};

export function stateAbbr(state?: string): string | undefined {
  if (!state) return undefined;
  return STATE_ABBR[state.trim()] ?? state.trim();
}

/** Normalise user ZIP input. Returns the 5-digit ZIP (leading zeros kept) or null when the input is not a ZIP. */
export function parseZip(input: string): string | null {
  const m = input.trim().match(/^(\d{5})(?:-\d{4})?$/);
  return m ? m[1] : null;
}

/** First five digits of a registry ZIP, or undefined. */
export function zip5(zip?: string): string | undefined {
  if (!zip) return undefined;
  const m = zip.trim().match(/^(\d{5})/);
  return m ? m[1] : undefined;
}

/**
 * ZCTA table: ZIP -> [lat, lon]. Built from the Census Gazetteer ZCTA file
 * (scripts/clinical-trials/build-zcta.ts). A ZCTA approximates a postal ZIP;
 * PO-box-only and some single-organisation ZIPs have no ZCTA.
 */
export type ZctaTable = Record<string, [number, number]>;

export type ZipLookup =
  | {kind: 'ok'; zip: string; lat: number; lon: number}
  | {kind: 'invalid'}
  | {kind: 'noCoordinates'; zip: string};

export function lookupZip(input: string, table: ZctaTable): ZipLookup {
  const zip = parseZip(input);
  if (!zip) return {kind: 'invalid'};
  const point = table[zip];
  if (!point) return {kind: 'noCoordinates', zip};
  return {kind: 'ok', zip, lat: point[0], lon: point[1]};
}

/** Miles between a registry point and the site's ZIP centroid above which the registry point is treated as inconsistent. */
export const GEO_MISMATCH_MILES = 75;
