import React, { useState } from 'react';
import { MultiTierTroops, TroopCounts, TroopTier } from '../types';
import { TIER_DATA, TIER_DISPLAY_ORDER } from '../data/tiers';
import { Crown, Shield, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Translations } from '../data/translations';

interface TroopInputCardProps {
  troopsByTier: MultiTierTroops;
  onChangeTroopsByTier: (t: MultiTierTroops) => void;
  numMarches: number;
  onChangeNumMarches: (n: number) => void;
  isLeadingRally: boolean;
  onChangeIsLeadingRally: (v: boolean) => void;
  rallyCapacity: number;
  onChangeRallyCapacity: (v: number) => void;
  joinerCapacity: number;
  onChangeJoinerCapacity: (v: number) => void;
  customRallyRatioEnabled: boolean;
  onToggleCustomRallyRatio: (v: boolean) => void;
  customRallyRatio: TroopCounts;
  onChangeCustomRallyRatio: (r: TroopCounts) => void;
  t: Translations;
}

export const TroopInputCard: React.FC<TroopInputCardProps> = ({
  troopsByTier,
  onChangeTroopsByTier,
  numMarches,
  onChangeNumMarches,
  isLeadingRally,
  onChangeIsLeadingRally,
  rallyCapacity,
  onChangeRallyCapacity,
  joinerCapacity,
  onChangeJoinerCapacity,
  customRallyRatioEnabled,
  onToggleCustomRallyRatio,
  customRallyRatio,
  onChangeCustomRallyRatio,
  t,
}) => {
  const [showTierStats, setShowTierStats] = useState(false);

  let totalInf = 0;
  let totalCav = 0;
  let totalArch = 0;

  for (const t of TIER_DISPLAY_ORDER) {
    if (troopsByTier[t]) {
      totalInf += troopsByTier[t].infantry;
      totalCav += troopsByTier[t].cavalry;
      totalArch += troopsByTier[t].archers;
    }
  }

  const grandTotal = totalInf + totalCav + totalArch;
  const infPct = grandTotal > 0 ? (totalInf / grandTotal) * 100 : 0;
  const cavPct = grandTotal > 0 ? (totalCav / grandTotal) * 100 : 0;
  const archPct = grandTotal > 0 ? (totalArch / grandTotal) * 100 : 0;

  const parseUnrestrictedInt = (val: string): number => {
    if (val === '') return 0;
    const clean = val.replace(/[^0-9]/g, '');
    if (!clean) return 0;
    const num = parseInt(clean, 10);
    return isNaN(num) ? 0 : num;
  };

  const handleCellChange = (tier: TroopTier, field: keyof TroopCounts, val: string) => {
    const num = parseUnrestrictedInt(val);
    onChangeTroopsByTier({
      ...troopsByTier,
      [tier]: {
        ...troopsByTier[tier],
        [field]: num,
      },
    });
  };

  return (
    <div
      className="rounded-2xl border space-y-4 sm:space-y-5 p-3.5 sm:p-6"
      style={{
        background: 'linear-gradient(135deg, #0e1424 0%, #11182c 100%)',
        borderColor: 'rgba(229,193,88,0.22)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      }}
    >
      {/* ── Card Header ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between pb-3 sm:pb-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
            <span
              className="flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold border"
              style={{
                background: 'rgba(229,193,88,0.15)',
                borderColor: 'rgba(229,193,88,0.35)',
                color: '#e5c158',
              }}
            >
              1
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {t.troopRosterTitle}
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400">
            {t.troopRosterSubtitle}
          </p>
        </div>
      </div>

      {/* ── Multi-Tier Troop Input Section ──────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
            {t.troopMatrixTitle}
          </span>
          <button
            onClick={() => setShowTierStats(!showTierStats)}
            className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer py-1"
          >
            <span>{showTierStats ? t.hideBaseStats : t.viewBaseStats}</span>
            {showTierStats ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Base Attack Reference Panel (collapsible) */}
        {showTierStats && (
          <div
            className="rounded-xl border p-2.5 sm:p-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs animate-in"
            style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(0,242,254,0.25)' }}
          >
            {TIER_DISPLAY_ORDER.map((t) => {
              const d = TIER_DATA[t];
              return (
                <div key={t} className="p-2 rounded-lg border bg-black/20 border-white/5 space-y-1">
                  <div className="font-bold text-cyan-400 flex items-center justify-between">
                    <span>{t}</span>
                    <span className="text-[10px] text-amber-300 font-mono">4.0x DPS</span>
                  </div>
                  <div className="text-[10px] text-slate-300 space-y-0.5 font-mono">
                    <div>Inf: {d.infantry}</div>
                    <div>Cav: {d.cavalry}</div>
                    <div className="text-amber-300 font-bold">Arch: {d.archers}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── MOBILE VIEW (< sm): Clean, Native Stacked Tier Cards (Zero Horizontal Overflow) ── */}
        <div className="block sm:hidden space-y-2.5">
          {TIER_DISPLAY_ORDER.map((tier) => {
            const row = troopsByTier[tier] || { infantry: 0, cavalry: 0, archers: 0 };
            const subtotal = row.infantry + row.cavalry + row.archers;
            const isTrueGold = tier.startsWith('T10-TG');

            return (
              <div
                key={`mobile-${tier}`}
                className="rounded-xl border p-3 space-y-2.5 bg-black/40 border-white/10"
              >
                {/* Tier Card Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isTrueGold ? 'bg-amber-400' : 'bg-cyan-400'
                      }`}
                    />
                    <span className={`font-bold text-sm ${isTrueGold ? 'text-amber-300' : 'text-slate-100'}`}>
                      {tier}
                    </span>
                    {isTrueGold && (
                      <span className="text-[10px] text-slate-400">({TIER_DATA[tier].fullName})</span>
                    )}
                  </div>
                  <div className="font-mono text-xs font-semibold text-slate-300">
                    {t.subtotal}: <span className="text-amber-400">{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* 3 Mobile Input Columns */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Infantry */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-300 flex items-center gap-1">
                      <span>🛡</span>
                      <span>{t.infantry}</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={row.infantry === 0 ? '' : row.infantry}
                      onChange={(e) => handleCellChange(tier, 'infantry', e.target.value)}
                      className="w-full min-h-[44px] rounded-lg px-2 py-2 bg-black/60 border border-slate-700 focus:border-amber-400 outline-none text-slate-200 font-mono text-xs text-center transition-colors"
                      placeholder="0"
                    />
                  </div>

                  {/* Cavalry */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-blue-300 flex items-center gap-1">
                      <span>🐎</span>
                      <span>{t.cavalry}</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={row.cavalry === 0 ? '' : row.cavalry}
                      onChange={(e) => handleCellChange(tier, 'cavalry', e.target.value)}
                      className="w-full min-h-[44px] rounded-lg px-2 py-2 bg-black/60 border border-blue-900/60 focus:border-blue-400 outline-none text-blue-200 font-mono text-xs text-center transition-colors"
                      placeholder="0"
                    />
                  </div>

                  {/* Archers */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <span>🏹</span>
                      <span>{t.archersDps}</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={row.archers === 0 ? '' : row.archers}
                      onChange={(e) => handleCellChange(tier, 'archers', e.target.value)}
                      className="w-full min-h-[44px] rounded-lg px-2 py-2 bg-black/60 border border-amber-500/50 focus:border-amber-400 outline-none text-amber-300 font-mono text-xs font-bold text-center transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile Grand Total Summary Card */}
          <div className="rounded-xl border p-3 bg-white/5 border-white/10 flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-slate-300 uppercase tracking-wider text-[11px]">{t.totalPool}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-200">{totalInf.toLocaleString()} {t.infantry}</span>
              <span className="text-slate-500">·</span>
              <span className="text-blue-300">{totalCav.toLocaleString()} {t.cavalry}</span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-400">{totalArch.toLocaleString()} {t.archers}</span>
            </div>
          </div>
        </div>

        {/* ── DESKTOP VIEW (>= sm): Full High-Contrast Matrix Table ───────── */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-white/10 bg-black/30">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 bg-white/5">
                <th className="py-2.5 px-3 font-semibold">{t.tier}</th>
                <th className="py-2.5 px-3 font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span>🛡</span> {t.infantry}
                  </span>
                </th>
                <th className="py-2.5 px-3 font-semibold text-blue-300">
                  <span className="flex items-center gap-1.5">
                    <span>🐎</span> {t.cavalry}
                  </span>
                </th>
                <th className="py-2.5 px-3 font-semibold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <span>🏹</span> {t.archersDps}
                  </span>
                </th>
                <th className="py-2.5 px-3 font-semibold text-right text-slate-300">{t.subtotal}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {TIER_DISPLAY_ORDER.map((tier) => {
                const row = troopsByTier[tier] || { infantry: 0, cavalry: 0, archers: 0 };
                const subtotal = row.infantry + row.cavalry + row.archers;
                const isTrueGold = tier.startsWith('T10-TG');

                return (
                  <tr key={`desktop-${tier}`} className="hover:bg-white/[0.02] transition-colors">
                    {/* Tier Label */}
                    <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isTrueGold ? 'bg-amber-400' : 'bg-cyan-400'
                          }`}
                        />
                        <span className={isTrueGold ? 'text-amber-300' : 'text-slate-200'}>
                          {tier}
                        </span>
                        {isTrueGold && (
                          <span className="text-[9px] text-slate-400">({TIER_DATA[tier].fullName})</span>
                        )}
                      </div>
                    </td>

                    {/* Infantry Input */}
                    <td className="py-2 px-2.5">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={row.infantry === 0 ? '' : row.infantry}
                        onChange={(e) => handleCellChange(tier, 'infantry', e.target.value)}
                        className="w-full min-h-[40px] rounded-lg px-2.5 py-1.5 bg-black/40 border border-slate-700 focus:border-amber-400 outline-none text-slate-200 font-mono text-xs transition-colors"
                        placeholder="0"
                      />
                    </td>

                    {/* Cavalry Input */}
                    <td className="py-2 px-2.5">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={row.cavalry === 0 ? '' : row.cavalry}
                        onChange={(e) => handleCellChange(tier, 'cavalry', e.target.value)}
                        className="w-full min-h-[40px] rounded-lg px-2.5 py-1.5 bg-black/40 border border-blue-900/60 focus:border-blue-400 outline-none text-blue-200 font-mono text-xs transition-colors"
                        placeholder="0"
                      />
                    </td>

                    {/* Archers Input */}
                    <td className="py-2 px-2.5">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={row.archers === 0 ? '' : row.archers}
                        onChange={(e) => handleCellChange(tier, 'archers', e.target.value)}
                        className="w-full min-h-[40px] rounded-lg px-2.5 py-1.5 bg-black/40 border border-amber-500/40 focus:border-amber-400 outline-none text-amber-300 font-mono text-xs font-semibold transition-colors"
                        placeholder="0"
                      />
                    </td>

                    {/* Subtotal */}
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300 font-semibold whitespace-nowrap">
                      {subtotal.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Grand Total Row */}
            <tfoot>
              <tr className="border-t border-white/10 bg-white/5 font-bold">
                <td className="py-2.5 px-3 text-slate-300">{t.totalPool}</td>
                <td className="py-2.5 px-3 font-mono text-slate-200">{totalInf.toLocaleString()}</td>
                <td className="py-2.5 px-3 font-mono text-blue-300">{totalCav.toLocaleString()}</td>
                <td className="py-2.5 px-3 font-mono text-amber-300">{totalArch.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-amber-400">{grandTotal.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Total Reserves Progress Bar ───────────────────────────────────── */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">{t.rosterRatio}:</span>
          <span className="font-bold font-mono text-white">{grandTotal.toLocaleString()} {t.troops.toLowerCase()}</span>
        </div>
        <div
          className="h-2.5 w-full rounded-full overflow-hidden flex border border-white/5"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div
            style={{ width: `${infPct}%`, background: 'linear-gradient(90deg,#475569,#94a3b8)' }}
            className="transition-all duration-300"
            title={`${t.infantry}: ${Math.round(infPct)}%`}
          />
          <div
            style={{ width: `${cavPct}%`, background: 'linear-gradient(90deg,#1d4ed8,#60a5fa)' }}
            className="transition-all duration-300"
            title={`${t.cavalry}: ${Math.round(cavPct)}%`}
          />
          <div
            style={{ width: `${archPct}%`, background: 'linear-gradient(90deg,#b45309,#e5c158)' }}
            className="transition-all duration-300"
            title={`${t.archers}: ${Math.round(archPct)}%`}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">{t.infantry}: {Math.round(infPct)}%</span>
          <span className="text-blue-300">{t.cavalry}: {Math.round(cavPct)}%</span>
          <span className="text-amber-400 font-bold">{t.archers}: {Math.round(archPct)}%</span>
        </div>
      </div>

      {/* ── Marches & Capacities Configuration (1 up to 7 marches) ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
        {/* Total Number of Marches (1 to 7) */}
        <div
          className="rounded-xl border p-3.5 sm:p-4 space-y-2.5 sm:space-y-3"
          style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <label className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Users className="w-4 h-4" />
            <span>{t.marchCountTitle}</span>
          </label>
          <div className="grid grid-cols-7 gap-1 p-1 rounded-lg bg-black/40">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <button
                key={n}
                onClick={() => onChangeNumMarches(n)}
                className={`min-h-[44px] sm:min-h-[38px] text-xs font-bold rounded-md transition-all active:scale-95 cursor-pointer font-mono flex items-center justify-center ${
                  numMarches === n
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {isLeadingRally
              ? t.marchCountDescLead
                  .replace('{n}', Math.max(0, numMarches - 1).toString())
                  .replace('{joiners}', Math.max(0, numMarches - 1).toString())
              : t.marchCountDescJoiner
                  .replace('{n}', numMarches.toString())
                  .replace('{num}', numMarches.toString())}
          </p>
        </div>

        {/* Capacity Settings */}
        <div
          className="rounded-xl border p-3.5 sm:p-4 space-y-3 sm:space-y-3.5"
          style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {/* Leading Rally Toggle */}
          <div className="flex items-center justify-between min-h-[44px]">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isLeadingRally}
                onChange={(e) => onChangeIsLeadingRally(e.target.checked)}
                className="w-5 h-5 rounded accent-amber-500 cursor-pointer"
              />
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>{t.leadRallyToggle}</span>
              </span>
            </label>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isLeadingRally
                  ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
                  : 'text-slate-500 border-white/5'
              }`}
            >
              {isLeadingRally ? t.rallyLeadActive : t.allJoiners}
            </span>
          </div>

          {/* Rally Capacity */}
          {isLeadingRally && (
            <div className="space-y-3 animate-in border-b border-white/5 pb-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <Crown className="w-3.5 h-3.5" />
                    <span>{t.rallyCapacityLabel}</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {rallyCapacity.toLocaleString()}
                  </span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={rallyCapacity === 0 ? '' : rallyCapacity}
                  onChange={(e) => onChangeRallyCapacity(parseUnrestrictedInt(e.target.value))}
                  className="w-full min-h-[44px] rounded-lg px-3 py-2 text-xs font-mono font-bold bg-black/40 border border-amber-500/40 focus:border-amber-400 outline-none text-amber-300"
                  placeholder="e.g. 125000"
                />
              </div>

              {/* Custom Rally Ratio Toggle & Compact Inputs */}
              <div className="pt-1 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customRallyRatioEnabled}
                      onChange={(e) => onToggleCustomRallyRatio(e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                    />
                    <span className="text-[11px] font-bold text-slate-300 hover:text-amber-300 transition-colors">
                      {t.customRallyRatioToggle}
                    </span>
                  </label>
                  {customRallyRatioEnabled && (
                    <span className="text-[10px] font-mono text-amber-400/90 font-semibold">
                      Total: {customRallyRatio.infantry + customRallyRatio.cavalry + customRallyRatio.archers}%
                    </span>
                  )}
                </div>

                {customRallyRatioEnabled && (
                  <div
                    className="grid grid-cols-3 gap-2 p-2.5 rounded-xl border border-amber-500/30 bg-black/50 animate-in"
                  >
                    {/* % Infantry */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-300 flex items-center gap-1">
                        <span>🛡</span>
                        <span>{t.infantry}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={customRallyRatio.infantry === 0 ? '' : customRallyRatio.infantry}
                          onChange={(e) =>
                            onChangeCustomRallyRatio({
                              ...customRallyRatio,
                              infantry: parseUnrestrictedInt(e.target.value),
                            })
                          }
                          className="w-full min-h-[38px] rounded-lg px-2 py-1.5 pr-5 text-xs font-mono font-bold bg-black/60 border border-slate-700 focus:border-amber-400 outline-none text-slate-200 text-center"
                          placeholder="0"
                        />
                        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">%</span>
                      </div>
                    </div>

                    {/* % Cavalry */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-blue-300 flex items-center gap-1">
                        <span>🐎</span>
                        <span>{t.cavalry}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={customRallyRatio.cavalry === 0 ? '' : customRallyRatio.cavalry}
                          onChange={(e) =>
                            onChangeCustomRallyRatio({
                              ...customRallyRatio,
                              cavalry: parseUnrestrictedInt(e.target.value),
                            })
                          }
                          className="w-full min-h-[38px] rounded-lg px-2 py-1.5 pr-5 text-xs font-mono font-bold bg-black/60 border border-blue-900/60 focus:border-blue-400 outline-none text-blue-200 text-center"
                          placeholder="0"
                        />
                        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">%</span>
                      </div>
                    </div>

                    {/* % Archers */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                        <span>🏹</span>
                        <span>{t.archers}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={customRallyRatio.archers === 0 ? '' : customRallyRatio.archers}
                          onChange={(e) =>
                            onChangeCustomRallyRatio({
                              ...customRallyRatio,
                              archers: parseUnrestrictedInt(e.target.value),
                            })
                          }
                          className="w-full min-h-[38px] rounded-lg px-2 py-1.5 pr-5 text-xs font-mono font-bold bg-black/60 border border-amber-500/50 focus:border-amber-400 outline-none text-amber-300 text-center"
                          placeholder="0"
                        />
                        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Joiner Capacity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                <Shield className="w-3.5 h-3.5" />
                <span>{t.joinerCapacityLabel}</span>
              </label>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {joinerCapacity.toLocaleString()}
              </span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={joinerCapacity === 0 ? '' : joinerCapacity}
              onChange={(e) => onChangeJoinerCapacity(parseUnrestrictedInt(e.target.value))}
              className="w-full min-h-[44px] rounded-lg px-3 py-2 text-xs font-mono font-bold bg-black/40 border border-cyan-500/40 focus:border-cyan-400 outline-none text-cyan-200"
              placeholder="e.g. 60000"
            />
            <p className="text-[10px] text-slate-400">
              {t.joinerCapacityNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
