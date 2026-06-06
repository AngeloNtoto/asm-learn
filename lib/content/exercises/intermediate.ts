import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData } from '../../types';

export const intermediateExercises: Exercise[] = [
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
  }
];
