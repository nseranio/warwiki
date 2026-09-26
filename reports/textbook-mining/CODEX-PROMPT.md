# Textbook mining prompt for Codex (reads WARWIKI directly, cannot edit it)

Codex reads the WARWIKI pages straight from the repo, so no corpus export is needed. The setup below makes the repo physically read-only for Codex: the Codex sandbox only allows writes inside the folder Codex is started from, so it is started from a separate folder on the Desktop.

## Setup (once)

```bash
mkdir -p ~/Desktop/WARWIKI-textbook-mining/books ~/Desktop/WARWIKI-textbook-mining/findings
```

Put each textbook PDF in `~/Desktop/WARWIKI-textbook-mining/books/`. Never put textbooks in the WARWIKI repo.

## Per book

1. Open Codex with `~/Desktop/WARWIKI-textbook-mining` as its project or workspace folder, not the WARWIKI repo. Keep the default permission mode (workspace write, labeled "Auto", "Agent" or "Default" depending on the version). Do **not** choose "Full access" or `--dangerously-bypass-approvals-and-sandbox`; that removes the protection. From a terminal, the equivalent is:

   ```bash
   cd ~/Desktop/WARWIKI-textbook-mining && codex --sandbox workspace-write
   ```

2. Paste everything below the line and fill in the bracketed fields.
3. Codex works through the book and writes one findings file per chapter. If it stops, say `continue`; it resumes from `progress.md`.
4. Tell Claude when a book is done. The findings are in `~/Desktop/WARWIKI-textbook-mining/findings/[abbrev]/`.

---

You are scouting an entire urology or urogynecology textbook for material that would improve WARWIKI, a specialist reference for reconstructive, functional and prosthetic urology and urogynecology, read by urologists, urogynecologists, fellows and residents. Your job is to find candidates. Another editor makes the final decision, verifies sources and writes the site text.

**Book:** [Book title], [edition], [year], [editors]. File: `books/[filename].pdf`. Abbreviation: [e.g. CWW13].

## Absolute limits

- **The WARWIKI repo at `/Users/joyboy/Documents/WARWIKI/warwiki` is read-only for this task.** Do not edit, move, delete, rename, format or commit anything in it, and do not run npm, git write commands or any script from it. Reading files and running `rg`, `grep`, `cat`, `sed -n` or `ls` there is fine.
- Write only inside the current folder (`~/Desktop/WARWIKI-textbook-mining`): the book text under `books/`, and your output under `findings/[abbrev]/`.
- Nothing you produce is a site edit. You are recommending; you are not deciding.

## Step 0: prepare the book

Convert the PDF once: `pdftotext -layout books/[filename].pdf books/[abbrev].txt`. Use the page breaks (form feeds) to track page numbers. If a page has no extractable text (a scanned image), note it as unreadable; do not guess its content.

## Step 1: triage

From the table of contents, write `findings/[abbrev]/00-triage.md`: a table of every chapter with number, title, page range, scope (`in`, `partial`, `out`), priority (`high`, `medium`, `low`) and the WARWIKI pages it most likely overlaps. Order in-scope, high-priority chapters first. Then create `findings/[abbrev]/progress.md` listing the queue with a checkbox per chapter.

## Step 2: for each chapter in the queue

1. **Check WARWIKI first.** Find the pages covering the chapter's topics under `docs/` in the repo (`rg -il "term" /Users/joyboy/Documents/WARWIKI/warwiki/docs`). Read the relevant sections and each page's `## References` list. Note the page URL: drop `docs/`, drop the leading number from the top-level folder (`04-surgical-techniques` becomes `surgical-techniques`), drop `.mdx`, and use the frontmatter `slug:` when one is set. Also record the repo file path.
2. **Read the chapter** and keep a finding only if it is one of these:
   - **new**: a topic, operative step, anatomical detail, device, classification, complication or decision point WARWIKI does not cover
   - **more_detail**: WARWIKI covers the topic, but the book adds numbers, thresholds, technique detail or management steps the page lacks
   - **new_evidence**: the book cites a study that supports, strengthens or qualifies something WARWIKI says, and that study is not in the page's references
   - **conflict**: the book says something different from WARWIKI
   - **new_page**: a topic substantial enough for its own page that no WARWIKI page covers
   - **figure_idea**: a schematic that would clarify anatomy, geometry or a sequence on a page without one (not a drawing of a radiograph, CT, MRI or ultrasound appearance)
3. Skip anything WARWIKI already states adequately. If unsure, include it with `coverage: unsure`.
4. Write `findings/[abbrev]/ch[NNN].md` in the format below, tick the chapter in `progress.md`, and move to the next chapter without waiting to be asked.

## Rules

1. **Use only the book** for new facts. No web search, memory or other books.
2. **Paraphrase.** The book is copyrighted. Quote at most 15 words, only when exact wording matters. Restate tables in your own structure. Do not copy the book text into findings beyond that.
3. **Never invent a citation.** List the studies the chapter cites for each finding, copied from its reference list as printed. Include a DOI only if printed. If none, write `none cited (textbook teaching)`.
4. **Keep numbers with context:** n, follow-up, study type, population. Do not merge figures from different studies.
5. **Flag dating:** `may_be_outdated: true` for guideline positions, FDA or device status, drug labeling and anything else likely to have changed since the edition.
6. **Label the evidence:** RCT, meta-analysis, guideline, retrospective series, technique report, or authors' experience.
7. **No repeats:** if a later chapter restates an earlier finding, add the locator to the earlier finding's file instead of creating a new one.

## Scope

In scope: urethral stricture and urethroplasty, grafts and flaps, ureteral and upper-tract reconstruction, bladder augmentation and catheterizable channels, urinary diversion (reconstructive and complication aspects), fistulas, incontinence surgery, AUS and slings, penile prosthesis, Peyronie's disease, priapism, genital and perineal reconstruction, gender-affirming surgery, hypospadias and adult congenital urology, prolapse and pelvic floor, neurogenic bladder, voiding dysfunction, urodynamics, pelvic pain, trauma, surgical anatomy, instruments, biomaterials, and perioperative care for these operations.

Out of scope: stone disease and stone endourology, primary urologic oncology (radical cystectomy, nephrectomy or prostatectomy as cancer operations), infertility unrelated to reconstruction, basic science without operative relevance, and patient-facing advice. Reconstructive consequences of cancer or stone treatment are in scope.

Highest value: operative steps and bailouts, dissection-relevant anatomy, decision thresholds, outcomes and complications with numbers, classification systems, device specifications and troubleshooting, experience-based pearls, and eponym history with original citations.

## Findings file format

```markdown
# Chapter [N]: [title]

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
  may_be_outdated: false
  priority: high           # high | medium | low
  proposed_title: ""       # new_page only
```

```markdown
## Skipped
One line per skipped topic: already on WARWIKI (name the page), out of scope, or too basic.
```

## Step 3: book summary

When every chapter is ticked, write `findings/[abbrev]/99-summary.md`: the top 25 findings; proposed new pages with the ids that would populate them; findings grouped by WARWIKI page, highest priority first; all conflicts and possibly outdated items; all book references cited in findings, deduplicated; and chapters with partial reads.
