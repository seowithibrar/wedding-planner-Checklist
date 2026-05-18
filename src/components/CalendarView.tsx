import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock
} from 'lucide-react';
import type { Task } from '../App';
import { cn } from '../lib/utils';

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayTasks = (day: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.due), day));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Wedding Calendar</h2>
          <p className="text-slate-500 text-sm">Visualize your timeline and deadlines.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-2xl shadow-sm">
          <button 
            onClick={prevMonth}
            className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-4 text-sm font-bold min-w-[140px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button 
            onClick={nextMonth}
            className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 bg-slate-50/50 border-b border-slate-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-4 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayTasks = getDayTasks(day);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());

            return (
              <div 
                key={idx} 
                className={cn(
                  "min-h-[120px] p-2 border-r border-b border-slate-100 last:border-r-0 relative transition-colors hover:bg-slate-50/50",
                  !isCurrentMonth && "bg-slate-50/30"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full",
                    isToday ? "bg-rose-500 text-white shadow-md shadow-rose-200" : "text-slate-600",
                    !isCurrentMonth && "text-slate-300"
                  )}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                <div className="space-y-1">
                  {dayTasks.map(task => (
                    <div 
                      key={task.id}
                      className={cn(
                        "px-2 py-1 rounded-lg text-[10px] font-bold truncate border",
                        task.completed 
                          ? "bg-slate-50 text-slate-400 border-slate-100" 
                          : task.priority === 'high' 
                            ? "bg-rose-50 text-rose-600 border-rose-100" 
                            : task.priority === 'medium'
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      )}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6">
        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
          <CalendarIcon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900">Monthly View</h3>
          <p className="text-xs text-slate-500 font-medium">Click on a date to see detailed timeline or add new events.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}
