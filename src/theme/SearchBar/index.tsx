import React, {useCallback, useRef} from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';
import type {DocSearchTransformClient, DocSearchProps} from '@docsearch/react';
import {expandSearchAlias, expandSearchRequests, hitCountsFrom} from '@site/src/utils/search-aliases';
import {useSearchLinkCreator} from '@docusaurus/theme-common';
import SearchResultsFooter from '@site/src/components/SearchResultsFooter';

type SearchBarProps = React.ComponentProps<typeof OriginalSearchBar>;
export default function SearchBar(props: SearchBarProps): React.ReactElement {
  const createSearchLink = useSearchLinkCreator();
  const hitCounts = useRef(new Map<string, number>());
  const resultsFooter = useCallback<NonNullable<DocSearchProps['resultsFooterComponent']>>(({state}) => (
    <SearchResultsFooter query={state.query} count={hitCounts.current.get(expandSearchAlias(state.query))} createSearchLink={createSearchLink} />
  ), [createSearchLink]);
  const transformSearchClient = useCallback((client: DocSearchTransformClient): DocSearchTransformClient => {
    // A proxy preserves all client methods and search options, changing only
    // a small list of whole-query abbreviations before requests are sent.
    return new Proxy(client, {
      get(target, property, receiver) {
        if (property === 'search') return async (...args: unknown[]) => {
          const response = await Reflect.apply(target.search, target, [expandSearchRequests(args[0]), ...args.slice(1)]);
          for (const [query, nbHits] of hitCountsFrom(response)) hitCounts.current.set(query, nbHits);
          return response;
        };
        const value = Reflect.get(target, property, receiver);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });
  }, []);
  return <OriginalSearchBar {...props} transformSearchClient={transformSearchClient} resultsFooterComponent={props.resultsFooterComponent ?? resultsFooter} />;
}
