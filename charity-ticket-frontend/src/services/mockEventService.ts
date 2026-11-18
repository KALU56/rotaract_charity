import { EVENT_META } from '@/config/event.config';
import { TICKET_TIERS } from '@/config/tickets.config';
import { CHARITY_MILESTONES, INITIAL_CONTRIBUTOR_FEED } from '@/mocks/charity.mock';
import type { IEventService, ITicketService } from './api.types';

export const eventQueryKeys = {
  all: ['event'] as const,
  details: () => [...eventQueryKeys.all, 'details'] as const,
  metrics: () => [...eventQueryKeys.all, 'metrics'] as const,
  milestones: () => [...eventQueryKeys.all, 'milestones'] as const,
  contributors: () => [...eventQueryKeys.all, 'contributors'] as const,
  tiers: () => [...eventQueryKeys.all, 'tiers'] as const,
};

export const mockEventService: IEventService & ITicketService = {
  async getEventDetails() {
    return EVENT_META;
  },
  async getFundraisingMetrics() {
    return {
      raisedEtb: EVENT_META.baseRaisedEtb,
      studentContributors: EVENT_META.baseSoldSeats,
    };
  },
  async getMilestones() {
    return CHARITY_MILESTONES;
  },
  async getRecentContributors() {
    return INITIAL_CONTRIBUTOR_FEED;
  },
  async getAvailableTiers() {
    return TICKET_TIERS;
  },
};
