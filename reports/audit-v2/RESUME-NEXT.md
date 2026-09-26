# Audit v2: resume notes (rewritten September 26, 2026, end of session)

## State
- **The audit queue is complete.** Tiers 1 to 4 are done (1,073 pages). Surgeon profiles were removed from the queue on September 26 by user decision (`scripts/audit/audit.py build-queue` now skips `docs/07-roots/surgeons/`); do not audit them. History claims are low priority.
- Check with `python3 scripts/audit/audit.py stats`. Everything through commit `8f41a18c` is pushed to `main`; lint and build passed (exit 0). The MASTER 24-month abstract check (six male sling, incontinence and AUS pages) was committed in the final commit of the session.
- After the queue finished, the user supplied about 40 guidelines, IFUs and papers on September 26. All were checked against the pages that rely on them (25 to 40 pages per source group) and corrections were committed. The list of what was supplied is section C of [needed-from-user.md](needed-from-user.md). Extracted text is in `reports/audit-v2/sources-local/dl-2026-09-26/` (gitignored; PDFs in `~/Downloads`).

## Next steps, in order
1. **Read [needed-from-user.md](needed-from-user.md).** Section A holds about 26 open decisions; ask the user to answer them in one line each, then apply the answers (most are one-page wording changes). Section B lists the sources still needed, by value.
2. **Check newly supplied sources** with the same procedure as September 26: convert with `pdftotext -layout`, identify each file from its title page (do not trust file names: `s00192-024-05923-z` turned out to be the bladder pain report, `MH Unabridged` the microhematuria guideline), group by topic, send one agent per source group with `reports/voice/work/src-common.txt` as the shared brief (that file is gitignored; recreate it from the description below if missing), then lint, build, commit.
   - Shared brief: find pages that rely on the source; compare every claim it can settle (numbers, grades, statement numbers, doses, sizes, wording); correct narrowly; resolve previously not-checkable items; record each page with `audit.py record <path> checked "<note>"`; no commit, no build, no `pkill`; run `lint:citations` and `lint:links`.
   - Agents sometimes delegate to sub-agents and return early. Tell them to do the work themselves.
   - Agents editing shared pages can overwrite each other's status notes; keep concurrent groups on disjoint pages where possible.
3. **On hold at the user's request: the textbook fix and the mining pilot.** Do not start them until the user says so. Fix plan: check the nine unconfirmed entries in `docs/08-resources/textbooks.mdx` against title pages in `~/Documents/Medicine/Urology`. Pilot plan: `reports/textbook-mining/CODEX-PROMPT.md`, run by Claude agents (Codex CLI is broken), pilot book *Advanced Male Urethral and Genital Reconstructive Surgery*, findings outside the repo.
4. **After the audit:** write the summary of what the audit refined (from the `status.json` notes) and the list of data the user still needs to supply (the interim version is `reports/2026-09-26-site-review.md`); Pass 2 voice edits happen only inside the audit, which is now finished, so confirm with the user whether to run a separate Pass 2 sweep; restoring the OpenAI article voice waits until the audit is finished.

## Gotchas
- Builds hang on a stale cache about once per 10 builds. Kill the build, `rm -rf node_modules/.cache/rspack .docusaurus`, rebuild (about 27 s). There is no `timeout` command on this Mac.
- zsh does not word-split unquoted variables. Use `xargs git add < file`, not `git add $(cat file)`.
- `npm run lint` can fail on another agent's unfinished page. Only commit when every agent has finished.
- PubMed rate-limits (HTTP 429) when many agents run at once; retries work.
- ScienceDirect, Sklar, Intuitive, AUA journal and many catalog pages return 403 to fetch tools. Ask the user for PDFs.
- Untracked files `tp.json`, `world-cup-next-week-pacific.ics` and `reports/2026-09-25-planning/` are not part of the audit; leave them out of commits.

## Other open items (details in needed-from-user.md)
- OpenAI cloud voice (`WARWIKI_ENABLE_CLOUD_TTS`) stays off until the audit is finished; user steps are in section A, item 23.
- Codex CLI is still broken (`npm install -g @openai/codex`), so nothing has been delegated to GPT.
