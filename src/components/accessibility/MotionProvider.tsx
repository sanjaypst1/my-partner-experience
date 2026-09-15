import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { MotionContext } from '@/lib/motionContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useDocumentVisible } from '@/hooks/useDocumentVisible';

/**
 * Owns the answer to "may we animate?" for the whole app:
 * OS preference, the visitor's manual pause, and whether the tab is even visible.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const documentVisible = useDocumentVisible();
  const [paused, setPaused] = useState(false);

  const togglePaused = useCallback(() => setPaused((value) => !value), []);

  const motionEnabled = !prefersReducedMotion && !paused && documentVisible;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = prefersReducedMotion || paused ? 'paused' : 'active';
  }, [prefersReducedMotion, paused]);

  const value = useMemo(
    () => ({ prefersReducedMotion, paused, documentVisible, motionEnabled, togglePaused }),
    [prefersReducedMotion, paused, documentVisible, motionEnabled, togglePaused],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
