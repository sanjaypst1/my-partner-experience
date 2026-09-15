import { useEffect, useRef, useState } from 'react';
import { useMotionPreference } from './useMotionPreference';

/**
 * Counts up to a target once the element is in view. Used only for verified numeric
 * metrics; with motion disabled the final value is shown immediately.
 */
export function useCountUp(target: number, durationMs = 1200) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const { motionEnabled } = useMotionPreference();
  const [value, setValue] = useState(() => (motionEnabled ? 0 : target));

  useEffect(() => {
    if (!motionEnabled) {
      setValue(target);
      return;
    }
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / durationMs);
      // Ease-out cubic keeps the last digits from feeling mechanical.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          frame = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, durationMs, motionEnabled]);

  return { ref, value };
}
