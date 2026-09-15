import { useState } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import { compassDirections } from '@/data/portfolio';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';

/**
 * The Compass motif: four directions a program has to hold at once. Selecting a
 * direction explains what it means in practice.
 *
 * Colours are intentionally vivid for this diagram so it stays readable on the
 * light Apple-like canvas.
 */
export function CompassDial() {
  const [activeId, setActiveId] = useState(compassDirections[0].id);
  const active = compassDirections.find((direction) => direction.id === activeId) ?? compassDirections[0];

  const description = `A compass with four directions. ${compassDirections
    .map((direction) => `${direction.heading} means ${direction.subject}: ${direction.detail}`)
    .join(' ')}`;

  const positions = [
    'top-3 left-1/2 -translate-x-1/2',
    'right-3 top-1/2 -translate-y-1/2',
    'bottom-3 left-1/2 -translate-x-1/2',
    'left-3 top-1/2 -translate-y-1/2',
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
      <FigureWithDescription title="The Compass model" description={description}>
        <div className="relative mx-auto aspect-square w-full max-w-sm rounded-[2rem] bg-gradient-to-br from-[#dff3ff] via-[#f3e8ff] to-[#ffe4f3] p-4 shadow-glass">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-full border-2 border-[#0071e3]/40 bg-white/70" />
            <div className="absolute inset-[12%] rounded-full border-2 border-[#7c3aed]/35 bg-white/50" />
            <div className="absolute inset-[30%] rounded-full border-2 border-dashed border-[#e11d8c]/40" />
            <div
              className={cn(
                'absolute inset-[42%] rounded-full shadow-glow bg-gradient-to-br',
                accent(active.accent).gradient,
              )}
              style={{ opacity: 0.95 }}
            />

            {compassDirections.map((direction, directionIndex) => {
              const tokens = accent(direction.accent);
              const isActive = direction.id === activeId;
              return (
                <button
                  key={direction.id}
                  type="button"
                  onClick={() => setActiveId(direction.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'absolute flex min-w-[7.5rem] flex-col items-center gap-0.5 rounded-xl border-2 px-3 py-2 text-center shadow-sm transition-all duration-300',
                    positions[directionIndex],
                    isActive
                      ? cn('bg-white shadow-glow', tokens.border, tokens.text)
                      : 'border-white/80 bg-white/90 text-slateMuted-200 hover:border-signal-cyan/50 hover:text-slateMuted-100',
                  )}
                >
                  <span className="font-display text-[0.9rem] font-semibold">{direction.heading}</span>
                  <span className="text-[0.7rem] leading-tight text-slateMuted-300">{direction.subject}</span>
                </button>
              );
            })}
          </div>
        </div>
      </FigureWithDescription>

      <div aria-live="polite" className="glass p-5">
        <p className={cn('eyebrow', accent(active.accent).text)}>{active.heading}</p>
        <h3 className="mt-2 text-fluid-h3">{active.subject}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-slateMuted-300">{active.detail}</p>
        <ul className="mt-5 space-y-2 border-t border-slateMuted-100/10 pt-4">
          {compassDirections.map((direction) => (
            <li key={direction.id} className="flex gap-3 text-[0.85rem]">
              <span className="w-24 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-slateMuted-500">
                {direction.heading}
              </span>
              <span className="text-slateMuted-300">{direction.subject}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
