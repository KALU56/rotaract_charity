import { beforeEach, describe, expect, it } from 'vitest';
import { EVENT_META } from '@/config/event.config';
import { INITIAL_CONTRIBUTOR_FEED } from '@/mocks/charity.mock';
import { calculateCharityMetrics, useCharityStore } from '../useCharityStore';

describe('useCharityStore & calculateCharityMetrics', () => {
  beforeEach(() => {
    useCharityStore.setState({
      raisedEtb: EVENT_META.baseRaisedEtb,
      studentContributors: EVENT_META.baseSoldSeats,
      contributorFeed: INITIAL_CONTRIBUTOR_FEED,
      lastContributionAmount: 0,
    });
  });

  it('computes goal progress, remaining ETB, and remaining seats accurately', () => {
    const metrics = calculateCharityMetrics(31850, 228);
    expect(metrics.goalProgressPercent).toBe(71);
    expect(metrics.remainingGoalEtb).toBe(13150);
    expect(metrics.remainingSeats).toBe(32);
  });

  it('caps progress at 100% and floors remaining values at 0', () => {
    const metrics = calculateCharityMetrics(50000, 300);
    expect(metrics.goalProgressPercent).toBe(100);
    expect(metrics.remainingGoalEtb).toBe(0);
    expect(metrics.remainingSeats).toBe(0);
  });

  it('updates live raised total, contributors count, and prepends to feed', () => {
    useCharityStore.getState().recordContribution({
      contributorName: 'Abel Tesfaye',
      department: 'Software Engineering',
      action: 'Purchased 1 Group Squad Pass',
      amount: 500,
      addedSeats: 4,
      isGift: false,
    });

    const state = useCharityStore.getState();
    expect(state.raisedEtb).toBe(EVENT_META.baseRaisedEtb + 500);
    expect(state.studentContributors).toBe(EVENT_META.baseSoldSeats + 4);
    expect(state.lastContributionAmount).toBe(500);
    expect(state.contributorFeed[0].name).toBe(
      'Abel Tesfaye (Software Engineering)'
    );
    expect(state.contributorFeed[0].amount).toBe(500);
  });
});
