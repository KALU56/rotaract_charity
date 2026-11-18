import type { TicketTier } from '@/types';

export const MAX_QUANTITY_PER_TIER = 5;

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'individual',
    name: 'Individual Student Pass',
    shortName: 'Individual Pass',
    seatsPerUnit: 1,
    tagline:
      'Single DBU student admission with full charity contribution and cinema refreshment.',
    price: 150,
    available: 24,
    featured: false,
    badge: '1 DBU Student Admission',
    gate: 'PR Hall • Main Student Gate',
    seatZone: 'PR Hall • Reserved Student Section',
    benefits: [
      '1 DBU Student Admission inside PR Hall',
      '150 ETB Direct Charity Impact toward 45,000 ETB goal',
      'Popcorn & Soft Drink Voucher included',
      'PR Hall Reserved Seating + Instant Digital QR Pass',
    ],
  },
  {
    id: 'group',
    name: 'Group Squad Pass (4 Students)',
    shortName: 'Group Squad Pass',
    seatsPerUnit: 4,
    tagline:
      'Bring your dorm or study squad — 4 DBU student admissions together (Save 100 ETB).',
    price: 500,
    originalPrice: 600,
    available: 8,
    featured: true,
    badge: '4 DBU Students • Save 100 ETB',
    gate: 'PR Hall • Priority Squad Gate',
    seatZone: 'PR Hall • Priority Front-Center Row Seating',
    benefits: [
      '4 DBU Student Admissions (Save 100 ETB vs. single passes)',
      '500 ETB Direct Charity Impact toward 45,000 ETB goal',
      '4 Popcorn & Soft Drink Refreshment Combos',
      'Priority Front-Center Row Seating inside PR Hall',
    ],
  },
];
