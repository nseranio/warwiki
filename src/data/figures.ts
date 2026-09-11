import registry from './figures.json';

export type ClinicalFigureRecord = (typeof registry.figures)[keyof typeof registry.figures];
export type FigureSource = (typeof registry.sources)[keyof typeof registry.sources];
export const figures: Record<string, ClinicalFigureRecord> = registry.figures;
export const figureSources: Record<string, FigureSource> = registry.sources;

/** Recognize Docusaurus's original and content-hashed local images only. */
export function findFigure(src: unknown): ClinicalFigureRecord | undefined {
  if (typeof src !== 'string' || /^(?:[a-z]+:)?\/\//i.test(src)) return undefined;
  const pathname = src.split(/[?#]/)[0];
  if (!/(?:^|\/)(?:img\/diagrams|assets\/images)\//.test(pathname)) return undefined;
  const filename = pathname.slice(pathname.lastIndexOf('/') + 1);
  return Object.values(figures).find(figure => filename === `${figure.id}.svg` ||
    new RegExp(`^${figure.id}-[a-f\\d]{6,}\\.svg$`, 'i').test(filename));
}
