import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { sections } from '@/data/portfolio';

const TOTAL = sections.length;

/** jsdom has no scrolling, so move the scroll position and announce it. */
function scrollPast(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, writable: true, configurable: true });
  fireEvent.scroll(window);
}

async function startWalkthrough(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /start the partner experience walkthrough/i }));
  return screen.getByRole('complementary', { name: /guided walkthrough controls/i });
}

describe('guided walkthrough', () => {
  it('is not showing controls until it is started', () => {
    render(<App />);
    expect(
      screen.queryByRole('complementary', { name: /guided walkthrough controls/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start the partner experience walkthrough/i }),
    ).toBeInTheDocument();
  });

  it('offers a floating launcher once the visitor scrolls past the hero', () => {
    render(<App />);
    // At the top the hero CTA is the only launcher, to avoid two competing buttons.
    expect(screen.queryByRole('button', { name: /^start walkthrough$/i })).not.toBeInTheDocument();

    scrollPast(window.innerHeight);
    expect(screen.getByRole('button', { name: /^start walkthrough$/i })).toBeInTheDocument();

    scrollPast(0);
  });

  it('starts at the second section and reports position and time remaining', async () => {
    const user = userEvent.setup();
    render(<App />);
    const bar = await startWalkthrough(user);

    expect(within(bar).getByText(`Now presenting · Section 2 of ${TOTAL}`)).toBeInTheDocument();
    expect(within(bar).getByText(sections[1].walkthroughTitle)).toBeInTheDocument();
    expect(within(bar).getByText(/minutes left/i)).toBeInTheDocument();

    const progressbar = within(bar).getByRole('progressbar', { name: /walkthrough progress/i });
    expect(progressbar).toHaveAttribute('aria-valuenow');
  });

  it('moves forward and backward through the sections', async () => {
    const user = userEvent.setup();
    render(<App />);
    const bar = await startWalkthrough(user);

    await user.click(within(bar).getByRole('button', { name: /next section/i }));
    expect(within(bar).getByText(sections[2].walkthroughTitle)).toBeInTheDocument();

    await user.click(within(bar).getByRole('button', { name: /previous section/i }));
    expect(within(bar).getByText(sections[1].walkthroughTitle)).toBeInTheDocument();
  });

  it('supports arrow-key navigation and Escape to exit', async () => {
    const user = userEvent.setup();
    render(<App />);
    const bar = await startWalkthrough(user);

    await user.keyboard('{ArrowRight}');
    expect(within(bar).getByText(sections[2].walkthroughTitle)).toBeInTheDocument();

    await user.keyboard('{ArrowLeft}');
    expect(within(bar).getByText(sections[1].walkthroughTitle)).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(
      screen.queryByRole('complementary', { name: /guided walkthrough controls/i }),
    ).not.toBeInTheDocument();
  });

  it('offers a pause control that reports its state', async () => {
    const user = userEvent.setup();
    render(<App />);
    const bar = await startWalkthrough(user);

    const pause = within(bar).getByRole('button', { name: /pause animation/i });
    expect(pause).toHaveAttribute('aria-pressed', 'false');
    await user.click(pause);
    expect(within(bar).getByRole('button', { name: /resume animation/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('can be exited with the explicit exit control', async () => {
    const user = userEvent.setup();
    render(<App />);
    const bar = await startWalkthrough(user);

    await user.click(within(bar).getByRole('button', { name: /exit walkthrough/i }));
    expect(
      screen.queryByRole('complementary', { name: /guided walkthrough controls/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start the partner experience walkthrough/i }),
    ).toBeInTheDocument();
  });
});
