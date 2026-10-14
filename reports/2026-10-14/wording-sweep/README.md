# Wording sweep, October 14, 2026 (Evaluation, Special Populations, Treatment Atlas)

Extends the Clinical Conditions sweep (`reports/2026-10-15/wording-sweep/`, commit `20a1a066`) to `docs/02-evaluation`, `docs/05-special-populations` and `docs/04-surgical-techniques`, one section per pass, with the same three problems (standalone-study, guideline-box, rebuttal-scope; STYLE.md §11/§12) and the same tools. Results are filled in per section below as each is published.

## Method

1. `pass1_regex.py docs/<section>` → `<section>/pass1-regex.tsv` (cross-check only).
2. `run_codex.py docs/<section> <section>/codex --parallel 3 --per-job 7 --skip busy-pages.txt` (Codex `gpt-6-sol`, high effort; the `--skip` option was added for this run). Pages with uncommitted gate-final-2026-10-14 edits in the main checkout (`busy-pages.txt`, 202 pages at 16:55) were not sent to Codex; sweep them after that wave is committed. Job folders (`codex/`) are not committed.
3. `merge.py <section>/codex <prefix> busy-pages.txt` → `<section>/pass2-codex.tsv` (adds `id`, `found`, `busy`).
4. Claude reviewed every row (`context.py` prints each with its heading and paragraph) into `<section>/decisions.tsv`: `apply`, `skip` (reason), `defer-gate`. Single-study paragraphs kept unless off-topic (content-preservation policy); routing sentences and one- or two-sentence landing intros kept (STYLE §11).
5. `apply_fixes.py`, then `gate.py check` and `orphans.py` on the touched pages. Rows that fail the claim gate or leave a reference uncited were marked `defer-gate`; `split_deferred.sh` applies the rest and writes the held-back edits as `<section>/deferred-claim-edits.patch` (relative to the published text; `git apply` from the repo root).
6. `npm run lint` and `npm run build`, then commit and push to main.

## Deferred edits: how to finish them

After the gate-final-2026-10-14 wave is committed: `git apply reports/2026-10-14/wording-sweep/<section>/deferred-claim-edits.patch`, then for rows that orphan a reference remove the reference and renumber (renumbering keeps the claim binding; the removal re-gates the page), `gate.py pending <files> --out <dir>`, `orchestrate.py --claims --reviewers 1 --verifiers 1`, `gate.py record`, `apply.py list` / review, final-text recheck, `npm run lint:claims`, lint, build, commit.

## Results

### 02-evaluation (27 of 38 pages; 11 busy)

72 Codex rows (all quoted sentences found verbatim). 56 applied on 22 pages (commit `875c0e3d`; its message says 57 by mistake), 9 skipped, 7 deferred (`defer-gate`): 5 change a gated number or dose unit (MAG3 low-function cohort, ultrasound example protocol, copper audit, B-PROOF follow-up, OB12 table cell) and 2 leave a reference uncited (transferrin ref9, zinc ref8 Unna boot). Applied edits are mostly opening relevance lists and scope lines, rebuttals of unstated thresholds ("not a validated universal threshold", "does not mandate"), restated populations and process notes ("These details come from technique descriptions"); one author-facing routing line on CT urogram became a `> See` pointer. Lint, claim gate and build pass.

### 05-special-populations (34 of 51 pages; 17 busy)

118 Codex rows (2 had CSV-escaped quotes; `merge.py` now unescapes them). 84 applied on 25 pages plus 1 by hand (recurrent UTI methenamine isolate clause), 12 skipped, 21 deferred: 17 change a gated claim unit (most are "; this is not …" tails cut from numeric sentences) and 4 leave a reference uncited (feminizing fn28, sexual dysfunction ref40, BEEC ref53, hypospadias ref37). New fix type in `apply_fixes.py`: `delete keep citation` drops a caveat sentence but moves its citation onto the previous sentence (merging `<sup>` groups). Skipped rows needing an owner decision: the IMvigor011 adjuvant-oncology paragraph on Cancer Survivorship (s069, possible scope issue), the EVA trial sentence in the GSM opening (s082, move), and the detrusor-overactivity antibiotic trial in rUTI Diagnosis (s090, misplaced but on-topic). Lint, claim gate and build pass.

### 04-surgical-techniques (Treatment Atlas; 380 of 463 pages sent to Codex, 83 busy)

