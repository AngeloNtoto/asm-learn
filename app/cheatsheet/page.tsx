'use client';

import { BookOpen } from 'lucide-react';
import CodeBlock from '@/components/ui/CodeBlock';

import { CATEGORIES } from '@/lib/content/cheatsheet';

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
