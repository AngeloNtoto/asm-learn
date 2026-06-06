import { Module } from '../../types';

export const linuxModules: Module[] = [
  {
    id: 'mod18',
    title: 'Référence Complète x86-64',
    description: 'Une vue exhaustive de tous les registres, sauts conditionnels et modes d\'adressage.',
    icon: 'Terminal',
    color: 'accent-cyan',
    order: 18,
    lessons: [
      {
        id: 'mod18-1',
        moduleId: 'mod18',
        title: 'Carte d\'Identité des Registres',
        description: 'Au-delà de RAX : R8-R15, registres de segment, et rôles cachés.',
        order: 1,
        content: {
          simpleExplanation: 'Sur x86-64, il y a 16 registres généraux de 64 bits. Chacun a des sous-registres (32, 16, 8 bits) et souvent une mission historique particulière.',
          deepExplanation: 'Voici la hiérarchie complète. RAX (64) -> EAX (32) -> AX (16) -> AH (haut 8) / AL (bas 8). Écrire dans EAX met à zéro les 32 bits supérieurs de RAX, mais écrire dans AL ne modifie QUE le bas ! Rôles spéciaux : \n- RAX : Accumulateur, valeur de retour, 1er opérande de `mul`/`div`.\n- RCX : Compteur pour `loop`, `rep`, et décalages (`shl rax, cl`).\n- RDX : Extension de données pour `mul`/`div` (résultat dans RDX:RAX).\n- RSI/RDI : Source et Destination pour les instructions de chaînes (ex: `movsb`).\n- R8-R15 : Registres ajoutés en 64-bits. Leurs sous-registres se nomment R8D (32b), R8W (16b), R8B (8b).',
          example: {
            title: 'Le piège des sous-registres',
            code: `mov rax, 0xFFFFFFFFFFFFFFFF
mov eax, 0          ; rax devient 0x0000000000000000 (les 32 bits hauts sont effacés)

mov rax, 0xFFFFFFFFFFFFFFFF
mov al, 0           ; rax devient 0xFFFFFFFFFFFFFF00 (SEUL l'octet bas est modifié !)`,
            language: 'asm',
            explanation: 'C\'est une optimisation du silicium : les instructions 32-bits (qui sont plus courtes en octets) cassent la dépendance sur les 32 bits hauts, évitant un "partial register stall".'
          },
          commonMistake: {
            title: 'Modifier RSP ou RBP',
            content: 'Ne jamais utiliser RSP (Stack Pointer) ou RBP (Base Pointer) pour faire des calculs mathématiques normaux. Ce sont les seuls liens qui maintiennent votre programme en vie.'
          },
          practicalTip: {
            title: 'Registres Volatils (Caller-saved)',
            content: 'Rappelez-vous : RAX, RCX, RDX, RSI, RDI, R8-R11 sont "jetables". Toute fonction appelée a le droit de les détruire. RBP, RBX, R12-R15 sont "précieux" (Callee-saved), il faut les préserver.'
          },
          mcuscriptLink: 'Le Register Allocator de McuScript devra connaître ces contraintes : par exemple, forcer une variable dans RCX si elle doit servir de compteur de décalage.'
        },
        exercises: []
      },
      {
        id: 'mod18-2',
        moduleId: 'mod18',
        title: 'L\'Encyclopédie des Sauts Conditionnels',
        description: 'Toutes les façons de lire le registre RFLAGS.',
        order: 2,
        content: {
          simpleExplanation: 'Il existe plus de 16 façons de faire un saut (Jump) après un `cmp`, selon que vos nombres sont positifs, négatifs, ou simplement égaux.',
          deepExplanation: 'Le registre FLAGS contient plusieurs bits : ZF (Zéro), SF (Signe), OF (Débordement), CF (Retenue). \nPour les nombres SIGNÉS (pouvant être négatifs) : \n- `jg` (Greater, >) : SF == OF et ZF == 0\n- `jl` (Less, <) : SF != OF\nPour les nombres NON-SIGNÉS (toujours positifs) : \n- `ja` (Above, >) : CF == 0 et ZF == 0\n- `jb` (Below, <) : CF == 1',
          example: {
            title: 'Signé vs Non-Signé',
            code: `mov eax, 0xFFFFFFFF  ; = -1 (signé) ou 4294967295 (non-signé)
mov ebx, 1

cmp eax, ebx
jg est_plus_grand    ; JG est pour le SIGNÉ. -1 > 1 est FAUX. Pas de saut.
ja est_au_dessus     ; JA est pour le NON-SIGNÉ. 4294967295 > 1 est VRAI. Saut !`,
            language: 'asm',
            explanation: 'Mélanger `jg` (signé) avec une logique non-signée est l\'une des sources de bugs les plus difficiles à traquer en assembleur.'
          },
          commonMistake: {
            title: 'Confondre SETcc et Jcc',
            content: 'Plutôt que de faire un saut pour définir une variable (`if(a) x=1 else x=0`), utilisez `setz al` ou `setg al` qui écrit 1 ou 0 directement dans un registre 8-bits.'
          },
          practicalTip: {
            title: 'Noms multiples',
            content: '`je` (Jump Equal) et `jz` (Jump Zero) sont exactement la même instruction binaire. De même pour `jb` (Below) et `jc` (Carry).'
          },
          mcuscriptLink: 'Dans LLVM IR, les comparaisons précisent toujours le type: `icmp sgt` (Signed Greater Than) vs `icmp ugt` (Unsigned Greater Than).'
        },
        exercises: []
      },
      {
        id: 'mod18-3',
        moduleId: 'mod18',
        title: 'Les 8 Modes d\'Adressage',
        description: 'L\'art d\'accéder à la RAM efficacement.',
        order: 3,
        content: {
          simpleExplanation: 'Au lieu de calculer des adresses mémoire avec plusieurs instructions `add` et `mul`, x86 permet de faire des calculs d\'adresse directement entre les crochets `[ ]`.',
          deepExplanation: 'Le mode d\'adressage complet x86 (SIB: Scale-Index-Base) s\'écrit : `[Base + Index * Scale + Displacement]`.\n- **Base** : Un registre de base (ex: RBX).\n- **Index** : Un registre d\'offset (ex: RCX).\n- **Scale** : Un multiplicateur fixe (1, 2, 4 ou 8). Idéal pour les tailles de tableaux.\n- **Displacement** : Une constante.\nExemple : `[rbx + rcx*4 + 16]` lit l\'élément `rcx` d\'un tableau d\'entiers 32-bits (4 octets) situé à l\'offset 16 de la structure pointée par `rbx`.',
          example: {
            title: 'L\'instruction LEA (Load Effective Address)',
            code: `; Accéder à array[i] où array est dans rbx et i dans rcx (int = 4 octets)
mov eax, [rbx + rcx*4]

; L'astuce mathématique ultime avec LEA :
; LEA calcule l'adresse MAIS NE LIT PAS LA MÉMOIRE.
; On peut l'utiliser pour faire des maths rapides !
lea rax, [rbx + rbx*2]  ; rax = rbx * 3
lea rax, [rbx + rcx*8 + 15] ; rax = rbx + rcx*8 + 15`,
            language: 'asm',
            explanation: '`lea` est l\'instruction secrète préférée des compilateurs pour faire des additions et multiplications rapides en un seul cycle d\'horloge.'
          },
          commonMistake: {
            title: 'Scale invalide',
            content: 'Le multiplicateur (Scale) ne peut être que 1, 2, 4 ou 8. Vous ne pouvez pas faire `[rbx + rcx*3]`.'
          },
          practicalTip: {
            title: 'RIP-Relatif',
            content: 'Sur x86-64, le mode le plus utilisé pour les variables globales est `[rip + offset]`. Cela permet au code d\'être chargé n\'importe où en mémoire (PIC).'
          },
          mcuscriptLink: 'Le parseur McuScript génèrera des nœuds d\'accès de tableau (`ArrayAccessNode`). Le backend tentera de compresser l\'adresse de base et l\'index dans un seul accès `[base + index*scale]`, une optimisation appelée "Addressing Mode Selection".'
        },
        exercises: []
      }
    ]
  },
  {
    id: 'mod19',
    title: 'Écrire un Vrai Programme ASM',
    description: 'Format ELF, Sections, Directives et Prologue/Épilogue.',
    icon: 'FileCode',
    color: 'accent-purple',
    order: 19,
    lessons: [
      {
        id: 'mod19-1',
        moduleId: 'mod19',
        title: 'Sections ELF & Directives NASM',
        description: 'La carte d\'un exécutable Linux.',
        order: 1,
        content: {
          simpleExplanation: 'Un programme n\'est pas qu\'une longue liste de code. Il est divisé en quartiers (sections) : un quartier pour le code, un pour les textes fixes, un pour les variables.',
          deepExplanation: 'Le format ELF (Executable and Linkable Format) définit ces sections. Dans votre fichier source `.asm` (avec NASM), vous utilisez des directives :\n- `section .text` : Code exécutable (Read+Execute).\n- `section .data` : Variables globales initialisées (Read+Write).\n- `section .rodata` : Données constantes (ex: chaînes de caractères).\n- `section .bss` : Variables globales NON initialisées (remplies de zéros par l\'OS au démarrage, ne prennent pas de place dans le fichier sur le disque).',
          example: {
            title: 'Squelette NASM complet',
            code: `global _start           ; Rend l'étiquette _start visible au linker (ld)
extern printf           ; Déclare une fonction C externe

section .rodata
    msg db 'Hello', 10, 0   ; db = define byte. 10 = retour chariot, 0 = fin de chaîne.

section .data
    compteur dd 42          ; dd = define double word (4 octets)

section .bss
    buffer resb 256         ; resb = reserve bytes (réserve 256 octets à zéro)

section .text
_start:
    ; ... le code ici ...`,
            language: 'asm',
            explanation: 'Les directives `db` (byte), `dw` (word, 16b), `dd` (dword, 32b), `dq` (qword, 64b) insèrent littéralement ces octets dans le fichier binaire.'
          },
          commonMistake: {
            title: 'Essayer d\'écrire dans .text ou .rodata',
            content: 'Si vous essayez de faire `mov byte [msg], "A"`, le programme crashera immédiatement avec une erreur de segmentation (Segfault) car la section `.rodata` est protégée en lecture seule par l\'OS.'
          },
          practicalTip: {
            title: 'Tailles explicites (BYTE PTR)',
            content: 'Si vous faites `mov [rbx], 5`, l\'assembleur ne sait pas si 5 est un octet ou un qword. Vous DEVEZ préciser : `mov byte [rbx], 5` ou `mov qword [rbx], 5`.'
          },
          mcuscriptLink: 'Un compilateur doit émettre toutes ces sections correctement. McuScript placera les chaînes de caractères littérales dans `.rodata` et les variables globales dans `.data` ou `.bss`.'
        },
        exercises: []
      },
      {
        id: 'mod19-2',
        moduleId: 'mod19',
        title: 'Anatomie d\'une Fonction (Prologue & Épilogue)',
        description: 'La Stack Frame dévoilée.',
        order: 2,
        content: {
          simpleExplanation: 'Chaque fonction bien polie doit nettoyer derrière elle et sauvegarder les affaires de la fonction qui l\'a appelée. C\'est le rôle du Prologue et de l\'Épilogue.',
          deepExplanation: 'Pour avoir des variables locales isolées, on crée une "Stack Frame" (cadre de pile) délimitée par `RBP` (Base Pointer) et `RSP` (Stack Pointer). Le RBP sert de repère fixe : toutes les variables locales sont accessibles en négatif depuis RBP (`[rbp-8]`), et les anciens arguments en positif (`[rbp+16]`).',
          example: {
            title: 'Prologue et Épilogue standards',
            code: `ma_fonction_c:
    ; --- PROLOGUE ---
    push rbp            ; 1. Sauvegarder l'ancien repère RBP
    mov rbp, rsp        ; 2. Le nouveau repère RBP est le sommet actuel de la pile
    sub rsp, 32         ; 3. Réserver 32 octets pour nos variables locales

    ; --- CORPS DE FONCTION ---
    mov dword [rbp-4], 42   ; Variable locale 1
    mov dword [rbp-8], 100  ; Variable locale 2

    ; --- ÉPILOGUE ---
    mov rsp, rbp        ; 1. Libérer l'espace (RSP redescend sur RBP)
    pop rbp             ; 2. Restaurer l'ancien RBP pour l'appelant
    ret                 ; 3. Retourner à l'adresse de retour (qui est au sommet de la pile)`,
            language: 'asm',
            explanation: 'Notez que l\'épilogue `mov rsp, rbp` suivi de `pop rbp` peut être remplacé par une seule instruction : `leave`.'
          },
          commonMistake: {
            title: 'Désaligner la pile',
            content: 'L\'ABI System V et Windows exigent que RSP soit un multiple de 16 octets JUSTE AVANT un `call`. S\'il n\'est pas aligné, de nombreuses fonctions C (surtout celles utilisant les flottants SSE) crasheront avec "Segmentation Fault".'
          },
          practicalTip: {
            title: 'Omit Frame Pointer',
            content: 'Les compilateurs modernes optimisent souvent avec `-fomit-frame-pointer`. Ils ne créent plus de RBP et adressent tout par rapport à RSP (`[rsp+8]`). Cela libère RBP pour d\'autres calculs, mais rend le débogage (les stack traces) beaucoup plus complexe.'
          },
          mcuscriptLink: 'Le backend McuScript génèrera automatiquement ce prologue/épilogue pour chaque fonction compilée. La gestion de la Stack Frame est cruciale.'
        },
        exercises: []
      }
    ]
  },
  {
    id: 'mod20',
    title: 'Syscalls Linux',
    description: 'Parler directement au Kernel sans intermédiaire.',
    icon: 'TerminalSquare',
    color: 'accent-amber',
    order: 20,
    lessons: [
      {
        id: 'mod20-1',
        moduleId: 'mod20',
        title: 'Le Vrai Démarrage : _start et argv',
        description: 'La vie avant le "main()".',
        order: 1,
        content: {
          simpleExplanation: 'Votre programme C a une fonction `main`, mais Linux ne connaît pas `main`. Linux appelle toujours une fonction secrète nommée `_start`.',
          deepExplanation: 'Quand l\'OS charge votre binaire, il prépare la pile initiale et saute à l\'entry point (défini par le linker, souvent `_start`). À cet instant, la pile contient : au sommet (`[rsp]`) le nombre d\'arguments `argc`. Juste en dessous (`[rsp+8]`), le pointeur vers `argv[0]` (le nom du programme). Puis `argv[1]`, etc. Il n\'y a AUCUN registre pré-rempli avec ces valeurs !',
          example: {
            title: 'Lire argc dans _start',
            code: `global _start
section .text

_start:
    ; Au tout début du programme :
    mov rdi, [rsp]       ; rdi contient maintenant argc
    mov rsi, [rsp+8]     ; rsi pointe vers argv[0] (la chaîne de caractères)
    
    ; ... programme ...
    
    ; ATTENTION: _start n'est PAS une fonction normale. On ne peut pas faire 'ret'.
    ; Il n'y a nulle part où retourner (le kernel nous a appelé).
    ; On DOIT utiliser le syscall exit pour terminer.
    mov rax, 60          ; Numéro du syscall 'exit' sous Linux x86-64
    xor rdi, rdi         ; rdi = code de retour (0 = succès)
    syscall`,
            language: 'asm',
            explanation: 'Si vous faites un `ret` à la fin de `_start`, le processeur va pop une valeur aléatoire (ou 0) depuis la pile comme adresse de retour et crasher avec Segfault.'
          },
          commonMistake: {
            title: 'Oublier sys_exit',
            content: 'Ne jamais oublier d\'appeler le syscall `exit` à la fin d\'un programme en assembleur pur (sans libc).'
          },
          practicalTip: {
            title: 'Le rôle de la libc',
            content: 'En C, c\'est la fonction `__libc_start_main` (le vrai _start) qui lit argc/argv sur la pile, initialise l\'environnement, puis appelle VOTRE `main(argc, argv)`. Quand votre main() fait `return 0`, la libc appelle `exit(0)` pour vous.'
          },
          mcuscriptLink: 'Le compilateur McuScript devra injecter un petit runtime au début du binaire, contenant ce `_start`, pour préparer l\'environnement avant de lancer la fonction principale de l\'utilisateur.'
        },
        exercises: []
      },
      {
        id: 'mod20-2',
        moduleId: 'mod20',
        title: 'L\'Instruction Syscall (Hello World)',
        description: 'Comment demander un service au système d\'exploitation.',
        order: 2,
        content: {
          simpleExplanation: 'Votre code n\'a pas la permission d\'écrire sur l\'écran ou de lire un fichier. Il doit préparer un message dans des registres et crier "SYSCALL !" pour que le noyau Linux (Kernel) fasse le travail.',
          deepExplanation: 'Un appel système (Syscall) est un passage sécurisé du User-Space (votre code) au Kernel-Space (l\'OS). Sur x86-64, l\'instruction magique est `syscall`. \nConvention Linux x86-64 : \n- RAX : Contient le numéro du syscall (ex: 1 pour `sys_write`, 0 pour `sys_read`, 60 pour `sys_exit`).\n- RDI, RSI, RDX, R10, R8, R9 : Contiennent les arguments.\n- RAX : Contient le résultat au retour.',
          example: {
            title: 'Hello World SANS la libc',
            code: `global _start
section .rodata
    msg db 'Hello Kernel!', 10  ; 10 = \n
    msg_len equ $ - msg         ; Calcule la longueur de la chaîne

section .text
_start:
    ; sys_write(file_descriptor, buffer_ptr, length)
    mov rax, 1          ; Numéro du syscall : sys_write (1)
    mov rdi, 1          ; fd 1 = stdout (console)
    mov rsi, msg        ; Pointeur vers notre chaîne
    mov rdx, msg_len    ; Longueur de la chaîne
    syscall             ; APPEL AU NOYAU !

    ; sys_exit(code)
    mov rax, 60         ; Numéro du syscall : sys_exit (60)
    mov rdi, 0          ; Code de retour 0
    syscall`,
            language: 'asm',
            explanation: 'Faire un syscall est relativement lent (changement de contexte matériel, vérifications de sécurité), c\'est pourquoi les bibliothèques mettent souvent en mémoire tampon (buffer) les données pour faire moins de syscalls.'
          },
          commonMistake: {
            title: 'int 0x80 vs syscall',
            content: 'Si vous trouvez de vieux tutoriels utilisant `int 0x80`, c\'est l\'ancienne méthode 32-bits (avec un ordre de registres différent, eax, ebx, ecx). En 64-bits, utilisez toujours `syscall`.'
          },
          practicalTip: {
            title: 'sys_mmap et le Heap',
            content: 'Il n\'y a pas de "Heap" (Tas) magique ou de "malloc" en ASM. Pour allouer de la mémoire dynamique, vous devez utiliser les syscalls `sys_brk` (déplacer la frontière du segment de données) ou `sys_mmap` (demander de nouvelles pages virtuelles au Kernel).'
          },
          mcuscriptLink: 'Dans McuScript, la bibliothèque standard (print, open, alloc) devra être programmée en assembleur pour appeler directement ces syscalls si vous compilez sans la libc (mode "freestanding").'
        },
        exercises: []
      }
    ]
  },
  {
    id: 'mod21',
    title: 'Chaînes & Buffers',
    description: 'Les instructions de manipulation de masse.',
    icon: 'Code',
    color: 'accent-green',
    order: 21,
    lessons: [
      {
        id: 'mod21-1',
        moduleId: 'mod21',
        title: 'Les Instructions de Chaînes (movsb, stosb)',
        description: 'Des boucles intégrées directement dans le silicium.',
        order: 1,
        content: {
          simpleExplanation: 'x86 possède des instructions spéciales capables de copier ou comparer des tableaux entiers très rapidement, sans que vous n\'ayez à écrire une boucle for.',
          deepExplanation: 'Ces instructions utilisent implicitement certains registres : RSI (Source Index) et RDI (Destination Index). \n- `movsb` (Move String Byte) : Copie 1 octet de l\'adresse [RSI] vers l\'adresse [RDI], puis incrémente (ou décrémente) automatiquement RSI et RDI.\n- `stosb` (Store String Byte) : Écrit la valeur du registre AL dans [RDI] et incrémente RDI.\n- `scasb` (Scan String Byte) : Compare AL avec [RDI], utile pour chercher un caractère.',
          example: {
            title: 'Implémentation ultra-rapide de memset()',
            code: `; memset(buffer, 0xAA, 100) -> Remplir 100 octets avec 0xAA
mov rdi, buffer      ; Destination
mov al, 0xAA         ; Valeur à écrire
mov rcx, 100         ; Compteur de boucle

cld                  ; Clear Direction Flag : RDI va s'incrémenter (avancer)
rep stosb            ; MAGIE: Répète stosb RCX fois !`,
            language: 'asm',
            explanation: 'Le préfixe `rep` dit au CPU : exécute l\'instruction suivante, décrémente RCX, et recommence tant que RCX > 0. Le flag `cld` est crucial : si le Direction Flag était à 1 (`std`), RDI reculerait au lieu d\'avancer !'
          },
          commonMistake: {
            title: 'Oublier le CLD',
            content: 'Ne supposez jamais que le Direction Flag est à 0. L\'ABI indique qu\'il doit être à 0 à l\'entrée d\'une fonction, mais faites toujours un `cld` avant un bloc `rep` par sécurité.'
          },
          practicalTip: {
            title: 'strlen() en ASM pur',
            content: 'Pour trouver la longueur d\'une chaîne (terminée par 0) : mettez AL=0, RCX=-1 (valeur max), RDI=chaine, et utilisez `repne scasb` (Répète tant que NON ÉGAL). À la fin, NOT RCX - 1 donnera la longueur !'
          },
          mcuscriptLink: 'Le backend McuScript pourra transformer une assignation de gros tableaux (ex: `let arr2 = arr1`) en instructions ultra-optimisées `rep movsq` (copie par blocs de 8 octets).'
        },
        exercises: []
      }
    ]
  },
  {
    id: 'mod22',
    title: 'Instructions Avancées',
    description: 'Division, manipulation de bits et synchronisation atomique.',
    icon: 'Layers',
    color: 'accent-red',
    order: 22,
    lessons: [
      {
        id: 'mod22-1',
        moduleId: 'mod22',
        title: 'Division et Extension de Signe (div, movsx)',
        description: 'La douloureuse instruction de division x86.',
        order: 1,
        content: {
          simpleExplanation: 'Contrairement à la multiplication ou l\'addition, la division en assembleur x86 est délicate. Elle utilise toujours une combinaison de deux registres pour contenir le dividende géant.',
          deepExplanation: 'L\'instruction `div src` (non-signée) ou `idiv src` (signée) divise le nombre implicite RDX:RAX (un nombre de 128 bits formé en collant RDX et RAX !) par l\'opérande source. Le résultat va dans RAX (quotient) et le reste (modulo) va dans RDX. Parce que la source de la division est de 128 bits, il faut TOUJOURS nettoyer RDX avant de diviser un nombre de 64 bits (sinon le CPU divise un nombre gigantesque et crashe avec Arithmetic Exception).',
          example: {
            title: 'Division signée (a / b)',
            code: `; On veut faire: RAX = RAX / RBX
mov rax, 42         ; Le dividende
mov rbx, 10         ; Le diviseur

cqo                 ; "Convert Quad to Oct" - Étend le signe de RAX dans RDX !
                    ; Si RAX est positif, RDX=0. Si négatif, RDX=0xFFFFFF...
idiv rbx            ; Divise RDX:RAX par RBX. 
                    ; RAX = 4, RDX = 2 (le reste/modulo)`,
            language: 'asm',
            explanation: 'Pour une division NON-SIGNÉE (`div`), remplacez l\'instruction d\'extension `cqo` par `xor rdx, rdx`.'
          },
          commonMistake: {
            title: 'Le Divide by Zero / Overflow',
            content: 'Si vous divisez par 0, ou si le quotient est trop grand pour rentrer dans RAX, le processeur lève une exception matérielle `SIGFPE` (Floating Point Exception, bien que ce soit un entier) qui crashe l\'application.'
          },
          practicalTip: {
            title: 'L\'extension de bits (movzx, movsx)',
            content: 'Pour convertir un BYTE (1 octet) en QWORD (8 octets), utilisez `movzx rax, bl` (Zero-extend, pour non-signé) ou `movsx rax, bl` (Sign-extend, pour conserver le bit de signe des nombres négatifs).'
          },
          mcuscriptLink: 'L\'opérateur Modulo `%` dans McuScript sera implémenté très facilement en retournant simplement le contenu du registre RDX après un `idiv`.'
        },
        exercises: []
      },
      {
        id: 'mod22-2',
        moduleId: 'mod22',
        title: 'Bits, Endianness et Atomiques',
        description: 'Les instructions ésotériques de x86.',
        order: 2,
        content: {
          simpleExplanation: 'Au-delà des simples and/or/xor, le CPU possède des outils pointus pour chercher un bit particulier, inverser l\'ordre des octets, ou gérer le multithreading.',
          deepExplanation: 'Voici quelques super-pouvoirs de x86 :\n- **Endinanness** : x86 est Little-Endian (les octets de poids faible sont stockés en premier). Pour communiquer sur un réseau (Big-Endian), on utilise `bswap eax` qui inverse l\'ordre des 4 octets en un cycle.\n- **Bit Scan** : `bsf` (Bit Scan Forward) trouve le premier bit à 1 en partant de la droite. Utilisé pour les algos de Bitboards (Échecs) et la crypto.\n- **Concurrence** : Dans un processeur multi-cœur, si deux cœurs font `add [compteur], 1`, ils peuvent s\'écraser. Le préfixe `lock add [compteur], 1` verrouille le bus mémoire : c\'est une opération ATOMIQUE.',
          example: {
            title: 'Le Spinlock (Verrou Multithread)',
            code: `; Implémentation basique d'un mutex (verrou)
; RBX contient l'adresse de notre variable "verrou" (0 = libre, 1 = pris)

acquérir_verrou:
    mov eax, 1
    xchg eax, [rbx]      ; Echange ATOMIQUEMENT eax et [rbx] !
    test eax, eax        ; Si l'ancienne valeur était déjà 1 (pris)...
    jnz acquérir_verrou  ; ... on boucle (spin) en attendant

    ; --- SECTION CRITIQUE ---
    ; Seul un thread peut arriver ici
    
    mov dword [rbx], 0   ; Libère le verrou`,
            language: 'asm',
            explanation: 'L\'instruction `xchg` avec la mémoire est garantie d\'être atomique par le CPU. Sans cela, écrire des programmes multithreads fiables serait strictement impossible au niveau matériel.'
          },
          commonMistake: {
            title: 'Abuser du préfixe LOCK',
            content: 'Verrouiller le bus mémoire (`lock`) arrête littéralement tous les autres cœurs du processeur pendant un instant. C\'est extrêmement lent (plusieurs dizaines de cycles). À utiliser avec parcimonie.'
          },
          practicalTip: {
            title: 'Tester un bit (BT)',
            content: 'L\'instruction `bt rax, 5` (Bit Test) copie le 5ème bit de RAX directement dans le Carry Flag (CF). On peut alors sauter avec `jc` (Jump if Carry). C\'est plus lisible qu\'un masque AND.'
          },
          mcuscriptLink: 'Le support du multithreading dans McuScript nécessitera d\'utiliser ces primitives matérielles atomiques (`cmpxchg`, `xchg`) dans son implémentation de bibliothèque standard.'
        },
        exercises: []
      }
    ]
  }
];
