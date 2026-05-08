import { Module } from '../types';

export const MODULES: Module[] = [
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
  },
  {
    id: 'mod6',
    title: 'Débogage & Ingénierie Inverse',
    description: 'Lisez les entrailles d un programme. Utilisez GDB pour traquer les bugs dans l assembleur.',
    icon: 'Bug',
    color: 'var(--accent-red)',
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
    color: 'var(--accent-amber)',
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
    color: 'var(--accent-purple)',
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
    color: 'var(--accent-cyan)',
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
    color: 'var(--accent-green)',
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
    color: 'var(--accent-red)',
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
  },
  {
    id: 'mod12',
    title: 'Microcontrôleurs et Hardware',
    description: 'Programmer au plus proche du métal.',
    icon: 'Microchip',
    color: 'var(--accent-purple)',
    order: 12,
    lessons: [
      {
        id: 'mod12-1',
        moduleId: 'mod12',
        title: 'Mémoire mappée en E/S (MMIO)',
        description: 'Comment allumer une LED en écrivant dans la mémoire.',
        order: 1,
        content: {
          simpleExplanation: 'Sur un microcontrôleur, pour interagir avec des périphériques (LED, Capteurs), on écrit simplement des valeurs à des adresses mémoires spécifiques.',
          deepExplanation: 'Le Memory-Mapped I/O (MMIO) est le paradigme principal de l\'embarqué. Les broches matérielles (GPIO) sont contrôlées par des registres matériels mappés à des adresses physiques. En C, on utilise un pointeur volatil vers cette adresse. Le mot-clé `volatile` est crucial : il empêche le compilateur d\'optimiser (supprimer) les accès mémoire, car le périphérique matériel a des effets de bord.',
          example: {
            title: 'Faire clignoter une LED',
            code: `// Adresse du registre de bascule (Toggle) GPIO
#define GPIOA_ODR (*(volatile unsigned int*)0x48000014)

void toggle_led() {
    GPIOA_ODR ^= (1 << 5); // Inverse le bit 5
}`,
            language: 'c',
            explanation: 'Le compilateur génèrera un load depuis l\'adresse 0x48000014, un XOR avec 32, et un store à cette adresse. L\'électronique du microcontrôleur capte cette écriture et inverse le voltage sur la broche.'
          },
          commonMistake: {
            title: 'Oublier volatile',
            content: 'Si vous n\'utilisez pas `volatile`, l\'optimiseur verra `x = 1; x = 0;` et supprimera le `x = 1` le jugeant inutile. La LED ne clignotera jamais !'
          },
          practicalTip: {
            title: 'Masques de bits',
            content: 'La manipulation de bits est reine. `|= (1<<N)` pour allumer le bit N, `&= ~(1<<N)` pour l\'éteindre, `^= (1<<N)` pour l\'inverser. Apprenez ces idiomes par cœur.'
          },
          mcuscriptLink: 'McuScript devra avoir une syntaxe simple et sûre pour manipuler les registres matériels MMIO, possiblement inspirée par les caisses `svd2rust` ou les abstractions matérielles modernes.'
        },
        exercises: ['ex-mod12-1-1']
      },
      {
        id: 'mod12-2',
        moduleId: 'mod12',
        title: 'Interruptions (IRQs)',
        description: 'Réagir immédiatement au matériel.',
        order: 2,
        content: {
          simpleExplanation: 'Une interruption force le CPU à mettre en pause son programme actuel, exécuter une petite fonction (ISR) en réponse à un événement matériel (ex: appui sur un bouton), puis reprendre.',
          deepExplanation: 'L\'Interruptions Service Routine (ISR) est gérée par le contrôleur d\'interruptions (ex: NVIC sur ARM Cortex-M). Quand une IRQ arrive, le hardware sauvegarde automatiquement quelques registres sur la pile, puis saute à l\'adresse de l\'ISR (lue depuis la table des vecteurs d\'interruption). L\'ISR doit s\'exécuter très rapidement et acquitter (clear) l\'interruption au niveau du périphérique.',
          example: {
            title: 'Handler d\'Interruption',
            code: `// Fonction appelée automatiquement par le CPU
void EXTI0_IRQHandler(void) {
    // 1. Faire le travail (ex: lire le bouton)
    button_pressed = 1;
    
    // 2. Acquitter l'interruption (Clear pending flag)
    EXTI->PR = (1 << 0);
}`,
            language: 'c',
            explanation: 'L\'attribut matériel de cette fonction exige qu\'elle ne prenne aucun paramètre et ne retourne rien.'
          },
          commonMistake: {
            title: 'Bloquer dans une ISR',
            content: 'Ne mettez jamais de boucle d\'attente, de `delay()` ou de `printf()` (qui est lent) dans une ISR. Cela bloque tout le système. Levez plutôt un flag pour que la boucle principale traite l\'événement plus tard.'
          },
          practicalTip: {
            title: 'Volatile pour les flags',
            content: 'Les variables partagées entre une ISR et le programme principal DOIVENT être déclarées `volatile`, sinon la boucle principale risque de cacher (cacher en registre) la variable et ne jamais voir le changement.'
          },
          mcuscriptLink: 'McuScript pourrait intégrer un mot-clé natif `interrupt` pour sécuriser les ISR, garantir qu\'elles n\'utilisent pas trop de pile et vérifier les variables partagées.'
        },
        exercises: ['ex-mod12-2-1']
      }
    ]
  },
  {
    id: 'mod13',
    title: 'Sujets Avancés',
    description: 'SIMD, Threading, et Conventions.',
    icon: 'Layers',
    color: 'var(--accent-amber)',
    order: 13,
    lessons: [
      {
        id: 'mod13-1',
        moduleId: 'mod13',
        title: 'Assembleur Vectoriel (SIMD)',
        description: 'Single Instruction, Multiple Data.',
        order: 1,
        content: {
          simpleExplanation: 'Au lieu d\'additionner les nombres un par un, le CPU peut en additionner 4, 8 ou 16 en une seule instruction !',
          deepExplanation: 'Les jeux d\'instructions SIMD (SSE, AVX, NEON) utilisent des registres géants (128, 256, ou 512 bits). Vous chargez 8 flottants 32 bits dans un registre, 8 dans un autre, et une instruction d\'addition vectorielle additionne les 8 paires en parallèle. C\'est crucial pour le rendu graphique, l\'IA et le traitement du signal.',
          example: {
            title: 'Addition SIMD (Intrinsics C)',
            code: `#include <immintrin.h>

void add_arrays(float* a, float* b, float* result) {
    // Charge 8 floats depuis a et b (AVX 256 bits)
    __m256 va = _mm256_loadu_ps(a);
    __m256 vb = _mm256_loadu_ps(b);
    
    // Addition vectorielle
    __m256 vr = _mm256_add_ps(va, vb);
    
    // Stocke le résultat
    _mm256_storeu_ps(result, vr);
}`,
            language: 'c',
            explanation: 'Les "intrinsics" sont des fonctions C qui se compilent directement en instructions ASM spécifiques. C\'est plus facile que d\'écrire de l\'assembleur pur tout en gardant des performances maximales.'
          },
          commonMistake: {
            title: 'Alignement mémoire',
            content: 'Beaucoup d\'instructions SIMD nécessitent que les données soient alignées en mémoire (ex: adresses multiples de 16 ou 32 octets). Un chargement non aligné (`load`) peut crasher le programme (Segfault).'
          },
          practicalTip: {
            title: 'Auto-vectorisation',
            content: 'Les compilateurs modernes (GCC, Clang) savent souvent transformer une simple boucle `for` en instructions SIMD (Auto-vectorization) si vous compilez avec `-O3 -march=native`. Vérifiez l\'assembleur généré !'
          },
          mcuscriptLink: 'Bien que rare sur les microcontrôleurs bas de gamme, les processeurs modernes (ex: ARM Cortex-M4F) possèdent des instructions SIMD rudimentaires. McuScript pourrait proposer des types de vecteurs natifs.'
        },
        exercises: ['ex-mod13-1-1']
      }
    ]
  },
  {
    id: 'mod14',
    title: 'Conventions d\'Appel (ABI)',
    description: 'Comment les fonctions se parlent entre elles.',
    icon: 'Network',
    color: 'var(--accent-cyan)',
    order: 14,
    lessons: [
      {
        id: 'mod14-1',
        moduleId: 'mod14',
        title: 'Le Contrat de l\'ABI',
        description: 'Qui sauvegarde quoi et comment passer les arguments.',
        order: 1,
        content: {
          simpleExplanation: 'Quand une fonction A appelle une fonction B, elles doivent se mettre d\'accord : où sont les paramètres ? Où est la valeur de retour ? Qui doit nettoyer la mémoire ? C\'est l\'ABI.',
          deepExplanation: 'L\'Application Binary Interface (ABI) définit le standard d\'interaction au niveau assembleur. Sans ABI, le code compilé par GCC ne pourrait pas appeler une bibliothèque compilée par Clang. \nIl existe plusieurs conventions d\'appel célèbres :\n- **cdecl** (C Declaration) : Historique x86 32-bits. L\'appelant nettoie la pile, arguments empilés de droite à gauche.\n- **System V AMD64 ABI** : Standard Linux x86-64. Les 6 premiers arguments entiers sont dans RDI, RSI, RDX, RCX, R8, R9. Le reste sur la pile. Valeur de retour dans RAX.\n- **Microsoft x64 Calling Convention** : Standard Windows. Les 4 premiers arguments dans RCX, RDX, R8, R9. De plus, l\'appelant DOIT réserver 32 octets sur la pile ("Shadow Space") pour que la fonction appelée puisse y sauvegarder les registres si besoin.',
          example: {
            title: 'Appel d\'une fonction (System V Linux)',
            code: `; En C: printf("%d, %d", 42, 99);

; En Assembleur (Linux x86-64):
mov rdi, offset str_format  ; 1er argument (pointeur) dans RDI
mov rsi, 42                 ; 2ème argument dans RSI
mov rdx, 99                 ; 3ème argument dans RDX
xor eax, eax                ; Pour les fonctions variadiques (comme printf), 
                            ; AL contient le nombre de vecteurs (0 ici)
call printf`,
            language: 'asm',
            explanation: 'En passant par les registres plutôt que par la pile, on gagne énormément en vitesse (pas d\'accès mémoire lent).'
          },
          commonMistake: {
            title: 'Les registres volatils vs non-volatils',
            content: 'Certains registres sont "Caller-saved" (volatils) et d\'autres "Callee-saved" (non-volatils). Si vous écrivez une fonction, vous avez le droit d\'écraser RAX, RCX, RDX sans rien demander. MAIS si vous modifiez RBX, RBP ou R12, vous DEVEZ les sauvegarder (push) au début et les restaurer (pop) à la fin. Sinon, la fonction qui vous a appelé va crasher !'
          },
          practicalTip: {
            title: 'Le Shadow Space (Windows)',
            content: 'Si vous programmez en ASM pur sous Windows x64, n\'oubliez jamais de faire `sub rsp, 32` avant un `call` pour allouer le shadow space, même si la fonction ne prend qu\'un seul paramètre, puis `add rsp, 32` après.'
          },
          mcuscriptLink: 'Le backend de McuScript devra implémenter strictement l\'ABI de sa cible pour pouvoir appeler la libc (comme `malloc` ou `printf`) ou des fonctions C externes (FFI - Foreign Function Interface).'
        },
        exercises: ['ex-mod14-1-1']
      }
    ]
  },
  {
    id: 'mod15',
    title: 'Données Avancées: Flottants et Structs',
    description: 'Représentation en mémoire des structures complexes.',
    icon: 'Box',
    color: 'var(--accent-purple)',
    order: 15,
    lessons: [
      {
        id: 'mod15-1',
        moduleId: 'mod15',
        title: 'Nombres à Virgule Flottante (FPU)',
        description: 'La norme IEEE-754 et les coprocesseurs.',
        order: 1,
        content: {
          simpleExplanation: 'Les nombres à virgule ne sont pas stockés comme de simples entiers. Ils utilisent une formule scientifique (Signe, Exposant, Mantisse) et sont calculés par une partie spéciale du CPU (le FPU ou les unités SSE).',
          deepExplanation: 'Sur x86, on n\'utilise presque plus l\'ancien x87 FPU (la pile de registres ST0-ST7). On utilise les instructions SSE2 qui travaillent sur les registres XMM (128 bits). `movss` (Move Scalar Single-precision) charge un float, `addss` les additionne.\nLa norme IEEE-754 réserve des valeurs spéciales : NaN (Not a Number, ex: 0/0), +Infinity (1/0), et -Infinity.',
          example: {
            title: 'Addition de Floats',
            code: `; Addition de deux floats (32 bits)
movss xmm0, dword ptr [valA]  ; Charge le 1er float dans xmm0
addss xmm0, dword ptr [valB]  ; Ajoute le 2nd float
movss dword ptr [resultat], xmm0 ; Sauvegarde`,
            language: 'asm',
            explanation: 'Les calculs en virgule flottante sont plus lents et plus complexes que l\'arithmétique entière, et posent des problèmes de précision (0.1 + 0.2 != 0.3 en float).'
          },
          commonMistake: {
            title: 'Comparer des flottants avec l\'égalité stricte',
            content: 'En assembleur comme en C, utiliser l\'instruction d\'égalité sur des flottants calculés est très dangereux à cause des erreurs d\'arrondi. On compare généralement la différence absolue avec un très petit epsilon.'
          },
          practicalTip: {
            title: 'Soft Float',
            content: 'Sur certains microcontrôleurs très basiques (sans FPU/Hardware Float), le compilateur doit générer du "Soft Float" : de longues bibliothèques logicielles qui simulent l\'addition flottante en utilisant de nombreuses instructions entières. C\'est extrêmement lent !'
          },
          mcuscriptLink: 'Dans McuScript, vous pourriez décider de ne supporter QUE les entiers ou d\'utiliser la représentation en virgule fixe (Fixed-Point Math) si vous ciblez de très petits systèmes sans FPU.'
        },
        exercises: ['ex-mod15-1-1']
      },
      {
        id: 'mod15-2',
        moduleId: 'mod15',
        title: 'Structures (Structs) et Alignement',
        description: 'Le secret des trous dans la mémoire (Padding).',
        order: 2,
        content: {
          simpleExplanation: 'Quand vous regroupez plusieurs variables dans une "Structure", le compilateur peut insérer de l\'espace vide entre elles pour que le CPU puisse les lire plus vite.',
          deepExplanation: 'L\'alignement mémoire est fondamental. Un CPU 32 bits lit la RAM par blocs de 4 octets. Si un `int` (4 octets) se trouve à l\'adresse 0x01 (non aligné), le CPU devra lire le bloc à 0x00 et le bloc à 0x04 pour reconstituer l\'entier. Sur certaines architectures (ARM), un accès non aligné provoque une erreur fatale matérielle (HardFault) !\nPour éviter cela, le compilateur ajoute du "Padding" (rembourrage).',
          example: {
            title: 'Padding en C',
            code: `struct MaData {
    char a;      // 1 octet
                 // 3 octets de PADDING (invisibles) !
    int b;       // 4 octets
    short c;     // 2 octets
                 // 2 octets de PADDING finaux
};`,
            language: 'c',
            explanation: 'La taille totale de cette structure n\'est pas de 1+4+2 = 7 octets, mais de 12 octets ! L\'ordre de déclaration des variables compte : ordonnez-les du plus grand au plus petit pour minimiser la perte d\'espace.'
          },
          commonMistake: {
            title: 'Sérialisation brute de struct',
            content: 'Vous ne devez jamais envoyer une structure C brute sur un réseau ou l\'écrire dans un fichier bit à bit, car le padding dépend de l\'architecture et du compilateur. L\'autre ordinateur pourrait la lire de travers.'
          },
          practicalTip: {
            title: 'Struct Packed',
            content: 'Vous pouvez forcer le compilateur à ne pas utiliser de padding avec `__attribute__((packed))` en GCC. Mais les accès aux membres désalignés deviendront plus lents, voire causeront des plantages selon le CPU.'
          },
          mcuscriptLink: 'McuScript devra calculer minutieusement l\'alignement de ses types complexes pour allouer la bonne taille sur la pile ou dans les classes, et générer les bons calculs d\'offsets (`getelementptr` en LLVM).'
        },
        exercises: ['ex-mod15-2-1']
      }
    ]
  },
  {
    id: 'mod16',
    title: 'Sécurité et Vulnérabilités',
    description: 'Détourner le flot d\'exécution (Buffer Overflows).',
    icon: 'ShieldAlert',
    color: 'var(--accent-red)',
    order: 16,
    lessons: [
      {
        id: 'mod16-1',
        moduleId: 'mod16',
        title: 'Le Buffer Overflow classique',
        description: 'Comment écraser l\'adresse de retour.',
        order: 1,
        content: {
          simpleExplanation: 'Si un programme vous demande votre nom (maximum 10 lettres) et que vous en tapez 50, les lettres en trop vont déborder en mémoire et écraser les données importantes de la fonction, comme l\'adresse à laquelle elle est censée retourner.',
          deepExplanation: 'C\'est la vulnérabilité fondatrice de l\'exploitation système (Phreak 1996, "Smashing the Stack for Fun and Profit"). \nLa pile contient :\n1. Les variables locales (ex: un tableau `char buffer[10]`)\n2. Le frame pointer sauvegardé (RBP)\n3. L\'adresse de retour vers la fonction appelante (RIP sauvegardé).\nSi on copie trop de données dans le buffer sans vérifier la taille (ex: avec la fonction dangereuse `strcpy`), l\'excédent va écraser le RBP puis l\'adresse de retour. Au lieu de faire un retour normal, l\'instruction `ret` sautera à l\'adresse que l\'attaquant a glissée dans son texte malveillant !',
          example: {
            title: 'Schéma du débordement de pile',
            code: `[  Buffer de 10 octets  ]  <-- RSP (Top de pile)
[   RBP sauvegardé (8)  ]
[ Addresse de Retour (8)]
[   Arguments passés    ]  <-- Bottom de pile

Si on écrit 30 "A" (0x41) dans le buffer :
[ AAAAAAAAAAAAAAAAAAAAA ]
[ AAAAAAAAAAAAAAAAAAAAA ]
[ AAAAAAAAAAAAAAAAAAAAA ]

Le processeur exécute 'ret'. Il pop 0x4141414141414141 dans RIP.
Le programme crache car l'adresse 0x41414141 n'est pas valide.
Si c'était l'adresse d'un code malveillant... c'est le piratage.`,
            language: 'ascii',
            explanation: 'En remplaçant les "A" par une adresse mémoire spécifique, un attaquant prend le contrôle total du programme.'
          },
          commonMistake: {
            title: 'Fonctions non sécurisées',
            content: 'Utiliser `gets`, `strcpy`, `sprintf` est une faute professionnelle en C. Utilisez toujours les versions sécurisées qui prennent une taille maximale : `fgets`, `strncpy`, `snprintf`.'
          },
          practicalTip: {
            title: 'Protections modernes (Mitigations)',
            content: 'Aujourd\'hui, c\'est plus difficile. Les OS et compilateurs utilisent des protections : \n- **ASLR** : Randomise les adresses mémoire à chaque lancement.\n- **Stack Canaries** : Place une valeur aléatoire secrète avant l\'adresse de retour. Si elle est écrasée, le programme s\'arrête net.\n- **NX Bit (DEP)** : Empêche l\'exécution de code situé sur la pile ou le tas.'
          },
          mcuscriptLink: 'En concevant McuScript, l\'objectif sera d\'offrir un langage "Memory Safe" (comme Rust) pour que le compilateur injecte des vérifications de limites automatiques sur les accès aux tableaux, rendant les Buffer Overflows impossibles.'
        },
        exercises: ['ex-mod16-1-1']
      },
      {
        id: 'mod16-2',
        moduleId: 'mod16',
        title: 'Return-Oriented Programming (ROP)',
        description: 'Pirater sans injecter de code.',
        order: 2,
        content: {
          simpleExplanation: 'Avec les protections modernes qui empêchent d\'exécuter du code sur la pile, les attaquants utilisent des petits bouts de code qui existent déjà dans le programme légitime et les enchaînent comme des Lego.',
          deepExplanation: 'Le ROP (Programmation Orientée Retour) contourne le NX Bit (Data Execution Prevention). L\'attaquant trouve des suites d\'instructions courtes terminées par un `ret` (appelées des "Gadgets") dans le code existant ou dans les bibliothèques comme la libc.\nAu lieu d\'injecter du code, l\'attaquant forge une fausse pile remplie uniquement d\'adresses pointant vers ces gadgets. Chaque gadget fait une petite action (ex: `pop rdi; ret`) et retourne au gadget suivant. Mises bout à bout, ces actions permettent souvent de lancer un shell de commande.',
          example: {
            title: 'Chaîne ROP',
            code: `; La fausse pile créée par l'attaquant :
[ @adresse_gadget_1 ] -> pop rdi; ret
[ valeur_pour_rdi   ] -> (Pointeur vers "/bin/sh")
[ @adresse_gadget_2 ] -> call system

; Exécution :
; 1. 'ret' original saute au gadget 1.
; 2. pop rdi met "/bin/sh" dans RDI.
; 3. 'ret' du gadget 1 saute au gadget 2.
; 4. Le gadget 2 appelle system("/bin/sh") !`,
            language: 'asm',
            explanation: 'Cette technique exige une excellente compréhension du jeu d\'instructions. Sur x86, les instructions sont de taille variable, ce qui permet de trouver des gadgets non intentionnels (en commençant la lecture au milieu d\'une instruction valide !).'
          },
          commonMistake: {
            title: 'Se croire à l\'abri sans vulnérabilité propre',
            content: 'Même si votre programme est parfait, si vous importez une bibliothèque (dll/so) vulnérable, un attaquant peut utiliser son code pour construire ses gadgets ROP.'
          },
          practicalTip: {
            title: 'Control Flow Integrity (CFI)',
            content: 'CFI est la contre-mesure moderne contre le ROP. Le compilateur ajoute des vérifications avant chaque appel indirect ou saut pour s\'assurer que la cible fait bien partie d\'un chemin de contrôle légitime du programme.'
          },
          mcuscriptLink: 'Comprendre ces attaques vous aide à concevoir un compilateur plus sécurisé, capable de générer lui-même des Stack Canaries ou de compiler avec du CFI intégré pour les systèmes critiques (automobile, aéronautique).'
        },
        exercises: ['ex-mod16-2-1']
      }
    ]
  },
  {
    id: 'mod17',
    title: 'Projet Final: Écrire un Bootloader',
    description: 'Le premier code qui s\'exécute au démarrage.',
    icon: 'TerminalSquare',
    color: 'var(--accent-amber)',
    order: 17,
    lessons: [
      {
        id: 'mod17-1',
        moduleId: 'mod17',
        title: 'Le Master Boot Record (MBR)',
        description: 'Les fameux 512 premiers octets.',
        order: 1,
        content: {
          simpleExplanation: 'Quand vous allumez un PC (mode BIOS legacy), il charge le tout premier secteur du disque dur (512 octets) en mémoire et l\'exécute. C\'est votre programme !',
          deepExplanation: 'Le BIOS charge le MBR à l\'adresse mémoire `0x7C00`. Le processeur démarre en "Real Mode" 16-bits (comme en 1980 avec le 8086). Vous n\'avez accès qu\'à 1 Mo de RAM et vous devez utiliser les interruptions du BIOS (ex: `int 0x10`) pour afficher des choses à l\'écran. Les deux derniers octets du secteur doivent obligatoirement être la signature magique `0x55 0xAA`, sinon le BIOS refusera de booter.',
          example: {
            title: 'Hello World Bootloader (16-bits)',
            code: `[BITS 16]         ; On indique à l'assembleur qu'on est en 16 bits
[ORG 0x7C00]      ; L'adresse de chargement par le BIOS

start:
    mov ah, 0x0E  ; Fonction BIOS: 'Teletype output' (afficher caractère)
    mov al, 'H'   ; Le caractère à afficher
    int 0x10      ; Appel au BIOS (interruption vidéo)
    mov al, 'e'
    int 0x10
    mov al, 'y'
    int 0x10

hang:             ; Boucle infinie pour ne pas crasher
    jmp hang

; Remplissage avec des 0 jusqu'à l'octet 510
times 510-($-$$) db 0

; Signature magique de boot (octets 511 et 512)
dw 0xAA55`,
            language: 'asm',
            explanation: 'Si vous compilez ce code avec `nasm -f bin boot.asm -o boot.bin` et que vous dites à QEMU de booter dessus (`qemu-system-x86_64 boot.bin`), vous verrez "Hey" s\'afficher sur un écran noir sans aucun OS !'
          },
          commonMistake: {
            title: 'La taille limite',
            content: 'Votre bootloader de première étape ne peut pas dépasser 512 octets. C\'est minuscule ! Son seul rôle est généralement de charger un deuxième programme plus gros (le "stage 2") depuis le disque dur vers la mémoire.'
          },
          practicalTip: {
            title: 'UEFI vs BIOS',
            content: 'Aujourd\'hui, l\'UEFI a remplacé le BIOS. Les bootloaders UEFI sont des exécutables 64 bits beaucoup plus complexes écrits en C/C++, pas en assembleur pur. Mais faire un bootloader BIOS en ASM reste le rite de passage ultime pour comprendre le fonctionnement intime d\'un ordinateur.'
          },
          mcuscriptLink: 'Avec ces connaissances, vous êtes prêt à comprendre comment un OS ou un interpréteur "bare-metal" démarre. Vous avez maintenant le bagage pour écrire le backend assembleur de McuScript !'
        },
        exercises: ['ex-mod17-1-1']
      }
    ]
  }
];