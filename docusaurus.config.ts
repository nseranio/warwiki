import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'WARWIKI',
  tagline: 'A wiki for functional urology, genitourinary reconstruction, and pelvic health.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://nseranio.github.io',
  baseUrl: '/warwiki/',

  organizationName: 'nseranio',
  projectName: 'warwiki',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
      logo: {
        alt: 'WARWIKI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
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
            {label: 'Foundations', to: '/docs/01-foundations'},
            {label: 'Evaluation & Workup', to: '/docs/02-evaluation'},
            {label: 'Clinical Conditions', to: '/docs/03-clinical-conditions'},
            {label: 'Surgical Techniques', to: '/docs/04-surgical-techniques'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Special Populations', to: '/docs/05-special-populations'},
            {label: 'Journal Club', to: '/docs/06-journal-club'},
            {label: 'Roots of Reconstruction', to: '/docs/07-roots'},
            {label: 'Resources', to: '/docs/08-resources'},
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
