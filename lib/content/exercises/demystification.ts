import { Exercise, QuizData } from '../../types';

export const demystificationExercises: Exercise[] = [
  {
    id: 'ex-mod23-1',
    type: 'quiz',
    question: 'Pourquoi l\'addition de deux entiers en Python est-elle significativement plus lente qu\'en C++ ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Parce que Python doit recompiler le code à chaque fois.' },
        { id: 'b', text: 'Parce que l\'addition Python alloue de nouveaux objets PyObject dynamiquement sur le tas.' },
        { id: 'c', text: 'Parce que Python utilise le registre RCX au lieu de RAX.' }
      ],
      correctId: 'b',
      explanation: 'Python ne modifie pas les nombres (ils sont immuables), il crée de nouvelles structures complexes sur le Tas pour chaque résultat.'
    } as QuizData
  },
  {
    id: 'ex-mod23-2',
    type: 'quiz',
    question: 'Quel est l\'avantage principal de la contiguïté mémoire d\'un std::vector ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Il peut stocker des types hétérogènes.' },
        { id: 'b', text: 'Il permet au Cache L1 du CPU de pré-charger efficacement les données adjacentes.' },
        { id: 'c', text: 'Il est automatiquement géré par le Garbage Collector.' }
      ],
      correctId: 'b',
      explanation: 'La prédictibilité du Scale-Index-Base en ASM évite les ralentissements dus au "Cache Miss".'
    } as QuizData
  },
  {
    id: 'ex-mod24-1',
    type: 'quiz',
    question: 'Quelle instruction x86 est généralement générée pour un if(a == b) en C++ sur des entiers ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'call __eq__' },
        { id: 'b', text: 'cmp suivi d\'un saut conditionnel (ex: je)' },
        { id: 'c', text: 'xchg eax, ebx' }
      ],
      correctId: 'b',
      explanation: 'Le C++ se traduit par des instructions natives et directes, contrairement au Dynamic Dispatch lent.'
    } as QuizData
  },
  {
    id: 'ex-mod24-2',
    type: 'quiz',
    question: 'Comment le mot-clé yield permet-il de suspendre une fonction en Python ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'En mettant le CPU en veille (hlt).' },
        { id: 'b', text: 'En sauvegardant la Stack Frame complète sur le Tas (Heap) pour y revenir plus tard.' },
        { id: 'c', text: 'En convertissant le code en bytecode C.' }
      ],
      correctId: 'b',
      explanation: 'La sauvegarde de la Frame (Instruction pointer + variables locales) est la clé des coroutines/générateurs.'
    } as QuizData
  },
  {
    id: 'ex-mod25-1',
    type: 'quiz',
    question: 'Que se passerait-il si print() effectuait un syscall sys_write pour chaque caractère ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Le texte s\'afficherait en majuscules.' },
        { id: 'b', text: 'Les performances s\'effondreraient à cause du changement de contexte (Context Switch) vers le noyau (Kernel).' },
        { id: 'c', text: 'L\'écran clignoterait très vite.' }
      ],
      correctId: 'b',
      explanation: 'Le buffering en RAM par la libc évite ces milliers de Context Switches coûteux.'
    } as QuizData
  },
  {
    id: 'ex-mod26-1',
    type: 'quiz',
    question: 'Que fait l\'OS (libunwind) lorsqu\'une exception C++ est levée avec "throw" ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'Il lit une table secrète générée par le compilateur pour remonter la pile, détruire les variables locales, et trouver le bon bloc catch.' },
        { id: 'b', text: 'Il affiche une popup d\'erreur bleue.' },
        { id: 'c', text: 'Il appelle la fonction main() depuis le début.' }
      ],
      correctId: 'a',
      explanation: 'Ce processus complexe s\'appelle le "Stack Unwinding". C\'est ce qui rend le throw très lent, bien qu\'il n\'ait aucun coût s\'il n\'est pas déclenché (Zéro-overhead).'
    } as QuizData
  },
  {
    id: 'ex-mod27-1',
    type: 'quiz',
    question: 'Qu\'est-ce qui permet à une variable capturée par une fonction Lambda de survivre à la fin de la fonction appelante ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'Elle est sauvegardée dans le registre RDI pour l\'éternité.' },
        { id: 'b', text: 'La closure est en fait un objet alloué sur le Tas (Heap) qui emporte une copie ou référence de cette variable avec elle.' },
        { id: 'c', text: 'Elle est convertie en instruction CONST.' }
      ],
      correctId: 'b',
      explanation: 'Les fonctions anonymes encapsulent le code et les variables capturées dans un véritable objet.'
    } as QuizData
  },
  {
    id: 'ex-mod27-2',
    type: 'quiz',
    question: 'Comment C++ gère-t-il les appels de méthodes virtuelles (Polymorphisme) au niveau machine ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: 'En recherchant le nom de la fonction dans un dictionnaire (__dict__) à l\'exécution.' },
        { id: 'b', text: 'En utilisant un pointeur caché dans l\'objet qui lit l\'adresse de la fonction dans une Table Virtuelle (VTable).' },
        { id: 'c', text: 'En utilisant une instruction syscall spéciale.' }
      ],
      correctId: 'b',
      explanation: 'Le VTable pointer (vptr) permet des appels indirects ultra-rapides (`call [rax + offset]`), contrairement au Duck Typing de Python qui nécessite une lourde recherche de dictionnaire.'
    } as QuizData
  }
];
