import { CaseStudySection } from '@/components/case-studies/CaseStudySection';
import { Pax8TranslationToggle } from '@/components/case-studies/Pax8TranslationToggle';
import { RegionalScaleMap } from '@/components/storytelling/RegionalScaleMap';
import { CompassDial } from '@/components/storytelling/CompassDial';
import { BenefitsChain } from '@/components/storytelling/BenefitsChain';
import { ContentLifecycle } from '@/components/storytelling/ContentLifecycle';
import { caseStudies } from '@/data/portfolio';

function studyById(id: string) {
  const study = caseStudies.find((candidate) => candidate.id === id);
  if (!study) throw new Error(`Case study "${id}" is missing from src/data/portfolio.ts`);
  return study;
}

export function DaimlerSection() {
  return (
    <CaseStudySection
      study={studyById('daimler')}
      visual={
        <div className="space-y-4">
          <h3 className="text-fluid-h3">The same chain, in Pax8 terms</h3>
          <p className="prose-readable">
            The structure I worked in maps onto the Pax8 ecosystem cleanly. Switch the labels to see
            it — the Pax8 view is illustrative, not work I have delivered.
          </p>
          <Pax8TranslationToggle />
        </div>
      }
    />
  );
}

export function UbsSection() {
  return (
    <CaseStudySection
      study={studyById('ubs')}
      visual={
        <div className="space-y-4">
          <h3 className="text-fluid-h3">Wave-based rollout</h3>
          <p className="prose-readable">
            Regions do not become ready at the same time, and pretending otherwise is how a global
            date slips for everybody. Waves let the readiest market prove the package first.
          </p>
          <RegionalScaleMap />
        </div>
      }
    />
  );
}

export function NabCompassSection() {
  return (
    <CaseStudySection
      study={studyById('nab-compass')}
      visual={
        <div className="space-y-4">
          <h3 className="text-fluid-h3">Four directions a program has to hold at once</h3>
          <CompassDial />
        </div>
      }
      extra={
        <div className="space-y-4">
          <h3 className="text-fluid-h3">Launch is the middle of the story</h3>
          <p className="prose-readable">
            Implementation completing is not the benefit. This is the chain I measure along, and the
            reason measurement continues after go-live.
          </p>
          <BenefitsChain />
        </div>
      }
    />
  );
}

export function MerckCornerstoneSection() {
  return (
    <CaseStudySection
      study={studyById('merck-cornerstone')}
      visual={
        <div className="space-y-4">
          <h3 className="text-fluid-h3">The asset lifecycle</h3>
          <p className="prose-readable">
            Select a stage to see who is accountable for it. Clear ownership at each step is what
            removes duplicate reviews and version confusion.
          </p>
          <ContentLifecycle />
        </div>
      }
      extra={
        <blockquote className="glass-strong border-l-2 border-l-signal-magenta p-6">
          <p className="font-display text-fluid-h3 text-slateMuted-100">
            “I bring Merck’s quality discipline without importing pharmaceutical-level bureaucracy
            into a fast-moving technology environment.”
          </p>
        </blockquote>
      }
    />
  );
}

export function BankOfAmericaSection() {
  return <CaseStudySection study={studyById('bank-of-america')} />;
}
