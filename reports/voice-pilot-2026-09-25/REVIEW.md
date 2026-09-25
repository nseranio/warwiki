# Voice pilot round 3: review

Read time: about 10 minutes. Nothing under `docs/` was changed. Every output below is a copy under `reports/voice-pilot-2026-09-25/round3/`.

## What I tested

- **Tooling:** `scripts/voice/pass1.py` extracts only the prose paragraphs and list items that contain Pass 1 patterns (em dash, bold inside a sentence, symbols used as words, the STYLE section 2 word lists, reader address). It never sends headings, tables, JSX, images, captions, code, front matter or References. It re-applies edits by ID, reverts any unit that loses a citation marker, link or number, and then runs `check_voice_diff.py` on the whole page.
- **Pages:** 10 pages that were not in the earlier pilot, two each from clinical conditions, surgical techniques, pharmacology, instruments/biomaterials and evaluation. Pages in the first two groups and pharmacology were audited under v2. The instrument and evaluation pages have not reached the audit queue yet, because those sections are tiers 3 and 4, so those four are unaudited. Pass 1 needs no sources, so this does not affect the test.
- **Editors:** ten Sonnet subagents, one per page, under STYLE-draft-v3 sections 1, 2 and 5.
- **Judges:** a separate Sonnet subagent per page, blind to the editor's reasoning, comparing the original against the result for meaning drift and voice.
- **Pass 1+2 demonstration:** three pages (obstetric perineal injury, anticholinergics, EPA), for your voice review only. It is never published.

## Results: Pass 1 (10 pages)

| Page | Units changed | Checker | Em dashes per 1,000 words | Bold per 1,000 words | Drift major / minor | Voice original → Pass 1 |
|---|---|---|---|---|---|---|
| Obstetric perineal injury (clinical) | 28/32 | PASS | 12.7 → 0.0 | 35.8 → 13.7 | 0 / 8 | 5 → 7 |
| Bladder neck stenosis (clinical) | 25/36 | PASS | 10.7 → 0.0 | 15.7 → 12.5 | 0 / 4 | 6 → 7 |
| Excision and primary anastomosis (surgical) | 42/50 | PASS | 8.4 → 0.0 | 35.2 → 12.3 | 0 / 8 | 5 → 6 |
| Intradetrusor botulinum toxin (surgical) | 51/54 | PASS | 5.2 → 0.0 | 28.2 → 6.4 | 0 / 6 | 6 → 7.5 |
| Anticholinergics (pharmacology) | 42/49 | PASS | 11.5 → 0.0 | 52.2 → 34.3 | 0 / 9 | 5 → 7 |
| Ospemifene (pharmacology) | 49/55 | PASS | 13.5 → 0.0 | 39.5 → 22.6 | 0 / 5 | 5 → 7 |
| Mayo-Hegar needle holder (instruments) | 27/27 | PASS | 14.6 → 0.0 | 38.3 → 25.1 | 0 / 5 | 6 → 7 |
| Otis urethrotome (instruments) | 27/30 | PASS | 24.1 → 0.0 | 55.5 → 29.6 | 0 / 6 | 5 → 7 |
| Penile Doppler ultrasound (evaluation) | 48/51 | PASS | 10.3 → 0.0 | 27.9 → 16.1 | 0 / 11 | 5 → 7 |
| Preoperative labs (evaluation) | 22/30 | PASS | 12.0 → 0.8 | 28.7 → 19.1 | 0 / 5 | 6 → 7 |

All ten passed the checker with no reverted units. The judges found no major drift on any page. Em dashes fell to zero except one (a link title on the preoperative labs page). Bold fell by 20 to 80 percent, because run-in labels stay bold.

## Results: Pass 1+2 (three pages, demonstration)

