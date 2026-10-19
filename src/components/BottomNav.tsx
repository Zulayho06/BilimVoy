import React from 'react';
import { BookOpen, Sparkles, Hash, Zap, Calculator, Heart, Layers } from 'lucide-react';
import { MainTab, Language } from '../types';

interface BottomNavProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, lang }) => {
  const tabs = [
    {
      id: 'alphabet' as MainTab,
      labelUz: 'Alifbo',
      labelRu: 'Азбука',
      icon: BookOpen,
      color: 'text-rose-500'
    },
    {
      id: 'syllables' as MainTab,
      labelUz: 'Boʻgʻinlar',
      labelRu: 'Слоги',
      icon: Layers,
      color: 'text-indigo-500'
    },
    {
      id: 'vocab' as MainTab,
      labelUz: 'Lugʻat',
      labelRu: 'Словарь',
      icon: Sparkles,
      color: 'text-amber-500'
    },
    {
      id: 'soroban' as MainTab,
      labelUz: 'Soroban',
      labelRu: 'Соробан',
      icon: Hash,
      color: 'text-teal-600'
    },
    {
      id: 'flash_anzan' as MainTab,
      labelUz: 'Flesh',
      labelRu: 'Флеш',
      icon: Zap,
      color: 'text-amber-500'
    },
    {
      id: 'math_formulas' as MainTab,
      labelUz: 'Misollar',
      labelRu: 'Примеры',
      icon: Calculator,
      color: 'text-emerald-500'
    },
    {
      id: 'pet' as MainTab,
      labelUz: 'Misha',
      labelRu: 'Миша',
      icon: Heart,
      color: 'text-pink-500'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg">
      <div className="max-w-4xl mx-auto px-2">
        <div className="grid grid-cols-7 items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all relative ${
                  isActive ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                {isActive && (
                  <span className="absolute top-1 w-6 h-1 bg-amber-500 rounded-full" />
                )}
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-115 text-amber-600' : 'text-slate-400'}`} />
                <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap truncate max-w-[52px]">
                  {lang === 'uz' ? tab.labelUz : tab.labelRu}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
