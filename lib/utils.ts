// ============================================================
// McuScript ASM Learning Platform — Utilities
// ============================================================

import { LevelThreshold } from './types';

// ---- Level System ----

export const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, xpRequired: 0, title: 'Novice' },
  { level: 2, xpRequired: 100, title: 'Apprenti' },
  { level: 3, xpRequired: 250, title: 'Initié' },
  { level: 4, xpRequired: 500, title: 'Étudiant' },
  { level: 5, xpRequired: 800, title: 'Praticien' },
  { level: 6, xpRequired: 1200, title: 'Technicien' },
  { level: 7, xpRequired: 1700, title: 'Développeur' },
  { level: 8, xpRequired: 2300, title: 'Ingénieur' },
  { level: 9, xpRequired: 3000, title: 'Expert' },
  { level: 10, xpRequired: 3800, title: 'Maître ASM' },
  { level: 11, xpRequired: 4800, title: 'Architecte' },
  { level: 12, xpRequired: 6000, title: 'Compilateur' },
  { level: 13, xpRequired: 7500, title: 'Créateur IR' },
  { level: 14, xpRequired: 9500, title: 'Maître LLVM' },
  { level: 15, xpRequired: 12000, title: 'Créateur de Langage' },
];

export function getLevelFromXP(xp: number): LevelThreshold {
  let currentLevel = LEVEL_THRESHOLDS[0];
  for (const threshold of LEVEL_THRESHOLDS) {
    if (xp >= threshold.xpRequired) {
      currentLevel = threshold;
    } else {
      break;
    }
  }
  return currentLevel;
}

export function getNextLevel(currentLevel: number): LevelThreshold | null {
  const idx = LEVEL_THRESHOLDS.findIndex(t => t.level === currentLevel);
  if (idx < LEVEL_THRESHOLDS.length - 1) {
    return LEVEL_THRESHOLDS[idx + 1];
  }
  return null;
}

export function getXPProgress(xp: number): { current: number; max: number; percentage: number } {
  const level = getLevelFromXP(xp);
  const nextLevel = getNextLevel(level.level);
  if (!nextLevel) {
    return { current: xp, max: xp, percentage: 100 };
  }
  const currentLevelXP = xp - level.xpRequired;
  const neededXP = nextLevel.xpRequired - level.xpRequired;
  return {
    current: currentLevelXP,
    max: neededXP,
    percentage: Math.min(100, Math.round((currentLevelXP / neededXP) * 100)),
  };
}

// ---- Badge Definitions ----

export const BADGE_DEFINITIONS = [
  { id: 'first-lesson', name: 'Premier Pas', description: 'Complétez votre première leçon', icon: '🚀', condition: 'Complete 1 lesson' },
  { id: 'first-perfect', name: 'Sans Faute', description: 'Répondez correctement du premier coup', icon: '✨', condition: 'Perfect score on first try' },
  { id: 'five-lessons', name: 'Étudiant Assidu', description: 'Complétez 5 leçons', icon: '📚', condition: 'Complete 5 lessons' },
  { id: 'ten-exercises', name: 'Pratiquant', description: 'Réussissez 10 exercices', icon: '💪', condition: 'Complete 10 exercises' },
  { id: 'register-master', name: 'Maître des Registres', description: 'Complétez le module Registres', icon: '🔧', condition: 'Complete Module 2' },
  { id: 'instruction-guru', name: 'Guru des Instructions', description: 'Complétez le module Instructions', icon: '⚡', condition: 'Complete Module 3' },
  { id: 'flow-controller', name: 'Contrôleur de Flux', description: 'Complétez le module Contrôle de Flux', icon: '🔀', condition: 'Complete Module 4' },
  { id: 'compiler-thinker', name: 'Penseur Compilateur', description: 'Commencez le module McuScript', icon: '🧠', condition: 'Start Module 5' },
  { id: 'streak-3', name: 'Régulier', description: 'Maintenez une série de 3 jours', icon: '🔥', condition: '3-day streak' },
  { id: 'streak-7', name: 'Déterminé', description: 'Maintenez une série de 7 jours', icon: '🌟', condition: '7-day streak' },
  { id: 'level-5', name: 'Praticien', description: 'Atteignez le niveau 5', icon: '🏅', condition: 'Reach level 5' },
  { id: 'level-10', name: 'Maître ASM', description: 'Atteignez le niveau 10', icon: '👑', condition: 'Reach level 10' },
  { id: 'all-modules', name: 'Architecte McuScript', description: 'Complétez tous les modules', icon: '🏆', condition: 'Complete all modules' },
  { id: 'twenty-exercises', name: 'Marathonien', description: 'Réussissez 20 exercices', icon: '🎯', condition: 'Complete 20 exercises' },
  { id: 'bit-wizard', name: 'Sorcier des Bits', description: 'Maîtrisez les opérations bit à bit', icon: '🪄', condition: 'Complete bit operations lesson' },
];

// ---- Streak Calculation ----

export function calculateStreak(lastActiveDate: string, currentStreak: number): { streak: number; isNewDay: boolean } {
  const now = new Date();
  const last = new Date(lastActiveDate);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const diffDays = Math.floor((today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { streak: currentStreak, isNewDay: false };
  } else if (diffDays === 1) {
    return { streak: currentStreak + 1, isNewDay: true };
  } else {
    return { streak: 1, isNewDay: true };
  }
}

// ---- Module Progress ----

export function calculateModuleProgress(
  moduleId: string,
  totalLessons: number,
  completedLessons: string[]
): number {
  const moduleLessons = completedLessons.filter(l => l.startsWith(moduleId));
  if (totalLessons === 0) return 0;
  return Math.round((moduleLessons.length / totalLessons) * 100);
}

// ---- Text Helpers ----

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ---- ASM Syntax Highlighting (basic) ----

export function highlightASM(code: string): string {
  const keywords = /\b(mov|add|sub|mul|div|inc|dec|push|pop|call|ret|jmp|je|jne|jg|jge|jl|jle|jz|jnz|cmp|test|and|or|xor|not|shl|shr|lea|nop|int|syscall|loop|xchg|neg|imul|idiv|cdq|movzx|movsx|cbw|cwd)\b/gi;
  const registers = /\b(rax|rbx|rcx|rdx|rsi|rdi|rsp|rbp|r8|r9|r10|r11|r12|r13|r14|r15|eax|ebx|ecx|edx|esi|edi|esp|ebp|ax|bx|cx|dx|al|bl|cl|dl|ah|bh|ch|dh|rip|rflags)\b/gi;
  const numbers = /\b(0x[0-9a-fA-F]+|\d+)\b/g;
  const comments = /(;.*$)/gm;
  const labels = /^(\w+:)/gm;
  const directives = /\b(section|global|extern|db|dw|dd|dq|resb|resw|resd|resq|equ|times)\b/gi;
  const strings = /(".*?"|'.*?')/g;

  return code
    .replace(strings, '<span class="asm-string">$1</span>')
    .replace(comments, '<span class="asm-comment">$1</span>')
    .replace(labels, '<span class="asm-label">$1</span>')
    .replace(directives, '<span class="asm-directive">$1</span>')
    .replace(keywords, '<span class="asm-keyword">$1</span>')
    .replace(registers, '<span class="asm-register">$1</span>')
    .replace(numbers, '<span class="asm-number">$1</span>');
}
