import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { QuickPresets } from './components/QuickPresets';
import { TroopInputCard } from './components/TroopInputCard';
import { ResultsDashboard } from './components/ResultsDashboard';
import { KingshotGuideModal } from './components/KingshotGuideModal';
import { MultiTierTroops, RatioPreset, TroopCounts } from './types';
import { calculateKingshotBearTrapSplits } from './utils/calculator';
import { RATIO_PRESETS } from './data/presets';
import { Language, TRANSLATIONS } from './data/translations';

const DEFAULT_TROOPS_BY_TIER: MultiTierTroops = {
  T9: { infantry: 50000, cavalry: 50000, archers: 100000 },
  T10: { infantry: 150000, cavalry: 250000, archers: 400000 },
  'T10-TG1': { infantry: 0, cavalry: 0, archers: 0 },
  'T10-TG2': { infantry: 0, cavalry: 0, archers: 0 },
  'T10-TG3': { infantry: 0, cavalry: 0, archers: 0 },
};

function loadPersisted<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [troopsByTier, setTroopsByTier] = useState<MultiTierTroops>(() =>
    loadPersisted('tea_multi_tier_troops_tg3', DEFAULT_TROOPS_BY_TIER)
  );

  const [numMarches, setNumMarches] = useState<number>(() =>
    loadPersisted('tea_numMarches_7', 5)
  );

  const [isLeadingRally, setIsLeadingRally] = useState<boolean>(() =>
    loadPersisted('tea_isLeadingRally', true)
  );

  const [rallyCapacity, setRallyCapacity] = useState<number>(() =>
    loadPersisted('tea_rallyCapacity', 125000)
  );

  const [joinerCapacity, setJoinerCapacity] = useState<number>(() =>
    loadPersisted('tea_joinerCapacity', 60000)
  );

  const [activePresetId, setActivePresetId] = useState<string | null>(() =>
    loadPersisted('tea_activePresetId', 'bear-trap')
  );

  const [targetRatio, setTargetRatio] = useState<TroopCounts>(() =>
    loadPersisted('tea_targetRatio', { infantry: 10, cavalry: 10, archers: 80 })
  );

  const [customRatio, setCustomRatio] = useState<TroopCounts>(() =>
    loadPersisted('tea_customRatio', { infantry: 33, cavalry: 33, archers: 34 })
  );

  const [customRallyRatioEnabled, setCustomRallyRatioEnabled] = useState<boolean>(() =>
    loadPersisted('tea_customRallyRatioEnabled', false)
  );

  const [customRallyRatio, setCustomRallyRatio] = useState<TroopCounts>(() =>
    loadPersisted('tea_customRallyRatio', { infantry: 10, cavalry: 10, archers: 80 })
  );

  const [language, setLanguage] = useState<Language>(() =>
    loadPersisted('tea_language_v1', 'en')
  );

  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.en, [language]);

  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tea_multi_tier_troops_tg3', JSON.stringify(troopsByTier));
      localStorage.setItem('tea_numMarches_7', JSON.stringify(numMarches));
      localStorage.setItem('tea_isLeadingRally', JSON.stringify(isLeadingRally));
      localStorage.setItem('tea_rallyCapacity', JSON.stringify(rallyCapacity));
      localStorage.setItem('tea_joinerCapacity', JSON.stringify(joinerCapacity));
      localStorage.setItem('tea_activePresetId', JSON.stringify(activePresetId));
      localStorage.setItem('tea_targetRatio', JSON.stringify(targetRatio));
      localStorage.setItem('tea_customRatio', JSON.stringify(customRatio));
      localStorage.setItem('tea_customRallyRatioEnabled', JSON.stringify(customRallyRatioEnabled));
      localStorage.setItem('tea_customRallyRatio', JSON.stringify(customRallyRatio));
      localStorage.setItem('tea_language_v1', JSON.stringify(language));
    } catch {
      // sandboxed
    }
  }, [
    troopsByTier,
    numMarches,
    isLeadingRally,
    rallyCapacity,
    joinerCapacity,
    activePresetId,
    targetRatio,
    customRatio,
    customRallyRatioEnabled,
    customRallyRatio,
    language,
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((prev) => (prev === msg ? null : prev)), 2800);
  };

  const handleSelectPreset = (preset: RatioPreset) => {
    setActivePresetId(preset.id);
    if (preset.id === 'custom') {
      setTargetRatio(customRatio);
    } else {
      setTargetRatio({
        infantry: preset.infantryPct,
        cavalry: preset.cavalryPct,
        archers: preset.archersPct,
      });
      const name =
        preset.id === 'attack'
          ? t.presetAttack
          : preset.id === 'garrison'
          ? t.presetGarrison
          : preset.id === 'bear-trap'
          ? t.presetBearTrap
          : preset.name;
      showToast(t.presetAppliedToast.replace('{name}', `${name} (${preset.shortLabel})`));
    }
  };

  const handleCustomRatioChange = (ratio: TroopCounts) => {
    setCustomRatio(ratio);
    if (activePresetId === 'custom') {
      setTargetRatio(ratio);
    }
  };

  const handleOptimizeRallyLead = (recommendedCap: number) => {
    setRallyCapacity(recommendedCap);
    showToast(t.optimizedToast.replace('{cap}', recommendedCap.toLocaleString()));
  };

  const handleOneTroopRally = () => {
    setRallyCapacity(1);
    showToast(t.oneTroopToast);
  };

  const calculationResults = useMemo(() => {
    return calculateKingshotBearTrapSplits({
      availableTroopsByTier: troopsByTier,
      numMarches,
      isLeadingRally,
      rallyCapacity,
      joinerCapacity,
      targetRatio,
      customRallyRatio: customRallyRatioEnabled ? customRallyRatio : null,
    });
  }, [
    troopsByTier,
    numMarches,
    isLeadingRally,
    rallyCapacity,
    joinerCapacity,
    targetRatio,
    customRallyRatioEnabled,
    customRallyRatio,
  ]);

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200"
      style={{ background: '#090d16' }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(229,193,88,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 85% 85%, rgba(0,242,254,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Main container: padding optimized for mobile (px-3 py-4 on mobile, px-6 py-7 on sm+) */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-7 space-y-3.5 sm:space-y-5">
        {/* 1. Header */}
        <Header
          onOpenGuide={() => setGuideModalOpen(true)}
          language={language}
          onLanguageChange={setLanguage}
          t={t}
        />

        {/* 2. Preset Formations */}
        <QuickPresets
          activePresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
          customRatio={customRatio}
          onCustomRatioChange={handleCustomRatioChange}
          t={t}
        />

        {/* 3. Mobile-Optimized Troop Inputs & Marches (1 to 7) */}
        <TroopInputCard
          troopsByTier={troopsByTier}
          onChangeTroopsByTier={setTroopsByTier}
          numMarches={numMarches}
          onChangeNumMarches={setNumMarches}
          isLeadingRally={isLeadingRally}
          onChangeIsLeadingRally={setIsLeadingRally}
          rallyCapacity={rallyCapacity}
          onChangeRallyCapacity={setRallyCapacity}
          joinerCapacity={joinerCapacity}
          onChangeJoinerCapacity={setJoinerCapacity}
          customRallyRatioEnabled={customRallyRatioEnabled}
          onToggleCustomRallyRatio={setCustomRallyRatioEnabled}
          customRallyRatio={customRallyRatio}
          onChangeCustomRallyRatio={setCustomRallyRatio}
          t={t}
        />

        {/* 4. Output Dashboard with Clean March Output Cards */}
        <ResultsDashboard
          results={calculationResults}
          onCopySuccess={showToast}
          onOptimizeRallyLead={handleOptimizeRallyLead}
          onOneTroopRally={handleOneTroopRally}
          t={t}
        />
      </main>

      {/* Mobile-Friendly Footer */}
      <footer
        className="relative z-10 w-full border-t py-4 sm:py-5 text-center text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(9,13,22,0.95)' }}
      >
        <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-base">☕</span>
            <span className="font-bold text-amber-400">TEA Calculator</span>
            <span>·</span>
            <span>Kingshot Troop Split Tool</span>
          </div>
          <a
            href="https://discord.gg/PCfHwEePq"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TEA Alliance Discord"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-slate-900/60 text-slate-400 hover:text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-slate-900/90 transition-all active:scale-95 cursor-pointer backdrop-blur-md shadow-sm"
            title="Join TEA Discord"
          >
            <svg
              className="w-4 h-4 fill-current transition-transform duration-200"
              viewBox="0 0 127.14 96.36"
            >
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Guide Modal with Detailed Theorycrafting */}
      <KingshotGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        t={t}
      />

      {/* Redesigned Toast Notification: Deep obsidian glassmorphism style */}
      {toastMessage && (
        <div
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 px-4 py-3 rounded-xl font-bold text-xs shadow-2xl flex items-center justify-center sm:justify-start gap-2.5 border backdrop-blur-md animate-in"
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            borderColor: 'rgba(229, 193, 88, 0.35)',
            color: '#f8fafc',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(229, 193, 88, 0.15)',
          }}
        >
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-extrabold"
            style={{
              background: 'rgba(229, 193, 88, 0.15)',
              border: '1px solid rgba(229, 193, 88, 0.45)',
              color: '#e5c158',
              boxShadow: '0 0 8px rgba(229, 193, 88, 0.3)',
            }}
          >
            ✓
          </span>
          <span className="tracking-wide text-slate-100 font-sans font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
