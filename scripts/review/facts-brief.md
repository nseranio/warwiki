# Task: make WARWIKI pages read like an encyclopedia, facts only (propose; do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md section 12 first, especially "Facts only (October 21, 2026)", which governs this task, and section 5. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

The owner, a surgeon, wants the site to "read more like Wikipedia, just facts." Pages state a fact and then add commentary telling the reader what the fact does not mean, when it matters, or what it is not. He finds this reads like AI and does not trust the reader. He marked every sentence or clause below for deletion on one page; treat them as calibration (each is a cut):

- "These are model-based annual estimates, rather than counts of diagnoses in that year."
- "Men have a substantially higher age-adjusted incidence than women, although sex alone does not describe the stage or treatment needs of an individual patient." → keep "Men have a substantially higher age-adjusted incidence than women."
- "These population rates do not measure the risk faced by a symptomatic person."
- "The contrast supports an access contribution, although it does not assign every disparity to one mechanism."
- "Geography matters when exposure history suggests a regional cause."
- "A U.S. cohort … reported geographic variation, although a single occupational cohort cannot serve as a national incidence map." → keep up to "variation."
- "The table groups established or strongly supported exposures; it is a prompt for history taking, rather than a risk calculator." → keep up to "exposures."
- "A job title alone does not establish dose."
- "These common genotypes are not routine tests for a new bladder mass."
- "…80 (14%) carried a pathogenic or likely pathogenic germline variant; this is not a population-wide bladder-cancer prevalence." → keep up to "variant."
- "These are tendencies across tumors, not a required sequence for each patient; a high-grade lesion can arise through more than one molecular history." → keep "A high-grade lesion can arise through more than one molecular history."
- "A molecular report is most useful when it identifies a treatment-linked alteration in the setting where that test has clinical utility."
- "…is another target under investigation and in selected therapies, but assay definition, tumor context, and regimen determine actionability; histologic appearance alone is insufficient." → keep up to "therapies."
- "A negative visual examination does not explain a persistently positive high-grade cytology."
- "…post-resection or intravesical changes can complicate interpretation, and MRI does not replace histologic staging by resection." → keep up to "interpretation."
- A whole paragraph on staging-edition bookkeeping ("These changes matter when reading older series…", "The cited NCCN ST-1 page remains the local … source", "the available general update abstract does not establish…", "Comparisons on this page name the edition to avoid mixing systems").

INPUT is a JSON batch of candidate sentences (or table rows), each with `page`, `line`, `text` and `id`. Candidates were picked by a wide net (any "not", "matters", "rather than", "alone", "useful when", …), so most will be KEEP. For each one read the paragraph or table around it in the current page, then decide.

CUT (propose an edit) when the sentence or clause only comments on a fact instead of stating one:
1. tells the reader what a fact, test, study, table or classification does not mean, measure, establish, replace, describe or prove ("X alone does not …", "does not replace …", "is not a …", "rather than a …");
2. says why or when something "matters", is "useful", "important" or "central", or signposts ("Notably", "Importantly", "It is worth noting");
3. qualifies a fact already stated with a trailing ", although …", "; this is not …" or ", rather than …" hedge;
4. explains how to read a result whose population, design or setting is already stated (non-transfer warnings, restated design limits, "associations, not causation" when the sentence already says "associated", "belongs to a selected dataset", "pertains to that population");
5. describes the source, edition, page or site's own process ("model-based estimates", "the cited page remains the source", "this page names the edition", "in the inspected abstract");
6. states a truism a specialist reader already knows, framed as a limit ("histology alone is insufficient", "imaging does not replace pathology", "a negative examination does not exclude …") unless a cited guideline states it (then KEEP).

KEEP (no edit; status "style"):
- results, numbers, populations and design facts, including negative ones: "patients and physicians were not blinded", "rates did not differ", "was not associated with", "the trial did not assess sexual function", "superiority has not been shown", "no randomized comparison exists";
- guideline positions and their strength, including negative ones ("NICE advises against …", "AUA/SUO states urine markers do not replace cystoscopy", "not recommended");
- contraindications, label or regulatory limits, and specific safety rules that change an operative, prescribing or follow-up decision ("do not use in active infection", "not FDA-approved for penile use", "do not clamp the ureter with …");
- definitions, classifications, anatomy and mechanisms that use "not", "rather than" or "alone" as part of the fact ("pure small-cell carcinoma is classified as non-urothelial", "the graft is placed dorsally rather than ventrally", "nephrectomy alone cures …");
- a genuine conflict between sources, stated once; the only statement on the page of a study's funding or early stopping.

When unsure, ask: would an encyclopedia print this sentence, and would deleting it remove a result, a number, a guideline position or a decision-changing safety point? If no and no, cut.

How to cut:
- Delete the whole sentence (set "delete": true, `new` empty; `old` includes the leading space) when nothing in it is needed.
- Otherwise delete only the clause and keep the rest verbatim. The only rewording allowed is mechanical: end the kept part with a period, capitalize the new first word, and drop a now-dangling "but", "and" or "while".
- If a following sentence depends on the cut one ("This contrast …", "These changes …"), include it in the same cut only if it is itself commentary; never leave a dangling "This"/"These".
- Citation markers: if the cut text carries a `<sup>` marker that also supports remaining text, keep the marker by attaching it to the preceding remaining text. Never move a marker onto a claim it does not support. If the marker supported only the cut text, drop it.
- Table cells: shorten the cell; keep the same number of cells, the row label and every number. If a cell would be empty, write "—".
- Never add facts, numbers or new wording. Every number, unit, trial or author name and link that remains on the page stays as written.

OUTPUT:
- `OUTPUT_DIR/<slug>.jsonl`: one line per proposed edit: {"page": "<repo path>", "claim_id": "<id>", "category": "voice", "severity": "medium", "finding": "<pattern cut, a few words>", "evidence": "STYLE.md section 12 (facts only)", "edit": {"old": "<exact substring of the current page>", "new": "<replacement or empty>"}, "delete": true|false, "confidence": "high"|"medium"}
- `OUTPUT_DIR/<slug>.status.jsonl`: one line per input item: {"claim_id": "<id>", "status": "error" (edit proposed) | "style" (kept), "source_opened": "STYLE.md"}.

Rules: `old` must occur exactly once in the current page (add surrounding words if needed); keep `<sup>` markup intact; MDX escapes (`&lt;`, `&gt;`, `&amp;`) as on the page; no double spaces after a deletion. Two candidates in the same sentence: make one edit under the first id (status "error") and give the second id status "style". Every id with status "error" must have its own line in the findings file. Finish by printing counts.
