import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData, CodeCorrectionData } from '../../types';

export const demystificationExercises: Exercise[] = [
  {
    "id": "ex-mod23-1",
    "type": "quiz",
    "question": "Combien d'octets prend un int standard en C++ (sur 32/64 bits) par rapport \u00e0 un entier Python ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "4 octets en C++ contre ~28 octets en Python"
        },
        {
          "id": "b",
          "text": "8 octets pour les deux"
        },
        {
          "id": "c",
          "text": "Python ne prend pas de RAM"
        }
      ],
      "correctId": "a",
      "explanation": "Un int C++ est brut. Un int Python est un objet (PyLongObject)."
    }
  },
  {
    "id": "ex-mod23-2",
    "type": "quiz",
    "question": "Les entiers en Python sont immuables. Qu'est-ce que cela signifie ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "On ne peut pas les additionner."
        },
        {
          "id": "b",
          "text": "Chaque modification cr\u00e9e un nouvel objet en m\u00e9moire."
        },
        {
          "id": "c",
          "text": "Ils ne peuvent pas \u00eatre n\u00e9gatifs."
        }
      ],
      "correctId": "b",
      "explanation": "Python alloue un nouveau PyObject \u00e0 chaque calcul, ce qui sollicite le tas (Heap)."
    }
  },
  {
    "id": "ex-mod23-3",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Garbage Collector' (GC) fait concr\u00e8tement en Python ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Il nettoie le cache du CPU."
        },
        {
          "id": "b",
          "text": "Il d\u00e9truit les objets du Tas dont le 'Reference Count' tombe \u00e0 z\u00e9ro."
        },
        {
          "id": "c",
          "text": "Il compile le code."
        }
      ],
      "correctId": "b",
      "explanation": "Le GC de Python (CPython) fonctionne principalement par comptage de r\u00e9f\u00e9rences."
    }
  },
  {
    "id": "ex-mod23-4",
    "type": "fill-blank",
    "question": "L'en-t\u00eate d'un objet Python",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "struct PyObject {\n  Py_ssize_t __BLANK__; // Compteur\n  struct _typeobject *__BLANK__; // Pointeur type\n};",
      "blanks": [
        {
          "id": "1",
          "answer": "ob_refcnt",
          "hint": "Reference Count."
        },
        {
          "id": "2",
          "answer": "ob_type",
          "hint": "Type."
        }
      ],
      "explanation": "C'est l'en-t\u00eate de tout objet Python (16 octets)."
    }
  },
  {
    "id": "ex-mod23-5",
    "type": "quiz",
    "question": "Dans un std::vector C++, o\u00f9 se trouvent les \u00e9l\u00e9ments ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "R\u00e9partis al\u00e9atoirement."
        },
        {
          "id": "b",
          "text": "Dans un bloc de m\u00e9moire contigu sur le Tas."
        },
        {
          "id": "c",
          "text": "Dans le cache L3 uniquement."
        }
      ],
      "correctId": "b",
      "explanation": "La contigu\u00eft\u00e9 est ce qui rend le vector si rapide."
    }
  },
  {
    "id": "ex-mod23-6",
    "type": "quiz",
    "question": "Pourquoi la contigu\u00eft\u00e9 m\u00e9moire emp\u00eache-t-elle le 'Cache Miss' ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce que le CPU charge la m\u00e9moire par 'lignes de cache' (ex: 64 octets d'un coup)."
        },
        {
          "id": "b",
          "text": "Parce que le CPU d\u00e9sactive le cache."
        },
        {
          "id": "c",
          "text": "Parce que la RAM tourne plus vite."
        }
      ],
      "correctId": "a",
      "explanation": "Charger un \u00e9l\u00e9ment charge aussi les suivants dans le L1."
    }
  },
  {
    "id": "ex-mod23-7",
    "type": "drag-drop",
    "question": "Ordonnez ces acc\u00e8s m\u00e9moire du plus rapide au plus lent.",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Registre (RAX)"
        },
        {
          "id": "2",
          "text": "Cache L1"
        },
        {
          "id": "3",
          "text": "RAM (Tas)"
        },
        {
          "id": "4",
          "text": "SSD (Swap)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Placez le composant le plus rapide en haut.",
      "explanation": "Les registres prennent 1 cycle, le L1 ~4 cycles, la RAM ~300 cycles."
    }
  },
  {
    "id": "ex-mod23-8",
    "type": "fill-blank",
    "question": "Acc\u00e8s Scale-Index-Base (SIB)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "mov eax, [rbx + __BLANK__ * __BLANK__]",
      "blanks": [
        {
          "id": "1",
          "answer": "rcx",
          "hint": "Index."
        },
        {
          "id": "2",
          "answer": "4",
          "hint": "Taille d'un entier."
        }
      ],
      "explanation": "Le SIB permet de calculer l'adresse en hardware."
    }
  },
  {
    "id": "ex-mod23-9",
    "type": "quiz",
    "question": "Pourquoi une liste Python est-elle un tableau de pointeurs et non de valeurs ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Pour \u00e9conomiser de la RAM."
        },
        {
          "id": "b",
          "text": "Pour permettre de stocker des types diff\u00e9rents."
        },
        {
          "id": "c",
          "text": "Pour \u00e9viter les pointeurs."
        }
      ],
      "correctId": "b",
      "explanation": "La liste ne stocke que des adresses (8 octets chacune), causant un double d\u00e9r\u00e9f\u00e9rencement."
    }
  },
  {
    "id": "ex-mod23-10",
    "type": "code-correction",
    "question": "Corrigez l'erreur de pointeur C++",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "int* ptr = &valeur;\nint res = ptr;",
      "correctCode": "int* ptr = &valeur;\nint res = *ptr;",
      "hints": [
        "Il faut d\u00e9r\u00e9f\u00e9rencer le pointeur."
      ],
      "explanation": "L'\u00e9toile (*) indique qu'on veut la valeur point\u00e9e (comme des crochets [] en ASM)."
    }
  },
  {
    "id": "ex-mod24-1",
    "type": "quiz",
    "question": "Que signifie le 'Dynamic Dispatch' ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "L'appel de fonction est d\u00e9cid\u00e9 \u00e0 l'ex\u00e9cution (runtime)."
        },
        {
          "id": "b",
          "text": "Le compilateur supprime la fonction."
        },
        {
          "id": "c",
          "text": "L'appel est r\u00e9solu \u00e0 la compilation."
        }
      ],
      "correctId": "a",
      "explanation": "En Python, on ne sait pas quelle m\u00e9thode __eq__ appeler avant de v\u00e9rifier le type."
    }
  },
  {
    "id": "ex-mod24-2",
    "type": "quiz",
    "question": "Comment le compilateur C++ traduit-il une simple condition (a == b) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "En cherchant une m\u00e9thode __eq__."
        },
        {
          "id": "b",
          "text": "Par une instruction 'cmp' suivie d'un saut ('je')."
        },
        {
          "id": "c",
          "text": "Il d\u00e9l\u00e8gue \u00e7a \u00e0 l'OS."
        }
      ],
      "correctId": "b",
      "explanation": "C++ produit le code machine le plus direct."
    }
  },
  {
    "id": "ex-mod24-3",
    "type": "quiz",
    "question": "Qu'est-ce qu'une Frame (Cadre de pile) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une image vid\u00e9o."
        },
        {
          "id": "b",
          "text": "Une zone sur la pile contenant les variables locales et l'adresse de retour."
        },
        {
          "id": "c",
          "text": "Un bloc sur le tas."
        }
      ],
      "correctId": "b",
      "explanation": "\u00c0 chaque appel, une Stack Frame est cr\u00e9\u00e9e."
    }
  },
  {
    "id": "ex-mod24-4",
    "type": "fill-blank",
    "question": "Dynamic Dispatch",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "call PyObject_RichCompare\n; Python va chercher la fonction __BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "__eq__",
          "hint": "M\u00e9thode d'\u00e9galit\u00e9."
        }
      ],
      "explanation": "L\u00e0 o\u00f9 C++ fait un 'cmp', Python fait une recherche complexe."
    }
  },
  {
    "id": "ex-mod24-5",
    "type": "quiz",
    "question": "Comment fonctionnent les G\u00e9n\u00e9rateurs (yield) ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Ils sauvegardent l'\u00e9tat (Stack Frame) sur le Tas pour y revenir."
        },
        {
          "id": "b",
          "text": "Ils bloquent le CPU."
        },
        {
          "id": "c",
          "text": "Ils compilent en temps r\u00e9el."
        }
      ],
      "correctId": "a",
      "explanation": "Au lieu de d\u00e9truire la frame, elle est suspendue."
    }
  },
  {
    "id": "ex-mod24-6",
    "type": "quiz",
    "question": "En C++20, comment les Coroutines (co_yield) g\u00e8rent-elles leur pile ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "C++ utilise une 'Stackless Coroutine', allouant l'\u00e9tat sur le tas."
        },
        {
          "id": "b",
          "text": "Elles utilisent des Threads de l'OS."
        },
        {
          "id": "c",
          "text": "Elles copient la RAM."
        }
      ],
      "correctId": "a",
      "explanation": "Pour ne pas bloquer de Threads, C++ alloue juste ce qu'il faut."
    }
  },
  {
    "id": "ex-mod24-7",
    "type": "fill-blank",
    "question": "L'inlining",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Au lieu d'un appel co\u00fbteux :\n; Le compilateur fait du __BLANK__ en copiant les instructions.",
      "blanks": [
        {
          "id": "1",
          "answer": "inlining",
          "hint": "Int\u00e9gration."
        }
      ],
      "explanation": "L'inlining \u00e9vite la cr\u00e9ation de Stack Frame."
    }
  },
  {
    "id": "ex-mod24-8",
    "type": "drag-drop",
    "question": "Ordre de r\u00e9solution d'une m\u00e9thode virtuelle en C++.",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Lire le pointeur vptr"
        },
        {
          "id": "2",
          "text": "Lire l'adresse dans la VTable"
        },
        {
          "id": "3",
          "text": "Sauter (call) \u00e0 cette adresse"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3"
      ],
      "instruction": "Mettez les \u00e9tapes de la r\u00e9solution de la VTable dans le bon ordre.",
      "explanation": "Ce double d\u00e9r\u00e9f\u00e9rencement prend ~3 cycles."
    }
  },
  {
    "id": "ex-mod24-9",
    "type": "quiz",
    "question": "Pourquoi le Branch Predictor aime le C++ plus que Python ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce que Python utilise des sauts indirects massifs (switch g\u00e9ant) difficiles \u00e0 deviner."
        },
        {
          "id": "b",
          "text": "Parce que C++ est \u00e9crit en anglais."
        },
        {
          "id": "c",
          "text": "Parce que Python ne saute pas."
        }
      ],
      "correctId": "a",
      "explanation": "L'interpr\u00e9teur Python vide souvent le pipeline du CPU \u00e0 cause de mauvaises pr\u00e9dictions."
    }
  },
  {
    "id": "ex-mod24-10",
    "type": "code-correction",
    "question": "Appel indirect",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "mov rax, [vtable_ptr]\njmp [rax]",
      "correctCode": "mov rax, [vtable_ptr]\ncall [rax]",
      "hints": [
        "On veut pouvoir revenir de la m\u00e9thode !"
      ],
      "explanation": "Une m\u00e9thode virtuelle n\u00e9cessite un 'call'."
    }
  },
  {
    "id": "ex-mod25-1",
    "type": "quiz",
    "question": "Qu'est-ce qu'un Context Switch (changement de contexte) ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le passage du User-Space au Kernel-Space pour ex\u00e9cuter un syscall."
        },
        {
          "id": "b",
          "text": "Changer de variable en C++."
        },
        {
          "id": "c",
          "text": "Appuyer sur Alt+Tab."
        }
      ],
      "correctId": "a",
      "explanation": "Le CPU doit sauvegarder tous ses registres et changer ses droits d'acc\u00e8s. C'est tr\u00e8s lent (milliers de cycles)."
    }
  },
  {
    "id": "ex-mod25-2",
    "type": "quiz",
    "question": "Quelle classe C++ standard permet de lire un fichier de fa\u00e7on bufferis\u00e9e ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "std::ifstream"
        },
        {
          "id": "b",
          "text": "syscall_read"
        },
        {
          "id": "c",
          "text": "sys_open"
        }
      ],
      "correctId": "a",
      "explanation": "Les flux iostream (comme ifstream) utilisent un buffer m\u00e9moire interne pour limiter les appels syst\u00e8me."
    }
  },
  {
    "id": "ex-mod25-3",
    "type": "quiz",
    "question": "Pourquoi print() en Python n'appelle-t-il pas l'OS pour chaque caract\u00e8re 'H', 'e', 'l', 'l', 'o' ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Il n'en a pas le droit."
        },
        {
          "id": "b",
          "text": "Il \u00e9crit dans un Buffer en RAM, puis fait un seul gros syscall (sys_write) quand il est plein ou \u00e0 la fin."
        },
        {
          "id": "c",
          "text": "Il l'affiche par magie."
        }
      ],
      "correctId": "b",
      "explanation": "Le buffering est la cl\u00e9 des performances I/O."
    }
  },
  {
    "id": "ex-mod25-4",
    "type": "fill-blank",
    "question": "Syscall Write",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "mov rax, 1 ; syscall write\nmov rdi, 1 ; stdout\nmov rsi, adresse_buffer\nmov rdx, __BLANK__ ; taille\n__BLANK__",
      "blanks": [
        {
          "id": "1",
          "answer": "100",
          "hint": "Par exemple, \u00e9crire 100 octets."
        },
        {
          "id": "2",
          "answer": "syscall",
          "hint": "Interrompre l'ex\u00e9cution pour passer au noyau."
        }
      ],
      "explanation": "L'appel syst\u00e8me attend la taille du buffer dans RDX."
    }
  },
  {
    "id": "ex-mod25-5",
    "type": "quiz",
    "question": "Que signifie RAII en C++ ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Resource Acquisition Is Initialization."
        },
        {
          "id": "b",
          "text": "Random Access Internal Interface."
        },
        {
          "id": "c",
          "text": "Read And Ignore Input."
        }
      ],
      "correctId": "a",
      "explanation": "C'est le paradigme o\u00f9 l'obtention d'une ressource (fichier, m\u00e9moire) se fait dans le constructeur, et la lib\u00e9ration dans le destructeur de fa\u00e7on garantie."
    }
  },
  {
    "id": "ex-mod25-6",
    "type": "quiz",
    "question": "Comment le mot-cl\u00e9 'with' de Python g\u00e8re-t-il les fichiers sous le capot ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Il enveloppe le code dans un bloc try...finally et appelle __exit__ pour fermer le fichier m\u00eame si une exception survient."
        },
        {
          "id": "b",
          "text": "Il appelle un syscall sp\u00e9cial 'with'."
        },
        {
          "id": "c",
          "text": "Il utilise le RAII du C++."
        }
      ],
      "correctId": "a",
      "explanation": "C'est l'\u00e9quivalent Python (Context Manager) du destructeur C++ (RAII)."
    }
  },
  {
    "id": "ex-mod25-7",
    "type": "drag-drop",
    "question": "Cycle de vie RAII (Fichier)",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Appel de sys_open (Constructeur)"
        },
        {
          "id": "2",
          "text": "Op\u00e9rations de Lecture (Bufferis\u00e9es)"
        },
        {
          "id": "3",
          "text": "Fin du bloc (Scope) atteinte"
        },
        {
          "id": "4",
          "text": "Appel automatique de sys_close (Destructeur)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Classez les \u00e9tapes de la vie d'un std::ifstream.",
      "explanation": "Le destructeur est ins\u00e9r\u00e9 de force par le compilateur avant chaque instruction 'ret'."
    }
  },
  {
    "id": "ex-mod25-8",
    "type": "fill-blank",
    "question": "O_DIRECT",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "; Pour \u00e9crire sur le disque sans passer par le Page Cache de Linux :\nopen(\"fichier.txt\", O_WRONLY | __BLANK__);",
      "blanks": [
        {
          "id": "1",
          "answer": "O_DIRECT",
          "hint": "Direct I/O."
        }
      ],
      "explanation": "Utilis\u00e9 par les bases de donn\u00e9es (PostgreSQL, MySQL) pour g\u00e9rer elles-m\u00eames leur cache RAM sans interf\u00e9rence de l'OS."
    }
  },
  {
    "id": "ex-mod25-9",
    "type": "quiz",
    "question": "Pourquoi la lib\u00e9ration m\u00e9moire (delete/free) n'est-elle g\u00e9n\u00e9ralement pas un simple 'sys_brk' ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce que l'allocateur (malloc/new) pr\u00e9f\u00e8re recycler les blocs de RAM libres au lieu de les rendre au noyau OS \u00e0 chaque fois."
        },
        {
          "id": "b",
          "text": "Parce qu'on ne peut pas rendre de m\u00e9moire \u00e0 l'OS."
        },
        {
          "id": "c",
          "text": "Parce que sys_brk n'existe pas."
        }
      ],
      "correctId": "a",
      "explanation": "Faire un syscall est co\u00fbteux. Le malloc de la libc maintient des 'free lists' internes."
    }
  },
  {
    "id": "ex-mod25-10",
    "type": "code-correction",
    "question": "Fuite de m\u00e9moire",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "void faire() {\n  int* data = new int[100];\n  if (erreur) return;\n  delete[] data;\n}",
      "correctCode": "void faire() {\n  int* data = new int[100];\n  if (erreur) { delete[] data; return; }\n  delete[] data;\n}",
      "hints": [
        "Si 'erreur' est vraie, on quitte avant le delete."
      ],
      "explanation": "C'est pourquoi on utilise std::unique_ptr ou le RAII pour \u00e9viter ce genre de fuites garanties."
    }
  },
  {
    "id": "ex-mod26-1",
    "type": "quiz",
    "question": "Que signifie 'Z\u00e9ro-overhead' pour les exceptions C++ ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Si aucune exception n'est lanc\u00e9e (pas de throw), le code s'ex\u00e9cute exactement aussi vite que s'il n'y avait pas de try/catch."
        },
        {
          "id": "b",
          "text": "Le throw s'ex\u00e9cute en 0 cycle CPU."
        },
        {
          "id": "c",
          "text": "Le code prend 0 octet en m\u00e9moire."
        }
      ],
      "correctId": "a",
      "explanation": "C'est la philosophie C++ : vous ne payez pas de p\u00e9nalit\u00e9 de performance (vitesse) pour une exception qui n'arrive pas."
    }
  },
  {
    "id": "ex-mod26-2",
    "type": "quiz",
    "question": "Comment Python g\u00e8re-t-il les erreurs en interne ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Avec des Zero-overhead exceptions."
        },
        {
          "id": "b",
          "text": "En retournant des pointeurs NULL et en fixant des variables globales d'erreur (PyErr_SetString)."
        },
        {
          "id": "c",
          "text": "Il n'y a pas d'erreur en Python."
        }
      ],
      "correctId": "b",
      "explanation": "Le code C sous-jacent de Python v\u00e9rifie laborieusement si le retour est NULL \u00e0 chaque ligne."
    }
  },
  {
    "id": "ex-mod26-3",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Stack Unwinding' ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une instruction CPU."
        },
        {
          "id": "b",
          "text": "Le processus par lequel l'OS remonte la pile des appels pour trouver un bloc 'catch' valide lorsqu'un throw se produit."
        },
        {
          "id": "c",
          "text": "Une optimisation de boucle."
        }
      ],
      "correctId": "b",
      "explanation": "Le d\u00e9roulage de pile permet d'appeler les destructeurs locaux de chaque Frame d\u00e9truite."
    }
  },
  {
    "id": "ex-mod26-4",
    "type": "fill-blank",
    "question": "Tables DWARF",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "; Le compilateur g\u00e9n\u00e8re une section ELF invisible nomm\u00e9e __BLANK__\n; Elle contient la carte des blocs try/catch.",
      "blanks": [
        {
          "id": "1",
          "answer": ".eh_frame",
          "hint": "Exception Handling Frame."
        }
      ],
      "explanation": "C'est gr\u00e2ce \u00e0 cette table (sans instructions) que le zero-overhead est possible."
    }
  },
  {
    "id": "ex-mod26-5",
    "type": "quiz",
    "question": "Que se passe-t-il si un throw n'est jamais attrap\u00e9 par un catch en C++ ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Le programme continue."
        },
        {
          "id": "b",
          "text": "L'OS red\u00e9marre."
        },
        {
          "id": "c",
          "text": "Le programme crashe (appel \u00e0 std::terminate)."
        }
      ],
      "correctId": "c",
      "explanation": "std::terminate() est appel\u00e9, ce qui fait crasher le programme brutalement (abort)."
    }
  },
  {
    "id": "ex-mod26-6",
    "type": "quiz",
    "question": "Pourquoi les d\u00e9veloppeurs de jeux vid\u00e9o (moteurs C++) d\u00e9sactivent-ils souvent les exceptions (-fno-exceptions) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Parce que le 'Stack Unwinding' cause des pics de lenteur al\u00e9atoires inacceptables (des millisecondes perdues)."
        },
        {
          "id": "b",
          "text": "Pour avoir plus de couleurs."
        },
        {
          "id": "c",
          "text": "Parce qu'ils codent parfaitement."
        }
      ],
      "correctId": "a",
      "explanation": "Dans un jeu \u00e0 60 FPS, une frame dure 16ms. Un seul Stack Unwinding peut prendre plusieurs millisecondes et cr\u00e9er un 'stutter' (saccade)."
    }
  },
  {
    "id": "ex-mod26-7",
    "type": "drag-drop",
    "question": "Le processus d'un 'throw' C++",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "throw est appel\u00e9, arr\u00eat du flux d'ex\u00e9cution normal"
        },
        {
          "id": "2",
          "text": "libunwind lit la section .eh_frame pour analyser la pile"
        },
        {
          "id": "3",
          "text": "Ex\u00e9cution des destructeurs (RAII) des variables locales (Stack Unwinding)"
        },
        {
          "id": "4",
          "text": "Saut dans le bloc 'catch' correspondant"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3",
        "4"
      ],
      "instruction": "Ordonnez les \u00e9tapes lentes du d\u00e9clenchement d'une exception.",
      "explanation": "Ce processus magique mais lourd justifie l'adage 'N'utilisez les exceptions que pour des cas exceptionnels'."
    }
  },
  {
    "id": "ex-mod26-8",
    "type": "fill-blank",
    "question": "V\u00e9rification d'erreur CPython",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "PyObject *result = PyObject_Call(func, args);\nif (result == __BLANK__) {\n    return __BLANK__; // Propagation manuelle de l'erreur\n}",
      "blanks": [
        {
          "id": "1",
          "answer": "NULL",
          "hint": "Pointeur vide."
        },
        {
          "id": "2",
          "answer": "NULL",
          "hint": "Pointeur vide."
        }
      ],
      "explanation": "Sous la syntaxe \u00e9l\u00e9gante 'try...except' de Python, l'interpr\u00e9teur C fait des if(result == NULL) des millions de fois par seconde."
    }
  },
  {
    "id": "ex-mod26-9",
    "type": "quiz",
    "question": "Comment fonctionnent les alternatives modernes comme Result<T, E> (Rust, std::expected en C++23) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une structure contenant soit la valeur de succ\u00e8s, soit l'erreur, v\u00e9rifi\u00e9e explicitement sans Stack Unwinding."
        },
        {
          "id": "b",
          "text": "Ils appellent abort() tout le temps."
        },
        {
          "id": "c",
          "text": "Ils utilisent la table DWARF."
        }
      ],
      "correctId": "a",
      "explanation": "C'est un retour aux codes d'erreur mais de fa\u00e7on s\u00fbre (Memory Safe), \u00e9vitant la lenteur des exceptions."
    }
  },
  {
    "id": "ex-mod26-10",
    "type": "code-correction",
    "question": "Destruction manuelle",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "FILE* f = fopen(\"x\", \"r\");\nthrow std::runtime_error(\"Oups\");\nfclose(f);",
      "correctCode": "FILE* f = fopen(\"x\", \"r\");\n/* Mieux: std::ifstream ou RAII */\nfclose(f);\nthrow std::runtime_error(\"Oups\");",
      "hints": [
        "Le throw quitte imm\u00e9diatement la fonction."
      ],
      "explanation": "Le fclose ne sera jamais ex\u00e9cut\u00e9. RAII r\u00e9sout cela car le destructeur est appel\u00e9 automatiquement pendant le Stack Unwinding."
    }
  },
  {
    "id": "ex-mod27-1",
    "type": "quiz",
    "question": "Qu'est-ce que le 'Duck Typing' en Python ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Si \u00e7a marche comme un canard et cancane comme un canard, c'est un canard (on v\u00e9rifie la pr\u00e9sence des m\u00e9thodes \u00e0 l'ex\u00e9cution, peu importe le type r\u00e9el)."
        },
        {
          "id": "b",
          "text": "Une erreur de typage."
        },
        {
          "id": "c",
          "text": "Une optimisation."
        }
      ],
      "correctId": "a",
      "explanation": "Pas besoin d'interfaces h\u00e9rit\u00e9es stricte en Python, tant que l'objet poss\u00e8de la m\u00e9thode requise."
    }
  },
  {
    "id": "ex-mod27-2",
    "type": "quiz",
    "question": "Qu'est-ce que la VTable en C++ ?",
    "difficulty": "easy",
    "xpReward": 20,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une table en bois."
        },
        {
          "id": "b",
          "text": "Un tableau statique de pointeurs de fonctions pour r\u00e9soudre le polymorphisme (Virtual Methods)."
        },
        {
          "id": "c",
          "text": "Une liste Python."
        }
      ],
      "correctId": "b",
      "explanation": "La Virtual Method Table permet les appels indirects."
    }
  },
  {
    "id": "ex-mod27-3",
    "type": "quiz",
    "question": "O\u00f9 est stock\u00e9 le 'vptr' (Virtual Pointer) d'un objet C++ ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "En tant que champ cach\u00e9 \u00e0 l'int\u00e9rieur (g\u00e9n\u00e9ralement au tout d\u00e9but) de chaque instance de l'objet en RAM."
        },
        {
          "id": "b",
          "text": "Dans le fichier texte."
        },
        {
          "id": "c",
          "text": "Dans la VTable elle-m\u00eame."
        }
      ],
      "correctId": "a",
      "explanation": "Si une classe a des m\u00e9thodes virtuelles, le compilateur grossit chaque instance de 8 octets (64-bits) pour y cacher le vptr."
    }
  },
  {
    "id": "ex-mod27-4",
    "type": "fill-blank",
    "question": "Appel d'une m\u00e9thode virtuelle",
    "difficulty": "medium",
    "xpReward": 35,
    "data": {
      "codeTemplate": "mov rax, [rbx] ; 1. Lire le vptr (situ\u00e9 au d\u00e9but de l'objet dans rbx)\ncall [rax + __BLANK__] ; 2. Appeler la 2\u00e8me m\u00e9thode virtuelle",
      "blanks": [
        {
          "id": "1",
          "answer": "8",
          "hint": "Offset de 8 octets pour la 2\u00e8me fonction (pointers de 64-bits)."
        }
      ],
      "explanation": "L'offset est fix\u00e9 \u00e0 la compilation (0 pour la 1\u00e8re m\u00e9thode, 8 pour la 2\u00e8me, 16 pour la 3\u00e8me...)."
    }
  },
  {
    "id": "ex-mod27-5",
    "type": "quiz",
    "question": "Qu'est-ce qu'une Closure (Fermeture) / Fonction Lambda ?",
    "difficulty": "medium",
    "xpReward": 30,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Une fonction qui encapsule ('capture') des variables de son environnement englobant pour les utiliser plus tard."
        },
        {
          "id": "b",
          "text": "Une fonction qui ferme le programme."
        },
        {
          "id": "c",
          "text": "Un type de VTable."
        }
      ],
      "correctId": "a",
      "explanation": "Elle permet \u00e0 une fonction de survivre avec un \u00e9tat m\u00e9moire interne cach\u00e9."
    }
  },
  {
    "id": "ex-mod27-6",
    "type": "quiz",
    "question": "Comment le compilateur C++ transforme-t-il une Lambda avec capture `[x](int y) { return x + y; }` ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "En cr\u00e9ant secr\u00e8tement une classe (struct) dont les membres sont les variables captur\u00e9es, et surchargeant l'op\u00e9rateur operator()."
        },
        {
          "id": "b",
          "text": "En copiant x dans un registre \u00e9ternel."
        },
        {
          "id": "c",
          "text": "En bloquant le multithreading."
        }
      ],
      "correctId": "a",
      "explanation": "Une fonction lambda n'est qu'un sucre syntaxique pour cr\u00e9er une classe/foncteur anonyme."
    }
  },
  {
    "id": "ex-mod27-7",
    "type": "drag-drop",
    "question": "Co\u00fbt de r\u00e9solution de m\u00e9thode",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "items": [
        {
          "id": "1",
          "text": "Appel direct (C++ normal, call adr)"
        },
        {
          "id": "2",
          "text": "Appel virtuel (C++ vptr, call [rax+8])"
        },
        {
          "id": "3",
          "text": "Duck Typing (Python __dict__ hash map search)"
        }
      ],
      "correctOrder": [
        "1",
        "2",
        "3"
      ],
      "instruction": "Classez du plus rapide (1 cycle) au plus lent (100+ cycles).",
      "explanation": "L'appel direct est imm\u00e9diat, le VTable ajoute des acc\u00e8s m\u00e9moire, le Duck Typing fait appel \u00e0 des milliers d'instructions internes."
    }
  },
  {
    "id": "ex-mod27-8",
    "type": "fill-blank",
    "question": "Dictionnaire Python",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "codeTemplate": "PyObject* __BLANK__ = obj->ob_type->tp_dict;\n// Recherche laborieuse du nom de la fonction en string",
      "blanks": [
        {
          "id": "1",
          "answer": "dict",
          "hint": "Nom logique du dictionnaire interne."
        }
      ],
      "explanation": "Chaque objet Python doit transporter un dictionnaire (Hash Map) lourd pour permettre le typage dynamique."
    }
  },
  {
    "id": "ex-mod27-9",
    "type": "quiz",
    "question": "Que signifie le mot-cl\u00e9 'final' en C++ (ou Java) ?",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "choices": [
        {
          "id": "a",
          "text": "Il interdit la surcharge (override) d'une m\u00e9thode virtuelle par les enfants, permettant au compilateur de la transformer en appel direct (Devirtualization)."
        },
        {
          "id": "b",
          "text": "Il ferme le fichier."
        },
        {
          "id": "c",
          "text": "Il met la variable en lecture seule."
        }
      ],
      "correctId": "a",
      "explanation": "C'est une optimisation monstrueuse : si on sait que personne n'h\u00e9ritera, on supprime la VTable et on gagne des cycles pr\u00e9cieux."
    }
  },
  {
    "id": "ex-mod27-10",
    "type": "code-correction",
    "question": "Erreur d'h\u00e9ritage VTable",
    "difficulty": "hard",
    "xpReward": 50,
    "data": {
      "buggyCode": "class Base { public: void faire(); };\nclass Fille : public Base { public: void faire(); };\nBase* b = new Fille();\nb->faire(); // Appelle Base::faire",
      "correctCode": "class Base { public: virtual void faire(); };\nclass Fille : public Base { public: void faire() override; };",
      "hints": [
        "Il faut utiliser le mot-cl\u00e9 virtual."
      ],
      "explanation": "Sans 'virtual', C++ utilise l'appel direct statique bas\u00e9 sur le type du pointeur (Base), et non le type r\u00e9el de l'objet (Fille)."
    }
  }
];
