/**
 * WARWIKI homepage data plugin.
 *
 * Exposes build-time global data for the homepage (read with
 * usePluginData('warwiki-home-data')):
 *   - recent:     the most recently updated articles, taken from the docs
 *                 plugin's git-based lastUpdatedAt, one per section first
 *   - schematics: number of original SVG schematics in static/img/diagrams
 *   - videos:     number of entries in the Video Library registry
 *   - sections:   page count per top-level section, keyed by URL segment
 *
 * Nothing is written to the repository, so builds stay free of generated
 * source changes (see the same guard in scripts/gen-stats.js).
 */

const fs = require('fs');
const path = require('path');

const SECTIONS = {
  foundations: 'Foundations',
  evaluation: 'Evaluation',
  'clinical-conditions': 'Clinical Conditions',
  'surgical-techniques': 'Treatment Atlas',
  'special-populations': 'Special Populations',
};

const RECENT_COUNT = 4;

function countSchematics(siteDir) {
  try {
    return fs.readdirSync(path.join(siteDir, 'static/img/diagrams')).filter((f) => f.endsWith('.svg')).length;
  } catch {
    return 0;
  }
}

function countVideos(siteDir) {
  try {
    const src = fs.readFileSync(path.join(siteDir, 'src/data/videos.ts'), 'utf8');
    return (src.match(/^\s*\{ id: "/gm) || []).length;
  } catch {
    return 0;
  }
}

function countSections(docs) {
  const counts = {};
  for (const d of docs) {
    const key = d.permalink.split('/')[2];
    if (SECTIONS[key] && !d.unlisted) counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function pickRecent(docs) {
  const candidates = docs
    .filter((d) => d.lastUpdatedAt && !d.frontMatter?.hide_title && !d.unlisted)
    .map((d) => {
      const key = d.permalink.split('/')[2];
      return { title: d.title, permalink: d.permalink, section: SECTIONS[key], sectionKey: key, updatedAt: d.lastUpdatedAt };
    })
    .filter((d) => d.section)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  // One page per section first, so the strip is not four pages of one commit.
  const picked = [];
  const seen = new Set();
  for (const d of candidates) {
    if (picked.length >= RECENT_COUNT) break;
    if (seen.has(d.sectionKey)) continue;
    seen.add(d.sectionKey);
    picked.push(d);
  }
  for (const d of candidates) {
    if (picked.length >= RECENT_COUNT) break;
    if (!picked.includes(d)) picked.push(d);
  }
  return picked.sort((a, b) => b.updatedAt - a.updatedAt);
}

module.exports = function warwikiHomeData(context) {
  return {
    name: 'warwiki-home-data',
    async allContentLoaded({ allContent, actions }) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default;
      const docs = docsContent?.loadedVersions?.[0]?.docs ?? [];
      actions.setGlobalData({
        recent: pickRecent(docs),
        sections: countSections(docs),
        schematics: countSchematics(context.siteDir),
        videos: countVideos(context.siteDir),
      });
    },
  };
};
