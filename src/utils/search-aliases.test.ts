import {describe, expect, it} from 'vitest';
import {expandSearchAlias, expandSearchRequests} from './search-aliases';

describe('clinical search aliases', () => {
  it('expands whole abbreviations while preserving different concepts and specific queries', () => {
    expect(expandSearchAlias(' rUTI ')).toBe('recurrent urinary tract infection');
    expect(expandSearchAlias('BPH')).toBe('benign prostatic hyperplasia');
    expect(expandSearchAlias('LUTS')).toBe('lower urinary tract symptoms');
    expect(expandSearchAlias('BPH after radiation')).toBe('BPH after radiation');
    expect(expandSearchAlias('advanced')).toBe('advanced');
    expect(expandSearchAlias('')).toBe('');
  });
  it('preserves contextual facets, options and caller inputs for both search client formats', () => {
    const legacy = [{indexName: 'WARWIKI', params: {query: 'POP', facetFilters: ['language:en'], hitsPerPage: 20}}];
    const modern = {requests: [{indexName: 'WARWIKI', query: 'ED', facetFilters: ['language:en']}], strategy: 'none'};
    expect(expandSearchRequests(legacy)).toEqual([{...legacy[0], params: {...legacy[0].params, query: 'pelvic organ prolapse'}}]);
    expect(legacy[0].params.query).toBe('POP');
    expect(expandSearchRequests(modern)).toEqual({...modern, requests: [{...modern.requests[0], query: 'erectile dysfunction'}]});
    expect(modern.requests[0].query).toBe('ED');
    expect(expandSearchRequests(null)).toBeNull();
  });
});
