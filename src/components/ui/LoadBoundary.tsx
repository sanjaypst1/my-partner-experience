import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

/**
 * Catches failures in dynamically imported visuals (the 3D hero, the evidence chart).
 *
 * Without this, one failed chunk request would unmount the page — the worst possible
 * outcome during a live walkthrough. The story is carried by text and static markup,
 * so losing a decorative visual should cost nothing but the visual.
 */
export class LoadBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode; label: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.label}] failed to load, showing fallback instead.`, error, info);
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
