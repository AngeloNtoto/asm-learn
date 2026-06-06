import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData, CodeCorrectionData } from '../../types';

export const basicsExercises: Exercise[] = [
  {
    "id": "ex-mod1-1",
    "type": "quiz",
    "question": "Qu'est-ce que l'Assembleur par rapport au code machine (binaire) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une version textuelle et lisible (Mn\u00e9moniques) des instructions binaires brutes (Opcodes) comprises par le processeur."
        },
        {
          "id": "b",
          "text": "Un langage de haut niveau comme Python."
        },
        {
          "id": "c",
          "text": "Un compilateur C++."
        }
      ],
      "correctId": "a",
      "explanation": "L'Assembleur est simplement une traduction 1 pour 1 du code machine en mots humains."
    }
  },
  {
    "id": "ex-mod1-2",
    "type": "quiz",
    "question": "Quelle est la principale diff\u00e9rence entre la syntaxe Intel et la syntaxe AT&T ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Intel utilise l'ordre (Destination, Source), AT&T utilise (Source, Destination) et ajoute des % devant les registres."
        },
        {
          "id": "b",
          "text": "Intel est plus lente."
        },
        {
          "id": "c",
          "text": "AT&T est pour Windows, Intel pour Linux."
        }
      ],
      "correctId": "a",
      "explanation": "La syntaxe Intel (`mov rax, 5`) est la plus populaire pour l'apprentissage et le reverse engineering."
    }
  },
  {
    "id": "ex-mod1-3",
    "type": "quiz",
    "question": "Quel est le nom du programme qui transforme votre fichier texte .asm en un fichier objet binaire (.o) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "L'Assembleur (ex: NASM, YASM)."
        },
        {
          "id": "b",
          "text": "L'\u00c9diteur de Liens (Linker)."
        },
        {
          "id": "c",
          "text": "Le D\u00e9bogueur (GDB)."
        }
      ],
      "correctId": "a",
      "explanation": "Un programme assembleur (comme NASM) lit les mn\u00e9moniques et crache des opcodes binaires."
    }
  },
  {
    "id": "ex-mod1-4",
    "type": "fill-blank",
    "question": "Structure de base NASM",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "global __BLANK__\n\nsection .text\n__BLANK__:\n  mov rax, 60\n  mov rdi, 0\n  syscall",
      "blanks": [
        {
          "id": "1",
          "answer": "_start",
          "hint": "Point d'entr\u00e9e natif Linux."
        },
        {
          "id": "2",
          "answer": "_start",
          "hint": "Le label de d\u00e9but."
        }
      ],
      "explanation": "La fonction `_start` est le v\u00e9ritable point d'entr\u00e9e natif d'un programme Linux, bien avant que `main` ne soit appel\u00e9."
    }
  },
  {
    "id": "ex-mod1-5",
    "type": "quiz",
    "question": "\u00c0 quoi servent les 'Commentaires' et comment les \u00e9crit-on en NASM ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Ils commencent par un point-virgule (;) et sont ignor\u00e9s par le processeur. Ils sont vitaux en ASM."
        },
        {
          "id": "b",
          "text": "Ils commencent par //."
        },
        {
          "id": "c",
          "text": "Ils sont ex\u00e9cut\u00e9s par le CPU."
        }
      ],
      "correctId": "a",
      "explanation": "Le point-virgule (`;`) est la norme pour l'assembleur x86."
    }
  },
  {
    "id": "ex-mod1-6",
    "type": "quiz",
    "question": "Qu'est-ce qu'une 'Instruction' (Opcode) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une suite de bits (g\u00e9n\u00e9ralement 1 \u00e0 15 octets en x86) qui d\u00e9clenche un comportement mat\u00e9riel pr\u00e9cis grav\u00e9 dans le silicium du CPU."
        },
        {
          "id": "b",
          "text": "Une fonction C++."
        },
        {
          "id": "c",
          "text": "Un bloc de m\u00e9moire RAM."
        }
      ],
      "correctId": "a",
      "explanation": "Le CPU lit ces bits et ouvre/ferme des transistors (portes logiques) pour effectuer l'action."
    }
  },
  {
    "id": "ex-mod1-7",
    "type": "drag-drop",
    "question": "Ordre de compilation Assembleur",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "\u00c9criture du code (main.asm)"
        },
        {
          "id": "2",
          "text": "Assemblage: nasm -f elf64 main.asm -o main.o"
        },
        {
          "id": "3",
          "text": "\u00c9dition de liens: ld main.o -o main"
        },
        {
          "id": "4",
          "text": "Ex\u00e9cution: ./main"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Rangez le processus de la cr\u00e9ation brute \u00e0 l'ex\u00e9cution.",
      "explanation": "NASM cr\u00e9e le fichier Objet (les binaires purs), mais `ld` l'enveloppe dans un format ELF ex\u00e9cutable par Linux."
    }
  },
  {
    "id": "ex-mod1-8",
    "type": "fill-blank",
    "question": "Diff\u00e9rence d'architectures",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Le code binaire compil\u00e9 pour processeur x86 ne fonctionnera JAMAIS sur un processeur __BLANK__ (ex: un Raspberry Pi ou un Mac M1).\n; Leurs jeux d'instructions (ISA) sont totalement incompatibles.",
      "blanks": [
        {
          "id": "1",
          "answer": "ARM",
          "hint": "L'architecture mobile dominante."
        }
      ],
      "explanation": "Chaque famille de processeurs (x86, ARM, RISC-V) parle une langue \u00e9trang\u00e8re. Les opcodes de l'un n'ont aucun sens pour l'autre."
    }
  },
  {
    "id": "ex-mod1-9",
    "type": "quiz",
    "question": "Pourquoi l'Assembleur x86 est-il qualifi\u00e9 de CISC (Complex Instruction Set Computer) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce qu'il poss\u00e8de un nombre immense d'instructions (+1500) dont certaines font des actions tr\u00e8s complexes et varient de 1 \u00e0 15 octets de longueur."
        },
        {
          "id": "b",
          "text": "Parce que c'est difficile \u00e0 apprendre."
        },
        {
          "id": "c",
          "text": "Parce qu'il tourne sur Windows."
        }
      ],
      "correctId": "a",
      "explanation": "\u00c0 l'inverse, ARM est RISC (Reduced Instruction Set Computer) : peu d'instructions, et elles font toutes exactement 4 octets."
    }
  },
  {
    "id": "ex-mod1-10",
    "type": "code-correction",
    "question": "Point d'entr\u00e9e ELF",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "global main\n\nsection .data\n\nsection .text\nmain:\n  mov rax, 60\n  mov rdi, 0\n  syscall",
      "correctCode": "global _start\n\nsection .data\n\nsection .text\n_start:\n  mov rax, 60\n  mov rdi, 0\n  syscall",
      "hints": [
        "L'\u00e9diteur de liens par d\u00e9faut (ld) cherche toujours l'\u00e9tiquette (label) sp\u00e9ciale '_start'."
      ],
      "explanation": "`main` est une convention du langage C (utilis\u00e9e si on compile avec `gcc`). En assembleur pur (li\u00e9 avec `ld`), l'OS cherche `_start`."
    }
  },
  {
    "id": "ex-mod2-1",
    "type": "quiz",
    "question": "Combien de bits contient un registre x86-64 commen\u00e7ant par 'R' (ex: RAX, RDI) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "32 bits"
        },
        {
          "id": "b",
          "text": "64 bits"
        },
        {
          "id": "c",
          "text": "16 bits"
        }
      ],
      "correctId": "b",
      "explanation": "Le pr\u00e9fixe R (Register) indique 64-bits (8 octets). Le pr\u00e9fixe E (Extended) indique 32-bits (ex: EAX)."
    }
  },
  {
    "id": "ex-mod2-2",
    "type": "quiz",
    "question": "Lequel de ces registres est le 'Compteur de Programme' (Program Counter / Instruction Pointer) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "RIP"
        },
        {
          "id": "b",
          "text": "RAX"
        },
        {
          "id": "c",
          "text": "RBP"
        }
      ],
      "correctId": "a",
      "explanation": "RIP pointe toujours vers l'adresse m\u00e9moire de la prochaine instruction \u00e0 ex\u00e9cuter."
    }
  },
  {
    "id": "ex-mod2-3",
    "type": "quiz",
    "question": "Comment d\u00e9placer la valeur 42 dans le registre RAX ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "mov rax, 42"
        },
        {
          "id": "b",
          "text": "put 42, rax"
        },
        {
          "id": "c",
          "text": "copy rax, 42"
        }
      ],
      "correctId": "a",
      "explanation": "L'instruction MOVe en syntaxe Intel met la source (\u00e0 droite) dans la destination (\u00e0 gauche)."
    }
  },
  {
    "id": "ex-mod2-4",
    "type": "fill-blank",
    "question": "Sous-Registres",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; RAX est le registre 64-bits complet.\n; __BLANK__ est la partie basse 32-bits.\n; __BLANK__ est la partie basse 16-bits.\n; AL est la partie tr\u00e8s basse 8-bits.",
      "blanks": [
        {
          "id": "1",
          "answer": "eax",
          "hint": "Extended Accumulator."
        },
        {
          "id": "2",
          "answer": "ax",
          "hint": "Accumulator."
        }
      ],
      "explanation": "Ils se partagent physiquement le m\u00eame espace mat\u00e9riel. Modifier AL modifie RAX."
    }
  },
  {
    "id": "ex-mod2-5",
    "type": "quiz",
    "question": "Que signifient les crochets `[ ]` en syntaxe Intel ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Ils indiquent un d\u00e9r\u00e9f\u00e9rencement (comme l'\u00e9toile * en C). Le processeur doit aller lire/\u00e9crire \u00e0 l'adresse m\u00e9moire (RAM) indiqu\u00e9e entre les crochets."
        },
        {
          "id": "b",
          "text": "Ils cr\u00e9ent un tableau de taille dynamique."
        },
        {
          "id": "c",
          "text": "C'est de la d\u00e9coration."
        }
      ],
      "correctId": "a",
      "explanation": "`mov rax, rbx` copie une valeur. `mov rax, [rbx]` va chercher la valeur en RAM \u00e0 l'adresse RBX."
    }
  },
  {
    "id": "ex-mod2-6",
    "type": "quiz",
    "question": "Quelle est l'utilit\u00e9 des directives `byte ptr`, `word ptr`, `dword ptr`, `qword ptr` ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elles indiquent au processeur la TAILLE des donn\u00e9es \u00e0 lire/\u00e9crire en RAM lorsqu'il y a ambigu\u00eft\u00e9 (ex: `mov byte [rbx], 5`)."
        },
        {
          "id": "b",
          "text": "Elles effacent la m\u00e9moire."
        },
        {
          "id": "c",
          "text": "Elles ne sont utiles qu'en C++."
        }
      ],
      "correctId": "a",
      "explanation": "Si j'\u00e9cris '5' \u00e0 une adresse, le CPU ne sait pas si c'est 5 sur 1 octet (byte) ou 5 sur 8 octets (qword). Il faut le pr\u00e9ciser."
    }
  },
  {
    "id": "ex-mod2-7",
    "type": "drag-drop",
    "question": "Tailles des donn\u00e9es",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "BYTE (1 octet / 8 bits)"
        },
        {
          "id": "2",
          "text": "WORD (2 octets / 16 bits)"
        },
        {
          "id": "3",
          "text": "DWORD (4 octets / 32 bits)"
        },
        {
          "id": "4",
          "text": "QWORD (8 octets / 64 bits)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Rangez les tailles du plus petit au plus grand.",
      "explanation": "C'est le vocabulaire essentiel pour manipuler la RAM. QWORD (Quad-Word) est la taille par d\u00e9faut d'un pointeur 64-bits."
    }
  },
  {
    "id": "ex-mod2-8",
    "type": "fill-blank",
    "question": "Scale-Index-Base (Tableaux)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Adressage complexe : [Base + Index * Scale + Offset]\n; Si RBX pointe sur le d\u00e9but d'un tableau d'entiers 32-bits (4 octets)\n; Lisez le 5\u00e8me \u00e9l\u00e9ment (Index = 4) de la boucle dans RAX.\nmov rcx, 4\nmov eax, dword [rbx + __BLANK__ * __BLANK__]",
      "blanks": [
        {
          "id": "1",
          "answer": "rcx",
          "hint": "Registre index."
        },
        {
          "id": "2",
          "answer": "4",
          "hint": "Scale (Taille d'un int)."
        }
      ],
      "explanation": "L'adressage SIB est con\u00e7u mat\u00e9riellement pour rendre les boucles C++ 'arr[i]' ultra rapides."
    }
  },
  {
    "id": "ex-mod2-9",
    "type": "quiz",
    "question": "Puis-je copier directement le contenu d'une adresse m\u00e9moire vers une autre adresse m\u00e9moire ? (`mov [dest], [src]`)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Non, c'est formellement interdit en x86. Il faut d'abord charger dans un registre temporaire."
        },
        {
          "id": "b",
          "text": "Oui, c'est l'instruction la plus courante."
        },
        {
          "id": "c",
          "text": "Seulement si c'est dans la m\u00eame section."
        }
      ],
      "correctId": "a",
      "explanation": "L'architecture emp\u00eache l'acc\u00e8s double \u00e0 la RAM en un cycle. Solution: `mov rax, [src]` puis `mov [dest], rax`."
    }
  },
  {
    "id": "ex-mod2-10",
    "type": "code-correction",
    "question": "D\u00e9placement M\u00e9moire Interdit",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "mov qword [var2], qword [var1]",
      "correctCode": "mov rax, qword [var1]\nmov qword [var2], rax",
      "hints": [
        "Rappelez-vous: m\u00e9moire vers m\u00e9moire est interdit. Utilisez RAX."
      ],
      "explanation": "Le CPU x86 exige que l'un des deux op\u00e9randes d'un `mov` soit un registre (s'il y a acc\u00e8s m\u00e9moire)."
    }
  },
  {
    "id": "ex-mod3-1",
    "type": "quiz",
    "question": "Que fait l'instruction `add rax, 10` ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle ajoute 10 \u00e0 la valeur de RAX et stocke le r\u00e9sultat dans RAX."
        },
        {
          "id": "b",
          "text": "Elle met la valeur 10 dans RAX."
        },
        {
          "id": "c",
          "text": "Elle v\u00e9rifie si RAX est \u00e9gal \u00e0 10."
        }
      ],
      "correctId": "a",
      "explanation": "ADD ajoute la source \u00e0 la destination (Dest = Dest + Source)."
    }
  },
  {
    "id": "ex-mod3-2",
    "type": "quiz",
    "question": "Quelle instruction est la version rapide et sp\u00e9cialis\u00e9e pour ajouter 1 \u00e0 un registre (x++) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "inc"
        },
        {
          "id": "b",
          "text": "add 1"
        },
        {
          "id": "c",
          "text": "++"
        }
      ],
      "correctId": "a",
      "explanation": "L'instruction `inc rax` est l'abr\u00e9viation de InCr\u00e9menter (+1). L'inverse est `dec` (-1)."
    }
  },
  {
    "id": "ex-mod3-3",
    "type": "quiz",
    "question": "Quel r\u00e9sultat donne `xor eax, eax` (un eXclusive OR d'un registre contre lui-m\u00eame) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le registre est rempli de z\u00e9ros (0)."
        },
        {
          "id": "b",
          "text": "Le registre est rempli de 1."
        },
        {
          "id": "c",
          "text": "Le programme plante."
        }
      ],
      "correctId": "a",
      "explanation": "Le XOR donne 1 seulement si les bits sont diff\u00e9rents. Puisque le registre est compar\u00e9 \u00e0 lui-m\u00eame, tous les bits sont identiques, ce qui donne z\u00e9ro. C'est l'idiome x86 pour faire `mov eax, 0` en plus court."
    }
  },
  {
    "id": "ex-mod3-4",
    "type": "fill-blank",
    "question": "Bitwise AND",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Pour v\u00e9rifier si un nombre dans RAX est pair ou impair,\n; on peut isoler son dernier bit (le bit 0) avec un ET binaire :\n__BLANK__ rax, 1",
      "blanks": [
        {
          "id": "1",
          "answer": "and",
          "hint": "L'op\u00e9rateur AND."
        }
      ],
      "explanation": "`and rax, 1` forcera tous les bits sup\u00e9rieurs \u00e0 0, et gardera le dernier bit tel quel. (1 = Impair, 0 = Pair)."
    }
  },
  {
    "id": "ex-mod3-5",
    "type": "quiz",
    "question": "Que se passe-t-il si vous tentez d'additionner deux nombres et que le r\u00e9sultat d\u00e9passe la capacit\u00e9 de 64 bits (ex: RAX = 0xFFFFF... + 1) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le registre RAX repasse \u00e0 0 (Integer Overflow) ET le processeur met le Carry Flag (CF) \u00e0 1 pour vous pr\u00e9venir."
        },
        {
          "id": "b",
          "text": "Le programme crashe imm\u00e9diatement avec une erreur Floating Point."
        },
        {
          "id": "c",
          "text": "Le processeur fusionne RAX et RBX pour avoir 128 bits."
        }
      ],
      "correctId": "a",
      "explanation": "Contrairement \u00e0 certains langages qui crashent ou l\u00e8vent une exception, l'ASM 'wrap-around' silencieusement mais l\u00e8ve un drapeau."
    }
  },
  {
    "id": "ex-mod3-6",
    "type": "quiz",
    "question": "L'instruction `mul rbx` multiplie RAX par RBX. O\u00f9 est stock\u00e9 le r\u00e9sultat (qui pourrait faire 128-bits) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "La moiti\u00e9 haute va dans RDX, la moiti\u00e9 basse va dans RAX (RDX:RAX)."
        },
        {
          "id": "b",
          "text": "Le r\u00e9sultat va uniquement dans RAX, on perd la moiti\u00e9 haute."
        },
        {
          "id": "c",
          "text": "Dans RCX."
        }
      ],
      "correctId": "a",
      "explanation": "La multiplication de deux 64-bits donne 128-bits. Le CPU force toujours le duo RDX:RAX."
    }
  },
  {
    "id": "ex-mod3-7",
    "type": "drag-drop",
    "question": "Table de V\u00e9rit\u00e9 (1 bit)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "0 AND 0 = 0, 1 AND 1 = 1, 1 AND 0 = 0"
        },
        {
          "id": "2",
          "text": "0 OR 0 = 0, 1 OR 1 = 1, 1 OR 0 = 1"
        },
        {
          "id": "3",
          "text": "0 XOR 0 = 0, 1 XOR 1 = 0, 1 XOR 0 = 1"
        },
        {
          "id": "4",
          "text": "NOT 1 = 0, NOT 0 = 1"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Lisez de haut en bas les op\u00e9rateurs logiques (AND, OR, XOR, NOT).",
      "explanation": "Le XOR (eXclusive OR) est le plus utile en crypto : il agit comme un bouton d'inversion contr\u00f4l\u00e9."
    }
  },
  {
    "id": "ex-mod3-8",
    "type": "fill-blank",
    "question": "Division non-sign\u00e9e",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Pour diviser RAX par RBX (div rbx)\n; Il faut TOUJOURS nettoyer le registre RDX avant, sinon Floating Point Exception !\n__BLANK__ rdx, rdx\ndiv rbx",
      "blanks": [
        {
          "id": "1",
          "answer": "xor",
          "hint": "L'idiome x86 pour mettre \u00e0 z\u00e9ro."
        }
      ],
      "explanation": "L'instruction `div` prend l'entier de 128-bits RDX:RAX et le divise. Si RDX n'est pas z\u00e9ro, c'est comme si vous divisiez un nombre gigantesque, ce qui d\u00e9passe la capacit\u00e9 du quotient."
    }
  },
  {
    "id": "ex-mod3-9",
    "type": "quiz",
    "question": "\u00c0 quoi sert l'instruction `shl eax, 2` (Shift Left) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle d\u00e9cale tous les bits de EAX vers la gauche de 2 positions, ce qui \u00e9quivaut \u00e0 une multiplication ultra-rapide par 4 (2^2)."
        },
        {
          "id": "b",
          "text": "Elle ajoute 2."
        },
        {
          "id": "c",
          "text": "Elle efface EAX."
        }
      ],
      "correctId": "a",
      "explanation": "C'est le moyen le plus rapide de multiplier ou diviser par une puissance de deux."
    }
  },
  {
    "id": "ex-mod3-10",
    "type": "code-correction",
    "question": "La Division qui Crash",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "; On veut diviser RAX par 5\nmov rax, 20\nmov rbx, 5\ndiv rbx",
      "correctCode": "mov rax, 20\nmov rbx, 5\nxor rdx, rdx ; NETTOYAGE VITAL !\ndiv rbx",
      "hints": [
        "Le CPU va planter si RDX contient des d\u00e9tritus."
      ],
      "explanation": "Rappelez-vous en tout le temps : `div` utilise RDX. Toujours vider RDX."
    }
  },
  {
    "id": "ex-mod4-1",
    "type": "quiz",
    "question": "Quelle instruction met \u00e0 jour les Drapeaux d'\u00e9tat (EFLAGS) en soustrayant virtuellement deux valeurs, SANS modifier les registres ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "cmp (Compare)"
        },
        {
          "id": "b",
          "text": "test"
        },
        {
          "id": "c",
          "text": "sub (Subtract)"
        }
      ],
      "correctId": "a",
      "explanation": "`cmp rax, rbx` fait `rax - rbx` pour mettre \u00e0 jour les flags (Zero, Sign, etc), mais le r\u00e9sultat de la soustraction est jet\u00e9."
    }
  },
  {
    "id": "ex-mod4-2",
    "type": "quiz",
    "question": "Apr\u00e8s une instruction `cmp rax, rbx`, quelle instruction utiliser pour sauter (Jump) si RAX est \u00c9GAL \u00e0 RBX ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "je (Jump if Equal)"
        },
        {
          "id": "b",
          "text": "jmp (Jump unconditionnal)"
        },
        {
          "id": "c",
          "text": "jne (Jump if Not Equal)"
        }
      ],
      "correctId": "a",
      "explanation": "Le saut conditionnel v\u00e9rifie l'\u00e9tat du Zero Flag (ZF=1 si la soustraction faisait 0, donc \u00e9galit\u00e9)."
    }
  },
  {
    "id": "ex-mod4-3",
    "type": "quiz",
    "question": "Comment faire une boucle infinie pure en Assembleur ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "boucle: jmp boucle"
        },
        {
          "id": "b",
          "text": "while(1)"
        },
        {
          "id": "c",
          "text": "loop boucle"
        }
      ],
      "correctId": "a",
      "explanation": "Cr\u00e9er un label et utiliser un saut inconditionnel (`jmp`) vers lui-m\u00eame bloque ind\u00e9finiment le processeur (comme un while(true))."
    }
  },
  {
    "id": "ex-mod4-4",
    "type": "fill-blank",
    "question": "La Boucle For manuelle",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "mov rcx, 10 ; Compteur \u00e0 10\nboucle:\n  ; ... action ...\n  __BLANK__ rcx      ; -1\n  cmp rcx, 0\n  __BLANK__ boucle   ; Saute si Non \u00c9gal (Not Equal)",
      "blanks": [
        {
          "id": "1",
          "answer": "dec",
          "hint": "D\u00e9cr\u00e9menter."
        },
        {
          "id": "2",
          "answer": "jne",
          "hint": "Jump Not Equal."
        }
      ],
      "explanation": "C'est l'impl\u00e9mentation standard d'une boucle : on diminue le compteur et on boucle tant qu'il n'a pas touch\u00e9 0."
    }
  },
  {
    "id": "ex-mod4-5",
    "type": "quiz",
    "question": "Quel est le but de l'instruction `test eax, eax` juste avant un `je` ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "V\u00e9rifier si EAX vaut 0. C'est plus petit et plus rapide que 'cmp eax, 0'."
        },
        {
          "id": "b",
          "text": "V\u00e9rifier si EAX contient une erreur."
        },
        {
          "id": "c",
          "text": "Tester la RAM."
        }
      ],
      "correctId": "a",
      "explanation": "`test` fait un AND logique au lieu d'une soustraction. `test eax, eax` met le Zero Flag \u00e0 1 uniquement si EAX vaut 0."
    }
  },
  {
    "id": "ex-mod4-6",
    "type": "quiz",
    "question": "Diff\u00e9rence cruciale : Pourquoi y a-t-il des sauts Sign\u00e9s (jg/jl) et des sauts Non-Sign\u00e9s (ja/jb) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce qu'au niveau binaire, -1 (0xFFFF...) est virtuellement plus grand que 5 (0x0005) si on l'interpr\u00e8te comme Non-Sign\u00e9 ! L'instruction de saut dit au processeur comment interpr\u00e9ter la comparaison."
        },
        {
          "id": "b",
          "text": "C'est juste des synonymes."
        },
        {
          "id": "c",
          "text": "ja est pour les sauts longs."
        }
      ],
      "correctId": "a",
      "explanation": "Si j'ai -1 (sign\u00e9) et 5, -1 est PLUS PETIT (`jl`). Mais si ce sont des non-sign\u00e9s (0xFF... et 0x05), le 1er est PLUS GRAND (`ja`)."
    }
  },
  {
    "id": "ex-mod4-7",
    "type": "drag-drop",
    "question": "Associer les Sauts (Jump)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "je (\u00c9gal / Zero Flag = 1)"
        },
        {
          "id": "2",
          "text": "jne (Diff\u00e9rent / Zero Flag = 0)"
        },
        {
          "id": "3",
          "text": "jg (Plus Grand / Sign\u00e9)"
        },
        {
          "id": "4",
          "text": "ja (Plus Grand / Non-Sign\u00e9)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Gardez cet ordre. Le but est de m\u00e9moriser les abr\u00e9viations (Equal, Not Equal, Greater, Above).",
      "explanation": "Above/Below = Non-Sign\u00e9. Greater/Less = Sign\u00e9."
    }
  },
  {
    "id": "ex-mod4-8",
    "type": "fill-blank",
    "question": "L'instruction LOOP",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Historiquement, l'instruction 'loop' d\u00e9cr\u00e9mente automatiquement RCX et saute si RCX != 0\nmov __BLANK__, 5\nmon_label:\n  ; ... action\n  __BLANK__ mon_label",
      "blanks": [
        {
          "id": "1",
          "answer": "rcx",
          "hint": "Le registre Compteur obligatoire."
        },
        {
          "id": "2",
          "answer": "loop",
          "hint": "L'instruction compacte de boucle."
        }
      ],
      "explanation": "Aujourd'hui, les compilateurs \u00e9vitent 'loop' car la combinaison dec+jne est souvent plus rapide (optimisation micro-code)."
    }
  },
  {
    "id": "ex-mod4-9",
    "type": "quiz",
    "question": "Qu'est-ce que les Flags (Drapeaux / EFLAGS) concr\u00e8tement ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Un registre sp\u00e9cial (RFLAGS) o\u00f9 chaque bit repr\u00e9sente un \u00e9tat (ex: le bit 6 est le Zero Flag, le bit 11 est l'Overflow Flag)."
        },
        {
          "id": "b",
          "text": "Des variables globales en RAM."
        },
        {
          "id": "c",
          "text": "Un syst\u00e8me d'exploitation."
        }
      ],
      "correctId": "a",
      "explanation": "L'ALU modifie ces bits apr\u00e8s chaque calcul, et les instructions de saut (ex: 'je') ne font que v\u00e9rifier si un bit pr\u00e9cis est \u00e0 1."
    }
  },
  {
    "id": "ex-mod4-10",
    "type": "code-correction",
    "question": "Saut Involontaire",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "cmp rax, 10\nadd rbx, 5  ; Un calcul s'intercale !\nje rax_est_egal_a_10",
      "correctCode": "cmp rax, 10\nje rax_est_egal_a_10\nadd rbx, 5",
      "hints": [
        "L'instruction ADD modifie aussi les flags !"
      ],
      "explanation": "Les drapeaux (Flags) sont modifi\u00e9s par presque toutes les op\u00e9rations arithm\u00e9tiques. Il faut faire le saut (je) IMM\u00c9DIATEMENT apr\u00e8s la comparaison (cmp)."
    }
  },
  {
    "id": "ex-mod5-1",
    "type": "quiz",
    "question": "Qu'est-ce que la Pile (Stack) dans un programme ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une zone de m\u00e9moire (RAM) utilis\u00e9e pour stocker temporairement des variables locales et g\u00e9rer les appels de fonctions (Adresses de retour)."
        },
        {
          "id": "b",
          "text": "Le disque dur."
        },
        {
          "id": "c",
          "text": "Une file d'attente r\u00e9seau."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'outil de stockage dynamique num\u00e9ro 1 en assembleur."
    }
  },
  {
    "id": "ex-mod5-2",
    "type": "quiz",
    "question": "Quelle particularit\u00e9 topologique la pile x86 poss\u00e8de-t-elle ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle grandit 'vers le bas' : pousser une valeur dessus diminue l'adresse m\u00e9moire (RSP)."
        },
        {
          "id": "b",
          "text": "Elle grandit vers le haut."
        },
        {
          "id": "c",
          "text": "Elle est infinie."
        }
      ],
      "correctId": "a",
      "explanation": "Historiquement, la pile commen\u00e7ait \u00e0 la fin de la RAM et le Tas (Heap) au d\u00e9but, grandissant l'un vers l'autre."
    }
  },
  {
    "id": "ex-mod5-3",
    "type": "quiz",
    "question": "Que fait l'instruction `push rax` concr\u00e8tement ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle soustrait 8 \u00e0 RSP (descend le pointeur), puis \u00e9crit la valeur de RAX \u00e0 la nouvelle adresse point\u00e9e par RSP."
        },
        {
          "id": "b",
          "text": "Elle ajoute 8 \u00e0 RSP."
        },
        {
          "id": "c",
          "text": "Elle met RAX dans la pile."
        }
      ],
      "correctId": "a",
      "explanation": "RSP (Stack Pointer) doit toujours pointer sur le SOMMET (la donn\u00e9e la plus r\u00e9cente) de la pile."
    }
  },
  {
    "id": "ex-mod5-4",
    "type": "fill-blank",
    "question": "Pop",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; J'ai sauv\u00e9 la valeur de rdi sur la pile.\npush rdi\n; ... je modifie rdi pour un calcul\n; Pour r\u00e9cup\u00e9rer l'ancienne valeur :\n__BLANK__ __BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "pop",
          "hint": "L'inverse de push."
        },
        {
          "id": "2",
          "answer": "rdi",
          "hint": "La destination."
        }
      ],
      "explanation": "`pop rdi` lit la valeur point\u00e9e par RSP dans RDI, puis AJOUTE 8 \u00e0 RSP."
    }
  },
  {
    "id": "ex-mod5-5",
    "type": "quiz",
    "question": "Que fait l'instruction `call ma_fonction` ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle pousse (push) l'adresse de l'instruction SUIVANTE (l'adresse de retour RIP) sur la pile, puis saute (jmp) au label ma_fonction."
        },
        {
          "id": "b",
          "text": "Elle saute simplement au label."
        },
        {
          "id": "c",
          "text": "Elle ferme le programme."
        }
      ],
      "correctId": "a",
      "explanation": "C'est vital : en sauvegardant le pointeur d'instruction (RIP) sur la pile, on sait par o\u00f9 revenir \u00e0 la fin de la fonction."
    }
  },
  {
    "id": "ex-mod5-6",
    "type": "quiz",
    "question": "Comment l'instruction `ret` (Return) conclut-elle la fonction ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Elle d\u00e9pile (pop) la valeur au sommet de la pile et l'injecte dans RIP (Instruction Pointer), reprenant ainsi l'ex\u00e9cution l\u00e0 o\u00f9 on l'avait quitt\u00e9e."
        },
        {
          "id": "b",
          "text": "Elle retourne RAX."
        },
        {
          "id": "c",
          "text": "Elle fait un saut au d\u00e9but."
        }
      ],
      "correctId": "a",
      "explanation": "C'est pourquoi il est MORTEL de modifier RSP ou de laisser des 'push' sans 'pop' dans une fonction. `ret` d\u00e9pilera la mauvaise valeur et sautera dans le n\u00e9ant (Segfault)."
    }
  },
  {
    "id": "ex-mod5-7",
    "type": "drag-drop",
    "question": "Le Prologue de Fonction Standard",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "push rbp (Sauvegarder l'ancien Base Pointer de l'appelant)"
        },
        {
          "id": "2",
          "text": "mov rbp, rsp (Figer le Base Pointer actuel de notre nouvelle Frame)"
        },
        {
          "id": "3",
          "text": "sub rsp, 32 (Allouer de l'espace sur la pile pour nos variables locales)"
        },
        {
          "id": "4",
          "text": "mov [rbp - 8], rdi (Sauvegarder les param\u00e8tres dans notre Frame)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Recr\u00e9ez l'ouverture classique (Prologue) de 99% des fonctions C compil\u00e9es.",
      "explanation": "RBP sert d'ancre. Toutes les variables locales seront acc\u00e9d\u00e9es via `[rbp - N]`."
    }
  },
  {
    "id": "ex-mod5-8",
    "type": "fill-blank",
    "question": "L'\u00c9pilogue",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; \u00c0 la fin de la fonction, on doit d\u00e9truire notre Stack Frame pour revenir proprement.\n; \u00c9tape 1: Restaurer RSP \u00e0 la base de la frame (supprime les variables locales)\nmov rsp, __BLANK__\n; \u00c9tape 2: Restaurer l'ancien Base Pointer\n__BLANK__ rbp\nret",
      "blanks": [
        {
          "id": "1",
          "answer": "rbp",
          "hint": "L'ancre."
        },
        {
          "id": "2",
          "answer": "pop",
          "hint": "D\u00e9piler l'ancien RBP."
        }
      ],
      "explanation": "L'instruction `leave` fait exactement ces deux op\u00e9rations (mov rsp, rbp ; pop rbp) en une seule fois."
    }
  },
  {
    "id": "ex-mod5-9",
    "type": "quiz",
    "question": "Quel est le risque de la R\u00e9cursion Infinie en Assembleur ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Un Stack Overflow (D\u00e9bordement de pile) : la pile grandit (vers le bas) \u00e0 chaque 'call' jusqu'\u00e0 heurter la fin de la RAM autoris\u00e9e, et crashe."
        },
        {
          "id": "b",
          "text": "Le CPU surchauffe."
        },
        {
          "id": "c",
          "text": "Aucun risque."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'origine du nom du fameux site StackOverflow. Chaque appel ajoute au moins 8 octets (l'adresse de retour)."
    }
  },
  {
    "id": "ex-mod5-10",
    "type": "code-correction",
    "question": "Le Ret Mortel",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "ma_fonction:\n  push rax\n  push rbx\n  ; ... calculs ...\n  pop rbx\n  ret",
      "correctCode": "ma_fonction:\n  push rax\n  push rbx\n  ; ... calculs ...\n  pop rbx\n  pop rax ; OUBLI MORTEL CORRIG\u00c9\n  ret",
      "hints": [
        "Pour chaque push, il FAUT un pop avant le ret."
      ],
      "explanation": "Sans le `pop rax`, le sommet de la pile est occup\u00e9 par la valeur de RAX, et non par l'adresse de retour. `ret` va donc lire la valeur de RAX et sauter b\u00eatement \u00e0 cette adresse !"
    }
  }
];
