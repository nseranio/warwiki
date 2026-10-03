# Site consistency pass (October 3, 2026)

Question from the user: after the history cross-links exposed several cross-page inconsistencies, how do we keep references, voice and quality consistent across the site? This pass measured each kind of drift, used Codex for triage (13 read-only or scratch-only runs), verified every proposed change before editing, and left repeatable scripts.

## Results by layer

| Layer | Scope | Flags | Real problems found | Commit |
|---|---|---|---|---|
| 1. References vs Crossref (`npm run refs:registry`) | 19,424 DOI-bearing references, 12,476 DOIs | 347 | 1 wrong DOI, 2 wrong author lists (3 lines), 5 publication years, 3 placeholder link texts | `5f39d86c` |
| 2. People and eponyms (`npm run consistency:people`) | 165 people cited on 2+ pages, 726 attribution sentences, lifespans | 4 Codex findings | Ahmad (not Amin) Orandi, Turner-Warwick 1925–2020, Bogoras spelling, Mulcahy salvage dating clarified | `a3a27205` |
| 3. Same source, different numbers (`npm run consistency:same-source`) | 469 papers cited with numbers on 2+ pages (1,724 sentences) | 0 Codex findings | None. Claude's check of the 5 sample-size conflicts found subgroups or different trials | — |
| 4. Voice and structure scorecard (`npm run scorecard`) | 1,338 pages | 336 pages never had voice Pass 1; a few structure defects | Pass 1 applied to 81 pages (333 units); See Also order fixed on 2 pages; one "At a glance" heading renamed | `c5faa220`, `6fa3cbe1` |

The reference metadata, the attribution facts and the numbers shared between pages were already largely consistent, which reflects the September audit. The drift was concentrated in a few repeated names and dates and in voice on pages added after the September 25 sweep.

## How Codex was used

- Each layer: a script builds a candidate list; Codex triages it in parallel batches (read-only on the repo, writing only to a scratch file) with a written brief; Claude spot-checks Codex's negative verdicts against PubMed or Crossref and verifies every positive verdict before editing.
- Spot checks: 8 of 8 sampled reference false positives confirmed by PubMed; the 5 strongest same-source signals confirmed as non-contradictions.
- Voice: Codex wrote Pass 1 edit files; `scripts/voice/pass1.py` applied them through the per-unit invariant checks and the whole-page `check_voice_diff` gate. Codex unbolded 30 run-in list labels against STYLE.md; Claude restored 25 and reverted 5 units.

## Decisions taken

- Reference format: STYLE.md section 10 now sets the house format for new and edited references (quoted titles, AMA author truncation, version-of-record year). The existing roughly 19,000 lines are not rewritten in bulk.
- The four scripts are listed in the CLAUDE.md command table for the quarterly evidence cadence.

## Open items

- **`posterior-urethral-stenosis.mdx`** still has an "At a Glance" block of seven cited key points. The September 27 design rule says no At a glance blocks, but removing cited content needs the user's call (rename to a plain heading, fold into the sections, or keep).
- **Surgeon profiles (215)** have no Pass 1 record because their prose sits inside the `SurgeonProfile` component, which `pass1.py` skips. Their voice metrics are mostly low; a few outliers (Turner-Warwick, Virasoro, Elliott) are listed in `reports/2026-10-03/scorecard/scorecard.md`.
- **About 3,350 references carry no DOI** (about 1,900 URL-only). A Crossref and PubMed search for the plain-text journal articles would bring them into the registry check.
- **688 content pages lack `evidenceUpdated`.** This is provenance metadata and must not be manufactured from Git dates, so it is left for the evidence cadence.
