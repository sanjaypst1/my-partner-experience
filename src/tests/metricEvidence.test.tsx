import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricEvidenceCard } from '@/components/charts/MetricEvidenceCard';
import { EVIDENCE_PENDING_LABEL } from '@/data/metrics';
import type { Metric } from '@/types/portfolio';

const base: Metric = {
  id: 'test-metric',
  label: 'Regions in scope',
  value: null,
  verified: false,
  publicSafe: true,
  explanation: 'Markets that received the common program core.',
  level: 'engagement',
  placeholder: '[Number of countries or regions]',
};

describe('metric rendering rules', () => {
  it('shows a value only when it is verified and public-safe', () => {
    render(
      <MetricEvidenceCard
        metric={{ ...base, value: 7, verified: true, source: 'Program closure report' }}
      />,
    );
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText(/verified/i)).toBeInTheDocument();
    expect(screen.getByText(/source: program closure report/i)).toBeInTheDocument();
    expect(screen.queryByText(EVIDENCE_PENDING_LABEL)).not.toBeInTheDocument();
  });

  it('hides an unverified figure behind the evidence-pending label', () => {
    render(<MetricEvidenceCard metric={base} />);
    expect(screen.getByText(EVIDENCE_PENDING_LABEL)).toBeInTheDocument();
    expect(screen.getByTestId('verify-prompt')).toHaveTextContent(
      '[Number of countries or regions]',
    );
  });

  it('refuses to print a real value that is not cleared for sharing', () => {
    render(
      <MetricEvidenceCard
        metric={{
          ...base,
          label: 'Program budget',
          value: '12.4m',
          verified: true,
          publicSafe: false,
          source: 'Internal finance report',
          placeholder: '[Insert budget]',
        }}
      />,
    );
    expect(screen.queryByText(/12\.4m/)).not.toBeInTheDocument();
    expect(screen.getByText(EVIDENCE_PENDING_LABEL)).toBeInTheDocument();
  });

  it('keeps the category and explanation visible while evidence is pending', () => {
    render(<MetricEvidenceCard metric={base} />);
    expect(screen.getByText('Regions in scope')).toBeInTheDocument();
    expect(screen.getByText(base.explanation)).toBeInTheDocument();
  });
});
