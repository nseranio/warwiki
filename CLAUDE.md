# WARWIKI - Claude Session Reference

Read this at the start of a session. It is the working handbook: current state, open items, workflows, standing instructions and conventions. Session history lives in [CHANGELOG.md](CHANGELOG.md) (newest first) and `git log`. Earlier handbooks are archived in full: [reports/archive/CLAUDE-2026-11-19-before-compaction.md](reports/archive/CLAUDE-2026-11-19-before-compaction.md) (every dated status line October 1 to November 18) and [reports/archive/CLAUDE-2026-10-01-before-compaction.md](reports/archive/CLAUDE-2026-10-01-before-compaction.md) (through September 30). **Keep this file small:** when work finishes, put the detail in the CHANGELOG and change at most one line here; no dated session logs in this file.

---

## Current State (November 19, 2026)

- **Content:** 1,633 MDX files (about 1,110 content pages, 252 Clinical Evidence pages, 271 surgeon profiles). Build output about 211 MB; cap 250 MB (owner, November 12).
- **Menu (November 15, both sites):** Foundations · Clinical Care · Treatment Atlas · Clinical Evidence · Rounds · Library (Video Library, Instruments & Devices, Resources, History). Clinical Care is one sidebar and hub over Evaluation, Conditions, Trauma & Emergencies and Populations & Life Stages; the files stay in `02-evaluation`, `03-clinical-conditions` and `05-special-populations` (URLs, claim bindings and Rounds `source.file` use the paths). New pages there appear on the hub automatically.
- **Accuracy:** last residual sample 0.50 serious errors per page (sample 6, October 9; down from 1.57). Claim gate schema 2 in lint and CI (Workflows below). Site-wide sweeps done: numbers, doses, guidelines, voice (STYLE §11–12), facts only (§12, October 21), point-first coherence (§14, November 13), cost and value (§15, November 15). Start no new site-wide sweep unless the owner asks.
- **Clinical Evidence (`/docs/clinical-evidence`):** 251 trials, one search with a reading pane (November 18; URL `?q=&area=&question=&sort=&result=&trial=`; old `#decision`/`#trial` links land). Data `src/data/clinical-evidence/` (`SCHEMA.md`, `TEMPLATE.md`), pages `docs/06-clinical-evidence/studies/`, `npm run lint:trials`, e2e `tests/e2e/clinical-evidence.spec.ts`. `/docs/journal-club` redirects.
- **Rounds:** public question bank at warwiki.org/rounds (bank 2,984, written-boards style, single best answer). Source and tools live off-repo in `~/Documents/Rounds/bank/` (read its README). `questions.json` and images are served from WHITWIKI (size cap); WARWIKI loads them cross-origin. Republish with `bank/tools/export_site.sh --copy`, which also regenerates `src/data/rounds-pages.json` (practice links on pages with 5+ questions). Anki retired November 15: no deck refreshes; keep `reports/anki-deck/` and `~/Documents/uro-oral-boards-anki` (Rounds reads its `text/`).
- **Trial Finder (November 18):** Resources › Reconstructive & Functional Urology Trial Finder, on WHITWIKI's GU Oncology Trial Finder engine (port UI changes to both): daily ClinicalTrials.gov snapshot committed by Actions to `static/trial-finder/data/`, eight topic pools, scope gate, source-bound cohort rules for OAB, SUI, urethral stricture and prolapse (not clinician reviewed); map tab removed. **The refresh job commits to main daily: rebase before pushing.** Detail in `scripts/clinical-trials/README.md`.
- **Video Library:** @warwikihq mirror with surgeon search (`src/data/video-surgeons.json`; rerun kit `reports/2026-10-24/video-surgeons/` after a sync adds videos). 100 open-access journal videos on 82 pages.
- **Surgeon profiles:** 271 profiles, 252 with photos (sources `src/data/surgeon-photo-sources.json`), 25 narrative biographies, Key Publications from `src/data/surgeon-key-publications/<id>.json`. Didusch Museum pages bar AI use.
- **Handouts:** 97 English handouts in the gallery; translations stay out of the build (June text). Practice editions off-repo; `build_practice_handouts.py` is frozen at 95 (run a scratch copy for new ones). `render-en.sh <slug> gate` hangs; check page count and footer text instead.
- **Article listener:** Marin on `gpt-4o-mini-tts` with a fixed brief in `api/tts.ts`; no voice picker.
- **Sister site:** WHITWIKI (`~/Documents/WHITWIKI/whitwiki`, its own CLAUDE.md). whitwiki.org is blocked on the Jefferson network; use whitwiki.vercel.app there.

## Open Items

