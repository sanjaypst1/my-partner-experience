import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import { EASE, ScrollTrigger, getGsap } from '@/lib/gsap';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';
import type { AccentKey, RoadmapPhase } from '@/types/portfolio';

/**
 * A horizontal roadmap whose track draws itself as the section arrives. Used for both
 * the reusable program architecture and the hypothetical Pax8 roadmap.
 */
export function ProgramRoadmap({
  phases,
  accentKey = 'cyan',
  title,
  numbered = true,
}: {
  phases: RoadmapPhase[];
  accentKey?: AccentKey;
  title: string;
  numbered?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLSpanElement | null>(null);
  const { motionEnabled } = useMotionPreference();
  const tokens = accent(accentKey);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    if (!motionEnabled) {
      track.style.transform = 'scaleX(1)';
      return;
    }

    const gsap = getGsap();
    const context = gsap.context(() => {
      gsap.fromTo(
        track,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: EASE,
          scrollTrigger: { trigger: container, start: 'top 75%', once: true },
        },
      );
    }, container);

    return () => {
      context.revert();
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.trigger === container)
        .forEach((trigger) => trigger.kill());
    };
  }, [motionEnabled]);

  const description = `${title}: ${phases
    .map((phase, index) => `${index + 1}. ${phase.label} — ${phase.detail}`)
    .join(' ')}`;

  return (
    <FigureWithDescription title={title} description={description}>
      <div ref={containerRef} className="relative">
        <div className="relative mb-6 h-px w-full bg-slateMuted-100/8">
          <span
            ref={trackRef}
            className={cn('absolute inset-0 origin-left bg-gradient-to-r', tokens.gradient)}
          />
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {phases.map((phase, phaseIndex) => (
            <li key={phase.id} className="glass h-full p-4" data-animate="pending">
              <div className="flex items-center gap-2">
                {numbered ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid h-6 w-6 place-items-center rounded-full border font-mono text-[0.66rem]',
                      tokens.border,
                      tokens.text,
                    )}
                  >
                    {phaseIndex + 1}
                  </span>
                ) : null}
                <h4 className="text-[0.92rem] font-semibold text-slateMuted-100">{phase.label}</h4>
              </div>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-slateMuted-300">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </FigureWithDescription>
  );
}
