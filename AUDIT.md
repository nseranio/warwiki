# WARWIKI Audit — Runbook (v2, September 2026)

This replaces the September 2026 v1 workflow (`reports/2026-09-20/audit-workflow.md`, `audit-control.json`, the page ledger and claim-batch schema). Those files remain as history and as a source of prior checks. Do not update them.

**Goal:** every clinical page teaches correctly, with its consequential claims traceable to real sources. A page is **done** when its sources have been checked and needed corrections are published. It does not need a completion certificate.

---

## Model

| Work | Model | Effort |
|---|---|---|
| Audit sessions (reading pages, checking claims against sources, editing) | **Sonnet 5** | High |
| Mechanical subtasks (reference formatting, link repair, bookkeeping) | Haiku 4.5, or just the scripts below | Default |
| Escalations only (conflicting guidelines, disputed interpretation) | Opus 5.5 | High |

The procedure is scripted and bounded, so it does not need the largest model. The limit on quality is source access (abstract versus full text), not model size.

---

## Tools

| Command | Purpose |
|---|---|
| `python3 scripts/audit/audit.py next 5` | Next unfinished pages, in priority order |
| `python3 scripts/audit/audit.py info <page>` | Status, prior v1 reports and word-count change since the pre-audit baseline |
| `python3 scripts/audit/audit.py record <page> <status> "<note>"` | Record status: `checked`, `partial`, `not-clinical` or `escalate` |
| `python3 scripts/audit/audit.py stats` | Progress by tier |
| `python3 scripts/audit/pubmed.py doi <DOI…>` | DOI → PMID, house-style citation and abstract |
| `python3 scripts/audit/pubmed.py pmid <PMID…>` | Citation and abstract |
| `python3 scripts/audit/pubmed.py cite <PMID…>` | Reference lines only |
| `python3 scripts/audit/pubmed.py search "<query>" --since 2023 --max 10` | Currency search |

PubMed (eutils.ncbi.nlm.nih.gov) is blocked by the Claude Code sandbox. Run `pubmed.py` with the sandbox disabled.

**Priority tiers** (in `reports/audit-v2/queue.json`):

1. Core practice pages: female SUI/MUI and slings, OAB and its drugs and procedures, POP, male SUI/AUS, BPH/BOO, stricture and posterior stenosis, recurrent UTI, ED.
2. Remaining clinical conditions and pharmacology.
3. Remaining surgical techniques, evaluation, special populations and principles.
4. Anatomy, instruments, biomaterials, history and resources.

Work in queue order unless the user names pages.

---

## One-time takeover steps (first session only)

1. **Stop the v1 writer.** Confirm with the user that the Codex "Continue WARWIKI audit" thread is stopped. Do not run two writers.
2. **Triage the v1 backlog.** `git status` shows hundreds of uncommitted v1 edits. The v1 lead already validated them with lint, tests and build, but did not publish them. For each directory cluster:
   - Run `git diff --stat`.
   - Spot-check any page whose word count dropped by more than 15% against `git show HEAD:<page>`, using the restoration rule (step C below).
   - Run `npm run lint` and `npm run build`.
   - Commit the cluster, push, and confirm CI and Vercel.

   Leave `world-cup-next-week-pacific.ics` untracked. Commit v1 report files (`reports/2026-09-*`) as history in their own commit.
3. **Update the v1 control files once.** Set `reports/2026-09-20/audit-control.json` `state` to `"superseded by AUDIT.md v2"`. Add one line at the top of `RESUME-HERE.md` pointing to this file.

---

## Per-page procedure

Budget about 20–30 consequential claims per page. If a page has more, check in this order:

1. recommendations and treatment selection;
2. numbers (success, complication and incidence rates, denominators);
3. doses, device specifications and safety warnings;
4. technique claims;
5. background.

**A. Orient.** Run `audit.py info <page>`. Read the whole MDX, including tables, imported data, figures, captions and references. Open any prior v1 report listed. Reuse its recorded source checks rather than repeating them, and do not repeat its blanket removals.

**B. List the consequential claims.** Write them as a working checklist, not on the page. Each entry: the claim, its cited reference number, and a verdict to fill in.

