# Core clinic evidence foundation — September 11, 2026

## Implemented scope

Seven existing canonical pages now open with assessment, options, reasons to reconsider the uncomplicated pathway, follow-up, citations and a jump to selected evidence. No parallel clinical articles or Epic templates were created. This is a targeted source/claim update, **not a complete clinical review or clinician signoff**. Existing detail and procedure links are retained except where a misleading summary, unsupported universal rule or duplicate prescribing list was replaced.

| Pathway | Canonical file | Structured primary studies |
|---|---|---|
| Female UI (SUI entry with OAB routing) | `docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx` | ValUE; TOMUS |
| POP | `docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx` | OPUS; SAVE-U 10-year; SUPeR 10-year |
| Male UI | `docs/03-clinical-conditions/03a-storage-incontinence/sui-male.mdx` | MASTER |
| BPH/male LUTS | `docs/03-clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction.mdx` | MTOPS; UPSTREAM |
| Male stricture | `docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx` | OPEN; ROBUST III |
| ED | `docs/03-clinical-conditions/03g-genital-scrotal/erectile-dysfunction.mdx` | Sildenafil pivotal trials; REACTT |
| Female rUTI | `docs/05-special-populations/05e-womens-health/recurrent-uti.mdx` | ALTAR; MERIT |

## Data and rendering

`src/data/evidence-registry.json` holds 14 records with stable identity, source DOI/URL, design, population, randomized/analysis denominators, comparator, endpoint definition, time point, numerical result, uncertainty, follow-up, limitations, clinical applicability, access scope and correction/retraction status. `src/data/evidence.ts` provides types and fails explicitly for an unknown pathway/missing record. The reusable `src/components/EvidenceTable.tsx` renders static accessible tables with native expandable source details and component-local CSS. Tables distinguish endpoint definitions and discourage cross-trial rankings. The known sildenafil correction is visible beside the result as well as in the audit details.

Access is labelled **published abstract** or **selected full-text methods/results**, according to the material inspected; availability of a full-text link does not imply the entire paper or supplement was reviewed. Unextracted confidence intervals and original denominators are explicitly identified rather than invented. The native SAVE-U 10-year abstract provides 44/49 observed outcomes; its original randomized denominator was not independently extracted in this pass.

## Material clinical consistency corrections

