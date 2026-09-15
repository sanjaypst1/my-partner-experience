import { ArrowDown, Presentation } from 'lucide-react';
import { HeroVisual } from '@/components/three/HeroVisual';
import { Button } from '@/components/ui/Button';
import { ConfidentialityNotice } from '@/components/accessibility/ConfidentialityNotice';
import { useWalkthrough } from '@/hooks/useWalkthrough';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { formatRange } from '@/lib/format';
import { heroContent, person, sections } from '@/data/portfolio';

const totalMinutes = sections.reduce((total, section) => total + section.minutes, 0);

export function HeroSection() {
  const { start, goTo } = useWalkthrough();
  const containerRef = useRevealOnScroll<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
    >
      {/* The ecosystem occupies the right side on desktop so it never competes with the
          headline, and the full width behind the copy on smaller screens. */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full opacity-90 lg:w-[52%]">
        <HeroVisual />
      </div>
      {/* Readability scrims. Text contrast comes first; on desktop the gradient clears
          before the diagram starts so the ecosystem is not washed out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-midnight-950/90 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-midnight-950 from-40% to-transparent to-68% lg:block"
      />

      <div ref={containerRef} className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow" data-animate="pending">
            {person.name} · {person.location}
          </p>

          <h1 id="hero-heading" className="mt-5 text-fluid-hero" data-animate="pending">
            Building Partner Experiences{' '}
            <span className="bg-gradient-to-r from-signal-cyan via-signal-violet to-signal-magenta bg-clip-text text-transparent">
              That Scale
            </span>
          </h1>

          <p className="prose-readable mt-6" data-animate="pending">
            {heroContent.supportingLine}
          </p>

          <p
            className="mt-5 border-l-2 border-signal-cyan/50 pl-4 text-[0.95rem] text-slateMuted-100"
            data-animate="pending"
          >
            {person.role}
          </p>

          <p
            className="mt-6 font-display text-[1.05rem] leading-relaxed text-slateMuted-100"
            data-animate="pending"
          >
            “{person.coreStory}”
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3" data-animate="pending">
            <Button
              magnetic
              onClick={start}
              icon={<Presentation aria-hidden="true" className="h-4 w-4" />}
            >
              {heroContent.primaryCta}
            </Button>
            <Button
              variant="secondary"
              onClick={() => goTo('operating-model')}
              icon={<ArrowDown aria-hidden="true" className="h-4 w-4" />}
            >
              {heroContent.secondaryCta}
            </Button>
          </div>

          <p className="mt-3 text-[0.8rem] text-slateMuted-400" data-animate="pending">
            Guided walkthrough, {formatRange(totalMinutes)}. Or jump to any section from the
            navigation.
          </p>

          <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-animate="pending">
            {heroContent.summaryPoints.map((point) => (
              <div key={point.id} className="glass p-4">
                <dt className="font-display text-[0.95rem] font-semibold text-signal-cyan">
                  {point.label}
                </dt>
                <dd className="mt-1.5 text-[0.84rem] leading-relaxed text-slateMuted-300">
                  {point.detail}
                </dd>
              </div>
            ))}
          </dl>

          <p
            className="mt-8 max-w-2xl text-[0.92rem] leading-relaxed text-slateMuted-200"
            data-animate="pending"
          >
            {person.valueProposition}
          </p>

          <ConfidentialityNotice className="mt-8 max-w-2xl" />
        </div>
      </div>
    </section>
  );
}
