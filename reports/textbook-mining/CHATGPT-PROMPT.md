# Textbook mining prompt for ChatGPT

Use one chapter per conversation turn. Attach two files each time:

1. The textbook chapter (PDF or text you have legitimate access to).
2. `warwiki-page-inventory.csv` (this folder): every WARWIKI page as `url,title,repo_path`.

Paste everything below the line as the prompt. Fill in the bracketed fields.

---

You are extracting material from a urology or urogynecology textbook chapter to improve WARWIKI (warwiki.org), a specialist reference for reconstructive urology, functional urology, prosthetic urology and urogynecology. Readers are urologists, urogynecologists, fellows and residents. Your output will be handed to another editor who verifies every claim against primary literature before anything is published, so accuracy, traceability and specificity matter far more than volume or polish.

**Source for this run:** [Book title], [edition], [year], Chapter [N]: "[chapter title]" by [chapter authors].

## Hard rules

1. **Work only from the attached chapter.** Do not use web search, memory or other books to add facts. If the chapter does not state something, do not supply it. If a page or passage is unreadable, say so.
2. **Paraphrase; do not copy.** The book is copyrighted. Restate facts, numbers and steps in your own words. No passage longer than 15 words may be quoted, and quote only when exact wording matters (a definition or a classification criterion). Do not reproduce tables or figures; restate their content as a new table in your own structure, or describe the figure as a figure idea.
3. **Never invent a citation.** For each claim, list the primary references the chapter itself cites for it, copied from the chapter's reference list (authors, year, title, journal, volume and pages as printed). Include a DOI only if the chapter prints it. If the chapter states the claim without a citation, write `primary_refs: none cited (textbook teaching)`.
4. **Keep every number with its context.** Rates need a denominator or n, follow-up duration, study type and population when the chapter gives them. Do not round or merge figures from different studies.
5. **Flag dating.** Textbooks lag the literature. If a claim depends on a guideline, device, FDA status, drug label or trial, record the year the chapter attributes it to and set `may_be_outdated: true` when it is a guideline position, regulatory status, device availability, or anything likely to have changed since the edition's year.
6. **Report disagreement.** If the chapter contradicts itself, contradicts a named guideline it cites, or presents a view as contested, record both positions.

## Scope

In scope: urethral stricture and urethroplasty, grafts and flaps, ureteral and upper-tract reconstruction, bladder augmentation and catheterizable channels, urinary diversion (reconstructive and complication aspects), fistulas, female and male incontinence surgery, AUS and slings, penile prosthesis, Peyronie's disease, priapism, genital and perineal reconstruction, gender-affirming surgery, hypospadias and adult congenital urology, prolapse and pelvic floor disorders, neurogenic bladder, voiding dysfunction, urodynamics, pelvic pain, trauma, surgical anatomy, instruments, biomaterials, and perioperative care as it applies to these operations.

Out of scope as primary topics (skip and list in the "Skipped" section): stone disease and endourology for stones, primary urologic oncology (radical cystectomy, nephrectomy, prostatectomy as cancer operations), medical-student-level basics, and patient-facing advice. Reconstructive consequences of cancer treatment or stone surgery are in scope (radiation cystitis, post-prostatectomy incontinence, ureteral injury, diversion complications).

## What to extract (highest value first)

1. Operative technique: step sequences, exposure, landmarks, planes, instrument and suture choices, drain and catheter management, intraoperative decision points and bailouts.
2. Surgical anatomy that changes a dissection: vascular supply, nerve courses, fascial layers, danger zones, measurements.
3. Decision logic: indications, contraindications, selection criteria, thresholds, when to choose technique A over B.
4. Outcomes and complications with numbers: success definitions, rates, time to failure, risk factors, management of each complication.
5. Classification and grading systems, with criteria.
6. Devices, materials and instruments: specifications, sizing, mechanics, troubleshooting.
7. Pearls and pitfalls the authors present as experience-based teaching (label them as such).
8. Eponyms and history: who described what, when, with the original citation if the chapter gives it.
9. Figure ideas: a schematic that would clarify anatomy, geometry or a sequence. Describe what the figure should show. Do not describe radiographs, CT, MRI or ultrasound appearances as drawings.

Skip content that is general medicine, generic surgical training, or already standard at the resident level unless it is stated with specific numbers.

## Mapping to WARWIKI

Use `warwiki-page-inventory.csv` to assign each finding to the best existing page (`target_url`). If a finding belongs on more than one page, pick the page that should own it and list the others in `also_relevant`. If no page fits, set `target_url: NEW` and propose a title and the existing parent section (the URL prefix) it belongs under.

If you can open warwiki.org pages, check the target page and set `coverage` to `absent`, `partial` (the topic is there but this detail or number is missing) or `present` (skip findings that are fully present unless the chapter disagrees with the page, in which case use `type: conflict`). If you cannot open the page, set `coverage: not_checked`. Never guess coverage.

## Writing the `claim` field

Write in plain, impersonal clinical prose for specialists. One claim per finding; split compound claims. Use evidence wording that matches the source:

- "randomized trials showed" only for randomized evidence
- "is associated with" for observational findings
- "retrospective series report" for retrospective data
- "has been described" for technique reports and small series
- "guidelines recommend" only for an explicit guideline recommendation, with its strength label if the chapter gives one
- "the authors recommend" or "the authors' practice is" for expert opinion

Do not use: crucial, critical, key, essential, vital, robust, promising, excellent, gold standard (unless the chapter uses it; then attribute it), importantly, notably, "you" or "we". No em dashes as connectors. Do not turn association into causation or absence of evidence into evidence of no effect.

## Output format

Return one Markdown document with exactly these sections. Use the YAML block format exactly so it can be parsed.

### 1. Source

```yaml
book: 
edition: 
year: 
chapter: 
chapter_title: 
chapter_authors: 
pages_read: "e.g. 1123-1161"
unreadable_pages: []
```

### 2. Top 10

The ten findings (by id) that would most improve WARWIKI, one line each explaining why.

### 3. Findings

A single YAML list. Group findings by `target_url`. Number ids as `[book-abbrev]-[chapter]-[NNN]`, for example `CWW13-128-001`.

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
    - "Author AB, Author CD, et al. Title. Journal. Year;Vol(Issue):Pages. [chapter ref #N]"
  textbook_locator: "p. 1134, section 'Dorsal onlay'"
  may_be_outdated: false
  outdated_reason: ""
  notes: ""
```

For `type: table`, put the proposed table in `claim` as a Markdown table in your own structure, and list the source of every row in `primary_refs`.

For `type: figure_idea`, describe in `claim` what the schematic should show (views, labels, the one idea it teaches), and cite the chapter page that supports it.

For `type: NEW` page proposals, add `proposed_title` and `proposed_parent` fields, and list in `notes` the other findings (ids) that would populate it.

### 4. Conflicts and dating

List every finding with `type: conflict` or `may_be_outdated: true` in a short table: id, the claim, what it may conflict with or why it may be dated.

### 5. Primary reference list

Every reference you listed in `primary_refs`, deduplicated, exactly as printed in the chapter, with the chapter's reference number.

### 6. Skipped

One line per skipped topic with the reason (out of scope, too basic, unreadable).

## Length

Be exhaustive for in-scope material with numbers, steps or decision logic; be brief for everything else. If the output would exceed your limit, stop at a clean finding boundary, write `CONTINUED: next id is ...`, and I will ask you to continue. Do not summarize or drop findings to fit.
