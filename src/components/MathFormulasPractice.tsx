import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, RotateCcw, Award, Sparkles, BookOpen, Calculator } from 'lucide-react';
import { Language, MathProblem } from '../types';
import { SMALL_FRIENDS_FORMULAS, MATH_EXERCISES_DATA } from '../data/mentalMathData';
import { playSuccessChime, playIncorrectGentle, playCoinSound } from '../utils/audio';

interface MathFormulasPracticeProps {
  lang: Language;
  onReward: (stars: number, coins: number, xp: number) => void;
  onProblemSolved?: () => void;
}

export const MathFormulasPractice: React.FC<MathFormulasPracticeProps> = ({
  lang,
  onReward,
  onProblemSolved
}) => {
  const [activeTab, setActiveTab] = useState<'practice' | 'formulas'>('practice');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'simple' | 'small_friends' | 'big_friends'>('all');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [solvedCount, setSolvedCount] = useState<number>(0);

  const filteredProblems = MATH_EXERCISES_DATA.filter((p) => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const currentProblem: MathProblem = filteredProblems[currentProblemIndex % filteredProblems.length] || filteredProblems[0];

  const handleKeypad = (val: string) => {
    if (val === 'DEL') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (val === 'ENTER') {
      handleSubmit();
    } else {
      if (userAnswer.length < 3) {
        setUserAnswer(prev => prev + val);
      }
    }
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const parsed = parseInt(userAnswer, 10);
    if (parsed === currentProblem.answer) {
      setFeedback('correct');
      playSuccessChime();
      playCoinSound();
      setSolvedCount(prev => prev + 1);
      onReward(1, 10, 15);
      onProblemSolved?.();

      setTimeout(() => {
        setFeedback(null);
        setUserAnswer('');
        setShowHint(false);
        setCurrentProblemIndex(prev => prev + 1);
      }, 1300);
    } else {
      setFeedback('wrong');
      playIncorrectGentle();
      setShowHint(true);
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and top tab controls */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🧮</span>
            <span>{lang === 'uz' ? 'Mental Arifmetika Misollari' : 'Тренажёр примеров и формул'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'uz' 
              ? 'Oddiy hisoblash, Kichik doʻstlar (+5) va Katta doʻstlar (+10) formulalari' 
              : 'Простой счёт, формулы младших (+5) и старших (+10) товарищей'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('practice')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'practice' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'uz' ? 'Misollar yechish' : 'Решать примеры'}</span>
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'formulas' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'uz' ? 'Formulalar daftari' : 'Справочник формул'}</span>
          </button>
        </div>
      </div>

      {/* PRACTICE MODE */}
      {activeTab === 'practice' && currentProblem && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', uz: 'Barcha misollar', ru: 'Все примеры' },
              { id: 'simple', uz: 'Oddiy hisob (1-bosqich)', ru: 'Простой счёт' },
              { id: 'small_friends', uz: 'Kichik doʻstlar (+5)', ru: 'Младшие (+5)' },
              { id: 'big_friends', uz: 'Katta doʻstlar (+10)', ru: 'Старшие (+10)' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoryFilter(cat.id as typeof categoryFilter);
                  setCurrentProblemIndex(0);
                  setUserAnswer('');
                  setShowHint(false);
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {lang === 'uz' ? cat.uz : cat.ru}
              </button>
            ))}
          </div>

          {/* Interactive Problem Card */}
          <div className="bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/60 border-2 border-emerald-200/90 rounded-3xl p-5 sm:p-7 shadow-xs text-center space-y-5 max-w-lg mx-auto">
            
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                {currentProblem.category === 'simple' && (lang === 'uz' ? 'Oddiy hisob' : 'Простой счёт')}
                {currentProblem.category === 'small_friends' && (lang === 'uz' ? 'Kichik doʻstlar' : 'Младшие товарищи')}
                {currentProblem.category === 'big_friends' && (lang === 'uz' ? 'Katta doʻstlar' : 'Старшие товарищи')}
              </span>
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Award className="w-4 h-4" />
                <span>{solvedCount} {lang === 'uz' ? 'yechildi' : 'решено'}</span>
              </div>
            </div>

            {/* Arithmetic Expression */}
            <div className="py-2">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-wider tabular-nums flex items-center justify-center gap-3">
                <span>{currentProblem.num1}</span>
                <span className="text-emerald-600">{currentProblem.operation}</span>
                <span>{currentProblem.num2}</span>
                <span className="text-slate-400">=</span>
                <span className="text-amber-500 min-w-[50px] border-b-4 border-amber-400">
                  {userAnswer || '?'}
                </span>
              </div>
            </div>

            {/* Hint / Formula Explanation Button & Box */}
            <div>
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200/80 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === 'uz' ? 'Soroban maslahati (Formula)' : 'Подсказка по соробану'}</span>
                </button>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-medium text-left space-y-1">
                  <div className="font-bold flex items-center gap-1 text-amber-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'uz' ? 'Formuladan foydalaning:' : 'Используй формулу:'}</span>
                  </div>
                  <div>
                    {lang === 'uz' ? currentProblem.formulaHintUz : currentProblem.formulaHintRu}
                  </div>
                </div>
              )}
            </div>

            {/* Touch Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'DEL', '0', 'ENTER'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleKeypad(btn)}
                  className={`py-3 rounded-2xl font-black text-lg transition-transform active:scale-95 ${
                    btn === 'ENTER'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white col-span-1 text-sm'
                      : btn === 'DEL'
                      ? 'bg-rose-500 hover:bg-rose-600 text-white text-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {btn === 'ENTER' ? (lang === 'uz' ? 'Tekshir' : 'Готово') : btn === 'DEL' ? '⌫' : btn}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {feedback === 'correct' && (
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-extrabold text-sm sm:text-base animate-bounce">
                <CheckCircle2 className="w-5 h-5" />
                <span>{lang === 'uz' ? 'Toʻgʻri! Barakalla!' : 'Верно! Отлично!'} (+1 ⭐, +10 🪙)</span>
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="text-rose-600 font-bold text-xs sm:text-sm">
                {lang === 'uz' ? 'Qayta hisoblab koʻring, maslahatdan foydalaning!' : 'Попробуй ещё раз, смотри подсказку!'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FORMULAS REFERENCE GUIDE (Kichik va Katta do'stlar) */}
      {activeTab === 'formulas' && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
            <h3 className="font-bold text-sm text-amber-950 mb-1">
              {lang === 'uz' ? 'Kichik doʻstlar qoidasi (5 soni tarkibi)' : 'Правило младших товарищей (состав числа 5)'}
            </h3>
            <p>
              {lang === 'uz' 
                ? 'Pastki toshlar yetmaganda, yuqoridagi 5 toshi va uning doʻsti yordamga keladi: 1 va 4, 2 va 3 bir-biriga doʻst!'
                : 'Когда не хватает нижних косточек, на помощь приходит верхняя 5: 1 и 4, 2 и 3 — лучшие друзья!'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SMALL_FRIENDS_FORMULAS.map((f) => (
              <div key={f.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-sm text-slate-800">
                    {lang === 'uz' ? f.nameUz : f.nameRu}
                  </span>
                  <span className="font-mono text-xs font-black px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                    {f.formula}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  {lang === 'uz' ? f.explanationUz : f.explanationRu}
                </p>

                <div className="bg-slate-50 rounded-xl p-2.5 text-xs">
                  <span className="font-bold text-slate-700">
                    {lang === 'uz' ? 'Misol:' : 'Пример:'}
                  </span>{' '}
                  <span className="font-mono font-bold text-amber-700">{f.example}</span>
                  <div className="mt-1 space-y-0.5 text-slate-500 text-[11px]">
                    {f.stepsUz.map((st, idx) => (
                      <div key={idx}>• {st}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
