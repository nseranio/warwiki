#!/usr/bin/env node
/**
 * WARWIKI social-asset generator.
 *
 * Produces font-independent SVGs (text converted to glyph paths via
 * opentype.js) for avatar + YouTube/Twitter banners, then rasterizes
 * PNGs via sharp at platform-exact dimensions.
 *
 * Inputs:
 *   - /tmp/warwiki-fonts/Inter-500.ttf
 *   - /tmp/warwiki-fonts/Inter-800.ttf
 *   (Downloaded from Google Fonts v20; see README.)
 *
 * Outputs:
 *   - social-assets/svg/avatar-master.svg (1024x1024)
 *   - social-assets/svg/banner-youtube.svg (2560x1440)
 *   - social-assets/svg/banner-twitter.svg (1500x500)
 *   - social-assets/png/avatar-{youtube,twitter,instagram,tiktok}.png
 *   - social-assets/png/banner-{youtube,twitter}.png
 *
 * Run: node social-assets/generate.js
 */

const fs = require('fs');
const path = require('path');
const opentype = require('/tmp/warwiki-svg-gen/node_modules/opentype.js');
const sharp = require('sharp');

const REPO_ROOT = path.resolve(__dirname, '..');
const SVG_DIR = path.join(__dirname, 'svg');
const PNG_DIR = path.join(__dirname, 'png');

// --- Design tokens (verbatim from the repo's design system) ---
const COLORS = {
  primary: '#185FA5',
  primaryDark: '#0F3A67',
  primaryLight: '#1B6CBD',
  primaryLightest: '#3691E2',
  text: '#111827',
  textMuted: '#4B5767',
  accentViolet: '#7C3AED',
  bgTop: '#FFFFFF',
  bgMid: '#F2F7FD',
  bgBottom: '#E8F1FB',
};

// --- Text → path layout (matches index.module.css letter-spacing) ---
function layoutText(font, text, fontSize, letterSpacingPx) {
  let x = 0;
  const glyphPaths = [];
  const chars = [...text];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const glyph = font.charToGlyph(ch);
    const p = glyph.getPath(x, 0, fontSize);
    glyphPaths.push(p.toPathData(3));
    const adv = (glyph.advanceWidth || 0) * (fontSize / font.unitsPerEm);
    x += adv + letterSpacingPx;
  }
  return { pathData: glyphPaths.join(' '), totalWidth: x - letterSpacingPx };
}

// --- Favicon W (canonical geometric W, Inter-800-equivalent, hand-crafted) ---
// From static/img/favicon.svg — viewBox 0 0 32 32
const FAVICON_W_PATH =
  'M5.4 8 L9.2 8 L11.2 18.1 L13.7 8 L18.3 8 L20.8 18.1 L22.8 8 L26.6 8 L22.9 24 L18.5 24 L16 13.9 L13.5 24 L9.1 24 Z';

// --- Hero background (radial glows + vertical linear, identical to homepage) ---
function heroBackgroundDefs(prefix) {
  return `
    <linearGradient id="${prefix}-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${COLORS.bgTop}"/>
      <stop offset="60%" stop-color="${COLORS.bgMid}"/>
      <stop offset="100%" stop-color="${COLORS.bgBottom}"/>
    </linearGradient>
    <radialGradient id="${prefix}-glowA" cx="20%" cy="10%" r="55%">
      <stop offset="0%" stop-color="${COLORS.primaryLightest}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${COLORS.primaryLightest}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${prefix}-glowB" cx="85%" cy="90%" r="55%">
      <stop offset="0%" stop-color="${COLORS.accentViolet}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${COLORS.accentViolet}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${prefix}-title" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${COLORS.primary}"/>
      <stop offset="50%" stop-color="${COLORS.primaryLight}"/>
      <stop offset="100%" stop-color="${COLORS.primaryLightest}"/>
    </linearGradient>`;
}

function heroBackgroundFill(prefix, w, h) {
  return `
    <rect width="${w}" height="${h}" fill="url(#${prefix}-bg)"/>
    <rect width="${w}" height="${h}" fill="url(#${prefix}-glowA)"/>
    <rect width="${w}" height="${h}" fill="url(#${prefix}-glowB)"/>`;
}

