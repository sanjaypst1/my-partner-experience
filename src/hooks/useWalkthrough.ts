import { useContext } from 'react';
import { WalkthroughContext, type WalkthroughState } from '@/lib/walkthroughContext';

export function useWalkthrough(): WalkthroughState {
  const context = useContext(WalkthroughContext);
  if (!context) {
    throw new Error('useWalkthrough must be used inside <WalkthroughProvider>.');
  }
  return context;
}
