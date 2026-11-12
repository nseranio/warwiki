# Task: make WARWIKI sections read as one coherent account, point first (propose; do not edit the site)

Repo (read only): the repository named in INPUT's page paths, under /Users/joyboy/Documents/WARWIKI/warwiki (or /Users/joyboy/Documents/WHITWIKI/whitwiki when the batch says so). Read STYLE.md sections 3, 4, 5, 12 and 14 first; section 14 ("Point first") governs this task. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

The owner, a surgeon, says the pages have the right facts but read as back-to-back results: "We have all the right information, we just want it to all mesh in a cohesive and coherent way that makes it more enjoyable and easier to read and understand, like you would a Wikipedia article." Readers are reconstructive urologists, urogynecologists and urologic oncologists.

INPUT is a JSON batch: one page, and one item per candidate section (heading, line range, and why the detector flagged it). Read the whole page, then each flagged section.

## Decide

KEEP (status "style", no edit) when the section already reads well: a clear opening, each study once, paragraphs grouped by question. Many flagged sections are fine; a list of parallel trials in a table or a legitimately dense results paragraph on a trial page can stay.

REWRITE (one edit per section) when results are stacked, a study or number is stated twice, the point is buried or absent, or a list item carries a paragraph of evidence.

## What a good point sentence is (pilot lessons)

- A point sentence says, in plain words, what the paragraph's evidence adds up to, the way a textbook author would ("Bladder diverticula are associated with bladder cancer", "Tumors can arise within the diverticulum itself", "Closure shortened recovery in two cohorts"). It is a synthesis, not one study's result moved to the front.
- Never invert a study sentence into result-first passive form. Bad: "Primary closure followed a median of 2.5 debridements and 6.5 days in a series cited by Kopechek's review"; "A posterior fasciocutaneous scrotal flap was used in Champaneria's 2013 single case"; "Upper tracts improved or remained stable in the earlier 2000 report: among 149 operations …". When a paragraph rests on one study, keep the natural order ("In Champaneria's 2013 single case, …") and do not add a point sentence.
- Use a colon to join a point to its first study at most once per paragraph. Most study sentences stay ordinary sentences.
- A list item never ends up as a bare bold label. If its evidence moves below the list, the item keeps a plain description of the option (for example, "**Inguinal triple neurectomy** (ilioinguinal, iliohypogastric and genital branch) for refractory post-herniorrhaphy pain").
- Do not split a short paragraph just to isolate one study, and do not delete bold run-in labels ("**Men with CP/CPPS.**") that organize a section.
- Remove words that only pointed back to text you moved ("a separate meta-analysis" when the first one is no longer adjacent becomes "a meta-analysis").
- The bar for rewriting is a clear gain for the reader: repeated studies or numbers, a buried or missing point across three or more results, or evidence crammed into list items. A paragraph of two or three well-ordered results is KEEP.

## How to rewrite

1. Work out what the section's evidence says, question by question (how common / how large; why; what it changes; how well it works; harms).
2. Open each paragraph with its point, stated as a fact no broader than the evidence, and carrying the citations that support it. Prefer a colon joining the point to its first study ("X is associated with Y: in a [population] cohort of …"). If one study supports the point, scope it to that study ("in one series"); if a sentence would need citations that do not exist, do not write it.
3. State each study once: design, population, size, headline result, then only the secondary numbers that add something. Merge duplicates into the single fullest version (keep every distinct number from both copies).
4. Split paragraphs where the question changes; most paragraphs run two to five sentences. Move evidence out of list items into a paragraph after the list; the item keeps the option and its plain description.
5. Keep the page's terms and the owner's voice rules (sections 11 and 12): no signposting ("Notably", "Importantly"), no "matters", no commentary on what results do not mean, no closing summary sentence.

## Hard rules (the pilot's mistakes; the verifier rejects these)

- Lose nothing: every number, unit, n/N, CI, p value, odds or hazard ratio, follow-up, population, design word, qualifier, condition, exception, author or trial name, link and citation marker in the old text appears in the new text, unless it was an exact duplicate.
- Add nothing: no new fact, number, mechanism, recommendation or causal connective ("because", "so", "therefore", "which raises", "leading to") that the old text does not state.
- Keep hedges and modality exactly: "has been proposed as a mechanism" never becomes "is the mechanism"; "appears to be driving" never becomes "is driving"; "may", "can", "is considered" stay.
- Keep conditions on rules: "when X and no complication requires earlier intervention, do Y" must keep its exception attached to the rule.
- Keep subgroups exact: if 79 patients are a defined subgroup (for example, operated without suspicion of cancer), never describe them as a share of a different group (for example, "of those 104").
- Do not generalize: a single series' proportion is not a general rate; a hospitalized or selected cohort keeps its population.
- Citations travel with their claims. A marker may move only with the clause it supports. A new point sentence may carry only markers whose sources support it as worded. Never add a marker to a sentence the source does not support; never drop a marker while its claim stays.
- Leave tables, figures, captions, headings, JSX components, `<Rec>` badges, quotes and the References section untouched. Keep MDX escapes (`&lt;`, `&gt;`, `&amp;`) and `<sup>` markup exactly as on the page.
- Do not rewrite text outside the flagged section. If the opening of the page is flagged, follow section 11 (definition plus key facts).

