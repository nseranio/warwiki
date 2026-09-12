# September 12 continuation release

This is an intermediate publication in the requested whole-site review. It is not task completion or whole-site clinical clearance. Continue through the remaining pages and high-impact primary-source checks after publication.

## Scope

The cumulative ledger records **293 of 1,186 documentation pages fully read against current content**, with **275 scoped updated pages**. All 73 clinical-condition pages, all 98 urethral/upper-tract technique pages, 71 pharmacology pages, 28 evaluation pages and 18 special-population pages (including all 17 trauma pages) have full-read records, with a few additional earlier root reads. Review-source access and remaining claims are explicit in each domain ledger. A full MDX read does not mean every cited paper was available or read in full.

This batch changes 170 documentation sources. Important corrections include:

- Urethral/upper-tract anatomy, cohort denominators, incorrect PMID/DOI links, outdated endoscopic escalation and unsupported comparative claims.
- Clinical fistula, genital, pain and bowel conditions; current trial/guideline interpretation; distinction between investigational treatments and routine practice.
- Trauma management, catheter/contrast units and safety, torsion/fracture urgency, Fournier antimicrobial coverage, PFUI sex-specific considerations and intraoperative injuries.
- Pharmacology drug status, labeled doses, antimicrobial indications, high-yield negative trials and overstated small-study benefits.
- Evaluation/renal/nutritional tests: diagnostic thresholds versus risk prediction; albumin/prealbumin as inflammatory rather than diagnostic nutrition markers; GLIM 2025, AWGS 2025/EWGSOP2 and current ACR recommendations; IDSA/AUA/EAU urine-testing distinctions.
- Iron assessment: KDIGO 2026 dialysis-specific criteria, FDA September 1 Injectafer phosphate boxed warning, separate US iron-product regimens, PREVENTT negative coprimary outcomes and corrected HF/GI-workup claims.

## Source access

Root read the complete main papers for EWGSOP2, AWGS 2025, GLIM 2025, ASPEN visceral proteins, Choi 2020 grip/frailty, Shen 2023 exercise network meta-analysis and PREVENTT, including their reference/disclosure sections where available. Supplements were not all read. KDIGO 2026 iron chapter S37–S48 was read in full; the rest of that 99-page guideline was not. Relevant portions of ESPEN 2025, ICCAMS, ACR and original MUST/MNA guidance were checked, with exact scope in the ledger. Figures/tables used for the sarcopenia thresholds were visually checked. The independent pharmacology reviewer also fully read the FAIR-HF2 main article (including tables, figures/captions, disclosures and 23 references) and the Nature Medicine HF meta-analysis main text/tables and 32 references; supplements were not fully reviewed. Other domain source reads and access limits are recorded by the reviewers.

The original 10,956-DOI Crossref scan completed with 10,887 found metadata records. The refreshed signal report matches 10,757 of 10,909 current DOIs to that cache. The PMID scan checked 243 current identifiers (242 found), with 117 low-title-overlap signals. These are investigation leads, not proven false citations or clinical validation; newly changed references may fall outside the collection snapshot.

## Validation and publication

- Typecheck passed; 32 component tests and 50 maintenance tests passed.
- Full source lint passed, with reference-density advisories retained.
- Production build passed after repairing three MDX formatting errors: 139.22 MB, 2,570 files, 1,191 HTML documents.
- All 101,564 compiled local links/assets and 731 data-link literals passed.
- All **170 changed documentation routes** passed browser checks for hydration, content, JavaScript and resource errors. The selected runs passed 164 and 10 checks; the separate search result/no-result interaction passed (1/1). [Browser record](browser-validation.json).
- **Published `c4d3f30a7abda04637bb063dc80185732cd797b8` to `main/origin/main`.** [CI 34676588480](https://github.com/nseranio/warwiki/actions/runs/34676588480) passed for that exact commit. The commit-specific [Vercel deployment](https://vercel.com/nseranios-projects/warwiki/9tmgsuM2AuhzQCFv5w55C8FyeZVG) reports success.
- Direct production checks passed for the homepage, iron/ferritin, preoperative labs, grip strength and Rome V bowel page; `/clinic` returns 404 as intended. [Publication evidence](publication-verification.json).
- The direct Vercel inventory API returned 403 with the stored CLI credential. No fresh alias/retention/storage inventory was asserted; release success was independently verified through GitHub's exact-commit Vercel status and live content. No sign-in or purchase was required to publish this batch.

## Ongoing work

The surgical, remaining pharmacology/special-population, foundation/tool, evaluation, History/imported-data, resource and source-page review queues remain open. The 110-item OpenEvidence survey still requires complete reconciliation. The agents prepared the next domain reads without changing the release source while validation ran. The temporary source freeze was released after commit, and all three agents resumed corrections. Continue; do not treat this document as a stopping point.

Quarterly evidence cadence and monthly technical links remain. Epic remains paused. Clinic/quiz remain removed, History discreet and handouts excluded from builds. No paid upgrade or further Vercel deletion occurred in this batch. Previously 41 obsolete deployments were removed; the account storage meter has not been confirmed below 10 GB. Preserve unrelated world-cup-next-week-pacific.ics.