**C. Restoration check.** If `info` shows a large word drop since baseline `e81c5b0d`, run `git show e81c5b0d:<page>` and compare. Restore useful teaching that was removed only for lack of review: operative steps, device specifications, anatomy, practical pearls, figures, videos and references. Verify each restored claim like any other, and correct it if needed. Removal is justified only for a specific demonstrated error. See `reports/2026-09-20/content-preservation-policy.md`.

**D. Check sources.** For each cited reference:

- Resolve it with `pubmed.py doi` or `pmid`, and confirm the paper exists and matches the citation (authors, year, journal). Fabricated or mismatched references must be fixed.
- Check the claim against the abstract. Read PMC or open-access full text when the claim depends on details the abstract does not give.
- Assign a verdict:
  - **Supported**
  - **Corrected:** the number, denominator, population or endpoint was wrong.
  - **Scoped:** the claim was true only for a narrower population. Say so briefly.
  - **Unsupported:** remove or replace that claim only.
  - **Not checkable:** for example, paywalled with no abstract detail. Keep it, and note it in the status record.
- Verify figures from review tables or AI summaries (OpenEvidence) against the primary paper. They are often wrong. Common errors:
  - composite endpoints reported as specific outcomes;
  - "de novo" rates that include men who were already incontinent;
  - mixed-technique series labeled as one technique;
  - short follow-up presented as durable.
- Guidelines: confirm the current version (AUA, EAU, SUFU, AUGS/ACOG, ICS, NICE). Cite the version year.

**E. Currency.** For each core decision on the page (usually 1–3), run one `pubmed.py search` restricted to the last 3 years for guidelines, RCTs and systematic reviews. Add a practice-changing result briefly with its citation. Do not add isolated small studies.

**F. Edit.** Make the smallest edit that fixes the finding.

- **Teach first:** state what the surgeon should know or do, then the limitation in one clause. No audit narration on public pages ("not adjudicated", "pending review", "this page does not establish…").
- Keep all useful content, media and references. Label manufacturer information and individual surgeons' techniques as such.
- Keep the house citation style: `<sup>[[N]](#refN)</sup>`, with `<a id="refN"></a>N. …` in the reference list. GAS pages use footnotes. Keep numbering contiguous. Use the `pubmed.py cite` format for new references.
- MDX rules:
  - Escape `<` and `>` in prose as `&lt;` and `&gt;`.
  - No `{#id}` heading anchors.
  - Leave a blank line between an image and its caption.
  - Place videos immediately before References.
- Voice: write for reconstructive surgeons and urogynecologists. Short sentences. Tables for comparisons.

**G. Record.** Record the page with `audit.py record` and one of:

- `checked`, with a one-line note: sources verified, main corrections, and any claims marked not checkable.
- `partial`: stopped midway; the note says where to resume.
- `not-clinical`: navigation, history or resource pages; check the links and facts that apply.
- `escalate`: a genuine conflict needing the user or Opus. The note states the exact question. Leave the page text unchanged on that point.

---

## Batching, validation and publishing

- **Batch size:** 3–5 related pages. After each batch:
  - Run `npm run lint`.
  - Run `npm run build` if any MDX with JSX/HTML changed, and always at the end of a session. Restore `src/data/stats.json` afterward with `git checkout -- src/data/stats.json`.
  - Run `git diff --check`.
- **Commit only the files you touched,** plus `reports/audit-v2/status.json` and a short dated `CHANGELOG.md` entry naming the pages and main corrections. Never use `git add -A`. Commit to `main` and push. Confirm CI (`gh run list --branch main --limit 1`) and the Vercel status. End commit messages with the Co-Authored-By line required by the session.
- **Parallel work:** a session may delegate single pages to the `warwiki-auditor` subagent (Sonnet). No more than 3 run in parallel, each on different pages. Only the main session commits.
- **Stop rules:** end the session cleanly (record `partial`, commit finished pages) when context runs low. Never leave edited pages uncommitted overnight.

## Escalate rather than guess

Escalate when:

- guidelines conflict;
- a recommendation would change substantially;
- a claim involves dosing or safety and cannot be verified;
- you would otherwise need to delete a major section.

Do not escalate for missing full text alone; record it as not checkable.

## OpenEvidence and new material

User-supplied OpenEvidence summaries or reviews are leads, not sources. Verify every number against the primary study before adding it, and say in the CHANGELOG what was corrected. Quarterly evidence cadence and monthly link checks are unchanged.
