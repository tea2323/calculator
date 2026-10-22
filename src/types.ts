export type TroopType = 'infantry' | 'cavalry' | 'archers';

export type TroopTier = 'T9' | 'T10' | 'T10-TG1' | 'T10-TG2' | 'T10-TG3';

export interface TroopCounts {
  infantry: number;
  cavalry: number;
  archers: number;
}

export type MultiTierTroops = Record<TroopTier, TroopCounts>;

export interface TierStats {
  tier: TroopTier;
  label: string;
  fullName: string;
  infantry: number;
  cavalry: number;
  archers: number;
  infMult: number;
  cavMult: number;
  archMult: number;
}

export type MarchType = 'rally_lead' | 'joiner';

export interface MarchBreakdown {
  marchNumber: number;
  title: string;
  type: MarchType;
  infantry: number;
  cavalry: number;
  archers: number;
  total: number;
  capacity: number;
  attackScore: number;
  tierBreakdown: Record<TroopTier, TroopCounts>;
}

export interface RatioPreset {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  infantryPct: number;
  cavalryPct: number;
  archersPct: number;
  badge?: string;
  icon?: string;
}

export interface AdvisorState {
  isLowTroops: boolean;
  totalTroops: number;
  recommendedRallyCap: number;
  joinersStarved: boolean;
  message: string;
}

export interface CalculationResult {
  isLeadingRally: boolean;
  rallyCapacity: number;
  joinerCapacity: number;
  numMarches: number;
  marches: MarchBreakdown[];
  totalAvailable: TroopCounts;
  totalAvailableByTier: MultiTierTroops;
  totalAssigned: TroopCounts;
  totalAssignedByTier: MultiTierTroops;
  unassigned: TroopCounts;
  unassignedByTier: MultiTierTroops;
  targetRatio: TroopCounts;
  totalTroopsUsed: number;
  estimatedDamageScore: number;
  optimalMarchSize: number;
  advisor: AdvisorState;
}
