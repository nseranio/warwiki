# Guideline-statement sweep (October 9, 2026)

Why: in residual sample 6, about a third of the serious errors were guideline statements with the wrong strength, direction, wording or scope. This sweep checked every AUA, EAU, SUFU and AUGS statement on content pages (sections 01–05) that had not been verified under claim-gate schema 2.

## Method

- **Selection** (`reports/audit-v2/sources-local/quality/guideline_sweep.py`, ignored folder): gate units of kind "guideline" naming AUA, EAU, SUFU or AUGS whose ledger status was legacy (1,145), plus sentences and table rows naming one of these bodies with statement wording that the gate's pattern does not extract ("may consider", "should", "offer", "statement"; 760). Already schema-2-verified statements (1,091) were not rechecked.
- **Grouping:** claims were grouped by the guideline they cite, so each Claude checker searched one local guideline copy (AUA, EAU, NCCN and AUGS texts supplied by the owner, who holds AUA and NCCN permission) instead of reading pages one by one. 69 batches of up to 35 claims; EAU chapters without a local copy were read on uroweb.org; auanet.org was never opened.
- **Checks:** content, strength label and grade, should/may wording, for/against direction, statement number and edition, population and scope. Errors were fixed by scoping the sentence itself (no caveat sentences).
- **Verification:** separate Claude verifiers checked every finding, including citation-marker moves; then the claim gate's final-text check on every rewritten claim.

## Results

| Measure | Value |
|---|---|
| Statements checked | 1,905 on 510 pages |
| Supported | 1,822 (95.6%) |
| Errors | 69 (3.6%) on 63 pages |
| Unverifiable (paywalled or unopenable source) | 13 |
| Citation-placement fixes (content right, marker missing or wrong) | 55 |
| Verifier outcome (124 findings) | 109 agree, 13 modify, 1 reject, 1 needs a reference-list change |

Error rate by group: statements the claim gate tracks 2.5% (29/1,145); statements its pattern misses 5.3% (40/760). By body: AUA-family 40 of 994, EAU 23 of 677, other 6 of 234.

## What the errors were

- **Scope widened:** a statement for one population applied to all (AUA/SUFU NLUTD surveillance for bowel-reconstructed patients presented as for all NLUTD; CIC-only oral prophylaxis presented for all NLUTD; percutaneous tibial nerve stimulation broadened to implantable devices; EAU desmopressin sodium monitoring for nocturnal polyuria applied to every use; AUA Statement 9a delayed CT for stable patients applied to all; flap-versus-graft equivalence for penile urethroplasty applied to all single-stage repair).
- **Strength or wording changed:** "should" softened to "permits"; "absolute indication" softened to "can still warrant"; "may be proposed" hardened to "recommends"; an Expert Opinion statement labelled Recommendation, Grade C (AUA Urotrauma Statement 28, two pages).
- **Attribution:** the page's own inference credited to a guideline (PTNS "not among" AUA IC/BPS treatments; SUFU white-paper advice credited to the AUA guideline; a median-lobe subanalysis credited to aquablation when it concerned water vapor therapy; an AFP review labelled as AAFP guidance).
- **Wrong figures or dates:** a vaginal-estrogen RR range that mixed two different estimates; the AUA 2023 stricture amendment described as predating the pivotal Optilume trial.

## Repairs

122 verified edits on 98 pages plus hand fixes on sibling sentences the batches did not include (penile fracture label, phytotherapy rows, NLUTD citation split between the two 2021 AUA/SUFU papers, reference-line section numbers). Every rewritten gated claim then went through final-text checks by separate Claude agents: round 1 (97 claims; 5 more errors in sentences the sweep had touched, all corrected after verification), round 2 (64 claims, including the second independent check that high-risk guideline claims require; 1 more scope error), round 3 (5 claims). One claim was narrowed because its source is paywalled: the BAUS 2026 penile augmentation recommendation (added to `needed-from-user.md`).

## Limits

- The 1,091 statements already verified under schema 2 were not rechecked; the sweep's error rate applies to the unverified pool.
- A single checker per claim; verifiers saw only the findings, not the 1,822 claims marked supported.
- 13 claims remain unverifiable (ACOG PB 214 details, the AUGS/IUGA 2020 mesh statement, the AUA Peyronie's VTE silence, and similar); they keep their legacy status.
