'use client';

import { useState } from 'react';
import { Exercise, FillBlankData } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, XCircle } from 'lucide-react';
import { highlightASM } from '@/lib/utils';

export default function ExerciseFillBlank({ exercise }: { exercise: Exercise }) {
  const data = exercise.data as FillBlankData;
  const { progress, completeExercise, addXP } = useAppStore();
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const isCompleted = progress.completedExercises.includes(exercise.id);

  // Initialize empty answers
  const handleInputChange = (id: string, value: string) => {
    if (submitted || isCompleted) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const isAllCorrect = () => {
    return data.blanks.every(blank => 
      answers[blank.id]?.toLowerCase().trim() === blank.answer.toLowerCase().trim()
    );
  };

  const handleSubmit = () => {
    if (submitted || isCompleted) return;
    
    const correct = isAllCorrect();
    setSubmitted(true);
    completeExercise(exercise.id, correct);
    
    if (correct) {
      addXP(exercise.xpReward);
    }
  };

  // Render the code template with inputs replacing __BLANK__
  const renderCode = () => {
    let html = highlightASM(data.codeTemplate);
    let blankIndex = 0;
    
    // We do a hacky replace by splitting the raw text. A real implementation
    // would parse AST or use a more robust token replacement to preserve highlight
    const parts = data.codeTemplate.split('__BLANK__');
    
    return (
      <div className="font-mono text-sm leading-loose bg-surface p-6 rounded-xl border border-default overflow-x-auto whitespace-pre-wrap">
        {parts.map((part, i) => {
          if (i === parts.length - 1) return <span key={i}>{part}</span>;
          
          const blank = data.blanks[blankIndex];
          const currentAnswer = answers[blank.id] || '';
          const isCorrect = currentAnswer.toLowerCase().trim() === blank.answer.toLowerCase().trim();
          
          let inputClass = "blank-input mx-2";
          if (submitted || isCompleted) {
            inputClass += isCorrect || isCompleted ? " correct" : " incorrect";
          }
          
          blankIndex++;
          
          return (
            <span key={i}>
              {part}
              <input
                type="text"
                className={inputClass}
                value={isCompleted ? blank.answer : currentAnswer}
                onChange={(e) => handleInputChange(blank.id, e.target.value)}
                disabled={submitted || isCompleted}
                placeholder="..."
                size={Math.max(5, blank.answer.length + 2)}
              />
            </span>
          );
        })}
      </div>
    );
  };

  const correct = isAllCorrect();

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
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded">
            À Trous
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

      <h3 className="text-xl font-bold mb-6">{exercise.question}</h3>

      <div className="mb-8">
        {renderCode()}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {submitted || isCompleted ? (
          <div className="flex-1 bg-surface border border-default rounded-lg p-4 text-sm w-full">
            <strong className="text-text-primary block mb-1">Explication :</strong>
            <span className="text-text-secondary">{data.explanation}</span>
          </div>
        ) : (
          <div className="flex-1 flex gap-4 text-sm text-text-muted">
            {data.blanks.map((b, i) => b.hint ? (
              <span key={b.id}>💡 Trou {i+1}: {b.hint}</span>
            ) : null)}
          </div>
        )}

        {!(submitted || isCompleted) && (
          <button
            onClick={handleSubmit}
            className="py-3 px-8 rounded-lg font-bold bg-accent-cyan text-inverse hover:scale-105 shadow-glow-cyan transition-all w-full sm:w-auto"
          >
            Valider
          </button>
        )}
        
        {submitted && !correct && !isCompleted && (
          <button
            onClick={() => { setSubmitted(false); }}
            className="py-2 px-6 rounded-lg font-bold text-sm bg-surface border border-default hover:bg-elevated transition-colors w-full sm:w-auto"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
