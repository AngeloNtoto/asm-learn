import { Module } from '../../types';

export const intermediateModules: Module[] = [
  {
    id: 'mod6',
    title: 'Débogage & Ingénierie Inverse',
    description: 'Lisez les entrailles d un programme. Utilisez GDB pour traquer les bugs dans l assembleur.',
    icon: 'Bug',
    color: 'accent-red',
    order: 6,
    lessons: [
      {
        id: 'mod6-1',
        moduleId: 'mod6',
        title: 'Introduction à GDB',
        description: 'Comment arrêter l exécution, lire les registres et voir la pile.',
        order: 1,
        content: {
          simpleExplanation: 'GDB (GNU Debugger) est comme un microscope pour votre code. Il permet d arrêter le temps et de voir exactement ce qu il y a dans RAX, RSP, ou à une adresse mémoire précise.',
          deepExplanation: 'Un debugger s attache au processus (souvent via `ptrace` sous Linux). En plaçant un breakpoint, il remplace temporairement l instruction par une interruption spéciale (`int 3` sur x86, opcode `0xCC`). Quand le CPU l exécute, il redonne la main au debugger. **Approfondissement :** GDB peut aussi faire du "single stepping" matériel en utilisant le flag TF (Trap Flag) du registre EFLAGS, ce qui déclenche une interruption après chaque instruction. C est très utile pour tracer l exécution instruction par instruction. Il peut également lire/modifier la mémoire, les registres, et évaluer des expressions C en utilisant les symboles debug (`-g`).',
          example: {
            title: 'Session GDB typique',
            code: `(gdb) break main
(gdb) run
(gdb) layout asm
(gdb) info registers
(gdb) stepi
(gdb) x/10x $rsp   # examine 10 mots de 8 octets à l'adresse pointée par RSP (en hexa)
(gdb) print/x $rax  # affiche RAX en hexadécimal`,
            language: 'pseudo',
            explanation: '`stepi` avance d exactement UNE instruction assembleur, parfait pour voir les effets microscopiques. `info registers` montre tous les registres. La commande `disas` désassemble la fonction courante.'
          },
          commonMistake: {
            title: 'Compiler sans symboles',
            content: 'Si vous compilez sans le flag `-g`, GDB ne saura pas faire le lien entre le code source (C/C++) et les adresses en assembleur. Vous verrez seulement des adresses brutes. **De plus :** Les optimisations (`-O2`, `-O3`) réorganisent le code, rendant le débogage confus – il est conseillé d utiliser `-O0 -g` pour le débogage, puis `-O2` pour la release.',
          },
          practicalTip: {
            title: 'Changer la syntaxe',
            content: 'Par défaut, GDB utilise la syntaxe AT&T (source puis destination). Tapez `set disassembly-flavor intel` pour avoir la même syntaxe que sur cette plateforme. **Autres astuces :** `layout split` pour voir source et assembleur côte à côte. `watch *0xaddr` pour surveiller une adresse mémoire. `record` pour enregistrer l exécution et `reverse-stepi` pour revenir en arrière (limited).',
          },
          mcuscriptLink: 'Quand votre compilateur McuScript générera du code buggé, GDB sera le seul moyen de comprendre pourquoi le programme crash. **Exemple :** Vous générez un `mov [rax], rbx` mais rax contient une adresse invalide. GDB vous montrera le signal SIGSEGV, et `info registers` vous permettra de voir que rax = 0. Vous pourrez alors remonter dans votre backend pour comprendre pourquoi rax n a pas été initialisé.',
        },
        exercises: ['ex-mod6-1-1']
      }
    ]
  },
  {
    id: 'mod7',
    title: 'Optimisation de Bas Niveau',
    description: 'Faites tourner votre code plus vite. Branch prediction, loop unrolling et SIMD.',
    icon: 'Zap',
    color: 'accent-amber',
    order: 7,
    lessons: [
      {
        id: 'mod7-1',
        moduleId: 'mod7',
        title: 'Prédiction de Branchement',
        description: 'Pourquoi les if coûtent cher et comment le CPU essaie de deviner l avenir.',
        order: 1,
        content: {
          simpleExplanation: 'Les CPUs modernes sont des usines à la chaîne (pipeline). S il y a un `if` (un saut conditionnel `je`), le CPU ne sait pas quelle suite préparer. Il "devine". S il se trompe, il doit jeter tout son travail préparatoire.',
          deepExplanation: 'C est le fameux coût du "Branch Misprediction". Pour optimiser, il est souvent préférable de faire un calcul arithmétique pour trouver un résultat plutôt que d utiliser un saut, ou de trier des données pour rendre le saut prédictible. **Approfondissement :** Les processeurs modernes ont des unités de prédiction de branchement très sophistiquées (historique global, table de branchements, etc.). Sur des motifs simples (une boucle qui tourne 99 fois puis break), la prédiction réussit presque toujours. Mais sur des données aléatoires (ex: liste non triée), le prédicteur échoue 50% du temps, causant un penalty de 15 à 20 cycles perdu. C est pourquoi le tri améliore souvent les performances des boucles avec condition.',
          example: {
            title: 'Remplacer un saut par des maths',
            code: `; Au lieu de faire un IF pour trouver le max :
; if (a > b) max = a else max = b

; Optimisation sans branchement (Branchless) :
cmp eax, ebx
cmovg ebx, eax ; Conditional Move : si Greater, ebx = eax

; Version encore plus simple : max = a ^ ((a ^ b) & -(a < b))  (en C)
; En assembleur : 
xor ecx, ecx
cmp eax, ebx
setg cl        ; cl = (a > b) ? 1 : 0
dec ecx        ; ecx = 0xFFFFFFFF si a>b, 0 sinon
and ecx, ebx
xor eax, ecx`,
            language: 'asm',
            explanation: 'L instruction `cmov` (Conditional Move) est magique : elle permet d éviter un saut conditionnel, rendant le pipeline du CPU très heureux. Attention : `cmov` est disponible sur x86 depuis le Pentium Pro, mais sur certaines architectures ARM, il n existe pas – il faut alors utiliser des prédicats d instruction.'
          },
          commonMistake: {
            title: 'Micro-optimisation prématurée',
            content: 'Ne remplacez pas tous vos IFs par du code incompréhensible. Le compilateur (C++ ou McuScript) saura générer des `cmov` tout seul la plupart du temps. **Règle :** Ne micro-optimisez que les boucles internes identifiées comme goulets par un profileur. Lire un code clair vaut mieux qu un gain de 0.1% non mesuré.',
          },
          practicalTip: {
            title: 'Profilez avant !',
            content: 'Utilisez un outil comme `perf` sous Linux pour voir où votre programme passe vraiment son temps avant d optimiser l assembleur. **Exemple :** `perf stat ./mon_programme` donne le nombre de cycles, instructions, et branches mal prédites. `perf record -e branch-misses ./mon_prog` puis `perf report` pour localiser les instructions problématiques.',
          },
          mcuscriptLink: 'Dans le backend LLVM de McuScript, on utilisera les passes d optimisation (`opt`) pour transformer automatiquement les branchements lents en code "branchless". Par exemple, la passe `-simplifycfg` convertit certains `if` ternaires en `select` (qui produit `cmov`).',
        },
        exercises: ['ex-mod7-1-1']
      }
    ]
  },
  {
    id: 'mod8',
    title: 'Projet : Le Parseur McuScript',
    description: 'Projet final. Créez un mini-parseur en C++ capable de lire "a = 5" et de générer du code.',
    icon: 'Terminal',
    color: 'accent-purple',
    order: 8,
    lessons: [
      {
        id: 'mod8-1',
        moduleId: 'mod8',
        title: 'L Analyseur Lexical (Lexer)',
        description: 'Transformer du texte en "Tokens" compréhensibles.',
        order: 1,
        content: {
          simpleExplanation: 'Un lexer lit la chaîne de caractères `x = 42;` et la transforme en une liste d étiquettes (Tokens) : `[IDENTIFIANT:"x"], [EGAL], [NOMBRE:42], [POINT_VIRGULE]`.',
          deepExplanation: 'C est la première étape du frontend de McuScript. Au lieu de manipuler des caractères compliqués, le reste du compilateur manipulera ces Tokens. **Approfondissement :** Le lexer utilise généralement une table d automates finis pour reconnaître les motifs (nombres, identifiants, opérateurs). Il ignore les espaces, les tabulations, les retours à la ligne, et les commentaires. Il peut aussi gérer les mots-clés (`if`, `while`, `let`) en vérifiant si l identifiant courant est dans une table de réservation. Une fois que le flux de tokens est produit, le parseur peut commencer la construction de l AST.',
          example: {
            title: 'Boucle Lexer simplifiée',
            code: `Token nextToken() {
  while (isspace(currentChar)) advance();

  if (isalpha(currentChar)) {
    string ident;
    while (isalnum(currentChar)) {
      ident += currentChar;
      advance();
    }
    // Vérifier si c'est un mot-clé
    if (ident == "let") return Token(Kind::Let);
    if (ident == "if") return Token(Kind::If);
    return Token(Kind::Identifier, ident);
  }
  
  if (isdigit(currentChar)) {
    int value = 0;
    while (isdigit(currentChar)) {
      value = value*10 + (currentChar - '0');
      advance();
    }
    return Token(Kind::Number, value);
  }
  
  if (currentChar == '=') {
    advance();
    if (currentChar == '=') { // pour gérer ==
      advance();
      return Token(Kind::EqualsEquals);
    }
    return Token(Kind::Assign);
  }
  
  // ... autres opérateurs
  
  if (currentChar == '\\0') return Token(Kind::Eof);
  error("Caractère inattendu");
}`,
            language: 'cpp',
            explanation: 'Cette structure en C++ lit caractère par caractère pour générer nos entités logiques. **Remarque :** La gestion des nombres ne gère que les entiers décimaux ; vous pouvez l étendre aux hexadécimaux, flottants, etc.'
          },
          commonMistake: {
            title: 'Parser pendant le Lexing',
            content: 'Le lexer ne doit pas se soucier de savoir si la grammaire est valide (ex: `42 = x` est valide pour le lexer, c est le parseur qui rejettera). **Erreur fréquente :** faire des vérifications sémantiques dans le lexer (ex: vérifier qu un identifiant est déclaré). Cela mélange les responsabilités. Le lexer ne fait que transformer le texte en tokens.',
          },
          practicalTip: {
            title: 'Ignorer les espaces et commentaires',
            content: 'C est le lexer qui se charge de supprimer tous les espaces, retours à la ligne et commentaires, pour simplifier la vie du Parseur. **Astuce :** Vous pouvez aussi garder les commentaires dans des tokens spéciaux si vous voulez faire de la documentation automatique (comme Doxygen).',
          },
          mcuscriptLink: 'Une fois ce Lexer écrit, il servira de fondation pour l Arbre Syntaxique Abstrait (AST) de McuScript ! **Prochaine étape :** Le parseur utilisera ces tokens pour construire un AST. Par exemple, `let x = 5 + 3;` deviendra un nœud `LetStatement` avec un identifiant "x" et une expression `BinaryOp(Plus, Literal(5), Literal(3))`.',
        },
        exercises: ['ex-mod8-1-1']
      },
      {
        id: 'mod8-2',
        moduleId: 'mod8',
        title: 'L\'Analyseur Syntaxique (Parser)',
        description: 'Construire un arbre à partir des tokens.',
        order: 2,
        content: {
          simpleExplanation: 'Le parseur prend la suite de mots générée par le lexer et vérifie si la grammaire est correcte, tout en construisant un arbre (AST - Abstract Syntax Tree).',
          deepExplanation: 'Un parseur par descente récursive (Recursive Descent Parser) est très courant pour les petits langages. Il utilise une fonction pour chaque règle de grammaire. Par exemple, une fonction `parseExpression()`, une fonction `parseStatement()`. L\'AST généré est une représentation structurée du programme en mémoire. Chaque nœud correspond à une opération ou une entité (ex: Nœud d\'Addition, Nœud de Variable, Nœud de Boucle).',
          example: {
            title: 'Exemple d\'AST',
            code: `// Code: a = 5 * 2 + 3;

// AST (Arbre Syntaxique Abstrait)
AssignmentNode(
  target: IdentifierNode("a"),
  value: BinaryOpNode(
    operator: "+",
    left: BinaryOpNode(
      operator: "*",
      left: LiteralNode(5),
      right: LiteralNode(2)
    ),
    right: LiteralNode(3)
  )
)`,
            language: 'js',
            explanation: 'Remarquez comment l\'ordre des opérations est implicitement encodé dans la structure de l\'arbre. Le nœud de multiplication est plus bas que le nœud d\'addition.'
          },
          commonMistake: {
            title: 'Précédence des opérateurs',
            content: 'Une erreur fréquente est de mal gérer l\'ordre des opérations (ex: calculer 5 * (2 + 3) au lieu de (5 * 2) + 3). Les parseurs utilisent souvent des techniques comme "Pratt Parsing" pour gérer élégamment les priorités d\'opérateurs.'
          },
          practicalTip: {
            title: 'S\'arrêter à la première erreur ?',
            content: 'Un bon parseur ne s\'arrête pas à la première erreur de syntaxe. Il essaie de "récupérer" (Error Recovery) en sautant jusqu\'au prochain point-virgule, par exemple, pour rapporter un maximum d\'erreurs en une seule compilation.'
          },
          mcuscriptLink: 'L\'AST de McuScript sera la structure fondamentale qui sera ensuite analysée sémantiquement (vérification des types) avant d\'être convertie en Représentation Intermédiaire (IR).'
        },
        exercises: ['ex-mod8-2-1']
      }
    ]
  },
  {
    id: 'mod9',
    title: 'La Représentation Intermédiaire (IR)',
    description: 'Le pont entre le langage de haut niveau et l\'assembleur.',
    icon: 'Share2',
    color: 'accent-cyan',
    order: 9,
    lessons: [
      {
        id: 'mod9-1',
        moduleId: 'mod9',
        title: 'Introduction à l\'IR et SSA',
        description: 'Pourquoi ne pas générer de l\'assembleur tout de suite ?',
        order: 1,
        content: {
          simpleExplanation: 'L\'IR est un faux langage assembleur, indépendant de la machine cible. SSA signifie que chaque variable n\'est modifiée qu\'une seule fois.',
          deepExplanation: 'La forme SSA (Static Single Assignment) est magique pour l\'optimisation. Au lieu d\'avoir `x = 1; x = x + 1;`, l\'IR générera `%x1 = 1; %x2 = add %x1, 1`. Cela facilite grandement la traque des dépendances de données et la suppression de code mort. L\'IR a généralement un nombre infini de "registres virtuels".',
          example: {
            title: 'Forme SSA',
            code: `; Pseudo-code source:
; int a = 10;
; if (cond) a = 20;
; print(a);

; En LLVM IR (SSA form)
define void @test(i1 %cond) {
entry:
  br i1 %cond, label %if_true, label %if_end

if_true:
  br label %if_end

if_end:
  ; Le nœud Phi choisit la valeur selon d'où l'on vient !
  %a.final = phi i32 [ 20, %if_true ], [ 10, %entry ]
  call void @print(i32 %a.final)
  ret void
}`,
            language: 'llvm',
            explanation: 'Le nœud "Phi" (φ) est la clé du SSA pour gérer les branches. Il dit "si je viens du bloc if_true, a.final vaut 20. Si je viens de entry, a.final vaut 10".'
          },
          commonMistake: {
            title: 'Ne pas comprendre Phi',
            content: 'Les nœuds Phi peuvent être déroutants au début, mais ils sont obligatoires en SSA car une variable ne peut pas être mutée. L\'alternative est d\'allouer la variable sur la pile et d\'utiliser load/store, puis de laisser une passe d\'optimisation (`mem2reg` en LLVM) insérer les nœuds Phi à votre place.'
          },
          practicalTip: {
            title: 'Laissez LLVM faire le travail difficile',
            content: 'Générez des accès mémoire (alloca, load, store) pour toutes vos variables locales. Ensuite, appliquez la passe "promouvoir la mémoire en registres", qui générera la forme SSA optimale.'
          },
          mcuscriptLink: 'McuScript utilisera probablement LLVM IR. Vous générerez des instructions comme `add`, `sub`, `icmp` pour exprimer la logique de McuScript, sans vous soucier de RAX ou R0.'
        },
        exercises: ['ex-mod9-1-1']
      }
    ]
  },
  {
    id: 'mod10',
    title: 'Optimisation du Code (Middle-end)',
    description: 'Rendre le code plus rapide et plus petit avant la compilation.',
    icon: 'Activity',
    color: 'accent-green',
    order: 10,
    lessons: [
      {
        id: 'mod10-1',
        moduleId: 'mod10',
        title: 'Passes d\'Optimisation Communes',
        description: 'Comment le compilateur améliore votre code.',
        order: 1,
        content: {
          simpleExplanation: 'Le middle-end lit votre code et trouve des astuces pour le simplifier, comme pré-calculer des maths ou enlever du code inutile.',
          deepExplanation: 'Les optimisations sont appliquées sous forme de "passes". Exemples : \n- Constant Folding (plier les constantes : `3 * 4` devient `12`).\n- Dead Code Elimination (supprimer le code inatteignable ou les résultats non utilisés).\n- Loop Invariant Code Motion (sortir d\'une boucle un calcul qui donne toujours le même résultat).\n- Inlining (remplacer un appel de fonction par le corps de la fonction).',
          example: {
            title: 'Effet de l\'Inlining',
            code: `// Avant Inlining
int carre(int x) { return x * x; }
int calcul() { return carre(5); }

// Après Inlining
int calcul() { return 5 * 5; }

// Après Constant Folding
int calcul() { return 25; }`,
            language: 'c',
            explanation: 'L\'inlining est souvent l\'optimisation la plus importante car elle débloque de nombreuses autres optimisations (comme le constant folding ici).'
          },
          commonMistake: {
            title: 'Tout inliner',
            content: 'Inliner à l\'excès augmente drastiquement la taille du binaire (Code Bloat). Cela peut nuire aux performances car le code risque de ne plus tenir dans le cache d\'instructions (i-cache) du processeur.'
          },
          practicalTip: {
            title: 'Utilisez les attributs',
            content: 'En C/C++, `inline` est juste une suggestion. `__attribute__((always_inline))` force le compilateur. En McuScript, vous pourriez avoir un mot-clé similaire pour le code critique en temps (comme les handlers d\'interruption).'
          },
          mcuscriptLink: 'Pour les microcontrôleurs (Mcu), la taille du code (flash) est critique. McuScript utilisera souvent l\'optimisation `-Os` ou `-Oz` de LLVM, qui privilégie des binaires minuscules.'
        },
        exercises: ['ex-mod10-1-1']
      }
    ]
  },
  {
    id: 'mod11',
    title: 'Génération de Code (Backend)',
    description: 'De l\'IR virtuelle aux véritables instructions processeur.',
    icon: 'Cpu',
    color: 'accent-red',
    order: 11,
    lessons: [
      {
        id: 'mod11-1',
        moduleId: 'mod11',
        title: 'Sélection d\'Instructions & Allocation',
        description: 'Transformer l\'IR en assembleur spécifique.',
        order: 1,
        content: {
          simpleExplanation: 'Le backend choisit quelles instructions machine utiliser pour accomplir l\'IR, puis assigne des vrais registres physiques.',
          deepExplanation: 'La Sélection d\'Instructions (Instruction Selection) map un graphe d\'opérations IR sur les instructions du CPU. Par exemple, un CPU x86 peut avoir une instruction complexe combinant une addition et un chargement mémoire. L\'Allocation de Registres (Register Allocation) prend les variables virtuelles infinies et les place dans les registres physiques (ex: RAX, RBX). Si on manque de registres, on effectue du "Spilling" (déversement) sur la pile.',
          example: {
            title: 'Spilling (Déversement)',
            code: `; Si nous avons 20 variables mais seulement 16 registres...
; Le compilateur devra faire du Spill :
mov [rsp+16], rax  ; Sauvegarde temporaire en mémoire (Spill)
; ... utilise rax pour autre chose ...
mov rax, [rsp+16]  ; Restauration depuis la mémoire (Reload)`,
            language: 'asm',
            explanation: 'Le but du Register Allocator est de minimiser ces opérations Spill/Reload car la RAM (même dans le cache L1) est plus lente que les registres.'
          },
          commonMistake: {
            title: 'Trop de variables locales actives',
            content: 'Si vous avez une énorme fonction avec beaucoup de variables vivantes simultanément (High Register Pressure), le compilateur génèrera beaucoup de spills, ralentissant considérablement l\'exécution. Découpez en petites fonctions !'
          },
          practicalTip: {
            title: 'Coloration de Graphe (Graph Coloring)',
            content: 'L\'allocation de registres est souvent modélisée comme un problème de coloration de graphe : deux variables ne peuvent pas avoir la même "couleur" (le même registre physique) si leurs durées de vie se chevauchent.'
          },
          mcuscriptLink: 'C\'est ici que le ciblage multi-plateforme prend tout son sens. LLVM possède un backend x86, un backend ARM, un backend AVR. L\'IR de McuScript restera la même, mais le backend génèrera le code approprié.'
        },
        exercises: ['ex-mod11-1-1']
      }
    ]
  }
];
