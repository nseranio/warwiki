# Textbook-mining incorporation: brief for batch agents

You are incorporating verified textbook-mining findings into WARWIKI, a
specialist reference for reconstructive, functional and prosthetic urology and
urogynecology, read by urologists, urogynecologists, fellows and residents.
The user authorized this on September 30, 2026. Codex mined 25 textbooks and
produced candidate findings. You decide what goes in, verify it, and write it.
The findings are leads, not sources.

Repository: `/Users/joyboy/Documents/WARWIKI/warwiki`.

## Your input

One batch file, `reports/textbook-mining/consolidation/batches/<batch>.json`:
`{"batch": ..., "pages": {"docs/...mdx": [finding, ...]}}`. Each finding has
`id`, `type` (new, more_detail, new_evidence, conflict, new_page,
figure_idea), `priority`, `target_section`, `warwiki_currently`, `addition`,
`numbers`, `evidence`, `book_refs` (as printed in the book), `locator`,
`also_in`, `may_be_outdated`, `book`, and `source_file` (the full chapter
findings file on the Desktop, which you may read for context).

## Read first

- `STYLE.md` sections 1-4 (voice, words, sentence structure, evidence wording).
  All new text must follow it.
- `reports/2026-09-20/content-preservation-policy.md`.
- The CLAUDE.md sections "Non-Negotiables", "Article Pattern" and "MDX
  gotchas" (repo root).

## Procedure, page by page

1. Read the whole target page, including tables and the reference list.
2. For every finding on that page, decide one verdict:
   - **adopt**: add it, possibly reworded.
   - **merge**: same point as another finding (on this page or already on the
     site); fold its locator or extra numbers into the adopted text or skip.
   - **reject**: already covered adequately, too weak or trivial to help a
     subspecialist, out of scope (stones, primary oncology, infertility),
     superseded by current guidance, or unverifiable in a way that matters.
   - **defer**: needs a decision you should not make (a dosing or safety
     conflict you cannot resolve from current guidelines, or a change that
     would remove or reverse a major section). State the exact question.
   Reject freely. Low-priority findings are mostly small author technique
   details: adopt one only when it adds operative, decision, anatomical or
   safety detail a subspecialist would use. Expect to reject a large share.
3. **Conflicts.** Check the current guideline or best evidence. WARWIKI's
   position normally stands. Where the book's position is older, do not add
   it as a current option; at most add it as clearly dated history if that
   teaches something. Where the book reveals a real nuance or a genuine
   error on the page, correct the page narrowly and cite the source.
4. **Verify every new citation** with
   `python3 scripts/audit/pubmed.py doi|pmid|search|cite ...` (run from the
   repo root). Cite the primary study, never the textbook, when one exists.
   Check that the paper actually supports the claim and the numbers (read the
   abstract the tool prints). The book's printed reference can be wrong;
   Codex paraphrased; figures from the book can be mis-transcribed. If you
   cannot find or confirm the paper, do not cite it; either drop the claim or
   reject the finding. Never invent a citation, DOI or PMID.
5. **Textbook teaching without a primary paper** (book_refs `none cited`):
   add it only for established operative technique or anatomy, worded as
   "has been described" or attributed to the chapter authors, and cite the
   textbook chapter in house format, for example:
   `Author AB, Author CD. Chapter title. In: Editor EF, ed. *Book Title.* Nth ed. Publisher; Year:pages.`
   Take authors, chapter title, editors, edition, publisher and year from the
   chapter findings file (`source_file`) header. If you cannot fill those
   fields reliably, do not cite the book; reject the finding instead. Keep
   these rare.
6. **Numbers.** Keep denominators, study type, population and follow-up next
   to each figure. Never merge figures from different studies. If the page
   already cites the same study with different numbers, reconcile against the
   abstract instead of adding a second figure.
7. **Write** in the page's existing structure. Add to the relevant section;
   add a new `##`/`###` section only when the material has no home. Do not
   rewrite, reorder or trim existing content except to fix a demonstrated
   error. Do not add review notices, "textbook says" asides or audit notes to
   the public page.
8. **Citations.** Default pattern: inline `<sup>[[N]](#refN)</sup>` and a
   reference line `<a id="refN"></a>N. ...` appended at the end of the
   References list, numbered contiguously after the current last reference.
   Reuse an existing reference number when the page already cites that paper.
   Gender-affirming surgery pages that use footnotes (`[^N]`) keep footnotes.
   Include the DOI link when available, in the page's existing format.
9. **MDX safety.** Escape `<` in prose as `&lt;` (for example `&lt;35 kg/m2`),
   `&` inside JSX attributes as `&amp;`, no `$$` LaTeX, valid JSX only, every
   `<sup>` closed with `</sup>`. A figure image is followed by a blank line
   before its caption.
10. **Never** create new pages, move files, edit sidebars or databases, or
    add schematics. `new_page` findings: record verdict `defer-new-page` with
    a one-line recommendation (worth a page / fold into an existing page,
    which one). `figure_idea` findings: reject (the user stopped new
    schematics); note if a real image or video would serve instead.
11. Do not touch `lastReviewed`, `reviewer`, `evidenceUpdated` or other
    review frontmatter.

## Limits

- Edit only the pages in your batch, plus a directly required link fix
  elsewhere. Do not run `git add`, `git commit`, `git push`, `npm run build`
  or `npm start`. The calling session validates and commits.
- You may run `npm run lint:citations` and `npm run lint:links`. Other agents
  are editing other pages at the same time, so only fix errors in your own
  pages.
- The Desktop mining folders are read-only for you.

## Output

Write the ledger `reports/textbook-mining/consolidation/verdicts/<batch>.md`:

```markdown
# <batch> verdicts

## docs/path/to/page.mdx
| Finding | Verdict | Note | Source added |
|---|---|---|---|
| TRUS08-047-003 | adopt | Added cuff-size caution to Sizing | PMID 12345678 |
| AMGUS-010-001 | merge | Same as TRUS08-047-003 | — |
| PIS-011-004 | reject | Two small reports, no added decision value | — |
```

Then a short `## Deferred questions` list and `## Not verifiable` list (claims
you dropped because the source could not be confirmed, with the finding id).

Return a short report: pages edited, counts by verdict, deferred questions,
lint results, and anything the calling session should check.
