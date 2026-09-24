'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, Calendar, Users, DollarSign, CheckSquare, Flag, Clock, ArrowRight, GitBranch, Printer, Check, BarChart3 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import { DatePickerInput } from '../ui/DatePickerInput';
import { MilestoneTimeline } from '../ui/MilestoneTimeline';
import toolRegistry from '../../data/tool-registry.json';
import tasksData from '../../data/wedding-tasks-data.json';
import milestonesData from '../../data/wedding-milestones-data.json';
import type { WeddingTask, Milestone, MilestoneStatus, TaskCategory, Guest } from '../../types/wedding-planner-types';

const categories: TaskCategory[] = tasksData.categories;
const baseMilestones: Milestone[] = milestonesData.milestones;

type MilestoneViewMode = 'board' | 'timeline';

export function PlanningDashboard({ lang }: { lang?: string } = {}) {
  const { weddingDate, setWeddingDate, daysUntilWedding, monthsUntilWedding, isLoaded: dateLoaded } = useWeddingDate();
  const [tasks] = useLocalStorage<WeddingTask[]>('wpc-checklist-tasks-v1', []);
  const [milestones, setMilestones, milestonesLoaded] = useLocalStorage<Milestone[]>('wpc-milestones-v1', []);
  const [guests] = useLocalStorage<Guest[]>('wpc-guest-list-v1', []);
  const [milestoneView, setMilestoneView] = useState<MilestoneViewMode>('board');
  const [toast, setToast] = useState('');

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const totalTasks = tasks.length > 0 ? tasks.length : tasksData.tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  const initializedMilestones = milestones.length > 0;
  const currentMonths = monthsUntilWedding();

  const computedMilestones = useMemo(() => {
    const source = initializedMilestones ? milestones : baseMilestones.map(m => ({ ...m, status: 'not-started' as MilestoneStatus }));
    if (!weddingDate) return source;
    return source.map(m => {
      const target = new Date(weddingDate);
      target.setMonth(target.getMonth() - m.monthsBefore);
      return { ...m, targetDate: target.toISOString().split('T')[0] };
    }).sort((a, b) => b.monthsBefore - a.monthsBefore);
  }, [weddingDate, milestones, initializedMilestones]);

  const completedMilestones = computedMilestones.filter(m => m.status === 'completed').length;
  const totalMilestones = computedMilestones.length;

  const overallPercentage = useMemo(() => {
    const checkPct = totalTasks > 0 ? (completedTasks / totalTasks) * 50 : 0;
    const msPct = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 50 : 0;
    return Math.round(checkPct + msPct);
  }, [totalTasks, completedTasks, totalMilestones, completedMilestones]);

  const acceptedGuests = guests.filter(g => g.rsvpStatus === 'accepted').length;

  const catStats = useMemo(() => {
    const source = tasks.length > 0 ? tasks : tasksData.tasks;
    return categories.map(cat => {
      const catTasks = source.filter(t => t.category === cat.id);
      const done = catTasks.filter(t => (t as any).completed).length;
      const pct = catTasks.length > 0 ? Math.round((done / catTasks.length) * 100) : 0;
      return { ...cat, total: catTasks.length, completed: done, percentage: pct };
    });
  }, [tasks]);

  const handleMilestoneStatusChange = (id: string, status: MilestoneStatus) => {
    setMilestones(prev => {
      const current = prev.length > 0 ? prev : computedMilestones;
      return current.map(m =>
        m.id === id ? { ...m, status, completedAt: status === 'completed' ? new Date().toISOString() : undefined } : m
      );
    });
    if (status === 'completed') showToast('Milestone completed! 🎉');
  };

  const columns: { title: string; status: MilestoneStatus; color: string }[] = [
    { title: 'Upcoming', status: 'not-started', color: '#94A3B8' },
    { title: 'In Progress', status: 'in-progress', color: '#F59E0B' },
    { title: 'Completed', status: 'completed', color: '#10B981' },
  ];

  if (!dateLoaded) {
    return <div className="max-w-6xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2">
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FCECF0] flex items-center justify-center text-[#B76E79] shrink-0 font-bold">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Countdown</p>
            <p className="text-2xl font-black text-[#1A1A1A]">
              {weddingDate ? `${daysUntilWedding()} Days` : 'Set Date'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FCECF0] flex items-center justify-center text-[#10B981] shrink-0">
            <CheckSquare size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tasks Complete</p>
            <p className="text-2xl font-black text-[#1A1A1A]">{completedTasks} / {totalTasks}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FCECF0] flex items-center justify-center text-[#D4AF37] shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Guest RSVPs</p>
            <p className="text-2xl font-black text-[#1A1A1A]">{acceptedGuests} Confirmed</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FCECF0] flex items-center justify-center text-[#7B8EAF] shrink-0">
            <Flag size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Overall Progress</p>
            <p className="text-2xl font-black text-[#1A1A1A]">{overallPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Date Configuration Banner */}
      {!weddingDate && (
        <div className="bg-gradient-to-r from-[#FCECF0] to-[#FFF5F7] rounded-3xl p-6 border border-[#B76E79]/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-[#B76E79]">Set Your Wedding Date to Unlock Full Sync</h3>
            <p className="text-xs text-slate-600">All core planning tools use your wedding date to calculate task due dates, milestone schedules, and planning timelines.</p>
          </div>
          <div className="w-full sm:w-64">
            <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
          </div>
        </div>
      )}

      {/* Milestone Tracker Section */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#F3E8EA] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚩</span>
              <h3 className="font-extrabold text-xl text-[#1A1A1A]">Wedding Milestones</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Track completion across all 31 major planning milestones leading to your big day.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMilestoneView('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${milestoneView === 'board' ? 'bg-[#FCECF0] text-[#B76E79]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              <LayoutGrid size={14} /> Board
            </button>
            <button onClick={() => setMilestoneView('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${milestoneView === 'timeline' ? 'bg-[#FCECF0] text-[#B76E79]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              <GitBranch size={14} /> Timeline
            </button>
            <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors print:hidden" aria-label="Print">
              <Printer size={14} />
            </button>
          </div>
        </div>

        {milestoneView === 'timeline' ? (
          <MilestoneTimeline milestones={computedMilestones} onStatusChange={handleMilestoneStatusChange} currentMonths={currentMonths} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map(col => {
              const colMilestones = computedMilestones.filter(m => m.status === col.status);
              return (
                <div key={col.status} className="space-y-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 px-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                    <h4 className="font-bold text-xs text-[#1A1A1A]">{col.title}</h4>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-500 shadow-2xs">
                      {colMilestones.length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {colMilestones.map(m => {
                      const cat = categories.find(c => c.id === m.category);
                      return (
                        <div
                          key={m.id}
                          className="bg-white rounded-xl border border-[#F3E8EA] p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-1.5"
                          onClick={() => {
                            const next: MilestoneStatus = m.status === 'not-started' ? 'in-progress' : m.status === 'in-progress' ? 'completed' : 'not-started';
                            handleMilestoneStatusChange(m.id, next);
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ backgroundColor: `${cat?.color || '#B76E79'}15`, color: cat?.color || '#B76E79' }}>
                              {cat?.label || m.category}
                            </span>
                            {m.targetDate && (
                              <span className="text-[10px] text-slate-400 font-medium">{m.targetDate}</span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-[#1A1A1A] leading-snug">{m.title}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{m.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Progress Breakdown Section */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-[#F3E8EA] pb-4">
          <span className="text-xl">📊</span>
          <div>
            <h3 className="font-extrabold text-xl text-[#1A1A1A]">Planning Progress by Category</h3>
            <p className="text-xs text-slate-500">Live task completion breakdown across all wedding planning departments.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {catStats.map(cat => (
            <div key={cat.id} className="bg-slate-50/70 rounded-2xl border border-[#F3E8EA] p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1A1A] truncate">{cat.label}</span>
                <span className="text-xs font-extrabold" style={{ color: cat.color }}>{cat.percentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: cat.color }}
                  initial={{ width: 0 }} animate={{ width: `${cat.percentage}%` }} transition={{ duration: 0.5 }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>{cat.completed} completed</span>
                <span>{cat.total} total</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Surviving Core Tool Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-xl text-[#1A1A1A]">Core Wedding Planning Suite</h3>
          <span className="text-xs font-bold text-[#B76E79] bg-[#FCECF0] px-3 py-1 rounded-full">{toolRegistry.tools.length} Tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {toolRegistry.tools.map(tool => (
            <a key={tool.id} href={tool.href}
              className="bg-white rounded-3xl p-5 border border-[#F3E8EA] shadow-sm hover:shadow-md hover:border-[#B76E79]/40 transition-all group flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E79] bg-[#FCECF0] px-2 py-0.5 rounded-full">
                    {tool.category}
                  </span>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-[#B76E79] group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-base text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors">{tool.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
