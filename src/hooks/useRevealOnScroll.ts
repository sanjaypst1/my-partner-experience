import { useEffect, useRef } from 'react';
import { EASE, ScrollTrigger, getGsap } from '@/lib/gsap';
import { useMotionPreference } from './useMotionPreference';

/**
 * GSAP scroll reveal for a group of children marked `[data-animate="pending"]`.
 * With motion disabled the attribute is cleared instead, so content is always visible.
 */
export function useRevealOnScroll<T extends HTMLElement>(options?: {
  selector?: string;
  stagger?: number;
  y?: number;
}) {
  const containerRef = useRef<T | null>(null);
  const { motionEnabled } = useMotionPreference();
  const { selector = '[data-animate="pending"]', stagger = 0.08, y = 18 } = options ?? {};

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) return;

    if (!motionEnabled) {
      targets.forEach((element) => element.setAttribute('data-animate', 'ready'));
      return;
    }

    const gsap = getGsap();
    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE,
          stagger,
          scrollTrigger: {
            trigger: container,
            start: 'top 78%',
            once: true,
          },
          onComplete: () => targets.forEach((el) => el.setAttribute('data-animate', 'ready')),
        },
      );
    }, container);

    return () => {
      context.revert();
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.trigger === container)
        .forEach((trigger) => trigger.kill());
    };
  }, [motionEnabled, selector, stagger, y]);

  return containerRef;
}
