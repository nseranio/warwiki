# Textbook-mining monitoring handoff

> **Closed September 30, 2026 (~23:30).** All mining jobs finished and all
> findings are incorporated into WARWIKI. Nothing here needs monitoring any
> more; see `consolidation/STATUS.md` for the record and `consolidation/DEFERRED.md`
> for the three open questions.

Written September 30, 2026, to hand the monitoring loop to a fresh session
when the current one runs low on usage. If you are a new Claude session
picking this up: read this whole file, then go straight to "What to do
right now" below -- you do not need the prior conversation.

## What this project is

Codex is mining a 25-book approved queue (23 originally; two added September 30) of urology/urogyn textbooks for
content WARWIKI (the reconstructive/functional urology and urogynecology
wiki at `/Users/joyboy/Documents/WARWIKI/warwiki`) could add. It runs as a
background job via the `codex-companion.mjs` script (from the
`openai-codex` Claude Code plugin), writing only inside
`~/Desktop/WARWIKI-textbook-mining/`. The full approved order and reasoning
is in [library-queue.md](library-queue.md) (repo copy; Codex keeps its own
synced copy in the mining folder). The original mining procedure is in
[CODEX-PROMPT.md](CODEX-PROMPT.md). The book-1 pilot review is in
[pilot-review.md](pilot-review.md).

**Absolute limits, unchanged throughout:** the WARWIKI repo and
`/Users/joyboy/Documents/Medicine` (the book library) are both read-only.
All mining writes go only inside `~/Desktop/WARWIKI-textbook-mining/`.
**No WARWIKI site edits or content adoption happen until the entire
25-book queue is mined and the user asks for the consolidation pass** --
this has been the user's standing instruction since book 6 and still
holds. Do not start writing findings into WARWIKI pages on your own
initiative, even if a book finishes cleanly.

## Status as of this handoff (2026-09-30, ~11:00 local)

21 of 25 books complete. Book 22 (HINMAN5) in progress; books 23-25 remain.
On September 30 the user added *Perineal Reconstruction* (book 23) and
*Atlas of Office Based Andrology Procedures* (book 24); *Penile Implant
Surgery* moved to 25. Both queue copies and `auto-continue.sh` (now stops
at book 25) were updated.

| # | Book | Abbrev | Status |
|---|---|---|---|
| 1 | Advanced Male Urethral and Genital Reconstructive Surgery | AMUGRS | Done (pilot, reviewed) |
| 2 | Major Complications of Female Pelvic Surgery | MCFPS | Done |
| 3 | Wilson's Pearls, Perils, and Pitfalls of Penile Prosthesis Surgery | WPPPS | Done |
| 4 | Textbook of Female Urology and Urogynecology Vol. 2 | TFUUG2 | Done |
| 5 | Textbook of Female Urology and Urogynecology Vol. 1 | TFUUG1 | Done |
| 6 | Female Genitourinary and Pelvic Floor Reconstruction | FGPFR | Done |
| 7 | Female BOO and Urethral Reconstruction | FBOUR | Done |
| 8 | Complications of Female Incontinence and Pelvic Reconstructive Surgery | CFIPRS | Done |
| 9 | Neuro-Urology | NEUROURO | Done |
| 10 | Urinary Fistula | URIFIST | Done |
| 11 | Urinary Diversion | URIDIV | Done |
| 12 | The Ureter | URETER | Done |
| 13 | Surgical Atlas of Urethroplasty | SURGURO | Done |
| 14 | Reconstructive Urethral Surgery | URETHRS | Done |
| 15 | Textbook of Reconstructive Urologic Surgery | TRUS08 | Done (biggest book, 94 ch.) |
| 16 | Urodynamics (2021) | URODYN21 | Done |
| 17 | Atlas of Pelvic Anatomy and Gynecologic Surgery | APAGS2020 | Done |
| 18 | Genital Gender Affirming Surgery | GGAS | Done |
| 19 | Urological Care for the Transgender Patient | UCTP | Done |
| 20 | Transition and Lifelong Care in Congenital Urology | TLCCU | Done |
| 21 | Atlas of Male Genitourethral Surgery (Muneer, 2013) | AMGUS | **Just finished** |
| 22 | Hinman's Atlas of Urologic Surgery, 5th ed | HINMAN5 | **In progress** (76 selected chapters) |
| 23 | Perineal Reconstruction (Kosutic, 2023) | (suggested PERIREC) | Queued (added Sept 30) |
| 24 | Atlas of Office Based Andrology Procedures (2017) | (suggested OFFANDRO) | Queued (added Sept 30); triage infertility chapters out |
| 25 | Penile Implant Surgery | (TBD abbrev) | Queued, last book |

Each completed book has a `findings/<ABBREV>/99-summary.md` in the mining
folder with finding counts by type/priority and a shortlist of the
higher-priority items. Verify a book's completion by checking that file
exists, not just by the job's own narration.

