import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { MarchBreakdownCard } from './MarchBreakdownCard';
import { Copy, Check, ShieldCheck, AlertTriangle, Sliders, Zap } from 'lucide-react';
import { TIER_DISPLAY_ORDER } from '../data/tiers';
import { Translations } from '../data/translations';

interface ResultsDashboardProps {
  results: CalculationResult;
  onCopySuccess: (text: string) => void;
  onOptimizeRallyLead: (cap: number) => void;
  onOneTroopRally: () => void;
  t: Translations;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  results,
  onCopySuccess,
  onOptimizeRallyLead,
  onOneTroopRally,
  t,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [showReservesBreakdown, setShowReservesBreakdown] = useState(false);

  const totalAvailable =
    results.totalAvailable.infantry +
    results.totalAvailable.cavalry +
    results.totalAvailable.archers;

  const totalUnassigned =
    results.unassigned.infantry +
    results.unassigned.cavalry +
    results.unassigned.archers;

  const hasUnassigned = totalUnassigned > 0;
  const advisor = results.advisor;

  const handleCopyAll = () => {
    let summary = `=== TEA CALCULATOR — BATTLE ROSTER ===\n`;
    summary += `Total Troops Deployed: ${results.totalTroopsUsed.toLocaleString()} / ${totalAvailable.toLocaleString()}\n\n`;

    results.marches.forEach((m) => {
      const formatTypes = (type: 'archers' | 'cavalry' | 'infantry') => {
        const list: string[] = [];
        for (const tier of TIER_DISPLAY_ORDER) {
          const count = m.tierBreakdown[tier]?.[type] || 0;
          if (count > 0) list.push(`${count.toLocaleString()} x ${tier}`);
        }
        return list.length > 0 ? `(${list.join(', ')})` : '';
      };

      summary += `${m.title} [${m.total.toLocaleString()} Troops / Cap ${m.capacity.toLocaleString()}]\n`;
      summary += `  Archers: ${m.archers.toLocaleString()} ${formatTypes('archers')}\n`;
      summary += `  Cavalry: ${m.cavalry.toLocaleString()} ${formatTypes('cavalry')}\n`;
      summary += `  Infantry: ${m.infantry.toLocaleString()} ${formatTypes('infantry')}\n\n`;
    });

    if (hasUnassigned) {
      summary += `Unassigned Reserves (${totalUnassigned.toLocaleString()}):\n`;
      summary += `  Infantry: ${results.unassigned.infantry.toLocaleString()}\n`;
      summary += `  Cavalry:  ${results.unassigned.cavalry.toLocaleString()}\n`;
      summary += `  Archers:  ${results.unassigned.archers.toLocaleString()}\n`;
    }

    navigator.clipboard.writeText(summary);
    setCopiedAll(true);
    onCopySuccess(t.copiedAllMarches);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div
      className="rounded-2xl border space-y-4 sm:space-y-5 p-3.5 sm:p-6 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #090d16 0%, #0e1424 100%)',
        borderColor: 'rgba(229,193,88,0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* ── Strategy Advisor Banner (< 450k troops) ─────────────────────── */}
      {advisor.isLowTroops && (
        <div
          className="rounded-2xl border p-3.5 sm:p-4 space-y-3 animate-in"
          style={{
            background: 'linear-gradient(135deg, rgba(229,193,88,0.15) 0%, rgba(245,158,11,0.1) 100%)',
            borderColor: 'rgba(229,193,88,0.5)',
          }}
        >
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-bold text-amber-300 text-xs sm:text-sm tracking-wide uppercase">
                  {t.strategyAdvisorTitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-200">
                  {t.advisorLowPool}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed">
                {t.advisorWarning}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              onClick={() => onOptimizeRallyLead(advisor.recommendedRallyCap)}
              className="flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #e5c158, #d97706)',
                color: '#090d16',
                borderColor: 'rgba(229,193,88,0.8)',
              }}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.optimizeRallyBtn.replace('{cap}', advisor.recommendedRallyCap.toLocaleString())}</span>
            </button>

            <button
              onClick={onOneTroopRally}
              className="flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 cursor-pointer"
              style={{
                background: 'rgba(0,242,254,0.12)',
                borderColor: 'rgba(0,242,254,0.4)',
                color: '#00f2fe',
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t.oneTroopRallyBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Dashboard Header ────────────────────────────────────────────── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 sm:pb-4"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold border font-mono"
              style={{
                background: 'rgba(0,242,254,0.15)',
                borderColor: 'rgba(0,242,254,0.4)',
                color: '#00f2fe',
              }}
            >
              2
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {t.outputDashboardTitle}
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400">
            {t.squadsCount
              .replace('{n}', results.marches.length.toString())
              .replace('{count}', results.marches.length.toString())}
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
          style={
            copiedAll
              ? {
                  background: 'rgba(74,222,128,0.25)',
                  borderColor: 'rgba(74,222,128,0.5)',
                  color: '#4ade80',
                }
              : {
                  background: 'linear-gradient(135deg, rgba(229,193,88,0.2), rgba(0,242,254,0.15))',
                  borderColor: 'rgba(229,193,88,0.5)',
                  color: '#e5c158',
                }
          }
        >
          {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? t.copiedAllMarches : t.copyAllMarches}</span>
        </button>
      </div>

      {/* ── Key Stat Cards (2-column on mobile, 3-column on sm+) ─────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
        <div className="rounded-xl border p-2.5 sm:p-3 space-y-0.5 bg-black/30 border-white/5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            {t.totalPool}
          </div>
          <div className="text-sm sm:text-lg font-bold text-white font-mono">
            {totalAvailable.toLocaleString()}
          </div>
        </div>

        <div className="rounded-xl border p-2.5 sm:p-3 space-y-0.5 bg-cyan-500/[0.04] border-cyan-500/20">
          <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
            {t.deployed}
          </div>
          <div className="text-sm sm:text-lg font-bold text-cyan-300 font-mono">
            {results.totalTroopsUsed.toLocaleString()}
          </div>
        </div>

        <div
          className={`col-span-2 sm:col-span-1 rounded-xl border p-2.5 sm:p-3 space-y-0.5 ${
            hasUnassigned
              ? 'bg-amber-500/[0.05] border-amber-500/30'
              : 'bg-emerald-500/[0.04] border-emerald-500/20'
          }`}
        >
          <div
            className={`text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 ${
              hasUnassigned ? 'text-amber-400' : 'text-emerald-400'
            }`}
          >
            {hasUnassigned ? <AlertTriangle className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
            {hasUnassigned ? t.unassigned : t.fullyDeployed}
          </div>
          <div
            className={`text-sm sm:text-lg font-bold font-mono ${
              hasUnassigned ? 'text-amber-300' : 'text-emerald-300'
            }`}
          >
            {totalUnassigned.toLocaleString()}
          </div>
        </div>
      </div>

      {/* ── Unassigned Reserves (if any) ─────────────────────────────────── */}
      {hasUnassigned && (
        <div className="rounded-xl border p-2.5 sm:p-3 bg-amber-500/[0.05] border-amber-500/30 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-amber-300 font-semibold text-[11px] sm:text-xs">
              {totalUnassigned.toLocaleString()} {t.unassigned.toLowerCase()} {t.troops.toLowerCase()}
            </span>
            <button
              onClick={() => setShowReservesBreakdown(!showReservesBreakdown)}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline py-1"
            >
              {showReservesBreakdown ? t.hideReserves : t.viewReserves}
            </button>
          </div>

          {showReservesBreakdown && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 pt-1 font-mono text-[11px]">
              {TIER_DISPLAY_ORDER.map((tier) => {
                const u = results.unassignedByTier[tier];
                const sum = u ? u.infantry + u.cavalry + u.archers : 0;
                return (
                  <div key={tier} className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                    <div className="font-bold text-amber-400">{tier}: {sum.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">
                      Inf: {u?.infantry || 0} | Cav: {u?.cavalry || 0} | Arch: {u?.archers || 0}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── March Cards List (Clean, No Percentages, No Atk) ─────────────── */}
      <div className="space-y-3 pt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
          {t.marchDeployments.replace('{n}', results.marches.length.toString())}
        </h3>

        <div className="space-y-3">
          {results.marches.map((march) => (
            <MarchBreakdownCard
              key={march.marchNumber}
              march={march}
              onCopySuccess={onCopySuccess}
              t={t}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
