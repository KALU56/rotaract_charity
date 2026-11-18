import type { CharityMilestone, ContributorFeedItem } from '@/types';

export const CHARITY_MILESTONES: CharityMilestone[] = [
  {
    id: 'm1',
    amount: 15000,
    title: 'Essential Food & Pantry Packages for Vulnerable Families',
    description:
      'Delivers staple grains, cooking oil, and essential household food supplies to low-income families across Debre Berhan town.',
    beneficiaries: '40 Local Families in Debre Berhan',
  },
  {
    id: 'm2',
    amount: 30000,
    title: 'School Uniforms, Exercise Books & Stationery Kits for Children',
    description:
      'Equips underprivileged children in Debre Berhan town with full school uniforms, exercise books, backpacks, and learning supplies.',
    beneficiaries: '75 Underprivileged Local Children',
  },
  {
    id: 'm3',
    amount: 45000,
    title: 'Winter Blankets, Hygiene Essentials & Medical Support for Elderly',
    description:
      'Provides warm highland blankets, personal hygiene kits, and basic medical assistance to vulnerable elderly residents and households in Debre Berhan.',
    beneficiaries: '50+ Vulnerable Elderly & Households',
  },
];

export const INITIAL_CONTRIBUTOR_FEED: ContributorFeedItem[] = [
  {
    id: 'c1',
    name: 'Dawit M. (Software Eng.)',
    action: 'Purchased 1 Individual Student Pass',
    amount: 150,
    time: '6 mins ago',
    isGift: false,
  },
  {
    id: 'c2',
    name: 'Hanna T. (Civil Eng.)',
    action: 'Gifted a Group Squad Pass (4 Students)',
    amount: 500,
    time: '19 mins ago',
    isGift: true,
  },
  {
    id: 'c3',
    name: 'Bereket A. (Medicine)',
    action: 'Purchased 1 Individual Student Pass',
    amount: 150,
    time: '34 mins ago',
    isGift: false,
  },
  {
    id: 'c4',
    name: 'Selamawit K. (Computer Sci.)',
    action: 'Gifted an Individual Student Pass to Ruth G.',
    amount: 150,
    time: '52 mins ago',
    isGift: true,
  },
];
