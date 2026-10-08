# Task: second-pass review of WARWIKI reference pages (anatomy, instruments, biomaterials, history, resources); propose, do not edit

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md (sections 1-4 and 10), CLAUDE.md ("Non-Negotiables", "Media") and reports/2026-09-20/content-preservation-policy.md first. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

These pages are lower-stakes reference pages. Check, in order: (1) factual claims with numbers, dates, dimensions, device specifications, names and attributions against the cited references or manufacturer documents; (2) cross-page consistency with the pages they link to; (3) any claim that could mislead a surgeon about safety. Skip currency searches unless a device or guideline is plainly superseded. Do not propose stylistic rewrites beyond STYLE.md violations that matter.

Rules: never invent a reference; every DOI/PMID/URL you cite must be one you opened. Never propose deleting useful teaching; correct specific errors. Skip anything you cannot verify.

Output for each page: OUTPUT_DIR/<page-basename>.jsonl, one finding per line:
{"page": "<repo path>", "category": "accuracy|currency|consistency|completeness|voice|structure|reference", "severity": "high|medium|low", "finding": "<one or two sentences>", "evidence": "<PMID/DOI/URL and the quoted or paraphrased source text>", "edit": {"old": "<exact substring of the page>", "new": "<proposed replacement>"} or null, "confidence": "high|medium"}
Also OUTPUT_DIR/<page-basename>.summary.md: claims checked, sources opened, and a 2-line verdict. An empty .jsonl is fine when nothing needs changing.

MDX and citation rules: write `&lt;`/`&gt;` in prose; keep the page's own citation style; a new reference uses the next unused number and its own reference-list line, never a number another finding on the page already uses.

NEW REFERENCES (overrides any earlier instruction about reference-list lines): never edit the reference list in an `edit`. When a finding needs a new reference, cite it in the edit's `new` text as `<sup>[[Rk]](#refRk)</sup>` (R1, R2 ... local placeholders, one per new source in this finding) and add to the JSON object a field "new_refs": [{"key": "R1", "line": "Last FM, et al. \"Title.\" *Journal.* Year;Vol(Issue):Pages. doi:[10.x/y](https://doi.org/10.x/y)"}]. The apply tool numbers it and appends it to the reference list. Keep each `old` short (one sentence, list item or table row; never more than about 1,200 characters).

TRUST THE READER (STYLE.md section 12, October 8, 2026): when a claim is broader than its source, fix the sentence's own scope (name the population, design, size or endpoint inside it). Never add a separate caveat sentence such as "Do not transfer this to …", "This does not establish …", "This is not a trial of …", "This is an X resource, not Y", "not a universal rule", and never write process notes ("in the inspected abstract", "not independently assessed", "confidence interval not reported", "checked <date>") into page text. A proposed edit that adds such a sentence is a voice error; a verifier rejects it.