Calibration (the owner approved this rewrite):

Before: "In a cohort of 2,134 hospitalized urology patients with a documented bladder diverticulum and 8,528 without one, the adjusted hazard ratio for subsequent bladder cancer was 2.63 (95% CI 1.74–3.97); an institutional series found cancer in 102/764 patients with diverticula, including 36 with a tumor inside a diverticulum.[5][6] Urinary stasis has been proposed as a mechanism of tumor development, and a 14-case series proposed that the thin or absent muscular wall may permit early peridiverticular invasion.[11][13] In a Taiwanese population-based cohort of 2,134 hospitalized urology patients … (hazard ratio 2.63, 95% CI 1.74-3.97); the effect was greater in men and in patients without comorbidities.[5] A single-institution review of 764 patients with bladder diverticula found bladder cancer in 13.3% overall, with cancer actually arising within the diverticulum in 35.3% of that subgroup; male sex (odds ratio 2.6) and increasing age (odds ratio 1.02 per year) independently predicted a cancer diagnosis, while an indwelling catheter, recurrent UTI, and stones did not.[6] Most diverticula in that cohort were managed without surgery, and most surgical candidates had been presumed benign preoperatively; 5 of 79 patients who underwent diverticulectomy without preoperative suspicion for cancer had an incidental malignancy on final pathology.[6] These observational cohorts support a low threshold for imaging and cystoscopic inspection, with biopsy of suspicious areas; no surveillance protocol was established."

After: "Bladder diverticula are associated with bladder cancer: in a Taiwanese population-based cohort, 2,134 hospitalized urology patients with a documented diverticulum had an adjusted hazard ratio of 2.63 (95% CI 1.74–3.97) for subsequent bladder cancer compared with 8,528 matched controls; the association was stronger in men and in patients without comorbidities.[5] Tumors can arise within the diverticulum itself: in a single-institution review of 764 patients with diverticula, 102 (13.3%) had bladder cancer and 36 of those (35.3%) arose within the diverticulum; male sex (odds ratio 2.6) and increasing age (odds ratio 1.02 per year) independently predicted a cancer diagnosis, while an indwelling catheter, recurrent UTI and stones did not.[6]

Urinary stasis has been proposed as a mechanism of tumor development, and a 14-case series proposed that the thin or absent muscular wall may permit early peridiverticular invasion.[11][13]

Surgery can reveal unsuspected cancer: most diverticula in the 764-patient review were managed without surgery, and of the 104 patients who underwent diverticulectomy or partial cystectomy, 76% were presumed to have benign disease preoperatively; among 79 patients who underwent diverticulectomy without preoperative suspicion for cancer, 5 had an incidental malignancy on final pathology.[6] These observational cohorts did not establish a surveillance protocol; they support a low threshold for imaging and cystoscopic inspection, with biopsy of suspicious areas."

## OUTPUT

- `OUTPUT_DIR/<slug>.jsonl`: one line per rewritten section: {"page": "<repo path>", "claim_id": "<id>", "category": "voice", "severity": "medium", "finding": "coherence: <a few words on what was restructured>", "evidence": "STYLE.md section 14 (point first)", "edit": {"old": "<exact contiguous substring of the current page covering the text you rewrite>", "new": "<rewritten text>"}, "confidence": "high"|"medium", "sources_opened": ["<DOI or PMID you checked for a new point sentence or moved marker>", ...]}
- `OUTPUT_DIR/<slug>.status.jsonl`: one line per input item: {"claim_id": "<id>", "status": "error" (rewritten) | "style" (kept), "source_opened": "STYLE.md"}.

Rules: `old` must occur exactly once in the current page and must start and end on whole sentences or whole lines (include list items and blank lines between paragraphs as they appear). `new` uses blank lines between paragraphs. When a new point sentence carries markers, open the cited sources (PubMed abstract or open full text via the DOI on the page) to confirm they support it as worded, and list them in `sources_opened`. Every id with status "error" must have its line in the findings file. Finish by printing counts.
