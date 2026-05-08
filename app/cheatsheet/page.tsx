'use client';

import { BookOpen } from 'lucide-react';
import CodeBlock from '@/components/ui/CodeBlock';

const CATEGORIES = [
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

export default function CheatSheetPage() {
  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="text-accent-cyan" />
          Anti-sèche Assembleur x86-64
        </h1>
        <p className="text-text-secondary">Références rapides pour les instructions les plus courantes (Syntaxe Intel).</p>
      </div>

      <div className="space-y-12">
        {CATEGORIES.map(category => (
          <section key={category.id}>
            <h2 className="text-xl font-bold mb-6 text-text-primary border-b border-default pb-2">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {category.instructions.map((inst, idx) => (
                <div key={idx} className="glass-card p-5 border-default">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono text-lg font-bold text-accent-cyan">{inst.mnemonic}</h3>
                    <code className="bg-surface px-2 py-1 rounded text-xs text-text-muted border border-default font-mono">
                      {inst.syntax}
                    </code>
                  </div>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {inst.description}
                  </p>
                  {inst.example && (
                    <div className="bg-primary border border-default rounded p-3 text-sm font-mono text-text-primary">
                      {inst.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      
      <section className="glass-card p-6 mt-12 border-accent-amber/30">
        <h2 className="text-lg font-bold text-accent-amber mb-3">Astuce de Syntaxe (Intel vs AT&T)</h2>
        <p className="text-sm text-text-secondary mb-4">
          Cette plateforme utilise la syntaxe <strong>Intel</strong>. Si vous lisez du code généré par GCC sous Linux, il utilise par défaut la syntaxe <strong>AT&T</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-bold uppercase text-text-muted mb-2">Intel (Ici)</div>
            <ul className="text-sm text-text-secondary list-disc list-inside space-y-1">
              <li>Destination en premier : <code className="text-accent-cyan">mov dest, src</code></li>
              <li>Pas de préfixes sur les registres</li>
              <li>Pas de préfixes sur les valeurs littérales</li>
              <li>Crochets pour la mémoire : <code className="text-accent-purple">[rax]</code></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-text-muted mb-2">AT&T (GCC)</div>
            <ul className="text-sm text-text-secondary list-disc list-inside space-y-1">
              <li>Source en premier : <code className="text-accent-red">mov src, dest</code></li>
              <li>Préfixe % pour registres : <code className="text-accent-purple">%rax</code></li>
              <li>Préfixe $ pour valeurs : <code className="text-accent-amber">$42</code></li>
              <li>Parenthèses pour la mémoire : <code className="text-accent-purple">(%rax)</code></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
