import {
  Film,
  HeartHandshake,
  Popcorn,
  Mic,
  Gift,
  BadgeCheck,
  Target,
  Receipt,
  QrCode,
} from 'lucide-react';
import type { EventMetadata, EventHighlight, HowItWorksStep } from '@/types';

export const BRAND_ASSETS = {
  logoUrl: '/logo.jpg',
  aboutGroupPhotoUrl: '/photo_group.jpg',
} as const;

export const EVENT_META: EventMetadata = {
  clubName: 'Rotaract Club of Debre Berhan',
  title: 'Charity Movie Night 2026',
  fullTitle: 'Rotaract Club of Debre Berhan — Charity Movie Night 2026',
  eyebrow: 'ROTARACT CLUB OF DEBRE BERHAN • CHARITY INITIATIVE',
  dateFull: 'Saturday, December 12, 2026',
  dateShort: 'DEC 12, 2026',
  dayOfWeek: 'Saturday Evening',
  timeRange: '6:00 PM – 9:30 PM EAT',
  gatesOpen: 'Doors Open at 5:30 PM • Popcorn & Pre-Show',
  venueName: 'PR Hall, Debre Berhan University (DBU)',
  venueShort: 'PR Hall • Debre Berhan University',
  venueAddress:
    'Public Relations (PR) Hall, Main Campus, Debre Berhan University (DBU), Debre Berhan, Ethiopia',
  organizer: 'Rotaract Club of Debre Berhan — Community Service & Charity Committee',
  totalSeats: 260,
  baseSoldSeats: 228,
  charityGoalEtb: 45000,
  baseRaisedEtb: 31850,
};

export const HIGHLIGHTS_DATA: EventHighlight[] = [
  {
    id: 'screening',
    icon: Film,
    tag: 'Main Feature',
    title: 'Feature Film Screening at PR Hall',
    description:
      'An inspiring, crowd-pleasing feature film screened on the big screen with full theater audio inside PR Hall.',
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'charity-drive',
    icon: HeartHandshake,
    tag: '100% Community Charity',
    title: '100% Local Debre Berhan Community Aid',
    description:
      'Every single Birr from DBU student ticket sales goes directly to vulnerable families, children, and elderly residents in Debre Berhan town.',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'refreshments',
    icon: Popcorn,
    tag: 'Included Voucher',
    title: 'Popcorn & Refreshment Bar',
    description:
      'Every Individual and Group pass includes a complimentary popcorn and soft drink voucher at the PR Hall refreshment bar.',
    image:
      'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preshow',
    icon: Mic,
    tag: '5:30 PM Pre-Show',
    title: 'Live Spoken Word & Acoustic Intro',
    description:
      'Arrive when doors open at 5:30 PM for live DBU student spoken word poetry, acoustic music, and charity trivia.',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gift-sharing',
    icon: Gift,
    tag: 'Share Kindness',
    title: 'Gift-a-Friend Seat Sharing',
    description:
      'Purchase a pass for a roommate, classmate, or study partner—issued directly in their name with your custom gift note.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'transparency',
    icon: BadgeCheck,
    tag: 'Open Ledger',
    title: 'Transparent Impact Report',
    description:
      'Rotaract Debre Berhan publishes full receipt verification and post-event fund distribution records to all DBU contributors.',
    image:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    num: '01',
    icon: Target,
    title: 'Explore & Check Community Goal',
    points: [
      'View the live 45,000 ETB fundraising progress collected from DBU students.',
      'Inspect the three local Debre Berhan family, child, and elderly relief milestones.',
    ],
  },
  {
    num: '02',
    icon: Gift,
    title: 'Choose Individual, Group, or Gift',
    points: [
      'Pick Individual Student Pass (150 ETB) or Group Squad Pass (500 ETB).',
      'Optionally enable Gift Mode to send a ticket to a fellow DBU student.',
    ],
  },
  {
    num: '03',
    icon: Receipt,
    title: 'Pay via Telebirr / CBE & Upload Receipt',
    points: [
      'Transfer to Rotaract Club of Debre Berhan via Telebirr or CBE.',
      'Upload your payment receipt screenshot for quick treasurer verification.',
    ],
  },
  {
    num: '04',
    icon: QrCode,
    title: 'Receive PR Hall QR Pass',
    points: [
      'Access your high-contrast scannable QR pass in My QR Passes.',
      'Present at PR Hall Main Gate on Dec 12 at 5:30 PM.',
    ],
  },
];
