'use client';

import { useState, useEffect } from 'react';
import { CpuState } from '@/lib/emulator/types';
import { loadProgram, step, runAll } from '@/lib/emulator/cpu';
import RegisterView from './RegisterView';
import StackView from './StackView';
import MemoryView from './MemoryView';
import { Play, SkipForward, RotateCcw, AlertTriangle } from 'lucide-react';

interface AsmLabProps {
  initialCode?: string;
}

export default function AsmLab({ initialCode = 'mov rax, 42\npush rax\nadd rax, 10' }: AsmLabProps) {
  const [code, setCode] = useState(initialCode);
  const [state, setState] = useState<CpuState | null>(null);
  const [prevState, setPrevState] = useState<CpuState | null>(null);

  useEffect(() => {
    // Auto-load on mount or code change if not running
    handleLoad();
  }, [code]);

  const handleLoad = () => {
    const s = loadProgram(code);
    setState(s);
    setPrevState(null);
  };

  const handleStep = () => {
    if (!state) return;
    setPrevState(state);
    setState(step(state));
  };

  const handleRun = () => {
    if (!state) return;
    setPrevState(state);
    setState(runAll(state));
  };

  const lines = code.split('\n');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 animate-slide-up">
      {/* Editor & Controls */}
      <div className="flex flex-col gap-4">
        <div className="bg-surface border border-default rounded-xl overflow-hidden flex flex-col shadow-lg">
          <div className="bg-elevated px-4 py-2 border-b border-default flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Éditeur ASM</span>
            <div className="flex gap-2">
              <button 
                onClick={handleLoad} 
                className="text-text-muted hover:text-text-primary p-1 rounded transition-colors"
                title="Réinitialiser"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-1 min-h-[300px] bg-[#0d1117] relative">
            {/* Line numbers and execution highlight */}
            <div className="w-12 bg-surface/50 border-r border-default flex flex-col text-right pr-2 py-4 text-xs font-mono text-text-muted select-none">
              {lines.map((_, i) => (
                <div key={i} className="relative">
                  {state && state.registers.rip === i && !state.halted && !state.error && (
                    <div className="absolute top-0 right-[-8px] w-1.5 h-full bg-accent-cyan rounded-l" />
                  )}
                  <span className={state?.registers.rip === i ? 'text-accent-cyan' : ''}>{i + 1}</span>
                </div>
              ))}
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent text-text-primary font-mono text-sm p-4 resize-none focus:outline-none custom-scrollbar leading-relaxed"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={handleStep}
            disabled={!state || state.halted || !!state.error}
            className="flex-1 flex items-center justify-center gap-2 bg-surface border border-default hover:border-accent-cyan hover:text-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-bold transition-all"
          >
            <SkipForward size={18} />
            Étape par étape
          </button>
          <button
            onClick={handleRun}
            disabled={!state || state.halted || !!state.error}
            className="flex-1 flex items-center justify-center gap-2 bg-accent-green text-inverse disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-glow-green"
          >
            <Play size={18} />
            Exécuter tout
          </button>
        </div>

        {/* Error / Output */}
        {state?.error && (
          <div className="bg-accent-red/10 border border-accent-red text-accent-red p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            <div className="font-mono text-sm">{state.error}</div>
          </div>
        )}
        
        {state?.halted && !state?.error && (
          <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-2 rounded-xl text-sm font-bold text-center">
            Exécution terminée avec succès.
          </div>
        )}
      </div>

      {/* Visualizers */}
      <div className="flex flex-col gap-6">
        {state && (
          <>
            <RegisterView 
              registers={state.registers} 
              flags={state.flags} 
              previousRegisters={prevState?.registers || null} 
            />
            <div className="flex-1 min-h-[250px] flex flex-col gap-6">
              <StackView stack={state.stack} />
              <MemoryView memory={state.memory} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
