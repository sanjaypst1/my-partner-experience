import { createContext } from 'react';

export interface MotionState {
  /** True when the OS asks for reduced motion. */
  prefersReducedMotion: boolean;
  /** True when the visitor pressed "Pause animation". */
  paused: boolean;
  /** True when the tab is visible; animations idle otherwise to save battery. */
  documentVisible: boolean;
  /** The single flag components should check before animating. */
  motionEnabled: boolean;
  togglePaused: () => void;
}

export const MotionContext = createContext<MotionState | null>(null);
