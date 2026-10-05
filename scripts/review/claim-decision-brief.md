# Task: settle disputed WARWIKI claims (propose; do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md sections 4 and 5 and reports/2026-09-20/content-preservation-policy.md first. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

INPUT is a JSON batch of claims (numbers or absolute statements) that an earlier checker flagged but that were left unchanged: the adversarial verifier would not accept the proposed fix (`prior.verdict` is no_edit or reject, or there was no usable edit). Each claim carries `prior.finding` (the checker's concern), `prior.edit` (its proposed edit, if any) and `prior.reason` (why the verifier did not accept it). You are the final editor. For each claim, decide what the page should say, to the best available evidence:

1. Read the current page around the claim (the text may have changed since the batch was made; work from the current file).
2. Open the cited source(s) and, if needed, the best primary source (PubMed, PMC/open full text, guideline chapter, label). Decide which of the earlier positions is right.
3. Choose one outcome:
   - `keep`: the claim is correct and adequately qualified as written. Give the supporting quote.
   - `edit`: the claim needs a correction or qualifier. Give the smallest exact edit that states what the source supports (population, endpoint, denominator, time point, strength). Keep every useful fact and citation marker; add a verified citation where a number lacks one (existing reference number, or `new_refs`).
   - `remove`: no source you can open supports the number or absolute, and it adds nothing reliable. Give an edit that removes or replaces only that part. Never remove operative teaching, warnings or useful content beyond the unsupported fragment.
   - `source-needed`: the deciding source is paywalled and the claim is plausible; give the DOI or URL needed.
   If the earlier fix was rejected because it was wrong or too broad, do not repeat it; write a better one or keep the claim.

OUTPUT (write both):
- `OUTPUT_DIR/<slug>.jsonl`: one line per `edit` or `remove` decision: {"page": "<repo path>", "claim_id": "...", "category": "accuracy", "severity": "high|medium", "finding": "<decision and why, one or two sentences>", "evidence": "<source opened and its exact supporting text>", "edit": {"old": "<exact substring of the current page>", "new": "..."}, "confidence": "high|medium"}
- `OUTPUT_DIR/<slug>.status.jsonl`: one line per claim: {"claim_id": "...", "status": "ok|error|unverifiable|style", "decision": "keep|edit|remove|source-needed|style", "source_opened": "...", "quote": "<exact supporting or contradicting sentence, up to 300 characters>", "paywalled": "<DOI or URL if source-needed>"}. Use status `ok` for keep, `error` for edit or remove, `unverifiable` for source-needed, `style` only for operative teaching that states no number, risk estimate, contraindication or guideline position.

MDX rules for `new`: `&lt;`/`&gt;` in prose and tables; keep the page's citation style (`<sup>[[N]](#refN)</sup>`, footnotes `[^N]` on gender-affirming pages, plain `[N]` on database pages); `GenericDatabase` data strings render as plain text, so put a citation there only in the page's existing style for that table. New sources: cite as `<sup>[[R1]](#refR1)</sup>` with "new_refs": [{"key": "R1", "line": "..."}] and never edit the reference list. Every PMID/DOI you cite must be one you opened. Keep each `old` under about 1,200 characters. Finish by printing counts of each decision.
