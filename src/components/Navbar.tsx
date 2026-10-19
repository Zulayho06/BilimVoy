import React from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Coins, Award } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  stars: number;
  coins: number;
  streak: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCertificate: () => void;
  onOpenParent: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  stars,
  coins,
  streak,
  soundEnabled,
  onToggleSound,
  onOpenCertificate,
  onOpenParent
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
            Б
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              BilimVoy
            </span>
            <span className="text-[10px] font-medium text-amber-700 leading-none">
              1-Sinf • Rus tili & Arifmetika
            </span>
          </div>
        </div>

        {/* Zone 2: Stats & Progress Indicators */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200/80 text-amber-800 text-xs font-semibold whitespace-nowrap shrink-0">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span className="tabular-nums">{streak}</span>
            <span className="hidden sm:inline">{lang === 'uz' ? 'kun' : 'дн.'}</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 rounded-lg border border-yellow-200/80 text-yellow-800 text-xs font-semibold whitespace-nowrap shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
            <span className="tabular-nums">{stars}</span>
            <span className="hidden sm:inline">{lang === 'uz' ? 'yulduz' : 'звёзд'}</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100/70 rounded-lg border border-amber-300 text-amber-900 text-xs font-bold whitespace-nowrap shrink-0">
            <Coins className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="tabular-nums">{coins}</span>
          </div>
        </div>

        {/* Zone 3: Actions (Sound, Diploma, Language, Parent) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Certificate / Diploma */}
          <button
            onClick={onOpenCertificate}
            title={lang === 'uz' ? 'Mening Faxriy Yorligʻim' : 'Моя Грамота'}
            className="p-2 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="hidden md:inline">{lang === 'uz' ? 'Yorliq' : 'Грамота'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Ovozni yoqish yoki o'chirish"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            {lang === 'uz' ? '🇺🇿 UZ' : '🇷🇺 RU'}
          </button>

          {/* Parent Zone Button */}
          <button
            onClick={onOpenParent}
            className="hidden sm:flex items-center px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            {lang === 'uz' ? 'Ota-onalar' : 'Родителям'}
          </button>
        </div>

      </div>
    </header>
  );
};
