# WARWIKI house style (draft for pilot)

WARWIKI is a specialist clinical reference for functional, reconstructive and prosthetic urology and urogynecology. Readers are urologists, urogynecologists, fellows and residents who know standard anatomy, terminology and common procedures. Write as a subspecialty encyclopedia: impersonal, declarative, specific. The aim is not to sound authoritative. The aim is to make supported information easy to find and hard to misread.

## 1. Sentences

- Each sentence states a definition, fact, number, indication, contraindication, decision point, operative step, outcome, complication, recommendation or limitation. Delete sentences that only introduce, emphasize, transition or restate.
- In prose, write complete declarative sentences. Fragments belong in tables and lists only.
- Name the subject. Do not open a sentence with "This" standing for the whole previous sentence ("This is why…", "This means…", "This makes…").
- Do not address the reader (you, your, we, our, let's) and do not ask rhetorical questions. Quoted guideline or patient-counseling text stays verbatim.
- Prefer local precision over global elegance. Keep a qualifier next to the claim it qualifies. Repeat a technical noun rather than use an ambiguous pronoun. A paragraph ends when its facts end; do not add a summarizing last sentence.

## 2. Punctuation and typography

These are the most frequent machine-writing signatures on the current site.

- **Em dash.** At most one per paragraph, and only for a true parenthetical. It is not a default connector. Never use it to append a punchline ("— a critical distinction from…", "— not X"). Use a period, colon, semicolon, comma or parentheses instead.
- **Bold.** Bold the article subject in the first sentence and a defined term at the point of definition. In numbered operative steps and definition-style lists, a short run-in label may be bold, followed by a period or colon (not an em dash). No bold for emphasis inside a sentence.
- **Arrows (→).** Only in tables, algorithms and compact sequence notation. In prose, state the relation ("progresses to", "is followed by", "is converted to").
- No ALL-CAPS emphasis, exclamation marks or scare quotes.

## 3. Words

Delete or replace:

- **Signposting and metadiscourse:** importantly, notably, interestingly, of note, it is worth noting, it should be emphasized, this highlights, this underscores, taken together, overall, ultimately, in summary, in conclusion.
- **Empty evaluation:** crucial, critical, essential, key, vital, paramount, pivotal, robust, promising, excellent, powerful, innovative, remarkable, well-established. Replace the adjective with the fact that justifies it, or delete it. Fixed clinical terms keep their words (critical limb ischemia, key-hole, essential hypertension).
- **"Gold standard":** keep only when the cited source uses the term, and attribute it. Otherwise name the comparison ("the most studied option", "the reference technique in the 2023 AUA guideline").
- **Editorial-brief vocabulary:** "framed for the reconstructive surgeon", "sits between", "anchored on/by", "the lens", "the playbook", "workhorse" (unless a source uses it), "home run", "the takeaway".
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

1. Frontmatter, `import` lines, JSX components, image lines and captions, video blocks, tables and the entire References section stay byte-identical.
2. Heading text stays identical. Headings generate URL anchors that other pages link to.
3. Every number, unit, dose, rate, denominator, date and trial name stays. Every citation marker stays attached to the same claim, in the same order. Every link target stays.
4. Hedging and recommendation strength stay as written. "May" stays "may"; "recommend" stays "recommend". Do not strengthen or weaken a claim. Suspected overstatement goes in the report for the audit, not into the text.
5. Nothing useful is deleted: operative steps, pearls, specifications, warnings, historical context and whole sections all stay (content-preservation policy). A sentence may be removed only if the same fact is stated elsewhere in the same section; list every removal.
6. The result must be valid MDX: escape `<` and `>` in prose as `&lt;` and `&gt;`, keep `<sup>` citation markup intact, no `{#id}` heading anchors.

## 7. Examples (from a page outside the pilot)

Before:
> 2. **Stricture assessment** — the urethral lumen is inspected; the length and severity of the stricture confirmed. The urethra is **not mobilized circumferentially** from the corpora cavernosa — a critical distinction from the dorsal onlay technique.

After:
> 2. **Stricture assessment.** The urethral lumen is inspected and the length and severity of the stricture are confirmed. Unlike in dorsal onlay, the urethra is not mobilized circumferentially from the corpora cavernosa.

Before:
> **Ventral onlay oral mucosal graft (OMG) urethroplasty** is a well-established substitution urethroplasty technique in which a free buccal (or lingual) mucosal graft is placed on the **ventral surface** of the opened urethra, supported by the underlying corpus spongiosum.

After:
> **Ventral onlay oral mucosal graft (OMG) urethroplasty** is a substitution urethroplasty in which a free buccal or lingual mucosal graft is placed on the ventral surface of the opened urethra and supported by the underlying corpus spongiosum.

## 8. Report (voice pass)

After each page, report:

1. Each removed sentence, quoted, with where the same fact remains.
2. Each generic statement deleted or rewritten.
3. Suspected overstatements or evidence-wording problems for the audit, quoted, with the reason.
4. Anything uncertain.
