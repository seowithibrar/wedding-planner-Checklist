import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#F3E8EA] p-12 text-center shadow-sm space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FCECF0] flex items-center justify-center text-[#B76E79]">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A]">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto">{description}</p>
      {(action || secondaryAction) && (
        <div className="flex justify-center gap-3 pt-2">
          {action && (
            <button
              onClick={action.onClick}
              className="px-5 py-3 rounded-2xl bg-[#B76E79] hover:bg-[#a25d66] text-white text-sm font-bold transition-colors shadow-md"
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="px-5 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
