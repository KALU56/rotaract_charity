import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { EVENT_META } from '@/config/event.config';
import { INITIAL_CONTRIBUTOR_FEED } from '@/mocks/charity.mock';
import { INITIAL_ORDERS } from '@/mocks/orders.mock';
import { useCartStore, useCharityStore, useOrderStore } from '@/store';
import { CheckoutPage } from '../CheckoutPage';
import type { CheckoutStep } from '../CheckoutProgressHeader';
import { useState } from 'react';

function CheckoutTestHarness() {
  const [step, setStep] = useState<CheckoutStep>(1);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutPage
        currentStep={step}
        onSelectStep={setStep}
        onBackToLanding={() => {}}
        onStartPurchase={() => setStep(1)}
      />
    </QueryClientProvider>
  );
}

describe('CheckoutFlow integration', () => {
  beforeEach(() => {
    useCartStore.setState({
      quantities: { individual: 1, group: 0 },
      isGift: false,
      giftDetails: {
        recipientName: '',
        recipientIdOrPhone: '',
        personalNote: '',
      },
    });
    useCharityStore.setState({
      raisedEtb: EVENT_META.baseRaisedEtb,
      studentContributors: EVENT_META.baseSoldSeats,
      contributorFeed: INITIAL_CONTRIBUTOR_FEED,
      lastContributionAmount: 0,
    });
    useOrderStore.setState({
      orders: INITIAL_ORDERS,
      activeOrderId: INITIAL_ORDERS[0].orderId,
    });
  });

  it('validates gift fields on Step 1, submits Step 2 order, updates charity goal, and unlocks QR pass', async () => {
    const user = userEvent.setup();
    render(<CheckoutTestHarness />);

    // Step 1: Increase individual pass to 2 (300 ETB) and enable Gift Mode
    await user.click(
      screen.getByRole('button', { name: /Increase Individual Student Pass/i })
    );
    await user.click(screen.getByRole('switch'));

    // Trying to continue with empty gift recipient triggers Zod validation errors
    await user.click(
      screen.getByRole('button', { name: /Continue to Student Details/i })
    );
    expect(
      screen.getByText(/Please enter the recipient DBU student’s full name/i)
    ).toBeInTheDocument();

    // Fill gift recipient details
    await user.type(
      screen.getByLabelText(/Recipient DBU Student Full Name/i),
      'Hanna Mekonnen'
    );
    await user.type(
      screen.getByLabelText(/Recipient DBU Student ID or Phone/i),
      'DBU/1508/15'
    );
    await user.click(
      screen.getByRole('button', { name: /Continue to Student Details/i })
    );

    // Step 2: Fill attendee + payment ref + upload receipt
    expect(
      screen.getByRole('heading', {
        name: /DBU Student Sender & Gift Recipient/i,
      })
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Your Full Name/i), 'Abel Tesfaye');
    await user.type(screen.getByLabelText(/DBU Student ID \*/i), 'DBU/1402/15');
    await user.type(
      screen.getByLabelText(/Department \/ College/i),
      'Software Engineering'
    );
    await user.type(
      screen.getByLabelText(/Mobile Phone Number/i),
      '0911223344'
    );
    await user.type(
      screen.getByLabelText(/Transaction Reference/i),
      'TBR928410'
    );

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const mockFile = new File(['receipt'], 'telebirr.png', {
      type: 'image/png',
    });
    await user.upload(fileInput, mockFile);

    await user.click(
      screen.getByRole('button', { name: /Confirm Gift Pass \(300 ETB\)/i })
    );

    // Step 3: Confirmation renders with live updated charity total (31,850 + 300 = 32,150)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /Gift Pass Issued for Hanna Mekonnen!/i,
        })
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/32,150 \/ 45,000 ETB/i)).toBeInTheDocument();

    // Step 4: QR Vault & Treasurer approval toggle
    await user.click(
      screen.getByRole('button', { name: /View & Download PR Hall QR Pass/i })
    );
    expect(
      screen.getByRole('heading', { name: /Digital PR Hall QR Passes/i })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /Approve Payment & Unlock QR/i })
    );
    await waitFor(() => {
      expect(screen.getAllByText('PR Hall Verified').length).toBeGreaterThan(0);
    });
  });
});
