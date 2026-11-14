# Lighthouse re-measure, November 14, 2026

Lighthouse 12.8.2, headless Chrome on a MacBook against the live site (warwiki.org), same four pages as the October 3 baseline (`reports/2026-10-03/lighthouse/`). Single lab runs; mobile is Lighthouse's simulated mid-range phone on slow 4G. Raw JSON is in this folder (not committed).

| Page | Form | Perf | A11y | FCP | LCP | TBT | CLS | Oct 3 after (Perf, LCP) |
|---|---|---|---|---|---|---|---|---|
| Homepage | mobile | 68 | 100 | 4.0 s | 5.8 s | 120 ms | 0 | 73, 5.5 s |
| Homepage | desktop | 98 | 100 | 0.9 s | 1.0 s | 0 ms | 0.003 | 99, 0.9 s |
| Article (urethral stricture) | mobile | 85 | 89 | 2.9 s | 3.6 s | 90 ms | 0 | 94, 3.0 s |
| Article | desktop | 99 | 89 | 0.4 s | 0.8 s | 10 ms | 0.002 | 100, 0.4 s |
| Atlas (male cosmetic) | mobile | 74 | 93 | 3.1 s | 3.8 s | 360 ms | 0.029 | 91, 3.1 s |
| Atlas | desktop | 89 | 93 | 0.4 s | 0.9 s | 180 ms | 0.143 | 96, 0.8 s |
| Video Library | mobile | 75 | 96 | 1.3 s | 5.4 s | 240 ms | 0.001 | 96, 2.7 s |
| Video Library | desktop | 99 | 96 | 0.4 s | 1.0 s | 10 ms | 0.006 | 99, 0.9 s |

## Reading

- Mobile numbers are lower than October 3 on single runs. Nothing structural changed: one 46 KB render-blocking stylesheet (about 0.3–0.5 s), about 46 KB of unused JavaScript in the Docusaurus main bundle, and main-thread time of 1.4–2 s on the simulated phone. Homepage LCP is still the trailer poster, 82% render delay. Lab variance is large; field data would show whether readers are affected.
- Atlas desktop CLS 0.14: the expanded "Cosmetic Genital Surgery" sidebar category settles its height after hydration. Server and client render the same open/closed state (checked in the browser), so it is Docusaurus's collapsible, not a state mismatch. Left as is.

## Accessibility

- **Color contrast (fixed, `323e0c5b`):** tinted database badges in dark mode (2.4–4.1:1) now lighten their text toward white; web-card URLs no longer use 75% opacity.
- **Links distinguished by color only (owner decision):** 55 prose links on the article page, 43 on the atlas, 1 on the Video Library. Passing needs an underline or similar on links inside paragraphs and tables.
- **Tap targets (owner decision):** citation superscripts sit 11–22 px apart, below the 24 px target; passing needs more spacing around citation links.
