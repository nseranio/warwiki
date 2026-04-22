# WARWIKI social assets

Generated brand assets for YouTube, Twitter/X, Instagram, and TikTok profiles — matched to the `warwiki.org` design system (colors, typography, tagline) with no new identity.

## Files

| Path | Size | Purpose |
|---|---|---|
| `svg/avatar-master.svg` | 1024×1024 | Avatar source — favicon's geometric W on `#185FA5` |
| `svg/banner-youtube.svg` | 2560×1440 | YouTube banner — wordmark + tagline in 1546×423 all-devices safe area |
| `svg/banner-twitter.svg` | 1500×500 | Twitter/X banner — logo block clear of avatar + CTA overlays |
| `png/avatar-youtube.png` | 800×800 | YouTube avatar |
| `png/avatar-twitter.png` | 400×400 | Twitter avatar |
| `png/avatar-instagram.png` | 320×320 | Instagram avatar |
| `png/avatar-tiktok.png` | 200×200 | TikTok avatar |
| `png/banner-youtube.png` | 2560×1440 | YouTube banner (platform upload) |
| `png/banner-twitter.png` | 1500×500 | Twitter banner (platform upload) |
| `preview.html` | — | Side-by-side preview with safe-area overlays |
| `generate.js` | — | Source generator |

## Design tokens (from `src/css/custom.css`)

- **Primary:** `#185FA5` — avatar background, favicon tile
- **Wordmark gradient:** `#185FA5 → #1B6CBD → #3691E2` (L→R)
- **Hero background:** `#FFFFFF → #F2F7FD → #E8F1FB` (top→bottom) + radial glows (blue upper-left, violet lower-right)
- **Text muted:** `#4B5767` — tagline color
- **Tagline:** *Reconstruction, codified.*

## Typography

- **Family:** Inter (Google Fonts v20)
- **Wordmark:** Inter 800, letter-spacing -6.5 @ 260pt (YouTube) / -3.5 @ 140pt (Twitter)
- **Tagline:** Inter 500, letter-spacing 0.7 @ 46pt (YouTube) / 0.4 @ 28pt (Twitter)
- Text is converted to SVG glyph paths via `opentype.js` — the SVGs render identically regardless of which fonts are installed on the rendering system.

## Preview

Open `preview.html` in a browser to see:
- Avatars rendered inside circular masks at actual feed sizes (200 / 128 / 96 / 80 / 40 px)
- Both banners with toggleable safe-area overlays (green = safe, red = avoid)
- Color and typography token reference

## Regenerating

1. Fonts (one-time): download Inter-Medium.ttf + Inter-ExtraBold.ttf from Google Fonts v20 into `/tmp/warwiki-fonts/` as `Inter-500.ttf` and `Inter-800.ttf`.
2. opentype.js (one-time): `mkdir -p /tmp/warwiki-svg-gen && cd /tmp/warwiki-svg-gen && npm init -y && npm install opentype.js`
3. Run: `node social-assets/generate.js`

Sharp (already a project dependency) handles PNG rasterization.

## Platform upload sizes

| Platform | Avatar | Banner |
|---|---|---|
| YouTube | 800×800 (min 98×98) | 2560×1440 (≤6 MB, safe area 1546×423) |
| Twitter/X | 400×400 | 1500×500 (≤5 MB) |
| Instagram | 320×320 (displays at 180×180 + 40×40) | n/a |
| TikTok | 200×200 (displays at 20×20 to 200×200) | n/a |
