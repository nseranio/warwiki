# Site review, September 26, 2026

Written mid-audit. Numbers come from `audit.py stats`, `reports/audit-v2/open-items.md`, `reports/voice/status.json` and a scan of `docs/`.

## 1. Where things stand

| Area | State |
|---|---|
| Audit v2 | Tier 1 done (39/39). Tier 2 done except 4 placeholder-related partials. Tier 3 about 35/596 and tier 4 about 3/397 recorded. Roughly 950 pages remain, plus 15 `partial` pages. |
| Voice | Pass 1 applied to 968 pages (em dashes 9.3 → 1.0 per 1,000 words). Pass 2 (sentence structure) not applied anywhere; it happens inside the audit. |
| OpenAI article voice | Code is live and off. Needs Blob store, two env vars and an OpenAI $50 limit (your steps). |
| Codex (GPT) | CLI installed but its native binary is missing (`spawn ... ENOENT`), so it cannot run. Fix: `npm install -g @openai/codex`. You chose to skip for now. |
| Handouts, Epic | Paused by your decision. |

## 2. What is old or needs updating

1. **Unaudited content.** About 950 pages have not been source-checked in v2. The findings that recur (wrong PMIDs, figures attributed to a guideline that lacks them, "meta-analysis" labels on small series) will be present on many of them.
2. **Open claims.** `open-items.md` lists about 200 claims that could not be verified and names the source that would settle each.
3. **Older guideline citations.** Cited as current on several pages: AUA 2018 (32 mentions on 12 pages), AUA 2015 (7 mentions, 5 pages), AUA 2016–2017, IDSA 2013/2016/2019, ACOG 2015–2019, AUGS 2018 (the rUTI statement AUGS itself sunset in 2026), ICS 2015. Each needs a check for a newer edition, an amendment or a retraction. Some 2018 AUA documents (ED, testosterone) have not been replaced, so age alone is not an error.
4. **Quarterly evidence review.** Last full run September; next December. The automation needs this computer and the Codex app running. Confirm the Codex problem above does not stop it.
5. **External link check.** Last successful run September 11; the monthly job next runs October 1.
6. **Vercel storage.** Retention cleanup and old deployments were handled in September; recheck usage once the audit's larger rebuilds land.
7. **Voice leftovers.** Pass 1 leaves some list items as "Label. Fragment." Sentence rebuilds (Pass 2) are needed, and only the audit can do them safely.
8. **Stubs and dormant features.** `docs/_STATUS.md` lists 2 stubs (Journal Club index, surgical lineage). Handouts (80 pages, 10 languages, about 355 MB) and the quiz are off by choice.
9. **Videos.** The registry syncs on demand. Only pages the matcher has visited have cards. Deleted YouTube videos are found only when someone checks (one was found September 25).

## 3. What I could not access and need from you

Full text or documents (not available to me, or paywalled):
- Biardeau 2015 ICS artificial urinary sphincter consensus report.
- Manufacturer IFUs and manuals: NURO/Medtronic, Coloplast Titan and Genesis, InterStim/Altaviva/Revi MRI manuals, Ialuril.
- Papers named in `open-items.md`: MASTER (Eur Urol), Tagliaferri, Frazier 2024, Cotte 2023, Shamloul 2013, Levine 2016, Hatzimouratidis 2016, Erickson 2020, Holm 2026, Furr 2019, VanDyke 2021, a trimix efficacy series, and the original urethroplasty technique papers (Jordan 2007, Morey 2001, Wee and Joseph 1989, Yii/Niranjan 1996, Blandy 1968, Asopa 2001, Kulkarni 2009, Xu 2021).
- The AUA antimicrobial best-practice statement (implant infection prophylaxis regimen) and AUA IC/BPS 2022 full text.
- IDSA 2019 ASB guideline text (currently cited through AUGS summaries).
- Any AUA, AUGS or SUFU member-only PDFs that come out after September 25.

Decisions and access only you have:
- The OpenAI $50 limit and the Vercel dashboard steps for cloud audio.
- Clinician review and sign-off. The site never invents reviewer names; recorded review needs your name and dates.
- Native-speaker checks for handout translations before they are republished.
- Your call on restoring handouts and the quiz, and on starting Epic templates.
- Your operative videos and outcome data, if you want original content beyond published sources.

## 4. What can be delegated to GPT to save tokens

Only after the Codex CLI is repaired.

Good fits (mechanical, checkable, low judgment):
1. Quarterly literature collection and first-pass triage (already the Codex job).
2. Reference hygiene: resolve every DOI and PMID, flag mismatches against the citing text.
3. Anchor, link and figure checks, and the monthly external-link sweep.
4. First-pass claim extraction and abstract matching (audit steps B and D), for Claude to verify.
5. Alt text and caption drafts, and translation quality passes for handouts.

Keep with Claude:
- Restoration decisions, deleting or correcting clinical claims, drift judging, and every edit that changes recommendation strength.
