import { Exercise, QuizData } from '../../types';

export const linuxExercises: Exercise[] = [
  {
    id: 'ex-mod18-1',
    type: 'quiz',
    question: 'Que se passe-t-il pour RAX si on écrit une valeur dans son sous-registre EAX (32 bits) ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Les 32 bits supérieurs de RAX restent intacts.' },
        { id: 'b', text: 'Les 32 bits supérieurs de RAX sont automatiquement mis à zéro pour éviter un "partial register stall".' },
        { id: 'c', text: 'Le processeur lève une exception de segmentation.' }
      ],
      correctId: 'b',
      explanation: 'C\'est une règle vitale de x86-64 : écrire dans un registre 32-bits efface toujours la moitié supérieure du registre 64-bits correspondant.'
    } as QuizData
  },
  {
    id: 'ex-mod19-1',
    type: 'quiz',
    question: 'Dans quelle section devez-vous placer une chaîne de caractères littérale comme "Hello World" pour éviter une erreur de segmentation ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: '.text' },
        { id: 'b', text: '.bss' },
        { id: 'c', text: '.rodata' }
      ],
      correctId: 'c',
      explanation: 'La section .rodata (Read-Only Data) est protégée en écriture par l\'OS, c\'est l\'endroit idéal pour les constantes.'
    } as QuizData
  },
  {
    id: 'ex-mod20-1',
    type: 'quiz',
    question: 'Quel registre doit contenir le "numéro" du syscall (ex: 1 pour sys_write) avant d\'appeler l\'instruction syscall ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'RDI' },
        { id: 'b', text: 'RCX' },
        { id: 'c', text: 'RAX' }
      ],
      correctId: 'c',
      explanation: 'RAX contient toujours le numéro d\'appel système, tandis que RDI, RSI, RDX contiennent les arguments.'
    } as QuizData
  },
  {
    id: 'ex-mod21-1',
    type: 'quiz',
    question: 'Si l\'on utilise "rep stosb" sans faire "cld" (Clear Direction Flag) au préalable, quel est le risque ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'Le registre RSI sera écrasé.' },
        { id: 'b', text: 'Le Direction Flag pourrait être à 1 (std), ce qui ferait reculer (décrémenter) le pointeur RDI au lieu d\'avancer, détruisant la mémoire en amont.' },
        { id: 'c', text: 'L\'instruction ignorera le registre RCX.' }
      ],
      correctId: 'b',
      explanation: 'Ne jamais présumer de l\'état du Direction Flag. Faites toujours un "cld" avant de copier ou remplir de la mémoire de gauche à droite.'
    } as QuizData
  },
  {
    id: 'ex-mod22-1',
    type: 'quiz',
    question: 'Pourquoi l\'instruction XCHG avec la mémoire est-elle cruciale pour le multithreading ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'Elle est garantie d\'être atomique par le CPU, empêchant deux cœurs d\'écraser la variable "verrou" simultanément.' },
        { id: 'b', text: 'Elle désactive les interruptions matérielles.' },
        { id: 'c', text: 'Elle est plus rapide qu\'un MOV.' }
      ],
      correctId: 'a',
      explanation: 'Sans instructions atomiques comme XCHG ou CMPXCHG, il serait impossible de synchroniser les threads en toute sécurité.'
    } as QuizData
  }
];
