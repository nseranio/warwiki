# DOI discovery for plain-text references (Codex, October 11, 2026; network enabled)

Repo: /Users/joyboy/Documents/WARWIKI/warwiki. Read CLAUDE.md (Citations, Lessons That Keep Recurring), reports/2026-10-03/site-consistency.md, and the existing tools scripts/refs/find_dois.py, scripts/refs/registry.py, scripts/refs/candidates.py, scripts/audit/doicheck.py, scripts/audit/pubmed.py.

Goal: about 1,450 references on content pages (docs/**/*.mdx, under "## References") are plain text with no DOI link. For each, find its DOI (or, if none exists, a PubMed/PMC URL), but only with a verified match:
- Query Crossref (and PubMed E-utilities for PMIDs); be polite: identify with mailto=warwikihq@gmail.com, at most ~3 requests/second, back off on 429.
- Accept a match only if first author surname, year (±1 for epub/print), and title (normalized similarity ≥0.9) or journal+volume+first page all agree. Same author and year is not the same paper. Books, chapters, guidelines, labels and websites: add a DOI only when one genuinely exists for that exact item; otherwise leave them.
- Then resolve each accepted DOI at doi.org (HEAD/GET) to confirm it resolves.
Edit the references in place to the house format: `doi:[10.xxxx/...](https://doi.org/10.xxxx/...)` appended to the reference (keep everything else unchanged; for PubMed-only use `[PMID NNNN](https://pubmed.ncbi.nlm.nih.gov/NNNN/)`). Never change reference numbering, wording, authors or anchors.
Keep a ledger reports/2026-10-11/doi-discovery.tsv (page, ref number, reference text, decision added/ambiguous/none, DOI or PMID, match evidence). Ambiguous cases: do not edit, list them.
Afterwards run `npm run lint` and `npm run build` (the build rewrites src/data/stats.json: run `git checkout -- src/data/stats.json` afterwards) and make sure both pass. Write reports/2026-10-11/doi-discovery.md with counts (scanned, added DOI, added PMID, ambiguous, none) and 20 random added examples with their evidence. Do not commit or push.

If `npm run lint:claims` fails because adding a DOI changed a cited-source binding, do not edit the claim ledger or verdicts: revert that reference edit, list it in the ledger as "binding-conflict", and continue.
