import type { PaymentChannel } from '@/types';

export const MAX_RECEIPT_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export const PAYMENT_CHANNELS: PaymentChannel[] = [
  {
    id: 'telebirr',
    name: 'Telebirr',
    subtitle: 'Instant Mobile Money Transfer',
    accountLabel: 'Rotaract DBU Telebirr Merchant / Number',
    accountNumber: '0911 64 28 19 (Merchant ID: 842910)',
    copyValue: '0911642819',
    accountName: 'Rotaract Club of Debre Berhan',
    instructions:
      'Send the exact ETB total via Telebirr to Rotaract Club of Debre Berhan and upload a clear screenshot of your confirmation SMS.',
  },
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia (CBE)',
    subtitle: 'CBE Mobile Banking / CBE Birr',
    accountLabel: 'Rotaract DBU CBE Account Number',
    accountNumber: '1000519284736',
    copyValue: '1000519284736',
    accountName: 'Rotaract Debre Berhan Charity Fund',
    instructions:
      'Transfer the exact ETB total via CBE Mobile Banking or branch deposit and upload your transaction receipt screenshot below.',
  },
];
