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
    back: '"Intermediate Representation" (Représentation Intermédiaire). C\'est un langage abstrait, indépendant de l\'architecture matérielle, utilisé par le compilateur pour optimiser le code avant de le traduire en assembleur spécifique.',
  },
  // Mod 6
  {
    id: 'fc-13',
    moduleId: 'mod6',
    front: 'Quel est l\'intérêt de l\'instruction `stepi` dans GDB ?',
    back: 'Elle permet d\'avancer l\'exécution d\'exactement UNE instruction assembleur, ce qui est parfait pour comprendre l\'effet microscopique sur les registres.',
  },
  // Mod 7
  {
    id: 'fc-14',
    moduleId: 'mod7',
    front: 'Pourquoi l\'instruction `cmov` (Conditional Move) est-elle meilleure qu\'un `jmp` pour les performances ?',
    back: 'Elle évite au processeur de faire une prédiction de branchement, ce qui empêche de vider le pipeline en cas d\'erreur de prédiction.',
  },
  // Mod 8
  {
    id: 'fc-15',
    moduleId: 'mod8',
    front: 'Quelle est la différence entre le Lexer et le Parser ?',
    back: 'Le Lexer transforme le texte en liste de Tokens (mots). Le Parser prend ces Tokens pour vérifier la grammaire et construire l\'AST (l\'arbre syntaxique).',
  },
  // Mod 9
  {
    id: 'fc-16',
    moduleId: 'mod9',
    front: 'Quel est le rôle d\'un nœud Phi (φ) dans la forme SSA ?',
    back: 'Il permet de choisir la bonne valeur d\'une variable en fonction du bloc d\'instructions d\'où provient l\'exécution (ex: après un if/else).',
  },
  // Mod 10
  {
    id: 'fc-17',
    moduleId: 'mod10',
    front: 'Qu\'est-ce que l\'Inlining (optimisation) ?',
    back: 'C\'est le fait de remplacer un appel de fonction directement par le corps de cette fonction, ce qui supprime le coût de l\'appel et débloque d\'autres optimisations.',
  },
  // Mod 11
  {
    id: 'fc-18',
    moduleId: 'mod11',
    front: 'Qu\'est-ce que le "Spilling" lors de l\'allocation de registres ?',
    back: 'C\'est lorsque le compilateur manque de registres physiques et doit temporairement sauvegarder des variables sur la pile (RAM), ce qui ralentit l\'exécution.',
  },
  // Mod 12
  {
    id: 'fc-19',
    moduleId: 'mod12',
    front: 'Pourquoi utiliser le mot-clé `volatile` en C/C++ pour l\'embarqué ?',
    back: 'Il empêche le compilateur d\'optimiser les lectures/écritures en mémoire, indispensable pour manipuler les registres matériels (MMIO) qui peuvent changer tout seuls.',
  },
  // Mod 13
  {
    id: 'fc-20',
    moduleId: 'mod13',
    front: 'Que signifie SIMD ?',
    back: 'Single Instruction, Multiple Data. Permet d\'exécuter la même opération (ex: addition) sur plusieurs données en parallèle avec de très grands registres (ex: XMM de 128 bits).',
  },
  // Mod 14
  {
    id: 'fc-21',
    moduleId: 'mod14',
    front: 'Quelle est la principale différence de passage d\'arguments entre l\'ABI Windows x64 et System V (Linux) ?',
    back: 'Windows utilise RCX, RDX, R8, R9 et exige 32 octets de "Shadow Space". Linux utilise RDI, RSI, RDX, RCX, R8, R9 sans Shadow Space.',
  },
  // Mod 15
  {
    id: 'fc-22',
    moduleId: 'mod15',
    front: 'Qu\'est-ce que le Padding dans une structure C ?',
    back: 'C\'est l\'ajout d\'octets invisibles par le compilateur pour garantir que chaque variable est correctement alignée en mémoire, accélérant ainsi les accès.',
  },
  // Mod 16
  {
    id: 'fc-23',
    moduleId: 'mod16',
    front: 'Dans un Buffer Overflow, quelle adresse spécifique l\'attaquant cherche-t-il à modifier ?',
    back: 'L\'adresse de retour (Return Address) stockée sur la pile, pour que l\'instruction `ret` saute vers son propre code.',
  },
  // Mod 17
  {
    id: 'fc-24',
    moduleId: 'mod17',
    front: 'Quelle est la contrainte principale d\'un bootloader BIOS dans le MBR ?',
    back: 'Il ne dispose que de 512 octets d\'espace et s\'exécute en mode réel 16-bits.',
  }
];
