import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { useForm, useWatch } from 'react-hook-form';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Copy,
  FileCheck2,
  Gift,
  Lock,
  Smartphone,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  MAX_RECEIPT_FILE_BYTES,
  PAYMENT_CHANNELS,
} from '@/config/payment.config';
import { PALETTE } from '@/config/theme.config';
import { useClipboard } from '@/hooks/useClipboard';
import { orderService } from '@/services';
import {
  calculateCartSummary,
  useCartStore,
  useCharityStore,
  useOrderStore,
} from '@/store';
import type { ReceiptFileMeta } from '@/types';
import {
  createCheckoutOrderSchema,
  type CheckoutOrderFormValues,
} from './checkout.schema';

interface StudentDetailsStepProps {
  onBack: () => void;
  onOrderComplete: () => void;
}

export function StudentDetailsStep({
  onBack,
  onOrderComplete,
}: StudentDetailsStepProps) {
  const quantities = useCartStore((s) => s.quantities);
  const isGift = useCartStore((s) => s.isGift);
  const giftDetails = useCartStore((s) => s.giftDetails);
  const setGiftDetails = useCartStore((s) => s.setGiftDetails);

  const recordContribution = useCharityStore((s) => s.recordContribution);
  const addOrder = useOrderStore((s) => s.addOrder);

  const { copy } = useClipboard();

  const [receiptFile, setReceiptFile] = useState<ReceiptFileMeta | null>(null);
  const [receiptError, setReceiptError] = useState<string | null>(null);

  const cartSummary = calculateCartSummary(quantities);

  const schema = useMemo(() => createCheckoutOrderSchema(isGift), [isGift]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutOrderFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      studentId: '',
      department: '',
      phone: '',
      recipientName: giftDetails.recipientName,
      recipientIdOrPhone: giftDetails.recipientIdOrPhone,
      paymentMethod: 'telebirr',
      transactionRef: '',
    },
  });

  const paymentMethod = useWatch({ control, name: 'paymentMethod' });
  const watchedRecipientName = useWatch({ control, name: 'recipientName' });
  const watchedRecipientIdOrPhone = useWatch({
    control,
    name: 'recipientIdOrPhone',
  });
  const selectedPaymentChannel =
    PAYMENT_CHANNELS.find((c) => c.id === paymentMethod) || PAYMENT_CHANNELS[0];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    if (file.size > MAX_RECEIPT_FILE_BYTES) {
      setReceiptError(
        'File exceeds 10MB limit. Please upload a smaller screenshot or PDF.'
      );
      return;
    }
    setReceiptFile({
      name: file.name,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      type: file.type || 'image/jpeg',
    });
    setReceiptError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf'],
    },
    maxSize: MAX_RECEIPT_FILE_BYTES,
    multiple: false,
    onDropRejected: () => {
      setReceiptError(
        'Invalid file or exceeds 10MB limit. Please upload an image or PDF.'
      );
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: (newOrder) => {
      const summaryAction = newOrder.isGift
        ? `Gifted ${cartSummary.items
            .map((i) => `${i.qty} ${i.shortName}`)
            .join(' + ')} to ${newOrder.giftDetails?.recipientName ?? ''}`
        : `Purchased ${cartSummary.items
            .map((i) => `${i.qty} ${i.shortName}`)
            .join(' + ')}`;

      recordContribution({
        contributorName: newOrder.buyerName,
        department: newOrder.department,
        action: summaryAction,
        amount: newOrder.totalEtb,
        addedSeats: cartSummary.totalSeats,
        isGift: newOrder.isGift,
      });

      addOrder(newOrder);
      toast.success(
        `Thank you! +${newOrder.totalEtb.toLocaleString()} ETB added to the Rotaract DBU Charity Goal.`
      );
      onOrderComplete();
    },
    onError: () => {
      toast.error('Failed to submit your order. Please try again.');
    },
  });

  const onSubmit = (values: CheckoutOrderFormValues) => {
    if (!receiptFile) {
      setReceiptError(
        'Please upload your payment receipt screenshot for verification.'
      );
      toast.error('Please complete all highlighted fields before submitting.');
      return;
    }

    if (isGift) {
      setGiftDetails({
        recipientName: values.recipientName,
        recipientIdOrPhone: values.recipientIdOrPhone,
      });
    }

    createOrderMutation.mutate({
      buyerInfo: {
        fullName: values.fullName,
        studentId: values.studentId,
        department: values.department,
        phone: values.phone,
      },
      isGift,
      giftDetails: {
        recipientName: values.recipientName,
        recipientIdOrPhone: values.recipientIdOrPhone,
        personalNote: giftDetails.personalNote,
      },
      paymentMethod: values.paymentMethod,
      transactionRef: values.transactionRef,
      receiptFile,
      cartSummary,
    });
  };

  const onInvalid = () => {
    if (!receiptFile) {
      setReceiptError(
        'Please upload your payment receipt screenshot for verification.'
      );
    }
    toast.error('Please complete all highlighted fields before submitting.');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      <div className="lg:col-span-8 space-y-6">
        {/* DBU Student Buyer & Gift Recipient Form */}
        <div
          className="rounded-3xl p-6 sm:p-8 border space-y-5"
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
              Step 02 of 04 • Student &amp; Receipt Verification
            </span>
            <h1
              className="font-display text-2xl font-extrabold mt-1"
              style={{ color: PALETTE.darkCoffee }}
            >
              {isGift
                ? 'DBU Student Sender & Gift Recipient'
                : 'DBU Student Attendee Details'}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="buyer-name"
                className="block text-xs font-bold mb-1.5"
                style={{ color: PALETTE.darkCoffee }}
              >
                {isGift ? 'Your Full Name (Gift Sender) *' : 'Your Full Name *'}
              </label>
              <input
                id="buyer-name"
                type="text"
                {...register('fullName')}
                placeholder="e.g., Abel Tesfaye"
                className="w-full px-4 py-3 rounded-xl border text-sm focus-brand"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: errors.fullName
                    ? PALETTE.darkWine
                    : PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              />
              {errors.fullName && (
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: PALETTE.darkWine }}
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="buyer-student-id"
                className="block text-xs font-bold mb-1.5"
                style={{ color: PALETTE.darkCoffee }}
              >
                DBU Student ID *
              </label>
              <input
                id="buyer-student-id"
                type="text"
                {...register('studentId')}
                placeholder="e.g., DBU/1402/15"
                className="w-full px-4 py-3 rounded-xl border text-sm uppercase focus-brand"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: errors.studentId
                    ? PALETTE.darkWine
                    : PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              />
              {errors.studentId && (
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: PALETTE.darkWine }}
                >
                  {errors.studentId.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="buyer-department"
                className="block text-xs font-bold mb-1.5"
                style={{ color: PALETTE.darkCoffee }}
              >
                Department / College *
              </label>
              <input
                id="buyer-department"
                type="text"
                {...register('department')}
                placeholder="e.g., Software Engineering"
                className="w-full px-4 py-3 rounded-xl border text-sm focus-brand"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: errors.department
                    ? PALETTE.darkWine
                    : PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              />
              {errors.department && (
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: PALETTE.darkWine }}
                >
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="buyer-phone"
                className="block text-xs font-bold mb-1.5"
                style={{ color: PALETTE.darkCoffee }}
              >
                Mobile Phone Number *
              </label>
              <input
                id="buyer-phone"
                type="tel"
                {...register('phone')}
                placeholder="0911 00 00 00"
                className="w-full px-4 py-3 rounded-xl border text-sm focus-brand"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: errors.phone ? PALETTE.darkWine : PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              />
              {errors.phone && (
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: PALETTE.darkWine }}
                >
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Gift Recipient Summary Box */}
          {isGift && (
            <div
              className="p-4 rounded-2xl border space-y-3"
              style={{
                backgroundColor: PALETTE.espresso,
                borderColor: PALETTE.darkWine,
              }}
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" style={{ color: PALETTE.darkWine }} />
                <span
                  className="font-display text-sm font-extrabold"
                  style={{ color: PALETTE.darkCoffee }}
                >
                  Gift Recipient Details (Printed on PR Hall QR Pass)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('recipientName')}
                    className="w-full px-3 py-2 rounded-xl border text-xs"
                    style={{
                      backgroundColor: PALETTE.surfaceCard,
                      borderColor: errors.recipientName
                        ? PALETTE.darkWine
                        : PALETTE.camel,
                    }}
                  />
                  {errors.recipientName && (
                    <p
                      className="text-xs font-semibold mt-1"
                      style={{ color: PALETTE.darkWine }}
                    >
                      {errors.recipientName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1">
                    Recipient DBU ID / Phone *
                  </label>
                  <input
                    type="text"
                    {...register('recipientIdOrPhone')}
                    className="w-full px-3 py-2 rounded-xl border text-xs"
                    style={{
                      backgroundColor: PALETTE.surfaceCard,
                      borderColor: errors.recipientIdOrPhone
                        ? PALETTE.darkWine
                        : PALETTE.camel,
                    }}
                  />
                  {errors.recipientIdOrPhone && (
                    <p
                      className="text-xs font-semibold mt-1"
                      style={{ color: PALETTE.darkWine }}
                    >
                      {errors.recipientIdOrPhone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Telebirr / CBE Payment & Receipt Screenshot Dropzone */}
        <div
          className="rounded-3xl p-6 sm:p-8 border space-y-5"
          style={{
            backgroundColor: PALETTE.surfaceCard,
            borderColor: PALETTE.camel,
          }}
        >
          <div>
            <h2
              className="font-display text-xl font-extrabold"
              style={{ color: PALETTE.darkCoffee }}
            >
              Pay via Telebirr or CBE &amp; Upload Receipt
            </h2>
            <p className="text-xs mt-1" style={{ color: PALETTE.chocolate }}>
              Send{' '}
              <strong style={{ color: PALETTE.darkWine }}>
                {cartSummary.subtotal.toLocaleString()} ETB
              </strong>{' '}
              to the Rotaract Club of Debre Berhan charity account below and
              upload your receipt screenshot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAYMENT_CHANNELS.map((channel) => {
              const selected = paymentMethod === channel.id;
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setValue('paymentMethod', channel.id)}
                  className="p-4 rounded-2xl border text-left transition-all focus-brand"
                  style={{
                    backgroundColor: selected
                      ? PALETTE.espresso
                      : PALETTE.surfaceSoft,
                    borderColor: selected ? PALETTE.darkWine : PALETTE.camel,
                    borderWidth: selected ? '2px' : '1px',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    {channel.id === 'telebirr' ? (
                      <Smartphone
                        className="w-4 h-4"
                        style={{ color: PALETTE.darkWine }}
                      />
                    ) : (
                      <Building2
                        className="w-4 h-4"
                        style={{ color: PALETTE.darkWine }}
                      />
                    )}
                    {selected && (
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: PALETTE.darkWine }}
                      />
                    )}
                  </div>
                  <span
                    className="font-display text-sm font-extrabold block"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    {channel.name}
                  </span>
                  <span
                    className="text-xs block mt-0.5"
                    style={{ color: PALETTE.chocolate }}
                  >
                    {channel.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Copyable Account Box */}
          <div
            className="rounded-2xl p-4 sm:p-5 border space-y-3"
            style={{
              backgroundColor: PALETTE.surfaceSoft,
              borderColor: PALETTE.camel,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span
                  className="text-[11px] font-bold uppercase tracking-wider block"
                  style={{ color: PALETTE.chocolate }}
                >
                  {selectedPaymentChannel.accountLabel}
                </span>
                <span
                  className="font-display text-lg sm:text-xl font-extrabold tracking-wide tabular-nums"
                  style={{ color: PALETTE.darkCoffee }}
                >
                  {selectedPaymentChannel.accountNumber}
                </span>
                <span
                  className="text-xs block"
                  style={{ color: PALETTE.chocolate }}
                >
                  Account Holder:{' '}
                  <strong>{selectedPaymentChannel.accountName}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  copy(
                    selectedPaymentChannel.copyValue,
                    selectedPaymentChannel.accountLabel
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border hover:bg-[#FFFBF0] focus-brand"
                style={{
                  backgroundColor: PALETTE.surfaceCard,
                  borderColor: PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              >
                <Copy
                  className="w-3.5 h-3.5"
                  style={{ color: PALETTE.darkWine }}
                />
                <span>Copy Account</span>
              </button>
            </div>
            <p
              className="text-xs leading-relaxed pt-2 border-t"
              style={{
                borderColor: 'rgba(187, 148, 87, 0.35)',
                color: 'rgba(67, 40, 24, 0.88)',
              }}
            >
              {selectedPaymentChannel.instructions}
            </p>
          </div>

          {/* Transaction Reference + React Dropzone Receipt Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="tx-ref"
                className="block text-xs font-bold mb-1.5"
                style={{ color: PALETTE.darkCoffee }}
              >
                Transaction Reference / FT ID *
              </label>
              <input
                id="tx-ref"
                type="text"
                {...register('transactionRef')}
                placeholder="e.g., TBR928410 or FT263190"
                className="w-full px-4 py-3 rounded-xl border text-sm uppercase focus-brand"
                style={{
                  backgroundColor: PALETTE.surfaceSoft,
                  borderColor: errors.transactionRef
                    ? PALETTE.darkWine
                    : PALETTE.camel,
                  color: PALETTE.darkCoffee,
                }}
              />
              {errors.transactionRef && (
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: PALETTE.darkWine }}
                >
                  {errors.transactionRef.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-xs font-bold mb-1.5"
                style={{ color: PALETTE.darkCoffee }}
              >
                Payment Receipt Screenshot *
              </label>
              <div
                {...getRootProps()}
                role="button"
                tabIndex={0}
                className="w-full px-4 py-3 rounded-xl border-2 border-dashed text-left flex items-center justify-between gap-2 transition-colors hover:bg-[#FFE6A7]/40 focus-brand cursor-pointer"
                style={{
                  backgroundColor: isDragActive
                    ? PALETTE.espresso
                    : PALETTE.surfaceSoft,
                  borderColor:
                    receiptError || isDragActive
                      ? PALETTE.darkWine
                      : PALETTE.camel,
                }}
              >
                <input {...getInputProps()} />
                {receiptFile ? (
                  <span
                    className="flex items-center gap-2 text-xs font-bold truncate"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    <FileCheck2
                      className="w-4 h-4 shrink-0"
                      style={{ color: PALETTE.darkWine }}
                    />
                    <span className="truncate">
                      {receiptFile.name} ({receiptFile.sizeKb} KB)
                    </span>
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-2 text-xs font-semibold"
                    style={{ color: PALETTE.chocolate }}
                  >
                    <Upload
                      className="w-4 h-4 shrink-0"
                      style={{ color: PALETTE.darkWine }}
                    />
                    <span>
                      {isDragActive
                        ? 'Drop receipt file here…'
                        : 'Drag or upload screenshot / PDF…'}
                    </span>
                  </span>
                )}
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0"
                  style={{
                    backgroundColor: PALETTE.surfaceCard,
                    color: PALETTE.darkWine,
                  }}
                >
                  Browse
                </span>
              </div>
              {receiptError && (
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: PALETTE.darkWine }}
                >
                  {receiptError}
                </p>
              )}
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t"
            style={{ borderColor: 'rgba(187, 148, 87, 0.4)' }}
          >
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold border hover:bg-[#FFF5DC] focus-brand"
              style={{
                borderColor: PALETTE.camel,
                color: PALETTE.darkCoffee,
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Pass Selection</span>
            </button>

            <button
              type="submit"
              disabled={createOrderMutation.isPending}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold shadow-lg transition-all hover:opacity-95 disabled:opacity-60 focus-brand"
              style={{
                backgroundColor: PALETTE.darkWine,
                color: PALETTE.creamText,
              }}
            >
              <Lock className="w-4 h-4" />
              <span>
                {createOrderMutation.isPending
                  ? 'Submitting Receipt…'
                  : isGift
                    ? `Confirm Gift Pass (${cartSummary.subtotal.toLocaleString()} ETB)`
                    : `Submit & Contribute ${cartSummary.subtotal.toLocaleString()} ETB`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right 4 Cols Review */}
      <aside className="lg:col-span-4 lg:sticky lg:top-28">
        <div
          className="rounded-3xl p-6 border shadow-lg space-y-4"
          style={{
            backgroundColor: PALETTE.surfaceCard,
            borderColor: PALETTE.camel,
          }}
        >
          <h2
            className="font-display text-lg font-extrabold"
            style={{ color: PALETTE.darkCoffee }}
          >
            PR Hall Pass Summary
          </h2>
          <ul className="space-y-2.5 text-sm">
            {cartSummary.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span style={{ color: PALETTE.darkCoffee }}>
                  {item.shortName} × {item.qty}
                </span>
                <span className="font-bold tabular-nums">
                  {item.lineTotal.toLocaleString()} ETB
                </span>
              </li>
            ))}
          </ul>
          {isGift && (
            <div
              className="p-3 rounded-xl text-xs border"
              style={{
                backgroundColor: PALETTE.surfaceSoft,
                borderColor: PALETTE.camel,
              }}
            >
              <span
                className="font-bold block"
                style={{ color: PALETTE.darkWine }}
              >
                Gift Pass For:{' '}
                {watchedRecipientName || giftDetails.recipientName}
              </span>
              <span style={{ color: PALETTE.chocolate }}>
                {watchedRecipientIdOrPhone || giftDetails.recipientIdOrPhone}
              </span>
            </div>
          )}
          <div
            className="pt-3 border-t flex justify-between items-baseline"
            style={{ borderColor: 'rgba(187, 148, 87, 0.45)' }}
          >
            <span className="text-sm font-bold">Total Charity Amount</span>
            <span
              className="font-display text-2xl font-extrabold tabular-nums"
              style={{ color: PALETTE.darkWine }}
            >
              {cartSummary.subtotal.toLocaleString()} ETB
            </span>
          </div>
        </div>
      </aside>
    </form>
  );
}
