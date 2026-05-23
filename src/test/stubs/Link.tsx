import React from 'react';

/**
 * Test stub for `@docusaurus/Link`. Renders a plain anchor so component
 * unit tests don't need the full Docusaurus router.
 */
export default function Link({
  to,
  href,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) {
  return (
    <a href={to ?? href} {...rest}>
      {children}
    </a>
  );
}
