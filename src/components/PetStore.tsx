import React, { useState } from 'react';
import { Heart, Sparkles, Check, Lock, Award, Coins, Flame } from 'lucide-react';
import { PetState, PetHat, Badge, DailyQuest, Language } from '../types';
import { PET_HATS, BADGES_LIST } from '../data/mentalMathData';
import { playCoinSound, playSuccessChime, playIncorrectGentle, speakRussian, speakUzbek } from '../utils/audio';

interface PetStoreProps {
  pet: PetState;
  setPet: React.Dispatch<React.SetStateAction<PetState>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  lang: Language;
  dailyQuests: DailyQuest[];
  onClaimQuest: (questId: string, reward: number) => void;
}

export const PetStore: React.FC<PetStoreProps> = ({
  pet,
  setPet,
  coins,
  setCoins,
  lang,
  dailyQuests,
  onClaimQuest
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'wardrobe' | 'food' | 'quests' | 'badges'>('wardrobe');
  const [mascotMessage, setMascotMessage] = useState<string>('');

  const mascotImagePath = '/src/assets/images/mascot_happy_cub_1792379941441.jpg';

  // Buy or Equip Hat
  const handleHatAction = (hat: PetHat) => {
    const isUnlocked = pet.unlockedHats.includes(hat.id);

    if (isUnlocked) {
      // Toggle equip
      const newSelected = pet.selectedHat === hat.id ? undefined : hat.id;
      setPet(prev => ({ ...prev, selectedHat: newSelected }));
      playSuccessChime();
      const msg = lang === 'uz' ? `Misha yangi kiyim kiyib oldi!` : `Миша примерил новую вещь!`;
      setMascotMessage(msg);
    } else {
      // Need to buy
      if (pet.level < hat.requiredLevel) {
        playIncorrectGentle();
        const msg = lang === 'uz' ? `Bu bosh kiyim uchun ${hat.requiredLevel}-daraja kerak!` : `Для этой вещи нужен ${hat.requiredLevel} уровень!`;
        setMascotMessage(msg);
        return;
      }

      if (coins < hat.cost) {
        playIncorrectGentle();
        const msg = lang === 'uz' ? `Tangalar yetarli emas! Misollar yechib tanga toʻplang.` : `Не хватает монет! Решай примеры и копи монеты.`;
        setMascotMessage(msg);
        return;
      }

      // Purchase
      setCoins(prev => prev - hat.cost);
      setPet(prev => ({
        ...prev,
        unlockedHats: [...prev.unlockedHats, hat.id],
        selectedHat: hat.id,
        xp: prev.xp + 20
      }));
      playCoinSound();
      playSuccessChime();
      const msg = lang === 'uz' ? `Tabriklaymiz! Siz ${hat.nameUz}ni sotib oldingiz!` : `Поздравляем! Ты купил ${hat.nameRu}!`;
      setMascotMessage(msg);
    }
  };

  // Feed Misha
  const handleFeed = (foodType: 'apple' | 'honey' | 'berries', cost: number, happinessBoost: number) => {
    if (coins < cost) {
      playIncorrectGentle();
      setMascotMessage(lang === 'uz' ? 'Tanga yetarli emas!' : 'Не хватает монеток!');
      return;
    }

    setCoins(prev => prev - cost);
    setPet(prev => {
      const nextHunger = Math.min(100, prev.hunger + 25);
      const nextHappiness = Math.min(100, prev.happiness + happinessBoost);
      const nextXp = prev.xp + 15;
      let nextLevel = prev.level;
      let nextXpNeeded = prev.xpNeeded;

      if (nextXp >= prev.xpNeeded) {
        nextLevel += 1;
        nextXpNeeded = Math.round(prev.xpNeeded * 1.5);
        playSuccessChime();
      }

      return {
        ...prev,
        hunger: nextHunger,
        happiness: nextHappiness,
        xp: nextXp,
        level: nextLevel,
        xpNeeded: nextXpNeeded
      };
    });

    playCoinSound();
    const treats = {
      apple: { uz: 'Maza qilib olma yedim, rahmat!', ru: 'Ммм, яблоко очень вкусное, спасибо!' },
      honey: { uz: 'Asal — mening eng sevimli taomim!', ru: 'Мёд — моё самое любимое лакомство!' },
      berries: { uz: 'Shirin rezavorlar uchun katta rahmat!', ru: 'Спасибо за сладкие ягодки!' }
    };
    const feedback = lang === 'uz' ? treats[foodType].uz : treats[foodType].ru;
    setMascotMessage(feedback);

    if (lang === 'uz') {
      speakUzbek(feedback);
    } else {
      speakRussian(feedback);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🧸</span>
            <span>{lang === 'uz' ? 'Ayiqcha Misha Xonasi va Doʻkon' : 'Комната Миши и Магазин'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'uz' 
              ? 'Mishani ovqatlantiring, kiyintiring va yutuqlarni koʻring' 
              : 'Ухаживай за Мишей, покупай наряды и получай награды'}
          </p>
        </div>

        {/* Coins indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-xl border border-amber-300 text-amber-900 text-xs font-black">
          <Coins className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>{coins} {lang === 'uz' ? 'tanga' : 'монет'}</span>
        </div>
      </div>

      {/* MASCOT SHOWCASE ROOM */}
      <div className="bg-gradient-to-b from-amber-100/60 via-orange-50 to-amber-100/70 border-2 border-amber-200 rounded-3xl p-6 text-center space-y-4 shadow-sm relative overflow-hidden">
        
        {/* Hat Badge overlay */}
        <div className="relative inline-block mx-auto">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-lg bg-white mx-auto">
            <img 
              src={mascotImagePath} 
              alt="Mascot Misha"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {pet.selectedHat && (
            <div className="absolute -top-4 -right-3 text-4xl bg-white/95 rounded-full p-1 shadow-md border-2 border-amber-200">
              {pet.selectedHat === 'hat_cap' && '🧢'}
              {pet.selectedHat === 'hat_grad' && '🎓'}
              {pet.selectedHat === 'hat_crown' && '👑'}
              {pet.selectedHat === 'hat_glasses' && '👓'}
              {pet.selectedHat === 'hat_wizard' && '🧙‍♂️'}
              {pet.selectedHat === 'hat_space' && '🧑‍🚀'}
            </div>
          )}

          <div className="absolute -bottom-2 bg-amber-600 text-white text-xs font-black px-3 py-0.5 rounded-full shadow-xs left-1/2 -translate-x-1/2 whitespace-nowrap">
            {lang === 'uz' ? `${pet.level}-Daraja` : `${pet.level} Уровень`}
          </div>
        </div>

        {/* Mascot Speech Bubble */}
        <div className="max-w-md mx-auto bg-white/95 rounded-2xl p-3 border border-amber-200 shadow-2xs">
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            {mascotMessage || (lang === 'uz' ? 'Men bilan shugʻullanganingiz uchun rahmat! Men juda xursandman!' : 'Спасибо, что учишься со мной! Я так рад!')}
          </p>
        </div>

        {/* Stats (Hunger, Happiness, Level XP) */}
        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto text-xs">
          <div className="bg-white/90 p-2 rounded-xl border border-amber-200">
            <div className="text-slate-400 text-[10px]">{lang === 'uz' ? 'Toʻqlik' : 'Сытость'}</div>
            <div className="font-extrabold text-amber-700">{pet.hunger}%</div>
          </div>
          <div className="bg-white/90 p-2 rounded-xl border border-amber-200">
            <div className="text-slate-400 text-[10px]">{lang === 'uz' ? 'Kayfiyat' : 'Радость'}</div>
            <div className="font-extrabold text-rose-600 flex items-center justify-center gap-0.5">
              <Heart className="w-3 h-3 fill-rose-500" /> {pet.happiness}%
            </div>
          </div>
          <div className="bg-white/90 p-2 rounded-xl border border-amber-200">
            <div className="text-slate-400 text-[10px]">{lang === 'uz' ? 'Tajriba' : 'Опыт'}</div>
            <div className="font-extrabold text-indigo-700">{pet.xp} XP</div>
          </div>
        </div>
      </div>

      {/* SUB-TABS: WARDROBE, FOOD, QUESTS, BADGES */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('wardrobe')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'wardrobe' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'uz' ? '👗 Kiyimlar' : '👗 Гардероб'}
        </button>
        <button
          onClick={() => setActiveSubTab('food')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'food' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'uz' ? '🍯 Taomlar' : '🍯 Угощения'}
        </button>
        <button
          onClick={() => setActiveSubTab('quests')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'quests' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'uz' ? '🎯 Vazifalar' : '🎯 Задания'}
        </button>
        <button
          onClick={() => setActiveSubTab('badges')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'badges' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'uz' ? '🏆 Medallar' : '🏆 Медали'}
        </button>
      </div>

      {/* TAB 1: WARDROBE (HATS) */}
      {activeSubTab === 'wardrobe' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PET_HATS.map((hat) => {
            const isUnlocked = pet.unlockedHats.includes(hat.id);
            const isEquipped = pet.selectedHat === hat.id;
            const canAfford = coins >= hat.cost;
            const levelMet = pet.level >= hat.requiredLevel;

            return (
              <div
                key={hat.id}
                className={`bg-white border rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all ${
                  isEquipped ? 'border-amber-500 ring-2 ring-amber-400 bg-amber-50/40' : 'border-slate-200'
                }`}
              >
                <div className="text-4xl my-2">{hat.emoji}</div>
                <div className="font-bold text-xs sm:text-sm text-slate-800">
                  {lang === 'uz' ? hat.nameUz : hat.nameRu}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {lang === 'uz' ? `${hat.requiredLevel}-daraja` : `${hat.requiredLevel} уровень`}
                </div>

                <div className="mt-3 w-full">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleHatAction(hat)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                        isEquipped
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isEquipped 
                        ? (lang === 'uz' ? '✓ Kiyilgan' : '✓ Надето') 
                        : (lang === 'uz' ? 'Kiyish' : 'Надеть')}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleHatAction(hat)}
                      disabled={!levelMet}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        !levelMet
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                      }`}
                    >
                      {!levelMet ? (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>{lang === 'uz' ? 'Qulflangan' : 'Закрыто'}</span>
                        </>
                      ) : (
                        <>
                          <Coins className="w-3.5 h-3.5 text-amber-300" />
                          <span>{hat.cost} {lang === 'uz' ? 'tanga' : 'монет'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: FOOD & TREATS */}
      {activeSubTab === 'food' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'apple' as const, emoji: '🍎', nameUz: 'Qizil Olma', nameRu: 'Красное яблоко', cost: 10, boost: 15 },
            { id: 'honey' as const, emoji: '🍯', nameUz: 'Oʻrmon Asali', nameRu: 'Лесной мёд', cost: 15, boost: 25 },
            { id: 'berries' as const, emoji: '🍓', nameUz: 'Shirin Malina', nameRu: 'Сладкие ягоды', cost: 20, boost: 35 }
          ].map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 text-center flex flex-col items-center justify-between shadow-2xs">
              <div className="text-4xl my-1">{item.emoji}</div>
              <div className="font-bold text-sm text-slate-800">{lang === 'uz' ? item.nameUz : item.nameRu}</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                +{item.boost}% {lang === 'uz' ? 'quvonch' : 'радость'}
              </div>

              <button
                onClick={() => handleFeed(item.id, item.cost, item.boost)}
                className="mt-3 w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>{item.cost} {lang === 'uz' ? 'tanga bilan boqish' : 'монет'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DAILY QUESTS */}
      {activeSubTab === 'quests' && (
        <div className="space-y-3">
          {dailyQuests.map((quest) => (
            <div
              key={quest.id}
              className={`bg-white border rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs transition-all ${
                quest.completed ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="font-bold text-xs sm:text-sm text-slate-800">
                  {lang === 'uz' ? quest.titleUz : quest.titleRu}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{lang === 'uz' ? 'Bajarildi:' : 'Прогресс:'} {quest.currentCount} / {quest.targetCount}</span>
                  <span>·</span>
                  <span className="text-amber-600 font-bold">+{quest.rewardCoins} 🪙</span>
                </div>
              </div>

              <button
                onClick={() => onClaimQuest(quest.id, quest.rewardCoins)}
                disabled={quest.completed || quest.currentCount < quest.targetCount}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  quest.completed
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : quest.currentCount >= quest.targetCount
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs animate-bounce'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {quest.completed
                  ? (lang === 'uz' ? '✓ Olingan' : '✓ Получено')
                  : quest.currentCount >= quest.targetCount
                  ? (lang === 'uz' ? 'Olish!' : 'Забрать!')
                  : (lang === 'uz' ? 'Bajarilmoqda' : 'В процессе')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: BADGES & MEDALS */}
      {activeSubTab === 'badges' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BADGES_LIST.map((b) => (
            <div
              key={b.id}
              className={`bg-white border rounded-2xl p-4 text-center flex flex-col items-center justify-between shadow-2xs ${
                b.unlocked ? 'border-amber-300 bg-gradient-to-b from-amber-50/50 to-white' : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="text-4xl my-1">{b.icon}</div>
              <div>
                <div className="font-black text-xs sm:text-sm text-slate-800">
                  {lang === 'uz' ? b.titleUz : b.titleRu}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {lang === 'uz' ? b.descUz : b.descRu}
                </div>
              </div>

              <div className="mt-2">
                {b.unlocked ? (
                  <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {lang === 'uz' ? 'Qoʻlga kiritildi!' : 'Открыто!'}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {lang === 'uz' ? 'Kutilmoqda' : 'В процессе'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
