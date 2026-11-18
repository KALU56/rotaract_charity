import { create } from 'zustand';
import { MAX_QUANTITY_PER_TIER, TICKET_TIERS } from '@/config/tickets.config';
import type { CartSummary, GiftDetails, TicketTierId } from '@/types';

export type QuantitiesMap = Record<TicketTierId, number>;

export function calculateCartSummary(quantities: QuantitiesMap): CartSummary {
  const items = TICKET_TIERS.map((tier) => {
    const qty = quantities[tier.id] || 0;
    return {
      ...tier,
      qty,
      totalSeats: qty * tier.seatsPerUnit,
      lineTotal: qty * tier.price,
    };
  }).filter((item) => item.qty > 0);

  const totalUnits = items.reduce((sum, i) => sum + i.qty, 0);
  const totalSeats = items.reduce((sum, i) => sum + i.totalSeats, 0);
  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);

  return { items, totalUnits, totalSeats, subtotal };
}

interface CartState {
  quantities: QuantitiesMap;
  isGift: boolean;
  giftDetails: GiftDetails;
  updateQuantity: (tierId: TicketTierId, delta: number) => void;
  setIsGift: (isGift: boolean) => void;
  toggleGift: () => void;
  setGiftDetails: (partial: Partial<GiftDetails>) => void;
  preselectPass: (tierId?: TicketTierId | null, enableGiftMode?: boolean) => void;
  resetGiftDetails: () => void;
}

const DEFAULT_GIFT_DETAILS: GiftDetails = {
  recipientName: '',
  recipientIdOrPhone: '',
  personalNote: '',
};

export const useCartStore = create<CartState>((set) => ({
  quantities: {
    individual: 1,
    group: 0,
  },
  isGift: false,
  giftDetails: { ...DEFAULT_GIFT_DETAILS },

  updateQuantity: (tierId, delta) =>
    set((state) => {
      const tier = TICKET_TIERS.find((t) => t.id === tierId);
      if (!tier) return state;
      const current = state.quantities[tierId] || 0;
      const maxAllowed = Math.min(tier.available, MAX_QUANTITY_PER_TIER);
      const next = Math.max(0, Math.min(maxAllowed, current + delta));
      return {
        quantities: {
          ...state.quantities,
          [tierId]: next,
        },
      };
    }),

  setIsGift: (isGift) => set({ isGift }),

  toggleGift: () => set((state) => ({ isGift: !state.isGift })),

  setGiftDetails: (partial) =>
    set((state) => ({
      giftDetails: {
        ...state.giftDetails,
        ...partial,
      },
    })),

  preselectPass: (tierId = null, enableGiftMode = false) =>
    set((state) => {
      let nextQuantities = state.quantities;
      if (tierId) {
        nextQuantities = {
          individual: tierId === 'individual' ? 1 : 0,
          group: tierId === 'group' ? 1 : 0,
        };
      } else if (
        (state.quantities.individual || 0) === 0 &&
        (state.quantities.group || 0) === 0
      ) {
        nextQuantities = { individual: 1, group: 0 };
      }
      return {
        quantities: nextQuantities,
        isGift: Boolean(enableGiftMode),
      };
    }),

  resetGiftDetails: () => set({ giftDetails: { ...DEFAULT_GIFT_DETAILS } }),
}));
