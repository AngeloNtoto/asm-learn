// ============================================================
// McuScript ASM Learning Platform — Type Definitions
// ============================================================

// ---- Module & Lesson Types ----

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  content: LessonContent;
  exercises: string[];
}

export interface LessonContent {
  simpleExplanation: string;
  deepExplanation: string;
  example: CodeExample;
  commonMistake: InfoBlock;
  practicalTip: InfoBlock;
  mcuscriptLink: string;
  thinkLikeMachine?: string;
  nextStepPreview?: string;
}

export interface CodeExample {
  title: string;
  code: string;
  language: 'asm' | 'pseudo' | 'ir' | 'cpp' | 'llvm' | 'c' | 'ascii' | 'js';
  explanation: string;
}

export interface InfoBlock {
  title: string;
  content: string;
}

// ---- Exercise Types ----

export type ExerciseType = 'quiz' | 'fill-blank' | 'drag-drop' | 'code-correction' | 'translation' | 'interactive-lab';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  data: QuizData | FillBlankData | DragDropData | CodeCorrectionData | TranslationData | InteractiveLabData;
}

export interface QuizData {
  choices: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

export interface FillBlankData {
  codeTemplate: string;        // Use __BLANK__ for blanks
  blanks: { id: string; answer: string; hint?: string }[];
  explanation: string;
}

export interface DragDropData {
  items: { id: string; text: string }[];
  correctOrder: string[];
  instruction: string;
  explanation: string;
}

export interface CodeCorrectionData {
  buggyCode: string;
  correctCode: string;
  hints: string[];
  explanation: string;
}

export interface TranslationData {
  sourceCode: string;
  sourceLanguage: 'pseudo' | 'asm' | 'ir';
  targetLanguage: 'pseudo' | 'asm' | 'ir';
  correctTranslation: string;
  acceptableVariations?: string[];
  explanation: string;
}

export interface InteractiveLabData {
  initialCode: string;
  targetState: {
    registers?: Partial<Record<keyof import('./emulator/types').Registers, number>>;
    flags?: Partial<Record<keyof import('./emulator/types').Flags, boolean>>;
  };
  instruction: string;
  explanation: string;
}

// ---- Gamification Types ----

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
}

export interface LevelThreshold {
  level: number;
  xpRequired: number;
  title: string;
}

// ---- Flashcard Types ----

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  moduleId: string;
}

export interface FlashcardProgress {
  box: number; // Leitner system box (0-5)
  nextReviewDate: string;
}

// ---- Library Types ----

export interface UserSnippet {
  id: string;
  code: string;
  language: 'asm' | 'pseudo' | 'ir' | 'cpp' | 'llvm' | 'c' | 'ascii' | 'js';
  lessonId: string;
  title?: string;
  dateAdded: string;
}

export interface UserNote {
  id: string;
  content: string;
  lessonId: string;
  dateAdded: string;
  lastEdited: string;
}

// ---- User Progress Types ----

export interface ExerciseResult {
  correct: boolean;
  attempts: number;
  lastAttempt: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  completedExercises: string[];
  exerciseResults: Record<string, ExerciseResult>;
  flashcardProgress: Record<string, FlashcardProgress>;
  snippets: UserSnippet[];
  notes: UserNote[];
  badges: string[];
  moduleProgress: Record<string, number>;
  totalCorrect: number;
  totalAttempts: number;
}

// ---- Glossary Types ----

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  related?: string[];
  example?: string;
}

// ---- Cheat Sheet Types ----

export interface CheatSheetCategory {
  id: string;
  title: string;
  instructions: CheatSheetInstruction[];
}

export interface CheatSheetInstruction {
  mnemonic: string;
  syntax: string;
  description: string;
  example?: string;
  flags?: string;
}

// ---- Search Types ----

export interface SearchResult {
  type: 'lesson' | 'glossary' | 'cheatsheet' | 'exercise';
  title: string;
  description: string;
  href: string;
  moduleId?: string;
}
