import { format } from 'date-fns';
import { PAYMENT_CHANNELS } from '@/config/payment.config';
import { INITIAL_ORDERS } from '@/mocks/orders.mock';
import type { CreateOrderPayload, OrderRecord, OrderStatus, TicketPass } from '@/types';
import type { IOrderService } from './api.types';

export const orderQueryKeys = {
  all: ['orders'] as const,
  list: () => [...orderQueryKeys.all, 'list'] as const,
  detail: (orderId: string) => [...orderQueryKeys.all, 'detail', orderId] as const,
};

let inMemoryOrders: OrderRecord[] = [...INITIAL_ORDERS];

function buildTicketsFromPayload(payload: CreateOrderPayload): TicketPass[] {
  const { buyerInfo, isGift, giftDetails, cartSummary } = payload;
  const passHolderName = isGift
    ? giftDetails.recipientName.trim()
    : buyerInfo.fullName.trim();
  const passHolderId = isGift
    ? giftDetails.recipientIdOrPhone.trim()
    : buyerInfo.studentId.trim().toUpperCase();

  const generatedTickets: TicketPass[] = [];
  let counter = 1;

  cartSummary.items.forEach((item) => {
    for (let i = 0; i < item.qty; i++) {
      generatedTickets.push({
        ticketCode: `RDB26-${item.id === 'group' ? 'GRP4' : 'IND'}-${String(
          100 + counter
        ).padStart(3, '0')}`,
        tierId: item.id,
        tierName: item.name,
        seatsCount: item.seatsPerUnit,
        holderName: passHolderName,
        holderStudentId: passHolderId,
        isGiftPass: isGift,
        giftedBy: isGift ? buyerInfo.fullName.trim() : null,
        giftNote: isGift ? giftDetails.personalNote.trim() : '',
        gate: item.gate,
        seatZone: item.seatZone,
        price: item.price,
      });
      counter++;
    }
  });

  return generatedTickets;
}

export const mockOrderService: IOrderService = {
  async createOrder(payload: CreateOrderPayload): Promise<OrderRecord> {
    await new Promise((resolve) => setTimeout(resolve, 450));

    const newOrderId = `RDB-2026-${Math.floor(2000 + Math.random() * 7900)}`;
    const selectedChannel =
      PAYMENT_CHANNELS.find((c) => c.id === payload.paymentMethod)?.name || 'Telebirr';

    const newOrder: OrderRecord = {
      orderId: newOrderId,
      createdAt: `Just now · ${format(new Date(), 'MMM d, yyyy')}`,
      buyerName: payload.buyerInfo.fullName.trim(),
      studentId: payload.buyerInfo.studentId.trim().toUpperCase(),
      department: payload.buyerInfo.department.trim(),
      buyerPhone: payload.buyerInfo.phone.trim(),
      paymentMethod: selectedChannel,
      transactionRef: payload.transactionRef.trim().toUpperCase(),
      receiptName: payload.receiptFile.name,
      totalEtb: payload.cartSummary.subtotal,
      isGift: payload.isGift,
      giftDetails: payload.isGift ? { ...payload.giftDetails } : null,
      status: 'Pending Receipt Verification',
      tickets: buildTicketsFromPayload(payload),
    };

    inMemoryOrders = [newOrder, ...inMemoryOrders];
    return newOrder;
  },

  async getOrders(): Promise<OrderRecord[]> {
    return [...inMemoryOrders];
  },

  async getOrderById(orderId: string): Promise<OrderRecord | null> {
    return inMemoryOrders.find((o) => o.orderId === orderId) ?? null;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<OrderRecord> {
    const existing = inMemoryOrders.find((o) => o.orderId === orderId);
    if (!existing) {
      throw new Error(`Order ${orderId} not found`);
    }
    const updated: OrderRecord = { ...existing, status };
    inMemoryOrders = inMemoryOrders.map((o) => (o.orderId === orderId ? updated : o));
    return updated;
  },
};
