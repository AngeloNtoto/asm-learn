import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'alu',
    term: 'ALU (Arithmetic Logic Unit)',
    definition: 'L\'Unité Arithmétique et Logique est la partie du processeur qui effectue les opérations mathématiques (addition, soustraction) et logiques (AND, OR, XOR).',
    category: 'Architecture',
    related: ['cpu', 'register']
  },
  {
    id: 'assembly',
    term: 'Assembleur (ASM)',
    definition: 'Un langage de programmation de bas niveau où chaque instruction correspond généralement à une seule instruction machine exécutable par le processeur.',
    category: 'Concepts Base',
    example: 'mov eax, 1'
  },
  {
    id: 'backend',
    term: 'Backend (Compilateur)',
    definition: 'La partie du compilateur responsable de traduire la représentation intermédiaire (IR) en code machine ou assembleur spécifique à une architecture.',
    category: 'Compilateur',
    related: ['frontend', 'ir', 'llvm']
  },
  {
    id: 'branch',
    term: 'Branchement (Branch)',
    definition: 'Une instruction qui modifie le flux d\'exécution d\'un programme en sautant à une autre adresse mémoire, souvent conditionnellement.',
    category: 'Instructions',
    example: 'je (Jump if Equal)'
  },
  {
    id: 'cpu',
    term: 'CPU (Central Processing Unit)',
    definition: 'Le processeur central d\'un ordinateur, responsable de l\'exécution des instructions d\'un programme.',
    category: 'Architecture'
  },
  {
    id: 'dereference',
    term: 'Déréférencement',
    definition: 'L\'action d\'accéder à la valeur stockée à une adresse mémoire spécifique pointée par un registre ou une variable.',
    category: 'Mémoire',
    example: 'mov eax, [ebx] (déréférence l\'adresse dans ebx)'
  },
  {
    id: 'flags',
    term: 'Drapeaux (Flags)',
    definition: 'Des bits spécifiques dans un registre d\'état (comme EFLAGS/RFLAGS) qui indiquent le résultat de la dernière opération (ex: Z=Zéro, C=Carry, S=Sign).',
    category: 'Architecture',
    related: ['register', 'branch']
  },
  {
    id: 'frontend',
    term: 'Frontend (Compilateur)',
    definition: 'La partie du compilateur qui analyse le code source (lexing, parsing), vérifie la sémantique et génère la représentation intermédiaire (IR).',
    category: 'Compilateur',
    related: ['backend', 'ir']
  },
  {
    id: 'heap',
    term: 'Heap (Tas)',
    definition: 'Une zone de mémoire utilisée pour l\'allocation dynamique de données dont la taille ou la durée de vie n\'est pas connue à la compilation.',
    category: 'Mémoire',
    related: ['stack']
  },
  {
    id: 'instruction',
    term: 'Instruction',
    definition: 'Une commande unique exécutable par le processeur. En assembleur, elle se compose souvent d\'un mnémonique et de ses opérandes.',
    category: 'Concepts Base',
    example: 'add eax, ebx'
  },
  {
    id: 'ir',
    term: 'IR (Intermediate Representation)',
    definition: 'Une structure de données utilisée en interne par un compilateur pour représenter le code entre le frontend et le backend. LLVM IR est un exemple célèbre.',
    category: 'Compilateur',
    related: ['frontend', 'backend', 'llvm']
  },
  {
    id: 'llvm',
    term: 'LLVM',
    definition: 'Une infrastructure de compilation moderne et modulaire. Elle utilise sa propre IR fortement typée et fournit d\'excellents outils d\'optimisation et de génération de code pour de nombreuses architectures.',
    category: 'Compilateur',
    related: ['ir']
  },
  {
    id: 'mcuscript',
    term: 'McuScript',
    definition: 'Votre futur langage de programmation conçu pour allier le contrôle de l\'assembleur, la portabilité du C et la simplicité de Python, optimisé pour les microcontrôleurs.',
    category: 'Projet'
  },
  {
    id: 'mnemonic',
    term: 'Mnémonique',
    definition: 'Une abréviation lisible par l\'homme qui représente une instruction machine spécifique.',
    category: 'Concepts Base',
    example: 'mov, add, jmp'
  },
  {
    id: 'opcode',
    term: 'Opcode (Operation Code)',
    definition: 'La partie d\'une instruction en langage machine qui spécifie l\'opération à effectuer.',
    category: 'Concepts Base'
  },
  {
    id: 'operand',
    term: 'Opérande',
    definition: 'Les données ou les emplacements (registres, adresses mémoire) sur lesquels une instruction agit.',
    category: 'Concepts Base',
    example: 'Dans "add eax, 1", "eax" et "1" sont des opérandes.'
  },
  {
    id: 'pointer',
    term: 'Pointeur',
    definition: 'Une variable ou un registre qui contient l\'adresse mémoire d\'une autre donnée, plutôt que la donnée elle-même.',
    category: 'Mémoire',
    related: ['dereference']
  },
  {
    id: 'register',
    term: 'Registre',
    definition: 'Un petit emplacement de mémoire ultra-rapide situé directement à l\'intérieur du processeur, utilisé pour stocker temporairement des données pendant l\'exécution d\'instructions.',
    category: 'Architecture'
  },
  {
    id: 'stack',
    term: 'Stack (Pile)',
    definition: 'Une zone de mémoire fonctionnant selon le principe LIFO (Last In, First Out), utilisée pour stocker les adresses de retour des fonctions, les variables locales et pour passer certains paramètres.',
    category: 'Mémoire',
    related: ['heap', 'register'] // register esp/rsp
  },
  {
    id: 'syscall',
    term: 'Syscall (System Call)',
    definition: 'Le mécanisme par lequel un programme demande un service au système d\'exploitation (ex: lire un fichier, afficher du texte).',
    category: 'Système'
  },
  {
    id: 'simd',
    term: 'SIMD',
    definition: 'Single Instruction, Multiple Data. Une architecture permettant d\'exécuter une seule instruction sur plusieurs données en même temps, très utile pour l\'optimisation de calculs (ex: AVX, SSE).',
    category: 'Architecture'
  },
  {
    id: 'abi',
    term: 'ABI (Application Binary Interface)',
    definition: 'La convention qui dicte comment les fonctions doivent se passer des données, quels registres utiliser pour les arguments, et comment gérer la pile.',
    category: 'Système'
  },
  {
    id: 'rop',
    term: 'ROP (Return-Oriented Programming)',
    definition: 'Technique de piratage sophistiquée qui consiste à enchaîner des bouts de code légitime (gadgets) se terminant par RET pour exécuter du code malveillant sans l\'injecter.',
    category: 'Sécurité'
  },
  {
    id: 'mbr',
    term: 'MBR (Master Boot Record)',
    definition: 'Le premier secteur d\'un disque (512 octets) qui contient le bootloader (chargeur d\'amorçage) permettant de démarrer le système d\'exploitation.',
    category: 'Système'
  },
  {
    id: 'ssa',
    term: 'SSA (Static Single Assignment)',
    definition: 'Une propriété d\'une représentation intermédiaire (IR) où chaque variable n\'est assignée qu\'une seule et unique fois. C\'est crucial pour faciliter l\'optimisation du code par les compilateurs modernes.',
    category: 'Compilation'
  },
  {
    id: 'mmio',
    term: 'MMIO (Memory-Mapped I/O)',
    definition: 'Méthode d\'interaction matérielle où les périphériques matériels sont contrôlés en écrivant ou lisant à des adresses mémoires spécifiques, plutôt qu\'avec des instructions I/O dédiées.',
    category: 'Architecture'
  },
  {
    id: 'padding',
    term: 'Padding',
    definition: 'L\'ajout d\'octets vides dans les structures de données en mémoire par le compilateur pour garantir un alignement de la mémoire, accélérant ainsi les accès par le processeur.',
    category: 'Mémoire'
  }
];
