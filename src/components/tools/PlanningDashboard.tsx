import React from 'react';
import { LayoutGrid, Calendar, Users, DollarSign, CheckSquare, Flag, Clock, ArrowRight } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import { DatePickerInput } from '../ui/DatePickerInput';
import toolRegistry from '../../data/tool-registry.json';
import type { WeddingTask, Milestone, Guest } from '../../types/wedding-planner-types';

export function PlanningDashboard() {
  const { weddingDate, setWeddingDate, daysUntilWedding, isLoaded: dateLoaded } = useWeddingDate();
  const [tasks] = useLocalStorage<WeddingTask[]>('wpc-checklist-tasks-v1', []);
  const [milestones] = useLocalStorage<Milestone[]>('wpc-milestones-v1', []);
  const [guests] = useLocalStorage<Guest[]>('wpc-guest-list-v1', []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const acceptedGuests = guests.filter(g => g.rsvpStatus === 'accepted').length;

  if (!dateLoaded) {
    return <div className="max-w-6xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
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
            <p className="text-2xl font-black text-[#1A1A1A]">{completedTasks} / {totalTasks || 90}</p>
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
            <p className="text-2xl font-black text-[#1A1A1A]">{taskPct}%</p>
          </div>
        </div>
      </div>

      {/* Date Configuration Banner */}
      {!weddingDate && (
        <div className="bg-gradient-to-r from-[#FCECF0] to-[#FFF5F7] rounded-3xl p-6 border border-[#B76E79]/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-[#B76E79]">Set Your Wedding Date to Unlock Full Sync</h3>
            <p className="text-xs text-slate-600">All 14 tools use your wedding date to calculate task due dates, milestone schedules, and daily planning timelines.</p>
          </div>
          <div className="w-full sm:w-64">
            <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
          </div>
        </div>
      )}

      {/* Tool Grid */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-xl text-[#1A1A1A]">Your Wedding Planning Suite</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {toolRegistry.tools.map(tool => (
            <a key={tool.id} href={tool.href}
              className="bg-white rounded-3xl p-6 border border-[#F3E8EA] shadow-sm hover:shadow-md hover:border-[#B76E79]/40 transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E79] bg-[#FCECF0] px-2.5 py-1 rounded-full">
                    {tool.category}
                  </span>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-[#B76E79] group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-lg text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors">{tool.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
