# WARWIKI house style (draft v2 for pilot)

WARWIKI is a specialist clinical reference for functional, reconstructive and prosthetic urology and urogynecology. Readers are urologists, urogynecologists, fellows and residents who know standard anatomy, terminology and common procedures. Write as a subspecialty encyclopedia: impersonal, declarative, specific. The aim is not to sound authoritative. The aim is to make supported information easy to find and hard to misread.

## 1. Sentences

- Each sentence states a definition, fact, number, indication, contraindication, decision point, operative step, outcome, complication, recommendation or limitation. Delete sentences that only introduce, emphasize, transition or restate.
- In prose, write complete declarative sentences. Fragments belong in tables and lists only.
- Name the subject. Do not open a sentence with "This" standing for the whole previous sentence ("This is why…", "This means…", "This makes…").
- Do not address the reader (you, your, we, our, let's) and do not ask rhetorical questions. Quoted guideline or patient-counseling text stays verbatim.
- Prefer local precision over global elegance. Keep a qualifier next to the claim it qualifies. Repeat a technical noun rather than use an ambiguous pronoun. A paragraph ends when its facts end; do not add a summarizing last sentence.
- **Every sentence has a grammatical subject and a finite verb, including list items.** A bold label followed by a fragment ("**Alpha-blockers.** Helpful for documented obstruction.") is the site's commonest machine-writing pattern after the em dash. Fold the label into the sentence as its subject ("**Alpha-blockers** are used for documented obstruction; …"), or keep the label and follow it with a complete sentence. Folding is preferred.
- **Imperatives become declaratives of the same force.** Handbook commands ("Check blood pressure", "Avoid X", "Counsel about Y", "Discuss before proceeding") are rewritten as statements. Keep the obligation: a command becomes "should" ("Standing blood pressure should be checked"), never "may", "can" or "is recommended" (which would add attribution the page does not have). Descriptive practice can use the present tense ("Alpha-blockers are taken at night").
- **Do not add logical connectives the original does not state.** "Since", "because", "therefore", "so", "thus" and "as a result" may appear only where the original asserts that causal or inferential link.
- **Intensity stays.** "Very common" stays "very common" (or becomes the number the page gives); do not delete or add intensifiers that change a magnitude claim.

## 2. Punctuation and typography

These are the most frequent machine-writing signatures on the current site.

- **Em dash.** At most one per paragraph, and only for a true parenthetical. It is not a default connector. Never use it to append a punchline ("— a critical distinction from…", "— not X"). Rewrite the sentence instead: two sentences, a subordinate clause, a semicolon, commas or parentheses. Do not swap every em dash for a colon; a colon introduces a list, a definition or a quoted value, nothing else. Mechanical one-for-one substitution produces the same cadence with different punctuation.
- **Bold.** Bold the article subject in the first sentence and a defined term at the point of definition. In numbered operative steps and definition-style lists, a short run-in label may be bold, followed by a period or colon (not an em dash). No bold for emphasis inside a sentence.
- **Symbols in prose.** Arrows (→), "+" and "=" used as words, "/" for "or", "~" for "approximately" and "vs" are written out in running prose ("progresses to", "and", "indicates", "or", "approximately", "versus"). Keep symbols in tables, algorithm boxes, doses and established notation (n = 117, ≥III, 5 mg/kg, p = 0.02, HR 1.23).
- No ALL-CAPS emphasis, exclamation marks or scare quotes.

## 3. Words

Delete or replace:

- **Signposting and metadiscourse:** importantly, notably, interestingly, of note, it is worth noting, it should be emphasized, this highlights, this underscores, taken together, overall, ultimately, in summary, in conclusion.
- **Empty evaluation:** crucial, critical, essential, key, vital, paramount, pivotal, robust, promising, excellent, powerful, innovative, remarkable, well-established. Replace the adjective with the fact that justifies it, or delete it. Fixed clinical terms keep their words (critical limb ischemia, key-hole, essential hypertension).
- **"Gold standard":** keep only when the cited source uses the term, and attribute it. Otherwise name the comparison ("the most studied option", "the reference technique in the 2023 AUA guideline").
- **Editorial-brief vocabulary:** "framed for the reconstructive surgeon", "sits between", "anchored on/by", "the lens", "the playbook", "workhorse" (unless a source uses it), "home run", "the takeaway".
- **Metaphor and personification standing in for facts:** "the opposite arm of autonomic physiology", "a hostile bed", "tip a borderline patient into", "owned by colorectal surgery", "the urologic clue". Replace with the literal statement when the literal statement is already on the page; otherwise leave it and list it in the report.
- **Contrast tics:** "not X — Y", "X, not Y", and "rather than" used for rhythm. State what is done or true. Keep "rather than" when it names a real clinical alternative.
- **Generic closers:** "treatment should be individualized", "shared decision-making is essential", "careful patient selection is important", "further research is needed". If the page already states the variables that drive the choice, delete the closer or rewrite it to name those variables. If it does not, delete the closer and list it in the report. Never invent the variables.

## 4. Evidence wording

Applies when writing new content, or during the source audit when the sources are in hand. A voice-only pass does not apply this section; it flags suspected problems instead.

- "Causes" or "reduces" only when a causal conclusion is justified. "Is associated with" for observational findings. "Randomized trials showed" for randomized evidence. "Retrospective series report" for retrospective evidence. "Guidelines recommend" only for an explicit recommendation, with the guideline's own strength label (AUA Strong/Moderate/Conditional/Expert Opinion/Clinical Principle; EAU strong/weak). "Has been described" for technical reports and small series. "Evidence is insufficient to determine" when it is.
- Do not convert association into causation, absence of evidence into evidence of no effect, statistical significance into clinical importance, one study into consensus, expert practice into a guideline recommendation, a surrogate into a patient-centered outcome, or technical feasibility into efficacy.
- Report n/N, comparator, follow-up and the definition of success when the source gives them. Distinguish anatomical success, functional success, patient-reported improvement, retreatment, revision, explantation, recurrence and freedom from reoperation. "Rare" needs a frequency; "durable" needs a follow-up duration.
- Label manufacturer information, a named surgeon's technique and institutional practice as such.

## 5. Structure

- The first sentence defines the subject: "X is a [category] in which…". Scope and the most decision-relevant facts follow. Do not write "This page covers" or "This article discusses".
- Use only the sections the topic needs. Tables for comparisons, numbered lists for sequences, prose for reasoning. Do not convert reasoning into bullet fragments.

## 6. Invariants for a voice-only pass (hard constraints)

A voice pass changes how facts are said, never which facts are said.

1. Frontmatter, `import` lines, JSX components, image lines and captions, video blocks and the entire References section stay byte-identical.
1a. Tables keep the same rows, the same cells in each row, the same first-column labels, and every number, dose, drug or device name and citation marker in each cell. Within cells you may apply sections 2 and 3 (write out prose symbols and em-dash connectors, remove bold emphasis outside the first column). Telegraphic phrasing is acceptable in table cells; full sentences are not required there.
2. Heading text stays identical. Headings generate URL anchors that other pages link to.
3. Every number, unit, dose, rate, denominator, date and trial name stays. Every citation marker stays attached to the same claim, in the same order. Every link target stays.
4. Hedging and recommendation strength stay as written. "May" stays "may"; "recommend" stays "recommend". Do not strengthen or weaken a claim. Suspected overstatement goes in the report for the audit, not into the text.
5. Nothing useful is deleted: operative steps, pearls, specifications, warnings, historical context and whole sections all stay (content-preservation policy). A sentence may be removed only if the same fact is stated elsewhere in the same section; list every removal.
6. The result must be valid MDX: escape `<` and `>` in prose as `&lt;` and `&gt;`, keep `<sup>` citation markup intact, no `{#id}` heading anchors.

## 7. Examples

Before:
> 2. **Stricture assessment** — the urethral lumen is inspected; the length and severity of the stricture confirmed. The urethra is **not mobilized circumferentially** from the corpora cavernosa — a critical distinction from the dorsal onlay technique.

After:
> 2. **Stricture assessment.** The urethral lumen is inspected and the length and severity of the stricture are confirmed. Unlike in dorsal onlay, the urethra is not mobilized circumferentially from the corpora cavernosa.

Before:
> **Ventral onlay oral mucosal graft (OMG) urethroplasty** is a well-established substitution urethroplasty technique in which a free buccal (or lingual) mucosal graft is placed on the **ventral surface** of the opened urethra, supported by the underlying corpus spongiosum.

After:
> **Ventral onlay oral mucosal graft (OMG) urethroplasty** is a substitution urethroplasty in which a free buccal or lingual mucosal graft is placed on the ventral surface of the opened urethra and supported by the underlying corpus spongiosum.

Before:
> - **Urethrocutaneous fistula** — possible after urethroplasty; assess drainage, infection and distal obstruction. Persistent fistula may require repair; spontaneous closure should not be assumed.

Wrong (mechanical swap; still a fragment followed by commands):
> - **Urethrocutaneous fistula.** Possible after urethroplasty; assess drainage, infection and distal obstruction. Persistent fistula may require repair; spontaneous closure should not be assumed.

After:
> - **Urethrocutaneous fistula** can follow urethroplasty. Drainage, infection and distal obstruction should be assessed. A persistent fistula may require repair, and spontaneous closure should not be assumed.

Before:
> - **Augmentation cystoplasty** — hostile bladder refractory to medical therapy + botulinum. Typically ileum; ileocecal in selected cases.

After:
> - **Augmentation cystoplasty** is used for a hostile bladder refractory to medical therapy and botulinum toxin. Ileum is typical; an ileocecal segment is used in selected cases.

## 8. Report (voice pass)

After each page, report:

1. Each removed sentence, quoted, with where the same fact remains.
2. Each generic statement deleted or rewritten.
3. Suspected overstatements or evidence-wording problems for the audit, quoted, with the reason.
4. Anything uncertain.
