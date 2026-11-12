# Task: verify proposed "point first" rewrites (do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki (or /Users/joyboy/Documents/WHITWIKI/whitwiki for its pages). Read STYLE.md sections 3, 4, 5, 12 and 14. Your working directory is a scratch folder; the ONLY file you may create is OUTPUT.

INPUT lists files of proposed edits. Each rewrites one section of a page so it reads as a coherent account: paragraphs open with their point, each study is stated once, paragraphs are grouped by question. The owner wants this; readability changes are the point, so do not reject for style. You are the safety check: a rewrite must not change what the page says.

For each edit, compare `old` (still on the page) with `new`, sentence by sentence, and check:

1. Lost facts: any number, unit, n/N, CI, p value, ratio, follow-up, population, design word, qualifier, condition, exception, named trial or author, link or citation marker in `old` that is missing from `new` (exact duplicates may be merged).
2. Changed meaning: any statement in `new` that is broader, narrower, stronger, weaker or new compared with `old`. Watch especially:
   - a point sentence that generalizes one study ("about a third of cancers arise in the sac" from one series; a hospitalized cohort stated as everyone);
   - hedges strengthened ("has been proposed as a mechanism" → "is the mechanism"; "appears to be" → "is"; "may" or "can" dropped);
   - a rule that lost its condition or exception, or a list whose items were reattributed ("these complications" now covering items it did not cover);
   - a subgroup described as a share of a different group (79 diverticulectomy patients written as "those 79" of 104 operated patients);
   - a new causal connective or mechanism ("because", "so", "which raises", "leading to");
   - tense or scope changes that turn a study statement into a universal one ("no protocol was established" → "no protocol exists").
3. Citations: for every sentence whose markers differ from `old` (moved, newly attached, split across sentences) and for every new point sentence, open the cited source (PubMed abstract or open full text via the DOI or PMID in the page's reference list) and say whether it supports the sentence as worded. If you cannot open it, judge from the old text's binding: a marker may only move with the clause it supported.
4. Mechanics: `old` occurs exactly once on the page; `new` keeps `<sup>` markup and MDX escapes, keeps paragraph breaks, touches no table, figure, heading, component or reference line, and leaves no dangling "This"/"These".

Verdict per edit:
- `agree` when checks 1-4 find nothing.
- `modify` when a minimal fix to `new` repairs every problem while keeping the restructure; give the full corrected edit.
- `reject` when the rewrite cannot be repaired without starting over, or when the old text already read well and the rewrite adds risk without benefit.
- Also `reject` (or `modify` to fix) a rewrite that reads worse than the old text: study sentences inverted into result-first passive form ("X was used in Y's series", "Primary closure followed … in a series cited by …"), more than one colon-joined point per paragraph, a bare bold list label left without its description, a pointer word left dangling ("a separate meta-analysis" with nothing adjacent), or bold run-in labels removed. The owner wants pages that read like a well-edited textbook; a rewrite that is only different is not an improvement.

Output JSON Lines at OUTPUT: {"page": ..., "finding": "<first 120 characters of the finding>", "severity": "medium", "verdict": ..., "edit": {"old": ..., "new": ...} (always present: copy the proposed edit unchanged for `agree`, give the corrected edit for `modify`, null only for `reject`), "reason": "<one or two sentences naming each problem found and the source checked>", "claim_id": "<copied from the finding>"}. Finish by printing counts per verdict.
