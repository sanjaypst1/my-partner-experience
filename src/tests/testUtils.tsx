import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MotionProvider } from '@/components/accessibility/MotionProvider';
import { WalkthroughProvider } from '@/components/storytelling/WalkthroughProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <WalkthroughProvider>{children}</WalkthroughProvider>
    </MotionProvider>
  );
}

/** Renders inside the same providers the real app uses. */
export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: Providers });
}
