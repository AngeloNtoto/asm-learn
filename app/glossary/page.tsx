'use client';

import { GLOSSARY_TERMS } from '@/lib/content/glossary';
import { useState } from 'react';
import { Search, Book } from 'lucide-react';

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(GLOSSARY_TERMS.map(t => t.category)));

  const filteredTerms = GLOSSARY_TERMS.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? term.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Book className="text-accent-cyan" />
          Glossaire
        </h1>
        <p className="text-text-secondary">Définitions des termes techniques de l'assembleur et des compilateurs.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un terme..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-default rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-cyan transition-colors"
          />
        </div>
        
        <select 
          value={selectedCategory || ''} 
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="bg-surface border border-default rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-cyan transition-colors"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map(term => (
            <div key={term.id} className="glass-card p-6 border-default hover:border-accent-cyan/50">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-accent-cyan">{term.term}</h3>
                <span className="text-[10px] uppercase tracking-wider bg-surface border border-default px-2 py-1 rounded text-text-muted">
                  {term.category}
                </span>
              </div>
              <p className="text-text-primary text-sm leading-relaxed mb-4">
                {term.definition}
              </p>
              
              {term.example && (
                <div className="mt-auto bg-primary border border-default rounded p-3 text-sm font-mono text-text-secondary">
                  <span className="text-xs text-text-muted font-sans uppercase font-bold block mb-1">Exemple</span>
                  {term.example}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-text-muted">
            Aucun terme trouvé pour cette recherche.
          </div>
        )}
      </div>
    </div>
  );
}
