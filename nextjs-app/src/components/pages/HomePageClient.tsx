'use client';

import { useEffect } from 'react';

export default function HomePageClient() {
  useEffect(() => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.quick-task');
    const counter = document.getElementById('quick-counter');
    if (!checkboxes.length || !counter) return;

    const updateCount = () => {
      let completed = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) completed++;
      });
      counter.textContent = `${completed} of ${checkboxes.length} Completed`;
      if (completed === checkboxes.length) {
        counter.classList.remove('bg-[#FCECF0]', 'text-[#B76E79]');
        counter.classList.add('bg-emerald-100', 'text-emerald-800');
      } else {
        counter.classList.add('bg-[#FCECF0]', 'text-[#B76E79]');
        counter.classList.remove('bg-emerald-100', 'text-emerald-800');
      }
    };

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateCount);
    });

    return () => {
      checkboxes.forEach(cb => {
        cb.removeEventListener('change', updateCount);
      });
    };
  }, []);

  return null;
}
