import { MotionProvider } from '@/components/accessibility/MotionProvider';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { WalkthroughProvider } from '@/components/storytelling/WalkthroughProvider';
import { GuidedWalkthrough } from '@/components/storytelling/GuidedWalkthrough';
import { Backdrop } from '@/components/layout/Backdrop';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemSection } from '@/sections/ProblemSection';
import { OperatingModelSection } from '@/sections/OperatingModelSection';
import {
  BankOfAmericaSection,
  DaimlerSection,
  MerckCornerstoneSection,
  NabCompassSection,
  UbsSection,
} from '@/sections/CaseStudySections';
import { BuildOnceSection } from '@/sections/BuildOnceSection';
import { Pax8ApplicationSection } from '@/sections/Pax8ApplicationSection';
import { ScalingChallengesSection } from '@/sections/ScalingChallengesSection';
import { NinetyDaysSection } from '@/sections/NinetyDaysSection';
import { MetricsSection } from '@/sections/MetricsSection';
import { ConversationSection } from '@/sections/ConversationSection';
import { ClosingSection } from '@/sections/ClosingSection';

/**
 * Section order is the narrative order and matches `sections` in src/data/portfolio.ts,
 * which drives the walkthrough. Keep the two in step when adding a section.
 */
export default function App() {
  return (
    <MotionProvider>
      <WalkthroughProvider>
        <div className="grain relative min-h-screen">
          <SkipLink />
          <Backdrop />
          <Header />

          <main id="main">
            <HeroSection />
            <div className="hairline" aria-hidden="true" />
            <ProblemSection />
            <OperatingModelSection />
            <DaimlerSection />
            <UbsSection />
            <NabCompassSection />
            <MerckCornerstoneSection />
            <BankOfAmericaSection />
            <BuildOnceSection />
            <Pax8ApplicationSection />
            <ScalingChallengesSection />
            <NinetyDaysSection />
            <MetricsSection />
            <ConversationSection />
            <ClosingSection />
          </main>

          <Footer />
          {/* Sits above everything; hidden in print. */}
          <GuidedWalkthrough />
        </div>
      </WalkthroughProvider>
    </MotionProvider>
  );
}
