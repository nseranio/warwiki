# Seventh continuation release — September 12, 2026

## Scope

49 documentation files changed: 23 substantive content revisions and 26 additional presentation-only repairs. All31 malformed titled warning/info boxes across30files now use supported directive syntax. Visual QA discovered their titles/body appearing as raw markup. The generated-content validator rejects this failure while allowing literal code examples; its regression test passes. Clinical wording in the formatting-only files is unchanged, and review hashes were advanced only when the pre-format hash matched.

The central ledger records575/1,186 current full MDX reads,545 scoped updates,21 checked,26 unresolved and594 unreviewed. No complete clinical clearance is asserted. Tools coverage is72/231; all44fistula pages have original full reads and scoped corrections. Non-fistula surgical records now total180, including15genital pages. The new perioperative ledger records3original full reads and12unread pages; none of those15pages has been corrected in this release.

Five alternative graft pages correct source populations, endpoints, human/animal distinctions, regulatory status and guideline selection. Six complete main manuscripts, two de Kemp supplements and all available original primary abstracts were read; other full-paper and supplement gaps remain explicit. A second reviewer read all five revised pages and made focused primary-source checks. See [review](alternative-graft-review.md) and [source access](alternative-graft-source-access.json).

Six catheter pages correct insertion/balloon, irrigation, prophylaxis, routine-change and surveillance instructions. The major2026COMPARE andMultICath trials are included with device/protocol restrictions, noninferiority margins, denominators, attrition and tolerability limitations. Complete main manuscripts/tables were read; external protocols were selected-section reads, not complete reads. The tools ledger records exact access.

Six scrotal pages correct graft-bed selection, closure/flap/thigh-pouch indications, human fertility inferences and unsupported outcome rankings. The final fistula techniques and rectourethral companion correct populations, denominators, continence and flap claims. The MukoCell operative companion aligns with the foundation page's table-based subgroup results.

## Validation

Lint, typecheck,32component tests and51maintenance tests pass. Production output is133.92MB with2,569files/1,191HTMLpages. All98,795compiled links/assets and730data links pass, including the new raw-admonition guard. An initial visual pass discovered the formatting issue; repairs and the expanded browser sweep follow below.

All **53/53 Chromium checks pass**:49changed documentation routes plus4interaction checks. Three desktop/mobile samples were visually inspected; the repaired warning was re-inspected. See [browser record](seventh-browser-validation.json). Published as **302597297db8f3855af7a64c816af8b96a7eae7b**. [GitHub CI34689094896](https://github.com/nseranio/warwiki/actions/runs/34689094896) and exact-commit [Vercel deployment](https://vercel.com/nseranios-projects/warwiki/Cy2mGJxDASHSZ4faLzrqUF1ZB44p) succeeded. All six live checks passed, including corrected graft/catheter content, rendered warning markup and the removed Clinic404. See [publication verification](seventh-publication-verification.json). Temporary articles and figures stay outside the public repository. Unrelated `world-cup-next-week-pacific.ics` remains untouched.

## Continue after this checkpoint

Continue the six ureteral-stent/drainage pages, genital lymphedema, perioperative workflows and remaining foundations/resources/imported content. The latest high-yield leads include CIRSE2026 drainage standards and HI-PEITHO2026; their full-source and population limits require integration. The supplied OpenEvidence reconciliation remains incomplete. Evidence maintenance stays quarterly; Epic stays paused. The Vercel account meter is unconfirmed; local artifact size is not billed deployment storage.
