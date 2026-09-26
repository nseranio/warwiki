# Textbook mining prompt for ChatGPT (whole book, WARWIKI-aware)

ChatGPT collects candidate additions from a textbook, checking each one against what WARWIKI already says so it only brings back material that is new, more specific, better supported or in conflict. Claude makes the final call and writes the site content.

## One-time setup

1. Refresh the WARWIKI text export (from the repo root): `python3 scripts/export-corpus.py`. It writes 10 text files to `~/Desktop/WARWIKI-textbook-mining/corpus/`. Rerun it before starting a new book if the site has changed much.
2. In ChatGPT, create a Project named "WARWIKI textbook mining" and add the 10 corpus files as project files.

## Per book

1. Start a new chat inside that Project.
2. Attach the whole textbook (PDF or EPUB you have legitimate access to). If it is too large, split it into two to four PDFs by page range (Preview: File > Print > page range > Save as PDF); chapter boundaries do not matter.
3. Paste everything below the line and fill in the bracketed fields.
4. Type `continue` after each reply until ChatGPT says the book is finished.
5. Export or copy the replies and give them to Claude.

---

You are scouting an entire urology or urogynecology textbook for material that would improve WARWIKI (warwiki.org), a specialist reference for reconstructive, functional and prosthetic urology and urogynecology, read by urologists, urogynecologists, fellows and residents. Your job is to find candidates. Another editor makes the final decision, verifies sources and writes the site text, so favor accurate, traceable and specific findings over polished prose.

**Book:** [Book title], [edition], [year], [editors]. Abbreviation for ids: [e.g. CWW13].

## What WARWIKI already says

The project files named `01-...txt` to `10-...txt` are a text export of every WARWIKI page. Each page starts with `===== PAGE: [title]`, then `URL:`, then a `Cited:` line listing the first author and year of every study the page already cites, then the page text.

**Before extracting from any chapter, look up what WARWIKI already says about that chapter's topics.** Search the project files for the matching pages, read the relevant sections, and note their URLs. Only then read the chapter, and bring back a finding only if it is one of these:

- **new**: a topic, operative step, anatomical detail, device, classification, complication or decision point WARWIKI does not cover
- **more_detail**: WARWIKI covers the topic, but the book adds specific numbers, thresholds, technique detail or management steps the page lacks
- **new_evidence**: the book cites a study that supports, strengthens or qualifies something WARWIKI says, and that study is not in the page's `Cited:` line
- **conflict**: the book says something different from WARWIKI (a number, a recommendation, an attribution, a technique detail)
- **new_page**: a topic substantial enough for its own page that no WARWIKI page covers
- **figure_idea**: a schematic that would clarify anatomy, geometry or a sequence on a page that lacks one (not a drawing of a radiograph, CT, MRI or ultrasound appearance)

Skip anything WARWIKI already states adequately. If you are unsure whether WARWIKI covers something, include it with `coverage: unsure`; the editor will decide. Do not pad the output with material the site already has.

## Workflow

**Reply 1: triage.** From the table of contents, list every chapter in a Markdown table: number, title, page range, scope (`in`, `partial`, `out`), priority (`high`, `medium`, `low`), and the WARWIKI pages it most likely overlaps. Order in-scope, high-priority chapters first. Then begin the first chapter.

**Each later reply:** process the next chapter (two or three if short) in the output format below. End every reply with:

`PROGRESS: done [N] of [M] queued chapters. NEXT: Chapter [X], "[title]". Type continue.`

If a chapter will not fit, stop at a clean boundary, write `CONTINUED: Chapter [X], next id is ...`, and resume on `continue`.

**Final reply:** when the queue is empty, produce the book summary below.

**Read honestly.** State the page range you actually read for each chapter. If you can retrieve only fragments, mark `read_status: partial` and extract only from what you saw. Never infer content from a chapter title or from your general knowledge.

## Rules

