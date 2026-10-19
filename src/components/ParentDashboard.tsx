import React from 'react';
import { UserStats, Language } from '../types';
import { BookOpen, Calculator, Sparkles, CheckCircle2, X, Award, Lightbulb, Clock } from 'lucide-react';

interface ParentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  stats: UserStats;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  isOpen,
  onClose,
  lang,
  stats
}) => {
  if (!isOpen) return null;

  const totalExercises = stats.russianExercisesDone + stats.mathExercisesDone + stats.flashAnzanCompleted;
  const accuracy = stats.totalQuestionsAnswered > 0 
    ? Math.round((stats.correctAnswersTotal / stats.totalQuestionsAnswered) * 100) 
    : 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 p-5 sm:p-7 relative space-y-5 animate-in zoom-in-95 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧</span>
              <span>{lang === 'uz' ? 'Ota-onalar Nazorati va Natijalar' : 'Родительский контроль и статистика'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'uz' ? '1-sinf oʻquvchisining darslardagi faolligi' : 'Активность первоклассника в обучении'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-center">
            <div className="text-[11px] text-amber-800 font-semibold">{lang === 'uz' ? 'Bajarilgan' : 'Всего'}</div>
            <div className="text-2xl font-black text-amber-900 mt-0.5 tabular-nums">{totalExercises}</div>
            <div className="text-[10px] text-slate-400">{lang === 'uz' ? 'ta mashq' : 'заданий'}</div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-center">
            <div className="text-[11px] text-emerald-800 font-semibold">{lang === 'uz' ? 'Aniqlik' : 'Точность'}</div>
            <div className="text-2xl font-black text-emerald-900 mt-0.5 tabular-nums">{accuracy}%</div>
            <div className="text-[10px] text-slate-400">{lang === 'uz' ? 'toʻgʻri javob' : 'верных'}</div>
          </div>

          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-3 text-center">
            <div className="text-[11px] text-sky-800 font-semibold">{lang === 'uz' ? 'Rus tili' : 'Русский язык'}</div>
            <div className="text-2xl font-black text-sky-900 mt-0.5 tabular-nums">{stats.russianExercisesDone}</div>
            <div className="text-[10px] text-slate-400">{lang === 'uz' ? 'soʻz/harf' : 'слов/букв'}</div>
          </div>

          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-3 text-center">
            <div className="text-[11px] text-indigo-800 font-semibold">{lang === 'uz' ? 'Arifmetika' : 'Арифметика'}</div>
            <div className="text-2xl font-black text-indigo-900 mt-0.5 tabular-nums">{stats.mathExercisesDone + stats.flashAnzanCompleted}</div>
            <div className="text-[10px] text-slate-400">{lang === 'uz' ? 'misollar' : 'примеров'}</div>
          </div>
        </div>

        {/* Recommendations for 1st grader */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>{lang === 'uz' ? '1-Sinf oʻquvchisi uchun mutaxassis tavsiyalari:' : 'Рекомендации для родителей первоклассника:'}</span>
          </div>
          <ul className="text-xs text-amber-800/90 space-y-1.5 list-disc list-inside">
            <li>
              {lang === 'uz' 
                ? 'Har kuni 15-20 daqiqa: 10 daqiqa rus tilida boʻgʻinlab oʻqish, 10 daqiqa sorobanda hisoblash eng samarali odatdir.'
                : '15-20 минут в день: 10 минут слогового чтения и 10 минут соробана создают отличную привычку.'}
            </li>
            <li>
              {lang === 'uz'
                ? 'Flesh-Anzan miyaning ikkala yarim sharini faollashtiradi va bolada diqqatni jamlash qobiliyatini 3 barobarga oshiradi.'
                : 'Флеш-Анзан развивает фотографическую память и образное мышление ребёнка.'}
            </li>
            <li>
              {lang === 'uz'
                ? 'Rus tilidagi soʻzlarni bolaga ovoz chiqarib takrorlatish artikulyatsiyani toʻgʻri shakllantiradi.'
                : 'Поощряйте ребёнка повторять русские слова вслух за приложением.'}
            </li>
          </ul>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            {lang === 'uz' ? 'Tushunarli, darsga qaytish' : 'Понятно, вернуться к урокам'}
          </button>
        </div>

      </div>
    </div>
  );
};
