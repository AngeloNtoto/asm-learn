export const CATEGORIES = [
  {
    id: 'data-movement',
    title: 'Déplacement de données',
    instructions: [
      {
        mnemonic: 'mov',
        syntax: 'mov dest, src',
        description: 'Copie src dans dest. dest et src doivent avoir la même taille.',
        example: 'mov rax, 42'
      },
      {
        mnemonic: 'push',
        syntax: 'push src',
        description: 'Met src sur la pile. Décrémente RSP de la taille de src.',
        example: 'push rax'
      },
      {
        mnemonic: 'pop',
        syntax: 'pop dest',
        description: 'Retire la valeur du sommet de la pile et la met dans dest. Incrémente RSP.',
        example: 'pop rbx'
      },
      {
        mnemonic: 'lea',
        syntax: 'lea dest, [src]',
        description: 'Load Effective Address. Calcule l\'adresse de src et la met dans dest sans la déréférencer. Souvent utilisé pour des maths rapides.',
        example: 'lea rax, [rbx+rcx*4]'
      }
    ]
  },
  {
    id: 'arithmetic',
    title: 'Arithmétique',
    instructions: [
      {
        mnemonic: 'add',
        syntax: 'add dest, src',
        description: 'Additionne src à dest et stocke le résultat dans dest. (dest = dest + src)',
        example: 'add rax, 10'
      },
      {
        mnemonic: 'sub',
        syntax: 'sub dest, src',
        description: 'Soustrait src de dest. (dest = dest - src)',
        example: 'sub rax, rbx'
      },
      {
        mnemonic: 'inc / dec',
        syntax: 'inc dest / dec dest',
        description: 'Incrémente (+1) ou décrémente (-1) dest.',
        example: 'inc rcx'
      },
      {
        mnemonic: 'mul',
        syntax: 'mul src',
        description: 'Multiplication non-signée. Multiplie RAX par src. Le résultat sur 128 bits est stocké dans RDX:RAX.',
        example: 'mul rbx'
      }
    ]
  },
  {
    id: 'logic',
    title: 'Logique & Bits',
    instructions: [
      {
        mnemonic: 'and / or / xor',
        syntax: 'and dest, src',
        description: 'Opérations logiques bit à bit. xor reg, reg est le moyen le plus rapide de mettre un registre à zéro.',
        example: 'xor rax, rax'
      },
      {
        mnemonic: 'shl / shr',
        syntax: 'shl dest, count',
        description: 'Décalage de bits vers la gauche (shl) ou la droite (shr). shl équivaut à multiplier par une puissance de 2.',
        example: 'shl rax, 1'
      }
    ]
  },
  {
    id: 'control-flow',
    title: 'Contrôle de Flux',
    instructions: [
      {
        mnemonic: 'cmp',
        syntax: 'cmp op1, op2',
        description: 'Compare op1 et op2 en soustrayant op2 de op1. Ne modifie pas les opérandes, mais met à jour le registre de drapeaux (FLAGS).',
        example: 'cmp rax, 10'
      },
      {
        mnemonic: 'jmp',
        syntax: 'jmp label',
        description: 'Saut inconditionnel. Change le flux d\'exécution pour aller au label spécifié.',
        example: 'jmp boucle_fin'
      },
      {
        mnemonic: 'je / jz',
        syntax: 'je label',
        description: 'Jump if Equal (ou Jump if Zero). Saute si la dernière comparaison (cmp) était égale.',
        example: 'je est_egal'
      },
      {
        mnemonic: 'jne / jnz',
        syntax: 'jne label',
        description: 'Jump if Not Equal (ou Jump if Not Zero). Saute si la dernière comparaison était différente.',
        example: 'jne est_different'
      },
      {
        mnemonic: 'call',
        syntax: 'call label',
        description: 'Appelle une fonction. Fait un push de l\'adresse de l\'instruction suivante sur la pile, puis saute au label.',
        example: 'call ma_fonction'
      },
      {
        mnemonic: 'ret',
        syntax: 'ret',
        description: 'Retour d\'une fonction. Fait un pop de l\'adresse de retour depuis la pile, et y saute.',
        example: 'ret'
      }
    ]
  }
];
