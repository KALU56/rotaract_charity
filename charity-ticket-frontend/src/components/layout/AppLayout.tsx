import { useState } from 'react';
import {
  Outlet,
  useNavigate,
  useRouterState,
  useSearch,
} from '@tanstack/react-router';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { PrHallLocationModal } from '@/components/common/PrHallLocationModal';
import { PALETTE } from '@/config/theme.config';
import { CheckoutPage } from '@/features/checkout/CheckoutPage';
import type { CheckoutStep } from '@/features/checkout/CheckoutProgressHeader';
import { LandingPage } from '@/features/landing/LandingPage';
import { useCartStore } from '@/store';
import type { TicketTierId } from '@/types';
import { AppNavigationContext, useAppNavigation } from './navigationContext';

export function RootLayout() {
  const [prHallModalOpen, setPrHallModalOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const preselectPass = useCartStore((s) => s.preselectPass);

  const isPassesRoute =
    pathname === '/passes' ||
    (pathname === '/checkout' && searchStr.includes('step=4'));

  const navigateToSection = (sectionId: string) => {
    if (pathname !== '/') {
      navigate({ to: '/' }).then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startTicketPurchase = (
    tierId: TicketTierId | null = null,
    enableGift = false
  ) => {
    preselectPass(tierId, enableGift);
    navigate({ to: '/checkout', search: { step: 1 } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPasses = () => {
    navigate({ to: '/passes' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppNavigationContext.Provider
      value={{
        navigateToSection,
        startTicketPurchase,
        openPasses,
        openVenueModal: () => setPrHallModalOpen(true),
      }}
    >
      <div
        className="min-h-screen flex flex-col selection:bg-brand-wine selection:text-brand-espresso"
        style={{
          backgroundColor: PALETTE.espresso,
          color: PALETTE.darkCoffee,
        }}
      >
        <PrHallLocationModal
          open={prHallModalOpen}
          onClose={() => setPrHallModalOpen(false)}
          onBuyTickets={() => startTicketPurchase()}
        />

        <Header
          isPassesRoute={isPassesRoute}
          onNavigateSection={navigateToSection}
          onStartPurchase={startTicketPurchase}
          onOpenPasses={openPasses}
        />

        <Outlet />

        <Footer
          onNavigateSection={navigateToSection}
          onStartPurchase={startTicketPurchase}
          onOpenVenueModal={() => setPrHallModalOpen(true)}
        />
      </div>
    </AppNavigationContext.Provider>
  );
}

export function LandingRouteView() {
  const { startTicketPurchase, navigateToSection, openVenueModal } =
    useAppNavigation();

  return (
    <LandingPage
      onStartPurchase={startTicketPurchase}
      onNavigateSection={navigateToSection}
      onOpenVenueModal={openVenueModal}
    />
  );
}

export function CheckoutRouteView() {
  const { step } = useSearch({ from: '/checkout' });
  const navigate = useNavigate();
  const { startTicketPurchase } = useAppNavigation();

  const handleSelectStep = (nextStep: CheckoutStep) => {
    if (nextStep === 4) {
      navigate({ to: '/passes' });
    } else {
      navigate({ to: '/checkout', search: { step: nextStep } });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CheckoutPage
      currentStep={step}
      onSelectStep={handleSelectStep}
      onBackToLanding={() => {
        navigate({ to: '/' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onStartPurchase={startTicketPurchase}
    />
  );
}

export function PassesRouteView() {
  const navigate = useNavigate();
  const { startTicketPurchase } = useAppNavigation();

  const handleSelectStep = (nextStep: CheckoutStep) => {
    if (nextStep === 4) return;
    navigate({ to: '/checkout', search: { step: nextStep } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CheckoutPage
      currentStep={4}
      onSelectStep={handleSelectStep}
      onBackToLanding={() => {
        navigate({ to: '/' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onStartPurchase={startTicketPurchase}
    />
  );
}
