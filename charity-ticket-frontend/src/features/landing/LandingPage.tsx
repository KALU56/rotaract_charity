import type { TicketTierId } from '@/types';
import { AboutSection } from './AboutSection';
import { CharityGoalSection } from './CharityGoalSection';
import { HeroSection } from './HeroSection';
import { HighlightsSection } from './HighlightsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TicketsSection } from './TicketsSection';

interface LandingPageProps {
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenVenueModal: () => void;
}

export function LandingPage({
  onStartPurchase,
  onNavigateSection,
  onOpenVenueModal,
}: LandingPageProps) {
  return (
    <main className="flex-1">
      <HeroSection
        onStartPurchase={onStartPurchase}
        onNavigateSection={onNavigateSection}
      />
      <CharityGoalSection onStartPurchase={onStartPurchase} />
      <AboutSection />
      <HighlightsSection onOpenVenueModal={onOpenVenueModal} />
      <TicketsSection onStartPurchase={onStartPurchase} />
      <HowItWorksSection />
    </main>
  );
}
