import React, { useState } from 'react';
import { Volume2, HelpCircle, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { AlphabetLetter, Language } from '../types';
import { RUSSIAN_ALPHABET } from '../data/russianData';
import { speakRussian, playSuccessChime, playIncorrectGentle, playCoinSound } from '../utils/audio';

interface RussianAlphabetProps {
  lang: Language;
  onReward: (stars: number, coins: number, xp: number) => void;
  onLetterLearned?: (letter: string) => void;
}

export const RussianAlphabet: React.FC<RussianAlphabetProps> = ({
  lang,
  onReward,
  onLetterLearned
}) => {
  const [filter, setFilter] = useState<'all' | 'vowels' | 'consonants' | 'signs'>('all');
  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  
  // Quiz State
  const [quizTarget, setQuizTarget] = useState<AlphabetLetter | null>(null);
  const [quizOptions, setQuizOptions] = useState<AlphabetLetter[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const filteredLetters = RUSSIAN_ALPHABET.filter((l) => {
    if (filter === 'vowels') return l.isVowel;
    if (filter === 'consonants') return !l.isVowel && l.letter !== 'Ъ' && l.letter !== 'Ь';
    if (filter === 'signs') return l.letter === 'Ъ' || l.letter === 'Ь';
    return true;
  });

  const handlePlayLetterAudio = (item: AlphabetLetter, e?: React.MouseEvent) => {
    e?.stopPropagation();
    // Speak letter name then the example word
    const speechText = `${item.letter}. ${item.wordRu}.`;
    speakRussian(speechText, 0.8);
    onLetterLearned?.(item.letter);
  };

  const startQuiz = () => {
    setIsQuizMode(true);
    setQuizScore(0);
    nextQuizQuestion();
  };

  const nextQuizQuestion = () => {
    setQuizFeedback(null);
    const target = RUSSIAN_ALPHABET[Math.floor(Math.random() * RUSSIAN_ALPHABET.length)];
    const others = RUSSIAN_ALPHABET.filter(l => l.letter !== target.letter)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [target, ...others].sort(() => 0.5 - Math.random());
    
    setQuizTarget(target);
    setQuizOptions(options);

    // Speak prompt
    setTimeout(() => {
      speakRussian(`Найди букву ${target.letter}`, 0.85);
    }, 200);
  };

  const handleSelectQuizOption = (chosen: AlphabetLetter) => {
    if (!quizTarget || quizFeedback) return;

    if (chosen.letter === quizTarget.letter) {
      setQuizFeedback('correct');
      playSuccessChime();
      playCoinSound();
      setQuizScore(prev => prev + 1);
      onReward(1, 5, 10);

      setTimeout(() => {
        nextQuizQuestion();
      }, 1200);
    } else {
      setQuizFeedback('wrong');
      playIncorrectGentle();
      speakRussian(`Это буква ${chosen.letter}. А нам нужна буква ${quizTarget.letter}`, 0.85);
      setTimeout(() => {
        setQuizFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner / Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-amber-200/80 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>📚</span>
            <span>{lang === 'uz' ? 'Rus Tili Alifbosi (1-Sinf)' : 'Русская Азбука (1 класс)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'uz' 
              ? 'Harflarni bosing, toʻgʻri talaffuzini eshiting va boʻgʻinlarni oʻrganing'
              : 'Нажимай на буквы, слушай правильное произношение и учись читать'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isQuizMode ? (
            <button
              onClick={startQuiz}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{lang === 'uz' ? 'Oʻyin: Harfni top!' : 'Игра: Найди букву!'}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsQuizMode(false)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Alifboga qaytish' : 'Вся азбука'}</span>
            </button>
          )}
        </div>
      </div>

      {/* QUIZ MODE */}
      {isQuizMode && quizTarget && (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 border-2 border-indigo-200 rounded-2xl p-5 shadow-sm text-center space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>{lang === 'uz' ? 'Savol' : 'Вопрос'}</span>
            <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>{quizScore} {lang === 'uz' ? 'ball' : 'очков'}</span>
            </div>
          </div>

          <div className="py-2">
            <p className="text-sm sm:text-base font-bold text-slate-800">
              {lang === 'uz' ? 'Qaysi biri bu harf?' : 'Какая это буква?'}
            </p>
            <button
              onClick={() => speakRussian(`Найди букву ${quizTarget.letter}`, 0.85)}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-sm shadow-md transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>{lang === 'uz' ? 'Tovushni qayta eshitish' : 'Послушать звук'}</span>
            </button>
          </div>

          {/* 4 Quiz Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
            {quizOptions.map((opt) => (
              <button
                key={opt.letter}
                onClick={() => handleSelectQuizOption(opt)}
                className="p-4 bg-white border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-2xl shadow-xs transition-all flex flex-col items-center gap-2 active:scale-95"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-800">
                  {opt.letter} {opt.lower}
                </span>
                <span className="text-2xl">{opt.emoji}</span>
              </button>
            ))}
          </div>

          {quizFeedback === 'correct' && (
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-extrabold text-sm sm:text-base animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              <span>{lang === 'uz' ? 'Barakalla! Toʻgʻri topdingiz!' : 'Правильно! Молодец!'} (+1 ⭐)</span>
            </div>
          )}
        </div>
      )}

      {/* STANDARD ALPHABET BROWSER */}
      {!isQuizMode && (
        <>
          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl max-w-md">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'uz' ? 'Hammasi (33)' : 'Все (33)'}
            </button>
            <button
              onClick={() => setFilter('vowels')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
                filter === 'vowels' ? 'bg-rose-500 text-white shadow-xs' : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              {lang === 'uz' ? 'Unlilar (10)' : 'Гласные (10)'}
            </button>
            <button
              onClick={() => setFilter('consonants')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
                filter === 'consonants' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-700 hover:bg-sky-50'
              }`}
            >
              {lang === 'uz' ? 'Undoshlar (21)' : 'Согласные (21)'}
            </button>
            <button
              onClick={() => setFilter('signs')}
              className={`py-1.5 px-2.5 text-xs font-bold rounded-lg transition-all ${
                filter === 'signs' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ъ / Ь
            </button>
          </div>

          {/* Letter Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {filteredLetters.map((item) => (
              <div
                key={item.letter}
                onClick={() => {
                  setSelectedLetter(item);
                  handlePlayLetterAudio(item);
                }}
                className={`group relative bg-white border rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-between min-h-[115px] cursor-pointer shadow-2xs hover:shadow-md transition-all active:scale-95 ${
                  item.isVowel ? 'border-rose-200 hover:border-rose-400' : 'border-slate-200 hover:border-sky-400'
                }`}
              >
                {/* Upper Letter & sound icon */}
                <div className="w-full flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    item.isVowel ? 'bg-rose-50 text-rose-600' : 'bg-sky-50 text-sky-700'
                  }`}>
                    {item.sound}
                  </span>
                  <button
                    onClick={(e) => handlePlayLetterAudio(item, e)}
                    className="p-1 rounded-full text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Big Letter Character */}
                <div className="my-1 text-center">
                  <div className={`text-2xl sm:text-3xl font-black tracking-tight ${
                    item.isVowel ? 'text-rose-600' : 'text-slate-900'
                  }`}>
                    {item.letter} <span className="text-xl font-bold opacity-75">{item.lower}</span>
                  </div>
                </div>

                {/* Word & Emoji */}
                <div className="w-full text-center border-t border-slate-100 pt-1 mt-1">
                  <div className="text-lg leading-none">{item.emoji}</div>
                  <div className="text-[11px] font-bold text-slate-800 truncate mt-0.5">
                    {item.wordRu}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {item.wordUz}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Letter Detail Modal */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                selectedLetter.isVowel ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-800'
              }`}>
                {selectedLetter.isVowel 
                  ? (lang === 'uz' ? 'Unli tovush' : 'Гласный звук')
                  : (lang === 'uz' ? 'Undosh tovush' : 'Согласный звук')}
              </span>
              <button
                onClick={() => setSelectedLetter(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="text-6xl font-black text-slate-900">
                {selectedLetter.letter} {selectedLetter.lower}
              </div>
              <p className="text-sm font-medium text-slate-500">
                {lang === 'uz' ? `Nomi: "${selectedLetter.name}"` : `Название: «${selectedLetter.name}»`} · {selectedLetter.sound}
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 text-center border border-amber-200/70">
              <div className="text-4xl mb-1">{selectedLetter.emoji}</div>
              <div className="text-lg font-extrabold text-slate-800">
                {selectedLetter.wordRu}
              </div>
              <div className="text-xs font-semibold text-amber-800">
                {selectedLetter.wordUz}
              </div>

              {selectedLetter.syllables && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {lang === 'uz' ? "Boʻgʻinlar:" : "Слоги:"}
                  </span>
                  {selectedLetter.syllables.map((s, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 rounded-md border border-amber-200 text-xs font-bold text-amber-900">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePlayLetterAudio(selectedLetter)}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>{lang === 'uz' ? 'Tinglash' : 'Послушать'}</span>
              </button>
              <button
                onClick={() => setSelectedLetter(null)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm"
              >
                {lang === 'uz' ? 'Yopish' : 'Закрыть'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
