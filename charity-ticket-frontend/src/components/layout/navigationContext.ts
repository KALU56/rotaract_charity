import { createContext, useContext } from 'react';
import type { TicketTierId } from '@/types';

export interface AppNavigationContextValue {
  navigateToSection: (sectionId: string) => void;
  startTicketPurchase: (
    tierId?: TicketTierId | null,
    enableGift?: boolean
  ) => void;
  openPasses: () => void;
  openVenueModal: () => void;
}

export const AppNavigationContext =
  createContext<AppNavigationContextValue | null>(null);

export function useAppNavigation() {
  const ctx = useContext(AppNavigationContext);
  if (!ctx) {
    throw new Error('useAppNavigation must be used within RootLayout');
  }
  return ctx;
}
