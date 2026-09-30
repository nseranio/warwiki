# Clinical Toolkit and Campbell's Roadmap

Agreed with the user on September 30, 2026. Follow this order unless the user says otherwise.

## Order

1. **Finish textbook mining ingestion** ([reports/textbook-mining/](../textbook-mining/)). Current focus.
2. **Refresh the personal SmartPhrase library** against the post-mining site (off-repo, `~/Documents/Jefferson Einstein/Practice Building/AI/Smartphrase Corpus/`; rerun `regen_warwiki.py`, `digest.py`, per-unit reviewers with `BRIEF.md`).
3. **Build the toolkit infrastructure and pilot Male SUI** (AUS, male sling, ProACT, PUL): op notes, counseling templates, handouts, and toolkit cards on the pages.
4. **Scale the toolkit and publish it together with the handouts** (turn on `WARWIKI_INCLUDE_HANDOUTS` at the same time).
5. **Campbell's**: scope triage of chapters first, then a 2–3 chapter pilot to measure the accept rate, then the in-scope remainder.
6. **Refresh the toolkit** after Campbell's changes land. Should be mostly automatic if counseling numbers are sourced from pages.

## Toolkit design decisions

- **Generic, not personal.** Site templates are derived from the personal library, never copied. Personal defaults become choice lists or `***` blanks; Jefferson-specific content and preference cards stay off the site. Personal op notes and patient data never enter this repo.
- **EHR-agnostic.** Plain text with `***` blanks and bracketed options, copy button. Optional Epic-formatted view later; no SmartList IDs. Call them "note templates", not SmartPhrases.
- **No cloned-documentation defaults.** Findings, EBL, complications, specimens and drains are always blanks, never prefilled normals. One-line notice that the template is a structure, not a record. No CPT codes on op notes; link to Hidden Curriculum billing pages instead.
- **Counseling numbers come from the pages.** Each figure in a counseling template references its source page (and anchor) rather than being retyped; add a lint check that flags a figure whose source is gone.
- **One registry.** A data file like `src/data/handouts.ts` holding handouts, op notes and counseling templates, each tagged with the page slugs it belongs to.
- **Page integration.** A "Clinical toolkit" card on each tagged page; hub pages (e.g. Male SUI) aggregate their children's materials automatically. Resources gets a gallery per type from the same data. Tagging lives in the registry, so pages do not need individual edits.

## Campbell's notes

- In scope: reconstruction, female/functional urology, neurourology, trauma, prosthetics, GAS, pediatric reconstruction. Skip oncology, stones and infertility chapters.
- Expect mostly `conflict` / `new_evidence` findings and references rather than new topics.
- Use the newest edition available. Cite primary papers; never copy text or figures.
