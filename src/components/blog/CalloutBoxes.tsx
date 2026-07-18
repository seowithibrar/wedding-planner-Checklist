import React from 'react';
import { Lightbulb, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ExpertTip({ title = "Expert Tip", children, className }: CalloutProps) {
  return (
    <div className={cn("not-prose bg-brand-rosegold/10 border-l-4 border-brand-rosegold p-6 my-8 rounded-r-xl", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-brand-rosegold" />
        <h4 className="font-heading font-bold text-lg text-brand-dark m-0">{title}</h4>
      </div>
      <div className="text-slate-700 m-0">
        {children}
      </div>
    </div>
  );
}

export function CommonMistake({ title = "Common Mistake", children, className }: CalloutProps) {
  return (
    <div className={cn("not-prose bg-red-50 border-l-4 border-red-400 p-6 my-8 rounded-r-xl", className)}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h4 className="font-heading font-bold text-lg text-red-800 m-0">{title}</h4>
      </div>
      <div className="text-red-900/80 m-0">
        {children}
      </div>
    </div>
  );
}

export function ProTip({ title = "Pro Tip", children, className }: CalloutProps) {
  return (
    <div className={cn("not-prose bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-xl", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-5 h-5 text-blue-500" />
        <h4 className="font-heading font-bold text-lg text-blue-800 m-0">{title}</h4>
      </div>
      <div className="text-blue-900/80 m-0">
        {children}
      </div>
    </div>
  );
}

export function ChecklistItem({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("not-prose flex items-start gap-3 my-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow", className)}>
      <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
      <div className="text-slate-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
