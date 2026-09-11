import React from 'react';
import {expandSearchAlias} from '@site/src/utils/search-aliases';

type Props = {query: string; count: number; createSearchLink: (query: string) => string};
export default function SearchResultsFooter({query, count, createSearchLink}: Props): React.ReactElement {
  // The full results page uses its own search client. Carry the actual
  // expanded query across, and use native navigation to dispose of the modal:
  // the theme's close callback is private to its default footer component.
  return <a href={createSearchLink(expandSearchAlias(query))}>See all {count} results</a>;
}
