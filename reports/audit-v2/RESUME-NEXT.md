# Audit v2: resume notes (written September 26, 2026)

## State
- Tiers 1, 2 and 3 are complete (790 pages). Tier 4 is 138 of 397 done (134 checked, 4 not-clinical), 257 not started, 2 partial. Check with `python3 scripts/audit/audit.py stats`.
- Everything completed is committed and pushed to `main`. Last audit commit: `8ae5568d`. The working tree had no uncommitted page edits.
- Remaining tier 4 pages: about 114 surgeon profiles under `docs/07-roots/surgeons/`, about 140 instruments (forceps, scissors, retractors, needle holders and similar under `docs/01-foundations/tools/instruments/`), and a few resources and history pages.

## How to run the next wave
1. `python3 scripts/audit/audit.py next 400 | sed 's/^tier [0-9] | //; s/ |.*//' | grep -v "07-roots/surgeons" | head -40 > reports/voice/work/auditX.txt`, then `split -l 5 -a 1 auditX.txt aX-` inside `reports/voice/work/` (that folder is gitignored, so queue files are not saved).
2. Launch up to 8 `warwiki-auditor` agents in parallel, one list each (5 pages per agent). Tell them: do not commit, do not build, use their own scratchpad subfolder, never pkill other processes, edit only their listed pages, record each page with `audit.py`.
3. As each agent finishes: `npm run lint`, `npm run build`, `git checkout -- src/data/stats.json`, `xargs git add < reports/voice/work/aX-<letter>`, add `reports/audit-v2/status.json`, commit, `git push origin main`.
4. Surgeon profiles: batch about 10 per agent. They are biographies, so expect mostly not-clinical with light voice edits. Verify only claims that can be checked (training, publications, dates). Do not invent facts.

## Gotchas found this session
- Builds hang on a stale cache about once per 10 builds. Kill the build, `rm -rf node_modules/.cache/rspack .docusaurus`, rebuild (about 27 s). There is no `timeout` command on this Mac.
- zsh does not word-split unquoted variables. Use `xargs git add < file`, not `git add $(cat file)`.
- If usage limits hit mid-wave, agents leave partial edits. Find pages modified but not recorded in `status.json`, `git checkout --` them, and rerun those pages.
- `npm run lint` can fail on another running agent's unfinished page. Only commit pages from finished batches.

## Open items for the user
- Confirm from primary text: Fournier FGSI cutoffs against Laor 1995 (page `docs/05-special-populations/05a-trauma-emergencies/fourniers-gangrene.mdx`); the transitional urology transfer age (changed to 18-22 from a secondary summary of White and Cooley 2018); the Endocrine Society 2017 criteria on `simple-orchiectomy.mdx` (from a web summary).
- The Carter-Trost technique reference was removed from three penile implant pages because no source could be found. Restore it with a real citation if the technique is known.
- Some frontmatter `evidenceNote` fields still contain audit-style wording (for example Backhaus, Mixter, vaginal anatomy). Audit rules leave frontmatter alone, so reword by hand if wanted.
- OpenAI cloud voice (`WARWIKI_ENABLE_CLOUD_TTS`) stays off until the audit finishes. User steps: OpenAI $50 limit, Vercel Blob store, env vars `WARWIKI_ENABLE_CLOUD_TTS=true` and `WARWIKI_TTS_MONTHLY_BUDGET_USD=45`, redeploy.
- Codex CLI is still broken (`npm install -g @openai/codex`), so nothing has been delegated to GPT.
- After the audit: write the summary of what the audit refined (from the `status.json` notes) and the list of data the user still needs to supply. The interim version is `reports/2026-09-26-site-review.md`.
