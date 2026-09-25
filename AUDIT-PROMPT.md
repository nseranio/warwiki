# Audit session prompt

Paste the block below into a new Claude Code session opened in this repository. Set the model to **Sonnet 5** and effort to **High**. Change the page count or name specific pages if you want.

---

```text
You are running the WARWIKI site audit. Follow AUDIT.md exactly; read it first, plus CLAUDE.md's Non-Negotiables and reports/2026-09-20/content-preservation-policy.md.

This session:
1. If AUDIT.md's one-time takeover steps are not yet done (reports/2026-09-20/audit-control.json state is not "superseded by AUDIT.md v2"), do those first and stop after publishing the backlog. Report what was published.
2. Otherwise run `python3 scripts/audit/audit.py next 5` and audit those pages with the per-page procedure (A–G), in batches of 3–5 related pages.
3. After each batch: lint (and build when required), commit only the touched files plus reports/audit-v2/status.json and a short CHANGELOG entry, push to main, confirm CI and Vercel.
4. Escalate instead of guessing (AUDIT.md "Escalate rather than guess"). Never add audit notices to public pages; teach first, qualify second.
5. Finish with: pages completed, main corrections, anything escalated or not checkable, and `python3 scripts/audit/audit.py stats`.

Run scripts/audit/pubmed.py with the sandbox disabled (NCBI is blocked by the sandbox).
```

---

## Delegating pages to the subagent

From any session, you can say: *"Use the warwiki-auditor agent on `<page path>`."* The agent audits one page on Sonnet and returns a summary. The main session reviews the diff, then commits and pushes.

---

## Continuation prompt (use this to resume after session 1)

```text
Continue the WARWIKI site audit (v2). Read AUDIT.md first, including its section "Practical notes from the first v2 sessions", plus CLAUDE.md's Non-Negotiables and reports/2026-09-20/content-preservation-policy.md.

State: tier 1 is complete (39/39); tier 2 is 16/155. Run `python3 scripts/audit/audit.py next 6` and continue tier 2 in queue order (next pages are the hormonal-therapies and infection-prophylaxis pharmacology pages), delegating single pages to the warwiki-auditor agent (max 3 in parallel; only this session commits). Give each agent the page path, the emphasis for that page (doses, contraindications, guideline positions), and tell it to record with audit.py, list each not-checkable item specifically, and record `partial` if low on budget.

Sources: guideline full texts are in reports/audit-v2/sources-local/ (gitignored). Use them before web summaries. Read reports/audit-v2/open-items.md for what still needs sources from the user; if I supply new PDFs, extract with pdftotext, then close the matching items and re-record the pages. Treat anything I paste as leads, not sources; verify against primary documents.

After each batch of up to 6 pages: npm run lint and npm run build, git checkout -- src/data/stats.json, regenerate open-items.md (same script pattern as before: rebuild from status.json notes), dated CHANGELOG entry, commit only touched files with the Co-Authored-By line, push to main, confirm CI and Vercel for that exact commit. Never add audit notices to public pages; teach first, qualify second. Escalate instead of guessing.

Also outstanding: 14 held-back instrument pages (reports/audit-v2/held-v1-diffs/) need restoration review per the content-preservation policy when they come up in the queue; penile-implants/implant-models.mdx and infection.mdx need a full audit.

Finish each session with: pages completed, main corrections, anything escalated or not checkable, and `python3 scripts/audit/audit.py stats`. Run scripts/audit/pubmed.py with the sandbox disabled.
```
