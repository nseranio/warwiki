# Audit v2: resume notes (rewritten September 26, 2026, late evening)

## State
- **The audit queue is complete** (tiers 1 to 4, 1,073 pages). Surgeon profiles are out of the queue by user decision; history claims are low priority. Check with `python3 scripts/audit/audit.py stats`.
- Everything through commit `71ab7762` is pushed to `main`; lint, typecheck and build passed.
- After the queue finished, the user supplied about 75 guidelines, IFUs and papers on September 26 in three rounds. All were checked against the pages that rely on them and corrected. The lists are section C of [needed-from-user.md](needed-from-user.md) plus the two "Sources supplied" paragraphs in section A. Extracted text: `reports/audit-v2/sources-local/dl-2026-09-26/` (gitignored; PDFs in `~/Downloads`).
- The user answered decisions 1 to 10, 11 to 16, 19, 21, 22 and the MASTER question (settled by the HTA monograph). All are applied.

## Next steps, in order
1. **Read [needed-from-user.md](needed-from-user.md)** and ask the user for the open decisions (numbers 27 to 35 and the "still open from this round" list a to f). Recommendations are written next to each; most are one-line applications.
2. **Small items owed:** apply AUA MIBC Statement 16 (VTE prophylaxis, strong, up to four weeks) to `docs/01-foundations/pharmacology/perioperative-eras/vte-prophylaxis.mdx`; check whether NLUTD Statement 58 sits in the Diagnosis paper (doi 10.1097/JU.0000000000002235, now ref 31 on `renal-function-metabolic-surveillance.mdx`) or the Treatment paper (ref 6); open Okusanya 2026 to reconcile the defibulation counts (8 studies and 3,166 women vs the WHO review's 7 and 3,103).
3. **Cleanup pending a yes:** about 47 pages still have audit-style `evidenceNote` frontmatter ("Corrected...", "Full-page read", "recorded internally", "remains open"); reword to narrow neutral notes.
4. **Check newly supplied sources** with the same procedure: `pdftotext -layout`, identify each file from its title page (file names mislead), group by topic, one agent per group with `reports/voice/work/src-common.txt` as the brief (gitignored; recreate from the description below if missing), then lint, typecheck, build, commit only touched files.
   - Brief: find pages that rely on the source; compare every claim it can settle; correct narrowly; resolve previously not-checkable items; record each page with `audit.py record <path> checked "<note>"`; no commit, no build, no `pkill`; run `lint:citations` and `lint:links`.
   - Agents sometimes delegate and return early. Tell them to do the work themselves. Concurrent agents can overwrite each other's status notes; keep groups on disjoint pages and tell them to re-read a page's record before writing.
5. **On hold at the user's request:** the textbook fix (`docs/08-resources/textbooks.mdx`; Campbell-Walsh-Wein 13th ed and Wieder's Pocket Guide are in the user's general urology folder) and the mining pilot (`reports/textbook-mining/CODEX-PROMPT.md`, run by Claude agents, pilot book *Advanced Male Urethral and Genital Reconstructive Surgery*). Do not start them until the user says so.
6. **After the audit:** write the summary of what the audit refined (from `status.json` notes) and the list of data the user still needs to supply (interim: `reports/2026-09-26-site-review.md`); confirm whether to run a separate Pass 2 voice sweep; restoring the OpenAI article voice waits until the audit is finished.

## Sources still wanted (short list; full list in needed-from-user.md section B)
ACOG documents (user has no access right now); ASCRS 2020 left-sided diverticulitis guideline; full ASRA LAST advisory; Revi surgical technique guide; US InterStim MRI guidelines; Biardeau 2015, Laor 1995, EVA, ASPIRe, OPTIMAL, AUS series (Cotte, Phe, Peyronnet), paywalled batch; Coloplast Titan and Genesis IFUs, AMS 800 operating room manual (92116967), ProACT, ATOMS, Argus, Remeex, UroLift, Aquablation, iTind IFUs, drug labels, Intuitive and stapler IFUs, instrument catalogs. Dropped: NLUTD 2024 amendment and Medtronic NURO IFU (user could not find them).

## Gotchas
- Builds hang on a stale cache about once per 10 builds. Kill the build, `rm -rf node_modules/.cache/rspack .docusaurus`, rebuild (about 27 s). There is no `timeout` command on this Mac.
- zsh does not word-split unquoted variables and errors on unmatched globs; use `find` and `xargs git add < file`.
- `npm run lint` can fail on another agent's unfinished page (orphan ref anchors appear mid-run); only commit when every agent has finished. `git checkout -- src/data/stats.json` after builds.
- PubMed rate-limits (HTTP 429) when many agents run at once; retries work. ScienceDirect, Sklar, Intuitive, AUA journal and many catalog pages return 403 to fetch tools; ask the user for PDFs.
- Untracked `tp.json`, `world-cup-next-week-pacific.ics` and `reports/2026-09-25-planning/` are not part of the audit; leave them out of commits.
- Decision rules from the user: no manufacturer marketing data (IFU specifications are fine); when guidelines conflict, state both and lead with the one the user names; cross-link rather than duplicate.

## Other open items
- OpenAI cloud voice (`WARWIKI_ENABLE_CLOUD_TTS`) stays off until the audit is finished; user steps are in needed-from-user.md, item 23. Codex CLI is still broken.
