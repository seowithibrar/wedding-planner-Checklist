import React, { useState } from 'react';

export function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState<number>(30000);

  const venueCatering = Math.round(totalBudget * 0.45);
  const photoVideo = Math.round(totalBudget * 0.15);
  const attireBeauty = Math.round(totalBudget * 0.10);
  const flowersDecor = Math.round(totalBudget * 0.10);
  const musicEntertainment = Math.round(totalBudget * 0.10);
  const bufferEmergency = Math.round(totalBudget * 0.10);

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#F3E8EA] shadow-sm max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#1A1A1A] text-center">Interactive Wedding Budget Calculator</h2>
      <div>
        <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Total Wedding Budget ($USD)</label>
        <input 
          type="number" 
          value={totalBudget} 
          onChange={(e) => setTotalBudget(Number(e.target.value))}
          className="w-full text-2xl font-bold p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79]"
        />
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
        <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-semibold">
          <span>Venue & Catering (45%)</span>
          <span className="text-[#B76E79]">${venueCatering.toLocaleString()}</span>
        </div>
        <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-semibold">
          <span>Photography & Video (15%)</span>
          <span className="text-[#B76E79]">${photoVideo.toLocaleString()}</span>
        </div>
        <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-semibold">
          <span>Attire & Beauty (10%)</span>
          <span className="text-[#B76E79]">${attireBeauty.toLocaleString()}</span>
        </div>
        <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-semibold">
          <span>Flowers & Decor (10%)</span>
          <span className="text-[#B76E79]">${flowersDecor.toLocaleString()}</span>
        </div>
        <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-semibold">
          <span>Music & Entertainment (10%)</span>
          <span className="text-[#B76E79]">${musicEntertainment.toLocaleString()}</span>
        </div>
        <div className="flex justify-between p-3 bg-[#FCECF0] rounded-xl font-bold text-[#B76E79]">
          <span>Emergency Buffer (10%)</span>
          <span>${bufferEmergency.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
