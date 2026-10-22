import { CalculationResult, MarchBreakdown, MultiTierTroops, TroopCounts, TroopTier, AdvisorState } from '../types';
import { TIER_DATA, TIER_PRIORITY } from '../data/tiers';

export interface CalculatorInput {
  availableTroopsByTier: MultiTierTroops;
  numMarches: number;
  isLeadingRally: boolean;
  rallyCapacity: number;
  joinerCapacity: number;
  targetRatio: TroopCounts;
  customRallyRatio?: TroopCounts | null;
}

function emptyCounts(): TroopCounts {
  return { infantry: 0, cavalry: 0, archers: 0 };
}

function emptyMultiTier(): MultiTierTroops {
  return {
    T9: emptyCounts(),
    T10: emptyCounts(),
    'T10-TG1': emptyCounts(),
    'T10-TG2': emptyCounts(),
    'T10-TG3': emptyCounts(),
  };
}

function cloneMultiTier(src: MultiTierTroops): MultiTierTroops {
  return {
    T9: { ...src.T9 },
    T10: { ...src.T10 },
    'T10-TG1': { ...src['T10-TG1'] },
    'T10-TG2': { ...src['T10-TG2'] },
    'T10-TG3': { ...src['T10-TG3'] },
  };
}

function sumTroopCounts(src: TroopCounts): number {
  return src.infantry + src.cavalry + src.archers;
}

function sumMultiTier(src: MultiTierTroops): TroopCounts {
  const res = emptyCounts();
  for (const t of TIER_PRIORITY) {
    if (src[t]) {
      res.infantry += src[t].infantry;
      res.cavalry += src[t].cavalry;
      res.archers += src[t].archers;
    }
  }
  return res;
}

function totalPoolTroops(pool: MultiTierTroops): number {
  let count = 0;
  for (const t of TIER_PRIORITY) {
    if (pool[t]) {
      count += pool[t].infantry + pool[t].cavalry + pool[t].archers;
    }
  }
  return count;
}

function normaliseRatio(ratio: TroopCounts): { inf: number; cav: number; arch: number } {
  const sum = ratio.infantry + ratio.cavalry + ratio.archers;
  if (sum <= 0) return { inf: 0.1, cav: 0.1, arch: 0.8 };
  return {
    inf: ratio.infantry / sum,
    cav: ratio.cavalry / sum,
    arch: ratio.archers / sum,
  };
}

function fillRallyMarch(
  targetCap: number,
  ratio: { inf: number; cav: number; arch: number },
  pool: MultiTierTroops
): {
  counts: TroopCounts;
  tierBreakdown: Record<TroopTier, TroopCounts>;
  total: number;
  attackScore: number;
} {
  const breakdown = emptyMultiTier();
  const marchCounts = emptyCounts();

  let targetInf = Math.round(targetCap * ratio.inf);
  let targetCav = Math.round(targetCap * ratio.cav);
  let targetArch = Math.max(0, targetCap - targetInf - targetCav);

  function takeTroops(type: 'infantry' | 'cavalry' | 'archers', amount: number): number {
    let needed = amount;
    for (const t of TIER_PRIORITY) {
      if (needed <= 0) break;
      const avail = pool[t][type];
      const take = Math.min(needed, avail);
      if (take > 0) {
        pool[t][type] -= take;
        breakdown[t][type] += take;
        marchCounts[type] += take;
        needed -= take;
      }
    }
    return amount - needed;
  }

  takeTroops('infantry', targetInf);
  takeTroops('cavalry', targetCav);
  takeTroops('archers', targetArch);

  let currentTotal = sumTroopCounts(marchCounts);
  let deficit = targetCap - currentTotal;

  if (deficit > 0) {
    const autofillOrder: Array<'archers' | 'cavalry' | 'infantry'> = ['archers', 'cavalry', 'infantry'];
    for (const type of autofillOrder) {
      if (deficit <= 0) break;
      const taken = takeTroops(type, deficit);
      deficit -= taken;
    }
  }

  let attackScore = 0;
  for (const t of TIER_PRIORITY) {
    const stats = TIER_DATA[t];
    attackScore +=
      breakdown[t].infantry * stats.infantry +
      breakdown[t].cavalry * stats.cavalry +
      breakdown[t].archers * stats.archers;
  }

  return {
    counts: marchCounts,
    tierBreakdown: breakdown,
    total: sumTroopCounts(marchCounts),
    attackScore: Math.round(attackScore),
  };
}

