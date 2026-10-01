# Incorporation status

Started September 30, 2026 (~10:45), per the user's instruction to consolidate
and incorporate the 25-book findings without waiting for Campbell's.

- Index: `python3 build_index.py` (reads `~/Desktop/WARWIKI-textbook-mining/findings/`,
  skips AUACORE) then `python3 make_batches.py`. Both outputs are gitignored.
  Built at 10:40 with 1,230 findings on 369 target pages (HINMAN5 at 70/76
  chapters; its last six chapters, 100-105, go in an addendum batch).
- 27 page batches (b01-b27, ~45 findings each) plus `new-pages` (60 findings
  on 37 proposed pages; separate decision pass after the page batches).
- Agents follow `AGENT-BRIEF.md`, run in waves of six (AUDIT.md limit), and
  write `verdicts/<batch>.md`. The main session lints and builds only after a
  wave finishes, then commits the touched pages, verdict ledgers and a
  CHANGELOG entry.

| Wave | Batches | Status |
|---|---|---|
| 1 | b01-b06 | **done** (227 findings: 138 adopt, 2 merge, 87 reject; 63 pages) |
| 2 | b07-b12 | **done** (262 findings: 179 adopt, 11 merge, 70 reject, 2 defer; 67 pages) |
| 3 | b13-b18, c01, c02 | **done** (393 findings: 328 adopt, 6 merge, 57 reject, 1 partial, 1 new-page; 109 pages) |
| 4 | b19-b24 | **done** (268 findings: 234 adopt, 3 merge, 30 reject, 2 defer; 62 pages) |
| 5 | b25-b27 | **done** (122 findings: 92 adopt, 9 merge, 21 reject; 24 pages) |
| 6a | folds (`batches/f01.json`, 20 findings on 12 existing pages) | next |
| 6b | new pages (19, `NEW-PAGE-BRIEF.md`) | next |
| 6 | new-pages | reviewed (`NEW-PAGES-REVIEW.md`); user chose 16 adult pages plus 3 adult-framed congenital pages; pediatric-primary topics become short context on existing lifelong-care pages; 9 folds; skips as listed |
| — | Campbell's (CWW13, 106 findings) | folded in: 47 findings added to b13-b27 on the same pages; 56 on wave 1-2 pages or unbatched pages in c01/c02 (wave 3); 10 new-page proposals added to new-pages |

## Lessons from wave 1

- Agents typed DOIs from memory and then corrected them. Every wave's new
  references get a DOI check (`scratchpad doicheck.py` pattern: resolve each
  new DOI with `pubmed.py doi` and compare first author and year) before commit.
- Textbook chapter citations drifted (wrong editors, book, chapter, year).
  `BOOKS.md` now holds the canonical front matter; the brief points agents to it.
- Large batches get split into helper agents by the batch agent itself; that
  works, but the parent must merge the helpers' ledgers into `verdicts/<batch>.md`.

## Campbell's integration (decided September 30, ~11:50)

The user left the timing to Claude. Folding Campbell's into the remaining
batches edits each page once instead of twice. `index.json` was rebuilt with
both finding folders (1,343 findings, 382 pages); `index-wave12.json` keeps
the earlier snapshot. The last seven HINMAN5 findings (chapters 100-105) were
folded in the same way.

## Usage-limit interruption (wave 3, ~13:00)

All wave-3 agents and their helpers hit the account session limit at about
13:00 (reset 14:30) and stopped mid-edit. One helper had been running in a
separate git worktree; its half-finished edits were discarded (worktree
removed). Seven pages in the main tree had citation markers without
references. The relaunch uses `RESUME-NOTE.md`: each agent reviews its
pages' leftover diff first, repairs or reverts partial edits, reuses partial
ledgers, and works without helper agents (the nested helpers multiplied the
load). If the limit trips again, wait for the reset and relaunch the same way.
