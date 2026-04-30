import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'WARWIKI',
  tagline: 'Reconstruction, codified.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://warwiki.org',
  baseUrl: '/',

  organizationName: 'nseranio',
  projectName: 'warwiki',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  // Kept at 'ignore' because WARWIKI's citation pattern uses raw <a id="refN"></a>
  // HTML anchors (7,597 references site-wide). Docusaurus's broken-anchor checker
  // only recognises heading-derived IDs and emits 400+ false positives that would
  // mask real broken anchors. Replace with a custom check script when feasible.
  onBrokenAnchors: 'ignore',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '001C5E5159BD0E6A',
      },
    },
  ],

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nseranio/warwiki/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/warwiki-social-card.png',
    metadata: [
      {
        name: 'description',
        content:
          'WARWIKI — a reference for functional urology and genitourinary reconstruction. Reconstruction, codified.',
      },
      {name: 'og:description', content: 'A reference for functional urology and genitourinary reconstruction.'},
      {name: 'og:type', content: 'website'},
      {name: 'og:site_name', content: 'WARWIKI'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'WARWIKI — Reconstruction, codified.'},
      {name: 'twitter:description', content: 'A reference for functional urology and genitourinary reconstruction.'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'WARWIKI',
      hideOnScroll: true,
      logo: {
        alt: 'WARWIKI',
        src: 'img/warwiki-logo.svg',
        style: {display: 'none'},
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'foundationsSidebar',
          position: 'left',
          label: 'Foundations',
        },
        {
          type: 'docSidebar',
          sidebarId: 'evaluationSidebar',
          position: 'left',
          label: 'Evaluation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'clinicalSidebar',
          position: 'left',
          label: 'Clinical Conditions',
        },
        {
          type: 'docSidebar',
          sidebarId: 'surgicalSidebar',
          position: 'left',
          label: 'Treatment Atlas',
        },
        {
          type: 'docSidebar',
          sidebarId: 'populationsSidebar',
          position: 'left',
          label: 'Special Populations',
        },
        {
          label: 'Library',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'resourcesSidebar',
              label: 'Resources',
            },
            {
              type: 'docSidebar',
              sidebarId: 'journalSidebar',
              label: 'Journal Club',
            },
            {
              type: 'docSidebar',
              sidebarId: 'rootsSidebar',
              label: 'History & Lineage',
            },
          ],
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          to: '/about',
          label: 'About',
          position: 'right',
        },
        {
          href: 'https://github.com/nseranio/warwiki',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'WARWIKI',
          items: [
            {label: 'About', to: '/about'},
            {label: 'Foundations', to: '/docs/foundations'},
            {label: 'Treatment Atlas', to: '/docs/surgical-techniques'},
          ],
        },
        {
          title: 'Library',
          items: [
            {label: 'Journal Club', to: '/docs/journal-club'},
            {label: 'Resources', to: '/docs/resources'},
            {label: 'History & Lineage', to: '/docs/roots'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/nseranio/warwiki'},
            {label: 'Report an issue', href: 'https://github.com/nseranio/warwiki/issues/new'},
            {label: 'Contact', href: 'mailto:warwikihq@gmail.com'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} WARWIKI · Editorially independent reference for functional urology and genitourinary reconstruction.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'GYFUZH5C10',
      apiKey: 'cff8e1468c9ff78226494ff86aef7e09',
      indexName: 'WARWIKI',
      contextualSearch: true,
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
