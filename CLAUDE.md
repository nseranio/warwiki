# WARWIKI - Claude Session Reference

Read this at the start of a session. Keep it small: this file is the working handbook, not the project archive. Put substantive history in `CHANGELOG.md`; use `docs/_STATUS.md` for the stub backlog.

---

## Current Handoff - 2026-06-12 — Handouts: Arabic (`ar`) localization STARTED — RTL pipeline built + 31/80 live (العربية)

4 commits (1 infra + 3 batches), all fast-forwarded to `main`. Typecheck + build clean. **Arabic now live on 31 of 80 handouts (pilot + batches 1–3) — the RTL pipeline is fully built and validated.** Stopped mid-language at a clean 31/80 boundary when the parallel translator agents hit the **session usage limit** (batch 4 wrote nothing; verified no stray files — repo consistent at 31 `.ar.html` / 31 PDFs / 31 JPGs / 31 entries, git clean).

**Arabic is the first RTL language + first embedded-font-non-CJK.** Durable findings, full detail in `CHANGELOG.md` under 2026-06-12:
- **NO `pyftsubset` needed.** Noto Sans Arabic (variable → instanced Reg/Bold, ~194 KB/face, off-repo `fonts/`) is small enough to embed whole; **Chrome `--print-to-pdf` auto-subsets the web font into each PDF** (verified `HBAAAA+NotoSansArabic-Regular` FontFile2). Each sheet is self-contained → Arabic uses the **fast per-batch loop, NOT the translate-all-first CJK loop.**
- **RTL:** masters set `<html lang="ar" dir="rtl">` (html tag only). Added a `[dir="rtl"]` block to `_handout.css` mirroring every physical prop (padding-left→right, border-left→right on .opt/.qbox/.warn, table text-align→right, `ol.steps li::before` left→right) and **resetting `letter-spacing:normal`** (negative letter-spacing breaks Arabic joining). `.brand` forced `direction:ltr` to keep the WARWIKI wordmark Latin. Flex rows (.cols/.band/.foot) auto-reverse — header + 2-col mirror for free.
- **BiDi:** wrap a digit+Latin token like `5-ARI` in `<bdi>` (else it flips to `ARI-5` at a right-aligned line start). Pure-Latin acronyms (BPH/PSA/AUS) and digit+Arabic (`3–6 أشهر`) need none.
- **`render-ar.sh`** = `render-ko.sh` clone (`--headless=new --virtual-time-budget=20000` so the font loads before print → no blank PDF). **`_AR_TRANSLATOR_GUIDE.md`** off-repo (formal MSA, concise, Western digits, `<bdi>` rule, Arabic label map + glossary). `ar` already sat 8th in `HANDOUT_LANGUAGES` with `dir:'rtl'` — no switcher change.
- **Zero overflow on all 31** (Arabic compact like CJK) — every sheet gate-clean, no trimming. Pilot + dense AUS sheet visually verified (RTL mirrors cleanly, glyphs shape/join, PDF not blank).

**Next: FINISH ar — 49 sheets remain (batches 4–8).** Remaining slugs = `comm -23` of `handouts.ts` slugs vs existing `*.ar.html` basenames. Same loop per batch of 10: Sonnet agents → `.ar.html` → `./render-ar.sh <slug>` (gate must read pageOvf=0/colsOvf=0) → `cp` PDFs to `static/handouts/` + JPGs to `static/img/handouts/` → `node scripts/add-lang.js ar <slugs…>` → `npm run typecheck && npm run build` → `git checkout -- src/data/stats.json` → commit + push main. **Pitfall:** zsh doesn't word-split unquoted vars — drive render/copy loops with `while IFS= read -r s; … < file`, not `for s in $VAR`. After ar: **ru** (Cyrillic, Inter covers it, no font), **it** (Latin), **ja** (CJK — Noto Sans **JP**, zh/ko treatment).

---

## Previous Handoff - 2026-06-11 (later 4) — Handouts: FULL Tagalog/Filipino localization (80/80 `tl`)

