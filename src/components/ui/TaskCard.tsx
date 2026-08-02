import React from 'react';
import { motion } from 'motion/react';
import { Check, Clock, AlertCircle, ChevronDown } from 'lucide-react';
import type { WeddingTask, TaskCategory } from '../../types/wedding-planner-types';

interface TaskCardProps {
  task: WeddingTask;
  categories: TaskCategory[];
  onToggle: (id: string) => void;
  onEdit?: (task: WeddingTask) => void;
  compact?: boolean;
}

export function TaskCard({ task, categories, onToggle, onEdit, compact = false }: TaskCardProps) {
  const cat = categories.find(c => c.id === task.category);
  const priorityColors: Record<string, string> = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className={`bg-white rounded-2xl border border-[#F3E8EA] shadow-sm transition-all hover:shadow-md ${
        task.completed ? 'opacity-60' : ''
      } ${compact ? 'p-3' : 'p-4'}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
            task.completed
              ? 'bg-[#B76E79] border-[#B76E79] text-white'
              : 'border-slate-300 hover:border-[#B76E79]'
          }`}
          aria-label={task.completed ? `Mark "${task.title}" incomplete` : `Mark "${task.title}" complete`}
        >
          {task.completed && <Check size={12} />}
        </button>

        <div className="flex-1 min-w-0" onClick={() => onEdit?.(task)} role={onEdit ? 'button' : undefined} tabIndex={onEdit ? 0 : undefined}>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={`font-semibold text-sm ${task.completed ? 'line-through text-slate-400' : 'text-[#1A1A1A]'}`}
            >
              {task.title}
            </span>
            <span
              className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
              style={{ backgroundColor: `${priorityColors[task.priority]}15`, color: priorityColors[task.priority] }}
            >
              {task.priority}
            </span>
          </div>

          {!compact && task.description && (
            <p className="text-xs text-slate-400 leading-relaxed mb-2">{task.description}</p>
          )}

          <div className="flex items-center gap-3 flex-wrap text-[11px]">
            {cat && (
              <span className="flex items-center gap-1 font-medium" style={{ color: cat.color }}>
                {cat.label}
              </span>
            )}
            {task.dueDate && (
              <span className="flex items-center gap-1 text-slate-400">
                <Clock size={10} /> {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
            {task.estimatedMinutes > 0 && (
              <span className="text-slate-400">{task.estimatedMinutes < 60 ? `${task.estimatedMinutes}m` : `${Math.round(task.estimatedMinutes / 60)}h`}</span>
            )}
            {task.assignedTo && (
              <span className="text-slate-400">→ {task.assignedTo}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
