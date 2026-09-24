import { useLocalStorage } from './useLocalStorage';

const WEDDING_DATE_KEY = 'wpc-wedding-date-v1';

export function useWeddingDate() {
  const [weddingDate, setWeddingDate, isLoaded] = useLocalStorage<string>(WEDDING_DATE_KEY, '');

  const daysUntilWedding = (): number => {
    if (!weddingDate) return -1;
    const diff = new Date(weddingDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const monthsUntilWedding = (): number => {
    if (!weddingDate) return -1;
    const target = new Date(weddingDate);
    const now = new Date();
    return (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  };

  const getDateForMonthsBefore = (monthsBefore: number): Date => {
    if (!weddingDate) return new Date();
    const target = new Date(weddingDate);
    target.setMonth(target.getMonth() - monthsBefore);
    return target;
  };

  const isDateSet = (): boolean => !!weddingDate;

  return { weddingDate, setWeddingDate, isLoaded, daysUntilWedding, monthsUntilWedding, getDateForMonthsBefore, isDateSet };
}
