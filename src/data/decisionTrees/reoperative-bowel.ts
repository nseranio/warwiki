import type { DecisionNode } from '@site/src/components/DecisionTree';

/**
 * Reoperative Bowel-Segment Selection
 *
 * Codifies the algorithm in
 * docs/01-foundations/surgical-principles/reoperative-bowel-harvest.mdx §3
 * as an interactive tree. Source citations are kept on the tree result so
 * the user can drill back to the evidence.
 */
export const reoperativeBowelTree: DecisionNode = {
  question: 'Does the patient have a pre-existing colostomy (or one planned at this operation)?',
  options: [
    {
      label: 'Yes — colostomy exists or is planned',
      next: {
        result: 'Distal colon conduit (colostomy switch)',
        rationale:
          'Convert the existing colostomy into the urinary stoma and create a new proximal colostomy for fecal diversion. No new enteric anastomosis is created — the single strongest evidence-based principle in reoperative bowel harvest.',
        citations: [
          {
            label: 'Reoperative Bowel Harvest §1',
            href: '/docs/foundations/surgical-principles/reoperative-bowel-harvest#1-avoid-additional-bowel-anastomosis-when-possible',
          },
          {
            label: 'Cotter 2017 / Alemozaffar 2019',
            href: '/docs/foundations/surgical-principles/reoperative-bowel-harvest#references',
          },
        ],
      },
    },
    {
      label: 'No colostomy — pelvic exenteration in progress?',
      next: {
        question: 'Is the patient undergoing pelvic exenteration with concurrent colonic resection?',
        options: [
          {
            label: 'Yes — exenteration with colonic resection',
            next: {
              result: 'Colon conduit (sigmoid or descending)',
              rationale:
                'Avoids the ileo-ileal anastomosis required for an ileal conduit. Hagemans 259-pt series: ileo-ileal leak 4% in ileal-conduit; postoperative ileus 21% (ileal) vs 7% (colon, p=0.024). Hebert 2026 multi-institutional 179-pt: concurrent colonic anastomosis was NOT independently associated with worse 30-day outcomes.',
              citations: [
                {
                  label: 'Reoperative Bowel Harvest §3',
                  href: '/docs/foundations/surgical-principles/reoperative-bowel-harvest#3-segment-selection-in-the-reoperative-setting',
                },
              ],
            },
          },
          {
            label: 'No exenteration',
            next: {
              question: 'Has the patient had prior pelvic radiation?',
              options: [
                {
                  label: 'Yes — prior pelvic radiation',
                  next: {
                    result: 'Transverse colon conduit or pouch',
                    rationale:
                      'Transverse colon lies above the typical pelvic radiation field. Continent transverse-ascending or transverse-descending pouches have demonstrated low complication rates in irradiated patients. Ileal conduit is not absolutely contraindicated but irradiated bowel has continence-failure 25% vs 5.7%, stomal complications 38.8% vs 10.6%.',
                    citations: [
                      {
                        label: 'Reoperative Bowel Harvest §5',
                        href: '/docs/foundations/surgical-principles/reoperative-bowel-harvest#5-prior-pelvic-radiation',
                      },
                      {
                        label: 'Bowel Segments (transverse colon)',
                        href: '/docs/foundations/tools/biomaterials/autologous-tissue/bowel-segments',
                      },
                    ],
                  },
                },
                {
                  label: 'No prior radiation',
                  next: {
                    question: 'Has the patient had a prior ileal resection limiting small-bowel length?',
                    options: [
                      {
                        label: 'Yes — limited small bowel',
                        next: {
                          result: 'Colon segment (sigmoid or transverse)',
                          rationale:
                            'Preserves remaining small-bowel length. Maintain ≥180 cm of residual small bowel to prevent SBS; measure intraoperatively along the antimesenteric border from ligament of Treitz to ileocecal valve.',
                          citations: [
                            {
                              label: 'Reoperative Bowel Harvest §2',
                              href: '/docs/foundations/surgical-principles/reoperative-bowel-harvest#2-preoperative-assessment-and-planning',
                            },
                          ],
                        },
                      },
                      {
                        label: 'No prior ileal resection, adequate small bowel',
                        next: {
                          result: 'Standard ileal conduit or neobladder',
                          rationale:
                            'Lowest metabolic impact if terminal ileum and ileocecal valve are preserved (last 15–25 cm of ileum). Confirm segment viability with ICG fluorescence angiography when prior anastomosis is in the field — refines margins in up to 35% of cases vs clinical judgment alone.',
                          citations: [
                            {
                              label: 'Reoperative Bowel Harvest §3 (Ileum)',
                              href: '/docs/foundations/surgical-principles/reoperative-bowel-harvest#ileum',
                            },
                            {
                              label: 'Bowel Anastomosis (ICG-FA)',
                              href: '/docs/foundations/surgical-principles/bowel-anastomosis#perfusion-assessment--icg-fluorescence-angiography',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
