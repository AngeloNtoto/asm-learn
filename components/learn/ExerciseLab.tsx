'use client';

import { useState } from 'react';
import { Exercise, InteractiveLabData } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, Play, Terminal } from 'lucide-react';
import { loadProgram, runAll } from '@/lib/emulator/cpu';

export default function ExerciseLab({ exercise }: { exercise: Exercise }) {
  const data = exercise.data as InteractiveLabData;
  const { progress, completeExercise, addXP } = useAppStore();
  
  const [userCode, setUserCode] = useState(data.initialCode);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isCompleted = progress.completedExercises.includes(exercise.id);

  const handleSubmit = () => {
    if (submitted || isCompleted) return;
    
    // Run code through emulator
    const state = loadProgram(userCode);
    const finalState = runAll(state, 5000); // Prevent infinite loops

    if (finalState.error) {
      setErrorMsg(finalState.error);
      setSubmitted(true);
      completeExercise(exercise.id, false);
      return;
    }

    // Check conditions
    let correct = true;
    let failReason = "";

    if (data.targetState.registers) {
      for (const [reg, expectedVal] of Object.entries(data.targetState.registers)) {
        const actual = finalState.registers[reg as keyof typeof finalState.registers];
        if (actual !== expectedVal) {
          correct = false;
          failReason = `Le registre ${reg.toUpperCase()} vaut ${actual} au lieu de ${expectedVal}.`;
          break;
        }
      }
    }

    if (correct && data.targetState.flags) {
      for (const [flag, expectedVal] of Object.entries(data.targetState.flags)) {
        const actual = finalState.flags[flag as keyof typeof finalState.flags];
        if (actual !== expectedVal) {
          correct = false;
          failReason = `Le flag ${flag.toUpperCase()} n'est pas dans l'état attendu.`;
          break;
        }
      }
    }

    setErrorMsg(correct ? null : failReason || "Code invalide");
    setSubmitted(true);
    completeExercise(exercise.id, correct);
    
    if (correct) {
      addXP(exercise.xpReward);
    }
  };

  const correct = submitted && !errorMsg;

  return (
    <div className={`glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-500 ${
      (submitted || isCompleted) && (correct || isCompleted) 
        ? 'border-accent-green shadow-glow-green' 
        : submitted && !correct 
          ? 'border-accent-red animate-shake' 
          : 'border-accent-cyan/30 hover:border-accent-cyan'
    }`}>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded flex items-center gap-1">
            <Terminal size={12} /> Labo
          </span>
          <span className="text-xs text-text-muted font-bold">
            {exercise.xpReward} XP
          </span>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 text-accent-green text-sm font-bold bg-accent-green/10 px-3 py-1 rounded-full">
            <CheckCircle2 size={16} /> Complété
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2">{exercise.question}</h3>
      <p className="text-text-secondary text-sm mb-6">{data.instruction}</p>

      <div className="mb-8">
        <div className="bg-[#0d1117] border border-default rounded-xl overflow-hidden focus-within:border-accent-cyan transition-colors">
          <div className="bg-elevated px-4 py-2 border-b border-default text-xs font-bold uppercase text-text-muted">
            Code (x86-64 Intel)
          </div>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            disabled={isCompleted || (submitted && correct)}
            className="w-full min-h-[150px] bg-transparent text-text-primary font-mono text-sm p-4 resize-none focus:outline-none custom-scrollbar"
            spellCheck="false"
          />
        </div>
      </div>

      {errorMsg && !isCompleted && (
        <div className="mb-6 p-4 bg-accent-red/10 border border-accent-red rounded-lg text-accent-red text-sm font-mono">
          {">"} {errorMsg}
        </div>
      )}

      {/* Footer / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {submitted || isCompleted ? (
          <div className="flex-1 bg-surface border border-default rounded-lg p-4 text-sm w-full">
            <strong className="text-text-primary block mb-1">Explication :</strong>
            <span className="text-text-secondary">{data.explanation}</span>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {!(submitted && correct) && !isCompleted && (
          <button
            onClick={handleSubmit}
            disabled={!userCode.trim()}
            className={`py-3 px-8 rounded-lg font-bold flex items-center gap-2 transition-all w-full sm:w-auto flex-shrink-0 ${
              userCode.trim() 
                ? 'bg-accent-cyan text-inverse hover:scale-105 shadow-glow-cyan' 
                : 'bg-surface text-text-muted border border-default cursor-not-allowed'
            }`}
          >
            <Play size={18} />
            Exécuter & Vérifier
          </button>
        )}
        
        {submitted && !correct && !isCompleted && (
          <button
            onClick={() => { setSubmitted(false); setErrorMsg(null); }}
            className="py-2 px-6 rounded-lg font-bold text-sm bg-surface border border-default hover:bg-elevated transition-colors w-full sm:w-auto flex-shrink-0"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
