import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, X, Check, Printer, Calendar, LayoutGrid, Sun, Sunset, Moon, Target, Trash2, Clock } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { DatePickerInput } from '../ui/DatePickerInput';
import { ProgressRing } from '../ui/ProgressRing';
import type { CalendarEvent, TaskCategory, WeddingTask } from '../../types/wedding-planner-types';
import tasksData from '../../data/wedding-tasks-data.json';

const categories: TaskCategory[] = tasksData.categories;
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type CalendarView = 'month' | 'week' | 'day';

interface DailyPlan { date: string; tasks: WeddingTask[]; notes: string; }
interface WeekPlan { weekStart: string; goals: string[]; dayTasks: Record<string, WeddingTask[]>; }
interface MonthPlan { month: string; goals: { id: string; text: string; completed: boolean; category: string }[]; notes: string; }

const TIME_BLOCKS = [
  { id: 'morning', label: 'Morning', icon: <Sun size={14} />, hours: '8 AM – 12 PM' },
  { id: 'afternoon', label: 'Afternoon', icon: <Sunset size={14} />, hours: '12 PM – 5 PM' },
  { id: 'evening', label: 'Evening', icon: <Moon size={14} />, hours: '5 PM – 10 PM' },
];

function generateId() { return `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }
function genTaskId() { return `tk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

function getWeekStart(d: Date): string {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.getFullYear(), d.getMonth(), diff).toISOString().split('T')[0];
}

