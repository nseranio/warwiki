# Trial page template

One page per trial family (adapted from WHITWIKI's `templates/trial.md`, October 18, 2026). Every publication from the trial (first report, long-term follow-up, secondary analyses) lives on this page and in `src/data/clinical-evidence/trials/<id>.json`. Write in STYLE.md voice: state each finding with its population, design and follow-up once, in the sentence that reports it, and stop. No draft notices, source-scope lines, review status or rebuttals of unstated claims (STYLE §11–§12); those belong in the trial file's `status` field or nowhere.

```mdx
---
title: "NAME"
description: "One-sentence clinical question the trial answered."
---

import TrialBottomLine from '@site/src/components/TrialBottomLine';
import TrialQuickHit from '@site/src/components/TrialQuickHit';
import ReportHistory from '@site/src/components/ReportHistory';
import InConversation from '@site/src/components/InConversation';

# NAME: Full Descriptive Title

<TrialBottomLine id="ID" />

**NAME** was a [design: multicenter, blinding, noninferiority or superiority] randomized trial of [experimental strategy] versus [control] in [population], with [primary endpoint(s) and timepoint]. [Headline result in one sentence with the main effect and its timing.]<sup>[[1]](#ref1)</sup>

<TrialQuickHit id="ID" />

## Design

Only what changes who the result applies to or how to read it: eligibility beyond the quick hit, surgeon experience and technique standardization, endpoint definitions that differ from peer trials (composite success, subjective versus objective cure), and the statistical plan when it decides whether an endpoint was met (noninferiority margin, hierarchy).

## Results

Primary endpoint(s) first, with absolute values, the effect estimate and its interval, and whether the endpoint met its prespecified threshold. Then key secondary endpoints and later follow-up reports. Label exploratory or descriptive analyses in the sentence that reports them.

## Surgery and treatment delivery

Operative details a surgeon needs: technique, device or dose, operative time, concomitant procedures, crossover, adherence and retreatment. Omit for drug trials when there is nothing beyond the quick hit.

## Adverse events

Complications and adverse events that matter to the surgeon: by Clavien-Dindo grade where reported, mesh exposure, voiding dysfunction, retention and catheterization, urinary infection, reoperation, explantation.

## Limitations

Only this trial's specific weaknesses (blinding, comparator, loss to follow-up, surgeon selection, endpoint construction, early closure), each stated once.

## In conversation

<InConversation id="ID" />

One short paragraph, when needed, on the comparison a reader will actually make with its peers (different endpoints, different control arms, different populations). State the difference; do not rank effect sizes.

## Guidelines and approvals

Each guideline statement that cites or rests on the trial: body, version and year, the statement in brief, and its strength as published in a `<Rec>(…)</Rec>` badge, e.g. "AUA/SUFU 2024 offers … <Rec>(Moderate Recommendation; Evidence Level: Grade B)</Rec>". Then regulatory approvals or clearances with dates. Keep guideline strength, trial significance and regulatory scope separate.

## Report history

<ReportHistory id="ID" />

---

## References

<a id="ref1"></a>1. Last FM, Last FM, Last FM, et al. "Title." *Journal.* Year;Vol(Issue):Pages. doi:[10.xxxx/yyyy](https://doi.org/10.xxxx/yyyy)
```

## Checklist before committing

- The trial file validates (`npm run lint:trials`) and every number in the prose also appears in the trial file with a locator.
- Every new or edited number, dose, guideline statement and absolute statement passes the claim gate (MDX prose and the trial file's results, harms, delivery facts and takeaway).
- `npm run lint` and `npm run build` pass.
