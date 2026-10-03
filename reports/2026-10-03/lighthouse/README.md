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

(pending: re-run the same eight Lighthouse measurements after deploy)
