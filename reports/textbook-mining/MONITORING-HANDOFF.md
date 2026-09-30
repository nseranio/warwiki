# Textbook-mining monitoring handoff

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

## When all 25 books finish

Do not start writing anything into WARWIKI. Tell the user the queue is
complete and ask whether they want the cross-book consolidation pass now
(comparing findings across all 25 books, resolving overlaps, and producing
adoption verdicts the way [pilot-review.md](pilot-review.md) did for book 1
alone) -- that is a substantial, separate piece of work that hasn't started
yet and deserves its own planning, not something to launch automatically.

## Fallback: user-run script

The user also has `~/Desktop/WARWIKI-textbook-mining/auto-continue.sh`, a
standalone script that drives the same Codex thread independently of any
Claude session (confirmed to share the same underlying thread). If no
Claude session is available, they can run it themselves; see the script's
own header comments for usage. Only one driver (a Claude session or the
script) should hold the thread at a time.
