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

## Follow-up (same day, after user answers)

- **Priapism shunts ref 18:** replaced by Stein, Patel and Benoit 2005 (PubMed 15780394), which reports the case. The Mireku-Boateng paper the user found (PubMed 11464133) is a cocaine-priapism case report and does not support the sentence.
- **Otis bougie ref 2:** the *Historia* vol. 28 chapter is Mundy, "A history of the treatment of urethral stricture disease" (pp. 35–88). The claim was checked on pp. 61 and 65.
- **Posterior urethral stenosis:** the At a Glance block was folded into the page. Five of its seven points were already stated, with the same citations, in the sections below; the other two were moved into The Entities, Evaluation and the management table.
- **Surgeon profiles:** voice Pass 1 was run through the same gate (component tags and footnotes blanked on copies, then spliced back). Seven profiles carry edits; Codex's move of the year inside the bold label was reverted to keep the profile convention.
- **Book references:** Codex checked all 592 unique book and chapter references. 461 were correct and 50 were corrected with Crossref or BOOKS.md confirmation (chapter end pages, chapter DOIs, missing editors). 32 proposals were left unchanged.
- **Full-site second review:** pilot and proposal in `full-review-proposal.md`. The pilot found 28 high-severity findings on 8 already-audited pages, and the three Claude checked were real errors.

## Still open

- 688 content pages lack `evidenceUpdated`. This is provenance metadata and is not to be manufactured from Git dates.
- About 2,350 URL-only references are covered by the quarterly external-link check, not by this pass.
