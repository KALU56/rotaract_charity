import { useState } from 'react';
import { ArrowRight, Gift, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { MAX_QUANTITY_PER_TIER } from '@/config/tickets.config';
import { useTicketTiersQuery } from '@/hooks/useEventQueries';
import {
  calculateCartSummary,
  useCartStore,
  useCharityStore,
} from '@/store';
import { giftRecipientSchema } from './checkout.schema';

interface PassSelectionStepProps {
  onNext: () => void;
}

export function PassSelectionStep({ onNext }: PassSelectionStepProps) {
  const quantities = useCartStore((s) => s.quantities);
  const isGift = useCartStore((s) => s.isGift);
  const giftDetails = useCartStore((s) => s.giftDetails);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const toggleGift = useCartStore((s) => s.toggleGift);
  const setGiftDetails = useCartStore((s) => s.setGiftDetails);

  const raisedEtb = useCharityStore((s) => s.raisedEtb);
  const { data: ticketTiers } = useTicketTiersQuery();

  const [giftErrors, setGiftErrors] = useState<Record<string, string>>({});

  const cartSummary = calculateCartSummary(quantities);

  const handleProceed = () => {
    if (cartSummary.totalUnits === 0) {
      toast.error('Please select at least 1 Individual or Group Squad Pass.');
      return;
    }

    if (isGift) {
      const parsed = giftRecipientSchema.safeParse(giftDetails);
      if (!parsed.success) {
        const nextErrors: Record<string, string> = {};
        parsed.error.issues.forEach((issue) => {
          const field = issue.path[0];
          if (typeof field === 'string' && !nextErrors[field]) {
            nextErrors[field] = issue.message;
          }
        });
        setGiftErrors(nextErrors);
        toast.error('Please fill in the gift recipient details to continue.');
        return;
      }
    }

    setGiftErrors({});
    onNext();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 space-y-6">
        <div
          className="rounded-3xl p-6 sm:p-8 border space-y-6"
          style={{
            backgroundColor: PALETTE.surfaceCard,
            borderColor: PALETTE.camel,
          }}
        >
          <div>
            <span
              className="text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: PALETTE.chocolate }}
            >
              Step 01 of 04 • {EVENT_META.clubName}
            </span>
            <h1
              className="font-display text-2xl sm:text-3xl font-extrabold mt-1"
              style={{ color: PALETTE.darkCoffee }}
            >
              Select Your PR Hall Movie Pass
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: 'rgba(67, 40, 24, 0.82)' }}
            >
              {EVENT_META.dateFull} • {EVENT_META.timeRange} •{' '}
              {EVENT_META.venueName}
            </p>
          </div>

          {/* Two Fixed Ticket Categories */}
          <div className="space-y-4">
            {ticketTiers.map((tier) => {
              const qty = quantities[tier.id] || 0;
              return (
                <div
                  key={tier.id}
                  className="rounded-2xl p-5 border transition-colors"
                  style={{
                    backgroundColor:
                      qty > 0 ? PALETTE.surfaceSoft : PALETTE.surfaceCard,
                    borderColor:
                      qty > 0 ? PALETTE.darkWine : 'rgba(187, 148, 87, 0.55)',
                    borderWidth: qty > 0 ? '2px' : '1px',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2
                          className="font-display text-lg font-extrabold"
                          style={{ color: PALETTE.darkCoffee }}
                        >
                          {tier.name}
                        </h2>
                        <span
                          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: PALETTE.espresso,
                            color: PALETTE.darkWine,
                          }}
                        >
                          {tier.badge}
                        </span>
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: 'rgba(67, 40, 24, 0.84)' }}
                      >
                        {tier.tagline}
                      </p>
                      <div className="flex items-baseline gap-2 pt-1">
                        <p
                          className="font-display text-xl font-extrabold tabular-nums"
                          style={{ color: PALETTE.darkWine }}
                        >
                          {tier.price.toLocaleString()} ETB
                        </p>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: PALETTE.chocolate }}
                        >
                          (100% Charity Impact • Admits {tier.seatsPerUnit}{' '}
                          {tier.seatsPerUnit === 1
                            ? 'DBU student'
                            : 'DBU students'}
                          )
                        </span>
                      </div>
                    </div>

                    {/* Quantity Stepper (1–5) */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => updateQuantity(tier.id, -1)}
                        disabled={qty === 0}
                        aria-label={`Decrease ${tier.name} quantity`}
                        className="w-11 h-11 rounded-xl border flex items-center justify-center transition-colors disabled:opacity-35 hover:bg-brand-espresso focus-brand"
                        style={{
                          backgroundColor: PALETTE.surfaceCard,
                          borderColor: PALETTE.camel,
                          color: PALETTE.darkCoffee,
                        }}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span
                        aria-live="polite"
                        className="w-9 text-center font-display text-lg font-extrabold tabular-nums"
                        style={{ color: PALETTE.darkCoffee }}
                      >
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(tier.id, 1)}
                        disabled={
                          qty >= tier.available || qty >= MAX_QUANTITY_PER_TIER
                        }
                        aria-label={`Increase ${tier.name} quantity`}
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-35 hover:opacity-90 focus-brand"
                        style={{
                          backgroundColor: PALETTE.darkWine,
                          color: PALETTE.creamText,
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Gift Mode Toggle Card */}
          <div
            className="rounded-2xl p-5 border-2 transition-all"
            style={{
              backgroundColor: isGift ? PALETTE.espresso : PALETTE.surfaceSoft,
              borderColor: isGift ? PALETTE.darkWine : PALETTE.camel,
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isGift
                      ? PALETTE.darkWine
                      : PALETTE.surfaceCard,
                    color: isGift ? PALETTE.creamText : PALETTE.darkWine,
                  }}
                >
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className="font-display text-base font-extrabold"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    Gift This Ticket to a Fellow DBU Student
                  </h3>
                  <p
                    className="text-xs leading-relaxed mt-0.5"
                    style={{ color: PALETTE.chocolate }}
                  >
                    Issue the PR Hall QR pass directly in your friend’s name
                    with a personalized note.
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isGift}
                onClick={() => {
                  toggleGift();
                  setGiftErrors({});
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shrink-0 transition-all focus-brand"
                style={{
                  backgroundColor: isGift
                    ? PALETTE.darkWine
                    : PALETTE.surfaceCard,
                  color: isGift ? PALETTE.creamText : PALETTE.darkCoffee,
                  border: `1px solid ${PALETTE.camel}`,
                }}
              >
                {isGift ? 'Gift Mode ON ✓' : 'Gift Ticket'}
              </button>
            </div>

            {isGift && (
              <div
                className="mt-5 pt-5 border-t grid grid-cols-1 sm:grid-cols-2 gap-4"
                style={{ borderColor: 'rgba(111, 29, 27, 0.22)' }}
              >
                <div>
                  <label
                    htmlFor="gift-recipient-name"
                    className="block text-xs font-bold mb-1.5"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    Recipient DBU Student Full Name *
                  </label>
                  <input
                    id="gift-recipient-name"
                    type="text"
                    value={giftDetails.recipientName}
                    onChange={(e) => {
                      setGiftDetails({ recipientName: e.target.value });
                      if (giftErrors.recipientName) {
                        setGiftErrors((prev) => ({
                          ...prev,
                          recipientName: '',
                        }));
                      }
                    }}
                    placeholder="e.g., Hanna Mekonnen"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus-brand"
                    style={{
                      backgroundColor: PALETTE.surfaceCard,
                      borderColor: giftErrors.recipientName
                        ? PALETTE.darkWine
                        : PALETTE.camel,
                      color: PALETTE.darkCoffee,
                    }}
                  />
                  {giftErrors.recipientName && (
                    <p
                      className="text-xs font-semibold mt-1"
                      style={{ color: PALETTE.darkWine }}
                    >
                      {giftErrors.recipientName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="gift-recipient-contact"
                    className="block text-xs font-bold mb-1.5"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    Recipient DBU Student ID or Phone *
                  </label>
                  <input
                    id="gift-recipient-contact"
                    type="text"
                    value={giftDetails.recipientIdOrPhone}
                    onChange={(e) => {
                      setGiftDetails({ recipientIdOrPhone: e.target.value });
                      if (giftErrors.recipientIdOrPhone) {
                        setGiftErrors((prev) => ({
                          ...prev,
                          recipientIdOrPhone: '',
                        }));
                      }
                    }}
                    placeholder="e.g., DBU/1508/15 or 0911 22 33 44"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus-brand"
                    style={{
                      backgroundColor: PALETTE.surfaceCard,
                      borderColor: giftErrors.recipientIdOrPhone
                        ? PALETTE.darkWine
                        : PALETTE.camel,
                      color: PALETTE.darkCoffee,
                    }}
                  />
                  {giftErrors.recipientIdOrPhone && (
                    <p
                      className="text-xs font-semibold mt-1"
                      style={{ color: PALETTE.darkWine }}
                    >
                      {giftErrors.recipientIdOrPhone}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="gift-note"
                    className="block text-xs font-bold mb-1.5"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    Personal Gift Note (Optional)
                  </label>
                  <input
                    id="gift-note"
                    type="text"
                    value={giftDetails.personalNote}
                    onChange={(e) =>
                      setGiftDetails({ personalNote: e.target.value })
                    }
                    placeholder="e.g., Enjoy the Charity Movie Night at PR Hall!"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus-brand"
                    style={{
                      backgroundColor: PALETTE.surfaceCard,
                      borderColor: PALETTE.camel,
                      color: PALETTE.darkCoffee,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right 4 Cols: Sticky Order & Live Charity Impact Preview */}
      <aside className="lg:col-span-4 lg:sticky lg:top-28">
        <div
          className="rounded-3xl p-6 border shadow-lg space-y-5"
          style={{
            backgroundColor: PALETTE.surfaceCard,
            borderColor: PALETTE.camel,
          }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="font-display text-xl font-extrabold"
              style={{ color: PALETTE.darkCoffee }}
            >
              Order &amp; Charity Impact
            </h2>
            {isGift && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{
                  backgroundColor: PALETTE.espresso,
                  color: PALETTE.darkWine,
                }}
              >
                <Gift className="w-3 h-3" />
                <span>Gift Pass</span>
              </span>
            )}
          </div>

          {cartSummary.items.length === 0 ? (
            <p
              className="text-sm py-6 text-center rounded-2xl border border-dashed"
              style={{
                borderColor: PALETTE.camel,
                color: PALETTE.chocolate,
              }}
            >
              Select Individual or Group passes using the + buttons.
            </p>
          ) : (
            <ul className="space-y-3">
              {cartSummary.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <span
                      className="font-bold block"
                      style={{ color: PALETTE.darkCoffee }}
                    >
                      {item.shortName} × {item.qty}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: PALETTE.chocolate }}
                    >
                      Admits {item.totalSeats} DBU{' '}
                      {item.totalSeats === 1 ? 'student' : 'students'}
                    </span>
                  </div>
                  <span
                    className="font-display font-extrabold tabular-nums"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    {item.lineTotal.toLocaleString()} ETB
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Real-Time Charity Goal Impact Preview */}
          <div
            className="p-3.5 rounded-2xl border space-y-2"
            style={{
              backgroundColor: PALETTE.surfaceSoft,
              borderColor: PALETTE.camel,
            }}
          >
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span style={{ color: PALETTE.chocolate }}>
                Charity Goal After Your Order
              </span>
              <span
                className="tabular-nums"
                style={{ color: PALETTE.darkWine }}
              >
                {(raisedEtb + cartSummary.subtotal).toLocaleString()} /{' '}
                {EVENT_META.charityGoalEtb.toLocaleString()} ETB
              </span>
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: PALETTE.surfaceCard }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round(
                      ((raisedEtb + cartSummary.subtotal) /
                        EVENT_META.charityGoalEtb) *
                        100
                    )
                  )}%`,
                  backgroundColor: PALETTE.darkWine,
                }}
              />
            </div>
            <p className="text-[11px]" style={{ color: PALETTE.chocolate }}>
              100% of your{' '}
              <strong>{cartSummary.subtotal.toLocaleString()} ETB</strong> goes
              directly to vulnerable families &amp; children in Debre Berhan.
            </p>
          </div>

          <div
            className="pt-4 border-t space-y-2 text-sm"
            style={{ borderColor: 'rgba(187, 148, 87, 0.45)' }}
          >
            <div className="flex justify-between">
              <span style={{ color: PALETTE.chocolate }}>
                PR Hall Admissions
              </span>
              <span className="font-bold tabular-nums">
                {cartSummary.totalSeats} Student(s)
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: PALETTE.chocolate }}>Platform Fee</span>
              <span className="font-bold" style={{ color: PALETTE.darkWine }}>
                0 ETB (100% Charity)
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span
                className="font-display text-base font-extrabold"
                style={{ color: PALETTE.darkCoffee }}
              >
                Total Contribution
              </span>
              <span
                className="font-display text-2xl font-extrabold tabular-nums"
                style={{ color: PALETTE.darkWine }}
              >
                {cartSummary.subtotal.toLocaleString()} ETB
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleProceed}
            disabled={cartSummary.totalUnits === 0}
            className="w-full py-4 px-5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:opacity-95 disabled:opacity-45 focus-brand"
            style={{
              backgroundColor: PALETTE.darkWine,
              color: PALETTE.creamText,
            }}
          >
            <span>Continue to Student Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}
