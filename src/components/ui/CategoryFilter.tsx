import React from 'react';
import type { TaskCategory } from '../../types/wedding-planner-types';

interface CategoryFilterProps {
  categories: TaskCategory[];
  selected: string;
  onChange: (id: string) => void;
  showAll?: boolean;
}

export function CategoryFilter({ categories, selected, onChange, showAll = true }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="radiogroup" aria-label="Filter by category">
      {showAll && (
        <button
          onClick={() => onChange('')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selected === ''
              ? 'bg-[#1A1A1A] text-white shadow-sm'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
          role="radio"
          aria-checked={selected === ''}
        >
          All
        </button>
      )}
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selected === cat.id
              ? 'text-white shadow-sm'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
          style={selected === cat.id ? { backgroundColor: cat.color } : undefined}
          role="radio"
          aria-checked={selected === cat.id}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
