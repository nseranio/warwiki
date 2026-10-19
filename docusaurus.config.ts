import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GOOGLE_FONTS_CSS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';

// The trial data (src/data/clinical-evidence) is imported by every trial page and the Clinical Evidence landing.
// Docusaurus only shares modules used by half of all pages, so without this group each trial page would bundle its
// own copy. One shared chunk keeps the build small (same plugin as WHITWIKI, October 18).
function evidenceDataChunk() {
  return {
    name: 'evidence-data-chunk',
    configureWebpack(_config: unknown, isServer: boolean) {
      if (isServer) return {};
      return {optimization: {splitChunks: {cacheGroups: {evidenceData: {
        test: /[\\/]src[\\/]data[\\/]clinical-evidence[\\/]/, name: 'evidence-data', chunks: 'all' as const,
        minChunks: 2, priority: 50, enforce: true, reuseExistingChunk: true,
      }}}}};
    },
  };
}

const config: Config = {
  title: 'WARWIKI',
  tagline: 'Reconstruction, codified.',
  favicon: 'img/favicon.svg',

  customFields: {
    // Device speech is the default. Enabling paid cloud audio requires an
    // explicit build/runtime setting; keep the API key server-side only.
    cloudTtsEnabled: process.env.WARWIKI_ENABLE_CLOUD_TTS === 'true',
    // English handouts publish by default (set WARWIKI_INCLUDE_HANDOUTS=false to
    // pause). Translations stay off until they are redone from the final English.
    handoutsEnabled: process.env.WARWIKI_INCLUDE_HANDOUTS !== 'false',
    handoutTranslationsEnabled: process.env.WARWIKI_INCLUDE_HANDOUT_TRANSLATIONS === 'true',
  },

  future: {
    v4: true,
  },

  url: 'https://warwiki.org',
  baseUrl: '/',

  organizationName: 'nseranio',
  projectName: 'warwiki',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  // Citation anchors are raw HTML. The postbuild rendered-link checker validates
  // actual output IDs, including citations and data-driven links.
  onBrokenAnchors: 'ignore',

  headTags: [
    // Fonts: preconnect, then load the Google Fonts stylesheet without blocking
    // render (media="print" until loaded). Text paints at once in the
    // metric-matched "Inter Fallback" and Inter swaps in without reflow; see the
    // FONTS note at the top of src/css/custom.css.
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: GOOGLE_FONTS_CSS,
        media: 'print',
        onload: "this.media='all'",
      },
    },
    {
      tagName: 'noscript',
      attributes: {},
      innerHTML: `<link rel="stylesheet" href="${GOOGLE_FONTS_CSS}">`,
    },
    // Home-screen app: icon and name used by "Add to Home Screen" (iOS) and install (Android).
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'}},
    // Large PNG icons for Safari Favorites / Top Sites tiles, which otherwise
    // keep only an 80 px copy of the touch icon and look soft on Retina screens.
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '192x192', href: '/img/app-icon-192.png'}},
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '512x512', href: '/img/app-icon-512.png'}},
    {tagName: 'link', attributes: {rel: 'manifest', href: '/site.webmanifest'}},
    {tagName: 'meta', attributes: {name: 'apple-mobile-web-app-title', content: 'WARWIKI'}},
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

  plugins: ['./plugins/warwiki-home-data.js', evidenceDataChunk],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nseranio/warwiki/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
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
          position: 'left',
          label: 'Library',
          items: [
            {to: '/docs/clinical-evidence', label: 'Clinical Evidence'},
            {to: '/video-library', label: 'Video Library'},
            {to: '/docs/resources', label: 'Resources'},
            {to: '/docs/roots', label: 'History'},
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
          title: 'Resources',
          items: [
            {label: 'Video Library', to: '/video-library'},
            {label: 'Resources', to: '/docs/resources'},
            {label: 'Clinical Evidence', to: '/docs/clinical-evidence'},
            {label: 'History', to: '/docs/roots'},
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
      searchParameters: {
        hitsPerPage: 20,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
