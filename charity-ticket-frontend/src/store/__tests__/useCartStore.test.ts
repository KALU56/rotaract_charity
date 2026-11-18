import { beforeEach, describe, expect, it } from 'vitest';
import { calculateCartSummary, useCartStore } from '../useCartStore';

describe('useCartStore & calculateCartSummary', () => {
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
  });

  it('calculates totals for individual and group passes accurately', () => {
    const summary = calculateCartSummary({ individual: 2, group: 1 });
    expect(summary.totalUnits).toBe(3);
    expect(summary.totalSeats).toBe(6); // 2*1 + 1*4
    expect(summary.subtotal).toBe(800); // 2*150 + 1*500
    expect(summary.items).toHaveLength(2);
  });

  it('enforces minimum 0 and maximum 5 units per tier', () => {
    const { updateQuantity } = useCartStore.getState();

    updateQuantity('individual', -5);
    expect(useCartStore.getState().quantities.individual).toBe(0);

    updateQuantity('individual', 10);
    expect(useCartStore.getState().quantities.individual).toBe(5);
  });

  it('preselects a tier and enables gift mode cleanly', () => {
    useCartStore.getState().preselectPass('group', true);
    const state = useCartStore.getState();
    expect(state.quantities).toEqual({ individual: 0, group: 1 });
    expect(state.isGift).toBe(true);
  });
});