1. **Use only the attached book** for new facts. Do not add facts from web search, memory or other books.
2. **Paraphrase.** The book is copyrighted. Restate facts in your own words; quote at most 15 words, and only when exact wording matters (a definition or classification criterion). Restate tables in your own structure.
3. **Never invent a citation.** List the studies the chapter cites for each finding, copied from the chapter's reference list as printed. Include a DOI only if the book prints one. If the chapter gives no citation, write `none cited (textbook teaching)`.
4. **Keep numbers with their context:** n, follow-up, study type and population when given. Do not merge figures from different studies.
5. **Flag dating.** Set `may_be_outdated: true` for guideline positions, FDA or device status, drug labeling and anything else likely to have changed since the edition's year.
6. **Label the evidence.** Say whether the book bases the point on an RCT, a meta-analysis, a guideline, a retrospective series, a technique report, or the authors' own experience.
7. **Do not repeat findings across chapters.** If a later chapter restates an earlier finding, note the extra locator in the book summary instead.

## Scope

In scope: urethral stricture and urethroplasty, grafts and flaps, ureteral and upper-tract reconstruction, bladder augmentation and catheterizable channels, urinary diversion (reconstructive and complication aspects), fistulas, incontinence surgery, AUS and slings, penile prosthesis, Peyronie's disease, priapism, genital and perineal reconstruction, gender-affirming surgery, hypospadias and adult congenital urology, prolapse and pelvic floor, neurogenic bladder, voiding dysfunction, urodynamics, pelvic pain, trauma, surgical anatomy, instruments, biomaterials, and perioperative care for these operations.

Out of scope: stone disease and stone endourology, primary urologic oncology (radical cystectomy, nephrectomy or prostatectomy as cancer operations), infertility unrelated to reconstruction, basic science without operative relevance, and patient-facing advice. Reconstructive consequences of cancer or stone treatment are in scope (radiation injury, post-prostatectomy incontinence, ureteral injury, diversion complications).

Highest value: operative steps and bailouts, dissection-relevant anatomy, decision thresholds, outcomes and complications with numbers, classification systems, device specifications and troubleshooting, experience-based pearls, and eponym history with original citations.

## Output format (per chapter)

### Chapter [N]: [title]

```yaml
chapter_authors: 
pages_read: "e.g. 1123-1161"
read_status: full   # full | partial
warwiki_pages_checked:
  - /docs/...
```

**Worth adding.** Up to five ids from this chapter, one line each on why.

```yaml
- id: CWW13-128-001
  type: more_detail        # new | more_detail | new_evidence | conflict | new_page | figure_idea
  target_url: /docs/...    # from the project files; for new_page, the parent section URL
  target_section: ""       # heading on that page, or a suggested new heading
  coverage: partial        # absent | partial | unsure (for conflict: what the page says)
  warwiki_currently: >
    One line on what the WARWIKI page says now, or "not covered".
  addition: >
    The candidate content, paraphrased. For a table, give a Markdown table.
    For a figure idea, describe what the schematic should show.
  numbers: "e.g. 88% stricture-free, n = 214, median follow-up 52 months"
  evidence: "e.g. single-center retrospective series"
  book_refs:
    - "As printed in the chapter reference list [ch. 128 ref #N]"
  locator: "ch. 128, p. 1134, section 'Dorsal onlay'"
  may_be_outdated: false
  priority: high           # high | medium | low
  proposed_title: ""       # new_page only
```

**Skipped.** One line per skipped topic: already on WARWIKI (name the page), out of scope, or too basic.

## Book summary (final reply)

1. **Top 25** findings across the book, one line each.
2. **Proposed new pages**, each with its parent section and the ids that would populate it.
3. **Findings by WARWIKI page**: each `target_url` with its ids, highest priority first.
4. **Conflicts and possibly outdated items**: id, what the book says, what WARWIKI says.
5. **Repeated findings**: earlier ids with the extra locators from later chapters.
6. **All book references cited in findings**, deduplicated, as printed, with chapter and reference number.
7. **Incomplete reads**: chapters with partial reads or unreadable pages, for a rerun.
