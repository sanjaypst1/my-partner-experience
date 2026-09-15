import { useState } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import { operatingModelPillars } from '@/data/portfolio';
import { useWalkthrough } from '@/hooks/useWalkthrough';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { SectionId } from '@/types/portfolio';

const detailBlocks = [
  { key: 'businessProblem', label: 'The business problem' },
  { key: 'myResponsibility', label: 'My responsibility' },
  { key: 'resolution', label: 'Resolution' },
] as const;

const listBlocks = [
  { key: 'actions', label: 'Actions taken' },
  { key: 'challenges', label: 'Challenges encountered' },
  { key: 'reusableOutputs', label: 'Reusable outputs' },
  { key: 'measuresOfSuccess', label: 'Measures of success' },
] as const;

/**
 * The four pillars as one connected model. Selecting a pillar reveals the full
 * problem-to-relevance story without leaving the section.
 */
export function OperatingModelPillars() {
  const [activeId, setActiveId] = useState(operatingModelPillars[0].id);
  const active = operatingModelPillars.find((pillar) => pillar.id === activeId) ?? operatingModelPillars[0];
  const tokens = accent(active.accent);
  const { goTo } = useWalkthrough();

  return (
    <div className="space-y-6">
      <ul
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        role="tablist"
        aria-label="Operating model pillars"
      >
        {operatingModelPillars.map((pillar, pillarIndex) => {
          const pillarTokens = accent(pillar.accent);
          const isActive = pillar.id === activeId;
          return (
            <li key={pillar.id} role="presentation">
              <button
                role="tab"
                type="button"
                id={`pillar-tab-${pillar.id}`}
                aria-selected={isActive}
                aria-controls="pillar-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(pillar.id)}
                onKeyDown={(event) => {
                  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
                  event.preventDefault();
                  const delta = event.key === 'ArrowRight' ? 1 : -1;
                  const nextIndex =
                    (pillarIndex + delta + operatingModelPillars.length) % operatingModelPillars.length;
                  setActiveId(operatingModelPillars[nextIndex].id);
                  document.getElementById(`pillar-tab-${operatingModelPillars[nextIndex].id}`)?.focus();
                }}
                className={cn(
                  'h-full w-full rounded-xl2 border p-4 text-left transition-all duration-300 ease-expressive',
                  isActive
                    ? cn('bg-slateMuted-100/[0.06]', pillarTokens.border)
                    : 'border-slateMuted-100/12 bg-slateMuted-100/[0.025] hover:border-slateMuted-100/25',
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[0.66rem] uppercase tracking-[0.18em]',
                    isActive ? pillarTokens.text : 'text-slateMuted-500',
                  )}
                >
                  {pillar.keyword}
                </span>
                <span className="mt-1.5 block font-display text-[1.02rem] font-semibold text-slateMuted-100">
                  {pillar.employer}
                </span>
                <span className="mt-1 block text-[0.84rem] leading-relaxed text-slateMuted-300">
                  {pillar.promise}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        role="tabpanel"
        id="pillar-panel"
        aria-labelledby={`pillar-tab-${active.id}`}
        className={cn('rounded-xl3 border p-5 sm:p-7', tokens.border, tokens.bg)}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge accentKey={active.accent}>{active.keyword}</Badge>
            <h3 className="mt-3 text-fluid-h3">
              {active.employer}: {active.promise}
            </h3>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => goTo(active.caseStudyId as SectionId)}
          >
            Read the full case study
          </Button>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {detailBlocks.map((block) => (
            <div key={block.key}>
              <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slateMuted-500">
                {block.label}
              </h4>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-slateMuted-200">
                {active[block.key]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {listBlocks.map((block) => (
            <div key={block.key}>
              <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slateMuted-500">
                {block.label}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {active[block.key].map((item) => (
                  <li key={item} className="flex gap-2 text-[0.86rem] leading-relaxed text-slateMuted-300">
                    <span
                      aria-hidden="true"
                      className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', tokens.bgSolid)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7 border-t border-slateMuted-100/10 pt-5">
          <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slateMuted-500">
            Relevance to Pax8
          </h4>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-slateMuted-100">
            {active.pax8Relevance}
          </p>
        </div>
      </div>
    </div>
  );
}