// --- 1. Avatar variants ---
// Six treatments of the same favicon-geometric W at 32-unit viewBox.
// Naming: avatar-master is the CHOSEN one (copied from whichever variant
// the user selects). All variants render the same W path.

const AVATAR_VARIANTS = {
  'solid': {
    label: 'A · Solid primary (baseline)',
    defs: '',
    bg: `<rect width="32" height="32" rx="6" fill="${COLORS.primary}"/>`,
    wFill: '#FFFFFF',
  },
  'deep-navy': {
    label: 'B · Deep navy',
    defs: '',
    bg: `<rect width="32" height="32" rx="6" fill="${COLORS.primaryDark}"/>`,
    wFill: '#FFFFFF',
  },
  'glow': {
    label: 'C · Radial glow (hero echo)',
    defs: `
      <radialGradient id="av-glow-bg" cx="25%" cy="20%" r="90%">
        <stop offset="0%" stop-color="#1B6CBD"/>
        <stop offset="60%" stop-color="${COLORS.primary}"/>
        <stop offset="100%" stop-color="${COLORS.primaryDark}"/>
      </radialGradient>`,
    bg: `<rect width="32" height="32" rx="6" fill="url(#av-glow-bg)"/>`,
    wFill: '#FFFFFF',
  },
  'diagonal': {
    label: 'D · Diagonal gradient',
    defs: `
      <linearGradient id="av-diag-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${COLORS.primaryDark}"/>
        <stop offset="100%" stop-color="${COLORS.primaryLight}"/>
      </linearGradient>`,
    bg: `<rect width="32" height="32" rx="6" fill="url(#av-diag-bg)"/>`,
    wFill: '#FFFFFF',
  },
  'wordmark-gradient': {
    label: 'E · Wordmark-gradient bg (L→R)',
    defs: `
      <linearGradient id="av-wm-bg" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${COLORS.primary}"/>
        <stop offset="50%" stop-color="${COLORS.primaryLight}"/>
        <stop offset="100%" stop-color="${COLORS.primaryLightest}"/>
      </linearGradient>`,
    bg: `<rect width="32" height="32" rx="6" fill="url(#av-wm-bg)"/>`,
    wFill: '#FFFFFF',
  },
  'inverted': {
    label: 'F · Inverted (white bg, gradient W)',
    defs: `
      <linearGradient id="av-inv-w" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${COLORS.primary}"/>
        <stop offset="50%" stop-color="${COLORS.primaryLight}"/>
        <stop offset="100%" stop-color="${COLORS.primaryLightest}"/>
      </linearGradient>`,
    bg: `<rect width="32" height="32" rx="6" fill="#FFFFFF" stroke="${COLORS.primary}" stroke-width="0.5"/>`,
    wFill: 'url(#av-inv-w)',
  },
};

function makeAvatar(variantKey = 'solid') {
  const size = 1024;
  const v = AVATAR_VARIANTS[variantKey];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
  <title>WARWIKI — avatar (${v.label})</title>
  <defs>${v.defs}</defs>
  ${v.bg}
  <path fill="${v.wFill}" d="${FAVICON_W_PATH}"/>
</svg>
`;
}

// --- 2. YouTube banner (2560x1440, safe area 1546x423 centered) ---
function makeYouTubeBanner(inter800, inter500) {
  const W = 2560;
  const H = 1440;
  // Safe-area dimensions (YouTube all-devices)
  const safeW = 1546;
  const safeH = 423;
  const safeX = (W - safeW) / 2; // 507
  const safeY = (H - safeH) / 2; // 508.5

  // Wordmark: Inter 800, 260pt (scales well for 2560w), letter-spacing -6.5
  const wordmarkSize = 260;
  const wordmarkLS = -6.5;
  const wordmark = layoutText(inter800, 'WARWIKI', wordmarkSize, wordmarkLS);

  // Tagline: Inter 500, 46pt, letter-spacing 0.7
  const taglineSize = 46;
  const taglineLS = 0.7;
  const tagline = layoutText(inter500, 'Reconstruction, codified.', taglineSize, taglineLS);

  // Visual-center the WORDMARK+TAGLINE BLOCK (not the baseline).
  // Inter cap height ≈ 0.72 × fontSize, tagline ≈ 95px below wordmark baseline
  // with ~35px descent. Block top = baselineY - capHeight. Block bottom ≈
  // baselineY + 130. Block center = baselineY - 28.5. For block center = H/2:
  //   baselineY = H/2 + 28.5 ≈ H/2 + 30. Add +10 more to feel clearly centered.
  const wordmarkX = (W - wordmark.totalWidth) / 2;
  const wordmarkBaselineY = H / 2 + 40;
  const taglineX = (W - tagline.totalWidth) / 2;
  const taglineY = wordmarkBaselineY + 95;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <title>WARWIKI — YouTube banner</title>
  <defs>${heroBackgroundDefs('yt')}</defs>
  ${heroBackgroundFill('yt', W, H)}
  <g transform="translate(${wordmarkX.toFixed(2)}, ${wordmarkBaselineY.toFixed(2)})">
    <path d="${wordmark.pathData}" fill="url(#yt-title)"/>
  </g>
  <g transform="translate(${taglineX.toFixed(2)}, ${taglineY.toFixed(2)})">
    <path d="${tagline.pathData}" fill="${COLORS.textMuted}"/>
  </g>
</svg>
`;
}

