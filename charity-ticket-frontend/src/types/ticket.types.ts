export type TicketTierId = 'individual' | 'group';

export interface TicketTier {
  id: TicketTierId;
  name: string;
  shortName: string;
  seatsPerUnit: number;
  tagline: string;
  price: number;
  originalPrice?: number;
  available: number;
  featured: boolean;
  badge: string;
  gate: string;
  seatZone: string;
  benefits: string[];
}

export interface TicketPass {
  ticketCode: string;
  tierId: TicketTierId;
  tierName: string;
  seatsCount: number;
  holderName: string;
  holderStudentId: string;
  isGiftPass: boolean;
  giftedBy: string | null;
  giftNote: string;
  gate: string;
  seatZone: string;
  price: number;
}

export interface CartLineItem extends TicketTier {
  qty: number;
  totalSeats: number;
  lineTotal: number;
}

export interface CartSummary {
  items: CartLineItem[];
  totalUnits: number;
  totalSeats: number;
  subtotal: number;
}
