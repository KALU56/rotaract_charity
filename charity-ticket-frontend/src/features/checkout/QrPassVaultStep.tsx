import { CheckCircle2, Clock, Download, Gift, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { RotaractMovieEmblem } from '@/components/common/RotaractMovieEmblem';
import { VectorQrCode } from '@/components/common/VectorQrCode';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { orderService } from '@/services';
import { useOrderStore } from '@/store';
import type { TicketTierId } from '@/types';

interface QrPassVaultStepProps {
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
}

export function QrPassVaultStep({ onStartPurchase }: QrPassVaultStepProps) {
  const orders = useOrderStore((s) => s.orders);
  const activeOrderId = useOrderStore((s) => s.activeOrderId);
  const setActiveOrderId = useOrderStore((s) => s.setActiveOrderId);
  const toggleOrderApproval = useOrderStore((s) => s.toggleOrderApproval);

  const activeOrder =
    orders.find((o) => o.orderId === activeOrderId) || orders[0];

  const handleToggleApproval = async (orderId: string) => {
    const nextStatus = toggleOrderApproval(orderId);
    if (!nextStatus) return;

    await orderService.updateOrderStatus(orderId, nextStatus).catch(() => {
      // Mock service sync best-effort
    });

    if (nextStatus === 'Verified & Approved') {
      toast.success(`Order ${orderId} verified — PR Hall QR pass unlocked!`);
    } else {
      toast.info(
        `Order ${orderId} set back to Pending Receipt Verification.`
      );
    }
  };

  return (
    <div className="space-y-10">
      <div
        className="rounded-3xl p-6 sm:p-8 border flex flex-col lg:flex-row lg:items-center justify-between gap-6"
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
            Step 04 of 04 • {EVENT_META.clubName}
          </span>
          <h1
            className="font-display text-2xl sm:text-3xl font-extrabold mt-1"
            style={{ color: PALETTE.darkCoffee }}
          >
            Digital PR Hall QR Passes
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: 'rgba(67, 40, 24, 0.85)' }}
          >
            Present your verified QR pass at {EVENT_META.venueName} on{' '}
            {EVENT_META.dateFull} (Doors open 5:30 PM).
          </p>
        </div>

        {/* Rotaract Treasurer Approval Simulator Toggle */}
        {activeOrder && (
          <div
            className="p-4 rounded-2xl border flex flex-wrap items-center gap-3"
            style={{
              backgroundColor: PALETTE.surfaceSoft,
              borderColor: PALETTE.camel,
            }}
          >
            <div className="text-xs">
              <span
                className="font-bold block"
                style={{ color: PALETTE.darkCoffee }}
              >
                Order {activeOrder.orderId}: {activeOrder.status}
              </span>
              <span style={{ color: PALETTE.chocolate }}>
                Simulate Rotaract Treasurer Approval:
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggleApproval(activeOrder.orderId)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-opacity hover:opacity-95 focus-brand"
              style={{
                backgroundColor:
                  activeOrder.status === 'Verified & Approved'
                    ? PALETTE.darkCoffee
                    : PALETTE.darkWine,
                color: PALETTE.creamText,
              }}
            >
              {activeOrder.status === 'Verified & Approved'
                ? 'Set Pending Receipt Check'
                : 'Approve Payment & Unlock QR'}
            </button>
          </div>
        )}
      </div>

      {/* Scannable Vector QR Pass Cards */}
      {activeOrder && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeOrder.tickets.map((tkt) => {
            const isApproved = activeOrder.status === 'Verified & Approved';
            return (
              <article
                key={tkt.ticketCode}
                className="rounded-3xl border overflow-hidden shadow-lg flex flex-col justify-between"
                style={{
                  backgroundColor: PALETTE.surfaceCard,
                  borderColor: isApproved ? PALETTE.darkWine : PALETTE.camel,
                  borderWidth: isApproved ? '2px' : '1px',
                }}
              >
                {/* Gifted By Ribbon */}
                {tkt.isGiftPass && (
                  <div
                    className="px-5 py-2 text-xs font-extrabold uppercase tracking-wider flex items-center justify-between gap-2"
                    style={{
                      backgroundColor: PALETTE.espresso,
                      color: PALETTE.darkWine,
                      borderBottom: `1px solid ${PALETTE.camel}`,
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5" />
                      <span>GIFTED BY {tkt.giftedBy}</span>
                    </span>
                    <span className="text-[11px] font-bold">
                      For {tkt.holderName}
                    </span>
                  </div>
                )}

                {/* Pass Header */}
                <div
                  className="p-5 sm:p-6 flex items-center justify-between gap-4"
                  style={{
                    backgroundColor: isApproved
                      ? PALETTE.darkWine
                      : PALETTE.darkCoffee,
                    color: PALETTE.creamText,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <RotaractMovieEmblem className="w-9 h-9 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-85 block">
                        Rotaract Debre Berhan
                      </span>
                      <h2 className="font-display text-lg font-extrabold leading-tight">
                        {tkt.tierName}
                      </h2>
                    </div>
                  </div>

                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shrink-0"
                    style={{
                      backgroundColor: isApproved
                        ? PALETTE.espresso
                        : 'rgba(255, 253, 247, 0.16)',
                      color: isApproved
                        ? PALETTE.darkCoffee
                        : PALETTE.creamText,
                    }}
                  >
                    {isApproved ? 'PR Hall Verified' : 'Pending Check'}
                  </span>
                </div>

                {/* Pass Details + Vector QR */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider block"
                        style={{ color: PALETTE.chocolate }}
                      >
                        DBU Pass Holder
                      </span>
                      <span
                        className="font-display text-lg font-extrabold block"
                        style={{ color: PALETTE.darkCoffee }}
                      >
                        {tkt.holderName}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: PALETTE.darkWine }}
                      >
                        ID / Contact: {tkt.holderStudentId}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span
                          className="font-bold uppercase tracking-wider block text-[10px]"
                          style={{ color: PALETTE.chocolate }}
                        >
                          Date &amp; Time
                        </span>
                        <span className="font-semibold">Dec 12 • 6:00 PM</span>
                      </div>
                      <div>
                        <span
                          className="font-bold uppercase tracking-wider block text-[10px]"
                          style={{ color: PALETTE.chocolate }}
                        >
                          Admits
                        </span>
                        <span className="font-semibold">
                          {tkt.seatsCount}{' '}
                          {tkt.seatsCount === 1
                            ? 'Student'
                            : 'Students (Squad)'}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span
                        className="font-bold uppercase tracking-wider block text-[10px]"
                        style={{ color: PALETTE.chocolate }}
                      >
                        PR Hall Seat Zone
                      </span>
                      <span className="font-semibold">{tkt.seatZone}</span>
                    </div>

                    {tkt.giftNote && (
                      <p
                        className="text-xs italic p-2.5 rounded-xl border"
                        style={{
                          backgroundColor: PALETTE.surfaceSoft,
                          borderColor: PALETTE.camel,
                          color: PALETTE.darkCoffee,
                        }}
                      >
                        “{tkt.giftNote}”
                      </p>
                    )}
                  </div>

                  {/* QR Code Box */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center">
                    <div
                      className="p-3 rounded-2xl border relative"
                      style={{
                        backgroundColor: '#FFFDF7',
                        borderColor: PALETTE.camel,
                      }}
                    >
                      <div className={isApproved ? '' : 'blur-[3px] opacity-45'}>
                        <VectorQrCode seed={tkt.ticketCode} size={124} />
                      </div>
                      {!isApproved && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                          <Clock
                            className="w-6 h-6 mb-1"
                            style={{ color: PALETTE.darkWine }}
                          />
                          <span
                            className="text-[10px] font-extrabold uppercase leading-tight px-2 py-1 rounded-lg"
                            style={{
                              backgroundColor: PALETTE.espresso,
                              color: PALETTE.darkCoffee,
                            }}
                          >
                            Pending Receipt Check
                          </span>
                        </div>
                      )}
                    </div>
                    <span
                      className="font-mono text-[11px] font-bold mt-2 tracking-wider"
                      style={{ color: PALETTE.chocolate }}
                    >
                      {tkt.ticketCode}
                    </span>
                  </div>
                </div>

                {/* Pass Footer */}
                <div
                  className="px-6 py-3.5 border-t border-dashed flex items-center justify-between text-xs"
                  style={{
                    backgroundColor: PALETTE.surfaceSoft,
                    borderColor: PALETTE.camel,
                  }}
                >
                  <span style={{ color: PALETTE.chocolate }}>
                    100% Charity Impact • {tkt.price} ETB
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      isApproved
                        ? toast.success(
                            `Pass ${tkt.ticketCode} ready for PR Hall gate check-in.`
                          )
                        : toast.info(
                            'QR pass unlocks once Rotaract Treasurer verifies your receipt.'
                          )
                    }
                    className="inline-flex items-center gap-1.5 font-bold hover:underline focus-brand"
                    style={{ color: PALETTE.darkWine }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save / Print Pass</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Student Donor Ledger Table */}
      <section
        aria-labelledby="ledger-heading"
        className="rounded-3xl p-6 sm:p-8 border space-y-5"
        style={{
          backgroundColor: PALETTE.surfaceCard,
          borderColor: PALETTE.camel,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2
              id="ledger-heading"
              className="font-display text-xl font-extrabold"
              style={{ color: PALETTE.darkCoffee }}
            >
              Student Donor &amp; Pass Ledger
            </h2>
            <p className="text-xs mt-0.5" style={{ color: PALETTE.chocolate }}>
              Click any order row to inspect its PR Hall QR passes and
              verification status.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onStartPurchase('individual', true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border hover:bg-[#FFF5DC] focus-brand"
              style={{
                borderColor: PALETTE.camel,
                color: PALETTE.darkCoffee,
              }}
            >
              <Gift className="w-4 h-4" style={{ color: PALETTE.darkWine }} />
              <span>Gift a Ticket</span>
            </button>
            <button
              type="button"
              onClick={() => onStartPurchase()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:opacity-95 focus-brand"
              style={{
                backgroundColor: PALETTE.darkWine,
                color: PALETTE.creamText,
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Buy More Passes</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr
                className="border-b text-xs uppercase tracking-wider"
                style={{
                  borderColor: PALETTE.camel,
                  color: PALETTE.chocolate,
                }}
              >
                <th className="py-3 pr-4">Order ID</th>
                <th className="py-3 px-4">Student / Recipient</th>
                <th className="py-3 px-4">Pass Category</th>
                <th className="py-3 px-4">Charity Amount</th>
                <th className="py-3 pl-4">Status</th>
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{ borderColor: 'rgba(187, 148, 87, 0.3)' }}
            >
              {orders.map((ord) => {
                const isSelected = ord.orderId === activeOrder?.orderId;
                return (
                  <tr
                    key={ord.orderId}
                    onClick={() => setActiveOrderId(ord.orderId)}
                    className="cursor-pointer transition-colors hover:bg-[#FFF5DC]"
                    style={{
                      backgroundColor: isSelected
                        ? PALETTE.surfaceSoft
                        : 'transparent',
                    }}
                  >
                    <td className="py-3.5 pr-4 font-display font-bold tabular-nums">
                      {ord.orderId}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block">
                        {ord.isGift
                          ? `${ord.giftDetails?.recipientName} (Gifted by ${ord.buyerName})`
                          : `${ord.buyerName} (${ord.studentId})`}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: PALETTE.chocolate }}
                      >
                        {ord.createdAt}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold">
                      {ord.tickets.map((t) => t.tierName).join(', ')}
                    </td>
                    <td
                      className="py-3.5 px-4 font-display font-extrabold tabular-nums"
                      style={{ color: PALETTE.darkWine }}
                    >
                      {ord.totalEtb.toLocaleString()} ETB
                    </td>
                    <td className="py-3.5 pl-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor:
                            ord.status === 'Verified & Approved'
                              ? PALETTE.espresso
                              : PALETTE.surfaceSoft,
                          color:
                            ord.status === 'Verified & Approved'
                              ? PALETTE.darkCoffee
                              : PALETTE.darkWine,
                          border: `1px solid ${PALETTE.camel}`,
                        }}
                      >
                        {ord.status === 'Verified & Approved' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{ord.status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
