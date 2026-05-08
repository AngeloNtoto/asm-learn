'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { StickyNote, Save, Check } from 'lucide-react';

export default function NoteTaker({ lessonId }: { lessonId: string }) {
  const { progress, saveNote } = useAppStore();
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const notes = progress.notes || [];
    const existing = notes.find(n => n.lessonId === lessonId);
    if (existing) {
      setContent(existing.content);
    }
  }, [lessonId, progress.notes]);

  const handleSave = () => {
    if (!content.trim()) return;
    saveNote({
      content,
      lessonId,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-accent-purple text-inverse p-4 rounded-full shadow-lg shadow-accent-purple/20 hover:scale-105 transition-all z-40 group"
        title="Prendre des notes"
      >
        <StickyNote size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 glass-card border-accent-purple shadow-lg shadow-accent-purple/20 z-50 flex flex-col overflow-hidden animate-slide-up">
      <div className="bg-surface border-b border-default p-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-accent-purple">
          <StickyNote size={18} />
          Mes Notes
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-text-muted hover:text-text-primary text-xl leading-none"
        >
          &times;
        </button>
      </div>
      <div className="p-4 bg-primary flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Prenez des notes sur cette leçon ici... (Markdown supporté)"
          className="w-full h-48 bg-transparent resize-none focus:outline-none text-sm text-text-primary custom-scrollbar placeholder:text-text-muted/50"
        />
      </div>
      <div className="bg-surface border-t border-default p-3 flex justify-between items-center">
        <span className="text-xs text-text-muted">
          {content.length} caractères
        </span>
        <button 
          onClick={handleSave}
          disabled={!content.trim()}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
            saved 
              ? 'bg-accent-green text-inverse' 
              : content.trim() 
                ? 'bg-accent-purple text-inverse hover:bg-accent-purple-dim' 
                : 'bg-elevated text-text-muted cursor-not-allowed'
          }`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? 'Enregistré' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
