'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckSquare, Download, Printer, Filter, RotateCcw, ChevronDown, ChevronUp, Check, SlidersHorizontal, Zap } from 'lucide-react';
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

type WeddingStyle = 'traditional' | 'modern' | 'destination' | 'intimate' | 'rustic' | 'glamorous';

interface GeneratorConfig {
  style: WeddingStyle;
  budget: 'small' | 'medium' | 'large' | 'luxury';
  guestCount: 'intimate' | 'medium' | 'large' | 'grand';
  priorities: string[];
}

const defaultConfig: GeneratorConfig = { style: 'traditional', budget: 'medium', guestCount: 'medium', priorities: [] };

export function ChecklistGenerator({ lang }: { lang?: string } = {}) {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded, monthsUntilWedding } = useWeddingDate();
  const [tasks, setTasks, tasksLoaded] = useLocalStorage<WeddingTask[]>('wpc-checklist-tasks-v1', []);
  const [config, setConfig] = useLocalStorage<GeneratorConfig>('wpc-taskgen-config-v1', defaultConfig);
  const [isGenerated, setIsGenerated] = useLocalStorage<boolean>('wpc-checklist-generated-v1', false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [collapsedPeriods, setCollapsedPeriods] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');

  const progress = useProgress(tasks);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const generateChecklist = () => {
    if (!weddingDate) return;
    const months = monthsUntilWedding();
    let filtered = masterTasks.filter(t => t.monthsBefore <= Math.max(months + 2, 18));

    if (config.budget === 'small') filtered = filtered.filter(t => t.priority !== 'low' || t.monthsBefore <= 6);
    if (config.guestCount === 'intimate') filtered = filtered.filter(t => !['accommodation', 'transport'].includes(t.category) || t.priority === 'high');

    if (config.priorities.length > 0) {
      filtered.sort((a, b) => {
        const aP = config.priorities.includes(a.category) ? -1 : 0;
        const bP = config.priorities.includes(b.category) ? -1 : 0;
        return aP - bP || a.monthsBefore - b.monthsBefore;
      });
    } else {
      filtered.sort((a, b) => b.monthsBefore - a.monthsBefore || (a.priority === 'high' ? -1 : 1));
    }

    const generated = filtered.map(t => {
      const target = new Date(weddingDate);
      target.setMonth(target.getMonth() - t.monthsBefore);
      return { ...t, dueDate: target.toISOString().split('T')[0], completed: false };
    });
    setTasks(generated);
    setIsGenerated(true);
    showToast(`${generated.length} personalized tasks generated!`);
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

  const selectStyles = "w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 transition-all bg-white";
  const labelStyles = "block text-[11px] font-bold uppercase tracking-wider text-[#B76E79] mb-1.5";

  if (!isGenerated) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Up Your Personalized Checklist</h2>
          <p className="text-sm text-slate-500 text-center">Enter your date and style to generate a tailored wedding checklist organized by timeline.</p>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyles}>Wedding Style</label>
              <select value={config.style} onChange={e => setConfig(prev => ({ ...prev, style: e.target.value as WeddingStyle }))} className={selectStyles}>
                <option value="traditional">Traditional</option><option value="modern">Modern</option>
                <option value="destination">Destination</option><option value="intimate">Intimate</option>
                <option value="rustic">Rustic</option><option value="glamorous">Glamorous</option>
              </select>
            </div>
            <div>
              <label className={labelStyles}>Budget Range</label>
              <select value={config.budget} onChange={e => setConfig(prev => ({ ...prev, budget: e.target.value as GeneratorConfig['budget'] }))} className={selectStyles}>
                <option value="small">Under $15k</option><option value="medium">$15k–$40k</option>
                <option value="large">$40k–$80k</option><option value="luxury">$80k+</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelStyles}>Guest Count</label>
              <select value={config.guestCount} onChange={e => setConfig(prev => ({ ...prev, guestCount: e.target.value as GeneratorConfig['guestCount'] }))} className={selectStyles}>
                <option value="intimate">Under 50 guests</option><option value="medium">50–150 guests</option>
                <option value="large">150–250 guests</option><option value="grand">250+ guests</option>
              </select>
            </div>
          </div>

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
          <button onClick={() => setShowCustomizer(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${showCustomizer ? 'bg-[#FCECF0] text-[#B76E79] ring-1 ring-[#B76E79]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            <SlidersHorizontal size={12} /> Customize List
          </button>
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

        {/* Expandable Customization Settings */}
        <AnimatePresence>
          {showCustomizer && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="pt-3 border-t border-[#F3E8EA] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelStyles}>Wedding Style</label>
                <select value={config.style} onChange={e => setConfig(prev => ({ ...prev, style: e.target.value as WeddingStyle }))} className={selectStyles}>
                  <option value="traditional">Traditional</option><option value="modern">Modern</option>
                  <option value="destination">Destination</option><option value="intimate">Intimate</option>
                  <option value="rustic">Rustic</option><option value="glamorous">Glamorous</option>
                </select>
              </div>
              <div>
                <label className={labelStyles}>Budget Range</label>
                <select value={config.budget} onChange={e => setConfig(prev => ({ ...prev, budget: e.target.value as GeneratorConfig['budget'] }))} className={selectStyles}>
                  <option value="small">Under $15k</option><option value="medium">$15k–$40k</option>
                  <option value="large">$40k–$80k</option><option value="luxury">$80k+</option>
                </select>
              </div>
              <div>
                <label className={labelStyles}>Guest Count</label>
                <select value={config.guestCount} onChange={e => setConfig(prev => ({ ...prev, guestCount: e.target.value as GeneratorConfig['guestCount'] }))} className={selectStyles}>
                  <option value="intimate">Under 50 guests</option><option value="medium">50–150 guests</option>
                  <option value="large">150–250 guests</option><option value="grand">250+ guests</option>
                </select>
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <button onClick={generateChecklist} className="bg-[#B76E79] hover:bg-[#a25d66] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                  <Zap size={13} /> Re-apply Customizations
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
