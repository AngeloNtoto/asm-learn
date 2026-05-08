import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  // Mod 1
  {
    id: 'fc-1',
    moduleId: 'mod1',
    front: 'A quoi sert l\'assembleur par rapport au C ou C++ ?',
    back: 'Il offre un contrôle direct sur le CPU et la mémoire, là où le C s\'abstrait légèrement de l\'architecture matérielle spécifique.',
  },
  {
    id: 'fc-2',
    moduleId: 'mod1',
    front: 'Est-ce que le code assembleur est portable ?',
    back: 'Non. Il est spécifique à une architecture (ex: l\'ASM x86 ne tourne pas sur ARM).',
  },
  // Mod 2
  {
    id: 'fc-3',
    moduleId: 'mod2',
    front: 'Quelle est la différence de taille entre RAX, EAX et AL ?',
    back: 'RAX = 64 bits. EAX = 32 bits (moitié basse). AL = 8 bits (octet le plus bas).',
  },
  {
    id: 'fc-4',
    moduleId: 'mod2',
    front: 'Dans quel sens grandit la pile (Stack) en mémoire ?',
    back: 'Vers le bas (vers les adresses plus petites). Un `push` décrémente le Stack Pointer (RSP).',
  },
  {
    id: 'fc-5',
    moduleId: 'mod2',
    front: 'Quel registre pointe vers le sommet de la pile ?',
    back: 'RSP (Stack Pointer).',
  },
  // Mod 3
  {
    id: 'fc-6',
    moduleId: 'mod3',
    front: 'Que fait l\'instruction `mov [rax], rbx` (syntaxe Intel) ?',
    back: 'Elle déréférence RAX: elle copie la valeur de RBX dans la mémoire à l\'adresse pointée par RAX.',
  },
  {
    id: 'fc-7',
    moduleId: 'mod3',
    front: 'Quelle instruction permet de multiplier par 2 de façon très optimisée ?',
    back: '`shl reg, 1` (Shift Left). Décaler les bits d\'une position vers la gauche équivaut à multiplier par 2.',
  },
  {
    id: 'fc-8',
    moduleId: 'mod3',
    front: 'Comment mettre rapidement un registre à zéro ?',
    back: 'En utilisant XOR sur lui-même (ex: `xor eax, eax`). C\'est plus court et souvent plus rapide que `mov eax, 0`.',
  },
  // Mod 4
  {
    id: 'fc-9',
    moduleId: 'mod4',
    front: 'Que fait l\'instruction `cmp` en réalité ?',
    back: 'Elle effectue une soustraction (op1 - op2) qu\'elle ne sauvegarde pas. Elle se contente de mettre à jour le registre d\'état (FLAGS).',
  },
  {
    id: 'fc-10',
    moduleId: 'mod4',
    front: 'Quelle est la différence entre `jmp` et `je` ?',
    back: '`jmp` saute de façon inconditionnelle. `je` (Jump if Equal) saute uniquement si le flag Zéro (Z) est activé suite à une comparaison.',
  },
  // Mod 5
  {
    id: 'fc-11',
    moduleId: 'mod5',
    front: 'Quelles sont les 3 phases principales d\'un compilateur (comme LLVM) ?',
    back: '1. Frontend (Code source vers IR)\n2. Middle-end (Optimisation de l\'IR)\n3. Backend (IR vers Assembleur cible).',
  },
  {
    id: 'fc-12',
    moduleId: 'mod5',
    front: 'Que signifie "IR" dans la compilation ?',
    back: 'Intermediate Representation (Représentation Intermédiaire). C\'est le format interne utilisé par le compilateur avant la génération du code final.',
  }
];
