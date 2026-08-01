import React, { useState } from 'react';

export function TimelineGenerator() {
  const [ceremonyTime, setCeremonyTime] = useState<string>('16:00');

  // Simple day-of timeline calculation
  const getTimelineSteps = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);

    const format = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const makeupTime = new Date(date.getTime() - 5 * 60 * 60 * 1000);
    const photoTime = new Date(date.getTime() - 2 * 60 * 60 * 1000);
    const cocktailTime = new Date(date.getTime() + 1 * 60 * 60 * 1000);
    const dinnerTime = new Date(date.getTime() + 2 * 60 * 60 * 1000);

    return [
      { label: 'Hair & Makeup Start', time: format(makeupTime) },
      { label: 'First Look & Pre-Ceremony Photos', time: format(photoTime) },
      { label: 'Ceremony Begins', time: format(date) },
      { label: 'Cocktail Hour', time: format(cocktailTime) },
      { label: 'Reception Grand Entrance & Dinner', time: format(dinnerTime) },
    ];
  };

  const steps = getTimelineSteps(ceremonyTime);

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#F3E8EA] shadow-sm max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#1A1A1A] text-center">Day-of Timeline Generator</h2>
      <div>
        <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Select Ceremony Start Time</label>
        <input 
          type="time" 
          value={ceremonyTime} 
          onChange={(e) => setCeremonyTime(e.target.value)}
          className="w-full text-xl font-bold p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79]"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        {steps.map((step, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
            <span className="font-semibold text-slate-800 text-sm">{step.label}</span>
            <span className="bg-[#B76E79] text-white px-3 py-1 rounded-full text-xs font-bold">{step.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
