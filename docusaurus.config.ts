import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'WARWIKI',
  tagline: 'The digital atlas of Genitourinary Reconstruction, Pelvic Health & Functional Urology',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://warwiki.org',
  baseUrl: '/',

  organizationName: 'nseranio',
  projectName: 'warwiki',
  trailingSlash: false,

  onBrokenLinks: 'warn',

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
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'WARWIKI',
      hideOnScroll: true,
      logo: {
        alt: 'WARWIKI',
        src: 'img/logo.svg',
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
          label: 'Evaluation & Workup',
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
          label: 'Surgical Techniques',
        },
        {
          type: 'docSidebar',
          sidebarId: 'populationsSidebar',
          position: 'left',
          label: 'Special Populations',
        },
        {
          type: 'docSidebar',
          sidebarId: 'journalSidebar',
          position: 'left',
          label: 'Journal Club',
        },
        {
          type: 'docSidebar',
          sidebarId: 'rootsSidebar',
          position: 'left',
          label: 'Roots',
        },
        {
          type: 'docSidebar',
          sidebarId: 'resourcesSidebar',
          position: 'left',
          label: 'Resources',
        },
        {
          href: 'https://github.com/nseranio/warwiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Sections',
          items: [
            {label: 'Foundations', to: '/docs/foundations'},
            {label: 'Evaluation & Workup', to: '/docs/evaluation'},
            {label: 'Clinical Conditions', to: '/docs/clinical-conditions'},
            {label: 'Surgical Techniques', to: '/docs/surgical-techniques'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Special Populations', to: '/docs/special-populations'},
            {label: 'Journal Club', to: '/docs/journal-club'},
            {label: 'Roots of Reconstruction', to: '/docs/roots'},
            {label: 'Resources', to: '/docs/resources'},
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nseranio/warwiki',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WARWIKI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
