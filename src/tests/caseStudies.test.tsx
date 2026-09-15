import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { CaseStudySection } from '@/components/case-studies/CaseStudySection';
import { Providers } from './testUtils';
import { caseStudies } from '@/data/portfolio';
import { scalingChallenges } from '@/data/pax8Alignment';

describe('data-driven case studies', () => {
  it('renders a section for every case study in the data file', () => {
    render(<App />);
    for (const study of caseStudies) {
      expect(screen.getByRole('heading', { name: study.title })).toBeInTheDocument();
      expect(document.getElementById(study.id)).toBeInTheDocument();
    }
  });

  it('renders the situation and capability straight from the data', () => {
    const study = caseStudies[0];
    render(<CaseStudySection study={study} />, { wrapper: Providers });
    expect(screen.getByText(study.situation)).toBeInTheDocument();
    expect(screen.getByText(study.capabilityDemonstrated)).toBeInTheDocument();
    expect(screen.getByText(study.pax8Relevance)).toBeInTheDocument();
  });

  it('exposes the STAR detail as an accessible tab set', async () => {
    const user = userEvent.setup();
    const study = caseStudies[0];
    render(<CaseStudySection study={study} />, { wrapper: Providers });

    const tablist = screen.getByRole('tablist', { name: new RegExp(`${study.employer} case study`, 'i') });
    const taskTab = within(tablist).getByRole('tab', { name: 'Task' });
    expect(taskTab).toHaveAttribute('aria-selected', 'false');

    await user.click(taskTab);
    expect(taskTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(study.task)).toBeVisible();

    await user.keyboard('{ArrowRight}');
    expect(within(tablist).getByRole('tab', { name: 'Action' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('states what each case study deliberately excludes', () => {
    const study = caseStudies[0];
    render(<CaseStudySection study={study} />, { wrapper: Providers });
    expect(screen.getByText(study.confidentialityNote)).toBeInTheDocument();
  });
});

describe('scaling challenges', () => {
  it('renders all twelve challenges with expandable responses', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(scalingChallenges).toHaveLength(12);
    for (const challenge of scalingChallenges) {
      expect(screen.getByRole('button', { name: new RegExp(challenge.title, 'i') })).toBeInTheDocument();
    }

    const second = screen.getByRole('button', { name: new RegExp(scalingChallenges[1].title, 'i') });
    expect(second).toHaveAttribute('aria-expanded', 'false');
    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(scalingChallenges[1].response)).toBeVisible();
  });
});
