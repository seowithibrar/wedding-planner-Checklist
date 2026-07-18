import React from 'react';
import { Sparkles } from 'lucide-react';

interface QuickAnswerBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function QuickAnswerBox({ title = "Quick Answer", children }: QuickAnswerBoxProps) {
  return (
    <div className="bg-gradient-to-br from-brand-pink/30 to-brand-rosegold/20 rounded-2xl p-6 my-8 border border-brand-pink/50 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles className="w-16 h-16 text-brand-dark" />
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-brand-gold text-white p-1.5 rounded-lg">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="font-heading text-lg font-bold text-brand-dark m-0">{title}</h3>
      </div>
      <div className="text-slate-700 text-lg leading-relaxed font-medium m-0 relative z-10">
        {children}
      </div>
    </div>
  );
}
