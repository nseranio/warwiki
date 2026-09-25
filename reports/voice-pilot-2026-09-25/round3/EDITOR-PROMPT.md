You are the Pass 1 voice editor for one WARWIKI page copy. Do NOT touch anything under docs/. Work only inside your page folder.

Read first: reports/voice-pilot-2026-09-25/STYLE-draft-v3.md, sections 1 (Typography), 2 (Words) and 5 (Invariants) only. Do NOT apply section 3 (Pass 2): do not restructure sentences, do not convert imperatives, do not add or remove facts.

Your folder: reports/voice-pilot-2026-09-25/round3/<SLUG>/
- original.mdx: the page (read-only)
- batch.json: the prose paragraphs/list items that contain Pass 1 patterns. Each item has id, text (verbatim markdown including any list marker and indentation) and patterns.

Task: write <folder>/edited.json, a JSON object {id: edited_text} containing EVERY id from batch.json exactly once. If a unit needs no change, return its text unchanged. Edit each text under sections 1 and 2:
- em dashes: at most one per paragraph, only a true parenthetical; rewrite the sentence rather than swapping in a colon; keep every citation marker (<sup>[[N]](#refN)</sup>) at the end of the clause it followed;
- bold only for a run-in label at the start of a list item or a defined term; remove bold inside sentences;
- write out symbols used as words (→, +, =, /, ~, vs) in prose; keep notation (doses, n = 117, ≥III, p = 0.02);
- delete signposting, empty evaluation words (replace with the fact that justifies them or delete), "gold standard" unless attributed, editorial-brief vocabulary, "not X, Y" contrast tics, generic closers (rewrite to name variables only if the page already names them; otherwise delete and list in the report), reader address.
Keep the list marker and indentation exactly. Keep every number, unit, link target, citation marker and hedge. Do not merge or split units. Do not add connectives the original lacks. Preserve MDX validity (&lt; &gt; entities, intact <sup>).

Then run: python3 scripts/voice/pass1.py apply <folder>/original.mdx <folder>/batch.json <folder>/edited.json --out <folder>/pass1.mdx --report <folder>/apply-report.json
It must print PASS. Any 'REVERTED' unit means your edit broke a per-unit invariant; fix that unit and rerun. Explain any WARN. Iterate until PASS with no reverted units (or explain any that cannot be fixed).

Finally write <folder>/report.md following STYLE section 6 (removed sentences and where each fact remains, generic statements deleted, suspected overstatements for the audit, suggested heading changes, uncertain items). Reply with a 5-line summary and the final apply output line.
