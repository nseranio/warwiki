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
| 2 | b07-b12 | |
| 3 | b13-b18 | |
| 4 | b19-b24 | |
| 5 | b25-b27, HINMAN5 100-105 addendum | |
| 6 | new-pages | |
| later | Campbell's (CWW13) | after its mining finishes |

## Lessons from wave 1

- Agents typed DOIs from memory and then corrected them. Every wave's new
  references get a DOI check (`scratchpad doicheck.py` pattern: resolve each
  new DOI with `pubmed.py doi` and compare first author and year) before commit.
- Textbook chapter citations drifted (wrong editors, book, chapter, year).
  `BOOKS.md` now holds the canonical front matter; the brief points agents to it.
- Large batches get split into helper agents by the batch agent itself; that
  works, but the parent must merge the helpers' ledgers into `verdicts/<batch>.md`.
