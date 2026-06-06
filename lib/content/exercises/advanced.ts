import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData } from '../../types';

export const advancedExercises: Exercise[] = [
  // --- MODULE 12 : Hardware ---
  {
    id: 'ex-mod12-1-1',
    type: 'quiz',
    question: 'Quel mot-clé C/C++ est OBLIGATOIRE lorsque l\'on manipule des registres de périphériques mappés en mémoire (MMIO) ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'inline' },
        { id: 'b', text: 'const' },
        { id: 'c', text: 'volatile' },
        { id: 'd', text: 'register' }
      ],
      correctId: 'c',
      explanation: 'volatile indique au compilateur que la valeur à cette adresse mémoire peut changer hors de son contrôle (par le hardware) et qu\'il ne doit SURTOUT PAS optimiser les lectures/écritures.'
    } as QuizData
  },
  {
    id: 'ex-mod12-2-1',
    type: 'quiz',
    question: 'Quelle pratique est formellement INTERDITE dans un gestionnaire d\'interruption (ISR) ?',
    difficulty: 'medium',
    xpReward: 20,
    data: {
      choices: [
        { id: 'a', text: 'Allumer une LED' },
        { id: 'b', text: 'Modifier une variable globale volatile' },
        { id: 'c', text: 'Mettre une fonction de délai (ex: delay(1000))' }
      ],
      correctId: 'c',
      explanation: 'Un ISR doit être le plus court possible. Si vous bloquez l\'exécution, le processeur entier se fige et rate toutes les autres interruptions.'
    } as QuizData
  },
  // --- MODULE 13 : SIMD ---
  {
    id: 'ex-mod13-1-1',
    type: 'quiz',
    question: 'Quelle est la principale source de plantages (crash) lors de l\'utilisation manuelle d\'instructions SIMD (AVX/SSE) ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'Une division par zéro.' },
        { id: 'b', text: 'Un mauvais alignement de la mémoire (ex: adresse non multiple de 16 ou 32 octets).' },
        { id: 'c', text: 'L\'utilisation de nombres négatifs.' }
      ],
      correctId: 'b',
      explanation: 'La plupart des instructions de chargement SIMD exigeaient un strict alignement mémoire pour maximiser la vitesse du bus. Si l\'adresse n\'est pas alignée, le CPU déclenche une exception de protection générale.'
    } as QuizData
  },
  // --- MODULE 14 : ABI ---
  {
    id: 'ex-mod14-1-1',
    type: 'quiz',
    question: 'Sous l\'ABI Windows x64, que doit absolument faire la fonction appelante (caller) juste avant un call ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Mettre RAX à 0' },
        { id: 'b', text: 'Allouer 32 octets sur la pile (Shadow Space)' },
        { id: 'c', text: 'Sauvegarder RBP' }
      ],
      correctId: 'b',
      explanation: 'Windows impose qu\'on réserve toujours 32 octets (sub rsp, 32) pour les 4 premiers paramètres, même si la fonction ne prend aucun paramètre !'
    } as QuizData
  },
  // --- MODULE 15 : Floats & Structs ---
  {
    id: 'ex-mod15-1-1',
    type: 'quiz',
    question: 'Sur les processeurs modernes, quels registres utilise-t-on pour les calculs en virgule flottante (Float) ?',
    difficulty: 'medium',
    xpReward: 20,
    data: {
      choices: [
        { id: 'a', text: 'RAX, RBX, RCX' },
        { id: 'b', text: 'ST0, ST1, ST2 (x87)' },
        { id: 'c', text: 'XMM0, XMM1, XMM2 (SSE)' }
      ],
      correctId: 'c',
      explanation: 'Aujourd\'hui, l\'ancien coprocesseur x87 est obsolète. Les compilateurs utilisent le jeu d\'instructions SSE avec les registres XMM (128 bits) pour le scalaire comme pour le vectoriel.'
    } as QuizData
  },
  {
    id: 'ex-mod15-2-1',
    type: 'quiz',
    question: 'Pourquoi le compilateur ajoute-t-il du "Padding" (octets vides) dans une structure C ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'Pour aligner les variables en mémoire et accélérer les accès CPU.' },
        { id: 'b', text: 'Pour détecter les Buffer Overflows.' },
        { id: 'c', text: 'Pour réserver de la place aux futures versions.' }
      ],
      correctId: 'a',
      explanation: 'Les accès mémoire désalignés coûtent très cher en cycles CPU, et causent même des plantages matériels sur les architectures ARM.'
    } as QuizData
  },
  // --- MODULE 16 : Securité ---
  {
    id: 'ex-mod16-1-1',
    type: 'quiz',
    question: 'Dans un Buffer Overflow basique, quelle valeur spécifique l\'attaquant cherche-t-il à écraser ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'L\'adresse de retour (Return Address)' },
        { id: 'b', text: 'Le pointeur de pile (RSP)' },
        { id: 'c', text: 'La variable "isAdmin"' }
      ],
      correctId: 'a',
      explanation: 'En écrasant l\'adresse de retour (sauvegardée juste en dessous du frame pointer), l\'instruction "ret" finira par exécuter le code de l\'attaquant.'
    } as QuizData
  },
  {
    id: 'ex-mod16-2-1',
    type: 'quiz',
    question: 'Le NX Bit (DEP) empêche d\'exécuter du code sur la pile. Comment l\'attaque ROP contourne-t-elle cela ?',
    difficulty: 'hard',
    xpReward: 50,
    data: {
      choices: [
        { id: 'a', text: 'Elle désactive l\'antivirus.' },
        { id: 'b', text: 'Elle enchaîne des "gadgets" (petits bouts de code valides existants) se terminant par RET.' },
        { id: 'c', text: 'Elle écrit le code directement sur le disque dur.' }
      ],
      correctId: 'b',
      explanation: 'Return-Oriented Programming (ROP) ne crée pas de nouveau code ; il réutilise le code légitime du programme ou de la libc dans un ordre malicieux.'
    } as QuizData
  },
  // --- MODULE 17 : Bootloader ---
  {
    id: 'ex-mod17-1-1',
    type: 'quiz',
    question: 'Quelle est la taille maximale d\'un bootloader BIOS (stage 1) logé dans le MBR ?',
    difficulty: 'easy',
    xpReward: 20,
    data: {
      choices: [
        { id: 'a', text: '1 Mégaoctet' },
        { id: 'b', text: '4 Kilooctets' },
        { id: 'c', text: '512 Octets' }
      ],
      correctId: 'c',
      explanation: 'Le Master Boot Record (MBR) ne fait que 512 octets (un seul secteur de disque). C\'est pour cela qu\'il est souvent écrit en assembleur pur.'
    } as QuizData
  }
];
