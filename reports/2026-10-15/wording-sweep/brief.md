# WARWIKI wording sweep (read-only review; October 15, 2026)

You are reviewing WARWIKI pages (Docusaurus MDX; a reference wiki for reconstructive urology, functional urology and urogynecology; readers are surgeons). The owner flagged three wording problems on the female SUI page. Find the same problems on the pages listed below. **Do not edit any page.** Your only output is one TSV file.

## The three problems

1. **standalone-study** — a paragraph (usually one or two sentences) that reports a single study and does not fit the section it sits in. Owner example, in *Pathophysiology*:
   "Blaivas and Olsson (1988) proposed a classification of stress incontinence based on the nature of vesical neck descent and the integrity of the intrinsic sphincteric mechanism, and used it to select the operation in 72 patients. With a minimum follow-up of 18 months, 94% were cured of stress incontinence, but 14 developed frequency and urgency..."
   Outcome numbers in a mechanism section are out of place. Fix used: fold the one relevant idea into the neighbouring paragraph ("Blaivas and Olsson classified stress incontinence by the degree of vesical neck descent and the integrity of the intrinsic sphincter, and used the classification to choose the operation.[25]") and drop the outcome numbers (or move them to Outcomes/Management if that section lacks them).
   Flag only when the study is genuinely misplaced (outcome data in Anatomy/Pathophysiology/Epidemiology/Diagnosis, a surgical series in a conservative-therapy section, a lone historical anecdote mid-Management) or is a disconnected one-study paragraph that repeats or contradicts what the section already says. A study paragraph inside Outcomes, Management or a treatment subsection where it belongs is NOT a finding. Landmark trials summarised in the right section are fine.

2. **guideline-box** — a call-out box (`> **ACP Guideline:** ...`, `> **AUA/SUFU:** ...`, bold "Guideline" lead-ins) in the opening or another section where it does not belong, especially when a later section already states the same recommendation. Owner example: "> **ACP Guideline:** The American College of Physicians recommends PFMT for stress UI ..." right after the opening, while the PFMT section already gives it. Fix: delete if repeated later; otherwise move to <section>.

3. **rebuttal-scope** — sentences that break STYLE.md §11/§12 (below): rebuttals of an overclaim nobody made, non-transfer warnings, restated design limits, process notes, scope statements and relevance lists in openings. Owner examples from the SUI opening:
   - "This broad symptom-based estimate is not the prevalence of bothersome, treatment-seeking SUI." → delete.
   - "...yet only 7.1% of all 3,000 participants reported treatment for LUTS — a persistent treatment-seeking gap rather than a change in the underlying prevalence estimate." → rewrite: "...and 7.1% reported treatment for them."
   - "This page covers the clinical framework and diagnostic workup. For procedural selection ..., see the [X database](...)." → move the pointer to the Surgical options section as "> See the [X] for ..."; delete the scope sentence.
   - Openings: "SUI causes significant physical, emotional, and social distress and is a leading driver of referral." is a relevance line; flag as rewrite/delete only if clearly filler.

### STYLE.md §11 (Openings)
An opening paragraph defines the subject and gives its key facts, then stops. Cut relevance lists ("For the reconstructive surgeon it matters in four ways"), scope statements ("This article focuses on", "is described here"; exception: one short sentence routing to a sibling page), hedges that rebut nobody, long parenthetical inventories.

### STYLE.md §12 (Trust the reader)
State the finding and its population once, then stop. Cut: non-transfer warnings ("Do not transfer its 87% versus 29% result to perineal ulcers"); rebuttals of an overclaim nobody made ("X does not establish Y", "is not a universal rule", "should not be read as", "not only burns exceeding 90%"); restated design limits (a second sentence explaining what "retrospective" means); process notes ("in the inspected abstract", "not independently assessed", "confidence interval not reported").
KEEP (never flag): population/design/size/follow-up written into the result sentence; real safety points, contraindications, label limits; guideline statements including a guideline "does not recommend"; a genuine conflict between sources stated once; evidence-quality statements that are the point of the sentence ("No randomized trial compares X with Y" is a real evidence statement when the section is about choosing between them).

## Precision over recall
A wrong finding costs the owner time. Flag only clear cases. For each candidate ask: would a surgeon-editor cut or move this on a first read? If unsure, give confidence "low" or skip it. Do not flag ordinary prose style, word choice, typography, or factual accuracy; that is out of scope.

## Output
Write exactly one file: OUTPUT (path given below). Tab-separated, header row first, one row per finding, columns:

page	line	sentence	problem	fix	proposed_text	confidence	touches_claim	reason

- page: the path exactly as given. line: 1-based line number in the file where the sentence starts.
- sentence: the exact offending text copied verbatim from the file (one sentence, or the whole box/paragraph for guideline-box and standalone-study; no tabs or newlines; keep MDX such as <sup>[[3]](#ref3)</sup>).
- problem: standalone-study | guideline-box | rebuttal-scope
- fix: delete | move to <section heading> | rewrite | fold into previous paragraph
- proposed_text: for rewrite/fold/move, the full replacement text (verbatim-ready MDX, keep citations); for delete, empty. Never introduce a new number, dose or claim; you may only remove them or keep them verbatim.
- confidence: high | medium | low
- touches_claim: yes if the proposed change rewrites (not just deletes) a sentence containing a number, dose, percentage or guideline recommendation; else no.
- reason: under 20 words.

Read every page fully (whole file). If a page has no findings, write nothing for it. When done, reply with the number of rows written.
