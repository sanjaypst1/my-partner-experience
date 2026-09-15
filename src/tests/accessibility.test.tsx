import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import { sections } from '@/data/portfolio';

describe('accessibility fundamentals', () => {
  it('provides a skip link to the main landmark', () => {
    render(<App />);
    const skip = screen.getByRole('link', { name: /skip to main content/i });
    expect(skip).toHaveAttribute('href', '#main');
    expect(document.getElementById('main')).toBeInTheDocument();
  });

  it('has exactly one h1 and uses h2 for every section', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const section of sections) {
      if (section.id === 'hero') continue;
      const element = document.getElementById(section.id);
      expect(element?.querySelector('h2'), `${section.id} is missing an h2`).toBeTruthy();
    }
  });

  it('gives every section an accessible name via aria-labelledby', () => {
    render(<App />);
    for (const section of sections) {
      const element = document.getElementById(section.id);
      const labelledBy = element?.getAttribute('aria-labelledby');
      expect(labelledBy, `${section.id} has no aria-labelledby`).toBeTruthy();
      expect(document.getElementById(labelledBy as string)).toBeTruthy();
    }
  });

  it('describes every diagram in text rather than by shape or colour alone', () => {
    const { container } = render(<App />);
    const figures = Array.from(container.querySelectorAll('figure'));
    expect(figures.length).toBeGreaterThan(0);
    for (const figure of figures) {
      const describedBy = figure.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const caption = document.getElementById(describedBy as string);
      expect(caption?.textContent?.length ?? 0).toBeGreaterThan(40);
    }
  });

  it('gives every button a discernible label', () => {
    render(<App />);
    for (const button of screen.getAllByRole('button')) {
      const label = button.getAttribute('aria-label') ?? button.textContent ?? '';
      expect(label.trim().length, `A button has no accessible label: ${button.outerHTML}`).toBeGreaterThan(0);
    }
  });

  it('marks decorative icons and backdrops as hidden from assistive technology', () => {
    const { container } = render(<App />);
    const svgs = Array.from(container.querySelectorAll('svg'));
    for (const svg of svgs) {
      const hidden =
        svg.getAttribute('aria-hidden') === 'true' ||
        svg.closest('[aria-hidden="true"]') !== null ||
        svg.getAttribute('role') === 'img';
      expect(hidden, `An SVG is exposed without a role or label: ${svg.outerHTML.slice(0, 80)}`).toBe(
        true,
      );
    }
  });

  it('exposes the landmarks a screen-reader user navigates by', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('reduced motion', () => {
  it('marks the document as paused when the OS asks for reduced motion', () => {
    render(<App />);
    // setup.ts reports prefers-reduced-motion: reduce.
    expect(document.documentElement.dataset.motion).toBe('paused');
  });

  it('never leaves scroll-reveal content invisible', () => {
    const { container } = render(<App />);
    const pending = container.querySelectorAll('[data-animate="pending"]');
    expect(pending.length).toBe(0);
  });

  it('renders the static ecosystem instead of a WebGL canvas', () => {
    const { container } = render(<App />);
    expect(container.querySelector('canvas')).toBeNull();
    expect(
      screen.getByText(/signals travel from the technology and vendor side/i),
    ).toBeInTheDocument();
  });

  it('keeps the whole story readable without animation', () => {
    render(<App />);
    expect(
      screen.getByText(/A strong product alone does not create a strong partner experience/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the first ninety days/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /what i would like to explore with pax8/i }),
    ).toBeInTheDocument();
  });
});
