import {test, expect} from '@playwright/test';
import {collectBrowserErrors} from './browser-errors';

test('search page accepts a query, renders a result and handles no results', async ({page}) => {
  const errors = collectBrowserErrors(page);
  const queries: string[] = [];
  await page.route(/https:\/\/[^/]+\.(?:algolia\.net|algolianet\.com)\//, async route => {
    const {requests} = route.request().postDataJSON();
    const results = requests.map((request: {query?: string; params?: string}) => {
      const query = request.query ?? new URLSearchParams(request.params ?? '').get('query') ?? '';
      queries.push(query);
      const hits = query === 'urethral stricture' ? [{
        objectID: 'test-stricture',
        url: 'https://warwiki.org/docs/clinical-conditions/03b-voiding-outlet/urethral-stricture',
        _highlightResult: {hierarchy: {lvl0: {value: 'Clinical Conditions'}, lvl1: {value: 'Male Urethral Stricture'}}},
        _snippetResult: {content: {value: 'Evaluation and treatment options'}},
      }] : [];
      return {query, hits, nbHits: hits.length, nbPages: hits.length ? 1 : 0, page: 0, hitsPerPage: 15, processingTimeMS: 1};
    });
    await route.fulfill({json: {results}});
  });

  await page.goto('/search', {waitUntil: 'load'});
  const input = page.getByRole('searchbox', {name: 'Search', exact: true});
  await expect(input).toBeVisible();
  await expect(input).toHaveValue('');
  await input.fill('urethral stricture');
  await expect.poll(() => queries).toContain('urethral stricture');
  await expect(page.getByRole('main').getByRole('link', {name: 'Male Urethral Stricture'})).toBeVisible();
  await expect(page).toHaveURL(/q=urethral(?:\+|%20)stricture/);

  await input.fill('no-matching-topic');
  await expect(page.getByText('No results were found', {exact: true})).toBeVisible();
  await expect(input).toHaveValue('no-matching-topic');
  expect(errors).toEqual([]);
});