- **Female UI:** corrected the cough-stress instruction that said to void to a full bladder; clarified selective urodynamics and that ValUE's PVR eligibility does not create a universal safety threshold. Replaced a generic sling/PFMT success table and universal surgical-equivalence claims with endpoint-specific TOMUS results. Removed blanket fluid restriction and universal added-biofeedback benefit. Corrected Wu 2021's wrong PubMed identifier to [PMID34161707](https://pubmed.ncbi.nlm.nih.gov/34161707/).
- **POP:** added the newly published [SAVE-U 10-year report](https://doi.org/10.1007/s00192-026-06822-1), online August13 2026: small retained sample, nonsignificant primary difference with wide interval; native tissue clearly separate from mesh-assisted SUPeR. OPUS prevention benefit is paired with added harms. Qualified occult-SUI testing, smoking's observational inverse association and the claim that levator injury is modifiable.
- **Male UI:** aligned AUA2024 timing (may offer from6months when not improving; should offer at1year despite conservative care), selective urodynamics and preoperative cystoscopy. Removed bulking as a routine mild-SUI choice, a mandatory escalation ladder and exclusion of mild disease from AUS discussion. MASTER distinguishes strict residual leakage from symptom improvement and satisfaction. Duloxetine's off-label role is separated from bladder drugs; dosing stays in its hub.
- **BPH:** added current AUA2026/EAU framework, anatomy/functional diagnostic distinction, progression endpoint context and UPSTREAM's limited applicability; tadalafil dosing routed to the prescribing hub.
- **Stricture:** replaced depth-only selection, universal near100%/0% endoscopic outcomes, EPA/DVIU equivalence and a cross-series success ranking. Preserved OPEN's durability finding while identifying its negative primary symptom comparison and ROBUST III's lack of a urethroplasty comparator. Qualified age/etiology assumptions and transection indications.
- **ED:** corrected unsupported AUA 'subsequent amendments' language; updated Princeton III framing to current EAU/Princeton IV; removed automatic cardiology referral and rigid three-tier escalation. Removed duplicate drug doses, distinguished attempt-level sildenafil efficacy from patient cure, and aligned post-RP rehabilitation with REACTT's negative unassisted recovery endpoint.
- **rUTI:** removed retained ciprofloxacin postcoital dosing, duplicate acute/prevention dose lists, universal negative test-of-cure requirement, multi-year prophylaxis safety/resistance guarantees and a mandatory non-antibiotic-first ladder. Corrected the misleading cystoscopy NPV claim, qualified probiotics (AUA2025 cannot recommend), and removed postcoital voiding as proven prevention. Prior methenamine/vitamin-C and TAPER updates retained.

## Source verification

All14 DOI identities were verified against primary publisher/PubMed records and then independently checked through the Europe PMC core metadata endpoint on September11. Exact identities, publication dates, linked notices and query URLs are saved in `core-evidence-source-check.json`. The scripted check is read-only: it does not rewrite clinical evidence or publish content.

- **Known correction:** [Goldstein1998 sildenafil](https://pubmed.ncbi.nlm.nih.gov/9580646/) has an erratum, NEJM1998;339:59. The corrected indexed abstract was inspected; the complete correction notice was not independently retrieved. This limitation is displayed.
- **Other13:** no linked correction/retraction notice was found in the checked Europe PMC records. This is a metadata-screen result, not an exhaustive publisher/Crossmark clearance.
- **False novelty avoided:** SUPeR was first online June24 although its issue date is August1. SAVE-U is a genuine August13 online publication.
- Core decision guidance checked: [AUA female SUI2023](https://www.auanet.org/documents/Guidelines/PDF/2023%20Guidelines/SUI%20Unabridged%20FINAL%20080223.pdf), [AUA male IPT2024](https://www.auanet.org/documents/Guidelines/PDF/2024%20Guidelines/IPT%20Unabridged%20Final%206-18-24.pdf), [NICE NG123](https://www.nice.org.uk/guidance/ng123/chapter/recommendations), [AUA BPH2026 PartsI–III](https://doi.org/10.1097/JU.0000000000005097), [EAU male LUTS](https://uroweb.org/guidelines/management-of-non-neurogenic-male-luts), [AUA stricture2023](https://doi.org/10.1097/JU.0000000000003482), [EAU stricture2026](https://uroweb.org/guidelines/urethral-strictures), [EAU ED2026](https://uroweb.org/guidelines/sexual-and-reproductive-health/chapter/management-of-erectile-dysfunction), [AUA rUTI2025](https://www.auanet.org/documents/Guidelines/PDF/2025%20Guidelines/rUTI%20Update/rUTI%202025%20Unabridged%20Final.pdf). The BPH source check establishes the current edition and framework; detailed procedure eligibility should be read in the current guideline/atlas, not inferred from the trial registry.

## Validation and maintenance

- `node scripts/check-evidence.js` — passes: all14 records, all7 canonical bindings, dates, DOI/URL formats, explicit uncertainty/limitations, correction status and no orphans.
- `node --test scripts/tests/check-evidence.test.js scripts/tests/check-evidence-sources.test.js` — 8 tests pass. Tests reject unknown/duplicate references, invalid/future dates, missing uncertainty, unsafe URLs, escaped canonical paths, DOI mismatch, new correction metadata and retractions. Ordinary editorials are not misclassified as corrections.
- `npx vitest run src/components/EvidenceTable.test.tsx` — 9 tests pass, including all7 pathways, source links/denominators/uncertainty, known correction display and unknown-pathway failure.
- Citation/internal-link checks now pass across 1,187 MDX files after integration, including the independently repaired urinary-acidifiers references. Final global build belongs to root after all agents finish.
- Typecheck now passes after the figure agent/package owner resolved the concurrent ClinicalFigure declaration issue.
- Package owner added `lint:evidence`. Optional live metadata check: `node scripts/check-evidence-sources.js`; save its output for editorial review. It exits nonzero on lookup failure, DOI mismatch, new linked correction or retraction/concern. It never silently converts an unavailable source to a clean check.

## Limits and next clinical review

These14 studies are a selected evidence foundation, not comprehensive procedure league tables or a systematic review. Full clinical signoff, patient-specific decisions, detailed technique/drug-hub re-review and complete external-bibliography identity checks remain human editorial work. Metadata scans cannot detect every publisher correction or assess its clinical impact. Broader legacy epidemiology, pooled percentages and specialty subgroups have not all been re-derived. The site accurately records targeted source-update dates and does not claim completion of those reviews.

Additional screened lead: [IUGA OASIS guideline](https://pubmed.ncbi.nlm.nih.gov/42429937/), DOI10.1007/s00192-026-06642-3, journal publication July10 2026; an IUGA-hosted prepublication PDF already existed in2025. Relevant to obstetric anal-sphincter repair, outside these7 pathways. The follow-up integrated its primary/delayed repair distinctions into the sphincteroplasty and obstetric injury pages, with narrow evidence notes. This records the July journal guideline; it does not assert that every recommendation first appeared after June.
