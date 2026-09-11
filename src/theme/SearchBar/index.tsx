import React, {useCallback} from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';
import type {DocSearchTransformClient, DocSearchProps} from '@docsearch/react';
import {expandSearchRequests} from '@site/src/utils/search-aliases';
import {useSearchLinkCreator} from '@docusaurus/theme-common';
import SearchResultsFooter from '@site/src/components/SearchResultsFooter';

type SearchBarProps = React.ComponentProps<typeof OriginalSearchBar>;
export default function SearchBar(props: SearchBarProps): React.ReactElement {
  const createSearchLink = useSearchLinkCreator();
  const resultsFooter = useCallback<NonNullable<DocSearchProps['resultsFooterComponent']>>(({state}) => (
    <SearchResultsFooter query={state.query} count={Number(state.context.nbHits) || 0} createSearchLink={createSearchLink} />
  ), [createSearchLink]);
  const transformSearchClient = useCallback((client: DocSearchTransformClient): DocSearchTransformClient => {
    // A proxy preserves all client methods and search options, changing only
    // a small list of whole-query abbreviations before requests are sent.
    return new Proxy(client, {
      get(target, property, receiver) {
        if (property === 'search') return (...args: unknown[]) => Reflect.apply(target.search, target, [expandSearchRequests(args[0]), ...args.slice(1)]);
        const value = Reflect.get(target, property, receiver);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });
  }, []);
  return <OriginalSearchBar {...props} transformSearchClient={transformSearchClient} resultsFooterComponent={props.resultsFooterComponent ?? resultsFooter} />;
}
