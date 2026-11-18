import { useEffect } from 'react';
import { Copy, Ticket, X } from 'lucide-react';
import { EVENT_META } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { useClipboard } from '@/hooks/useClipboard';

interface PrHallLocationModalProps {
  open: boolean;
  onClose: () => void;
  onBuyTickets: () => void;
}

export function PrHallLocationModal({
  open,
  onClose,
  onBuyTickets,
}: PrHallLocationModalProps) {
  const { copy } = useClipboard();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pr-hall-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-coffee/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-w-lg w-full rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5"
        style={{
          backgroundColor: PALETTE.surfaceCard,
          borderColor: PALETTE.camel,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{ color: PALETTE.darkWine }}
            >
              Debre Berhan University (DBU)
            </span>
            <h3
              id="pr-hall-modal-title"
              className="font-display text-2xl font-extrabold mt-0.5"
              style={{ color: PALETTE.darkCoffee }}
            >
              PR Hall — Campus Entry Guide
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close venue modal"
            className="p-2 rounded-xl border hover:bg-brand-surface-soft focus-brand"
            style={{ borderColor: PALETTE.camel, color: PALETTE.darkCoffee }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className="rounded-2xl p-4 border space-y-2.5 text-sm"
          style={{
            backgroundColor: PALETTE.surfaceSoft,
            borderColor: PALETTE.camel,
          }}
        >
          <p className="font-bold" style={{ color: PALETTE.darkCoffee }}>
            {EVENT_META.venueAddress}
          </p>
          <ul
            className="space-y-1.5 text-xs"
            style={{ color: 'rgba(67, 40, 24, 0.88)' }}
          >
            <li>
              • <strong>Campus Landmark:</strong> Directly adjacent to the DBU
              Main Administration &amp; Registrar Square.
            </li>
            <li>
              • <strong>Check-In (5:30 PM):</strong> Present your digital QR
              pass + DBU Student ID at PR Hall Main Student Gate.
            </li>
            <li>
              • <strong>Charity Assurance:</strong> 100% of every 150 ETB and
              500 ETB pass goes directly into the Rotaract DBU Charity Fund.
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              copy(EVENT_META.venueAddress, 'PR Hall venue location')
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border hover:bg-brand-surface-soft focus-brand"
            style={{
              borderColor: PALETTE.camel,
              color: PALETTE.darkCoffee,
            }}
          >
            <Copy className="w-3.5 h-3.5" style={{ color: PALETTE.darkWine }} />
            <span>Copy Venue Location</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBuyTickets();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:opacity-95 focus-brand"
            style={{
              backgroundColor: PALETTE.darkWine,
              color: PALETTE.creamText,
            }}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Buy / Gift Tickets</span>
          </button>
        </div>
      </div>
    </div>
  );
}
