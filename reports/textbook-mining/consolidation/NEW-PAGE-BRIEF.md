# New pages from the textbook mining: brief for page-building agents

The user approved these new pages on September 30, 2026 (decision recorded at
the end of `NEW-PAGES-REVIEW.md`). WARWIKI is a specialist reference for
reconstructive, functional and prosthetic urology and urogynecology, written
for urologists, urogynecologists, fellows and residents. **New pages are for
adult patients.** Where a topic is congenital, write it for the adolescent or
adult the reconstructive surgeon sees (prior repairs, late presentation,
sequelae, adult management); childhood operations appear only as background.

Repository: `/Users/joyboy/Documents/WARWIKI/warwiki`.

## Read first

- `CLAUDE.md` sections "Non-Negotiables", "Article Pattern", "Content
  Standards", "Atlas And Database Conventions", "Index And Landing Pages".
- `STYLE.md` sections 1-4. New text follows it.
- `reports/textbook-mining/consolidation/AGENT-BRIEF.md` rules 4-9 (citation
  verification, textbook citations via `BOOKS.md`, numbers, citation format,
  MDX safety).
- Two or three existing pages in the same folder, to match structure,
  frontmatter and depth.

## Input

Your group's pages and their seed findings are listed in your prompt. Seed
findings are in `batches/new-pages.json` (and `index.json` for
CWW13-124-001); each finding's `source_file` is the full chapter record.

## Building each page

1. **Check for overlap first** (`rg -il` over `docs/`). If an existing page or
   section already covers the topic, stop and report rather than duplicating.
2. **Research beyond the seed finding.** A page needs real substance: current
   guideline positions (AUA, SUFU, EAU, AUGS, ACOG, ICS, as relevant),
   landmark and recent series, technique, complications and outcomes with
   numbers. Find sources with `python3 scripts/audit/pubmed.py search ...`,
   read the abstracts, and cite only what you verified. Copy DOIs from the
   tool output only. Textbook chapters are cited only for established
   technique or anatomy with no primary paper, in `BOOKS.md` format, after
   reading the chapter.
3. **Structure:** frontmatter (`title`, `sidebar_position` fitting the folder),
   H1, an opening paragraph defining the subject with an early citation, then
   the clinical-article sections that apply (for a procedure: indications and
   selection, relevant anatomy, preoperative evaluation, technique,
   postoperative care, complications, outcomes; for a condition:
   epidemiology, pathophysiology, presentation, evaluation, classification,
   management, outcomes), `## See Also` cross-links, `## References`.
   Tables for comparisons. Length proportional to the evidence: a short
   reference page is fine when the literature is thin; say plainly where
   evidence is limited.
4. **Wire it in so it is reachable** (orphan lint must pass): add a row or
   link in the folder's database or hub (`index.mdx` or the section
   database), following the existing row-naming rules (bare procedure name,
   optional acronym), and add one or two inline cross-links from closely
   related pages. These are the only edits allowed on existing pages.
5. No schematics or figures. No review frontmatter (`lastReviewed`,
   `reviewer`). No patient-facing advice.

## Checks

Run `npm run lint:citations`, `npm run lint:links`, `npm run lint:orphans` and
`npm run lint:scope`; fix anything in your own pages. Other agents are editing
other pages at the same time. Do not run `npm run build`, git add, commit or
push. Do not start helper agents.

## Output

Append to `reports/textbook-mining/consolidation/verdicts/new-pages.md` (create
it if missing) a section per page: path, seed finding ids and whether each was
used, number of references, hub/database rows and cross-links added, and
anything left uncertain. Return a short report.
