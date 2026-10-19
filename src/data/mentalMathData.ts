import { MathProblem, PetHat, Badge, DailyQuest } from '../types';

export interface FormulaGuide {
  id: string;
  nameUz: string;
  nameRu: string;
  formula: string;
  explanationUz: string;
  explanationRu: string;
  example: string;
  stepsUz: string[];
}

export const SMALL_FRIENDS_FORMULAS: FormulaGuide[] = [
  {
    id: 'sf_p4',
    nameUz: 'Kichik doʻst: +4',
    nameRu: 'Младший товарищ: +4',
    formula: '+4 = +5 - 1',
    explanationUz: 'Agar 4 qoʻshmoqchi boʻlsangiz va pastki toshlar yetmasa: yuqoridagi 5 toshini tushiring va pastdan 1 toshni olib tashlang.',
    explanationRu: 'Чтобы прибавить 4: опускаем верхнюю косточку 5 и убираем 1 нижнюю косточку.',
    example: '1 + 4 = 5',
    stepsUz: ['1-qadam: Pastdan 1 toshni koʻtaring', '2-qadam: +5 toshini tushiring', '3-qadam: -1 toshni pastga tushiring']
  },
  {
    id: 'sf_p3',
    nameUz: 'Kichik doʻst: +3',
    nameRu: 'Младший товарищ: +3',
    formula: '+3 = +5 - 2',
    explanationUz: 'Agar 3 qoʻshish uchun toshlar yetmasa: +5 toshini tushiring va pastdan 2 toshni olib tashlang.',
    explanationRu: 'Чтобы прибавить 3: опускаем 5 и убираем 2 нижние косточки.',
    example: '2 + 3 = 5',
    stepsUz: ['1-qadam: Pastdan 2 toshni koʻtaring', '2-qadam: +5 toshini tushiring', '3-qadam: -2 toshni pastga tushiring']
  },
  {
    id: 'sf_p2',
    nameUz: 'Kichik doʻst: +2',
    nameRu: 'Младший товарищ: +2',
    formula: '+2 = +5 - 3',
    explanationUz: 'Agar 2 qoʻshish uchun toshlar yetmasa: +5 toshini tushiring va pastdan 3 toshni olib tashlang.',
    explanationRu: 'Чтобы прибавить 2: опускаем 5 и убираем 3 нижние косточки.',
    example: '3 + 2 = 5',
    stepsUz: ['1-qadam: Pastdan 3 toshni koʻtaring', '2-qadam: +5 toshini tushiring', '3-qadam: -3 toshni pastga tushiring']
  },
  {
    id: 'sf_p1',
    nameUz: 'Kichik doʻst: +1',
    nameRu: 'Младший товарищ: +1',
    formula: '+1 = +5 - 4',
    explanationUz: 'Agar 4 ga 1 qoʻshmoqchi boʻlsangiz: +5 toshini tushiring va barcha 4 toshni pastga tushiring.',
    explanationRu: 'Чтобы прибавить 1 к 4: опускаем 5 и убираем все 4 нижние косточки.',
    example: '4 + 1 = 5',
    stepsUz: ['1-qadam: Pastda 4 tosh koʻtarilgan', '2-qadam: +5 toshini tushiring', '3-qadam: 4 toshni birdan tushiring']
  },
  {
    id: 'sf_m4',
    nameUz: 'Kichik doʻst: -4',
    nameRu: 'Младший товарищ: -4',
    formula: '-4 = -5 + 1',
    explanationUz: 'Agar 4 ayirmoqchi boʻlsangiz: 5 toshini yuqoriga chiqaring va pastdan 1 toshni koʻtaring.',
    explanationRu: 'Чтобы вычесть 4: поднимаем 5 и добавляем 1 нижнюю косточку.',
    example: '5 - 4 = 1',
    stepsUz: ['1-qadam: 5 toshini yuqoriga suring', '2-qadam: 1 toshni yuqoriga koʻtaring']
  }
];