8 commits, fast-forwarded to `main`. Typecheck + build clean. **Tagalog now live on all 80 handouts — six languages 100% done (es, zh, vi, fr, ko, tl) + English base.** Same parallel workflow ([[project_patient_handouts_workflow]]): off-repo `_TL_TRANSLATOR_GUIDE.md` (clear Filipino, **keep common English medical terms** — Taglish is how patients actually speak), 8 batches × 10 Sonnet agents → `<slug>.tl.html`, `render-tl.sh` → assets, gate, `node scripts/add-lang.js tl <slugs…>`, build, commit per batch. No font work (Latin). **Tagalog is the most verbose language yet** — ~20/80 dense sheets overflowed page 2 (by 90–206px); hand-trimmed with the standard playbook (tighten qbox; drop the After bullet duplicating the qbox swelling line; drop the takeaway's trailing "Tumawag…" already in the warn box; combine short adjacent bullets). ≤20px residuals are fixed-element rounding (colsOvf=0, page complete — verify by rasterizing). **Caught 2 translator typos**: "makipagtalik" (sex) → "makipagtalo" (argue) on the Peyronie's sheets; grep all sheets for such errors. tl already sat 7th in the switcher (after ko).

---

## Previous Handoff - 2026-06-11 (later 3) — Handouts: FULL Korean localization (80/80 `ko`, 한국어)

Typecheck + build clean; every sheet gate-clean. **Korean now live on all 80 handouts — five languages 100% done (es, zh, vi, fr, ko) + English base.** Same parallel workflow ([[project_patient_handouts_workflow]]): shared off-repo `_KO_TRANSLATOR_GUIDE.md` (polite 합니다체), 8 batches × 10 Sonnet agents → `<slug>.ko.html`. **Korean is Hangul → needs the CJK embedded-font treatment like zh** (system fonts unavailable to `--print-to-pdf`). Flow for CJK differs from Latin langs: **translate all 80 first → build the subset font → render all 80** (the subset must cover the actual glyphs, so you can't render per-batch). Downloaded Noto Sans **KR** (google/fonts variable), instanced Reg+Bold, `pyftsubset` to the 874 used glyphs (~145 KB/face), `@font-face` added to `_handout.css` (`'Noto Sans KR'` after `'Noto Sans SC'` — SC is Han-only, Hangul falls through to KR) + injected into the 25 inline-CSS masters. New `render-ko.sh` (`--headless=new --virtual-time-budget=20000`). **Zero overflow** (Korean compact like Chinese) — no trimming. ko was already 6th in the switcher (after fr) from the fill-level reorder.

**Next: Tagalog (`tl`)** — Latin script, no font work (like es/vi/fr). Then **ar** (RTL — set `dir="rtl"`, needs a layout/glossary pass), **ru**, **it**, **ja** (Japanese needs the CJK font treatment like zh/ko — but Noto Sans **JP**; the build covers Kanji+Kana). Detail in `CHANGELOG.md` under 2026-06-11 (later 2). Prior French handoff follows.

---

## Previous Handoff - 2026-06-11 (later 2) — Handouts: FULL French localization (80/80 `fr`) + switcher reorder

9 commits, fast-forwarded to `main`. Typecheck + build clean. **French (Français) now live on all 80 handouts — library is es + zh + vi + fr complete (+ English base).** Same parallel workflow ([[project_patient_handouts_workflow]]): shared off-repo `_FR_TRANSLATOR_GUIDE.md` (formal **vous**, French medical glossary), 8 batches × 10 Sonnet agents → `<slug>.fr.html`, `render-fr.sh` → assets, gate, `node scripts/add-lang.js fr <slugs…>`, build, commit per batch. **No font work** — French is Latin/accents (Inter covers it). **French is the longest language yet** — ~22/80 sheets overflowed page 2 (several 90–165px), all dense surgical/flexible sheets; hand-trimmed with the standard playbook (tighten the full-width qbox; drop the After bullet duplicating the qbox swelling line; drop the takeaway's trailing "appelez…" clause already in the warn box). ≤4px residuals are harmless rounding (colsOvf=0).

**Language-switcher reorder.** User flagged French was "buried" at position 9 behind empty languages → reordered `HANDOUT_LANGUAGES` so filled/in-progress languages (es, zh, vi, fr) sit right under English, ahead of the empty ones. **Convention: move a language up as it gets populated.**

**Next: Korean (`ko`).** Same loop. Korean is Hangul → **needs the CJK embedded-font treatment like zh/ja** (the system `.ttc` fonts don't reach `--print-to-pdf`); reuse the Noto approach — but Noto Sans SC covers Han only, **Korean needs Noto Sans KR** (download the KR variable TTF, instance Reg/Bold, subset to the used glyphs, add `@font-face`, render with `--virtual-time-budget`). Remaining after ko: tl, ar (RTL), ru, it, ja (CJK font). Detail in `CHANGELOG.md` under 2026-06-11 (later). Prior Vietnamese handoff follows.

---

## Previous Handoff - 2026-06-11 (later) — Handouts: FULL Vietnamese localization (80/80 `vi`)

8 commits, fast-forwarded to `main`. Typecheck + build clean. **Vietnamese (Tiếng Việt) now live on all 80 handouts — library is now es + zh + vi complete (plus English base).** Same parallel workflow ([[project_patient_handouts_workflow]]): shared off-repo `_VI_TRANSLATOR_GUIDE.md`, 8 batches × 10 Sonnet agents → `<slug>.vi.html` (`<html lang="vi">`), `render-vi.sh` → `.vi.pdf`/`.vi.jpg`, overflow gate, wired with the **generalized `scripts/add-lang.js`** (`node scripts/add-lang.js vi <slugs…>` — reuse for every future language). **No font work** — Vietnamese is Latin/diacritics, Inter covers it (like Spanish), so `render-vi.sh` is plain `--headless=new`, no embedded font/`--virtual-time-budget` (that's only for CJK: zh/ja). 5 sheets overflowed page 2 by 5–65px and were hand-trimmed (drop a takeaway sentence that duplicates the warn box, or tighten the qbox). **Workflow note:** save the handoff + CHANGELOG after EACH completed language (user request, 2026-06-11) — see [[feedback_save_after_each_language]].

**Open / next:** user flagged that the **Resources sidebar + navbar don't match the Resources landing page** — being looked at next. Remaining handout languages (same loop, ~80 sheets each): ko, tl, ar (needs `dir="rtl"` + glossary pass), ru, fr, it, ja (ja needs the CJK embedded-font treatment, same as zh). Detail in `CHANGELOG.md` under 2026-06-11. Prior Mandarin handoff follows.

---

## Previous Handoff - 2026-06-11 — Handouts: FULL Mandarin localization (80/80 `zh`) + blank-PDF CJK-font fix

9 commits, all fast-forwarded to `main`. Typecheck + build clean. **Mandarin (简体中文) now live on all 80 handouts — second fully-translated language after Spanish; languages list stays 11.**

**Translation.** Ran the proven whole-language workflow ([[project_patient_handouts_workflow]]). Wrote a shared off-repo translator guide (`~/Desktop/WARWIKI-handouts/_ZH_TRANSLATOR_GUIDE.md`: structure-preservation rules, consistent section-label + medical glossary, "BE CONCISE") so each agent prompt stays short. **8 batches × 10 parallel Sonnet translator agents** (one handout each) read `<slug>.html` → wrote `<slug>.zh.html` (`<html lang="zh-Hans">`, structure copied exactly, acronyms kept with the Chinese term on first use). Main loop rendered `.zh.pdf` + `.zh.jpg` (`render-zh.sh`), ran the overflow gate, wired `languages: [..., 'zh']` via the new **[scripts/add-zh-lang.js](scripts/add-zh-lang.js)** (idempotent, by-slug — reuse for `vi`/`ko`/… by changing the code), built, committed per batch. **Zero overflow on all 80** (Chinese is more compact than English — no hand-trimming, unlike Spanish's ~14–27%). Skipped the retired `surgery-what-to-expect` master.

**Blank-PDF bug + fix (CRITICAL — carry into any future CJK language, e.g. `ja`).** First pass shipped PDFs with **every Chinese glyph missing** (only Latin "OAB"/"WARWIKI"/digits + the colored layout survived → mostly blank); thumbnails were fine, which masked it. Cause: headless Chrome **`--print-to-pdf` cannot load the macOS system `.ttc` CJK fonts** — the screenshot path rasterizes them, the print compositor drops them. `--headless=new` alone didn't help; naming the system fonts made it worse. **Fix = embed a CJK font as a document web font:** Noto Sans SC (variable TTF from google/fonts) → `fontTools.varLib.instancer` to static Regular(400)+Bold(700) → `pyftsubset` to the **1,501 glyphs used** (~416 KB/face) → two `@font-face` rules, `'Noto Sans SC'` placed **before** generic `sans-serif` so Latin keeps the Inter look. **Two gotchas:** (1) render with **`--virtual-time-budget=20000`** so the web font loads before print fires (else `font-display:block` prints the still-invisible fallback → blank); (2) **25 older masters use inline `<style>` not `_handout.css`** (RUG, urethroplasty, cystoscopy, diversion/upper-tract set, …) — the shared `@font-face` never reached them, so the rule was injected directly. All 80 PDFs re-rendered; each now embeds a CJK subset (~160–210 KB, on par with English) and shows full Chinese. Fonts live off-repo in `~/Desktop/WARWIKI-handouts/fonts/`; only rendered PDFs/JPGs are committed. `render-zh.sh` updated to `--headless=new --virtual-time-budget=20000`.

Detail in `CHANGELOG.md` under 2026-06-10 (later 6). Prior Spanish-completion handoff follows.

---

## Previous Handoff - 2026-06-10 (later 5) — Handouts: ITNS/ACT/ProACT adds, taxonomy/UX cleanup, listener off, Italian + FULL Spanish localization (80/80)

Many commits, all fast-forwarded to `main`. Typecheck + build clean throughout; gallery verified in preview at each stage (0 console errors). **Gallery 78 → 80; languages 10 → 11; Spanish now live on all 80 handouts.**

**Content.** New **ITNS** handout (Office Procedures › Nerve Stimulation for OAB; one flexible sheet across eCoin/Revi). New **ACT (female)** + **ProACT (male)** adjustable-balloon sheets (separate, sex-split; ProACT FDA-framed, ACT "availability varies by country"). **ProACT added as an option on the male-SUI handout** (treatment ladder + glossary + Q-box + card description). **Removed "Surgery: What to Expect"**; folded its orphaned sibling **"Choices Before Prolapse Repair Surgery" into Prolapse Surgery** and dropped the empty "Before & After Surgery" subgroup.

**UX.** **TTS "Listen to article" removed** from the gallery via `hide_title: true` (the `# WARWIKI Patient Handouts` H1 is markdown-body, so it stays). **Italian** added to `HANDOUT_LANGUAGES`.

**Full Spanish localization (all 80, `es`).** 3 hand-done to prove the loop, then **three parallel translator workflows** (one agent per handout, shared glossary, formal "usted", ~6–8th-grade neutral LatAm Spanish) writing `<slug>.es.html`; main loop rendered `<slug>.es.pdf` + `<slug>.es.jpg`, ran the overflow gate, wired `languages: ['es']`, built, committed in batches. **16 dense sheets overflowed page 2** (Spanish ~15% longer) and were **hand-trimmed (no clinical content cut)**; a brevity instruction added to the prompt cut overflow ~27% → ~14%. 80/80 es, all assets present, every sheet gate-clean.

**Durable lessons (carry forward).**
- **Workflow recovery:** background workflows die on session interrupt and long runs can hit the **session usage limit**; the **on-disk `.es.html` files are the checkpoint** — recompute the missing set and re-run only those. Don't trust the workflow's own completion notification; add an **independent background monitor** that exits at the expected file count.
- **Workflow `args` arrives as a string** → `typeof args === 'string' ? JSON.parse(args) : args`.
- **zsh does not word-split** unquoted `$var`/`$(...)` — render loops use a literal word list or `while IFS= read -r s; … < file`.
- **Overflow-trim playbook:** page height = the taller column (usually the right: post-op bullets + warn + "Tres cosas"); the full-width qbox cuts height directly; a stuck **+1px pageOvf is a sub-pixel rounding artifact** (`colsOvf=0`, page visually complete) — accept it.
- Translator agents may write the file but get rate-limited on the **return** (file exists though reported null) — reconcile against disk.
- `git push` "Invalid username or token" → **`gh auth setup-git`**.
- **Next languages:** same loop per language (~80 sheets each). **Arabic needs `dir="rtl"`** in the master + glossary pass. Asset naming `<slug>.<code>.pdf` / `.jpg`; add the code to each handout's `languages` array.

Full detail in `CHANGELOG.md` under 2026-06-10 (later 5). Prior 2026-06-10 (later 4) handoff (audience facet + finer taxonomy) follows.

---

## Previous Handoff - 2026-06-10 (later 4) — Handout gallery: finer Conditions taxonomy + Women/Men audience facet

1 commit, fast-forwarded to `main`. Typecheck + build + lint clean; verified in preview (78 cards, 0 console errors, facet counts correct). Pure data + component change — no new handouts, no re-render. Readies the gallery for the translation pass.

**Part A — split the densest subgroup.** Conditions & Symptoms' 9-card **"Bladder & Urinary"** subgroup split into three patient-recognizable themes (edit `HANDOUT_SUBCATEGORY_ORDER` + the 9 entries' `subcategory`): **Leakage & Overactive Bladder** (OAB, SUI ×2) · **Bladder Pain, Infection & Blood in Urine** (IC/BPS, UTIs, asymptomatic bacteriuria, microscopic hematuria) · **Prostate & Urinary Flow** (Nocturia, BPH). Deliberately **did not go finer elsewhere** — the other ~23 subgroups already sit at 1–5 cards; finer splits just produce lone one-card headers (and the component suppresses a single-subgroup header by design).

**Part B — audience facet (Women / Men / All).** New optional `audience` field on `PatientHandout` (`'all' | 'female' | 'male'`, type `HandoutAudience`, defaults `'all'`), a `HANDOUT_AUDIENCES` list + `handoutAudience()` / `handoutMatchesAudience()` helpers in [handouts.ts](src/data/handouts.ts); a third dropdown in [PatientHandouts.tsx](src/components/PatientHandouts.tsx) between category and language. **Inclusive semantics** (correct for patient navigation): *Women* = female + universal (**53**), *Men* = male + universal (**61**), *All* = everything (**78**). Tagged **17 female / 25 male / 36 universal**. Judgment calls (one-line `audience:` edits to flip): Alpha Blockers + AUS left `all`; urethroplasty `all` but perineal urethrostomy / Optilume / TUITMR `male`; Nocturia grouped with BPH under flow.

**Conventions / pitfalls.** Go more granular only where a subgroup is genuinely dense (≥~8 cards) — single-card subheaders read as noise. Add a sex-specific facet only when a sheet is anatomy-locked; default `all`. **Translation note:** the 3 new subcategory strings + "Women"/"Men" labels are user-facing English (join the title/description strings to localize); `audience` *values* are stable keys. **Scripting pitfall:** bulk edits keyed on `subcategory: '…'` must accept **both quote styles** — the "Men's Genital & Reconstructive" entries are double-quoted (apostrophe), so a single-quote-only regex skipped them and mis-stacked tags onto the next entry (caught by `tsc` TS1117).

---

## Previous Handoff - 2026-06-10 (later 3) — Patient-handout library 58 → 78: new Medications category + men's-health / BPH build-out

3 commits, all fast-forwarded to `main`. Typecheck + build clean; gallery verified in preview at each step (78 cards, 0 broken images, 0 console errors). Same off-repo HTML → headless-Chrome → PDF + JPEG-thumbnail pipeline; all new masters link the shared `_handout.css`. **Gallery 58 → 78 handouts; categories 5 → 6.**

**New "Medications" category** (`6a53631`, `c238507`) — a **6th top-level bucket** (between Conservative & Self-Care and Office Procedures), new "medication" flavor (what it is / how it works → how to take it / key safety / side effects). Subgroups + sheets: **Overactive Bladder Medicines** (Anticholinergics · Beta-3 Agonists) · **Prostate & Urinary Flow Medicines** (Alpha Blockers · 5-Alpha-Reductase Inhibitors) · **Erectile Dysfunction Medicines** (PDE5 Inhibitors) · **Testosterone Therapy** (Testosterone Replacement Therapy). Critical safety points emphasized: PDE5i + nitrates / priapism; alpha-blocker IFIS (cataract surgery) + retrograde ejaculation; 5-ARI halves PSA + pregnancy handling; anticholinergic cognitive caution in older adults; mirabegron blood pressure; TRT lowers fertility + needs monitoring.

**Men's-health + reconstructive build-out** (`796c071`, `c238507`).
- **Conditions:** Nocturia (Bladder & Urinary); **Enlarged Prostate (BPH)** (Bladder & Urinary); **Erectile Dysfunction** and **Peyronie's Disease** umbrella sheets (Sexual Health & Other) sitting above their existing treatment handouts.
- **New "Men's Genital & Reconstructive" subgroup** (Conditions): Acquired Buried Penis & Repair · Rectourethral Fistula (men) · Pubosymphyseal Fistula — condition+repair sheets framed honestly as reconstructive consequences (mostly of prostate cancer treatment), staged-repair / diversion explained, serious-but-hopeful tone.
- **Conservative:** Vaginal Lubricants & Moisturizers (Vaginal Health & Devices). The Conservative "Erectile Dysfunction" subgroup was **renamed "ED & Penile Therapies"** to hold ICI + **Vacuum Erection Device** (30-min ring rule) + **Penile Traction Therapy** (Peyronie's).
- **New "Prostate (BPH) Procedures" subgroup** (Procedures & Surgery): **TURP** · **HoLEP** (any size) · **Aquablation** (heat-free waterjet, ejaculation-sparing) · **Simple Prostatectomy** (very large glands; clearly distinguished from the radical cancer operation). Retrograde-ejaculation counseling on each.

**Conventions reinforced.** A "medication"/"product" flavor for drug-class and device sheets; honest framing on dual-use and safety (TRT fertility; simple ≠ radical prostatectomy; Aquablation newer/less long-term data; non-promotional throughout). Split by sex only when treatments diverge. New top-level categories are just `HANDOUT_CATEGORY_ORDER` + `HANDOUT_SUBCATEGORY_ORDER` entries; renaming a subgroup = edit the order string **and** the matching `subcategory` on affected entries (done for ICI). Overflow gate before every render.

**Final category spread (78):** Conditions & Symptoms 21 · Tests & Imaging 7 · Conservative & Self-Care 8 · Medications 6 · Office Procedures 4 · Procedures & Surgery 32. **Open next step: translations** (infrastructure ready; `<slug>.<code>.pdf` + `<slug>.<code>.jpg`, then add the code to that handout's `languages` array). Workflow in memory `project_patient_handouts_workflow.md`; detail in `CHANGELOG.md` under 2026-06-10 (later 3).

---

## Previous Handoff - 2026-06-10 (later 2) — Patient-handout library scaled to 58 (full AUGS urogyn set) + gallery search/filter, 5-bucket taxonomy, sex-split SUI, ICI, reworded label

Many commits, all fast-forwarded to `main`. Typecheck + build clean throughout; gallery verified in the browser preview at each stage (58 cards, 0 broken images, 0 console errors). Continues the same off-repo HTML → headless-Chrome → PDF + JPEG-thumbnail pipeline. **Gallery 21 → 58 handouts.**

**New content (this session).**
- **Urinary diversion (4, `decb19d`):** Comparing-Your-Options overview (with a side-by-side table) + Ileal Conduit · Orthotopic Neobladder · Continent Cutaneous (Indiana Pouch). Split into individual sheets (user choice) because daily life after each differs entirely; shared before/during content kept consistent.
- **Full AUGS "Voices for PFD" topic set as WARWIKI originals (`aeb0ef1`, `8ac36aa`, `1820ce5`)** — skipped Cystoscopy + Urodynamics (already built). Conditions & Symptoms (13): OAB · IC/BPS · UTIs · Asymptomatic Bacteriuria (don't-treat) · Microscopic Hematuria (risk-based) · POP · Musculoskeletal Pelvic Pain · Accidental Bowel Leakage · Constipation · Female Sexual Dysfunction · Urethral Diverticulum · Fistulas + the **sex-split SUI** below. Conservative & Self-Care (5): Pelvic-Floor Exercises & Bladder Training · Vaginal Estrogen · Pessaries · ISC · **Intracavernosal Injections (ICI)**. Office Procedures (4): Bladder Botox · Urethral Bulking · PTNS · Sacral Neuromodulation. Procedures & Surgery (urogyn, 10): Mid-Urethral Sling · Colpocleisis · Sacrocolpopexy · Vaginal Hysterectomy for POP · Vaginal Prolapse Repair (Mesh/Graft) · Vaginal Suspension · 3rd/4th-Degree Perineal Tears · Cosmetic Gynecology · Surgery: What to Expect · Choices Before Prolapse Repair.
- **SUI split by sex (user request):** *Stress Urinary Incontinence (Female)* (pessary/bulking/mid-urethral sling) and *(Male)* (post-prostatectomy → pelvic floor → male sling/AUS); unified SUI sheet removed. Other topics left unsplit — already anatomy-specific or sex-neutral in management.
- **ICI added (user request)** under a new Conservative "Erectile Dysfunction" subgroup; priapism (>4 h) emergency warning.

**New "condition" flavor.** Education sheets (not pre-procedure) use: intro → About This Condition → What Causes It (page 1) · qbox → How It's Diagnosed → How It's Treated (step ladder) → Living With It / warn / Three Things (page 2). Surgery/procedure sheets keep the prep→during→after flavor.

**Platform/UX changes.**
- **Label reworded `Patient Instructions` → `Patient Information`** across every master (sed sweep + full re-render), since most are educational (`20e82c2`).
- **Gallery search + category filter** (`c78efa2`) — `.ph-search` + `.ph-filter`; matches title/description/category/subcategory; live "N of M" count + empty state.
- **Language control is now a DROPDOWN, not a tab bar** (`0097d4f`) — the 10-tab bar wrapped to 4–5 rows on mobile. Same 10 languages; not-yet-translated options are `disabled` "(coming soon)".
- **5-bucket taxonomy** (`aeb0ef1`): **Conditions & Symptoms · Tests & Imaging · Conservative & Self-Care · Office Procedures · Procedures & Surgery**, each with subcategories (`subcategory` field + `HANDOUT_SUBCATEGORY_ORDER`). The component **omits a subcategory header when a category has a single subgroup**.
- **Thumbnails are JPEG** (q82 @700px; `sips` — no pngquant/cwebp/webp on this Mac) with the card crop `.ph-thumb{aspect-ratio:3/2}` + `object-position:top` to drop dead white space; ~55% lighter (`0097d4f`).
- **Shared `_handout.css`** (off-repo) linked by all newer masters — slim files; title-size modifiers `t-lg/t-md/t-sm/t-xs`, plus `.opt`/`table.cmp` for comparison sheets.

**Durable conventions reinforced.** Honest mesh framing (transvaginal-mesh FDA history) on sling/prolapse-graft/sacrocolpopexy sheets; non-promotional "vaginal rejuvenation" framing (FDA warning) on cosmetic gynecology; inclusive sex/gender language; **split a topic by sex only when treatments truly diverge (SUI), otherwise keep one sheet**. Overflow gate before every render (inject `window.load` script → `<pre id>` per `.page` `pageOvf`/`colsOvf` → `--dump-dom` → grep the generated `<pre>`).

**Open next step:** the actual **translations** (infrastructure ready; `<slug>.<code>.pdf` + `<slug>.<code>.jpg`, then add the code to that handout's `languages` array). Full workflow in memory `project_patient_handouts_workflow.md`; detail in `CHANGELOG.md` under 2026-06-10 (later 2).

---

## Previous Handoff - 2026-06-10 (later) — 9 more patient handouts (21 total) + a multilingual language switcher (English + 9, translate-later)

2 commits, both fast-forwarded to `main`. Typecheck + build clean; switcher verified in the browser preview (no console errors). Direct continuation of the same-day handouts workstream — same off-repo HTML → headless-Chrome pipeline.

**9 new handouts** (`1b1cb60`), each grounded in the matching WARWIKI clinical page, every page verified `pageOvf=0 / colsOvf=0`. Handout total **12 → 21**.
- **Tests & Imaging:** Cystoscopy · Cystogram · Urodynamics · Ambulatory Urodynamics (catheter-free / Glean concept) · Ureteral Evaluation Under Anesthesia.
- **Procedures & Surgery:** Pyeloplasty · Optilume Drug-Coated Balloon (**urethral stricture / ROBUST — not Optilume BPH**, user-confirmed) · Endoscopic Urethroplasty (**TUITMR** — cut the bladder-neck/VUAS scar through a scope + suture healthy lining across it) · Ureteral Reconstruction (**one flexible sheet** across primary repair / cheek graft / bowel segment).
- Flexibility carried through: Cystogram + Ureteral Evaluation flex across new-catheter / existing-catheter / SPT / nephrostomy and "any combination" of sub-studies; Pyeloplasty + Ureteral Reconstruction present the stent timeline (~4–6 wk) in one sheet.

**Multilingual switcher** (`f2e3b5d`) — *build-switcher-first, translate-later* (user's choice). A global language tab bar on the gallery: **English + Spanish · Mandarin (简体中文) · Vietnamese · Korean · Tagalog · Arabic (rtl) · Russian · French · Japanese**. **English is the base/fallback.**
- [handouts.ts](src/data/handouts.ts): new `HANDOUT_LANGUAGES`, `DEFAULT_LANGUAGE`, `handoutHasLanguage()`, `handoutPdfPath`/`handoutThumbPath`; `PatientHandout` gains optional `languages?: string[]` (codes with localized assets ready; English implied).
- **Asset naming:** English keeps `<slug>.pdf` / `<slug>.png`; other languages use a **`<slug>.<code>.pdf`** + **`<slug>.<code>.png`** suffix.
- [PatientHandouts.tsx](src/components/PatientHandouts.tsx): `useState` lang; untranslated tabs render disabled (`.ph-lang--soon`, " · soon"); selecting one falls back to the English asset + shows a per-card `.ph-soon` "… coming soon — showing English" note. CSS `.ph-langbar`/`.ph-lang`/`.ph-soon` in [custom.css](src/css/custom.css).
- **To go live in a language for a handout:** render `<slug>.<code>.pdf` + thumbnail (set the master's `<html lang>` and `dir="rtl"` for Arabic), commit both, append the code to that handout's `languages` array → the tab activates automatically.
- **Translations themselves are NOT yet produced** — infrastructure is ready for either AI-produced or professionally-vetted drops. This is the open next step.

**Conventions reinforced.** Optilume "which device" is a real fork (urethral DCB vs BPH — confirm before writing). One spanning sheet beats split-by-variant when the patient experience is ~80% common. Overflow gate before rendering: inject a `window.load` script appending `<pre id>` with per-`.page` `pageOvf`/`colsOvf`, `--dump-dom`, grep the **generated** `<pre>` (not the literal script source). Full workflow + naming convention in memory `project_patient_handouts_workflow.md`. Detail in `CHANGELOG.md` under 2026-06-10 (later).

---

## Previous Handoff - 2026-06-10 — Patient-instruction handouts: 12 plain-language PDFs + a dedicated gallery + Resources-landing reorg

16 commits, all fast-forwarded to `main`. Typecheck + lint + build clean throughout. A new **off-repo→hosted** workstream: plain-language, printable **patient handouts** to give patients *before* a test or procedure, modeled on the AUGS "Voices for PFD" 2-page fact sheet the user supplied.

**The 12 handouts** (live at [/docs/resources/patient-handouts](docs/08-resources/patient-handouts.mdx)):
- **Tests & Imaging:** Retrograde Urethrogram (RUG) · Voiding Cystourethrogram (VCUG)
- **Procedures & Surgery:** Suprapubic Catheter Placement · Buccal Mucosa (Cheek) Graft · Artificial Urinary Sphincter (AUS) · Inflatable Penile Prosthesis (IPP) · Malleable Penile Implant · Male Urethral Sling · Urethroplasty · Penile Plication · Plaque Incision & Grafting · Perineal Urethrostomy

**Architecture (durable).**
- **Master HTML lives OFF-repo** at `~/Desktop/WARWIKI-handouts/` (one self-contained HTML per handout — inline CSS, system font stack). Mirrors the off-repo `~/Desktop/WARWIKI-social/` IG precedent.
- **Pipeline:** HTML → headless Chrome. PDF = `"…/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf`; page-1 **thumbnail** = `--screenshot --window-size=856,1106` then `sips -c 2112 1632` (crop the page clean of the gray canvas) + `sips --resampleWidth 800`. The rendered **PDF is committed to `static/handouts/<slug>.pdf`** (served at `/handouts/<slug>.pdf`) and the thumbnail to `static/img/handouts/<slug>.png`.
- **Gallery is data-driven:** [src/data/handouts.ts](src/data/handouts.ts) (one typed entry per handout: slug/title/category/description/pages) → [src/components/PatientHandouts.tsx](src/components/PatientHandouts.tsx) (thumbnail card grid grouped by `HANDOUT_CATEGORY_ORDER`) → [docs/08-resources/patient-handouts.mdx](docs/08-resources/patient-handouts.mdx). CSS `.ph-*` / `.ph-cta` in [custom.css](src/css/custom.css), built on `--ifm-*` theme vars (dark-mode safe). **Add a handout = render PDF + thumbnail, append one entry to `handouts.ts`.** Component return type must be **`React.ReactElement`** (this tsconfig has no global `JSX` namespace; `JSX.Element` fails `tsc`). The internal-link checker only validates `/docs/` links, so `/handouts/*.pdf` + `/img/handouts/*.png` are lint-safe — confirm with `npm run typecheck` + `npm run build`.

**Handout style (durable, user-confirmed).**
- Plain layperson voice (~6–8th-grade), grounded in the matching WARWIKI clinical page; WARWIKI blue `#185FA5`; **2-page Letter**.
- Header = plain **"WARWIKI"** text only (no logo badge, no tagline). **No illustration. No appointment fill-in box.**
- Diagnostic-test section flow: intro → About → Is It Safe? → How to Get Ready (Before) → What Happens (numbered steps) → After (with a red "call your team" warn box) → "Learn the Terms" glossary → "Three Things to Remember"; a **"WILL IT HURT?"** Q-box leads page 2. Procedure/surgery sheets adapt ("What to Know," etc.).
- **Frame flexibly across real-world variation** (the user asked for this repeatedly): VCUG works with/without an existing urethral catheter or SPT; SPC/AUS/IPP/plication present anesthesia as a *range* (local±sedation OR general/spinal); BMG is for a urethral *or ureteral* repair; urethroplasty flexes across penile/perineal incision and graft/no-graft (**one sheet, not split-by-location** — the patient experience is ~80% common). For Peyronie's, plication vs grafting got **separate** sheets because they split on a key trade-off (shorten + low-ED vs length-preserve + higher-ED).

**Footer bleed-through bug + fix (`58e200c`) — carry forward.** The layout used `.cols{flex:1}` (fill the page) + bottom-anchored `.foot{margin-top:auto}`; on dense page-2 layouts the columns overflowed *downward onto the footer* (the disclaimer "bled through" the boxes), and a naive page-`scrollHeight` check missed it. **Fixed by removing `flex:1; min-height:0` from `.cols`.** After any edit, verify in headless Chrome (`--dump-dom` + an injected script) that for every `.page`: `pageOvf = scrollHeight−clientHeight ≤ 0` **and** `colsOvf = cols.scrollHeight−cols.clientHeight == 0` (colsOvf>0 ⇒ footer overlap). Page height is set by the **taller** column — trim the taller (usually the right column: After/warning/takeaways).

**Resources-landing reorg (`42ba3c8`, `64cb305`).** On [Resources](docs/08-resources/index.mdx) the `section-stack` now leads with **Patient Resources** and **Journal Club was removed** from the landing (still reachable via navbar, footer, and the pelvic-organ-prolapse cross-link). On [Patient Resources](docs/08-resources/patient-resources.mdx), the top **"WARWIKI Original Patient Handouts"** section is now a compact `.ph-cta` link to the gallery (no longer inline cards), followed by **"Society & Foundation Resources"** (moved up), whose **AUGS card now points to the Voices for PFD fact-sheets** page (`voicesforpfd.org/resources/fact-sheets-and-downloads` — the same source as the user's colpocleisis sample).

**Also (`49b7d1e`, earlier this session).** Anchored the floating-pubis **AUS schematic** ([aus-components.js](scripts/diagrams/aus-components.js)) — the PRB now sits retropubic behind the pubic symphysis and the bulbar urethra passes under the subpubic arch. The AUS **"System Operation" placement** question (biomaterials Device page vs Procedure page) was discussed; recommended **keeping it on the procedure page** (consistent with the IPP precedent — operation detail on the clinical hub, pointer from the device page) — no change made.

Full workflow + conventions saved in memory `project_patient_handouts_workflow.md`. Detail in `CHANGELOG.md` under 2026-06-10.

---

## Previous Handoff - 2026-06-09 — IPP & AUS device-operation detail (inflate / deflate / deactivate) + 2 minor resource/homepage edits

4 commits, all fast-forwarded to `main`. Lint + build clean throughout.

**Main work — how to operate the prosthetic devices (2 commits, `a1173b7` + `f3de9eb`).** User asked to document exactly how to operate the IPP and AUS — inflate, deflate, deactivate/reactivate. Detail lives on the **two primary clinical pages** (cross-link, don't duplicate); the two biomaterials **device** pages get one-line pointers so the steps are reachable from all four.

- **IPP** → new **"## Device Operation — Inflation and Deflation"** section on [Penile Implants](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/index.mdx) (it had no operation section). Inflation (6–15 squeezes); deflation by pump — **AMS 700 press-and-hold the deflation button (a few sec)** / MS momentary-squeeze vs **Coloplast OTR one-touch**; the **OTR pseudo-malfunction** bedside fix (~7.8%; firm bulb pressure resets the stuck valve disc); deflation = the harder skill to teach; **auto-inflation / lockout valve** as the IPP analog of an unwanted state change; post-activation cycling/rehab; and an explicit note that **the IPP has no "deactivation" lock** (preempts the user's "how to deactivate" — that's an AUS concept). +4 refs (20–23: Shaw 2011, Garber 2014, Henry 2015, Pastuszak 2015). Explicit `<a id="device-operation"></a>` anchor (em-dash heading won't auto-slug cleanly).
- **AUS** → expanded **"## System Operation"** on the [AUS procedure page](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx): voiding cycle; **deactivation/reactivation maneuver** (pump = soft bulb + firm block housing the resistor & deactivation button; press the button while the cuff is empty → a **palpable dimple** confirms locked-open; a firm sharp squeeze pops it back); the safety-critical **deflated ≠ deactivated** point (a pumped-down cuff auto-refills in minutes — only the button keeps it open); locked-open-with-empty-cuff at the close of surgery; activation maneuver (milk the pump down, don't squeeze while deactivated); and a **catheterization-in-an-AUS-patient protocol** (always deactivate first; ≤14 Fr; >48 h or 7 d → suprapubic; condom-catheter/pad-weights for the obtunded; urology consult + MedicAlert). +2 refs (71 Fishman 1989, 72 Gaspar 2026), reusing the on-page 2015 Consensus (ref57) + James & McCammon review (ref1).

**Minor (2 commits):** added **[Atlas of Pelvic Surgery](https://atlasofpelvicsurgery.org/home.html)** (free Wheeless & Roenneburg illustrated atlas) to [websites-online-tools.mdx](docs/08-resources/websites-online-tools.mdx) → GU Reconstruction Education, beside the other illustrated atlas (Uretra.it) (`a52edca`); removed **TikTok** from the homepage "Follow WARWIKI" footer in [index.tsx](src/pages/index.tsx) (now YouTube · Instagram · Twitter/X) + updated the CSS order comment (`eba0e89`). Also confirmed (no change) Experts in Surgery / SurgQuest / VuMedi were already in resources.

**Conventions reinforced:**
- **One authoritative home per concept; cross-link, don't duplicate.** Device-operation detail lives on the primary clinical page (IPP index / AUS procedure); the biomaterials device pages carry a one-line pointer to the `#device-operation` / `#system-operation` anchor.
- **Prefer reusing refs already on the page** for added detail (the AUS expansion is cited to refs 1/57/71/72 already present) — zero new-citation fabrication risk. When a new ref is needed, verify it's real first (Pastuszak 2015 was already ref7 on the IPP *device* page → safe to reuse on the index).
- **Frame to the user's mental model:** the user said "how to deactivate" for both devices, but only the AUS has a deactivation lock — called that out explicitly on the IPP page rather than inventing an IPP deactivation.

Detail in `CHANGELOG.md` under 2026-06-09.

---

## Previous Handoff - 2026-06-08 — Quilting schematic (diagram 55) + first Instagram teaching carousel

Two threads: one repo change, and a new **off-repo** workstream (Instagram educational carousels).

**Repo — diagram 55 (committed `c7c171f`):** quilting-stitch cross-section — *without* quilting a hematoma lifts the free graft off its bed → starves; *with* quilting it's tacked flat → takes (imbibition → inosculation → neovascularization). Generator `scripts/diagrams/quilting-stitch.js` → `static/img/diagrams/quilting-stitch.svg`, embedded on [Quilting Stitch](docs/01-foundations/surgical-skills/quilting-stitch.mdx) (page had no figure). **Diagram total 54 → 55.**

**New workstream — Instagram carousels** (the user is starting an educational IG series; "Quilting" is post #1). **Assets live OUTSIDE the repo at `~/Desktop/WARWIKI-social/quilting/`** — the user opted out of committing social assets, and the SVG/ffmpeg generators were one-offs in `/tmp` (ephemeral, not saved). Full process + conventions in memory [[project_instagram_content_workflow]]. Final 4-slide deck: **(1)** intro — faded surgeon photo @ 35% + "What is Quilting?" + centered sensitive-content warning pill; **(2)** animation `.mp4` (cycling captions, 8.6 s); **(3)** techniques — the user's 3-panel intra-op photo with the old **red** title bar/pills **covered in white and crisp vector blue boxes/text redrawn** over the untouched photos; **(4)** "Bottom line" — 3 graft-take stages + 3 quilting bullets. Caption written; CTA → `https://www.warwiki.org/docs/foundations/surgical-skills/quilting-stitch`.

**Instagram-content conventions (durable):**
- **MP4, not GIF** (IG rejects GIFs in feed/carousels). Slides = **1080×1350 (4:5)**; template = WARWIKI wordmark + rule top, `warwiki.org` bottom-right (the "Reconstruction, codified." tagline was dropped per user).
- **Pipeline:** SVG generator → headless-Chrome `--screenshot` → PNG; animation = per-frame SVGs → Chrome PNG → `ffmpeg` H.264 yuv420p. **Render frames in the FOREGROUND** (a backgrounded render hung) and use basename in xargs (`sed 's#.*/##;s#\.svg##'`) or the screenshot/`file://` paths double up.
- **To edit a user's photo it must be on disk** — pasted chat images aren't reachable; have them drop it in the Desktop folder.
- **Don't recolor a compressed JPEG's UI** (looked low-quality) — cover the old graphics with white and **redraw crisp vector** boxes/text over the original photos.
- **Sensitive content:** graphic genital-surgery photos are IG-flag-risky — add a warning + prefer Stories; flag unlicensed stock (the slide-1 surgeon photo is an **Adobe Stock preview** → license before public use). [[feedback_launch_copy_tone]] (grounded caption voice) still applies.
- Animated > all-static text here (user rejected static); keep captions cycling but slow (~2 s/line) via a `scaledT = t*(BASE/DUR)` time-scale.

Detail in `CHANGELOG.md` under 2026-06-08.

---

## Previous Handoff - 2026-06-07 (later) — Visual overhaul continued: +10 more original SVG schematics (diagrams 45–54)

10 schematic commits, all fast-forwarded to `main`. Lint/typecheck/build clean throughout; every figure rendered headless and Read before embedding. Direct continuation of the same-day diagrams-as-code work — picked the highest-value pages that still had no figure. **Diagram total 44 → 54; image-bearing pages ~51 → ~60** (two figures each serve two pages).

**10 more, each on a high-value page that had no schematic** (two reused across a second page):
- **Upper tract:** Anderson-Hynes dismembered pyeloplasty (`anderson-hynes.js`, 3-panel obstructed → dismember/spatulate → dependent-funnel anastomosis) → [Pyeloplasty](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/pyeloplasty.mdx); ileal ureter harvest + isoperistaltic interposition (`ileal-ureter.js`) → [Ileal Ureter](docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/ileal-ureter.mdx); BMG ureteroplasty non-transecting onlay + omental-wrap cross-section (`bmg-ureteroplasty.js`) → [BMG Ureteroplasty](docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/bmg-onlay-ureter.mdx).
- **Diversion:** Hautmann W-neobladder (fold → sphere) (`hautmann-neobladder.js`) → [Hautmann](docs/04-surgical-techniques/04c-urinary-diversion/hautmann-neobladder.mdx); Kock pouch twin nipple valves + one-way-valve inset (`kock-pouch.js`) → [Kock Pouch](docs/04-surgical-techniques/04c-urinary-diversion/kock-pouch.mdx).
- **BPH (1 figure, 2 pages):** anatomical enucleation plane — axial (adenoma/surgical-capsule) + sagittal landmarks (`prostate-enucleation.js`) → [HoLEP](docs/04-surgical-techniques/04m-bph-male-luts/prostate-enucleation-holep.mdx) + [Simple Prostatectomy](docs/04-surgical-techniques/04m-bph-male-luts/simple-prostatectomy.mdx).
- **Functional / prosthetics:** priapism shunt family on one organ + distal-window inset (`priapism-shunts.js`) → [Priapism Shunts](docs/04-surgical-techniques/04j-sexual-dysfunction/priapism-shunts-decompression.mdx); tunica plication mechanics Nesbit/16-dot/Yachia (`tunica-plication.js`) → [Tunica Plication](docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies-disease/tunica-plication.mdx).
- **Urogyn:** paravaginal defect/repair axial — ATFP ("white line") suspension (`paravaginal-repair.js`) → [Paravaginal Repair](docs/04-surgical-techniques/04g-prolapse-repair/anterior/vaginal-paravaginal-repair.mdx).
- **Fistula (1 figure, 2 pages):** transabdominal VVF — extravesical vs O'Conor bivalving (`vvf-abdominal.js`) → [Extravesical VVF](docs/04-surgical-techniques/04h-fistula-repair/female/extravesical-vvf-repair.mdx) + [O'Conor VVF](docs/04-surgical-techniques/04h-fistula-repair/female/oconor-vvf-repair.mdx).

**Conventions reinforced / new:** same per-figure loop (`node scripts/diagrams/x.js` → headless-Chrome `--screenshot` → **Read the PNG** → fix → embed with blank-line-before-caption ending **(Original WARWIKI schematic)** → `npm run build` → `git checkout -- src/data/stats.json` → commit+push). **One figure can serve two paired pages** that share a principle (prostate-enucleation on HoLEP + simple-prostatectomy; vvf-abdominal on extravesical + O'Conor) — embed with **page-specific captions** and run `npm run lint:links` when a caption cross-links. **New device color: violet `#7C3AED` for indwelling stents** (Anderson-Hynes, BMG ureteroplasty) so a stent doesn't read as "gain green." Reusable layouts that emerged: **"harvest + in-situ"** two-panel for bowel-segment ops (ileal ureter); **"mechanism inset"** (Kock nipple valve; priapism distal-window comparison row); **axial defect-vs-repair** for support anatomy (paravaginal). **No-fake-radiograph rule still holds** ([[feedback_no_fake_radiograph_schematics]]).

**Bench (remaining):** **GAS** (penile-inversion vaginoplasty / phalloplasty / metoidioplasty / intestinal vaginoplasty / masculinizing scrotoplasty — high value but complex to render cleanly); glans resurfacing; vulvar reconstruction; Mainz Pouch I / II; Quartey & other distal-flap urethroplasties; pelvic-floor levator-ani-from-below anatomy. The flagship upper-tract / diversion / BPH-enucleation / Peyronie-plication / anterior-prolapse / abdominal-fistula techniques are now illustrated. Detail in `CHANGELOG.md` under 2026-06-07 (later).

---

## Previous Handoff - 2026-06-07 (earlier) — Visual overhaul continued: +28 original SVG schematics (diagrams 17–44) + new Heineke-Mikulicz page

28 schematic commits + 1 new content page, all fast-forwarded to `main`. Lint/typecheck/build clean throughout; every figure rendered headless and Read before embedding. Direct continuation of the 2026-06-06 diagrams-as-code work — cleared the bench and kept going. **Diagram total 16 → 44; image-bearing pages ~27 → ~51.**

Both **bench items** shipped: **Blandy U-flap** (`blandy-u-flap.js`) → [Female Vaginal Flap Urethroplasty](docs/04-surgical-techniques/04a-urethral-reconstruction/female/female-vaginal-flap-urethroplasty.mdx) · **Perineum layered architecture** (`perineal-layers.js`, kept *coronal* — pouches stack legibly that way) → [The Perineum](docs/01-foundations/anatomy-physiology/pelvis-support/perineum.mdx).

**16 more, each on a high-value page that had no schematic:**
- **Reconstruction geometry:** Heineke-Mikulicz principle (`heineke-mikulicz.js`) → [Non-Transecting Bulbar](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/non-transecting-bulbar.mdx); psoas-hitch vs Boari (`boari-psoas.js`) → [Boari Flap & Psoas Hitch](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx); antireflux reimplant tunnels Cohen/Politano/Lich-Gregoir (`reimplant-techniques.js`) → [Ureteral Reimplantation](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx); TIP/Snodgrass (`tip-snodgrass.js`) → [Hypospadias & Epispadias](docs/05-special-populations/05f-lifelong-care/hypospadias-epispadias.mdx); BMG graft placement dorsal/ventral onlay + dorsal inlay (`graft-placement.js`) → [Urethral Reconstruction Principles](docs/04-surgical-techniques/04a-urethral-reconstruction/urethral-reconstruction-principles.mdx); Yang-Monti transverse re-tubularization (`yang-monti.js`) → [Yang-Monti](docs/04-surgical-techniques/04b-bladder-reconstruction/yang-monti.mdx); Martius flap (`martius-flap.js`) → [Martius Flap](docs/01-foundations/surgical-principles/flaps/martius.mdx); appendicovesicostomy/Mitrofanoff (`appendicovesicostomy.js`) → [Appendicovesicostomy](docs/04-surgical-techniques/04b-bladder-reconstruction/appendicovesicostomy.mdx); PFUI Webster maneuvers ladder (`pfui-webster-steps.js`) → [Abdominoperineal Urethroplasty](docs/04-surgical-techniques/04a-urethral-reconstruction/posterior/abdominoperineal-urethroplasty.mdx).
- **Urogyn / devices:** MUS sling trajectories retropubic/TOT/SIMS (`sling-trajectories.js`) → [Female Slings & Suspensions](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/female-slings-suspensions.mdx); sacrocolpopexy Y-mesh (`sacrocolpopexy.js`) → [Sacrocolpopexy](docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrocolpopexy.mdx); SNM S3 lead + response (`sacral-neuromodulation.js`) → [Sacral Neuromodulation](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx); AUS 3 components (`aus-components.js`) → [Artificial Urinary Sphincter](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx); 3-piece IPP (`ipp-components.js`) → [Penile Implants](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/index.mdx); DeLancey hammock (`continence-hammock.js`) → [SUI (Female)](docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx); sacrospinous ligament fixation (`sslf.js`) → [SSLF](docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-ligament-fixation.mdx); uterosacral ligament suspension (`usls.js`) → [USLS](docs/04-surgical-techniques/04g-prolapse-repair/apical/uterosacral-ligament-suspension.mdx).
- **Diversion / upper tract:** Studer orthotopic neobladder (`studer-neobladder.js`) → [Modified Studer Pouch](docs/04-surgical-techniques/04c-urinary-diversion/modified-studer-pouch.mdx); transureteroureterostomy (`tuu.js`) → [Transureteroureterostomy](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/trans-ureteroureterostomy.mdx); Indiana pouch (`indiana-pouch.js`) → [Indiana Pouch](docs/04-surgical-techniques/04c-urinary-diversion/indiana-pouch.mdx).
- **Graft harvest:** buccal mucosa graft harvest (`bmg-harvest.js`) → [Buccal Mucosa Graft](docs/01-foundations/surgical-principles/grafts/buccal-mucosa.mdx).
- **Fistula / anorectal / SUI:** VVF layered closure (`vvf-layered-closure.js`) → [Transvaginal Sims-Simon Closure](docs/04-surgical-techniques/04h-fistula-repair/female/transvaginal-sims-simon.mdx); overlapping anal sphincteroplasty (`sphincteroplasty.js`) → [Anal Sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/anal-sphincteroplasty.mdx); autologous pubovaginal sling (`pubovaginal-sling.js`) → [Autologous Fascial PVS](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/autologous-pubovaginal-sling.mdx); Burch colposuspension (`burch.js`) → [Burch Colposuspension](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/burch-colposuspension.mdx).
- **Prosthetics / genital:** Peyronie's curvature correction (`peyronie-correction.js`) → [Peyronie's Disease](docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies-disease/index.mdx).

**Conventions reinforced (same as 2026-06-06 — still authoritative):** per-figure loop `node scripts/diagrams/x.js` → headless-Chrome `--screenshot` → **Read the PNG** → fix → embed (`![alt](/img/diagrams/x.svg)` → **blank line** → italic caption ending **(Original WARWIKI schematic)**; the blank line is mandatory, now enforced by `npm run lint:figures`) → `npm run build` → `git checkout -- src/data/stats.json` → commit+push. Escape `<`/`>`/`&` as entities in SVG text. The **one recurring defect was bottom-legend / caption lines overrunning the card width** — keep legend lines short, and in 3-zone figures trim the right column's sub-labels so they don't collide with leader text. Reusable layouts that emerged: device figures (AUS/IPP) = "components + cycle-callout + cross-section inset"; channel figures (Yang-Monti/appendicovesicostomy) = "flap-valve cross-section" inset. **No-fake-radiograph rule still holds** ([[feedback_no_fake_radiograph_schematics]]).

**Also this day — new content page: [Heineke-Mikulicz Technique](docs/01-foundations/surgical-principles/flaps/heineke-mikulicz.mdx)** (1184 → 1185). User-requested dedicated page; the dumps were half GI surgery, so reframed for GU (origin brief; urethral / ureteral-UPJ / genital-skin / diverticulum / GAS applications lead), placed beside Z-plasty / Y-V plasty in the hidden `flaps/` category, reusing the existing HM schematic. **Verified every dump paper by lit search** — corrected Lumen 2010 to **&lt;1 cm** (dump truncation), confirmed Kanematsu 2025 `iju.70108` is real and distinct from the 2026-06-04 dropped paper, added 2 missed applications (preputioplasty, scrotoplasty). Inbound links wired from non-transecting-bulbar / pyeloplasty / ureteroureterostomy / female-urethral-stricture / Y-V plasty. Reinforces: **verify dump papers even with a DOI** (same author+year ≠ same study).

**Also this day — figure-caption bleed fixed + guarded.** User saw the Martius caption cut off and the TUU image/caption bleeding together. Cause: image and caption sat on adjacent lines with **no blank line**, so they rendered in one `<p>` and the inline `<img>` let the caption flow beside it on wide columns. Swept all **67 `/img/` embeds across 53 pages** to insert a blank line (image = its own paragraph), verified live on both pages. **New guard:** `npm run lint:figures` (`scripts/check-figure-captions.js`, in `npm run lint`) fails if any `/img/` embed lacks a trailing blank line. Convention corrected to "blank line then caption"; [[feedback_figure_caption_blank_line]]. **Follow-up:** blank line alone wasn't enough — every this-session figure also had a **dense in-SVG bottom legend** that turns unreadable/cramped when the 820-px figure scales into the ~600-px column (the user's "still bleeding / cuts off"). Removed the legend from all 29 such generators and cropped each figure's height; the explanation now lives only in the markdown caption + page body. **Rule: never put paragraph prose inside a figure that gets downscaled — keep it in the caption.**

**Bench (remaining, lower-value or complex):** pelvic-floor levator-ani-from-below anatomy; penile-inversion vaginoplasty / phalloplasty / metoidioplasty (GAS — high value but complex to render cleanly); Mathieu flip-flap / onlay-island (hypospadias page already has 2 figures — weigh over-imaging). The flagship urethral / upper-tract / bladder / incontinence / prolapse / prosthetics / diversion / fistula / anorectal techniques are now illustrated (44 schematics); the SUI trio (MUS · autologous PVS · Burch) and the continent-diversion pair (Studer orthotopic · Indiana cutaneous) are complete. Detail in `CHANGELOG.md` under 2026-06-07.

---

## Previous Handoff - 2026-06-06 — Visual overhaul: 16 original SVG schematics + 6 public-domain plates (diagrams-as-code) + cohesion cleanup

25 commits, all fast-forwarded to `main`. Lint/typecheck/build clean throughout; every figure verified by a headless-Chrome render before embedding.

Addressed the site's biggest gap — **images**. An audit found only **16 of 1,184 pages** carried any image, with **zero** across all of surgical-techniques (450 pp), clinical-conditions (73), and evaluation (38, including the imaging pages). The rest of the site was already healthy (lint/typecheck/build clean; no content cruft — the 18 "TODO" hits were the surgeon name "Ha**tzichris­todo**ulou").

**Cohesion cleanup (2 commits):**
- `de11bdb` — removed dead Docusaurus starter cruft: the never-rendered `HomepageFeatures` component + its three `undraw_docusaurus_*.svg` + unused `docusaurus.png` / `docusaurus-social-card.jpg` (config uses the `warwiki-*` assets).
- `b377934` — standardized the generic cross-reference heading onto a single `## See Also` (339 → 441 pages): folded `## See also` / `## Cross-references` / `## Related Articles`/`Topics`/`Reading`. **Left the 15 typed sections intact** (`## Related Instruments`/`Catheters`/`Agents`/…, narrative `## Cross-Reference — What's Covered on…`).

**16 original SVG schematics + 6 verified public-domain plates** — schematics copyright-free, each authored as a re-runnable generator in **`scripts/diagrams/`** (diagrams-as-code), embedded with the house caption pattern, build-validated. Three reusable **engines** emerged:
- **Plot**: cystometrogram (`9cf127e`) + pressure-flow nomogram + uroflowmetry (`fc91732`) → [Urodynamics](docs/02-evaluation/ancillary-tests/urodynamics.mdx).
- **Classification ladder**: OASIS grades (`cc71c8e`) → [Obstetric Perineal Injury](docs/03-clinical-conditions/03c-pelvic-support/obstetric-perineal-injury.mdx); AAST renal I–V (`aabafb5`, clarity-rebuilt `78c6de9` after review — III now spares the collecting system, subcapsular vs perirenal hematomas distinguished, legend added) → [Renal Trauma](docs/05-special-populations/05a-trauma-emergencies/renal-trauma.mdx).
- **Geometry panels**: perineal incisions (`115cad8`) → [Male Urethroplasty Incisions](docs/04-surgical-techniques/04a-urethral-reconstruction/male-urethroplasty-incisions-approaches.mdx); Z-plasty (`fb947ed`) → [Z-Plasty](docs/01-foundations/surgical-principles/flaps/z-plasty.mdx); hypospadias positions (`026c2f5`) → [Hypospadias & Epispadias](docs/05-special-populations/05f-lifelong-care/hypospadias-epispadias.mdx); Y-V plasty (`11a36e7`) → [Y-V Plasty](docs/01-foundations/surgical-principles/flaps/y-v-plasty.mdx).
- **Anatomical cross-sections** (also reuse the above primitives): POP-Q six points (`dbc36e7`) → [Pelvic Organ Prolapse](docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx); urethral spongiofibrosis (`03b2fcc`) → [Urethral Stricture](docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx); bladder rupture EPB vs IPB (`195eadd`) → [Bladder Trauma](docs/05-special-populations/05a-trauma-emergencies/bladder-trauma.mdx); penile transverse cross-section (`bfb2ec9`) → [Penis anatomy](docs/01-foundations/anatomy-physiology/genitalia/penis-anatomy-physiology.mdx) (the page's first image); Bricker-vs-Wallace ureteroenteric anastomosis (`615557a`) → [Ileal Conduit](docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx); clam-ileocystoplasty cup-patch (`fd326a7`) → [Ileocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/ileocystoplasty.mdx); pudendal-nerve course (`fe75a0e`) → [Pelvic Neuroanatomy](docs/01-foundations/anatomy-physiology/pelvis-support/pelvic-neuroanatomy.mdx).

**6 public-domain plates embedded** (`5b534cd`) onto anatomy pages: renal vascular tree + nephron + tubular transport (renal), male-pelvis sagittal + bladder-trigone interior (bladder), coronal pelvic-floor/perineal-muscle section (perineum). **Verify each plate's actual content before captioning** — several filenames were misleading (`gray1128` "kidney-section" is the nephron; `gray1140` "bladder-female" is the trigone; `gray1161` "female-pelvis" is the uterus/adnexa) and `mayo-hegar.jpg` carries a vendor watermark (skipped, license).

Evaluation / clinical-conditions / surgical-techniques each got their **first** schematics; **~27** image-bearing pages now (was 16).

**Conventions established (durable — carry forward):**
- **Diagrams-as-code.** Original schematics = generator scripts `scripts/diagrams/*.js` → `static/img/diagrams/*.svg`. House style: white rounded "figure card", brand-blue `#185FA5` primary / slate axes / brick-red diagnostic channel, **white-haloed labels** (`paint-order="stroke"`) so text reads over any line, leader-line callouts parked in whitespace, severity green→amber→red. Edit = re-run the script.
- **Render-verify loop is mandatory** per figure: `node scripts/diagrams/x.js` → headless-Chrome `--screenshot` → **Read the PNG** → fix → embed → `npm run build` → commit+push. Caught a param-swap (path strings printed as text) and a raw-`<` XML break.
- **Escape `<`/`>`/`&` in SVG text** (`&lt;`, `&#8804;`) — a raw `<` breaks the SVG XML exactly like MDX.
- **Embed pattern**: `![alt](/img/diagrams/x.svg)` then a **blank line** then an italic caption ending **(Original WARWIKI schematic)**. The blank line is **mandatory** — without it the image and caption land in one markdown paragraph and the inline caption bleeds beside / cuts off against the image on wide content columns. `npm run lint:figures` (in `npm run lint`) enforces it. [[feedback_figure_caption_blank_line]]
- **stats.json churn**: `prebuild` rewrites the `generatedAt` timestamp — `git checkout -- src/data/stats.json` before committing.
- **Process that worked**: built one approved proof-of-concept (cystometrogram) first, refined for label-overlap (halos + relocated callouts), THEN scaled. Also: **14 already-vetted PD plates sit unused** in `static/img/anatomy/` (perineum/bladder/kidney/female-pelvis) — a zero-risk embed win still on the table.

**Bench (remaining, each reuses an engine):** Blandy female vaginal-flap (Heineke-Mikulicz) geometry · perineum layered sagittal anatomy. **Do NOT schematize radiograph/CT/MRI/US appearances** (RUG/VCUG silhouettes, the "wine-glass sign", CT phases) — the RUG silhouette was reverted on this basis (user rejected the drawn imitation); embed a real PD/CC image or skip the section. UDS tracings and nomograms are *graphs*, not faked photos, so they stay fine. The remaining unused `static/img/anatomy/` plates are mostly mislabeled or redundant — verify before reuse. Detail in `CHANGELOG.md` under 2026-06-06.

---

## Previous Handoff - 2026-06-05 (later) — Urogyn hemostasis/technique build-out (locking stitch · hydrodissection · SPC · VH vessel sealing · TXA · vasoconstrictors-stub cleanup · Video Library re-sync)

7 commits, all fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.

A run of source-dump incorporations across operative-skills/urogyn:

- **New [Locking Stitch](docs/01-foundations/surgical-skills/locking-stitch.mdx)** (`ad12db5`) — running-locked suture; lock for hemostasis on vascular mucosa (vaginal/cervical), not on muscle/skin; Cochrane/ACOG favor continuous non-locking overall. Cross-linked from the obstetric-lacerations page (satisfies hidden-category orphan rule).
- **Built out [Hydrodissection](docs/01-foundations/pharmacology/intraoperative-adjuncts/hydrodissection-agents.mdx)** (`2c55cac`) from stub → full technique + agents (saline/epinephrine/vasopressin/ornipressin head-to-head, vasopressin CV safety, plane-debate RCT). Retitled "Hydrodissection Agents" → "Hydrodissection" (URL unchanged); pharmacology DB row updated.
- **Expanded [Suprapubic Catheter](docs/01-foundations/tools/biomaterials/urinary-catheters/suprapubic-catheter.mdx) placement** (`14a0ff8`) — guidance modalities, full hydrodissection-to-displace-bowel technique (cross-linked to the hydrodissection page), trocar-vs-Seldinger table (Roberts 2020) + bowel-injury 2.4%→0.09% (Hall 2019), first-exchange timing/technique.
- **Expanded vessel sealing on [Vaginal Hysterectomy](docs/04-surgical-techniques/04g-prolapse-repair/apical/vaginal-hysterectomy.mdx)** (`d1e42d5`) — new "Vessel Sealing vs Suture Ligation" section (clamp-cut-ligate vs LigaSure/BiClamp/Harmonic; Kroft meta, Bonavina 2024 network meta, ACOG/Jeppson; difficult-case advantage; suture still needed for cuff + apical).
- **Built out [Tranexamic Acid](docs/01-foundations/pharmacology/intraoperative-adjuncts/tranexamic-acid.mdx)** (`bf34757`) from stub → mechanism + urinary-tract-fibrinolysis rationale, evidence across urologic surgery (POISE-3 subanalysis headline; prostate/cystectomy/PCNL as evidence base, not primary topics), hematuria, dosing, safety led by the **upper-tract-bleeding contraindication**. Cross-linked into the hydrodissection/VH hemostasis cluster.
- **Deleted the redundant Vasoconstrictors stub** (`858720d`) — empty page absorbed by Hydrodissection; removed DB row + index entry, added a vercel redirect, rescued the "avoid epinephrine in end-artery fields (penis/digits/IPP)" pearl onto the Hydrodissection epinephrine subsection. 1185 → 1184 pages.
- **Re-synced the Video Library** (`93a63c8`) — `npm run videos:sync`: **139 → 140 playlists, 1,531 → 1,535 unique videos** (combined 266 / GURS 959 / URPS 310). Chunk count held at 7 (TS2590 guard re-verified); only `videos.ts` (+ stats timestamp) changed.

**Conventions:** dedicated-skill-page (locking stitch) vs expand-in-place (the others) per whether the topic is reusable-standalone or a section of an existing page; always drop the dump's irrelevant copy-paste figures/refs; verify dump-named papers lacking DOIs. Detail in `CHANGELOG.md` under 2026-06-05 (later).

---

## Previous Handoff - 2026-06-05 — New page: Obstetric Perineal & Vaginal Lacerations (urogyn-framed)

1 commit, fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.

Filled a gap: there was no page on the **acute** obstetric laceration (elective perineorrhaphy, anal sphincteroplasty, and episioproctotomy already existed). New **[Obstetric Perineal & Vaginal Lacerations](docs/03-clinical-conditions/03c-pelvic-support/obstetric-perineal-injury.mdx)** (clinical-conditions → 03c Pelvic Support Disorders, `sidebar_position: 4`; auto-listed, no DB to touch). Covers it end-to-end for the urogynecologist: anatomy at risk, classification (1st–4th + OASIS 3a/3b/3c), overstretch mechanism + levator-avulsion→prolapse, risk-factor table, prevention (intrapartum + antenatal), the **acute immediate repair** (deep-to-superficial 2nd-degree technique, continuous>interrupted suture, postop care), a dedicated **"crown stitch"** subsection, and a closing **"Urogynecologist's Role"** with an acute-repair-vs-elective-perineorrhaphy table + sequelae cross-links (prolapse / FI / dyspareunia / RVF).

Notable: **crown stitch framed honestly** as a teaching term (not an ACOG/Cochrane/AAFP entity) with the tension trade-off; **corrected** the dump's garbled OASIS "3a = 50% EAS" to the standard **3a = &lt;50% EAS thickness**. 15 refs with stable parallel anchors. Detail in `CHANGELOG.md` under 2026-06-05.

---

## Previous Handoff - 2026-06-04 — Anatomy reorg (4 groups) + Perineal-urethrostomy restructure + Kulkarni incisions

**Latest (2026-06-04 later):** Added an **"Incisions and Access Options"** section to the [Kulkarni One-Stage page](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/kulkarni-one-stage.mdx) — the one-sided dorsal-onlay principle delivered through four incisions by stricture location: circumcoronal degloving, perineal + penile invagination (standard), **penoscrotal + penile inversion** (Warner 2016), and the glans-sparing **"Mini-Kulkarni"** for fossa-navicularis/meatal strictures (Oliveira 2025 — flagged as a preprint, n=6). Both named papers verified by lit search before citing; **Kanematsu 2025 dropped** because its verified abstract (ventral HM) didn't match the dump's invagination claim. 4 new refs. Detail in `CHANGELOG.md` under 2026-06-04 (later).

The rest of this handoff covers the earlier 2026-06-04 work (4 commits): Anatomy reorg + PU restructure. Lint (scope/citations/orphans/links) clean; typecheck + build clean; verified in-browser.

**Anatomy & Physiology reorganized into 4 reconstructive-lens groups** (commit `fdb0e45`) — replaced the "Pelvis, Support & Other" junk drawer + the two singleton categories (Lower Extremity, Oral Cavity), and housed the orphan `skin.mdx`. New groups (target → surgical field → donor): **Urinary Tract** (+ GU embryology) · **Genitalia & Reproductive** (unchanged) · **Pelvic Floor, Spaces & Neurovascular** (relabeled from `pelvis-support`; 7 pages stay put) · **Donor & Harvest Sites** (new `donor-sites/`: oral cavity, skin, leg & thigh, bowel, abdominal wall). The 6 moved pages each carry a **`slug:` override pinning their old URL** → zero link breakage, no redirects (link checker honors `slug:`). User-chosen scheme via AskUserQuestion; "clean-URL + redirect" pass offered as optional future work.

**Perineal-urethrostomy restructure** (commits `018e200`, `6ab25d9`):

- **7-flap page → [Midline Perineal Urethrostomy](docs/04-surgical-techniques/04a-urethral-reconstruction/meatal-perineal/midline-perineal-urethrostomy.mdx)** — `git mv` to a clean filename, **slug kept stable** (9 inbound links + DB row intact). Leads with the universal midline incision + intraoperative loop-vs-7-flap decision; removed the on-page BMG-augmented section (→ own page).
- **New [Augmented Perineal Urethrostomy](docs/04-surgical-techniques/04a-urethral-reconstruction/meatal-perineal/augmented-perineal-urethrostomy.mdx)** — approach-agnostic (dorsal onlay BMG via midline OR inverted-U/Blandy), so it stands alone. Built from removed content + 2 user dumps (technique, indications, DeLong 80% w/ case-mix caveat, LS evidence, PU-technique comparison table, Kamat revision). 14 refs. Added to atlas DB; short pointers from midline + Blandy.
- **Fixed the Blandy flap geometry** (was reversed + self-contradictory). Correct (verified vs Cleveland Clinic + plasticsurgerykey): **apex points anteriorly toward the scrotum, flap posteriorly based (pedicle toward anus), apex parachuted to the proximal urethrotomy** (~3 cm anterior, ~3:1 base-to-length).
- Link labels updated across johanson/propeller/meatotomy (repointed a dead `#bmg-augmented…` fragment) + AFAB/AMAB nullification pages. Added the **Sean Elliott MD PU video** (`3dKggq-K0cc`, oEmbed title) to the midline page.

**Conventions reinforced:** repurposing a page = rename file but **keep the explicit `slug:`** (URL stability); a spanning, approach-agnostic technique earns **its own page**, not a section under one approach; **`lint:links` strips URL fragments** so deleted-section deep-links must be fixed by hand; **verify a challenged anatomical claim against the operative literature** before editing.

Full session detail in `CHANGELOG.md` under 2026-06-04.

---

## Previous Handoff - 2026-06-03 — New Skin anatomy page + flap-design science folded into the flaps index

2 commits, both fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.

User supplied two large source dumps (skin anatomy / flap-design science + random-pattern-flap best practices) and asked to "update the skin anatomy page." No such page existed; per the user's placement choice (AskUserQuestion), the work split into a **new anatomy page** + a **fold into the flaps index**:

- **New page — [Skin](docs/01-foundations/anatomy-physiology/skin.mdx)** (Anatomy & Physiology, `sidebar_position: 6`, top-level → `/docs/foundations/anatomy-physiology/skin`). Reconstructively framed. **Layers** (epidermis/dermis/hypodermis + donor-site thickness table tied to thin-vs-bulky flap selection; the de-epithelialize-don't-excise-dermis rule), **cutaneous vascular anatomy** (subdermal/subcutaneous/fascial plexuses, two-level perforators, direct/indirect linking vessels, Nakajima five types), **biomechanics** (RSTLs, anisotropy, ~21.6 MPa / ~83.3 MPa), **neurovascular relationships** (neurovascular + venoadipofascial flap basis → sensate genital cover). 19 refs, stable anchors; added to the anatomy index `section-stack`.
- **Expanded — [Flaps in GU Reconstruction](docs/01-foundations/surgical-principles/flaps-gu-reconstruction.mdx)**: Nakajima note in the classification overview; new **Vascular Basis of Flap Design — Angiosome and Perforasome** section (Taylor capture-one-territory rule; Saint-Cyr perforasome axis/linking-vessel rules; imaging-driven flexible plan → GU propeller/perforator flaps); new **Random Pattern Flap Design Principles** section framed on the library's own local random flaps (L:W ratios, arbor geometry, RSTL orientation, undermining-to-3×, the >250 g tension threshold, preserve-the-plexus, delay phenomenon, pharmacologic adjuncts) + summary table. 20 new refs (11–30); bidirectional cross-links with the Skin page.

**Conventions reinforced:**

- **Where new content lands is a real decision — ask when the user's mental model doesn't match the repo.** The user said "the skin anatomy page"; it didn't exist. AskUserQuestion settled placement (new anatomy page + fold flap-design into the flaps index) before any writing.
- **`{#custom-id}` heading anchors break the MDX build.** A `## Heading {#id}` explicit-ID heading made MDX/acorn fail with *"Could not parse expression with acorn"* (the `{…}` is read as a JS expression; aggravated by an `&` in the heading). For a stable cross-page section target, use an explicit `<a id="…"></a>` HTML anchor above the heading instead, and prefer "and" over "&" in anchored headings. `npm run lint` misses this — only `npm run build` catches it (same class as the `<sup>`-closure rule).
- **De-dupe references before they ship.** The skin draft would have cited Nakajima 1986 under two numbers; merged to one and renumbered to keep citation numbering gap-free (lint enforces no gaps).
- **Drop `undefined`-caption figure placeholders** from source dumps (no embed rights; house no-caption-only-figure rule) — two were dropped here.

Full session detail in `CHANGELOG.md` under 2026-06-03.

---

## Previous Handoff - 2026-06-02 (later 2) — Corporal-fibrosis build-out: expanded fibrosis section + 2 new instrument pages (Wilson scissors, Cavernotomes) + VJSM video card

4 commits, all fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean throughout.

A prosthetics-instruments arc, all anchored on **corporal fibrosis in penile-prosthesis surgery**:

- **Expanded the Corporal Scarring / Fibrosis section** of [penile-implants/revision-scenarios.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/revision-scenarios.mdx) from a stub into a full treatment: etiology percentages, preoperative VED protocol, stepwise intraoperative escalation (Hegar → cavernotomes → counter incisions → Montague-Angermeier corporeal excavation → grafting), narrow-base cylinder selection + Wilson staged-upsizing, unilateral-cylinder salvage, and an at-a-glance technique table. **15 new refs (12–26).**
- **New instrument page — [Wilson Backward-Cutting Scissors](docs/01-foundations/tools/instruments/scissors/wilson-backward-cutting.mdx)** (Scissors, pos 6.5). Freeman-Kaye / Gourney pattern; **outer blade edges sharpened so they cut when spread open in scar** — used to carve the initial corporal channel to seat a cavernotome. Verbatim-verified from the Fernandez Crespo 2024 narrative review. Index row added; woven into the fibrosis ladder (new ref 27 there).
- **New instrument page — [Cavernotomes](docs/01-foundations/tools/instruments/sounds-bougies/cavernotomes.mdx)** (Sounds & Bougies, pos 15), **consolidated single page** (not one-per-design): Carrión-Rossello (historical) + Mooreville-Wilson/Uramix (6–13 mm, 1 mm oscillating cuts) designs, technique, Mooreville 1999 + Krughoff 2022 outcomes, blind sub-tunical perforation complications, direct-vision adjuncts (Shaeer US-guided + corporoscopic, Montague-Angermeier), tissue-sparing meta-analysis. 13 refs. Index row + cross-links from the fibrosis ladder and the Wilson scissors page.
- **VJSM video card** on the cavernotomes page (Karapanos mesh-augmentation salvage for tunical perforation). It's a **domain-restricted ISSM Vimeo** (oEmbed `domain_status_code: 403`), so an **external `web-card--video` link**, not an iframe — the SUFU pattern.

**Decisions / conventions reinforced:**

- **Video Library stays YouTube-only** (it's the @warwikihq channel mirror). Outside videos go as **page-level external link cards**, never into the Library registry. The embed test is the oEmbed `domain_status_code` — **200 → inline `<iframe>`; 403 → external `web-card` link** (YouTube → `<VideoCards>`). See [[feedback_sufu_video_embeds]].
- **Consolidate near-identical instrument variants onto one page** with sections (Cavernotomes = Carrión-Rossello + Mooreville-Wilson) rather than thin per-variant pages — same rule as needle-drivers / vessel-sealers.
- **Verify, don't trust, an unfamiliar stat or DOI from a source dump** — softened a garbled "OR 95.92" in the tissue-sparing meta to a qualitative claim; pulled the Wilson-scissors instrument naming verbatim from the source PDF.

Full session detail in `CHANGELOG.md` under 2026-06-02 (later 2).

---

## Previous Handoff - 2026-06-02 (later) — "Drain and Retain" prosthetic-reservoir maneuver added to IPP revision + AUS pages

1 commit, fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.

Incorporated the **"drain and retain"** maneuver (empty + intentionally leave an adherent prosthetic reservoir/balloon in situ instead of explanting it) from a user source dump. **Full treatment** on [penile-implants/revision-scenarios.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/revision-scenarios.mdx) — new `### Drain and Retain` under *Reservoir Complications* (technique, rationale, Cefalu 2013 + Pereira 2026 safety data, infection contraindication, Loloi 2022 SBO caveat; 3 new refs 9–11). **Brief cross-linked note** in [artificial-urinary-sphincter.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx) §7 PRB Modification (same maneuver for the AUS balloon; 2 new refs 69–70), pointing back to the IPP page rather than duplicating.

Notable: **verified the Pereira DOI** instead of trusting the dump (sibling `qdag034` in the same *J Sex Med* issue confirmed the supplied `qdag024`); **added Loloi 2022** (*CUAJ*) as a real safety counterpoint (retained reservoirs → small bowel obstruction, esp. intraperitoneal) to replace the draft's vague "controversial" hand-wave — pearl: confirm extraperitoneal position + counsel re: delayed presentation. **Spanning-topic placement convention reinforced:** one full page + one short cross-linked note, never duplicated (same pattern as urethrectomy/urethrolysis).

Full session detail in `CHANGELOG.md` under 2026-06-02 (later).

---

## Previous Handoff - 2026-06-02 — Transitional Urology build-out: 5 new condition pages (PUV, BEEC, Prune Belly, DSD, ARM)

5 commits, all fast-forwarded to `main`. Lint + typecheck + build clean throughout; every page verified in-browser.

Grew [Transitional Urology](docs/05-special-populations/05f-lifelong-care/transitional-urology.mdx) (under Lifelong Urologic Care) from a single hub into a **hub + six dedicated condition pages**. New, fully-cited adult/lifelong-care pages framed for the reconstructive & functional urologist: **[Posterior Urethral Valves](docs/05-special-populations/05f-lifelong-care/posterior-urethral-valves.mdx)** (37 refs), **[Bladder Exstrophy-Epispadias Complex](docs/05-special-populations/05f-lifelong-care/bladder-exstrophy-epispadias.mdx)** (44), **[Prune Belly Syndrome](docs/05-special-populations/05f-lifelong-care/prune-belly-syndrome.mdx)** (35), **[Differences of Sex Development](docs/05-special-populations/05f-lifelong-care/differences-of-sex-development.mdx)** (29), **[Anorectal Malformations](docs/05-special-populations/05f-lifelong-care/anorectal-malformations.mdx)** (34). All content was supplied as source dumps and merged/deduped/cleaned (dropped "Would you like…" prompts, `undefined`/copyrighted figures, truncated stats; reconciled refs).

**Two conventions to carry forward (user-requested this session):**

- **Pointer-blockquote for hub → dedicated-page links.** Every condition with a page leads its hub subsection with a `> See the dedicated [X] page … the summary below is the transition-clinic orientation.` blockquote; hub copy stays a short orientation. Applied to Neurogenic Bladder, Hypospadias, BEEC, DSD, + new PBS/ARM subsections. Do this for any future hub that summarizes a paged topic.
- **Cross-link, don't duplicate (hard rule on DSD + ARM).** Reoperative hypospadias technique → [Hypospadias & Epispadias]; NLUTD ladder → [Neurogenic Bladder]; catheterizable-channel/augmentation operative detail → those atlas pages; generic transition machinery → the hub. New condition pages point to these rather than reproducing them.

**Sidebar regroup** (the "odd" navbar): condition pages now cluster after the hub, Geriatric Urology moved last. Order: **Transitional Urology · Hypospadias & Epispadias · Posterior Urethral Valves · Bladder Exstrophy-Epispadias Complex · Prune Belly Syndrome · Differences of Sex Development · Anorectal Malformations · Geriatric Urology**.

The section now covers every condition the hub names. **Remaining gap:** no condition is left unpaged. Reference-dump hygiene reinforced — caught a duplicate Peña 1998 in ARM (repointed to NASPGHAN) and a missing ref1 in DSD; atlas landing links use the stripped slug `/docs/surgical-techniques/urethral-reconstruction` (a `04a-…` folder-path link was caught by `lint:links` + build).

Full session detail in `CHANGELOG.md` under 2026-06-02.

---

## Previous Handoff - 2026-06-01 — Pectopexy mesh-config expansion + 2 videos + Video Library re-sync (1528 → 1531)

1 commit, fast-forwarded to `main`. Typecheck + lint + build clean; verified in-browser.

Expanded the [pectopexy](docs/04-surgical-techniques/04g-prolapse-repair/apical/pectopexy.mdx) **Mesh configurations** section from a user-supplied source dump: old 3-column table → 6-column reference (config · dimensions · material · vaginal/cervical fixation · lateral fixation · best-for) covering the Noé 3×15 cm PVDF strip, 8×15 cm T-shaped, inverted-T, and Y-shaped mesh, plus material-choice / preparation-delivery prose and a cross-anchor to the existing Biomechanical fixation note. **6 new refs (19–24)** — most of the supplied citations were already in the list under other numbers; reconciled before appending. Added a `## Videos` block (da Vinci Xi Pectopexy `ysjLsBss99c`; Pectopexy for Urogenital Prolapse `WFBAeUsC95E`), titles via oEmbed.

Re-synced the Video Library (`npm run videos:sync`): **137 → 139 playlists, 1528 → 1531 unique videos** (combined 264 / GURS 958 / URPS 309). `WFBAeUsC95E` is on the @warwikihq channel so it entered the registry; the da Vinci clip is page-embed-only. **Chunk count held at 7** (TS2590 guard re-verified); only `videos.ts` + `stats.json` changed.

**Reinforced:** reconcile a reference dump against the existing list before appending (saves renumbering + duplicates); external page-embed ≠ Video Library entry (only @warwikihq-channel videos enter the registry). **Open item:** intro credits "Banerjee and Noé in 2011" vs the table crediting Noé alone — both exist in the literature, left for a harmonization decision.

Full session detail in `CHANGELOG.md` under 2026-06-01.

---

## Previous Handoff - 2026-05-30 (later 4) — Journal Club surfaced in the navbar

1 commit, fast-forwarded to `main`. Build clean; navbar verified in-browser.

Added **Journal Club** to the left navbar between **Video Library** and **Resources**. It was hidden from the navbar when the old 80-article journal database was retired; the documented condition for surfacing it back ("when the journal database is ready to grow") is now met — it's the 52-trial Landmark Trials database. Wired as a plain `to: '/docs/journal-club'` link in [docusaurus.config.ts](docusaurus.config.ts) (single-page section, so no `docSidebar`). Still in the footer too.

Final left navbar: **Foundations · Evaluation · Clinical Conditions · Treatment Atlas · Special Populations · Video Library · Journal Club · Resources**.

Full session detail in `CHANGELOG.md` under 2026-05-30 (later 4).

---

## Previous Handoff - 2026-05-30 (later 3) — Landmark Trials expanded 42 → 52 (exhaustive site sweep)

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
