import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData, CodeCorrectionData } from '../../types';

export const advancedExercises: Exercise[] = [
  {
    "id": "ex-mod12-1",
    "type": "quiz",
    "question": "Quelle est l'horloge la plus rapide du syst\u00e8me ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "L'horloge syst\u00e8me (FSB/BCLK)."
        },
        {
          "id": "b",
          "text": "L'horloge interne du CPU, obtenue par multiplication (Clock Multiplier) de l'horloge syst\u00e8me."
        },
        {
          "id": "c",
          "text": "L'horloge de la RAM."
        }
      ],
      "correctId": "b",
      "explanation": "Le CPU tourne souvent \u00e0 4 GHz en multipliant l'horloge syst\u00e8me de 100 MHz."
    }
  },
  {
    "id": "ex-mod12-2",
    "type": "quiz",
    "question": "Qu'est-ce que le MMIO (Memory-Mapped I/O) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une technique pour \u00e9crire sur le disque dur."
        },
        {
          "id": "b",
          "text": "La carte graphique."
        },
        {
          "id": "c",
          "text": "L'assignation de p\u00e9riph\u00e9riques mat\u00e9riels (clavier, carte r\u00e9seau) \u00e0 des adresses m\u00e9moire sp\u00e9cifiques (RAM) pour communiquer avec eux via de simples 'mov'."
        }
      ],
      "correctId": "c",
      "explanation": "Pour parler \u00e0 un mat\u00e9riel MMIO, on \u00e9crit dans son 'adresse' comme si c'\u00e9tait de la RAM."
    }
  },
  {
    "id": "ex-mod12-3",
    "type": "quiz",
    "question": "Quel mot-cl\u00e9 C/C++ est OBLIGATOIRE lorsqu'on manipule des registres mat\u00e9riels MMIO ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "inline"
        },
        {
          "id": "b",
          "text": "volatile"
        },
        {
          "id": "c",
          "text": "const"
        }
      ],
      "correctId": "b",
      "explanation": "Il emp\u00eache le compilateur d'optimiser et de supprimer les lectures/\u00e9critures cons\u00e9cutives."
    }
  },
  {
    "id": "ex-mod12-4",
    "type": "fill-blank",
    "question": "Interruptions (IRQ)",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Avant de modifier le vecteur d'interruptions (IDT), on doit d'abord les d\u00e9sactiver\n__BLANK__ ; Clear Interrupt Flag\n; modification...\n__BLANK__ ; Set Interrupt Flag",
      "blanks": [
        {
          "id": "1",
          "answer": "cli",
          "hint": "Clear Interrupts."
        },
        {
          "id": "2",
          "answer": "sti",
          "hint": "Set Interrupts."
        }
      ],
      "explanation": "Sinon, une interruption pendant la modification provoquerait un crash instantan\u00e9."
    }
  },
  {
    "id": "ex-mod12-5",
    "type": "quiz",
    "question": "Quelle pratique est formellement INTERDITE dans un gestionnaire d'interruption (ISR) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Modifier une variable globale volatile."
        },
        {
          "id": "b",
          "text": "Mettre une fonction de d\u00e9lai (ex: delay(1000)) ou appeler un syscall bloquant."
        },
        {
          "id": "c",
          "text": "Allumer une LED."
        }
      ],
      "correctId": "b",
      "explanation": "Un ISR bloque g\u00e9n\u00e9ralement toutes les autres interruptions. S'il est lent, le syst\u00e8me 'freezera'."
    }
  },
  {
    "id": "ex-mod12-6",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Pipeline' d'un CPU moderne ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une technique d'ex\u00e9cution o\u00f9 les instructions sont d\u00e9coup\u00e9es en plusieurs \u00e9tapes (Fetch, Decode, Execute) ex\u00e9cut\u00e9es en parall\u00e8le par diff\u00e9rents circuits du CPU."
        },
        {
          "id": "b",
          "text": "Un tuyau de refroidissement liquide."
        },
        {
          "id": "c",
          "text": "Le c\u00e2ble d'alimentation."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'\u00e9quivalent d'une cha\u00eene de montage d'usine. Une instruction sort \u00e0 chaque cycle."
    }
  },
  {
    "id": "ex-mod12-7",
    "type": "drag-drop",
    "question": "Le Pipeline classique (RISC/CISC moderne)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Fetch (R\u00e9cup\u00e9rer l'instruction depuis le Cache L1)"
        },
        {
          "id": "2",
          "text": "Decode (D\u00e9coder l'instruction en Micro-ops)"
        },
        {
          "id": "3",
          "text": "Execute (L'ALU effectue le calcul)"
        },
        {
          "id": "4",
          "text": "Write-Back (\u00c9crire le r\u00e9sultat dans le registre)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Ordonnez les \u00e9tapes de traitement d'une seule instruction dans un processeur pipelin\u00e9.",
      "explanation": "Cette s\u00e9paration permet au CPU de traiter 4 instructions en m\u00eame temps \u00e0 des \u00e9tapes diff\u00e9rentes."
    }
  },
  {
    "id": "ex-mod12-8",
    "type": "fill-blank",
    "question": "Superscalaire et IPC",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Un CPU superscalaire peut ex\u00e9cuter plus de 1 instruction par cycle.\n; Son IPC (Instructions Per Cycle) th\u00e9orique d\u00e9pend du nombre d'__BLANK__\n; (Unit\u00e9 Arithm\u00e9tique et Logique).",
      "blanks": [
        {
          "id": "1",
          "answer": "ALU",
          "hint": "Arithmetic Logic Unit."
        }
      ],
      "explanation": "S'il y a 4 ALU ind\u00e9pendantes, le processeur peut faire 4 additions en 1 seul cycle."
    }
  },
  {
    "id": "ex-mod12-9",
    "type": "quiz",
    "question": "Pourquoi le compilateur (ou le CPU lui-m\u00eame via Out-of-Order Execution) r\u00e9ordonne-t-il vos instructions Assembleur ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Pour corriger vos bugs de logique."
        },
        {
          "id": "b",
          "text": "Pour \u00e9viter les 'Data Hazards' (d\u00e9pendances de donn\u00e9es) qui forceraient le pipeline \u00e0 faire une pause (stall)."
        },
        {
          "id": "c",
          "text": "Pour le rendre illisible aux hackers."
        }
      ],
      "correctId": "b",
      "explanation": "Si l'instruction 2 a besoin du r\u00e9sultat de l'instruction 1, le CPU peut avancer l'instruction 3 entre-temps."
    }
  },
  {
    "id": "ex-mod12-10",
    "type": "code-correction",
    "question": "Data Hazard Evitement",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "add rax, rbx\nmov rcx, rax\nadd rdx, 5",
      "correctCode": "add rax, rbx\nadd rdx, 5\nmov rcx, rax",
      "hints": [
        "\u00c9loignez l'utilisation de RAX de son calcul pour laisser le temps \u00e0 l'ALU de finir."
      ],
      "explanation": "Placer une instruction ind\u00e9pendante entre l'addition et la lecture du r\u00e9sultat masque la latence de l'addition."
    }
  },
  {
    "id": "ex-mod13-1",
    "type": "quiz",
    "question": "Que signifie SIMD ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Single Instruction, Multiple Data."
        },
        {
          "id": "b",
          "text": "System Internal Memory Device."
        },
        {
          "id": "c",
          "text": "Simple Integer Math Divider."
        }
      ],
      "correctId": "a",
      "explanation": "Une seule instruction assembleur ex\u00e9cute le m\u00eame calcul sur plusieurs valeurs en m\u00eame temps."
    }
  },
  {
    "id": "ex-mod13-2",
    "type": "quiz",
    "question": "Combien de bits fait un registre YMM (utilis\u00e9 par AVX) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "64 bits"
        },
        {
          "id": "b",
          "text": "128 bits"
        },
        {
          "id": "c",
          "text": "256 bits"
        }
      ],
      "correctId": "c",
      "explanation": "Un registre YMM de 256 bits peut contenir 8 entiers de 32 bits, ou 8 floats."
    }
  },
  {
    "id": "ex-mod13-3",
    "type": "quiz",
    "question": "Quelle est la principale source de plantages (crash) lors de l'utilisation manuelle d'instructions SIMD (SSE/AVX) avec la m\u00e9moire ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "L'utilisation de nombres n\u00e9gatifs."
        },
        {
          "id": "b",
          "text": "Une division par z\u00e9ro."
        },
        {
          "id": "c",
          "text": "Un mauvais alignement de la m\u00e9moire (ex: adresse non multiple de 16 ou 32 octets)."
        }
      ],
      "correctId": "c",
      "explanation": "Les instructions comme 'movdqa' (Move Double Quadword Aligned) exigent un alignement strict, sinon c'est le crash garanti."
    }
  },
  {
    "id": "ex-mod13-4",
    "type": "fill-blank",
    "question": "Addition vectorielle (AVX)",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Additionner 8 floats simultan\u00e9ment\n; Le pr\u00e9fixe 'v' (VEX) permet une syntaxe non-destructrice \u00e0 3 op\u00e9randes\n__BLANK__ ymm0, ymm1, ymm2",
      "blanks": [
        {
          "id": "1",
          "answer": "vaddps",
          "hint": "Vector ADD Packed Single-precision."
        }
      ],
      "explanation": "vaddps (AVX) additionne les \u00e9l\u00e9ments de ymm1 et ymm2 et met le r\u00e9sultat dans ymm0 sans \u00e9craser ymm1."
    }
  },
  {
    "id": "ex-mod13-5",
    "type": "quiz",
    "question": "Qu'est-ce que l'Auto-Vectorization ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le fait que le CPU active AVX tout seul."
        },
        {
          "id": "b",
          "text": "La capacit\u00e9 du compilateur (GCC, Clang) \u00e0 analyser une boucle for classique et \u00e0 la transformer automatiquement en instructions SIMD."
        },
        {
          "id": "c",
          "text": "Un syst\u00e8me de pilotage de voiture autonome."
        }
      ],
      "correctId": "b",
      "explanation": "C'est l'optimisation (-O3) la plus redoutable. Le compilateur remplace votre boucle par une version 8 fois plus rapide."
    }
  },
  {
    "id": "ex-mod13-6",
    "type": "quiz",
    "question": "Quel est le risque de l'utilisation intensive des instructions AVX-512 (registres ZMM de 512 bits) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "La baisse de la fr\u00e9quence d'horloge du processeur (Downclocking) \u00e0 cause de la surchauffe extr\u00eame."
        },
        {
          "id": "b",
          "text": "La suppression de Windows."
        },
        {
          "id": "c",
          "text": "Le blocage de la carte graphique."
        }
      ],
      "correctId": "a",
      "explanation": "Historiquement (Intel Skylake), ex\u00e9cuter des instructions AVX-512 consommait tellement d'\u00e9nergie que le CPU baissait sa fr\u00e9quence pour tout le monde."
    }
  },
  {
    "id": "ex-mod13-7",
    "type": "drag-drop",
    "question": "La hi\u00e9rarchie des registres vectoriels SIMD",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "MMX (64 bits, partage les registres x87) - Obsol\u00e8te"
        },
        {
          "id": "2",
          "text": "SSE (XMM0-XMM15, 128 bits)"
        },
        {
          "id": "3",
          "text": "AVX / AVX2 (YMM0-YMM15, 256 bits)"
        },
        {
          "id": "4",
          "text": "AVX-512 (ZMM0-ZMM31, 512 bits)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Classez les technologies SIMD de la plus ancienne/petite \u00e0 la plus r\u00e9cente/grande.",
      "explanation": "Notez que la partie basse d'un registre YMM EST le registre XMM correspondant, tout comme EAX est dans RAX."
    }
  },
  {
    "id": "ex-mod13-8",
    "type": "fill-blank",
    "question": "Splatting / Broadcast",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Copier un seul float pr\u00e9sent en m\u00e9moire dans TOUTES les positions d'un registre YMM (8 floats identiques)\n__BLANK__ ymm0, [ma_constante_float]",
      "blanks": [
        {
          "id": "1",
          "answer": "vbroadcastss",
          "hint": "Vector Broadcast Single Scalar."
        }
      ],
      "explanation": "C'est vital pour multiplier tout un tableau de vecteurs par une seule constante (ex: augmenter la luminosit\u00e9 de tous les pixels)."
    }
  },
  {
    "id": "ex-mod13-9",
    "type": "quiz",
    "question": "Qu'est-ce qu'une op\u00e9ration 'Packed' vs 'Scalar' en SIMD ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Packed agit sur TOUS les \u00e9l\u00e9ments du registre simultan\u00e9ment. Scalar n'agit QUE sur le premier \u00e9l\u00e9ment (le plus bas) du registre."
        },
        {
          "id": "b",
          "text": "Packed compresse les donn\u00e9es. Scalar les d\u00e9compresse."
        },
        {
          "id": "c",
          "text": "Aucune diff\u00e9rence."
        }
      ],
      "correctId": "a",
      "explanation": "Exemple : `addps` (Packed Single) additionne 4 floats. `addss` (Scalar Single) additionne seulement le 1er float et laisse les autres intacts."
    }
  },
  {
    "id": "ex-mod13-10",
    "type": "code-correction",
    "question": "Alignement SSE strict",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "movups xmm0, [memoire_non_alignee]\nmovaps xmm1, [memoire_non_alignee]",
      "correctCode": "movups xmm0, [memoire_non_alignee]\nmovups xmm1, [memoire_non_alignee]",
      "hints": [
        "L'instruction 'aps' (Aligned Packed Single) crashera si la m\u00e9moire n'est pas align\u00e9e sur 16 octets."
      ],
      "explanation": "Si vous n'\u00eates pas certain de l'alignement, utilisez toujours la version Unaligned (movups, vmovups). Avec AVX, la p\u00e9nalit\u00e9 de performance de l'Unaligned est devenue quasi-nulle."
    }
  },
  {
    "id": "ex-mod14-1",
    "type": "quiz",
    "question": "Sous System V ABI (Linux x86-64), dans quel ordre sont pass\u00e9s les 6 premiers arguments entiers d'une fonction ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Sur la pile, de droite \u00e0 gauche."
        },
        {
          "id": "b",
          "text": "RDI, RSI, RDX, RCX, R8, R9"
        },
        {
          "id": "c",
          "text": "RAX, RBX, RCX, RDX, RDI, RSI"
        }
      ],
      "correctId": "b",
      "explanation": "Cette s\u00e9quence est utilis\u00e9e universellement sur Linux/macOS."
    }
  },
  {
    "id": "ex-mod14-2",
    "type": "quiz",
    "question": "O\u00f9 passe-t-on le 7\u00e8me argument d'une fonction sous Linux x86-64 ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Dans R10."
        },
        {
          "id": "b",
          "text": "Sur la pile (Stack), pouss\u00e9 avant l'appel."
        },
        {
          "id": "c",
          "text": "On ne peut pas avoir 7 arguments."
        }
      ],
      "correctId": "b",
      "explanation": "Une fois les registres \u00e9puis\u00e9s, on utilise le m\u00e9canisme historique : la pile."
    }
  },
  {
    "id": "ex-mod14-3",
    "type": "quiz",
    "question": "Quelle est la particularit\u00e9 tr\u00e8s stricte de l'ABI Windows x64 concernant le 'Shadow Space' ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "L'appelant (caller) DOIT allouer syst\u00e9matiquement 32 octets sur la pile avant chaque 'call', m\u00eame si la fonction n'a aucun argument."
        },
        {
          "id": "b",
          "text": "Les ombres ne sont pas g\u00e9r\u00e9es par le CPU."
        },
        {
          "id": "c",
          "text": "L'appel\u00e9 (callee) doit vider le cache."
        }
      ],
      "correctId": "a",
      "explanation": "Ces 32 octets servent de zone de sauvegarde (Home Space) pour que la fonction appel\u00e9e puisse y d\u00e9verser RCX/RDX/R8/R9 si elle a besoin de les utiliser."
    }
  },
  {
    "id": "ex-mod14-4",
    "type": "fill-blank",
    "question": "Registres Volatils vs Non-Volatils",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; La fonction appel\u00e9e DOIT restaurer certains registres (Non-Volatils) avant de revenir.\n; Exemple type sur Linux :\npush __BLANK__\n; ... utilisation ...\npop __BLANK__\nret",
      "blanks": [
        {
          "id": "1",
          "answer": "rbx",
          "hint": "Registre Base."
        },
        {
          "id": "2",
          "answer": "rbx",
          "hint": "Restauration."
        }
      ],
      "explanation": "RBX, RBP, R12-R15 sont Callee-Saved (non-volatils). RDI, RSI, RAX, RCX sont Caller-Saved (volatils)."
    }
  },
  {
    "id": "ex-mod14-5",
    "type": "quiz",
    "question": "Comment retourne-t-on un gros objet C++ (ex: un struct de 128 octets) qui ne rentre pas dans RAX ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "L'appelant alloue l'espace m\u00e9moire pour l'objet et passe un pointeur 'cach\u00e9' (souvent dans RDI) \u00e0 l'appel\u00e9 pour qu'il le remplisse (Return Value Optimization)."
        },
        {
          "id": "b",
          "text": "On le retourne via la carte graphique."
        },
        {
          "id": "c",
          "text": "On utilise R8, R9, R10 et R11 simultan\u00e9ment."
        }
      ],
      "correctId": "a",
      "explanation": "L'objet n'est techniquement jamais 'retourn\u00e9', il est construit 'sur place' directement dans la Frame de l'appelant."
    }
  },
  {
    "id": "ex-mod14-6",
    "type": "quiz",
    "question": "Pourquoi la convention d'appel 'fastcall' a-t-elle \u00e9t\u00e9 invent\u00e9e \u00e0 l'\u00e9poque du 32-bits (x86) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce qu'\u00e0 l'origine (cdecl), TOUS les arguments passaient par la pile (tr\u00e8s lent). Fastcall passait les 2 ou 3 premiers dans ECX/EDX."
        },
        {
          "id": "b",
          "text": "Pour faire des sauts plus loin."
        },
        {
          "id": "c",
          "text": "Pour ex\u00e9cuter le programme plus vite."
        }
      ],
      "correctId": "a",
      "explanation": "Le passage par registre est immens\u00e9ment plus rapide que les push/pop sur la pile."
    }
  },
  {
    "id": "ex-mod14-7",
    "type": "drag-drop",
    "question": "Diff\u00e9rence Linux vs Windows x64",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Arguments Windows"
        },
        {
          "id": "2",
          "text": "Arguments Linux"
        },
        {
          "id": "3",
          "text": "Shadow Space Windows"
        },
        {
          "id": "4",
          "text": "Red Zone Linux (128 octets sous RSP)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Associez les concepts. Mettez d'abord Windows (Args: RCX, RDX, R8, R9), puis Linux (Args: RDI, RSI...), puis Shadow Space (32 octets obligatoires pour Win), puis Red Zone (Zone s\u00fbre de 128 bytes pour Linux).",
      "explanation": "La Red Zone Linux permet aux fonctions feuilles (leaf functions) d'utiliser la pile sans m\u00eame bouger RSP !"
    }
  },
  {
    "id": "ex-mod14-8",
    "type": "fill-blank",
    "question": "Nettoyage de pile de l'Appelant",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "push rdx ; Arg 8\npush rcx ; Arg 7\ncall grosse_fonction\n; L'appelant doit restaurer la pile !\nadd rsp, __BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "16",
          "hint": "2 push de 8 octets."
        }
      ],
      "explanation": "Sous cdecl/SystemV, c'est celui qui appelle (Caller) qui a la responsabilit\u00e9 de retirer les arguments de la pile apr\u00e8s le 'call'."
    }
  },
  {
    "id": "ex-mod14-9",
    "type": "quiz",
    "question": "Qu'est-ce que la 'Name Mangling' (D\u00e9coration de nom) en C++ ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le compilateur modifie le nom d'une fonction (ex: void func(int) devient _Z4funci) pour encoder ses param\u00e8tres, permettant la surcharge (Overloading)."
        },
        {
          "id": "b",
          "text": "L'ajout d'emojis dans les commentaires."
        },
        {
          "id": "c",
          "text": "La suppression des variables."
        }
      ],
      "correctId": "a",
      "explanation": "C'est pour cela qu'on utilise `extern \"C\"` : pour d\u00e9sactiver le Mangling et garder le nom pur afin d'\u00eatre appel\u00e9 depuis l'Assembleur ou le C."
    }
  },
  {
    "id": "ex-mod14-10",
    "type": "code-correction",
    "question": "Alignement de la pile \u00e0 16 octets",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "; On appelle printf sans aligner la pile\npush rax ; La pile est maintenant d\u00e9salign\u00e9e (terminant par 8)\nmov rdi, chaine\ncall printf",
      "correctCode": "sub rsp, 8 ; Aligner la pile sur 16 octets\npush rax ; 8 + 8 = 16\nmov rdi, chaine\ncall printf\nadd rsp, 16 ; Nettoyage",
      "hints": [
        "La pile DOIT \u00eatre align\u00e9e sur 16 octets avant d'appeler une fonction C."
      ],
      "explanation": "La glibc Linux utilise des instructions AVX qui crashent lamentablement (Segfault) si la pile n'est pas un multiple de 16 au moment du CALL."
    }
  },
  {
    "id": "ex-mod15-1",
    "type": "quiz",
    "question": "Sur les processeurs modernes, quels registres utilise-t-on pour les calculs en virgule flottante (Float/Double) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Les registres SSE/AVX (XMM, YMM)."
        },
        {
          "id": "b",
          "text": "L'ancien coprocesseur x87 (ST0-ST7)."
        },
        {
          "id": "c",
          "text": "Les registres g\u00e9n\u00e9raux (RAX)."
        }
      ],
      "correctId": "a",
      "explanation": "Le x87 est obsol\u00e8te. Les compilateurs utilisent le jeu d'instructions SSE (XMM) pour faire des math\u00e9matiques flottantes scalaires."
    }
  },
  {
    "id": "ex-mod15-2",
    "type": "quiz",
    "question": "Pourquoi le compilateur ajoute-t-il du 'Padding' (octets vides) dans une structure C ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Pour aligner les variables en m\u00e9moire et acc\u00e9l\u00e9rer les acc\u00e8s CPU."
        },
        {
          "id": "b",
          "text": "Pour cacher des virus."
        },
        {
          "id": "c",
          "text": "Pour d\u00e9tecter les Buffer Overflows."
        }
      ],
      "correctId": "a",
      "explanation": "Un entier 32-bits doit id\u00e9alement commencer \u00e0 une adresse multiple de 4."
    }
  },
  {
    "id": "ex-mod15-3",
    "type": "quiz",
    "question": "Dans quel registre passe-t-on le premier argument 'float' ou 'double' \u00e0 une fonction sous Linux x86-64 ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "XMM0"
        },
        {
          "id": "b",
          "text": "RDI"
        },
        {
          "id": "c",
          "text": "ST0"
        }
      ],
      "correctId": "a",
      "explanation": "Les entiers vont dans RDI/RSI..., les floats dans XMM0/XMM1... Ils utilisent des chemins mat\u00e9riels diff\u00e9rents."
    }
  },
  {
    "id": "ex-mod15-4",
    "type": "fill-blank",
    "question": "L'instruction Flottante Scalaire",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Additionner deux doubles (64-bits flottant) dans XMM0\n__BLANK__ xmm0, xmm1",
      "blanks": [
        {
          "id": "1",
          "answer": "addsd",
          "hint": "ADD Scalar Double-precision."
        }
      ],
      "explanation": "Suffixes : 'ss' = Scalar Single (float 32), 'sd' = Scalar Double (double 64). 'ps' = Packed Single, 'pd' = Packed Double."
    }
  },
  {
    "id": "ex-mod15-5",
    "type": "quiz",
    "question": "Combien d'octets p\u00e8se cette structure (sans la forcer avec __attribute__((packed))) : `struct { char a; int b; char c; }` sur 64-bits ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "6 octets"
        },
        {
          "id": "b",
          "text": "12 octets"
        },
        {
          "id": "c",
          "text": "16 octets"
        }
      ],
      "correctId": "b",
      "explanation": "a(1) + padding(3) + b(4) + c(1) + padding final(3) = 12. Le compilateur ajoute du padding interne et un padding de fin pour l'alignement."
    }
  },
  {
    "id": "ex-mod15-6",
    "type": "quiz",
    "question": "Quel est le danger d'utiliser `__attribute__((packed))` sur une structure ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le CPU devra faire deux lectures m\u00e9moire au lieu d'une pour r\u00e9cup\u00e9rer un entier d\u00e9salign\u00e9, plombant les performances (voire crash sur ARM)."
        },
        {
          "id": "b",
          "text": "La structure prendra plus de RAM."
        },
        {
          "id": "c",
          "text": "Elle deviendra illisible en C."
        }
      ],
      "correctId": "a",
      "explanation": "Le packing est r\u00e9serv\u00e9 \u00e0 la lecture stricte de formats de fichiers ou de paquets r\u00e9seau bruts."
    }
  },
  {
    "id": "ex-mod15-7",
    "type": "drag-drop",
    "question": "Format IEEE 754 (Float 32-bits)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Signe (1 bit - positif/n\u00e9gatif)"
        },
        {
          "id": "2",
          "text": "Exposant (8 bits - Puissance de 2 avec biais de 127)"
        },
        {
          "id": "3",
          "text": "Mantisse / Fraction (23 bits - les d\u00e9cimales du nombre)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3"
      ],
      "instruction": "Ordonnez les \u00e9l\u00e9ments composant un nombre flottant (de la gauche vers la droite / bit de poids fort vers faible).",
      "explanation": "C'est la norme math\u00e9matique hardware utilis\u00e9e par absolument tous les CPU modernes pour la virgule flottante."
    }
  },
  {
    "id": "ex-mod15-8",
    "type": "fill-blank",
    "question": "Conversion Entier -> Float",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Convertir l'entier 32-bits dans EAX vers un Float 32-bits dans XMM0\n__BLANK__ xmm0, eax",
      "blanks": [
        {
          "id": "1",
          "answer": "cvtsi2ss",
          "hint": "ConVerT Scalar Integer TO Scalar Single."
        }
      ],
      "explanation": "Le CPU a des instructions d\u00e9di\u00e9es pour changer le codage binaire entre la repr\u00e9sentation enti\u00e8re (Compl\u00e9ment \u00e0 2) et la norme IEEE 754."
    }
  },
  {
    "id": "ex-mod15-9",
    "type": "quiz",
    "question": "Quelle valeur RAX doit-il avoir avant d'appeler `printf` sous Linux s'il n'y a pas de variables float (variadic args) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "RAX doit contenir le nombre de registres XMM utilis\u00e9s (donc 0)."
        },
        {
          "id": "b",
          "text": "RAX doit valoir 1."
        },
        {
          "id": "c",
          "text": "Peu importe."
        }
      ],
      "correctId": "a",
      "explanation": "Pour les fonctions \u00e0 arguments variables (comme printf), l'ABI impose d'indiquer combien de registres vectoriels contiennent des param\u00e8tres, pour \u00e9viter des sauvegardes inutiles."
    }
  },
  {
    "id": "ex-mod15-10",
    "type": "code-correction",
    "question": "Struct r\u00e9organisation",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "struct Data {\n  char a;\n  double b;\n  char c;\n};",
      "correctCode": "struct Data {\n  double b; // 8 bytes\n  char a;   // 1 byte\n  char c;   // 1 byte\n};",
      "hints": [
        "Regroupez les types similaires et placez les plus gros en premier pour r\u00e9duire le padding final."
      ],
      "explanation": "La 1\u00e8re version prend 24 octets (1+7pad + 8 + 1+7pad). La 2\u00e8me version prend 16 octets (8 + 1 + 1 + 6pad). Une \u00e9conomie massive !"
    }
  },
  {
    "id": "ex-mod16-1",
    "type": "quiz",
    "question": "Dans un Buffer Overflow classique (Smashing the stack), quelle valeur de la pile l'attaquant cherche-t-il sp\u00e9cifiquement \u00e0 \u00e9craser ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "La 'Return Address' (Adresse de Retour) pouss\u00e9e par le call pr\u00e9c\u00e9dent."
        },
        {
          "id": "b",
          "text": "Le registre RAX."
        },
        {
          "id": "c",
          "text": "Les param\u00e8tres de la fonction."
        }
      ],
      "correctId": "a",
      "explanation": "En \u00e9crasant cette adresse, l'instruction 'ret' finale forcera le processeur \u00e0 sauter vers l'adresse choisie par l'attaquant."
    }
  },
  {
    "id": "ex-mod16-2",
    "type": "quiz",
    "question": "Qu'est-ce qu'un NOP Sled (Toboggan \u00e0 NOPs) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une suite d'instructions NOP (0x90) plac\u00e9e avant le code malveillant pour augmenter les chances de r\u00e9ussite de l'exploitation."
        },
        {
          "id": "b",
          "text": "Un jeu d'hiver."
        },
        {
          "id": "c",
          "text": "Une technique d'optimisation du CPU."
        }
      ],
      "correctId": "a",
      "explanation": "Si le saut atterrit n'importe o\u00f9 dans le NOP Sled, le processeur glissera pacifiquement (NOP = Ne Rien Faire) jusqu'au Shellcode."
    }
  },
  {
    "id": "ex-mod16-3",
    "type": "quiz",
    "question": "Qu'est-ce que le Shellcode ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Du code en langage C."
        },
        {
          "id": "b",
          "text": "Des opcodes binaires d'Assembleur bruts inject\u00e9s dans la RAM cible (g\u00e9n\u00e9ralement con\u00e7us pour ouvrir un terminal/shell)."
        },
        {
          "id": "c",
          "text": "Un script Bash."
        }
      ],
      "correctId": "b",
      "explanation": "C'est l'essence de l'exploitation : injecter le Payload (instructions machine) sous forme de cha\u00eene de caract\u00e8res via une faille."
    }
  },
  {
    "id": "ex-mod16-4",
    "type": "fill-blank",
    "question": "Protection NX Bit (No eXecute)",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Le bit NX emp\u00eache mat\u00e9riellement l'ex\u00e9cution d'instructions situ\u00e9es sur la __BLANK__ ou le Tas.\n; Un buffer overflow classique (sauter sur son propre shellcode) l\u00e8vera une exception mat\u00e9rielle.",
      "blanks": [
        {
          "id": "1",
          "answer": "pile",
          "hint": "Stack."
        }
      ],
      "explanation": "Cette protection (Data Execution Prevention - DEP) rend la m\u00e9moire inscriptible non-ex\u00e9cutable."
    }
  },
  {
    "id": "ex-mod16-5",
    "type": "quiz",
    "question": "Comment l'attaque ROP (Return-Oriented Programming) contourne-t-elle le NX Bit ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle modifie les droits du NX bit."
        },
        {
          "id": "b",
          "text": "Au lieu d'injecter du code, elle \u00e9crase la pile avec une succession d'adresses pointant vers des bouts de code l\u00e9gitime existant (Gadgets) se terminant par 'ret'."
        },
        {
          "id": "c",
          "text": "Elle infecte le BIOS."
        }
      ],
      "correctId": "b",
      "explanation": "En cha\u00eenant des 'ret', l'attaquant programme le processeur \u00e0 sauter de gadget en gadget dans le code original de l'application (ou de la libc)."
    }
  },
  {
    "id": "ex-mod16-6",
    "type": "quiz",
    "question": "Qu'est-ce que l'ASLR (Address Space Layout Randomization) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "L'OS charge al\u00e9atoirement les adresses de base du code, de la pile et des biblioth\u00e8ques \u00e0 chaque lancement, rendant l'attaque ROP extr\u00eamement difficile."
        },
        {
          "id": "b",
          "text": "Un algorithme de chiffrement de la RAM."
        },
        {
          "id": "c",
          "text": "Le fait que les pointeurs C changent de type."
        }
      ],
      "correctId": "a",
      "explanation": "Sans adresse fixe connue, l'attaquant ne sait plus quelle valeur \u00e9crire pour \u00e9craser la Return Address vers son gadget."
    }
  },
  {
    "id": "ex-mod16-7",
    "type": "drag-drop",
    "question": "Anatomie d'une attaque ROP",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Le programme lit une entr\u00e9e utilisateur (buffer overflow via gets())"
        },
        {
          "id": "2",
          "text": "L'attaquant \u00e9crase les variables, puis le RBP, puis la Return Address sur la pile"
        },
        {
          "id": "3",
          "text": "La Return Address est remplac\u00e9e par l'adresse du 1er Gadget (ex: pop rdi ; ret)"
        },
        {
          "id": "4",
          "text": "Le 'ret' du gadget fait d\u00e9piler la valeur suivante (param\u00e8tre /bin/sh) dans RDI, puis saute au 2\u00e8me gadget"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "D\u00e9roulez la cha\u00eene d'ex\u00e9cution mortelle d'un ROP Chain.",
      "explanation": "C'est l'attaque la plus sophistiqu\u00e9e et la plus courante de la derni\u00e8re d\u00e9cennie."
    }
  },
  {
    "id": "ex-mod16-8",
    "type": "fill-blank",
    "question": "Le Stack Canary",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Le compilateur g\u00e9n\u00e8re une valeur secr\u00e8te (le Canari) entre le buffer et l'adresse de retour.\n; \u00c0 la fin de la fonction, il v\u00e9rifie si le canari a \u00e9t\u00e9 modifi\u00e9 :\nmov rax, [rbp - 8] ; Charger le canari local\n__BLANK__ rax, fs:0x28 ; Comparer avec le canari original de l'OS\njne stack_chk_fail",
      "blanks": [
        {
          "id": "1",
          "answer": "cmp",
          "hint": "Instruction de comparaison."
        }
      ],
      "explanation": "Si un Buffer Overflow se produit, il \u00e9crasera in\u00e9vitablement le Canari avant d'atteindre la Return Address. La fonction s'en rendra compte et plantera intentionnellement."
    }
  },
  {
    "id": "ex-mod16-9",
    "type": "quiz",
    "question": "Que cherche \u00e0 faire un 'Format String Attack' (ex: printf(user_input)) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "\u00c0 faire crasher le terminal de l'utilisateur."
        },
        {
          "id": "b",
          "text": "\u00c0 utiliser `%x` pour divulguer la m\u00e9moire de la pile (leak) et `%n` pour \u00e9crire arbitrairement n'importe o\u00f9 en m\u00e9moire, contournant souvent le Canari et l'ASLR."
        },
        {
          "id": "c",
          "text": "\u00c0 ins\u00e9rer des caract\u00e8res invisibles."
        }
      ],
      "correctId": "b",
      "explanation": "C'est une faille terrifiante permettant lecture ET \u00e9criture absolues depuis une simple erreur de la fonction printf."
    }
  },
  {
    "id": "ex-mod16-10",
    "type": "code-correction",
    "question": "Fix Buffer Overflow C",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "void login() {\n  char buffer[32];\n  gets(buffer);\n}",
      "correctCode": "void login() {\n  char buffer[32];\n  fgets(buffer, 32, stdin);\n}",
      "hints": [
        "La fonction gets() ne v\u00e9rifie JAMAIS la taille de ce qu'elle lit."
      ],
      "explanation": "L'utilisation de gets() est le cas d'\u00e9cole num\u00e9ro 1 des Buffer Overflows. Toujours utiliser des fonctions s\u00fbres born\u00e9es par la taille (fgets, strncpy)."
    }
  },
  {
    "id": "ex-mod17-1",
    "type": "quiz",
    "question": "Quelle est la contrainte principale d'un bootloader BIOS (stage 1) log\u00e9 dans le MBR ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Il ne fait que 512 octets et le CPU d\u00e9marre en mode r\u00e9el 16-bits."
        },
        {
          "id": "b",
          "text": "Il doit \u00eatre \u00e9crit en Java."
        },
        {
          "id": "c",
          "text": "Il n'a pas acc\u00e8s au clavier."
        }
      ],
      "correctId": "a",
      "explanation": "Pour des raisons de r\u00e9trocompatibilit\u00e9 (8086), le processeur de votre PC moderne \u00e0 4000\u20ac d\u00e9marre TOUJOURS comme un CPU des ann\u00e9es 80."
    }
  },
  {
    "id": "ex-mod17-2",
    "type": "quiz",
    "question": "Quels sont les deux octets magiques (Magic Signature) obligatoires \u00e0 la fin des 512 octets du MBR pour que le BIOS accepte de l'ex\u00e9cuter ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "0x55 0xAA"
        },
        {
          "id": "b",
          "text": "0xFF 0xFF"
        },
        {
          "id": "c",
          "text": "0xDE 0xAD"
        }
      ],
      "correctId": "a",
      "explanation": "Le BIOS lit le secteur 0 du disque. S'il ne se termine pas par 0xAA55, il affiche 'No bootable device'."
    }
  },
  {
    "id": "ex-mod17-3",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Mode Prot\u00e9g\u00e9' (Protected Mode) du CPU ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Un mode anti-virus."
        },
        {
          "id": "b",
          "text": "Le mode 32-bits (ou 64-bits) activ\u00e9 par le kernel, permettant la m\u00e9moire virtuelle, les privil\u00e8ges Ring 0/Ring 3, et la protection de la m\u00e9moire (MMU)."
        },
        {
          "id": "c",
          "text": "Le mode o\u00f9 le code est cach\u00e9."
        }
      ],
      "correctId": "b",
      "explanation": "Le passage du Mode R\u00e9el 16-bits au Mode Prot\u00e9g\u00e9 est la t\u00e2che la plus critique d'un bootloader moderne."
    }
  },
  {
    "id": "ex-mod17-4",
    "type": "fill-blank",
    "question": "Le Registre CR0",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Pour basculer du Mode R\u00e9el au Mode Prot\u00e9g\u00e9 32-bits,\n; on met \u00e0 1 le bit PE (Protection Enable) du registre Control Register 0.\nmov eax, cr0\nor eax, 1\nmov __BLANK__, eax",
      "blanks": [
        {
          "id": "1",
          "answer": "cr0",
          "hint": "Le m\u00eame registre."
        }
      ],
      "explanation": "CR0 est le registre syst\u00e8me central (et secret) qui configure l'\u00e9tat du CPU."
    }
  },
  {
    "id": "ex-mod17-5",
    "type": "quiz",
    "question": "Que sont les anneaux de privil\u00e8ge (Rings) x86 ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Des cercles de m\u00e9moire RAM."
        },
        {
          "id": "b",
          "text": "Des niveaux d'acc\u00e8s mat\u00e9riel : Ring 0 pour le Noyau (OS) avec acc\u00e8s total, Ring 3 pour les applications utilisateur (limit\u00e9es)."
        },
        {
          "id": "c",
          "text": "Les diff\u00e9rents c\u0153urs du processeur."
        }
      ],
      "correctId": "b",
      "explanation": "Une application utilisateur (Ring 3) ne peut pas utiliser des instructions dangereuses comme 'cli' ou lire la RAM d'un autre programme."
    }
  },
  {
    "id": "ex-mod17-6",
    "type": "quiz",
    "question": "Quelle est la fonction d'une GDT (Global Descriptor Table) dans le bootloader ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle d\u00e9finit les segments de m\u00e9moire pour l'OS, avec leurs droits d'acc\u00e8s (Code, Donn\u00e9es, Ring 0, Ring 3) requis pour le Mode Prot\u00e9g\u00e9."
        },
        {
          "id": "b",
          "text": "Elle contient les polices d'\u00e9cran."
        },
        {
          "id": "c",
          "text": "Elle g\u00e8re le r\u00e9seau."
        }
      ],
      "correctId": "a",
      "explanation": "Sans GDT charg\u00e9e (via l'instruction 'lgdt'), le processeur refuse de passer en 32/64 bits."
    }
  },
  {
    "id": "ex-mod17-7",
    "type": "drag-drop",
    "question": "La s\u00e9quence de D\u00e9marrage (Boot Process)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Mise sous tension, le CPU ex\u00e9cute le BIOS/UEFI"
        },
        {
          "id": "2",
          "text": "Le BIOS charge les 512 octets du MBR (Bootloader Stage 1) en m\u00e9moire r\u00e9elle"
        },
        {
          "id": "3",
          "text": "Le Stage 1 charge le Stage 2 (ex: GRUB) depuis le disque"
        },
        {
          "id": "4",
          "text": "Le Stage 2 charge le Kernel Linux en m\u00e9moire, configure la GDT et passe en Mode Prot\u00e9g\u00e9 (Ring 0)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "D\u00e9roulez les \u00e9tapes du Big Bang d'un ordinateur.",
      "explanation": "C'est l'escalade des privil\u00e8ges et des capacit\u00e9s depuis le monde archa\u00efque 16-bits jusqu'au monde moderne."
    }
  },
  {
    "id": "ex-mod17-8",
    "type": "fill-blank",
    "question": "Acc\u00e8s VGA direct (Bare Metal)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; En Ring 0 Bare Metal, il n'y a pas de fonction 'printf'.\n; Pour afficher un caract\u00e8re sur l'\u00e9cran en mode texte couleur,\n; on \u00e9crit directement dans la m\u00e9moire vid\u00e9o mapp\u00e9e \u00e0 l'adresse 0xB8000.\nmov byte [__BLANK__], 'A' ; Le caract\u00e8re ASCII\nmov byte [__BLANK__ + 1], 0x0F ; Le style (Blanc brillant)",
      "blanks": [
        {
          "id": "1",
          "answer": "0xB8000",
          "hint": "L'adresse magique de la RAM vid\u00e9o texte."
        },
        {
          "id": "2",
          "answer": "0xB8000",
          "hint": "Le byte suivant."
        }
      ],
      "explanation": "C'est le MMIO pur. Chaque caract\u00e8re \u00e0 l'\u00e9cran prend 2 octets : le code ASCII et les m\u00e9tadonn\u00e9es de couleur."
    }
  },
  {
    "id": "ex-mod17-9",
    "type": "quiz",
    "question": "Pourquoi la cr\u00e9ation d'un OS 64-bits 'Bare Metal' aujourd'hui utilise-t-elle souvent UEFI plut\u00f4t que le BIOS (MBR) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "UEFI d\u00e9marre directement en 32/64 bits, \u00e9vitant le cauchemar du Mode R\u00e9el 16-bits, et fournit des services C/C++ de haut niveau pour le bootloader."
        },
        {
          "id": "b",
          "text": "C'est moins cher."
        },
        {
          "id": "c",
          "text": "L'UEFI est open-source."
        }
      ],
      "correctId": "a",
      "explanation": "L'UEFI a tu\u00e9 le MBR pour la simple et bonne raison qu'il vous permet d'\u00e9crire votre bootloader (Bootmgfw.efi) en langage C moderne sans toucher \u00e0 l'assembleur 16-bits."
    }
  },
  {
    "id": "ex-mod17-10",
    "type": "code-correction",
    "question": "Le Far Jump",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "; Apr\u00e8s avoir activ\u00e9 CR0 pour le Mode Prot\u00e9g\u00e9, il faut vider le pipeline 16-bits.\njmp protected_mode_start",
      "correctCode": "jmp 0x08:protected_mode_start\n; (0x08 est le s\u00e9lecteur de Segment de Code dans la GDT)",
      "hints": [
        "Un saut local (near) garde l'ancien segment 16-bits. Il faut un saut lointain (far jump) avec le s\u00e9lecteur GDT."
      ],
      "explanation": "Ce fameux Far Jump magique est la toute derni\u00e8re \u00e9tape du bootloader pour basculer d\u00e9finitivement le processeur dans sa nouvelle \u00e8re 32/64 bits."
    }
  }
];
