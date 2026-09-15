import { createContext } from 'react';
import type { SectionId, SectionMeta } from '@/types/portfolio';

export interface WalkthroughState {
  active: boolean;
  index: number;
  current: SectionMeta;
  total: number;
  /** 0–1 progress through the walkthrough. */
  progress: number;
  minutesRemaining: number;
  start: () => void;
  exit: () => void;
  next: () => void;
  previous: () => void;
  goTo: (id: SectionId) => void;
  /** Section currently in view, tracked whether or not the walkthrough is running. */
  visibleSection: SectionId;
  registerVisible: (id: SectionId) => void;
}

export const WalkthroughContext = createContext<WalkthroughState | null>(null);
