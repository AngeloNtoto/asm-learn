import { Module } from '../../types';

export const advancedModules: Module[] = [
  {
    id: 'mod12',
    title: 'Microcontrôleurs et Hardware',
    description: 'Programmer au plus proche du métal.',
    icon: 'Microchip',
    color: 'accent-purple',
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
    color: 'accent-amber',
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
    color: 'accent-cyan',
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
    color: 'accent-purple',
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
    color: 'accent-red',
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
    color: 'accent-amber',
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
