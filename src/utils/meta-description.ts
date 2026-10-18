/**
 * Docusaurus builds a page's meta description from its first paragraph, so
 * inline citations (`<sup>[[1]](#ref1)</sup>`) leak into Google snippets and
 * link previews as "[1]". Strip numeric citation markers; bracketed data such
 * as "[25%]" is kept.
 */
export function cleanMetaDescription(description: string | undefined): string | undefined {
  if (!description) return description;
  return description
    .replace(/\[+\d+(?:\s*[,–-]\s*\d+)*\]+/g, '')
    .replace(/\s*\[+\d*$/, '')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
