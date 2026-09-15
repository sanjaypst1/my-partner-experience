import type { AccentKey } from '@/types/portfolio';

/**
 * Accent tokens. Colour never carries meaning on its own anywhere on this site —
 * every accented element also has a text label, icon or number.
 */
interface AccentTokens {
  text: string;
  border: string;
  bg: string;
  bgSolid: string;
  ring: string;
  hex: string;
  gradient: string;
  /** Full literal class so Tailwind can see it — never build these by interpolation. */
  activeBorder: string;
}

export const accentTokens: Record<AccentKey, AccentTokens> = {
  cyan: {
    text: 'text-signal-cyan',
    border: 'border-signal-cyan/40',
    bg: 'bg-signal-cyan/10',
    bgSolid: 'bg-signal-cyan',
    ring: 'shadow-[0_0_0_1px_rgb(0_113_227_/_0.28)]',
    hex: '#0071e3',
    gradient: 'from-signal-cyan/70 to-signal-cyan/0',
    activeBorder: 'data-[state=active]:border-signal-cyan/40',
  },
  violet: {
    text: 'text-signal-violet',
    border: 'border-signal-violet/40',
    bg: 'bg-signal-violet/10',
    bgSolid: 'bg-signal-violet',
    ring: 'shadow-[0_0_0_1px_rgb(124_58_237_/_0.28)]',
    hex: '#7c3aed',
    gradient: 'from-signal-violet/70 to-signal-violet/0',
    activeBorder: 'data-[state=active]:border-signal-violet/40',
  },
  magenta: {
    text: 'text-signal-magenta',
    border: 'border-signal-magenta/40',
    bg: 'bg-signal-magenta/10',
    bgSolid: 'bg-signal-magenta',
    ring: 'shadow-[0_0_0_1px_rgb(225_29_140_/_0.28)]',
    hex: '#e11d8c',
    gradient: 'from-signal-magenta/70 to-signal-magenta/0',
    activeBorder: 'data-[state=active]:border-signal-magenta/40',
  },
  amber: {
    text: 'text-signal-amber',
    border: 'border-signal-amber/45',
    bg: 'bg-signal-amber/12',
    bgSolid: 'bg-signal-amber',
    ring: 'shadow-[0_0_0_1px_rgb(245_158_11_/_0.28)]',
    hex: '#f59e0b',
    gradient: 'from-signal-amber/70 to-signal-amber/0',
    activeBorder: 'data-[state=active]:border-signal-amber/45',
  },
};

export function accent(key: AccentKey) {
  return accentTokens[key];
}
