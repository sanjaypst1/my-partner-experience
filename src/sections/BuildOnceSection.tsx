import { Lock, SlidersHorizontal } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { ProgramRoadmap } from '@/components/storytelling/ProgramRoadmap';
import { ScalingComparison } from '@/components/storytelling/ScalingComparison';
import { buildOnceContent, person } from '@/data/portfolio';

export function BuildOnceSection() {
  return (
    <Section
      id="build-once"
      eyebrow={buildOnceContent.eyebrow}
      title={buildOnceContent.headline}
      lead={<p>{buildOnceContent.intro}</p>}
    >
      <div className="space-y-14">
        <div data-animate="pending">
          <ProgramRoadmap
            title="Reusable program architecture"
            phases={[...buildOnceContent.phases]}
            accentKey="cyan"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div
            data-animate="pending"
            className="rounded-xl3 border border-signal-cyan/35 bg-signal-cyan/[0.05] p-5 sm:p-6"
          >
            <p className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-cyan">
              <Lock aria-hidden="true" className="h-4 w-4" />
              Standardised core
            </p>
            <p className="mt-2 text-[0.85rem] text-slateMuted-300">
              Changed only by decision, never by convenience. This is what makes results comparable
              across regions.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {buildOnceContent.standardisedCore.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/12 bg-midnight-900/50 px-3 py-2 text-[0.86rem] text-slateMuted-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-animate="pending"
            className="rounded-xl3 border border-signal-magenta/35 bg-signal-magenta/[0.05] p-5 sm:p-6"
          >
            <p className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-magenta">
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              Configurable edges
            </p>
            <p className="mt-2 text-[0.85rem] text-slateMuted-300">
              Expected to differ by market, with a named owner for each variation so adaptation never
              becomes an unmanaged fork.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {buildOnceContent.configurableEdges.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/12 bg-midnight-900/50 px-3 py-2 text-[0.86rem] text-slateMuted-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-fluid-h3" data-animate="pending">
            Three ways to scale, one that works
          </h3>
          <p className="prose-readable mt-3" data-animate="pending">
            {person.coreStory}
          </p>
          <div className="mt-6">
            <ScalingComparison />
          </div>
        </div>
      </div>
    </Section>
  );
}