- **Owner:** delete old tts-1 audio in Vercel Blob (`scripts/delete-old-tts-audio.mjs`; needs the Blob token, CLI login expired); unshare the four AnkiWeb listings; op-report redesign.
- **Sources still wanted:** the top of [reports/audit-v2/needed-from-user.md](reports/audit-v2/needed-from-user.md) is the single list. Also: Roehrborn 2000 PLESS retention (*Eur Urol* 37:528, Karger, needs library document delivery); InhibiZone 2009 FDA date (Mulcahy 2021); McGuire profile footnote 1 (Didusch source barred); full texts for L.I.F.T., WATER, USC-STAR, RestoreX Joseph 2020, the History page's sildenafil and InhibiZone sentences and the IUGA/ICS Delphi catheter statement; 219 abstract-only trial reports (`reports/2026-11-12/missing-trials/DOWNLOAD-LIST.md`).
- **Held:** BMG harvest-site closure meta-analysis (`reports/2026-10-18/clinical-evidence/held/`; forest-plot values unconfirmed).
- **Paused:** Epic templates ([EPIC-ROADMAP.md](EPIC-ROADMAP.md)); restoring the OpenAI article voice.

## Workflows

**Codex and usage.** Codex does bulk work; Claude designs, reads sheets and vetoes. Keep Claude weekly usage at or below 98%. Run `codex exec` with stdin closed (`< /dev/null`), long jobs detached under `caffeinate -i` (a sleeping Mac stalls Codex for hours). Default model `gpt-6-sol` (`gpt-6.1-sol` is rejected for the ChatGPT login). Codex here cannot reach NCBI or Crossref, so `npm run refs:new` and an independent verifier are required for new references. No nested helper agents; give each agent a private scratch folder.

