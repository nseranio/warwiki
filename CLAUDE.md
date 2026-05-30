# WARWIKI - Claude Session Reference

Read this at the start of a session. Keep it small: this file is the working handbook, not the project archive. Put substantive history in `CHANGELOG.md`; use `docs/_STATUS.md` for the stub backlog.

---

## Current Handoff - 2026-05-30 (later 3) — Landmark Trials expanded 42 → 52 (exhaustive site sweep)

1 commit, fast-forwarded to `main`. Typecheck + lint + build clean; verified in-browser.

Grew the [Landmark Trials database](src/data/trials.ts) 42 → 52 via a "what's missing across the whole site" pass — mined the **recovered old `journals.ts`** (from git history) + named trials cited in article prose. Two new domains: **Urinary Diversion** (USC-STAR), **Infection / Prophylaxis** (ALTAR). Also added the **BMG harvest closure meta-analysis** (the buccal-graft closure question), Nitti (idiopathic-OAB Botox 100 U — distinct from neurogenic 200 U), ARTISAN-SNM, OASIS/Revi, IMPROVE, PESSRI, COURAGE, and the WHO Surgical Safety Checklist. Every fact + DOI verified by lit search.

Final spread (52): OAB 10 · POP 10 · Stress 7 · BPH 7 · Surgical/Perioperative 4 · Urethral Stricture 4 · Male SUI/Prosthetics 3 · Sexual Medicine 3 · Mixed 1 · Fecal 1 · Urinary Diversion 1 · Infection/Prophylaxis 1.

**Add a trial = append one typed object to `trials.ts`; new domains = append to `DOMAIN_ORDER` in [LandmarkTrials.tsx](src/components/LandmarkTrials.tsx).** Deliberately excluded staging/PRO-validation papers and single-institution cohorts (not landmark RCTs); a "key cohorts" tier could surface them later if wanted. The well of genuine must-know trials is now close to dry.

Full session detail in `CHANGELOG.md` under 2026-05-30 (later 3).

---

## Previous Handoff - 2026-05-30 (later 2) — Landmark Trials expanded 21 → 42

2 commits, fast-forwarded to `main`. Typecheck + lint + build clean; verified in-browser.

Grew the [Journal Club Landmark Trials database](src/data/trials.ts) from 21 → 42, adding three new domains: **Sexual Medicine** (Sildenafil pivotal, IMPRESS, RestoreX), **Surgical / Perioperative** (STITCH, Darouiche, ChEETAh), **Fecal Incontinence** (CAPABLe). Also filled SUI (Ward-Hilton, SIMS, ATLAS), OAB (Ginsberg-NDO, InSite, EMPOWUR), POP (Altman TVM), Male SUI (MASTER, InhibiZone), and BPH device trials (L.I.F.T., Rezūm, WATER, PINNACLE, CombAT).

**Every trial's facts + DOI were verified by literature search — none from memory.** Scope guard held: no stone/endourology or primary-cancer trials; BPH entries are the device/procedure trials, not pure medical therapy. New domains were added by appending to `DOMAIN_ORDER` in [LandmarkTrials.tsx](src/components/LandmarkTrials.tsx); the filter updates from the data. Registry/cohort (non-RCT) entries carry a `caveat` flag (InhibiZone, AUS-COT).

Final domain spread (42): Stress 7 · Mixed 1 · OAB 7 · Fecal 1 · POP 8 · Urethral Stricture 3 · Male SUI/Prosthetics 3 · Sexual Medicine 3 · BPH 6 · Surgical/Perioperative 3.

Full session detail in `CHANGELOG.md` under 2026-05-30 (later 2).

---

## Previous Handoff - 2026-05-30 (later) — New Surgical Scrub & Hand Antisepsis page

1 commit, fast-forwarded to `main`. Lint + build clean.

Added [surgical-hand-antisepsis.mdx](docs/01-foundations/perioperative-care/intraoperative-care/surgical-hand-antisepsis.mdx) (Intraoperative Care, `sidebar_position: 6.5` — between Draping & Skin Antisepsis and Surgical Gloving, matching scrub → glove order). Both accepted techniques (water-based CHG/povidone scrub; waterless ABHR) with the rub-vs-scrub equivalence evidence (Feng 2020 meta, WHO 2016, Tanner Cochrane 2016), framed for long GU/prosthetic cases. Cross-linked with Gloving + Draping; distinguishes surgeon-side hand antisepsis from patient-side skin antisepsis. Copyrighted NEJM figure omitted (house rule), ref cited inline.

Full session detail in `CHANGELOG.md` under 2026-05-30 (later).

---

## Previous Handoff - 2026-05-30 — Journal Club rebuilt as a Landmark Trials database

3 commits, all fast-forwarded to `main`. Typecheck + lint + build clean; Vitest 6/6.

**New direction for Journal Club:** it's now a curated **must-know trials** database — click a trial, learn the home-run facts fast — not a broad literature index.

- **[src/data/trials.ts](src/data/trials.ts)** — 21 landmark trials across 7 domains (SUI, Mixed UI, OAB/Urgency, POP, Urethral Stricture, Male SUI/Prosthetics, BPH). Each is a "home-run snippet": `bottomLine` first, then population/comparison/primaryOutcome/result/guidelineImpact/caveat + `doi`. **Add a trial = append one typed object.**
- **[src/components/LandmarkTrials.tsx](src/components/LandmarkTrials.tsx)** — searchable, domain-filterable table; **rows expand in place** to a key-facts panel (no per-trial pages). `.lt-*` CSS in custom.css.
- **Replaced entirely:** retired the old 80-article Journal Database + Guidelines & White Papers pages and deleted the now-unused `JournalTable.tsx`/test/`journals.ts`. [journal-club/index.mdx](docs/06-journal-club/index.mdx) is trials-only.
- **Surfaced at the top of the [Resources landing](docs/08-resources/index.mdx)** (kept off the top navbar).

**Conventions:**

- **Landmark Trials curation bar** — a trial earns a slot only if a fellowship-trained reconstructive surgeon / urogynecologist would know it on sight (set a standard, settled a debate, changed the workup). Codified in the `trials.ts` docblock.
- **Process note (cost lesson):** stacking many speculative parallel tool calls before facts land caused several edits to apply against stale/garbled file reads and silently fail (wrong anchors), plus a bundled commit that needed an undo. Cleaner pattern here: read → edit → verify in small sequential batches, and gate on `EnterPlanMode`/answers before fanning out.

Full session detail in `CHANGELOG.md` under 2026-05-30.

---

## Previous Handoff - 2026-05-29 (later) — Condition→atlas link audit + view-count pipeline + video matcher + ~108-page video rollout

6 commits, all fast-forwarded to `main`. Lint + typecheck + build clean (1,175 files).

