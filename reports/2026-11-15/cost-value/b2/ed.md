# Erectile dysfunction treatment ladder: Cost and Value draft

## 1. Target pages and placement

- `docs/04-surgical-techniques/04j-sexual-dysfunction/erectile-dysfunction.mdx`: add `## Cost and Value` after `### Prosthesis Infection Salvage — Length-Preservation Hierarchy` and its concluding paragraph, immediately before the divider and `## Treatment Database`. The studies span the treatment ladder and implant selection, so the heading is `##`.
- `docs/01-foundations/tools/biomaterials/prosthetics/inflatable-penile-prosthesis.mdx`: add `## Cost and Value` after `### Reading Mechanical-Failure Reports` and before `## Special Clinical Settings`. This is a headline and a pointer to the procedures page.
- `docs/03-clinical-conditions/03g-genital-scrotal/erectile-dysfunction.mdx`: context only; no edit.

## 2. Section text, ready to paste

### Procedures page

## Cost and Value

After first-line PDE5 inhibitor failure, IPP had the lowest modeled cost per QALY among repeat PDE5 inhibitor therapy, intracavernosal injection and IPP in a US health care provider-perspective, 10-year Markov decision model (published 2019): cumulative cost and QALYs were $22,009 and 7.82 with IPP, $52,883 and 7.73 with another PDE5 inhibitor, $62,890 and 8.51 with alprostadil injection, and $48,617 and 8.47 with trimix injection.<sup>[[31]](#ref31)</sup>

Sildenafil had lower cost and more QALYs than a penile prosthesis, MUSE or alprostadil injection in a Canadian government-payer cost-utility analysis of men with spinal cord injury (59 participants, one-year horizon, published 2005); the ICERs were CAN$9,656 per QALY gained with sildenafil versus trimix injection and CAN$13,399 per QALY gained with sildenafil versus a vacuum erection device.<sup>[[32]](#ref32)</sup>

Malleable implantation cost less than inflatable implantation in a US cost-benefit analysis (published 1991): inclusive implantation costs were $3,150 and $9,000, respectively, while a pharmacologic erection program at maximum dose and use frequency cost $3,450 over five years.<sup>[[33]](#ref33)</sup>

### Inflatable penile prosthesis page

## Cost and Value

After first-line PDE5 inhibitor failure, a US health care provider-perspective, 10-year Markov decision model (published 2019) found a lower modeled cumulative cost with IPP than with repeat PDE5 inhibitor therapy or intracavernosal injection, while both injection strategies yielded more QALYs.<sup>[[53]](#ref53)</sup> The full comparison is in [Erectile Dysfunction (Procedures)](/docs/surgical-techniques/04j-sexual-dysfunction/erectile-dysfunction#cost-and-value).

## 3. New reference lines

### Procedures page (last existing reference: 30)

<a id="ref31"></a>31. Moses RA, Anderson RE, Kim J, et al. "Erectile dysfunction management after failed phosphodiesterase-5-inhibitor trial: a cost-effectiveness analysis." *Transl Androl Urol.* 2019;8(4):387-394. doi:[10.21037/tau.2019.03.10](https://doi.org/10.21037/tau.2019.03.10)

<a id="ref32"></a>32. Mittmann N, Craven BC, Gordon M, et al. "Erectile dysfunction in spinal cord injury: a cost-utility analysis." *J Rehabil Med.* 2005;37(6):358-364. doi:[10.1080/16501970510038365](https://doi.org/10.1080/16501970510038365)

<a id="ref33"></a>33. Buch JP, Zorn BH, Taylor RJ. "Cost-benefit analysis of pharmacologic erection program (PEP) versus penile prosthesis." *Urology.* 1991;37(2):116-118. doi:[10.1016/0090-4295(91)80204-k](https://doi.org/10.1016/0090-4295(91)80204-k)

### Inflatable penile prosthesis page (last existing reference: 52)

<a id="ref53"></a>53. Moses RA, Anderson RE, Kim J, et al. "Erectile dysfunction management after failed phosphodiesterase-5-inhibitor trial: a cost-effectiveness analysis." *Transl Androl Urol.* 2019;8(4):387-394. doi:[10.21037/tau.2019.03.10](https://doi.org/10.21037/tau.2019.03.10)

## 4. Edits to existing text (exact strings)

Procedures page, move the unsupported broad ranking from the implant comparison table into the new section as the sourced, dated malleable-versus-inflatable comparison above:

`| **Cost** | Highest | Intermediate | Lowest |` → delete the row. No economic comparison for the two-piece implant was found.

Procedures page, keep cost language in the new section only:

`malleable (limited dexterity, neophallus, salvage, cost-constrained)` → `malleable (limited dexterity, neophallus, salvage)`

`Limited dexterity; neophallus; cost constraints; salvage after infection` → `Limited dexterity; neophallus; salvage after infection`

## 5. Source table

| Sentence | PMID | Abstract support (each excerpt under 25 words) |
|---|---:|---|
| Procedures: IPP versus repeat PDE5 inhibitor and injections | 31555563 | “IPP placement was the most cost-effective management option per preserved QALY (QALY =7.82, cost =$22,009/10 years)” |
| Procedures: other modeled cost/QALY pairs in the same sentence | 31555563 | “ICI alprostadil (QALY =8.51, cost =$62,890/10 years), ICI trimix (QALY =8.47, cost =$48,617/10 years)” |
| Procedures: alternate PDE5 inhibitor pair in the same sentence | 31555563 | “alternate PDE5-I (QALY =7.73, $52,883/10 years).” |
| Procedures: sildenafil versus prosthesis, MUSE, alprostadil, trimix and vacuum device | 16287667 | “sildenafil was the dominant economic strategy when compared with surgically implanted prosthetic devices, MUSE(R) and Caverject.” |
| Procedures: sildenafil ICERs in the same sentence | 16287667 | “incremental cost-utility ratios comparing sildenafil with triple mix and vacuum erection devices favoured sildenafil, with ratios less than CAN$20,000” |
| Procedures: malleable versus inflatable and injection program | 1899496 | “inclusive cost of implantation for the inflatable penile prosthesis (IPP) is $9,000 and for the malleable penile prosthesis (MPP) $3,150.” |
| Procedures: injection-program cost in the same sentence | 1899496 | “The inclusive cost of PEP at maximal dose and maximal frequency of use over a five-year period is $3,450.” |
| Sibling: IPP versus repeat PDE5 inhibitor and injections | 31555563 | “IPP placement was the most cost-effective management option per preserved QALY” |

## 6. Notes

- Retraction/erratum check: the required `efetch.fcgi` request for PMIDs 31555563, 16287667 and 1899496 failed because `eutils.ncbi.nlm.nih.gov` did not resolve in this environment. Accessible PubMed records and targeted searches showed no retraction, expression of concern or erratum for these three, but this does **not** replace the XML check. PMID 1899496 has a later *comment* (PMID 1901680), not an erratum. Rerun the mandated XML check before applying.
- DOI check: the required Crossref requests for all three unique DOIs returned curl code `000` because `api.crossref.org` did not resolve. Each DOI matched its PubMed record and publisher page. Rerun Crossref resolution and `npm run refs:new` after application.
- Industry: Moses used published manufacturer cost data; the full text discloses Boston Scientific fellowship grants or consultancy for three authors. The PubMed affiliations identify academic or VA institutions and no manufacturer funding statement was found there, so the page text does not label the model manufacturer-funded. The Mittmann full text lists one historical Pfizer-affiliated coauthor, but the accessible PubMed affiliation lists an academic institution and no manufacturer funding statement, so the page text likewise does not assign an industry label under the brief's rule.
- Moses's model estimates more QALYs for alprostadil and trimix injection than for IPP despite its lower cost per QALY. It did not model vacuum devices or malleable implants. The published cost year is not stated.
- Mittmann's exact ICERs (CAN$9,656 and CAN$13,399 per QALY) and one-year horizon appear in the journal's open-access full text, Table IV and Methods; the abstract reports only that both ratios were below CAN$20,000 per QALY.
- Direct malleable-versus-inflatable economic evidence located was one dated single-center analysis (Buch 1991). No comparative economic study for two-piece versus three-piece IPP or an infection-retardant coating/antibiotic protocol fit this page's decision comparisons.
- Considered and rejected: Rezaee et al., PMID 31326359, systematic review of economic evaluations, useful for the evidence gap but no new comparative estimate for these decisions.
- Considered and rejected: Tan, PMID 10747767, modeled aggregate costs for a hypothetical managed-care plan; treatment totals reflect modeled uptake rather than per-patient comparisons.
- Considered and rejected: Sun et al., PMID 16217364, large US claims analysis with a Lilly-affiliated author; spending shares and annual use costs do not estimate comparative value for the treatment decision.
- Considered and rejected: Berger et al., PMID 31405770, all-payer claims analysis of ambulatory versus inpatient implant setting; a care-setting comparison outside this decision group.
- Considered and rejected: PMID 38926632, Medicare out-of-pocket model; patient cost sharing and coverage are excluded by STYLE.md §15.
- Considered and rejected: Kohn et al., PMID 34034995, systematic review of global implantation and cost trends; no direct treatment-choice estimate in the abstract.
- Considered and rejected: the Spanish outpatient implantation cost-consequence model, DOI 10.1080/20479700.2022.2163336, addresses care setting rather than the requested treatment or implant choices.
