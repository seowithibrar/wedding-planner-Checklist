import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, X, Check, Printer, Calendar } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { DatePickerInput } from '../ui/DatePickerInput';
import type { CalendarEvent, TaskCategory } from '../../types/wedding-planner-types';
import tasksData from '../../data/wedding-tasks-data.json';

const categories: TaskCategory[] = tasksData.categories;
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateId() { return `ev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

export function PlanningCalendar() {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded, daysUntilWedding } = useWeddingDate();
  const [events, setEvents, eventsLoaded] = useLocalStorage<CalendarEvent[]>('wpc-calendar-events-v1', []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({ title: '', category: 'venue', time: '10:00' });
  const [toast, setToast] = useState('');
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = useMemo(() => {
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
  const goToday = () => setCurrentDate(new Date());

  const addEvent = () => {
    if (!newEvent.title?.trim() || !selectedDay) return;
    const event: CalendarEvent = {
      id: generateId(), title: newEvent.title!, date: selectedDay,
      time: newEvent.time || '', category: newEvent.category || 'venue', notes: newEvent.notes || ''
    };
    setEvents(prev => [...prev, event]);
    setNewEvent({ title: '', category: 'venue', time: '10:00' });
    setShowAddForm(false);
    showToast('Event added!');
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('Event removed');
  };

  const selectedDayEvents = selectedDay ? events.filter(e => e.date === selectedDay) : [];

  if (!dateLoaded || !eventsLoaded) {
    return <div className="max-w-4xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-96" /></div>;
  }

  if (!weddingDate) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Your Wedding Date</h2>
          <p className="text-sm text-slate-500 text-center">Enter your wedding date to start planning with the calendar.</p>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
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

      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Previous month"><ChevronLeft size={16} /></button>
          <h2 className="text-lg font-bold text-[#1A1A1A] min-w-[180px] text-center">{monthLabel}</h2>
          <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors" aria-label="Next month"><ChevronRight size={16} /></button>
        </div>
        <div className="flex gap-2">
          <button onClick={goToday} className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors">Today</button>
          {daysUntilWedding() > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-[#FCECF0] text-[#B76E79] text-xs font-bold">{daysUntilWedding()} days to go</span>
          )}
          <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-[#FCECF0] hover:text-[#B76E79] transition-colors print:hidden"><Printer size={14} /></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-3xl border border-[#F3E8EA] shadow-sm overflow-hidden">
          <div className="grid grid-cols-7">
            {DAYS.map(d => (<div key={d} className="py-2 text-center text-[11px] font-bold uppercase text-slate-400 bg-slate-50 border-b border-[#F3E8EA]">{d}</div>))}
            {days.map((day, i) => {
              if (day === null) return <div key={`e${i}`} className="h-20 bg-slate-50/50 border-b border-r border-[#F3E8EA]" />;
              const dayEvents = getEventsForDay(day);
              const dateStr = getDateStr(day);
              const selected = selectedDay === dateStr;
              return (
                <button key={i} onClick={() => { setSelectedDay(dateStr); setShowAddForm(false); }}
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
                {new Date(selectedDay + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-red-500"><X size={14} /></button>
            </div>

            {selectedDayEvents.length > 0 ? (
              <div className="space-y-2">
                {selectedDayEvents.map(e => {
                  const cat = categories.find(c => c.id === e.category);
                  return (
                    <div key={e.id} className="bg-slate-50 rounded-xl p-3 group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm text-[#1A1A1A]">{e.title}</p>
                          {e.time && <p className="text-xs text-slate-400">{e.time}</p>}
                          {cat && <span className="text-[10px] font-bold" style={{ color: cat.color }}>{cat.label}</span>}
                        </div>
                        <button onClick={() => deleteEvent(e.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"><X size={12} /></button>
                      </div>
                      {e.notes && <p className="text-xs text-slate-400 mt-1">{e.notes}</p>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">No events on this day</p>
            )}

            {showAddForm ? (
              <div className="space-y-3 border-t border-slate-100 pt-3">
                <input type="text" placeholder="Event title" value={newEvent.title || ''} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79]" autoFocus />
                <div className="grid grid-cols-2 gap-2">
                  <input type="time" value={newEvent.time || ''} onChange={e => setNewEvent(p => ({ ...p, time: e.target.value }))}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B76E79]" />
                  <select value={newEvent.category || 'venue'} onChange={e => setNewEvent(p => ({ ...p, category: e.target.value }))}
                    className="px-2 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#B76E79]">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={addEvent} className="flex-1 bg-[#B76E79] hover:bg-[#a25d66] text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors">Add</button>
                  <button onClick={() => setShowAddForm(false)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-500 hover:bg-slate-50">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAddForm(true)} className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-xs font-semibold text-slate-400 hover:border-[#B76E79] hover:text-[#B76E79] transition-colors">
                <Plus size={14} /> Add Event
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
