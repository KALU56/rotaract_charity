import { CheckCircle2, Clock, Gift, QrCode } from 'lucide-react';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import {
  calculateCharityMetrics,
  useCharityStore,
  useOrderStore,
} from '@/store';

interface ConfirmationStepProps {
  onViewQrPasses: () => void;
}

export function ConfirmationStep({ onViewQrPasses }: ConfirmationStepProps) {
  const raisedEtb = useCharityStore((s) => s.raisedEtb);
  const studentContributors = useCharityStore((s) => s.studentContributors);
  const lastContributionAmount = useCharityStore(
    (s) => s.lastContributionAmount
  );

  const orders = useOrderStore((s) => s.orders);
  const activeOrderId = useOrderStore((s) => s.activeOrderId);

  const activeOrder =
    orders.find((o) => o.orderId === activeOrderId) || orders[0];

  const { goalProgressPercent } = calculateCharityMetrics(
    raisedEtb,
    studentContributors
  );

  if (!activeOrder) return null;

  return (
    <div
      className="max-w-2xl mx-auto rounded-3xl p-7 sm:p-10 border shadow-xl text-center space-y-6"
      style={{
        backgroundColor: PALETTE.surfaceCard,
        borderColor: PALETTE.camel,
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
        style={{
          backgroundColor: PALETTE.espresso,
          border: `2px solid ${PALETTE.camel}`,
        }}
      >
        {activeOrder.isGift ? (
          <Gift className="w-8 h-8" style={{ color: PALETTE.darkWine }} />
        ) : (
          <CheckCircle2
            className="w-8 h-8"
            style={{ color: PALETTE.darkWine }}
          />
        )}
      </div>

      <div className="space-y-2">
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{
            backgroundColor: PALETTE.surfaceSoft,
            color: PALETTE.darkWine,
            border: `1px solid ${PALETTE.camel}`,
          }}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{activeOrder.status}</span>
        </span>
        <h1
          className="font-display text-2xl sm:text-3xl font-extrabold"
          style={{ color: PALETTE.darkCoffee }}
        >
          {activeOrder.isGift
            ? `Gift Pass Issued for ${activeOrder.giftDetails?.recipientName}!`
            : 'Thank You for Supporting Debre Berhan Families!'}
        </h1>
        <p
          className="text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: 'rgba(67, 40, 24, 0.85)' }}
        >
          Your <strong>{activeOrder.paymentMethod}</strong> receipt (
          {activeOrder.transactionRef}) has been logged, and your{' '}
          <strong>{activeOrder.totalEtb.toLocaleString()} ETB</strong>{' '}
          contribution for local Debre Berhan community relief is now reflected
          in the live charity goal!
        </p>
      </div>

      {/* Live Updated Charity Progress Box */}
      <div
        className="rounded-2xl p-5 border text-left space-y-2.5"
        style={{
          backgroundColor: PALETTE.espresso,
          borderColor: PALETTE.camel,
        }}
      >
        <div className="flex items-center justify-between text-xs font-extrabold">
          <span style={{ color: PALETTE.darkCoffee }}>
            Updated Rotaract DBU Charity Goal
          </span>
          <span className="tabular-nums" style={{ color: PALETTE.darkWine }}>
            {raisedEtb.toLocaleString()} /{' '}
            {EVENT_META.charityGoalEtb.toLocaleString()} ETB (
            {goalProgressPercent}%)
          </span>
        </div>
        <div
          className="w-full h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: PALETTE.surfaceCard }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${goalProgressPercent}%`,
              backgroundColor: PALETTE.darkWine,
            }}
          />
        </div>
        {lastContributionAmount > 0 && (
          <p className="text-xs font-bold" style={{ color: PALETTE.darkWine }}>
            +{lastContributionAmount.toLocaleString()} ETB added by{' '}
            {activeOrder.buyerName} ({activeOrder.studentId})
          </p>
        )}
      </div>

      {/* Order Summary Box */}
      <div
        className="rounded-2xl p-5 border text-left space-y-2.5 text-xs"
        style={{
          backgroundColor: PALETTE.surfaceSoft,
          borderColor: PALETTE.camel,
        }}
      >
        <div className="flex justify-between">
          <span style={{ color: PALETTE.chocolate }}>Confirmation Code</span>
          <span className="font-display font-extrabold tabular-nums">
            {activeOrder.orderId}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: PALETTE.chocolate }}>Pass Holder</span>
          <span className="font-bold">
            {activeOrder.isGift
              ? `${activeOrder.giftDetails?.recipientName} (Gifted by ${activeOrder.buyerName})`
              : `${activeOrder.buyerName} (${activeOrder.studentId})`}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: PALETTE.chocolate }}>Venue &amp; Date</span>
          <span className="font-semibold">
            {EVENT_META.venueShort} • {EVENT_META.dateShort}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewQrPasses}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold shadow-md hover:opacity-95 focus-brand"
        style={{
          backgroundColor: PALETTE.darkWine,
          color: PALETTE.creamText,
        }}
      >
        <QrCode className="w-4 h-4" />
        <span>View &amp; Download PR Hall QR Pass</span>
      </button>
    </div>
  );
}
