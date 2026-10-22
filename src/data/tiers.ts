import { TierStats, TroopTier } from '../types';

/**
 * Base Attack Stats per tier (strictly up to T10-TG3):
 * - T9: Infantry = 400 | Cavalry = 1200 | Archery = 1600
 * - T10: Infantry = 472 | Cavalry = 1416 | Archery = 1888
 * - T10-TG1 (True Gold 1): Infantry = 491 | Cavalry = 1473 | Archery = 1964
 * - T10-TG2 (True Gold 2): Infantry = 515 | Cavalry = 1546 | Archery = 2062
 * - T10-TG3 (True Gold 3): Infantry = 541 | Cavalry = 1624 | Archery = 2165
 */
export const TIER_DATA: Record<TroopTier, TierStats> = {
  T9: {
    tier: 'T9',
    label: 'T9',
    fullName: 'Tier 9',
    infantry: 400,
    cavalry: 1200,
    archers: 1600,
    infMult: 1.0,
    cavMult: 1200 / 400, // 3.0
    archMult: 1600 / 400, // 4.0
  },
  T10: {
    tier: 'T10',
    label: 'T10',
    fullName: 'Tier 10',
    infantry: 472,
    cavalry: 1416,
    archers: 1888,
    infMult: 1.0,
    cavMult: 1416 / 472, // 3.0
    archMult: 1888 / 472, // 4.0
  },
  'T10-TG1': {
    tier: 'T10-TG1',
    label: 'T10-TG1',
    fullName: 'True Gold 1',
    infantry: 491,
    cavalry: 1473,
    archers: 1964,
    infMult: 1.0,
    cavMult: 1473 / 491, // 3.0
    archMult: 1964 / 491, // 4.0
  },
  'T10-TG2': {
    tier: 'T10-TG2',
    label: 'T10-TG2',
    fullName: 'True Gold 2',
    infantry: 515,
    cavalry: 1546,
    archers: 2062,
    infMult: 1.0,
    cavMult: 1546 / 515, // 3.0
    archMult: 2062 / 515, // 4.0
  },
  'T10-TG3': {
    tier: 'T10-TG3',
    label: 'T10-TG3',
    fullName: 'True Gold 3',
    infantry: 541,
    cavalry: 1624,
    archers: 2165,
    infMult: 1.0,
    cavMult: 1624 / 541, // 3.0
    archMult: 2165 / 541, // 4.0
  },
};

/**
 * Priority order for allocation: Higher tier first (T10-TG3 down to T9)
 */
export const TIER_PRIORITY: TroopTier[] = [
  'T10-TG3',
  'T10-TG2',
  'T10-TG1',
  'T10',
  'T9',
];

/**
 * Display order for inputs and breakdowns
 */
export const TIER_DISPLAY_ORDER: TroopTier[] = [
  'T9',
  'T10',
  'T10-TG1',
  'T10-TG2',
  'T10-TG3',
];
