import type { ReactNode } from 'react';
import { Target } from 'lucide-react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import { Section } from '@/components/layout/Section';
import { StarStory } from './StarStory';
import { Badge, Tag } from '@/components/ui/Badge';
import { VerifiableText, VerifyPrompt } from '@/components/ui/VerifyPrompt';
import { MetricEvidenceCard } from '@/components/charts/MetricEvidenceCard';
import { ConfidentialityNotice } from '@/components/accessibility/ConfidentialityNotice';
import { isHiddenField, showOpenVerifications } from '@/lib/verification';
import { isRenderableMetric } from '@/data/metrics';
import { siteConfig } from '@/data/portfolio';
import type { CaseStudy, SectionId } from '@/types/portfolio';

/**
 * One layout for every case study, driven entirely by the data file: header facts,
 * STAR detail, an optional visual, results (verified only), and the Pax8 read-across.
 */
export function CaseStudySection({
  study,
  visual,
  extra,
}: {
  study: CaseStudy;
  visual?: ReactNode;
  extra?: ReactNode;
}) {
  const tokens = accent(study.accent);
  const anyMetricRenderable = study.metrics.some(isRenderableMetric);
  // In production mode an unverified metric leaves no trace — not even an empty card.
  const visibleMetrics = study.metrics.filter(
    (metric) => isRenderableMetric(metric) || siteConfig.showUnverifiedPlaceholders,
  );

  return (
    <Section
      id={study.id as SectionId}
      eyebrow={study.eyebrow}
      title={study.title}
      lead={
        <p>
          <span className="font-semibold text-slateMuted-100">Capability demonstrated: </span>
          {study.capabilityDemonstrated}
        </p>
      }
      aside={
        <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem]" data-animate="pending">
          <div className="flex items-center gap-2">
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slateMuted-500">
              Organisation
            </dt>
            <dd className="text-slateMuted-100">{study.employer}</dd>
          </div>
          {study.programName ? (
            <div className="flex items-center gap-2">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slateMuted-500">
                Program
              </dt>
              <dd className="text-slateMuted-100">{study.programName}</dd>
            </div>
          ) : null}
          {!isHiddenField(study.role) ? (
            <div className="flex items-center gap-2">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slateMuted-500">
                Role
              </dt>
              <dd>
                <VerifiableText field={study.role} className="text-slateMuted-100" />
              </dd>
            </div>
          ) : null}
          {!isHiddenField(study.timeframe) ? (
            <div className="flex items-center gap-2">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slateMuted-500">
                Timeframe
              </dt>
              <dd>
                <VerifiableText field={study.timeframe} className="text-slateMuted-100" />
              </dd>
            </div>
          ) : null}
        </dl>
      }
    >
      <div className="space-y-10">
        <div className="flex flex-wrap gap-2" data-animate="pending">
          {study.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div data-animate="pending">
          <StarStory study={study} accentKey={study.accent} />
        </div>

        {visual ? <div data-animate="pending">{visual}</div> : null}
        {extra ? <div data-animate="pending">{extra}</div> : null}

        {/* Result */}
        <div data-animate="pending">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-fluid-h3">Result</h3>
            {!anyMetricRenderable ? (
              <p className="text-[0.82rem] text-slateMuted-400">
                Measurement categories are shown below. Figures appear here once they are confirmed
                and cleared for sharing.
              </p>
            ) : null}
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleMetrics.map((metric) => (
              <li key={metric.id} className="h-full">
                <MetricEvidenceCard metric={metric} />
              </li>
            ))}
          </ul>

          <ul className="mt-5 space-y-2">
            {study.successMeasures.map((measure) => (
              <li key={measure} className="flex gap-2.5 text-[0.88rem] text-slateMuted-300">
                <Target aria-hidden="true" className={cn('mt-1 h-3.5 w-3.5 shrink-0', tokens.text)} />
                {measure}
              </li>
            ))}
          </ul>
        </div>

        {/* Pax8 relevance */}
        <div
          data-animate="pending"
          className={cn('rounded-xl2 border p-5 sm:p-6', tokens.border, tokens.bg)}
        >
          <Badge accentKey={study.accent}>Relevance to Pax8</Badge>
          <p className="prose-readable mt-3 text-slateMuted-100">{study.pax8Relevance}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2" data-animate="pending">
          <ConfidentialityNotice variant="card" />
          <aside className="glass p-4">
            <p className="text-[0.85rem] font-semibold text-slateMuted-100">
              What this case study excludes
            </p>
            <p className="mt-1.5 text-[0.82rem] text-slateMuted-400">{study.confidentialityNote}</p>
          </aside>
        </div>

        {/* Review-mode checklist: disappears entirely in production mode. */}
        {showOpenVerifications() && study.openVerifications.length > 0 ? (
          <aside
            data-testid={`open-verifications-${study.id}`}
            className="rounded-xl2 border border-dashed border-signal-amber/40 bg-signal-amber/[0.05] p-5"
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-amber">
              Before sharing · confirm these details
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {study.openVerifications.map((item) => (
                <li key={item}>
                  <VerifyPrompt token={item} />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.78rem] text-slateMuted-400">
              This panel is only visible while{' '}
              <code className="font-mono text-slateMuted-300">showUnverifiedPlaceholders</code> is{' '}
              {String(siteConfig.showUnverifiedPlaceholders)} in{' '}
              <code className="font-mono text-slateMuted-300">src/data/portfolio.ts</code>.
            </p>
          </aside>
        ) : null}
      </div>
    </Section>
  );
}
