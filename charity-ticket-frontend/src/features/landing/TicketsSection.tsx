import { Check, Gift, Sparkles, Ticket } from 'lucide-react';
import { PALETTE } from '@/config/theme.config';
import { useTicketTiersQuery } from '@/hooks/useEventQueries';
import type { TicketTierId } from '@/types';

interface TicketsSectionProps {
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
}

export function TicketsSection({ onStartPurchase }: TicketsSectionProps) {
  const { data: ticketTiers } = useTicketTiersQuery();
  return (
    <section
      id="tickets-section"
      aria-labelledby="tickets-heading"
      className="py-20 sm:py-24 border-t"
      style={{
        backgroundColor: PALETTE.espresso,
        borderColor: 'rgba(153, 88, 42, 0.2)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.16em]"
            style={{
              backgroundColor: PALETTE.surfaceCard,
              borderColor: PALETTE.camel,
              color: PALETTE.chocolate,
            }}
          >
            <span>STUDENT TICKET CATEGORIES &amp; GIFTING</span>
          </div>
          <h2
            id="tickets-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.12]"
            style={{ color: PALETTE.darkCoffee }}
          >
            Choose Your Pass or{' '}
            <span style={{ color: PALETTE.darkWine }}>Gift a Friend.</span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'rgba(67, 40, 24, 0.88)' }}
          >
            Student admission pricing for{' '}
            <strong>PR Hall, Debre Berhan University</strong>. Every Birr
            contributed by DBU students goes straight to vulnerable families and
            children in Debre Berhan toward our <strong>45,000 ETB</strong>{' '}
            goal.
          </p>
        </header>

        {/* Two Perforated Ticket-Stub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {ticketTiers.map((tier) => (
            <article
              key={tier.id}
              className="card-lift rounded-3xl border flex flex-col justify-between relative overflow-hidden"
              style={{
                backgroundColor: PALETTE.surfaceCard,
                borderColor: tier.featured
                  ? PALETTE.darkWine
                  : 'rgba(187, 148, 87, 0.65)',
                borderWidth: tier.featured ? '2px' : '1px',
              }}
            >
              <div
                className="h-2.5 w-full"
                style={{
                  backgroundColor: tier.featured
                    ? PALETTE.darkWine
                    : PALETTE.camel,
                }}
              />

              {/* Upper Ticket Body */}
              <div className="p-7 sm:p-8 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: tier.featured
                        ? PALETTE.darkWine
                        : PALETTE.surfaceSoft,
                      color: tier.featured
                        ? PALETTE.creamText
                        : PALETTE.chocolate,
                    }}
                  >
                    {tier.featured && <Sparkles className="w-3.5 h-3.5" />}
                    {tier.badge}
                  </span>
                  <span
                    className="text-xs font-bold tabular-nums"
                    style={{ color: PALETTE.darkWine }}
                  >
                    {tier.available} passes remaining
                  </span>
                </div>

                <h3
                  className="font-display text-2xl sm:text-3xl font-extrabold"
                  style={{ color: PALETTE.darkCoffee }}
                >
                  {tier.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mt-2"
                  style={{ color: PALETTE.chocolate }}
                >
                  {tier.tagline}
                </p>

                {/* Price & Charity Contribution Badge */}
                <div className="mt-6 flex flex-wrap items-baseline gap-3">
                  <span
                    className="font-display text-5xl font-extrabold tracking-tight tabular-nums"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    {tier.price.toLocaleString()}
                  </span>
                  <span
                    className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: PALETTE.espresso,
                      color: PALETTE.darkWine,
                    }}
                  >
                    ETB • 100% Charity
                  </span>
                  {tier.originalPrice && (
                    <span
                      className="text-sm font-semibold line-through opacity-65 tabular-nums"
                      style={{ color: PALETTE.chocolate }}
                    >
                      {tier.originalPrice} ETB
                    </span>
                  )}
                </div>
              </div>

              {/* Perforated Ticket-Stub Divider */}
              <div className="relative flex items-center my-1" aria-hidden="true">
                <div
                  className="w-5 h-9 rounded-r-full -ml-px border-y border-r"
                  style={{
                    backgroundColor: PALETTE.espresso,
                    borderColor: tier.featured
                      ? PALETTE.darkWine
                      : 'rgba(187, 148, 87, 0.65)',
                  }}
                />
                <div
                  className="flex-1 border-t-2 border-dashed mx-2"
                  style={{ borderColor: 'rgba(187, 148, 87, 0.65)' }}
                />
                <div
                  className="w-5 h-9 rounded-l-full -mr-px border-y border-l"
                  style={{
                    backgroundColor: PALETTE.espresso,
                    borderColor: tier.featured
                      ? PALETTE.darkWine
                      : 'rgba(187, 148, 87, 0.65)',
                  }}
                />
              </div>

              {/* Lower Benefits + Buy for Myself & Gift This Pass Buttons */}
              <div className="p-7 sm:p-8 pt-5 flex-1 flex flex-col justify-between">
                <ul className="space-y-3 mb-7">
                  {tier.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed"
                      style={{ color: 'rgba(67, 40, 24, 0.9)' }}
                    >
                      <Check
                        className="w-4 h-4 shrink-0 mt-1"
                        style={{ color: PALETTE.darkWine }}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onStartPurchase(tier.id, false)}
                    className="py-3.5 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.99] focus-brand"
                    style={{
                      backgroundColor: PALETTE.darkWine,
                      color: PALETTE.creamText,
                    }}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Buy for Myself</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartPurchase(tier.id, true)}
                    className="py-3.5 px-4 rounded-2xl text-sm font-bold border flex items-center justify-center gap-2 transition-colors hover:bg-[#FFE6A7]/60 focus-brand"
                    style={{
                      backgroundColor: PALETTE.surfaceSoft,
                      borderColor: PALETTE.camel,
                      color: PALETTE.darkCoffee,
                    }}
                  >
                    <Gift
                      className="w-4 h-4"
                      style={{ color: PALETTE.darkWine }}
                    />
                    <span>Gift This Pass</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
