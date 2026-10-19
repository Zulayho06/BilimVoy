import React, { useState } from 'react';
import { Volume2, HelpCircle, BookOpen, CheckCircle2, RotateCcw, Award, MessageCircle } from 'lucide-react';
import { VocabWord, Language } from '../types';
import { VOCABULARY_WORDS, DIALOGUES } from '../data/russianData';
import { speakRussian, playSuccessChime, playIncorrectGentle, playCoinSound } from '../utils/audio';

interface RussianVocabQuizProps {
  lang: Language;
  onReward: (stars: number, coins: number, xp: number) => void;
}

export const RussianVocabQuiz: React.FC<RussianVocabQuizProps> = ({ lang, onReward }) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'quiz' | 'dialogue'>('cards');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'school' | 'animals' | 'colors' | 'family' | 'food'>('all');

  // Quiz states
  const [quizTarget, setQuizTarget] = useState<VocabWord | null>(null);
  const [quizOptions, setQuizOptions] = useState<VocabWord[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Filtered vocabulary
  const filteredWords = VOCABULARY_WORDS.filter((w) => {
    if (selectedCategory === 'all') return true;
    return w.category === selectedCategory;
  });

  const categoryNames = {
    all: { uz: 'Barchasi', ru: 'Все слова' },
    school: { uz: '🎒 Maktab', ru: '🎒 Школа' },
    animals: { uz: '🐶 Hayvonlar', ru: '🐶 Животные' },
    colors: { uz: '🎨 Ranglar', ru: '🎨 Цвета' },
    family: { uz: '👨‍👩‍👧 Oila', ru: '👨‍👩‍👧 Семья' },
    food: { uz: '🍎 Mevalar', ru: '🍎 Еда и фрукты' }
  };

  const handlePlayWord = (word: VocabWord) => {
    speakRussian(word.wordRu, 0.85);
  };

  // Start vocabulary quiz
  const startQuiz = () => {
    setActiveTab('quiz');
    setQuizScore(0);
    nextQuizQuestion();
  };

  const nextQuizQuestion = () => {
    setQuizFeedback(null);
    const pool = selectedCategory === 'all' 
      ? VOCABULARY_WORDS 
      : VOCABULARY_WORDS.filter(w => w.category === selectedCategory);
    
    const target = pool[Math.floor(Math.random() * pool.length)];
    const others = VOCABULARY_WORDS.filter(w => w.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [target, ...others].sort(() => 0.5 - Math.random());

    setQuizTarget(target);
    setQuizOptions(options);

    setTimeout(() => {
      speakRussian(`Найди: ${target.wordRu}`, 0.85);
    }, 200);
  };

  const handleSelectQuizOption = (chosen: VocabWord) => {
    if (!quizTarget || quizFeedback) return;

    if (chosen.id === quizTarget.id) {
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
      speakRussian(`Это ${chosen.wordRu}. А нам нужно: ${quizTarget.wordRu}`, 0.85);
      setTimeout(() => {
        setQuizFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and top tab controls */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>✨</span>
            <span>{lang === 'uz' ? '1-Sinf Rus Tili Lugʻati' : 'Словарный запас (1 класс)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'uz' 
              ? 'Maktab, oila va hayvonlar haqida kerakli ruscha soʻzlar' 
              : 'Основные слова: школа, животные, семья, цвета'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('cards')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'cards' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'uz' ? 'Lugʻat' : 'Карточки'}</span>
          </button>
          <button
            onClick={startQuiz}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'uz' ? 'Test oʻyini' : 'Викторина'}</span>
          </button>
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'dialogue' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'uz' ? 'Muloqot' : 'Диалоги'}</span>
          </button>
        </div>
      </div>

      {/* CATEGORY SELECTOR (FOR CARDS) */}
      {activeTab === 'cards' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['all', 'school', 'animals', 'colors', 'family', 'food'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
              }`}
            >
              {lang === 'uz' ? categoryNames[cat].uz : categoryNames[cat].ru}
            </button>
          ))}
        </div>
      )}

      {/* VIEW 1: WORD FLASHCARDS */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              onClick={() => handlePlayWord(word)}
              className="bg-white border border-amber-200/90 rounded-2xl p-3.5 flex flex-col items-center justify-between text-center cursor-pointer shadow-2xs hover:shadow-md hover:border-amber-400 transition-all active:scale-95 group"
            >
              <div className="w-full flex justify-end">
                <span className="p-1 rounded-full text-slate-400 group-hover:text-amber-600 group-hover:bg-amber-50">
                  <Volume2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="text-4xl my-1 group-hover:scale-110 transition-transform">
                {word.emoji}
              </div>

              <div className="mt-2 w-full">
                <div className="text-sm sm:text-base font-extrabold text-slate-800 tracking-wide">
                  {word.wordRu}
                </div>
                {word.transcription && (
                  <div className="text-[10px] text-slate-400 font-mono">
                    [{word.transcription}]
                  </div>
                )}
                <div className="text-xs font-semibold text-amber-700 mt-0.5 truncate">
                  {word.wordUz}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: QUIZ / VIKTORINA */}
      {activeTab === 'quiz' && quizTarget && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs text-center space-y-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{lang === 'uz' ? 'Rasmni toping' : 'Найди правильную картинку'}</span>
            <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>{quizScore} {lang === 'uz' ? 'ball' : 'очков'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wide">
              {quizTarget.wordRu}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-amber-800">
              {lang === 'uz' ? `Oʻzbekcha: ${quizTarget.wordUz}` : `Значение: ${quizTarget.wordUz}`}
            </p>

            <button
              onClick={() => speakRussian(quizTarget.wordRu, 0.85)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>{lang === 'uz' ? 'Qayta eshitish' : 'Послушать'}</span>
            </button>
          </div>

          {/* 4 Picture choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
            {quizOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectQuizOption(opt)}
                className="p-4 bg-white border-2 border-amber-200 hover:border-amber-500 hover:bg-amber-50/50 rounded-2xl shadow-xs transition-all flex flex-col items-center gap-2 active:scale-95"
              >
                <span className="text-4xl">{opt.emoji}</span>
                <span className="text-xs font-bold text-slate-700">{opt.wordUz}</span>
              </button>
            ))}
          </div>

          {quizFeedback === 'correct' && (
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-extrabold text-sm sm:text-base animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              <span>{lang === 'uz' ? 'Toʻgʻri! Barakalla!' : 'Верно! Отлично!'} (+1 ⭐)</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('cards')}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Lugʻatga qaytish' : 'Вернуться к словарю'}</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: GRADE 1 DIALOGUES */}
      {activeTab === 'dialogue' && (
        <div className="space-y-4">
          {DIALOGUES.map((dialogue) => (
            <div key={dialogue.id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-slate-800">
                  {lang === 'uz' ? dialogue.titleUz : dialogue.titleRu}
                </h3>
                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  1-Sinf
                </span>
              </div>

              <div className="space-y-2.5">
                {dialogue.lines.map((line, idx) => {
                  const isMisha = line.speaker === 'Миша';
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-xl transition-colors ${
                        isMisha ? 'bg-amber-50/70 border border-amber-200/50' : 'bg-sky-50/70 border border-sky-200/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md text-white ${
                          isMisha ? 'bg-amber-500' : 'bg-sky-600'
                        }`}>
                          {line.speaker}
                        </span>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {line.textRu}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {line.textUz}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => speakRussian(line.textRu, 0.85)}
                        className="self-end sm:self-center px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>{lang === 'uz' ? 'Tinglash' : 'Слушать'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
