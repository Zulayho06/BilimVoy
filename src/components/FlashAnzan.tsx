import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, XCircle, Award, Volume2, Sparkles, Settings2 } from 'lucide-react';
import { Language, FlashAnzanConfig } from '../types';
import { playFlashTick, playSuccessChime, playIncorrectGentle, playCoinSound, speakRussian } from '../utils/audio';

interface FlashAnzanProps {
  lang: Language;
  onReward: (stars: number, coins: number, xp: number) => void;
  onRoundCompleted?: () => void;
}

export const FlashAnzan: React.FC<FlashAnzanProps> = ({
  lang,
  onReward,
  onRoundCompleted
}) => {
  const [config, setConfig] = useState<FlashAnzanConfig>({
    speedMs: 1200,
    digits: 1,
    stepCount: 3,
    includeNegatives: true
  });

  const [gameState, setGameState] = useState<'idle' | 'countdown' | 'flashing' | 'answering' | 'result'>('idle');
  const [numbersList, setNumbersList] = useState<number[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [displayedNumber, setDisplayedNumber] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(3);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  // Generate sequence of numbers respecting mental arithmetic rules for grade 1
  const generateSequence = (): { sequence: number[]; total: number } => {
    const list: number[] = [];
    let currentSum = 0;

    for (let i = 0; i < config.stepCount; i++) {
      let num: number;
      if (i === 0) {
        // First number is always positive
        num = config.digits === 1 
          ? Math.floor(Math.random() * 8) + 1 // 1-8
          : Math.floor(Math.random() * 40) + 10;
      } else {
        // Subsequent numbers can be positive or negative
        const allowNegative = config.includeNegatives && currentSum > 4;
        const isNeg = allowNegative && Math.random() > 0.6;
        
        if (config.digits === 1) {
          num = Math.floor(Math.random() * 4) + 1; // 1-4 for 1st grade
          if (isNeg) {
            num = -Math.min(num, currentSum); // ensure non-negative total
          }
        } else {
          num = Math.floor(Math.random() * 20) + 5;
          if (isNeg) {
            num = -Math.min(num, currentSum - 5);
          }
        }
      }

      currentSum += num;
      list.push(num);
    }

    return { sequence: list, total: currentSum };
  };

  const startRound = () => {
    setUserAnswer('');
    const { sequence } = generateSequence();
    setNumbersList(sequence);
    setGameState('countdown');
    setCountdown(3);
  };

  // Countdown timer (3 -> 2 -> 1 -> GO)
  useEffect(() => {
    if (gameState !== 'countdown') return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
        playFlashTick();
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setGameState('flashing');
      setCurrentStepIndex(0);
    }
  }, [gameState, countdown]);

  // Number flashing loop
  useEffect(() => {
    if (gameState !== 'flashing') return;

    if (currentStepIndex >= 0 && currentStepIndex < numbersList.length) {
      const num = numbersList[currentStepIndex];
      setDisplayedNumber(num);
      playFlashTick();

      // Audio speak option
      if (config.speedMs >= 1000) {
        const spoken = num > 0 ? `плюс ${num}` : `минус ${Math.abs(num)}`;
        speakRussian(spoken, 1.1);
      }

      timerRef.current = window.setTimeout(() => {
        // Flash clear interval for 150ms before next number
        setDisplayedNumber(null);
        setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
        }, 150);
      }, config.speedMs);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else if (currentStepIndex >= numbersList.length) {
      // Finished all flashes! Transition to answering
      setGameState('answering');
      setDisplayedNumber(null);
    }
  }, [gameState, currentStepIndex, numbersList, config.speedMs]);

  // Keypad submit
  const handleKeypadPress = (val: string) => {
    if (val === 'DEL') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (val === 'ENTER') {
      handleSubmitAnswer();
    } else {
      if (userAnswer.length < 4) {
        setUserAnswer(prev => prev + val);
      }
    }
  };

  const handleSubmitAnswer = () => {
    if (userAnswer.trim() === '') return;
    const correctSum = numbersList.reduce((acc, curr) => acc + curr, 0);
    const parsed = parseInt(userAnswer, 10);

    const isMatch = parsed === correctSum;
    setIsCorrect(isMatch);
    setGameState('result');

    if (isMatch) {
      playSuccessChime();
      playCoinSound();
      setStreakCount(prev => prev + 1);
      onReward(2, 15, 25);
      onRoundCompleted?.();
    } else {
      playIncorrectGentle();
      setStreakCount(0);
    }
  };

  const correctSum = numbersList.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="space-y-4">
      {/* Header and Explanation */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>⚡</span>
            <span>{lang === 'uz' ? 'Flesh-Anzan: Mental Tezkor Hisob' : 'Флеш-Анзан (Ментальный счёт)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'uz' 
              ? 'Sonlar tez yonib oʻchadi. Ularni xayolingizdagi sorobanda hisoblang!' 
              : 'Числа быстро мелькают на экране. Считай на воображаемом соробане!'}
          </p>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs font-bold">
          <Award className="w-4 h-4 text-orange-500" />
          <span>{lang === 'uz' ? 'Gʻalabalar seriyasi:' : 'Серия побед:'} {streakCount}</span>
        </div>
      </div>

      {/* SETTINGS BAR (WHEN IDLE OR RESULT) */}
      {(gameState === 'idle' || gameState === 'result') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Settings2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'uz' ? 'Mashq Sozlamalari (1-Sinf)' : 'Настройки тренажёра'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Speed Selector */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                {lang === 'uz' ? 'Tezlik (soniya)' : 'Скорость показа'}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: '2.0s', val: 2000 },
                  { label: '1.2s', val: 1200 },
                  { label: '0.7s', val: 700 }
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setConfig({ ...config, speedMs: s.val })}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      config.speedMs === s.val
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Count */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                {lang === 'uz' ? 'Sonlar miqdori' : 'Количество чисел'}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[3, 5, 7].map((count) => (
                  <button
                    key={count}
                    onClick={() => setConfig({ ...config, stepCount: count })}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      config.stepCount === count
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {count} {lang === 'uz' ? 'ta' : 'шт'}
                  </button>
                ))}
              </div>
            </div>

            {/* Digits */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                {lang === 'uz' ? 'Xonalar soni' : 'Разрядность'}
              </label>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setConfig({ ...config, digits: 1 })}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    config.digits === 1
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  1-xonali (1-9)
                </button>
                <button
                  onClick={() => setConfig({ ...config, digits: 2 })}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    config.digits === 2
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  2-xonali (10-99)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLASH SCREEN CONTAINER */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-800 text-center relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
        
        {/* IDLE STATE */}
        {gameState === 'idle' && (
          <div className="space-y-4">
            <div className="text-6xl animate-pulse">⚡</div>
            <div className="text-white">
              <h3 className="text-xl sm:text-2xl font-black">
                {lang === 'uz' ? 'Tayyormisiz?' : 'Готов к быстрому счёту?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                {lang === 'uz'
                  ? 'Ekranda sonlar ketma-ket chiqadi. Xayoliy abakusda ularni qoʻshing va ayiring!'
                  : 'Числа будут мелькать на экране. Считай в уме и назови верный ответ!'}
              </p>
            </div>
            <button
              onClick={startRound}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{lang === 'uz' ? 'Boshlash!' : 'Старт!'}</span>
            </button>
          </div>
        )}

        {/* COUNTDOWN STATE */}
        {gameState === 'countdown' && (
          <div className="space-y-2">
            <div className="text-8xl font-black text-amber-400 animate-ping">
              {countdown > 0 ? countdown : 'GO!'}
            </div>
            <p className="text-slate-400 text-sm font-semibold">
              {lang === 'uz' ? 'Diqqat qiling...' : 'Внимание на экран...'}
            </p>
          </div>
        )}

        {/* FLASHING STATE */}
        {gameState === 'flashing' && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-amber-400/80 uppercase tracking-widest">
              {currentStepIndex + 1} / {numbersList.length}
            </div>
            <div className="text-8xl sm:text-9xl font-black text-white tracking-wider tabular-nums transition-transform transform scale-110">
              {displayedNumber !== null ? (
                displayedNumber > 0 ? `+${displayedNumber}` : displayedNumber
              ) : (
                <span className="opacity-0">·</span>
              )}
            </div>
          </div>
        )}

        {/* ANSWERING STATE */}
        {gameState === 'answering' && (
          <div className="w-full max-w-xs mx-auto space-y-4">
            <div className="text-white">
              <h4 className="text-lg font-bold">
                {lang === 'uz' ? 'Javobingiz qancha?' : 'Сколько получилось?'}
              </h4>
              <div className="mt-2 h-14 bg-slate-800 rounded-2xl border-2 border-amber-400 flex items-center justify-center text-3xl font-black text-amber-300 tabular-nums">
                {userAnswer || <span className="text-slate-500 text-xl">?</span>}
              </div>
            </div>

            {/* Kid Touch Keypad */}
            <div className="grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'DEL', '0', 'ENTER'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleKeypadPress(btn)}
                  className={`py-3 rounded-xl font-black text-lg transition-transform active:scale-90 ${
                    btn === 'ENTER'
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white col-span-1 text-sm'
                      : btn === 'DEL'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white text-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {btn === 'ENTER' ? (lang === 'uz' ? 'OK' : 'Готово') : btn === 'DEL' ? '⌫' : btn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT STATE */}
        {gameState === 'result' && (
          <div className="space-y-4">
            {isCorrect ? (
              <div className="space-y-2 animate-in zoom-in-90">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-emerald-400">
                  {lang === 'uz' ? 'Toʻgʻri! Barakalla!' : 'Правильно! Супер!'}
                </h3>
                <p className="text-slate-300 text-sm">
                  {lang === 'uz' ? 'Hisob:' : 'Пример:'}{' '}
                  <span className="font-mono text-amber-300 font-bold">
                    {numbersList.map(n => n > 0 ? `+${n}` : `${n}`).join(' ')} = {correctSum}
                  </span>
                </p>
                <div className="text-amber-400 font-extrabold text-sm">
                  +2 ⭐ · +15 🪙 · +25 XP
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border-2 border-rose-400">
                  <XCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-rose-400">
                  {lang === 'uz' ? 'Xato boʻldi, tushkunlikka tushmang!' : 'Не совсем точно!'}
                </h3>
                <p className="text-slate-300 text-xs">
                  {lang === 'uz' ? 'Siz kiritgan javob:' : 'Твой ответ:'} <span className="line-through text-rose-300">{userAnswer}</span>
                </p>
                <p className="text-amber-300 text-sm font-bold">
                  {lang === 'uz' ? 'Toʻgʻri javob:' : 'Правильный ответ:'}{' '}
                  <span className="font-mono text-lg text-white font-extrabold">
                    {numbersList.map(n => n > 0 ? `+${n}` : `${n}`).join(' ')} = {correctSum}
                  </span>
                </p>
              </div>
            )}

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                onClick={startRound}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm rounded-xl shadow-md hover:scale-105 transition-transform"
              >
                {lang === 'uz' ? 'Yana bitta raund!' : 'Следующий раунд!'}
              </button>
              <button
                onClick={() => setGameState('idle')}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
              >
                {lang === 'uz' ? 'Sozlamalar' : 'Меню'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
