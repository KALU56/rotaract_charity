import { useState } from 'react';
import { Gift, Menu, QrCode, Ticket, X } from 'lucide-react';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import {
  calculateCharityMetrics,
  useCharityStore,
  useOrderStore,
} from '@/store';
import type { TicketTierId } from '@/types';
import { RotaractMovieEmblem } from './RotaractMovieEmblem';

interface HeaderProps {
  isPassesRoute: boolean;
  onNavigateSection: (sectionId: string) => void;
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
  onOpenPasses: () => void;
}

const NAV_LINKS = [
  { label: 'About Charity', id: 'about-section' },
  { label: 'Live Goal', id: 'charity-goal-section' },
  { label: 'Movie Night Info', id: 'info-section' },
  { label: 'Tickets', id: 'tickets-section' },
  { label: 'How It Works', id: 'how-it-works-section' },
];

export function Header({
  isPassesRoute,
  onNavigateSection,
  onStartPurchase,
  onOpenPasses,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const raisedEtb = useCharityStore((s) => s.raisedEtb);
  const studentContributors = useCharityStore((s) => s.studentContributors);
  const orders = useOrderStore((s) => s.orders);

  const { goalProgressPercent } = calculateCharityMetrics(
    raisedEtb,
    studentContributors
  );
  const totalPassCount = orders.reduce((s, o) => s + o.tickets.length, 0);

  const handleSectionClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: 'rgba(255, 230, 167, 0.95)',
        borderColor: 'rgba(153, 88, 42, 0.24)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        {/* Left: Rotaract Club of Debre Berhan Crest */}
        <button
          type="button"
          onClick={() => handleSectionClick('hero-section')}
          className="flex items-center gap-3 text-left focus-brand rounded-xl py-1 pr-2 group shrink-0"
        >
          <RotaractMovieEmblem className="w-10 h-10 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <div>
            <span
              className="font-display font-extrabold text-sm sm:text-base tracking-tight block leading-none"
              style={{ color: PALETTE.darkCoffee }}
            >
              Rotaract Debre Berhan
            </span>
            <span
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] mt-1 block"
              style={{ color: PALETTE.chocolate }}
            >
              Charity Movie Night • PR Hall
            </span>
          </div>
        </button>

        {/* Center: Smooth-Scroll Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center gap-6 text-sm font-semibold"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleSectionClick(link.id)}
              className="py-2 transition-colors hover:text-brand-wine focus-brand rounded-lg px-1"
              style={{ color: PALETTE.darkCoffee }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Live ETB Raised Pill + My QR Passes + Buy / Gift Tickets CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => handleSectionClick('charity-goal-section')}
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold border transition-colors hover:bg-brand-surface-card focus-brand tabular-nums"
            style={{
              backgroundColor: PALETTE.surfaceCard,
              borderColor: PALETTE.camel,
              color: PALETTE.darkWine,
            }}
            title="View Live DBU Student Charity Collection Tracker"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: PALETTE.darkWine }}
            />
            <span>
              {raisedEtb.toLocaleString()} /{' '}
              {EVENT_META.charityGoalEtb.toLocaleString()} ETB Raised
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPasses();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-colors hover:bg-brand-surface-card focus-brand"
            style={{
              backgroundColor: isPassesRoute
                ? PALETTE.surfaceCard
                : 'rgba(255, 251, 240, 0.65)',
              borderColor: PALETTE.camel,
              color: PALETTE.darkCoffee,
            }}
          >
            <QrCode className="w-4 h-4" style={{ color: PALETTE.darkWine }} />
            <span>My QR Passes ({totalPassCount})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onStartPurchase();
            }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all hover:opacity-95 active:scale-[0.99] focus-brand"
            style={{
              backgroundColor: PALETTE.darkWine,
              color: PALETTE.creamText,
            }}
          >
            <Ticket className="w-4 h-4" />
            <span>Buy / Gift Tickets</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2.5 rounded-xl border focus-brand"
            style={{
              backgroundColor: PALETTE.surfaceCard,
              borderColor: PALETTE.camel,
              color: PALETTE.darkCoffee,
            }}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden border-t px-4 py-4 space-y-3"
          style={{
            backgroundColor: PALETTE.surfaceCard,
            borderColor: 'rgba(187, 148, 87, 0.45)',
          }}
        >
          <div
            className="px-3.5 py-2.5 rounded-xl border flex items-center justify-between text-xs font-extrabold tabular-nums"
            style={{
              backgroundColor: PALETTE.surfaceSoft,
              borderColor: PALETTE.camel,
              color: PALETTE.darkWine,
            }}
          >
            <span>DBU Student Charity Fund</span>
            <span>
              {raisedEtb.toLocaleString()} /{' '}
              {EVENT_META.charityGoalEtb.toLocaleString()} ETB (
              {goalProgressPercent}%)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleSectionClick(link.id)}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-surface-soft focus-brand"
                style={{ color: PALETTE.darkCoffee }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div
            className="pt-2 border-t flex gap-2"
            style={{ borderColor: 'rgba(187, 148, 87, 0.35)' }}
          >
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPasses();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2"
              style={{
                backgroundColor: PALETTE.surfaceSoft,
                borderColor: PALETTE.camel,
                color: PALETTE.darkCoffee,
              }}
            >
              <QrCode className="w-4 h-4" style={{ color: PALETTE.darkWine }} />
              <span>My QR Passes</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartPurchase('individual', true);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              style={{
                backgroundColor: PALETTE.darkWine,
                color: PALETTE.creamText,
              }}
            >
              <Gift className="w-4 h-4" />
              <span>Gift a Ticket</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
