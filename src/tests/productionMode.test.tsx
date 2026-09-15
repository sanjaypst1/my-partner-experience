import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type * as PortfolioData from '@/data/portfolio';

/**
 * Production mode must remove every unverified artefact from the page, not merely
 * restyle it. These tests re-import the app with `showUnverifiedPlaceholders: false`.
 */
vi.mock('@/data/portfolio', async (importOriginal) => {
  const actual = await importOriginal<typeof PortfolioData>();
  return {
    ...actual,
    siteConfig: { ...actual.siteConfig, showUnverifiedPlaceholders: false },
  };
});

beforeEach(() => {
  vi.resetModules();
});

describe('production mode (showUnverifiedPlaceholders = false)', () => {
  it('renders no editable placeholders anywhere on the page', async () => {
    const { default: App } = await import('@/App');
    render(<App />);
    expect(screen.queryAllByTestId('verify-prompt')).toHaveLength(0);
  });

  it('renders no bracketed prompt text anywhere on the page', async () => {
    const { default: App } = await import('@/App');
    const { container } = render(<App />);
    expect(container.textContent ?? '').not.toMatch(/\[(Insert|Number|Confirm|Reduction|Improvement|Percentage|Milestones|Benefits|Verified)/);
  });

  it('removes the pre-share verification checklists', async () => {
    const { default: App } = await import('@/App');
    render(<App />);
    expect(screen.queryByTestId('open-verifications-daimler')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contact-placeholder-notice')).not.toBeInTheDocument();
  });

  it('still renders the measurement framework and case-study narrative', async () => {
    const { default: App } = await import('@/App');
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /a measurement framework, not a wall of numbers/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /daimler mercedes-benz: designing a consistent channel experience/i,
      }),
    ).toBeInTheDocument();
  });

  it('keeps the hypothetical labelling on Pax8 forward-looking content', async () => {
    const { default: App } = await import('@/App');
    render(<App />);
    expect(screen.getAllByTestId('hypothetical-frame').length).toBeGreaterThan(0);
  });
});
