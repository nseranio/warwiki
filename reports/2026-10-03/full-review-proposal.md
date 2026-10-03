# Full-site second review with parallel Codex agents: pilot and proposal (October 3, 2026)

## Pilot

Eight pages already audited in September–October were picked at random from queue tiers 1–3. Four Codex agents ran in parallel (two pages each), read-only, with `full-review-pilot/pilot-brief.md` (AUDIT.md procedure plus currency, cross-page consistency, completeness and voice). Wall time was 18 minutes; Codex estimated 8–30 minutes per page.

| Page | High | Medium | Low |
|---|---|---|---|
| Female SUI | 2 | 9 | 2 |
| Urgency incontinence / OAB | 7 | 7 | 6 |
| Male urethroplasty (hub) | 6 | 7 | 2 |
| Post-kidney-transplant fistula | 6 | 15 | 3 |
| Preoperative hormonal priming | 2 | 8 | 2 |
| Staged BMG (female) | 3 | 3 | 1 |
| Renal function and metabolic surveillance | 1 | 10 | 2 |
| Pudexacianinium | 1 | 6 | 3 |
| **Total** | **28** | **65** | **21** |

- **Findings by category:** accuracy 69, reference 11, consistency 10, completeness 9, currency 5, structure 5, voice 5. 102 of the 114 findings came with an exact proposed edit.
- **Claude's check:** three high-severity findings were checked against the PubMed abstracts, and all three are real errors on the live pages:
  - a fistula rate and an obstruction rate merged into one "complication range" (post-kidney-transplant, Nie 2009);
  - complete continence reported as "symptomatic success" (OAB, Awad 1998);
  - a 90% success figure for a cohort where only 51 of 91 had reached stage 2 (staged BMG, Kozinn 2013).
- **Character of the findings:** typical misreadings a first pass misses, such as the wrong denominator, the wrong endpoint, a guideline strength or scope dropped, a cross-page contradiction, or a 2024 trial omitted. They are not fabricated references.

## Proposal

**Scope.** About 1,036 content pages, excluding indexes and surgeon profiles, in queue-tier order: tier 1 has 39 pages, tier 2 has 155, tier 3 has 596 and tier 4 has 283. Tier 4 (anatomy, instruments, history, resources) could get a lighter brief.

**Pipeline per batch of about 20 pages in one section:**

1. **Review.** 4–8 Codex reviewer agents in parallel, read-only, write findings with exact proposed edits and the evidence they opened (the pilot brief).
2. **Adversarial check.** A separate Codex verifier agent re-opens the evidence for every high and medium finding and tries to refute it. Only findings that both agents agree on go forward.
3. **Apply.** Claude reads every high-severity finding and its source, samples the medium ones, applies the edits, and records disagreements for the user.
4. **Publish.** Lint, build and `git diff --check`, then commit and push the batch and record it in the audit status file. Pages with uncommitted work from another session are skipped.

**Estimated throughput.** The pilot rate was about 27 pages an hour with 4 agents.

| Scope | Review time | Expected findings |
|---|---|---|
| Tiers 1–2 (194 pages) | About 7 hours with 4 agents | About 700 findings, about 650 high |
| Whole site | About 40 hours with 4 agents, or about 20 with 8 if Codex rate limits allow | About 14,000 findings, about 3,500 high |

The reviews are not the bottleneck: the verifier pass and Claude's review of high-severity findings are, so the realistic pace is one or two sections a day.

**Cost and risk.**
- Codex usage comes from the ChatGPT plan's limits. Claude usage goes mainly to verification and editing.
- The main risk is churn on pages that are already correct, so medium and low findings without an exact edit and a cited source are dropped. The content-preservation policy applies throughout, and nothing is deleted without a demonstrated error.

**Suggested start:** tiers 1 and 2 (core practice pages: SUI, OAB, POP, male SUI/AUS, BPH, stricture, recurrent UTI, ED). This includes applying the 8 pilot pages' verified findings. After that batch, a decision on whether to continue to tiers 3 and 4.