**Known process gap (fixed after book 4, watch for recurrence):** the very
first few books, Codex once narrated "book complete" in session-log.md
without actually having written `99-summary.md` yet. A standing correction
was added to every resume prompt: always write and verify the summary file
exists before marking a book complete. It has not recurred since, but
double-check the file exists before reporting a book done to the user.

**Unrelated folder to ignore:** `~/Desktop/WARWIKI-textbook-mining/findings/AUACORE/`
and the matching `text/AUACORE/` are from a completely separate user
workstream (an "AUA Core Curriculum" content-mining project, run and
resolved independently, already applied to WARWIKI in its own commits).
It is not part of the 25-book queue. Never let it affect book numbering,
never resume it, never report on it as part of this queue's progress.

## Parallel split (September 30, ~09:15 local) -- read this first

At the user's request (they have ample Codex credits), books 23-25 now run as
**three separate parallel Codex jobs**, each in its own folder so that
`--resume-last` can never grab the wrong thread:

| Book | Folder (its own `--cwd`) | Job id at launch |
|---|---|---|
| 22 HINMAN5 | `~/Desktop/WARWIKI-textbook-mining` (main) | `task-muo4kses-fjzpqi` |
| 23 PERIREC | `~/Desktop/WARWIKI-mining-parallel/PERIREC` | **Done 09:55**, 10 findings, copied to main `findings/` |
| 24 OFFANDRO | `~/Desktop/WARWIKI-mining-parallel/OFFANDRO` | **Done 09:34**, 12 findings, copied to main `findings/` |
| 25 PIS | `~/Desktop/WARWIKI-mining-parallel/PIS` | **Done 10:29**, 31 findings, copied to main `findings/` |

- **HINMAN5 chapter split (~10:15):** to speed up Hinman's, 36 of its
  remaining chapters went to four workers in
  `~/Desktop/WARWIKI-mining-parallel/HINMAN5-{B,C,D,E}` (jobs
  `task-muo6ogry-1ot85r`, `task-muo6ogz6-yr3gag`, `task-muo6oh7t-snty29`,
  `task-muo6ohhv-radp1e`). Each has its own `PROMPT.md` with its chapter list,
  writes `findings/HINMAN5/chNNN.md`, no summary, and `DONE.md` when finished.
  The main job keeps only Chapters 93-105 (reassigned chapters are marked
  `[~]` in the main `progress.md`). When all five are done: copy the workers'
  `chNNN.md` files into the main `findings/HINMAN5/`, tick them in the main
  `progress.md`, then run one final fresh job in the main folder to write and
  verify `99-summary.md` across all 76 chapters and mark Book 22 complete.
- **Campbell's chapter split (~10:20):** of CWW13's 96 remaining chapters,
  the main Campbell's job keeps 028, 038, 043, 046, 048, 052, 053, 055 (others
  marked `[~]` in its `progress.md`); 88 went to eight page-balanced workers in
  `~/Desktop/WARWIKI-campbell-mining-workers/CWW13-{B..I}` (job ids in the
  `session-log`-style list below). Same pattern as Hinman's: workers write
  `chNNN.md` + `DONE.md`, no summary; when all nine finish, copy the chapter
  files into `~/Desktop/WARWIKI-campbell-mining/findings/CWW13/` and run one
  final fresh job there for `99-summary.md`. Worker jobs: B
  `task-muo6wvqq-159324`, C `task-muo6wvwk-rqps5i`, D `task-muo6ww2u-k25hsu`,
  E `task-muo6wwbk-tkjq3b`, F `task-muo6wwi3-0sgm1g`, G `task-muo6wwrg-hkvnea`,
  H `task-muo6wx4m-s77hwr`, I `task-muo6wxgo-fv4vuy`.
- The main job now finishes **only** HINMAN5, then stops (noted at the end
  of the main folder's `library-queue.md`; `auto-continue.sh` now stops at
  book 22).
- Each parallel folder has its own `PROMPT.md`, `text/`, `findings/<ABBREV>/`,
  `session-log.md`, and writes `DONE.md` when its `99-summary.md` is
  verified. Resume a stopped parallel job with the same resume command below
  but `--cwd` set to that folder and a short "continue per your progress
  files; finish only this one book" prompt.
- **After a parallel book finishes:** verify its `99-summary.md`, copy
  `findings/<ABBREV>/` (and `text/<ABBREV>.txt`) into the main mining folder,
  and mark that book complete in both queue copies.
- **HINMAN5 thread restart:** the original Codex thread
  (`01a0e555-...`) got stuck behind a stale app-server holding its writer
  lock, so companion `--resume-last` failed with "No previous Codex task
  thread was found". HINMAN5 was restarted as a fresh thread from its
  on-disk progress files (prompt saved as `hinman-fresh-prompt.md` in the
  main folder). If that ever recurs, do the same: `--fresh` with that prompt.
