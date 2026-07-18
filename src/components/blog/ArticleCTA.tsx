import React from 'react';
import { ArrowRight, BookOpen, Download, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ArticleCTAProps {
  type?: 'guide' | 'download' | 'consultation';
  title: string;
  description: string;
  buttonText: string;
  link: string;
  className?: string;
}

export function ArticleCTA({ type = 'guide', title, description, buttonText, link, className }: ArticleCTAProps) {
  const getIcon = () => {
    switch (type) {
      case 'download': return <Download className="w-10 h-10 text-brand-gold mb-4" />;
      case 'consultation': return <Calendar className="w-10 h-10 text-brand-gold mb-4" />;
      default: return <BookOpen className="w-10 h-10 text-brand-gold mb-4" />;
    }
  };

  return (
    <div className={cn("bg-brand-dark rounded-3xl p-8 sm:p-12 my-12 text-center text-white relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-gold/20 opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
        {getIcon()}
        
        <h3 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          {title}
        </h3>
        
        <p className="text-slate-300 text-lg mb-8">
          {description}
        </p>
        
        <a 
          href={link}
          className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-medium px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/20"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
