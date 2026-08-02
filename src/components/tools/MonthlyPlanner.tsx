import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Check, Printer, Target } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import { DatePickerInput } from '../ui/DatePickerInput';
import tasksData from '../../data/wedding-tasks-data.json';
import type { WeddingTask, TaskCategory } from '../../types/wedding-planner-types';

const categories: TaskCategory[] = tasksData.categories;
interface MonthPlan { month: string; goals: { id: string; text: string; completed: boolean; category: string }[]; notes: string; }
function genId() { return `mg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

export function MonthlyPlanner() {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded, monthsUntilWedding } = useWeddingDate();
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
  const [plans, setPlans, loaded] = useLocalStorage<Record<string, MonthPlan>>('wpc-monthly-plans-v1', {});
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalCat, setNewGoalCat] = useState('venue');
  const [toast, setToast] = useState('');
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); }, []);

  const plan: MonthPlan = plans[currentMonth] || { month: currentMonth, goals: [], notes: '' };
  const completedCount = plan.goals.filter(g => g.completed).length;
  const percentage = plan.goals.length > 0 ? Math.round((completedCount / plan.goals.length) * 100) : 0;

  const [y, m] = currentMonth.split('-').map(Number);
  const monthLabel = new Date(y, m - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const monthsLeft = weddingDate ? monthsUntilWedding() : -1;

  const prevMonth = () => { const d = new Date(y, m - 2); setCurrentMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`); };
  const nextMonth = () => { const d = new Date(y, m); setCurrentMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`); };
  const thisMonth = () => { const n = new Date(); setCurrentMonth(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`); };

  const updatePlan = (updater: (p: MonthPlan) => MonthPlan) => {
    setPlans(prev => ({ ...prev, [currentMonth]: updater(plan) }));
  };

  const addGoal = () => {
    if (!newGoalText.trim()) return;
    updatePlan(p => ({ ...p, goals: [...p.goals, { id: genId(), text: newGoalText.trim(), completed: false, category: newGoalCat }] }));
    setNewGoalText(''); showToast('Goal added!');
  };

  const toggleGoal = (id: string) => {
    updatePlan(p => ({ ...p, goals: p.goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g) }));
  };

  const removeGoal = (id: string) => {
    updatePlan(p => ({ ...p, goals: p.goals.filter(g => g.id !== id) }));
  };

  const updateNotes = (notes: string) => updatePlan(p => ({ ...p, notes }));

  const goalsByCategory = useMemo(() => {
    const map = new Map<string, typeof plan.goals>();
    plan.goals.forEach(g => {
      if (!map.has(g.category)) map.set(g.category, []);
      map.get(g.category)!.push(g);
    });
    return map;
  }, [plan.goals]);

  const suggestedTasks = useMemo(() => {
    if (!weddingDate) return [];
    const wDate = new Date(weddingDate);
    const cDate = new Date(y, m - 1);
    const monthsDiff = (wDate.getFullYear() - cDate.getFullYear()) * 12 + (wDate.getMonth() - cDate.getMonth());
    return tasksData.tasks.filter(t => t.monthsBefore >= monthsDiff - 0.5 && t.monthsBefore < monthsDiff + 1.5).slice(0, 5);
  }, [weddingDate, y, m]);

  if (!dateLoaded || !loaded) {
    return <div className="max-w-4xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  if (!weddingDate) {
    return <div className="max-w-lg mx-auto"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6"><h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Your Wedding Date</h2><DatePickerInput value={weddingDate} onChange={setWeddingDate} /></div></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <AnimatePresence>
        {toast && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2"><Check size={14} /> {toast}</motion.div>}
      </AnimatePresence>

      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronLeft size={16} /></button>
          <h2 className="font-bold text-lg text-[#1A1A1A] min-w-[180px] text-center">{monthLabel}</h2>
          <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronRight size={16} /></button>
        </div>
        <div className="flex items-center gap-3">
          <ProgressRing percentage={percentage} size={56} strokeWidth={5} />
          <div><p className="text-xs font-bold text-[#1A1A1A]">{completedCount}/{plan.goals.length} goals</p>
          {monthsLeft >= 0 && <p className="text-[10px] text-[#B76E79] font-semibold">{monthsLeft} months to go</p>}</div>
          <button onClick={thisMonth} className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors">This Month</button>
          <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] print:hidden"><Printer size={14} /></button>
        </div>
      </div>

      {/* Suggested Tasks */}
      {suggestedTasks.length > 0 && (
        <div className="bg-gradient-to-r from-[#FCECF0] to-[#FFF5F7] rounded-3xl p-5 border border-[#B76E79]/10 space-y-3">
          <h3 className="font-bold text-sm text-[#B76E79] flex items-center gap-2"><Target size={14} /> Suggested Goals for This Month</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedTasks.map(t => (
              <button key={t.id} onClick={() => { setNewGoalText(t.title); setNewGoalCat(t.category); }}
                className="px-3 py-1.5 rounded-full bg-white text-xs font-medium text-slate-600 border border-[#F3E8EA] hover:border-[#B76E79] hover:text-[#B76E79] transition-colors">
                + {t.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Goal Cards by Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from(goalsByCategory.entries()).map(([catId, goals]) => {
          const cat = categories.find(c => c.id === catId);
          const catCompleted = goals.filter(g => g.completed).length;
          return (
            <div key={catId} className="bg-white rounded-2xl border border-[#F3E8EA] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm" style={{ color: cat?.color || '#1A1A1A' }}>{cat?.label || catId}</h4>
                <span className="text-[10px] font-bold text-slate-400">{catCompleted}/{goals.length}</span>
              </div>
              {goals.map(g => (
                <div key={g.id} className="flex items-center gap-2">
                  <button onClick={() => toggleGoal(g.id)}
                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${g.completed ? 'bg-[#B76E79] border-[#B76E79] text-white' : 'border-slate-300 hover:border-[#B76E79]'}`}>
                    {g.completed && <Check size={12} />}
                  </button>
                  <span className={`text-sm flex-1 ${g.completed ? 'line-through text-slate-400' : 'text-[#1A1A1A]'}`}>{g.text}</span>
                  <button onClick={() => removeGoal(g.id)} className="text-slate-300 hover:text-red-500 text-xs">✕</button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Add Goal */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-[#1A1A1A]">Add Monthly Goal</h3>
        <div className="flex gap-2">
          <input type="text" placeholder="What do you want to accomplish this month?" value={newGoalText}
            onChange={e => setNewGoalText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGoal()}
            className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79]" />
          <select value={newGoalCat} onChange={e => setNewGoalCat(e.target.value)}
            className="px-2 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B76E79]">
            {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <button onClick={addGoal} className="px-4 py-2.5 rounded-xl bg-[#B76E79] hover:bg-[#a25d66] text-white text-sm font-bold transition-colors"><Plus size={14} /></button>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B76E79] mb-2">Monthly Notes</label>
        <textarea value={plan.notes} onChange={e => updateNotes(e.target.value)} placeholder="Budget check-in, vendor updates, ideas..."
          rows={3} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79] resize-none" />
      </div>
    </div>
  );
}
