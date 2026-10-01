# Scrapped Clinical Toolkit pilot (September 30, 2026)

A Male SUI pilot of per-page "Clinical toolkit" cards (generic op-note and
counseling templates plus handouts, attached to pages from one registry) was
built and previewed locally on September 30. The user judged it too busy for
the article pages and scrapped it before it was committed to the site.

Kept here, as text files (not compiled), for reuse in the planned Resources
feature (a downloadable or searchable generic template corpus):

- `male-sui.ts.txt`: eight generic templates (op notes and counseling for AUS,
  male transobturator sling, ProACT and PUL). Personal defaults became
  [choices] or *** blanks; findings and complications blank; no billing codes.
  The 71 counseling figures each list the WARWIKI page and anchor they come
  from (correct as of September 30, 2026; recheck before reuse).
- `types.ts.txt`: the registry data format.
- `ClinicalToolkit.tsx.txt`: the card component (copy button, figure-source links).
- `check-toolkit-sources.js.txt`: lint check that every sourced figure's page
  and anchor still exist and the figure appears in its template.
