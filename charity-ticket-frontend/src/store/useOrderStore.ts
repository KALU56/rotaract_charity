import { create } from 'zustand';
import { INITIAL_ORDERS } from '@/mocks/orders.mock';
import type { OrderRecord, OrderStatus } from '@/types';

interface OrderState {
  orders: OrderRecord[];
  activeOrderId: string;
  addOrder: (order: OrderRecord) => void;
  setActiveOrderId: (orderId: string) => void;
  toggleOrderApproval: (orderId: string) => OrderStatus | null;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: INITIAL_ORDERS,
  activeOrderId: INITIAL_ORDERS[0]?.orderId ?? '',

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
      activeOrderId: order.orderId,
    })),

  setActiveOrderId: (orderId) => set({ activeOrderId: orderId }),

  toggleOrderApproval: (orderId) => {
    const target = get().orders.find((o) => o.orderId === orderId);
    if (!target) return null;

    const nextStatus: OrderStatus =
      target.status === 'Verified & Approved'
        ? 'Pending Receipt Verification'
        : 'Verified & Approved';

    set((state) => ({
      orders: state.orders.map((ord) =>
        ord.orderId === orderId ? { ...ord, status: nextStatus } : ord
      ),
    }));

    return nextStatus;
  },
}));
