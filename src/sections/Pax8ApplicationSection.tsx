import { Section } from '@/components/layout/Section';
import { HypotheticalFrame } from '@/components/storytelling/HypotheticalFrame';
import { ProgramRoadmap } from '@/components/storytelling/ProgramRoadmap';
import { HYPOTHETICAL_LABEL, hypotheticalProgram, pax8Understanding } from '@/data/pax8Alignment';

const listBlocks = [
  { key: 'partnerAudiences', label: 'Potential partner audiences' },
  { key: 'stakeholders', label: 'Potential stakeholders to coordinate' },
  { key: 'outputs', label: 'Potential program outputs' },
  { key: 'technologyThemes', label: 'Potential technology themes' },
] as const;

export function Pax8ApplicationSection() {
  return (
    <Section
      id="pax8-application"
      eyebrow="Section 10 — Pax8 ecosystem application"
      title={HYPOTHETICAL_LABEL}
      lead={
        <p>
          Everything in this section is illustrative. It exists to show how I would structure a
          program in your ecosystem, not to suggest I have run one.
        </p>
      }
    >
      <div className="space-y-10">
        <div className="grid gap-4 lg:grid-cols-3" data-animate="pending">
          <div className="glass p-5">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-cyan">
              What I understand about the ecosystem
            </h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-slateMuted-200">
              {pax8Understanding.ecosystem}
            </p>
          </div>
          <div className="glass p-5">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-violet">
              What that implies for the work
            </h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-slateMuted-200">
              {pax8Understanding.implication}
            </p>
          </div>
          <div className="glass p-5">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-amber">
              Where my experience stops
            </h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-slateMuted-200">
              {pax8Understanding.boundary}
            </p>
          </div>
        </div>

        <div data-animate="pending">
          <HypotheticalFrame note={hypotheticalProgram.disclaimer}>
            <div className="space-y-8">
              <div>
                <h3 className="text-fluid-h3">{hypotheticalProgram.name}</h3>
                <p className="prose-readable mt-3">{hypotheticalProgram.purpose}</p>
              </div>

              <ProgramRoadmap
                title={`Illustrative ten-step roadmap for the ${hypotheticalProgram.name}`}
                phases={hypotheticalProgram.roadmap}
                accentKey="violet"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                {listBlocks.map((block) => (
                  <div key={block.key} className="glass p-5">
                    <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slateMuted-400">
                      {block.label}
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {hypotheticalProgram[block.key].map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[0.82rem] text-slateMuted-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-[0.82rem] text-slateMuted-400">
                These lists are illustrative options, not a confirmed project roadmap, backlog or
                commitment for Pax8.
              </p>
            </div>
          </HypotheticalFrame>
        </div>
      </div>
    </Section>
  );
}
