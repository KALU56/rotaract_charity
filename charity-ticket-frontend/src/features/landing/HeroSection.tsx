import { Calendar, MapPin, Target, Ticket } from 'lucide-react';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { calculateCharityMetrics, useCharityStore } from '@/store';
import type { TicketTierId } from '@/types';

interface HeroSectionProps {
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
  onNavigateSection: (sectionId: string) => void;
}

export function HeroSection({
  onStartPurchase,
  onNavigateSection,
}: HeroSectionProps) {
  const raisedEtb = useCharityStore((s) => s.raisedEtb);
  const studentContributors = useCharityStore((s) => s.studentContributors);

  const { goalProgressPercent, remainingGoalEtb, remainingSeats } =
    calculateCharityMetrics(raisedEtb, studentContributors);

  return (
    <section
      id="hero-section"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{ backgroundColor: PALETTE.espresso }}
    >
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-x-8 top-5 bottom-5 rounded-4xl border pointer-events-none"
        style={{ borderColor: 'rgba(153, 88, 42, 0.16)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-[0.14em]"
              style={{
                backgroundColor: PALETTE.surfaceCard,
                borderColor: PALETTE.camel,
                color: PALETTE.chocolate,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PALETTE.darkWine }}
              />
              <span>{EVENT_META.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.08]"
              style={{ color: PALETTE.darkCoffee }}
            >
              One Movie Night. A Lasting Difference for{' '}
              <span
                className="relative inline-block"
                style={{ color: PALETTE.darkWine }}
              >
                Our Community.
                <span
                  aria-hidden="true"
                  className="block h-1.5 w-full rounded-full mt-1.5 opacity-75"
                  style={{ backgroundColor: PALETTE.camel }}
                />
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg leading-[1.68] max-w-xl"
              style={{ color: 'rgba(67, 40, 24, 0.88)' }}
            >
              Hosted by the <strong>Rotaract Club of Debre Berhan</strong> at{' '}
              <strong>PR Hall, Debre Berhan University (DBU)</strong>. DBU
              students gather for cinema night while 100% of every ticket
              purchased or gifted supports vulnerable families, children, and
              elderly residents in Debre Berhan town.
            </p>

            {/* Live Embedded DBU Student Fundraising Progress Card */}
            <div
              className="p-5 rounded-2xl border shadow-sm space-y-3"
              style={{
                backgroundColor: PALETTE.surfaceCard,
                borderColor: PALETTE.camel,
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span
                    className="text-[11px] font-extrabold uppercase tracking-[0.14em] block"
                    style={{ color: PALETTE.chocolate }}
                  >
                    Live DBU Student Charity Collection
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5 tabular-nums">
                    <span
                      className="font-display text-2xl sm:text-3xl font-extrabold"
                      style={{ color: PALETTE.darkWine }}
                    >
                      {raisedEtb.toLocaleString()} ETB
                    </span>
                    <span
                      className="text-xs sm:text-sm font-semibold"
                      style={{ color: PALETTE.chocolate }}
                    >
                      raised of {EVENT_META.charityGoalEtb.toLocaleString()} ETB
                      goal
                    </span>
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-extrabold tabular-nums"
                  style={{
                    backgroundColor: PALETTE.espresso,
                    color: PALETTE.darkWine,
                  }}
                >
                  {goalProgressPercent}% Funded
                </span>
              </div>

              {/* Progress Bar */}
              <div
                role="progressbar"
                aria-valuenow={raisedEtb}
                aria-valuemin={0}
                aria-valuemax={EVENT_META.charityGoalEtb}
                aria-label="DBU Student Charity Fundraising Progress"
                className="w-full h-3 rounded-full overflow-hidden p-0.5 border"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: 'rgba(187, 148, 87, 0.5)',
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${goalProgressPercent}%`,
                    backgroundColor: PALETTE.darkWine,
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold tabular-nums">
                <span style={{ color: PALETTE.darkCoffee }}>
                  <strong>{studentContributors} DBU Students</strong> contributed
                  so far
                </span>
                <span style={{ color: PALETTE.chocolate }}>
                  {remainingGoalEtb.toLocaleString()} ETB remaining to reach goal
                </span>
              </div>
            </div>

            {/* PR Hall & Date Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              >
                <Calendar
                  className="w-4 h-4"
                  style={{ color: PALETTE.darkWine }}
                />
                <span>{EVENT_META.dateFull} • 6:00 PM</span>
              </span>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              >
                <MapPin
                  className="w-4 h-4"
                  style={{ color: PALETTE.darkWine }}
                />
                <span>{EVENT_META.venueShort}</span>
              </span>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => onStartPurchase()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold shadow-lg transition-all hover:opacity-95 active:scale-[0.99] focus-brand"
                style={{
                  backgroundColor: PALETTE.darkWine,
                  color: PALETTE.creamText,
                }}
              >
                <Ticket className="w-5 h-5" />
                <span>Get or Gift Tickets</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('charity-goal-section')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold border transition-colors hover:bg-brand-surface-card focus-brand"
                style={{
                  backgroundColor: 'rgba(255, 251, 240, 0.8)',
                  borderColor: PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              >
                <Target
                  className="w-5 h-5"
                  style={{ color: PALETTE.darkWine }}
                />
                <span>See Charity Target</span>
              </button>
            </div>
          </div>

          {/* Right Column: Framed Cinema/Community Visual + Floating PR Hall Availability Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl">
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -inset-3 translate-x-3 translate-y-3 rounded-[30px] border-2"
                style={{
                  borderColor: PALETTE.camel,
                  backgroundColor: 'rgba(187, 148, 87, 0.16)',
                }}
              />

              <div
                className="relative rounded-[28px] overflow-hidden border-2 shadow-2xl aspect-4/3"
                style={{
                  borderColor: PALETTE.surfaceCard,
                  backgroundColor: PALETTE.darkCoffee,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=85"
                  alt="Debre Berhan University students enjoying an evening charity movie screening together"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/900x675/432818/FFE6A7?text=Rotaract+DBU+Charity+Movie+Night';
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-brand-coffee/65 via-transparent to-transparent"
                />
              </div>

              {/* Floating PR Hall Seat Availability Badge */}
              <div
                className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 sm:right-6 rounded-2xl p-4 sm:p-5 border shadow-xl"
                style={{
                  backgroundColor: PALETTE.surfaceCard,
                  borderColor: PALETTE.camel,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="px-3.5 py-2 rounded-xl text-center shrink-0"
                      style={{
                        backgroundColor: PALETTE.darkWine,
                        color: PALETTE.creamText,
                      }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest block opacity-85">
                        DEC 12
                      </span>
                      <span className="font-display text-lg font-extrabold leading-none">
                        PR HALL
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: PALETTE.darkWine }}
                        />
                        <span
                          className="text-xs font-bold uppercase tracking-wider tabular-nums"
                          style={{ color: PALETTE.darkWine }}
                        >
                          {remainingSeats} PR Hall Seats Available
                        </span>
                      </div>
                      <p
                        className="font-display text-sm font-bold mt-0.5"
                        style={{ color: PALETTE.darkCoffee }}
                      >
                        Individual (150 ETB) &amp; Group Squad (500 ETB)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigateSection('tickets-section')}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl border transition-colors hover:bg-brand-espresso focus-brand"
                    style={{
                      borderColor: PALETTE.camel,
                      color: PALETTE.darkCoffee,
                      backgroundColor: PALETTE.surfaceSoft,
                    }}
                  >
                    Choose Pass →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
