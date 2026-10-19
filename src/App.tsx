import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { MascotWidget } from './components/MascotWidget';
import { RussianAlphabet } from './components/RussianAlphabet';
import { SyllableReader } from './components/SyllableReader';
import { RussianVocabQuiz } from './components/RussianVocabQuiz';
import { SorobanInteractive } from './components/SorobanInteractive';
import { FlashAnzan } from './components/FlashAnzan';
import { MathFormulasPractice } from './components/MathFormulasPractice';
import { PetStore } from './components/PetStore';
import { CertificateModal } from './components/CertificateModal';
import { ParentDashboard } from './components/ParentDashboard';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { MainTab, Language, PetState, UserStats, DailyQuest } from './types';
import { INITIAL_DAILY_QUESTS } from './data/mentalMathData';
import { playSuccessChime, playFanfare, playCoinSound } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [currentTab, setCurrentTab] = useState<MainTab>('alphabet');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [confettiActive, setConfettiActive] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState<boolean>(false);

  // Motivational Economy & Progress State
  const [stars, setStars] = useState<number>(18);
  const [coins, setCoins] = useState<number>(95);
  const [streak, setStreak] = useState<number>(3);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(INITIAL_DAILY_QUESTS);

  const [pet, setPet] = useState<PetState>({
    name: 'Миша',
    level: 2,
    xp: 65,
    xpNeeded: 120,
    happiness: 95,
    hunger: 85,
    selectedHat: 'hat_cap',
    unlockedHats: ['hat_cap']
  });

  const [stats, setStats] = useState<UserStats>({
    russianExercisesDone: 16,
    mathExercisesDone: 22,
    flashAnzanCompleted: 9,
    correctAnswersTotal: 44,
    totalQuestionsAnswered: 47,
    currentStreakDays: 3,
    stars: 18,
    coins: 95
  });

  // Reward handler for achievements
  const handleReward = (addedStars: number, addedCoins: number, addedXp: number) => {
    setStars(prev => prev + addedStars);
    setCoins(prev => prev + addedCoins);
    
    // Trigger confetti celebration on stars
    if (addedStars > 0) {
      setConfettiActive(true);
    }

    setPet(prev => {
      const nextXp = prev.xp + addedXp;
      let nextLevel = prev.level;
      let nextXpNeeded = prev.xpNeeded;

      if (nextXp >= prev.xpNeeded) {
        nextLevel += 1;
        nextXpNeeded = Math.round(prev.xpNeeded * 1.5);
        playFanfare();
      }

      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
        xpNeeded: nextXpNeeded,
        happiness: Math.min(100, prev.happiness + 5)
      };
    });

    setStats(prev => ({
      ...prev,
      correctAnswersTotal: prev.correctAnswersTotal + 1,
      totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
      stars: prev.stars + addedStars,
      coins: prev.coins + addedCoins
    }));
  };

  // Quests claim handler
  const handleClaimQuest = (questId: string, reward: number) => {
    setDailyQuests(prev =>
      prev.map(q => q.id === questId ? { ...q, completed: true } : q)
    );
    setCoins(prev => prev + reward);
    playCoinSound();
    playSuccessChime();
    setConfettiActive(true);
  };

  const heroBannerImagePath = '/src/assets/images/hero_kids_learning_1792379943149.jpg';

  return (
    <div className="min-h-screen bg-amber-50/30 text-slate-900 flex flex-col font-['Outfit',sans-serif]">
      {/* Confetti celebration canvas */}
      <ConfettiCanvas
        active={confettiActive}
        onFinish={() => setConfettiActive(false)}
      />

      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(prev => prev === 'uz' ? 'ru' : 'uz')}
        stars={stars}
        coins={coins}
        streak={streak}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenParent={() => setIsParentDashboardOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 pb-24 space-y-4">
        
        {/* Welcome Mascot & Hero Section */}
        <MascotWidget
          pet={pet}
          lang={lang}
          onPetClick={() => {
            // Little boost
            setPet(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 2) }));
          }}
        />

        {/* Tab Quick Selector (Desktop & Tablet Friendly Header Pills Alternative) */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-white border border-amber-200/80 rounded-2xl shadow-xs overflow-x-auto">
          {[
            { id: 'alphabet' as MainTab, labelUz: '📚 Rus Alifbosi', labelRu: '📚 Русская Азбука' },
            { id: 'syllables' as MainTab, labelUz: '📖 Boʻgʻinlar va Oʻqish', labelRu: '📖 Чтение по слогам' },
            { id: 'vocab' as MainTab, labelUz: '✨ 1-Sinf Lugʻati', labelRu: '✨ Словарь 1 класса' },
            { id: 'soroban' as MainTab, labelUz: '🧮 Soroban (Abakus)', labelRu: '🧮 Соробан (Абакус)' },
            { id: 'flash_anzan' as MainTab, labelUz: '⚡ Flesh-Anzan', labelRu: '⚡ Флеш-Анзан' },
            { id: 'math_formulas' as MainTab, labelUz: '🎯 Misollar & Formulalar', labelRu: '🎯 Примеры и формулы' },
            { id: 'pet' as MainTab, labelUz: '🧸 Misha Xonasi', labelRu: '🧸 Комната Миши' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                currentTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
              }`}
            >
              {lang === 'uz' ? tab.labelUz : tab.labelRu}
            </button>
          ))}
        </div>

        {/* Active Learning Module */}
        <div className="transition-all">
          {currentTab === 'alphabet' && (
            <RussianAlphabet
              lang={lang}
              onReward={handleReward}
              onLetterLearned={() => {
                setStats(prev => ({ ...prev, russianExercisesDone: prev.russianExercisesDone + 1 }));
                setDailyQuests(prev => prev.map(q => q.category === 'russian' ? { ...q, currentCount: Math.min(q.targetCount, q.currentCount + 1) } : q));
              }}
            />
          )}

          {currentTab === 'syllables' && (
            <SyllableReader
              lang={lang}
              onReward={handleReward}
            />
          )}

          {currentTab === 'vocab' && (
            <RussianVocabQuiz
              lang={lang}
              onReward={handleReward}
            />
          )}

          {currentTab === 'soroban' && (
            <SorobanInteractive
              lang={lang}
              onReward={handleReward}
              onTargetCompleted={() => {
                setStats(prev => ({ ...prev, mathExercisesDone: prev.mathExercisesDone + 1 }));
                setDailyQuests(prev => prev.map(q => q.category === 'soroban' ? { ...q, currentCount: Math.min(q.targetCount, q.currentCount + 1) } : q));
              }}
            />
          )}

          {currentTab === 'flash_anzan' && (
            <FlashAnzan
              lang={lang}
              onReward={handleReward}
              onRoundCompleted={() => {
                setStats(prev => ({ ...prev, flashAnzanCompleted: prev.flashAnzanCompleted + 1 }));
                setDailyQuests(prev => prev.map(q => q.category === 'math' ? { ...q, currentCount: Math.min(q.targetCount, q.currentCount + 1) } : q));
              }}
            />
          )}

          {currentTab === 'math_formulas' && (
            <MathFormulasPractice
              lang={lang}
              onReward={handleReward}
              onProblemSolved={() => {
                setStats(prev => ({ ...prev, mathExercisesDone: prev.mathExercisesDone + 1 }));
              }}
            />
          )}

          {currentTab === 'pet' && (
            <PetStore
              pet={pet}
              setPet={setPet}
              coins={coins}
              setCoins={setCoins}
              lang={lang}
              dailyQuests={dailyQuests}
              onClaimQuest={handleClaimQuest}
            />
          )}
        </div>

        {/* Motivational Classroom Card at bottom */}
        <div className="bg-white border border-amber-200/80 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-56 h-36 rounded-2xl overflow-hidden shadow-xs border border-amber-200 shrink-0">
            <img 
              src={heroBannerImagePath} 
              alt="1st Grade Russian Classroom"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-1.5 text-center md:text-left flex-1">
            <span className="text-[11px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
              {lang === 'uz' ? '1-Rus Sinf Dasturi' : 'Программа 1 Класса'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {lang === 'uz' ? 'Rus tili va Soroban — Kelajak Muzaffariyati!' : 'Русский язык и Соробан — Основа успеха!'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'uz'
                ? 'Har kuni 10 daqiqa ruscha yangi soʻzlar va boʻgʻinlar bilan shugʻullaning, soʻngra 5 daqiqa Flesh-Anzan mashqini bajaring. Xotirangiz va hisoblash tezligingiz kun sayin oʻsib boradi!'
                : 'Занимайся каждый день по 15 минут: сначала буквы и слоговое чтение, затем быстрый счёт на соробане. Твоя память и внимание станут превосходными!'}
            </p>
          </div>
        </div>

      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        lang={lang}
      />

      {/* Certificate / Diploma Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        lang={lang}
        stars={stars}
        streak={streak}
        petLevel={pet.level}
      />

      {/* Parents Dashboard Modal */}
      <ParentDashboard
        isOpen={isParentDashboardOpen}
        onClose={() => setIsParentDashboardOpen(false)}
        lang={lang}
        stats={stats}
      />
    </div>
  );
}
