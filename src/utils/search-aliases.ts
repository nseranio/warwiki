const aliases: Record<string, string> = {
  ruti: 'recurrent urinary tract infection',
  'recurrent uti': 'recurrent urinary tract infection',
  bph: 'benign prostatic hyperplasia',
  luts: 'lower urinary tract symptoms',
  oab: 'overactive bladder',
  uui: 'urgency urinary incontinence',
  sui: 'stress urinary incontinence',
  pop: 'pelvic organ prolapse',
  ed: 'erectile dysfunction',
  aus: 'artificial urinary sphincter',
  ipp: 'inflatable penile prosthesis',
  vvf: 'vesicovaginal fistula',
  rug: 'retrograde urethrogram',
  vcug: 'voiding cystourethrogram',
};

export function expandSearchAlias(query: string): string {
  // Only whole-query aliases: do not rewrite ordinary words or change a
  // clinician's more specific query (e.g. "BPH after radiation").
  return aliases[query.trim().toLowerCase()] ?? query;
}

function expandRequest(request: unknown): unknown {
  if (!request || typeof request !== 'object') return request;
  const value = request as Record<string, unknown>;
  const params = value.params;
  return {
    ...value,
    ...(typeof value.query === 'string' ? {query: expandSearchAlias(value.query)} : {}),
    ...(params && typeof params === 'object' && typeof (params as Record<string, unknown>).query === 'string'
      ? {params: {...params, query: expandSearchAlias((params as {query: string}).query)}} : {}),
  };
}

export function expandSearchRequests(input: unknown): unknown {
  if (Array.isArray(input)) return input.map(expandRequest);
  if (input && typeof input === 'object' && Array.isArray((input as {requests?: unknown}).requests)) {
    const value = input as {requests: unknown[]};
    return {...value, requests: value.requests.map(expandRequest)};
  }
  return input;
}