**Condition → Treatment-Atlas links, full audit.** Standardized all 68 clinical-condition pages to the [urgency-incontinence-oab](docs/03-clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab.mdx) model — an early inline pointer to the relevant atlas database/landing + a `## See Also` block of atlas management links before `## References`. 56 pages updated (one subagent per subsection, every link target verified, lint:links clean). Left unlinked on purpose: dysfunctional-voiding and pelvic-venous-disorders (no genuine surgical-atlas target — don't force a weak link).

**Video pipeline now captures view counts.** [fetch-youtube-playlists.js](scripts/fetch-youtube-playlists.js) requests `part=contentDetails,statistics`; [build-videos-registry.js](scripts/build-videos-registry.js) adds `views` to `VideoEntry`. Re-synced — 1,528 entries carry view counts. Enables the "prefer high-view + recent" selection rule.

**New matcher: [scripts/suggest-page-videos.js](scripts/suggest-page-videos.js).** Ranks per-page candidate videos by keyword relevance (page title/H1/slug vs playlist + video title) tie-broken on a **0.6·log-views + 0.4·recency** blend; prints a report (optionally `--json`), edits nothing. The selection aid for video rollout.

**~108-page video rollout across the clinical core.** Nine subagents (per atlas subsection + one for conditions), each fed the matcher's candidates, picked 1-2 genuinely on-topic videos per page, cleaned titles via oEmbed, inserted the standard `## Videos` block. Skipped weak matches aggressively. 141 clinical-core pages now have videos.

**Conventions established:**

- **Video-add workflow = re-sync → `node scripts/suggest-page-videos.js` → curate per page.** The matcher is a starting point, never authoritative; its precision is intentionally loose (it offered BPH→"Female Bladder Outlet Obstruction"). Always confirm the pick is actually about the page's procedure and clean the card title via oEmbed. Quality over coverage — a wrong video is worse than none.
- **Condition pages link to management, never duplicate it.** Early inline pointer + `## See Also`; skip the link when no genuine atlas target exists.
- **Bulk JSX edits via parallel subagents must build centrally.** Subagents skip the build (concurrent builds race `build/`); the orchestrator runs one `npm run build` afterward (the run-build-after-MDX-HTML rule).

Full session detail in `CHANGELOG.md` under 2026-05-29 (later).

---

## Previous Handoff - 2026-05-29 — Video-resource cards on six pages + Video Library re-sync (1,323 → 1,522 videos)

3 commits, all fast-forwarded to `main`. Lints + typecheck + build clean.

**Video cards on six pages.** Added `## Videos` blocks (VideoCards, immediately before `## References`) sourced from AUA University Core Videos + one obstetric-fistula masterclass: [rigid-cystoscope](docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx) (Rigid Cystoscopy 2024), [lowsley-retractor](docs/01-foundations/tools/instruments/urethral-specialty/lowsley-retractor.mdx) (SPT via Lowsley 2024), [frailty](docs/01-foundations/perioperative-care/preoperative-assessment/frailty.mdx) (Geriatric Assessment with SPPB 2025 — placed on the frailty page, not the special-populations geriatric-urology page, because the video is about the SPPB tool the page tabulates), [flexible-cystoscope](docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx) (Flexible Cystoscopy ×2, 2025), [mag3-renal-scintigraphy](docs/02-evaluation/imaging/mag3-renal-scintigraphy.mdx) (Pediatric MAG3 2025), [lone-star](docs/01-foundations/tools/instruments/retractors/lone-star.mdx) (Lone Star in Fistula Surgery). **Title/subtitle resolved via YouTube oEmbed** (`https://www.youtube.com/oembed?url=…&format=json`) so cards carry accurate names + source attribution — the standard way to caption a single embed without guessing.

**Video Library re-synced.** User significantly restructured the YouTube playlists; re-ran `npm run videos:sync`. Registry went **122 → 137 playlists, 1,323 → 1,522 unique videos** (1,608 total items, dedup to 1,522). Subspecialty **251 combined / 963 GURS / 308 URPS**. Topic buckets still 28; biggest mover is **Fistula 20 → 110**. New top picks: 298 Urethroplasty, 264 Upper Tract Reconstruction, 177 Prolapse, 110 Fistula, 71 Bladder Reconstruction, 68 Penile Prosthesis. Chunked output now **7 × 250-entry constants** (was 6) — TS2590 guard holds, typecheck clean. `videos.generated.json` stays gitignored; only `videos.ts` committed.

**Conventions reinforced:**

- **Re-sync is a two-command, repo-safe operation.** `npm run videos:sync` (fetch → build) is idempotent; only `src/data/videos.ts` + `stats.json` change in git. Run `npm run typecheck` + `npm run build` after — the chunk count rises with the catalog and the TS2590 guard must be re-verified.
- **Caption single video embeds from oEmbed, not from memory.** The oEmbed JSON gives the canonical title + author for any YouTube ID; clean it into a short title + subtitle rather than pasting the raw "Core Videos (2025): …" string.

Full session detail in `CHANGELOG.md` under 2026-05-29.

---

## Previous Handoff - 2026-05-27 — Video Library at /video-library — 1,323 WARWIKI YouTube videos indexed, faceted, grouped-by-topic, promoted to top-level navbar

10 commits, all fast-forwarded to `main`. Lints + typecheck + build clean across **1,175 files**.

**The headline:** the entire WARWIKI YouTube channel (122 playlists, 1,323 unique videos) is now a searchable, filterable, grouped-by-topic library at [/video-library](src/pages/video-library.tsx), reachable as a top-level navbar item. End-to-end pipeline (`npm run videos:sync`) re-pulls from YouTube and regenerates the typed registry whenever playlists change.

**Pipeline:**

- **[scripts/fetch-youtube-playlists.js](scripts/fetch-youtube-playlists.js)** — resolves `@warwikihq` via `channels.list?forHandle`, paginates `playlists.list` then `playlistItems.list` per playlist, batch-fetches durations via `videos.list?part=contentDetails` (50 IDs/call). Writes intermediate `src/data/videos.generated.json` (gitignored). **Retry-with-backoff on 403/429/5xx** to ride out Google's edge-cache propagation drift after key-restriction changes — first run hit "Requests from referer `<empty>` are blocked" inconsistently across edge nodes; retry resolves it.
- **[scripts/build-videos-registry.js](scripts/build-videos-registry.js)** — applies keyword-based **subspecialty** classification (URPS / GURS / combined; URPS rules first so "Urethral Mass: Diverticulectomy" doesn't mis-match the broad Urethroplasty rule) and **topic** classification (28 buckets derived from playlist-title prefix). Emits typed `src/data/videos.ts` with the array **chunked into 250-entry constants** concatenated into the public `VIDEOS: VideoEntry[]` — TS 6.0 otherwise produces a TS2590 "union too complex to represent" at this cardinality even with explicit annotation.
- **[.env](.env.example)** (gitignored — plain `.env` was missing from `.gitignore` prior to this session; only `.env.local`/etc. were listed) carries `YT_API_KEY`; `.env.example` is committed with a placeholder.
- **npm scripts**: `videos:fetch`, `videos:build`, `videos:sync` (chains both).

**Component:** [VideoLibrary.tsx](src/components/VideoLibrary.tsx) renders search box + topic dropdown + playlist dropdown (re-scoped dynamically to the active topic) + sort dropdown (Playlist order / Recently uploaded / Longest / Shortest / Alphabetical) + result count, then a **grouped-by-topic layout** with section headings and count chips. Group order follows the active sort. Click any thumbnail to play inline. Topic chip rendered on each card; optional `articleSlug` back-link surfaces as an "Open article →" chip when populated (none populated yet — `articleSlug` curation is the obvious next increment).

**Topic breakdown** (28 buckets, top picks): 287 Urethroplasty, 203 Upper Tract Reconstruction, 169 Prolapse, 68 Penile Prosthesis, 67 Bladder Reconstruction, 51 OAB/UUI, 46 BPH, 44 Male SUI, 40 Urinary Diversion, 39 Grafts & Flaps, 39 Surgical Technique, 36 Female SUI, 35 Peyronie's Disease, 29 Trauma & Emergencies, 26 Evaluation, 23 Women's Health, 22 Neurourology, 20 Fistula, 16 Gender-Affirming Surgery, 14 Genital Reconstruction, 13 Urethral Mass, 9 Hidden Curriculum, 7 Vaginal Masses, 5 each Radiation Therapy / Urethrectomy / Mesh Complications, 3 Pelvic Pain, 2 Other. Subspecialty split (kept in data even though no UI exposes it now): 234 combined / 789 GURS / 300 URPS.

**Navbar restructure** — [docusaurus.config.ts](docusaurus.config.ts) flattened. The old "Library" dropdown is gone; Video Library is now a top-level left-nav item, and **Resources** is a single flat left-nav link. Journal Club is **hidden from the navbar** (page still exists, reachable via direct URL + footer). History & Lineage moved into the [Resources landing](docs/08-resources/index.mdx) (after Hidden Curriculum). Final navbar: **Foundations · Evaluation · Clinical Conditions · Treatment Atlas · Special Populations · Video Library · Resources** (left) + Search · About · GitHub (right).

**Resources landing reorder** — Podcasts renamed → **Podcast Library** (frontmatter title aligned with the page's existing H1). New order: Videos & Surgical Atlases → Podcast Library → Patient Resources → Textbooks → Quiz → Websites & Online Tools → Hidden Curriculum → History & Lineage. **Video Library is NOT listed on the Resources landing** — top-level nav item replaces the duplicate tile.

**Lee Zhao card update** — [surgical-video-atlases.mdx](docs/08-resources/surgical-video-atlases.mdx) Lee Zhao YouTube card now points to his new searchable library at [video.leezhaomd.org](https://video.leezhaomd.org); card renamed "Lee C. Zhao MD" → "Lee C. Zhao MD — Video Library". The `:::tip` callout about "catalog of sources vs catalog of videos" was removed (redundant signage now that Video Library is in the main nav).

**Conventions established:**

- **API keys pasted into chat are compromised** — they're in scrollback, logs, and any downstream transcript. Rotate-then-restrict (HTTP-referrer for browser keys; IP / "none + secrecy" for server keys) is the only safe path. `.env` must be gitignored *before* the key gets near the repo.
- **Auto-generated TS files at >1k literal entries need chunking.** Explicit `: T[]` annotation is not enough — TS 6.0 still widens element literals and produces TS2590. Pattern: emit `const CHUNK_0: T[] = [...]; const CHUNK_1: T[] = [...]; export const X: T[] = [...CHUNK_0, ...CHUNK_1];`. Documented in [build-videos-registry.js](scripts/build-videos-registry.js).
- **Hide-from-navbar ≠ delete.** Journal Club is reachable from footer + URL; surface it back when the journal database is ready to grow. Same pattern available for any future content the navbar shouldn't crowd.
- **Grouped-by-topic is the right default for large libraries.** A 1,323-card flat grid is hard to scan; topic-grouped reads like a textbook TOC and matches how reconstructive surgeons mentally index by procedure. Tried as an opt-in toggle first, then flipped to grouped-only after user feedback.
- **Subspecialty data outlives subspecialty UI.** GURS / URPS / All tabs were removed but the `subspecialty` field stayed in the registry. Future views can re-expose it without re-running the pipeline.

Full session detail in `CHANGELOG.md` under 2026-05-27.

---

## Previous Handoff - 2026-05-26 — Female AUS expansion + new Urethrolysis page + new Urethrectomy page + rectal-injury management + CI permissions fix + SUFU/IUGA video resources

9 commits, all fast-forwarded to `main`. Lints + typecheck + build clean across **1,174 files**.

**CI permissions fix** — [external-links.yml](.github/workflows/external-links.yml) was failing the auto-issue step (`HttpError: Resource not accessible by integration`); default `GITHUB_TOKEN` is read-only on issues. Added `permissions: contents: read, issues: write` to the workflow.

**Female AUS — Bladder Neck Placement section** added to [artificial-urinary-sphincter.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx). Replaced the one-line marginal mention with a full standalone section: AUA/SUFU 2023 salvage framing (failed prior anti-incontinence, severe ISD, neurogenic SUI; radiation contraindication), three approaches (vaginal route abandoned; open retropubic, laparoscopic, robot-assisted anterior vs posterior with Dubois 2025 n=135 open-vs-robotic comparison favoring robotic on every metric), female-specific device specs (cuff 6.5–8 cm vs male bulbar 3.5–6 cm; 61–70 cmH₂O PRB; labia majora pump; 4–6 wk activation), Peyronnet 2019 meta of 964 women (80% complete continence), full complications table, 20-yr explantation-free survival from Phé neurogenic cohort. 13 new refs (56–68) with stable parallel `ref-author-year-journal` anchors.

**Urethrolysis** — new page at [urethrolysis.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/urethrolysis.mdx) (sidebar 17). Salvage operation for iatrogenic BOO after anti-incontinence surgery. Gleich/Goldman 2025 NUU terminology proposal; ACOG CO 694 6-week threshold; approach comparison table (sling incision 70–90%, transvaginal 73–85%, retropubic 78–86%, suprameatal 65–67%, lap/robotic feasibility); outcomes (60–90% BOO resolution, 20–40% recurrent SUI, PVR as failure predictor). **Step-by-step Operative Technique by Approach** expansion added five detailed H3 blocks — right-angle-clamp sling incision (cystoscope-sheath palpation pearl; fascial-sling 2-wk scar-in window); formal transvaginal urethrolysis with manual-pressure hemostasis; suprameatal with index-finger sweep + endopelvic fascia preservation (Petrou 13/20 voided); open retropubic with index-finger-plane completion landmark and peritoneal/omental flap; Martius fat-pad interposition (Carey 2003 87%/13%; Oliver-Raz salvage). Postoperative catheter-duration table across five scenarios. 12 refs total with stable parallel anchors. Cross-linked from retropubic-MUS, mesh-complications, and underactive-bladder pages. **Not** added to the female SUI database — urethrolysis treats a complication of SUI surgery, not SUI itself.

**Rectum section** added to [bowel-handling-injury-management.mdx](docs/01-foundations/surgical-principles/bowel-handling-injury-management.mdx) between Colon and Thermal. Anatomy-first decision (intraperitoneal upper-third managed as colon per Brown 2018 AAST n=785 + Junior 2026 ~81% no-divert survey; extraperitoneal middle/lower-third still mostly diverted per Bosarge 2016 EAST PMG); AAST Rectum grading table I (observe) → V (resect+divert); two-layer repair technique with TAMIS for low extraperitoneal injuries and **omental flap interposition between rectal repair and adjacent urethrovesical anastomosis / vaginal cuff / AUS cuff** as standard of care after RALP / RARC / RVF; abandoned adjuncts (presacral drain OR 2.6, distal washout OR 3.4); damage-control 16.7% vs 3.2% leak; Yee/Ornstein 2008 RALP pearl as the standard urology reference. 10 new refs (28–37). Source cleanup: deduplicated 4 refs already in the page (Smyth WSES, Tang meta, Coccolini source control, Manley loop ostomy).

**Urethrectomy** — new page at [urethrectomy.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/urethrectomy.mdx) (sidebar 30). Framed for reconstructive urologists as "masters of the urethra" routinely called to perform or assist with the urethrectomy step of radical cystectomy — the decision shapes orthotopic neobladder candidacy and, in proximal urethral carcinoma, phallic preservation. Primary urologic oncology is out of WARWIKI scope, but urethrectomy is the textbook **reconstructive-consequence** example from CLAUDE.md's gray-zone rules. AUA/ASCO/SUO 2024 + classic Ahlering/Skinner 1984 indications + NCCN 2026 primary-urethral-carcinoma treatment table. **Full male technique**: prepubic workhorse (Joniau 2007 n=180, +17 min) with Hiebl 1999 18 Fr catheter-stripping modification; perineal inside-out; en bloc transpubic with March 2023 **phallus preservation** (external pudendal / superficial penile arterial supply as the basis); laparoscopic; robotic side-docking + Zennami 2024 urethra-preserving (0/134 recurrences). Elshal 2011 prepubic-vs-perineal Clavien comparison (OR time 174 vs 209 p=0.003; G4–5 9.5% vs 28% p=0.033). **Full female technique**: anterior exenteration framing; Hinata 2012 (vaginal-wall smooth muscle contributes to urethral wall; antegrade EBL ~965 mL); Colleselli 1998 sphincter morphology; Parsons 2003 rectus-flap vaginoplasty. **Risk-stratified oncologic outcomes** — Laukhtina 2022 multicenter n=887 high-risk HR 0.58, Hakozaki 2021 propensity match (multiple tumors / CIS 5-yr OS benefit), Mennes 2025 BJU propensity match n=332 10-yr OS 47.3% vs 27.5% (p=0.002). Reconstructive Implications section anchors back to neobladder candidacy + phallus preservation + rectus-flap vaginoplasty. 22 refs with stable parallel anchors. Cross-linked from urinary-diversion-principles (#6 Continence) and ileal-conduit See Also. **Not** added to the male/female urethroplasty databases — destructive procedure, would mislead users browsing stricture options.

**Three video-resource additions:**

- **IUGA Vimeo channel** added as a `web-card--urps` after AUGS in [surgical-video-atlases.mdx](docs/08-resources/surgical-video-atlases.mdx) Urogynecology & Pelvic Floor Channels.
- **SUFU operative video — transurethral dorsal BMG urethroplasty (Linder/Jefferson)** linked as a `## Videos` external card on [female-dorsal-inlay-bmg.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/female-dorsal-inlay-bmg.mdx). Direct Vimeo embed declined: oEmbed returns `domain_status_code: 403` (Vimeo PRO domain-restricted to sufuorg.com).
- **SUFU 2026 vaginal-manipulator comparison** linked as a `## Videos` external card on [uterine-manipulator.mdx](docs/01-foundations/tools/instruments/urethral-specialty/uterine-manipulator.mdx). Same domain-restriction pattern.

**Conventions reinforced:**

- **SUFU Surgical Video Library entries → external link cards, not iframe embeds.** SUFU videos are Vimeo-hosted with domain-level privacy. Vimeo oEmbed `domain_status_code: 403` is the quick check before bothering with an iframe.
- **Out-of-scope topics with strong reconstructive consequences are in-scope when framed correctly.** Urethrectomy = textbook gray-zone case: oncologic procedure framed as determinant of diversion candidacy and locus of phallic preservation.
- **Destructive procedures do not belong in reconstructive databases.** Urethrectomy and Urethrolysis were both deliberately kept out of the relevant treatment databases despite living in those atlas sections — the databases are for *restorative* options.
- **Always check existing reference list for duplicates before appending.** Bowel-rectal draft had 4 dupes; urethrectomy two-part draft had 4 dupes. Caught and merged in both.

Full session detail in `CHANGELOG.md` under 2026-05-26.

---

## Previous Handoff - 2026-05-23 — Platform infra wave (CI / tests / CONTRIBUTING / scripts) + quiz + decision tree + responsive table + freshness + bowel-anastomosis expansion + stoma-site-marking

8 commits, all fast-forwarded to `main`. Lints + typecheck + build + 8/8 Vitest tests clean across **1,173 files**.

**First WARWIKI CI pipeline** — [.github/workflows/ci.yml](.github/workflows/ci.yml) runs lint + typecheck + Vitest + build on every PR and main push, with freshness as a non-blocking trailer. Nightly [external-link cron](.github/workflows/external-links.yml) samples 200 URLs/day with deterministic-by-day seed, uploads JSON artifact, auto-opens a GitHub issue on broken-link signal. New scripts: [check-freshness.js](scripts/check-freshness.js) (advisory over `lastReviewed:` frontmatter; >18mo warn / >30mo stale), [check-external-links.js](scripts/check-external-links.js) (DOI uses GET, 429/403 soft-fail), [measure-build.js](scripts/measure-build.js) (append-only `build-perf.log` baseline), [migrate-stable-ref-ids.js](scripts/migrate-stable-ref-ids.js) (dry-run-by-default tool that adds `ref-author-year-journal` anchors next to numbered ones — insulates inbound tooltip / search links from future renumbering).

**Test surface added.** [vitest.config.ts](vitest.config.ts) + [playwright.config.ts](playwright.config.ts) + stubs for `@docusaurus/Link` / `useDocusaurusContext` so component unit tests don't need the router. 8 smoke tests across GenericDatabase / JournalTable / SurgeonsExplorer all passing. Playwright sitemap-sweep spec walks every built URL asserting <400 + visible main + no console errors. New devDeps: vitest, @testing-library/{react,jest-dom}, jsdom, @vitejs/plugin-react, @playwright/test. The SurgeonsExplorer test surfaced a real bug — duplicate `brian-inouye` ID in [src/data/surgeons.ts](src/data/surgeons.ts), fixed by removing the orphan record (kept the Peterson-fellows entry with `mentorId: 'andrew-peterson'`).

**[CONTRIBUTING.md](CONTRIBUTING.md) authored.** Codifies scope, voice, citation pattern, MDX gotchas, the consolidation rule (80%+ shared content), atlas / database / hidden-page rules, the new `lastReviewed` / `reviewer` / `subspecialty` / `key_point` frontmatter convention, test workflow, and a quarterly off-GitHub backup recommendation (git bundle + second remote mirror) — bus-factor insurance for a single-author wiki.

**Quiz at [/quiz](src/pages/quiz.tsx)** — spaced-repetition (SM-2-lite: Wrong / Hard / Good / Easy → interval scheduling) over 12 starter questions tagged GURS / URPS / combined with source-page back-links. localStorage-only state, no auth. Linked under "Videos & Surgical Atlases" in [Resources](docs/08-resources/index.mdx). User-requested subspecialty audit applied the **"prove it" rule** (only claim GURS or URPS when the content is something the other fellowship would not be expected to own; default to combined). Two reclassifications: icg-leak-reduction (GURS → combined, since ICG-FA is used by both), vitamin-b12-monitoring (combined → GURS, since the surveillance schedule is anchored to ileal-based diversion). Final distribution: 5 GURS / 3 URPS / 4 combined. Tagging docblock in [questions.ts](src/data/quiz/questions.ts) codifies the convention with positive examples for each bucket.

**Decision tree component** — [DecisionTree.tsx](src/components/DecisionTree.tsx) + worked example for reoperative-bowel-segment selection in [reoperative-bowel.ts](src/data/decisionTrees/reoperative-bowel.ts). Radio-driven, deterministic, every leaf citation-linked back to its source page. Drop `<DecisionTree tree={reoperativeBowelTree} />` into any MDX.

**Responsive table component** — [ResponsiveTable.tsx](src/components/ResponsiveTable.tsx) opt-in (desktop = styled table, ≤640px = one card per row with column header as label) + new sticky-first-column CSS at ≤768px on the standard markdown tables.

**Freshness badge component** — [FreshnessBadge.tsx](src/components/FreshnessBadge.tsx); opt-in MDX import that renders fresh / current / stale-soon / stale chip from `lastReviewed:` frontmatter. Renders nothing on legacy pages so degradation is silent.

**Bowel-anastomosis page expanded** — [bowel-anastomosis.mdx](docs/01-foundations/surgical-principles/bowel-anastomosis.mdx). Inverting-vs-everting corrected (Slieker cites a 5-fold leak signal with everting in colorectal RCT; prior wording understated this); Specifications rebuilt as an evidence table with Greenall RCT (5mm vs 10mm bite no difference) and Yao 2016 rat-model intersuture data; new Burch 2000 reference (ref27, 3-0 polypropylene as evidence-supported nonabsorbable monofilament alternative); new "Ideal Single-Layer Continuous Anastomosis" summary table. **First page to use the new `lastReviewed` / `reviewer` / `subspecialty` / `key_point` frontmatter** — sets the precedent. Marked `subspecialty: combined`.

**New page: [Stoma Site Marking](docs/01-foundations/surgical-principles/stoma-site-marking.mdx)** (Surgical Principles, sidebar 14.5 between bowel-anastomosis and surgical-ergonomics). ASCRS / WOCN / AUA position-statement evidence: WOC-nurse preoperative marking reduces stoma + peristomal complications (OR 0.47, parastomal hernia OR 0.25), improves self-care (OR 0.34). Davis 2022 ASCRS guideline + Kim 2021 SR/meta-analysis (n=2109) + Burgess-Stocks 2022 WOCN Bill of Rights validation. Sections cover the marking rationale, WOC-nurse-vs-surgeon accuracy data (surgeons place median 2cm off, too low; seniority does not help), the site-selection checklist (RLQ, rectus, supine/sitting/standing, 5cm peristomal skin), special populations (obese upper-abdominal alternative; preop wheelchair test for NLUTD per 5th ICI; prior abdominal surgery), construction linkages (Taneja-Godoy intracorporeal preparation), preoperative education (LOS 8 vs 10 d). 10 refs. Cross-linked from [ileal-conduit.mdx](docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx) (Key Steps + See Also) and [cutaneous-ureterostomy.mdx](docs/04-surgical-techniques/04c-urinary-diversion/cutaneous-ureterostomy.mdx) (Stomal Stenosis). Source cleanup: dropped the Cleveland Clinic Figure 15 (no embed rights, `undefined` caption), the Lightner & Holubar chapter (not cited inline anywhere), reconstructed a truncated `p [1]` statistic, stripped the "Would you like to explore..." trailing prompt. Marked `subspecialty: GURS` — URPS fellows don't manage urostomies.

**Bowel-pages cross-link mesh closed.** [bowel-anastomosis](docs/01-foundations/surgical-principles/bowel-anastomosis.mdx) / [bowel-handling-injury-management](docs/01-foundations/surgical-principles/bowel-handling-injury-management.mdx) / [reoperative-bowel-harvest](docs/01-foundations/surgical-principles/reoperative-bowel-harvest.mdx) / [bowel-segments](docs/01-foundations/tools/biomaterials/autologous-tissue/bowel-segments.mdx) now all bidirectionally cross-link. Fixed a broken `grafts/intestinal-segments` link in reoperative-bowel-harvest (real bug — page never existed at that path).

**Conventions established / reinforced:**

- **`lastReviewed` / `reviewer` / `subspecialty` / `key_point` frontmatter** is the canonical freshness + quiz + provenance metadata. Demonstrated on bowel-anastomosis + stoma-site-marking; freshness lint now reports 2 fresh / 1103 unreviewed.
- **Subspecialty "prove it" standard** — claim GURS or URPS only when the content is something the other fellowship would not be expected to own; default to combined when uncertain. Codified in the [questions.ts](src/data/quiz/questions.ts) tagging docblock with positive examples per bucket.
- **Stable parallel ref anchors** — when adding a new reference, also drop `<a id="ref-author-year-journal"></a>` next to the numbered anchor. Demonstrated on Burch 2000, Davis 2022, Kim 2021. Run `node scripts/migrate-stable-ref-ids.js --write <subdir>` to retrofit existing pages per-subdirectory.
- **CI is the source of truth** — every push runs lint + Vitest + typecheck + build. If it goes red, fix it, don't bypass.
- **Push-main cadence preserved** — 8 commits this session, each fast-forwarded and pushed to `origin/main` in the same step.

Full session detail in `CHANGELOG.md` under 2026-05-23.

---

## Previous Handoff - 2026-05-22 — Pharmacology trim, video embeds, nonantibiotic-UTI + pyeloplasty expansions, three new aseptic-technique pages

24 commits, all fast-forwarded to `main`. Lints + build clean across **1,172 files**.

**Pharmacology landing trimmed** — [pharmacology/index.mdx](docs/01-foundations/pharmacology/index.mdx) now ends at the `<GenericDatabase />` block (deleted the "Organizing Framework" / "Out of Scope" / "Development Status" prose). All 62 database rows had the **Clinical Use / Note column trimmed to ~8–12 words** each.

**Video embeds** — added `## Videos` (VideoCards, before `## References`) to 8 pages: parastomal-hernia, primary-endoscopic-realignment, blandy-perineal-urethrostomy, retropubic-midurethral-sling, Blandy flap, female-urethral-stricture, female-dorsal-onlay-urethroplasty, glans-resurfacing.

**Nasal speculum stub filled** — [nasal-speculum.mdx](docs/01-foundations/tools/instruments/retractors/nasal-speculum.mdx): Cottle/Vienna/Killian design table, transurethral midurethral-sling mesh-erosion section, posterior/redo-urethroplasty deep-perineal-corridor role.

**New pharmacology page** — [Vaginal Moisturizers & Lubricants](docs/01-foundations/pharmacology/hormonal-therapies/vaginal-moisturizers.mdx) (Hormonal Therapies); nonhormonal first-line GSM therapy, kept as one combined page.

**Consolidated-page expansions** — three `##` sections of [non-antibiotic-uti-prevention.mdx](docs/01-foundations/pharmacology/infection-prophylaxis/non-antibiotic-uti-prevention.mdx) (cranberry, D-mannose, methenamine) and three nondismembered subsections of [pyeloplasty.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/pyeloplasty.mdx) (Foley Y-V, Fenger, Culp-DeWeerd/Scardino-Prince) expanded in place; BMG pyeloplasty cross-wired between pyeloplasty.mdx and bmg-onlay-ureter.mdx.

**Three new aseptic-technique foundations pages** — [Laparoscopic Access](docs/01-foundations/surgical-principles/laparoscopic-access.mdx) (Surgical Principles), [Draping & Skin Antisepsis](docs/01-foundations/perioperative-care/intraoperative-care/draping-skin-antisepsis.mdx) and [Surgical Gloving](docs/01-foundations/perioperative-care/intraoperative-care/surgical-gloving.mdx) (Intraoperative Care).

**Convention reinforced** — when a topic already lives as a `##` section of a comprehensive consolidated page, expand it in place rather than spawning a per-agent / per-technique page. Also: verify a "new" reference against the existing reference list before appending (a duplicate Amón Sesmero 2016 citation slipped in and was caught/fixed mid-session).

Full session detail in `CHANGELOG.md` under 2026-05-22.

---

## Previous Handoff - 2026-05-18 (nutrition fill + RPF) — All 15 nutritional-assessment stubs filled + new RPF / Ureterolysis pair

17 commits, all fast-forwarded to `main`. Lints + build clean across **1,168 files**.

**Nutritional-assessment section completed** — all 15 stub pages under [docs/02-evaluation/laboratory-studies/nutritional-assessment/](docs/02-evaluation/laboratory-studies/nutritional-assessment/) filled out from ~30-line skeletons to full 150–250-line evidence-based articles with WARWIKI house-style citations. Each page has a dedicated **Reconstructive Relevance** section anchoring the lab / tool to specific reconstructive urology / urogynecology scenarios:

- [serum-albumin](docs/02-evaluation/laboratory-studies/nutritional-assessment/serum-albumin.mdx) + [prealbumin](docs/02-evaluation/laboratory-studies/nutritional-assessment/prealbumin.mdx) — ASPEN 2021 paradigm shift (markers of inflammation + nutrition risk, NOT malnutrition); Alfertshofer 200k-pt cohort, GLP-1 RA signal preserved.
- [transferrin](docs/02-evaluation/laboratory-studies/nutritional-assessment/transferrin.mdx) — Iron metabolism + ASPEN limitations + preop PBM framing (TSAT < 20% + ferritin < 100 ng/mL threshold for IV iron before cystectomy / diversion / phalloplasty).
- [c-reactive-protein](docs/02-evaluation/laboratory-studies/nutritional-assessment/c-reactive-protein.mdx) — Battistelli 2014 POD3 30-fold rise envelope (transferable to cystectomy / GAS / phalloplasty postop leak / abscess / SSI surveillance), 2025 ACC universal hsCRP rec, GLIM etiologic anchor.
- [vitamin-d](docs/02-evaluation/laboratory-studies/nutritional-assessment/vitamin-d.mdx) — 2024 Endocrine Society paradigm shift (no longer endorses specific thresholds; against routine screening); 5-scenario reconstructive framing (bowel-augmented bone disease, post-menopausal urogyn, GAS, post-bariatric, adult congenital / spina bifida).
- [iron-ferritin](docs/02-evaluation/laboratory-studies/nutritional-assessment/iron-ferritin.mdx) — Threshold table across WHO / AGA / IBD / HF / CKD / hemochromatosis; hyperferritinemic syndromes; **PBM operational tiers** for major elective reconstruction.
- [vitamin-b12](docs/02-evaluation/laboratory-studies/nutritional-assessment/vitamin-b12.mdx) — **THE defining reconstructive scenario** — ileal-bowel reconstruction (conduit, neobladder, augmentation, Indiana / Mainz, ileal-ureter); 3–5 yr hepatic buffer → classic delayed presentation a decade post-cystectomy; full surveillance schedule per AUA / SUFU.
- [folate](docs/02-evaluation/laboratory-studies/nutritional-assessment/folate.mdx) — NTD prevention (USPSTF A-rec) anchored on adult congenital / spina bifida transitional urology; preconception counseling is the reconstructive surgeon's job; B12-masking trap in ileal-bowel diversion patients.
- [zinc](docs/02-evaluation/laboratory-studies/nutritional-assessment/zinc.mdx) — Wound healing (topical zinc-oxide paste / Unna boot in pelvic-perineal wound care, Kjaer multinutrient bundle); **THE copper-myelopathy trap** (long-term zinc / denture-cream users walk in with new neurogenic bladder mimicking B12 SCD).
- [vitamin-a](docs/02-evaluation/laboratory-studies/nutritional-assessment/vitamin-a.mdx) — **THE chronic-corticosteroid pearl** (Hunt 1969 → 25,000 IU/day × 7–10 days perioperatively reverses steroid wound suppression in IBD / transplant / vasculitis patients facing reconstruction); cirrhotic paradox.
- [thiamine](docs/02-evaluation/laboratory-studies/nutritional-assessment/thiamine.mdx) — **Universal rule**: thiamine BEFORE glucose in any post-bariatric / AUD / hyperemetic / long-NPO patient with altered mental status; refeeding-syndrome integration (post-cystectomy ileus, ECF, radiation enteritis, post-exenteration).
- [copper](docs/02-evaluation/laboratory-studies/nutritional-assessment/copper.mdx) — Mirror of zinc page; copper-deficiency myeloneuropathy + new neurogenic bladder; **THE MDS-mimic trap** (always check copper before MDS workup in post-bariatric or zinc / denture-cream patient with cytopenias; 93% cytopenia resolution with replacement per Gabreyes 2013); D-penicillamine wound-healing caveat in Wilson disease.
- [body-composition](docs/02-evaluation/laboratory-studies/nutritional-assessment/body-composition.mdx) — **THE opportunistic CT L3-SMI on existing scans** (pre-cystectomy / RPLND / exenteration / trauma / surveillance), AI-enabled segmentation tools; sarcopenic-obesity trap (Khristenko 2024 79.7% normal-BMI cancer patients sarcopenic); BIA phase angle as 5-min bedside preop biomarker.
- [handgrip-strength](docs/02-evaluation/laboratory-studies/nutritional-assessment/handgrip-strength.mdx) — **THE most actionable bedside preop tool** ($200–400 Jamar, 60 sec, mortality OR 7.28 for low values in GI tumor surgery); EWGSOP2 / AWGS / SDOC triple-cutoff framework; serial-tracking prehabilitation argument.
- [screening-tools](docs/02-evaluation/laboratory-studies/nutritional-assessment/screening-tools.mdx) — MUST as surgical default (Petra 2025 n=1,649 best validated for major abdominal surgery); MNA-SF for older urogyn / cystectomy; mNUTRIC for ICU; PG-SGA for oncology reconstruction; GLIM two-step framework with full phenotypic × etiologic criteria.

**Source-content cleanup convention reinforced** — across all 15 pages, applied systematic cleanup of: truncated values (e.g., "BMI [N]" missing thresholds), mangled comparison tables (no delimiters), `undefined` figure captions, external openevidence lay-source links (against WARWIKI policy), trailing "Would you like to explore..." prompts, and **stray copy-paste refs** bleeding through from earlier source pages. Renumbered all body citations and reference lists sequentially per WARWIKI convention. This pattern is the standard recovery workflow for chatbot-assisted page drafts.

**New: Retroperitoneal Fibrosis (RPF) clinical condition + Ureterolysis surgical technique pair** — covers a reconstructive-urology gap:

- New [retroperitoneal-fibrosis.mdx](docs/03-clinical-conditions/03e-upper-tract/retroperitoneal-fibrosis.mdx) (Upper Tract Disorders, sidebar position 3 after UPJ obstruction + ureteral stricture). Idiopathic vs IgG4-related vs secondary classification; immunopathogenesis; 60–80% ureteral obstruction at presentation; CT / MRI / FDG-PET (medial-vs-lateral ureteral deviation as malignancy discriminator); Vaglio 2011 RCT prednisone > tamoxifen; combination immunosuppressant 98.9% vs 85.1% response; rituximab 88% radiologic improvement (Wallwork 2018); FDG-PET positive at EOT HR 3.47 relapse; 38–50% lifetime relapse rate. 22 refs.
- New [ureterolysis.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/ureterolysis.mdx) (Upper Tract Reconstruction, position 18). Stent / PCN first-line (comparable 21/18% complications; Santiago 2021 69% conservative resolution at median 16 mo; 15% ultimately need ureterolysis at median 2.2 yr). Three-approach comparison table (open 87.5–96% / 12% Clavien III–IV vs lap 91–93.8% / shorter LOS vs robotic ~100% small series / 33 mL EBL). **O'Brien 2017 timing data** (+25% GFR stent-failure group vs −10% nephrostomy-dependent group — defining "don't delay" data point). Inflammatory AAA section (5–10% of AAA, SVS retroperitoneal-approach OSR or EVAR; hydronephrosis resolution 69% open vs 38% EVAR). 19 refs.
- Wired ureterolysis into [upper-tract-reconstruction index database](docs/04-surgical-techniques/04d-upper-tract-reconstruction/index.mdx) (Substitution / Salvage row); cross-linked from [ureteral-stricture.mdx](docs/03-clinical-conditions/03e-upper-tract/ureteral-stricture.mdx) etiology table (closes hub-spoke loop for the inflammatory / infiltrative ureteral-stricture etiology category).

**Convention reinforced — split medical-content from surgical-content** when a clinical condition has a substantial dedicated reconstructive technique. Antipattern: cramming full ureterolysis details into the RPF condition page. Pattern: condition page describes disease + medical therapy, technique page describes operations + decision framework, both cross-linked. Same split already used for urethral stricture ↔ urethroplasty family.

Full session detail in `CHANGELOG.md` under the same date.

---

## Previous Handoff - 2026-05-18 (extended) — Algolia overhaul + instruments rebuild wave + build fix

~30 commits, all fast-forwarded to `main`. Lints + typecheck + build clean across **1,166 files**.

**Algolia search rebuilt (dashboard-only)**: full Crawler Editor overhaul — reference-list stripping (`<a id="refN">`, GAS footnotes, inline `<sup>` citations), nav/database/scaffolding strip, section-tier pageRank (Tier 1 = 80 for all clinical content, Tier 2 = 55 for roots/resources, default 40), landing penalty for sub-landings, `unordered(hierarchy.lvl1)` first in `searchableAttributes`, `desc(weight.pageRank)` first in `customRanking`, `exclusionPatterns` for homepage / /about / /docs/journal-club. New `algolia-synonyms.json` at repo root with ~90 multi-way groups (BMG, AUS, IPP, DVIU, VVF, BNC, VUAS, OAB, SUI, NLUTD, GAS, RARC, ileal conduit/Bricker, Y-V pyeloplasty, GLP-1 brand names, etc.) — uploaded via dashboard. `docusaurus.config.ts` bumped DocSearch `hitsPerPage` from 5 → 20. Full Crawler Editor config preserved in memory file `reference_algolia_crawler_config.md` for future rebuild.

**Instruments rebuild wave** — 7 new pages + ~14 expanded pages with full sourced evidence:

- **New**: [LigaSure](docs/01-foundations/tools/instruments/cautery/ligasure.mdx), [Lowsley Retractor](docs/01-foundations/tools/instruments/urethral-specialty/lowsley-retractor.mdx), [Ellik Evacuator](docs/01-foundations/tools/instruments/suction/ellik-evacuator.mdx), [Toomey Syringe](docs/01-foundations/tools/instruments/suction/toomey-syringe.mdx), [Gelman Visualizing Sound (CS7001)](docs/01-foundations/tools/instruments/sounds-bougies/gelman-visualizing-sound.mdx), [Haygrove Sound (restored)](docs/01-foundations/tools/instruments/sounds-bougies/haygrove.mdx), [Gelman RUG Adapter](docs/01-foundations/tools/instruments/urethral-specialty/gelman-rug-adapter.mdx).
- **Expanded SSLF device family**: Capio, Anchorsure, Saffron, i-Stitch (Manning 2014 vascular signal + Chene 2024/2025 NanoScope visual-guidance), Endostitch (corrected attribution to Schlesinger 1997 from fabricated 'Lantzsch'), Miya Hook (corrected to Frank S. Miyazaki 1987; Lo 2026 strongest pull-out 69.2 N vs 44.0 N Anchorsure), Deschamps (Amiri 2024 highest-blood-transfusion signal + Veronikis VLC subsection).
- **Expanded suction**: Yankauer (anesthesia/airway content removed per user scope), Frazier (3–12 Fr size-by-procedure routing).
- **Expanded graft-harvest family**: Dermatome Overview, Zimmer Air (Egro 2020 71.6% market + 0.1%/yr laceration risk), Padgett (Models B/PI/S + Hattori 2020 free-flap de-epithelialization), Humby (corrected to George Humby 1934, Tehrani 2006 medicolegal survey, Cohen 2020 pomelo simulator), Goulian/Weck (Dicran Goulian attribution, Jeffery 2007 shelving), Padgett-Hood drum (reframed around Kuo 2003 reused-graft niche — uniquely capable via adhesive drum on excised tissue), Skin Mesher (Henderson 2012 nominal-vs-actual expansion, over-vs-cross-meshing rule, Meek comparison).
- **Staplers (GIA) Hub** augmented with Kracht 1993 hemicolectomy RCT (stapled leak 2.8% vs handsewn 8.3%) + new safety section: Emile 2025 stapling-failures SR, Reddy 2023 MAUDE 24-yr mortality (676 deaths), Wexner Quadruple Intraoperative Assessment protocol.

**Index trimming**: deleted Specimen Retrieval Bag (Endo Catch), Laparoscopic Needle Holder, Gore Suture Passer rows. Earlier deleted Guyon / Haygrove / Gelman stub sound pages (Haygrove later restored as sourced page). Removed "Key Use" column from instruments database.

**Build fix (recovery)**: malformed `<sup>` closing tag in [mouth-retractors.mdx:91](docs/01-foundations/tools/instruments/retractors/mouth-retractors.mdx) (`</sup>` typed as `]`) broke `npm run build` and the Vercel deploy across multiple recent pushes. Diagnosed by running `npm run build` locally; fixed in this push. Build now clean.

**Convention reinforced — always run `npm run build` after MDX-with-raw-HTML edits** before declaring a push complete. The standard `npm run lint` catches citation pairing and broken `/docs/` links but does NOT validate JSX/HTML tag closure inside `<sup>` or other raw HTML — only the full Docusaurus build catches that class of error. Saved to user memory.

Full session detail in `CHANGELOG.md` under the same date.

---

## Previous Handoff - 2026-05-18 — Nutrition deep-dive, LSE classification, ICUD page, four new retractor pages, orphan-lint overhaul, title-disambiguation convention

Large session — **14 commits, all fast-forwarded to `main`**. Lints / typecheck / build clean across ~1,162 files.

**New dedicated atlas pages**:

- [Intracorporeal Urinary Diversion (ICUD)](docs/04-surgical-techniques/04c-urinary-diversion/intracorporeal-urinary-diversion.mdx) — relocated Principle 12 of urinary-diversion-principles into its own page; full robotic step-by-step for ileal conduit + orthotopic neobladder, Bricker vs Wallace, ICUD-vs-ECUD outcomes (IRCC, Katayama 2021, Zhang 2020, Mastroianni 2024 RCT), learning curve. 25 refs.
- [Intraoperative Bowel Handling & Injury Management](docs/01-foundations/surgical-principles/bowel-handling-injury-management.mdx) — new foundations page covering prevention (sharp adhesiolysis, atraumatic graspers, bipolar over monopolar, intestinal isolation bag, Seprafilm caveat, viscera retainer) and iatrogenic-injury management (small-bowel primary repair WSES 1B; colon paradigm shift to liberal primary repair / anastomosis per Fitzgerald 2025 EAST and Mitchao 2022; thermal-injury resect-don't-repair rule with Bishoff 1999 69%-missed signal; damage-control 48–72 h relook; EAF prevention / ChimneyVAC). 27 refs.

**Four new retractor pages** (all + index rows): [Collins](docs/01-foundations/tools/instruments/retractors/collins.mdx) (Charité Alexis-vs-Collins SSI RCT 1% vs 8% non-obese; BMI ≥ 40 benefit lost), [Gelpi](docs/01-foundations/tools/instruments/retractors/gelpi.mdx) (single-sharp-prong Weitlaner sibling; Datta 2004 60-min paraspinal-perfusion rule), [O-Ring / Plastic Sheath Wound Retractor](docs/01-foundations/tools/instruments/retractors/o-ring-wound-protector.mdx) (Alexis / Mobius / O Trac; JAMA Surg 2024 46.8% SSI RRR; ASCRS 2024 strong; WSES Grade 1B dual-vs-single; **cost-effectiveness section** with Chomsky-Higgins 2019 dominant in colorectal vs ROSSINI 2014 single-ring not-cost-effective signal), and [Viscera Retainer (FISH / Glassman)](docs/01-foundations/tools/instruments/retractors/viscera-retainer.mdx) (with evidence-gap section: no RCT shows outcome reduction; framed against 1.9% AHSQC / 12.8% adhesiolysis / 19–20% reoperative enterotomy incidence).

**Nutrition build-out**:

- **Expanded [Perioperative Nutrition](docs/01-foundations/perioperative-care/postoperative-management/nutrition.mdx)** with three new sections (28 new refs, 32–59):
  - **Nutrition and Wound Healing — The Reconstructive Evidence** — Alfertshofer 2026 200k-pt albumin analysis, Bruno 2026 abdominoplasty protein RCT (dehiscence 6% vs 17%), Herzog 2024 H&N flap 3.4× failure, Panayi 2024 frailty + hypoalbuminemia NSQIP, Saeg 2021 micronutrient table, Kjaer 2020 multinutrient collagen-synthesis RCT.
  - **Expanded urology immunonutrition** — Khaleel 2021, Hamilton-Reeves 2018 pilot RCT, Amer 2025 RCT (LOS 7.8 vs 10.6 d), Cochrane Burden 2019, INCyst trial protocol; new **Urogynecologic ERAS Nutrition** subsection (AUGS-IUGA 2022 + ACOG 750).
  - **GLP-1 Receptor Agonists in Perioperative Care** — candidacy expansion (Sidhu 2025 DIEP n = 5,618), mixed wound-healing signal reconciled via protein deficit (Lee 2025, Koenig 2026, Aschen 2025); ADA 2026 personalized aspiration framework; **OCULUS RCT** counter-evidence (holding doesn't empty stomach); Mehta 2025 protein-timing protocol.
- **New evaluation subsection — [Nutritional Assessment](docs/02-evaluation/laboratory-studies/nutritional-assessment/index.mdx)** under Evaluation → Laboratory Studies. Comprehensive landing (ACS framework, full lab table, MUST / NRS-2002 / MNA-SF / GLIM, body-composition workup; 11 refs) plus **15 per-test stub pages** ready to fill out: serum-albumin, prealbumin, transferrin, c-reactive-protein, vitamin-d, iron-ferritin, vitamin-b12, folate, zinc, vitamin-a, thiamine, copper, screening-tools, handgrip-strength, body-composition.

**Urethral stricture / LS rebuild**:

- **[urethral-stricture.mdx](docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx) Classification section** — corrected "Severity" → **Segment** in LSE; added full Erickson 2020 classification, the 2025 LSE staging system (I–V with substages, Urethroplasty Triad Score), and a comparison table with U-Score / ULTRA / cystoscopy / Gombe systems (John 2021 SR). 6 new refs.
- **[lichen-sclerosus.mdx](docs/03-clinical-conditions/03g-genital-scrotal/lichen-sclerosus.mdx) LS Urethral Stricture section** — replaced brief paragraph with comprehensive reconstructive block: AUA 2023 principles, Kurtzman 2021 one-stage BMG meta-analysis (10%/18% recurrence, penile-invagination superiority p = 0.004), Kulkarni vs Asopa head-to-head (Wan 2023), two-stage BMG data with Palminteri 2022 12-mo interval rule, full perineal urethrostomy evidence (Patel, Fuchs, Klemm, Zhao 2025 meta), LS decision-framework table, cross-links to all named technique pages and the LSE-staging anchor. 14 new refs (37–50, with duplicate Chung 2020 collapsed and 39–50 renumbered to 38–49).

**"Shorter ureters, fewer strictures"** — Das 2024 (OR 0.73, 95% CI 0.58–0.92; median resection 2.3 cm vs 1.65 cm) added to [ileal-conduit](docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx) as the perfusion-driven counter-intuitive principle; cross-callout in Principle 5 (Achilles heel) of urinary-diversion-principles.

**Orphan-lint overhaul** — fixed [scripts/check-orphans.js](scripts/check-orphans.js) on two dimensions: (1) honor frontmatter `slug:` overrides; (2) count GenericDatabase / data-array `slug:` entries as valid inbound paths. Result: **95 false-positive orphans → 4 real → 0 after cleanup**. Real orphans fixed by adding DB rows (Lotus Petal, Singapore, Laminated Gracilis to male-urethroplasty; Tissue-Engineered Grafts cross-linked from grafts hub). Wired Peyronies [prosthesis-with-straightening.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies-disease/prosthesis-with-straightening.mdx) inline at first mention to scratch-technique / manual-modeling / sliding-slicing-techniques deep-dive companions — addresses the user-raised pattern re: hidden deep-dive pages findable only by search.

**Title-disambiguation convention** — 22 files updated with parenthetical suffix when titles actually collide across sections (URLs unchanged):

- Identical-title pairs: **AUS** → (Device) / (Procedure); **Erectile Dysfunction** → (Condition) / (Procedures); **Testicular Reimplantation** → (Condition) / (Procedure); **Botulinum Toxin** → (Neuromodulation Adjunct) / (OAB / Storage); **PDE5 Inhibitors** → (Pharmacology) / (Procedures); **Non-Binary / Nullification** → (Procedures) / (Special Population).
- BPH device/procedure pairs standardized to (Device) / (Procedure): ProACT, iTind, Optilume BPH, Aquablation.
- Same-eponym instrument pairs got instrument type: Iris **Forceps**, Heaney **Clamp** (siblings already had "Scissors" / "Needle Driver").
- Fistula "...Repair" pairs and overview.mdx section-disambiguated pages left alone. Convention saved to user memory for future sessions.

**CSS** — table top-margin tightened ([custom.css](src/css/custom.css:240)) when a table directly follows a `<p>`: ~ 44 px → ~ 20 px.

**Algolia search** (dashboard-only, no repo commit) — diagnosed PageRank-backward + GenericDatabase-content-pollution; recommended Crawler-Editor recordExtractor with reversed pageRank tiers, exclusion of references / `.section-stack` / `.toc-list` / tables / `.GenericDatabase`, breadcrumb-anchored `lvl0`, and `desc(weight.pageRank)` as first custom-ranking attribute. Owner applied and confirmed improvement; reference-strip drop required raising SafeReindex threshold 30% → 70% for the one-time republish.

**Conventions reinforced**:

- **Disambiguate duplicate page titles with parenthetical suffix** when (and only when) titles actually collide; URLs unchanged.
- **Hidden pages must be reachable via inline prose cross-link** from the consolidated parent — search-only access is unacceptable for deep-dive content.
- **GenericDatabase slugs count as inbound links** for orphan-lint purposes.

Full session detail in `CHANGELOG.md` under the same date.

---

## Previous Handoff - 2026-05-16 — Instruments build-out: endoscopy + robotic subdirectories, sounds-bougies completion, urinary-diversion principles

Continued the comprehensive instruments build from 2026-05-15. **~50 commits across ~40 new / expanded instrument pages and one urinary-diversion-principles update**, all fast-forwarded to `main`. Lints clean throughout (~1,140 files).

**Sounds & Bougies completion** — new pages: [hegar-dilators](docs/01-foundations/tools/instruments/sounds-bougies/hegar-dilators.mdx) (Kaplan 2015 postmenopausal labial-fusion separation), [dittel](docs/01-foundations/tools/instruments/sounds-bougies/dittel.mdx) (Sarin 2021 female-stricture-dilation 49% pooled / Santucci 2008 office overutilization), [s-dilators](docs/01-foundations/tools/instruments/sounds-bougies/s-dilators.mdx) (Herschorn / Carrington 2007), [filiforms-followers](docs/01-foundations/tools/instruments/sounds-bougies/filiforms-followers.mdx) (Heyns 1998), [otis-urethrotome](docs/01-foundations/tools/instruments/sounds-bougies/otis-urethrotome.mdx) (Schultz vs Nielsen 1989 pre-TURP debate), [sachse-urethrotome](docs/01-foundations/tools/instruments/sounds-bougies/sachse-urethrotome.mdx) (21 Fr DVIU workhorse; Giannakopoulos 1997 / Farrell 2017 MMC), [balloon-dilator](docs/01-foundations/tools/instruments/sounds-bougies/balloon-dilator.mdx) (radial-vs-axial; anatomic-hub table), [guidewires](docs/01-foundations/tools/instruments/sounds-bougies/guidewires.mdx) (Amasyali 2020 four-category data; Dutta 2016 "Death of the safety wire"). Substantially expanded [van-buren](docs/01-foundations/tools/instruments/sounds-bougies/van-buren.mdx). **Deleted** Goodwin Sound row (likely fabricated attribution).

**Retractors** — added [pederson](docs/01-foundations/tools/instruments/retractors/pederson.mdx) (ACOG-recommended narrow speculum) and [lighted-retractors](docs/01-foundations/tools/instruments/retractors/lighted-retractors.mdx) (Lumitex LightMat® + Kokosis 2020 headlamp-pain OR 2.5 surgeon-ergonomics framing). Fixed Pedersen cross-link on Graves.

**Urethral & Pelvic Specialty** — added [midurethral-sling-trocars](docs/01-foundations/tools/instruments/urethral-specialty/midurethral-sling-trocars.mdx) (renamed from "Tunneler" to WARWIKI's "trocar" convention; full IVS / TVT / TVT-Exact / outside-in / inside-out / mini-sling / Stamey-substitute family table; Zahn 2007 cadaveric data; Ludwig TOT 8/4; Kim 2019 high-risk meta), [single-tooth-tenaculum](docs/01-foundations/tools/instruments/urethral-specialty/single-tooth-tenaculum.mdx) and [jacobs-tenaculum](docs/01-foundations/tools/instruments/urethral-specialty/jacobs-tenaculum.mdx) (Andrews 2023 / Samy 2019 / ACOG 2025; deleted Bozeman row), [vessel-loops](docs/01-foundations/tools/instruments/urethral-specialty/vessel-loops.mdx) (Moore / Manship 1985 SEM endothelial-injury data; shoelace-technique RCTs), [probe-grooved-director](docs/01-foundations/tools/instruments/urethral-specialty/probe-grooved-director.mdx), [bladder-scanner](docs/01-foundations/tools/instruments/urethral-specialty/bladder-scanner.mdx) (Chrouser 2024 RAND/UCLA ≥500 mL threshold; Palese 2010 CAUTI OR 0.27; Mavani 2025 obesity caveat; post-augmentation non-validation), [laparotomy-pads](docs/01-foundations/tools/instruments/urethral-specialty/laparotomy-pads.mdx) (Stone 1983 damage-control 7%→65% survival; Brown 2025 ACOG accreta packing; Inaba 2016 RFD 100% sensitivity), [ray-tec-sponges](docs/01-foundations/tools/instruments/urethral-specialty/ray-tec-sponges.mdx) (4×4 sponge-stick workhorse; never-in-abdomen rule).

**Clamps** — added [backhaus](docs/01-foundations/tools/instruments/clamps/backhaus.mdx) (penetrating-vs-non-penetrating; Lhotka 1998 nickel-allergy; David 2020 negative-pressure-drape rationale).

**NEW `endoscopy/` subdirectory** (sidebar position 13, 8 pages): [rigid-cystoscope](docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx) (lens-angle table; AUGS 2018 cystoscopy-at-prolapse; Otis-Chapados 2022 AUS-cuff safe-passage table), [flexible-cystoscope](docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx) (chip-on-tip vs fiberoptic; single-use-vs-reusable Holmes 2023 / Seyam 2020 / Assmus 2022 $185 vs $272), [semi-rigid-ureteroscope](docs/01-foundations/tools/instruments/endoscopy/semi-rigid-ureteroscope.mdx) (Dretler/Cho 1989; Omar 2022 4.5/6 vs 6/7.5 Fr; Sunaryo 2022 OR 1.71 URS stricture), [flexible-ureteroscope](docs/01-foundations/tools/instruments/endoscopy/flexible-ureteroscope.mdx) (Belkovsky 2024 single-use meta; Gauhar 2025 dusting + TFL signal; AUA/SUO 2023 UTUC kidney-sparing), [resectoscope](docs/01-foundations/tools/instruments/endoscopy/resectoscope.mdx) (Cochrane Alexander 2019 mono-vs-bipolar TUR-syndrome 18 vs 3 / 1000; Teoh 2024 ERBT 29% vs 38%), [collins-knife](docs/01-foundations/tools/instruments/endoscopy/collins-knife.mdx) (TUIP / TUIBNC / external sphincterotomy / NU bladder-cuff; **deleted** Cold-Cup Biopsy Forceps and Bugbee Electrode rows), [resection-loop](docs/01-foundations/tools/instruments/endoscopy/resection-loop.mdx) (Bhalla 2007 90% tensile loss at 30° bend; Sharma 2021 bipolar OR 0.27 artifact; Mancon 2025 bipolar ERBT HR 0.24), [vaporization-electrode](docs/01-foundations/tools/instruments/endoscopy/vaporization-electrode.mdx) (Hoekstra 2010 10-yr 11% vs 23% favoring TURP; Huang 2019 network-meta favoring enucleation).

**NEW `robotic/` subdirectory** (sidebar position 14, ~10 pages): **bipolar trio** [maryland-bipolar](docs/01-foundations/tools/instruments/robotic/maryland-bipolar.mdx) + [fenestrated-bipolar](docs/01-foundations/tools/instruments/robotic/fenestrated-bipolar.mdx) + [force-bipolar](docs/01-foundations/tools/instruments/robotic/force-bipolar.mdx); **grasper trio** [prograsp](docs/01-foundations/tools/instruments/robotic/prograsp.mdx) (Ramirez 2016 three-instrument 40% cost-reduction RARP; Lee 2015 1.84–3.37× posture-dependent grip) + [cadiere](docs/01-foundations/tools/instruments/robotic/cadiere.mdx) (bowel-handling for urinary diversion; Single-Site availability) + [tip-up-fenestrated](docs/01-foundations/tools/instruments/robotic/tip-up-fenestrated.mdx) (perpendicular-lift vector); **energy instruments** [monopolar-curved-scissors](docs/01-foundations/tools/instruments/robotic/monopolar-curved-scissors.mdx) (Overbey 2021 stray-energy; Wikiel 2023 cVRG-vs-cPRG 4.4 vs 41.1 °C; cold-only-for-NVB pearl) + [cautery-hook](docs/01-foundations/tools/instruments/robotic/cautery-hook.mdx) (Lee 2020 colectomy LN harvest signal) + [harmonic-ace](docs/01-foundations/tools/instruments/robotic/harmonic-ace.mdx) (ultrasonic; **no-EndoWrist as defining trade-off**, assistant-port workflow Kakeji 2015 251 vs 306 min); **consolidated pages** [needle-drivers](docs/01-foundations/tools/instruments/robotic/needle-drivers.mdx) (Large + Mega + SutureCut + Mega SutureCut + Black Diamond Micro with anchor routing; **emphasized sacrocolpopexy mesh-to-vagina (SutureCut) and mesh-to-promontory (Mega SutureCut)** per user request; Lai 2019 + Sudarman 2026 96% flap-survival vs Symani/MUSA) and [vessel-sealers](docs/01-foundations/tools/instruments/robotic/vessel-sealers.mdx) (VSE + SynchroSeal with anchors; Pilz da Cunha 2024 48 vs 95 mL; Birgin 2026 SAMBA wet-sealing); [robotic-stapler](docs/01-foundations/tools/instruments/robotic/robotic-stapler.mdx) (Saxena 2025 RARC ileo-ileal n = 170; Holzmacher 2017 cost / fires-per-patient).

**Biomaterials linking** — created [open-ended-ureteral-catheter](docs/01-foundations/tools/biomaterials/ureteral-stents/open-ended-ureteral-catheter.mdx), [ureteral-access-sheath](docs/01-foundations/tools/biomaterials/ureteral-stents/ureteral-access-sheath.mdx) (Traxer 2013 PULS classification; Ali 2026 6 N force threshold; FANS-suction sheaths), and [three-way-catheter](docs/01-foundations/tools/biomaterials/urinary-catheters/three-way-catheter.mdx) (Davis 2016 CSA-not-French; Clarebrough 2018 CATCH-22 protocol). Linked existing comprehensive [double-j-stent](docs/01-foundations/tools/biomaterials/ureteral-stents/double-j-stent.mdx) and [nephrostomy-tube](docs/01-foundations/tools/biomaterials/ureteral-stents/nephrostomy-tube.mdx) biomaterials pages from the instruments-index rows.

**Surgical-principles update** — added **Principle 12 — Intracorporeal Reconstruction Is Now the Default Robotic Approach** to [urinary-diversion-principles](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx). IRCC 9% → 97% adoption (Hussein 2018), ICUD-vs-ECUD outcomes table (transfusion 4% vs 19%, 90-d major-complications OR 0.57 at high-volume centers, LN yield +3.68), Mastroianni 2022 / 2024 only RCT vs open RC, volume + comorbidity modifiers, cross-link to [robotic stapler](docs/01-foundations/tools/instruments/robotic/robotic-stapler.mdx) and [staplers index](docs/01-foundations/tools/instruments/staplers/index.mdx). 9 new refs (30–38).

**Conventions reinforced**:
- **Consolidation pattern** — when 2–5 variants share 80%+ content, consolidate into one page with anchor-fragment routing per variant from the index rows (needle-drivers and vessel-sealers as worked examples; vercel redirects for retired slugs). Peer instruments with genuinely distinct roles (Maryland / Fenestrated / Force bipolar trio; ProGrasp / Cadiere / Tip-Up grasper trio) stay separate.
- **Push-main-cadence memory** saved — every commit fast-forwards `main` and pushes `origin main` in the same step (Vercel deploys from main). Documented in `feedback_push_main_cadence.md`.
- **Index-row use-column conciseness** — rebalanced when the user flagged the table becoming too spaced out. House style is ~ 10–15 word use descriptions, not 30–40-word sentences.

**Deletions**: Goodwin Sound row, Bozeman Uterine Dressing Forceps row, Cold-Cup Biopsy Forceps row, Bugbee Electrode row, Large Needle Driver and Mega Needle Driver standalone pages (consolidated with redirects), SynchroSeal standalone page (consolidated with redirect).

Full session detail in `CHANGELOG.md` under the same date.

---

## Previous Handoff - 2026-05-15 — Full instruments-section rewrite

Comprehensive, evidence-based expansion of the entire `01-foundations/tools/instruments/` directory — **43 commits across ~55 instrument pages** spanning tissue forceps, needle holders, clamps, scissors (new subdirectory), cautery, retractors, urethral & pelvic specialty. House-style template established: design → RU/urogyn uses → comparison table → technique pearls → safety profile → named historical context → cross-links → references. Historical-attribution corrections (Crawford, Richardson, Hegar, Graves). Lints clean across ~1,095 files. Full detail in `CHANGELOG.md` under 2026-05-15.

The 2026-05-16 build-out above (endoscopy + robotic subdirectories, sounds-bougies completion, consolidation pattern, urinary-diversion-principles update) is a direct continuation.

---

## Older Handoffs

All session detail from 2026-05-14 and earlier is archived in [CHANGELOG.md](CHANGELOG.md). For commit-level history, see `git log --oneline`.

---

## Non-Negotiables

Before writing or modifying an article:

1. Scope: primary topics must fit reconstructive urology, functional urology, or urogynecology. Out of scope as primary topics: endourology for stones and primary urologic oncology. Reconstructive consequences are fine.
2. Voice: write for reconstructive surgeons and urogynecologists, not patients or general medicine readers. Keep operative relevance, anatomy, decision points, complications, and outcomes.
3. Citations: use real published references only. Default citation pattern is inline `<sup>[[N]](#refN)</sup>` plus `<a id="refN"></a>N. ...` anchors. GAS pages use footnotes (`[^N]`). Do not fabricate citations.
4. Cross-link instead of duplicating: when a nearby hub already owns anatomy, pharmacology, physiology, or workflow detail, link to it and keep the new page narrow.
5. Hidden atlas pages must still be reachable through explicit database or hub links so orphan lint passes.

Before committing:

1. Run `npm run lint`.
2. If stubs were added or filled, run `npm run status`.
3. If articles, links, routes, MDX, or React changed, run `npm run typecheck` and `npm run build`.
4. Run `git diff --check`.

---

## Commands

| Task | Command |
|---|---|
| Dev server | `npm start` |
| Production build | `npm run build` |
| TypeScript | `npm run typecheck` |
| Full lint | `npm run lint` |
| Scope lint | `npm run lint:scope` |
| Citation lint | `npm run lint:citations` |
| Orphan lint | `npm run lint:orphans` |
| Internal links | `npm run lint:links` |
| Reference-density advisory | `npm run lint:density` |
| Stub tracker | `npm run status` |
| Regenerate stats | `npm run stats` |

`npm run build` runs `prebuild` and regenerates `src/data/stats.json`.

---

## Project Shape

WARWIKI is a Docusaurus v3 medical reference wiki for functional urology and genitourinary reconstruction. Audience: urology residents, fellows, reconstructive surgeons, and urogynecologists.

Top-level docs:

| Directory | URL |
|---|---|
| `docs/01-foundations/` | `/docs/foundations` |
| `docs/02-evaluation/` | `/docs/evaluation` |
| `docs/03-clinical-conditions/` | `/docs/clinical-conditions` |
| `docs/04-surgical-techniques/` | `/docs/surgical-techniques` |
| `docs/05-special-populations/` | `/docs/special-populations` |
| `docs/06-journal-club/` | `/docs/journal-club` |
| `docs/07-roots/` | `/docs/roots` |
| `docs/08-resources/` | `/docs/resources` |

URL rules:

- Docusaurus strips numeric prefixes from top-level dirs only: `03-clinical-conditions` becomes `/docs/clinical-conditions`.
- Alphanumeric subsection prefixes stay in URLs: `04a-urethral-reconstruction` stays `04a-urethral-reconstruction`.
- Same-name file/dir collapses: `oral-cavity/oral-cavity.mdx` serves at `/docs/.../oral-cavity`.
- Vercel uses `cleanUrls: true` and `trailingSlash: false`.

Key files:

| File | Purpose |
|---|---|
| `docusaurus.config.ts` | Site config, navbar, Algolia, metadata, broken-link behavior |
| `sidebars.ts` | Sidebar wiring |
| `src/css/custom.css` | Main custom styling and reusable classes |
| `src/components/GenericDatabase.tsx` | Searchable/filterable database component |
| `src/components/VideoCards.tsx` | Lazy YouTube card grid |
| `src/components/SurgeonsExplorer.tsx` | GURS/URPS genealogy explorer |
| `src/data/surgeons.ts` | Surgeon records and dynasty data |
| `src/data/stats.json` | Generated article/reference counts |
| `scripts/check-*.js` | Lint checks |
| `scripts/gen-status.js` | Stub tracker generator |
| `docs/_STATUS.md` | Current stubs and priorities |
| `CHANGELOG.md` | Session history archive |

---

## Article Pattern

Default clinical article:

```mdx
---
title: Short Sidebar Title
sidebar_position: N
---

# Full Article Title

Opening paragraph with reconstructive relevance and an early citation.

---

## Epidemiology
## Etiology / Pathophysiology
## Clinical Presentation / Diagnosis
## Classification / Staging
## Management
## Complications
## Outcomes / Follow-Up
## References

<a id="ref1"></a>1. Last FM, et al. "Article Title." *Journal.* Year;Volume(Issue):Pages. doi:[10.xxxx/...](https://doi.org/10.xxxx/...)
```

Citation rules:

- Inline: `<sup>[[1]](#ref1)</sup>`.
- Multiple: `<sup>[[1]](#ref1)[[2]](#ref2)</sup>`.
- References go after a `---` separator at the end.
- Include DOI links when available.
- Cite guidelines, RCTs, systematic reviews, and high-volume series when applicable.
- Keep reference numbering contiguous; use `scripts/fix-citations.js` only when appropriate and review the result.

GAS citation variant:

- Use footnotes consistently within GAS pages: inline `[^1]`, bottom `[^1]: ...`.

MDX gotchas:

- Escape prose angle brackets: `&lt;35 kg/m2`, not `<35 kg/m2`.
- Escape ampersands in JSX attributes: `RUG &amp; VCUG`.
- No `$$...$$` LaTeX; math plugins are not installed.
- Raw HTML must be valid JSX.
- Landing pages use `hide_title: true`, which also suppresses the TTS ArticleListener.

---

## Content Standards

Scope:

- In scope: urethroplasty, ureteral reconstruction, reimplantation, pyeloplasty, bladder augmentation, catheterizable channels, urinary diversion framed reconstructively, fistula repair, incontinence surgery, AUS/IPP, Peyronie's, ED surgery, GAS, hypospadias, prolapse, perineal reconstruction, neurogenic bladder, voiding dysfunction, and functional pelvic disorders.
- Out of scope as primary topics: PCNL, ureteroscopy for stones, radical cystectomy/nephrectomy/prostatectomy as cancer operations.
- Gray zone: acceptable only when framed as reconstructive consequence, such as radiation injury, post-prostatectomy stricture, post-cystectomy diversion complications, or RUF after prostate cancer treatment.

Voice and accuracy:

- Formal academic prose, active voice, no consumer-health disclaimers.
- Be specific with complication rates, success rates, follow-up intervals, and evidence quality.
- Tables are preferred for comparisons and operative decision logic.
- Cut general-medicine depth that does not alter reconstructive decisions.

Source cleanup for chatbot-assisted drafts:

- Remove trailing "Would you like..." prompt text.
- Remove placeholder figure text unless embedding a real image.
- Rebuild mashed markdown tables.
- Convert bracket citations to the site citation pattern.
- Check that every cited reference supports the claim and that every anchor is used.
- Watch for copied `undefined`, malformed `p[N]`, and wrong acronym links.

---

## Atlas And Database Conventions

Treatment-atlas preferred pattern:

1. Section landing page is itself the searchable database.
2. A short "General Principles" block appears above the database when useful.
3. Named technique pages are linked from database rows.
4. Redundant overview pages are hidden from the sidebar when the landing already serves that role.

Database row naming:

- Use bare procedure names with optional acronym only.
- Do not add indication, uniqueness, FDA status, evidence claims, or long parentheticals to row names.
- Keep notes only when not every row has a dedicated page. Once every row has a full page, drop duplicated notes if the section pattern supports it.

Hidden pages:

- Page frontmatter can use `sidebar_class_name: sidebar-hidden-item`.
- Hidden directories use `_category_.json` with `"className": "sidebar-hidden-category"`.
- Hidden pages still need explicit links from a visible hub/database.

Current locked examples:

- Male cosmetic database: notes dropped after every row gained a dedicated page.
- Female cosmetic database: notes remain until every row has a dedicated per-device page.
- Energy-device cosmetic pages must distinguish surgical cutting-tool use from nonsurgical "rejuvenation" marketing and FDA warnings.

---

## Index And Landing Pages

Every section has an `index.mdx` with `hide_title: true`.

Top-level landings use `section-stack`:

```mdx
<ul className="section-stack">
  <li>
    <a href="/docs/section/subsection" className="section-stack-title section-stack-link">Subsection Title</a>
    <span className="section-stack-desc">One-line description.</span>
  </li>
</ul>
```

Deeper indexes may use `toc-list` and optional `toc-chips`:

```mdx
<ul className="toc-list">
  <li>
    <a href="/docs/.../page"><strong>Page Title</strong></a>
    <span className="toc-desc">Description.</span>
    <div className="toc-chips">
      <a href="/docs/.../child">Child</a>
    </div>
  </li>
</ul>
```

Use linked `<a>` titles for sections with real landings; use `<span className="toc-section">` for non-clickable headings.

---

## Components And Assets

VideoCards:

```mdx
import VideoCards from '@site/src/components/VideoCards';

<VideoCards videos={[
  { id: 'JVOycQzgHN0', title: 'Kidney anatomy', subtitle: 'Gross and vascular overview' },
]} />
```

- `id` is only the YouTube ID.
- Place `## Videos` immediately before `## References`.

Anatomy images:

- Store in `static/img/anatomy/`.
- Embed as `![Alt text](/img/anatomy/file.ext)` followed by an italic caption.
- Use public-domain or CC sources such as Gray's Anatomy, OpenStax, and Blausen.
- Never create caption-only figure blocks.

Surgeon profiles:

- Profiles live at `docs/07-roots/surgeons/{a-g|h-r|s-z}/{name}.mdx`.
- `SurgeonDirectory` and `SurgeonTree` must link with `s.path`, not `s.id`, because alpha-group folders are part of the URL.
- `docs/07-roots/surgical-lineage.mdx` hosts `<SurgeonsExplorer defaultSubspecialty="GURS" />`; the surgeons category is hidden from the sidebar.

---

## Design And Navigation

Brand:

- Primary blue: `#185FA5`.
- Clean academic style, not consumer health.
- Add dark-mode CSS variants for new light-only colors.

Navbar:

1. Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations.
2. Library dropdown: Journal Club, Resources, History & Lineage.
3. Search.
4. About.
5. GitHub icon.

Homepage:

- `WARWIKI` title links to `/docs/foundations`.
- Tagline: `Reconstruction, codified.`
- Search pill text: `Where should we start?`

---

## Current Section Notes

- Foundations: Anatomy & Physiology, Surgical Principles, Surgical Skills, Perioperative Care, Pharmacology, Tools.
- Treatment Atlas: landing-page-as-database pattern is preferred; 04b bladder, 04a urethral, and 04c urinary diversion are examples.
- Incontinence lives under `04f-incontinence-procedures/`; old `04h-prosthetics/` was deleted.
- History & Lineage uses `SurgeonsExplorer`; hidden surgeon pages are reached through the genealogy page.
- Hidden Curriculum now lives under Resources at `docs/08-resources/hidden-curriculum/`.

Current stub list is generated in `docs/_STATUS.md`. Run `npm run status` after filling stubs.

---

## History

Keep only the live handoff and durable conventions here. For historical detail:

- `CHANGELOG.md` has the rolling session archive.
- `git log --oneline` has commit-level history.
- `docs/_STATUS.md` has the active stub backlog.

Last compacted: 2026-05-18.
