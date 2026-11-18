import type { LucideIcon } from 'lucide-react';

export interface EventMetadata {
  clubName: string;
  title: string;
  fullTitle: string;
  eyebrow: string;
  dateFull: string;
  dateShort: string;
  dayOfWeek: string;
  timeRange: string;
  gatesOpen: string;
  venueName: string;
  venueShort: string;
  venueAddress: string;
  organizer: string;
  totalSeats: number;
  baseSoldSeats: number;
  charityGoalEtb: number;
  baseRaisedEtb: number;
}

export interface CharityMilestone {
  id: string;
  amount: number;
  title: string;
  description: string;
  beneficiaries: string;
}

export interface ContributorFeedItem {
  id: string;
  name: string;
  action: string;
  amount: number;
  time: string;
  isGift: boolean;
}

export interface EventHighlight {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  image: string;
}

export interface HowItWorksStep {
  num: string;
  icon: LucideIcon;
  title: string;
  points: string[];
}
