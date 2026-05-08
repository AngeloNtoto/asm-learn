'use client';
// ============================================================
// McuScript ASM Learning Platform — Zustand Store
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, ExerciseResult, FlashcardProgress, UserSnippet, UserNote } from './types';
import { getLevelFromXP, calculateStreak, BADGE_DEFINITIONS } from './utils';

interface AppState {
  // User Progress
  progress: UserProgress;
  
  // UI State
  sidebarOpen: boolean;
  searchOpen: boolean;
  currentModule: string | null;
  currentLesson: string | null;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSearchOpen: (open: boolean) => void;
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;

  // Progress Actions
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeExercise: (exerciseId: string, correct: boolean) => void;
  unlockBadge: (badgeId: string) => void;
  updateStreak: () => void;
  checkBadges: () => void;
  // Library Actions
  saveSnippet: (snippet: Omit<UserSnippet, 'id' | 'dateAdded'>) => void;
  deleteSnippet: (id: string) => void;
  saveNote: (note: Omit<UserNote, 'id' | 'dateAdded' | 'lastEdited'>) => void;
  
  // Flashcard Actions
  reviewFlashcard: (flashcardId: string, performance: 'again' | 'hard' | 'good' | 'easy') => void;

  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: new Date().toISOString(),
  completedLessons: [],
  completedExercises: [],
  exerciseResults: {},
  flashcardProgress: {},
  snippets: [],
  notes: [],
  badges: [],
  moduleProgress: {},
  totalCorrect: 0,
  totalAttempts: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      sidebarOpen: true,
      searchOpen: false,
      currentModule: null,
      currentLesson: null,

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSearchOpen: (open) => set({ searchOpen: open }),
      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),

      addXP: (amount) =>
        set((state) => {
          const newXP = state.progress.xp + amount;
          const newLevel = getLevelFromXP(newXP);
          return {
            progress: {
              ...state.progress,
              xp: newXP,
              level: newLevel.level,
            },
          };
        }),

      completeLesson: (lessonId) =>
        set((state) => {
          if (state.progress.completedLessons.includes(lessonId)) {
            return state;
          }
          const newCompleted = [...state.progress.completedLessons, lessonId];
          const moduleId = lessonId.split('-').slice(0, -1).join('-');
          const newModuleProgress = { ...state.progress.moduleProgress };
          
          return {
            progress: {
              ...state.progress,
              completedLessons: newCompleted,
              moduleProgress: newModuleProgress,
            },
          };
        }),

      completeExercise: (exerciseId, correct) =>
        set((state) => {
          const existing = state.progress.exerciseResults[exerciseId];
          const newResult: ExerciseResult = {
            correct: correct || (existing?.correct ?? false),
            attempts: (existing?.attempts ?? 0) + 1,
            lastAttempt: new Date().toISOString(),
          };

          const newResults = {
            ...state.progress.exerciseResults,
            [exerciseId]: newResult,
          };

          const newCompleted = correct && !state.progress.completedExercises.includes(exerciseId)
            ? [...state.progress.completedExercises, exerciseId]
            : state.progress.completedExercises;

          return {
            progress: {
              ...state.progress,
              exerciseResults: newResults,
              completedExercises: newCompleted,
              totalCorrect: state.progress.totalCorrect + (correct ? 1 : 0),
              totalAttempts: state.progress.totalAttempts + 1,
            },
          };
        }),

      unlockBadge: (badgeId) =>
        set((state) => {
          if (state.progress.badges.includes(badgeId)) return state;
          return {
            progress: {
              ...state.progress,
              badges: [...state.progress.badges, badgeId],
            },
          };
        }),

      updateStreak: () =>
        set((state) => {
          const { streak, isNewDay } = calculateStreak(
            state.progress.lastActiveDate,
            state.progress.streak
          );
          if (!isNewDay && state.progress.streak > 0) return state;
          return {
            progress: {
              ...state.progress,
              streak: streak,
              lastActiveDate: new Date().toISOString(),
            },
          };
        }),

      checkBadges: () => {
        const state = get();
        const { progress } = state;

        // Check each badge condition
        if (progress.completedLessons.length >= 1) state.unlockBadge('first-lesson');
        if (progress.completedLessons.length >= 5) state.unlockBadge('five-lessons');
        if (progress.completedExercises.length >= 10) state.unlockBadge('ten-exercises');
        if (progress.completedExercises.length >= 20) state.unlockBadge('twenty-exercises');
        if (progress.streak >= 3) state.unlockBadge('streak-3');
        if (progress.streak >= 7) state.unlockBadge('streak-7');
        if (progress.level >= 5) state.unlockBadge('level-5');
        if (progress.level >= 10) state.unlockBadge('level-10');

        // Check module completion badges
        const m2Lessons = progress.completedLessons.filter(l => l.startsWith('mod2'));
        if (m2Lessons.length >= 4) state.unlockBadge('register-master');
        const m3Lessons = progress.completedLessons.filter(l => l.startsWith('mod3'));
        if (m3Lessons.length >= 4) state.unlockBadge('instruction-guru');
        const m4Lessons = progress.completedLessons.filter(l => l.startsWith('mod4'));
        if (m4Lessons.length >= 4) state.unlockBadge('flow-controller');
        const m5Lessons = progress.completedLessons.filter(l => l.startsWith('mod5'));
        if (m5Lessons.length >= 1) state.unlockBadge('compiler-thinker');

        // Check for first perfect
        const hasFirstPerfect = Object.values(progress.exerciseResults).some(
          r => r.correct && r.attempts === 1
        );
        if (hasFirstPerfect) state.unlockBadge('first-perfect');
      },

      saveSnippet: (snippet) =>
        set((state) => ({
          progress: {
            ...state.progress,
            snippets: [
              ...state.progress.snippets,
              {
                ...snippet,
                id: `snip-${Date.now()}`,
                dateAdded: new Date().toISOString(),
              },
            ],
          },
        })),

      deleteSnippet: (id) =>
        set((state) => ({
          progress: {
            ...state.progress,
            snippets: state.progress.snippets.filter((s) => s.id !== id),
          },
        })),

      saveNote: (note) =>
        set((state) => {
          const existingIdx = state.progress.notes.findIndex((n) => n.lessonId === note.lessonId);
          let newNotes = [...state.progress.notes];
          
          if (existingIdx >= 0) {
            newNotes[existingIdx] = {
              ...newNotes[existingIdx],
              content: note.content,
              lastEdited: new Date().toISOString(),
            };
          } else {
            newNotes.push({
              ...note,
              id: `note-${Date.now()}`,
              dateAdded: new Date().toISOString(),
              lastEdited: new Date().toISOString(),
            });
          }
          
          return {
            progress: {
              ...state.progress,
              notes: newNotes,
            },
          };
        }),

      reviewFlashcard: (flashcardId, performance) =>
        set((state) => {
          const existing = state.progress.flashcardProgress[flashcardId] || { box: 0, nextReviewDate: new Date().toISOString() };
          
          let newBox = existing.box;
          if (performance === 'again') newBox = 0;
          else if (performance === 'hard') newBox = Math.max(0, newBox - 1);
          else if (performance === 'good') newBox = Math.min(5, newBox + 1);
          else if (performance === 'easy') newBox = Math.min(5, newBox + 2);

          // Calculate next review date based on box
          // Box 0: 10 mins (we'll just use today)
          // Box 1: 1 day
          // Box 2: 3 days
          // Box 3: 7 days
          // Box 4: 14 days
          // Box 5: 30 days
          const now = new Date();
          let daysToAdd = 0;
          if (newBox === 1) daysToAdd = 1;
          else if (newBox === 2) daysToAdd = 3;
          else if (newBox === 3) daysToAdd = 7;
          else if (newBox === 4) daysToAdd = 14;
          else if (newBox === 5) daysToAdd = 30;

          const nextDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

          return {
            progress: {
              ...state.progress,
              flashcardProgress: {
                ...state.progress.flashcardProgress,
                [flashcardId]: {
                  box: newBox,
                  nextReviewDate: nextDate.toISOString(),
                },
              },
            },
          };
        }),

      resetProgress: () => set({ progress: initialProgress }),
    }),
    {
      name: 'mcuscript-asm-progress',
      partialize: (state) => ({ progress: state.progress }),
    }
  )
);

// Re-export badge definitions for use in components
export { BADGE_DEFINITIONS };
