import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/cn';
import { contentLifecycleStages } from '@/data/portfolio';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';

/**
 * Brief → Develop → Review → Approve → Pilot → Release → Reuse → Measure → Improve.
 * The loop back to Brief is the whole point: assets are maintained, not abandoned.
 */
export function ContentLifecycle() {
  const [activeId, setActiveId] = useState(contentLifecycleStages[0].id);
  const active =
    contentLifecycleStages.find((stage) => stage.id === activeId) ?? contentLifecycleStages[0];

  const description = `A nine-stage content lifecycle that loops back on itself: ${contentLifecycleStages
    .map((stage) => `${stage.label}, owned by ${stage.ownerRole} — ${stage.detail}`)
    .join(' ')}`;

  return (
    <div className="space-y-5">
      <FigureWithDescription title="Content and asset lifecycle" description={description}>
        <ol className="flex flex-wrap items-stretch gap-2">
          {contentLifecycleStages.map((stage, stageIndex) => {
            const isActive = stage.id === activeId;
            return (
              <li key={stage.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveId(stage.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'touch-target rounded-xl border px-3.5 py-2 text-left transition-colors duration-300',
                    isActive
                      ? 'border-signal-magenta/50 bg-signal-magenta/10 text-slateMuted-100'
                      : 'border-slateMuted-100/12 bg-slateMuted-100/[0.03] text-slateMuted-300 hover:text-slateMuted-100',
                  )}
                >
                  <span className="block font-mono text-[0.64rem] uppercase tracking-[0.14em] text-slateMuted-500">
                    {String(stageIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="block text-[0.88rem] font-semibold">{stage.label}</span>
                </button>
                {stageIndex < contentLifecycleStages.length - 1 ? (
                  <ArrowRight aria-hidden="true" className="hidden h-3.5 w-3.5 text-slateMuted-500 sm:block" />
                ) : (
                  <span className="hidden items-center gap-1 text-[0.7rem] text-slateMuted-500 sm:flex">
                    <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                    back to Brief
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </FigureWithDescription>

      <div aria-live="polite" className="glass p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-fluid-h3">{active.label}</h3>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-magenta">
            Accountable: {active.ownerRole}
          </p>
        </div>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-slateMuted-300">{active.detail}</p>
      </div>
    </div>
  );
}
