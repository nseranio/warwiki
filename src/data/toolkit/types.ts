/** Generic, EHR-agnostic templates kept exclusively in Resources. */
export type ToolkitKind = 'op-note' | 'counseling' | 'patient-instructions' | 'clinic-note';

export interface ToolkitSource {
  /** Exact figure wording used in the body. */
  figure: string;
  /** Repository path to the supporting WARWIKI article. */
  page: string;
  /** Heading or explicit id on that article. */
  anchor: string;
}

export interface ToolkitItem {
  id: string;
  kind: ToolkitKind;
  title: string;
  summary: string;
  topic: string;
  pages: string[];
  body: string;
  sources: ToolkitSource[];
  updated: string;
}
