'use client';

import { useState } from 'react';
import { Exercise, DragDropData } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, GripVertical } from 'lucide-react';

export default function ExerciseDragDrop({ exercise }: { exercise: Exercise }) {
  const data = exercise.data as DragDropData;
  const { progress, completeExercise, addXP } = useAppStore();
  
  const [items, setItems] = useState(() => {
    // Shuffle initially if not completed
    const arr = [...data.items];
    return arr.sort(() => Math.random() - 0.5);
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const isCompleted = progress.completedExercises.includes(exercise.id);

  // Simple drag and drop logic
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (submitted || isCompleted) return;
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (submitted || isCompleted || draggedIdx === null || draggedIdx === index) return;
    
    // Swap items
    const newItems = [...items];
    const temp = newItems[draggedIdx];
    newItems[draggedIdx] = newItems[index];
    newItems[index] = temp;
    
    setItems(newItems);
    setDraggedIdx(index);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const isCorrect = () => {
    return items.every((item, i) => item.id === data.correctOrder[i]);
  };

  const handleSubmit = () => {
    if (submitted || isCompleted) return;
    
    const correct = isCorrect();
    setSubmitted(true);
    completeExercise(exercise.id, correct);
    
    if (correct) {
      addXP(exercise.xpReward);
    }
  };

  const correct = isCorrect();
  const displayItems = isCompleted 
    ? data.correctOrder.map(id => data.items.find(i => i.id === id)!) 
    : items;

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
            Drag & Drop
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

      <div className="space-y-2 mb-8 bg-surface p-4 border border-default rounded-xl">
        {displayItems.map((item, index) => {
          let itemClass = "flex items-center gap-3 bg-primary border rounded-lg p-3 font-mono text-sm select-none transition-colors ";
          
          if (submitted || isCompleted) {
            // Check if this specific item is in the correct spot
            const isItemCorrect = item.id === data.correctOrder[index];
            itemClass += isItemCorrect ? "border-accent-green text-accent-green" : "border-accent-red text-accent-red";
          } else {
            itemClass += draggedIdx === index ? "border-accent-cyan opacity-50" : "border-default cursor-grab active:cursor-grabbing hover:border-accent-cyan/50";
          }

          return (
            <div
              key={item.id}
              className={itemClass}
              draggable={!submitted && !isCompleted}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              {!submitted && !isCompleted && <GripVertical size={16} className="text-text-muted flex-shrink-0" />}
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>

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

        {!(submitted || isCompleted) && (
          <button
            onClick={handleSubmit}
            className="py-3 px-8 rounded-lg font-bold bg-accent-cyan text-inverse hover:scale-105 shadow-glow-cyan transition-all w-full sm:w-auto flex-shrink-0"
          >
            Vérifier l'ordre
          </button>
        )}
        
        {submitted && !correct && !isCompleted && (
          <button
            onClick={() => setSubmitted(false)}
            className="py-2 px-6 rounded-lg font-bold text-sm bg-surface border border-default hover:bg-elevated transition-colors w-full sm:w-auto flex-shrink-0"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
