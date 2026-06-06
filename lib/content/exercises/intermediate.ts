import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData, CodeCorrectionData } from '../../types';

export const intermediateExercises: Exercise[] = [
  {
    "id": "ex-mod6-1",
    "type": "quiz",
    "question": "Pourquoi compiler avec le flag `-g` est-il essentiel pour le d\u00e9bogage avec GDB ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Pour que le programme s'ex\u00e9cute plus vite."
        },
        {
          "id": "b",
          "text": "Pour inclure les symboles (noms de variables, num\u00e9ros de lignes) afin que GDB lie l'assembleur au code source."
        },
        {
          "id": "c",
          "text": "Pour utiliser la syntaxe Intel."
        }
      ],
      "correctId": "b",
      "explanation": "Le flag `-g` g\u00e9n\u00e8re la table DWARF. Sans elle, vous ne verrez que des adresses hexad\u00e9cimales brutes."
    }
  },
  {
    "id": "ex-mod6-2",
    "type": "quiz",
    "question": "Dans GDB, que fait la commande `break main` (ou `b main`) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle crashe le programme principal."
        },
        {
          "id": "b",
          "text": "Elle met en pause le programme d\u00e8s qu'il atteint le d\u00e9but de la fonction main()."
        },
        {
          "id": "c",
          "text": "Elle ignore la fonction main()."
        }
      ],
      "correctId": "b",
      "explanation": "C'est un Breakpoint (point d'arr\u00eat). C'est la base du d\u00e9bogage."
    }
  },
  {
    "id": "ex-mod6-3",
    "type": "quiz",
    "question": "Quelle commande GDB permet de faire avancer l'ex\u00e9cution d'exactement UNE instruction assembleur (machine) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "next"
        },
        {
          "id": "b",
          "text": "step"
        },
        {
          "id": "c",
          "text": "stepi"
        }
      ],
      "correctId": "c",
      "explanation": "`stepi` (Step Instruction) avance d'une instruction CPU. `step` avance d'une ligne de code C/C++ enti\u00e8re."
    }
  },
  {
    "id": "ex-mod6-4",
    "type": "fill-blank",
    "question": "Syntaxe GDB",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "(gdb) set disassembly-flavor __BLANK__\n(gdb) disassemble main",
      "blanks": [
        {
          "id": "1",
          "answer": "intel",
          "hint": "Pas AT&T."
        }
      ],
      "explanation": "GDB utilise par d\u00e9faut la syntaxe AT&T (illisible). 'intel' permet d'avoir la syntaxe standard (Destination, Source)."
    }
  },
  {
    "id": "ex-mod6-5",
    "type": "quiz",
    "question": "Comment afficher le contenu du registre RAX sous GDB ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "print $rax"
        },
        {
          "id": "b",
          "text": "cat rax"
        },
        {
          "id": "c",
          "text": "show registers"
        }
      ],
      "correctId": "a",
      "explanation": "Le pr\u00e9fixe '$' permet d'acc\u00e9der aux registres CPU."
    }
  },
  {
    "id": "ex-mod6-6",
    "type": "quiz",
    "question": "Qu'est-ce qu'un 'Watchpoint' dans GDB ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Un point d'arr\u00eat qui se d\u00e9clenche d\u00e8s que la valeur d'une VARIABLE en m\u00e9moire est modifi\u00e9e."
        },
        {
          "id": "b",
          "text": "Un chronom\u00e8tre pour mesurer les performances."
        },
        {
          "id": "c",
          "text": "Une vue graphique de la RAM."
        }
      ],
      "correctId": "a",
      "explanation": "Id\u00e9al pour trouver 'Qui a \u00e9cras\u00e9 ma variable globale ?' (ex: `watch my_var`). Le CPU utilise des registres de d\u00e9bogage mat\u00e9riels pour \u00e7a."
    }
  },
  {
    "id": "ex-mod6-7",
    "type": "drag-drop",
    "question": "Workflow GDB complet",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "gcc -g main.c (Compiler avec symboles)"
        },
        {
          "id": "2",
          "text": "gdb ./a.out (Lancer GDB)"
        },
        {
          "id": "3",
          "text": "break main (Mettre un point d'arr\u00eat)"
        },
        {
          "id": "4",
          "text": "run (Lancer l'ex\u00e9cution jusqu'au point d'arr\u00eat)"
        },
        {
          "id": "5",
          "text": "info registers (Inspecter l'\u00e9tat CPU)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "instruction": "Rangez les \u00e9tapes d'une session de d\u00e9bogage parfaite.",
      "explanation": "Ne jamais lancer 'run' sans breakpoint, sinon le programme se termine d'un trait."
    }
  },
  {
    "id": "ex-mod6-8",
    "type": "fill-blank",
    "question": "Inspection de m\u00e9moire brutes",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Afficher 4 Entiers (Words) en format Hexa depuis l'adresse contenue dans RSP\n(gdb) x/__BLANK__ $rsp",
      "blanks": [
        {
          "id": "1",
          "answer": "4xw",
          "hint": "4 Hex Word."
        }
      ],
      "explanation": "La commande 'x' (eXamine memory) est extr\u00eamement puissante. 'x/4xw' signifie 4 valeurs, en heXadecimal, taille Word (32-bits)."
    }
  },
  {
    "id": "ex-mod6-9",
    "type": "quiz",
    "question": "Que signifie la commande GDB `layout asm` ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle modifie le code binaire en direct."
        },
        {
          "id": "b",
          "text": "Elle ouvre une interface TUI (Text User Interface) graphique affichant le code assembleur en direct au-dessus du terminal."
        },
        {
          "id": "c",
          "text": "Elle exporte l'assembleur dans un fichier."
        }
      ],
      "correctId": "b",
      "explanation": "C'est la fonctionnalit\u00e9 qui rend GDB utilisable visuellement, montrant l'avancement de RIP ligne par ligne."
    }
  },
  {
    "id": "ex-mod6-10",
    "type": "code-correction",
    "question": "GDB Syntax Fix",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "(gdb) break *main+10\n(gdb) play",
      "correctCode": "(gdb) break *main+10\n(gdb) run",
      "hints": [
        "La commande pour d\u00e9marrer l'ex\u00e9cution est run."
      ],
      "explanation": "Pour d\u00e9marrer le programme, on utilise `run`. Pour avancer, `step` ou `next`. `play` n'existe pas."
    }
  },
  {
    "id": "ex-mod7-1",
    "type": "quiz",
    "question": "Pourquoi l'instruction cmov (Conditional Move) est-elle si pris\u00e9e des compilateurs modernes (O3) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle permet d'\u00e9viter un saut conditionnel, \u00e9vitant le 'Branch Misprediction'."
        },
        {
          "id": "b",
          "text": "Elle consomme moins de m\u00e9moire RAM."
        },
        {
          "id": "c",
          "text": "Elle est multi-thread\u00e9e."
        }
      ],
      "correctId": "a",
      "explanation": "En \u00e9vitant de sauter (jump), on ne brise pas le pipeline du CPU."
    }
  },
  {
    "id": "ex-mod7-2",
    "type": "quiz",
    "question": "Quelle technique de boucle consiste \u00e0 dupliquer le code int\u00e9rieur pour r\u00e9duire le nombre de comparaisons (`cmp/jne`) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Loop Unrolling (D\u00e9roulage de boucle)."
        },
        {
          "id": "b",
          "text": "Loop Infinite."
        },
        {
          "id": "c",
          "text": "Recursion."
        }
      ],
      "correctId": "a",
      "explanation": "Faire 4 calculs par it\u00e9ration divise par 4 le surco\u00fbt de gestion de la boucle."
    }
  },
  {
    "id": "ex-mod7-3",
    "type": "quiz",
    "question": "Pourquoi l'instruction `lea` est-elle consid\u00e9r\u00e9e comme un hack math\u00e9matique g\u00e9nial ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle effectue des calculs complexes (ex: a + b*4 + c) en un seul cycle d'horloge sans modifier les flags d'\u00e9tat (EFLAGS)."
        },
        {
          "id": "b",
          "text": "Elle divise par z\u00e9ro."
        },
        {
          "id": "c",
          "text": "Elle efface le disque dur."
        }
      ],
      "correctId": "a",
      "explanation": "C'est le couteau suisse de x86. C'est fait pour les adresses m\u00e9moire (Scale-Index-Base), mais utilis\u00e9 pour l'arithm\u00e9tique rapide."
    }
  },
  {
    "id": "ex-mod7-4",
    "type": "fill-blank",
    "question": "Multiplication par Bit-Shift",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Au lieu d'utiliser l'instruction 'mul' lente, multiplier EAX par 8 :\n__BLANK__ eax, 3",
      "blanks": [
        {
          "id": "1",
          "answer": "shl",
          "hint": "Shift Left."
        }
      ],
      "explanation": "D\u00e9caler les bits vers la gauche (shl) de N positions \u00e9quivaut \u00e0 multiplier par 2^N. Donc shl par 3 = *8. C'est instantan\u00e9."
    }
  },
  {
    "id": "ex-mod7-5",
    "type": "quiz",
    "question": "Qu'est-ce que l'Inlining ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le remplacement d'un 'call' (appel de fonction) par la copie directe du code de la fonction dans l'appelant."
        },
        {
          "id": "b",
          "text": "La suppression des variables globales."
        },
        {
          "id": "c",
          "text": "L'\u00e9criture du code sur une seule ligne de texte."
        }
      ],
      "correctId": "a",
      "explanation": "L'Inlining \u00e9limine totalement l'overhead d'une Stack Frame pour les petites fonctions."
    }
  },
  {
    "id": "ex-mod7-6",
    "type": "quiz",
    "question": "Pourquoi le parcours matriciel `[y][x]` est-il dramatiquement plus rapide que `[x][y]` en C++ ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "\u00c0 cause de la 'Localit\u00e9 Spatiale' du Cache CPU L1. Parcourir ligne par ligne lit la RAM de fa\u00e7on contigu\u00eb."
        },
        {
          "id": "b",
          "text": "Parce que le C++ aime les x."
        },
        {
          "id": "c",
          "text": "Parce que c'est une r\u00e8gle math\u00e9matique."
        }
      ],
      "correctId": "a",
      "explanation": "Parcourir colonne par colonne (x puis y) saute des blocs de RAM, provoquant des Cache Miss destructeurs pour les performances."
    }
  },
  {
    "id": "ex-mod7-7",
    "type": "drag-drop",
    "question": "Optimisation des IFs (-O3)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Code C : if (a > b) max = a; else max = b;"
        },
        {
          "id": "2",
          "text": "ASM non-optimis\u00e9 : cmp a, b; jle else_bloc; mov max, a; jmp fin..."
        },
        {
          "id": "3",
          "text": "ASM Optimis\u00e9 (CMOV) : mov max, b; cmp a, b; cmova max, a"
        },
        {
          "id": "4",
          "text": "Gain : Le pipeline CPU ne subit aucun Flush li\u00e9 au saut."
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "D\u00e9roulez l'\u00e9volution d'une simple condition vers son \u00e9tat ultime.",
      "explanation": "Le CMOV (Conditional Move) est la signature de -O3."
    }
  },
  {
    "id": "ex-mod7-8",
    "type": "fill-blank",
    "question": "Strength Reduction",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; L'optimisation 'Strength Reduction' remplace les op\u00e9rations math\u00e9matiques co\u00fbteuses par des moins ch\u00e8res.\n; Remplacer une division par 2 (lente) :\n__BLANK__ eax, 1",
      "blanks": [
        {
          "id": "1",
          "answer": "shr",
          "hint": "Shift Right."
        }
      ],
      "explanation": "D\u00e9caler \u00e0 droite (shr) de 1 bit divise par 2 beaucoup plus rapidement qu'une instruction 'div'."
    }
  },
  {
    "id": "ex-mod7-9",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Dead Code Elimination' ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le compilateur supprime tout bloc de code, variable ou fonction dont les r\u00e9sultats ne sont jamais utilis\u00e9s ou affich\u00e9s."
        },
        {
          "id": "b",
          "text": "Il supprime les erreurs de segmentation."
        },
        {
          "id": "c",
          "text": "Il nettoie la RAM."
        }
      ],
      "correctId": "a",
      "explanation": "Si vous faites un calcul de 3 milliards de boucles sans jamais faire de `printf` de la r\u00e9ponse, GCC (-O3) supprimera la boucle purement et simplement."
    }
  },
  {
    "id": "ex-mod7-10",
    "type": "code-correction",
    "question": "\u00c9limination des invariants de boucle",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "for(int i=0; i<100; i++) {\n  int val = x * y;\n  arr[i] = val + i;\n}",
      "correctCode": "int val = x * y;\nfor(int i=0; i<100; i++) {\n  arr[i] = val + i;\n}",
      "hints": [
        "Le produit x * y ne change pas pendant la boucle."
      ],
      "explanation": "Le compilateur sortira l'op\u00e9ration `x * y` hors de la boucle pour ne pas la recalculer 100 fois. C'est le 'Loop Invariant Code Motion'."
    }
  },
  {
    "id": "ex-mod8-1",
    "type": "quiz",
    "question": "Quel est le r\u00f4le du 'Lexer' (Analyseur Lexical) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Transformer le texte source brut (lettres) en une suite de 'Tokens' (mots-cl\u00e9s, nombres, symboles)."
        },
        {
          "id": "b",
          "text": "G\u00e9n\u00e9rer du code assembleur."
        },
        {
          "id": "c",
          "text": "Optimiser la RAM."
        }
      ],
      "correctId": "a",
      "explanation": "Le Lexer simplifie le texte `int x = 5;` en tokens: `[TYPE_INT, IDENTIFIER('x'), ASSIGN, NUMBER(5), SEMICOLON]`."
    }
  },
  {
    "id": "ex-mod8-2",
    "type": "quiz",
    "question": "Qu'est-ce qu'un AST (Abstract Syntax Tree) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Un Arbre repr\u00e9sentant la structure hi\u00e9rarchique et logique de votre code (blocs, op\u00e9rateurs, op\u00e9randes)."
        },
        {
          "id": "b",
          "text": "Un arbre en ASCII dans le terminal."
        },
        {
          "id": "c",
          "text": "Un type de variable."
        }
      ],
      "correctId": "a",
      "explanation": "C'est la carte mentale du programme, o\u00f9 `2 + 3 * 4` a le signe `+` \u00e0 la racine, et `*` en branche droite (Priorit\u00e9)."
    }
  },
  {
    "id": "ex-mod8-3",
    "type": "quiz",
    "question": "Dans l'expression `a = 5 * 2 + 3`, quel op\u00e9rateur sera le plus profond dans l'AST ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le signe `=`"
        },
        {
          "id": "b",
          "text": "Le signe `*` (multiplication)"
        },
        {
          "id": "c",
          "text": "Le signe `+`"
        }
      ],
      "correctId": "b",
      "explanation": "La multiplication (5*2) doit \u00eatre calcul\u00e9e en premier, elle est donc au fond de l'arbre pour remonter son r\u00e9sultat au `+`."
    }
  },
  {
    "id": "ex-mod8-4",
    "type": "fill-blank",
    "question": "Ordre de Compilation",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "Code Source -> __BLANK__ (Tokens) -> Parseur (__BLANK__) -> G\u00e9n\u00e9ration IR",
      "blanks": [
        {
          "id": "1",
          "answer": "Lexer",
          "hint": "Celui qui fait l'analyse lexicale."
        },
        {
          "id": "2",
          "answer": "AST",
          "hint": "L'arbre g\u00e9n\u00e9r\u00e9 par le Parseur."
        }
      ],
      "explanation": "C'est le flux standard du 'Frontend' de tout compilateur (Clang, GCC, Rustc)."
    }
  },
  {
    "id": "ex-mod8-5",
    "type": "quiz",
    "question": "\u00c0 quoi sert la 'Table des Symboles' (Symbol Table) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Stocker le nom de toutes les variables/fonctions d\u00e9clar\u00e9es, leur port\u00e9e (scope) et leur type pour v\u00e9rifier si elles existent (Semantic Analysis)."
        },
        {
          "id": "b",
          "text": "Chiffrer le code."
        },
        {
          "id": "c",
          "text": "Stocker les polices d'\u00e9criture."
        }
      ],
      "correctId": "a",
      "explanation": "Sans elle, le compilateur ne saurait pas si `ma_variable` a \u00e9t\u00e9 d\u00e9clar\u00e9e avant d'\u00eatre utilis\u00e9e."
    }
  },
  {
    "id": "ex-mod8-6",
    "type": "quiz",
    "question": "Pourquoi la cr\u00e9ation de compilateurs modernes est-elle souvent s\u00e9par\u00e9e en Frontend et Backend (ex: l'architecture LLVM) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Pour que le Frontend (C++, Rust) produise une 'Langue Commune' (IR), et que le Backend la traduise pour la cible (x86, ARM), \u00e9vitant de r\u00e9\u00e9crire M Langages * N Architectures."
        },
        {
          "id": "b",
          "text": "Parce qu'un seul d\u00e9veloppeur ne peut pas tout faire."
        },
        {
          "id": "c",
          "text": "Pour ralentir la compilation."
        }
      ],
      "correctId": "a",
      "explanation": "C'est le g\u00e9nie de LLVM : un nouveau langage (Swift) n'a qu'\u00e0 \u00e9crire un Frontend produisant de l'IR LLVM, et il devient instantan\u00e9ment compatible avec tous les CPU du monde."
    }
  },
  {
    "id": "ex-mod8-7",
    "type": "drag-drop",
    "question": "Les Erreurs de Compilation",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Lexical Error (ex: # au lieu de //)"
        },
        {
          "id": "2",
          "text": "Syntax Error (ex: oubli d'un point-virgule)"
        },
        {
          "id": "3",
          "text": "Semantic Error (ex: variable non d\u00e9clar\u00e9e, ou int = string)"
        },
        {
          "id": "4",
          "text": "Linker Error (ex: fonction d\u00e9finie nulle part mais utilis\u00e9e)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Ordonnez le type d'erreur qui appara\u00eetra en premier lors du cycle de compilation complet.",
      "explanation": "L'erreur de Linker est toujours la derni\u00e8re \u00e9tape, car elle concerne l'assemblage des fichiers binaires."
    }
  },
  {
    "id": "ex-mod8-8",
    "type": "fill-blank",
    "question": "Backus-Naur Form (BNF)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; La grammaire d'un langage est souvent d\u00e9finie formellement en BNF.\n; Une expression peut \u00eatre soit un nombre, soit une addition :\n<expr> ::= <number> | <expr> __BLANK__ <expr>",
      "blanks": [
        {
          "id": "1",
          "answer": "+",
          "hint": "Op\u00e9rateur d'addition."
        }
      ],
      "explanation": "Cette d\u00e9finition r\u00e9cursive permet au Parseur de comprendre l'embo\u00eetement infini des parenth\u00e8ses."
    }
  },
  {
    "id": "ex-mod8-9",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Recursive Descent Parsing' (Analyse descendante r\u00e9cursive) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "La m\u00e9thode la plus courante pour \u00e9crire un parseur \u00e0 la main, o\u00f9 chaque r\u00e8gle de grammaire devient une fonction qui appelle les autres r\u00e8gles."
        },
        {
          "id": "b",
          "text": "Une technique d'IA."
        },
        {
          "id": "c",
          "text": "Un plongeon r\u00e9cursif."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'approche utilis\u00e9e par GCC et Clang pour construire l'AST. C'est intuitif et tr\u00e8s rapide."
    }
  },
  {
    "id": "ex-mod8-10",
    "type": "code-correction",
    "question": "AST R\u00e9cursivit\u00e9",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "if(token == NUMBER) { return parse_number(); }\nif(token == PLUS) { return parse_plus(); }",
      "correctCode": "Node* left = parse_number();\nif(token == PLUS) { return parse_binary_op(left, PLUS); }",
      "hints": [
        "L'op\u00e9rateur '+' doit prendre l'\u00e9l\u00e9ment gauche (d\u00e9j\u00e0 pars\u00e9) avec lui."
      ],
      "explanation": "Un AST binaire (gauche/droite) se construit en englobant les n\u0153uds pr\u00e9c\u00e9dents sous le nouveau n\u0153ud op\u00e9rateur (le PLUS devient la racine)."
    }
  },
  {
    "id": "ex-mod9-1",
    "type": "quiz",
    "question": "Que signifie 'IR' dans un compilateur ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Intermediate Representation (Repr\u00e9sentation Interm\u00e9diaire)."
        },
        {
          "id": "b",
          "text": "Internal Register."
        },
        {
          "id": "c",
          "text": "Information Retrieval."
        }
      ],
      "correctId": "a",
      "explanation": "C'est un langage Assembleur 'abstrait', math\u00e9matiquement pur, ind\u00e9pendant de toute machine."
    }
  },
  {
    "id": "ex-mod9-2",
    "type": "quiz",
    "question": "Que signifie la forme 'SSA' (Static Single Assignment) de l'IR LLVM ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Chaque variable 'virtuelle' (ex: %1, %2) n'est assign\u00e9e (modifi\u00e9e) qu'UNE seule fois."
        },
        {
          "id": "b",
          "text": "Il n'y a pas de variables."
        },
        {
          "id": "c",
          "text": "Tout est statique."
        }
      ],
      "correctId": "a",
      "explanation": "Cette contrainte stricte permet aux algorithmes d'optimisation (le Middle-End) de fonctionner magiquement vite."
    }
  },
  {
    "id": "ex-mod9-3",
    "type": "quiz",
    "question": "Combien de 'registres' virtuels (variables) sont autoris\u00e9s dans une IR LLVM ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "16 comme x86-64."
        },
        {
          "id": "b",
          "text": "Une infinit\u00e9 (%1, %2, %9999...)."
        },
        {
          "id": "c",
          "text": "Aucun."
        }
      ],
      "correctId": "b",
      "explanation": "L'IR n'est pas limit\u00e9 par la r\u00e9alit\u00e9 physique. C'est le Backend qui devra ensuite 'caser' ces millions de registres virtuels dans les 16 registres physiques (Register Allocation)."
    }
  },
  {
    "id": "ex-mod9-4",
    "type": "fill-blank",
    "question": "IR LLVM Typ\u00e9e",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; L'IR LLVM est fortement typ\u00e9e (contrairement \u00e0 l'ASM pur).\n; Additionner deux entiers 32 bits:\n%3 = add __BLANK__ %1, %2",
      "blanks": [
        {
          "id": "1",
          "answer": "i32",
          "hint": "Integer 32 bits."
        }
      ],
      "explanation": "L'IR garde trace des types (i32, i64, float) pour g\u00e9n\u00e9rer l'assembleur correct plus tard."
    }
  },
  {
    "id": "ex-mod9-5",
    "type": "quiz",
    "question": "Pourquoi traduire l'AST en IR lin\u00e9aire ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce qu'un Arbre (AST) est complexe \u00e0 optimiser math\u00e9matiquement. Une suite d'instructions lin\u00e9aires simples (IR) se manipule et s'optimise comme du code machine abstrait."
        },
        {
          "id": "b",
          "text": "Pour faire beau."
        },
        {
          "id": "c",
          "text": "Parce qu'on ne peut pas compiler un arbre."
        }
      ],
      "correctId": "a",
      "explanation": "L'IR ressemble \u00e0 de l'assembleur, ce qui pr\u00e9pare parfaitement le terrain pour l'\u00e9tape du Backend."
    }
  },
  {
    "id": "ex-mod9-6",
    "type": "quiz",
    "question": "Qu'est-ce qu'une fonction Phi (`phi`) en SSA ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une instruction magique qui s\u00e9lectionne la bonne version d'une variable en fonction du bloc (If/Else) par lequel l'ex\u00e9cution est pass\u00e9e."
        },
        {
          "id": "b",
          "text": "Un calcul math\u00e9matique Pi (3.14)."
        },
        {
          "id": "c",
          "text": "Une erreur."
        }
      ],
      "correctId": "a",
      "explanation": "Puisqu'on ne peut assigner une variable qu'une seule fois en SSA, `phi` permet de r\u00e9soudre les collisions de variables apr\u00e8s des branchements divergents."
    }
  },
  {
    "id": "ex-mod9-7",
    "type": "drag-drop",
    "question": "G\u00e9n\u00e9ration de Code 3-Adresses",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "AST: x = (a + b) * c"
        },
        {
          "id": "2",
          "text": "IR 1: %1 = add i32 %a, %b"
        },
        {
          "id": "3",
          "text": "IR 2: %2 = mul i32 %1, %c"
        },
        {
          "id": "4",
          "text": "IR 3: store i32 %2, i32* %x"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "D\u00e9roulez l'aplatissement (flattening) d'une expression complexe en code \u00e0 3-Adresses (R\u00e9sultat = Op\u00e9rande1, Op\u00e9rande2).",
      "explanation": "Chaque op\u00e9ration devient une instruction unitaire stricte."
    }
  },
  {
    "id": "ex-mod9-8",
    "type": "fill-blank",
    "question": "Basic Blocks (Blocs de Base)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Un bloc de base (Basic Block) dans un graphe de contr\u00f4le (CFG)\n; a un seul point d'entr\u00e9e, et un seul point de __BLANK__ (ex: br, ret).\nLabel1:\n  %1 = add i32 1, 1\n  __BLANK__ label %Label2",
      "blanks": [
        {
          "id": "1",
          "answer": "sortie",
          "hint": "Exit point."
        },
        {
          "id": "2",
          "answer": "br",
          "hint": "Instruction Branch (saut)."
        }
      ],
      "explanation": "L'IR d\u00e9coupe tout le code en blocs s\u00e9quentiels purs connect\u00e9s par des branches. Cela forme un Control Flow Graph (CFG)."
    }
  },
  {
    "id": "ex-mod9-9",
    "type": "quiz",
    "question": "En LLVM IR, pourquoi manipule-t-on souvent les pointeurs locaux avec `alloca` au lieu de cr\u00e9er directement des registres virtuels SSA pour les variables mutables ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Pour simuler de la m\u00e9moire locale (la pile) et contourner l'interdiction de muter une variable SSA (la variable pointe vers une RAM mutable)."
        },
        {
          "id": "b",
          "text": "Parce que alloca est plus rapide."
        },
        {
          "id": "c",
          "text": "Pour faire des allocations sur le tas."
        }
      ],
      "correctId": "a",
      "explanation": "Plus tard, l'optimisation SROA (Scalar Replacement of Aggregates) transformera ces alloca lents en registres purs SSA si possible."
    }
  },
  {
    "id": "ex-mod9-10",
    "type": "code-correction",
    "question": "Erreur SSA",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "%1 = add i32 %a, 5\n%1 = mul i32 %1, 2",
      "correctCode": "%1 = add i32 %a, 5\n%2 = mul i32 %1, 2",
      "hints": [
        "En SSA, une variable (%1) ne peut \u00eatre assign\u00e9e qu'UNE FOIS."
      ],
      "explanation": "C'est la r\u00e8gle d'or de l'IR LLVM : cr\u00e9er une nouvelle version de variable \u00e0 chaque modification."
    }
  },
  {
    "id": "ex-mod10-1",
    "type": "quiz",
    "question": "Que fait l'optimisation 'Constant Folding' (Pliage de Constantes) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle calcule les expressions math\u00e9matiques simples \u00e0 la compilation (ex: 5 * 2 + 10 -> 20) pour que le CPU n'ait pas \u00e0 le faire."
        },
        {
          "id": "b",
          "text": "Elle chiffre les constantes."
        },
        {
          "id": "c",
          "text": "Elle r\u00e9duit la taille de l'\u00e9cran."
        }
      ],
      "correctId": "a",
      "explanation": "Le compilateur fait les maths \u00e0 votre place."
    }
  },
  {
    "id": "ex-mod10-2",
    "type": "quiz",
    "question": "Que fait l'optimisation 'Dead Code Elimination' (DCE) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle supprime le code injoignable (apr\u00e8s un return) ou les calculs dont le r\u00e9sultat n'est jamais utilis\u00e9/retourn\u00e9."
        },
        {
          "id": "b",
          "text": "Elle ferme le programme."
        },
        {
          "id": "c",
          "text": "Elle efface les commentaires."
        }
      ],
      "correctId": "a",
      "explanation": "C'est ce qui fait que des boucles \u00e9normes vides sont transform\u00e9es en RIEN par -O3."
    }
  },
  {
    "id": "ex-mod10-3",
    "type": "quiz",
    "question": "Qu'est-ce que l'optimisation 'Loop Unrolling' (D\u00e9roulage de boucle) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "R\u00e9p\u00e9ter le corps de la boucle plusieurs fois en dur pour r\u00e9duire le nombre total de comparaisons/sauts (overhead)."
        },
        {
          "id": "b",
          "text": "Transformer une boucle en appel de fonction."
        },
        {
          "id": "c",
          "text": "Mettre la boucle \u00e0 l'envers."
        }
      ],
      "correctId": "a",
      "explanation": "Le fichier binaire grossit (plus d'instructions), mais le CPU tourne beaucoup plus vite."
    }
  },
  {
    "id": "ex-mod10-4",
    "type": "fill-blank",
    "question": "Constant Propagation",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Avant : \n; int x = 10; \n; return x * 2;\n\n; Apr\u00e8s Constant Propagation & Folding (Middle-end) :\nreturn __BLANK__;",
      "blanks": [
        {
          "id": "1",
          "answer": "20",
          "hint": "Le r\u00e9sultat final compil\u00e9."
        }
      ],
      "explanation": "La variable x est traqu\u00e9e, sa constante propag\u00e9e, puis pli\u00e9e (Folding)."
    }
  },
  {
    "id": "ex-mod10-5",
    "type": "quiz",
    "question": "Qu'est-ce que l'Inline Expansion (Inlining) de fonction ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Remplacer l'appel \u00e0 une fonction (call) par le code entier de la fonction, \u00e9vitant le co\u00fbt d'une Frame."
        },
        {
          "id": "b",
          "text": "Mettre le texte en ligne."
        },
        {
          "id": "c",
          "text": "Changer le type de retour."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'optimisation la plus importante du C++ (qui justifie le Zero-Overhead des getters/setters)."
    }
  },
  {
    "id": "ex-mod10-6",
    "type": "quiz",
    "question": "Pourquoi l'optimisation 'LICM' (Loop Invariant Code Motion) est-elle cruciale ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle sort les calculs qui ne changent pas (invariants) en dehors de la boucle pour ne pas les refaire \u00e0 chaque it\u00e9ration."
        },
        {
          "id": "b",
          "text": "Elle inverse les boucles."
        },
        {
          "id": "c",
          "text": "Elle supprime la boucle."
        }
      ],
      "correctId": "a",
      "explanation": "Exemple: si vous faites `a = x * 2` dans un `for(i=0...100)`, le compilateur mettra `a = x * 2` avant le `for`."
    }
  },
  {
    "id": "ex-mod10-7",
    "type": "drag-drop",
    "question": "La cascade des Optimisations LLVM",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Inlining (Ram\u00e8ne le code des petites fonctions \u00e0 l'int\u00e9rieur)"
        },
        {
          "id": "2",
          "text": "Constant Propagation & Folding (R\u00e9sout les maths statiques expos\u00e9es par l'inlining)"
        },
        {
          "id": "3",
          "text": "Dead Code Elimination (Supprime les conditions If(false) r\u00e9solues au-dessus)"
        },
        {
          "id": "4",
          "text": "Vectorization (Transforme les boucles \u00e9pur\u00e9es restantes en SIMD)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Les 'Passes' d'optimisation se nourrissent les unes des autres. Rangez-les logiquement.",
      "explanation": "Cette synergie (Passes) fait toute la magie d'un bon compilateur (-O3)."
    }
  },
  {
    "id": "ex-mod10-8",
    "type": "fill-blank",
    "question": "Common Subexpression Elimination (CSE)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; CSE : Si le compilateur voit 'y = a * b' puis 'z = a * b' plus loin,\n; Il supprime le 2\u00e8me calcul et fait simplement : \nz = __BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "y",
          "hint": "Il r\u00e9utilise le r\u00e9sultat pr\u00e9c\u00e9dent."
        }
      ],
      "explanation": "L'IR stocke le graphe des valeurs. Si un n\u0153ud a la m\u00eame entr\u00e9e, il fusionne les n\u0153uds (GPN)."
    }
  },
  {
    "id": "ex-mod10-9",
    "type": "quiz",
    "question": "En quoi consiste la vectorisation automatique (Auto-Vectorization) du Middle-End ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Il d\u00e9tecte une boucle traitant un tableau s\u00e9quentiel et la remplace par des blocs d'op\u00e9rations SIMD (ex: vaddps)."
        },
        {
          "id": "b",
          "text": "Il cr\u00e9e des vecteurs C++ dynamiquement."
        },
        {
          "id": "c",
          "text": "Il dessine des vecteurs."
        }
      ],
      "correctId": "a",
      "explanation": "C'est le Graal de l'optimisation moderne, rendant le code jusqu'\u00e0 16x plus rapide sans changer une ligne de C."
    }
  },
  {
    "id": "ex-mod10-10",
    "type": "code-correction",
    "question": "Aliasing Pointers",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "void add(int* a, int* b) {\n  for(int i=0; i<100; i++) {\n    *a += *b;\n  }\n}",
      "correctCode": "void add(int* restrict a, int* restrict b) {\n  // Sans 'restrict', le compilateur craint que 'a' et 'b' pointent \n  // vers la m\u00eame adresse m\u00e9moire (Aliasing) et n'optimisera pas.\n}",
      "hints": [
        "Mot-cl\u00e9 magique C99 pour promettre qu'il n'y a pas d'aliasing."
      ],
      "explanation": "Si `a == b`, chaque `*a += *b` modifie la cible de `b`. Le compilateur ne peut donc pas mettre `*b` en cache registre (ou vectoriser). `restrict` r\u00e9sout ce probl\u00e8me."
    }
  },
  {
    "id": "ex-mod11-1",
    "type": "quiz",
    "question": "Quelle est la t\u00e2che principale du Backend LLVM/GCC ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Traduire l'IR abstraite optimis\u00e9e en un v\u00e9ritable code Assembleur (x86, ARM, RISC-V) propre au processeur cible."
        },
        {
          "id": "b",
          "text": "Compiler le code en Python."
        },
        {
          "id": "c",
          "text": "Cr\u00e9er le fichier source C."
        }
      ],
      "correctId": "a",
      "explanation": "Le Backend se charge de la r\u00e9alit\u00e9 physique (Registres limit\u00e9s, architecture mat\u00e9rielle)."
    }
  },
  {
    "id": "ex-mod11-2",
    "type": "quiz",
    "question": "Comment s'appelle le processus d'assigner l'infinit\u00e9 de variables de l'IR (%1, %2...) aux 16 registres r\u00e9els de x86-64 ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Register Allocation (Allocation de registres)."
        },
        {
          "id": "b",
          "text": "Variable Sorting."
        },
        {
          "id": "c",
          "text": "Garbage Collection."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'un des algorithmes les plus complexes de l'informatique (coloration de graphes)."
    }
  },
  {
    "id": "ex-mod11-3",
    "type": "quiz",
    "question": "Que se passe-t-il lors de l'Allocation de Registres s'il y a plus de 'Variables Vivantes' que de registres physiques ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le Backend effectue un 'Register Spilling' : il 'd\u00e9verse' l'exc\u00e9dent sur la pile (RAM) (tr\u00e8s lent)."
        },
        {
          "id": "b",
          "text": "Il crashe."
        },
        {
          "id": "c",
          "text": "Il supprime les variables."
        }
      ],
      "correctId": "a",
      "explanation": "C'est pourquoi \u00e9crire des fonctions gigantesques avec 100 variables locales d\u00e9truit les performances."
    }
  },
  {
    "id": "ex-mod11-4",
    "type": "fill-blank",
    "question": "Instruction Selection",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Le Backend utilise la 'S\u00e9lection d'Instruction'.\n; Par exemple, traduire `%3 = mul i32 %1, 8` vers :\n__BLANK__ eax, 3",
      "blanks": [
        {
          "id": "1",
          "answer": "shl",
          "hint": "Instruction sp\u00e9cifique x86 (Shift Left) au lieu de mul."
        }
      ],
      "explanation": "Le Backend conna\u00eet les astuces intimes de l'architecture cible pour produire le code le plus rapide."
    }
  },
  {
    "id": "ex-mod11-5",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Peephole Optimization' (Optimisation par le trou de serrure) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une passe finale du Backend qui regarde 2-3 instructions assembleur g\u00e9n\u00e9r\u00e9es et les remplace par un motif plus court (ex: 'mov eax, 0' devient 'xor eax, eax')."
        },
        {
          "id": "b",
          "text": "Regarder le code source de loin."
        },
        {
          "id": "c",
          "text": "Cacher le code binaire."
        }
      ],
      "correctId": "a",
      "explanation": "C'est un nettoyage microscopique de toute derni\u00e8re minute sur le texte Assembleur final."
    }
  },
  {
    "id": "ex-mod11-6",
    "type": "quiz",
    "question": "Quel algorithme est couramment utilis\u00e9 pour l'Allocation de Registres optimale ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "La Coloration de Graphe (Graph Coloring)."
        },
        {
          "id": "b",
          "text": "Le Tri \u00e0 Bulles."
        },
        {
          "id": "c",
          "text": "A-Star."
        }
      ],
      "correctId": "a",
      "explanation": "Si 2 variables sont 'vivantes' en m\u00eame temps, elles sont reli\u00e9es. On tente de colorier le graphe entier avec K couleurs (les K registres CPU)."
    }
  },
  {
    "id": "ex-mod11-7",
    "type": "drag-drop",
    "question": "Workflow complet du Backend",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Instruction Selection (Choix des Opcodes CPU cibles, ex: x86)"
        },
        {
          "id": "2",
          "text": "Instruction Scheduling (R\u00e9ordonner pour \u00e9viter les pipeline stalls CPU)"
        },
        {
          "id": "3",
          "text": "Register Allocation (Coloration de Graphes et Spilling)"
        },
        {
          "id": "4",
          "text": "Peephole Opt / Code Emission (G\u00e9n\u00e9ration des bits finaux / Fichier Objet .o)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Rangez les 4 \u00e9tapes vitales du travail du Backend LLVM/GCC.",
      "explanation": "L'ordre d'ex\u00e9cution d\u00e9termine grandement la vitesse du binaire (ex: l'allocation d\u00e9pend de l'ordre schedul\u00e9)."
    }
  },
  {
    "id": "ex-mod11-8",
    "type": "fill-blank",
    "question": "Liveness Analysis (Analyse de vivacit\u00e9)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; L'analyse de 'Liveness' d\u00e9termine \u00e0 quel moment une variable peut \u00eatre \u00e9cras\u00e9e par une autre pour recycler son registre.\n; Une variable est 'vivante' depuis sa d\u00e9claration jusqu'\u00e0 sa derni\u00e8re __BLANK__.",
      "blanks": [
        {
          "id": "1",
          "answer": "utilisation",
          "hint": "Lecture (Use)."
        }
      ],
      "explanation": "D\u00e8s qu'une variable n'est plus lue plus bas dans le code, son registre physique est libre pour quelqu'un d'autre."
    }
  },
  {
    "id": "ex-mod11-9",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Link Time Optimization' (LTO) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une technique o\u00f9 le compilateur g\u00e9n\u00e8re non pas de l'assembleur pur, mais un fichier binaire hybride IR/Objet, permettant au Linker final (qui a la vue sur TOUS les fichiers .o du projet) d'Inliner massivement entre diff\u00e9rents fichiers C++."
        },
        {
          "id": "b",
          "text": "Le fait de supprimer les liens externes."
        },
        {
          "id": "c",
          "text": "Optimiser le t\u00e9l\u00e9chargement d'un lien."
        }
      ],
      "correctId": "a",
      "explanation": "Sans LTO, l'optimisation s'arr\u00eate aux fronti\u00e8res du fichier.h/.cpp. Avec LTO, la vue globale permet un gain drastique de vitesse."
    }
  },
  {
    "id": "ex-mod11-10",
    "type": "code-correction",
    "question": "Linker Error classique",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "// Fichier A.cpp\nextern int globale;\nint main() { return globale; }",
      "correctCode": "// Fichier A.cpp\nextern int globale;\nint main() { return globale; }\n\n// Dans un autre fichier (B.cpp)\nint globale = 42;",
      "hints": [
        "L'erreur de linker 'Undefined reference' survient quand un symbole extern n'existe nulle part physiquement."
      ],
      "explanation": "Le Backend a produit A.o sans erreur. C'est le Linker (\u00c9diteur de liens) qui plante car il ne trouve pas l'adresse physique de la variable globale 'globale' dans les autres fichiers Objets."
    }
  }
];
