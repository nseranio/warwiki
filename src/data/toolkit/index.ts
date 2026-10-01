import { MALE_SUI_TOOLKIT } from './male-sui';
import { FEMALE_SUI_TOOLKIT } from './female-sui';
import { STRICTURE_TOOLKIT } from './urethral-stricture';
import { OAB_TOOLKIT } from './oab';

export type { ToolkitItem, ToolkitKind, ToolkitSource } from './types';

export const TOOLKIT_ITEMS = [
  ...MALE_SUI_TOOLKIT,
  ...FEMALE_SUI_TOOLKIT,
  ...STRICTURE_TOOLKIT,
  ...OAB_TOOLKIT,
];
