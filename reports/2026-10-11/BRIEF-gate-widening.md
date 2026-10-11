# Claim gate widening (Codex, October 11, 2026)

Repo: /Users/joyboy/Documents/WARWIKI/warwiki. Read CLAUDE.md (Claim gate, Quality program sections), reports/quality/README.md, reports/quality/gate-migration.md and reports/quality/guideline-sweep-2026-10-09.md first.

Problem: the guideline sweep found that guideline-statement sentences the gate's GUIDE regex (scripts/review/gate.py line ~51) misses were wrong about twice as often (5.3%) as gated ones (2.5%); 760 such sentences were found that day (see the sweep report and its tool reports/audit-v2/sources-local/quality/guideline_sweep.py for how they were found).

Tasks:
1. Widen the gate's detection so those sentence shapes are gated: guideline sentences where the society name is far from the verb or in a citation/parenthesis, recommendation-strength wording without a society name ("Grade B", "Expert Opinion", "Strong recommendation", "Clinical Principle", "level 1b", "conditional recommendation"), "guideline(s) recommend/advise/suggest", and statement numbers ("Statement 12"). Keep false positives low: test on all docs and report how many new claims each new pattern adds, with 20 random examples per pattern, and drop patterns whose sample is mostly non-claims.
2. Newly gated claims must not fail CI today: register them the way existing unverified claims are carried (legacy/carried-over status per gate-migration.md, no fake verdicts). Run `npm run lint:claims` and `npx vitest run` (if gate tests exist) and make them pass.
3. Prepare the verification run for the newly gated claims only: `python3 scripts/review/gate.py pending <the touched pages or new-claim list> --out reports/audit-v2/sources-local/gate-widening-2026-10-11` (or the equivalent the tools support) so that `scripts/review/orchestrate.py --work <that dir> --claims --reviewers 2 --verifiers 1` can run next. Do not launch orchestrate.py yourself.
4. Write reports/2026-10-11/gate-widening.md: patterns added, counts per pattern, examples, false-positive estimate, number of new claims queued, and the exact next commands.
Do not commit or push. No network needed.
