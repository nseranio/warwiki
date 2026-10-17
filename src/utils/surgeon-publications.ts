export interface ProfilePublication {
  id?: string;
  cite: string;
  doi?: string | null;
  pmid?: string | null;
  url?: string | null;
  pages?: {title: string; url: string; ref: string}[];
}

function normalized(text: string): string {
  return text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function doi(publication: ProfilePublication): string | undefined {
  const value = publication.doi ?? publication.cite.match(/10\.\d{4,9}\/[^\s)]+/i)?.[0];
  return value?.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').trim().toLowerCase();
}

/** Match paper identity even when another page abbreviates its author list. */
export function samePublication(a: ProfilePublication, b: ProfilePublication): boolean {
  const aDoi = doi(a);
  const bDoi = doi(b);
  if (aDoi && bDoi) return aDoi === bDoi;
  if (a.pmid && b.pmid) return a.pmid === b.pmid;
  if (normalized(a.cite) === normalized(b.cite)) return true;
  for (const [selected, other] of [[a, b], [b, a]]) {
    const title = selected.cite.match(/["“]([^"”]+)["”]/)?.[1];
    if (title && title.length > 20 && normalized(other.cite).includes(normalized(title))) return true;
  }
  return false;
}
