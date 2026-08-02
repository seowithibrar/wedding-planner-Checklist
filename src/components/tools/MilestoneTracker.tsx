import React, { useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Flag, Check, LayoutGrid, GitBranch, Printer } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import { MilestoneTimeline } from '../ui/MilestoneTimeline';
import { DatePickerInput } from '../ui/DatePickerInput';
import milestonesData from '../../data/wedding-milestones-data.json';
import tasksData from '../../data/wedding-tasks-data.json';
import type { Milestone, MilestoneStatus, TaskCategory } from '../../types/wedding-planner-types';

const categories: TaskCategory[] = tasksData.categories;
const baseMilestones: Milestone[] = milestonesData.milestones;

type ViewMode = 'board' | 'timeline';

export function MilestoneTracker() {
  const { weddingDate, setWeddingDate, monthsUntilWedding, isLoaded: dateLoaded } = useWeddingDate();
  const [milestones, setMilestones, loaded] = useLocalStorage<Milestone[]>('wpc-milestones-v1', []);
  const [view, setView] = useState<ViewMode>('board');
  const [toast, setToast] = useState('');

  const initialized = milestones.length > 0;
  const currentMonths = monthsUntilWedding();
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); }, []);

  const computed = useMemo(() => {
    const source = initialized ? milestones : baseMilestones.map(m => ({ ...m, status: 'not-started' as MilestoneStatus }));
    if (!weddingDate) return source;
    return source.map(m => {
      const target = new Date(weddingDate);
      target.setMonth(target.getMonth() - m.monthsBefore);
      return { ...m, targetDate: target.toISOString().split('T')[0] };
    }).sort((a, b) => b.monthsBefore - a.monthsBefore);
  }, [weddingDate, milestones, initialized]);

  const handleInit = () => {
    if (!weddingDate) return;
    const init = baseMilestones.map(m => {
      const target = new Date(weddingDate);
      target.setMonth(target.getMonth() - m.monthsBefore);
      return { ...m, status: 'not-started' as MilestoneStatus, targetDate: target.toISOString().split('T')[0] };
    });
    setMilestones(init);
  };

  const handleStatusChange = (id: string, status: MilestoneStatus) => {
    setMilestones(prev => prev.map(m =>
      m.id === id ? { ...m, status, completedAt: status === 'completed' ? new Date().toISOString() : undefined } : m
    ));
    if (status === 'completed') showToast('Milestone completed! 🎉');
  };

  const columns: { title: string; status: MilestoneStatus; color: string }[] = [
    { title: 'Upcoming', status: 'not-started', color: '#94A3B8' },
    { title: 'In Progress', status: 'in-progress', color: '#F59E0B' },
    { title: 'Completed', status: 'completed', color: '#10B981' },
  ];

  const completedCount = computed.filter(m => m.status === 'completed').length;
  const percentage = computed.length > 0 ? Math.round((completedCount / computed.length) * 100) : 0;
  const allComplete = completedCount === computed.length && computed.length > 0;

  if (!dateLoaded || !loaded) {
    return <div className="max-w-6xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  if (!initialized) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Track Your Milestones</h2>
          <p className="text-sm text-slate-500 text-center">Enter your wedding date to set up {baseMilestones.length} key planning milestones with target dates.</p>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
          <button onClick={handleInit} disabled={!weddingDate}
            className="w-full bg-[#B76E79] hover:bg-[#a25d66] disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-colors shadow-md flex items-center justify-center gap-2">
            <Flag size={16} /> Start Tracking Milestones
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2">
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {allComplete && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-[#FCECF0] to-[#FFF5F7] rounded-3xl p-8 text-center border border-[#B76E79]/20 shadow-sm">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-[#B76E79]">All Milestones Complete!</h3>
          <p className="text-sm text-slate-500 mt-1">You are fully prepared for your wedding day. Congratulations!</p>
        </motion.div>
      )}

      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <ProgressRing percentage={percentage} label="Milestones" sublabel={`${completedCount} of ${computed.length}`} />
        <div className="flex-1 w-full space-y-3">
          {columns.map(col => {
            const count = computed.filter(m => m.status === col.status).length;
            return (
              <div key={col.status} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
                <span className="text-sm font-semibold text-[#1A1A1A] flex-1">{col.title}</span>
                <span className="text-sm font-bold" style={{ color: col.color }}>{count}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 print:hidden">
          <button onClick={() => setView('board')} className={`p-2 rounded-lg transition-colors ${view === 'board' ? 'bg-[#FCECF0] text-[#B76E79]' : 'bg-slate-50 text-slate-400'}`} aria-label="Board view"><LayoutGrid size={16} /></button>
          <button onClick={() => setView('timeline')} className={`p-2 rounded-lg transition-colors ${view === 'timeline' ? 'bg-[#FCECF0] text-[#B76E79]' : 'bg-slate-50 text-slate-400'}`} aria-label="Timeline view"><GitBranch size={16} /></button>
          <button onClick={() => window.print()} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Print"><Printer size={16} /></button>
        </div>
      </div>

      {view === 'timeline' ? (
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm">
          <MilestoneTimeline milestones={computed} onStatusChange={handleStatusChange} currentMonths={currentMonths} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map(col => (
            <div key={col.status} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                <h3 className="font-bold text-sm text-[#1A1A1A]">{col.title}</h3>
                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                  {computed.filter(m => m.status === col.status).length}
                </span>
              </div>
              <AnimatePresence mode="popLayout">
                {computed.filter(m => m.status === col.status).map(m => {
                  const cat = categories.find(c => c.id === m.category);
                  return (
                    <motion.div key={m.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-2xl border border-[#F3E8EA] p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={() => {
                        const next: MilestoneStatus = m.status === 'not-started' ? 'in-progress' : m.status === 'in-progress' ? 'completed' : 'not-started';
                        handleStatusChange(m.id, next);
                      }}
                      role="button" tabIndex={0}
                      aria-label={`${m.title}: ${m.status}. Click to change status.`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-sm text-[#1A1A1A]">{m.title}</h4>
                        {m.monthsBefore > 0 && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-500 shrink-0">{m.monthsBefore}mo</span>}
                      </div>
                      <p className="text-xs text-slate-400 mb-2 leading-relaxed">{m.description}</p>
                      <div className="flex items-center gap-2">
                        {cat && <span className="text-[10px] font-bold" style={{ color: cat.color }}>{cat.label}</span>}
                        {m.targetDate && <span className="text-[10px] text-slate-400 ml-auto">{new Date(m.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
