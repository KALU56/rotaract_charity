import { ArrowLeft } from 'lucide-react';
import { PALETTE } from '@/config/theme.config';
import { calculateCartSummary, useCartStore, useOrderStore } from '@/store';

export type CheckoutStep = 1 | 2 | 3 | 4;

interface CheckoutProgressHeaderProps {
  currentStep: CheckoutStep;
  onBackToLanding: () => void;
  onSelectStep: (step: CheckoutStep) => void;
}

const STEPS: Array<{ step: CheckoutStep; label: string }> = [
  { step: 1, label: '1. Select Pass & Gift' },
  { step: 2, label: '2. Student Info & Receipt' },
  { step: 3, label: '3. Confirmation' },
  { step: 4, label: '4. PR Hall QR Vault' },
];

export function CheckoutProgressHeader({
  currentStep,
  onBackToLanding,
  onSelectStep,
}: CheckoutProgressHeaderProps) {
  const quantities = useCartStore((s) => s.quantities);
  const orders = useOrderStore((s) => s.orders);
  const cartSummary = calculateCartSummary(quantities);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <button
        type="button"
        onClick={onBackToLanding}
        className="inline-flex items-center gap-2 text-sm font-bold py-2 px-3.5 rounded-xl border self-start transition-colors hover:bg-brand-surface-card focus-brand"
        style={{
          backgroundColor: 'rgba(255, 251, 240, 0.78)',
          borderColor: PALETTE.camel,
          color: PALETTE.darkCoffee,
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Charity Movie Night</span>
      </button>

      <nav
        aria-label="Checkout progress"
        className="flex flex-wrap items-center gap-2"
      >
        {STEPS.map((s) => {
          const active = currentStep === s.step;
          const canJump =
            s.step === 1 ||
            s.step === 4 ||
            (s.step === 2 && cartSummary.totalUnits > 0) ||
            (s.step === 3 && orders.length > 0);
          return (
            <button
              key={s.step}
              type="button"
              disabled={!canJump}
              onClick={() => onSelectStep(s.step)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all focus-brand disabled:opacity-45"
              style={{
                backgroundColor: active
                  ? PALETTE.darkWine
                  : PALETTE.surfaceCard,
                borderColor: active ? PALETTE.darkWine : PALETTE.camel,
                color: active ? PALETTE.creamText : PALETTE.darkCoffee,
              }}
            >
              {s.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
