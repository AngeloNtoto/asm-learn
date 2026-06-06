import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData, CodeCorrectionData } from '../../types';

export const linuxExercises: Exercise[] = [
  {
    "id": "ex-mod18-1",
    "type": "quiz",
    "question": "Quelle est la r\u00e8gle d'or concernant l'\u00e9criture dans un registre 32-bits (ex: EAX) sur une architecture x86-64 ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Les 32 bits sup\u00e9rieurs de RAX restent intacts."
        },
        {
          "id": "b",
          "text": "Les 32 bits sup\u00e9rieurs de RAX sont automatiquement mis \u00e0 z\u00e9ro."
        },
        {
          "id": "c",
          "text": "Cela provoque une erreur de compilation."
        }
      ],
      "correctId": "b",
      "explanation": "Pour \u00e9viter un 'partial register stall', le CPU efface toujours la moiti\u00e9 sup\u00e9rieure de RAX lorsqu'on \u00e9crit dans EAX."
    }
  },
  {
    "id": "ex-mod18-2",
    "type": "quiz",
    "question": "Quelle paire de registres est utilis\u00e9e pour stocker le r\u00e9sultat massif de 128-bits d'une multiplication 64-bits (`mul`) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "RCX et R8"
        },
        {
          "id": "b",
          "text": "RAX et RBX"
        },
        {
          "id": "c",
          "text": "RDX et RAX (RDX:RAX)"
        }
      ],
      "correctId": "c",
      "explanation": "L'instruction `mul` met implicitement les bits de poids fort dans RDX et les bits de poids faible dans RAX."
    }
  },
  {
    "id": "ex-mod18-3",
    "type": "quiz",
    "question": "Dans le prologue standard d'une fonction, \u00e0 quoi sert `push rbp` suivi de `mov rbp, rsp` ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "\u00c0 appeler le Kernel."
        },
        {
          "id": "b",
          "text": "\u00c0 cr\u00e9er une 'Stack Frame' stable pour acc\u00e9der facilement aux variables locales et param\u00e8tres."
        },
        {
          "id": "c",
          "text": "\u00c0 nettoyer les registres."
        }
      ],
      "correctId": "b",
      "explanation": "RBP sert de point d'ancrage fixe (Base Pointer) pendant toute l'ex\u00e9cution de la fonction, car RSP peut bouger."
    }
  },
  {
    "id": "ex-mod18-4",
    "type": "fill-blank",
    "question": "L'\u00c9pilogue Rapide",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Au lieu de :\n; mov rsp, rbp\n; pop rbp\n; On peut utiliser l'instruction \u00e9quivalente :\n__BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "leave",
          "hint": "Quitter (en anglais)."
        }
      ],
      "explanation": "L'instruction 'leave' restaure exactement RSP et RBP avant le retour."
    }
  },
  {
    "id": "ex-mod18-5",
    "type": "quiz",
    "question": "Quelle est la diff\u00e9rence entre les instructions de saut `ja` et `jg` ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "`ja` est pour les entiers Non-Sign\u00e9s, `jg` pour les entiers Sign\u00e9s."
        },
        {
          "id": "b",
          "text": "`ja` saute en avant, `jg` saute en arri\u00e8re."
        },
        {
          "id": "c",
          "text": "Il n'y a aucune diff\u00e9rence."
        }
      ],
      "correctId": "a",
      "explanation": "Jump Above (`ja`) v\u00e9rifie le Carry Flag (Non-Sign\u00e9). Jump Greater (`jg`) v\u00e9rifie l'Overflow Flag et le Sign Flag (Sign\u00e9)."
    }
  },
  {
    "id": "ex-mod18-6",
    "type": "quiz",
    "question": "Pourquoi pr\u00e9f\u00e8re-t-on souvent utiliser un 'Conditional Move' (cmov) plut\u00f4t qu'un saut conditionnel (je, jne) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce qu'il \u00e9vite de casser le pipeline d'instructions en cas de mauvaise pr\u00e9diction de branchement."
        },
        {
          "id": "b",
          "text": "Parce qu'il consomme moins de m\u00e9moire."
        },
        {
          "id": "c",
          "text": "Parce qu'il peut ex\u00e9cuter deux sauts en m\u00eame temps."
        }
      ],
      "correctId": "a",
      "explanation": "Le Branch Misprediction co\u00fbte environ 15-20 cycles CPU. Le cmov est ex\u00e9cut\u00e9 inconditionnellement, pr\u00e9servant la vitesse."
    }
  },
  {
    "id": "ex-mod18-7",
    "type": "drag-drop",
    "question": "\u00c9tapes de l'appel d'une fonction (Caller/Callee)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Mettre les arguments dans RDI, RSI (Caller)"
        },
        {
          "id": "2",
          "text": "Instruction CALL (pousse RIP sur la pile)"
        },
        {
          "id": "3",
          "text": "Prologue de la fonction (push rbp; mov rbp, rsp)"
        },
        {
          "id": "4",
          "text": "\u00c9pilogue et RET (pop RIP)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Ordonnez les \u00e9tapes chronologiques d'un appel complet.",
      "explanation": "C'est la danse classique de la pile d'ex\u00e9cution en x86-64."
    }
  },
  {
    "id": "ex-mod18-8",
    "type": "fill-blank",
    "question": "Les divisions capricieuses",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Avant de faire un 'div rbx' (division de RAX par RBX),\n; il faut absolument mettre \u00e0 z\u00e9ro le registre sup\u00e9rieur __BLANK__\nmov __BLANK__, 0\ndiv rbx",
      "blanks": [
        {
          "id": "1",
          "answer": "rdx",
          "hint": "Le m\u00eame registre utilis\u00e9 par 'mul'."
        },
        {
          "id": "2",
          "answer": "rdx",
          "hint": "Idem."
        }
      ],
      "explanation": "L'instruction `div` prend le dividende combin\u00e9 RDX:RAX. Si RDX contient des ordures (Garbages), le programme plantera (Floating Point Exception)."
    }
  },
  {
    "id": "ex-mod18-9",
    "type": "quiz",
    "question": "\u00c0 quoi sert l'instruction `lea` (Load Effective Address) en dehors de la manipulation de pointeurs ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "\u00c0 faire des math\u00e9matiques rapides (additions/multiplications) en un seul cycle sans affecter les flags."
        },
        {
          "id": "b",
          "text": "\u00c0 appeler l'OS."
        },
        {
          "id": "c",
          "text": "\u00c0 d\u00e9r\u00e9f\u00e9rencer un pointeur NULL."
        }
      ],
      "correctId": "a",
      "explanation": "Exemple : `lea rax, [rbx + rcx*4]` calcule une valeur math\u00e9matique purement arithm\u00e9tique et la stocke dans RAX ultra rapidement."
    }
  },
  {
    "id": "ex-mod18-10",
    "type": "code-correction",
    "question": "Nettoyer un registre",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "mov rax, 0",
      "correctCode": "xor eax, eax",
      "hints": [
        "L'op\u00e9ration logique XOR est la plus efficace pour mettre \u00e0 z\u00e9ro."
      ],
      "explanation": "`xor eax, eax` est la norme : il prend moins d'octets en m\u00e9moire (2 octets) et brise les d\u00e9pendances dans le CPU, le rendant plus rapide qu'un simple `mov`."
    }
  },
  {
    "id": "ex-mod19-1",
    "type": "quiz",
    "question": "Dans quelle section du format ELF place-t-on le code ex\u00e9cutable (les instructions machine) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": ".data"
        },
        {
          "id": "b",
          "text": ".text"
        },
        {
          "id": "c",
          "text": ".bss"
        }
      ],
      "correctId": "b",
      "explanation": "La section `.text` contient les instructions CPU en lecture seule et ex\u00e9cution seule."
    }
  },
  {
    "id": "ex-mod19-2",
    "type": "quiz",
    "question": "Quelle section est utilis\u00e9e pour les variables globales INITIALIS\u00c9ES (ex: my_var = 42) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": ".rodata"
        },
        {
          "id": "b",
          "text": ".bss"
        },
        {
          "id": "c",
          "text": ".data"
        }
      ],
      "correctId": "c",
      "explanation": "La section `.data` contient les variables globales modifiables ayant une valeur de d\u00e9part."
    }
  },
  {
    "id": "ex-mod19-3",
    "type": "quiz",
    "question": "Quel est l'avantage de la section `.bss` pour les grosses variables non-initialis\u00e9es (ex: un tableau de 10 Mo) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle n'occupe aucune place dans le fichier ex\u00e9cutable sur le disque dur."
        },
        {
          "id": "b",
          "text": "Elle s'ex\u00e9cute plus vite."
        },
        {
          "id": "c",
          "text": "Elle chiffre les donn\u00e9es."
        }
      ],
      "correctId": "a",
      "explanation": "L'OS alloue cette RAM au lancement du programme et la remplit de z\u00e9ros. Le fichier binaire reste petit."
    }
  },
  {
    "id": "ex-mod19-4",
    "type": "fill-blank",
    "question": "Erreur de Segmentation",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "section __BLANK__\n  hello db 'Hello', 0\n\nsection .text\n  ; Tenter de modifier le 'H' de 'Hello'\n  mov byte [hello], 'J' ; ---> SEGFAULT !",
      "blanks": [
        {
          "id": "1",
          "answer": ".rodata",
          "hint": "Read-Only Data"
        }
      ],
      "explanation": "L'OS prot\u00e8ge la section .rodata en lecture seule via la MMU. Toute tentative d'\u00e9criture d\u00e9clenche une faute mat\u00e9rielle."
    }
  },
  {
    "id": "ex-mod19-5",
    "type": "quiz",
    "question": "Qui a la responsabilit\u00e9 de charger les diff\u00e9rentes sections en RAM et d'appeler le point d'entr\u00e9e (_start) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le compilateur GCC."
        },
        {
          "id": "b",
          "text": "Le chargeur (Loader) du noyau du syst\u00e8me d'exploitation (OS)."
        },
        {
          "id": "c",
          "text": "Le BIOS."
        }
      ],
      "correctId": "b",
      "explanation": "C'est la fonction du syst\u00e8me d'exploitation (execve) de parser le fichier ELF, d'allouer la m\u00e9moire et de c\u00e9der le contr\u00f4le au programme."
    }
  },
  {
    "id": "ex-mod19-6",
    "type": "quiz",
    "question": "Comment le noyau (Kernel) fournit-il les arguments en ligne de commande (argc, argv) lors du lancement via `_start` ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Ils sont d\u00e9pos\u00e9s magiquement dans les registres RDI et RSI."
        },
        {
          "id": "b",
          "text": "Ils sont pos\u00e9s directement au sommet de la pile (Stack), point\u00e9s par RSP."
        },
        {
          "id": "c",
          "text": "Ils sont \u00e9crits dans un fichier temporaire."
        }
      ],
      "correctId": "b",
      "explanation": "Contrairement \u00e0 la fonction main() du C (qui prend rdi et rsi), l'entr\u00e9e native `_start` commence avec RSP pointant directement sur la valeur num\u00e9rique `argc`."
    }
  },
  {
    "id": "ex-mod19-7",
    "type": "drag-drop",
    "question": "Sections M\u00e9moire d'un Processus",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Code (.text) (Adresses basses)"
        },
        {
          "id": "2",
          "text": "Donn\u00e9es Globales (.data / .bss)"
        },
        {
          "id": "3",
          "text": "Tas (Heap) (Grandit vers le haut)"
        },
        {
          "id": "4",
          "text": "Pile (Stack) (Grandit vers le bas, Adresses hautes)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Classez les segments m\u00e9moire d'un processus classique Linux (de l'adresse 0 vers l'adresse haute).",
      "explanation": "Le Heap et la Stack se font face et grandissent l'un vers l'autre au centre de la RAM virtuelle."
    }
  },
  {
    "id": "ex-mod19-8",
    "type": "fill-blank",
    "question": "Directives de taille",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "section .bss\n  ; R\u00e9server 100 octets (bytes) non initialis\u00e9s\n  buffer __BLANK__ 100\n  \n  ; R\u00e9server 10 quadwords (80 octets) non initialis\u00e9s\n  pointers __BLANK__ 10",
      "blanks": [
        {
          "id": "1",
          "answer": "resb",
          "hint": "Reserve Byte."
        },
        {
          "id": "2",
          "answer": "resq",
          "hint": "Reserve Quadword (64-bit)."
        }
      ],
      "explanation": "La syntaxe NASM/YASM utilise `resb`, `resw`, `resd`, `resq` pour r\u00e9server de l'espace dans le `.bss` sans l'allouer dans le fichier."
    }
  },
  {
    "id": "ex-mod19-9",
    "type": "quiz",
    "question": "Que contient l'en-t\u00eate (Header) d'un fichier ELF ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le code source du programme compress\u00e9 en ZIP."
        },
        {
          "id": "b",
          "text": "Les num\u00e9ros magiques (Magic Bytes), l'architecture cible, et les adresses de chargement de chaque section."
        },
        {
          "id": "c",
          "text": "Un dictionnaire Python."
        }
      ],
      "correctId": "b",
      "explanation": "Le Loader utilise cet en-t\u00eate comme un 'plan de montage' pour savoir comment cartographier le fichier en RAM."
    }
  },
  {
    "id": "ex-mod19-10",
    "type": "code-correction",
    "question": "L'oubli fatal",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "global main\n\nsection .text\nmain:\n  mov rax, 42\n  ret",
      "correctCode": "global _start\n\nsection .text\n_start:\n  mov rax, 42\n  ; Il faut un Syscall EXIT, car _start ne peut pas utiliser 'ret'",
      "hints": [
        "L'entr\u00e9e pure d'un ELF s'appelle _start, et on n'a nulle part o\u00f9 'retourner' (ret)."
      ],
      "explanation": "Si on compile sans la libc (`nostdlib`), il faut utiliser `_start` et on ne peut PAS faire de `ret` car personne ne nous a appel\u00e9 via `call`. Il faut faire un syscall `exit`."
    }
  },
  {
    "id": "ex-mod20-1",
    "type": "quiz",
    "question": "Quel registre contient le num\u00e9ro du service syst\u00e8me (ex: 1 pour sys_write) avant d'appeler l'OS sous Linux 64-bits ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "RDI"
        },
        {
          "id": "b",
          "text": "RAX"
        },
        {
          "id": "c",
          "text": "RCX"
        }
      ],
      "correctId": "b",
      "explanation": "RAX d\u00e9finit toujours l'identifiant (ID) de l'appel syst\u00e8me que vous souhaitez r\u00e9aliser."
    }
  },
  {
    "id": "ex-mod20-2",
    "type": "quiz",
    "question": "O\u00f9 devez-vous placer le code de retour d'un programme pour le syscall 'exit' ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Dans RDI (Le 1er argument)."
        },
        {
          "id": "b",
          "text": "Dans RAX."
        },
        {
          "id": "c",
          "text": "Sur la pile."
        }
      ],
      "correctId": "a",
      "explanation": "Comme pour une fonction classique, RDI repr\u00e9sente le premier param\u00e8tre du syscall (le code d'erreur)."
    }
  },
  {
    "id": "ex-mod20-3",
    "type": "quiz",
    "question": "Quelle instruction x86-64 d\u00e9clenche le passage du User-Space au Kernel-Space sous Linux ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "int 0x80"
        },
        {
          "id": "b",
          "text": "syscall"
        },
        {
          "id": "c",
          "text": "call kernel"
        }
      ],
      "correctId": "b",
      "explanation": "L'instruction moderne est `syscall`. Historiquement sur 32-bits, on utilisait l'interruption logicielle `int 0x80`."
    }
  },
  {
    "id": "ex-mod20-4",
    "type": "fill-blank",
    "question": "\u00c9crire dans le terminal",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "mov rax, 1      ; sys_write\nmov __BLANK__, 1      ; file descriptor (1 = stdout)\nmov rsi, msg    ; buffer\nmov rdx, 13     ; taille\nsyscall",
      "blanks": [
        {
          "id": "1",
          "answer": "rdi",
          "hint": "Le registre du 1er argument."
        }
      ],
      "explanation": "RDI prend toujours le File Descriptor (0=stdin, 1=stdout, 2=stderr)."
    }
  },
  {
    "id": "ex-mod20-5",
    "type": "quiz",
    "question": "Comment le noyau Linux retourne-t-il le r\u00e9sultat ou le statut du syscall (ex: sys_read) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Dans RDI."
        },
        {
          "id": "b",
          "text": "Dans RAX."
        },
        {
          "id": "c",
          "text": "Il n'y a pas de retour."
        }
      ],
      "correctId": "b",
      "explanation": "Le noyau remplace le num\u00e9ro de syscall dans RAX par la valeur de retour (ex: nombre d'octets lus, ou une erreur n\u00e9gative)."
    }
  },
  {
    "id": "ex-mod20-6",
    "type": "quiz",
    "question": "Pourquoi les registres RCX et R11 sont-ils 'd\u00e9truits' (\u00e9cras\u00e9s) silencieusement apr\u00e8s l'instruction `syscall` ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le processeur les utilise mat\u00e9riellement pour sauvegarder l'adresse de retour (RIP) et l'\u00e9tat des flags avant de sauter dans le noyau."
        },
        {
          "id": "b",
          "text": "C'est un bug de Linux."
        },
        {
          "id": "c",
          "text": "Ils servent \u00e0 transmettre des mots de passe."
        }
      ],
      "correctId": "a",
      "explanation": "L'instruction CPU `syscall` \u00e9crase RCX avec l'adresse de retour et R11 avec le RFLAGS, \u00e9vitant ainsi des acc\u00e8s lents \u00e0 la pile."
    }
  },
  {
    "id": "ex-mod20-7",
    "type": "drag-drop",
    "question": "Les Registres de l'Appel Syst\u00e8me",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "RAX (Num\u00e9ro du Syscall)"
        },
        {
          "id": "2",
          "text": "RDI (Arg 1)"
        },
        {
          "id": "3",
          "text": "RSI (Arg 2)"
        },
        {
          "id": "4",
          "text": "RDX (Arg 3)"
        },
        {
          "id": "5",
          "text": "R10 (Arg 4)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "instruction": "Ordonnez les registres selon la convention d'Appel Syst\u00e8me Linux x86-64.",
      "explanation": "Attention : contrairement \u00e0 l'ABI C (qui utilise RCX pour l'arg 4), le Syscall utilise R10 car RCX est d\u00e9truit !"
    }
  },
  {
    "id": "ex-mod20-8",
    "type": "fill-blank",
    "question": "Syscall vDSO (Virtual Dynamically Shared Object)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; L'OS mappe une petite zone m\u00e9moire partag\u00e9e dans chaque processus pour \u00e9viter certains syscalls lents.\n; Typiquement, la fonction __BLANK__ (heure du syst\u00e8me) l'utilise.",
      "blanks": [
        {
          "id": "1",
          "answer": "gettimeofday",
          "hint": "Prendre le temps."
        }
      ],
      "explanation": "R\u00e9cup\u00e9rer l'heure des millions de fois par seconde crasherait le syst\u00e8me si on devait faire un Context Switch \u00e0 chaque fois. Le vDSO permet de lire la m\u00e9moire du Kernel directement depuis l'espace utilisateur sans ralentissement."
    }
  },
  {
    "id": "ex-mod20-9",
    "type": "quiz",
    "question": "Comment g\u00e9rez-vous une erreur retourn\u00e9e par un syscall (comme Fichier introuvable sur sys_open) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le noyau l\u00e8ve une exception C++."
        },
        {
          "id": "b",
          "text": "Le programme plante avec une SEGFAULT."
        },
        {
          "id": "c",
          "text": "RAX contient une valeur n\u00e9gative (entre -1 et -4095) repr\u00e9sentant le code d'erreur (errno)."
        }
      ],
      "correctId": "c",
      "explanation": "En Assembleur, il faut toujours v\u00e9rifier si RAX est strictement inf\u00e9rieur \u00e0 0. (ex: `cmp rax, 0` puis `jl erreur`)."
    }
  },
  {
    "id": "ex-mod20-10",
    "type": "code-correction",
    "question": "Syscall vs Fonction C",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "mov rax, 1\nmov rdi, 1\nmov rsi, msg\nmov rdx, 10\nmov rcx, 0 ; Quatri\u00e8me argument\nsyscall",
      "correctCode": "mov rax, 1\nmov rdi, 1\nmov rsi, msg\nmov rdx, 10\nmov r10, 0 ; Quatri\u00e8me argument pour un SYSCALL\nsyscall",
      "hints": [
        "Rappelez-vous la subtile diff\u00e9rence d'ABI entre Linux Userspace et Linux Kernelspace."
      ],
      "explanation": "L'argument n\u00b04 passe dans RCX pour une fonction normale, mais dans R10 pour un Syscall (car RCX est d\u00e9truit)."
    }
  },
  {
    "id": "ex-mod21-1",
    "type": "quiz",
    "question": "Quel registre est implicitement utilis\u00e9 comme compteur de boucle par le pr\u00e9fixe `rep` ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "RAX"
        },
        {
          "id": "b",
          "text": "RCX"
        },
        {
          "id": "c",
          "text": "RDI"
        }
      ],
      "correctId": "b",
      "explanation": "`rep` d\u00e9cr\u00e9mente RCX jusqu'\u00e0 0 et ex\u00e9cute l'instruction de cha\u00eene \u00e0 chaque it\u00e9ration."
    }
  },
  {
    "id": "ex-mod21-2",
    "type": "quiz",
    "question": "Que fait l'instruction `stosb` ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle \u00e9crit le contenu du registre AL \u00e0 l'adresse point\u00e9e par RDI, puis incr\u00e9mente RDI."
        },
        {
          "id": "b",
          "text": "Elle lit la m\u00e9moire et la met dans AL."
        },
        {
          "id": "c",
          "text": "Elle copie RSI vers RDI."
        }
      ],
      "correctId": "a",
      "explanation": "STore String Byte. C'est le bloc de base du `memset`."
    }
  },
  {
    "id": "ex-mod21-3",
    "type": "quiz",
    "question": "Que fait l'instruction `movsb` ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle copie 1 octet de AL vers RDI."
        },
        {
          "id": "b",
          "text": "Elle copie 1 octet de l'adresse point\u00e9e par RSI vers l'adresse point\u00e9e par RDI, puis incr\u00e9mente les deux registres."
        },
        {
          "id": "c",
          "text": "Elle copie RDI vers RSI."
        }
      ],
      "correctId": "b",
      "explanation": "MOVe String Byte. C'est le c\u0153ur d'un `memcpy` natif en un seul opcode."
    }
  },
  {
    "id": "ex-mod21-4",
    "type": "fill-blank",
    "question": "Direction Flag",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Avant d'utiliser rep movsb, je m'assure que le parcours se fait en avan\u00e7ant (de gauche \u00e0 droite).\n__BLANK__\nrep movsb",
      "blanks": [
        {
          "id": "1",
          "answer": "cld",
          "hint": "Clear Direction Flag"
        }
      ],
      "explanation": "L'instruction 'cld' (Clear Direction Flag) met le flag DF \u00e0 0. L'instruction oppos\u00e9e est 'std' (Set DF) pour parcourir \u00e0 l'envers."
    }
  },
  {
    "id": "ex-mod21-5",
    "type": "quiz",
    "question": "Quelle est la principale utilit\u00e9 du pr\u00e9fixe `repnz scasb` (Scan String Byte) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Trouver la longueur d'une cha\u00eene de caract\u00e8res (strlen) en cherchant le caract\u00e8re nul (AL=0)."
        },
        {
          "id": "b",
          "text": "Copier une cha\u00eene."
        },
        {
          "id": "c",
          "text": "Effacer la RAM."
        }
      ],
      "correctId": "a",
      "explanation": "`repnz` s'arr\u00eate si RCX devient 0 OU si `scasb` trouve l'octet cherch\u00e9 (Zero Flag passe \u00e0 1)."
    }
  },
  {
    "id": "ex-mod21-6",
    "type": "quiz",
    "question": "Lors d'un chevauchement de m\u00e9moire (Overlap) lors d'une copie, faut-il utiliser `rep movsb` de gauche \u00e0 droite, ou de droite \u00e0 gauche ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Si la destination est plus grande en m\u00e9moire, il faut copier de droite \u00e0 gauche avec 'std' pour ne pas \u00e9craser les donn\u00e9es non-lues."
        },
        {
          "id": "b",
          "text": "Toujours de gauche \u00e0 droite (cld)."
        },
        {
          "id": "c",
          "text": "Peu importe."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'essence m\u00eame de la diff\u00e9rence entre `memcpy` (qui suppose aucun chevauchement) et `memmove` (qui g\u00e8re l'Overlap intelligemment)."
    }
  },
  {
    "id": "ex-mod21-7",
    "type": "drag-drop",
    "question": "Op\u00e9ration Memset",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "mov al, 0x00 ; Valeur de remplissage"
        },
        {
          "id": "2",
          "text": "mov rdi, adresse_buffer ; Destination"
        },
        {
          "id": "3",
          "text": "mov rcx, 100 ; Nombre d'octets \u00e0 remplir"
        },
        {
          "id": "4",
          "text": "cld ; Direction en avant"
        },
        {
          "id": "5",
          "text": "rep stosb ; Ex\u00e9cution"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "instruction": "Formez l'algorithme standard pour remplir un buffer de z\u00e9ros (memset).",
      "explanation": "C'est l'impl\u00e9mentation la plus propre d'un memset en x86."
    }
  },
  {
    "id": "ex-mod21-8",
    "type": "fill-blank",
    "question": "Optimisation des String Operations",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Copier octet par octet (stosb) est lent.\n; Copier 8 octets \u00e0 la fois est bien plus rapide sur un OS 64-bits.\nrep __BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "stosq",
          "hint": "STore String Quadword."
        }
      ],
      "explanation": "Les variantes Q (Quadword - 64 bits), D (Doubleword - 32 bits) et W (Word - 16 bits) permettent d'utiliser le plein potentiel du bus m\u00e9moire."
    }
  },
  {
    "id": "ex-mod21-9",
    "type": "quiz",
    "question": "Pourquoi les compilateurs modernes C (gcc/clang) n'utilisent-ils presque plus jamais `rep movsb` pour les grosses copies ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce que l'OS l'interdit."
        },
        {
          "id": "b",
          "text": "Parce qu'utiliser les registres vectoriels SIMD (AVX, SSE) pour copier 32 ou 64 octets d'un coup est largement plus rapide sur les architectures modernes."
        },
        {
          "id": "c",
          "text": "Parce qu'il comporte un bug de s\u00e9curit\u00e9."
        }
      ],
      "correctId": "b",
      "explanation": "Historiquement ultra-rapide, le Microcode interne du CPU pour `rep movsb` a souvent \u00e9t\u00e9 moins optimis\u00e9 que l'impl\u00e9mentation agressive d'une boucle AVX."
    }
  },
  {
    "id": "ex-mod21-10",
    "type": "code-correction",
    "question": "strlen natif",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "mov rdi, chaine\nmov al, 0\nmov rcx, -1\nrep scasb\n; La longueur est maintenant dans RCX ?",
      "correctCode": "mov rdi, chaine\nmov al, 0\nmov rcx, -1\nrepnz scasb\n; (not rcx) - 1 donnera la longueur",
      "hints": [
        "repnz (Repeat Not Zero) et non rep (qui s'arr\u00eaterait n'importe quand)."
      ],
      "explanation": "`repnz scasb` va s'arr\u00eater quand AL == [RDI], c'est \u00e0 dire au caract\u00e8re de fin nul '\\0'."
    }
  },
  {
    "id": "ex-mod22-1",
    "type": "quiz",
    "question": "Que signifie le fait qu'une instruction soit ATOMIQUE ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle s'ex\u00e9cute de fa\u00e7on indivisible : aucun autre processeur ou thread ne peut l'interrompre ou voir un \u00e9tat interm\u00e9diaire."
        },
        {
          "id": "b",
          "text": "Elle provoque une explosion nucl\u00e9aire."
        },
        {
          "id": "c",
          "text": "Elle prend tr\u00e8s peu de RAM."
        }
      ],
      "correctId": "a",
      "explanation": "Sans atomicit\u00e9, deux threads modifiant la m\u00eame variable \u00e9craseront l'un l'autre \u00e0 cause des Context Switches impr\u00e9visibles."
    }
  },
  {
    "id": "ex-mod22-2",
    "type": "quiz",
    "question": "L'instruction `inc qword [compteur]` (incr\u00e9mentation en m\u00e9moire) est-elle naturellement atomique ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Oui."
        },
        {
          "id": "b",
          "text": "Non, c'est en fait une suite de 3 \u00e9tapes (Lecture depuis RAM -> Addition dans le CPU -> \u00c9criture en RAM) pouvant \u00eatre interrompues."
        },
        {
          "id": "c",
          "text": "Non, elle ne marche que sur les registres."
        }
      ],
      "correctId": "b",
      "explanation": "C'est la cause num\u00e9ro 1 des 'Race Conditions'."
    }
  },
  {
    "id": "ex-mod22-3",
    "type": "quiz",
    "question": "Quel pr\u00e9fixe x86 faut-il ajouter pour garantir l'atomicit\u00e9 de certaines instructions comme `add` ou `inc` avec la m\u00e9moire ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "rep"
        },
        {
          "id": "b",
          "text": "lock"
        },
        {
          "id": "c",
          "text": "atomic"
        }
      ],
      "correctId": "b",
      "explanation": "Exemple: `lock inc qword [compteur]`. Le CPU verrouille le bus m\u00e9moire mat\u00e9riel le temps de l'op\u00e9ration."
    }
  },
  {
    "id": "ex-mod22-4",
    "type": "fill-blank",
    "question": "Cr\u00e9ation d'un Spinlock Mutex",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "acquire_lock:\n  mov eax, 1\n  ; \u00c9change atomiquement EAX et le verrou m\u00e9moire\n  __BLANK__ [verrou], eax\n  cmp eax, 0\n  jne acquire_lock ; Si l'ancienne valeur \u00e9tait d\u00e9j\u00e0 1, on boucle",
      "blanks": [
        {
          "id": "1",
          "answer": "xchg",
          "hint": "Echange (eXCHanGe)."
        }
      ],
      "explanation": "L'instruction `xchg` avec un op\u00e9rande m\u00e9moire est TOUJOURS atomique par d\u00e9faut en x86, m\u00eame sans pr\u00e9fixe `lock`."
    }
  },
  {
    "id": "ex-mod22-5",
    "type": "quiz",
    "question": "Que signifie CAS (Compare-And-Swap) dans la concurrence Lock-Free ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "C'est un antivirus."
        },
        {
          "id": "b",
          "text": "Le CPU compare la RAM \u00e0 une valeur attendue. Si c'est \u00e9gal, il \u00e9crit la nouvelle valeur, le tout en une seule op\u00e9ration magique atomique."
        },
        {
          "id": "c",
          "text": "C'est un appel syst\u00e8me Linux."
        }
      ],
      "correctId": "b",
      "explanation": "En x86, CAS est impl\u00e9ment\u00e9 par la puissante instruction `cmpxchg`."
    }
  },
  {
    "id": "ex-mod22-6",
    "type": "quiz",
    "question": "Quel est le probl\u00e8me principal d'un 'Spinlock' (boucle while) pour prot\u00e9ger une ressource ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Il consomme 100% du CPU pour tourner dans le vide si le verrou est d\u00e9tenu par un autre thread lent."
        },
        {
          "id": "b",
          "text": "Il est trop complexe \u00e0 coder."
        },
        {
          "id": "c",
          "text": "Il n'est pas atomique."
        }
      ],
      "correctId": "a",
      "explanation": "C'est pourquoi, en espace utilisateur (Userspace), on pr\u00e9f\u00e8re appeler l'OS (Mutex/Futex) pour que le thread soit endormi ('Sleep') et r\u00e9veill\u00e9 plus tard."
    }
  },
  {
    "id": "ex-mod22-7",
    "type": "drag-drop",
    "question": "Le FUTEX de Linux (Fast Userspace Mutex)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Le Thread A utilise `lock cmpxchg` pour prendre le verrou en userspace (Ultra rapide, pas d'OS)"
        },
        {
          "id": "2",
          "text": "Le Thread B tente un `lock cmpxchg` mais voit que la ressource est verrouill\u00e9e"
        },
        {
          "id": "3",
          "text": "Le Thread B invoque le Syscall `futex` demandant \u00e0 l'OS de l'endormir (Lent, changement de contexte)"
        },
        {
          "id": "4",
          "text": "Le Thread A rel\u00e2che le verrou (`mov [verrou], 0`) et appelle `futex` pour r\u00e9veiller B"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "D\u00e9roulez l'ex\u00e9cution parfaite d'un Mutex C++ ou POSIX moderne.",
      "explanation": "Le Futex (Fast Userspace Mutex) marie la vitesse de l'ASM pur (pas de syscall si pas de conflit) et la politesse de l'OS (endormissement au lieu du Spinlock co\u00fbteux)."
    }
  },
  {
    "id": "ex-mod22-8",
    "type": "fill-blank",
    "question": "La Barri\u00e8re M\u00e9moire",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Emp\u00eache le CPU de r\u00e9ordonner (Out-of-Order execution) les \u00e9critures m\u00e9moire autour de cette instruction.\n__BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "mfence",
          "hint": "Memory Fence."
        }
      ],
      "explanation": "Les CPU modernes modifient l'ordre de vos instructions ASM pour aller plus vite. En multithreading Lock-Free agressif, une barri\u00e8re `mfence` emp\u00eache l'anarchie."
    }
  },
  {
    "id": "ex-mod22-9",
    "type": "quiz",
    "question": "L'instruction `pause` \u00e0 l'int\u00e9rieur d'un Spinlock sert-elle \u00e0 endormir le thread ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Oui, elle appelle le noyau Linux."
        },
        {
          "id": "b",
          "text": "Non, elle indique simplement au CPU qu'il est dans un Spin-Loop pour qu'il \u00e9conomise de l'\u00e9nergie et optimise le pipeline (\u00e9vite un memory order violation)."
        },
        {
          "id": "c",
          "text": "Elle arr\u00eate la musique."
        }
      ],
      "correctId": "b",
      "explanation": "Ins\u00e9rer `pause` dans une boucle d'attente active est la meilleure pratique x86."
    }
  },
  {
    "id": "ex-mod22-10",
    "type": "code-correction",
    "question": "Impl\u00e9mentation d'un flag Atomics C++11",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "add [compteur], 5",
      "correctCode": "lock add dword [compteur], 5",
      "hints": [
        "Faites que \u00e7a soit Thread-Safe (Atomique)."
      ],
      "explanation": "C++ std::atomic<int> produit exactement ceci sous le capot. Un simple `add` sans `lock` am\u00e8nera \u00e0 un crash d\u00e9sastreux et difficile \u00e0 d\u00e9boguer en production."
    }
  }
];
