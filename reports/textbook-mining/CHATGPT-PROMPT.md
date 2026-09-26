# Textbook mining prompt for ChatGPT (whole book)

Use one conversation per book. Attach two files at the start:

1. The whole textbook (PDF or EPUB you have legitimate access to). If ChatGPT rejects the file as too large, split it into two to four PDFs by page range (Preview: File > Print > page range > Save as PDF) and attach them all; there is no need to find chapter boundaries.
2. `warwiki-page-inventory.csv` (this folder): every WARWIKI page as `url,title,repo_path`.

Paste everything below the line as the first message and fill in the bracketed fields. After the first reply, type `continue` each time. ChatGPT works through the book on its own and tells you when it is finished. Paste each reply (or the whole conversation export) back to Claude.

---

You are extracting material from an entire urology or urogynecology textbook to improve WARWIKI (warwiki.org), a specialist reference for reconstructive urology, functional urology, prosthetic urology and urogynecology. Readers are urologists, urogynecologists, fellows and residents. Your output will be handed to another editor who verifies every claim against primary literature before anything is published, so accuracy, traceability and specificity matter far more than volume or polish.

**Book:** [Book title], [edition], [year], [editors]. Abbreviation for ids: [e.g. CWW13].

## Workflow

You will work through the whole book across many replies. I will only type `continue`.

**Reply 1: triage.** Read the table of contents and produce a chapter queue as a Markdown table: chapter number, title, page range, scope (`in`, `partial`, `out`), priority (`high`, `medium`, `low`), and one line on what WARWIKI-relevant material it likely holds. Order the queue with in-scope high-priority chapters first, then medium, then low. List `out` chapters at the bottom; they will be skipped. Then start on the first chapter in the queue.

**Every reply after that:** process the next chapter in the queue (two or three if they are short), using the per-chapter output format below. End every reply with this line:

`PROGRESS: done [N] of [M] queued chapters. NEXT: Chapter [X], "[title]". Type continue.`

If a chapter is too long for one reply, stop at a clean finding boundary, write `CONTINUED: Chapter [X], next id is ...`, and resume there on `continue`. Do not summarize or drop findings to fit.

**Final reply:** when the queue is empty, produce the book summary described at the end of this prompt.

**Reading honestly.** Before extracting a chapter, confirm that you can read its full text and state the page range you actually read. If you can only retrieve fragments, say `partial read`, list the pages you saw, and extract only from those. Never infer content from a chapter title, the table of contents, or your general knowledge.

## Hard rules

1. **Work only from the attached book.** Do not use web search, memory or other books to add facts. If the book does not state something, do not supply it. If a page or passage is unreadable, say so.
2. **Paraphrase; do not copy.** The book is copyrighted. Restate facts, numbers and steps in your own words. No passage longer than 15 words may be quoted, and quote only when exact wording matters (a definition or a classification criterion). Do not reproduce tables or figures; restate their content as a new table in your own structure, or describe the figure as a figure idea.
3. **Never invent a citation.** For each claim, list the primary references the chapter itself cites for it, copied from that chapter's reference list (authors, year, title, journal, volume and pages as printed). Include a DOI only if the book prints it. If the chapter states the claim without a citation, write `primary_refs: none cited (textbook teaching)`.
4. **Keep every number with its context.** Rates need a denominator or n, follow-up duration, study type and population when the book gives them. Do not round or merge figures from different studies.
5. **Flag dating.** Textbooks lag the literature. If a claim depends on a guideline, device, FDA status, drug label or trial, record the year the book attributes it to and set `may_be_outdated: true` when it is a guideline position, regulatory status, device availability, or anything likely to have changed since the edition's year.
6. **Report disagreement.** If a chapter contradicts itself, contradicts another chapter of the book, contradicts a named guideline it cites, or presents a view as contested, record both positions.
7. **Do not repeat yourself across chapters.** If a later chapter restates a finding you already recorded, add its locator to the earlier id in the book summary instead of creating a duplicate. Record it as new only if it adds numbers, steps or a different position.

## Scope

In scope: urethral stricture and urethroplasty, grafts and flaps, ureteral and upper-tract reconstruction, bladder augmentation and catheterizable channels, urinary diversion (reconstructive and complication aspects), fistulas, female and male incontinence surgery, AUS and slings, penile prosthesis, Peyronie's disease, priapism, genital and perineal reconstruction, gender-affirming surgery, hypospadias and adult congenital urology, prolapse and pelvic floor disorders, neurogenic bladder, voiding dysfunction, urodynamics, pelvic pain, trauma, surgical anatomy, instruments, biomaterials, and perioperative care as it applies to these operations.

Out of scope as primary topics (mark `out` in triage): stone disease and endourology for stones, primary urologic oncology (radical cystectomy, nephrectomy, prostatectomy as cancer operations), infertility and andrology unrelated to reconstruction, medical-student-level basics, and patient-facing advice. Reconstructive consequences of cancer treatment or stone surgery are in scope (radiation cystitis, post-prostatectomy incontinence, ureteral injury, diversion complications), so an oncology chapter may be `partial`.

## What to extract (highest value first)