// --- 3. Twitter banner (1500x500) ---
// Avatar overlay approx bottom-left 200x200; follow-button top-right.
// Logo block centered horizontally, y pushed slightly up-and-right of
// absolute center to avoid the bottom-left overlay zone.
function makeTwitterBanner(inter800, inter500) {
  const W = 1500;
  const H = 500;

  const wordmarkSize = 140;
  const wordmarkLS = -3.5;
  const wordmark = layoutText(inter800, 'WARWIKI', wordmarkSize, wordmarkLS);

  const taglineSize = 28;
  const taglineLS = 0.4;
  const tagline = layoutText(inter500, 'Reconstruction, codified.', taglineSize, taglineLS);

  // Visual-center the block. Same math as YouTube banner but smaller sizes.
  // Cap height ≈ 100, tagline bottom ≈ baselineY + 75. Block center =
  // baselineY - 12. For block-center = H/2: baselineY = H/2 + 12, plus small
  // bias downward for optical balance.
  const wordmarkX = (W - wordmark.totalWidth) / 2;
  const wordmarkBaselineY = H / 2 + 22;
  const taglineX = (W - tagline.totalWidth) / 2;
  const taglineY = wordmarkBaselineY + 55;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <title>WARWIKI — Twitter/X banner</title>
  <defs>${heroBackgroundDefs('tw')}</defs>
  ${heroBackgroundFill('tw', W, H)}
  <g transform="translate(${wordmarkX.toFixed(2)}, ${wordmarkBaselineY.toFixed(2)})">
    <path d="${wordmark.pathData}" fill="url(#tw-title)"/>
  </g>
  <g transform="translate(${taglineX.toFixed(2)}, ${taglineY.toFixed(2)})">
    <path d="${tagline.pathData}" fill="${COLORS.textMuted}"/>
  </g>
</svg>
`;
}

// --- Shared: hero background + title gradient defs ---
function infographicDefs(prefix) {
  return `
    <linearGradient id="${prefix}-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${COLORS.bgTop}"/>
      <stop offset="60%" stop-color="${COLORS.bgMid}"/>
      <stop offset="100%" stop-color="${COLORS.bgBottom}"/>
    </linearGradient>
    <radialGradient id="${prefix}-glowA" cx="20%" cy="10%" r="55%">
      <stop offset="0%" stop-color="${COLORS.primaryLightest}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${COLORS.primaryLightest}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${prefix}-glowB" cx="85%" cy="90%" r="55%">
      <stop offset="0%" stop-color="${COLORS.accentViolet}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${COLORS.accentViolet}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${prefix}-title" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${COLORS.primary}"/>
      <stop offset="50%" stop-color="${COLORS.primaryLight}"/>
      <stop offset="100%" stop-color="${COLORS.primaryLightest}"/>
    </linearGradient>`;
}

function infographicBg(prefix, w, h) {
  return `
    <rect width="${w}" height="${h}" fill="url(#${prefix}-bg)"/>
    <rect width="${w}" height="${h}" fill="url(#${prefix}-glowA)"/>
    <rect width="${w}" height="${h}" fill="url(#${prefix}-glowB)"/>`;
}

// Canonical features — shared across all three crops.
// `desc` is full-length (for portrait). `descShort` is single-line
// for square grids where column width is ~470px.
const FEATURES = [
  { title: 'Comprehensive',  desc: 'Every step of reconstruction — anatomy, evaluation, atlas, populations.', descShort: 'Anatomy through atlas and populations.',    stat: '650+ articles · 8 domains', icon: 'pages' },
  { title: 'Evidence-first', desc: 'Every claim DOI-linked to a primary source. No fabricated citations.',    descShort: 'DOI-linked primary sources only.',          stat: '2,400+ references',         icon: 'citation' },
  { title: 'In your pocket', desc: 'Built to read on the phone. In the OR, the clinic, on call, on the go.', descShort: 'Built for the phone. OR, clinic, on call.', stat: 'Phone · tablet · desktop',  icon: 'mobile' },
  { title: 'Listenable',     desc: 'Every article plays as audio. Hover any citation to read it inline.',    descShort: 'Audio on every article. Hover any citation.', stat: 'Audio · citation tooltips', icon: 'wave' },
];

// --- Infographic (1080x1350 — Instagram portrait + Twitter-safe) ---
function makeInfographic(inter800, inter700, inter600, inter500, inter400) {
  const W = 1080;
  const H = 1350;
  const MARGIN = 80;

  const defs = infographicDefs('ig');
  const bg = infographicBg('ig', W, H);

  // --- Header block ---
  const wordmarkSize = 140;
  const wordmark = layoutText(inter800, 'WARWIKI', wordmarkSize, -3.5);
  const subhead = layoutText(inter500, 'The specialist reference for functional urology & GU reconstruction', 22, 0.2);
  const wordmarkX = (W - wordmark.totalWidth) / 2;
  const wordmarkY = 220;
  const subheadX = (W - subhead.totalWidth) / 2;
  const subheadY = wordmarkY + 40;

  const header = `
    <g transform="translate(${wordmarkX.toFixed(2)}, ${wordmarkY.toFixed(2)})">
      <path d="${wordmark.pathData}" fill="url(#ig-title)"/>
    </g>
    <g transform="translate(${subheadX.toFixed(2)}, ${subheadY.toFixed(2)})">
      <path d="${subhead.pathData}" fill="${COLORS.textMuted}"/>
    </g>`;

  const featureStartY = 380;
  const featureHeight = 218;
  const iconBoxX = MARGIN;
  const iconBoxSize = 96;
  const textX = iconBoxX + iconBoxSize + 36;

  const featureBlocks = FEATURES.map((f, i) => {
    const y = featureStartY + i * featureHeight;
    const iconPath = iconSVG(f.icon);
    const title = layoutText(inter700, f.title, 40, -0.2);
    const desc = layoutText(inter400, f.desc, 20, 0.1);
    const stat = layoutText(inter600, f.stat, 16, 0.3);
    const titleY = y + 50;
    const descY = y + 88;
    const statY = y + 126;

    return `
      <g transform="translate(${iconBoxX}, ${y + 16})">
        <rect width="${iconBoxSize}" height="${iconBoxSize}" rx="18" fill="#EBF3FB"/>
        <g transform="translate(18, 18)">${iconPath}</g>
      </g>
      <g transform="translate(${textX}, ${titleY})">
        <path d="${title.pathData}" fill="${COLORS.text}"/>
      </g>
      <g transform="translate(${textX}, ${descY})">
        <path d="${desc.pathData}" fill="${COLORS.textMuted}"/>
      </g>
      <g transform="translate(${textX}, ${statY})">
        <path d="${stat.pathData}" fill="${COLORS.primary}"/>
      </g>
      `;
  }).join('');

  // --- Footer ---
  const footerY = featureStartY + FEATURES.length * featureHeight + 60;
  const urlText = layoutText(inter600, 'warwiki.org', 32, -0.3);
  const taglineText = layoutText(inter500, 'Reconstruction, codified.', 22, 0.4);
  const urlX = (W - urlText.totalWidth) / 2;
  const taglineX = (W - taglineText.totalWidth) / 2;

  const footer = `
    <g transform="translate(${urlX.toFixed(2)}, ${footerY})">
      <path d="${urlText.pathData}" fill="${COLORS.primary}"/>
    </g>
    <g transform="translate(${taglineX.toFixed(2)}, ${(footerY + 38).toFixed(2)})">
      <path d="${taglineText.pathData}" fill="${COLORS.textMuted}"/>
    </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <title>WARWIKI — features infographic</title>
  <defs>${defs}</defs>
  ${bg}
  ${header}
  ${featureBlocks}
  ${footer}
</svg>
`;
}

// --- Infographic SQUARE (1080x1080 — Instagram feed native) ---
// 2x2 feature grid. Tighter content; same tokens + design language.
function makeInfographicSquare(inter800, inter700, inter600, inter500, inter400) {
  const W = 1080;
  const H = 1080;
  const MARGIN = 72;

  const defs = infographicDefs('sq');
  const bg = infographicBg('sq', W, H);

  // Header
  const wordmarkSize = 120;
  const wordmark = layoutText(inter800, 'WARWIKI', wordmarkSize, -3);
  const subhead = layoutText(inter500, 'The specialist reference for functional urology & GU reconstruction', 20, 0.2);
  const wordmarkX = (W - wordmark.totalWidth) / 2;
  const wordmarkY = 170;
  const subheadX = (W - subhead.totalWidth) / 2;
  const subheadY = wordmarkY + 34;

  const header = `
    <g transform="translate(${wordmarkX.toFixed(2)}, ${wordmarkY})">
      <path d="${wordmark.pathData}" fill="url(#sq-title)"/>
    </g>
    <g transform="translate(${subheadX.toFixed(2)}, ${subheadY})">
      <path d="${subhead.pathData}" fill="${COLORS.textMuted}"/>
    </g>`;

  // 2x2 grid
  const gridTop = 280;
  const rowHeight = 310;
  const colWidth = (W - MARGIN * 2) / 2;
  const cells = FEATURES.map((f, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = MARGIN + col * colWidth;
    const y = gridTop + row * rowHeight;
    const iconBoxSize = 72;
    const title = layoutText(inter700, f.title, 30, -0.2);
    const desc = layoutText(inter400, f.descShort, 16, 0.1);
    const stat = layoutText(inter600, f.stat, 14, 0.3);

    // Icon box + title alignment: icon top, title below, desc below, stat bottom
    const innerX = x + 16;
    const iconY = y + 10;
    const titleY = iconY + iconBoxSize + 38;
    const descY = titleY + 28;
    const statY = descY + 56;

    return `
      <g transform="translate(${innerX}, ${iconY})">
        <rect width="${iconBoxSize}" height="${iconBoxSize}" rx="14" fill="#EBF3FB"/>
        <g transform="translate(6, 6)">${iconSVG(f.icon)}</g>
      </g>
      <g transform="translate(${innerX}, ${titleY})">
        <path d="${title.pathData}" fill="${COLORS.text}"/>
      </g>
      <g transform="translate(${innerX}, ${descY})">
        <path d="${desc.pathData}" fill="${COLORS.textMuted}"/>
      </g>
      <g transform="translate(${innerX}, ${statY})">
        <path d="${stat.pathData}" fill="${COLORS.primary}"/>
      </g>`;
  }).join('');

  // Footer
  const footerY = 960;
  const urlText = layoutText(inter600, 'warwiki.org', 30, -0.3);
  const taglineText = layoutText(inter500, 'Reconstruction, codified.', 20, 0.4);
  const urlX = (W - urlText.totalWidth) / 2;
  const taglineX = (W - taglineText.totalWidth) / 2;

  const footer = `
    <g transform="translate(${urlX.toFixed(2)}, ${footerY})">
      <path d="${urlText.pathData}" fill="${COLORS.primary}"/>
    </g>
    <g transform="translate(${taglineX.toFixed(2)}, ${(footerY + 36).toFixed(2)})">
      <path d="${taglineText.pathData}" fill="${COLORS.textMuted}"/>
    </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <title>WARWIKI — features infographic (square)</title>
  <defs>${defs}</defs>
  ${bg}
  ${header}
  ${cells}
  ${footer}
</svg>
`;
}

// --- Infographic LANDSCAPE (1200x630 — Twitter/LinkedIn card) ---
// Horizontal row of 4 compact feature pills beneath a centered wordmark.
function makeInfographicLandscape(inter800, inter700, inter600, inter500, inter400) {
  const W = 1200;
  const H = 630;

  const defs = infographicDefs('ls');
  const bg = infographicBg('ls', W, H);

  // Header
  const wordmarkSize = 130;
  const wordmark = layoutText(inter800, 'WARWIKI', wordmarkSize, -3.2);
  const subhead = layoutText(inter500, 'The specialist reference for functional urology & GU reconstruction', 20, 0.2);
  const wordmarkX = (W - wordmark.totalWidth) / 2;
  const wordmarkY = 130;
  const subheadX = (W - subhead.totalWidth) / 2;
  const subheadY = wordmarkY + 32;

  const header = `
    <g transform="translate(${wordmarkX.toFixed(2)}, ${wordmarkY})">
      <path d="${wordmark.pathData}" fill="url(#ls-title)"/>
    </g>
    <g transform="translate(${subheadX.toFixed(2)}, ${subheadY})">
      <path d="${subhead.pathData}" fill="${COLORS.textMuted}"/>
    </g>`;

  // Horizontal feature row — icon + title + stat only
  const rowTop = 230;
  const rowHeight = 220;
  const gutter = 24;
  const cellW = (W - gutter * (FEATURES.length + 1)) / FEATURES.length;
  const cells = FEATURES.map((f, i) => {
    const x = gutter + i * (cellW + gutter);
    const iconBoxSize = 64;
    const title = layoutText(inter700, f.title, 22, -0.1);
    const stat = layoutText(inter600, f.stat, 12, 0.2);

    const iconX = x + (cellW - iconBoxSize) / 2;
    const iconY = rowTop + 10;
    const titleX = x + (cellW - title.totalWidth) / 2;
    const titleY = iconY + iconBoxSize + 38;
    const statX = x + (cellW - stat.totalWidth) / 2;
    const statY = titleY + 28;

    return `
      <g transform="translate(${iconX}, ${iconY})">
        <rect width="${iconBoxSize}" height="${iconBoxSize}" rx="12" fill="#EBF3FB"/>
        <g transform="translate(2, 2)">${iconSVG(f.icon)}</g>
      </g>
      <g transform="translate(${titleX.toFixed(2)}, ${titleY})">
        <path d="${title.pathData}" fill="${COLORS.text}"/>
      </g>
      <g transform="translate(${statX.toFixed(2)}, ${statY})">
        <path d="${stat.pathData}" fill="${COLORS.primary}"/>
      </g>`;
  }).join('');

  // Footer
  const footerY = 540;
  const urlText = layoutText(inter600, 'warwiki.org', 24, -0.2);
  const taglineText = layoutText(inter500, 'Reconstruction, codified.', 18, 0.4);
  const urlX = (W - urlText.totalWidth) / 2;
  const taglineX = (W - taglineText.totalWidth) / 2;

  const footer = `
    <g transform="translate(${urlX.toFixed(2)}, ${footerY})">
      <path d="${urlText.pathData}" fill="${COLORS.primary}"/>
    </g>
    <g transform="translate(${taglineX.toFixed(2)}, ${(footerY + 32).toFixed(2)})">
      <path d="${taglineText.pathData}" fill="${COLORS.textMuted}"/>
    </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <title>WARWIKI — features infographic (landscape)</title>
  <defs>${defs}</defs>
  ${bg}
  ${header}
  ${cells}
  ${footer}
</svg>
`;
}

// --- Simple line icons, 60x60 viewport, stroke-width 3, primary-blue ---
function iconSVG(kind) {
  const s = COLORS.primary;
  switch (kind) {
    case 'pages':
      // Three stacked rounded pages, offset diagonally
      return `
        <g stroke="${s}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <rect x="6" y="14" width="38" height="42" rx="4"/>
          <rect x="12" y="8" width="38" height="42" rx="4" fill="#EBF3FB"/>
          <line x1="20" y1="20" x2="42" y2="20"/>
          <line x1="20" y1="28" x2="42" y2="28"/>
          <line x1="20" y1="36" x2="36" y2="36"/>
        </g>`;
    case 'citation':
      // Document with superscript bracketed citation
      return `
        <g stroke="${s}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <path d="M14 8 h22 l10 10 v34 a4 4 0 0 1 -4 4 h-28 a4 4 0 0 1 -4 -4 v-40 a4 4 0 0 1 4 -4 z"/>
          <path d="M36 8 v10 h10"/>
          <line x1="20" y1="36" x2="40" y2="36"/>
          <line x1="20" y1="44" x2="36" y2="44"/>
          <path d="M20 26 l-3 0 l0 -6 l3 0" fill="${s}" stroke="none"/>
          <path d="M30 26 l3 0 l0 -6 l-3 0" fill="${s}" stroke="none"/>
        </g>`;
    case 'tree':
      // Lineage tree: root + 2 branches + 4 leaves
      return `
        <g stroke="${s}" stroke-width="3" fill="#EBF3FB" stroke-linejoin="round" stroke-linecap="round">
          <line x1="30" y1="16" x2="30" y2="24"/>
          <line x1="18" y1="30" x2="42" y2="30"/>
          <line x1="18" y1="30" x2="18" y2="36"/>
          <line x1="42" y1="30" x2="42" y2="36"/>
          <line x1="10" y1="42" x2="26" y2="42"/>
          <line x1="34" y1="42" x2="50" y2="42"/>
          <line x1="10" y1="42" x2="10" y2="48"/>
          <line x1="26" y1="42" x2="26" y2="48"/>
          <line x1="34" y1="42" x2="34" y2="48"/>
          <line x1="50" y1="42" x2="50" y2="48"/>
          <circle cx="30" cy="12" r="4" fill="${s}" stroke="none"/>
          <circle cx="10" cy="52" r="3.5"/>
          <circle cx="26" cy="52" r="3.5"/>
          <circle cx="34" cy="52" r="3.5"/>
          <circle cx="50" cy="52" r="3.5"/>
        </g>`;
    case 'search':
      // Magnifying glass over a stack of lines
      return `
        <g stroke="${s}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <line x1="10" y1="14" x2="34" y2="14"/>
          <line x1="10" y1="24" x2="28" y2="24"/>
          <line x1="10" y1="34" x2="24" y2="34"/>
          <circle cx="40" cy="36" r="12" fill="#EBF3FB"/>
          <line x1="49" y1="45" x2="56" y2="52"/>
        </g>`;
    case 'mobile':
      // Smartphone with text lines on screen
      return `
        <g stroke="${s}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <rect x="18" y="6" width="28" height="52" rx="5" fill="#EBF3FB"/>
          <line x1="26" y1="12" x2="38" y2="12" stroke-width="2"/>
          <line x1="24" y1="22" x2="40" y2="22" stroke-width="2"/>
          <line x1="24" y1="28" x2="36" y2="28" stroke-width="2"/>
          <line x1="24" y1="34" x2="40" y2="34" stroke-width="2"/>
          <line x1="24" y1="40" x2="34" y2="40" stroke-width="2"/>
          <circle cx="32" cy="51" r="2" fill="${s}" stroke="none"/>
        </g>`;
    case 'wave':
      // Waveform bars + play triangle
      return `
        <g stroke="${s}" stroke-width="3" fill="${s}" stroke-linecap="round">
          <path d="M8 26 l0 -2 l14 8 l-14 8 l0 -2 z" stroke-linejoin="round"/>
          <line x1="28" y1="22" x2="28" y2="38" stroke-width="4"/>
          <line x1="36" y1="16" x2="36" y2="44" stroke-width="4"/>
          <line x1="44" y1="26" x2="44" y2="34" stroke-width="4"/>
          <line x1="52" y1="20" x2="52" y2="40" stroke-width="4"/>
        </g>`;
  }
  return '';
}

async function writeFile(p, content) {
  fs.writeFileSync(p, content);
  console.log(`  wrote ${path.relative(REPO_ROOT, p)}`);
}

async function rasterize(svgPath, pngPath, width, height) {
  await sharp(svgPath, { density: 300 }).resize(width, height).png().toFile(pngPath);
  console.log(`  rasterized ${path.relative(REPO_ROOT, pngPath)}  ${width}x${height}`);
}

async function main() {
  console.log('Loading Inter fonts…');
  const inter400 = opentype.loadSync('/tmp/warwiki-fonts/Inter-400.ttf');
  const inter500 = opentype.loadSync('/tmp/warwiki-fonts/Inter-500.ttf');
  const inter600 = opentype.loadSync('/tmp/warwiki-fonts/Inter-600.ttf');
  const inter700 = opentype.loadSync('/tmp/warwiki-fonts/Inter-700.ttf');
  const inter800 = opentype.loadSync('/tmp/warwiki-fonts/Inter-800.ttf');

  fs.mkdirSync(SVG_DIR, { recursive: true });
  fs.mkdirSync(PNG_DIR, { recursive: true });

  console.log('Generating avatar variants…');
  for (const key of Object.keys(AVATAR_VARIANTS)) {
    const svgPath = path.join(SVG_DIR, `avatar-${key}.svg`);
    await writeFile(svgPath, makeAvatar(key));
    // Render a 400×400 PNG for each variant so the preview page can show them
    await rasterize(svgPath, path.join(PNG_DIR, `avatar-${key}.png`), 400, 400);
    // 40×40 legibility thumbnail
    await rasterize(svgPath, path.join(PNG_DIR, `avatar-${key}-40.png`), 40, 40);
  }

  // "Master" + platform exports use the CHOSEN variant. Change the key below
  // after reviewing preview.html. Default = 'solid' (the favicon baseline).
  const CHOSEN_AVATAR = process.env.WARWIKI_AVATAR || 'solid';
  console.log(`Exporting platform PNGs from avatar-${CHOSEN_AVATAR}.svg…`);
  const masterSvgPath = path.join(SVG_DIR, 'avatar-master.svg');
  fs.copyFileSync(path.join(SVG_DIR, `avatar-${CHOSEN_AVATAR}.svg`), masterSvgPath);
  console.log(`  copied avatar-${CHOSEN_AVATAR}.svg → avatar-master.svg`);
  await rasterize(masterSvgPath, path.join(PNG_DIR, 'avatar-youtube.png'), 800, 800);
  await rasterize(masterSvgPath, path.join(PNG_DIR, 'avatar-twitter.png'), 400, 400);
  await rasterize(masterSvgPath, path.join(PNG_DIR, 'avatar-instagram.png'), 320, 320);
  await rasterize(masterSvgPath, path.join(PNG_DIR, 'avatar-tiktok.png'), 200, 200);

  console.log('Generating banners…');
  const ytSvg = path.join(SVG_DIR, 'banner-youtube.svg');
  const twSvg = path.join(SVG_DIR, 'banner-twitter.svg');
  await writeFile(ytSvg, makeYouTubeBanner(inter800, inter500));
  await writeFile(twSvg, makeTwitterBanner(inter800, inter500));
  await rasterize(ytSvg, path.join(PNG_DIR, 'banner-youtube.png'), 2560, 1440);
  await rasterize(twSvg, path.join(PNG_DIR, 'banner-twitter.png'), 1500, 500);

  console.log('Generating features infographic — 3 crops…');
  const igPortraitSvg = path.join(SVG_DIR, 'infographic-portrait.svg');
  const igSquareSvg = path.join(SVG_DIR, 'infographic-square.svg');
  const igLandscapeSvg = path.join(SVG_DIR, 'infographic-landscape.svg');
  await writeFile(igPortraitSvg, makeInfographic(inter800, inter700, inter600, inter500, inter400));
  await writeFile(igSquareSvg, makeInfographicSquare(inter800, inter700, inter600, inter500, inter400));
  await writeFile(igLandscapeSvg, makeInfographicLandscape(inter800, inter700, inter600, inter500, inter400));
  await rasterize(igPortraitSvg, path.join(PNG_DIR, 'infographic-portrait.png'), 1080, 1350);
  await rasterize(igSquareSvg, path.join(PNG_DIR, 'infographic-square.png'), 1080, 1080);
  await rasterize(igLandscapeSvg, path.join(PNG_DIR, 'infographic-landscape.png'), 1200, 630);

  console.log('Done.');
  console.log('');
  console.log('To pick a different avatar variant and re-export platform sizes:');
  console.log('  WARWIKI_AVATAR=wordmark-gradient node social-assets/generate.js');
  console.log('Variants: solid | deep-navy | glow | diagonal | wordmark-gradient | inverted');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
