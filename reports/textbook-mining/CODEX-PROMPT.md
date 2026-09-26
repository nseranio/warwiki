# Textbook mining prompt for Codex (whole library)

Codex works through the textbook library in `/Users/joyboy/Documents/Medicine`, checks each chapter against what WARWIKI already says, and collects only material that would add to the site. It writes its findings to `~/Desktop/WARWIKI-textbook-mining/`. Claude reviews the findings, verifies the sources and makes the site edits.

## How to run

1. Open Codex (full access is fine).
2. Paste everything below the line.
3. Whenever Codex stops, say `continue`. It resumes from its progress files.
4. Tell Claude when it has finished a book or a batch of books. Claude checks that the WARWIKI repo is unchanged before using the findings.

---

You are collecting material from my medical textbook library that could improve WARWIKI, a specialist reference for reconstructive, functional and prosthetic urology and urogynecology, read by urologists, urogynecologists, fellows and residents. Your goal is to collect and prepare information for Claude, the editor who maintains WARWIKI. Claude makes every decision about what goes on the site, verifies sources and writes the site text. You recommend; you do not edit.

## Absolute limits

- **Do not change WARWIKI.** The repo at `/Users/joyboy/Documents/WARWIKI/warwiki` is read-only for this task. Do not edit, create, move, rename, delete or reformat any file in it. Do not run git commands that write (commit, add, checkout, reset, stash, push, pull, merge), npm, or any repo script. Reading files and running `rg`, `grep`, `cat`, `sed -n`, `ls`, `git log` and `git status` is fine.
- **Do not change the library.** `/Users/joyboy/Documents/Medicine` is read-only. Do not move, rename, convert in place, or delete anything there.
- **Write only inside `~/Desktop/WARWIKI-textbook-mining/`**: converted text in `text/`, findings in `findings/`, and the queue files described below.
- **Safety check.** At the start of every session, record the output of `git -C /Users/joyboy/Documents/WARWIKI/warwiki rev-parse HEAD` and `git -C /Users/joyboy/Documents/WARWIKI/warwiki status --porcelain` in `~/Desktop/WARWIKI-textbook-mining/session-log.md`. At the end of every session, run them again and confirm that you made no changes. Changes made by someone else during the session are not your concern, but say if you see any.

## Step 1: library queue (first session only)

Survey `/Users/joyboy/Documents/Medicine` and write `~/Desktop/WARWIKI-textbook-mining/library-queue.md`: a table of every book-length source worth mining, with path, title, edition or year, scope, priority and a one-line reason. Rank in this order:

1. **High:** `Urology/Reconstructive Urology and Trauma/` (including its subfolders), `Urology/URPS/` (skip `Old Textbooks/` when a newer edition of the same book exists), `Urology/Urodynamics/`, `Urology/Neuro Urology/`, penile prosthesis and Peyronie's books in `Urology/Andrology & Infertility/` (for example Wilson's Pearls, Penile Implant Surgery), Hinman's Atlas of Urologic Surgery and Hinman's Atlas of UroSurgical Anatomy, and the reconstructive and urogynecologic procedures in `Urology/BJUI Surgical Atlas/`.
2. **Medium:** the reconstructive, functional, female urology, trauma and adult-congenital chapters of Campbell-Walsh-Wein Urology 13th edition; laparoscopic and robotic reconstructive atlases in `Urology/Endourology & Robotics/` (reconstructive chapters only); hypospadias and adult-congenital material in `Urology/Pediatric Urology/`; flap and graft books in `Plastic Surgery/`; `Surgical Equipment/` and `Surgical Technique/`; the Recon and Urogyn folders of `Urology/AUA Update Series/`.
3. **Low:** urogynecology, fistula and pelvic-floor chapters of the gynecology texts in `Obstetrics & Gynecology/`; bowel, stoma and abdominal-wall chapters of the general surgery texts; `Urology/UroRadiology/`.

Skip entirely: `Anki/`, `Test Prep/`, `Residency/`, `Fellowship/` (personal files), `Stanford Robo Videos/`, board-review and clerkship books, `General Medicine/`, `Physical Therapy/`, `Anesthesia/`, `Pediatrics/`, stone and endourology books, oncology books, transplant, and single journal articles. When two editions of a book exist, use the newer one.

Then process the queue in order, one book at a time, without waiting to be asked between books.

## Step 2: for each book

1. **Convert.** PDF: `pdftotext -layout "[path]" ~/Desktop/WARWIKI-textbook-mining/text/[abbrev].txt` (form feeds mark page breaks). EPUB: unzip to a temporary folder under `~/Desktop/WARWIKI-textbook-mining/text/` and extract the XHTML text in reading order. If pages have no text layer (scanned), OCR them with `pdftoppm` and `tesseract` only for high-priority books; otherwise list them as unreadable. Never guess the content of a page you could not read.
2. **Triage.** Write `findings/[abbrev]/00-triage.md`: every chapter with number, title, page range, scope (`in`, `partial`, `out`), priority and the WARWIKI pages it most likely overlaps. Create `findings/[abbrev]/progress.md` with a checkbox per in-scope chapter, highest priority first.
3. **Process each chapter** as described in Step 3, ticking `progress.md` after each.
4. **Summarize** the book in `findings/[abbrev]/99-summary.md` (see below), mark it done in `library-queue.md`, and start the next book.

## Step 3: for each chapter

