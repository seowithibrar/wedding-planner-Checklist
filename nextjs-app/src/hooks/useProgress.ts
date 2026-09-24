import { useMemo } from 'react';
import type { WeddingTask, ProgressStats } from '../types/wedding-planner-types';

export function useProgress(tasks: WeddingTask[]): ProgressStats {
  return useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const byCategory: ProgressStats['byCategory'] = {};
    tasks.forEach(t => {
      if (!byCategory[t.category]) {
        byCategory[t.category] = { total: 0, completed: 0, percentage: 0 };
      }
      byCategory[t.category].total++;
      if (t.completed) byCategory[t.category].completed++;
    });
    Object.keys(byCategory).forEach(cat => {
      const c = byCategory[cat];
      c.percentage = c.total > 0 ? Math.round((c.completed / c.total) * 100) : 0;
    });

    return { totalTasks, completedTasks, percentage, byCategory };
  }, [tasks]);
}
