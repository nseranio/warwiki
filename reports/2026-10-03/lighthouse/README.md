# Lighthouse baseline, October 3, 2026

Lighthouse 12, run from a MacBook against the live site (www.warwiki.org) before the font-loading change. Mobile uses Lighthouse's simulated mid-range phone on slow 4G; desktop uses `--preset=desktop`. These are lab numbers from single runs, not field data from readers; use them as a reference point, not an exact measure. Raw reports are the JSON files in this folder.

| Page | Form | Perf | A11y | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|---|
| Homepage | mobile | 70 | 96 | 100 | 100 | 3.0 s | 5.6 s | 45 ms | 0 | 689 KB |
| Homepage | desktop | 96 | 96 | 100 | 100 | 0.9 s | 1.3 s | 0 ms | 0.001 | 785 KB |
| Article (male urethral stricture) | mobile | 66 | 89 | 100 | 100 | 3.8 s | 6.5 s | 86 ms | 0 | 827 KB |
| Article | desktop | 84 | 89 | 100 | 100 | 1.0 s | 1.3 s | 0 ms | **0.226** | 1,243 KB |
| Atlas (male cosmetic database) | mobile | 69 | 93 | 100 | 100 | 3.2 s | 5.9 s | 125 ms | 0 | 722 KB |
| Atlas | desktop | 93 | 93 | 100 | 100 | 0.9 s | 1.1 s | 0 ms | 0.12 | 982 KB |
| Video Library | mobile | 69 | 93 | 100 | 100 | 4.0 s | 5.0 s | 44 ms | 0 | 628 KB |
| Video Library | desktop | 99 | 93 | 100 | 100 | 0.6 s | 0.8 s | 0 ms | 0.046 | 1,233 KB |

Targets (Core Web Vitals "good"): LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms (TBT is the lab proxy).

## Findings

- **Mobile LCP 5–6.5 s on every page type.** Almost all of it is render delay (5–6 s), not download. The largest render-blocking item was the Google Fonts stylesheet (about 0.8 s), loaded by an `@import` inside the site CSS, so it could only start after that CSS arrived (a serial chain: HTML → site CSS → fonts CSS → font files), with no preconnect to the font hosts. Unused JavaScript (about 300 ms) is the next item.
- **Desktop CLS 0.226 on articles (0.12 on the atlas).** Reproduced locally: about 300 ms after load the opening paragraph gains one line (29 px) when Inter replaces the fallback font, pushing everything below it down.
- **Accessibility 89–96.** Recurring items: color contrast, link-in-text-block (links distinguished by color only), label/name mismatch on some controls, small tap targets on articles.

## Changes made the same day

- Fonts moved from the CSS `@import` to `<link rel="preconnect">` plus a non-blocking stylesheet `<link media="print" onload>` (with a `<noscript>` fallback) in the page head (`docusaurus.config.ts` headTags). A first attempt with a normal render-blocking `<link>` made simulated mobile LCP worse locally (12 → 16.5 s), because it put a third-party request on the critical path from the start.
- An "Inter Fallback" `@font-face` (Arial with Inter's capsize metrics: size-adjust 107.06%, ascent 90.49%, descent 22.56%) sits after Inter in the font stack, so text keeps its line breaks when Inter swaps in.

Local before/after on the article page (static `npm run serve` without compression, so absolute values are not comparable to the live site; LCP on mobile varied 9–16 s run to run locally and is not reliable here):

| Local article | Before | After |
|---|---|---|
| FCP mobile | 4.13 s | 2.25 s |
| FCP desktop | 1.04 s | 0.48 s |
| CLS desktop | 0.226 | 0.002 |

## After the change (live)

Same eight measurements on the live site after commit `1ca4d7b5` deployed (October 3).

| Page | Form | Perf | FCP | LCP | CLS |
|---|---|---|---|---|---|
| Homepage | mobile | 70 → 73 | 3.0 → 2.7 s | 5.6 → 5.5 s | 0 → 0 |
| Homepage | desktop | 96 → 99 | 0.9 → 0.5 s | 1.3 → 0.9 s | 0.001 → 0.001 |
| Article | mobile | 66 → **94** | 3.8 → 1.3 s | 6.5 → **3.0 s** | 0 → 0 |
| Article | desktop | 84 → **100** | 1.0 → 0.4 s | 1.3 → 0.4 s | **0.226 → 0.002** |
| Atlas | mobile | 69 → **91** | 3.2 → 1.3 s | 5.9 → 3.1 s | 0 → 0.006 |
| Atlas | desktop | 93 → 96 | 0.9 → 0.4 s | 1.1 → 0.8 s | 0.12 → 0.112 |
| Video Library | mobile | 69 → **96** | 4.0 → 1.1 s | 5.0 → **2.7 s** | 0 → 0.001 |
| Video Library | desktop | 99 → 99 | 0.6 → 0.6 s | 0.8 → 0.9 s | 0.046 → 0.001 |

## Remaining

- **Homepage mobile LCP 5.5 s.** The LCP element is the trailer `<video>` poster (27 KB, downloads in about 0.2 s, server-rendered); Lighthouse attributes 4.6 s to render delay under its simulated mid-range phone, while main-thread blocking is only 45 ms. Field data from real devices would show whether readers see this; options if it matters are a static poster `<img>` that swaps to the video on click, or a `fetchpriority="high"` preload of the poster.
- **Atlas desktop CLS 0.11.** The shifting node is a level-1 sidebar category that expands after hydration (Docusaurus sidebar behavior around the hidden atlas pages), not the database.
- **Mobile LCP about 3 s on articles and atlas pages**, just above the 2.5 s target; the next item Lighthouse lists is unused JavaScript (about 300 ms).
- **Accessibility 89–96:** color contrast, color-only links in text, control label/name mismatches, small tap targets on articles.
