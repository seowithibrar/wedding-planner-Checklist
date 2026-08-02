import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Timer, Calendar, Share2, Heart, Sparkles, Check } from 'lucide-react';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { DatePickerInput } from '../ui/DatePickerInput';
import milestonesData from '../../data/wedding-milestones-data.json';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function WeddingCountdown() {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded } = useWeddingDate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!weddingDate) return;

    const calculate = () => {
      const target = new Date(weddingDate + 'T00:00:00').getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const SaturdaysLeft = useMemo(() => {
    if (!weddingDate) return 0;
    let count = 0;
    const cur = new Date();
    const target = new Date(weddingDate + 'T00:00:00');
    while (cur < target) {
      if (cur.getDay() === 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  }, [weddingDate]);

  const upcomingMilestone = useMemo(() => {
    if (!weddingDate) return null;
    const nowMonths = (new Date(weddingDate + 'T00:00:00').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    return milestonesData.milestones.find(m => m.monthsBefore <= nowMonths + 1 && m.monthsBefore >= nowMonths - 2) || milestonesData.milestones[0];
  }, [weddingDate]);

  const copyShare = async () => {
    const text = `💍 We're counting down to our wedding! ${timeLeft.days} days, ${timeLeft.hours} hours until our big day! Plan your wedding at WeddingPlanningChecklists.org`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* ignore */ }
  };

  if (!dateLoaded) {
    return <div className="max-w-3xl mx-auto animate-pulse"><div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-64" /></div>;
  }

  if (!weddingDate) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center">Set Your Wedding Date</h2>
          <p className="text-sm text-slate-500 text-center">Enter your wedding date to start your live countdown timer!</p>
          <DatePickerInput value={weddingDate} onChange={setWeddingDate} />
        </div>
      </div>
    );
  }

  const isToday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0;

  return (
    <div className="space-y-8 max-w-3xl mx-auto text-center">
      {isToday ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-[#FCECF0] via-white to-[#FFF5F7] rounded-3xl p-12 border border-[#B76E79]/30 shadow-xl space-y-4">
          <div className="text-6xl animate-bounce">💍</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#B76E79]">Today is Your Wedding Day!</h2>
          <p className="text-slate-600 text-base">Congratulations! Enjoy every magical moment of your special day.</p>
        </motion.div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-[#FCECF0] text-[#B76E79] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Counting Down To
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              {new Date(weddingDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
          </div>

          {/* Countdown Clock Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map((unit, idx) => (
              <div key={idx} className="bg-gradient-to-b from-[#FCECF0]/40 to-slate-50 rounded-2xl border border-[#F3E8EA] p-5 shadow-sm">
                <span className="text-4xl sm:text-5xl font-black text-[#B76E79] font-mono tracking-tight">{String(unit.val).padStart(2, '0')}</span>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">{unit.label}</span>
              </div>
            ))}
          </div>

          {/* Fun Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCECF0] flex items-center justify-center text-[#B76E79] shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Saturdays Left</p>
                <p className="text-lg font-extrabold text-[#1A1A1A]">{SaturdaysLeft} Saturdays to go</p>
              </div>
            </div>
            {upcomingMilestone && (
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCECF0] flex items-center justify-center text-[#B76E79] shrink-0">
                  <Heart size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Upcoming Focus</p>
                  <p className="text-sm font-bold text-[#1A1A1A] truncate">{upcomingMilestone.title}</p>
                </div>
              </div>
            )}
          </div>

          {/* Share CTA */}
          <div className="pt-2 flex justify-center">
            <button onClick={copyShare} className="flex items-center gap-2 bg-[#B76E79] hover:bg-[#a25d66] text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-md">
              {copied ? <Check size={14} /> : <Share2 size={14} />} {copied ? 'Copied to Clipboard!' : 'Share Countdown'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
