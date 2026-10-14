# Wording sweep, October 14–15, 2026 (03-clinical-conditions)

Three problems the owner flagged on the female SUI page on October 14 (commit `6c7d22e4`), searched across all 84 Clinical Conditions pages:

1. **standalone-study**: a one-study paragraph that does not fit its section (Blaivas–Olsson outcome numbers in Pathophysiology).
2. **guideline-box**: a guideline call-out in the opening or another section that repeats a later section.
3. **rebuttal-scope**: STYLE.md §11/§12 sentences (rebuttals, non-transfer warnings, restated design limits, process notes, "This page covers", relevance lists).

## Passes and files

| File | What |
|---|---|
| `pass1_regex.py` → `pass1-regex.tsv` | Pass 1: deterministic pattern scan (53 rows). Used as a cross-check; nearly all hits reappear in pass 2. |
| `brief.md`, `run_codex.py` → `pass2-codex.tsv` | Pass 2: Codex (`gpt-6-sol`, high effort), 12 jobs of 7 pages. 319 rows; every quoted sentence matched the file verbatim. |
| `decisions.tsv` | Claude's review of every pass-2 row: `apply`, `skip` (with reason), `defer` (page busy), `defer-gate`, `manual`. |
| `apply_fixes.py` | Applies `apply` rows by exact sentence match (delete / rewrite / fold / move to a heading). |
| `deferred-claim-edits.patch` | The reviewed edits held back from the commit (see below). Apply with `git apply` from the repo root. |
| `busy-pages-gate-wave.txt` | The 202 pages with uncommitted edits from the gate-final-2026-10-14 wave in the main checkout, as of the sweep. |

## Outcome

- **Published:** 101 edits on 45 pages (100 `apply` rows plus the Male Urethral Stricture opening, edited by hand). Mostly cut "This page covers" scope lines, reconstructive-relevance sentences in openings, "The comparison below preserves…" process notes and non-transfer or rebuttal sentences. Also moved 8 treatment-atlas pointers from openings into the management sections. Lint, claim gate and build pass.
- **Skipped (69):** mainly Codex proposals to delete or move single-study paragraphs. Deleting them would remove evidence (content-preservation policy), or the study fits where it is. Also routing sentences (§11 exception), list lead-ins and landing-page intros. Reasons are in `decisions.tsv`.
- **Deferred, page busy (104 rows on 25 pages):** these pages have uncommitted gate-wave edits in the main checkout. Review them after that wave is committed (rerun `run_codex.py` on those pages, or reuse their rows in `pass2-codex.tsv` after checking that each sentence is still present).
- **Deferred, claim gate (45 rows, `deferred-claim-edits.patch`):** these edits change a paragraph or table cell that holds a gated claim (number, guideline or absolute statement). The gate keys on the whole claim unit, so even deleting a neighbouring caveat counts as a change. Five of them would also orphan a reference: the urethropexy-in-dogs sentence (ref21, urethral prolapse), ureterocolonic ref11, vesicovaginal ref27, genital-lymphedema ref9 and neurogenic-bowel ref8. Those need the reference removed and the list renumbered, which re-gates the page.
  The Codex claim check for the 34 gated claims runs in `reports/audit-v2/sources-local/wording-sweep-2026-10-15/` in the main checkout (1 reviewer, 1 verifier). **After the gate-final-2026-10-14 wave is committed:** `git apply reports/2026-10-15/wording-sweep/deferred-claim-edits.patch`, then `gate.py record` on that work dir (rerun `gate.py pending` on the patched files if the text changed), `apply.py list` / review, final-text recheck and `npm run lint:claims`, then lint, build and commit.

## Rerun on another section

```bash
python3 reports/2026-10-15/wording-sweep/pass1_regex.py docs/02-evaluation > <dir>/pass1-regex.tsv
python3 reports/2026-10-15/wording-sweep/run_codex.py docs/02-evaluation <work dir> --parallel 3 --per-job 7
```

Then merge the job TSVs, as for `pass2-codex.tsv` (add `id`, `found` and `busy` columns), review the rows into a decisions file, run `apply_fixes.py`, and run `npm run lint:claims` before committing. Expect about 4 candidates per page and about half to be worth applying.
