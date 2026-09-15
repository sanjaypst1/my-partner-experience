import { useContext } from 'react';
import { MotionContext, type MotionState } from '@/lib/motionContext';

/**
 * The one place components ask "may I animate?".
 * Falls back to motion-off when no provider is present, which keeps tests honest.
 */
export function useMotionPreference(): MotionState {
  const context = useContext(MotionContext);
  if (context) return context;
  return {
    prefersReducedMotion: true,
    paused: false,
    documentVisible: true,
    motionEnabled: false,
    togglePaused: () => {},
  };
}
