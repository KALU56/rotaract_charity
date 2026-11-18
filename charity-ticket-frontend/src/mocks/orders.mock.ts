import type { OrderRecord } from '@/types';

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    orderId: 'RDB-2026-1042',
    createdAt: 'Nov 17, 2026 · 3:40 PM',
    buyerName: 'Bereket Assefa',
    studentId: 'DBU/1402/15',
    department: 'Software Engineering',
    buyerPhone: '0912 34 08 19',
    paymentMethod: 'Telebirr',
    transactionRef: 'TBR74920184',
    receiptName: 'telebirr_prhall_receipt.jpg',
    totalEtb: 150,
    isGift: false,
    giftDetails: null,
    status: 'Verified & Approved',
    tickets: [
      {
        ticketCode: 'RDB26-IND-019',
        tierId: 'individual',
        tierName: 'Individual Student Pass',
        seatsCount: 1,
        holderName: 'Bereket Assefa',
        holderStudentId: 'DBU/1402/15',
        isGiftPass: false,
        giftedBy: null,
        giftNote: '',
        gate: 'PR Hall • Main Student Gate',
        seatZone: 'PR Hall • Reserved Student Section',
        price: 150,
      },
    ],
  },
];
