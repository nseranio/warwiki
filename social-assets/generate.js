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
  const inter500 = opentype.loadSync('/tmp/warwiki-fonts/Inter-500.ttf');
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
