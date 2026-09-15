import { cn } from '@/lib/cn';
import { formatMetricValue } from '@/lib/format';
import { EVIDENCE_PENDING_LABEL, METRIC_TO_VERIFY_LABEL, isRenderableMetric } from '@/data/metrics';
import { siteConfig } from '@/data/portfolio';
import { useCountUp } from '@/hooks/useCountUp';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { VerifyPrompt } from '@/components/ui/VerifyPrompt';
import type { Metric } from '@/types/portfolio';

/**
 * The only component that renders a metric.
 *
 * - Verified and public-safe → the value, with a counter for numbers.
 * - Otherwise, review mode  → the category, the explanation and the editable prompt.
 * - Otherwise, production   → nothing at all.
 *
 * A fabricated figure cannot reach the screen through this component.
 */
export function MetricEvidenceCard({ metric, className }: { metric: Metric; className?: string }) {
  const renderable = isRenderableMetric(metric);

  if (!renderable && !siteConfig.showUnverifiedPlaceholders) return null;

  return (
    <div
      data-testid={`metric-${metric.id}`}
      data-verified={renderable ? 'true' : 'false'}
      className={cn(
        'flex h-full flex-col gap-2 rounded-xl2 border p-4',
        renderable
          ? 'border-signal-cyan/35 bg-signal-cyan/[0.05]'
          : 'border-white/12 bg-white/[0.025]',
        className,
      )}
    >
      <p className="text-[0.82rem] font-semibold text-slateMuted-100">{metric.label}</p>

      {renderable ? (
        <MetricValue metric={metric} />
      ) : (
        <p className="font-mono text-[0.8rem] uppercase tracking-[0.12em] text-slateMuted-400">
          {EVIDENCE_PENDING_LABEL}
        </p>
      )}

      <p className="text-[0.8rem] leading-relaxed text-slateMuted-400">{metric.explanation}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <VerificationBadge verified={renderable} />
        {!renderable && metric.placeholder ? (
          <VerifyPrompt token={metric.placeholder} srPrefix={`${METRIC_TO_VERIFY_LABEL}:`} />
        ) : null}
        {renderable && metric.source ? (
          <span className="text-[0.72rem] text-slateMuted-500">Source: {metric.source}</span>
        ) : null}
      </div>
    </div>
  );
}

/** Counts up only for verified numeric values. */
function MetricValue({ metric }: { metric: Metric }) {
  const numeric = typeof metric.value === 'number' ? metric.value : null;
  const { ref, value } = useCountUp(numeric ?? 0);

  if (numeric !== null && metric.countable) {
    return (
      <p className="font-display text-[2rem] leading-none text-slateMuted-100">
        <span ref={ref}>{value.toLocaleString('en-AU')}</span>
        {metric.unit ? <span className="ml-1 text-[1.1rem] text-signal-cyan">{metric.unit}</span> : null}
      </p>
    );
  }

  return (
    <p className="font-display text-[1.6rem] leading-tight text-slateMuted-100">
      {formatMetricValue(metric.value, metric.unit)}
    </p>
  );
}
