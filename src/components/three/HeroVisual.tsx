import { Suspense, lazy, useEffect, useState } from 'react';
import { EcosystemFallback } from './EcosystemFallback';
import { layerMeta } from './ecosystemModel';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';
import { LoadBoundary } from '@/components/ui/LoadBoundary';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { shouldRenderThreeScene } from '@/lib/capabilities';

// Three.js and R3F are a large dependency, so they load only if we decide to use them.
const HeroEcosystem = lazy(() => import('./HeroEcosystem'));

const DESCRIPTION = [
  'An abstract ecosystem diagram.',
  ...Object.values(layerMeta).map((meta) => `${meta.label}: ${meta.description}`),
  'Signals travel from the technology and vendor side, through the central platform, out to partners and on to end customers. Nodes brighten as readiness, adoption and value increase.',
].join(' ');

/**
 * Chooses between the WebGL ecosystem and the static SVG. The decision is made after
 * mount so the first paint is never blocked, and the fallback is what renders during
 * loading — the visual never pops in from nothing.
 */
export function HeroVisual() {
  const { motionEnabled } = useMotionPreference();
  const [useThree, setUseThree] = useState(false);

  useEffect(() => {
    setUseThree(shouldRenderThreeScene(motionEnabled));
  }, [motionEnabled]);

  return (
    <FigureWithDescription title="Connected partner ecosystem" description={DESCRIPTION} fill>
      {useThree ? (
        <LoadBoundary label="hero ecosystem" fallback={<EcosystemFallback animated={motionEnabled} />}>
          <Suspense fallback={<EcosystemFallback animated={false} />}>
            <HeroEcosystem />
          </Suspense>
        </LoadBoundary>
      ) : (
        <EcosystemFallback animated={motionEnabled} />
      )}
    </FigureWithDescription>
  );
}
