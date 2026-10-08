# Task: cut "hand-holding" caveats from WARWIKI pages (propose; do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md sections 4, 5, 11 and 12 first; section 12 ("Trust the reader") governs this task. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

The owner (a reconstructive surgeon) finds that the site over-explains its evidence: after stating a result and its population it adds sentences telling the reader not to over-read it. In his words it "reads like AI and says the quiet part loud. Trust the reader." Examples he wants gone:

- "The cohort was predominantly lower-limb/vascular surgery, with diabetes in about 80%; this result is not a trial of closed incisions, graft bolsters, or Fournier reconstruction." → keep the first clause, cut everything after the semicolon.
- "Do not transfer its 87% versus 29% result to perineal ulcers or Fournier wounds." → delete.
- "Trauma studies do not establish faster closure or survival benefit after Fournier debridement" → delete (or leave the table cell with what the trauma evidence did show).
- "US humanitarian-device indication includes deep dermal/full-thickness burns involving at least 30% TBSA, not only burns exceeding 90%. This is a major-burn resource, not routine GU wound care" → "US humanitarian-device indication: deep dermal or full-thickness burns of at least 30% TBSA."
- "confidence interval not reported in inspected abstract", "the full notice text was not independently assessed", "Checked 2026-09-11" → delete (process notes about how the site checked a source).

INPUT is a JSON batch of candidate sentences (or table rows), each with `page`, `line`, `text` and `id`. For each one read the paragraph or table around it in the current page, then decide:

CUT (propose an edit) when the sentence or clause:
1. warns the reader not to transfer, extrapolate, generalize, combine or over-read a result whose population, design or setting is already stated on the page;
2. rebuts an overclaim nobody on the page made ("does not establish/prove that …", "is not a universal rule", "not every …", "not proof of …", "This is an X, not Y", ", not only …");
3. restates a design limit already visible ("retrospective", "single-center", "small", "case report", "no comparator") in more words, or explains that associations are not causal when the sentence already says "associated";
4. narrates the site's own checking process.

How to cut:
- Delete the whole sentence (set "delete": true, `new` empty; `old` includes the leading space) when nothing in it is needed.
- Otherwise delete only the clause (for example after a semicolon) and keep the rest verbatim.
- If the sentence carries a citation marker that also supports the preceding sentence or clause, keep the marker by attaching it to that preceding text in `new` (old = preceding sentence + this sentence; new = preceding sentence with the marker). Never drop a citation marker that is the only support for a claim that remains on the page, and never move a marker onto a claim it does not support.
- Table cells: shorten the cell text; keep the same number of cells, the row label and every number. A cell may become a short positive statement of what the evidence showed; it may not become empty unless the row already says the same thing elsewhere.

KEEP (no edit; status "style") when the sentence:
- is a safety point, contraindication, label or regulatory limit, or a warning that changes what a surgeon does ("NPWT is not a substitute for source control"; "not FDA-approved for penile use"; "do not use in active infection");
- reports a guideline position, including a negative one ("NICE advises against", "AUA does not recommend");
- states a genuine conflict between sources, or the only statement of a study's key limitation (for example the one place the page says a trial was industry-funded or stopped early);
- is a precise fact that happens to match the pattern ("the trial did not assess sexual function").

Never add facts, numbers or new caveats. Never rewrite a kept sentence into different words. Every number, unit, trial or author name and link that remains on the page must stay as written.

OUTPUT:
- `OUTPUT_DIR/<slug>.jsonl`: one line per proposed edit: {"page": "<repo path>", "claim_id": "<id>", "category": "voice", "severity": "medium", "finding": "<pattern cut, a few words>", "evidence": "STYLE.md section 12", "edit": {"old": "<exact substring of the current page>", "new": "<replacement or empty>"}, "delete": true|false, "confidence": "high"}
- `OUTPUT_DIR/<slug>.status.jsonl`: one line per input item: {"claim_id": "<id>", "status": "error" (edit proposed) | "style" (kept), "source_opened": "STYLE.md"}.

Rules: `old` must occur exactly once in the current page (add surrounding words if needed); keep `<sup>` markup intact; MDX escapes (`&lt;`, `&gt;`, `&amp;`) as on the page; no double spaces after a deletion. Two candidates in the same sentence: make one edit under the first id (status "error") and give the second id status "style" (its text is covered by the first edit). Every id with status "error" must have its own line in the findings file. Finish by printing counts.
