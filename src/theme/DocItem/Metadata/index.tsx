import React from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {cleanMetaDescription} from '@site/src/utils/meta-description';

// Same as the theme's DocItem/Metadata, with citation markers removed from
// the generated description.
export default function DocItemMetadata(): React.ReactElement {
  const {metadata, frontMatter, assets} = useDoc();
  return (
    <PageMetadata
      title={metadata.title}
      description={cleanMetaDescription(metadata.description)}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    />
  );
}