- **Campbell's 13th ed (CWW13)** runs as a fifth job in
  `~/Desktop/WARWIKI-campbell-mining/` (launched ~09:20, job
  `task-muo4pq7i-tzwgoe`, prompt in its `PROMPT.md`). Pilot (166 chapters triaged: 59 in, 46 partial, 61 out; 4 findings) was
  approved by Claude at 09:57; current job `task-muo643hb-2vw4ll`. Keep it running and resume it like the others,
  but do not wait for it before the consolidation pass.

## What to do right now

1. Check the current Codex job:
   ```
   node "/Users/joyboy/.claude/plugins/cache/openai-codex/codex/1.0.3/scripts/codex-companion.mjs" status --all --cwd ~/Desktop/WARWIKI-textbook-mining --json
   ```
   Look at the `running` array for the current job id. If nothing is running, look at `latestFinished`.

2. If a job is `running`: just check in periodically (see cadence below). Do
   not send a new resume while one is already running -- it will fail with
   "Task X is still running." That failure is harmless and just means you
   checked too soon after a completion; re-check status a bit later instead
   of retrying resume immediately.

3. If the job has `status: "completed"` (a genuine stop, not the false-alarm
   race above) or `"failed"`, resume it:
   ```
   node "/Users/joyboy/.claude/plugins/cache/openai-codex/codex/1.0.3/scripts/codex-companion.mjs" task \
     --cwd ~/Desktop/WARWIKI-textbook-mining \
     --write \
     --background \
     --resume-last \
     "Continue exactly where you left off per your own checkpoint note, then keep processing every remaining book in the approved 25-book queue (library-queue.md; books 23-24 were added September 30 -- re-read the table) in order without stopping to ask between books or chapters, always writing and verifying each book's 99-summary.md exists before marking it complete. There is an unrelated AUACORE folder in findings/ from a separate user workstream -- ignore it entirely. When you run out of turn budget, stop cleanly with progress files up to date -- you will be resumed the same way again." \
     --json
   ```
   This returns a new job id each time -- track whichever one is current.

## Monitoring cadence

Use `ScheduleWakeup` at roughly 1500 seconds (25 min) between checks; drop
to ~900s when a book looks close to finishing (high chapter count relative
to its total). Each wakeup: check status, resume if genuinely stopped, and
only message the user when:
- a book completes (report finding counts by type/priority, and flag
  anything `high` priority or a notable `conflict`/cross-book convergence),
- something needs a decision, or
- the whole queue finishes.

Do not report routine chapter-count progress to the user every cycle --
that's for your own tracking between wakeups, not conversation noise.

## Mining complete (September 30, ~11:30)

All 25 queue books are mined (HINMAN5 finished with 94 findings after the
four-worker split; summary rebuilt and verified). Campbell's (CWW13): all 105
selected chapters mined by the main job plus eight workers; finished at 11:40 with 106 findings
(7 high, 61 medium, 38 low; 11 conflicts, 4 new-page proposals); summary
verified in `~/Desktop/WARWIKI-campbell-mining/findings/CWW13/99-summary.md`.
Its findings get their own incorporation pass after the 25-book waves (run
`build_index.py ~/Desktop/WARWIKI-campbell-mining/findings` into a separate
index). No Codex jobs are running now.

## Incorporation (started September 30, ~10:45)

All 25 books except HINMAN5's last six chapters are mined, and the
incorporation into WARWIKI is underway. Follow
[consolidation/STATUS.md](consolidation/STATUS.md) for the wave plan and
progress; the method is in [consolidation/AGENT-BRIEF.md](consolidation/AGENT-BRIEF.md).

## When all 25 books finish

**Superseded September 30, 2026 (user instruction):** as soon as books 22-25
are done (all 25 queue books mined), **go straight into the cross-book
consolidation pass and incorporate the results into WARWIKI** -- do not wait
for the Campbell's (CWW13) job, and no separate go-ahead is needed. Method:
compare findings across all 25 books, resolve overlaps and conflicts, and
produce adoption verdicts the way [pilot-review.md](pilot-review.md) did for
book 1; then apply the adopted items to the site. Rules that still apply:
verify every cited primary paper (PubMed) before citing it, cite the primary
study rather than the textbook, follow STYLE.md and the content-preservation
policy, run `git status` on the repo first (Codex must not have touched it),
lint/typecheck/build per CLAUDE.md, and commit and push each batch to `main`
touching only the files it changed. Campbell's findings get folded in later
as a follow-up pass when that job finishes.

## Fallback: user-run script

The user also has `~/Desktop/WARWIKI-textbook-mining/auto-continue.sh`, a
standalone script that drives the same Codex thread independently of any
Claude session (confirmed to share the same underlying thread). If no
Claude session is available, they can run it themselves; see the script's
own header comments for usage. Only one driver (a Claude session or the
script) should hold the thread at a time.
