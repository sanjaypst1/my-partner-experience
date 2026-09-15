import { TriangleAlert } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { PartnerJourney } from '@/components/storytelling/PartnerJourney';
import { problemContent } from '@/data/portfolio';

export function ProblemSection() {
  return (
    <Section
      id="partner-experience-problem"
      eyebrow={problemContent.eyebrow}
      title={problemContent.title}
      lead={<p>{problemContent.intro}</p>}
    >
      <div className="space-y-12">
        <blockquote
          data-animate="pending"
          className="glass-strong border-l-2 border-l-signal-cyan p-6 sm:p-8"
        >
          <p className="font-display text-fluid-h3 text-slateMuted-100">
            “{problemContent.keyMessage}”
          </p>
        </blockquote>

        <div data-animate="pending">
          <h3 className="text-fluid-h3">The operating chain</h3>
          <p className="prose-readable mt-3">
            Each stage below sits with a different function. My job is the joins between them.
          </p>
          <div className="mt-6">
            <PartnerJourney />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3" data-animate="pending">
          <div className="glass p-5 lg:col-span-1">
            <h3 className="text-fluid-h3">{problemContent.distinction.title}</h3>
          </div>
          <div className="glass p-5">
            <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-cyan">
              Partner Experience
            </h4>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-slateMuted-200">
              {problemContent.distinction.experience}
            </p>
          </div>
          <div className="glass p-5">
            <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-magenta">
              Partner Success
            </h4>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-slateMuted-200">
              {problemContent.distinction.success}
            </p>
          </div>
          <p className="prose-readable lg:col-span-3">{problemContent.distinction.why}</p>
        </div>

        <div data-animate="pending">
          <h3 className="text-fluid-h3">What makes this hard</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {problemContent.challenges.map((challenge) => (
              <li
                key={challenge}
                className="flex items-start gap-2.5 rounded-xl2 border border-white/10 bg-white/[0.025] p-4 text-[0.88rem] text-slateMuted-200"
              >
                <TriangleAlert
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-signal-amber"
                />
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
