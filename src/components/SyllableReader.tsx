import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, ArrowRight, Grid } from 'lucide-react';
import { Language } from '../types';
import { SYLLABLE_EXERCISES } from '../data/russianData';
import { speakRussian, playSuccessChime, playIncorrectGentle, playCoinSound } from '../utils/audio';

interface SyllableReaderProps {
  lang: Language;
  onReward: (stars: number, coins: number, xp: number) => void;
}

export const SyllableReader: React.FC<SyllableReaderProps> = ({ lang, onReward }) => {
  const [activeMode, setActiveMode] = useState<'builder' | 'table'>('builder');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assembledSyllables, setAssembledSyllables] = useState<string[]>([]);
  const [availableSyllables, setAvailableSyllables] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = SYLLABLE_EXERCISES[currentIndex];

  // Initialize scrambled syllables for current exercise
  React.useEffect(() => {
    if (currentExercise) {
      const shuffled = [...currentExercise.syllables].sort(() => 0.5 - Math.random());
      setAvailableSyllables(shuffled);
      setAssembledSyllables([]);
      setIsCompleted(false);
    }
  }, [currentIndex, currentExercise]);

  const handlePickSyllable = (syllable: string, idx: number) => {
    if (isCompleted) return;

    // Speak the single tapped syllable
    speakRussian(syllable, 0.9);

    const nextAssembled = [...assembledSyllables, syllable];
    const nextAvailable = [...availableSyllables];
    nextAvailable.splice(idx, 1);

    setAssembledSyllables(nextAssembled);
    setAvailableSyllables(nextAvailable);

    // Check if word is complete
    if (nextAssembled.length === currentExercise.syllables.length) {
      const assembledWord = nextAssembled.join('');
      if (assembledWord === currentExercise.word) {
        setIsCompleted(true);
        playSuccessChime();
        playCoinSound();
        onReward(1, 5, 15);

        setTimeout(() => {
          speakRussian(`${assembledWord}! Молодец!`, 0.85);
        }, 300);
      } else {
        playIncorrectGentle();
        setTimeout(() => {
          // Reset for another attempt
          setAvailableSyllables([...currentExercise.syllables].sort(() => 0.5 - Math.random()));
          setAssembledSyllables([]);
        }, 1000);
      }
    }
  };

  const handleResetWord = () => {
    setAvailableSyllables([...currentExercise.syllables].sort(() => 0.5 - Math.random()));
    setAssembledSyllables([]);
    setIsCompleted(false);
  };

  const handleNextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % SYLLABLE_EXERCISES.length);
  };

  // Syllable Matrix for table mode
  const consonants = ['М', 'С', 'Б', 'К', 'Л', 'Р', 'Т', 'П', 'Н', 'Д'];
  const vowels = ['А', 'О', 'У', 'Ы', 'И', 'Е', 'Я'];

  return (
    <div className="space-y-4">
      {/* Header and Mode Selector */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>📖</span>
            <span>{lang === 'uz' ? 'Boʻgʻinlar va Oʻqish Mashqi' : 'Слоги и чтение (1 класс)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'uz' 
              ? 'Soʻzlarni boʻgʻinlardan yigʻing va ravon oʻqishni mashq qiling' 
              : 'Собирай слова из слогов и тренируй быстрое чтение'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveMode('builder')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'builder' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{lang === 'uz' ? 'Soʻz yasash' : 'Собери слово'}</span>
          </button>
          <button
            onClick={() => setActiveMode('table')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'table' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-indigo-500" />
            <span>{lang === 'uz' ? 'Boʻgʻinlar jadvali' : 'Слоговая таблица'}</span>
          </button>
        </div>
      </div>

      {/* MODE 1: WORD BUILDER */}
      {activeMode === 'builder' && (
        <div className="bg-gradient-to-br from-indigo-50/60 via-white to-amber-50/60 border border-indigo-100 rounded-3xl p-5 sm:p-7 shadow-xs text-center space-y-6">
          
          {/* Progress / Word Index */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>
              {lang === 'uz' ? 'Mashq' : 'Слово'} {currentIndex + 1} / {SYLLABLE_EXERCISES.length}
            </span>
            <button
              onClick={() => speakRussian(currentExercise.word, 0.85)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold"
            >
              <Volume2 className="w-4 h-4" />
              <span>{lang === 'uz' ? 'Soʻzni eshitish' : 'Озвучить'}</span>
            </button>
          </div>

          {/* Central Target Card */}
          <div className="max-w-xs mx-auto bg-white rounded-3xl p-5 border-2 border-indigo-100 shadow-sm space-y-2">
            <div className="text-5xl">{currentExercise.emoji}</div>
            <div className="text-sm font-bold text-amber-800">
              {currentExercise.translationUz}
            </div>
            <div className="text-[11px] text-slate-400">
              {lang === 'uz' ? 'Boʻgʻinlarni toʻgʻri tartibda bosing' : 'Нажимай на слоги по порядку'}
            </div>
          </div>

          {/* Assembly Slots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 min-h-[68px]">
            {currentExercise.syllables.map((_, idx) => {
              const syllable = assembledSyllables[idx];
              return (
                <div
                  key={idx}
                  className={`w-20 sm:w-24 h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                    syllable
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'border-2 border-dashed border-indigo-200 bg-white/70 text-slate-300'
                  }`}
                >
                  {syllable || '?'}
                </div>
              );
            })}
          </div>

          {/* Available Syllable Options */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500">
              {lang === 'uz' ? 'Mavjud boʻgʻinlar:' : 'Выбери слог:'}
            </p>
            <div className="flex items-center justify-center gap-3">
              {availableSyllables.map((syl, idx) => (
                <button
                  key={`${syl}_${idx}`}
                  onClick={() => handlePickSyllable(syl, idx)}
                  className="px-5 sm:px-6 py-3.5 bg-white border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50 text-slate-900 rounded-2xl font-black text-xl sm:text-2xl shadow-sm transition-transform active:scale-95"
                >
                  {syl}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons / Success State */}
          <div className="pt-2 flex items-center justify-center gap-3">
            {isCompleted ? (
              <div className="flex flex-col items-center gap-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-base">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{lang === 'uz' ? 'Ajoyib! Soʻz toʻgʻri yigʻildi!' : 'Отлично! Слово прочитано!'} (+1 ⭐)</span>
                </div>
                <button
                  onClick={handleNextWord}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                >
                  <span>{lang === 'uz' ? 'Keyingi soʻz' : 'Следующее слово'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleResetWord}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? 'Qayta boshlash' : 'Сбросить'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: SYLLABLE TABLE (Слоговая таблица) */}
      {activeMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              {lang === 'uz' ? '1-Sinf Oʻqish Jadvali' : 'Слоговая таблица для первоклассников'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {lang === 'uz' ? 'Boʻgʻinni bosib eshiting' : 'Нажми на слог, чтобы услышать'}
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="p-2 border border-slate-200 bg-slate-100 text-xs font-bold text-slate-700">
                    {lang === 'uz' ? 'Harf' : 'Буква'}
                  </th>
                  {vowels.map((v) => (
                    <th key={v} className="p-2 border border-slate-200 bg-rose-50 text-xs font-extrabold text-rose-700">
                      {v}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consonants.map((c) => (
                  <tr key={c}>
                    <td className="p-2 border border-slate-200 bg-sky-50 font-black text-sky-800 text-sm">
                      {c}
                    </td>
                    {vowels.map((v) => {
                      const syllable = `${c}${v}`;
                      return (
                        <td key={v} className="p-1.5 border border-slate-200">
                          <button
                            onClick={() => {
                              speakRussian(syllable, 0.9);
                              playCoinSound();
                            }}
                            className="w-full py-2 px-1.5 bg-slate-50 hover:bg-amber-100 hover:border-amber-400 border border-transparent rounded-lg font-bold text-sm text-slate-800 transition-all active:scale-95"
                          >
                            {syllable}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
