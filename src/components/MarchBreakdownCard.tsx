import React, { useState } from 'react';
import { MarchBreakdown } from '../types';
import { Copy, Check, Crown } from 'lucide-react';
import { TIER_DISPLAY_ORDER } from '../data/tiers';
import { Translations } from '../data/translations';

interface MarchBreakdownCardProps {
  march: MarchBreakdown;
  onCopySuccess: (text: string) => void;
  t: Translations;
}

export const MarchBreakdownCard: React.FC<MarchBreakdownCardProps> = ({
  march,
  onCopySuccess,
  t,
}) => {
  const [copied, setCopied] = React.useState(false);

  const isRallyLead = march.type === 'rally_lead';

  // Format clean tier breakdown without percentages
  const formatTierBreakdown = (type: 'archers' | 'cavalry' | 'infantry') => {
    const list: string[] = [];
    for (const tier of TIER_DISPLAY_ORDER) {
      const count = march.tierBreakdown[tier]?.[type] || 0;
      if (count > 0) {
        list.push(`${count.toLocaleString()} x ${tier}`);
      }
    }
    return list.length > 0 ? list.join(', ') : t.none;
  };

  const marchTitle = isRallyLead
    ? t.marchTitleLead.replace('{n}', march.marchNumber.toString())
    : t.marchTitleJoiner.replace('{n}', march.marchNumber.toString());

  const handleCopy = () => {
    let copyText = `${marchTitle} (${march.total.toLocaleString()} ${t.troops})\n`;
    copyText += `${t.archers}: ${march.archers.toLocaleString()} (${formatTierBreakdown('archers')})\n`;
    copyText += `${t.cavalry}: ${march.cavalry.toLocaleString()} (${formatTierBreakdown('cavalry')})\n`;
    copyText += `${t.infantry}: ${march.infantry.toLocaleString()} (${formatTierBreakdown('infantry')})`;

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    onCopySuccess(t.copiedMarchToast.replace('{title}', marchTitle));
    setTimeout(() => setCopied(false), 2000);
  };

  const isFull = march.total >= march.capacity;

  return (
    <div
      className="rounded-2xl border transition-all space-y-3 p-3.5 sm:p-5"
      style={
        isRallyLead
          ? {
              background: 'linear-gradient(135deg, rgba(14,20,36,0.98) 0%, rgba(35,26,58,0.98) 50%, rgba(14,20,36,0.98) 100%)',
              borderColor: 'rgba(229,193,88,0.55)',
              boxShadow: '0 0 24px rgba(229,193,88,0.15)',
            }
          : {
              background: 'rgba(14,20,36,0.85)',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }
      }
    >
      {/* ── Top Header Bar (Responsive Stacked on Mobile) ───────────────── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b pb-3"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* March Badge: warm orange/amber gradient with high-contrast dark text */}
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-xs sm:text-sm border flex-shrink-0 font-mono shadow-md"
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #e5c158 100%)',
              borderColor: 'rgba(249,115,22,0.8)',
              color: '#090d16',
              boxShadow: '0 2px 10px rgba(249,115,22,0.35)',
            }}
          >
            #{march.marchNumber}
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-extrabold text-white text-xs sm:text-sm tracking-wide">
                {marchTitle}
              </span>

              {isRallyLead && (
                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border text-amber-400 bg-amber-500/10 border-amber-500/40">
                  <Crown className="w-2.5 h-2.5" />
                  {t.rallyLeadBadge}
                </span>
              )}
            </div>

            <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 sm:gap-2 flex-wrap font-mono">
              <span className="text-white font-semibold">{march.total.toLocaleString()} {t.troops.toLowerCase()}</span>
              <span>·</span>
              <span className={isFull ? 'text-slate-400' : 'text-amber-400 font-semibold'}>
                {t.cap}: {march.capacity.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Copy March Button (Desktop header position) */}
        <button
          onClick={handleCopy}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-bold border transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
          style={
            copied
              ? {
                  background: 'rgba(74,222,128,0.2)',
                  borderColor: 'rgba(74,222,128,0.4)',
                  color: '#4ade80',
                }
              : {
                  background: 'rgba(229,193,88,0.08)',
                  borderColor: 'rgba(229,193,88,0.3)',
                  color: '#e5c158',
                }
          }
          title="Copy march configuration"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? t.copied : t.copyMarch}</span>
        </button>
      </div>

      {/* ── Clean Troop Rows with Exact Counts & Tiers (NO PERCENTAGES) ─── */}
      <div className="space-y-2 text-xs">
        {/* Archers */}
        <div className="rounded-xl border p-2.5 sm:p-3 bg-amber-500/[0.06] border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <span>🏹</span>
            <span>{t.archers}:</span>
            <span className="font-mono text-sm text-amber-200">{march.archers.toLocaleString()}</span>
          </div>
          <div className="font-mono text-[11px] text-amber-200/80">
            {formatTierBreakdown('archers')}
          </div>
        </div>

        {/* Cavalry */}
        <div className="rounded-xl border p-2.5 sm:p-3 bg-blue-500/[0.04] border-blue-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-1.5 font-bold text-blue-300">
            <span>🐎</span>
            <span>{t.cavalry}:</span>
            <span className="font-mono text-sm text-blue-200">{march.cavalry.toLocaleString()}</span>
          </div>
          <div className="font-mono text-[11px] text-blue-200/80">
            {formatTierBreakdown('cavalry')}
          </div>
        </div>

        {/* Infantry */}
        <div className="rounded-xl border p-2.5 sm:p-3 bg-white/[0.02] border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-1.5 font-bold text-slate-300">
            <span>🛡️</span>
            <span>{t.infantry}:</span>
            <span className="font-mono text-sm text-slate-200">{march.infantry.toLocaleString()}</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            {formatTierBreakdown('infantry')}
          </div>
        </div>
      </div>

      {/* Mobile Touch-Friendly Full-Width Copy Button (Only on < sm) */}
      <button
        onClick={handleCopy}
        className="flex sm:hidden w-full items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold border transition-all active:scale-95 cursor-pointer shadow-sm"
        style={
          copied
            ? {
                background: 'rgba(74,222,128,0.25)',
                borderColor: 'rgba(74,222,128,0.5)',
                color: '#4ade80',
              }
            : {
                background: 'linear-gradient(135deg, rgba(229,193,88,0.15) 0%, rgba(249,115,22,0.15) 100%)',
                borderColor: 'rgba(229,193,88,0.4)',
                color: '#e5c158',
              }
        }
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? t.copied : `${t.copyMarch} #${march.marchNumber}`}</span>
      </button>
    </div>
  );
};