1. Operative technique: step sequences, exposure, landmarks, planes, instrument and suture choices, drain and catheter management, intraoperative decision points and bailouts.
2. Surgical anatomy that changes a dissection: vascular supply, nerve courses, fascial layers, danger zones, measurements.
3. Decision logic: indications, contraindications, selection criteria, thresholds, when to choose technique A over B.
4. Outcomes and complications with numbers: success definitions, rates, time to failure, risk factors, management of each complication.
5. Classification and grading systems, with criteria.
6. Devices, materials and instruments: specifications, sizing, mechanics, troubleshooting.
7. Pearls and pitfalls the authors present as experience-based teaching (label them as such).
8. Eponyms and history: who described what, when, with the original citation if the book gives it.
9. Figure ideas: a schematic that would clarify anatomy, geometry or a sequence. Describe what the figure should show. Do not describe radiographs, CT, MRI or ultrasound appearances as drawings.

Skip content that is general medicine, generic surgical training, or resident-level standard knowledge unless it is stated with specific numbers.

## Mapping to WARWIKI

Use `warwiki-page-inventory.csv` to assign each finding to the best existing page (`target_url`). If a finding belongs on more than one page, pick the page that should own it and list the others in `also_relevant`. If no page fits, set `target_url: NEW` and propose a title and the existing parent section (the URL prefix) it belongs under.

If you can open warwiki.org pages, check the target page and set `coverage` to `absent`, `partial` (the topic is there but this detail or number is missing) or `present` (skip findings that are fully present unless the book disagrees with the page, in which case use `type: conflict`). If you cannot open the page, set `coverage: not_checked`. Never guess coverage.

## Writing the `claim` field

Write in plain, impersonal clinical prose for specialists. One claim per finding; split compound claims. Use evidence wording that matches the source:

- "randomized trials showed" only for randomized evidence
- "is associated with" for observational findings
- "retrospective series report" for retrospective data
- "has been described" for technique reports and small series
- "guidelines recommend" only for an explicit guideline recommendation, with its strength label if the book gives one
- "the authors recommend" or "the authors' practice is" for expert opinion

Do not use: crucial, critical, key, essential, vital, robust, promising, excellent, gold standard (unless the book uses it; then attribute it), importantly, notably, "you" or "we". No em dashes as connectors. Do not turn association into causation or absence of evidence into evidence of no effect.

## Per-chapter output format

Use exactly these sections for each chapter. Keep the YAML format exact so it can be parsed.

### Chapter [N]: [title]

```yaml
chapter: 
chapter_title: 
chapter_authors: 
pages_read: "e.g. 1123-1161"
read_status: full   # full | partial
unreadable_pages: []
```

**Top findings.** Up to five ids from this chapter that would most improve WARWIKI, one line each on why.

**Findings.** A single YAML list, grouped by `target_url`. Number ids as `[abbrev]-[chapter]-[NNN]`, for example `CWW13-128-001`.

```yaml
- id: CWW13-128-001
  target_url: /docs/surgical-techniques/04a-urethral-reconstruction/...
  target_section: "Operative Technique"          # heading on the page where it fits, or suggested new heading
  also_relevant: []
  type: operative_step   # addition | correction | conflict | operative_step | anatomy | decision_logic | outcome | complication | classification | device | pearl | eponym_history | table | figure_idea
  coverage: not_checked  # absent | partial | present | not_checked
  priority: high         # high | medium | low
  claim: >
    One or two sentences, paraphrased, in WARWIKI evidence wording.
  specifics:
    numbers: "e.g. 88% stricture-free (n = 214, median follow-up 52 months)"
    study_type: "e.g. single-center retrospective series"
    population: ""
    conditions_or_caveats: ""
  evidence_basis: cited_primary   # cited_primary | guideline | textbook_teaching | authors_experience
  primary_refs:
    - "Author AB, Author CD, et al. Title. Journal. Year;Vol(Issue):Pages. [ch. 128 ref #N]"
  textbook_locator: "ch. 128, p. 1134, section 'Dorsal onlay'"
  may_be_outdated: false
  outdated_reason: ""
  notes: ""
```

For `type: table`, put the proposed table in `claim` as a Markdown table in your own structure, and list the source of every row in `primary_refs`.

For `type: figure_idea`, describe in `claim` what the schematic should show (views, labels, the one idea it teaches), and cite the page that supports it.

For `target_url: NEW`, add `proposed_title` and `proposed_parent` fields.

**Skipped in this chapter.** One line per skipped topic with the reason.

## Book summary (final reply)

1. **Top 25.** The 25 findings across the book that would most improve WARWIKI, one line each.
2. **Proposed new pages.** Each `NEW` proposal, with its title, parent section and the ids that would populate it.
3. **Findings by WARWIKI page.** For each `target_url`, the list of ids, highest priority first.
4. **Conflicts and dating.** Every finding with `type: conflict` or `may_be_outdated: true`: id, claim, and what it may conflict with or why it may be dated.
5. **Duplicates merged.** Earlier ids that later chapters restated, with the added locators.
6. **Primary reference list.** Every reference cited in `primary_refs`, deduplicated, exactly as printed, with chapter and reference number.
7. **Coverage gaps in the read.** Chapters with `partial` reads or unreadable pages, so they can be rerun.
