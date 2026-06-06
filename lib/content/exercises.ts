import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData } from '../types';

export const EXERCISES: Exercise[] = [
  // Mod 1: Intro
  {
    id: 'ex-mod1-1-1',
    type: 'quiz',
    question: 'Quelle est la relation entre une instruction assembleur et une instruction machine ?',
    difficulty: 'easy',
    xpReward: 20,
    data: {
      choices: [
        { id: 'c1', text: 'Une instruction ASM génère plusieurs centaines d\'instructions machine.' },
        { id: 'c2', text: 'Il y a généralement une correspondance de 1 pour 1.' },
        { id: 'c3', text: 'L\'assembleur est exécuté directement sans être traduit en machine.' },
        { id: 'c4', text: 'Une instruction machine génère plusieurs instructions ASM.' }
      ],
      correctId: 'c2',
      explanation: 'L\'assembleur est simplement une représentation lisible par l\'homme du code machine. Chaque mnémonique (comme `mov`) correspond directement à un opcode binaire spécifique pour le processeur.'
    }
  },
  {
    id: 'ex-mod1-1-2',
    type: 'code-correction',
    question: 'Ce développeur essaie de déplacer la valeur 42 dans le registre eax, mais le code est invalide en syntaxe Intel. Trouvez l\'erreur.',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      buggyCode: 'mov 42, eax',
      correctCode: 'mov eax, 42',
      hints: ['Rappelez-vous l\'ordre : destination, puis source.', 'Où voulez-vous mettre la valeur ?'],
      explanation: 'En syntaxe Intel, la destination est toujours le premier opérande, et la source est le second. On lit "Move into eax the value 42".'
    }
  },
  {
    id: 'ex-mod1-2-1',
    type: 'translation',
    question: 'Traduisez cette opération simple en assembleur x86 (syntaxe Intel).',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      sourceCode: 'x = 100',
      sourceLanguage: 'pseudo',
      targetLanguage: 'asm',
      correctTranslation: 'mov eax, 100',
      acceptableVariations: ['mov rax, 100', 'mov rbx, 100', 'mov ebx, 100', 'mov rcx, 100', 'mov eax,100'],
      explanation: 'L\'affectation de base se fait avec l\'instruction `mov`, en plaçant la valeur immédiate dans un registre (comme eax ou rax).'
    }
  },

  // Mod 2: Registres et Mémoire
  {
    id: 'ex-mod2-1-1',
    type: 'quiz',
    question: 'Quelle est la principale différence entre la mémoire RAM et les registres du CPU ?',
    difficulty: 'easy',
    xpReward: 20,
    data: {
      choices: [
        { id: 'c1', text: 'Les registres sont plus grands mais plus lents que la RAM.' },
        { id: 'c2', text: 'Les registres sont beaucoup plus rapides mais en quantité très limitée à l\'intérieur du CPU.' },
        { id: 'c3', text: 'Il n\'y a aucune différence, ce sont deux mots pour la même chose.' },
        { id: 'c4', text: 'La RAM est dans le CPU, les registres sont sur la carte mère.' }
      ],
      correctId: 'c2',
      explanation: 'Les registres opèrent à la vitesse du CPU (accès presque instantané), mais un processeur x86-64 n\'a que 16 registres généraux principaux, alors qu\'il peut y avoir des milliards d\'octets de RAM.'
    }
  },
  {
    id: 'ex-mod2-1-2',
    type: 'drag-drop',
    question: 'Associez chaque taille de registre x86 à son nom correspondant (basé sur la famille A).',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      items: [
        { id: 'i1', text: '64 bits' },
        { id: 'i2', text: '32 bits' },
        { id: 'i3', text: '16 bits' },
        { id: 'i4', text: '8 bits (bas)' }
      ],
      correctOrder: ['rax', 'eax', 'ax', 'al'],
      instruction: 'Classez du plus grand (64 bits) au plus petit (8 bits).',
      explanation: 'Historiquement : AX (16-bit) -> Extended EAX (32-bit) -> Register RAX (64-bit). AL est la moitié basse (Low) de AX.'
    }
  },
  {
    id: 'ex-mod2-2-1',
    type: 'fill-blank',
    question: 'Complétez ce code pour sauvegarder la valeur de rax sur la pile, la modifier, puis la restaurer à son état initial.',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      codeTemplate: 'mov rax, 500\n__BLANK__ rax  ; Sauvegarde\nmov rax, 0\n__BLANK__ rax  ; Restauration',
      blanks: [
        { id: 'b1', answer: 'push', hint: 'Met sur la pile' },
        { id: 'b2', answer: 'pop', hint: 'Retire de la pile' }
      ],
      explanation: '`push` met une valeur au sommet de la pile et décrémente rsp. `pop` récupère la valeur au sommet de la pile et la met dans le registre spécifié, puis incrémente rsp.'
    }
  },
  {
    id: 'ex-mod2-2-2',
    type: 'quiz',
    question: 'Que se passe-t-il concrètement lors d\'un `push rax` (registre 64 bits) ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'c1', text: 'rsp augmente de 8, puis la valeur est écrite.' },
        { id: 'c2', text: 'rsp diminue de 8, puis la valeur est écrite à l\'adresse de rsp.' },
        { id: 'c3', text: 'La valeur est écrite, puis rsp augmente de 8.' },
        { id: 'c4', text: 'La valeur est envoyée dans le disque dur.' }
      ],
      correctId: 'c2',
      explanation: 'La pile grandit vers le bas (vers les adresses mémoire plus petites). Pour ajouter 8 octets (64 bits), le processeur soustrait d\'abord 8 à rsp, puis écrit la donnée à cette nouvelle adresse.'
    }
  },

  // Mod 3: Instructions Fondamentales
  {
    id: 'ex-mod3-1-1',
    type: 'quiz',
    question: 'En syntaxe Intel, que fait l\'instruction `mov [rax], rbx` ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'c1', text: 'Copie la valeur de rbx dans le registre rax.' },
        { id: 'c2', text: 'Copie l\'adresse de rbx dans rax.' },
        { id: 'c3', text: 'Écrit la valeur de rbx dans la mémoire, à l\'adresse contenue dans rax.' },
        { id: 'c4', text: 'Lit la mémoire à l\'adresse rbx et la met dans rax.' }
      ],
      correctId: 'c3',
      explanation: 'Les crochets `[]` signifient un déréférencement (comme `*rax` en C++). On prend la valeur de `rbx` et on l\'écrit en RAM à l\'adresse mémoire pointée par `rax`.'
    }
  },

  // Mod 4: Contrôle de flux
  {
    id: 'ex-mod4-1-1',
    type: 'code-correction',
    question: 'Ce code est censé sauter au label "gagnant" si rax vaut 100. Trouvez l\'erreur.',
    difficulty: 'easy',
    xpReward: 20,
    data: {
      buggyCode: 'cmp rax, 100\njmp gagnant',
      correctCode: 'cmp rax, 100\nje gagnant',
      hints: ['jmp est inconditionnel.', 'Quelle instruction veut dire "Jump if Equal" ?'],
      explanation: '`jmp` saute toujours, quel que soit le résultat de la comparaison. Pour sauter uniquement si c\'est égal, il faut utiliser `je` (Jump if Equal) ou `jz` (Jump if Zero).'
    }
  },

  // Mod 5: McuScript
  {
    id: 'ex-mod5-1-1',
    type: 'drag-drop',
    question: 'Dans quel ordre ces composants d\'un compilateur s\'exécutent-ils typiquement (comme dans LLVM) ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      items: [
        { id: 'i1', text: 'Frontend (Analyse syntaxique)' },
        { id: 'i2', text: 'Middle-end (Optimisation de l\'IR)' },
        { id: 'i3', text: 'Backend (Génération ASM/Machine)' }
      ],
      correctOrder: ['Frontend (Analyse syntaxique)', 'Middle-end (Optimisation de l\'IR)', 'Backend (Génération ASM/Machine)'],
      instruction: 'Placez les étapes dans l\'ordre chronologique de compilation.',
      explanation: 'Le Frontend analyse le texte (votre code McuScript) et crée l\'IR. L\'Optimiseur améliore cette IR de façon générique. Enfin, le Backend traduit l\'IR optimisée vers le microcontrôleur spécifique.'
    }
  },
  {
    id: 'ex-mod6-1-1',
    type: 'quiz',
    question: 'Pourquoi compiler avec le flag `-g` est-il essentiel pour le débogage avec GDB ?',
    difficulty: 'easy',
    xpReward: 10,
    data: {
      choices: [
        { id: 'a', text: 'Pour que le programme s\'exécute plus vite.' },
        { id: 'b', text: 'Pour inclure les symboles (noms de variables, numéros de lignes) afin que GDB lie l\'assembleur au code source.' },
        { id: 'c', text: 'Pour éviter que le compilateur ne génère du code x86_64.' },
        { id: 'd', text: 'Pour utiliser la syntaxe Intel au lieu de AT&T.' }
      ],
      correctId: 'b',
      explanation: 'Le flag `-g` demande au compilateur d\'intégrer les informations de débogage (souvent au format DWARF). Sans cela, GDB ne verrait que des adresses mémoire hexadécimales brutes sans aucun nom de fonction ni de variable.'
    } as QuizData
  },
  {
    id: 'ex-mod7-1-1',
    type: 'fill-blank',
    question: 'Remplacer un saut par Conditional Move',
    difficulty: 'medium',
    xpReward: 15,
    data: {
      codeTemplate: `cmp rax, rbx\n__BLANK__ rcx, rax ; Si rax > rbx, copier rax dans rcx`,
      blanks: [
        { id: '1', answer: 'cmovg', hint: 'Conditional Move Greater' }
      ],
      explanation: '`cmovg` (Conditional Move if Greater) permet de copier des données uniquement si la dernière comparaison indique un état "Plus Grand Que". Cela évite un branchement qui pénaliserait le pipeline du CPU.'
    } as FillBlankData
  },
  {
    id: 'ex-mod8-1-1',
    type: 'drag-drop',
    question: 'Ordonnez les étapes d\'un compilateur (Frontend)',
    difficulty: 'medium',
    xpReward: 20,
    data: {
      items: [
        { id: '1', text: 'Analyseur Syntaxique (Parseur -> AST)' },
        { id: '2', text: 'Analyseur Lexical (Texte -> Tokens)' },
        { id: '3', text: 'Génération de Code (AST -> IR LLVM)' }
      ],
      correctOrder: ['2', '1', '3'],
      instruction: 'Remettez dans l\'ordre chronologique le traitement du code source.',
      explanation: 'On commence par découper le texte en Tokens (Lexer). Ensuite, on assemble ces Tokens en un Arbre Syntaxique Abstrait pour vérifier la grammaire (Parseur). Enfin, on parcourt cet arbre pour générer la Représentation Intermédiaire (IR).'
    } as DragDropData
  },
  {
    id: 'ex-mod3-1-2',
    type: 'interactive-lab',
    question: 'Le Défi du Calculateur (Simulateur)',
    difficulty: 'hard',
    xpReward: 50,
    data: {
      initialCode: '; Objectif : Mettre RAX à 42 en utilisant une addition\nmov rax, 0\n; Votre code ici...',
      instruction: 'Utilisez le simulateur ! Écrivez le code nécessaire pour que le registre RAX contienne la valeur 42 à la fin de l\'exécution.',
      targetState: {
        registers: { rax: 42 }
      },
      explanation: 'En utilisant l\'instruction `add rax, 42` ou en combinant plusieurs additions, vous modifiez directement l\'état du processeur.'
    } as InteractiveLabData
  },
  {
    id: 'ex-mod2-2-3',
    type: 'interactive-lab',
    question: 'Manipulation de la Pile (Stack)',
    difficulty: 'medium',
    xpReward: 40,
    data: {
      initialCode: '; Objectif : Inverser les valeurs de RAX et RBX en utilisant la pile\nmov rax, 111\nmov rbx, 999\n; Votre code ici...',
      instruction: 'Utilisez `push` et `pop` pour échanger les valeurs de RAX et RBX. À la fin, RAX doit valoir 999 et RBX doit valoir 111.',
      targetState: {
        registers: { rax: 999, rbx: 111 }
      },
      explanation: 'En faisant `push rax` puis `push rbx`, l\'ordre sur la pile est (bas vers haut): 111, 999. Si on fait ensuite `pop rax`, RAX récupère 999, et `pop rbx` récupère 111.'
    } as InteractiveLabData
  },
  {
    id: 'ex-mod4-1-2',
    type: 'interactive-lab',
    question: 'La Boucle Décroissante',
    difficulty: 'hard',
    xpReward: 50,
    data: {
      initialCode: '; Objectif : Amener RCX à 0 en utilisant une boucle\nmov rcx, 5\nboucle:\n  ; Votre code ici...\n  \n  cmp rcx, 0\n  jne boucle',
      instruction: 'Complétez la boucle pour que le programme se termine proprement avec RCX = 0.',
      targetState: {
        registers: { rcx: 0 }
      },
      explanation: 'L\'instruction `dec rcx` à l\'intérieur de la boucle réduit la valeur de 1 à chaque passage. Quand RCX atteint 0, `cmp rcx, 0` met le Zero Flag (ZF) à 1, et `jne` ne saute plus, terminant la boucle.'
    } as InteractiveLabData
  },
  {
    id: 'ex-mod2-3-1',
    type: 'quiz',
    question: 'En Little Endian, comment est stocké l\'entier 32 bits 0x1A2B3C4D en mémoire ?',
    difficulty: 'medium',
    xpReward: 15,
    data: {
      choices: [
        { id: 'a', text: '4D 3C 2B 1A' },
        { id: 'b', text: '1A 2B 3C 4D' },
        { id: 'c', text: '1A 2B 4D 3C' },
        { id: 'd', text: '4D 1A 2B 3C' }
      ],
      correctId: 'a',
      explanation: 'En Little Endian, l\'octet de poids le plus faible (4D) est stocké en premier (à l\'adresse la plus basse).'
    } as QuizData
  },
  {
    id: 'ex-mod3-2-1',
    type: 'interactive-lab',
    question: 'Le Masque Binaire',
    difficulty: 'hard',
    xpReward: 50,
    data: {
      initialCode: '; Objectif : Mettre à 0 les 4 bits de poids faible de RAX, sans toucher au reste\nmov rax, 0xFF\n; Votre code ici (indice: utilisez AND)...',
      instruction: 'Utilisez `and` avec le bon masque pour éteindre les 4 bits du bas (qui valent 0xF), de sorte que RAX passe de 0xFF à 0xF0.',
      targetState: {
        registers: { rax: 0xF0 }
      },
      explanation: 'Un `and rax, 0xF0` (ou tout masque qui se termine par 0) forcera les 4 derniers bits à 0 tout en préservant le reste.'
    } as InteractiveLabData
  },
  {
    id: 'ex-mod4-2-1',
    type: 'quiz',
    question: 'Sur x86-64 (System V ABI), dans quel registre passe-t-on le premier argument d\'une fonction ?',
    difficulty: 'medium',
    xpReward: 20,
    data: {
      choices: [
        { id: 'a', text: 'RAX' },
        { id: 'b', text: 'RDI' },
        { id: 'c', text: 'RSP' },
        { id: 'd', text: 'RSI' }
      ],
      correctId: 'b',
      explanation: 'RDI est utilisé pour le 1er argument entier/pointeur. (RAX est pour le retour, RSI pour le 2ème argument).'
    } as QuizData
  },
  {
    id: 'ex-mod5-2-1',
    type: 'quiz',
    question: 'Quelle est la règle principale de la forme SSA (Static Single Assignment) ?',
    difficulty: 'medium',
    xpReward: 20,
    data: {
      choices: [
        { id: 'a', text: 'Il n\'y a qu\'un seul registre disponible.' },
        { id: 'b', text: 'Les variables ne peuvent être entières.' },
        { id: 'c', text: 'Chaque variable ne peut être assignée (modifiée) qu\'une seule fois.' },
        { id: 'd', text: 'On ne peut pas utiliser de boucles.' }
      ],
      correctId: 'c',
      explanation: 'En SSA, chaque variable a une assignation unique. Si la valeur change, on crée une nouvelle "version" de la variable (ex: x1, x2).'
    } as QuizData
  },
  // --- MODULE 6 : Débogage ---
  {
    id: 'ex-mod6-1-1',
    type: 'quiz',
    question: 'Quelle commande GDB permet de faire avancer l\'exécution d\'exactement UNE instruction assembleur ?',
    difficulty: 'easy',
    xpReward: 20,
    data: {
      choices: [
        { id: 'a', text: 'next' },
        { id: 'b', text: 'step' },
        { id: 'c', text: 'stepi' },
        { id: 'd', text: 'continue' }
      ],
      correctId: 'c',
      explanation: 'stepi (ou si) avance d\'une instruction machine. step et next avancent d\'une ligne de code source C/C++.'
    } as QuizData
  },
  // --- MODULE 7 : Optimisation Bas Niveau ---
  {
    id: 'ex-mod7-1-1',
    type: 'quiz',
    question: 'Pourquoi l\'instruction cmov (Conditional Move) est-elle utile pour l\'optimisation ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Elle s\'exécute plus vite qu\'un mov normal.' },
        { id: 'b', text: 'Elle permet d\'éviter un saut conditionnel, évitant ainsi le "Branch Misprediction".' },
        { id: 'c', text: 'Elle consomme moins de mémoire.' },
        { id: 'd', text: 'Elle permet de copier deux registres en même temps.' }
      ],
      correctId: 'b',
      explanation: 'En évitant de sauter (jump), on ne brise pas le pipeline d\'instructions du processeur si la prédiction de branchement se trompe.'
    } as QuizData
  },
  // --- MODULE 8 : Parseur ---
  {
    id: 'ex-mod8-1-1',
    type: 'drag-drop',
    question: 'Replacez dans l\'ordre les 3 phases principales d\'un compilateur moderne.',
    difficulty: 'easy',
    xpReward: 20,
    data: {
      items: [
        { id: 'i1', text: 'Frontend (Lexer, Parser, AST)' },
        { id: 'i2', text: 'Middle-end (Optimisations sur l\'IR)' },
        { id: 'i3', text: 'Backend (Génération Assembleur)' }
      ],
      correctOrder: ['i1', 'i2', 'i3'],
      explanation: 'On lit d\'abord le texte, puis on l\'optimise sous forme mathématique (IR), et enfin on écrit l\'assembleur cible.'
    } as DragDropData
  },
  {
    id: 'ex-mod8-2-1',
    type: 'quiz',
    question: 'Dans un AST (Arbre Syntaxique Abstrait) pour "a = 5 * 2 + 3", quel opérateur sera le nœud le plus bas dans l\'arbre ?',
    difficulty: 'hard',
    xpReward: 40,
    data: {
      choices: [
        { id: 'a', text: '+' },
        { id: 'b', text: '*' },
        { id: 'c', text: '=' }
      ],
      correctId: 'b',
      explanation: 'Pour respecter la priorité des opérations, la multiplication (5 * 2) doit être calculée en premier. Elle est donc "plus profonde" dans l\'arbre.'
    } as QuizData
  },
  // --- MODULE 9 : IR ---
  {
    id: 'ex-mod9-1-1',
    type: 'quiz',
    question: 'Que signifie "SSA" en compilation ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Static Single Assignment' },
        { id: 'b', text: 'System Standard Architecture' },
        { id: 'c', text: 'Single System Assembler' }
      ],
      correctId: 'a',
      explanation: 'Static Single Assignment signifie que chaque variable "virtuelle" dans le compilateur n\'est affectée qu\'une seule fois.'
    } as QuizData
  },
  // --- MODULE 10 : Optimisation Middle-end ---
  {
    id: 'ex-mod10-1-1',
    type: 'code-correction',
    question: 'Identifiez l\'optimisation "Constant Folding" (pliage de constantes). Quel est le résultat final calculé par le compilateur au lieu du programme ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      buggyCode: 'let x = 10 * 2;\nreturn x + 5;',
      correctCode: 'return 25;',
      hints: ['Le compilateur va faire tous les maths possibles à votre place.'],
      explanation: 'Le compilateur transforme 10*2 en 20, puis voit x+5 et le transforme en 25. Il génèrera juste "mov rax, 25".'
    }
  },
  // --- MODULE 11 : Backend ---
  {
    id: 'ex-mod11-1-1',
    type: 'quiz',
    question: 'Que se passe-t-il lors de "l\'Allocation de Registres" si nous avons plus de variables vivantes que de registres physiques ?',
    difficulty: 'medium',
    xpReward: 30,
    data: {
      choices: [
        { id: 'a', text: 'Le compilateur plante.' },
        { id: 'b', text: 'Le processeur augmente sa fréquence.' },
        { id: 'c', text: 'Il effectue un "Spilling" (déversement) de certaines variables sur la pile (RAM).' }
      ],
      correctId: 'c',
      explanation: 'C\'est l\'une des raisons pour lesquelles un code avec énormément de variables locales peut devenir lent.'
    } as QuizData
  },
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