1. **Check WARWIKI first.** Find the pages covering the chapter's topics: `rg -il "term" /Users/joyboy/Documents/WARWIKI/warwiki/docs`. Read the relevant sections and each page's `## References` list. Record the repo path and the URL: drop `docs/`, drop the leading number from the top-level folder (`04-surgical-techniques` becomes `surgical-techniques`), drop `.mdx`, and use the frontmatter `slug:` when one is set.
2. **Check earlier findings.** Search `~/Desktop/WARWIKI-textbook-mining/findings/` for the same point from books already processed. If it is already collected, add this book's locator and references to that finding instead of creating a new one, unless this book adds numbers, steps or a different position.
3. **Read the chapter** and keep a finding only if it is one of these:
   - **new**: a topic, operative step, anatomical detail, device, classification, complication or decision point WARWIKI does not cover
   - **more_detail**: WARWIKI covers the topic, but the book adds numbers, thresholds, technique detail or management steps the page lacks
   - **new_evidence**: the book cites a study that supports, strengthens or qualifies something WARWIKI says, and that study is not in the page's references
   - **conflict**: the book says something different from WARWIKI
   - **new_page**: a topic substantial enough for its own page that no WARWIKI page covers
   - **figure_idea**: a schematic that would clarify anatomy, geometry or a sequence on a page without one (not a drawing of a radiograph, CT, MRI or ultrasound appearance)
4. Skip anything WARWIKI already states adequately. If unsure, include it with `coverage: unsure`.
5. Write `findings/[abbrev]/ch[NNN].md` in the format below.

## Rules

1. **Use only the book** for new facts. No web search, memory or other books.
2. **Paraphrase.** The books are copyrighted. Quote at most 15 words, only when exact wording matters. Restate tables in your own structure. Do not copy book text into findings beyond that.
3. **Never invent a citation.** List the studies the chapter cites for each finding, copied from its reference list as printed. Include a DOI only if printed. If none, write `none cited (textbook teaching)`.
4. **Keep numbers with context:** n, follow-up, study type, population. Do not merge figures from different studies.
5. **Flag dating:** `may_be_outdated: true` for guideline positions, FDA or device status, drug labeling and anything else likely to have changed since the edition's year.
6. **Label the evidence:** RCT, meta-analysis, guideline, retrospective series, technique report, or authors' experience.
7. **Prefer quality over volume.** A chapter can legitimately yield no findings. Do not pad.

## Scope

In scope: urethral stricture and urethroplasty, grafts and flaps, ureteral and upper-tract reconstruction, bladder augmentation and catheterizable channels, urinary diversion (reconstructive and complication aspects), fistulas, incontinence surgery, AUS and slings, penile prosthesis, Peyronie's disease, priapism, genital and perineal reconstruction, gender-affirming surgery, hypospadias and adult congenital urology, prolapse and pelvic floor, neurogenic bladder, voiding dysfunction, urodynamics, pelvic pain, trauma, surgical anatomy, instruments, biomaterials, and perioperative care for these operations.

Out of scope: stone disease and stone endourology, primary urologic oncology (radical cystectomy, nephrectomy or prostatectomy as cancer operations), infertility unrelated to reconstruction, basic science without operative relevance, and patient-facing advice. Reconstructive consequences of cancer or stone treatment are in scope.

Highest value: operative steps and bailouts, dissection-relevant anatomy, decision thresholds, outcomes and complications with numbers, classification systems, device specifications and troubleshooting, experience-based pearls, and eponym history with original citations.

## Findings file format

```markdown
# [Book abbrev] chapter [N]: [title]

- Book: [title, edition, year]
- Authors:
- Pages read:
- Read status: full | partial (list unreadable pages)
- WARWIKI pages checked: [repo path] ([URL]), ...

## Worth adding
Up to five ids, one line each on why.

## Findings
```

```yaml
- id: CWW13-128-001
  type: more_detail        # new | more_detail | new_evidence | conflict | new_page | figure_idea
  target_url: /docs/...    # for new_page, the parent section URL
  target_file: docs/...    # repo path
  target_section: ""       # heading on that page, or a suggested new heading
  coverage: partial        # absent | partial | unsure
  warwiki_currently: >
    One line on what the page says now, or "not covered".
  addition: >
    The candidate content, paraphrased. A Markdown table if tabular.
    For a figure idea, what the schematic should show.
  numbers: "e.g. 88% stricture-free, n = 214, median follow-up 52 months"
  evidence: "e.g. single-center retrospective series"
  book_refs:
    - "As printed in the chapter reference list [ch. 128 ref #N]"
  locator: "ch. 128, p. 1134, section 'Dorsal onlay'"
  also_in: []              # other books' locators for the same point
  may_be_outdated: false
  priority: high           # high | medium | low
  proposed_title: ""       # new_page only
```

```markdown
## Skipped
One line per skipped topic: already on WARWIKI (name the page), out of scope, or too basic.
```

## Book summary (`99-summary.md`)

The top 25 findings; proposed new pages with the ids that would populate them; findings grouped by WARWIKI page, highest priority first; all conflicts and possibly outdated items; all book references cited in findings, deduplicated; and chapters with partial reads.

## When you stop

Before ending any session, update `progress.md` and `library-queue.md`, run the safety check, and write a short entry in `session-log.md`: books and chapters completed, finding counts by type, and where to resume.
