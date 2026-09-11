# Resumed WARWIKI release — September 11, 2026

## Publication

Published site commit **`b8b60a0e`**, including clinical correction commit `90a9e8f1` and the earlier travel checkpoint / quarterly schedule in `5afd0f89`.

- [GitHub CI 34645036653](https://github.com/nseranio/warwiki/actions/runs/34645036653): **success** for the exact site commit.
- Vercel **`dpl_5iD48Bji8GPZMSVMoqDruYmL45qy`**: **READY**, source SHA `b8b60a0e1d710bb76e5260beff337d9c0505565e`.
- Production aliases `warwiki.org`, `www.warwiki.org`, `warwiki.vercel.app`, and the project/main aliases point to this deployment.
- Direct production checks and deployment evidence are recorded in [release verification](resumed-publication-verification.json).

Later report-only commits document this release; they do not require rebuilding unchanged site content.

## Clinical scope and limits

Forty documentation pages were corrected after `5afd0f89`. The cumulative [page ledger](full-site-review/README.md) records **121 full source-text reads and 113 scoped updated pages among 1,186 documentation pages**. All 1,186 recorded content hashes were independently checked against the final source. Reading a page, checking selected claims and verifying every clinical statement are different activities; the whole-site clinical review is incomplete.

Changes include MUSA 2025 and the 2026 Scandinavian urethroplasty follow-up; Botox adult/pediatric label regimens and trial populations; FDA/AUA ProACT selection and indirect device comparisons; renal, metabolic and B12 surveillance; AUA/CUA IC/BPS guidance and PPS retinal risk; product-specific sealant use; and urethral, UPJ, ureteral and fistula evidence. The domain ledgers record corrected statements, primary sources, access limits and unresolved claims.

Independent change-focused review covered the ten operative diffs and seven root clinical/device/surveillance diffs. Root reviewed pharmacology and clinical-condition additions with primary spot-checks. One study-classification issue was corrected: Farias 2025 used alternating allocation of consecutive patients despite abstract wording suggesting randomization. Unchanged historical statements retain their unresolved status.

## Technical validation

- Source lint and typecheck passed; 32 component tests and 50 maintenance tests passed.
- Final isolated production build: **139.30 MB**, 2,569 files, 1,191 HTML documents.
- All 101,589 compiled local links/assets and 731 data-link literals passed destination and anchor checks.
- Full browser sweep visited **1,190 sitemap URLs**, plus three interaction tests: 1,183 passed; nine remote portraits failed and one search test had a faulty relative-URL fixture.
- Removed the nine broken portrait URLs and corrected the search fixture. Final retest of **all 120 History URLs plus three interaction tests: 123 passed, zero failed**.
- Desktop/phone homepage, the compiled MUSA section and a final initials-fallback profile were visually inspected.

The [browser validation record](resumed-browser-validation.json) distinguishes the broad sweep from affected-page retesting. No unresolved browser errors remained in those checks. This is not a claim of exhaustive interaction, device or clinical validation.

The homepage now has a main landmark. Vercel analytics loads only after hydration on the canonical production origin while online. Browser checks capture uncaught JavaScript, failed requests and resource HTTP errors. Search tests cover abbreviation expansion, results and no-result behavior; figures retain keyboard-focus return.

## External links

[Published workflow 34645055611](https://github.com/nseranio/warwiki/actions/runs/34645055611) **passed**: **200 sampled URLs, 111 successful, 89 soft responses, zero confirmed broken links**. The site contains 11,457 extracted external URLs; the sample does not verify all of them. Publisher access blocks/rate limits require later rechecking. [Saved results](external-links-resumed.json).

The prior run's lone HEAD 404 was an ACR PDF still linked by its official page and retrievable with GET. The checker now confirms HEAD 404/405/501 with GET and cancels response bodies to avoid downloading whole manuals. A genuine GET 404 still fails.

## Quarterly maintenance

Evidence collection and the existing Codex review automation run every three months, in **March, June, September and December**; the next planned cycle is **December 2026**. The GitHub collector runs on day 1 and the local review on day 2. Technical external-link checks remain monthly. The existing automation ID is retained; no duplicate monthly evidence review exists.

Discovery now covers **14 focused groups**. Nine new/changed queries returned 53–804 metadata hits each in live count checks for June 3–September 11, below the collector's 3,000-record safety limit. These were query/count checks, not a new full collection or clinical review. The 100-day overlap, 60-candidate editorial shortlist and separate guideline/regulatory review remain. Search labels alone do not establish clinical importance.

The local editor requires the computer/app to be running. Missed cycles catch up from the last completed review; public GitHub scheduled workflows can be disabled after prolonged repository inactivity. See the [maintenance runbook](maintenance.md).

## Storage and retained preferences

Earlier authorized cleanup removed **41 obsolete deployments** while preserving live/rollback and alias references. No further deployment deletion occurred in this batch. Eight deployments are listed after the new site release: seven READY and one CANCELED. All four retention categories remain **30 days**, with a minimum of **10 deployments** retained.

The local build is about 75% smaller than the original 566 MB output. The account meter has **not** been confirmed below 10 GB; retained artifacts and Vercel metering are separate from local build bytes. No paid upgrade was made. Main-only builds and authoring-only deployment skips limit unnecessary growth; checkpoints, the saved OpenEvidence prompt and the Epic roadmap now qualify for those skips too.

Clinic and the quiz remain removed. History stays discreet, and patient handouts remain recoverable in source but excluded from deployment. Public articles retain their ordinary last-updated display. Nine unavailable History portraits use initials; biography and lineage fields are unchanged.

## Continuing work

Use [RESUME-HERE.md](../../RESUME-HERE.md) for exact next files. The OpenEvidence survey has 42 recorded item decisions, including deferred and presence-only findings, not 42 verified clinical updates. The September 2026 HoLEP Cochrane summary was checked and already accurately represented. NeuroSAFE PROOF is a verified functional-preservation gap awaiting a concise survivorship addition.

Reference metadata collection is paused after 6,355 cached records (6,318 found) and is resumable. Low-overlap title signals or missing metadata require investigation, not automatic citation replacement. The remaining survey reconciliation and whole-site clinical review continue. Epic remains paused.
