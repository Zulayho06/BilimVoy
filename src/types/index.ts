export type Language = 'uz' | 'ru';

export type MainTab = 
  | 'alphabet' 
  | 'syllables' 
  | 'vocab' 
  | 'soroban' 
  | 'flash_anzan' 
  | 'math_formulas' 
  | 'pet' 
  | 'parent_dashboard';

export interface AlphabetLetter {
  letter: string;
  lower: string;
  name: string;
  sound: string;
  wordRu: string;
  wordUz: string;
  emoji: string;
  isVowel: boolean; // гласная или согласная
  color: string;
  syllables?: string[];
}

export interface SyllableExercise {
  id: string;
  word: string;
  syllables: string[];
  translationUz: string;
  emoji: string;
}

export interface VocabWord {
  id: string;
  category: 'school' | 'animals' | 'colors' | 'family' | 'food';
  wordRu: string;
  wordUz: string;
  transcription?: string;
  emoji: string;
  audioPrompt?: string;
}

export interface DialogueItem {
  id: string;
  titleUz: string;
  titleRu: string;
  lines: {
    speaker: 'Миша' | 'Ты';
    textRu: string;
    textUz: string;
  }[];
}

export interface SorobanColumnState {
  upperActive: boolean; // heaven bead (5) pulled down
  lowerCount: number;   // earth beads (1-4) pushed up
}

export interface MathProblem {
  id: string;
  num1: number;
  operation: '+' | '-';
  num2: number;
  answer: number;
  category: 'simple' | 'small_friends' | 'big_friends';
  formulaHintUz?: string;
  formulaHintRu?: string;
  sorobanTip?: string;
}

export interface FlashAnzanConfig {
  speedMs: number;
  digits: 1 | 2;
  stepCount: number;
  includeNegatives: boolean;
}

export interface PetState {
  name: string;
  level: number;
  xp: number;
  xpNeeded: number;
  happiness: number; // 0 - 100
  hunger: number;    // 0 - 100 (100 = full)
  selectedHat?: string;
  unlockedHats: string[];
}

export interface PetHat {
  id: string;
  nameUz: string;
  nameRu: string;
  emoji: string;
  cost: number;
  requiredLevel: number;
}

export interface Badge {
  id: string;
  titleUz: string;
  titleRu: string;
  descUz: string;
  descRu: string;
  icon: string;
  unlocked: boolean;
}

export interface DailyQuest {
  id: string;
  titleUz: string;
  titleRu: string;
  rewardCoins: number;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  category: 'russian' | 'math' | 'soroban';
}

export interface UserStats {
  russianExercisesDone: number;
  mathExercisesDone: number;
  flashAnzanCompleted: number;
  correctAnswersTotal: number;
  totalQuestionsAnswered: number;
  currentStreakDays: number;
  stars: number;
  coins: number;
}
