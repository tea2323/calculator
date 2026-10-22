import { X, Target, Swords, Zap } from 'lucide-react';
import { TIER_DATA, TIER_DISPLAY_ORDER } from '../data/tiers';
import { Translations } from '../data/translations';

interface KingshotGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

export const KingshotGuideModal: React.FC<KingshotGuideModalProps> = ({
  isOpen,
  onClose,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in">
      <div
        className="border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-6 shadow-2xl relative"
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #11182c 100%)',
          borderColor: 'rgba(229,193,88,0.3)',
          boxShadow: '0 0 50px rgba(0,0,0,0.8)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border flex items-center justify-center"
              style={{ background: 'rgba(229,193,88,0.12)', borderColor: 'rgba(229,193,88,0.35)', color: '#e5c158' }}
            >
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                {t.guideTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.guideSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          {/* Base stats table */}
          <div className="rounded-xl border p-4 space-y-3 bg-black/30 border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-cyan-300">
              <Target className="w-4 h-4" />
              <span>{t.baseStatsTitle}</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 bg-white/5">
                    <th className="py-2 px-2.5">{t.tierNameHeader}</th>
                    <th className="py-2 px-2.5 text-slate-300">{t.infantry}</th>
                    <th className="py-2 px-2.5 text-blue-300">{t.cavalry}</th>
                    <th className="py-2 px-2.5 text-amber-300">{t.archersDps}</th>
                    <th className="py-2 px-2.5 text-cyan-300">{t.archerRatioHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {TIER_DISPLAY_ORDER.map((tier) => {
                    const d = TIER_DATA[tier];
                    return (
                      <tr key={tier}>
                        <td className="py-2 px-2.5 font-bold text-white">
                          <span>{tier}</span> <span className="text-[10px] text-slate-400 font-normal">({d.fullName})</span>
                        </td>
                        <td className="py-2 px-2.5">{d.infantry}</td>
                        <td className="py-2 px-2.5 text-blue-300">{d.cavalry}</td>
                        <td className="py-2 px-2.5 text-amber-300 font-bold">{d.archers}</td>
                        <td className="py-2 px-2.5 text-cyan-400 font-bold">{d.archMult.toFixed(2)}x</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {t.baseStatsNote}
            </p>
          </div>

          {/* Allocation Rules */}
          <div className="rounded-xl border p-4 space-y-2.5 bg-black/30 border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-amber-400">
              <Swords className="w-4 h-4" />
              <span>{t.allocationRulesTitle}</span>
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold font-mono">1.</span>
                <span>
                  <strong className="text-white">{t.rule1Title}:</strong> {t.rule1Desc}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold font-mono">2.</span>
                <span>
                  <strong className="text-white">{t.rule2Title}:</strong> {t.rule2Desc}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold font-mono">3.</span>
                <span>
                  <strong className="text-white">{t.rule3Title}:</strong> {t.rule3Desc}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 flex justify-end border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold"
          >
            {t.closeGuide}
          </button>
        </div>
      </div>
    </div>
  );
};
