import React from 'react';

export interface CalloutBoxProps {
  type?: 'tip' | 'warning' | 'pro' | 'mistake';
  title?: string;
  children: React.ReactNode;
}

const styles = {
  tip: { bg: 'bg-[#FCECF0]/80', border: 'border-[#B76E79]', text: 'text-[#1A1A1A]', icon: '💡', defaultTitle: 'Expert Tip' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-900', icon: '⚠️', defaultTitle: 'Important Warning' },
  pro: { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-900', icon: '✨', defaultTitle: 'Pro Advice' },
  mistake: { bg: 'bg-rose-50', border: 'border-rose-400', text: 'text-rose-900', icon: '❌', defaultTitle: 'Common Mistake' }
};

export default function CalloutBox({ type = 'tip', title, children }: CalloutBoxProps) {
  const current = styles[type] || styles.tip;

  return (
    <div className={`p-6 rounded-3xl border-l-4 ${current.bg} ${current.border} my-8 shadow-sm space-y-2`}>
      <div className="flex items-center gap-2 font-bold text-sm tracking-wider uppercase">
        <span>{current.icon}</span>
        <span className={current.text}>{title || current.defaultTitle}</span>
      </div>
      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
        {children}
      </div>
    </div>
  );
}
