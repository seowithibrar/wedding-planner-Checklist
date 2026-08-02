import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Zap, Download, Printer, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { useProgress } from '../../hooks/useProgress';
import { ProgressRing } from '../ui/ProgressRing';
import { TaskCard } from '../ui/TaskCard';
import { DatePickerInput } from '../ui/DatePickerInput';
import { CategoryFilter } from '../ui/CategoryFilter';
import tasksData from '../../data/wedding-tasks-data.json';
import type { WeddingTask, TaskCategory } from '../../types/wedding-planner-types';

const categories: TaskCategory[] = tasksData.categories;
const masterTasks = tasksData.tasks;

type WeddingStyle = 'traditional' | 'modern' | 'destination' | 'intimate' | 'rustic' | 'glamorous';

interface GeneratorConfig {
  style: WeddingStyle;
  budget: 'small' | 'medium' | 'large' | 'luxury';
  guestCount: 'intimate' | 'medium' | 'large' | 'grand';
  priorities: string[];
}

const defaultConfig: GeneratorConfig = { style: 'traditional', budget: 'medium', guestCount: 'medium', priorities: [] };

export function TaskGenerator() {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded, monthsUntilWedding } = useWeddingDate();
  const [tasks, setTasks, tasksLoaded] = useLocalStorage<WeddingTask[]>('wpc-taskgen-tasks-v1', []);
  const [config, setConfig] = useLocalStorage<GeneratorConfig>('wpc-taskgen-config-v1', defaultConfig);
  const [isGenerated, setIsGenerated] = useLocalStorage<boolean>('wpc-taskgen-done-v1', false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [toast, setToast] = useState('');

  const progress = useProgress(tasks);
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); }, []);

  const generate = () => {
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

    const generated: WeddingTask[] = filtered.map(t => {
      const target = new Date(weddingDate);
      target.setMonth(target.getMonth() - t.monthsBefore);
      return { ...t, dueDate: target.toISOString().split('T')[0], completed: false, priority: t.priority as 'high' | 'medium' | 'low' };
    });

    setTasks(generated);
    setIsGenerated(true);
    showToast(`${generated.length} tasks generated for your ${config.style} wedding!`);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined } : t));
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (selectedCategory) result = result.filter(t => t.category === selectedCategory);
    if (!showCompleted) result = result.filter(t => !t.completed);
    return result;
  }, [tasks, selectedCategory, showCompleted]);

  const exportCSV = () => {
    const headers = ['Task', 'Category', 'Priority', 'Due Date', 'Status', 'Est. Time'];
    const rows = tasks.map(t => [t.title, categories.find(c => c.id === t.category)?.label || '', t.priority, t.dueDate || '', t.completed ? 'Done' : 'Pending', `${t.estimatedMinutes}m`]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `wedding-tasks-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    showToast('Tasks exported!');
  };

  if (!dateLoaded || !tasksLoaded) {
    return <div className="max-w-4xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  const selectStyles = "w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 transition-all bg-white";
  const labelStyles = "block text-[11px] font-bold uppercase tracking-wider text-[#B76E79] mb-1.5";

  if (!isGenerated) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Generate Your Task List</h2>
          <p className="text-sm text-slate-500 text-center">Tell us about your wedding and we will create a personalized task list tailored to your style and timeline.</p>

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
            <div>
              <label className={labelStyles}>Guest Count</label>
              <select value={config.guestCount} onChange={e => setConfig(prev => ({ ...prev, guestCount: e.target.value as GeneratorConfig['guestCount'] }))} className={selectStyles}>
                <option value="intimate">Under 50</option><option value="medium">50–150</option>
                <option value="large">150–250</option><option value="grand">250+</option>
              </select>
            </div>
          </div>

          <button onClick={generate} disabled={!weddingDate}
            className="w-full bg-[#B76E79] hover:bg-[#a25d66] disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-colors shadow-md flex items-center justify-center gap-2">
            <Zap size={16} /> Generate Personalized Tasks
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

      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <ProgressRing percentage={progress.percentage} label="Tasks Complete" sublabel={`${progress.completedTasks} of ${progress.totalTasks}`} />
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center justify-between text-sm"><span className="font-semibold text-[#1A1A1A]">Style</span><span className="font-bold text-[#B76E79] capitalize">{config.style}</span></div>
          <div className="flex items-center justify-between text-sm"><span className="font-semibold text-[#1A1A1A]">Budget</span><span className="font-bold text-[#B76E79] capitalize">{config.budget}</span></div>
          <div className="flex items-center justify-between text-sm"><span className="font-semibold text-[#1A1A1A]">Guests</span><span className="font-bold text-[#B76E79] capitalize">{config.guestCount}</span></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-4 shadow-sm space-y-3 print:hidden">
        <CategoryFilter categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowCompleted(p => !p)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${showCompleted ? 'bg-slate-100 text-slate-500' : 'bg-[#1A1A1A] text-white'}`}>
            {showCompleted ? 'Showing All' : 'Hiding Completed'}
          </button>
          <div className="ml-auto flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><Download size={13} /> Export</button>
            <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><Printer size={13} /> Print</button>
            <button onClick={() => { setTasks([]); setIsGenerated(false); showToast('Reset'); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-400 text-xs font-semibold hover:bg-red-50 hover:text-red-500 transition-colors"><RotateCcw size={13} /></button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} categories={categories} onToggle={toggleTask} />
          ))}
        </AnimatePresence>
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-sm text-slate-400">No tasks match your filters.</div>
        )}
      </div>
    </div>
  );
}
