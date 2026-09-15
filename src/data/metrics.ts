/**
 * Measurement framework (Section 13) and the single gate that decides whether a
 * metric may be displayed.
 *
 * The framework is deliberately the headline here. Numbers are only shown when a
 * sourced, shareable value exists in `src/data/portfolio.ts`.
 */

import type { BenefitLink, MeasurementLevel, Metric } from '@/types/portfolio';
import { caseStudies } from './portfolio';

export const measurementLevels: MeasurementLevel[] = [
  {
    id: 'delivery',
    index: 1,
    title: 'Delivery health',
    question: 'Is the program itself under control?',
    indicators: [
      'Scope',
      'Schedule',
      'Budget',
      'Quality',
      'Risks',
      'Dependencies',
      'Readiness',
    ],
    accent: 'cyan',
  },
  {
    id: 'engagement',
    index: 2,
    title: 'Reach and engagement',
    question: 'Did the right partners actually turn up?',
    indicators: ['Awareness', 'Registration', 'Participation', 'Completion', 'Regional reach'],
    accent: 'violet',
  },
  {
    id: 'capability',
    index: 3,
    title: 'Capability and behaviour',
    question: 'Can partners now do something they could not do before?',
    indicators: [
      'Assessment improvement',
      'Confidence',
      'Playbook utilisation',
      'Process adoption',
      'Solution deployment',
      'Partner self-sufficiency',
    ],
    accent: 'magenta',
  },
  {
    id: 'business',
    index: 4,
    title: 'Business outcomes',
    question: 'Did the partner and the business get value from it?',
    indicators: [
      'Marketplace adoption',
      'Partner revenue',
      'Partner retention',
      'New managed services',
      'Operational efficiency',
      'Reduced support demand',
      'Improved downstream SMB outcomes',
    ],
    accent: 'amber',
  },
];

/** Benefits chain used in the NAB Compass section: launch is the start, not the finish. */
export const benefitsChain: BenefitLink[] = [
  {
    id: 'awareness',
    label: 'Awareness',
    detail: 'Partners know the capability exists and why it matters to them.',
    level: 'engagement',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    detail: 'They participate — register, attend, complete.',
    level: 'engagement',
  },
  {
    id: 'capability',
    label: 'Capability',
    detail: 'They can position, sell, deploy or support the solution.',
    level: 'capability',
  },
  {
    id: 'adoption',
    label: 'Adoption',
    detail: 'They apply it with real customers, not just in the assessment.',
    level: 'capability',
  },
  {
    id: 'operational-change',
    label: 'Operational change',
    detail: 'Their own processes, offers and delivery model change.',
    level: 'business',
  },
  {
    id: 'business-benefit',
    label: 'Business benefit',
    detail: 'Measurable commercial or operational result against a baseline.',
    level: 'business',
  },
];

/** Label shown wherever a real value is not yet available. */
export const EVIDENCE_PENDING_LABEL = 'Evidence being validated';

/** Chip label used in review mode for an unverified metric. */
export const METRIC_TO_VERIFY_LABEL = 'Metric to verify';

/**
 * THE GATE. A metric may only ever be rendered as a value when both flags are true.
 * Everything else is either a "to verify" prompt (review mode) or absent (production).
 */
export function isRenderableMetric(metric: Metric): boolean {
  return metric.verified === true && metric.publicSafe === true && metric.value !== null;
}

export function verifiedMetrics(metrics: Metric[]): Metric[] {
  return metrics.filter(isRenderableMetric);
}

export function unverifiedMetrics(metrics: Metric[]): Metric[] {
  return metrics.filter((metric) => !isRenderableMetric(metric));
}

/** Every metric across every case study, used by the Section 13 evidence board. */
export function allMetrics(): Metric[] {
  return caseStudies.flatMap((study) => study.metrics);
}

export function metricsByLevel(levelId: MeasurementLevel['id']): Metric[] {
  return allMetrics().filter((metric) => metric.level === levelId);
}

/** Counts used to describe the evidence position honestly, without inventing results. */
export function evidenceSummary() {
  const metrics = allMetrics();
  const verified = metrics.filter(isRenderableMetric);
  return {
    total: metrics.length,
    verified: verified.length,
    pending: metrics.length - verified.length,
  };
}
