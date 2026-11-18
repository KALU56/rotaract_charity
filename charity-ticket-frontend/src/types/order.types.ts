import type { CartSummary, TicketPass } from './ticket.types';

export type PaymentChannelId = 'telebirr' | 'cbe';

export interface PaymentChannel {
  id: PaymentChannelId;
  name: string;
  subtitle: string;
  accountLabel: string;
  accountNumber: string;
  copyValue: string;
  accountName: string;
  instructions: string;
}

export type OrderStatus =
  | 'Verified & Approved'
  | 'Pending Receipt Verification';

export interface GiftDetails {
  recipientName: string;
  recipientIdOrPhone: string;
  personalNote: string;
}

export interface BuyerInfo {
  fullName: string;
  studentId: string;
  department: string;
  phone: string;
}

export interface ReceiptFileMeta {
  name: string;
  sizeKb: number;
  type: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  buyerName: string;
  studentId: string;
  department: string;
  buyerPhone: string;
  paymentMethod: string;
  transactionRef: string;
  receiptName: string;
  totalEtb: number;
  isGift: boolean;
  giftDetails: GiftDetails | null;
  status: OrderStatus;
  tickets: TicketPass[];
}

export interface CreateOrderPayload {
  buyerInfo: BuyerInfo;
  isGift: boolean;
  giftDetails: GiftDetails;
  paymentMethod: PaymentChannelId;
  transactionRef: string;
  receiptFile: ReceiptFileMeta;
  cartSummary: CartSummary;
}
