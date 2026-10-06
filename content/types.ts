export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];

/** A string translated into every supported locale. */
export type L10n = Record<Locale, string>;

export type ProjectStatus = "live" | "beta" | "prototype" | "internal";

/** Which interface schematic to draw when a project has no screenshots yet. */
export type SchematicKind = "erp" | "commerce" | "booking" | "coaching" | "marketing";

export type CapabilityId =
  | "business-systems"
  | "ecommerce"
  | "saas"
  | "erp-crm"
  | "automation"
  | "ai"
  | "dashboards"
  | "web-apps";

export interface ProjectMedia {
  /** Path under /public, e.g. "/work/ravand/dashboard.webp" */
  src: string;
  alt: L10n;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  /** Lower comes first. */
  order: number;
  featured: boolean;
  /** Latin wordmark used as the large typographic title. */
  wordmark: string;
  title: L10n;
  category: L10n;
  status?: ProjectStatus;
  year?: string;
  summary: L10n;
  problem: L10n;
  solution: L10n;
  /** Factual features/scope. Never invented metrics. */
  highlights: L10n[];
  /** Only fill with a real, verifiable outcome. Hidden when absent. */
  result?: L10n;
  stack: string[];
  capabilities: CapabilityId[];
  schematic: SchematicKind;
  media?: ProjectMedia[];
  video?: { src: string; poster?: string };
  links?: { live?: string; github?: string; caseStudy?: string };
}

export interface Capability {
  id: CapabilityId;
  title: L10n;
  description: L10n;
  stack: string[];
}

export interface ProcessStep {
  key: string;
  /** Large display word (kept Latin in both locales as a typographic object). */
  word: string;
  title: L10n;
  body: L10n;
  tools: string[];
}
