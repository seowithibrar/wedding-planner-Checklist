import React from 'react';
import { motion } from 'motion/react';
import { Check, Circle, Loader } from 'lucide-react';
import type { Milestone, MilestoneStatus } from '../../types/wedding-planner-types';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onStatusChange?: (id: string, status: MilestoneStatus) => void;
  currentMonths?: number;
}

const statusConfig: Record<MilestoneStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  'not-started': { color: '#94A3B8', bg: '#F1F5F9', icon: <Circle size={14} /> },
  'in-progress': { color: '#F59E0B', bg: '#FEF3C7', icon: <Loader size={14} /> },
  'completed': { color: '#10B981', bg: '#D1FAE5', icon: <Check size={14} /> },
};

export function MilestoneTimeline({ milestones, onStatusChange, currentMonths }: MilestoneTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#F3E8EA]" aria-hidden="true" />

      <div className="space-y-1">
        {milestones.map((m, idx) => {
          const status = m.status || 'not-started';
          const config = statusConfig[status];
          const isCurrent = currentMonths !== undefined && currentMonths !== -1 &&
            m.monthsBefore <= currentMonths && (idx === 0 || milestones[idx - 1].monthsBefore > currentMonths);

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="relative flex items-start gap-4 pl-0"
            >
              <button
                onClick={() => {
                  if (!onStatusChange) return;
                  const next: MilestoneStatus = status === 'not-started' ? 'in-progress' : status === 'in-progress' ? 'completed' : 'not-started';
                  onStatusChange(m.id, next);
                }}
                className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 transition-all hover:scale-110"
                style={{ backgroundColor: config.bg, borderColor: config.color, color: config.color }}
                aria-label={`${m.title}: ${status}. Click to change status.`}
              >
                {config.icon}
              </button>

              <div className={`flex-1 pb-6 ${isCurrent ? 'bg-[#FCECF0]/50 -mx-3 px-3 py-3 rounded-2xl border border-[#B76E79]/20' : ''}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-[#1A1A1A]">{m.title}</h3>
                  {m.targetDate && (
                    <span className="text-[11px] font-medium text-slate-400">
                      {new Date(m.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  {m.monthsBefore > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                      {m.monthsBefore}mo before
                    </span>
                  )}
                  {m.monthsBefore === 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FCECF0] text-[#B76E79]">
                      Wedding Day
                    </span>
                  )}
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B76E79] text-white animate-pulse">
                      You are here
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
