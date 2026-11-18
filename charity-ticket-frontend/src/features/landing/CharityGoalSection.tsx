import { Gift, Heart, HeartHandshake } from 'lucide-react';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { calculateCharityMetrics, useCharityStore } from '@/store';
import type { TicketTierId } from '@/types';

interface CharityGoalSectionProps {
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
}

export function CharityGoalSection({
  onStartPurchase,
}: CharityGoalSectionProps) {
  const raisedEtb = useCharityStore((s) => s.raisedEtb);
  const studentContributors = useCharityStore((s) => s.studentContributors);
  const contributorFeed = useCharityStore((s) => s.contributorFeed);

  const { goalProgressPercent, remainingGoalEtb } = calculateCharityMetrics(
    raisedEtb,
    studentContributors
  );

  return (
    <section
      id="charity-goal-section"
      aria-labelledby="charity-goal-heading"
      className="py-20 sm:py-24 border-t"
      style={{
        backgroundColor: PALETTE.surfaceCard,
        borderColor: 'rgba(187, 148, 87, 0.38)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.16em]"
            style={{
              backgroundColor: PALETTE.surfaceSoft,
              borderColor: PALETTE.camel,
              color: PALETTE.chocolate,
            }}
          >
            <Heart className="w-3.5 h-3.5" style={{ color: PALETTE.darkWine }} />
            <span>LIVE CHARITY GOAL &amp; TRANSPARENCY LEDGER</span>
          </div>
          <h2
            id="charity-goal-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.12]"
            style={{ color: PALETTE.darkCoffee }}
          >
            Every Ticket Purchased by DBU Students{' '}
            <span style={{ color: PALETTE.darkWine }}>Builds Real Impact.</span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'rgba(67, 40, 24, 0.86)' }}
          >
            Track our live <strong>45,000 ETB</strong> charity goal, see how
            much DBU students have contributed so far, and join the movement
            supporting local families in Debre Berhan.
          </p>
        </header>

        {/* 4 Key Live Charity Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            {
              label: 'Community Charity Target',
              value: `${EVENT_META.charityGoalEtb.toLocaleString()} ETB`,
              sub: '100% for Debre Berhan Families & Children',
              highlight: false,
            },
            {
              label: 'Collected from DBU Students',
              value: `${raisedEtb.toLocaleString()} ETB`,
              sub: `${goalProgressPercent}% of target reached`,
              highlight: true,
            },
            {
              label: 'Remaining to Goal',
              value: `${remainingGoalEtb.toLocaleString()} ETB`,
              sub: `Only ${Math.ceil(remainingGoalEtb / 150)} more single passes`,
              highlight: false,
            },
            {
              label: 'DBU Student Contributors',
              value: `${studentContributors} Students`,
              sub: 'Across all DBU colleges & dorms',
              highlight: false,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl p-6 border flex flex-col justify-between"
              style={{
                backgroundColor: stat.highlight
                  ? PALETTE.espresso
                  : PALETTE.surfaceSoft,
                borderColor: stat.highlight
                  ? PALETTE.darkWine
                  : 'rgba(187, 148, 87, 0.6)',
                borderWidth: stat.highlight ? '2px' : '1px',
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-[0.14em]"
                style={{ color: PALETTE.chocolate }}
              >
                {stat.label}
              </span>
              <span
                className="font-display text-3xl font-extrabold my-2 tabular-nums"
                style={{
                  color: stat.highlight ? PALETTE.darkWine : PALETTE.darkCoffee,
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: PALETTE.chocolate }}
              >
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Live DBU Student Contributor Feed */}
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-3xl p-6 sm:p-8 border space-y-5"
            style={{
              backgroundColor: PALETTE.surfaceSoft,
              borderColor: PALETTE.camel,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3
                  className="font-display text-xl font-extrabold"
                  style={{ color: PALETTE.darkCoffee }}
                >
                  Recent DBU Contributors
                </h3>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: PALETTE.chocolate }}
                >
                  Live stream of DBU student passes &amp; gifts
                </p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: PALETTE.espresso,
                  color: PALETTE.darkWine,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: PALETTE.darkWine }}
                />
                <span>LIVE</span>
              </span>
            </div>

            <ul className="space-y-3">
              {contributorFeed.map((entry) => (
                <li
                  key={entry.id}
                  className="p-3.5 rounded-2xl border flex items-start justify-between gap-3"
                  style={{
                    backgroundColor: PALETTE.surfaceCard,
                    borderColor: 'rgba(187, 148, 87, 0.5)',
                  }}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-display text-xs font-extrabold"
                        style={{ color: PALETTE.darkCoffee }}
                      >
                        {entry.name}
                      </span>
                      {entry.isGift && (
                        <Gift
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: PALETTE.darkWine }}
                        />
                      )}
                    </div>
                    <p
                      className="text-xs leading-snug"
                      style={{ color: PALETTE.chocolate }}
                    >
                      {entry.action}
                    </p>
                    <span
                      className="text-[10px] font-semibold block pt-0.5"
                      style={{ color: 'rgba(153, 88, 42, 0.8)' }}
                    >
                      {entry.time}
                    </span>
                  </div>

                  <span
                    className="font-display text-xs font-extrabold px-2.5 py-1 rounded-lg shrink-0 tabular-nums"
                    style={{
                      backgroundColor: PALETTE.espresso,
                      color: PALETTE.darkWine,
                    }}
                  >
                    +{entry.amount} ETB
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onStartPurchase()}
              className="w-full py-3.5 px-5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 focus-brand"
              style={{
                backgroundColor: PALETTE.darkWine,
                color: PALETTE.creamText,
              }}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Add Your Contribution (From 150 ETB)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
