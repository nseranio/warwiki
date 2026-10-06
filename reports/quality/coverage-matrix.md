# Coverage matrix (draft, October 6, 2026, revision `2f256438`)

What each published surface receives today, by error class. "Gate" is `scripts/review/gate.py` (claim extraction plus ledger); "review" is the Codex reviewer/verifier pipeline; "CI" is `.github/workflows/ci.yml`. An empty detector result is not coverage: a surface is covered only if something reads it.

## Surfaces

| Surface | Count | Notes |
|---|---|---|
| Content MDX outside surgeon profiles (`docs/`, sections 01–05, 07, 08) | 1,102 files, including 66 `index.mdx` hubs | Gate scope: `claims.pages()` (hubs included since October 5) |
| Surgeon profiles (`docs/07-roots/surgeons/`) | 236 | Protected track: content audit needs owner activation |
| Built routes (`build/sitemap.xml`, last local build) | 1,342 | Reconcile against source inventory in milestone 2 |
| Extracted claim units (gate) | 24,498 | Numbers, doses, guideline statements, absolutes only |
| `VideoCards` blocks | 251 | Not read by the gate (skipped line prefix) |
| `GenericDatabase` / `TechniqueDatabase` / `EvidenceTable` / `CodeSearchTable` blocks in MDX | 25 / 2 / 7 / 2 | Prop lines are scanned as text only when they contain a number or absolute; no row-level binding |
| Landmark Trials data (`src/data/trials.ts`) | 1,008 lines | Not read by the gate; clinical numbers |
| Curriculum (`src/data/curriculum.ts`), evidence registry (`src/data/evidence*.{ts,json}`), figures (`src/data/figures.*`) | | Not read by the gate |
| Figure captions (italic line after an image) | about 352 lines | Read by the gate when they state a number or absolute |
| GAS footnote definitions (`[^N]:`) | 192 | Reference text only; claims carrying footnote markers are read |
| Patient handouts (`static/handouts/`, `src/data/handouts.ts`) | 80 English | Protected track (clinical rewriting needs owner activation); link/source drift via `npm run lint:handouts` |
| APIs (`api/tts.ts`) | 1 | No review yet |

## Error class × surface

| Error class | Article prose and tables | Hubs | Databases / imported data | Captions / media | Profiles, handouts | Code, search, ops |
|---|---|---|---|---|---|---|
| Quantitative / dose / guideline / absolute claims | Gate + review (regex-detected units only) | Gate since Oct 5 | Partial (prop lines); `trials.ts` none | Captions: gate; figure content: none | Excluded (protected) | n/a |
| Qualitative clinical / operative teaching | Full-page second review (Oct 4) only; no extraction | Not reviewed | None | None | Excluded | n/a |
| Consequential omissions | Not systematically checked | None | None | None | Excluded | n/a |
| Citation binding / identity | Gate schema 2 binds cited-source identity (Oct 6); `refs:registry`, `lint:citations` | Same | None | None | None | n/a |
| Retractions / corrections | `scripts/refs/retractions.py` (cache never refreshed; milestone 4) | Same | None | n/a | None | n/a |
| Cross-page consistency | `consistency:*` scripts, Oct 3 and Oct 5 runs | Same | Partial | None | People facts only | n/a |
| Figure identity, reuse credit; video match | n/a | n/a | n/a | One-time manual curation; no recurring check | n/a | n/a |
| Links | `lint:links` (internal); monthly 200-URL external sample | Same | TS/JSON URLs not inventoried | Third-party images not checked | Same | n/a |
| Rendering, hydration, accessibility | Playwright (Chromium) sitemap/component suite in CI | Same | Same | Same | Same | Chromium only; no WebKit/Firefox, search-relevance benchmark or API review |

## Gaps that block a coverage claim

1. Qualitative claims and omissions have no extraction or claim-level verification; only the October 4 full-page review touched them.
2. `src/data/trials.ts`, curriculum and evidence-registry data and `VideoCards` content are outside the gate.
3. Database rows have no row-level binding; a reviewer `ok` on a multi-number row is one binding for the whole row (any change invalidates it, which is conservative, but the check may have covered only part of it).
4. Prose claims bind to their own sentence, cited sources and table header, not to the surrounding paragraph or heading. A changed qualifier in a neighbouring sentence does not invalidate them.
5. Protected tracks (profiles, handouts, Anki, SmartPhrases) are excluded from every accuracy statement.
