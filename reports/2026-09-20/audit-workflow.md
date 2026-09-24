# Finish the WARWIKI audit with bounded source review

Current instruction, September 20: finish the existing whole-site audit before requesting new OpenEvidence syntheses. During the audit, record candidates in [the deferred refresh list](open-evidence-refresh-queue.md). Existing supplied OpenEvidence material still needs primary-source reconciliation. No new Epic work.

## Model and work allocation

Use **GPT-5.6 Sol / High** for the clinical audit lead. Terra / Medium may do a precisely specified inventory, citation-identity lookup, or formatting task; it should not independently decide clinical meaning or remove material. Reserve stronger review for a named consequential disagreement, not an automatic second reading of the entire corpus. Do not default to Astra / Ultra or parallel full-history agents.

This is a task-specific recommendation, not a medical-validation benchmark or a guaranteed credit saving. OpenAI describes Sol as suitable for difficult research and High as suitable for work involving multiple sources; it describes Terra as an everyday generalist. See [official model guidance](https://learn.chatgpt.com/docs/models). Model choice does not replace source verification. API prices are not Codex subscription usage rates.

The old workflow was too open-ended: a page read or scoped edit could look like a completed review, access problems prompted destructive shortening, and continuation drifted through low-priority pages. A scheduled prompt also named a checkpoint at a nonexistent root path. Concurrent writers produced unreviewed drafts. These are workflow failures; changing the model alone will not fix them.

## One writer and a small assignment

1. Read the current paragraphs of `AGENTS.md`, `RESUME-HERE.md`, this file and [content-preservation-policy.md](content-preservation-policy.md). Do not load the full chat or historical changelog.
2. Check [audit-control.json](audit-control.json), current task identity and Git status. Only the named task owns site edits. Another worker may return a separately named read-only report. Do not start a competing writer or silently take over another task's draft.
3. Select **one shared-source cluster of 2–4 pages**, or one unusually dense page. Resolve its source gaps or record an exact externally blocked source/claim and next access action before choosing another cluster. A blocked page remains unfinished, but need not stall independent pages. A turn may stop with an exact source/claim next action; it must not claim completion merely because it ran out of context.
4. Use the existing ledger and prior source reports as the index. Reuse unchanged, adequately documented source reads by attribution. Reopen the source only for unrecorded coverage, a changed version, contradictions or consequential spot checks. A saved summary that says only “reviewed” is insufficient proof of full-source reading.

## Order of work

Resolve the two saved glans-page draft proposals with actual claim-level sources before publishing them. Then prioritize the OAB pilot's unresolved items and female SUI/MUI, their medication/procedure companions and shared evidence. Continue POP, male UI, BPH/LUTS, male stricture, recurrent UTI and ED, then safety-sensitive pharmacology/NLUTD, remaining operations/devices/anatomy and all remaining pages. This is a sequencing rule, not permission to omit rare topics, History or resources.

Use the page ledger's `reviewRecords` and exact file hashes, not `status: updated`, to select unfinished work. The 698 recorded current-page reads and 670 scoped updates in the recovery snapshot do **not** mean those pages' sources are fully adjudicated. A page already marked checked can still contain unresolved source packages. The saved snapshot precedes the two unverified glans drafts; do not count those draft hashes as reviewed.

## Finish a batch in six steps

1. **Read and map.** Read the complete current MDX, references, relevant imported clinical data and linked figure content. Group claims by evaluation, treatment selection, numerical outcomes, dosing/device instructions, anatomy/technique and follow-up. Record any genuinely inapplicable group. Each consequential claim needs a source locator; one row may cover closely related claims only when their scope and source match.
2. **Check sources.** Verify guideline/label version and current safety changes; search for consequential newer guidance, large trials and systematic/Cochrane reviews. Read the full accessible source package needed for the claims, including relevant tables, figures and supplements. Record exact coverage. Downloading, metadata and abstracts do not count as full-source reads. Do not recursively read every reference cited by a guideline when it is not needed to verify a site claim.
3. **Handle gaps.** Try the publisher and one legitimate alternative. Record missing full text/supplement and the exact dependent claim, then progress other independent claims. Preserve useful existing content. Repeated access attempts and generic cautionary rewrites are not progress. An abstract may support what it actually reports but does not close an outstanding full-text task.
4. **Edit narrowly.** Correct the demonstrated error and its affected companions. Preserve manufacturer IFUs/specifications, practical teaching, small-series technical descriptions, references and media in their proper scope. Inspect every removed heading, table, reference and video; document a specific reason. No generic public audit notices or blanket evidence banners.
5. **Review and record.** Save one concise source/change report plus the structured batch record in `reports/2026-09-11/full-site-review/claim-batches/`. Use [the template](audit-batch-template.json). Record final page hashes, individual claim outcomes and exact outstanding work. A fresh review pass checks consequential corrections against the cited source and inspects content preservation. It may be the same Sol worker with a focused review pass; use a separate read-only reviewer when interpretation is disputed. A formatting/schema check never proves clinical correctness.
6. **Validate; publication currently deferred.** Run `python3 reports/2026-09-20/check-audit-batch.py <batch.json>`, regenerate the existing ledger, and review the actual diff. Site changes require lint, typecheck, unit/maintenance tests, build/size/link checks, whitespace checks and relevant visual checks at grouped checkpoints. The user's latest instruction is to continue local page review **without committing, pushing or deploying until they ask to resume publication**. Keep completed local work distinct from hosted content; do not burn another build on a reports-only checkpoint. When publication resumes, combine multiple validated clusters into one larger release, stage only intended files and verify exact-commit CI/Vercel/live content. Reports-only changes need document/data checks, not a new site build.

## What counts as completion

The full audit is complete only when every current documentation page has a final disposition; consequential clinical claims, imported data and relevant figures have traceable source checks; corrections are published and checked; and the previously supplied OpenEvidence survey is reconciled. Pure navigation/resource/History pages get an appropriate nonclinical review, not invented clinical verification. Keep figure and outside-MDX work in the existing inventories as well as their affected page records.

For a page to receive `auditDisposition: complete`, it needs complete current-page reading, an explicit coverage map, no unresolved consequential claims/source packages, a currency check and a passed preservation/source review. `not-clinical` requires an explanation and a content/link review. Partial/blocked records remain unfinished. A fully read guideline does not automatically close all pages that cite it. The batch checker enforces record consistency, not the truth or exhaustiveness of the review.

If inaccessible evidence still prevents completion, report the exact residual list honestly; do not call the whole site clinically cleared or trigger the deferred OpenEvidence phase automatically. A newer model is not proof that existing content is wrong. The deferred list is an editorial opportunity register, not a list of established errors.

## Continuation handoff

At each checkpoint keep only: current cluster, finished claims/source locations, unresolved next source action, intended draft files, checks/publication status and next cluster. Never advance the queue just because a report was written. Keep research downloads outside deployed assets. Preserve the unrelated calendar file. Quarterly evidence maintenance and monthly technical link checks remain unchanged.
