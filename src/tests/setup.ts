import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

/**
 * jsdom lacks the browser APIs this site uses. These stand-ins are plain functions
 * rather than spies, so `restoreMocks` cannot strip their behaviour between tests.
 *
 * The defaults mirror the most cautious real environment: reduced motion on, no
 * WebGL, and observers that never fire. Tests opt into richer behaviour explicitly.
 */

window.matchMedia = ((query: string): MediaQueryList =>
  ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList) as typeof window.matchMedia;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// No layout engine in jsdom, so these are no-ops that tests can still spy on.
Element.prototype.scrollIntoView = function scrollIntoView() {};
window.print = function print() {};

afterEach(() => {
  cleanup();
});
