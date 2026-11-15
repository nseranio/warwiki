# Brief: draft a "Cost and Value" section for WARWIKI pages (Tier A rollout)

Repo (read-only for you): /Users/joyboy/Documents/WARWIKI/warwiki. Run scripts from there, e.g. `cd /Users/joyboy/Documents/WARWIKI/warwiki && python3 scripts/audit/pubmed.py pmid <PMID>`. WARWIKI is a specialist reference for reconstructive and functional urology and urogynecology; readers are surgeons.

## Hard rules
- **Do not edit any file in the repo.** Do not commit. Do not run `npm run build`. Write only your draft file, at the path named in your task (your working directory).
- Read first: `STYLE.md` sections 4, 10, 11, 12 (including "Facts only"), 14 and **15 (Cost and value)**. Then read these finished examples of the house pattern:
  - `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx` (section "## Cost and Value")
  - `docs/04-surgical-techniques/04a-urethral-reconstruction/minimally-invasive/dviu.mdx` (section "## Cost and Value")
  - `docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/prolapse-pessaries.mdx` (section "## Cost and Value")
- Read each target page in full: its comparison/outcomes sections, any existing cost sentences (grep -i cost), and its References (which papers it already cites, the last ref number, and the reference-line format the page uses; match that format).

## Finding sources
- PubMed: `python3 scripts/audit/pubmed.py search "<query>" --max 20` and `python3 scripts/audit/pubmed.py pmid <PMID...>` (prints reference line and abstract). If you get HTTP 429, wait a few seconds and retry; keep about 1 request per second.
- Prefer, in order: economic evaluations alongside randomized trials; independent decision models; systematic reviews of economic evaluations; large claims or cohort cost analyses. Skip editorials, narrative reviews, abstracts-only conference items and anything not in English.
- Aim for 3 to 7 studies per page group, chosen for decision relevance (the choices the page already discusses). Include US studies when they exist; the owner practices in the US.
- **Retraction check for every paper you cite:** `curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=<PMIDs>&retmode=xml"` and look for `Retracted Publication`, `RetractionIn`, `ExpressionOfConcernIn` and `ErratumIn`. Never cite a retracted paper. Report errata.
- **Before finishing, the reviewer of your draft runs `npm run refs:new` on the pages once the draft is applied** (unresolved DOI, retraction or expression of concern fails). Do your own checks as below anyway.
- **Resolve every DOI** on Crossref (`curl -s -o /dev/null -w "%{http_code}" https://api.crossref.org/works/<doi>`; 429 means retry).
- Industry ties: state them only when the PubMed record shows author affiliations with the maker or a funding statement naming it. Check affiliations in the efetch XML (`<Affiliation>`), and the COI statement.
- Every number, currency, price year, perspective, model type and horizon you write must appear in the abstract (or the open-access full text, which you may read on PMC). If an element is not reported, leave it out; never infer it. If the price year is not stated, write "published YYYY".

## Writing
- Follow STYLE.md §15 exactly: setting/payer, currency and price year, perspective, design and horizon in the sentence; ICERs as "$X per QALY gained with A versus B"; give the willingness-to-pay threshold with any probability of cost-effectiveness; "dominant" spelled out once as "lower cost and more QALYs".
- §14: open each paragraph with what the evidence shows (no broader than the evidence), one study per statement, group by comparison. §12: no commentary, no "cost is an important consideration", no rationale sentences, no closing summary.
- Use the same terms the page uses (e.g. "artificial urinary sphincter", "AUS").
- If the page already contains a cost sentence, fold it into the new section (give the old text so it can be moved) rather than duplicating it; keep its citation.
- Citations: `<sup>[[N]](#refN)</sup>` after the full stop. Reuse an existing reference number when the page already cites the paper; new references continue from the page's last number in order of first appearance.
- Plain prose, no em dashes, no bold, no lists inside the section.

## Draft file format (one file per page group: `<drafts folder>/<group>.md`)
1. **Target page(s)** and the exact heading the new section goes after (or before), and whether it is `##` or `###` per §15.
2. **Section text**, ready to paste.
3. **New reference lines**, in the page's format, numbered.
4. **Edits to existing text** (old → new, exact strings), if any: moved cost sentences, a pointer sentence with link on a sibling page, etc.
5. **Source table:** for every sentence with a number, the PMID and a short supporting quote (under 25 words) from the abstract.
6. **Notes:** retractions or errata found, studies considered and rejected (one line each), anything uncertain.

Your final message: the draft file path(s) plus a 5-line summary. Keep it short.


## Your task

Decision group: Erectile dysfunction treatment ladder: inflatable penile prosthesis versus intracavernosal injections, PDE5 inhibitors, vacuum devices; malleable versus inflatable implant; and any cost analyses of infection-retardant coatings or antibiotic protocols only if the page discusses them.

Pages: docs/04-surgical-techniques/04j-sexual-dysfunction/erectile-dysfunction.mdx (ED procedures page; it has existing cost text, fold it in). Sibling: docs/01-foundations/tools/biomaterials/prosthetics/inflatable-penile-prosthesis.mdx (pointer sentence plus headline only, if the home section supports it). Context only: docs/03-clinical-conditions/03g-genital-scrotal/erectile-dysfunction.mdx.

Candidate evidence (leads only; confirm each on PubMed and drop any that does not exist or does not fit): Cost-effectiveness models of IPP versus other ED treatments (e.g. Rezaee 2020 US cost model of IPP vs injections/PDE5), Medicare cost analyses, IPP after prostatectomy cost studies. Label manufacturer-funded models (Boston Scientific, Coloplast). Prefer trial-based and independent analyses; label manufacturer-funded models. If the published cost evidence for a page is thin (fewer than two relevant economic studies), say so in Notes and draft nothing for that page; no "no evidence" sentence goes on a page.

Write your draft to: /Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/cost-b2/ed/draft.md
(Use the draft file format above; one file covering all pages in your group.)
