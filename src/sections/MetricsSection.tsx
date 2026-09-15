import { Suspense, lazy } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import { Section } from '@/components/layout/Section';
import { LazyVisible } from '@/components/ui/LazyVisible';
import { MetricEvidenceCard } from '@/components/charts/MetricEvidenceCard';
import { LoadBoundary } from '@/components/ui/LoadBoundary';
import {
  EVIDENCE_PENDING_LABEL,
  evidenceSummary,
  isRenderableMetric,
  measurementLevels,
  metricsByLevel,
} from '@/data/metrics';
import { caseStudies, siteConfig } from '@/data/portfolio';

// Recharts is the heaviest dependency on the page and sits well below the fold, so it
// loads only when this section approaches the viewport.
const EvidenceCoverageChart = lazy(() =>
  import('@/components/charts/EvidenceCoverageChart').then((module) => ({
    default: module.EvidenceCoverageChart,
  })),
);

const CHART_HEIGHT = 320;

/** Text equivalent of the chart, used if the Recharts chunk cannot be fetched. */
function EvidenceCoverageTable() {
  return (
    <table className="w-full text-left text-[0.85rem]">
      <caption className="pb-3 text-left text-[0.82rem] text-slateMuted-300">
        Metric evidence position by measurement level.
      </caption>
      <thead>
        <tr className="border-b border-white/10 text-[0.72rem] uppercase tracking-[0.14em] text-slateMuted-400">
          <th scope="col" className="py-2 font-medium">
            Measurement level
          </th>
          <th scope="col" className="py-2 font-medium">
            Confirmed
          </th>
          <th scope="col" className="py-2 font-medium">
            {EVIDENCE_PENDING_LABEL}
          </th>
        </tr>
      </thead>
      <tbody>
        {measurementLevels.map((level) => {
          const metrics = metricsByLevel(level.id);
          const confirmed = metrics.filter(isRenderableMetric).length;
          return (
            <tr key={level.id} className="border-b border-white/5 text-slateMuted-200">
              <th scope="row" className="py-2 font-normal">
                {level.title}
              </th>
              <td className="py-2">{confirmed}</td>
              <td className="py-2">{metrics.length - confirmed}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function MetricsSection() {
  const summary = evidenceSummary();

  return (
    <Section
      id="metrics"
      eyebrow="Section 13 — Metrics and evidence"
      title="A measurement framework, not a wall of numbers"
      lead={
        <p>
          I would rather show you how I measure than show you numbers you cannot check. Confirmed,
          shareable figures appear here as they are validated; everything else is labelled{' '}
          <span className="text-slateMuted-100">“{EVIDENCE_PENDING_LABEL}”</span>. Nothing on this
          site is estimated to look better.
        </p>
      }
    >
      <div className="space-y-12">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {measurementLevels.map((level) => {
            const tokens = accent(level.accent);
            return (
              <li
                key={level.id}
                data-animate="pending"
                className={cn('flex h-full flex-col rounded-xl2 border p-5', tokens.border, tokens.bg)}
              >
                <p className={cn('font-mono text-[0.68rem] uppercase tracking-[0.18em]', tokens.text)}>
                  Level {level.index}
                </p>
                <h3 className="mt-2 font-display text-[1.05rem] font-semibold text-slateMuted-100">
                  {level.title}
                </h3>
                <p className="mt-1.5 text-[0.85rem] italic text-slateMuted-300">{level.question}</p>
                <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                  {level.indicators.map((indicator) => (
                    <li key={indicator} className="text-[0.84rem] text-slateMuted-200">
                      {indicator}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]" data-animate="pending">
          <div className="glass p-5">
            <LazyVisible minHeight={CHART_HEIGHT} label="Loading evidence chart…">
              <Suspense
                fallback={
                  <div
                    role="status"
                    aria-busy="true"
                    className="grid place-items-center text-[0.82rem] text-slateMuted-400"
                    style={{ minHeight: CHART_HEIGHT }}
                  >
                    Loading evidence chart…
                  </div>
                }
              >
                <LoadBoundary label="evidence chart" fallback={<EvidenceCoverageTable />}>
                  <EvidenceCoverageChart />
                </LoadBoundary>
              </Suspense>
            </LazyVisible>
          </div>
          <aside className="glass p-5">
            <h3 className="text-fluid-h3">Where the evidence stands</h3>
            <dl className="mt-4 space-y-3">
              <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                <dt className="text-[0.88rem] text-slateMuted-300">Metrics tracked</dt>
                <dd className="font-display text-[1.4rem] text-slateMuted-100">{summary.total}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                <dt className="text-[0.88rem] text-slateMuted-300">Confirmed and shareable</dt>
                <dd className="font-display text-[1.4rem] text-signal-cyan">{summary.verified}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[0.88rem] text-slateMuted-300">{EVIDENCE_PENDING_LABEL}</dt>
                <dd className="font-display text-[1.4rem] text-slateMuted-200">{summary.pending}</dd>
              </div>
            </dl>
            <p className="mt-5 text-[0.84rem] leading-relaxed text-slateMuted-400">
              Some figures exist but sit under confidentiality restrictions. Those are marked
              non-shareable in the data file and are never printed, even in review mode. I am happy to
              talk through them in an interview.
            </p>
          </aside>
        </div>

        <div className="space-y-8">
          <h3 className="text-fluid-h3" data-animate="pending">
            Evidence by case study
          </h3>
          {caseStudies.map((study) => {
            const visible = study.metrics.filter(
              (metric) => isRenderableMetric(metric) || siteConfig.showUnverifiedPlaceholders,
            );
            if (visible.length === 0) return null;
            return (
              <div key={study.id} data-animate="pending">
                <h4 className="font-display text-[1.05rem] font-semibold text-slateMuted-100">
                  {study.employer}
                  {study.programName ? ` · ${study.programName}` : ''}
                </h4>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {visible.map((metric) => (
                    <li key={metric.id}>
                      <MetricEvidenceCard metric={metric} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
