import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckSquare, Download, Printer, Filter, RotateCcw, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { useProgress } from '../../hooks/useProgress';
import { ProgressRing } from '../ui/ProgressRing';
import { TaskCard } from '../ui/TaskCard';
import { DatePickerInput } from '../ui/DatePickerInput';
import { CategoryFilter } from '../ui/CategoryFilter';
import { EmptyState } from '../ui/EmptyState';
import tasksData from '../../data/wedding-tasks-data.json';
import type { WeddingTask, TaskCategory } from '../../types/wedding-planner-types';

const categories: TaskCategory[] = tasksData.categories;
const masterTasks: WeddingTask[] = tasksData.tasks.map(t => ({ ...t, completed: false, priority: t.priority as 'high' | 'medium' | 'low' }));

const TIME_PERIODS = [
  { label: '12+ Months Before', min: 12, max: 99 },
  { label: '9–12 Months Before', min: 9, max: 12 },
  { label: '6–9 Months Before', min: 6, max: 9 },
  { label: '3–6 Months Before', min: 3, max: 6 },
  { label: '1–3 Months Before', min: 1, max: 3 },
  { label: 'Final Month', min: 0.1, max: 1 },
  { label: 'Wedding Week & Day', min: 0, max: 0.1 },
];

export function ChecklistGenerator() {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded } = useWeddingDate();
  const [tasks, setTasks, tasksLoaded] = useLocalStorage<WeddingTask[]>('wpc-checklist-tasks-v1', []);
  const [isGenerated, setIsGenerated] = useLocalStorage<boolean>('wpc-checklist-generated-v1', false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [collapsedPeriods, setCollapsedPeriods] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');

  const progress = useProgress(tasks);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const generateChecklist = () => {
    if (!weddingDate) return;
    const generated = masterTasks.map(t => {
      const target = new Date(weddingDate);
      target.setMonth(target.getMonth() - t.monthsBefore);
      return { ...t, dueDate: target.toISOString().split('T')[0], completed: false };
    });
    setTasks(generated);
    setIsGenerated(true);
    showToast(`${generated.length} tasks generated!`);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined } : t
    ));
  };

  const resetChecklist = () => {
    if (window.confirm('Reset your entire checklist? All progress will be lost.')) {
      setTasks([]);
      setIsGenerated(false);
      showToast('Checklist reset');
    }
  };

  const exportCSV = () => {
    const headers = ['Task', 'Category', 'Priority', 'Due Date', 'Completed', 'Est. Time'];
    const rows = tasks.map(t => [
      t.title, categories.find(c => c.id === t.category)?.label || t.category,
      t.priority, t.dueDate || '', t.completed ? 'Yes' : 'No', `${t.estimatedMinutes}min`
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `wedding-checklist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Checklist exported!');
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (selectedCategory) result = result.filter(t => t.category === selectedCategory);
    if (selectedPriority) result = result.filter(t => t.priority === selectedPriority);
    return result;
  }, [tasks, selectedCategory, selectedPriority]);

  const togglePeriod = (label: string) => {
    setCollapsedPeriods(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  if (!dateLoaded || !tasksLoaded) {
    return <div className="space-y-4 max-w-4xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  if (!isGenerated) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Up Your Checklist</h2>
          <p className="text-sm text-slate-500 text-center">Enter your wedding date to generate a personalized checklist with {masterTasks.length} tasks organized by timeline.</p>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
          <button
            onClick={generateChecklist}
            disabled={!weddingDate}
            className="w-full bg-[#B76E79] hover:bg-[#a25d66] disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <CheckSquare size={16} /> Generate My Wedding Checklist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2">
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Dashboard */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProgressRing percentage={progress.percentage} label="Overall Progress" sublabel={`${progress.completedTasks} of ${progress.totalTasks} tasks`} />
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            {Object.entries(progress.byCategory).slice(0, 6).map(([catId, stats]) => {
              const cat = categories.find(c => c.id === catId);
              return (
                <div key={catId} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">{cat?.label || catId}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: cat?.color || '#B76E79' }}
                        initial={{ width: 0 }} animate={{ width: `${stats.percentage}%` }} transition={{ duration: 0.5 }} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">{stats.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-4 shadow-sm space-y-3 print:hidden">
        <CategoryFilter categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />
        <div className="flex flex-wrap gap-2">
          {['high', 'medium', 'low'].map(p => (
            <button key={p} onClick={() => setSelectedPriority(selectedPriority === p ? '' : p)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedPriority === p ? 'bg-[#1A1A1A] text-white' : 'bg-slate-100 text-slate-500'}`}>
              {p.charAt(0).toUpperCase() + p.slice(1)} Priority
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors">
              <Download size={13} /> Export
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors">
              <Printer size={13} /> Print
            </button>
            <button onClick={resetChecklist} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-400 text-xs font-semibold hover:bg-red-50 hover:text-red-500 transition-colors">
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Task Periods */}
      {TIME_PERIODS.map(period => {
        const periodTasks = filteredTasks.filter(t => t.monthsBefore >= period.min && t.monthsBefore < period.max);
        if (periodTasks.length === 0) return null;
        const completedCount = periodTasks.filter(t => t.completed).length;
        const isCollapsed = collapsedPeriods.has(period.label);

        return (
          <div key={period.label} className="space-y-2">
            <button onClick={() => togglePeriod(period.label)}
              className="w-full flex items-center justify-between bg-white rounded-2xl border border-[#F3E8EA] px-5 py-3 shadow-sm hover:shadow-md transition-all"
              aria-expanded={!isCollapsed}>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-sm text-[#1A1A1A]">{period.label}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FCECF0] text-[#B76E79]">
                  {completedCount}/{periodTasks.length}
                </span>
              </div>
              {isCollapsed ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronUp size={16} className="text-slate-400" />}
            </button>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-2 overflow-hidden">
                  {periodTasks.map(task => (
                    <TaskCard key={task.id} task={task} categories={categories} onToggle={toggleTask} compact />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
