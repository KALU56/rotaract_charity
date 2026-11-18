import { useQuery } from '@tanstack/react-query';
import { EVENT_META } from '@/config/event.config';
import { TICKET_TIERS } from '@/config/tickets.config';
import { CHARITY_MILESTONES } from '@/mocks/charity.mock';
import { eventQueryKeys, eventService } from '@/services';

export function useEventDetailsQuery() {
  return useQuery({
    queryKey: eventQueryKeys.details(),
    queryFn: () => eventService.getEventDetails(),
    initialData: EVENT_META,
  });
}

export function useMilestonesQuery() {
  return useQuery({
    queryKey: eventQueryKeys.milestones(),
    queryFn: () => eventService.getMilestones(),
    initialData: CHARITY_MILESTONES,
  });
}

export function useTicketTiersQuery() {
  return useQuery({
    queryKey: eventQueryKeys.tiers(),
    queryFn: () => eventService.getAvailableTiers(),
    initialData: TICKET_TIERS,
  });
}