Reviewed and published in batches by subsection; ids are `t<job>-<n>` (`merge.py --by-job`), so rows stay stable while later jobs run. Each batch folder holds its own `pass2-codex.tsv`, `decisions.tsv` and `deferred-claim-edits.patch`. Pages that became busy in the main checkout during the review (the gate wave kept writing) were set to `defer` and left out of both the commit and the patch (`mark_busy.py`). Codex proposed many moves of single-study paragraphs and deletions of outcome data; nearly all were skipped (content-preservation), as were routing sentences in openings.

- **Batch A (04a urethral, 04ab bladder neck, 04b bladder, 04c diversion; jobs j00–j14, 345 rows):** 190 applied on 84 pages, 87 skipped, 56 `defer-gate` (most delete a caveat sentence whose citation the preceding claim shares, which changes that claim's binding; 26 also leave a reference uncited), 12 `defer` (4 pages became busy). Lint, claim gate and build pass.
- **Batch B (04d upper tract, 04e genital reconstruction; jobs j15–j25, 233 rows):** 150 applied on 62 pages, 39 skipped, 42 `defer-gate` (11 also leave a reference uncited), 2 `defer` (busy page). Most applied edits cut "this is not a … rate" tails, abstract-process notes ("the abstract does not give …") and non-transfer warnings from the lymphedema, scrotal-flap and penile-coverage pages. Lint, claim gate and build pass.
- **Batch C (04f incontinence, 04g prolapse, 04h fistula; jobs j26–j38, 283 rows):** 177 applied on 71 pages, 46 skipped, 60 `defer-gate` (14 also leave a reference uncited). One guideline box moved out of an opening (ATOMS regulatory status, t26-13). Skipped for the owner: the MASTER-trial paragraph in the incontinence-procedures landing intro (t26-01), the "Launch Note" section on the adjustable-devices hub that would be left empty (t26-06/07), the "Arm rates not in abstract" table cells on iliococcygeus suspension (t30-25–27), and two RVF teaching points against a fixed escalation sequence (t36-04/05). Lint, claim gate and build pass.
- **Batch D (04h male fistula tail, 04j sexual dysfunction, 04k gender-affirming, 04l cosmetic, 04m BPH, root pages; jobs j39–j54, 281 rows):** 134 applied on 73 pages, 101 skipped, 31 `defer-gate`, 15 `defer` (pages busy in the source-needed-local wave, including the PAE guideline-box move t53-02). Most applied edits cut "This is the dedicated atlas page." scope lines (about 20 gender-affirming pages), abstract-process notes and non-transfer tails. **Owner decision needed:** nine cosmetic-genital pages open with a society-positions box (ACOG 795, FIGO 2025, SMSNA 2024, EAU 2026, FDA 2018): female-cosmetic, index, male-cosmetic, suspensory-ligament-division, three-step composite, trim, wedge and de-epithelialization labiaplasty (t47-20, t48-08, t49-03, t50-01, t51-05, t51-07, t51-09, t52-05). Codex proposed moving or deleting them under the owner's guideline-box rule; they were kept because the position statements may belong up front on cosmetic pages. Lint, claim gate and build pass.

### Citation audit of the published deletions (after the Clinical Conditions session's round-2 lesson)

Deleting a caveat sentence together with its trailing `<sup>` strips the citation from the sentence before it when that sentence has none of its own. `audit_cites.py` (pre-sweep base `20a1a066`) found 123 such deletions across the four published batches and the two smaller sections. `fix_cites.py` reattached the citation to the preceding sentence in 109 of them (two more, t31-19 and t31-22, wait in `pending-busy.tsv` because their pages became busy in the source-needed-local wave) (merging into an existing `<sup>` group where adjacent). Six of those reattachments changed a gated numeric claim (PFUI opening, Tanagho tube lengths, catheterizable-channel dilation, ureteroenteric surveillance schedule, transabdominal RUF closure sequence, Rooker prosthesis uptake), so there the original caveat sentence was restored instead and the cite-preserving deletion is held in `followup/citation-audit/deferred-claim-edits.patch`. Nine were left as they are (`not-reattached.tsv`): four were whole-paragraph or whole-bullet deletions, three cited sources that did not support the preceding sentence (s077 NCCN on the DENSE endpoint, t29-04 ATOMS comparison on counseling, t47-22 a systematic review on a follow-up schedule), and two were reattached by hand to the correct source (t33-07 gets only ref4, the case report; e033's preceding IUGA sentence gets ref13). t12-10 was also attached by hand ([7] after the PGIMER sentence). From the follow-up pass on, caveats are cut with `delete keep citation` by default.

**The earlier deferred patches** (`02-evaluation/`, `05-special-populations/`, `04-surgical-techniques/batch-*/deferred-claim-edits.patch`) contain plain deletions made before this audit. When they go through the claim gate, run `audit_cites.py` on them too (or convert the rows to `delete keep citation`) so no result sentence loses its citation.

### Follow-up pass: pages that were busy in gate-final-2026-10-14 (committed in `c8dc859b`)

`followup/target-pages.txt` lists the 106 pages from the original busy list in these three sections that were no longer busy at 18:00 (`followup/busy-pages-1800.txt` holds the 30 pages then busy in the source-needed-local wave). Codex ran on them with the same brief (`followup/run.sh`). Deletes of a caveat that ends with a citation now default to `delete keep citation` (`keep_cites.py`), and `apply_fixes.py` falls back to a plain delete when the caveat opens its line.

- **02-evaluation and 05-special-populations (25 pages, 98 rows; `followup/sections-02-05/`):** 68 applied on 23 pages, 15 skipped, 15 `defer-gate`. Lint, claim gate, build and the citation audit pass.
- **04-surgical-techniques (81 pages, 297 rows; `followup/04-surgical-techniques/`):** 190 applied on 65 pages, 68 skipped, 39 `defer-gate` (one also leaves scrotal-reconstruction ref7 uncited). 83 caveat deletions kept their citation. Owner call added: the feminizing-surgery opening is an evidence-sources paragraph (van der Sluis, Morrison, Opsomer, Fakin, Lee, Blasdel…) that Codex proposed to dismantle sentence by sentence (f04-10-05–12); the stem-cell ED page opens with an AUA "investigational" box (f04-10-02). Lint, claim gate, build and the citation audit pass.
- **Rows set aside as busy (`followup/leftover-busy/`):** after the source-needed-local wave was committed (`c74ae56f`) the 29 `defer` rows from batches A, B and D were rerun: 2 no longer matched the text, 23 applied, 4 `defer-gate` (one also leaves Indiana pouch ref22 uncited). The two pending citation reattachments (t31-19, t31-22) were applied. Lint, claim gate, build and the citation audit pass.

## Totals (October 14)

| Section | Rows reviewed | Applied | Skipped | Deferred to the claim gate |
|---|---|---|---|---|
| 02-evaluation (incl. follow-up) | 72 + 21 | 56 + 18 | 9 + 1 | 7 + 2 |
| 05-special-populations (incl. follow-up) | 118 + 77 | 85 + 50 | 12 + 14 | 21 + 13 |
| 04-surgical-techniques (batches A–D, follow-up, leftovers) | 1,142 + 297 (+ 29 set aside, rerun) | 651 + 190 + 23 | 273 + 68 + 2 | 189 + 39 + 4 |
| Citation audit | 123 | 111 reattached | 6 left as is (justified) | 6 caveats restored |

About 1,070 wording fixes on roughly 330 pages are on main; 281 reviewed edits wait in the deferred patches for a claim-gate run. Nothing in this sweep changed `reports/audit-v2/claims-ledger.json`.

## Owner questions

1. Nine cosmetic-genital pages open with a society-positions box (ACOG 795, FIGO 2025, SMSNA 2024, EAU 2026, FDA 2018). Keep them at the top, or move them to Indications (the SUI-page rule)? Rows t47-20, t48-08, t49-03, t50-01, t51-05, t51-07, t51-09, t52-05.
2. Stem-cell ED therapy opens with an AUA 2018 "investigational" box (f04-10-02): same question.
3. Feminizing-surgery opening: an evidence-sources paragraph listing the reviews and series behind the page (f04-10-05–12). Keep, trim or move?
4. Incontinence-procedures landing intro carries the AUA 2024 statements plus MASTER-trial numbers (t26-01). Keep in the landing intro?
5. Adjustable-devices hub has a "Launch Note" section that only says the page is a hub (t26-06/07). Remove the section?
6. Cancer Survivorship carries an IMvigor011 adjuvant-oncology paragraph (s069): possible scope issue.
