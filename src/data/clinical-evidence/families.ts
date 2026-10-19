/** Top level of the Clinical Evidence area filter (owner, October 19): three families, each opening its areas. */
export const families: {id: string; label: string; areas: string[]}[] = [
  {id: 'pelvic-floor', label: 'Pelvic floor', areas: ['female-sui', 'oab', 'prolapse', 'fistula']},
  {id: 'male', label: 'Male', areas: ['male-sui', 'bph', 'stricture', 'sexual-medicine']},
  {id: 'general', label: 'General', areas: ['infection', 'bowel', 'diversion', 'perioperative']},
];

export const familyOf = (selected: string) =>
  families.find(family => family.id === selected || family.areas.includes(selected));

/** True when an area value falls under the selected filter ('all', a family id or an area id). */
export const areaMatches = (selected: string, value: string) =>
  selected === 'all' || selected === value || !!families.find(family => family.id === selected)?.areas.includes(value);
