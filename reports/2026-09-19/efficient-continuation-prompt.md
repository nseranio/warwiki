# WARWIKI — efficient continuation prompt

**Updated September 20, 2026: GPT-5.6 Sol / High.** This replaces the Terra / Medium lead recommendation. Use the existing **Continue WARWIKI audit** task when possible; avoid two tasks editing the same checkout. A fresh task must deliberately receive the writer assignment in the control file first.

---

Continue the existing WARWIKI audit in `/Users/joyboy/Documents/WARWIKI/warwiki` with **GPT-5.6 Sol / High**. Complete the audit before starting new OpenEvidence pulls. Record later refresh candidates, especially SUI/OAB, in `reports/2026-09-20/open-evidence-refresh-queue.md`. Epic stays paused.

Read only the current instructions in `AGENTS.md`, `RESUME-HERE.md`, `reports/2026-09-20/audit-control.json` `reports/2026-09-20/audit-workflow.md` and `reports/2026-09-20/content-preservation-policy.md`. Check Git status and writer ownership. Do not load the old conversation or full changelog. Follow the control file's exact next action, using existing page hashes/source records and the completed OAB pilot. Preserve the unrelated calendar file and any other task's drafts.

Work on **one coherent 2–4-page cluster** (one page if dense). Fully read its MDX, imported clinical data and relevant figures. Map consequential claims to exact source locations; check guideline/label currency and high-impact newer evidence. Actually read the required primary text, tables, figures and supplements. Record what was read, what is reused and what remains inaccessible. A page read, an abstract, metadata or downloaded PDF is not full-source review. Reuse adequately documented unchanged source reviews with attribution instead of restarting them.

Preserve useful manufacturer IFUs, specifications, anatomy, operative teaching, small-series technical descriptions, references and media. Match the source type to the claim. Lack of an RCT or unfinished rereview never justifies emptying a page. Correct demonstrated errors narrowly; keep gaps internal and keep ordinary page-last-updated display. No Clinic/quiz, public audit notices or manufactured clinician sign-off.

Use one source/change report and a structured record per batch, following `reports/2026-09-20/audit-batch-template.json`. Save records in `reports/2026-09-11/full-site-review/claim-batches/`; run `python3 reports/2026-09-20/check-audit-batch.py <record>` and regenerate the existing ledger. Claims with unresolved sources remain partial/blocked, even on previously “updated” pages. Apply the focused source/diff review gate in the workflow before publication. Keep research downloads outside deployment assets.

One writer; delegate only a bounded non-overlapping read-only task when it saves work. Terra/Medium is for specified mechanical support, not unsupervised clinical decisions. No automatic Astra/Ultra escalation. If a difficult consequential question needs stronger review, isolate it and continue other independent claims. After a bounded failed source-access attempt, save the exact gap rather than repeating requests or removing useful content.

For site changes run lint, typecheck, unit/maintenance tests, build/size/link checks, whitespace checks and relevant visual review once per grouped release. Stage only intended files, commit/push validated work to main/origin/main, and verify exact-commit CI/Vercel/live content. Reports-only changes need document/data checks, not a site build. Do not publish one deployment per paper. No spending, plan upgrades or credit redemption.

After each completed cluster, continue the next cluster in the workflow priority order, preserving the entire-site objective. At a checkpoint save the current cluster, finished claim/source locations, exact unresolved next action, draft paths and validation/publication status. Do not advance merely because a report exists. Do not call a partial batch or successful build a completed clinical audit. Quarterly evidence maintenance and monthly technical link checks remain unchanged.
