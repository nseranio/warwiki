# Task: independent second-pass editorial review of WARWIKI pages (propose; do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read AUDIT.md ("Per-page procedure" and "Escalate rather than guess"), STYLE.md (sections 1-4 and 10), CLAUDE.md ("Non-Negotiables", "Article Pattern", "Atlas, Database And Page Conventions") and reports/2026-09-20/content-preservation-policy.md first. Your working directory is a scratch folder; the ONLY files you may create are the OUTPUT files named below.

These pages were already audited once (sources checked, September-October 2026). You are the independent second reviewer, acting as a subspecialty section editor for reconstructive urologists and urogynecologists. Find what a careful first pass misses. For each page:

1. Accuracy. Check every consequential claim (recommendations, numbers with denominators and follow-up, doses, device specs, safety warnings, technique claims) against its cited reference: open the abstract on PubMed (or PMC/open-access full text when the claim depends on detail). Look especially for: composite endpoints reported as a specific outcome, wrong denominators or populations, short follow-up called durable, one study presented as consensus, guideline strength labels missing or wrong, superseded guideline versions.
2. Currency. For the page's 1-3 core decisions, search PubMed for guidelines, RCTs and systematic reviews from 2023 onward. Report a practice-changing omission with its citation (verify the DOI/PMID).
3. Internal and cross-page consistency. Contradictions within the page, or with the pages it links to for the same fact.
4. Completeness for the audience. A missing operative step, complication, contraindication or decision point a reconstructive surgeon would expect, ONLY if you can cite a source for it.
5. Voice and structure. STYLE.md Pass 2 sentence problems, evidence wording (section 4), template order. Report the worst few, not every sentence.

Rules: never invent a reference; every DOI/PMID you cite must be one you opened. Respect the content-preservation policy (never propose deleting useful teaching; correct specific errors). Skip anything you cannot verify rather than guessing.

Output for each page: a JSON Lines file OUTPUT_DIR/<page-basename>.jsonl, one finding per line:
{"page": "<repo path>", "category": "accuracy|currency|consistency|completeness|voice|structure|reference", "severity": "high|medium|low", "finding": "<one or two sentences>", "evidence": "<PMID/DOI/URL and the quoted or paraphrased source text>", "edit": {"old": "<exact substring of the page>", "new": "<proposed replacement>"} or null, "confidence": "high|medium"}
High severity = a reader could be misled about a clinical decision, number or safety point. Also write OUTPUT_DIR/<page-basename>.summary.md: claims checked (count), sources opened (count), minutes spent (estimate), and a 3-line verdict on the page's quality.

MDX and citation rules for every proposed `new` text: write `&lt;` and `&gt;` for less-than/greater-than in prose and tables (never a bare `<2 cm`); keep citation markers in the page's own style (`<sup>[[N]](#refN)</sup>`, footnotes `[^N]` on gender-affirming pages, `[N]` inside database data rows). If a finding needs a NEW reference, give one edit that inserts the full reference-list line using the next number after the page's current highest reference, say that number in the finding, and do not reuse that number for another finding on the same page (use the following number).

NEW REFERENCES (overrides any earlier instruction about reference-list lines): never edit the reference list in an `edit`. When a finding needs a new reference, cite it in the edit's `new` text as `<sup>[[Rk]](#refRk)</sup>` (R1, R2 ... local placeholders, one per new source in this finding) and add to the JSON object a field "new_refs": [{"key": "R1", "line": "Last FM, et al. \"Title.\" *Journal.* Year;Vol(Issue):Pages. doi:[10.x/y](https://doi.org/10.x/y)"}]. The apply tool numbers it and appends it to the reference list. Keep each `old` short (one sentence, list item or table row; never more than about 1,200 characters).

## Independent residual measurement (overrides anything above about prior audit material)

This page is part of a random residual-error sample. Judge only the page as published and the sources you open. Do not open anything under `reports/`, the claim ledger, audit status files, review sheets, CHANGELOG.md or git history, and do not look for earlier findings about this page. Record every error you find, including ones that look minor in isolation, with severity set by consequence for a reader.

TRUST THE READER (STYLE.md section 12, October 8, 2026): when a claim is broader than its source, fix the sentence's own scope (name the population, design, size or endpoint inside it). Never add a separate caveat sentence such as "Do not transfer this to …", "This does not establish …", "This is not a trial of …", "This is an X resource, not Y", "not a universal rule", and never write process notes ("in the inspected abstract", "not independently assessed", "confidence interval not reported", "checked <date>") into page text. A proposed edit that adds such a sentence is a voice error; a verifier rejects it.

AUA SITE: do not open auanet.org pages (guidelines, Core Curriculum or university.auanet.org); the AUA prohibits use of its site content in AI tools. Check AUA guideline statements against the published guideline article (J Urol, Urol Pract or Neurourol Urodyn via PubMed, PMC or the publisher), or a local copy supplied in local_sources.
