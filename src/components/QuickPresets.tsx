import React from 'react';
import { RATIO_PRESETS } from '../data/presets';
import { RatioPreset, TroopCounts } from '../types';
import { Settings2, Zap } from 'lucide-react';
import { Translations } from '../data/translations';

interface QuickPresetsProps {
  activePresetId: string | null;
  onSelectPreset: (preset: RatioPreset) => void;
  customRatio: TroopCounts;
  onCustomRatioChange: (ratio: TroopCounts) => void;
  t: Translations;
}

const PRESET_STYLES: Record<
  string,
  {
    borderActive: string;
    bgActive: string;
    textActive: string;
    glow: string;
  }
> = {
  attack: {
    borderActive: 'rgba(239, 68, 68, 0.6)',
    bgActive: 'rgba(239, 68, 68, 0.15)',
    textActive: '#fca5a5',
    glow: 'rgba(239, 68, 68, 0.25)',
  },
  garrison: {
    borderActive: 'rgba(59, 130, 246, 0.6)',
    bgActive: 'rgba(59, 130, 246, 0.15)',
    textActive: '#93c5fd',
    glow: 'rgba(59, 130, 246, 0.25)',
  },
  'bear-trap': {
    borderActive: 'rgba(229, 193, 88, 0.6)',
    bgActive: 'rgba(229, 193, 88, 0.15)',
    textActive: '#fde68a',
    glow: 'rgba(229, 193, 88, 0.25)',
  },
  custom: {
    borderActive: 'rgba(0, 242, 254, 0.6)',
    bgActive: 'rgba(0, 242, 254, 0.15)',
    textActive: '#a5f3fc',
    glow: 'rgba(0, 242, 254, 0.25)',
  },
};

export const QuickPresets: React.FC<QuickPresetsProps> = ({
  activePresetId,
  onSelectPreset,
  customRatio,
  onCustomRatioChange,
  t,
}) => {
  const isCustom = activePresetId === 'custom';
  const customSum = customRatio.infantry + customRatio.cavalry + customRatio.archers;
  const customValid = customSum === 100;

  const parseUnrestrictedInt = (val: string): number => {
    if (val === '') return 0;
    const clean = val.replace(/[^0-9]/g, '');
    if (!clean) return 0;
    const num = parseInt(clean, 10);
    return isNaN(num) ? 0 : num;
  };

  const handleCustomField = (field: keyof TroopCounts, val: string) => {
    const n = parseUnrestrictedInt(val);
    onCustomRatioChange({ ...customRatio, [field]: n });
  };

  const getPresetName = (id: string, defaultName: string) => {
    switch (id) {
      case 'attack':
        return t.presetAttack;
      case 'garrison':
        return t.presetGarrison;
      case 'bear-trap':
        return t.presetBearTrap;
      case 'custom':
        return t.presetCustom;
      default:
        return defaultName;
    }
  };

  const getPresetDesc = (id: string, defaultDesc: string) => {
    switch (id) {
      case 'attack':
        return t.presetAttackDesc;
      case 'garrison':
        return t.presetGarrisonDesc;
      case 'bear-trap':
        return t.presetBearTrapDesc;
      case 'custom':
        return t.presetCustomDesc;
      default:
        return defaultDesc;
    }
  };

  return (
    <div
      className="rounded-2xl border p-3.5 sm:p-6 space-y-3 sm:space-y-4"
      style={{
        background: 'linear-gradient(135deg, #0e1424 0%, #11182c 100%)',
        borderColor: 'rgba(229,193,88,0.2)',
      }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
        <div
          className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg border"
          style={{
            background: 'rgba(229,193,88,0.12)',
            borderColor: 'rgba(229,193,88,0.3)',
          }}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300">
          {t.presetsTitle}
        </span>
      </div>

      {/* Preset Buttons: Grid of 2x2 on mobile, flex row on sm+ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5">
        {RATIO_PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;
          const s = PRESET_STYLES[preset.id] || PRESET_STYLES.custom;
          const translatedName = getPresetName(preset.id, preset.name);
          const translatedDesc = getPresetDesc(preset.id, preset.description);

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              title={translatedDesc}
              className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[44px] rounded-xl border text-xs font-semibold transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              style={
                isActive
                  ? {
                      background: s.bgActive,
                      borderColor: s.borderActive,
                      color: s.textActive,
                      boxShadow: `0 0 16px ${s.glow}`,
                    }
                  : {
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.08)',
                      color: 'rgba(203,213,225,0.7)',
                    }
              }
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base leading-none">{preset.icon}</span>
                <span className="font-bold">{translatedName}</span>
              </div>
              {preset.id !== 'custom' && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold"
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    color: isActive ? s.textActive : 'rgba(148,163,184,0.7)',
                  }}
                >
                  {preset.shortLabel}
                </span>
              )}
              {isActive && preset.id !== 'custom' && (
                <span className="text-[10px] font-bold">✓</span>
              )}
              {preset.id === 'custom' && isActive && (
                <Settings2 className="w-3.5 h-3.5 opacity-80" />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Percentage Inline Inputs */}
      {isCustom && (
        <div
          className="mt-1 p-3 sm:p-4 rounded-xl border space-y-3 animate-in"
          style={{ background: 'rgba(0,0,0,0.35)', borderColor: 'rgba(0,242,254,0.3)' }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] sm:text-xs font-semibold text-cyan-300">
              {t.customRatioTitle}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                customValid
                  ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                  : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
              }`}
            >
              {t.customRatioTotal.replace('{sum}', customSum.toString())}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { field: 'infantry' as keyof TroopCounts, emoji: '🛡', label: t.infantry, color: '#94a3b8' },
              { field: 'cavalry' as keyof TroopCounts, emoji: '🐎', label: t.cavalry, color: '#93c5fd' },
              { field: 'archers' as keyof TroopCounts, emoji: '🏹', label: t.archers, color: '#e5c158' },
            ].map(({ field, emoji, label, color }) => (
              <div key={field} className="space-y-1">
                <label className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold" style={{ color }}>
                  <span>{emoji}</span>
                  <span className="truncate">{label}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={customRatio[field] === 0 ? '' : customRatio[field]}
                    onChange={(e) => handleCustomField(field, e.target.value)}
                    className="w-full min-h-[44px] rounded-lg px-2.5 py-1.5 pr-6 text-xs font-mono font-bold bg-black/40 border border-slate-700 focus:border-cyan-400 outline-none transition-colors"
                    style={{ color }}
                    placeholder="0"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">%</span>
                </div>
              </div>
            ))}
          </div>

          {!customValid && (
            <p className="text-[10px] sm:text-[11px] font-mono text-amber-300/80">
              ℹ {t.customRatioNote.replace('{sum}', customSum.toString())}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