export const MATH_EXERCISES_DATA: MathProblem[] = [
  // Oddiy hisob (Простой счёт, 1-sinf)
  { id: 'ex_1', num1: 2, operation: '+', num2: 2, answer: 4, category: 'simple', formulaHintUz: 'Oddiy hisoblash: 2 ta toshga yana 2 ta pastki toshni koʻtaring', formulaHintRu: 'Простой счёт: поднимите ещё 2 косточки' },
  { id: 'ex_2', num1: 5, operation: '+', num2: 3, answer: 8, category: 'simple', formulaHintUz: '5 toshiga pastdagi 3 toshni qoʻshing', formulaHintRu: 'К косточке 5 добавьте 3 нижние косточки' },
  { id: 'ex_3', num1: 7, operation: '-', num2: 2, answer: 5, category: 'simple', formulaHintUz: '7 dan pastdagi 2 toshni olib tashlang, 5 qoladi', formulaHintRu: 'От 7 отнимите 2 нижние косточки' },
  { id: 'ex_4', num1: 3, operation: '+', num2: 1, answer: 4, category: 'simple', formulaHintUz: '3 ta toshga 1 ta tosh qoʻshing', formulaHintRu: 'К 3 косточкам добавьте 1' },
  { id: 'ex_5', num1: 9, operation: '-', num2: 4, answer: 5, category: 'simple', formulaHintUz: '9 toshdan (5 va 4) 4 toshni tushiring, 5 qoladi', formulaHintRu: 'От 9 уберите 4 нижние косточки' },
  { id: 'ex_6', num1: 6, operation: '+', num2: 3, answer: 9, category: 'simple', formulaHintUz: '6 ga 3 toshni qoʻshing = 9 boʻladi', formulaHintRu: 'К 6 прибавьте 3' },

  // Kichik doʻstlar formulalari (+5 formulalari)
  { id: 'ex_7', num1: 4, operation: '+', num2: 1, answer: 5, category: 'small_friends', formulaHintUz: '+1 = +5 - 4 (5 ni tushiring, 4 ni olib tashlang)', formulaHintRu: '+1 = +5 - 4 (опустите 5, уберите 4)' },
  { id: 'ex_8', num1: 2, operation: '+', num2: 3, answer: 5, category: 'small_friends', formulaHintUz: '+3 = +5 - 2 (5 ni tushiring, 2 ni olib tashlang)', formulaHintRu: '+3 = +5 - 2 (опустите 5, уберите 2)' },
  { id: 'ex_9', num1: 3, operation: '+', num2: 2, answer: 5, category: 'small_friends', formulaHintUz: '+2 = +5 - 3 (5 ni tushiring, 3 ni olib tashlang)', formulaHintRu: '+2 = +5 - 3 (опустите 5, уберите 3)' },
  { id: 'ex_10', num1: 1, operation: '+', num2: 4, answer: 5, category: 'small_friends', formulaHintUz: '+4 = +5 - 1 (5 ni tushiring, 1 ni olib tashlang)', formulaHintRu: '+4 = +5 - 1 (опустите 5, уберите 1)' },
  { id: 'ex_11', num1: 5, operation: '-', num2: 3, answer: 2, category: 'small_friends', formulaHintUz: '-3 = -5 + 2 (5 ni yuqoriga suring, 2 ni koʻtaring)', formulaHintRu: '-3 = -5 + 2 (поднимите 5, добавьте 2)' },
  { id: 'ex_12', num1: 5, operation: '-', num2: 2, answer: 3, category: 'small_friends', formulaHintUz: '-2 = -5 + 3 (5 ni yuqoriga suring, 3 ni koʻtaring)', formulaHintRu: '-2 = -5 + 3 (поднимите 5, добавьте 3)' },

  // Katta doʻstlar formulalari (10 ga oʻtish)
  { id: 'ex_13', num1: 9, operation: '+', num2: 1, answer: 10, category: 'big_friends', formulaHintUz: '+1 = +10 - 9 (Oʻnliklar ustuniga 1 qoʻshing, 9 ni olib tashlang)', formulaHintRu: '+1 = +10 - 9 (добавьте 1 десяток, уберите 9)' },
  { id: 'ex_14', num1: 8, operation: '+', num2: 2, answer: 10, category: 'big_friends', formulaHintUz: '+2 = +10 - 8 (10 ni qoʻshing, 8 ni olib tashlang)', formulaHintRu: '+2 = +10 - 8 (добавьте 1 десяток, уберите 8)' },
  { id: 'ex_15', num1: 7, operation: '+', num2: 4, answer: 11, category: 'big_friends', formulaHintUz: '+4 = +10 - 6 (10 ni qoʻshing, 6 ni olib tashlang)', formulaHintRu: '+4 = +10 - 6 (добавьте 10, отнимите 6)' },
  { id: 'ex_16', num1: 6, operation: '+', num2: 5, answer: 11, category: 'big_friends', formulaHintUz: '+5 = +10 - 5 (10 ni qoʻshing, 5 ni olib tashlang)', formulaHintRu: '+5 = +10 - 5 (добавьте 10, отнимите 5)' }
];

