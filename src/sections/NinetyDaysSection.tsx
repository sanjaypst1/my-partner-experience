import { CircleDot } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import { Section } from '@/components/layout/Section';
import { ninetyDayPhases } from '@/data/pax8Alignment';

export function NinetyDaysSection() {
  const [activeId, setActiveId] = useState(ninetyDayPhases[0].id);
  const active = ninetyDayPhases.find((phase) => phase.id === activeId) ?? ninetyDayPhases[0];

  return (
    <Section
      id="ninety-days"
      eyebrow="Section 12 — How I would deliver the role"
      title="The first ninety days"
      lead={
        <p>
          Understand before changing, align before improving, then show value on something live. The
          sequence matters more than the speed.
        </p>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <ol className="space-y-3" data-animate="pending">
          {ninetyDayPhases.map((phase, phaseIndex) => {
            const tokens = accent(phase.accent);
            const isActive = phase.id === activeId;
            return (
              <li key={phase.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(phase.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'w-full rounded-xl2 border p-4 text-left transition-colors duration-300',
                    isActive
                      ? cn('bg-slateMuted-100/[0.06]', tokens.border)
                      : 'border-slateMuted-100/12 bg-slateMuted-100/[0.025] hover:border-slateMuted-100/25',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[0.68rem] uppercase tracking-[0.16em]',
                      isActive ? tokens.text : 'text-slateMuted-500',
                    )}
                  >
                    Phase {phaseIndex + 1} · {phase.window}
                  </span>
                  <span className="mt-1.5 block font-display text-[1.05rem] font-semibold text-slateMuted-100">
                    {phase.title}
                  </span>
                  <span className="mt-1 block text-[0.85rem] leading-relaxed text-slateMuted-300">
                    {phase.intent}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div
          aria-live="polite"
          data-animate="pending"
          className={cn('rounded-xl3 border p-5 sm:p-7', accent(active.accent).border, accent(active.accent).bg)}
        >
          <p className={cn('eyebrow', accent(active.accent).text)}>{active.window}</p>
          <h3 className="mt-2 text-fluid-h3">{active.title}</h3>
          <p className="mt-2 text-[0.95rem] text-slateMuted-200">{active.intent}</p>
          <ul className="mt-6 space-y-2.5">
            {active.activities.map((activity) => (
              <li key={activity} className="flex gap-3 text-[0.92rem] leading-relaxed text-slateMuted-100">
                <CircleDot
                  aria-hidden="true"
                  className={cn('mt-1 h-4 w-4 shrink-0', accent(active.accent).text)}
                />
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
