# Full-site second review: results (October 3–4, 2026)

The second review proposed in [full-review-proposal.md](../2026-10-03/full-review-proposal.md) ran to completion on every content page (1,036 pages; indexes and surgeon profiles excluded). Pages were reviewed in audit-queue tier order: tier 1 had 36 pages, tier 2 had 134, tier 3 had 597 and tier 4 had 269.

## Method

- **Reviewers:** Codex `gpt-6-sol`, with up to 10 agents at a time and two pages per job. Each agent was read-only on the repo and used `scripts/review/reviewer-brief.md` (tier 4 used the lighter `reviewer-brief-light.md`). The brief covers the AUDIT.md per-page procedure plus currency, cross-page consistency, completeness and voice. Every finding carries an exact `{old, new}` edit; new sources go in as `new_refs` placeholders, never as edits to the reference list.
- **Verifiers:** up to 5 Codex agents, four pages per job, using `scripts/review/verifier-brief.md`. Each verifier tried to refute every high and medium finding against the opened source. Verdicts were agree, modify, reject or no_edit.
- **Claude:**
  - read every high-severity finding before each batch, using the compact sheet from `sheet_compact.py`;
  - spot-checked recent PMIDs and every new DOI against PubMed and Crossref;
  - vetoed malformed edits;
  - published in 19 batches via `scripts/review/cycle.sh`, which applies the edits, drops references left uncited by an edit (renumbering the rest), then runs lint and build.
- **Orchestration:** `scripts/review/orchestrate.py`. State, findings and verdicts are kept off-git in `reports/audit-v2/sources-local/full-review/`.
- **Settings:** the first batches ran at ultra reasoning on the priority tier. After the user raised credit use, an A/B on the same pages compared settings:
  - **High reasoning, standard tier:** used about half the tokens and kept about 75–80% of the high-severity yield.
  - **Medium reasoning:** clearly worse.

  The rest of the run used high/standard (the user chose option 1).
- **Wall time:** about 10 hours, from 18:39 on October 3 to 04:40 on October 4.

## Results

| | Count |
|---|---|
| Pages reviewed and verified | 1,036 (no failures) |
| Pages with at least one finding | 1,002 |
| Findings | 5,867 (high 1,906, medium 3,281, low 680) |
| Verifier verdicts | agree 2,618, modify 2,470, no_edit 136, reject 93 |
| Edits published | 5,086 (high 1,851, medium 3,168, low 67) on 962 pages |
| Edits re-derived after the page changed | 16 (13 fixed, 3 already fixed) |
| Edits vetoed (malformed) | 3, redone separately |

- **Findings by category:** accuracy 3,129, completeness 858, currency 641, consistency 581, voice 281, reference 260, structure 117.
- **Commits:** batches 1–19 on `main`; the final batch is `f614bc5d`.

## What the errors looked like

These were rarely fabricated references. Most were misreadings that a single pass misses:

- **Wrong denominator or endpoint.** Composite "cured or improved" was reported as dry, a five-year table carried three-month results, and per-dissection rates were compared with per-patient rates. Percentages were also back-computed from numerators that do not reproduce the paper's figures (for example, the Hardrock sandwich complication table).
- **Pooled evidence attached to the wrong operation.** The Pang 2025 glansectomy review was labelled as split-thickness-graft neoglans outcomes on seven glans and neoglans pages. Male perineal-urethrostomy stenosis rates were presented as AFAB nullification outcomes, and mixed Peyronie surgery satisfaction was presented as prosthesis outcomes.
- **Guideline currency and strength.** The run picked up:
  - EAU 2026: penile cancer, urethral strictures (including transgender patients), female and male LUTS, trauma, infections, and sexual and reproductive health;
  - AUA/GURS/SUFU 2024 male incontinence statements;
  - ASCRS 2026 diverticulitis;
  - ACS 2025 GU trauma;
  - Surviving Sepsis 2026;
  - NICE pectopexy and CESA/VASA positions;
  - CMS FY2026 ICD-10-CM N35 codes.
- **Missing newer trials.** Examples: COURAGE (vibegron in men), SAVE-U at ten years, the 2025 Cochrane update on perioperative interventions in prolapse surgery, WATER III, and sham-controlled Li-ESWT trials in women.
- **Manufacturer instructions.** ProACT, AdVance XP, AMS 800/700, InhibiZone, Capio SLIM, Optilume, Padgett and da Vinci 5: contraindications, steps and limits that pages had dropped or reversed.
- **Misapplied citations removed.** A premature-ejaculation Cochrane review was cited for female sexual disorders, a rat bladder-implant study for guidewire mechanics, an AMAB prosthesis review on an AFAB page, and an ACOG opinion for a different hymenal indication.

## Open items

- **[second-review-open-findings.md](second-review-open-findings.md):** 136 findings judged real or plausible but left without an edit. About 26 need a paywalled or full-text source and about 105 need clinical judgment. Use them as leads only.
- **Process lessons:**
  - Have Claude read the high findings and DOI-check the new references before applying. The verifier caught most problems, but not malformed edits.
  - Keep `old` spans short.
  - Never let an agent edit a reference list directly.
- **Pipeline fixes made during the run:**
  - per-page orphan removal in descending order;
  - trailing-whitespace stripping;
  - new references on footnote-style GAS pages and on number-first reference lists;
  - the cycle script fails on a lint or build error and shows its full skip list.
