/**
 * Content contract for the whole site.
 *
 * Two rules drive every type in this file:
 *  1. Nothing renders unless it exists in `src/data`, so no component can invent a claim.
 *  2. Anything not yet verified is modelled explicitly (never as a plausible-looking string),
 *     so `siteConfig.showUnverifiedPlaceholders = false` can remove all of it at once.
 */

export type AccentKey = 'cyan' | 'violet' | 'magenta' | 'amber';

/** Where a metric sits in the four-level measurement framework (Section 13). */
export type MeasurementLevelId = 'delivery' | 'engagement' | 'capability' | 'business';

/**
 * A value that may not be confirmed yet. `value` is null until it is; `placeholder`
 * is the editable prompt shown while `showUnverifiedPlaceholders` is true.
 */
export interface Verifiable<T = string> {
  value: T | null;
  placeholder: string;
  verified: boolean;
}

export interface Metric {
  id: string;
  label: string;
  /** Null until a real, sourced figure is available. Never fill this with an estimate. */
  value: string | number | null;
  unit?: string;
  /** Where the number came from, e.g. "Program closure report". Required to mark verified. */
  source?: string;
  verified: boolean;
  /** False when a real figure exists but cannot be published outside the organisation. */
  publicSafe: boolean;
  explanation: string;
  level: MeasurementLevelId;
  /** Editable prompt used while the value is unverified. */
  placeholder?: string;
  /** Animate a counter towards a numeric value (verified values only). */
  countable?: boolean;
}

export type CaseStudyTier = 'primary' | 'supporting';

export interface CaseStudy {
  id: string;
  order: number;
  tier: CaseStudyTier;
  employer: string;
  /** Internal program name, where one is publicly safe to state (e.g. Compass, Cornerstone). */
  programName?: string;
  title: string;
  eyebrow: string;
  role: Verifiable;
  timeframe: Verifiable;
  capabilityDemonstrated: string;
  situation: string;
  task: string;
  actions: string[];
  challenges: string[];
  resolutions: string[];
  reusableOutputs: string[];
  successMeasures: string[];
  metrics: Metric[];
  /** Open questions to settle before sharing, e.g. "[Confirm whether dealers were involved]". */
  openVerifications: string[];
  pax8Relevance: string;
  confidentialityNote: string;
  tags: string[];
  accent: AccentKey;
}

export interface OperatingModelPillar {
  id: string;
  caseStudyId: string;
  employer: string;
  /** Short verb phrase, e.g. "Shape the partner journey". */
  promise: string;
  keyword: string;
  accent: AccentKey;
  businessProblem: string;
  myResponsibility: string;
  actions: string[];
  challenges: string[];
  resolution: string;
  reusableOutputs: string[];
  measuresOfSuccess: string[];
  pax8Relevance: string;
}

export interface JourneyStage {
  id: string;
  label: string;
  description: string;
  owner: string;
}

export interface ChallengeResolution {
  id: string;
  number: number;
  title: string;
  problem: string;
  response: string;
  /** Which pillar's playbook the response draws on, when it maps to one. */
  drawsOn?: string;
  tags: string[];
}

export interface RoadmapPhase {
  id: string;
  label: string;
  detail: string;
}

export interface LifecycleStage {
  id: string;
  label: string;
  detail: string;
  ownerRole: string;
}

export interface BenefitLink {
  id: string;
  label: string;
  detail: string;
  level: MeasurementLevelId;
}

export interface RegionNode {
  id: string;
  label: string;
  /** Percentage coordinates inside an abstract network canvas — deliberately not a real map. */
  x: number;
  y: number;
  wave: 1 | 2 | 3;
  note: string;
}

export interface MeasurementLevel {
  id: MeasurementLevelId;
  index: number;
  title: string;
  question: string;
  indicators: string[];
  accent: AccentKey;
}

export interface NinetyDayPhase {
  id: string;
  window: string;
  title: string;
  intent: string;
  activities: string[];
  accent: AccentKey;
}

export interface HypotheticalProgram {
  name: string;
  purpose: string;
  disclaimer: string;
  partnerAudiences: string[];
  stakeholders: string[];
  roadmap: RoadmapPhase[];
  outputs: string[];
  technologyThemes: string[];
}

export interface ScalingPattern {
  id: string;
  verdict: 'poor' | 'poor-alt' | 'good';
  label: string;
  approach: string;
  consequence: string;
}

export interface ContactAction {
  id: string;
  label: string;
  href: string;
  kind: 'resume' | 'linkedin' | 'email' | 'booking' | 'print';
  /** True while the value is still a placeholder that must be replaced before sharing. */
  isPlaceholder: boolean;
  description: string;
}

export type SectionId =
  | 'hero'
  | 'partner-experience-problem'
  | 'operating-model'
  | 'daimler'
  | 'ubs'
  | 'nab-compass'
  | 'merck-cornerstone'
  | 'bank-of-america'
  | 'build-once'
  | 'pax8-application'
  | 'scaling-challenges'
  | 'ninety-days'
  | 'metrics'
  | 'conversation'
  | 'closing';

export interface SectionMeta {
  id: SectionId;
  /** Title shown in the walkthrough controller. */
  walkthroughTitle: string;
  /** Estimated narration time in minutes; the total drives "time remaining". */
  minutes: number;
  /** Present only for the eight top-level "Explore freely" destinations. */
  exploreLabel?: string;
  /** Groups case studies under the Experience Programs nav entry. */
  parent?: SectionId;
}
