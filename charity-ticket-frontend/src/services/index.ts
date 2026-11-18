import type { IEventService, IOrderService, ITicketService } from './api.types';
import { mockEventService } from './mockEventService';
import { mockOrderService } from './mockOrderService';

export * from './api.types';
export { eventQueryKeys } from './mockEventService';
export { orderQueryKeys } from './mockOrderService';

/**
 * Service facade.
 * When the real backend API is built, swap mockEventService / mockOrderService
 * with HTTP implementations driven by `env.useMocks` and `env.apiBaseUrl`.
 */
export const eventService: IEventService & ITicketService = mockEventService;
export const orderService: IOrderService = mockOrderService;
