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

## DOI discovery for references without a DOI (same day)

- 1,027 journal-style references had no DOI. `python3 scripts/refs/find_dois.py` matched them to PubMed (through an existing PMID) or Crossref. A match counted as high confidence only when title, first author, year, volume and first page all agreed: 617 lines, 12 of 12 sampled by hand correct, DOIs added in commit `c6dbe065`.
- Codex searched PubMed, Crossref and publisher sites for the other 410 (`codex-doi-verdicts.jsonl`):

  | Verdict | Lines |
  |---|---|
  | Exists without a DOI (mostly before 1995) | 326 |
  | DOI found | 70 |
  | Miscited | 7 |
  | Not a journal article | 6 |
  | Not found | 1 |

  69 of the 70 DOIs were added after a Crossref check, in commit `ba1997ad`. The Gilja 1996 Mainz pouch II DOI returns 404 and was not added.
- **Miscitations corrected against PubMed (`ba1997ad`):**
  - The Turner-Warwick scrotal drop-back report was attributed to the wrong authors and journal (it is Boddepalli et al., *Indian J Urol* 2019).
  - The Mauck Boari-flap paper is in *J Urol*, not *Int Braz J Urol*.
  - The Balzano 2022 title and pages were wrong.
  - The MMWR PRP report is now attributed to its authors rather than "CDC".
  - Two authors had been inserted into Basiri 2011.
  - The Arnold 2021 PMID was wrong.
- **Needs the user:**
  1. `priapism-shunts-decompression.mdx` ref 18 (Mireku-Boateng, *Urol Int* 2001;66:216–217, fistula closure after Winter shunt) cannot be found in PubMed or at the publisher. It supports one sentence ("fistula closure has been reported to restore erections in select cases"). The reference may be wrong or may not exist.
  2. `otis-bougie.mdx` ref (Schultheiss, *De Historia Urologiae Europaeae* 2021;28): the linked EAU PDF is dead, and Codex reports that volume 28's stricture-history article is by Mundy. Not verified.
