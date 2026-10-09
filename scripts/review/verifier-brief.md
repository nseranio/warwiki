# Task: adversarially verify review findings for WARWIKI (do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md section 4 and reports/2026-09-20/content-preservation-policy.md. Your working directory is a scratch folder; the ONLY file you may create is OUTPUT.

INPUT lists finding files (JSON Lines) written by another reviewer, one finding per line, each with an exact proposed edit {old, new} or null. For every finding with severity high or medium, and every low finding whose category is reference: try to REFUTE it.

1. Open the page and confirm `old` is an exact substring of the current file and that the finding describes the page correctly (read the surrounding paragraph and the cited reference list).
2. Open the evidence yourself (PubMed abstract, PMC/open full text, guideline chapter, label). Confirm the source says what the finding claims, for the right population, endpoint and time point.
3. Judge the proposed `new` text: it must fix only the error, keep every citation marker attached, keep useful content (no deletions without a demonstrated error), follow STYLE.md evidence wording, and not introduce a new uncited claim. If it adds a new reference, the reference must be fully specified and verified (DOI/PMID you opened) and the edit must include the reference-list line; otherwise reject the addition or narrow the edit.
4. Verdict: `agree` (edit correct as proposed), `modify` (finding real, give a corrected edit), `reject` (finding wrong, unsupported, or the edit would cause harm), `no_edit` (finding real but needs the user or full text; say why).

Output JSON Lines at OUTPUT, one per verified finding: {"page":..., "finding": "<first 120 chars of the finding>", "severity":..., "verdict":..., "edit": {"old":...,"new":...} or null, "reason": "<one or two sentences with the source you opened>"}
Skip low findings that are not reference fixes. Finish by printing counts per verdict.

Also reject or fix any edit that: leaves a bare `<` or `>` before a number or letter in prose (must be `&lt;`/`&gt;`); cites a reference number that does not exist on the page and is not added by the same or another agreed finding on that page; or adds a reference-list line whose number collides with an existing one or with another finding's new reference on the same page (renumber in your modified edit and say so).

NEW REFERENCES (overrides any earlier instruction about reference-list lines): never edit the reference list in an `edit`. When a finding needs a new reference, cite it in the edit's `new` text as `<sup>[[Rk]](#refRk)</sup>` (R1, R2 ... local placeholders, one per new source in this finding) and add to the JSON object a field "new_refs": [{"key": "R1", "line": "Last FM, et al. \"Title.\" *Journal.* Year;Vol(Issue):Pages. doi:[10.x/y](https://doi.org/10.x/y)"}]. The apply tool numbers it and appends it to the reference list. Keep each `old` short (one sentence, list item or table row; never more than about 1,200 characters).

REJECTED FINDINGS AND THE ORIGINAL CLAIM (claim gate schema 2, October 2026): rejecting a finding does not by itself verify the original sentence. When you reject a finding from a claim check (it has a `claim_id`), also say whether the source you opened supports the original claim as written: add `"original_supported": true|false`, `"source_opened": "<PMID/DOI/URL you opened>"` and `"quote": "<exact supporting sentence from the source, up to 300 characters>"`. Use `true` only when you found that support yourself for the same population, endpoint, time point and denominator; otherwise `false`.
When a finding carries a `claim_id`, copy it into your verdict line as `"claim_id"`.

TRUST THE READER (STYLE.md section 12, October 8, 2026): when a claim is broader than its source, fix the sentence's own scope (name the population, design, size or endpoint inside it). Never add a separate caveat sentence such as "Do not transfer this to …", "This does not establish …", "This is not a trial of …", "This is an X resource, not Y", "not a universal rule", and never write process notes ("in the inspected abstract", "not independently assessed", "confidence interval not reported", "checked <date>") into page text. A proposed edit that adds such a sentence is a voice error; a verifier rejects it.

AUA SITE: do not open auanet.org pages (guidelines, Core Curriculum or university.auanet.org); the AUA prohibits use of its site content in AI tools. Check AUA guideline statements against the published guideline article (J Urol, Urol Pract or Neurourol Urodyn via PubMed, PMC or the publisher), or a local copy supplied in local_sources.