| Page | Checker | Citation markers moved | Drift major / minor | Voice original → Pass 1 → Pass 1+2 |
|---|---|---|---|---|
| Obstetric perineal injury (clinical) | PASS | 4 | 0 / 10 | 5 → 7 → 8 |
| Anticholinergics (pharmacology) | PASS | 6 | 0 / 10 | 5 → 7 → 7 |
| Excision and primary anastomosis (surgical) | PASS | 1 | 0 / 11 | 5 → 6 → 7 |

The checker passes because every marker still appears exactly once. It cannot tell whether a marker moved to a clause its reference does not support. The editors counted the moves and the judges classed all of them minor, but neither had the papers. See "worst drift".

## Excerpts (original → Pass 1 → Pass 1+2)

### 1. Bold label and dash in a list item (obstetric perineal injury)

**Original**
> - **Levator ani** — not lacerated at the perineum but **avulsed from its pubic insertion** by overstretch; the silent injury that drives later prolapse (below).

**Pass 1**
> - **Levator ani.** Not lacerated at the perineum but avulsed from its pubic insertion by overstretch; the silent injury that drives later prolapse (below).

**Pass 1+2** (demonstration only)
> - **Levator ani.** The levator ani is not lacerated at the perineum but is avulsed from its pubic insertion by overstretch. This silent injury drives later prolapse (below).

*Pass 1 fixes the typography. Pass 2 turns the fragment into sentences, at the cost of repeating the subject.*

### 2. Comparison bullets with bold (anticholinergics)

**Original**
> **Fesoterodine 8 mg vs. ER tolterodine** — fesoterodine superior for all efficacy endpoints, but **higher withdrawal** (RR 1.45) and **higher dry mouth** (RR 1.80)

**Pass 1**
> **Fesoterodine 8 mg versus ER tolterodine:** fesoterodine superior for all efficacy endpoints, but higher withdrawal (RR 1.45) and higher dry mouth (RR 1.80)

**Pass 1+2** (demonstration only)
> Fesoterodine 8 mg is superior to ER tolterodine for all efficacy endpoints, but withdrawal (RR 1.45) and dry mouth (RR 1.80) are higher.

*Pass 2 drops the label entirely, so the comparison list becomes prose bullets with no scannable lead-in.*

### 3. Arrow used as a verb (anticholinergics)

**Original**
> **French case-control study (4,810 cases, 24,050 controls):** OAB anticholinergic use → OR 1.23 for dementia, with clear **dose-response relationship**:

**Pass 1**
> **French case-control study (4,810 cases, 24,050 controls):** OAB anticholinergic use was associated with OR 1.23 for dementia, with a clear dose-response relationship:

**Pass 1+2** (demonstration only)
> A French case-control study (4,810 cases, 24,050 controls) found that OAB anticholinergic use was associated with OR 1.23 for dementia, with a clear dose-response relationship:

*"Was associated with" is safe in Pass 1 because the arrow already sat on an observational finding (STYLE section 4).*

### 4. Imperative in a management list (anticholinergics)

**Original**
> - Offer behavioral measures and discuss **β3-agonists or antimuscarinics** according to symptoms, adverse effects and preferences.

**Pass 1**
> - Offer behavioral measures and discuss β3-agonists or antimuscarinics according to symptoms, adverse effects and preferences.

**Pass 1+2** (demonstration only)
> - Clinicians offer behavioral measures and discuss β3-agonists or antimuscarinics according to symptoms, adverse effects and preferences.

*Pass 2 has to decide what to do with a directive. "Clinicians offer" reads oddly in a list of recommendations (question 1).*

### 5. Skin closure step (obstetric perineal injury)

**Original**
> 3. **Skin** — a running **subcuticular** closure back toward the hymen, the final knot buried behind the hymen.

**Pass 1**
> 3. **Skin.** A running subcuticular closure back toward the hymen, the final knot buried behind the hymen.

**Pass 1+2** (demonstration only)
> 3. **Skin.** Close with a running subcuticular suture back toward the hymen, burying the final knot behind the hymen.

*In an operative step list, Pass 2 kept the imperative. That matches STYLE section 3.*

### 6. Folding a label into a sentence (EPA)

