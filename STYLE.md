# WARWIKI house style

Status: adopted September 25, 2026, after the round 3 pilot on 10 pages (`reports/voice-pilot-2026-09-25/REVIEW.md`). The owner approved the Pass 1+2 voice and delegated the decisions in section 8.

WARWIKI is a specialist clinical reference for functional, reconstructive and prosthetic urology and urogynecology. Readers are urologists, urogynecologists, fellows and residents who know standard anatomy, terminology and common procedures. The voice is that of a subspecialty encyclopedia or textbook chapter: impersonal, declarative and specific. The aim is not to sound authoritative. It is to make supported information easy to find and hard to misread.

The rules are grouped by the pass that applies them:

- **Pass 1** (sections 1 and 2) is safe to run on any page without its sources.
- **Pass 2** (section 3) restructures sentences. It runs only during the source audit, when a moved citation can be checked against the paper.
- **Section 4** governs evidence wording in all new writing and in the audit.

## 1. Typography (Pass 1)

- **Em dash.** At most one per paragraph, and only for a true parenthetical. Never use it as a connector or to append a punchline ("— a critical distinction", "— not X"). Rewrite the sentence rather than swapping in a colon. A colon introduces a list, a definition or a value, and nothing else.
- **Bold.** Bold the article subject in the first sentence and a defined term where it is defined. A short run-in label at the start of a list item stays bold and is followed by a full stop, or by a colon only when it introduces a list or a value ("**Skin.** Close with…", "**Dose:** 5 mg"). Do not bold for emphasis inside a sentence, including numbers, drug names and recommendations.
- **Symbols in prose.** Write out "→", "+" and "=" used as words, "/" meaning "or", "~" meaning "approximately", and "vs". Keep symbols in tables, algorithm boxes, doses and established notation (n = 117, ≥III, 5 mg/kg, p = 0.02, HR 1.23).
- No ALL-CAPS emphasis, exclamation marks or scare quotes.

## 2. Words (Pass 1)

Delete or replace:

- **Signposting:** importantly, notably, interestingly, of note, it is worth noting, this highlights, this underscores, taken together, overall, ultimately, in summary, in conclusion.
- **Empty evaluation:** crucial, critical, essential, key, vital, paramount, pivotal, robust, promising, excellent, powerful, innovative, remarkable, well-established, workhorse. Replace the word with the fact that justifies it, or delete it. Fixed clinical terms keep their wording, for example "critical limb ischemia".
- **"Gold standard":** keep it only when a cited source uses the term, and attribute it to that source.
- **Editorial-brief vocabulary:** "framed for the reconstructive surgeon", "sits between", "anchored on", "the lens", "the playbook", "home run", "the takeaway", "owned by".
- **Contrast tics:** "not X — Y", "X, not Y", and "rather than" used for rhythm. Keep "rather than" when it names a real clinical alternative.
- **Generic closers:** "treatment should be individualized", "shared decision-making is essential", "careful patient selection is important", "further research is needed". If the page already names the variables, rewrite the closer to name them; otherwise delete it and list it in the report. Never invent the variables.
- **Reader address:** you, your, we, our, let's. Quoted text stays verbatim.

A sentence with no clinical content that only announces scope ("This page covers…") may be deleted in Pass 1 and listed in the report. A hedge, qualifier or recommendation-strength clause is never deleted in Pass 1; report it for the audit.

Pass 1 does not split, merge or reorder sentences. The only exception is a sentence that cannot lose its em dash any other way; in that case, keep every citation marker at the end of the clause it followed.

## 3. Sentence structure (Pass 2, during the audit only)

- **Claims are complete sentences.** A list item that makes a claim needs a subject and a finite verb. Fold a bold label into the sentence ("**Alpha-blockers** are used for documented obstruction") rather than leaving a label followed by a fragment, using only words the original already supports. Never add a claim while folding (for example "affects selection").
- **Enumerations stay enumerations.** Lists of symptoms, findings, instruments, differentials or equipment remain noun phrases. Do not add filler verbs ("Foul-smelling discharge occurs.").
- **Directives.** Keep imperatives inside operative-step lists, checklists and pearl boxes, where textbooks use them. Elsewhere, describe routine practice in the active present ("Baseline blood pressure and PVR are measured before mirabegron is started"). Use "should" only for a genuine recommendation, and at most about once per paragraph. Never mass-convert commands into "should be …" passives. Management and recommendation bullets ("Offer…", "Consider…", "Counsel…") keep their imperative; do not rewrite them as "Clinicians offer…".
- **Splitting and merging.** When a sentence is split, each citation marker moves with the clause it supports. Check the moved claim against the cited source; that is why this pass belongs in the audit. Do not add connectives ("since", "because", "so", "therefore") that the original does not state; `check_voice_diff.py` warns when one appears.
- **Lists into prose.** Convert a bullet list into a paragraph when the items form an argument, a comparison or a sequence of reasoning. Keep the list when the items are parallel options or steps.
- **Lead.** The first sentence defines the subject ("X is a … in which …"). Do not write "This page covers".
- **Precision over polish.** Keep each qualifier next to the claim it qualifies. Repeat a technical noun rather than use an ambiguous pronoun. A paragraph ends when its facts end, with no summarizing last sentence. Keep intensity: "very common" stays "very common" unless the page gives the number.

