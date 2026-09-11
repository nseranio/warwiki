# WARWIKI — resume here

The flight checkpoint has been resumed and the next correction batch published. **Evidence maintenance is quarterly**, in March, June, September and December; the next planned cycle is December 2026. Technical link checks remain monthly. The existing automation was updated, not duplicated.

## Published site and verification

**Live site commit: `b8b60a0e`**, including `90a9e8f1` (40 documentation-page corrections) and the earlier travel checkpoint / quarterly schedule in `5afd0f89`.

- [GitHub CI 34645036653](https://github.com/nseranio/warwiki/actions/runs/34645036653) passed.
- Vercel `dpl_5iD48Bji8GPZMSVMoqDruYmL45qy` is READY and owns the production aliases.
- Local final build: 139.30 MB; source checks, 32 component tests, 50 maintenance tests and compiled links/assets passed.
- Browser sweep visited all 1,190 sitemap URLs. Nine broken portraits and one test-fixture failure were resolved; the final 120-page History / three-interaction retest passed all 123 checks.
- [External-link workflow 34645055611](https://github.com/nseranio/warwiki/actions/runs/34645055611) passed: 111 successful, 89 soft responses and no confirmed broken links in 200 sampled URLs. Soft responses remain unresolved.

See [the full release record](reports/2026-09-11/resumed-release.md) for exact scope, source commits and production checks. A later notes-only commit can be ahead of the live content commit without requiring another site deployment.

## Saved references

- [Quarterly OpenEvidence prompt](OPEN-EVIDENCE-PROMPT.md).
- [Original 110-reference survey and reconciliation](reports/2026-09-11/open-evidence/README.md).
- [Whole-site page ledger](reports/2026-09-11/full-site-review/README.md): 1,186 documentation pages, 121 full source-text reads and 113 scoped updates. The clinical audit remains incomplete; no whole-site clinical clearance has been given.
- [Epic roadmap](EPIC-ROADMAP.md). Epic stays paused until explicitly resumed. Keep patient data and private operative notes outside the public repository.

## Exact next work

1. **Clinical conditions:** continue at `docs/03-clinical-conditions/03f-fistulas/in-females/obstetric.mdx` (OpenEvidence items 41/42), then the remaining genital, pelvic-pain and defecatory pages. Forty of the 73 clinical-condition pages have full reads recorded. Targeted IC/BPS companion corrections do not count as a full-page review.
2. **Operative review:** continue at `docs/04-surgical-techniques/04a-urethral-reconstruction/combined/erickson-dorsal-bmg-ventral-flap.mdx`. The urethral/upper-tract domain ledger records 44 completed full reads; avoid unnecessary rereading. Follow up its unresolved historical estimates, vaginal tubularization claims, Boari ICG route and minced-graft erratum.
3. **Pharmacology:** next unread entry is `docs/01-foundations/pharmacology/dermatologic-topical-urethral/antimitotics-antifibrotics.mdx`. The domain ledger records 30 full reads among 94 pages. Eight sealant/IC pages and targeted companions were corrected in the latest batch.
4. **Verified addition ready for integration:** NeuroSAFE PROOF (OpenEvidence 101) belongs in `docs/05-special-populations/05d-cancer-survivorship/index.mdx`, Sexual Health section, with a concise ED cross-link. Eligibility, effect sizes, publication date and limits are saved in the survey JSON. Do not imply oncologic equivalence or long-term safety from its functional endpoints.
5. **Other survey leads:** HoLEP Cochrane 25 is source-checked and already accurately covered. NEUROGED 12 has verified identity/correction but still needs recommendation-level integration. GenderCOS 74/75, ACS 82 / AAST 94, obstetric fistula and SPIRIT 102 require their recorded primary-source checks. Presence-only and deferred decisions are not completed reviews. Keep cancer topics within reconstructive/survivorship scope.
6. **Root follow-up:** Botox/MUSA, ProACT and renal-metabolic corrections are complete for their recorded scope. Implant-model, ATOMS, REMEEX, preoperative-labs and cystectomy companion pages still need their broader remaining checks; targeted edits did not clear whole pages.
7. **Reference identities:** resume `reports/2026-09-11/full-site-review/fetch-reference-metadata.py` from its existing 6,355-record JSONL cache. Collection is paused, not running. Rebuild title signals against fresh source when useful. Missing Crossref registration or low title overlap is an investigation lead, not proof of a false citation.

## Publication and efficiency

Standing authorization: validate completed changes, commit and push to `main/origin/main`, then verify GitHub, Vercel and live content. GitHub and Vercel sign-ins are complete; no repeat approval is needed. Run source lint, types, relevant tests, production build/compiled links/size, appropriate browser checks and whitespace checks. Group related completed changes into a release to avoid unnecessary deployments.

Earlier cleanup deleted 41 obsolete Vercel deployments. Eight are listed after the latest site release; live/rollback and alias references are preserved. Retention remains 30 days with a minimum of 10 deployments. Build output is approximately 139 MB versus 566 MB before. The account meter has not been confirmed below 10 GB; do not equate deleted builds with an immediate meter reset. Report/authoring-only changes should skip deployment.

Preserve unrelated `world-cup-next-week-pacific.ics`. Quiz and Clinic stay removed. History stays discreet. Handouts stay recoverable but excluded from build. Keep public article metadata to the ordinary last-updated display and detailed source-review notes in internal records. Epic remains paused.
