import React from 'react';
import { BookOpen } from 'lucide-react';
import { Language, Translations } from '../data/translations';

interface HeaderProps {
  onOpenGuide: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: Translations;
}

const LANGUAGES: Array<{ code: Language; label: string; flag: string }> = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenGuide,
  language,
  onLanguageChange,
  t,
}) => {
  return (
    <header
      className="relative overflow-hidden rounded-2xl border p-4 sm:p-6 shadow-2xl transition-all"
      style={{
        background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.95) 0%, rgba(14, 20, 36, 0.92) 50%, rgba(9, 13, 22, 0.98) 100%)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute -top-24 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(229,193,88,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(88,101,242,0.18) 0%, transparent 70%)' }}
      />

      {/* Subtle top edge specular highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(229,193,88,0.45) 30%, rgba(255,255,255,0.2) 50%, rgba(88,101,242,0.45) 70%, transparent)',
        }}
      />

      {/* Main Header Container */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Row 1: Brand (Left) + Desktop Toolbar / Mobile Flag Switcher */}
        <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          {/* Brand & Typography (Left Side) */}
          <div className="space-y-1.5 min-w-0">
            {/* Brand Badge: Small, dark glass pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-inner">
              <span className="text-xs leading-none">☕</span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-amber-400/90 font-mono">
                TEA #2323
              </span>
              
            </div>

            {/* Main Title: Crisp Two-Tone (TEA Kingshot in Amber/Gold, Calculator in Pure White) */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-baseline gap-2 flex-wrap">
              <span
                className="text-amber-400 drop-shadow-[0_2px_12px_rgba(229,193,88,0.35)]"
                style={{ color: '#e5c158' }}
              >
                TEA 
              </span>
              <span className="text-white drop-shadow-sm font-bold">
                Calculator
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-400 leading-snug max-w-xl">
              {t.appSubtitle}
            </p>
          </div>

          {/* Desktop Action Controls Toolbar (Hidden on mobile < 640px, visible on sm+) */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 flex-shrink-0 self-center">
            {/* A. Flag Language Selector (EN / ES / PT) */}
            <div className="flex items-center h-10 p-1 rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-md shadow-inner">
              {LANGUAGES.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`h-full flex items-center gap-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                    }`}
                    title={lang.label}
                  >
                    <span className="text-sm leading-none">{lang.flag}</span>
                    <span className="font-mono tracking-wider">{lang.label}</span>
                  </button>
                );
              })}
            </div>

            {/* B. Discord Button */}
            <a
              href="https://discord.gg/PCfHwEePq"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-xl border border-indigo-500/40 bg-indigo-600/20 hover:bg-indigo-600/35 text-indigo-200 hover:text-white flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-lg hover:shadow-indigo-500/20 group backdrop-blur-md"
              title="Join TEA Discord Community"
            >
              <svg
                className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200"
                viewBox="0 0 127.14 96.36"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>Discord</span>
            </a>

            {/* C. Formulas & Guide Button */}
            <button
              onClick={onOpenGuide}
              className="h-10 px-4 rounded-xl border border-slate-700/50 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 hover:text-white flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 cursor-pointer backdrop-blur-md shadow-md"
              title="Open Combat Formulas Guide"
            >
              <BookOpen className="w-4 h-4 text-slate-300" />
              <span>Guide</span>
            </button>
          </div>

          {/* Mobile Top Row Language Selector (Visible on < 640px) */}
          <div className="flex sm:hidden items-center self-start h-9 p-0.5 rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-md shadow-inner">
            {LANGUAGES.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`h-full flex items-center gap-1 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                  title={lang.label}
                >
                  <span className="text-xs leading-none">{lang.flag}</span>
                  <span className="font-mono">{lang.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Row 2: Equal-Width Action Buttons (Visible only on < 640px) */}
        <div className="grid grid-cols-2 gap-2 sm:hidden pt-1">
          {/* Mobile Discord Button */}
          <a
            href="https://discord.gg/PCfHwEePq"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl border border-indigo-500/40 bg-indigo-600/20 hover:bg-indigo-600/35 text-indigo-200 active:scale-95 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer backdrop-blur-md shadow-md"
          >
            <svg
              className="w-4 h-4 fill-current flex-shrink-0"
              viewBox="0 0 127.14 96.36"
            >
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            <span className="truncate">Discord</span>
          </a>

          {/* Mobile Guide Button */}
          <button
            onClick={onOpenGuide}
            className="h-10 px-3 rounded-xl border border-slate-700/50 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 active:scale-95 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer backdrop-blur-md shadow-md"
          >
            <BookOpen className="w-4 h-4 text-slate-300 flex-shrink-0" />
            <span className="truncate">Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};

