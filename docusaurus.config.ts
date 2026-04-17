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

  onBrokenLinks: 'warn',
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
              sidebarId: 'journalSidebar',
              label: 'Journal Club',
            },
            {
              type: 'docSidebar',
              sidebarId: 'resourcesSidebar',
              label: 'Resources',
            },
            {
              type: 'docSidebar',
              sidebarId: 'rootsSidebar',
              label: 'Roots of Reconstruction',
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
      links: [],
      copyright: `© ${new Date().getFullYear()} WARWIKI`,
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
