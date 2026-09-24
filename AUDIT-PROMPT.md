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
