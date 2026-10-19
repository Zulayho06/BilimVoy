import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, Award, Info } from 'lucide-react';
import { Language, SorobanColumnState } from '../types';
import { playBeadClick, playSuccessChime, playCoinSound, speakRussian, speakUzbek } from '../utils/audio';

interface SorobanInteractiveProps {
  lang: Language;
  onReward: (stars: number, coins: number, xp: number) => void;
  onTargetCompleted?: () => void;
}

export const SorobanInteractive: React.FC<SorobanInteractiveProps> = ({
  lang,
  onReward,
  onTargetCompleted
}) => {
  // 3 columns: [Hundreds (x100), Tens (x10), Ones (x1)]
  const [columns, setColumns] = useState<SorobanColumnState[]>([
    { upperActive: false, lowerCount: 0 }, // Hundreds
    { upperActive: false, lowerCount: 0 }, // Tens
    { upperActive: false, lowerCount: 0 }  // Ones
  ]);

  // Challenge Mode State
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [targetNumber, setTargetNumber] = useState<number>(7);
  const [challengesSolved, setChallengesSolved] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate current number on Soroban
  const hundreds = (columns[0].upperActive ? 5 : 0) + columns[0].lowerCount;
  const tens = (columns[1].upperActive ? 5 : 0) + columns[1].lowerCount;
  const ones = (columns[2].upperActive ? 5 : 0) + columns[2].lowerCount;
  const totalValue = hundreds * 100 + tens * 10 + ones;

  // Toggle upper bead (Heaven bead = 5)
  const handleToggleUpper = (colIdx: number) => {
    playBeadClick();
    const next = [...columns];
    next[colIdx] = {
      ...next[colIdx],
      upperActive: !next[colIdx].upperActive
    };
    setColumns(next);
    checkChallenge(next);
  };

  // Adjust lower beads (Earth beads = 1 each, 0 to 4)
  const handleSetLower = (colIdx: number, count: number) => {
    playBeadClick();
    const next = [...columns];
    // If clicking same active count, decrease by 1 or toggle
    const current = next[colIdx].lowerCount;
    const newCount = current === count ? count - 1 : count;
    next[colIdx] = {
      ...next[colIdx],
      lowerCount: Math.max(0, Math.min(4, newCount))
    };
    setColumns(next);
    checkChallenge(next);
  };

  // Reset Soroban to 0
  const handleReset = () => {
    playBeadClick();
    setColumns([
      { upperActive: false, lowerCount: 0 },
      { upperActive: false, lowerCount: 0 },
      { upperActive: false, lowerCount: 0 }
    ]);
  };

  // Check if target reached in challenge mode
  const checkChallenge = (currentCols: SorobanColumnState[]) => {
    if (!isChallengeMode) return;

    const h = (currentCols[0].upperActive ? 5 : 0) + currentCols[0].lowerCount;
    const t = (currentCols[1].upperActive ? 5 : 0) + currentCols[1].lowerCount;
    const o = (currentCols[2].upperActive ? 5 : 0) + currentCols[2].lowerCount;
    const currentVal = h * 100 + t * 10 + o;

    if (currentVal === targetNumber) {
      setShowCelebration(true);
      playSuccessChime();
      playCoinSound();
      setChallengesSolved(prev => prev + 1);
      onReward(1, 10, 20);
      onTargetCompleted?.();

      setTimeout(() => {
        // Pick new 1st grade challenge (1-50)
        const nextTarget = Math.floor(Math.random() * 25) + 1;
        setTargetNumber(nextTarget);
        setShowCelebration(false);
        handleReset();
      }, 1600);
    }
  };

  const handleSpeakNumber = () => {
    if (lang === 'uz') {
      speakUzbek(`${totalValue}`);
    } else {
      speakRussian(`${totalValue}`, 0.85);
    }
  };

  const startChallenge = () => {
    setIsChallengeMode(true);
    setChallengesSolved(0);
    const newTarget = Math.floor(Math.random() * 15) + 1;
    setTargetNumber(newTarget);
    handleReset();
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🧮</span>
            <span>{lang === 'uz' ? 'Interaktiv Soroban (Abakus)' : 'Интерактивный Соробан'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'uz' 
              ? 'Yuqori tosh = 5, pastki toshlar = 1 har biri. Toshlarni oʻrtadagi toʻsiqqa suring!' 
              : 'Верхняя косточка = 5, нижние = по 1. Двигай косточки к планке!'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isChallengeMode ? (
            <button
              onClick={startChallenge}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'uz' ? 'Vazifa: Sonni hosil qil!' : 'Задание: Набери число!'}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsChallengeMode(false)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              {lang === 'uz' ? 'Erkin hisoblash' : 'Свободный счёт'}
            </button>
          )}
        </div>
      </div>

      {/* CHALLENGE BANNER */}
      {isChallengeMode && (
        <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border-2 border-teal-200 rounded-2xl p-4 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-teal-800">
            <span>{lang === 'uz' ? 'Topshiriq' : 'Задание первоклассника'}</span>
            <div className="flex items-center gap-1 font-bold text-amber-700">
              <Award className="w-4 h-4" />
              <span>{challengesSolved} {lang === 'uz' ? 'yechildi' : 'решено'}</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'uz' ? `Sorobanda ${targetNumber} sonini hosil qiling!` : `Набери на соробане число ${targetNumber}!`}
          </div>
          {showCelebration && (
            <div className="text-sm font-extrabold text-emerald-600 flex items-center justify-center gap-1.5 animate-bounce pt-1">
              <CheckCircle2 className="w-5 h-5" />
              <span>{lang === 'uz' ? 'Qoyilmaqom! Toʻgʻri terdingiz!' : 'Превосходно! Точно в цель!'} (+1 ⭐, +10 🪙)</span>
            </div>
          )}
        </div>
      )}

      {/* THE INTERACTIVE SOROBAN FRAME */}
      <div className="bg-amber-950/90 rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-amber-900 max-w-xl mx-auto select-none">
        
        {/* Real-time value display */}
        <div className="bg-amber-900/60 rounded-2xl p-3 mb-4 flex items-center justify-between border border-amber-700/60 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-300 font-medium">
              {lang === 'uz' ? 'Qiymat:' : 'Значение:'}
            </span>
            <span className="text-3xl font-black tabular-nums tracking-wider text-amber-200">
              {totalValue}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakNumber}
              className="p-2 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Ovozli aytish"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'uz' ? 'Aytish' : 'Озвучить'}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
              title="Tozalash"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'uz' ? 'Tozalash' : 'Сброс'}</span>
            </button>
          </div>
        </div>

        {/* Column Headers (Hundreds, Tens, Ones) */}
        <div className="grid grid-cols-3 gap-4 mb-2 text-center text-xs font-bold text-amber-300/90">
          <div>
            <div>{lang === 'uz' ? 'Yuzliklar' : 'Сотни'}</div>
            <div className="text-sm font-extrabold text-white tabular-nums">{hundreds}</div>
          </div>
          <div>
            <div>{lang === 'uz' ? 'Oʻnliklar' : 'Десятки'}</div>
            <div className="text-sm font-extrabold text-white tabular-nums">{tens}</div>
          </div>
          <div>
            <div className="text-amber-200 font-black">{lang === 'uz' ? 'Birliklar (1lar)' : 'Единицы'}</div>
            <div className="text-sm font-extrabold text-amber-200 tabular-nums">{ones}</div>
          </div>
        </div>

        {/* Soroban Structure: Upper Deck | Central Beam | Lower Deck */}
        <div className="bg-amber-900/40 rounded-2xl p-4 border border-amber-800/80">
          
          {/* UPPER DECK (Heaven beads = 5) */}
          <div className="grid grid-cols-3 gap-4 h-24 relative">
            {[0, 1, 2].map((colIdx) => {
              const active = columns[colIdx].upperActive;
              return (
                <div key={`col_upper_${colIdx}`} className="flex flex-col items-center justify-between relative">
                  {/* Metal Rod */}
                  <div className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-400 rounded-full z-0" />

                  {/* 5-Bead */}
                  <div
                    onClick={() => handleToggleUpper(colIdx)}
                    className={`relative z-10 w-16 sm:w-20 h-10 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center font-bold text-xs shadow-md border-2 ${
                      active
                        ? 'translate-y-12 bg-gradient-to-b from-amber-400 to-amber-600 border-amber-200 text-amber-950 scale-105'
                        : 'translate-y-0 bg-gradient-to-b from-amber-600 to-amber-800 border-amber-950 text-amber-200/80 hover:brightness-110'
                    }`}
                  >
                    <span>5</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTRAL BEAM (Перекладина) with white dot markers */}
          <div className="h-4 bg-slate-900 rounded-sm my-2 flex items-center justify-around border-y border-amber-700/50 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            {/* Unit dot marker on Ones column */}
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" title="Birliklar nuqtasi" />
          </div>

          {/* LOWER DECK (Earth beads = 1 to 4) */}
          <div className="grid grid-cols-3 gap-4 h-56 relative pt-2">
            {[0, 1, 2].map((colIdx) => {
              const lowerCount = columns[colIdx].lowerCount;
              return (
                <div key={`col_lower_${colIdx}`} className="flex flex-col items-center justify-between relative">
                  {/* Metal Rod */}
                  <div className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-400 rounded-full z-0" />

                  {/* 4 Earth Beads */}
                  <div className="flex flex-col gap-1.5 z-10 w-full items-center">
                    {[1, 2, 3, 4].map((beadIndex) => {
                      const isActive = beadIndex <= lowerCount;
                      return (
                        <div
                          key={beadIndex}
                          onClick={() => handleSetLower(colIdx, beadIndex)}
                          className={`w-16 sm:w-20 h-9 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center font-bold text-xs shadow-md border-2 ${
                            isActive
                              ? '-translate-y-1 bg-gradient-to-b from-orange-400 to-amber-500 border-amber-200 text-amber-950'
                              : 'translate-y-5 bg-gradient-to-b from-amber-700 to-amber-900 border-amber-950 text-amber-300/70 hover:brightness-110'
                          }`}
                        >
                          <span>1</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Soroban Quick Tips for 1st Grader */}
        <div className="mt-4 bg-amber-900/60 rounded-xl p-3 text-amber-200 text-xs flex items-start gap-2 border border-amber-800">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">
              {lang === 'uz' ? 'Qanday hisoblanadi?' : 'Как считать?'}
            </span>{' '}
            {lang === 'uz'
              ? 'Toshni toʻsiqqa (oʻrtaga) yaqinlashtirsangiz, u qoʻshiladi. Masalan: 5 toshini tushiring va 2 ta pastki toshni koʻtaring = 7 boʻladi!'
              : 'Косточки, прижатые к перекладине в центре, идут в счёт. Например: опусти 5 и подними 2 косточки снизу = получится 7!'}
          </div>
        </div>

      </div>
    </div>
  );
};
