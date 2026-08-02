import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Check, Printer, Target } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import { DatePickerInput } from '../ui/DatePickerInput';
import type { WeddingTask } from '../../types/wedding-planner-types';

interface WeekPlan { weekStart: string; goals: string[]; dayTasks: Record<string, WeddingTask[]>; }
const DAYS_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function genId() { return `wt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

function getWeekStart(d: Date): string {
  const day = d.getDay(); const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.getFullYear(), d.getMonth(), diff).toISOString().split('T')[0];
}

function getWeekDates(start: string): string[] {
  const s = new Date(start + 'T12:00:00');
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(s); d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

export function WeeklyPlanner() {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded, daysUntilWedding } = useWeddingDate();
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [plans, setPlans, loaded] = useLocalStorage<Record<string, WeekPlan>>('wpc-weekly-plans-v1', {});
  const [newTaskDay, setNewTaskDay] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [toast, setToast] = useState('');
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); }, []);

  const weekDates = useMemo(() => getWeekDates(weekStart), [weekStart]);
  const plan: WeekPlan = plans[weekStart] || { weekStart, goals: [], dayTasks: {} };
  const allTasks = weekDates.flatMap(d => plan.dayTasks[d] || []);
  const completedCount = allTasks.filter(t => t.completed).length;
  const percentage = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

  const prevWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d.toISOString().split('T')[0]); };
  const nextWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d.toISOString().split('T')[0]); };
  const thisWeek = () => setWeekStart(getWeekStart(new Date()));

  const updatePlan = (updater: (p: WeekPlan) => WeekPlan) => {
    setPlans(prev => ({ ...prev, [weekStart]: updater(plan) }));
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    updatePlan(p => ({ ...p, goals: [...p.goals, newGoal.trim()] }));
    setNewGoal(''); showToast('Goal added!');
  };

  const removeGoal = (idx: number) => {
    updatePlan(p => ({ ...p, goals: p.goals.filter((_, i) => i !== idx) }));
  };

  const addTask = (day: string) => {
    if (!newTaskText.trim()) return;
    const task: WeddingTask = { id: genId(), title: newTaskText, description: '', category: 'dayof', monthsBefore: 0, priority: 'medium', estimatedMinutes: 30, completed: false };
    updatePlan(p => ({ ...p, dayTasks: { ...p.dayTasks, [day]: [...(p.dayTasks[day] || []), task] } }));
    setNewTaskText(''); setNewTaskDay(null); showToast('Task added!');
  };

  const toggleTask = (day: string, taskId: string) => {
    updatePlan(p => ({ ...p, dayTasks: { ...p.dayTasks, [day]: (p.dayTasks[day] || []).map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) } }));
  };

  const deleteTask = (day: string, taskId: string) => {
    updatePlan(p => ({ ...p, dayTasks: { ...p.dayTasks, [day]: (p.dayTasks[day] || []).filter(t => t.id !== taskId) } }));
  };

  const today = new Date().toISOString().split('T')[0];
  const weekLabel = `${new Date(weekDates[0] + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(weekDates[6] + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  if (!dateLoaded || !loaded) {
    return <div className="max-w-5xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  if (!weddingDate) {
    return <div className="max-w-lg mx-auto"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6"><h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Your Wedding Date</h2><DatePickerInput value={weddingDate} onChange={setWeddingDate} /></div></div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AnimatePresence>
        {toast && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2"><Check size={14} /> {toast}</motion.div>}
      </AnimatePresence>

      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={prevWeek} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronLeft size={16} /></button>
          <h2 className="font-bold text-sm text-[#1A1A1A] min-w-[200px] text-center">{weekLabel}</h2>
          <button onClick={nextWeek} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronRight size={16} /></button>
        </div>
        <div className="flex items-center gap-3">
          <ProgressRing percentage={percentage} size={56} strokeWidth={5} />
          <span className="text-xs font-bold text-slate-600">{completedCount}/{allTasks.length}</span>
          <button onClick={thisWeek} className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors">This Week</button>
          <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors print:hidden"><Printer size={14} /></button>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2"><Target size={14} className="text-[#B76E79]" /><h3 className="font-bold text-sm text-[#1A1A1A]">Weekly Goals</h3></div>
        {plan.goals.map((g, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#FCECF0]/50 rounded-xl px-3 py-2">
            <span className="text-sm text-[#1A1A1A] flex-1">{g}</span>
            <button onClick={() => removeGoal(i)} className="text-slate-300 hover:text-red-500 text-xs">✕</button>
          </div>
        ))}
        <div className="flex gap-2">
          <input type="text" placeholder="Add a weekly goal..." value={newGoal} onChange={e => setNewGoal(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGoal()}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79]" />
          <button onClick={addGoal} className="px-3 py-2 rounded-xl bg-[#B76E79] text-white text-xs font-bold hover:bg-[#a25d66]"><Plus size={14} /></button>
        </div>
      </div>

      {/* Day Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {weekDates.map((date, di) => {
          const dayTasks = plan.dayTasks[date] || [];
          const isToday = date === today;
          const isWeddingDay = date === weddingDate;
          return (
            <div key={date} className={`bg-white rounded-2xl border shadow-sm p-3 space-y-2 ${isToday ? 'border-[#B76E79] ring-2 ring-[#B76E79]/20' : isWeddingDay ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20' : 'border-[#F3E8EA]'}`}>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400">{DAYS_LABELS[di]}</p>
                <p className={`text-lg font-extrabold ${isToday ? 'text-[#B76E79]' : isWeddingDay ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}>
                  {new Date(date + 'T12:00:00').getDate()}
                </p>
                {isWeddingDay && <p className="text-[9px] text-[#D4AF37] font-bold">💍 Wedding Day</p>}
              </div>

              <AnimatePresence mode="popLayout">
                {dayTasks.map(t => (
                  <motion.div key={t.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 bg-slate-50 rounded-lg p-2">
                    <button onClick={() => toggleTask(date, t.id)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${t.completed ? 'bg-[#B76E79] border-[#B76E79] text-white' : 'border-slate-300'}`}>
                      {t.completed && <Check size={10} />}
                    </button>
                    <span className={`text-[11px] flex-1 ${t.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>{t.title}</span>
                    <button onClick={() => deleteTask(date, t.id)} className="text-slate-300 hover:text-red-500 text-[10px]">✕</button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {newTaskDay === date ? (
                <div className="flex gap-1">
                  <input type="text" placeholder="Task..." value={newTaskText} onChange={e => setNewTaskText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addTask(date); if (e.key === 'Escape') setNewTaskDay(null); }}
                    className="flex-1 px-2 py-1 rounded-lg border border-slate-200 text-[11px] focus:outline-none focus:border-[#B76E79]" autoFocus />
                  <button onClick={() => addTask(date)} className="px-2 py-1 rounded-lg bg-[#B76E79] text-white text-[10px] font-bold">+</button>
                </div>
              ) : (
                <button onClick={() => { setNewTaskDay(date); setNewTaskText(''); }}
                  className="w-full py-1.5 rounded-lg border-2 border-dashed border-slate-200 text-[10px] text-slate-400 hover:border-[#B76E79] hover:text-[#B76E79] transition-colors">
                  + Add
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