**Original**
> - **Erectile function** — the technique can be considered when erectile function is already impaired or sexual activity is not a priority.

**Pass 1**
> - **Erectile function**. The technique can be considered when erectile function is already impaired or sexual activity is not a priority.

**Pass 1+2** (demonstration only)
> - **Erectile function** affects selection: the technique can be considered when erectile function is already impaired or sexual activity is not a priority.

*Pass 2 added "affects selection", a small new claim the source never stated. A reviewer must catch this by eye.*

### 7. Empty evaluation word (EPA)

**Original**
> ...but offers a **meaningful** single-stage option for selected older / non-sexually-active patients with long bulbar strictures who would otherwise be steered toward perineal urethrostomy.

**Pass 1**
> ...but offers a single-stage option for selected older or non-sexually-active patients with long bulbar strictures who would otherwise be steered toward perineal urethrostomy.

**Pass 1+2** (demonstration only)
> ...It offers a single-stage option for selected older or non-sexually-active patients with long bulbar strictures who would otherwise be steered toward perineal urethrostomy.

*Deleting "meaningful" loses nothing. Pass 2 also split the long sentence in two.*

### 8. Citation split across clauses (obstetric perineal injury)

**Original**
> - **Antenatal:** digital perineal self-massage from **~34–35 weeks** reduces perineal trauma requiring suture (RR 0.91, NNT ≈ 15) and episiotomy (RR 0.84); the benefit is confined to women without prior vaginal birth, and third-/fourth-degree tears are not reduced.<sup>[[2]](#ref2)[[10]](#ref10)[[18]](#ref18)</sup>

**Pass 1**
> - **Antenatal:** digital perineal self-massage from about 34–35 weeks reduces perineal trauma requiring suture (RR 0.91, NNT ≈ 15) and episiotomy (RR 0.84); the benefit is confined to women without prior vaginal birth, and third-/fourth-degree tears are not reduced.<sup>[[2]](#ref2)[[10]](#ref10)[[18]](#ref18)</sup>

**Pass 1+2** (demonstration only)
> - **Antenatal** digital perineal self-massage from about 34–35 weeks reduces perineal trauma requiring suture (RR 0.91, NNT ≈ 15) and episiotomy (RR 0.84).<sup>[[18]](#ref18)</sup> The benefit is confined to women without prior vaginal birth, and third-/fourth-degree tears are not reduced.<sup>[[2]](#ref2)[[10]](#ref10)</sup>

*This is the danger of Pass 2. The checker passes because every marker still appears once, but which reference supports which clause was guessed. Only a source check settles it.*

### 9. Sentence opener and label separator (Mayo-Hegar, Pass 1 only)

**Original**
> The cross-hatched jaw pattern balances **needle-holding security** against **suture-material preservation** — particularly relevant for monofilament synthetic sutures (polypropylene, nylon) that are susceptible to crushing injury from aggressive jaw surfaces.<sup>[[2]](#ref2)[[4]](#ref4)</sup>

**Pass 1**
> The cross-hatched jaw pattern balances needle-holding security against suture-material preservation. This is particularly relevant for monofilament synthetic sutures (polypropylene, nylon) that are susceptible to crushing injury from aggressive jaw surfaces.<sup>[[2]](#ref2)[[4]](#ref4)</sup>

**Pass 1+2** (demonstration only)
> (not produced for this page)

*Splitting at the dash is what Pass 1 does when a dash cannot be a colon. The citation stays at the end of the second sentence, so the first sentence loses its marker. That is a small case of the Pass 2 problem inside Pass 1.*

### 10. Run-in label in an instrument description (Otis, Pass 1 only)

**Original**
> - **Calibrated expandable distal segment** — turning a screw on the handle widens the segment to a precise French diameter shown on a graduated handle scale, allowing **measured dilation** before the cut.

**Pass 1**
> - **Calibrated expandable distal segment.** Turning a screw on the handle widens the segment to a precise French diameter shown on a graduated handle scale, allowing measured dilation before the cut.

**Pass 1+2** (demonstration only)
> (not produced for this page)

*The most common Pass 1 change on all ten pages: a dash after a bold label becomes a full stop or colon.*

## The two worst drift cases

**1. Pass 1+2, anticholinergics, BPH paragraph (citation placement).** The original paragraph ended with one cluster, `[14][21][22][30]`. After splitting the sentences, `[14]` sits on the AUA/SUFU 2024 recommendation, `[21]` on the combination-therapy claim, and `[22][30]` on the 2026 BPH guideline clause. The sentences about postvoid residual and retention now carry no marker of their own, and the editor could not say whether `[14]` or `[21]` supports them. The SYNERGY II adverse-event figure is still attached to `[14]`, which the editor thought was probably wrong (it likely comes from the trial papers). Neither the checker nor the judge could see this. A source check in the audit would.

**2. Pass 1, Mayo-Hegar (added connective).** The original said to "consider a different length/angle or Heaney pattern rather than treating substitution as impossible". The editor wrote "consider a different length or angle or a Heaney pattern, since substitution is not impossible". The added "since" turns a caution into a stated reason, which STYLE section 3 forbids, and it slipped past both the checker and the editor's own report. A second instance changed "rather than assuming one cycle for every variant" into "since one cycle cannot be assumed". The judge rated both minor. These are the clearest evidence that connective-adding needs a mechanical check.

Smaller items, all minor: a hedge was deleted ("The signal is not bulletproof", anticholinergics), "critical for learning and memory" became "involved in learning and memory", "the key direct comparison" became "a direct comparison" (botulinum toxin), and one scope sentence was deleted ("This page covers all three, framed for the urogynecologist", obstetric perineal injury).

## What I recommend

- Run Pass 1 site-wide once you approve. Ten of ten pages passed with no major drift, and the changes are consistent.
- Keep Pass 2 inside the audit. In this pilot it produced the best-reading text (voice 7 to 8 of 10) and also the only citation risk.
- Already done: `check_voice_diff.py` now warns when a revision adds "since", "because", "therefore", "thus", "hence" or "so that". It flags the Mayo-Hegar case (0 → 2). The warning was added after the pilot, so the pilot's PASS lines above were produced without it.

## Questions for you

1. **Imperatives in pearls and management lists.** Pass 2 turned "Offer behavioral measures…" into "Clinicians offer behavioral measures…". STYLE keeps imperatives only in operative steps, checklists and pearl boxes. Should management bullets (for example "Offer…", "Consider…", "Counsel…") also stay imperative? My suggestion: yes, because "clinicians offer" reads like reporting what clinicians do, not what the page advises.
2. **Bold run-in labels.** All ten editors kept the bold label at the start of a list item and changed the dash after it to a full stop or colon. The bold rate only fell 20 to 80 percent because of this. Do you want the label kept bold (scannable, but it is the site's most obvious machine signature), or plain text?
3. **Dash-to-colon and dash-to-full-stop.** STYLE section 1 says a colon introduces only a list, definition or value. Editors used "Label." for run-in labels and a colon or semicolon inside sentences. Is a colon after a label acceptable, or should it always be a full stop?
4. **(Optional) Deleting a scope sentence or hedge.** Two editors deleted a sentence with no clinical content ("This page covers…") and one deleted a hedge clause. Should Pass 1 be forbidden from deleting any sentence, with such cases listed for the audit instead?

## Files

- `round3/<page>/`: `original.mdx`, `batch.json`, `edited.json`, `pass1.mdx`, `apply-report.json`, `judge-pass1.json`, `report.md` (editor's STYLE section 6 report). Three pages also have `pass12.mdx`, `pass12-notes.md`, `judge-pass12.json`.
- `round3/EDITOR-PROMPT.md`, `round3/JUDGE-PROMPT.md`: the prompts used.
- `../../scripts/voice/`: `pass1.py`, `check_voice_diff.py`, `voice-report.py` (`npm run lint:voice`).
