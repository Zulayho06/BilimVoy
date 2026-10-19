import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { PetState, Language } from '../types';
import { speakRussian, speakUzbek } from '../utils/audio';

interface MascotWidgetProps {
  pet: PetState;
  lang: Language;
  onPetClick?: () => void;
  messageOverride?: string;
}

export const MascotWidget: React.FC<MascotWidgetProps> = ({
  pet,
  lang,
  onPetClick,
  messageOverride
}) => {
  const [bounce, setBounce] = useState(false);
  const [currentThought, setCurrentThought] = useState<string>('');

  const mascotImagePath = '/src/assets/images/mascot_happy_cub_1792379941441.jpg';

  const defaultPhrasesUz = [
    'Salom, doʻstim! Bugun yangi harflarni oʻrganamizmi?',
    'Mental arifmetika — bu sen uchun oʻyinchoq!',
    'Sorobanda toshlarni surish juda qiziq!',
    'Barakalla, sen 1-sinf aʻlochisisan!',
    'Men senga yordam berishdan juda xursandman!'
  ];

  const defaultPhrasesRu = [
    'Привет, друг! Давай повторим русские буквы!',
    'Ментальная арифметика развивает супер-память!',
    'На соробане считать легко и весело!',
    'Молодец, первоклассник! Ты учишься на отлично!',
    'Я так рад учиться вместе с тобой!'
  ];

  const handleInteract = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 500);

    const phrases = lang === 'uz' ? defaultPhrasesUz : defaultPhrasesRu;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentThought(randomPhrase);

    if (lang === 'uz') {
      speakUzbek(randomPhrase);
    } else {
      speakRussian(randomPhrase);
    }

    onPetClick?.();
  };

  const displayText = messageOverride || currentThought || (lang === 'uz' 
    ? 'Salom! Men Ayiqcha Mishaman. Keling, birga oʻrganamiz!' 
    : 'Привет! Я медвежонок Миша. Давай учиться вместе!');

  return (
    <div className="bg-gradient-to-r from-amber-100/90 via-orange-50 to-amber-100/90 border border-amber-200 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3 sm:gap-4 relative overflow-hidden">
      
      {/* Mascot visual avatar with hat overlay */}
      <div 
        onClick={handleInteract}
        className="relative cursor-pointer group shrink-0"
        title={lang === 'uz' ? "Mishani bosing!" : "Нажми на Мишу!"}
      >
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-white transition-transform ${bounce ? 'scale-110 -rotate-3' : 'group-hover:scale-105'}`}>
          <img 
            src={mascotImagePath} 
            alt="Mascot Misha"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Selected hat emoji badge */}
        {pet.selectedHat && (
          <div className="absolute -top-3 -right-2 text-2xl bg-white/90 rounded-full p-0.5 shadow-sm border border-amber-200">
            {pet.selectedHat === 'hat_cap' && '🧢'}
            {pet.selectedHat === 'hat_grad' && '🎓'}
            {pet.selectedHat === 'hat_crown' && '👑'}
            {pet.selectedHat === 'hat_glasses' && '👓'}
            {pet.selectedHat === 'hat_wizard' && '🧙‍♂️'}
            {pet.selectedHat === 'hat_space' && '🧑‍🚀'}
          </div>
        )}

        {/* Level badge */}
        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-white shadow-xs">
          Lv.{pet.level}
        </div>
      </div>

      {/* Speech bubble & level progress */}
      <div className="flex-1 w-full text-center sm:text-left">
        <div className="bg-white/95 rounded-xl p-2.5 sm:p-3 border border-amber-200/90 shadow-2xs relative">
          <div className="hidden sm:block absolute -left-2 top-4 w-3 h-3 bg-white border-l border-t border-amber-200/90 transform -rotate-45" />
          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
            {displayText}
          </p>
        </div>

        {/* Level & happiness bar */}
        <div className="mt-2 flex items-center justify-between gap-3 text-[11px] font-medium text-slate-600 px-1">
          <div className="flex items-center gap-1">
            <span className="font-bold text-amber-700">{pet.name}</span>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-0.5 text-rose-500 font-semibold">
              <Heart className="w-3 h-3 fill-rose-500" /> {pet.happiness}%
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-[160px]">
            <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (pet.xp / pet.xpNeeded) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] tabular-nums text-slate-500 whitespace-nowrap">
              {pet.xp}/{pet.xpNeeded} XP
            </span>
          </div>
        </div>
      </div>

      {/* Audio speech indicator button */}
      <button
        onClick={handleInteract}
        className="shrink-0 p-2 text-xs font-semibold bg-white hover:bg-amber-100 text-amber-800 rounded-xl border border-amber-300 transition-colors flex items-center gap-1.5 shadow-2xs"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>{lang === 'uz' ? 'Gaplashish' : 'Слушать'}</span>
      </button>

    </div>
  );
};
