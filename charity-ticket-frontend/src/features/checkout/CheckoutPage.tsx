import type { TicketTierId } from '@/types';
import {
  CheckoutProgressHeader,
  type CheckoutStep,
} from './CheckoutProgressHeader';
import { ConfirmationStep } from './ConfirmationStep';
import { PassSelectionStep } from './PassSelectionStep';
import { QrPassVaultStep } from './QrPassVaultStep';
import { StudentDetailsStep } from './StudentDetailsStep';

interface CheckoutPageProps {
  currentStep: CheckoutStep;
  onSelectStep: (step: CheckoutStep) => void;
  onBackToLanding: () => void;
  onStartPurchase: (tierId?: TicketTierId | null, enableGift?: boolean) => void;
}

export function CheckoutPage({
  currentStep,
  onSelectStep,
  onBackToLanding,
  onStartPurchase,
}: CheckoutPageProps) {
  return (
    <main className="flex-1 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CheckoutProgressHeader
          currentStep={currentStep}
          onBackToLanding={onBackToLanding}
          onSelectStep={onSelectStep}
        />

        {currentStep === 1 && (
          <PassSelectionStep onNext={() => onSelectStep(2)} />
        )}

        {currentStep === 2 && (
          <StudentDetailsStep
            onBack={() => onSelectStep(1)}
            onOrderComplete={() => onSelectStep(3)}
          />
        )}

        {currentStep === 3 && (
          <ConfirmationStep onViewQrPasses={() => onSelectStep(4)} />
        )}

        {currentStep === 4 && (
          <QrPassVaultStep onStartPurchase={onStartPurchase} />
        )}
      </div>
    </main>
  );
}
