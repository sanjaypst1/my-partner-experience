import { describe, expect, it } from 'vitest';
import { caseStudies, contactActions, sections, siteConfig } from '@/data/portfolio';
import { allMetrics, isRenderableMetric, measurementLevels } from '@/data/metrics';
import { hypotheticalProgram, pax8Understanding, scalingChallenges } from '@/data/pax8Alignment';

/**
 * These tests protect the honesty rules. If somebody later pastes a number into the
 * data file without a source, or marks a confidential figure as shareable, the suite
 * fails rather than the site quietly making a claim it cannot support.
 */
describe('content integrity', () => {
  it('never marks a metric verified without both a value and a source', () => {
    for (const metric of allMetrics()) {
      if (metric.verified) {
        expect(metric.value, `${metric.id} is verified but has no value`).not.toBeNull();
        expect(metric.source, `${metric.id} is verified but cites no source`).toBeTruthy();
      }
    }
  });

  it('gives every unverified metric an editable placeholder', () => {
    for (const metric of allMetrics()) {
      if (!isRenderableMetric(metric)) {
        expect(metric.placeholder, `${metric.id} has no placeholder prompt`).toBeTruthy();
      }
    }
  });

  it('keeps non-public-safe metrics unrenderable regardless of verification', () => {
    const confidential = allMetrics().filter((metric) => !metric.publicSafe);
    for (const metric of confidential) {
      expect(isRenderableMetric(metric)).toBe(false);
    }
  });

  it('assigns every metric to one of the four measurement levels', () => {
    const levelIds = measurementLevels.map((level) => level.id);
    for (const metric of allMetrics()) {
      expect(levelIds).toContain(metric.level);
    }
  });

  it('keeps the walkthrough between eight and twelve minutes', () => {
    const total = sections.reduce((sum, section) => sum + section.minutes, 0);
    expect(total).toBeGreaterThanOrEqual(8);
    expect(total).toBeLessThanOrEqual(12);
  });

  it('exposes exactly the eight explore destinations', () => {
    const labels = sections
      .filter((section) => section.exploreLabel)
      .map((section) => section.exploreLabel);
    expect(labels).toEqual([
      'Executive Summary',
      'Experience Programs',
      'Pax8 Fit',
      'Scaling Challenges',
      '90-Day Approach',
      'Metrics',
      'Interview Discussion',
      'Contact',
    ]);
  });

  it('has a section entry for every case study, and vice versa', () => {
    const sectionIds = sections.map((section) => section.id);
    for (const study of caseStudies) {
      expect(sectionIds).toContain(study.id);
    }
  });

  it('describes exactly four primary pillars plus supporting case studies', () => {
    expect(caseStudies.filter((study) => study.tier === 'primary')).toHaveLength(4);
    expect(caseStudies.filter((study) => study.tier === 'supporting').length).toBeGreaterThan(0);
  });

  it('never claims Pax8 employment, delivery or MSP management', () => {
    const prose = [
      ...caseStudies.flatMap((study) => [
        study.situation,
        study.task,
        study.pax8Relevance,
        ...study.actions,
        ...study.resolutions,
      ]),
      hypotheticalProgram.purpose,
      hypotheticalProgram.disclaimer,
      ...scalingChallenges.map((challenge) => challenge.response),
    ].join(' ');

    // Claims of having worked at Pax8, in any of the usual phrasings.
    expect(prose).not.toMatch(/\bI\b[^.]*\b(?:worked|employed)\b[^.]*\b(?:at|for)\s+Pax8\b/i);
    expect(prose).not.toMatch(/\bmy (?:role|time|work|tenure)\s+(?:at|with)\s+Pax8\b/i);
    // Claims of having delivered the hypothetical programs.
    expect(prose).not.toMatch(/\bI\s+(?:managed|delivered|led|ran|built)\b[^.]*\bPax8\b/i);
    // Claims of direct MSP responsibility.
    expect(prose).not.toMatch(/\bI\b[^.]*\bmanaged\b[^.]*\bMSP\b/i);
  });

  it('states the limits of the experience explicitly', () => {
    expect(pax8Understanding.boundary).toMatch(/have not worked at Pax8/i);
    expect(pax8Understanding.boundary).toMatch(/have not managed MSP partners directly/i);
  });

  it('flags contact details that are still placeholders', () => {
    const placeholders = contactActions.filter((action) => action.isPlaceholder);
    expect(placeholders.length).toBeGreaterThan(0);
    for (const action of placeholders) {
      expect(action.href).toMatch(/REPLACE|resume\//i);
    }
  });

  it('ships in review mode by default so nothing unverified slips out silently', () => {
    expect(typeof siteConfig.showUnverifiedPlaceholders).toBe('boolean');
  });
});
