import { create } from 'zustand';
import { EVENT_META } from '@/config/event.config';
import { INITIAL_CONTRIBUTOR_FEED } from '@/mocks/charity.mock';
import type { ContributorFeedItem } from '@/types';

export function calculateCharityMetrics(
  raisedEtb: number,
  studentContributors: number
) {
  const goalProgressPercent = Math.min(
    100,
    Math.round((raisedEtb / EVENT_META.charityGoalEtb) * 100)
  );
  const remainingGoalEtb = Math.max(0, EVENT_META.charityGoalEtb - raisedEtb);
  const remainingSeats = Math.max(0, EVENT_META.totalSeats - studentContributors);

  return {
    goalProgressPercent,
    remainingGoalEtb,
    remainingSeats,
  };
}

interface ContributionInput {
  contributorName: string;
  department: string;
  action: string;
  amount: number;
  addedSeats: number;
  isGift: boolean;
}

interface CharityState {
  raisedEtb: number;
  studentContributors: number;
  contributorFeed: ContributorFeedItem[];
  lastContributionAmount: number;
  recordContribution: (input: ContributionInput) => void;
}

export const useCharityStore = create<CharityState>((set) => ({
  raisedEtb: EVENT_META.baseRaisedEtb,
  studentContributors: EVENT_META.baseSoldSeats,
  contributorFeed: INITIAL_CONTRIBUTOR_FEED,
  lastContributionAmount: 0,

  recordContribution: (input) =>
    set((state) => ({
      raisedEtb: state.raisedEtb + input.amount,
      studentContributors: state.studentContributors + input.addedSeats,
      lastContributionAmount: input.amount,
      contributorFeed: [
        {
          id: `c-${Date.now()}`,
          name: `${input.contributorName} (${input.department})`,
          action: input.action,
          amount: input.amount,
          time: 'Just now',
          isGift: input.isGift,
        },
        ...state.contributorFeed.slice(0, 5),
      ],
    })),
}));