**Claim gate** (`npm run lint:claims`, in lint and CI; ledger `reports/audit-v2/claims-ledger.json`). Any new or edited number, dose, guideline, cost or absolute statement needs a supporting verdict. Applied edits are `corrected-unconfirmed` and fail until a final-text recheck; high-risk claims (dose, guideline, contraindication) need two independent runs; `style`/`voice` verdicts are not support. Local guideline and trial texts are attached automatically (`GUIDE_LOCAL` in `scripts/review/gate.py`). Cycle:
1. `python3 scripts/review/gate.py pending <files> --out <new dir>`
2. `scripts/review/orchestrate.py --work <dir> --claims --reviewers 1 --verifiers 1` (2 reviewers for high risk)
3. `gate.py record <dir>`, then `REVIEW_WORK=<dir> python3 scripts/review/apply.py list` (apply only touches edits on that sheet)
4. Claude reads the sheet; veto in `applied.json` with a `veto:` status
5. `REVIEW_WORK=<dir> scripts/review/cycle.sh` (must end LINT=0 BUILD=0)
6. `gate.py pending <touched> --out <dir>-final` (carry the first run's `touched.json`); repeat until the gate passes, then lint, build, commit.

Batch helpers: `scripts/review/wait_run.sh`, `prep_sheet.sh` (sheet plus Crossref check; a FAIL is often a 429), `publish_batch.sh <run> "<message>"` (gate, lint, build, refs:new, stages only touched files plus the ledger, pushes). `scripts/review/risk_order.py` ranks pages by error risk. Never accept a correction whose only support is a third-party upload (studyres.com, fyzzio.nl).

**Voice reruns** (STYLE §11–12): `python3 scripts/voice/trust_extract.py --out <dir>`, then `orchestrate.py --work <dir> --claims --brief trust --verify-brief trust-verify`, apply with `apply.py`, then `gate.py pending` on touched pages. Do not use `cycle.sh` here (it records style statuses in the claim ledger). Coherence (§14): `scripts/voice/coherence_sweep.py`, `coherence_loop.sh`, `coherence_replay.py`; authors must not invert study sentences into result-first passives, verifiers must copy the edit on `agree`.

**Trial sources.** For a new full text: `pdftotext` each `<doi slug>.pdf` to `trials-2026-11-12/<slug>.fulltext.txt` (scans: `pdftoppm` + `tesseract`; narrow correction columns: `pdftotext -raw`), point the report's `source.file` at it, list trials in an `enrich-sources-N.json`, run `run_codex_enrich.py`, `install_fix.py`, the claim gate and `publish_wave.sh` (kit `reports/2026-11-12/missing-trials/`). Keep a trial out of a new batch while an earlier batch holding it is unpublished. Verdicts: no named primary endpoint = `descriptive`; a met equivalence design = `noninferior`; a pooled comparison outside the prespecified ones = `exploratory`. Trial JSON must not carry HTML entities (grep for `&lt;` before publishing).

**Shared checkouts.** Other sessions often have uncommitted pages: commit with `git commit -- <paths>`, and run site-wide lint and build in a clean worktree.

## Standing Instructions

- **Publishing:** commit completed work and push to `main` (Vercel deploys from `main`), unless the user says otherwise. In cloud sessions the harness may assign a `claude/...` branch; the user has said to push straight to `main` (October 1).
- **Final product copies (October 10):** after any change to a practice product (handouts, SmartPhrases, preference cards, practice sheets, purchase list, bio), copy its new final version into `~/Documents/Jefferson Einstein/Seranio Practice /` (trailing space), replacing the old copy, update that folder's `INDEX.md` and rebuild its combined PDF (`python3 _compendium-source/build_compendium.py` there).
- **Preserve useful content** (September 20 policy): manufacturer IFUs, anatomy texts, technical papers, operative videos and established teaching are valid sources for the claims they support. Correct specific errors; never blank substantive pages or replace them with audit notices. See [content-preservation-policy.md](reports/2026-09-20/content-preservation-policy.md).
- **Provenance:** keep `evidenceUpdated` / `evidenceNote` (internal) distinct from clinician `lastReviewed` / `reviewer`. Never manufacture clinical sign-off from a Git timestamp or automated edit.
- **Voice:** [STYLE.md](STYLE.md) governs typography, word choice, sentence structure and evidence wording for all new content (openings: definition plus key facts; facts only; point first; cost and value rules).
- **Design (September 27):** headings are Inter; no "At a glance" blocks; section accents via `--wk-accent*` tokens and `html[data-section]`; **do not create new surgical schematics** (the user judged them unreliable). Links stay color-only (November 14). Filters and toggles are quiet: segmented switch, text tabs, soft-tint chips.
- **No standalone pediatric pages** (September 30). Pediatric-primary topics appear only as adult-facing context on lifelong-care pages.
- **No public clinical template toolkit** unless the user asks (scrapped September 30 and October 1).
- **Owner decisions in batches:** offer an interactive decision page (Artifact with real excerpts, recommended answers, saved choices).
- **Scope of patient data:** personal operative notes, case logs and any patient-specific data never enter this public repository. Off-repo personal work (SmartPhrase library, case logs, social graphics, textbook-mining findings, handout masters and fonts) is never committed.

## Lessons That Keep Recurring

- **DOIs typed from memory are often wrong.** Resolve every new DOI (local `scripts/audit/pubmed.py` / `doicheck.py` pattern) before committing. Textbook chapter citations drift: check editors, edition, chapter and year against the book's front matter (`reports/textbook-mining/consolidation/BOOKS.md`).
- **Leads can name the wrong study** (OpenEvidence answers, source dumps, Codex): verify every paper even when a DOI is given (same author and year is not the same study). Fix passes sometimes delete result roles; set `descriptive` instead.
- **Cloud sessions:** the egress proxy blocks PubMed/eutils, doi.org, Crossref, Europe PMC and OpenAlex; WebSearch still works. Verify references through search results that show the DOI or PMID, and flag them for a local DOI check.
- **Always run `npm run build` after editing MDX that contains raw HTML/JSX.** `npm run lint` does not catch unclosed `<sup>` or bad JSX; only the build does. `{#custom-id}` heading anchors break MDX; use `<a id="..."></a>` above the heading.
- **`npm run build` rewrites `src/data/stats.json`** (timestamp). Run `git checkout -- src/data/stats.json` before committing unless counts changed meaningfully.
- **Parallel subagents must not build concurrently** (they race `build/`); the orchestrator builds once afterward.
- **Check the existing reference list for duplicates** before appending refs from a source dump; reconcile and renumber.
- **Lost citation markers:** bulk rewrites drop `<sup>` markers; check citation counts before and after (the October 21 sweep restored 1,250).

---

## Non-Negotiables

Before writing or modifying an article:

1. **Scope:** primary topics must fit reconstructive urology, functional urology or urogynecology. Out of scope as primary topics: endourology for stones and primary urologic oncology. Reconstructive consequences (radiation injury, post-prostatectomy stricture, diversion complications, urethrectomy as a determinant of diversion) are in scope.
2. **Voice:** write for reconstructive surgeons and urogynecologists, not patients or general-medicine readers. Keep operative relevance, anatomy, decision points, complications and outcomes, with specific rates and evidence quality.
3. **Citations:** real published references only. Inline `<sup>[[N]](#refN)</sup>` with `<a id="refN"></a>N. ...` anchors after a `---` separator under `## References`; contiguous numbering; DOI links when available. GAS pages use footnotes (`[^N]`). Optionally add a stable parallel anchor `<a id="ref-author-year-journal"></a>` for new refs.
4. **Cross-link instead of duplicating.** One authoritative home per concept; condition pages link to management, technique pages own operative detail.
5. **Hidden pages** (`sidebar_class_name: sidebar-hidden-item` or a hidden `_category_.json`) must be reachable by an explicit database row or inline prose link from a visible hub, so orphan lint passes and readers can find them.

Before committing:

1. `npm run lint` (scope, citations, orphans, internal links, figure captions, claims).
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
| Individual lints | `npm run lint:scope` / `lint:citations` / `lint:orphans` / `lint:links` / `lint:figures` / `lint:claims` / `lint:trials` / `lint:handouts` |
| Advisories | `npm run lint:density` / `lint:freshness` / `lint:facts` |
| External links | `npm run lint:external-links` or `node scripts/check-external-links.js --sample 200` (needs open network) |
| Stub tracker | `npm run status` |
| New-reference check (DOI resolves; no retraction or expression of concern; errata listed) | `npm run refs:new` (needs network; `publish_batch.sh` runs it) |
| Unit tests | `npx vitest run` (Playwright e2e runs in CI, about 13 minutes) |
| Video registry sync | `npm run videos:sync` (needs `YT_API_KEY` in `.env`) |
| Video candidates for a page | `node scripts/suggest-page-videos.js <page.mdx>` (needs `src/data/videos.generated.json` from a sync) |
| Audit tooling | `scripts/audit/audit.py`, `scripts/audit/pubmed.py`, `scripts/audit/ledger.py`, `scripts/refs/retractions.py`, `scripts/consistency/citation_targets.py` |
| Site consistency (quarterly, needs network for the first) | `npm run refs:registry`, `npm run consistency:people`, `npm run consistency:same-source`, `npm run scorecard`. Outputs are triage lists; verify before editing (method `reports/2026-10-03/site-consistency.md`) |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, Vitest, build and Playwright on every push and PR. Vercel runs `npm run build` including `postbuild`; preserve those hooks. Evidence cadence is quarterly (March, June, September, December), aligned with the owner's OpenEvidence surveys. The monthly external-link workflow uploads a report artifact and opens no issues.

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
| `docs/06-clinical-evidence/` | `/docs/clinical-evidence` |
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
| `src/components/VideoCards.tsx` | Lazy YouTube (and direct-MP4/Vimeo) card grid |
| `src/components/VideoLibrary.tsx`, `src/pages/video-library.tsx`, `src/data/videos.ts` | Video Library (generated, chunked registry) |
| `src/components/EvidenceExplorer.tsx`, `src/data/clinical-evidence/` | Clinical Evidence library |
| `src/components/PatientHandouts.tsx`, `src/data/handouts.ts` | Handout gallery (gated by `WARWIKI_INCLUDE_HANDOUTS`) |
| `src/components/SurgeonsExplorer.tsx`, `src/data/surgeons.ts` | GURS/URPS lineage explorer |
| `api/tts.ts`, `api/rounds-sync.ts` | Article listener; Rounds cross-device sync (Vercel Blob) |
| `scripts/check-*.js` | Lint checks |
| `docs/_STATUS.md` | Stub tracker (generated) |
| `algolia-synonyms.json` | Search synonyms (upload in the Algolia dashboard) |

Homepage title links to `/docs/foundations`; tagline "Reconstruction, codified."; search pill "Where should we start?". Brand blue `#185FA5`.

---

## Article Pattern

```mdx
---
title: Short Sidebar Title
sidebar_position: N
---

# Full Article Title

Opening paragraph: definition plus key facts, with an early citation.<sup>[[1]](#ref1)</sup>

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
- **Consolidate near-identical variants** (80%+ shared content) onto one page with anchor routing from index rows; add Vercel redirects for retired slugs. Genuinely distinct peers stay separate.
- **Split condition from technique** when a condition has a substantial dedicated operation (urethral stricture ↔ urethroplasty family; RPF ↔ ureterolysis).
- **Spanning topics:** one full page plus short cross-linked notes elsewhere, never duplicated (drain-and-retain; female AUS).
- **Hub → dedicated page:** lead the hub subsection with `> See the dedicated [X] page ...` and keep the hub copy a short orientation.
- **Duplicate titles** across sections get a parenthetical suffix only when they actually collide (e.g. "Artificial Urinary Sphincter (Device)" vs "(Procedure)"); URLs unchanged.
- **Index pages:** every section has `index.mdx` with `hide_title: true`. Top-level landings use `section-stack` (`section-stack-title section-stack-link` + `section-stack-desc`); deeper indexes may use `toc-list` / `toc-chips`. Clinical Conditions sidebar is ordered by prevalence; landing links open the first sidebar page of their group.
- **Cosmetic energy devices:** distinguish surgical cutting-tool use from nonsurgical "rejuvenation" marketing and FDA warnings.
- **Instruments:** house template is design → RU/urogyn uses → comparison table → technique pearls → safety → history → cross-links → references; index "use" column ≈ 10-15 words.
- **Guideline recommendations** use the expandable `<Rec>` badges (wording and grades preserved).

## Media

- **Videos:** up to 4 genuinely on-topic, embeddable videos per page, `## Videos` immediately before `## References`, via `VideoCards` (`{ id, title, subtitle }` for YouTube; `sourceUrl` + `sourceType: 'mp4' | 'vimeo'` and optional `articleUrl` for journal videos). Workflow: `npm run videos:sync` → `node scripts/suggest-page-videos.js` → curate by hand (a wrong video is worse than none) → clean titles via YouTube oEmbed. The Video Library is the @warwikihq channel mirror only; outside videos go on pages. Domain-restricted Vimeo (oEmbed `domain_status_code: 403`, e.g. SUFU/ISSM) → external `web-card--video` link. Urology Video Journal supplements embed as MP4s from `https://ars.els-cdn.com/content/image/1-s2.0-<PII>-mmc1.mp4`; IUJ and LWW journals do not embed ([reports/2026-10-03/video-journal-candidates.md](reports/2026-10-03/video-journal-candidates.md)). Podcasts use `PodcastCards`.
- **Open-access figures from cited papers:** CC BY and CC BY-NC figures may be reused with credit, in `static/img/figures/<page>-<author>-<year>-<fig>.jpg`, caption ending "From Author X, et al. Journal. Year;Vol:Pages, Fig. N (CC BY 4.0)." View the figure first; skip any with its own credit line (reprinted, adapted, courtesy, in-image ©), an identifiable patient, or genital photographs of children. Save at most 1400 px, JPEG quality ~74. Candidates: [reports/open-access-figures/](reports/open-access-figures/).
- **Figures:** `![alt](/img/...)`, then a **blank line**, then an italic caption (enforced by `npm run lint:figures`). Public-domain/CC anatomy plates live in `static/img/anatomy/` (verify plate content; filenames mislead). Existing schematics are diagrams-as-code in `scripts/diagrams/*.js` → `static/img/diagrams/*.svg` (edit = rerun the generator), but do not create new ones. Never schematize radiograph/CT/MRI appearances.
- **Handouts pipeline (off-repo masters, `~/Desktop/WARWIKI-handouts/`):** HTML → headless Chrome PDF + JPEG/WebP preview → `static/handouts/<slug>[.<lang>].pdf` and `static/img/handouts/`; add the entry in `src/data/handouts.ts` with `sourcePages` (`npm run lint:handouts` flags handouts whose source pages changed). Run the overflow gate (`pageOvf` and `colsOvf` must be 0) before rendering. Translations need retranslation from the final English before they return (`WARWIKI_INCLUDE_HANDOUT_TRANSLATIONS=true`; about 380 MB).

## Surgeon Profiles

Profiles live at `docs/07-roots/surgeons/{a-g|h-r|s-z}/{name}.mdx` (hidden category, reached through `docs/07-roots/surgical-lineage.mdx` / `SurgeonsExplorer`). Link with `s.path`, not `s.id`. Profiles are outside the claim gate. **Criteria:** in-scope surgeon plus any of: WARWIKI citations (GURS top 105, URPS score ≥ 10), school founder, president of GURS/SUFU/AUGS/IUGA or ICS chair/general secretary, a core-society lifetime award, ≥ 5 fellows trained, or TURNS membership; supporting lists (SGS, SIU, SMSNA, AUA Guiteras/HHY) only for in-scope reconstructive surgeons; every profile needs a verifiable bio. Countries are the career base (sourced), never inferred from names. Profiles open with a "Training and career" card (`<div className="sp-facts">`); contributions list verified signature work (no "Known for" heading). Each profile MDX imports `@site/src/data/surgeon-profiles/<id>.json` as `profile` and `src/data/surgeon-citations/<id>.json` (both generated in prebuild). The GURS lineage merges `src/data/gurs-lineage.generated.json` (Lee Zhao's tree, used with permission; `scripts/genealogy/build-lineage.js`); URPS working data is off-git in `reports/surgical-genealogy/urps-work/`. Schools are `DYNASTIES` in `surgeons.ts`.
