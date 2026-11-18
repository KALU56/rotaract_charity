import { Award, Calendar, Clock, Copy, MapPin } from 'lucide-react';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { useClipboard } from '@/hooks/useClipboard';

interface HighlightsSectionProps {
  onOpenVenueModal: () => void;
}

export function HighlightsSection({ onOpenVenueModal }: HighlightsSectionProps) {
  const { copy } = useClipboard();

  return (
    <section
      id="info-section"
      aria-label="Movie Night Event Information"
      className="py-20 sm:py-24 border-t scroll-mt-24"
      style={{
        backgroundColor: PALETTE.surfaceCard,
        borderColor: 'rgba(187, 148, 87, 0.35)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Card Event Information Row + Architectural PR Hall Wayfinding */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Calendar,
                label: 'Date',
                primary: EVENT_META.dateFull,
                secondary: 'Mark your DBU semester calendar',
              },
              {
                icon: Clock,
                label: 'Time',
                primary: 'Doors 5:30 PM | Show 6:00 PM',
                secondary: 'Screening runs 6:00 PM – 9:30 PM EAT',
              },
              {
                icon: MapPin,
                label: 'Venue',
                primary: EVENT_META.venueName,
                secondary: 'Beside Main Administration & Registrar Square',
              },
              {
                icon: Award,
                label: 'Organizer',
                primary: EVENT_META.clubName,
                secondary: '100% Local Debre Berhan Community Charity Drive',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-3xl p-6 border flex flex-col justify-between"
                  style={{
                    backgroundColor: PALETTE.surfaceSoft,
                    borderColor: 'rgba(187, 148, 87, 0.55)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                        style={{
                          backgroundColor: PALETTE.surfaceCard,
                          borderColor: PALETTE.camel,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: PALETTE.darkWine }}
                        />
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-[0.14em]"
                        style={{ color: PALETTE.chocolate }}
                      >
                        {card.label}
                      </span>
                    </div>
                    <h3
                      className="font-display text-lg font-extrabold leading-snug mb-1.5"
                      style={{ color: PALETTE.darkCoffee }}
                    >
                      {card.primary}
                    </h3>
                  </div>
                  <p
                    className="text-xs leading-relaxed pt-3 border-t"
                    style={{
                      borderColor: 'rgba(187, 148, 87, 0.3)',
                      color: PALETTE.chocolate,
                    }}
                  >
                    {card.secondary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* PR Hall Campus Wayfinding Showcase */}
          <div
            className="rounded-3xl p-6 sm:p-8 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            style={{
              backgroundColor: PALETTE.espresso,
              borderColor: PALETTE.camel,
            }}
          >
            <div className="lg:col-span-7 space-y-4">
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]"
                style={{ color: PALETTE.darkWine }}
              >
                <MapPin className="w-4 h-4" />
                <span>Debre Berhan University • Main Campus</span>
              </span>
              <h3
                className="font-display text-2xl sm:text-3xl font-extrabold"
                style={{ color: PALETTE.darkCoffee }}
              >
                {EVENT_META.venueName}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'rgba(67, 40, 24, 0.88)' }}
              >
                {EVENT_META.venueAddress}. Located at the heart of DBU Main
                Campus next to Registrar Square—just a short walk from all
                student dormitories and libraries.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onOpenVenueModal}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold shadow-sm hover:opacity-95 focus-brand"
                  style={{
                    backgroundColor: PALETTE.darkWine,
                    color: PALETTE.creamText,
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Campus Entry Guide</span>
                </button>

                <button
                  type="button"
                  onClick={() => copy(EVENT_META.venueAddress, 'Venue location')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold border hover:bg-brand-surface-card focus-brand"
                  style={{
                    backgroundColor: PALETTE.surfaceCard,
                    borderColor: PALETTE.camel,
                    color: PALETTE.darkCoffee,
                  }}
                >
                  <Copy
                    className="w-4 h-4"
                    style={{ color: PALETTE.darkWine }}
                  />
                  <span>Copy Venue Location</span>
                </button>
              </div>
            </div>

            {/* Architectural PR Hall Campus Wayfinding Map SVG */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-4 border shadow-inner"
                style={{
                  backgroundColor: PALETTE.surfaceCard,
                  borderColor: PALETTE.camel,
                }}
              >
                <svg
                  viewBox="0 0 360 190"
                  className="w-full h-auto rounded-xl"
                  role="img"
                  aria-label="Debre Berhan University campus wayfinding map showing PR Hall next to Registrar Square"
                >
                  <rect width="360" height="190" fill="#FFF5DC" />
                  <path
                    d="M0 144 Q 170 132 360 150"
                    stroke="#BB9457"
                    strokeWidth="12"
                    fill="none"
                    strokeOpacity="0.45"
                  />
                  <path
                    d="M88 0 L 104 190"
                    stroke="#BB9457"
                    strokeWidth="10"
                    fill="none"
                    strokeOpacity="0.45"
                  />
                  <rect
                    x="128"
                    y="26"
                    width="202"
                    height="96"
                    rx="16"
                    fill="#FFE6A7"
                    stroke="#BB9457"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="229"
                    cy="70"
                    r="22"
                    fill="#6F1D1B"
                    fillOpacity="0.14"
                  />
                  <circle cx="229" cy="70" r="9" fill="#6F1D1B" />
                  <circle cx="229" cy="70" r="3.5" fill="#FFFDF7" />
                  <text
                    x="229"
                    y="104"
                    textAnchor="middle"
                    fill="#432818"
                    fontSize="11.5"
                    fontWeight="800"
                    fontFamily="Manrope, sans-serif"
                  >
                    PR Hall (DBU Main Campus)
                  </text>
                  <text
                    x="28"
                    y="132"
                    fill="#99582A"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                  >
                    DBU Dormitory Path
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
