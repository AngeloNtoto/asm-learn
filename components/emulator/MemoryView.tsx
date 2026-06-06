import React from 'react';

interface MemoryViewProps {
  memory: Record<number, number>;
}

export default function MemoryView({ memory }: MemoryViewProps) {
  const entries = Object.entries(memory).sort(([a], [b]) => Number(a) - Number(b));

  return (
    <div className="bg-surface border border-default rounded-xl overflow-hidden flex flex-col shadow-lg">
      <div className="bg-elevated px-4 py-2 border-b border-default flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Mémoire (RAM)</span>
        <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded">
          {entries.length} accès
        </span>
      </div>

      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar max-h-[250px]">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-muted">
            <span className="text-sm font-bold opacity-50 mb-1">[Vide]</span>
            <span className="text-xs text-balance text-center">
              Aucune écriture mémoire détectée. Utilisez <code className="text-accent-cyan">mov [adresse], valeur</code>.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 font-mono text-sm">
            {entries.map(([addr, val]) => (
              <div key={addr} className="flex justify-between items-center bg-elevated px-3 py-1.5 rounded border border-default/50 hover:border-accent-purple/30 transition-colors group">
                <span className="text-accent-purple">0x{Number(addr).toString(16).toUpperCase().padStart(4, '0')}</span>
                <span className="text-text-primary group-hover:text-accent-cyan transition-colors">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