export function calculateKingshotBearTrapSplits(input: CalculatorInput): CalculationResult {
  const {
    availableTroopsByTier,
    numMarches,
    isLeadingRally,
    rallyCapacity,
    joinerCapacity,
    targetRatio,
    customRallyRatio,
  } = input;

  const pool = cloneMultiTier(availableTroopsByTier);
  const totalAvailable = sumMultiTier(availableTroopsByTier);
  const grandTotalAvailable = sumTroopCounts(totalAvailable);
  const assigned = emptyCounts();
  const assignedByTier = emptyMultiTier();
  const marches: MarchBreakdown[] = [];

  const normRatio = normaliseRatio(targetRatio);
  const rallyNormRatio = customRallyRatio ? normaliseRatio(customRallyRatio) : normRatio;

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 1: MARCH 1 ALLOCATION (RALLY LEAD)
  // ───────────────────────────────────────────────────────────────────────────
  if (isLeadingRally) {
    const totalInPool = totalPoolTroops(pool);
    const m1TargetCap = Math.min(rallyCapacity, totalInPool);

    if (m1TargetCap > 0) {
      const m1Result = fillRallyMarch(m1TargetCap, rallyNormRatio, pool);

      assigned.infantry += m1Result.counts.infantry;
      assigned.cavalry += m1Result.counts.cavalry;
      assigned.archers += m1Result.counts.archers;

      for (const t of TIER_PRIORITY) {
        assignedByTier[t].infantry += m1Result.tierBreakdown[t].infantry;
        assignedByTier[t].cavalry += m1Result.tierBreakdown[t].cavalry;
        assignedByTier[t].archers += m1Result.tierBreakdown[t].archers;
      }

      marches.push({
        marchNumber: 1,
        title: 'March 1 (Rally Lead)',
        type: 'rally_lead',
        infantry: m1Result.counts.infantry,
        cavalry: m1Result.counts.cavalry,
        archers: m1Result.counts.archers,
        total: m1Result.total,
        capacity: rallyCapacity,
        attackScore: m1Result.attackScore,
        tierBreakdown: m1Result.tierBreakdown,
      });
    } else {
      marches.push({
        marchNumber: 1,
        title: 'March 1 (Rally Lead)',
        type: 'rally_lead',
        infantry: 0,
        cavalry: 0,
        archers: 0,
        total: 0,
        capacity: rallyCapacity,
        attackScore: 0,
        tierBreakdown: emptyMultiTier(),
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 2: EQUALIZED DISTRIBUTION ACROSS ALL JOINER MARCHES (UP TO 6 JOINERS)
  // ───────────────────────────────────────────────────────────────────────────
  const activeJoinerCount = isLeadingRally ? Math.max(0, numMarches - 1) : numMarches;
  let optimalMarchSize = 0;

  if (activeJoinerCount > 0) {
    let remInfTotal = 0;
    let remCavTotal = 0;
    let remArchTotal = 0;

    for (const t of TIER_PRIORITY) {
      remInfTotal += pool[t].infantry;
      remCavTotal += pool[t].cavalry;
      remArchTotal += pool[t].archers;
    }

    const totalRemaining = remInfTotal + remCavTotal + remArchTotal;

    optimalMarchSize = Math.min(
      joinerCapacity,
      Math.floor(totalRemaining / activeJoinerCount)
    );

    const marchTargets: Array<{ inf: number; cav: number; arch: number; targetCap: number }> = [];
    let remainderTotal = totalRemaining - optimalMarchSize * activeJoinerCount;

    for (let j = 0; j < activeJoinerCount; j++) {
      let cap = optimalMarchSize;
      if (remainderTotal > 0 && cap < joinerCapacity) {
        cap += 1;
        remainderTotal -= 1;
      }

      let tInf = Math.round(cap * normRatio.inf);
      let tCav = Math.round(cap * normRatio.cav);
      let tArch = Math.max(0, cap - tInf - tCav);

      const maxEqualArch = Math.floor(remArchTotal / activeJoinerCount);
      const maxEqualCav = Math.floor(remCavTotal / activeJoinerCount);
      const maxEqualInf = Math.floor(remInfTotal / activeJoinerCount);

      marchTargets.push({
        inf: Math.min(tInf, maxEqualInf),
        cav: Math.min(tCav, maxEqualCav),
        arch: Math.min(tArch, maxEqualArch),
        targetCap: cap,
      });
    }

    const joinerResults: Array<{
      counts: TroopCounts;
      tierBreakdown: Record<TroopTier, TroopCounts>;
      total: number;
      attackScore: number;
      targetCap: number;
    }> = [];

    for (let j = 0; j < activeJoinerCount; j++) {
      joinerResults.push({
        counts: emptyCounts(),
        tierBreakdown: emptyMultiTier(),
        total: 0,
        attackScore: 0,
        targetCap: marchTargets[j].targetCap,
      });
    }

    function withdrawFromPool(type: 'infantry' | 'cavalry' | 'archers', marchIndex: number, amount: number): number {
      let needed = amount;
      for (const t of TIER_PRIORITY) {
        if (needed <= 0) break;
        const avail = pool[t][type];
        const take = Math.min(needed, avail);
        if (take > 0) {
          pool[t][type] -= take;
          joinerResults[marchIndex].tierBreakdown[t][type] += take;
          joinerResults[marchIndex].counts[type] += take;
          joinerResults[marchIndex].total += take;
          needed -= take;
        }
      }
      return amount - needed;
    }

    // Pass 1: Fair share of Archers, Cavalry, Infantry across joiners
    for (let j = 0; j < activeJoinerCount; j++) {
      if (marchTargets[j].arch > 0) withdrawFromPool('archers', j, marchTargets[j].arch);
      if (marchTargets[j].cav > 0) withdrawFromPool('cavalry', j, marchTargets[j].cav);
      if (marchTargets[j].inf > 0) withdrawFromPool('infantry', j, marchTargets[j].inf);
    }

    // Pass 2: Remaining Archers distributed equally across all marches with remaining space
    let remainingArchers = 0;
    for (const t of TIER_PRIORITY) remainingArchers += pool[t].archers;

    if (remainingArchers > 0) {
      let distributed = true;
      while (remainingArchers > 0 && distributed) {
        distributed = false;
        for (let j = 0; j < activeJoinerCount; j++) {
          if (remainingArchers <= 0) break;
          const space = joinerResults[j].targetCap - joinerResults[j].total;
          if (space > 0) {
            const take = Math.min(space, Math.max(1, Math.floor(remainingArchers / activeJoinerCount) || 1));
            const actualTaken = withdrawFromPool('archers', j, take);
            if (actualTaken > 0) {
              remainingArchers -= actualTaken;
              distributed = true;
            }
          }
        }
      }
    }

    // Pass 3: Fill any remaining capacity with Cavalry, then Infantry
    const autofillTypes: Array<'cavalry' | 'infantry' | 'archers'> = ['cavalry', 'infantry', 'archers'];
    for (const type of autofillTypes) {
      let poolOfThisType = 0;
      for (const t of TIER_PRIORITY) poolOfThisType += pool[t][type];

      while (poolOfThisType > 0) {
        let changed = false;
        for (let j = 0; j < activeJoinerCount; j++) {
          if (poolOfThisType <= 0) break;
          const space = joinerResults[j].targetCap - joinerResults[j].total;
          if (space > 0) {
            const take = Math.min(space, Math.max(1, Math.floor(poolOfThisType / activeJoinerCount) || 1));
            const actual = withdrawFromPool(type, j, take);
            if (actual > 0) {
              poolOfThisType -= actual;
              changed = true;
            }
          }
        }
        if (!changed) break;
      }
    }

    // Pass 4: Assemble marches
    for (let j = 0; j < activeJoinerCount; j++) {
      const marchNum = isLeadingRally ? j + 2 : j + 1;
      const res = joinerResults[j];

      let score = 0;
      for (const t of TIER_PRIORITY) {
        const stats = TIER_DATA[t];
        score +=
          res.tierBreakdown[t].infantry * stats.infantry +
          res.tierBreakdown[t].cavalry * stats.cavalry +
          res.tierBreakdown[t].archers * stats.archers;

        assignedByTier[t].infantry += res.tierBreakdown[t].infantry;
        assignedByTier[t].cavalry += res.tierBreakdown[t].cavalry;
        assignedByTier[t].archers += res.tierBreakdown[t].archers;
      }

      res.attackScore = Math.round(score);
      assigned.infantry += res.counts.infantry;
      assigned.cavalry += res.counts.cavalry;
      assigned.archers += res.counts.archers;

      marches.push({
        marchNumber: marchNum,
        title: `March ${marchNum} (Joiner)`,
        type: 'joiner',
        infantry: res.counts.infantry,
        cavalry: res.counts.cavalry,
        archers: res.counts.archers,
        total: res.total,
        capacity: joinerCapacity,
        attackScore: res.attackScore,
        tierBreakdown: res.tierBreakdown,
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STRATEGY ADVISOR
  // ───────────────────────────────────────────────────────────────────────────
  const joinersUnderfilled = marches.some((m) => m.type === 'joiner' && m.total < joinerCapacity * 0.7);
  const isLowTroops = grandTotalAvailable < 450000 && isLeadingRally && joinersUnderfilled;

  const recommendedRallyCap = Math.max(
    1,
    Math.min(rallyCapacity, Math.floor(grandTotalAvailable / Math.max(1, numMarches)))
  );

  const advisor: AdvisorState = {
    isLowTroops,
    totalTroops: grandTotalAvailable,
    recommendedRallyCap,
    joinersStarved: joinersUnderfilled,
    message: isLowTroops
      ? 'Troop pool under 450K: A full Rally Lead starves your remaining waves. Optimize rally capacity or use a 1-troop lead.'
      : '',
  };

  const unassigned = sumMultiTier(pool);
  const totalTroopsUsed = sumTroopCounts(assigned);

  let estimatedDamageScore = 0;
  for (const t of TIER_PRIORITY) {
    const stats = TIER_DATA[t];
    estimatedDamageScore +=
      assignedByTier[t].infantry * stats.infantry +
      assignedByTier[t].cavalry * stats.cavalry +
      assignedByTier[t].archers * stats.archers;
  }

  return {
    isLeadingRally,
    rallyCapacity,
    joinerCapacity,
    numMarches,
    marches,
    totalAvailable,
    totalAvailableByTier: availableTroopsByTier,
    totalAssigned: assigned,
    totalAssignedByTier: assignedByTier,
    unassigned,
    unassignedByTier: pool,
    targetRatio,
    totalTroopsUsed,
    estimatedDamageScore: Math.round(estimatedDamageScore),
    optimalMarchSize,
    advisor,
  };
}

export function formatNumberCompact(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toLocaleString();
}
