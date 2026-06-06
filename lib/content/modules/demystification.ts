import { Module } from '../../types';

export const demystificationModules: Module[] = [
  {
    id: 'mod23',
    title: 'Démystification : Variables & Mémoire',
    description: 'Comparer l\'empreinte mémoire d\'un C++ natif vs Python dynamique.',
    icon: 'HardDrive',
    color: 'accent-cyan',
    order: 23,
    lessons: [
      {
        id: 'mod23-1',
        moduleId: 'mod23',
        title: 'Un Entier n\'est pas un Entier',
        description: 'La différence de coût entre C++ et Python.',
        order: 1,
        content: {
          simpleExplanation: 'En C++, un entier prend exactement 4 octets. En Python, c\'est un "objet" énorme qui prend beaucoup plus de place et de temps à calculer.',
          deepExplanation: 'En C++, `int x = 42;` est alloué sur la pile. En ASM, cela donne `mov dword [rbp-4], 42`. L\'exécution prend 1 cycle, la mémoire prend 4 octets. \nEn Python, `x = 42` alloue dynamiquement sur le Tas une structure C `PyLongObject`. Cette structure contient un compteur de référence (8 octets), un pointeur vers son type (8 octets), la taille de l\'objet (8 octets), et enfin la valeur elle-même. Soit 28 octets minimum ! De plus, le CPU doit déréférencer un pointeur à chaque fois qu\'il veut lire ce nombre.',
          example: {
            title: 'L\'Addition : C++ vs Python',
            code: `; C++ (x = a + b)
mov eax, dword [a]
add eax, dword [b]
mov dword [x], eax

; Python (x = a + b) -> Pseudo-ASM
mov rdi, [a]            ; Pointeur vers PyObject a
mov rsi, [b]            ; Pointeur vers PyObject b
call PyNumber_Add       ; Fonction très lourde
mov [x], rax            ; Pointeur vers le NOUVEL objet résultat`,
            language: 'asm',
            explanation: 'En Python, les entiers sont immuables. L\'addition crée un TOUT NOUVEL objet en RAM. En C++, la valeur est calculée directement dans le registre du CPU.'
          },
          commonMistake: {
            title: 'Integer Overflow',
            content: 'En C++, dépasser 2 milliards (32 bits) sur un int le fait boucler sur des valeurs négatives (Overflow matériel). En Python, le type int a une taille arbitraire : l\'interpréteur alloue plus de RAM en silence, évitant l\'overflow mais ralentissant le système.'
          },
          practicalTip: {
            title: 'Types à taille fixe (C++)',
            content: 'En embarqué (McuScript), utilisez toujours `<cstdint>` : `uint8_t`, `int32_t`. Cela force le CPU à utiliser les bonnes instructions ASM (ex: `movzx` ou les registres 8 bits comme `al`).'
          },
          mcuscriptLink: 'Le typage dynamique est trop lourd pour un microcontrôleur. McuScript imposera un typage fort pour garantir une génération de code aussi propre que le C++.'
        },
        exercises: ['ex-mod23-1']
      },
      {
        id: 'mod23-2',
        moduleId: 'mod23',
        title: 'Tableaux (Vector) vs Listes Python',
        description: 'La magie de la mémoire contiguë.',
        order: 2,
        content: {
          simpleExplanation: 'Un vecteur C++ stocke les données les unes à côté des autres. Une liste Python stocke des adresses (pointeurs) pointant vers des données éparpillées.',
          deepExplanation: 'Le cache du CPU adore la prédictibilité. Quand vous lisez `[0]`, le CPU charge secrètement `[1]`, `[2]`, `[3]` dans son cache L1 ultra-rapide. \nC++ `std::vector` est une mémoire contiguë. L\'ASM utilise `mov eax, [rbx + rcx*4]` (Scale-Index-Base). \nPython `list` est un tableau de pointeurs. L\'ASM doit faire `mov rdx, [rbx + rcx*8]` (lit l\'adresse de l\'objet), puis `mov rax, [rdx + 24]` (lit la valeur de l\'objet). C\'est un double-déréférencement qui ruine le cache CPU (Cache Miss).',
          example: {
            title: 'Parcours de liste en ASM',
            code: `; Boucle Vector C++ :
boucle:
    add eax, [rdi + rcx*4]  ; Lit et ajoute DIRECTEMENT la donnée
    inc rcx
    cmp rcx, 100
    jl boucle

; Boucle List Python (simplifié) :
boucle_py:
    mov rsi, [rdi + rcx*8]  ; 1. Charge le pointeur PyObject
    add rax, [rsi + 24]     ; 2. Charge la valeur (attention, en vrai c'est un call C)
    inc rcx
    cmp rcx, 100
    jl boucle_py`,
            language: 'asm',
            explanation: 'Chaque "Cache Miss" coûte 100 cycles d\'horloge. La boucle Python est non seulement plus longue en instructions, mais infiniment plus lente en accès RAM.'
          },
          commonMistake: {
            title: 'Types mixtes',
            content: 'Python autorise `[1, "hello", 3.14]`. Le C++ l\'interdit car la taille des éléments ne serait plus prévisible, rendant le calcul d\'adresse mathématique `[base + index*taille]` impossible.'
          },
          practicalTip: {
            title: 'List Comprehension',
            content: 'En Python, préférez toujours les compréhensions de listes (`[x*2 for x in data]`) aux boucles manuelles, car la compréhension est exécutée en C natif à l\'intérieur de CPython, évitant l\'overhead de l\'interpréteur Python.'
          },
          mcuscriptLink: 'Les tableaux dans McuScript seront des structures contiguës et strictement typées, essentiels pour les algorithmes temps-réel.'
        },
        exercises: ['ex-mod23-2']
      }
    ]
  },
  {
    id: 'mod24',
    title: 'Démystification : Contrôle de Flux',
    description: 'Le vrai visage du IF, des Boucles et de Yield.',
    icon: 'GitBranch',
    color: 'accent-amber',
    order: 24,
    lessons: [
      {
        id: 'mod24-1',
        moduleId: 'mod24',
        title: 'Le Coût d\'un IF et du Dynamic Dispatch',
        description: 'La comparaison sous le capot.',
        order: 1,
        content: {
          simpleExplanation: 'Un `if a == b` en C++ prend 1 nanoseconde. En Python, le même code doit chercher dynamiquement quelle fonction utiliser pour comparer.',
          deepExplanation: 'En C++, `if (a == b)` (sur des entiers) est compilé en un `cmp eax, ebx` suivi d\'un saut `je`. C\'est natif au silicium. \nEn Python, l\'instruction `a == b` appelle la méthode C `PyObject_RichCompare(a, b, Py_EQ)`. Ce code doit lire le type de `a`, vérifier s\'il possède une méthode Dunder `__eq__`, appeler cette méthode, attraper d\'éventuelles exceptions, et renvoyer un objet `PyBool`.',
          example: {
            title: 'Comparaison Haut Niveau',
            code: `# Python
if x == 42:
    pass

// C++
if (x == 42) {
}

; Assembleur Généré (Le C++):
cmp dword [x], 42
jne skip_if
; code if
skip_if:`,
            language: 'python',
            explanation: 'Le compilateur C++ connaît le type à l\'avance, il génère donc l\'instruction assembleur parfaite (Static Dispatch). L\'interpréteur Python doit découvrir le type à l\'exécution (Dynamic Dispatch).'
          },
          commonMistake: {
            title: 'is vs == (Python)',
            content: 'En Python, `is` compare les pointeurs mémoires (comme un `cmp` ASM natif), tandis que `==` compare le contenu (Appel de méthode lent). Utilisez `x is None` et jamais `x == None` !'
          },
          practicalTip: {
            title: 'Branch Prediction',
            content: 'Le CPU essaie de deviner si le `if` sera Vrai ou Faux. Si votre code C++ a un `if` imprévisible dans une grosse boucle, il sera très lent. Pensez au code "Branchless" (cmov).'
          },
          mcuscriptLink: 'McuScript aura un typage statique fort. Un `if` générera toujours un `cmp` et un saut simple (ou `cmov`).'
        },
        exercises: ['ex-mod24-1']
      },
      {
        id: 'mod24-2',
        moduleId: 'mod24',
        title: 'Générateurs et yield',
        description: 'Mettre une fonction sur pause.',
        order: 2,
        content: {
          simpleExplanation: 'Normalement, quand une fonction se termine, elle détruit toute sa mémoire. Le mot clé `yield` en Python permet de mettre la fonction "en pause" sans détruire sa mémoire.',
          deepExplanation: 'C\'est le concept de Coroutine. En C/ASM classique, on fait `call fonction`. La fonction crée sa Stack Frame (Prologue), fait son travail, et détruit sa Frame (Épilogue) au `ret`. \nAvec `yield`, Python alloue la Stack Frame (qui contient l\'Instruction Pointer local et les variables) sur le **Heap (Tas)** au lieu de la Pile. Ainsi, lors du `yield`, on retourne la valeur, mais la Frame survit. Au prochain appel de `next()`, le CPU recharge cette Frame depuis le Heap et reprend l\'exécution exactement là où elle s\'était arrêtée.',
          example: {
            title: 'Le miracle de Yield',
            code: `def compte(n):
    for i in range(n):
        yield i  # PAUSE MATÉRIELLE !

gen = compte(3)
print(next(gen)) # 0
print(next(gen)) # 1`,
            language: 'python',
            explanation: 'C++20 a introduit les Coroutines natives (`co_yield`) qui implémentent exactement ce mécanisme de Frame-sur-le-Tas au niveau du compilateur.'
          },
          commonMistake: {
            title: 'Yield vs Return',
            content: '`return` détruit le monde (libère la mémoire locale). `yield` suspend le temps. Ne confondez pas un générateur (qui produit une valeur à la fois pour économiser la RAM) avec une fonction retournant une énorme liste.'
          },
          practicalTip: {
            title: 'Lazy Evaluation',
            content: 'Utilisez les générateurs pour traiter des fichiers géants de plusieurs Go. Comme l\'état est suspendu, un générateur ne consomme que quelques octets de RAM, contrairement au chargement d\'une liste.'
          },
          mcuscriptLink: 'Gérer des interruptions (ISR) sur un microcontrôleur s\'apparente à un `yield` matériel : le CPU suspend sa tâche, sauvegarde les registres sur la pile, et y revient plus tard.'
        },
        exercises: ['ex-mod24-2']
      }
    ]
  },
  {
    id: 'mod25',
    title: 'Démystification : Flux de Données (I/O)',
    description: 'De print() aux Syscalls de lecture de fichiers.',
    icon: 'MessageSquare',
    color: 'accent-purple',
    order: 25,
    lessons: [
      {
        id: 'mod25-1',
        moduleId: 'mod25',
        title: 'Sous le capot de print()',
        description: 'Parler au système d\'exploitation.',
        order: 1,
        content: {
          simpleExplanation: 'Votre programme n\'a pas le droit d\'allumer des pixels sur l\'écran. `print` prépare juste du texte et demande à l\'OS de le faire.',
          deepExplanation: 'Qu\'il s\'agisse de `std::cout` en C++ ou `print()` en Python, tout se termine par l\'appel système Linux `sys_write`. L\'OS prend le contrôle, lit votre buffer, et envoie les octets au driver du terminal. \nLa fonction `print("Âge:", 18, end="")` fait plusieurs choses : elle convertit l\'entier en ASCII, gère le séparateur (espace), évite le saut de ligne, puis écrit le buffer final. C\'est un travail de formatage énorme avant l\'appel système.',
          example: {
            title: 'L\'ultime sys_write',
            code: `; Quand C++ fait std::cout << "Hi"
; Le binaire final exécute ceci :
mov rax, 1          ; sys_write
mov rdi, 1          ; file descriptor 1 (STDOUT)
lea rsi, [msg_hi]   ; Adresse de "Hi"
mov rdx, 2          ; 2 octets
syscall`,
            language: 'asm',
            explanation: 'Les I/O sont le goulot d\'étranglement ultime en programmation. Un CPU fait des milliards d\'opérations par seconde, mais écrire dans la console prend une éternité (millisecondes).'
          },
          commonMistake: {
            title: 'Imprimer dans une boucle de performance',
            content: 'Mettre un `print` au milieu d\'une boucle de calcul détruit littéralement vos performances à cause des milliers de changements de contexte User-Space vers Kernel-Space causés par le `syscall`.'
          },
          practicalTip: {
            title: 'Le Buffering',
            content: 'La `libc` et Python ne font pas un syscall à chaque `print`. Ils accumulent le texte dans un buffer en RAM. Le syscall n\'est déclenché que quand le buffer est plein ou quand un retour à la ligne `\\n` est rencontré (Line Buffering). Utilisez `flush=True` (Python) ou `std::flush` (C++) pour forcer l\'écriture immédiate.'
          },
          mcuscriptLink: 'Sur un MCU sans écran, un `print()` correspond généralement à envoyer des octets un par un sur l\'UART (Port Série) via du MMIO.'
        },
        exercises: ['ex-mod25-1']
      },
      {
        id: 'mod25-2',
        moduleId: 'mod25',
        title: 'RAII et Context Managers (with)',
        description: 'La garantie de nettoyage.',
        order: 2,
        content: {
          simpleExplanation: 'Quand vous ouvrez un fichier, vous devez le refermer. Le C++ et Python ont inventé des mécanismes pour s\'assurer que la porte se ferme toute seule, même s\'il y a un plantage.',
          deepExplanation: 'En C++, c\'est le concept de RAII (Resource Acquisition Is Initialization). Quand une variable sort de la portée (le bloc `{}`), le compilateur insère D\'OFFICE l\'appel à son destructeur en ASM, avant le `ret`. \nEn Python, c\'est le bloc `with open(...) as f:`. Sous le capot, l\'interpréteur enveloppe le bloc dans un `try...finally`. Quoi qu\'il arrive (succès ou erreur fatale), la méthode magique `f.__exit__()` sera appelée pour fermer le descripteur de fichier (File Descriptor) de l\'OS.',
          example: {
            title: 'C++ RAII vs Python With',
            code: `// C++ RAII
void process() {
    std::ifstream file("data.txt");
    // Traitement...
    // <-- Le compilateur génère secrètement 'file.~ifstream()' ici !
}

# Python Context Manager
with open("data.txt") as f:
    # Traitement...
    pass
# <-- CPython appelle secrètement f.__exit__() ici !`,
            language: 'python',
            explanation: 'Sans ces mécanismes, une exception imprévue au milieu du traitement sauterait directement à l\'appelant, laissant le fichier verrouillé par l\'OS pour l\'éternité (File Leak).'
          },
          commonMistake: {
            title: 'Oublier le close',
            content: 'Évitez toujours la vieille méthode `f = open()` / `f.close()` en Python, car si votre code crashe entre les deux, le `close()` ne sera jamais exécuté.'
          },
          practicalTip: {
            title: 'Smart Pointers en C++',
            content: '`std::unique_ptr` utilise exactement le mécanisme RAII. Quand le pointeur est détruit, il fait un `delete` interne qui appelle la fonction C `free()`, qui à son tour peut appeler le syscall `sys_brk` pour rendre la RAM à Linux.'
          },
          mcuscriptLink: 'Le compilateur McuScript devra injecter ces nettoyages (Cleanup Blocks) dans sa génération de code (IR) pour garantir l\'absence de fuites mémoire sur les systèmes critiques.'
        },
        exercises: []
      }
    ]
  },
  {
    id: 'mod26',
    title: 'Démystification : Exceptions & Robustesse',
    description: 'Le Stack Unwinding et le coût des erreurs.',
    icon: 'ShieldAlert',
    color: 'accent-red',
    order: 26,
    lessons: [
      {
        id: 'mod26-1',
        moduleId: 'mod26',
        title: 'Le Déroulage de Pile (Stack Unwinding)',
        description: 'Comment le CPU survit à un crash.',
        order: 1,
        content: {
          simpleExplanation: 'Lancer une exception (throw / raise), c\'est comme tirer sur le signal d\'alarme d\'un train. Le processeur annule le voyage en cours et remonte les wagons à l\'envers jusqu\'à trouver un contrôleur (catch).',
          deepExplanation: 'En C++, `throw` n\'est pas un simple `jmp`. Le compilateur génère des tables secrètes d\'exceptions dans le binaire (Dwarf Exception Tables). Quand `throw` est appelé, une librairie de l\'OS (libunwind) analyse la pile (RSP/RBP), trouve à qui appartient chaque fonction, appelle TOUS les destructeurs des variables locales rencontrées, et remonte jusqu\'à trouver l\'adresse d\'un bloc `catch`.',
          example: {
            title: 'L\'envers du Try/Catch',
            code: `// C++
try {
    throw std::runtime_error("Oups");
} catch (const std::exception& e) {
    // Gestion
}

; En ASM, le throw déclenche un appel à la fonction système __cxa_throw
; qui est responsable de chercher le "Landing Pad" (le catch) 
; dans les tables d'exceptions ELF.`,
            language: 'cpp',
            explanation: 'C\'est pourquoi lever une exception en C++ est extrêmement LENT. Mais si aucune exception n\'est levée, le bloc `try` ne coûte strictement ZÉRO cycle (Zéro-Overhead).'
          },
          commonMistake: {
            title: 'Lancer des exceptions pour le flux',
            content: 'En C++, ne jamais utiliser d\'exceptions pour un contrôle de flux normal (ex: vérifier si un mot de passe est valide). Cela ruinerait les performances.'
          },
          practicalTip: {
            title: 'Python (EAFP)',
            content: 'L\'inverse est vrai en Python ! Le paradigme EAFP (Easier to Ask for Forgiveness) stipule qu\'un `try...except` est TRÈS optimisé en CPython. Il est plus rapide de faire `try: d["key"]` que de faire d\'abord la vérification avec un `if`.'
          },
          mcuscriptLink: 'Les microcontrôleurs n\'ont généralement pas la mémoire nécessaire pour stocker des "Dwarf Exception Tables". McuScript privilégiera les codes de retour (façon C ou Rust `Result`) plutôt que les Exceptions C++.'
        },
        exercises: ['ex-mod26-1']
      }
    ]
  },
  {
    id: 'mod27',
    title: 'Démystification : Fonctions, Scope et POO',
    description: 'Closures, Virtual et Duck Typing en ASM.',
    icon: 'Network',
    color: 'accent-cyan',
    order: 27,
    lessons: [
      {
        id: 'mod27-1',
        moduleId: 'mod27',
        title: 'Scope (LEGB) et Closures',
        description: 'Où se cachent les variables.',
        order: 1,
        content: {
          simpleExplanation: 'Une variable a une durée de vie. Mais que se passe-t-il quand une fonction "Lambda" garde en mémoire une variable qui était censée mourir ?',
          deepExplanation: 'Le Scope (Local, Enclosing, Global, Built-in) définit l\'accès en mémoire. \n- Locale : un offset sur la pile (ex: `[rbp-8]`). Disparaît au `ret`.\n- Globale : une adresse absolue (ex: `0x600100`). Toujours vivante.\n- Closure : En Python (ou C++ `[capture]`), une Lambda crée un véritable **Objet** caché alloué sur le Tas (Heap). L\'état de la variable est copié à l\'intérieur de l\'objet Lambda pour survivre à la mort de la fonction mère.',
          example: {
            title: 'La Closure en Python',
            code: `def create_multiplier(x):
    # 'x' est censé mourir à la fin de cette fonction
    return lambda y: x * y  # La Lambda CAPTURE 'x'

# 'x' vit maintenant dans l'objet mémoire de la fonction !
mult_by_5 = create_multiplier(5)
print(mult_by_5(10)) # Affiche 50`,
            language: 'python',
            explanation: 'En C++, c\'est le compilateur qui génère littéralement une classe cachée contenant la variable `x` comme membre (attribut privé).'
          },
          commonMistake: {
            title: 'Capturer par référence dans une boucle',
            content: 'En C++, si votre lambda capture une variable par référence `[&]` et que la fonction mère se termine, la référence pointe vers de la mémoire de pile détruite (Dangling Reference). Crash immédiat.'
          },
          practicalTip: {
            title: 'Le mot clé global / nonlocal',
            content: 'En Python, l\'interpréteur suppose qu\'une assignation (`x = 1`) crée une nouvelle variable Locale. Utilisez `global x` pour lui dire : "Non, je veux écrire à cette adresse absolue".'
          },
          mcuscriptLink: 'Le frontend McuScript devra implémenter une "Analyseur Sémantique" (Scope Resolution) pour attribuer à chaque variable un numéro d\'ID unique selon son bloc.'
        },
        exercises: ['ex-mod27-1']
      },
      {
        id: 'mod27-2',
        moduleId: 'mod27',
        title: 'Polymorphisme : VTable vs Duck Typing',
        description: 'La méthode C++ contre la flexibilité Python.',
        order: 2,
        content: {
          simpleExplanation: 'Quand vous appelez `animal.parler()`, comment l\'ordinateur sait-il s\'il doit lancer le code du Chien ou du Chat ?',
          deepExplanation: 'En C++, le polymorphisme est matériel. Si la méthode est `virtual`, le compilateur ajoute un pointeur caché au début de chaque objet (le `vptr`). En ASM, l\'appel devient : 1. Lit le pointeur vers la classe virtuelle (VTable). 2. Saute à l\'adresse de la méthode spécifique. `call [rax + 8]`. Zéro recherche, exécution instantanée.\nEn Python (Duck Typing), un appel `animal.parler()` force l\'interpréteur à rechercher dynamiquement la clé `"parler"` dans le dictionnaire `__dict__` de l\'objet, puis dans les parents (MRO). C\'est immensément flexible, mais des dizaines de fois plus lent.',
          example: {
            title: 'Dynamic vs Static Resolution',
            code: `// Polymorphisme C++ (Virtual Table)
// L'ASM saute directement à l'adresse mémoire calculée
Animal* a = new Chien();
a->parler(); // call qword [rax + offset_parler]

# Duck Typing Python
# Cherche si l'objet ou ses ancêtres ont l'attribut "parler"
def faire_parler(objet):
    objet.parler() # dict lookup (Hash table) à l'exécution`,
            language: 'python',
            explanation: 'En C++, vous devez hériter d\'une interface mère stricte. En Python, "Si ça cancane comme un canard, c\'est un canard".'
          },
          commonMistake: {
            title: 'Oublier virtual',
            content: 'En C++, si vous omettez `virtual`, le compilateur fera du Static Binding : il appellera la méthode de la classe du *pointeur*, pas celle de l\'objet réel. C\'est l\'une des erreurs POO les plus sournoises.'
          },
          practicalTip: {
            title: 'La Règle des 5',
            content: 'En C++, si vous gérez des ressources manuellement dans une classe, n\'oubliez pas de définir le Destructeur, le Constructeur de copie, et les opérateurs de déplacement pour éviter les fuites mémoire ou les copies accidentelles.'
          },
          mcuscriptLink: 'Dans McuScript, un système de "Traits" (façon Rust) ou d\'Interfaces serait plus adapté aux MCU pour garantir une résolution statique (zéro VTable, zéro coût d\'exécution).'
        },
        exercises: ['ex-mod27-2']
      }
    ]
  }
];
