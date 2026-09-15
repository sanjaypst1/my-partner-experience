import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { Pax8TranslationToggle } from '@/components/case-studies/Pax8TranslationToggle';
import { Providers } from './testUtils';
import { HYPOTHETICAL_LABEL, hypotheticalProgram, pax8Translation } from '@/data/pax8Alignment';

describe('hypothetical Pax8 content labelling', () => {
  it('labels the Pax8 ecosystem section as hypothetical', () => {
    render(<App />);
    expect(screen.getAllByText(HYPOTHETICAL_LABEL).length).toBeGreaterThan(0);
    expect(screen.getByText(hypotheticalProgram.disclaimer)).toBeInTheDocument();
  });

  it('never presents the illustrative program as delivered work', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: HYPOTHETICAL_LABEL });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(hypotheticalProgram.name)).toBeInTheDocument();
  });

  it('starts the translation toggle on the generic model with no hypothetical frame', () => {
    render(<Pax8TranslationToggle />, { wrapper: Providers });
    expect(screen.getByText(pax8Translation.generic.caption)).toBeInTheDocument();
    expect(screen.queryByTestId('hypothetical-frame')).not.toBeInTheDocument();
  });

  it('wraps the Pax8 relabelling in a hypothetical frame when selected', async () => {
    const user = userEvent.setup();
    render(<Pax8TranslationToggle />, { wrapper: Providers });

    await user.click(screen.getByRole('button', { name: pax8Translation.pax8.label }));

    const frame = screen.getByTestId('hypothetical-frame');
    expect(within(frame).getByText(HYPOTHETICAL_LABEL)).toBeInTheDocument();
    expect(within(frame).getByText('Pax8 Marketplace')).toBeInTheDocument();
    expect(within(frame).getByText('MSP partner')).toBeInTheDocument();
    expect(within(frame).getByText('SMB customer')).toBeInTheDocument();
  });

  it('states plainly where the experience stops', () => {
    render(<App />);
    expect(
      screen.getByText(/have not worked at Pax8 and have not managed MSP partners directly/i),
    ).toBeInTheDocument();
  });
});
