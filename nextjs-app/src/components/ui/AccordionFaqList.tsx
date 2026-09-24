'use client';

import React, { useState } from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

export function AccordionFaqList({ items, idPrefix = 'faq' }: { items: FaqItem[]; idPrefix?: string }) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (idx: number) => {
    setOpenIndices(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-3">
      {items.map((faq, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div key={idx} className="bg-white rounded-2xl border border-[#F3E8EA] shadow-sm overflow-hidden transition-all">
            <button
              type="button"
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer group hover:bg-slate-50/50"
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-body-${idx}`}
              id={`${idPrefix}-header-${idx}`}
              onClick={() => toggle(idx)}
            >
              <span className="font-bold text-xs sm:text-sm text-[#1A1A1A] pr-4 group-hover:text-[#B76E79] transition-colors flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-[10px] font-black shrink-0">Q</span>
                {faq.q}
              </span>
              <svg
                className={`w-4 h-4 text-[#B76E79] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div
                className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50"
                id={`${idPrefix}-body-${idx}`}
                role="region"
                aria-labelledby={`${idPrefix}-header-${idx}`}
              >
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
