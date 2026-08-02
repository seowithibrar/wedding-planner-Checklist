import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Check, Sun, Sunset, Moon, Printer } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import { DatePickerInput } from '../ui/DatePickerInput';
import type { WeddingTask } from '../../types/wedding-planner-types';

interface DailyPlan { date: string; tasks: WeddingTask[]; notes: string; }
const TIME_BLOCKS = [
  { id: 'morning', label: 'Morning', icon: <Sun size={14} />, hours: '8 AM – 12 PM' },
  { id: 'afternoon', label: 'Afternoon', icon: <Sunset size={14} />, hours: '12 PM – 5 PM' },
  { id: 'evening', label: 'Evening', icon: <Moon size={14} />, hours: '5 PM – 10 PM' },
];

function genId() { return `dt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }
function formatDate(d: string) { return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }

export function DailyPlanner() {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded, daysUntilWedding } = useWeddingDate();
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [plans, setPlans, plansLoaded] = useLocalStorage<Record<string, DailyPlan>>('wpc-daily-plans-v1', {});
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskBlock, setNewTaskBlock] = useState('morning');
  const [toast, setToast] = useState('');
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); }, []);

  const plan = plans[selectedDate] || { date: selectedDate, tasks: [], notes: '' };
  const completedCount = plan.tasks.filter(t => t.completed).length;
  const percentage = plan.tasks.length > 0 ? Math.round((completedCount / plan.tasks.length) * 100) : 0;

  const prevDay = () => { const d = new Date(selectedDate); d.setDate(d.getDate() - 1); setSelectedDate(d.toISOString().split('T')[0]); };
  const nextDay = () => { const d = new Date(selectedDate); d.setDate(d.getDate() + 1); setSelectedDate(d.toISOString().split('T')[0]); };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const task: WeddingTask = { id: genId(), title: newTaskText, description: '', category: newTaskBlock, monthsBefore: 0, priority: 'medium', estimatedMinutes: 30, completed: false };
    setPlans(prev => ({ ...prev, [selectedDate]: { ...plan, date: selectedDate, tasks: [...plan.tasks, task] } }));
    setNewTaskText('');
    showToast('Task added!');
  };

  const toggleTask = (id: string) => {
    setPlans(prev => ({ ...prev, [selectedDate]: { ...plan, tasks: plan.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) } }));
  };

  const deleteTask = (id: string) => {
    setPlans(prev => ({ ...prev, [selectedDate]: { ...plan, tasks: plan.tasks.filter(t => t.id !== id) } }));
  };

  const updateNotes = (notes: string) => {
    setPlans(prev => ({ ...prev, [selectedDate]: { ...plan, date: selectedDate, notes } }));
  };

  if (!dateLoaded || !plansLoaded) {
    return <div className="max-w-3xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  if (!weddingDate) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Your Wedding Date</h2>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2">
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date Navigation */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={prevDay} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronLeft size={16} /></button>
          <div className="text-center min-w-[200px]">
            <h2 className="font-bold text-sm text-[#1A1A1A]">{formatDate(selectedDate)}</h2>
            {daysUntilWedding() > 0 && <p className="text-[11px] text-[#B76E79] font-semibold">{daysUntilWedding()} days until wedding</p>}
          </div>
          <button onClick={nextDay} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronRight size={16} /></button>
        </div>
        <div className="flex items-center gap-3">
          <ProgressRing percentage={percentage} size={56} strokeWidth={5} label="" />
          <div>
            <p className="text-xs font-bold text-[#1A1A1A]">{completedCount}/{plan.tasks.length} tasks</p>
            <p className="text-[10px] text-slate-400">completed today</p>
          </div>
          <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors print:hidden"><Printer size={14} /></button>
        </div>
      </div>

      {/* Time Blocks */}
      {TIME_BLOCKS.map(block => {
        const blockTasks = plan.tasks.filter(t => t.category === block.id);
        return (
          <div key={block.id} className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[#B76E79]">{block.icon}</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">{block.label}</h3>
              <span className="text-[11px] text-slate-400">{block.hours}</span>
              <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">{blockTasks.length}</span>
            </div>

            <AnimatePresence mode="popLayout">
              {blockTasks.map(task => (
                <motion.div key={task.id} layout initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                  <button onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${task.completed ? 'bg-[#B76E79] border-[#B76E79] text-white' : 'border-slate-300 hover:border-[#B76E79]'}`}>
                    {task.completed && <Check size={12} />}
                  </button>
                  <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-400' : 'text-[#1A1A1A] font-medium'}`}>{task.title}</span>
                  <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 text-xs">✕</button>
                </motion.div>
              ))}
            </AnimatePresence>

            {block.id === newTaskBlock && (
              <div className="flex gap-2">
                <input type="text" placeholder={`Add ${block.label.toLowerCase()} task...`} value={newTaskText}
                  onChange={e => setNewTaskText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79]" />
                <button onClick={addTask} className="px-3 py-2 rounded-xl bg-[#B76E79] text-white text-xs font-bold hover:bg-[#a25d66] transition-colors"><Plus size={14} /></button>
              </div>
            )}

            {block.id !== newTaskBlock && (
              <button onClick={() => { setNewTaskBlock(block.id); setNewTaskText(''); }}
                className="w-full flex items-center justify-center gap-1 py-2 rounded-xl border-2 border-dashed border-slate-200 text-xs text-slate-400 hover:border-[#B76E79] hover:text-[#B76E79] transition-colors">
                <Plus size={12} /> Add task
              </button>
            )}
          </div>
        );
      })}

      {/* Notes */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B76E79] mb-2">Daily Notes</label>
        <textarea value={plan.notes} onChange={e => updateNotes(e.target.value)} placeholder="Reminders, thoughts, or notes for today..."
          rows={3} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79] resize-none" />
      </div>
    </div>
  );
}