## 4. Evidence wording (new writing and the audit)

- Use "causes" or "reduces" only when a causal conclusion is justified.
- Use "is associated with" for observational findings.
- Use "randomized trials showed" for randomized evidence.
- Use "retrospective series report" for retrospective evidence.
- Use "guidelines recommend" only for an explicit recommendation, with the guideline's own strength label (AUA Strong/Moderate/Conditional/Expert Opinion/Clinical Principle; EAU strong/weak).
- Use "has been described" for technical reports and small series.
- Use "evidence is insufficient to determine" when that is the case.

Do not convert:

- association into causation
- absence of evidence into evidence of no effect
- statistical significance into clinical importance
- one study into consensus
- expert practice into a guideline recommendation
- a surrogate outcome into a patient-centered one
- technical feasibility into efficacy

Report n/N, comparator, follow-up and the definition of success when the source gives them. Keep these outcomes distinct: anatomical success, functional success, patient-reported improvement, retreatment, revision, explantation, recurrence and freedom from reoperation. "Rare" needs a frequency; "durable" needs a follow-up duration.

Label manufacturer information, a named surgeon's technique and institutional practice as such.

## 5. Invariants for any voice pass (hard constraints)

A voice pass changes how facts are said, never which facts are said.

1. Frontmatter, `import` lines, JSX components, image lines and captions, video blocks and the References section stay byte-identical.
2. Heading text stays identical, because headings generate URL anchors that other pages link to. Suggest better headings in the report.
3. Tables keep the same rows, the same cells per row, the same first-column labels, and every number, name and citation marker in each cell. Only Pass 1 rules apply inside cells.
4. Every number, unit, dose, rate, denominator, date and trial name stays. Every citation marker stays attached to the same claim, and every link target stays.
5. Hedging and recommendation strength stay as written. Report suspected overstatement for the audit rather than fixing it silently.
6. Nothing useful is deleted, including operative steps, pearls, specifications, warnings, history and sections (content-preservation policy). A sentence may go only when the same fact appears elsewhere in the same section, and each removal is listed.
7. The output is valid MDX: `&lt;` and `&gt;` in prose, intact `<sup>` markup, no `{#id}` anchors.
8. `python3 scripts/voice/check_voice_diff.py <original> <revised>` prints PASS. Explain every WARN in the report.

Pass 1 is run with `scripts/voice/pass1.py` (extract, edit by ID, apply). It reverts any unit that loses a citation marker, link or number.

## 6. Report per page

1. Removed sentences, quoted, and where each fact remains.
2. Generic statements deleted or rewritten.
3. Suspected overstatements or evidence-wording problems for the audit.
4. Suggested heading changes, which are not applied.
5. Anything uncertain.

## 7. Examples (from pages outside the pilot)

Pass 1:

> Before: 2. **Stricture assessment** — the urethral lumen is inspected; the length and severity of the stricture confirmed. The urethra is **not mobilized circumferentially** from the corpora cavernosa — a critical distinction from the dorsal onlay technique.
>
> After: 2. **Stricture assessment.** The urethral lumen is inspected and the length and severity of the stricture are confirmed. Unlike in dorsal onlay, the urethra is not mobilized circumferentially from the corpora cavernosa.

Pass 2:

> Before: - **Augmentation cystoplasty** — hostile bladder refractory to medical therapy + botulinum. Typically ileum; ileocecal in selected cases.
>
> After: - **Augmentation cystoplasty** is used for a hostile bladder refractory to medical therapy and botulinum toxin. Ileum is typical; an ileocecal segment is used in selected cases.

Wrong (mechanical, passive and stilted):

> **Augmentation cystoplasty** should be considered for a hostile bladder, which should be refractory to medical therapy and botulinum toxin.

## 8. Decisions delegated by the owner (September 25, 2026)

- Imperatives stay in operative steps, checklists, pearls and management or recommendation bullets. Elsewhere, describe practice in the active present.
- Bold run-in labels stay bold at the start of a list item, with a full stop after them (colon only before a list or value).
- Pass 1 may delete a pure scope sentence and lists it. It never deletes a hedge or qualifier. Pass 2 may merge or drop a hedge only when the audit has checked it against the source.
- Pass 2 (sentence structure) happens only inside the source audit, on pages the audit edits.
