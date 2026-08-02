import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  min?: string;
}

export function DatePickerInput({ value, onChange, label = 'Wedding Date', id = 'wedding-date', min }: DatePickerInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-wider text-[#B76E79] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          id={id}
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min || new Date().toISOString().split('T')[0]}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 transition-all"
        />
      </div>
    </div>
  );
}
