export type ClinicPathway = {
  id: string;
  title: string;
  description: string;
  aliases: string[];
  assessment: string;
  treatment: string;
  companion?: {label: string; href: string};
};

// Retrieval metadata only. Clinical decisions stay in the source articles.
export const clinicPathways: ClinicPathway[] = [
  {
    id: 'female-incontinence', title: 'Urinary incontinence in women',
    description: 'Stress, urgency and mixed symptoms; evaluation and treatment options.',
    aliases: ['SUI', 'UUI', 'OAB', 'MUI', 'female stress incontinence', 'overactive bladder', 'leakage'],
    assessment: '/docs/clinical-conditions/03a-storage-incontinence/sui-female',
    treatment: '/docs/surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database',
    companion: {label: 'Urgency / overactive bladder', href: '/docs/clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab'},
  },
  {
    id: 'prolapse', title: 'Pelvic organ prolapse',
    description: 'Symptom assessment, support examination and repair options.',
    aliases: ['POP', 'cystocele', 'rectocele', 'uterine prolapse', 'vaginal vault', 'bulge'],
    assessment: '/docs/clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse',
    treatment: '/docs/surgical-techniques/04g-prolapse-repair',
  },
  {
    id: 'male-incontinence', title: 'Urinary incontinence in men',
    description: 'Post-treatment leakage, severity assessment and continence procedures.',
    aliases: ['male SUI', 'PPI', 'postprostatectomy', 'post prostatectomy', 'AUS', 'male sling'],
    assessment: '/docs/clinical-conditions/03a-storage-incontinence/sui-male',
    treatment: '/docs/surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database',
  },
  {
    id: 'bph', title: 'BPH and male lower urinary tract symptoms',
    description: 'Assess the cause of symptoms; compare medical and procedural options.',
    aliases: ['BPH', 'LUTS', 'BOO', 'benign prostatic hyperplasia', 'enlarged prostate', 'outlet obstruction'],
    assessment: '/docs/clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction',
    treatment: '/docs/surgical-techniques/bph-male-luts',
  },
  {
    id: 'male-stricture', title: 'Urethral stricture in men',
    description: 'Define location, length and prior treatment before selecting reconstruction.',
    aliases: ['stricture', 'urethroplasty', 'DVIU', 'urethral narrowing', 'BMG'],
    assessment: '/docs/clinical-conditions/03b-voiding-outlet/urethral-stricture',
    treatment: '/docs/surgical-techniques/urethral-reconstruction',
  },
  {
    id: 'erectile-dysfunction', title: 'Erectile dysfunction',
    description: 'Evaluation, shared treatment selection and surgical options.',
    aliases: ['ED', 'impotence', 'PDE5', 'ICI', 'IPP', 'penile prosthesis'],
    assessment: '/docs/clinical-conditions/03g-genital-scrotal/erectile-dysfunction',
    treatment: '/docs/surgical-techniques/04j-sexual-dysfunction/erectile-dysfunction',
  },
  {
    id: 'recurrent-uti', title: 'Recurrent urinary tract infection in women',
    description: 'Confirm recurrent infection and compare prevention strategies.',
    aliases: ['rUTI', 'recurrent UTI', 'cystitis', 'urine infection', 'methenamine'],
    assessment: '/docs/special-populations/05e-womens-health/recurrent-uti',
    treatment: '/docs/foundations/pharmacology/infection-prophylaxis/non-antibiotic-uti-prevention',
  },
];

export function filterClinicPathways(query: string): ClinicPathway[] {
  const words = (value: string): string[] => value.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
  const terms = words(query);
  return clinicPathways.filter(pathway => {
    const tokens = words([pathway.title, pathway.description, ...pathway.aliases].join(' '));
    // Short abbreviations need whole words: ED must not match "mixed" or
    // "enlarged". Longer prefixes preserve useful partial typing, while male
    // no longer matches the middle of female.
    return terms.every(term => tokens.some(token => term.length <= 3 ? token === term : token.startsWith(term)));
  });
}

export const clinicFavoritesKey = 'warwiki.clinic-favorites.v1';
export function parseClinicFavorites(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is string =>
      typeof id === 'string' && clinicPathways.some(pathway => pathway.id === id)))];
  } catch { return []; }
}
