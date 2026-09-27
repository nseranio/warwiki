# WARWIKI next phase: close the audit, improve the site, align smartphrases and cards

Written September 26, 2026 (after commit `9d93ce5c`). Supersedes step 6 of [RESUME-NEXT.md](RESUME-NEXT.md). Open decisions and sources are also in [needed-from-user.md](needed-from-user.md); this plan adds priorities, stage standards and how to run it on Sonnet 5.

## Starting point

- The audit queue is complete (1,073 pages, none partial). Decisions 1 to 16, 19, 21 and 22 are applied. About 75 sources supplied September 26 are checked.
- `open-items.md` and `sources-needed.md` predate the September 26 sources and still request supplied items (IC/BPS, Peyronie's, ASRA, MIBC, ASCRS). Rebuild them before using them.
- About 880 of 1,075 status notes still contain open-claim wording. Rough keyword counts (overlapping): abstract-only numbers ~330, technique or device-manual details ~240, guideline grade or wording ~220, doses and labels ~130, history and eponyms ~60, contraindications and warnings ~30. Most are limits on verification, not errors.
- Retrievable without the user: the MASTER 12-month paper (Eur Urol 2021, doi 10.1016/j.eururo.2021.01.024) is open access; openFDA labels work by `curl` (Botox label, November 2023, confirmed); Campbell-Walsh-Wein 13th ed and *Pocket Guide to Urology* (2021) are in `~/Documents/Medicine/Urology/General Urology`.
- The user's smartphrases and cards: `~/Documents/Jefferson Einstein/Practice Building/AI/Smartphrase Corpus` (36 units, 384 phrases: 354 approved, 30 draft; 77 draft cards; pipeline and checks; read its `STATE.md` and `CLAUDE.md` first). Nothing from it goes into this public repository.

## 1. Needed from the user

### Decisions (recommendation in brackets)

Clinical stance:
1. #32 genital trauma abuse assessment [ACS exam under anesthesia leads; forensic position attributed].
2. #29 `steroids.mdx` [ESE Table 8 default leads; alternative kept, attributed].
3. #33 pentosan polysulfate [keep EAU, CUA 2025 and AUA; add label retinal warning].
4. #34 GreenLight 80 W [keep both].
5. #30 female urethrectomy without neobladder [keep AUA and EAU].

Editorial:
6. #27 reword audit-style `evidenceNote` frontmatter (broader search finds ~129 pages) [yes].
7. #28 remove Spectra, Genesis, TUBE sell-sheet claims on `implant-models.mdx` [yes].
8. #31 MIBC metabolic follow-up on `mainz-pouch-ii.mdx` [yes].
9. (a) US PTNS label stated separately [yes].
10. (b) cite undated ASCRS diverticular chapter [yes, "n.d."].
11. #35 Canadian Axonics manuals [try US manuals online first; ask only if blocked].
12. (e) unpublished MASTER 24-month SAE counts [close; use 12-month paper].

Plan level (answered September 27, applied):
13. Lift the hold on the textbook pilot -- yes. Not the targeted grep-only version in section 3 below; the user reviewed the library directly and approved a 19-book queue (broader than "about 15"), run through the full CODEX-PROMPT.md mining procedure. See [library-queue.md](../textbook-mining/library-queue.md).
14. Separate Pass 2 voice sweep -- no, confirmed. Pass 2 stays gated to pages the audit itself touches (per STYLE.md section 8); no dedicated sweep over the whole site.
15. Reviewer fields filled only for pages the user reviews, others blank -- confirmed, already the status quo (no automation auto-fills `reviewer`; only 2 pages currently carry it, both set by Claude during early frontmatter-convention work).

### Sources

Status: **Inaccessible** = located, cannot open. **Not searched** = not yet looked for. **Inconclusive** = read, did not settle.

True blockers:

| # | Item | Status | Pages | Settles |
|---|---|---|---|---|
| 1 | Laor E, et al. Outcome prediction in patients with Fournier's gangrene. *J Urol* 1995;154:89-92 | Inaccessible | `fourniers-gangrene` | FGSI sodium and bicarbonate cutoffs (bedside score) |
| 2 | Biardeau X, et al. ICS AUS consensus report. *Neurourol Urodyn* 2016;35 Suppl 2:S8-24 | Inaccessible | AUS procedure and device | catheterization thresholds, consensus positions; AUS cards |
| 3 | AMS 800 operating room manual 92116967 | Not in hand | AUS procedure and device | fill volumes by approach, tandem cuff; user default 23 mL |
| 4 | Coloplast Titan, Titan Touch, Genesis IFUs | Not in hand | `penile-implants/*`, `implant-models`, `malleable-penile-prosthesis` | specs, reservoir volumes; only if Coloplast is used |

When access returns: ACOG CO 694, PB 214, PB 155 (about 15 pages); then PB 213, 210, 198, 218, CO 795, 823.

Useful, not blocking: 2025 AUGS-IUGA complications update (not yet identified), ASCRS 2020 left-sided diverticulitis, Revi surgical technique guide, ProACT IFU.

Claude tries first: full ASRA LAST advisory (Neal et al., *Reg Anesth Pain Med* 2018;43:113-123); US InterStim, Revi, eCoin MRI manuals; FDA SSEDs for Optilume, ProACT, Altaviva.

Dropped as accepted limitations unless the user objects: instrument catalogs, Intuitive manuals, history primary sources, NCCN, ATOMS/Argus/Remeex IFUs.

### Stage D materials
1. Confirm `Smartphrase Corpus/units` and `prefcards` are the authoritative set.
2. Out-of-scope units (onc, bca, pca, tca, stone, rmass, adr, vas, others): check against AUA/EAU directly, or leave out.
3. The user's read of the 30 draft phrases (listed in the corpus STATE.md).
4. Later, only for finalizing cards: formulary, skin prep and irrigation policy, stocked implants and SKUs. Never invented; stay `[VERIFY]`.

## 2. Improvements

Necessary:
1. **Ledger rebuild.** Regenerate open items from `status.json`; each item gets resolved / accepted limitation / waiting on source / waiting on decision; severity order doses and contraindications > guideline wording > technique > abstract-only numbers > history.
2. **Drug-label sweep** (openFDA): both Botox pages, desmopressin/nocturia, Xiaflex, vaginal estrogen, PDE5, beta-3, alprostadil, bupivacaine. Nocdurna has no current openFDA entry: confirm status before any page change.
3. **Cross-page number consistency script**: twenty duplicate filenames (AUS, Botox, PDE5, ProACT, Aquablation, iTind, Optilume BPH) plus three drug-coated balloon pages share trial figures.
4. **Guideline currency**: 15 pages cite AUA 2018 documents; older IDSA, ACOG, AUGS items; AUGS rUTI statement sunset 2026. Age alone is not an error.
5. **Reference hygiene**: every DOI and PMID resolves to the cited title; Unpaywall search over abstract-only citations.
6. **Owed items**: AUA MIBC Statement 16 on `vte-prophylaxis.mdx`; NLUTD Statement 58 paper; Okusanya counts; MASTER 12-month figures.

High value:
7. **Perioperative essentials** on the ~40 procedures matching the user's operative phrases and cards (263 of 435 atlas pages lack a setup/postop section; 217 lack complications/troubleshooting): positioning, prophylaxis, VTE, catheter size and duration, drains, activation timing, top complications. Needs the user's procedure list (Claude drafts it from the corpus).
8. **Counseling-figures tables** per core procedure (success, complications, revision; source and year).
9. **Automation**: DOI and consistency checks in the monthly job; dead-video detection; phrase-to-page links so a quarterly page change lists affected phrases.
10. **Decision trees**: female SUI, male post-prostatectomy SUI, anterior urethral stricture (user approval each).

Optional: textbook-derived technique detail; original content from the user's videos or outcomes; handout fact re-check before any relaunch; stubs, quiz, cloud voice.

## 3. Textbooks

Not a full scrape (438 PDFs; Campbell 13th ed alone is 4,983 pages, ~4-5 M tokens; textbooks lag 2-5 years and cannot settle rates, grades, device specs or doses). Instead: `pdftotext` about 15 core books into a gitignored cache, grep locally (no model tokens), read only matching pages (~3-8k tokens per claim). Targets: ~240 technique items, uncited anatomy figures, the nine unconfirmed `textbooks.mdx` entries, flap and graft technique. Older editions only for anatomy, eponyms and classic technique. Paraphrase and cite; never reproduce text or figures. Pilot: *Advanced Male Urethral and Genital Reconstructive Surgery* against open 04a technique items; measure claims settled per 100k tokens; go or no-go.

## 4. Stages and completion standards

- **A. Close audit gaps** (items 1-6, decisions, blocker sources). Done when every open item has a disposition, no dose or contraindication claim is unresolved (or it is hedged and attributed), all decisions are applied, the ledger is current.
- **B. Approved improvements** (items 7-10, textbook additions if the pilot pays). Done when the approved list is exhausted and every added claim cites a checked source; new ideas go to a backlog.
- **C. Validation.** Lint, typecheck, build; all DOIs/PMIDs resolve; no unexplained cross-page conflicts; links and videos pass; then a stratified re-audit of ~50 random pages. Done when material errors are under 2%.
- **D. Smartphrase and card alignment** (off-repo). Crosswalk in the corpus folder: phrase or card ID → WARWIKI page(s) → source → claims → class (evidence / label-IFU / guideline / preference / institutional). Smartphrases: evaluation, counseling, options, numbers, risks, contraindications, follow-up; flag wording that asserts an exam, discussion or decision occurred. Cards: equipment, implants, positioning, prep, medications, contingency supplies; local items stay `[VERIFY]`. The source decides conflicts, not the website. Propose diffs; never overwrite the user's defaults (the September 20 GPT pass blanked settled defaults and was reversed). Done when every in-scope item has a crosswalk row, every discrepancy is resolved or decided, the corpus pipeline shows 0 FAIL, and each item carries the user's approval. Known so far: Optilume 14/16 Fr vs IFU 12-14 Fr; scrotal dartos Vicryl vs Monocryl.

## 5. Running this on Sonnet 5

The plan is built for Sonnet 5 as the working model, consistent with [AUDIT.md](../../AUDIT.md): most work is scripts plus narrow edits, and the judgment calls are the user's decisions.

| Work | Model / effort | Token notes |
|---|---|---|
| Ledger rebuild, consistency script, DOI/PMID check, openFDA and Unpaywall pulls, textbook text cache | Sonnet 5 writes the script once; the script does the work | Read script output, never whole files. Summaries to `reports/`, not chat. |
| Label sweep, guideline currency, owed items, applying decisions | Sonnet 5, High | One batch of 3-5 pages per commit. Read only the claim's section (`grep -n`, then `Read` with offset/limit). |
| `evidenceNote` rewording, reference formatting, link repair | Haiku 4.5 subagent or `sed`/Python | Mechanical; no clinical judgment. |
| Checking a page against a newly supplied source | `warwiki-auditor` subagents (Sonnet), up to 4 in parallel on disjoint pages | More than 4 triggers PubMed 429s and status-note overwrites. |
| Perioperative sections, counseling tables, decision trees | Sonnet 5, High | Draft from already-checked sources in `sources-local/`; no new literature search unless a gap is named. |
| Textbook lookups | Sonnet 5 | Grep the local text cache first; read ~2 pages per claim. |
| Stage C re-audit sample; Stage D conflicts where a guideline, the IFU and the user's default disagree | Sonnet 5 first; Opus 5.5 only for a genuine conflict (`escalate`) | Most conflicts go to the user as a one-line decision, not to Opus. |

Token rules:
1. Start each session fresh from `RESUME-NEXT.md` and this file; do not reread CLAUDE.md history sections or CHANGELOG.
2. One stage item per session; end the session after its commit and a RESUME-NEXT update.
3. Never paste large script output into chat; write it to a file and read the head or a filtered view.
4. Use `sources-local/` extracted text (grep) instead of rereading PDFs.
5. Build only once per batch, after all edits (about 27 s; clear the rspack cache if it hangs).

Session prompt: "Read reports/audit-v2/RESUME-NEXT.md and reports/audit-v2/NEXT-PHASE-PLAN.md. Do the next unfinished item in section 2 (or the stage named here: ___). Follow AUDIT.md conventions: batches of 3-5 pages, commit only touched files, push to main, update the ledger and RESUME-NEXT. Stop after one item."

## First batch

User: decisions 1-15; Laor 1995, Biardeau 2016, AMS 800 OR manual 92116967, Coloplast IFUs if used; Stage D set confirmation and out-of-scope handling.

Claude, meanwhile, in this order: ledger rebuild; owed items including MASTER; drug-label sweep; consistency script and report; DOI/PMID and open-access sweep; guideline currency; ASRA LAST and US MRI manual retrieval attempts.
