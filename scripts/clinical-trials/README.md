# Reconstructive & Functional Urology Trial Finder: data pipeline

Ported from WHITWIKI's GU Oncology Trial Finder (same engine, November 18, 2026); WARWIKI has its own pools, disease-state rules (OAB, stress incontinence, urethral stricture, prolapse) and scope gate.

Page: `docs/08-resources/clinical-trial-finder.mdx` (Resources › Trial Finder). UI: `src/components/ClinicalTrialFinder/`. Pure logic, shared by the browser and the refresh script: `src/lib/clinical-trials/`.

## Refresh

```
node --experimental-strip-types --no-warnings scripts/clinical-trials/refresh.ts
```

- Runs every query in `src/lib/clinical-trials/pools.ts` (`QUERY_VERSION`) against the public ClinicalTrials.gov API v2: eight topic pools (incontinence, bladder and pelvic pain, prolapse and urogynecology, urethral stricture, upper tract and trauma, BPH, sexual health, gender-affirming surgery), US locations, overall status recruiting, not yet recruiting, enrolling by invitation, active not recruiting or suspended.
- Pages each query to the end and requires the retrieved count to equal the API's `totalCount`. Timeouts, retry with backoff on 429/5xx, a response-size cap and a page cap apply.
- Fails, and leaves the previous snapshot untouched, on any incomplete query, an empty pool, or a pool shrinking by more than 35% against the last snapshot (`TRIAL_MAX_DROP` to override after checking).
- Leaves out studies outside WARWIKI scope, judged on the title and first two conditions: children only, stones and endourology, infertility, oncology-primary (unless the title names a functional or reconstructive topic) and non-urologic matches; counts go in the manifest.
- Writes `static/trial-finder/data/` through a staging folder and a directory swap: `manifest.json` (version, query version, API version and data timestamp, start and finish times, per-query counts, annotation checks, coverage limits, `staleAfterHours`), `pools/<pool>.json` (index, one study per line) and `studies/<NCT>.json` (eligibility text, arms, contacts by site key, central contacts, officials, dates as published).
- Raw API responses are never saved.

Scheduled: `.github/workflows/trial-finder-refresh.yml`, daily at 11:50 UTC (after the registry's daily update), plus manual dispatch. It commits only `static/trial-finder/data/` and pushes to `main`; Vercel then deploys. CI skips data-only pushes. A failed run commits nothing; GitHub emails the owner, and the page warns once the snapshot is older than 48 hours.

## ZIP coordinates

`static/trial-finder/zcta.json` comes from the US Census Gazetteer ZCTA file (public domain), built by `build-zcta.ts [year]`. Rerun yearly. ZCTAs approximate postal ZIPs; a ZIP with no ZCTA is reported as having no coordinates, never replaced by another point. Registry site points more than 75 miles from the site's own ZIP centroid are flagged and their distance is withheld.

## Cohort annotations

`src/data/clinical-trial-finder/annotations.json`: one entry per study, each cohort with OAB, SUI, stricture or prolapse rules, exact passages from the eligibility text, the eligibility-text hash (`eh`) and the registry update date it was read against. `notFor` records a disease state the registry codes but the eligibility text rules out. Every refresh checks each annotation: a changed hash or a missing passage marks it `criteriaChanged` / `passageMissing` in the manifest, and the finder stops applying it (the study falls back to "registry text only") until it is reread.

To reread or add studies: write their registry text to a working folder (see `~/Documents/WARWIKI/warwiki-working/trial-finder/annotations-2026-11-18/`, with `BRIEF.md`), have Codex draft, check every rule against its passage, update `eh` and `sourceUpdate` from the new snapshot, then run the refresh and confirm all checks are `current`. Review status stays `editor-checked` until a clinician reviews.

## Tests

`src/lib/clinical-trials/finder.test.ts` (Vitest, deterministic fixtures: site status, radius, sorting, ZIPs, cohort rules, search, normalisation, pagination failure) and the finder test in `tests/e2e/smoke.spec.ts` (structure only, so registry changes do not break it).
