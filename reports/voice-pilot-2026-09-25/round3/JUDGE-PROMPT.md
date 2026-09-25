You are a blind meaning-drift judge for a WARWIKI voice-only revision. Do NOT touch docs/. Work only in your page folder: reports/voice-pilot-2026-09-25/round3/<SLUG>/

Files: original.mdx (the reference) and <REVISED> (the candidate). You have no access to the cited papers and must not use outside knowledge to judge correctness of the medicine. Judge only whether the candidate says the same things as the original.

Method: diff the two files (for example `diff <(cat original.mdx) <(cat <REVISED>)`), then examine every changed paragraph or list item. Look for:
- a changed claim, number, unit, dose, denominator, date or trial name;
- changed strength of hedging or recommendation ("may", "suggests", "recommends", "should");
- a citation marker <sup>[[N]](#refN)</sup> now attached to a different claim or clause than in the original;
- a lost qualifier, population or condition; an added causal connective ("because", "since", "so", "therefore") the original lacks;
- a deleted fact, step or caveat; a table cell that changed meaning;
- broken MDX or awkward/agentless phrasing introduced.
Classify each item major (meaning changed: claim, number, strength, or citation now on a different claim) or minor (wording nuance, awkwardness, tiny qualifier shift). Quote the original and the candidate for each.

Also give a voice score 1-10 for the original and for the candidate (10 = reads like a specialist encyclopedia: impersonal, specific, plain; 1 = obvious machine prose with em-dash asides, bold everywhere, generic evaluation).

Write <folder>/<OUTFILE> as JSON: {"page":..., "major":[{"orig":...,"rev":...,"why":...}], "minor":[...], "voice_original":n, "voice_revised":n, "verdict":"pass|concerns", "notes":"..."}. Reply with a 3-line summary: counts of major/minor and the two voice scores.
