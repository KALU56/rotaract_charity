import type {
  CharityMilestone,
  ContributorFeedItem,
  CreateOrderPayload,
  EventMetadata,
  OrderRecord,
  OrderStatus,
  TicketTier,
} from '@/types';

export interface FundraisingMetrics {
  raisedEtb: number;
  studentContributors: number;
}

export interface IEventService {
  getEventDetails(): Promise<EventMetadata>;
  getFundraisingMetrics(): Promise<FundraisingMetrics>;
  getMilestones(): Promise<CharityMilestone[]>;
  getRecentContributors(): Promise<ContributorFeedItem[]>;
}

export interface ITicketService {
  getAvailableTiers(): Promise<TicketTier[]>;
}

export interface IOrderService {
  createOrder(payload: CreateOrderPayload): Promise<OrderRecord>;
  getOrders(): Promise<OrderRecord[]>;
  getOrderById(orderId: string): Promise<OrderRecord | null>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<OrderRecord>;
}
