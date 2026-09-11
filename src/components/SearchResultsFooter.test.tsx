import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import {afterEach, describe, expect, it} from 'vitest';
import SearchResultsFooter from './SearchResultsFooter';

afterEach(cleanup);
describe('full search results transition', () => {
  it('carries an expanded abbreviation to the separately implemented search page', () => {
    render(<SearchResultsFooter query="SUI" count={12} createSearchLink={query => `/search?q=${encodeURIComponent(query)}`} />);
    const link = screen.getByRole('link', {name: 'See all 12 results'});
    expect(link).toHaveAttribute('href', '/search?q=stress%20urinary%20incontinence');
  });
  it('preserves a specific query and the configured search base path', () => {
    render(<SearchResultsFooter query="BPH after radiation" count={3} createSearchLink={query => `/wiki/find?q=${encodeURIComponent(query)}`} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/wiki/find?q=BPH%20after%20radiation');
  });
});
