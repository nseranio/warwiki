# Task: check every cited number on a WARWIKI page against its source (propose; do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md section 4 (evidence wording) and reports/2026-10-04/residual-error-sample.md ("What the errors are") first. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

INPUT is a JSON batch of claims from one page. Each claim is a sentence or table row (with its table header) that states a number and cites references; the cited reference-list lines are attached. The page has been reviewed twice, yet a random sample still found about 1.6 serious errors per page, almost all of one kind: **the right paper, but the number is attached to the wrong subgroup, endpoint, denominator, time point or operation.** Your job is to check each claim mechanically for exactly that.

For EVERY claim:
1. Open the cited source (PubMed abstract via https://pubmed.ncbi.nlm.nih.gov/?term=..., PMC or open full text when the number is not in the abstract, the guideline chapter, or the label). Find the number.
2. Check, one by one:
   - **Value:** does the source report this number (allow rounding)? Is any n/N arithmetically consistent with the percentage?
   - **Population/subgroup:** is the number for the population the sentence names (whole cohort vs subgroup; men vs women; primary vs salvage; this operation vs a mixed or pooled cohort of several operations)?
   - **Endpoint:** is it the endpoint the sentence names (composite vs specific; "cured" vs "cured or improved"; patency vs success; stretched vs flaccid; objective vs subjective; any complication vs a specific complication; primary vs secondary endpoint)?
   - **Time point/follow-up:** does it match (three-month result called long-term; median vs mean; follow-up of responders only)?
   - **Denominator:** is a selected or partial denominator hidden (survey responders, those reaching stage 2, completers)?
   - **Attribution:** is the number from the cited reference (not another paper), and do two numbers merged into one range come from comparable endpoints?
   - **Study design wording:** is an association stated as causation, a single study as consensus, or zero events as "no risk"?
   - If the page links (in this sentence) to another WARWIKI page stating the same number, note a contradiction only if you checked it.
3. Classify: `ok`, `error` (any check fails in a way that could mislead a reader), or `unverifiable` (the number is not in any text you could open; say what you opened).

Severity for errors: **high** if a reader would take away a wrong number, wrong population, wrong endpoint or wrong safety point; **medium** if a needed qualifier (denominator, time point, design) is missing but the number itself is right.

For each error give a minimal exact edit: `old` must be an exact substring of the current page file (one sentence or table row; read the page to confirm), and `new` corrects only the error, keeps every citation marker, and keeps useful content. Prefer stating the correct population, endpoint, denominator and time point over deleting the number. Never invent a number; use the source's own.

OUTPUT (write both even if every claim is ok):
- `OUTPUT_DIR/<slug>.jsonl`: one line per ERROR only: {"page": "<repo path>", "claim_id": "...", "category": "accuracy", "severity": "high|medium", "finding": "<what is wrong, one or two sentences>", "evidence": "<PMID/DOI/URL and the source's exact number, population, endpoint and time point>", "edit": {"old": "...", "new": "..."} or null, "confidence": "high|medium"}
- `OUTPUT_DIR/<slug>.status.jsonl`: one line per claim: {"claim_id": "...", "status": "ok|error|unverifiable", "source_opened": "<PMID/DOI/URL or 'none'>"}

Rules: never invent a reference; every PMID/DOI you cite must be one you opened. Do not propose currency, completeness or voice changes; this task is numbers only. MDX: write `&lt;`/`&gt;` for less-than/greater-than in prose and tables; keep the page's citation style (`<sup>[[N]](#refN)</sup>`, footnotes `[^N]` on gender-affirming pages). If a correct number needs a source not on the page, cite it as `<sup>[[R1]](#refR1)</sup>` and add "new_refs": [{"key": "R1", "line": "Last FM, et al. \"Title.\" *Journal.* Year;Vol(Issue):Pages. doi:[10.x/y](https://doi.org/10.x/y)"}]; never edit the reference list. Keep each `old` under about 1,200 characters. Finish by printing counts of ok, error and unverifiable.
