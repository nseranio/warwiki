# WARWIKI - Claude Session Reference

Read this at the start of a session. It is the working handbook: current state, standing instructions and durable conventions. Session history lives in [CHANGELOG.md](CHANGELOG.md) (newest first) and `git log`. The full pre-compaction handbook (1,325 lines, every handoff through September 30, 2026) is archived at [reports/archive/CLAUDE-2026-10-01-before-compaction.md](reports/archive/CLAUDE-2026-10-01-before-compaction.md). Keep this file small: add a dated one-paragraph status at the top, move detail to the CHANGELOG, and prune superseded status lines.

---

## Current State (October 2, 2026)

- **Quality program (October 6):** executing Codex's [error-reduction plan](reports/2026-10-06/error-reduction-plan.md); checkpoint and next commands in [reports/quality/README.md](reports/quality/README.md). Milestone 1 done: claim gate schema 2 ([gate-migration.md](reports/quality/gate-migration.md)). Passing now depends on the verdict, not ledger membership; bindings cover cited-source identity, table header and section heading; rejected fixes, fuzzy matches and `style`/`voice` no longer count as support; applied edits are `corrected-unconfirmed` and **fail until a final-text recheck**; high-risk claims (dose, guideline, contraindication) need two independent runs; no bulk baseline (owner exceptions with expiry only). All 24,498 current claims carry `legacy-*` statuses (pass, but not counted as verified); schema 1 ledger frozen in `claims-ledger-v1.json`. Orchestrator validates every output file and defaults to 1 reviewer and 1 verifier. Next: detector calibration, legacy high-risk rechecks, 60-page probability sample.
- **October 2 summary:** History pages re-audited (sources, voice, links); Library dropdown now Video Library · Resources · History (Journal Club lives in Resources). Surgical Genealogy: 236 profiles under written criteria (see Surgeon Profiles note below), training cards, photos, countries, deaths from verified obituaries, verified signature work listed under Contributions (no "Known for" heading: user judged it too strong a claim). 85 signature citations added to 59 clinical pages (`reports/2026-10-02/signature-work-gaps.md`). New pages from user-supplied OpenEvidence answers (used as leads, every claim and reference re-verified): Mainz Pouch III, MLD Phalloplasty, Ketamine Cystitis, PGAD/GPD, Damage Control in GU Trauma. 25 open-access figures added from newly cited papers.
- **Next (user's queue):** the October 2–3 OpenEvidence batch is complete (glans augmentation page, postpartum perineal clinic section, GAS outcome-registries section, MLD and ketamine merges, historical needle suspensions page). Paywalled sources are on hold until the user has work access (list: "To gather through work access" at the top of `reports/audit-v2/needed-from-user.md`; received and checked October 3: Alahwany 2019, ACOG PB 198, and PB 214, 213, 155, 218 and CO 795 read on Scribd in the browser, gated pages skipped); they will arrive into `reports/audit-v2/sources-local/pdfs-2026-10-03/`; when they arrive, restore the figures dropped as unverifiable (glans HA: Alahwany done October 3 from the full text; MLD donor-site and second-stage counts; ACOG/SOGC rows of the perineal clinic table). Prompts, answers (`oe-NN-*.md`) and the page brief: `reports/surgical-genealogy/urps-work/newpages/` (off-git).
- **Journal videos (October 3):** 100 open-access operative videos (Urology Video Journal 88, IBJU 5, FVVO 7) embedded on 82 pages after independent Claude/Codex matching; every MP4 HEAD- and codec-checked (H.264). `VideoCards` gained Vimeo and article-link support.
- **Article listener (October 3):** one narrator, Marin on `gpt-4o-mini-tts` with a fixed "clinical lecturer" brief in `api/tts.ts` (user's choice by ear over Cedar and tts-1 Shimmer); no voice or quality picker. Old tts-1 audio is still in Vercel Blob (`tts/audio/`) and can be deleted.
- **Site improvements (October 2–3):** batches 1–3 done: homepage hydration fix; synonym cleanup (uploaded to Algolia October 3); AGENTS.md/RESUME-HERE.md reduced to pointers; Playwright suite in CI and **blocking** (about 13 minutes; includes a two-timezone hydration check and shareable-filter-URL tests); handout `sourcePages` + `npm run lint:handouts` (27 handouts flagged for recheck after October 2 page changes); quarterly full external-link check; shareable URL state for atlas databases and the Video Library; non-blocking Google Fonts with a metric-matched Inter fallback (CLS fix); audit ledger closes claims only by explicit verdict (`reports/audit-v2/verdicts.json`, 112 former keyword closures back as candidates). Speed baseline in `reports/2026-10-03/lighthouse/`; re-measure the live site after deploy and fill in its "After" table. Remaining speed work if wanted: mobile LCP (render delay, unused JS) and accessibility items (contrast, color-only links, tap targets).

- **Accuracy cleanup finished (October 5, night):** dose check (38/38) and guideline-statement check (89/89) complete: 518 and 443 verified edits. Third residual sample: 0.83 serious accuracy errors per page (95% CI 0.31–1.36), down from 1.57 and 1.37. Cross-page consistency: 18 verified fixes (`reports/audit-v2/sources-local/consistency-2026-10-05/`, brief and runner reusable). Claim-gate baseline rebuilt (2,843 → 13), and those 13 then checked: no baseline claims remain. Results: last section of `reports/2026-10-04/residual-error-sample.md`. `~/.codex/config.toml` still names the rejected `gpt-6.1-sol` (orchestrator pins `gpt-6-sol`). **Reliability pass (late night):** about 1,780 more verified edits covering retraction and correction checks (`scripts/refs/retractions.py`), wrong-citation sweep (`scripts/consistency/citation_targets.py`), open second-review findings, hub (`index.mdx`) pages (now under the claim gate), and a Codex ultra review of the 150 highest-risk pages (1,455 edits). A Claude cross-check of 20 of those pages afterward found 0 high-severity errors. **Next, only on the user's go-ahead:** handouts, SmartPhrases, WARWIKI Anki decks.
- **Batch publishing helpers (October 6):** a Codex review run lives in `reports/audit-v2/sources-local/<run>/`. Steps:
  1. `scripts/review/wait_run.sh <n> <minutes> <run>` waits for n more pages.
  2. `scripts/review/prep_sheet.sh <run>` runs `apply.py list`, writes a readable sheet to `$SHEET_DIR/<run>.txt` and resolves new DOIs on Crossref (a FAIL is often a 429; recheck at doi.org).
  3. Claude reads the sheet; veto via `applied.json`.
  4. `REVIEW_WORK=<dir> scripts/review/cycle.sh` must end LINT=0 BUILD=0.
  5. `scripts/review/publish_batch.sh <run> "<message>"` runs the gate, lint-log and build-log checks, stages only touched files plus the ledger, commits and pushes.

  `scripts/review/risk_order.py` ranks pages by error risk.

  Claude-reviewer runs work by writing findings plus a `state.json` with pages set to `reviewed`, then launching `orchestrate.py` on that directory to verify. Nothing is in flight (October 6); the next measurement, if wanted, is a fourth random residual sample.
- **Disputed claims and voice (October 5):** the 230 undecided claims were settled (baseline now 4); 1,336 audit-voice sentences rewritten as direct statements (`scripts/review/voice-brief.md`; run with `orchestrate.py --claims --brief voice --verify-brief voice-verify`). New writing should state what the evidence shows and its limits, not rebut unstated claims ("should not be read as", "is not a universal rule").
- **Claim gate (October 5; schema 2 since October 6):** `npm run lint:claims` (in lint and CI) fails on any new or edited number, dose, guideline or absolute statement without a supporting verdict in `reports/audit-v2/claims-ledger.json`. Before committing new or rewritten content run `python3 scripts/review/gate.py pending <files> --out <new dir>`, then `scripts/review/orchestrate.py --work <dir> --claims --reviewers 1 --verifiers 1`, then `gate.py record <dir>`, then `REVIEW_WORK=<dir> python3 scripts/review/apply.py list` (apply only touches edits on that review sheet), review, `cycle.sh`, then a final-text recheck of the touched files (a second `pending` run). Baseline empty in effect since October 5 (`claims-baseline.json`); open lists in `reports/2026-10-04/sources-needed.md` and `claims-needing-decision.md`. Vercel deploys even if CI fails unless the user enables deployment checks.
- **Number check and residual samples (October 4, evening):** every cited statistic (11,788) checked against its source; 2,745 fixes on 710 pages. Residual serious errors 1.57 → 1.37 per page (numeric errors about 1.3 → 0.6). Rerun: `python3 scripts/review/claims.py extract --sections ...`, then `orchestrate.py --work <dir> --claims`, then `REVIEW_WORK=<dir> apply.py list` and `cycle.sh`. Results: `reports/2026-10-04/residual-error-sample.md`.
- **Full-site second review (October 4):** all 1,036 content pages reviewed by Codex reviewers plus adversarial Codex verifiers, Claude-checked and published in 19 batches (5,086 edits on 962 pages). Results and method: `reports/2026-10-04/full-site-second-review.md`; 136 open leads in `second-review-open-findings.md`. Rerun with `scripts/review/orchestrate.py --effort high --tier default`, then `apply.py list`, review the sheet, `cycle.sh`.
- **Site consistency (October 3):** references, people facts, shared-source numbers and voice checked site-wide with scripts plus Codex triage (`reports/2026-10-03/site-consistency.md`); few real errors, all fixed. History and profile cross-links on 81 pages (`reports/2026-10-03/history-crosslinks.md`). Open: the At a Glance block on posterior urethral stenosis (user decision), profile voice outliers, DOI discovery for about 1,450 plain-text references.

## Earlier state (October 1, 2026)

- **Content:** about 1,205 MDX pages. Textbook mining (25 books plus Campbell-Walsh-Wein 13th ed) is fully incorporated (method and ledgers: [reports/textbook-mining/consolidation/](reports/textbook-mining/consolidation/)). The audit queue (AUDIT.md, tiers 1 to 4) is complete; **the user does not want further auditing for now** (October 1). Open audit claims and sources still wanted are recorded in [reports/audit-v2/needed-from-user.md](reports/audit-v2/needed-from-user.md) and `reports/audit-v2/ledger.md`; use them only when the user supplies a source or asks.
- **Clinical templates:** per-page "Clinical toolkit" cards were scrapped September 30 (too busy), and a searchable Resources template corpus built October 1 was reverted the same day at the user's request (`966a126d`). Do not rebuild a public template toolkit unless the user asks. History: [reports/clinical-toolkit/](reports/clinical-toolkit/).
- **Patient handouts:** the 80 English sheets were rechecked against the post-mining pages and **published October 1** ("Reviewed October 2026" footer). English publishes by default (`WARWIKI_INCLUDE_HANDOUTS=false` pauses it). Translations (10 languages) carry June text and stay out of the build and the gallery until retranslated from the final English (`WARWIKI_INCLUDE_HANDOUT_TRANSLATIONS=true` restores them; they total about 380 MB against the 200 MB build cap). Masters live off-repo (`~/Desktop/WARWIKI-handouts/`; pre-recheck backup in `_backups/`).
- **Evidence cadence:** quarterly (March, June, September, December), aligned with the user's OpenEvidence surveys. The review step relies on the local Codex CLI, which works again (October 2): its default model is now `gpt-6-sol` (changed October 3 at the user's request; `gpt-6.1-sol` is rejected for the ChatGPT login). Run `codex exec` with stdin closed (`< /dev/null`) from background shells.
- **External links:** the monthly workflow (`.github/workflows/external-links.yml`) samples 200 URLs and uploads a report artifact; it no longer opens issues. The 92 old automated "External link rot" issues were triaged and closed October 1 (most were a fixed parenthesis-parsing bug, timeouts or 405s).
- **Surgical Genealogy (October 1, night):** GURS (Lee Zhao's tree) and URPS (WARWIKI's own research, 1,110 people) trees are live; 146 profiles (GURS top-105 cited plus founders; URPS citation score ≥ 10 plus founders). URPS working data and Codex batches live off-git in `reports/surgical-genealogy/urps-work/` (`merge.py` → `urps-tree.json` → `node scripts/genealogy/build-urps-lineage.js`). Profile MDX must import `@site/src/data/surgeon-profiles/<id>.json` as `profile` (generated in prebuild) so pages do not bundle the whole lineage. **Profile criteria (October 2):** in-scope surgeon plus any of: WARWIKI citations (GURS top 105, URPS score ≥ 10), school founder, president of GURS/SUFU/AUGS/IUGA or ICS chair/general secretary, a core-society lifetime award (AUGS, IUGA, SUFU, GURS, ICS), or ≥ 10 fellows trained; supporting lists (SGS, SIU, SMSNA, AUA Guiteras/HHY) only for in-scope reconstructive surgeons; every profile needs a verifiable bio. Countries are the career base (sourced), never inferred from names. Profiles open with a "Training and career" card (`<div className="sp-facts">` + bold-labeled bullets); photos are hotlinked URLs in `surgeons.ts`; the genealogy shows profiled surgeons plus connecting mentors (`PROFILES_ONLY` in `lineage.ts`); schools are `DYNASTIES` in `surgeons.ts`, and a school inside another is linked from the parent tab, not repeated.
- **Latest (October 1, late):** user-suggested Urology Video Journal papers added to Single-Port Robotics, Bladder Diverticulectomy and O'Conor VVF Repair (PATIO), each with its video (`6e784c70`).
- **Paused:** Epic templates ([EPIC-ROADMAP.md](EPIC-ROADMAP.md)); do not start them unless asked. Restoring the OpenAI article voice waits on the user.
- **Still wanted from the user:** ACOG documents (largest block of open claims), Revi surgical technique guide pp 6-8 (MRI), and the other items in `needed-from-user.md`.
- **Off-repo personal work (never commit):** SmartPhrase library, ABU case log / practice-log kit, social graphics (`~/Desktop/WARWIKI-social/`), textbook-mining findings, handout masters and fonts.

## Standing Instructions

- **Publishing:** commit completed work and push to `main` (Vercel deploys from `main`), unless the user says otherwise. In cloud sessions the harness may assign a `claude/...` branch; the user has said to push straight to `main` (October 1).
- **Preserve useful content** (September 20 policy): manufacturer IFUs, anatomy texts, technical papers, operative videos and established teaching are valid sources for the claims they support. Correct specific errors; never blank substantive pages or replace them with audit notices. See [content-preservation-policy.md](reports/2026-09-20/content-preservation-policy.md).
- **Provenance:** keep `evidenceUpdated` / `evidenceNote` (internal) distinct from clinician `lastReviewed` / `reviewer`. Never manufacture clinical sign-off from a Git timestamp or automated edit.
- **Voice:** [STYLE.md](STYLE.md) governs typography, word choice, sentence structure and evidence wording for all new content.
- **Design (September 27):** headings are Inter; no "At a glance" blocks; section accents via `--wk-accent*` tokens and `html[data-section]`; homepage Try chips are desktop-only; **do not create new surgical schematics** (the user judged them unreliable; 20 remain after 29 were deleted September 27 and 3 replaced by published open-access figures October 1).
- **No standalone pediatric pages** (September 30). Pediatric-primary topics appear only as adult-facing context on lifelong-care pages.
- **Scope of patient data:** personal operative notes, case logs and any patient-specific data never enter this public repository.

## Lessons That Keep Recurring

- **DOIs typed from memory are often wrong.** Resolve every new DOI (local `scripts/audit/pubmed.py` / `doicheck.py` pattern) before committing. Textbook chapter citations drift: check editors, edition, chapter and year against the book's front matter (`reports/textbook-mining/consolidation/BOOKS.md`).
- **Cloud sessions:** the egress proxy blocks PubMed/eutils, doi.org, Crossref, Europe PMC and OpenAlex; WebSearch still works. Verify references through search results that show the DOI or PMID, and flag them for a local DOI check.
- **Nested helper agents trip the account usage limit.** One agent per batch, no helpers; on interruption, the files on disk are the checkpoint (reconcile and rerun only what is missing).
- **Always run `npm run build` after editing MDX that contains raw HTML/JSX.** `npm run lint` does not catch unclosed `<sup>` or bad JSX; only the build does. Also: `{#custom-id}` heading anchors break MDX; use `<a id="..."></a>` above the heading.
- **`npm run build` rewrites `src/data/stats.json`** (timestamp). Run `git checkout -- src/data/stats.json` before committing unless counts changed meaningfully.
- **Parallel subagents must not build concurrently** (they race `build/`); the orchestrator builds once afterward.
- **Check the existing reference list for duplicates** before appending refs from a source dump; reconcile and renumber.
- **Verify source-dump papers even when a DOI is given** (same author and year is not the same study).

---

## Non-Negotiables

Before writing or modifying an article:

1. **Scope:** primary topics must fit reconstructive urology, functional urology or urogynecology. Out of scope as primary topics: endourology for stones and primary urologic oncology. Reconstructive consequences (radiation injury, post-prostatectomy stricture, diversion complications, urethrectomy as a determinant of diversion) are in scope.
2. **Voice:** write for reconstructive surgeons and urogynecologists, not patients or general-medicine readers. Keep operative relevance, anatomy, decision points, complications and outcomes, with specific rates and evidence quality.
3. **Citations:** real published references only. Inline `<sup>[[N]](#refN)</sup>` with `<a id="refN"></a>N. ...` anchors after a `---` separator under `## References`; contiguous numbering; DOI links when available. GAS pages use footnotes (`[^N]`). Optionally add a stable parallel anchor `<a id="ref-author-year-journal"></a>` for new refs.
4. **Cross-link instead of duplicating.** One authoritative home per concept; condition pages link to management, technique pages own operative detail.
5. **Hidden pages** (`sidebar_class_name: sidebar-hidden-item` or a hidden `_category_.json`) must be reachable by an explicit database row or inline prose link from a visible hub, so orphan lint passes and readers can find them.

Before committing:

1. `npm run lint` (scope, citations, orphans, internal links, figure captions).
2. `npm run status` if stubs were added or filled.
3. `npm run typecheck` and `npm run build` if articles, links, routes, MDX or React changed.
4. `git diff --check`.

## Commands

| Task | Command |
|---|---|
| Dev server | `npm start` |
| Production build | `npm run build` |
| TypeScript | `npm run typecheck` |
| Full lint | `npm run lint` |
| Individual lints | `npm run lint:scope` / `lint:citations` / `lint:orphans` / `lint:links` / `lint:figures` |
| Reference-density advisory | `npm run lint:density` |
| Freshness advisory | `npm run lint:freshness` |
| External links | `npm run lint:external-links` or `node scripts/check-external-links.js --sample 200` (needs open network) |
| Stub tracker | `npm run status` |
| Unit tests | `npx vitest run` |
| Video registry sync | `npm run videos:sync` (needs `YT_API_KEY` in `.env`) |
| Video candidates for a page | `node scripts/suggest-page-videos.js <page.mdx>` (needs `src/data/videos.generated.json` from a sync) |
| Voice pass 1 | `scripts/voice/pass1.py` (see `scripts/voice/`) |
| Audit tooling | `scripts/audit/audit.py`, `scripts/audit/pubmed.py`, `scripts/audit/ledger.py` |
| Site consistency (quarterly, needs network for the first) | `npm run refs:registry` (DOIs vs Crossref), `npm run consistency:people` (names, lifespans, attribution years across pages), `npm run consistency:same-source` (numbers attributed to one paper on several pages), `npm run scorecard` (voice, structure, Pass 1 coverage). Outputs are triage lists for Codex, then verify before editing; method in `reports/2026-10-03/site-consistency.md` |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, Vitest and build on every push and PR. Vercel runs `npm run build` including `postbuild`; preserve those hooks. Output is about 150 MB (October 1); the cap is 200 MB.

---

## Project Shape

Docusaurus v3 medical reference wiki for functional urology, genitourinary reconstruction and urogynecology. Audience: residents, fellows, reconstructive surgeons and urogynecologists.

| Directory | URL |
|---|---|
| `docs/01-foundations/` | `/docs/foundations` |
| `docs/02-evaluation/` | `/docs/evaluation` |
| `docs/03-clinical-conditions/` | `/docs/clinical-conditions` |
| `docs/04-surgical-techniques/` | `/docs/surgical-techniques` (Treatment Atlas) |
| `docs/05-special-populations/` | `/docs/special-populations` |
| `docs/08-resources/journal-club.mdx` | `/docs/journal-club` (Landmark Trials database; moved into Resources October 1, URL kept via `slug:`) |
| `docs/07-roots/` | `/docs/roots` (History & Lineage) |
| `docs/08-resources/` | `/docs/resources` |

URL rules: numeric prefixes are stripped from top-level dirs only (`03-clinical-conditions` → `clinical-conditions`); alphanumeric subsection prefixes stay (`04a-urethral-reconstruction`); a same-name file/dir collapses (`oral-cavity/oral-cavity.mdx` → `.../oral-cavity`); explicit `slug:` frontmatter wins (moved pages keep their old URL through `slug:`). Vercel uses `cleanUrls: true`, `trailingSlash: false`.

Key files:

| File | Purpose |
|---|---|
| `docusaurus.config.ts` | Site config, navbar, Algolia, metadata |
| `sidebars.ts` | Sidebar wiring |
| `src/css/custom.css` | Custom styling and reusable classes (dark-mode variants required) |
| `src/components/GenericDatabase.tsx` | Searchable/filterable atlas databases |
| `src/components/VideoCards.tsx` | Lazy YouTube (and direct-MP4) card grid |
| `src/components/VideoLibrary.tsx`, `src/pages/video-library.tsx`, `src/data/videos.ts` | Video Library (generated, chunked registry) |
| `src/components/LandmarkTrials.tsx`, `src/data/trials.ts` | Journal Club trials database |
| `src/components/PatientHandouts.tsx`, `src/data/handouts.ts` | Handout gallery (gated by `WARWIKI_INCLUDE_HANDOUTS`) |
| `src/components/SurgeonsExplorer.tsx`, `src/data/surgeons.ts` | GURS/URPS lineage explorer |
| `scripts/check-*.js` | Lint checks |
| `docs/_STATUS.md` | Stub tracker (generated) |
| `algolia-synonyms.json` | Search synonyms (upload in the Algolia dashboard) |

Navbar: Foundations · Evaluation · Clinical Conditions · Treatment Atlas · Special Populations · Library dropdown (Video Library, Journal Club, Resources) on the left; Search, About and GitHub on the right. Homepage title links to `/docs/foundations`; tagline "Reconstruction, codified."; search pill "Where should we start?". Brand blue `#185FA5`.

---

## Article Pattern

```mdx
---
title: Short Sidebar Title
sidebar_position: N
---

# Full Article Title

Opening paragraph with reconstructive relevance and an early citation.<sup>[[1]](#ref1)</sup>

---

## Epidemiology
## Etiology / Pathophysiology
## Clinical Presentation / Diagnosis
## Classification / Staging
## Management
## Complications
## Outcomes / Follow-Up
## See Also
## Videos            (optional; immediately before References)
## References

<a id="ref1"></a>1. Last FM, et al. "Article Title." *Journal.* Year;Volume(Issue):Pages. doi:[10.xxxx/...](https://doi.org/10.xxxx/...)
```

MDX gotchas: escape prose angle brackets (`&lt;35`); escape `&` in JSX attributes (`&amp;`); no `$$` LaTeX; raw HTML must be valid JSX; landing pages use `hide_title: true` (which also suppresses the TTS listener).

Source-dump cleanup (chatbot-assisted drafts): strip trailing "Would you like..." prompts, `undefined` figure captions and placeholder figures without embed rights, external lay-source links, and stray refs from other pages; rebuild mashed tables; repair truncated values (`p [N]`, "BMI [N]"); convert bracket citations; confirm every reference supports its claim.

## Atlas, Database And Page Conventions

- **Landing page is the database.** Treatment Atlas sections lead with a short "General Principles" block and a `GenericDatabase`; named technique pages hang off database rows. Row names are bare procedure names (optional acronym), no indications or evidence claims. Database `slug:` entries count as inbound links for orphan lint.
- **Restorative databases only.** Destructive or complication-management procedures (urethrectomy, urethrolysis) live in the atlas section but stay out of the treatment databases.
- **Consolidate near-identical variants** (80%+ shared content) onto one page with anchor routing from index rows (robotic needle drivers, vessel sealers, cavernotomes); add Vercel redirects for retired slugs. Genuinely distinct peers stay separate.
- **Split condition from technique** when a condition has a substantial dedicated operation (urethral stricture ↔ urethroplasty family; RPF ↔ ureterolysis).
- **Spanning topics:** one full page plus short cross-linked notes elsewhere, never duplicated (drain-and-retain; female AUS).
- **Hub → dedicated page:** lead the hub subsection with `> See the dedicated [X] page ...` and keep the hub copy a short orientation.
- **Duplicate titles** across sections get a parenthetical suffix only when they actually collide (e.g. "Artificial Urinary Sphincter (Device)" vs "(Procedure)"); URLs unchanged.
- **Index pages:** every section has `index.mdx` with `hide_title: true`. Top-level landings use `section-stack` (`section-stack-title section-stack-link` + `section-stack-desc`); deeper indexes may use `toc-list` / `toc-chips`.
- **Cosmetic energy devices:** distinguish surgical cutting-tool use from nonsurgical "rejuvenation" marketing and FDA warnings. Male cosmetic database dropped its notes column (every row has a page); the female database keeps notes until every row does.
- **Instruments:** house template is design → RU/urogyn uses → comparison table → technique pearls → safety → history → cross-links → references; index "use" column ≈ 10-15 words.

## Media

- **Videos:** up to 4 genuinely on-topic videos per page (user, October 3), `## Videos` immediately before `## References`, via `VideoCards` (`{ id, title, subtitle }` for YouTube; `sourceUrl` + `sourceType: 'mp4' | 'vimeo'` and optional `articleUrl` (DOI) for journal videos). Only embeddable videos: skip link-card-only sources unless a video is exceptional (user, October 3). Open-access journal sources: Urology Video Journal (`ars.els-cdn.com` MP4s), Int Braz J Urol 2025+ (SciELO MP4s), Facts Views Vis ObGyn (YouTube/Vimeo); IUJ (Springer consent-gated) and LWW journals do not embed ([reports/2026-10-03/video-journal-candidates.md](reports/2026-10-03/video-journal-candidates.md)). Workflow: `npm run videos:sync` → `node scripts/suggest-page-videos.js` → curate by hand (the matcher is loose; a wrong video is worse than none) → clean titles via YouTube oEmbed. The Video Library is the @warwikihq channel mirror only; outside videos go on pages as external link cards. Domain-restricted Vimeo (oEmbed `domain_status_code: 403`, e.g. SUFU/ISSM) → external `web-card--video` link, not an iframe. Elsevier video-journal supplements (e.g. Urology Video Journal) embed as direct MP4s from `https://ars.els-cdn.com/content/image/1-s2.0-<PII>-mmc1.mp4` via `VideoCards` `sourceUrl` (ScienceDirect itself blocks automated fetches; ask the user for the PDF).
- **Open-access figures from cited papers (October 1):** CC BY and CC BY-NC figures may be reused with credit, in `static/img/figures/<page>-<author>-<year>-<fig>.jpg`, caption ending "From Author X, et al. Journal. Year;Vol:Pages, Fig. N (CC BY 4.0)." View the figure first; skip any with its own credit line (reprinted, adapted, courtesy, in-image ©), an identifiable patient, or genital photographs of children. Save at most 1400 px, JPEG quality ~74 (postbuild drops the unused static copies Docusaurus makes of Markdown images; the hashed copy in build/assets/images is the one served). Candidate list: [reports/open-access-figures/](reports/open-access-figures/).
- **Figures:** `![alt](/img/...)`, then a **blank line**, then an italic caption (enforced by `npm run lint:figures`). Public-domain/CC anatomy plates live in `static/img/anatomy/` (verify plate content; filenames mislead). Existing schematics are diagrams-as-code in `scripts/diagrams/*.js` → `static/img/diagrams/*.svg` (edit = rerun the generator), but do not create new ones. Never schematize radiograph/CT/MRI appearances. Keep explanatory prose in the caption, not inside a downscaled figure.
- **Handouts pipeline (off-repo masters):** HTML → headless Chrome PDF + JPEG/WebP preview → `static/handouts/<slug>[.<lang>].pdf` and `static/img/handouts/`; add the entry or language code in `src/data/handouts.ts` (`node scripts/add-lang.js <code> <slugs>`). Run the overflow gate (`pageOvf` and `colsOvf` must be 0) before rendering. CJK/Devanagari/Arabic need embedded web fonts and `--virtual-time-budget`; Arabic needs `dir="rtl"`. Full detail in the archived handbook and CHANGELOG (June 10-16, September 29).

## Surgeon Profiles

Profiles live at `docs/07-roots/surgeons/{a-g|h-r|s-z}/{name}.mdx` (hidden category, reached through `docs/07-roots/surgical-lineage.mdx` / `SurgeonsExplorer`). Link with `s.path`, not `s.id`. Surgeon profiles are out of the audit queue by user decision. Only featured surgeons have pages (top 105 by WARWIKI citations plus school founders, October 1); others keep lineage data in `src/data/surgeons.ts` with no `path`. Each profile MDX imports `src/data/surgeon-citations/<id>.json` (generated in prebuild). The GURS lineage merges `src/data/gurs-lineage.generated.json` (Lee Zhao's tree, used with permission; rebuild with `scripts/genealogy/build-lineage.js`) via `src/data/lineage.ts`.
