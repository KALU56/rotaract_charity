import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { useCharityStore } from '@/store';
import type { TicketTierId } from '@/types';
import { RotaractMovieEmblem } from './RotaractMovieEmblem';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
  onOpenVenueModal: () => void;
}

export function Footer({
  onNavigateSection,
  onStartPurchase,
  onOpenVenueModal,
}: FooterProps) {
  const raisedEtb = useCharityStore((s) => s.raisedEtb);

  return (
    <footer
      className="border-t py-12"
      style={{
        backgroundColor: PALETTE.darkCoffee,
        borderColor: PALETTE.camel,
        color: PALETTE.creamText,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-3.5">
          <RotaractMovieEmblem className="w-10 h-10 shrink-0" />
          <div>
            <span className="font-display font-extrabold text-base block">
              {EVENT_META.fullTitle}
            </span>
            <span className="text-xs opacity-85 block mt-0.5">
              {EVENT_META.venueName} • {raisedEtb.toLocaleString()} /{' '}
              {EVENT_META.charityGoalEtb.toLocaleString()} ETB Raised
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onNavigateSection('charity-goal-section')}
            className="hover:underline focus-brand rounded"
            style={{ color: PALETTE.espresso }}
          >
            Live Charity Goal
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('tickets-section')}
            className="hover:underline focus-brand rounded"
            style={{ color: PALETTE.espresso }}
          >
            Individual &amp; Group Passes
          </button>
          <button
            type="button"
            onClick={() => onStartPurchase('individual', true)}
            className="hover:underline focus-brand rounded"
            style={{ color: PALETTE.espresso }}
          >
            Gift a Ticket
          </button>
          <button
            type="button"
            onClick={onOpenVenueModal}
            className="hover:underline focus-brand rounded"
            style={{ color: PALETTE.espresso }}
          >
            Campus Entry Guide
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('how-it-works-section')}
            className="hover:underline focus-brand rounded"
            style={{ color: PALETTE.espresso }}
          >
            How It Works
          </button>
        </div>
      </div>

      {/* Bottom Sub-Footer / Transparency Statement */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
        style={{ borderColor: 'rgba(187, 148, 87, 0.3)', color: PALETTE.camel }}
      >
        <p>
          © 2026 {EVENT_META.clubName}. Service Above Self • 100% of proceeds
          fund local Debre Berhan community relief.
        </p>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Debre Berhan University (DBU)</span>
          <span>•</span>
          <span>Rotary International District 9212</span>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:underline cursor-pointer"
            style={{ color: PALETTE.espresso }}
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
