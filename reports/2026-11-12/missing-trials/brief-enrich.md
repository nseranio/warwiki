# Task: bring one WARWIKI trial file and page up to its newly available full text

WARWIKI (repo, read only: `/Users/joyboy/Documents/WARWIKI/warwiki`) is a reference for reconstructive and functional urology and urogynecology, written for surgeons. Its Clinical Evidence library has one structured trial file and one appraisal page per trial. This trial was written partly from PubMed abstracts. The owner has now supplied full texts (and, for some trials, a guideline) listed under NEW SOURCES. Your job is to make the trial file and page match those sources and to add the facts a surgeon needs that only the full text gives.

## Files

`OUT_DIR/<id>.json` and `OUT_DIR/<id>.mdx` are copies of the current trial file and page. Edit them in place. Do not create or edit any other file except `OUT_DIR/notes.md`.

## Read first

`src/data/clinical-evidence/SCHEMA.md`, `src/data/clinical-evidence/TEMPLATE.md`, `scripts/check-clinical-evidence.mjs`, and `STYLE.md` sections 4, 11, 12 and 14 (facts only; each paragraph opens with what its evidence shows; no relevance lists, scope lines, rebuttals of unstated claims or process notes).

## Sources

Use only the files listed under NEW SOURCES and the local files already named in each report's `source.file`. Read each new full text completely, including its tables. Do not go online. Never open auanet.org.

## What to do

1. **Check.** Every Result, Harm and delivery Fact bound to a report listed under NEW SOURCES, every page sentence citing that report, and the `takeaway`, `verdict` and `verdictNote`: compare with the full text. Correct numbers, denominators, populations, time points, analysis sets (ITT, per protocol, completers), endpoint roles and `met` to what the paper states. `role` follows the paper's own designation of primary and secondary endpoints; `met` follows its prespecified threshold (true, false or "not-tested"; never null for a full-text source).
2. **Complete.** Where the abstract-level version left something out that a reader needs and the full text states it, add it: arm values with denominators, the effect estimate with its confidence interval and P value, the main harms with denominators (Clavien-Dindo grades, reoperation, retention, infection, mesh exposure where reported), and delivery facts (dose, technique, operative time, adherence). Add at most five new items per report. Keep the page at most 900 body words.
3. **Locators.** Every Result, Harm and Fact you touch gets a full-text locator (`Full text, Table 2`; `Full text, Results, p 4`). Each report listed under NEW SOURCES gets `source.level: "full-text"`; `status.sourceRead` is "full-text" when the primary report is.
4. **Guideline (only when NEW SOURCES lists one).** Add to `## Guidelines and approvals` each statement of that guideline that cites or rests on this trial: body, year, the statement in brief, and its strength exactly as printed, inside `<Rec>(…)</Rec>`, with a reference line for the guideline (`<a id="refN"></a>N. Authors. *Title.* American Urological Association; 2025. Statement NN.`). Only statements you read in the local copy.
5. **Keep everything else unchanged**: wording, order and every claim not tied to the new sources. Numbers in prose equal the trial file. Every reference cited, every `<sup>` marker resolving, references numbered in first-citation order. `takeaway` at most 45 words; `verdictNote` under 20 words. Escape `<` and `>` in prose as `&lt;` `&gt;`.

## Check your work

Parse the JSON, recount every percentage against its numerator and denominator, run `diff` between your copies and the repo versions, and reread the page against the file.

## OUTPUT

- The edited `OUT_DIR/<id>.json` and `OUT_DIR/<id>.mdx`.
- `OUT_DIR/notes.md`: one line per change (corrected, added, removed), each with the full-text locator and a short quote you relied on; and a list of disagreements between the full text and other WARWIKI pages that cite this trial (`grep -rln "<acronym>" /Users/joyboy/Documents/WARWIKI/warwiki/docs`; page, sentence, what the source says).

Finish by printing the number of claims corrected, added and removed.
