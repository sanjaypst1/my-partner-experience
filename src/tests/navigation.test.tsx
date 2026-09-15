import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { navItems } from '@/components/navigation/navItems';
import { caseStudies } from '@/data/portfolio';

describe('explore-freely navigation', () => {
  it('offers all eight destinations', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /explore sections/i });
    expect(navItems).toHaveLength(8);
    for (const item of navItems) {
      expect(within(nav).getByRole('button', { name: new RegExp(`^${item.label}`, 'i') })).toBeInTheDocument();
    }
  });

  it('scrolls to the matching section when a destination is chosen', async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView');
    render(<App />);

    const nav = screen.getByRole('navigation', { name: /explore sections/i });
    await user.click(within(nav).getByRole('button', { name: /^metrics/i }));

    expect(scrollIntoView).toHaveBeenCalled();
    expect(document.getElementById('metrics')).toBeInTheDocument();
  });

  it('reveals the case studies nested under Experience Programs', async () => {
    const user = userEvent.setup();
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /explore sections/i });

    const disclosure = within(nav).getByRole('button', {
      name: /show experience programs case studies/i,
    });
    expect(disclosure).toHaveAttribute('aria-expanded', 'false');

    await user.click(disclosure);
    expect(
      within(nav).getByRole('button', { name: /hide experience programs case studies/i }),
    ).toHaveAttribute('aria-expanded', 'true');

    for (const study of caseStudies) {
      expect(within(nav).getByRole('button', { name: study.employer })).toBeInTheDocument();
    }
  });

  it('renders every section anchor the navigation points at', () => {
    render(<App />);
    for (const item of navItems) {
      expect(document.getElementById(item.id)).toBeInTheDocument();
      for (const child of item.children ?? []) {
        expect(document.getElementById(child.id)).toBeInTheDocument();
      }
    }
  });
});

describe('mobile menu', () => {
  it('opens, lists sections, and closes on Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = screen.getByRole('button', { name: /^sections$/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: /site sections/i });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(within(dialog).getByRole('button', { name: /^pax8 fit$/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /site sections/i })).not.toBeInTheDocument();
  });

  it('closes after a section is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^sections$/i }));
    const dialog = screen.getByRole('dialog', { name: /site sections/i });
    await user.click(within(dialog).getByRole('button', { name: /^contact$/i }));

    expect(screen.queryByRole('dialog', { name: /site sections/i })).not.toBeInTheDocument();
  });
});
