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
