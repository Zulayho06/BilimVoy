import { AlphabetLetter, SyllableExercise, VocabWord, DialogueItem } from '../types';

export const RUSSIAN_ALPHABET: AlphabetLetter[] = [
  { letter: 'А', lower: 'а', name: 'А', sound: '[а]', wordRu: 'АРБУЗ', wordUz: 'Tarvuz', emoji: '🍉', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['АР', 'БУЗ'] },
  { letter: 'Б', lower: 'б', name: 'Бэ', sound: '[б]', wordRu: 'БАБОЧКА', wordUz: 'Kapalak', emoji: '🦋', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['БА', 'БОЧ', 'КА'] },
  { letter: 'В', lower: 'в', name: 'Вэ', sound: '[в]', wordRu: 'ВОЛК', wordUz: 'Boʻri', emoji: '🐺', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ВОЛК'] },
  { letter: 'Г', lower: 'г', name: 'Гэ', sound: '[г]', wordRu: 'ГРИБ', wordUz: 'Qoʻziqorin', emoji: '🍄', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ГРИБ'] },
  { letter: 'Д', lower: 'д', name: 'Дэ', sound: '[д]', wordRu: 'ДОМ', wordUz: 'Uy', emoji: '🏠', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ДОМ'] },
  { letter: 'Е', lower: 'е', name: 'Е', sound: '[йэ]', wordRu: 'ЕНОТ', wordUz: 'Yenot', emoji: '🦝', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['Е', 'НОТ'] },
  { letter: 'Ё', lower: 'ё', name: 'Ё', sound: '[йо]', wordRu: 'ЁЖИК', wordUz: 'Kirpi', emoji: '🦔', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['Ё', 'ЖИК'] },
  { letter: 'Ж', lower: 'ж', name: 'Жэ', sound: '[ж]', wordRu: 'ЖИРАФ', wordUz: 'Jirafa', emoji: '🦒', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ЖИ', 'РАФ'] },
  { letter: 'З', lower: 'з', name: 'Зэ', sound: '[з]', wordRu: 'ЗАЯЦ', wordUz: 'Quyon', emoji: '🐰', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ЗА', 'ЯЦ'] },
  { letter: 'И', lower: 'и', name: 'И', sound: '[и]', wordRu: 'ИГЛА', wordUz: 'Igna', emoji: '🪡', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['ИГ', 'ЛА'] },
  { letter: 'Й', lower: 'й', name: 'И краткое', sound: '[й]', wordRu: 'ЙОГУРТ', wordUz: 'Yogurt', emoji: '🍦', isVowel: false, color: 'from-amber-500 to-orange-500', syllables: ['ЙО', 'ГУРТ'] },
  { letter: 'К', lower: 'к', name: 'Ка', sound: '[к]', wordRu: 'КОТ', wordUz: 'Mushuk', emoji: '🐱', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['КОТ'] },
  { letter: 'Л', lower: 'л', name: 'Эль', sound: '[л]', wordRu: 'ЛИСА', wordUz: 'Tulki', emoji: '🦊', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ЛИ', 'СА'] },
  { letter: 'М', lower: 'м', name: 'Эм', sound: '[м]', wordRu: 'МЕДВЕДЬ', wordUz: 'Ayiq', emoji: '🐻', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['МЕД', 'ВЕДЬ'] },
  { letter: 'Н', lower: 'н', name: 'Эн', sound: '[н]', wordRu: 'НОСОРОГ', wordUz: 'Karkidon', emoji: '🦏', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['НО', 'СО', 'РОГ'] },
  { letter: 'О', lower: 'о', name: 'О', sound: '[о]', wordRu: 'ОБЕЗЬЯНА', wordUz: 'Maymun', emoji: '🐵', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['О', 'БЕЗЬ', 'Я', 'НА'] },
  { letter: 'П', lower: 'п', name: 'Пэ', sound: '[п]', wordRu: 'ПИНГВИН', wordUz: 'Pingvin', emoji: '🐧', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ПИНГ', 'ВИН'] },
  { letter: 'Р', lower: 'р', name: 'Эр', sound: '[р]', wordRu: 'РЫБА', wordUz: 'Baliq', emoji: '🐟', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['РЫ', 'БА'] },
  { letter: 'С', lower: 'с', name: 'Эс', sound: '[с]', wordRu: 'СОБАКА', wordUz: 'It', emoji: '🐶', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['СО', 'БА', 'КА'] },
  { letter: 'Т', lower: 'т', name: 'Тэ', sound: '[т]', wordRu: 'ТИГР', wordUz: 'Yoʻlbars', emoji: '🐯', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ТИГР'] },
  { letter: 'У', lower: 'у', name: 'У', sound: '[у]', wordRu: 'УТКА', wordUz: 'Oʻrdak', emoji: '🦆', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['УТ', 'КА'] },
  { letter: 'Ф', lower: 'ф', name: 'Эф', sound: '[ф]', wordRu: 'ФЛАМИНГО', wordUz: 'Flamingo', emoji: '🦩', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ФЛА', 'МИН', 'ГО'] },
  { letter: 'Х', lower: 'х', name: 'Ха', sound: '[х]', wordRu: 'ХОМЯК', wordUz: 'Xomyak', emoji: '🐹', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ХОМ', 'ЯК'] },
  { letter: 'Ц', lower: 'ц', name: 'Цэ', sound: '[ц]', wordRu: 'ЦЫПЛЁНОК', wordUz: 'Joʻja', emoji: '🐥', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ЦЫП', 'ЛЁ', 'НОК'] },
  { letter: 'Ч', lower: 'ч', name: 'Че', sound: '[ч]', wordRu: 'ЧЕРЕПАХА', wordUz: 'Toshbaqa', emoji: '🐢', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ЧЕ', 'РЕ', 'ПА', 'ХА'] },
  { letter: 'Ш', lower: 'ш', name: 'Ша', sound: '[ш]', wordRu: 'ШАРИК', wordUz: 'Shar', emoji: '🎈', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ША', 'РИК'] },
  { letter: 'Щ', lower: 'щ', name: 'Ща', sound: '[щ]', wordRu: 'ЩУКА', wordUz: 'Choʻrtanbaliq', emoji: '🐠', isVowel: false, color: 'from-sky-500 to-blue-600', syllables: ['ЩУ', 'КА'] },
  { letter: 'Ъ', lower: 'ъ', name: 'Твёрдый знак', sound: '[-]', wordRu: 'ПОДЪЕЗД', wordUz: 'Kirish yoʻlagi', emoji: '🚪', isVowel: false, color: 'from-slate-500 to-gray-600', syllables: ['ПОДЪ', 'ЕЗД'] },
  { letter: 'Ы', lower: 'ы', name: 'Ы', sound: '[ы]', wordRu: 'СЫР', wordUz: 'Pishloq', emoji: '🧀', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['СЫР'] },
  { letter: 'Ь', lower: 'ь', name: 'Мягкий знак', sound: '[-]', wordRu: 'МЕДВЕДЬ', wordUz: 'Yumshatish belgisi', emoji: '🧸', isVowel: false, color: 'from-slate-500 to-gray-600', syllables: ['МЕД', 'ВЕДЬ'] },
  { letter: 'Э', lower: 'э', name: 'Э', sound: '[э]', wordRu: 'ЭКСКАВАТОР', wordUz: 'Ekskavator', emoji: '🚜', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['ЭКС', 'КА', 'ВА', 'ТОР'] },
  { letter: 'Ю', lower: 'ю', name: 'Ю', sound: '[йу]', wordRu: 'ЮЛА', wordUz: 'Pirpirak', emoji: '🪀', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['Ю', 'ЛА'] },
  { letter: 'Я', lower: 'я', name: 'Я', sound: '[йа]', wordRu: 'ЯБЛОКО', wordUz: 'Olma', emoji: '🍎', isVowel: true, color: 'from-rose-500 to-red-500', syllables: ['ЯБ', 'ЛО', 'КО'] }
];

export const SYLLABLE_EXERCISES: SyllableExercise[] = [
  { id: 'syl_1', word: 'МАМА', syllables: ['МА', 'МА'], translationUz: 'Ona / oyi', emoji: '👩' },
  { id: 'syl_2', word: 'ПАПА', syllables: ['ПА', 'ПА'], translationUz: 'Ota / dada', emoji: '👨' },
  { id: 'syl_3', word: 'МИША', syllables: ['МИ', 'ША'], translationUz: 'Misha (Ayiqcha)', emoji: '🐻' },
  { id: 'syl_4', word: 'ЛУНА', syllables: ['ЛУ', 'НА'], translationUz: 'Oy (osmonda)', emoji: '🌙' },
  { id: 'syl_5', word: 'ШКОЛА', syllables: ['ШКО', 'ЛА'], translationUz: 'Maktab', emoji: '🏫' },
  { id: 'syl_6', word: 'КНИГА', syllables: ['КНИ', 'ГА'], translationUz: 'Kitob', emoji: '📚' },
  { id: 'syl_7', word: 'РУЧКА', syllables: ['РУЧ', 'КА'], translationUz: 'Ruchka', emoji: '🖊️' },
  { id: 'syl_8', word: 'ВОДА', syllables: ['ВО', 'ДА'], translationUz: 'Suv', emoji: '💧' },
  { id: 'syl_9', word: 'КАША', syllables: ['КА', 'ША'], translationUz: 'Boʻtqa', emoji: '🥣' },
  { id: 'syl_10', word: 'ДЕТИ', syllables: ['ДЕ', 'ТИ'], translationUz: 'Bolalar', emoji: '👧' },
  { id: 'syl_11', word: 'МЯЧИК', syllables: ['МЯ', 'ЧИК'], translationUz: 'Koptok', emoji: '⚽' },
  { id: 'syl_12', word: 'РЫБА', syllables: ['РЫ', 'БА'], translationUz: 'Baliq', emoji: '🐟' },
  { id: 'syl_13', word: 'СОЛНЦЕ', syllables: ['СОЛН', 'ЦЕ'], translationUz: 'Quyosh', emoji: '☀️' },
  { id: 'syl_14', word: 'ЗИМА', syllables: ['ЗИ', 'МА'], translationUz: 'Qish', emoji: '❄️' }
];

export const VOCABULARY_WORDS: VocabWord[] = [
  // Maktab anjomlari (Школа)
  { id: 'sch_1', category: 'school', wordRu: 'РУЧКА', wordUz: 'Ruchka', emoji: '🖊️', transcription: 'ruch-ka' },
  { id: 'sch_2', category: 'school', wordRu: 'КАРАНДАШ', wordUz: 'Qalam', emoji: '✏️', transcription: 'ka-ran-dash' },
  { id: 'sch_3', category: 'school', wordRu: 'ТЕТРАДЬ', wordUz: 'Daftar', emoji: '📓', transcription: 'tet-rad' },
  { id: 'sch_4', category: 'school', wordRu: 'ПОРТФЕЛЬ', wordUz: 'Portfel / Sumka', emoji: '🎒', transcription: 'port-fel' },
  { id: 'sch_5', category: 'school', wordRu: 'КНИГА', wordUz: 'Kitob', emoji: '📖', transcription: 'kni-ga' },
  { id: 'sch_6', category: 'school', wordRu: 'ЛИНЕЙКА', wordUz: 'Chizgʻich', emoji: '📏', transcription: 'li-ney-ka' },
  { id: 'sch_7', category: 'school', wordRu: 'ЛАСТИК', wordUz: 'Oʻchirgʻich', emoji: '🧼', transcription: 'las-tik' },
  { id: 'sch_8', category: 'school', wordRu: 'УЧИТЕЛЬ', wordUz: 'Oʻqituvchi', emoji: '👩‍🏫', transcription: 'u-chi-tel' },

  // Hayvonlar (Животные)
  { id: 'ani_1', category: 'animals', wordRu: 'СОБАКА', wordUz: 'It', emoji: '🐕', transcription: 'sa-ba-ka' },
  { id: 'ani_2', category: 'animals', wordRu: 'КОШКА', wordUz: 'Mushuk', emoji: '🐈', transcription: 'kosh-ka' },
  { id: 'ani_3', category: 'animals', wordRu: 'МЕДВЕДЬ', wordUz: 'Ayiq', emoji: '🐻', transcription: 'med-ved' },
  { id: 'ani_4', category: 'animals', wordRu: 'ЗАЯЦ', wordUz: 'Quyon', emoji: '🐇', transcription: 'za-yats' },
  { id: 'ani_5', category: 'animals', wordRu: 'ЛИСА', wordUz: 'Tulki', emoji: '🦊', transcription: 'li-sa' },
  { id: 'ani_6', category: 'animals', wordRu: 'ЛОШАДЬ', wordUz: 'Ot', emoji: '🐎', transcription: 'lo-shad' },
  { id: 'ani_7', category: 'animals', wordRu: 'ПТИЦА', wordUz: 'Qush', emoji: '🐦', transcription: 'pti-tsa' },

  // Ranglar (Цвета)
  { id: 'col_1', category: 'colors', wordRu: 'КРАСНЫЙ', wordUz: 'Qizil', emoji: '🔴', transcription: 'kras-ny' },
  { id: 'col_2', category: 'colors', wordRu: 'СИНИЙ', wordUz: 'Koʻk', emoji: '🔵', transcription: 'si-niy' },
  { id: 'col_3', category: 'colors', wordRu: 'ЗЕЛЁНЫЙ', wordUz: 'Yashil', emoji: '🟢', transcription: 'ze-lyo-ny' },
  { id: 'col_4', category: 'colors', wordRu: 'ЖЁЛТЫЙ', wordUz: 'Sariq', emoji: '🟡', transcription: 'zhol-ty' },
  { id: 'col_5', category: 'colors', wordRu: 'БЕЛЫЙ', wordUz: 'Oq', emoji: '⚪', transcription: 'be-ly' },
  { id: 'col_6', category: 'colors', wordRu: 'ЧЁРНЫЙ', wordUz: 'Qora', emoji: '⚫', transcription: 'chyor-ny' },
  { id: 'col_7', category: 'colors', wordRu: 'ОРАНЖЕВЫЙ', wordUz: 'Toʻq sariq (Sabzirang)', emoji: '🟠', transcription: 'a-ran-zhe-vy' },

  // Oila (Семья)
  { id: 'fam_1', category: 'family', wordRu: 'МАМА', wordUz: 'Ona', emoji: '👩', transcription: 'ma-ma' },
  { id: 'fam_2', category: 'family', wordRu: 'ПАПА', wordUz: 'Ota', emoji: '👨', transcription: 'pa-pa' },
  { id: 'fam_3', category: 'family', wordRu: 'БРАТ', wordUz: 'Aka / Uka', emoji: '👦', transcription: 'brat' },
  { id: 'fam_4', category: 'family', wordRu: 'СЕСТРА', wordUz: 'Opa / Singil', emoji: '👧', transcription: 'ses-tra' },
  { id: 'fam_5', category: 'family', wordRu: 'БАБУШКА', wordUz: 'Buvijon', emoji: '👵', transcription: 'ba-bush-ka' },
  { id: 'fam_6', category: 'family', wordRu: 'ДЕDUШКА', wordUz: 'Bobojon', emoji: '👴', transcription: 'de-dush-ka' },

  // Meva va Oziq-ovqat (Еда и Фрукты)
  { id: 'foo_1', category: 'food', wordRu: 'ЯБЛОКО', wordUz: 'Olma', emoji: '🍎', transcription: 'yab-la-ka' },
  { id: 'foo_2', category: 'food', wordRu: 'БАНАН', wordUz: 'Banan', emoji: '🍌', transcription: 'ba-nan' },
  { id: 'foo_3', category: 'food', wordRu: 'ХЛЕБ', wordUz: 'Non', emoji: '🍞', transcription: 'khleb' },
  { id: 'foo_4', category: 'food', wordRu: 'МОЛОКО', wordUz: 'Sut', emoji: '🥛', transcription: 'ma-la-ko' },
  { id: 'foo_5', category: 'food', wordRu: 'МОРКОВЬ', wordUz: 'Sabzi', emoji: '🥕', transcription: 'mar-kov' },
  { id: 'foo_6', category: 'food', wordRu: 'СЫР', wordUz: 'Pishloq', emoji: '🧀', transcription: 'syr' }
];

export const DIALOGUES: DialogueItem[] = [
  {
    id: 'dia_1',
    titleUz: 'Tanishuv (Знакомство)',
    titleRu: 'Знакомство в классе',
    lines: [
      { speaker: 'Миша', textRu: 'Привет! Как тебя зовут?', textUz: 'Salom! Isming nima?' },
      { speaker: 'Ты', textRu: 'Привет! Меня зовут Азиз.', textUz: 'Salom! Mening ismim Aziz.' },
      { speaker: 'Миша', textRu: 'Очень приятно! В каком ты классе?', textUz: 'Juda xursandman! Nechanchi sinfda oʻqiysan?' },
      { speaker: 'Ты', textRu: 'Я учусь в первом классе!', textUz: 'Men birinchi sinfda oʻqiyman!' }
    ]
  },
  {
    id: 'dia_2',
    titleUz: 'Maktabda (В школе)',
    titleRu: 'На уроке в школе',
    lines: [
      { speaker: 'Миша', textRu: 'У тебя есть карандаш?', textUz: 'Sendada qalam bormi?' },
      { speaker: 'Ты', textRu: 'Да, вот, пожалуйста!', textUz: 'Ha, mana, marhamat!' },
      { speaker: 'Миша', textRu: 'Большое спасибо!', textUz: 'Katta rahmat!' },
      { speaker: 'Ты', textRu: 'Не за что!', textUz: 'Arzimaydi!' }
    ]
  },
  {
    id: 'dia_3',
    titleUz: 'Raqamlar va Yosh (Возраст)',
    titleRu: 'Сколько тебе лет?',
    lines: [
      { speaker: 'Миша', textRu: 'Сколько тебе лет?', textUz: 'Yoshing nechada?' },
      { speaker: 'Ты', textRu: 'Мне семь лет.', textUz: 'Men yetti yoshdaman.' },
      { speaker: 'Миша', textRu: 'Ты любишь математику?', textUz: 'Matematikani yaxshi koʻrasanmi?' },
      { speaker: 'Ты', textRu: 'Да, я считаю на соробане очень быстро!', textUz: 'Ha, men sorobanda juda tez hisoblayman!' }
    ]
  }
];
