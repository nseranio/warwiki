# WARWIKI — efficient continuation prompt

Paste the text below into a fresh Codex task in the WARWIKI project. Suggested setting: GPT-5.6 Terra, Medium reasoning. This is a workflow recommendation, not a guarantee of a particular token saving or clinical accuracy. Use stronger review for unresolved consequential clinical interpretation; Luna is better suited to clearly specified mechanical changes.

---

Continue WARWIKI in `/Users/joyboy/Documents/WARWIKI/warwiki`. Complete the ongoing whole-site clinical reliability and technical optimization audit while minimizing duplicated work and token use. Implement changes; do not merely propose them.

**Resume efficiently**
- Follow current `AGENTS.md`. Read `reports/2026-09-19/continuation-checkpoint.md`, then the current sections of `RESUME-HERE.md` and the completion criteria in `reports/2026-09-12/completion-plan.md`. Check Git status before editing. Open older reports only when relevant to the selected pages.
- Use the existing page ledger and source records. Do not restart the audit, load the entire conversation/changelog, or reread already-reviewed unchanged sources without a specific reason. Verify page hashes; attribute reused reviews instead of claiming new personal reads.
- Work on a coherent batch of roughly 3–5 related pages, fewer for complex source packages. Start with unfinished hysteropexy, Manchester-Fothergill and barbed-suture work. The entire-site objective remains open after each batch.

**Preserve clinical standards**
- Fully read each selected page, including references and clinical data imported by components. Prioritize major guidelines, large trials, Cochrane reviews, systematic reviews and practice-changing evidence.
- Verify substantive recommendations, numbers, denominators, operative instructions and diagram anatomy against primary sources. For sources requiring full review, actually read the accessible full text, tables, relevant supplements and figures; record exact coverage. Abstracts, downloads, captions and metadata never count as full-source reads.
- Reuse sufficiently detailed existing source audits. Do not recursively read every paper in a review's bibliography just because it is cited; pursue originals needed to check site claims and the existing unresolved-source queue. Preserve outstanding gaps.
- If access fails, make a bounded attempt through a legitimate alternative, log the limitation, and continue independent work. Do not guess missing results or mark unresolved claims verified. Escalate a consequential uncertainty for stronger review while progressing other pages.

**Reduce overhead**
- Use focused searches and bounded, non-truncated reads. Batch independent retrievals. Keep lengthy tool output out of progress updates.
- Default to one worker; delegate only a bounded, non-overlapping task when it saves total work. Do not give multiple workers the same source or automatically reread everything they reviewed. Spot-check consequential findings.
- Keep one concise source/change record per batch: page/hash, claim corrected, source URL/DOI and version, actual read scope, remaining gaps and checks. Reuse the existing ledger; avoid duplicate narrative reports. Save durable research notes under `reports/`, never solely in `/tmp`. Keep PDFs and large downloads outside deployment assets.
- Give brief updates on meaningful findings. Run required checks once after the batch; repeat only after relevant edits or failures.

**Deliver and retain preferences**
- Correct pages and affected companions, citations, figures and links. Preserve ordinary page-last-updated display; never invent clinician sign-off. Update the ledger, changelog and a compact next-step checkpoint.
- For site changes, run lint, typecheck, unit tests, maintenance tests, production build/size checks and whitespace checks; visually inspect changed layouts/figures. Authoring-only reports need appropriate document/link checks, not a fresh site build.
- Standing authorization: commit and push completed validated changes to `main/origin/main`, stage only intended files, and verify exact-commit CI/Vercel/live content when a deployment is expected. Preserve `world-cup-next-week-pacific.ics` and other unrelated work.
- Evidence maintenance stays quarterly; technical link checks monthly. Epic stays paused with `EPIC-ROADMAP.md` available. Clinic/quiz remain removed, History discreet, handouts recoverable but excluded from builds.
- Keep Vercel deployments lean and grouped. Delete obsolete deployments only after checking current production, aliases and a known-good rollback. Local build size is not the account's storage meter. Do not upgrade plans or redeem credits.

Begin the next unfinished batch. At a stopping point, report briefly what changed, what passed, what remains and the exact next action. Never describe a partial batch as a completed whole-site clinical audit.
