import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { BarChart3, CheckCircle2, Clock, AlertCircle, Printer } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import tasksData from '../../data/wedding-tasks-data.json';
import milestonesData from '../../data/wedding-milestones-data.json';
import type { WeddingTask, Milestone, TaskCategory } from '../../types/wedding-planner-types';

const categories: TaskCategory[] = tasksData.categories;

export function ProgressTracker() {
  const { weddingDate, daysUntilWedding, monthsUntilWedding, isLoaded: dateLoaded } = useWeddingDate();
  const [checklistTasks] = useLocalStorage<WeddingTask[]>('wpc-checklist-tasks-v1', []);
  const [milestones] = useLocalStorage<Milestone[]>('wpc-milestones-v1', []);

  const totalChecklist = checklistTasks.length > 0 ? checklistTasks.length : tasksData.tasks.length;
  const completedChecklist = checklistTasks.filter(t => t.completed).length;

  const totalMilestones = milestones.length > 0 ? milestones.length : milestonesData.milestones.length;
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;

  const overallPercentage = useMemo(() => {
    const checkPct = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 50 : 0;
    const msPct = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 50 : 0;
    return Math.round(checkPct + msPct);
  }, [totalChecklist, completedChecklist, totalMilestones, completedMilestones]);

  const catStats = useMemo(() => {
    const source = checklistTasks.length > 0 ? checklistTasks : tasksData.tasks;
    return categories.map(cat => {
      const catTasks = source.filter(t => t.category === cat.id);
      const done = catTasks.filter(t => t.completed).length;
      const pct = catTasks.length > 0 ? Math.round((done / catTasks.length) * 100) : 0;
      return { ...cat, total: catTasks.length, completed: done, percentage: pct };
    });
  }, [checklistTasks]);

  if (!dateLoaded) {
    return <div className="max-w-4xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-8">
        <ProgressRing percentage={overallPercentage} size={140} strokeWidth={10} label="Overall Progress" sublabel="All tasks & milestones" />
        <div className="flex-1 space-y-4 w-full text-center sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Wedding Preparation Progress</h2>
            <p className="text-xs text-slate-500 mt-1">
              {weddingDate ? `${daysUntilWedding()} days remaining until your wedding day.` : 'Set your wedding date to calculate exact timeline progress.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 rounded-2xl p-3">
              <span className="text-slate-400 block font-semibold">Tasks Completed</span>
              <span className="text-lg font-bold text-[#B76E79]">{completedChecklist} / {totalChecklist}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3">
              <span className="text-slate-400 block font-semibold">Milestones Hit</span>
              <span className="text-lg font-bold text-[#D4AF37]">{completedMilestones} / {totalMilestones}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-[#1A1A1A]">Progress by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {catStats.map(cat => (
            <div key={cat.id} className="bg-white rounded-2xl border border-[#F3E8EA] p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1A1A] truncate">{cat.label}</span>
                <span className="text-xs font-extrabold" style={{ color: cat.color }}>{cat.percentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: cat.color }}
                  initial={{ width: 0 }} animate={{ width: `${cat.percentage}%` }} transition={{ duration: 0.5 }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>{cat.completed} done</span>
                <span>{cat.total} total</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
