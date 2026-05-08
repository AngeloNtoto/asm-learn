'use client';

import { Terminal } from 'lucide-react';
import AsmLab from '@/components/emulator/AsmLab';

export default function LabPage() {
  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Terminal className="text-accent-cyan" />
          Laboratoire d'Assembleur
        </h1>
        <p className="text-text-secondary">
          Écrivez, exécutez et observez l'état du processeur en temps réel. Supporte <code>mov, add, sub, inc, dec, push, pop, jmp, je, jne, cmp, xor</code>.
        </p>
      </div>

      <AsmLab />
      
      <div className="glass-card p-6 mt-8">
        <h3 className="text-lg font-bold text-accent-cyan mb-4">Exemples de Code</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface border border-default p-4 rounded-lg">
            <div className="text-xs text-text-muted mb-2 font-bold uppercase">Boucle Simple</div>
            <pre className="font-mono text-sm text-text-primary whitespace-pre-wrap">
{`mov rcx, 3
boucle:
  push rcx
  dec rcx
  cmp rcx, 0
  jne boucle`}
            </pre>
          </div>
          <div className="bg-surface border border-default p-4 rounded-lg">
            <div className="text-xs text-text-muted mb-2 font-bold uppercase">Calcul Mathématique</div>
            <pre className="font-mono text-sm text-text-primary whitespace-pre-wrap">
{`mov rax, 10
mov rbx, 20
add rax, rbx
sub rax, 5
; RAX contient maintenant 25`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
