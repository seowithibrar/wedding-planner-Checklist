import React, { useMemo } from 'react';
import { Printer, Download, Check } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { ProgressRing } from '../ui/ProgressRing';
import { MilestoneTimeline } from '../ui/MilestoneTimeline';
import { DatePickerInput } from '../ui/DatePickerInput';
import milestonesData from '../../data/wedding-milestones-data.json';
import tasksData from '../../data/wedding-tasks-data.json';
import type { Milestone, MilestoneStatus, TaskCategory } from '../../types/wedding-planner-types';

const categories: TaskCategory[] = tasksData.categories;
const baseMilestones: Milestone[] = milestonesData.milestones.map(m => ({ ...m, status: 'not-started' as MilestoneStatus }));

export function PlanningTimeline() {
  const { weddingDate, setWeddingDate, monthsUntilWedding, isLoaded: dateLoaded } = useWeddingDate();
  const [milestones, setMilestones, milestonesLoaded] = useLocalStorage<Milestone[]>('wpc-timeline-milestones-v1', []);

  const initialized = milestones.length > 0;
  const currentMonths = monthsUntilWedding();

  const computedMilestones = useMemo(() => {
    const source = initialized ? milestones : baseMilestones;
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
      return { ...m, targetDate: target.toISOString().split('T')[0] };
    });
    setMilestones(init);
  };

  const handleStatusChange = (id: string, status: MilestoneStatus) => {
    setMilestones(prev => prev.map(m =>
      m.id === id ? { ...m, status, completedAt: status === 'completed' ? new Date().toISOString() : undefined } : m
    ));
  };

  const completedCount = computedMilestones.filter(m => m.status === 'completed').length;
  const percentage = computedMilestones.length > 0 ? Math.round((completedCount / computedMilestones.length) * 100) : 0;

  if (!dateLoaded || !milestonesLoaded) {
    return <div className="max-w-3xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  if (!initialized) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Create Your Planning Timeline</h2>
          <p className="text-sm text-slate-500 text-center">Enter your wedding date to generate a visual timeline with {baseMilestones.length} key milestones mapped to your schedule.</p>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
          <button onClick={handleInit} disabled={!weddingDate}
            className="w-full bg-[#B76E79] hover:bg-[#a25d66] disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-colors shadow-md">
            Generate My Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Stats */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProgressRing percentage={percentage} label="Milestones Complete" sublabel={`${completedCount} of ${computedMilestones.length}`} />
          <div className="flex-1 space-y-3 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#1A1A1A]">Wedding Date</span>
              <span className="text-sm font-bold text-[#B76E79]">{new Date(weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            {currentMonths >= 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1A1A1A]">Months Remaining</span>
                <span className="text-sm font-bold text-[#B76E79]">{currentMonths}</span>
              </div>
            )}
            <div className="flex gap-2 print:hidden">
              <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors">
                <Printer size={13} /> Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm">
        <MilestoneTimeline milestones={computedMilestones} onStatusChange={handleStatusChange} currentMonths={currentMonths} />
      </div>
    </div>
  );
}