function getWeekDates(start: string): string[] {
  const s = new Date(start + 'T12:00:00');
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(s);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

function formatDayDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function PlanningCalendar({ lang }: { lang?: string } = {}) {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded, daysUntilWedding, monthsUntilWedding } = useWeddingDate();
  const [events, setEvents, eventsLoaded] = useLocalStorage<CalendarEvent[]>('wpc-calendar-events-v1', []);
  const [dailyPlans, setDailyPlans] = useLocalStorage<Record<string, DailyPlan>>('wpc-daily-plans-v1', {});
  const [weeklyPlans, setWeeklyPlans] = useLocalStorage<Record<string, WeekPlan>>('wpc-weekly-plans-v1', {});
  const [monthlyPlans, setMonthlyPlans] = useLocalStorage<Record<string, MonthPlan>>('wpc-monthly-plans-v1', {});

  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({ title: '', category: 'venue', time: '10:00' });

  // Day View state
  const todayStr = new Date().toISOString().split('T')[0];
  const [dayViewDate, setDayViewDate] = useState(todayStr);
  const [newDayTaskText, setNewDayTaskText] = useState('');
  const [newDayTaskBlock, setNewDayTaskBlock] = useState('morning');

  // Week View state
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [newWeekTaskDay, setNewWeekTaskDay] = useState<string | null>(null);
  const [newWeekTaskText, setNewWeekTaskText] = useState('');
  const [newWeekGoal, setNewWeekGoal] = useState('');

  // Month View goals state
  const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  const [newMonthGoalText, setNewMonthGoalText] = useState('');
  const [newMonthGoalCat, setNewMonthGoalCat] = useState('venue');

  const [toast, setToast] = useState('');
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); }, []);

  // Month Calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const monthGridDays = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);

  const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };
  const isWeddingDay = (day: number) => weddingDate && getDateStr(day) === weddingDate;
  const getEventsForDay = (day: number) => events.filter(e => e.date === getDateStr(day));

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goTodayMonth = () => setCurrentDate(new Date());

  const addCalendarEvent = () => {
    if (!newEvent.title?.trim() || !selectedDay) return;
    const event: CalendarEvent = {
      id: generateId(), title: newEvent.title!, date: selectedDay,
      time: newEvent.time || '', category: newEvent.category || 'venue', notes: newEvent.notes || ''
    };
    setEvents(prev => [...prev, event]);
    setNewEvent({ title: '', category: 'venue', time: '10:00' });
    setShowAddEventForm(false);
    showToast('Event added to calendar!');
  };

  const deleteCalendarEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('Event removed');
  };

  // Day View Helpers
  const dayPlan = dailyPlans[dayViewDate] || { date: dayViewDate, tasks: [], notes: '' };
  const dayCompletedCount = dayPlan.tasks.filter(t => t.completed).length;
  const dayPercentage = dayPlan.tasks.length > 0 ? Math.round((dayCompletedCount / dayPlan.tasks.length) * 100) : 0;

  const prevDay = () => {
    const d = new Date(dayViewDate);
    d.setDate(d.getDate() - 1);
    setDayViewDate(d.toISOString().split('T')[0]);
  };
  const nextDay = () => {
    const d = new Date(dayViewDate);
    d.setDate(d.getDate() + 1);
    setDayViewDate(d.toISOString().split('T')[0]);
  };

  const addDayTask = () => {
    if (!newDayTaskText.trim()) return;
    const task: WeddingTask = { id: genTaskId(), title: newDayTaskText, description: '', category: newDayTaskBlock, monthsBefore: 0, priority: 'medium', estimatedMinutes: 30, completed: false };
    setDailyPlans(prev => ({ ...prev, [dayViewDate]: { ...dayPlan, date: dayViewDate, tasks: [...dayPlan.tasks, task] } }));
    setNewDayTaskText('');
    showToast('Daily task added!');
  };

  const toggleDayTask = (id: string) => {
    setDailyPlans(prev => ({ ...prev, [dayViewDate]: { ...dayPlan, tasks: dayPlan.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) } }));
  };

  const deleteDayTask = (id: string) => {
    setDailyPlans(prev => ({ ...prev, [dayViewDate]: { ...dayPlan, tasks: dayPlan.tasks.filter(t => t.id !== id) } }));
  };

  // Week View Helpers
  const weekDates = useMemo(() => getWeekDates(weekStart), [weekStart]);
  const weekPlan: WeekPlan = weeklyPlans[weekStart] || { weekStart, goals: [], dayTasks: {} };
  const allWeekTasks = weekDates.flatMap(d => weekPlan.dayTasks[d] || []);
  const weekCompletedCount = allWeekTasks.filter(t => t.completed).length;
  const weekPercentage = allWeekTasks.length > 0 ? Math.round((weekCompletedCount / allWeekTasks.length) * 100) : 0;
  const weekLabel = `${new Date(weekDates[0] + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(weekDates[6] + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d.toISOString().split('T')[0]);
  };
  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d.toISOString().split('T')[0]);
  };

  const updateWeekPlan = (updater: (p: WeekPlan) => WeekPlan) => {
    setWeeklyPlans(prev => ({ ...prev, [weekStart]: updater(weekPlan) }));
  };

  const addWeekGoal = () => {
    if (!newWeekGoal.trim()) return;
    updateWeekPlan(p => ({ ...p, goals: [...p.goals, newWeekGoal.trim()] }));
    setNewWeekGoal('');
    showToast('Week goal added!');
  };

  const removeWeekGoal = (idx: number) => {
    updateWeekPlan(p => ({ ...p, goals: p.goals.filter((_, i) => i !== idx) }));
  };

  const addWeekTask = (day: string) => {
    if (!newWeekTaskText.trim()) return;
    const task: WeddingTask = { id: genTaskId(), title: newWeekTaskText, description: '', category: 'dayof', monthsBefore: 0, priority: 'medium', estimatedMinutes: 30, completed: false };
    updateWeekPlan(p => ({ ...p, dayTasks: { ...p.dayTasks, [day]: [...(p.dayTasks[day] || []), task] } }));
    setNewWeekTaskText('');
    setNewWeekTaskDay(null);
    showToast('Task added to schedule!');
  };

  const toggleWeekTask = (day: string, taskId: string) => {
    updateWeekPlan(p => ({ ...p, dayTasks: { ...p.dayTasks, [day]: (p.dayTasks[day] || []).map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) } }));
  };

  const deleteWeekTask = (day: string, taskId: string) => {
    updateWeekPlan(p => ({ ...p, dayTasks: { ...p.dayTasks, [day]: (p.dayTasks[day] || []).filter(t => t.id !== taskId) } }));
  };

  // Month View Goals
  const monthPlan: MonthPlan = monthlyPlans[currentMonthKey] || { month: currentMonthKey, goals: [], notes: '' };
  const addMonthGoal = () => {
    if (!newMonthGoalText.trim()) return;
    setMonthlyPlans(prev => ({
      ...prev,
      [currentMonthKey]: {
        ...monthPlan,
        goals: [...monthPlan.goals, { id: genTaskId(), text: newMonthGoalText.trim(), completed: false, category: newMonthGoalCat }]
      }
    }));
    setNewMonthGoalText('');
    showToast('Monthly goal added!');
  };

  const toggleMonthGoal = (id: string) => {
    setMonthlyPlans(prev => ({
      ...prev,
      [currentMonthKey]: {
        ...monthPlan,
        goals: monthPlan.goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g)
      }
    }));
  };

  const deleteMonthGoal = (id: string) => {
    setMonthlyPlans(prev => ({
      ...prev,
      [currentMonthKey]: {
        ...monthPlan,
        goals: monthPlan.goals.filter(g => g.id !== id)
      }
    }));
  };

  if (!dateLoaded || !eventsLoaded) {
    return <div className="max-w-5xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-96" /></div>;
  }

  if (!weddingDate) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Your Wedding Date</h2>
          <p className="text-sm text-slate-500 text-center">Enter your wedding date to organize appointments, weekly task boards, and daily timelines.</p>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#1A1A1A] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-xl flex items-center gap-2">
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Mode Bar */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
          <button onClick={() => setView('month')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'month' ? 'bg-white text-[#B76E79] shadow-xs' : 'text-slate-600 hover:text-[#B76E79]'}`}>
            <Calendar size={14} /> Month View
          </button>
          <button onClick={() => setView('week')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'week' ? 'bg-white text-[#B76E79] shadow-xs' : 'text-slate-600 hover:text-[#B76E79]'}`}>
            <LayoutGrid size={14} /> Week View
          </button>
          <button onClick={() => setView('day')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'day' ? 'bg-white text-[#B76E79] shadow-xs' : 'text-slate-600 hover:text-[#B76E79]'}`}>
            <Clock size={14} /> Day View
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          {daysUntilWedding() > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-[#FCECF0] text-[#B76E79] font-bold">{daysUntilWedding()} days to wedding</span>
          )}
          <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors print:hidden" aria-label="Print">
            <Printer size={14} />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. MONTH VIEW
         ───────────────────────────────────────────────────────────── */}
      {view === 'month' && (
        <div className="space-y-6">
          {/* Month Header Navigation */}
          <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Previous month"><ChevronLeft size={16} /></button>
              <h2 className="text-lg font-bold text-[#1A1A1A] min-w-[180px] text-center">{monthLabel}</h2>
              <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Next month"><ChevronRight size={16} /></button>
            </div>
            <button onClick={goTodayMonth} className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors">Today</button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Calendar Grid */}
            <div className="flex-1 bg-white rounded-3xl border border-[#F3E8EA] shadow-sm overflow-hidden">
              <div className="grid grid-cols-7">
                {DAYS.map(d => (<div key={d} className="py-2 text-center text-[11px] font-bold uppercase text-slate-400 bg-slate-50 border-b border-[#F3E8EA]">{d}</div>))}
                {monthGridDays.map((day, i) => {
                  if (day === null) return <div key={`e${i}`} className="h-20 bg-slate-50/50 border-b border-r border-[#F3E8EA]" />;
                  const dayEvents = getEventsForDay(day);
                  const dateStr = getDateStr(day);
                  const selected = selectedDay === dateStr;
                  return (
                    <button key={i} onClick={() => { setSelectedDay(dateStr); setShowAddEventForm(false); }}
                      className={`h-20 p-1.5 border-b border-r border-[#F3E8EA] text-left transition-all hover:bg-[#FCECF0]/30 ${selected ? 'bg-[#FCECF0]/50 ring-2 ring-[#B76E79]/30 ring-inset' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                          isToday(day) ? 'bg-[#1A1A1A] text-white' : isWeddingDay(day) ? 'bg-[#B76E79] text-white' : 'text-slate-600'
                        }`}>{day}</span>
                        {isWeddingDay(day) && <span className="text-[8px] font-bold text-[#B76E79]">💍</span>}
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 2).map(e => {
                          const cat = categories.find(c => c.id === e.category);
                          return <div key={e.id} className="text-[8px] font-medium truncate px-1 py-0.5 rounded" style={{ backgroundColor: `${cat?.color || '#B76E79'}15`, color: cat?.color || '#B76E79' }}>{e.title}</div>;
                        })}
                        {dayEvents.length > 2 && <div className="text-[8px] text-slate-400 px-1">+{dayEvents.length - 2} more</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day Detail Panel */}
            {selectedDay && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-80 bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm space-y-4 shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#1A1A1A]">
                    {new Date(selectedDay + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {events.filter(e => e.date === selectedDay).length === 0 ? (
                    <p className="text-xs text-slate-400 py-3 text-center">No appointments scheduled.</p>
                  ) : (
                    events.filter(e => e.date === selectedDay).map(e => {
                      const cat = categories.find(c => c.id === e.category);
                      return (
                        <div key={e.id} className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs group">
                          <div>
                            <p className="font-bold text-[#1A1A1A]">{e.title}</p>
                            <p className="text-[10px] text-slate-400">{e.time || 'All day'} • {cat?.label || e.category}</p>
                          </div>
                          <button onClick={() => deleteCalendarEvent(e.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={13} /></button>
                        </div>
                      );
                    })
                  )}
                </div>

                {showAddEventForm ? (
                  <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                    <input type="text" placeholder="Appointment title..." value={newEvent.title}
                      onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#B76E79]" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="time" value={newEvent.time}
                        onChange={e => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        className="px-2 py-1.5 rounded-xl border border-slate-200" />
                      <select value={newEvent.category}
                        onChange={e => setNewEvent(prev => ({ ...prev, category: e.target.value }))}
                        className="px-2 py-1.5 rounded-xl border border-slate-200">
                        {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={addCalendarEvent} className="flex-1 bg-[#B76E79] text-white py-2 rounded-xl font-bold">Save</button>
                      <button onClick={() => setShowAddEventForm(false)} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowAddEventForm(true)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-[#B76E79]/30 text-xs font-bold text-[#B76E79] hover:bg-[#FCECF0]/30 transition-colors">
                    <Plus size={14} /> Add Appointment
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Monthly Goals Section (from MonthlyPlanner) */}
          <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3E8EA] pb-3">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-[#B76E79]" />
                <h3 className="font-bold text-sm text-[#1A1A1A]">Goals for {monthLabel}</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{monthPlan.goals.filter(g => g.completed).length}/{monthPlan.goals.length} completed</span>
            </div>

            <div className="flex gap-2">
              <input type="text" placeholder={`Add a milestone goal for ${monthLabel}...`}
                value={newMonthGoalText} onChange={e => setNewMonthGoalText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addMonthGoal()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B76E79]" />
              <button onClick={addMonthGoal} className="bg-[#B76E79] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#a25d66] transition-colors flex items-center gap-1">
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              {monthPlan.goals.map(goal => (
                <div key={goal.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={goal.completed} onChange={() => toggleMonthGoal(goal.id)}
                      className="rounded text-[#B76E79] focus:ring-[#B76E79]" />
                    <span className={goal.completed ? 'line-through text-slate-400' : ''}>{goal.text}</span>
                  </label>
                  <button onClick={() => deleteMonthGoal(goal.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. WEEK VIEW (from WeeklyPlanner)
         ───────────────────────────────────────────────────────────── */}
      {view === 'week' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={prevWeek} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronLeft size={16} /></button>
              <h2 className="font-bold text-sm text-[#1A1A1A] min-w-[200px] text-center">{weekLabel}</h2>
              <button onClick={nextWeek} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronRight size={16} /></button>
            </div>
            <div className="flex items-center gap-3">
              <ProgressRing percentage={weekPercentage} size={48} strokeWidth={4} label="" />
              <div className="text-xs">
                <p className="font-bold text-[#1A1A1A]">{weekCompletedCount}/{allWeekTasks.length} tasks</p>
                <p className="text-[10px] text-slate-400">completed this week</p>
              </div>
            </div>
          </div>

          {/* Weekly Goals Bar */}
          <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#B76E79] flex items-center gap-1.5">
                <Target size={14} /> Weekly Priorities
              </h3>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Add a key priority for this week..." value={newWeekGoal}
                onChange={e => setNewWeekGoal(e.target.value)} onKeyDown={e => e.key === 'Enter' && addWeekGoal()}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B76E79]" />
              <button onClick={addWeekGoal} className="bg-[#B76E79] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#a25d66] transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {weekPlan.goals.map((g, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 bg-[#FCECF0] text-[#B76E79] px-3 py-1 rounded-full text-xs font-medium">
                  {g} <button onClick={() => removeWeekGoal(idx)} className="hover:text-red-500"><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* 7-Day Board Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {weekDates.map((dayDate, i) => {
              const dayTasks = weekPlan.dayTasks[dayDate] || [];
              const isTodayColumn = dayDate === todayStr;
              return (
                <div key={dayDate} className={`bg-white rounded-2xl border p-3 shadow-2xs space-y-2 ${isTodayColumn ? 'border-[#B76E79] ring-1 ring-[#B76E79]/20' : 'border-[#F3E8EA]'}`}>
                  <div className="border-b border-slate-100 pb-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">{DAYS_LABELS[i]}</p>
                    <p className="font-bold text-xs text-[#1A1A1A]">{new Date(dayDate + 'T12:00:00').getDate()}</p>
                  </div>

                  <div className="space-y-1.5 min-h-24">
                    {dayTasks.map(t => (
                      <div key={t.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] group flex items-start justify-between gap-1">
                        <label className="flex items-start gap-1.5 cursor-pointer leading-tight">
                          <input type="checkbox" checked={t.completed} onChange={() => toggleWeekTask(dayDate, t.id)}
                            className="rounded text-[#B76E79] focus:ring-[#B76E79] mt-0.5" />
                          <span className={t.completed ? 'line-through text-slate-400' : 'text-slate-700'}>{t.title}</span>
                        </label>
                        <button onClick={() => deleteWeekTask(dayDate, t.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {newWeekTaskDay === dayDate ? (
                    <div className="space-y-1.5 pt-1">
                      <input type="text" autoFocus placeholder="Task title..." value={newWeekTaskText}
                        onChange={e => setNewWeekTaskText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addWeekTask(dayDate)}
                        className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 focus:outline-none" />
                      <div className="flex gap-1">
                        <button onClick={() => addWeekTask(dayDate)} className="flex-1 bg-[#B76E79] text-white py-1 rounded text-[10px] font-bold">Add</button>
                        <button onClick={() => setNewWeekTaskDay(null)} className="px-2 py-1 rounded bg-slate-100 text-[10px]">✕</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => { setNewWeekTaskDay(dayDate); setNewWeekTaskText(''); }}
                      className="w-full text-center py-1 text-[10px] font-bold text-slate-400 hover:text-[#B76E79] hover:bg-[#FCECF0]/30 rounded-lg transition-colors">
                      + Add task
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. DAY VIEW (from DailyPlanner)
         ───────────────────────────────────────────────────────────── */}
      {view === 'day' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={prevDay} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronLeft size={16} /></button>
              <div className="text-center min-w-[200px]">
                <h2 className="font-bold text-sm text-[#1A1A1A]">{formatDayDate(dayViewDate)}</h2>
                {dayViewDate === todayStr && <span className="text-[10px] font-bold text-[#B76E79] uppercase">Today</span>}
              </div>
              <button onClick={nextDay} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors"><ChevronRight size={16} /></button>
            </div>
            <div className="flex items-center gap-3">
              <ProgressRing percentage={dayPercentage} size={50} strokeWidth={4} label="" />
              <div className="text-xs">
                <p className="font-bold text-[#1A1A1A]">{dayCompletedCount}/{dayPlan.tasks.length} tasks</p>
                <p className="text-[10px] text-slate-400">completed today</p>
              </div>
            </div>
          </div>

          {/* Quick Add Task Input */}
          <div className="bg-white rounded-3xl border border-[#F3E8EA] p-4 shadow-sm flex flex-col sm:flex-row gap-2">
            <select value={newDayTaskBlock} onChange={e => setNewDayTaskBlock(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#B76E79]">
              <option value="morning">Morning (8 AM – 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM – 5 PM)</option>
              <option value="evening">Evening (5 PM – 10 PM)</option>
            </select>
            <input type="text" placeholder="Add a time-blocked task for today..." value={newDayTaskText}
              onChange={e => setNewDayTaskText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addDayTask()}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B76E79]" />
            <button onClick={addDayTask} className="bg-[#B76E79] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#a25d66] transition-colors flex items-center justify-center gap-1">
              <Plus size={14} /> Add
            </button>
          </div>

          {/* Time Blocks Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIME_BLOCKS.map(block => {
              const blockTasks = dayPlan.tasks.filter(t => t.category === block.id);
              return (
                <div key={block.id} className="bg-white rounded-2xl border border-[#F3E8EA] p-4 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#B76E79]">{block.icon}</span>
                      <h4 className="font-bold text-xs text-[#1A1A1A]">{block.label}</h4>
                    </div>
                    <span className="text-[10px] text-slate-400">{block.hours}</span>
                  </div>

                  <div className="space-y-2 min-h-32">
                    {blockTasks.length === 0 ? (
                      <p className="text-[11px] text-slate-400 text-center py-6">No tasks scheduled</p>
                    ) : (
                      blockTasks.map(t => (
                        <div key={t.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between gap-2 group">
                          <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input type="checkbox" checked={t.completed} onChange={() => toggleDayTask(t.id)}
                              className="rounded text-[#B76E79] focus:ring-[#B76E79]" />
                            <span className={t.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>{t.title}</span>
                          </label>
                          <button onClick={() => deleteDayTask(t.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
