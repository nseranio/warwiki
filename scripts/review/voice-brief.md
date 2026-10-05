# Task: rewrite audit-voice sentences in WARWIKI house voice (propose; do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md in full first (sections 1, 2, 4 and 5 govern this task). Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

The site's audits left thousands of defensive, editor-facing sentences that argue with a claim instead of teaching the reader, for example: "Vaidyanathan's case supports proper positioning and secure anchoring; it does not establish a universal requirement for a smaller tube", "10–14 days is not a universal rule", "These should not be collapsed into 4/15 total leakage", "Evidence does not establish that every repair without a flap inevitably fails". Readers are reconstructive surgeons; they need what the evidence shows, its limits and the decision it informs.

INPUT is a JSON batch of sentences (or table rows) from one or more pages, each with its `page`, `line` and `text`. For each one:

1. Read the paragraph or table around it in the current page.
2. Rewrite it so it states the clinical point directly:
   - Say what the evidence shows and how strong it is, in STYLE.md section 4 wording ("retrospective series report", "has been described in N patients", "evidence is insufficient to determine whether", "is associated with", "guidelines recommend ... (strength)").
   - Replace rebuttals of an unstated claim ("does not establish a universal X", "should not be read as Y", "is not a universal rule") with the positive statement of practice or uncertainty ("Timing depends on drainage, healing and the operative protocol"; "Comparative data are lacking").
   - Keep the limitation: hedging and recommendation strength stay as strong or as weak as written (STYLE.md section 5, item 5). Never turn "evidence is insufficient" into a recommendation, or a limitation into a reassurance.
   - Keep every number, unit, denominator, trial name, citation marker (same claim) and link target. Do not add facts.
   - Delete the sentence only if it adds nothing beyond a limitation already stated in the same paragraph or table cell (set "delete": true and give the paragraph sentence that already carries the point). A sentence that carries a citation marker, a number or a safety point is never deleted; rewrite it.
   - Leave a sentence unchanged (no output line) if it is already a direct, useful statement (for example a contraindication or a guideline "does not recommend").
3. Tables: change only the cell text; keep the same cells, first-column label, numbers and markers.

OUTPUT: `OUTPUT_DIR/<slug>.jsonl`, one line per changed sentence: {"page": "<repo path>", "claim_id": "<id>", "category": "voice", "severity": "medium", "finding": "<what was wrong with the voice, a few words>", "evidence": "STYLE.md", "edit": {"old": "<exact substring of the current page: the sentence or row>", "new": "<rewrite, or empty string when delete is true>"}, "delete": false, "confidence": "high"}
Also write `OUTPUT_DIR/<slug>.status.jsonl` with one line per input item: {"claim_id": "...", "status": "voice-edited|unchanged|deleted"}.

MDX rules: `&lt;`/`&gt;` in prose and tables; keep `<sup>` markup intact; keep the page's citation style. When deleting, `old` must include the leading space so no double space remains. Keep each `old` under about 1,200 characters. Finish by printing counts.


## Revised rules after the pilot (these override the list above where they differ)

The pilot showed two failure modes: replacing one tic with another ("does not establish" → "remains undetermined") and broadening a precise, study-specific limit into a vague evidence-wide statement. Avoid both.

- **Leave unchanged** any sentence that states a precise limit of a named study or source in plain words ("Marucci did not test X"; "the series had no comparator"; "the trial did not assess Y"), and any sentence your rewrite would not make clearly shorter and more direct. Unchanged is the default; most sentences should stay.
- **Rewrite** these patterns, which address an editor rather than the reader:
  - "should not be read/presented/treated/collapsed/interpreted as …", "must not be read as …", "should not be counted …" → state what the number or finding is, directly ("4 of 15 had mild urge leakage managed medically; 1 needed conversion").
  - "is not a universal rule/threshold/requirement", "no universal …", "rather than a universal …" → state the variability and what it depends on ("Timing depends on drainage, healing and the operative protocol").
  - "X does not establish/prove/show that Y" when Y is an overclaim nobody on the page made → merge the limit into the factual sentence it qualifies, using the study design words ("A single case report describes …"; "In one retrospective series without a comparator, …") and drop the rebuttal clause; if the same paragraph already states the design limit, delete the rebuttal sentence (`delete: true`) unless it carries a number, citation marker or safety point.
- Keep the subject specific: name the study, series or guideline the limit belongs to. Never write "evidence remains undetermined" or "remains uncertain" as a stock replacement.
- The rewrite must be shorter than the original (or a deletion) and must keep every number, citation marker and link.
