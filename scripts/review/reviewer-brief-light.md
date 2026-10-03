# Task: second-pass review of WARWIKI reference pages (anatomy, instruments, biomaterials, history, resources); propose, do not edit

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md (sections 1-4 and 10), CLAUDE.md ("Non-Negotiables", "Media") and reports/2026-09-20/content-preservation-policy.md first. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

These pages are lower-stakes reference pages. Check, in order: (1) factual claims with numbers, dates, dimensions, device specifications, names and attributions against the cited references or manufacturer documents; (2) cross-page consistency with the pages they link to; (3) any claim that could mislead a surgeon about safety. Skip currency searches unless a device or guideline is plainly superseded. Do not propose stylistic rewrites beyond STYLE.md violations that matter.

Rules: never invent a reference; every DOI/PMID/URL you cite must be one you opened. Never propose deleting useful teaching; correct specific errors. Skip anything you cannot verify.

Output for each page: OUTPUT_DIR/<page-basename>.jsonl, one finding per line:
{"page": "<repo path>", "category": "accuracy|currency|consistency|completeness|voice|structure|reference", "severity": "high|medium|low", "finding": "<one or two sentences>", "evidence": "<PMID/DOI/URL and the quoted or paraphrased source text>", "edit": {"old": "<exact substring of the page>", "new": "<proposed replacement>"} or null, "confidence": "high|medium"}
Also OUTPUT_DIR/<page-basename>.summary.md: claims checked, sources opened, and a 2-line verdict. An empty .jsonl is fine when nothing needs changing.
