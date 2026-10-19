import React, { useState } from 'react';
import { Award, Sparkles, Printer, X, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  stars: number;
  streak: number;
  petLevel: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  lang,
  stars,
  streak,
  petLevel
}) => {
  const [studentName, setStudentName] = useState<string>('Azizbek');
  const [isEditing, setIsEditing] = useState(false);

  const badgeImagePath = '/src/assets/images/badge_champion_cup_1792379943058.jpg';

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-amber-300 p-4 sm:p-8 relative space-y-4 animate-in zoom-in-95 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Area */}
        <div id="printable-certificate" className="border-4 border-amber-500 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/70 text-center relative overflow-hidden space-y-4">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-400 text-2xl">✦</div>
          <div className="absolute top-2 right-2 text-amber-400 text-2xl">✦</div>
          <div className="absolute bottom-2 left-2 text-amber-400 text-2xl">✦</div>
          <div className="absolute bottom-2 right-2 text-amber-400 text-2xl">✦</div>

          {/* Badge Image */}
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-md border-2 border-amber-300 bg-white">
            <img 
              src={badgeImagePath} 
              alt="Kid Achiever Award" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <span className="text-xs font-black tracking-widest text-amber-800 uppercase">
              {lang === 'uz' ? 'FAXR IFTIXORI DIPLOMI' : 'ПОЧЁТНАЯ ГРАМОТА'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {lang === 'uz' ? '1-SINF BILIMDONI' : 'ЛУЧШИЙ ПЕРВОКЛАССНИК'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'uz' 
                ? 'Rus tili savodxonligi va Mental arifmetika boʻyicha yuqori natijalar uchun' 
                : 'За отличные успехи в изучении русского языка и ментальной арифметики'}
            </p>
          </div>

          {/* Recipient Name */}
          <div className="py-2">
            <p className="text-xs text-slate-400">
              {lang === 'uz' ? 'Ushbu diplom topshiriladi:' : 'Награждается ученик 1 класса:'}
            </p>
            {isEditing ? (
              <div className="flex items-center justify-center gap-2 mt-1">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="px-3 py-1 text-center font-black text-xl text-amber-800 border-b-2 border-amber-500 outline-none max-w-xs"
                  placeholder="Ismingizni yozing"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold"
                >
                  Saqlash
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setIsEditing(true)}
                className="text-2xl sm:text-3xl font-black text-amber-800 underline decoration-amber-400 underline-offset-4 cursor-pointer hover:text-amber-900 transition-colors inline-block mt-1"
                title="Ismni oʻzgartirish uchun bosing"
              >
                {studentName} ✎
              </div>
            )}
          </div>

          {/* Achievement Metrics */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-2 border-t border-amber-200">
            <div className="bg-white/80 rounded-xl p-2 border border-amber-200">
              <div className="text-[10px] text-slate-400">{lang === 'uz' ? 'Yulduzlar' : 'Звёзды'}</div>
              <div className="font-black text-amber-600 text-sm">{stars} ⭐</div>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-amber-200">
              <div className="text-[10px] text-slate-400">{lang === 'uz' ? 'Kunlik seriya' : 'Ударный темп'}</div>
              <div className="font-black text-orange-600 text-sm">{streak} {lang === 'uz' ? 'kun' : 'дней'} 🔥</div>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-amber-200">
              <div className="text-[10px] text-slate-400">{lang === 'uz' ? 'Misha darajasi' : 'Уровень Миши'}</div>
              <div className="font-black text-emerald-600 text-sm">Lv.{petLevel} 🎓</div>
            </div>
          </div>

          {/* Date and Seal */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-amber-100">
            <div className="text-left">
              <span className="font-bold text-slate-700">{lang === 'uz' ? 'Sana:' : 'Дата:'}</span> {currentDate}
            </div>
            <div className="text-right flex items-center gap-1 font-bold text-amber-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'uz' ? 'Tasdiqlangan: BilimVoy' : 'Утверждено: BilimVoy'}</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'uz' ? 'Chop etish / Saqlash' : 'Распечатать / Сохранить'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors"
          >
            {lang === 'uz' ? 'Yopish' : 'Закрыть'}
          </button>
        </div>

      </div>
    </div>
  );
};