export const PET_HATS: PetHat[] = [
  { id: 'hat_cap', nameUz: 'Maktab kepkasi', nameRu: 'Школьная кепка', emoji: '🧢', cost: 30, requiredLevel: 1 },
  { id: 'hat_grad', nameUz: 'Talaba shlyapasi', nameRu: 'Академическая шапочка', emoji: '🎓', cost: 60, requiredLevel: 2 },
  { id: 'hat_crown', nameUz: 'Oltin toj', nameRu: 'Золотая корона', emoji: '👑', cost: 120, requiredLevel: 3 },
  { id: 'hat_glasses', nameUz: 'Bilimdon koʻzoynagi', nameRu: 'Очки умника', emoji: '👓', cost: 45, requiredLevel: 1 },
  { id: 'hat_wizard', nameUz: 'Sehrgar qalpoqchasi', nameRu: 'Шляпа волшебника', emoji: '🧙‍♂️', cost: 90, requiredLevel: 2 },
  { id: 'hat_space', nameUz: 'Koinot dubulgʻasi', nameRu: 'Космический шлем', emoji: '🧑‍🚀', cost: 150, requiredLevel: 4 }
];

export const BADGES_LIST: Badge[] = [
  { id: 'b_first', titleUz: 'Birinchi Qadam', titleRu: 'Первый шаг', descUz: 'Birinchi rus tili mashqini bajardingiz!', descRu: 'Выполнил первое упражнение по русскому!', icon: '🌟', unlocked: true },
  { id: 'b_soroban', titleUz: 'Soroban Bilimdoni', titleRu: 'Мастер Соробана', descUz: 'Abakusda 5 ta sonni toʻgʻri terdingiz', descRu: 'Собрал 5 чисел на соробане правильно', icon: '🧮', unlocked: false },
  { id: 'b_flash', titleUz: 'Flesh Chaqmoq', titleRu: 'Молния Анзан', descUz: 'Flesh-Anzanda tezkor hisoblash seriyasini yakunladingiz', descRu: 'Успешно завершил раунд Флеш-Анзан', icon: '⚡', unlocked: false },
  { id: 'b_syllables', titleUz: 'Boʻgʻinlar Ustasi', titleRu: 'Мастер Слогов', descUz: '10 ta soʻzni boʻgʻinlardan yigʻdingiz', descRu: 'Собрал 10 слов по слогам', icon: '📖', unlocked: false },
  { id: 'b_friend', titleUz: 'Gʻamxoʻr Doʻst', titleRu: 'Заботливый друг', descUz: 'Misha ayiqchasini ovqatlantirib xursand qildingiz', descRu: 'Покормил и порадовал мишку Мишу', icon: '🍯', unlocked: false },
  { id: 'b_streak3', titleUz: '3 Kunlik Zarbdor', titleRu: 'Ударник 3 дня', descUz: 'Ketma-ket 3 kun darslarni qoldirmadingiz', descRu: '3 дня подряд занимался без пропусков', icon: '🔥', unlocked: false }
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  { id: 'q_1', titleUz: 'Alifbodan 5 ta harfni tinglang va takrorlang', titleRu: 'Послушай и повтори 5 букв азбуки', rewardCoins: 15, targetCount: 5, currentCount: 0, completed: false, category: 'russian' },
  { id: 'q_2', titleUz: 'Sorobanda 3 ta sonni hosil qiling', titleRu: 'Построй 3 числа на соробане', rewardCoins: 20, targetCount: 3, currentCount: 0, completed: false, category: 'soroban' },
  { id: 'q_3', titleUz: 'Flesh-Anzan mashqida gʻalaba qozoning', titleRu: 'Пройди тренировку Флеш-Анзан', rewardCoins: 25, targetCount: 1, currentCount: 0, completed: false, category: 'math' }
];
