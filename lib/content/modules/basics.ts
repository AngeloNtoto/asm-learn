import { Module } from '../../types';

export const basicsModules: Module[] = [
  {
    id: 'mod1',
    title: 'Introduction à l Assembleur',
    description: 'Comprendre ce qu est l assembleur, pourquoi l apprendre, et découvrir l architecture de base d un processeur.',
    icon: 'cpu',
    color: 'accent-cyan',
    order: 1,
    lessons: [
      {
        id: 'mod1-1',
        moduleId: 'mod1',
        title: 'Qu est-ce que l assembleur ?',
        description: 'Le langage de programmation le plus proche de la machine.',
        order: 1,
        content: {
          simpleExplanation: 'L assembleur (ou ASM) est la traduction en texte des 0 et des 1 que le processeur comprend. Chaque instruction en assembleur correspond presque toujours à une seule instruction machine exécutable par le CPU.',
          deepExplanation: 'Contrairement aux langages de haut niveau (Python, C++) qui sont traduits en de multiples instructions par un compilateur, l assembleur vous donne un contrôle direct sur le matériel. Vous gérez manuellement la mémoire, les registres et le flux d exécution. C est le pont entre le logiciel et le matériel. **Approfondissement :** Le processeur ne comprend que le langage machine, une suite binaire. Par exemple, sur x86, l instruction `mov rax, 5` est assemblée en `48 C7 C0 05 00 00 00` (les octets varient selon l assembleur). L assembleur est donc un simple "traducteur" de texte vers binaire, sans optimisation – c est vous qui contrôlez chaque octet. Historiquement, les premiers ordinateurs se programmaient en binaire pur, puis des mnémoniques ont été inventés pour ne plus avoir à mémoriser les codes machines.',
          example: {
            title: 'Haut niveau vs Bas niveau',
            code: '; En Python: x = 5\n; En Assembleur x86-64:\nmov rax, 5  ; Place la valeur 5 dans le registre rax\n\n; En langage machine (hexadécimal):\n48 C7 C0 05 00 00 00',
            language: 'asm',
            explanation: 'L instruction "mov" (move) copie la valeur de droite (5) dans la destination de gauche (le registre rax). Les octets `48 C7 C0` indiquent l instruction, les `05 00 00 00` représentent le nombre 5 en little-endian.'
          },
          commonMistake: {
            title: 'Penser que l ASM est portable',
            content: 'Le code assembleur est spécifique à une architecture de processeur (ex: x86, ARM, RISC-V). Le code écrit pour votre PC (x86-64) ne fonctionnera pas sur votre smartphone (ARM) sans être réécrit. **De plus :** même au sein d une même famille, des différences existent – par exemple, le jeu d instructions AVX-512 n est pas disponible sur tous les x86. Un programme écrit pour un Core i9 peut planter sur un vieux Pentium.'
          },
          practicalTip: {
            title: 'L ASM n est pas magique, il est juste détaillé',
            content: 'Ne soyez pas intimidé par la longueur du code. L assembleur n est pas plus "difficile" que Python, il exige simplement de décomposer chaque action en très petites étapes logiques. **Astuce :** Commencez par écrire un petit programme en C, puis demandez au compilateur de générer l assembleur (`gcc -S -O0 moncode.c`). Comparez votre code C avec le fichier `.s` obtenu. Vous verrez que chaque ligne C correspond à plusieurs instructions ASM.'
          },
          mcuscriptLink: 'Dans McuScript, le backend de notre compilateur devra générer ces instructions spécifiques à l architecture cible. Comprendre l ASM est la clé pour écrire un backend efficace et portable. **Pour allez plus loin :** McuScript pourrait avoir une option pour afficher l assembleur généré, comme le fait Rust avec `--emit asm`.',
          thinkLikeMachine: 'La machine ne connaît pas les concepts de "variable", de "boucle for" ou de "fonction". Elle ne connaît que "déplacer des données", "calculer", et "sauter à une adresse". **Concrètement :** une variable en C n existe pas – le compilateur lui attribue simplement un registre ou un emplacement mémoire (une adresse). Une boucle `for` devient un label, une comparaison, et un saut conditionnel en arrière.'
        },
        exercises: ['ex-mod1-1-1', 'ex-mod1-1-2']
      },
      {
        id: 'mod1-2',
        moduleId: 'mod1',
        title: 'Pourquoi apprendre l ASM ?',
        description: 'Les avantages de comprendre le bas niveau.',
        order: 2,
        content: {
          simpleExplanation: 'Apprendre l assembleur fait de vous un meilleur développeur, même si vous n en écrivez jamais dans votre travail quotidien.',
          deepExplanation: 'Comprendre l ASM vous permet de : \n1. Comprendre le coût réel de vos algorithmes.\n2. Déboguer des problèmes complexes (quand le code source n est pas disponible).\n3. Optimiser du code critique (jeux, calcul haute performance).\n4. Écrire des compilateurs et concevoir des langages (comme McuScript !)\n5. Faire de la rétro-ingénierie et de la sécurité informatique.\n**Approfondissement :** Beaucoup de vulnérabilités (buffer overflow, ROP) ne peuvent être comprises sans une connaissance fine de la pile, des registres, et du code assembleur. Les reverse engineers lisent l ASM quotidiennement car ils n ont pas le code source. Les ingénieurs en performance utilisent des outils comme `perf` qui remontent jusqu aux instructions pour localiser les goulots d étranglement (ex : trop de branchements mal prédits).',
          example: {
            title: 'L impact sur la conception',
            code: '// C++ code: a = b * 2;\n\n; Assembleur naif:\nmul eax, 2\n\n; Assembleur optimisé (shift left):\nshl eax, 1\n\n; Sur certaines architectures, mul est 3 à 5 fois plus lent que shl.',
            language: 'asm',
            explanation: 'Un bon compilateur (et un développeur qui connaît l ASM) sait qu une multiplication par une puissance de 2 est plus rapide à exécuter via un décalage de bits (shift left). **Autre exemple :** diviser par une puissance de 2 peut être fait avec `shr` (shift right) ou même avec une multiplication par l inverse pour une meilleure précision.'
          },
          commonMistake: {
            title: 'Réinventer la roue',
            content: 'N écrivez pas d applications entières en ASM. Utilisez-le là où c est nécessaire (optimisation critique) ou pour comprendre le système. **Erreur fréquente :** vouloir réécrire une fonction déjà optimisée par le compilateur. Les compilateurs modernes (GCC, Clang, MSVC) font des centaines d optimisations que vous ne surpasserez probablement pas seul. Utilisez l ASM pour lire le code généré et comprendre ce que le compilateur fait, pas pour tout réécrire.'
          },
          practicalTip: {
            title: 'Lisez-le avant de l écrire',
            content: 'Une excellente façon d apprendre est de compiler un programme C très simple avec l option de générer l assembleur (ex: `gcc -S`) et de lire le résultat. **Astuce :** Utilisez `objdump -d` sur un binaire compilé pour voir l assembleur final, même sans les symboles. Ajoutez `-M intel` si vous préférez la syntaxe Intel à la syntaxe AT&T par défaut.'
          },
          mcuscriptLink: 'Pour créer McuScript, vous devez savoir comment votre langage sera traduit in fine. Si vous savez quel ASM est efficace, vous pourrez concevoir votre représentation intermédiaire (IR) pour qu elle se traduise facilement vers cet ASM efficace. **Piste :** regardez la LLVM IR générée pour une simple expression `a*b+2` – vous verrez des instructions `load`, `mul`, `add`. Le backend LLVM transforme cela en `imul`, `add`, etc.'
        },
        exercises: ['ex-mod1-2-1']
      }
    ]
  },
  {
    id: 'mod2',
    title: 'Registres et Mémoire',
    description: 'Plongée dans l espace de travail du processeur : registres, pile et adressage.',
    icon: 'database',
    color: 'accent-purple',
    order: 2,
    lessons: [
      {
        id: 'mod2-1',
        moduleId: 'mod2',
        title: 'Les Registres',
        description: 'La mémoire ultra-rapide au cœur du CPU.',
        order: 1,
        content: {
          simpleExplanation: 'Les registres sont de toutes petites "boîtes" situées directement à l intérieur du processeur. Ils stockent les données sur lesquelles le CPU est en train de travailler.',
          deepExplanation: 'L accès à la RAM (mémoire principale) est très lent comparé à la vitesse du processeur. Le CPU utilise donc des registres pour stocker temporairement les valeurs pendant les calculs. En architecture x86-64, les registres généraux font 64 bits (ex: RAX, RBX, RCX). **Approfondissement :** Le temps d accès à un registre est typiquement 1 cycle d horloge, alors qu un accès RAM prend entre 50 et 100 cycles (voire plus si page fault). C est pourquoi les compilateurs essaient de garder le maximum de variables dans les registres. Il existe aussi des registres spéciaux : le compteur de programme (RIP), le pointeur de pile (RSP), le pointeur de base (RBP), et les drapeaux (FLAGS).',
          example: {
            title: 'Utilisation des registres',
            code: '; Additionner deux nombres\nmov rax, 10    ; rax = 10\nmov rbx, 20    ; rbx = 20\nadd rax, rbx   ; rax = rax + rbx (rax vaut maintenant 30)\n\n; Montrer qu on peut aussi additionner en mémoire\nmov rcx, [var]  ; charge la variable var en mémoire dans rcx\nadd rax, rcx    ; ajoute cette valeur',
            language: 'asm',
            explanation: 'Ici, RAX et RBX agissent comme des variables temporaires. **Note :** Si vous aviez utilisé `add rax, [var]` directement, le CPU va charger [var] en cache, mais c est implicitement comme un mov puis add.'
          },
          commonMistake: {
            title: 'Supposer qu un registre garde sa valeur',
            content: 'De nombreuses instructions modifient les registres implicitement (ex: `mul` modifie rax et rdx). Ne supposez jamais qu un registre conserve sa valeur indéfiniment, surtout après un appel de fonction. **Convention d appel (calling convention) :** Sous Windows x64, les registres RCX, RDX, R8, R9 sont utilisés pour les paramètres et peuvent être écrasés par la fonction appelée. Sous System V (Linux), RDI, RSI, RDX, RCX, R8, R9. Les registres RBX, RBP, R12..R15 doivent être sauvegardés par la fonction.'
          },
          practicalTip: {
            title: 'Noms des registres et tailles',
            content: 'RAX = 64 bits. EAX = les 32 bits de poids faible de RAX. AX = les 16 bits bas. AL/AH = les 8 bits bas/hauts de AX. Modifier EAX met à zéro les 32 bits supérieurs de RAX ! **Pourquoi ?** C est une optimisation : écrire dans EAX évite de payer le coût d une opération 64 bits si on ne veut que 32 bits. Exemple : `mov eax, 0xFFFFFFFF` donnera `rax = 0x00000000FFFFFFFF`. Si on veut sign-extendre, on utilise `movsx`.',
          },
          mcuscriptLink: 'Dans la conception du compilateur McuScript, un composant critique s appelle "l allocation de registres" (Register Allocation). L IR (qui suppose avoir un nombre infini de "variables virtuelles") doit être mappé sur le nombre très limité de registres physiques de la cible. **Problème concret :** vous avez 100 variables temporaires dans une fonction. Le compilateur doit choisir 16 registres pour les plus utilisées et " spill " (déverser) les autres en mémoire (pile). Les algorithmes d allocation (graph coloring, linear scan) sont complexes et incontournables.',
          thinkLikeMachine: 'Je n ai que 16 variables disponibles simultanément. Si j ai besoin de plus de variables, je dois sauvegarder temporairement certaines valeurs dans la mémoire plus lente (la pile). **Conséquence :** Réutiliser une variable déjà dans un registre est beaucoup plus rapide que de la recharger depuis la pile.'
        },
        exercises: ['ex-mod2-1-1', 'ex-mod2-1-2']
      },
      {
        id: 'mod2-2',
        moduleId: 'mod2',
        title: 'La Pile (Stack)',
        description: 'La mémoire de travail temporaire pour les fonctions.',
        order: 2,
        content: {
          simpleExplanation: 'La pile est une zone de la mémoire RAM qui fonctionne comme une pile d assiettes : le dernier élément ajouté (Push) est le premier à être retiré (Pop).',
          deepExplanation: 'Le registre RSP (Stack Pointer) pointe vers le sommet de la pile. La pile "grandit vers le bas" en mémoire (vers les adresses plus petites). Elle sert à sauvegarder les registres, passer des arguments aux fonctions et stocker les variables locales. **Approfondissement :** Une trame de pile (stack frame) commence par l adresse de retour (sauvegardée par `call`), puis souvent l ancien RBP (si on utilise frame pointer), puis les variables locales. Les arguments au-delà des 4-6 registres sont aussi passés sur la pile. Sur x86-64 Windows, les 4 premiers arguments sont RCX, RDX, R8, R9, le reste sur la pile. Sous Linux, on utilise RDI, RSI, RDX, RCX, R8, R9, puis la pile.',
          example: {
            title: 'Push et Pop',
            code: 'mov rax, 42\npush rax       ; Sauvegarde la valeur de rax (42) sur la pile\n\nmov rax, 99    ; rax est modifié\n\npop rax        ; Restaure la valeur de rax (rax redevient 42)\n\n; Visualisation :\n; Au début : RSP = 0x7FFFFFFF0000\n; push rax -> RSP = 0x7FFFFFFEFFF8, écrit 42 à cette adresse\n; pop rax  -> lit à 0x7FFFFFFEFFF8, puis RSP = 0x7FFFFFFF0000',
            language: 'asm',
            explanation: 'push rax diminue RSP de 8 (car RAX fait 8 octets) puis écrit à [RSP]. pop rax lit à [RSP] puis augmente RSP de 8.'
          },
          commonMistake: {
            title: 'Déséquilibrer la pile',
            content: 'Si vous faites un push mais oubliez de faire un pop correspondant avant la fin de votre fonction, l adresse de retour lue par l instruction ret sera fausse, provoquant un crash immédiat (Segfault). **Cas typique :** Dans une fonction, vous sauvegardez plusieurs registres avec push, mais vous oubliez de faire autant de pop avant ret. Le premier pop va restaurer l adresse de retour corrompue. Utilisez `pusha`/`popa` (obsolète) ou des macros pour éviter cela.'
          },
          practicalTip: {
            title: 'Visualisez la pile grandissant vers le bas',
            content: 'Rappelez-vous : Ajouter un élément (push) SOUSTRAIT de l adresse. Retirer un élément (pop) AJOUTE à l adresse. **Astuce mnémotechnique :** La pile ressemble à une montagne – quand vous empilez, vous allez plus bas (moins d altitude).'
          },
          mcuscriptLink: 'McuScript gérera tout cela automatiquement ! L utilisateur ne verra jamais la pile. Mais votre backend devra générer le prologue et l épilogue de chaque fonction pour préparer la "Stack Frame" (cadre de pile). **Exemple de prologue :** `push rbp ; mov rbp, rsp ; sub rsp, 32` pour réserver 32 octets aux variables locales. Puis `mov rsp, rbp ; pop rbp ; ret` en épilogue. Vous devez aussi aligner la pile (16 octets avant call, selon ABI).'
        },
        exercises: ['ex-mod2-2-1', 'ex-mod2-2-2', 'ex-mod2-2-3']
      }
    ]
  },
  {
    id: 'mod3',
    title: 'Instructions Fondamentales',
    description: 'Apprenez à manipuler les données et faire des calculs.',
    icon: 'code',
    color: 'accent-green',
    order: 3,
    lessons: [
      {
        id: 'mod3-1',
        moduleId: 'mod3',
        title: 'Déplacement de données (mov)',
        description: 'L instruction la plus courante en assembleur.',
        order: 1,
        content: {
          simpleExplanation: 'L instruction mov (move) sert à copier des données d un endroit à un autre.',
          deepExplanation: 'Malgré son nom, mov ne déplace pas vraiment (elle n efface pas la source), elle copie. La syntaxe Intel est `mov destination, source`. Les opérandes doivent être de la même taille. **Approfondissement :** Il existe des variantes : `movzx` (move with zero-extend) pour étendre un petit registre à un plus grand en mettant des 0 dans les bits de poids fort ; `movsx` (sign-extend) pour étendre en conservant le signe. `mov` ne peut pas copier de mémoire vers mémoire ; il faut passer par un registre temporaire. Sur architectures RISC comme ARM, `mov` n existe qu entre registres, et les constantes sont limitées (chargées avec `ldr`).',
          example: {
            title: 'Différentes formes de MOV',
            code: 'mov rax, 42        ; Valeur immédiate vers registre\nmov rbx, rax       ; Registre vers registre\nmov [rcx], rax     ; Registre vers mémoire (déréférencement de rcx)\nmov rdx, [rcx]     ; Mémoire vers registre\n\nmovzx ecx, bl      ; met dans ECX la valeur de BL (8 bits) étendue à 32 bits avec des 0\nmovsx eax, byte ptr [rsi] ; charge un octet signé et l étend à 32 bits',
            language: 'asm',
            explanation: 'Notez qu en x86, on ne peut pas faire un mov direct de mémoire à mémoire (ex: `mov [rax], [rbx]` est invalide, il faut passer par un registre intermédiaire). **Explication interne :** Le jeu d instructions x86 est de type CISC, mais même ainsi, les concepteurs n ont pas prévu de double chargement mémoire car cela saturerait le bus.'
          },
          commonMistake: {
            title: 'Tailles incompatibles',
            content: 'Vous ne pouvez pas faire `mov eax, bl`. eax attend 32 bits, bl n en fournit que 8. Il faut utiliser `movzx` (Move with Zero-Extend) ou `movsx` (Move with Sign-Extend). **Exception :** `mov al, bl` est correct car les deux font 8 bits. Mais attention, cela ne modifie que la partie basse de RAX – les bits 8..63 restent inchangés. Si vous voulez effacer le reste, faites `xor eax, eax` d abord.',
          },
          practicalTip: {
            title: 'Les crochets [] = Déréférencement',
            content: 'En syntaxe Intel, mettre un registre entre crochets (ex: `[rax]`) équivaut au pointeur en C (ex: `*rax`). Vous accédez à la donnée située à l adresse contenue dans rax. **Attention :** L adresse est la valeur du registre, pas le contenu. Si vous voulez l adresse d une étiquette, utilisez `mov rax, offset label` (MASM) ou `lea rax, [label]` (NASM).',
          },
          mcuscriptLink: 'Dans l IR de McuScript, les opérations de mémoire seront probablement explicites (ex: les instructions `load` et `store` en LLVM IR). `mov` est l équivalent de l affectation (=). **Note pour le backend :** Quand vous traduisez `store i32 %val, i32* %ptr`, vous générez `mov [ptr], val` si val est dans un registre. Si val est une constante immédiate, vous faites `mov dword [ptr], const`.',
        },
        exercises: ['ex-mod3-1-1', 'ex-mod3-1-2']
      }
    ]
  },
  {
    id: 'mod4',
    title: 'Contrôle de Flux',
    description: 'Branchements, boucles et exécution conditionnelle.',
    icon: 'git-branch',
    color: 'accent-amber',
    order: 4,
    lessons: [
      {
        id: 'mod4-1',
        moduleId: 'mod4',
        title: 'Comparaisons et Sauts (if/else)',
        description: 'Comment le processeur prend des décisions.',
        order: 1,
        content: {
          simpleExplanation: 'Pour faire un "if", le processeur compare d abord deux valeurs, puis il "saute" vers une autre ligne de code en fonction du résultat.',
          deepExplanation: 'Le contrôle de flux se fait en deux étapes :\n1. L instruction `cmp` (compare) soustrait le second opérande du premier, jette le résultat, mais met à jour le registre d état (FLAGS).\n2. Une instruction de saut conditionnel (ex: `je` pour Jump if Equal) lit ces drapeaux et change l adresse d exécution (le registre RIP) si la condition est remplie.\n**Approfondissement des FLAGS :** Le registre FLAGS contient les bits ZF (Zero flag – mis à 1 si le résultat de la dernière opération était zéro), SF (Sign flag – copie du bit de poids fort), OF (Overflow flag – débordement signé), CF (Carry flag – retenue pour non-signé), etc. `cmp a, b` calcule a-b et met à jour ZF si a==b, CF si a<b (non-signé), SF et OF pour les comparaisons signées. Les instructions de saut comme `jg` (Jump if Greater, signé) testent la combinaison (ZF=0 et SF=OF).',
          example: {
            title: 'Implémentation d un If-Else',
            code: '    cmp rax, 10    ; Compare rax à 10\n    je est_egal    ; Si rax == 10, saute au label "est_egal"\n    \n    ; Code si rax != 10 (le "else")\n    mov rbx, 0\n    jmp fin        ; Saute par-dessus le bloc "if"\n\nest_egal:          ; Le bloc "if"\n    mov rbx, 1\n    \nfin:\n    ; Suite du programme\n\n    ; Pour un if sans else :\n    cmp rax, 10\n    jne skip_if    ; Saut si différent (not equal)\n    ; code if\nskip_if:',
            language: 'asm',
            explanation: 'Les labels (mots terminés par :) sont convertis en adresses mémoire par l assembleur lors de la compilation. **Remarque :** Le label `est_egal` et `fin` sont des adresses relatives. L assembleur calcule le déplacement (offset) pour le `jmp`.'
          },
          commonMistake: {
            title: 'Oublier le saut inconditionnel à la fin du "else"',
            content: 'Si vous oubliez le `jmp fin` à la fin de votre bloc "else", le processeur continuera son exécution en ligne droite et exécutera accidentellement le bloc "if" juste après ! **Corollaire :** Dans un enchaînement `if-else if-else`, chaque bloc (sauf le dernier) doit se terminer par un `jmp` vers la suite du programme.',
          },
          practicalTip: {
            title: 'Mnémoniques des sauts conditionnels',
            content: '`je` (Jump if Equal, ZF=1), `jne` (Not Equal, ZF=0), `jg` (Greater, pour signés, ZF=0 et SF=OF), `jl` (Less, pour signés, SF!=OF), `ja` (Above, non-signés, CF=0 et ZF=0), `jb` (Below, non-signés, CF=1). **Pour les non-signés** utilisez `ja`/`jb` (Above/Below) ; pour les signés `jg`/`jl` (Greater/Less). Une erreur fréquente est de comparer des nombres non-signés avec `jg` – le résultat sera faux si le nombre dépasse 2^31-1.',
          },
          mcuscriptLink: 'LLVM IR utilise l instruction `br` (branch) pour cela, avec une syntaxe très propre. La conversion des structures de haut niveau (`if`, `while`) en un graphe de blocs de base (Basic Blocks) reliés par des sauts est une étape fondamentale de votre futur compilateur. **Exemple en LLVM IR :** `br i1 %cond, label %then, label %else`. Le backend transforme cela en `cmp` + `je`/`jne` selon la condition.',
        },
        exercises: ['ex-mod4-1-1', 'ex-mod4-1-2']
      }
    ]
  },
  {
    id: 'mod5',
    title: 'Construire McuScript',
    description: 'Du langage assembleur vers la création de votre propre compilateur.',
    icon: 'hammer',
    color: 'accent-red',
    order: 5,
    lessons: [
      {
        id: 'mod5-1',
        moduleId: 'mod5',
        title: 'Penser comme un Compilateur',
        description: 'L architecture en 3 phases.',
        order: 1,
        content: {
          simpleExplanation: 'Un compilateur moderne (comme celui que vous allez écrire pour McuScript) ne traduit pas directement le code source en assembleur. Il le fait en trois grandes étapes.',
          deepExplanation: 'L architecture classique comprend :\n1. **Frontend** : Lit votre texte source, vérifie la syntaxe (AST) et génère une IR (représentation intermédiaire).\n2. **Middle-end** : Analyse l IR et l optimise (supprime le code mort, simplifie l arithmétique, propage les constantes), indépendamment du CPU final.\n3. **Backend** : Prend l IR optimisée et la transforme en instructions assembleur spécifiques à la puce cible (ex: x86 ou ARM Cortex-M).\n**Approfondissement :** L IR la plus célèbre est la LLVM IR, qui est typée, en forme statique à affectation unique (SSA), et infiniment expressive. Le middle-end applique des passes (ex: `-O1`, `-O2`, `-O3`) qui transforment l IR sans connaître la cible. Par exemple, la passe de propagation de constantes remplace `x = 5; y = x + 3` par `y = 8`.',
          example: {
            title: 'Le pipeline McuScript',
            code: '// Code source McuScript\nlet x = 5 + 5;\n\n// Transformé en IR (conceptuel SSA)\n%1 = add i32 5, 5\nstore i32 %1, i32* %x\n\n// Après optimisation constante (middle-end) :\nstore i32 10, i32* %x\n\n// Transformé en ASM x86 par le Backend\nmov dword [rsp-4], 10  ; (Le middle-end a pré-calculé 5+5=10 !)',
            language: 'cpp',
            explanation: 'Séparer en trois phases permet de créer un langage portable. Si vous voulez cibler un nouveau microcontrôleur, vous n avez qu à écrire un nouveau Backend ; le Frontend et l Optimiseur ne changent pas ! **Exemple concret :** Le langage Rust utilise la même LLVM IR que C++ ou Swift – c est pour cela qu il peut cibler toutes les architectures supportées par LLVM (ARM, x86, RISC-V, WebAssembly, etc.) sans effort supplémentaire.'
          },
          commonMistake: {
            title: 'Générer de l ASM directement depuis l AST',
            content: 'Pour votre projet McuScript, évitez la tentation de générer l ASM directement depuis l arbre syntaxique. Cela rend les optimisations presque impossibles et couple fermement votre langage à une architecture spécifique. **Conséquence :** Le moindre changement dans l architecture (par exemple, passer de x86 à ARM nécessiterait de tout réécrire, et vous ne pourriez pas profiter des optimisations sophistiquées des compilateurs existants.',
          },
          practicalTip: {
            title: 'Pourquoi utiliser LLVM ?',
            content: 'LLVM vous fournit un Middle-end et des dizaines de Backends (dont de nombreux microcontrôleurs) gratuitement. Votre travail principal pour McuScript sera d écrire un excellent Frontend (en C++) qui génère la LLVM IR. **Astuce :** Utilisez la bibliothèque `llvm::IRBuilder` pour construire l IR programmatiquement. Vous pouvez aussi générer un fichier texte `.ll` et le passer à `llc` pour tester.',
          },
          mcuscriptLink: 'C est l objectif ultime du projet. Comprendre l ASM vous aide à comprendre comment structurer votre IR pour que LLVM puisse la traduire efficacement vers les microcontrôleurs. **Piste avancée :** En étudiant l assembleur généré par LLVM pour différents niveaux d optimisation (`-O0` à `-O3`), vous apprendrez comment vos choix d IR influencent le code final.',
          nextStepPreview: 'Dans la prochaine leçon, nous explorerons comment concevoir une IR typée adaptée aux microcontrôleurs (notamment l utilisation de types `i8`, `i16`, `i32` pour correspondre aux registres 8, 16, 32 bits sur les petits CPU).'
        },
        exercises: ['ex-mod5-1-1']
      }
    ]
  }
];
