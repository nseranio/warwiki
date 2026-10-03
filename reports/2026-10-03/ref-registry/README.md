# Reference registry, first pass (October 3, 2026)

Layer 1 of the site consistency plan: check every DOI-bearing reference against Crossref, then confirm by PubMed.

## Method

1. `python3 scripts/refs/registry.py` extracts every reference line in `docs/` that carries a DOI, fetches the full Crossref record for each distinct DOI (cached in `reports/audit-v2/sources-local/`, gitignored), and flags differences in DOI identity, first author, year, volume and first page. `summary.md` gives the counts.
2. `python3 scripts/refs/candidates.py` runs a Crossref bibliographic search for each citation whose DOI does not resolve or points to a differently titled work.
3. Codex triaged all 347 flags in three parallel read-only batches (`codex-verdicts.jsonl`). Its verdicts were fix_fields, replace_doi, false_positive or needs_source.
4. Claude checked a random sample of eight false-positive verdicts against PubMed, and all eight held. Claude then checked every non-false-positive verdict against PubMed before editing.

## Result

- **Scope:** 19,424 DOI-bearing references (12,476 distinct DOIs; 3,238 cited on more than one page).
- **Flags:** 347. Codex judged 330 to be false positives: group authors, online-first years, Crossref listing an editor first, transliterated surnames, translated or shortened titles, DOIs that PubMed holds but Crossref lacks, Cochrane issue numbers and e-locators.
- **Fixed (commit `5f39d86c`, 12 pages):**
  - **Wrong DOI:** Onofre 2011 on PFUI pointed to another paper.
  - **Wrong author lists:** the 2022 priapism pharmacotherapy review (two pages; PubMed itself indexes the authors' given names as surnames) and the 2025 AAST kidney injury scaling update (the cited five were the last five of twelve authors).
  - **Publication years:** five references, on F1000 version DOIs and volume-year mismatches.
  - **Placeholder link text:** three surgeon-profile footnotes linked as "Client Challenge", a scraped page title.
- **Left unchanged:**
  - Gronau 2002 and Berjaoui 2024: PubMed agrees with the page and Crossref differs.
  - March-Villalba 2021: PubMed links the cited DOI.
  - Buhl 2025/2026: Frontiers volume-year ambiguity.
  - Bhandari Randhawa 2026: the DOI is confirmed in PubMed but not yet in Crossref.
- **Correction:** the September `refcheck` report's "doubled suffix" DOIs (for example on the Atala profile) were an extraction bug in that script; the page links are correct.

## Not covered by this pass

- About 3,350 references carry no DOI: about 1,900 are URL-only (guidelines, websites) and the rest are plain text. A Crossref and PubMed search could add DOIs to the plain-text journal articles.
- **Formatting is not uniform.** DOI link style (99%) and italic journal names (96%) are consistent, but about half the references put the title in quotation marks and half do not, and about half list every author while half truncate with "et al." 2,559 DOIs cited more than once appear as textually different lines. Normalizing the format needs a decision on the house citation style before any rewrite.
