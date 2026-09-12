# CRYOSTAT-2 source review

Reviewed 2026-09-12. Independent source review for the vascular damage-control revision; no MDX changes. This is a complete read of the current main article and the three accessible registry documents, **not a claim that every journal supplement was obtained**.

## Identity and actual access

Davenport R, Curry N, Fox EE, et al. *Early and Empirical High-Dose Cryoprecipitate for Hemorrhage After Traumatic Injury: The CRYOSTAT-2 Randomized Clinical Trial*. JAMA. 2023;330:1882–1891. DOI [10.1001/jama.2023.21019](https://jamanetwork.com/journals/jama/fullarticle/2810756); PMID 37824155; [PMC10570921](https://pmc.ncbi.nlm.nih.gov/articles/PMC10570921/); ISRCTN14998314; NCT04704869. The current article states that Figures 1 and 2 were corrected on October 20, 2023. The current publisher graphics, rather than a pre-correction downloaded manuscript, were inspected.

| Source | Actual read scope |
| --- | --- |
| Current publisher main article, independently supported by the PMC HTML | Entire main text, key points, abstract, Methods, Results, Discussion, limitations and conclusion; both tables and all footnotes; all 31 bibliography entries; correction, authorship, conflicts, funding and acknowledgments. All three actual figures, visual abstract and actual Table 2 graphic inspected. Table 1 was read in full text, including its footnotes. No current main PDF obtained. The 31 underlying cited papers were not individually reviewed. |
| [Registry final 28-day SAP](https://www.isrctn.com/editorial/retrieveFile/541d68ba-c6bc-4d7f-a9f4-c701ec6e6439/33541), v2.0, May 20, 2022 | All 40 pages / 2,171 extracted lines, including all 41 table shells and footnotes, planned figures, revision history and reference. Actual CONSORT placeholder diagram on page 4 inspected. |
| [Registry final protocol](https://www.isrctn.com/editorial/retrieveFile/7f70456d-f326-4c93-901a-d35b8113c6ff/33541), v4.0, February 15, 2022 | All 59 pages / 2,799 extracted lines, including all 36 bibliography entries, version history and appendix. All actual graphic sets inspected: study schema p9, two pilot-study panels p17, consent flow p59. Additional actual table/definition pages 33, 38, 41, 42 and 55 inspected; not every text-only page was rendered. |
| [Registry basic results](https://www.isrctn.com/editorial/retrieveFile/71ddaf58-718f-4ed9-8e83-0c9898420e03/33541) | All eight pages / 350 extracted lines, flow chart, five populated tables and footnotes. Actual page-1 flow graphic inspected separately. This is the same trial, not independent replication. |
| [ISRCTN public metadata API](https://www.isrctn.com/api/query/format/default?q=ISRCTN14998314) | Relevant attachment provenance/versions inspected; metadata version 83, last updated May 7, 2025. All three registry downloads passed PDF identification and page extraction. |

The registry documents total **107 fully read pages**. They are not asserted to be byte-identical to the publisher's supplemental files. In particular, the final 40-page SAP does not establish a full read of the journal's multiversion SAP bundle or its separate long-term plan.

## Material interpretation

- **Population and intervention:** 1,604 severely injured patients were randomized at 25 UK trauma centres and one US centre (799 additional cryoprecipitate, 805 standard care). Eligibility required major-haemorrhage activation and blood transfusion; transfers and presentation more than three hours after injury were excluded. The tested intervention was three additional cryoprecipitate pools, approximately 15 donations/6 g fibrinogen, added to ordinary balanced major-haemorrhage care. Standard care already incorporated later cryoprecipitate. This was neither fibrinogen versus none nor targeted replacement for a demonstrated low fibrinogen concentration, and it did not study elective GU operative bleeding.
- **Primary denominator:** 73 patients lacked the primary endpoint, leaving 1,531: 760 intervention and 771 standard care. Death at 28 days was 192/760 (25.3%) versus 201/771 (26.1%); centre-adjusted OR 0.96 (95% CI 0.75–1.23), P=.74. The authors' intention-to-treat terminology is an available-outcome analysis, consistent with the final SAP. Do not imply all 1,604 outcomes were observed, superiority was shown, or equivalence was established.
- **Timing and receipt:** The Methods, protocol and SAP use a target of starting within 90 minutes of hospital admission and within three hours of injury. Median first cryoprecipitate was 68 versus 120 minutes among recipients. Registry Table 3 reports any cryoprecipitate in 665/785 versus 256/795, and first administration within 90 minutes in 521/769 versus 70/747. The flow figure's 434/799 meeting the allocated intervention includes dose and other timing requirements; it is not the denominator for the 68% timing-only result.
- **Penetrating-injury signal:** The prespecified subgroup had 45/277 versus 27/271 deaths, OR 1.74 (1.20–2.51); the actual figure gives interaction P=.004. The primary trial was neutral, subgroup comparisons were not multiplicity-adjusted, and this signal should not become a definitive contraindication. The blunt subgroup was also not a proven beneficiary.
- **Timing comparisons are not randomized comparisons:** Selected intervention receipt-time groups were compared with the entire control group. Earlier recipients were more severely injured. The apparent 61–90-minute subgroup advantage does not establish an optimum waiting period or justify delaying haemostatic treatment.
- **Per-protocol and adjusted analyses:** The reported per-protocol analysis excludes early deaths, those needing no further blood and specified deviations; it is not simply the 434 strictly adherent recipients. Its available primary denominators were 706 versus 683 and it remained neutral. The risk-adjusted model also did not demonstrate benefit. Missing covariates, rather than all missing primary outcomes, were imputed.
- **Safety denominator:** The published 12.7% versus 12.9% thrombotic figures are cumulative-incidence estimates with death as a competing risk, not raw patient event proportions. Registry safety tables record VTE in 55/799 versus 57/805 and arterial events in 26/799 versus 26/805; event totals exceed patient totals. Serious transfusion-related events were three versus zero, without a statistically conclusive difference. Protocol serious-event collection was selective and VTE assessment symptom-triggered, so this does not establish comprehensive absence of harm.
- **Transfusion conclusion:** There was no demonstrated reduction in RBC/FFP/platelet requirements. Cryoprecipitate exposure differed by design; one should not write that all product or fluid volumes were identical.

The final SAP is dated after recruitment ended. Its history records revisions to per-protocol, receipt and descriptive analyses. It is therefore inaccurate to describe every final analysis as fixed before the first participant; the accessible documents alone do not establish inappropriate selective reporting.

## Source inconsistencies that should not be copied

1. The abstract describes the 90-minute goal relative to randomization; the Methods, actual flow graphic, protocol and SAP specify hospital admission. Use admission when describing the operational trial target.
2. The current main Table 2 graphic and HTML repeat the severe-disability row. Registry basic-results Table 4 repeats it too. Counting it once restores the five-category Glasgow Outcome Scale totals of 705 and 712. Do not treat the duplicate as another outcome category.
3. Results describe median time to haemorrhagic death (191 versus 86 minutes), whereas Discussion switches to a mean-life-prolongation description. This deceased-patient subgroup is not evidence that treatment causally prolonged survival by a fixed number of minutes.
4. Methods describe massive transfusion as at least 10 RBC units, whereas Results use greater than 10. This was post hoc and should not be quoted as a settled threshold without further clarification.
5. The protocol retains minor internal background/version defects: an inconsistent deaths-per-time calculation, a 1.55 g/L fibrinogen value described as normal despite the surrounding low-fibrinogen discussion, an isolated fibrinogen-concentrate term in the cryoprecipitate dose rationale, and obsolete recruitment targets alongside the later 1,600 target. None changes the actual randomized intervention or the main neutral outcome.
6. Main reference 13 is the FEISTY protocol; reference 31 is NEJM correspondence rather than the main PAMPer trial report. Neither should be reused as though it were the corresponding complete randomized-results paper.

## Explicit remaining access limits

The journal lists five supplements: protocol, statistical plans, eFigures/eTables, investigators and data-sharing statement. **None of those five exact journal attachments was successfully obtained.** Ordinary PMC attachment retrieval returned an HTML download challenge; Europe PMC reported that supplemental-file service was unavailable because this article is not open access; the publisher parser collapsed the supplement links to a common anchor. An ordinary background browser download attempt also failed. The apparent small local `s1.pdf`–`s5.pdf` files are HTML failures, not read PDFs. Registry equivalents above reduce the protocol/SAP gap but do not remove the journal eTable/eFigure, long-term-plan, investigator-list or data-statement gap.

The NIHR 2024 full trial report and an older ClinicalTrials.gov US protocol/SAP were discovered but not read for this task. No claim of full evidence-family certification or independent verification of every referenced trial is made. This report supports a narrowly scoped neutral CRYOSTAT-2 paragraph without using unverified supplemental subgroup details.

## Source cache fingerprints

Local caches are temporary working evidence, not repository-hosted copies of publisher material. SHA-256 values below identify the exact retrieved/extracted versions.

| Local basename (`/tmp/`) | Bytes | SHA-256 |
| --- | ---: | --- |
| `workflow-cryostat-pmc.html` | 212239 | `0188e21735c056bb69efabd31ad603edadb00b07c236d90710011c51056be420` |
| `workflow-cryostat-main.txt` | 61851 | `d1c08eee1a0cc53a65915e545ed0efbb7dbf7449201e5507411538a64fb4ab2d` |
| `workflow-cryostat-va.png` | 361987 | `5261b1b1852e6415884321e0898a17fa90a6b0f4ee1798ac8777c9eb3da7d722` |
| `workflow-cryostat-f1.png` | 176396 | `10fb2d44010be4e6b5e8a036a5ad3a192da52b034ef763bf33f6bf9b085dc1c3` |
| `workflow-cryostat-f2.png` | 82695 | `e4b2121a9aa549ec79e81bf5cc8ff1eded5eb20d7f1a7e53e0656c08a0ee7179` |
| `workflow-cryostat-f3.png` | 129684 | `ef3a4d1a2fb0f94f24239211a0c2aab2a88bd3ed3e232008f008ffe7e5e2c8b5` |
| `workflow-cryostat-t2.png` | 451340 | `736070df45b79656b84bad80608d1b02174a2cf3d7e06dbc911c2dd5de14ef2b` |
| `workflow-cryostat-isrctn-sap.pdf` | 806908 | `6f815a7bc26ae8cc6a5d05374c69a50321381ad970e099eb3b5ea28105a5eb4f` |
| `workflow-cryostat-isrctn-sap.txt` | 100569 | `4df3b84e7b3d6ddcfd478b88208cca2966fa299c40dede66f704c970f07ee2cb` |
| `workflow-cryostat-protocol.pdf` | 918458 | `6e3f4d500822e78124351a713ee39edee71f9e88dc6de7cb02ba43c5124e1e3f` |
| `workflow-cryostat-protocol.txt` | 160686 | `e98d412836ace048146dd370457839b726b7a5a5c13f0f75c3541bd738b2ff62` |
| `workflow-cryostat-basic-results.pdf` | 395783 | `e9f464639ba16efd85f8c6b0d109d281114222d76a6b591fdf23a2d428421ae2` |
| `workflow-cryostat-basic-results.txt` | 19757 | `42b1877f833fcb73230df21b01f09698aa334f949c0bf0f8527f23cfd8d2e3b6` |
| `workflow-cryostat-registry.xml` | 24215 | `e5f484a49353142fd738534af1132b4eee12f363f54d8738712c1b545cfa88a1` |
