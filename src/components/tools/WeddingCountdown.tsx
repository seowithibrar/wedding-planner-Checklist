import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, Calendar, Share2, Heart, Sparkles, Check, Copy, 
  Download, Palette, ArrowRight, ArrowLeft, RotateCcw, 
  MapPin, User, MessageCircle, Send, Globe, Mail
} from 'lucide-react';
import { useWeddingDate } from '../../hooks/useWeddingDate';
import { DatePickerInput } from '../ui/DatePickerInput';
import milestonesData from '../../data/wedding-milestones-data.json';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CardStyleId = 'blush' | 'champagne' | 'dark' | 'sage' | 'lavender' | 'minimal';

interface CardTheme {
  id: CardStyleId;
  name: string;
  bgGradient: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  subTextColor: string;
  numberBg: string;
  border: string;
  canvasBg: string;
  canvasCardBg: string;
  canvasText: string;
  canvasAccent: string;
  canvasSubText: string;
  canvasNumBg: string;
}

const CARD_THEMES: CardTheme[] = [
  {
    id: 'blush',
    name: 'Blush Rose Gold',
    bgGradient: 'from-[#FDF7F8] via-[#FCECF0] to-[#FFF5F7]',
    cardBg: 'bg-white',
    textColor: 'text-[#1A1A1A]',
    accentColor: 'text-[#B76E79]',
    subTextColor: 'text-slate-500',
    numberBg: 'bg-[#FCECF0]/60',
    border: 'border-[#F3E8EA]',
    canvasBg: '#FFF5F7',
    canvasCardBg: '#FFFFFF',
    canvasText: '#1A1A1A',
    canvasAccent: '#B76E79',
    canvasSubText: '#64748B',
    canvasNumBg: '#FCECF0'
  },
  {
    id: 'champagne',
    name: 'Champagne Gold',
    bgGradient: 'from-[#FCF9F2] via-[#FBF5E6] to-[#FAF1D6]',
    cardBg: 'bg-[#FDFBF7]',
    textColor: 'text-[#2D281E]',
    accentColor: 'text-[#B89035]',
    subTextColor: 'text-[#7D735F]',
    numberBg: 'bg-[#F5EDD6]/70',
    border: 'border-[#EADBBD]',
    canvasBg: '#FAF4E3',
    canvasCardBg: '#FDFBF7',
    canvasText: '#2D281E',
    canvasAccent: '#B89035',
    canvasSubText: '#7D735F',
    canvasNumBg: '#F5EDD6'
  },
  {
    id: 'dark',
    name: 'Midnight Luxe',
    bgGradient: 'from-[#1A1714] via-[#24201C] to-[#12100E]',
    cardBg: 'bg-[#221E1A]',
    textColor: 'text-[#F9F7F2]',
    accentColor: 'text-[#D4AF37]',
    subTextColor: 'text-[#A89F91]',
    numberBg: 'bg-[#2E2822]',
    border: 'border-[#3D352D]',
    canvasBg: '#151311',
    canvasCardBg: '#221E1A',
    canvasText: '#F9F7F2',
    canvasAccent: '#D4AF37',
    canvasSubText: '#A89F91',
    canvasNumBg: '#2E2822'
  },
  {
    id: 'sage',
    name: 'Eucalyptus Sage',
    bgGradient: 'from-[#F3F8F5] via-[#EAF2ED] to-[#E2EDE5]',
    cardBg: 'bg-white',
    textColor: 'text-[#1D2E24]',
    accentColor: 'text-[#3E7355]',
    subTextColor: 'text-[#647C6F]',
    numberBg: 'bg-[#E3EDE6]',
    border: 'border-[#D4E3D8]',
    canvasBg: '#EAF2ED',
    canvasCardBg: '#FFFFFF',
    canvasText: '#1D2E24',
    canvasAccent: '#3E7355',
    canvasSubText: '#647C6F',
    canvasNumBg: '#E3EDE6'
  },
  {
    id: 'lavender',
    name: 'Romantic Lilac',
    bgGradient: 'from-[#F8F5FA] via-[#F2EBF6] to-[#ECE1F1]',
    cardBg: 'bg-white',
    textColor: 'text-[#281A33]',
    accentColor: 'text-[#884D9E]',
    subTextColor: 'text-[#73637E]',
    numberBg: 'bg-[#EFE5F5]',
    border: 'border-[#E0D2E7]',
    canvasBg: '#F2EBF6',
    canvasCardBg: '#FFFFFF',
    canvasText: '#281A33',
    canvasAccent: '#884D9E',
    canvasSubText: '#73637E',
    canvasNumBg: '#EFE5F5'
  },
  {
    id: 'minimal',
    name: 'Classic Minimalist',
    bgGradient: 'from-slate-50 via-slate-100/60 to-slate-50',
    cardBg: 'bg-white',
    textColor: 'text-[#1A1A1A]',
    accentColor: 'text-slate-900',
    subTextColor: 'text-slate-500',
    numberBg: 'bg-slate-100',
    border: 'border-slate-200',
    canvasBg: '#F8FAFC',
    canvasCardBg: '#FFFFFF',
    canvasText: '#0F172A',
    canvasAccent: '#0F172A',
    canvasSubText: '#64748B',
    canvasNumBg: '#F1F5F9'
  }
];

export function WeddingCountdown({ lang }: { lang?: string } = {}) {
  const { weddingDate, setWeddingDate, isLoaded: dateLoaded } = useWeddingDate();
  
  // Couple & Event Details State
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [venue, setVenue] = useState('');
  
  // Navigation & Settings State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedStyle, setSelectedStyle] = useState<CardStyleId>('blush');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Hidden Canvas Reference for image export
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Read URL query params on initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const qDate = params.get('date') || params.get('d');
    const qP1 = params.get('p1') || params.get('partner1');
    const qP2 = params.get('p2') || params.get('partner2');
    const qVenue = params.get('venue') || params.get('v');
    const qStyle = params.get('style') as CardStyleId | null;

    if (qDate) {
      setWeddingDate(qDate);
    }
    if (qP1) setPartner1(qP1);
    if (qP2) setPartner2(qP2);
    if (qVenue) setVenue(qVenue);
    if (qStyle && CARD_THEMES.some(t => t.id === qStyle)) {
      setSelectedStyle(qStyle);
    }

    // If query params are provided or date is already saved, jump to live countdown
    if (qDate || (qP1 && qP2)) {
      setStep(2);
    } else {
      // Check localStorage for names
      try {
        const storedP1 = localStorage.getItem('wpc_partner1');
        const storedP2 = localStorage.getItem('wpc_partner2');
        const storedVenue = localStorage.getItem('wpc_venue');
        if (storedP1) setPartner1(storedP1);
        if (storedP2) setPartner2(storedP2);
        if (storedVenue) setVenue(storedVenue);
        if (weddingDate) setStep(2);
      } catch { /* ignore */ }
    }
  }, [dateLoaded]);

  // Save couple details to localStorage when changed
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (partner1) localStorage.setItem('wpc_partner1', partner1);
      if (partner2) localStorage.setItem('wpc_partner2', partner2);
      if (venue) localStorage.setItem('wpc_venue', venue);
    } catch { /* ignore */ }
  }, [partner1, partner2, venue]);

  // Live countdown calculation
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

  // Calculate Saturdays left
  const saturdaysLeft = useMemo(() => {
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

  // Get upcoming milestone from data
  const upcomingMilestone = useMemo(() => {
    if (!weddingDate) return null;
    const nowMonths = (new Date(weddingDate + 'T00:00:00').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    return milestonesData.milestones.find(m => m.monthsBefore <= nowMonths + 1 && m.monthsBefore >= nowMonths - 2) || milestonesData.milestones[0];
  }, [weddingDate]);

  // Current active theme
  const currentTheme = useMemo(() => {
    return CARD_THEMES.find(t => t.id === selectedStyle) || CARD_THEMES[0];
  }, [selectedStyle]);

  // Formatted date string
  const formattedDate = useMemo(() => {
    if (!weddingDate) return 'Your Big Day';
    try {
      return new Date(weddingDate + 'T12:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return weddingDate;
    }
  }, [weddingDate]);

  // Couple display name
  const coupleName = useMemo(() => {
    if (partner1 && partner2) return `${partner1} & ${partner2}`;
    if (partner1) return partner1;
    if (partner2) return partner2;
    return 'Our Wedding';
  }, [partner1, partner2]);

  // Generate shareable URL with parameters
  const shareableUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const base = `${window.location.origin}/tools/wedding-countdown`;
    const params = new URLSearchParams();
    if (weddingDate) params.set('date', weddingDate);
    if (partner1) params.set('p1', partner1);
    if (partner2) params.set('p2', partner2);
    if (venue) params.set('venue', venue);
    if (selectedStyle && selectedStyle !== 'blush') params.set('style', selectedStyle);
    return `${base}?${params.toString()}`;
  }, [weddingDate, partner1, partner2, venue, selectedStyle]);

  // Copy shareable link
  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Social share intent URLs
  const shareText = `💍 We're counting down to our wedding! ${timeLeft.days} days, ${timeLeft.hours} hours until our big day! Track our countdown here:`;
  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareableUrl}`)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareableUrl)}`;
  const shareEmail = `mailto:?subject=${encodeURIComponent(`Wedding Countdown: ${coupleName}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareableUrl}`)}`;

  // Download high-res PNG image via HTML5 Canvas
  const downloadCardImage = () => {
    setIsDownloading(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsDownloading(false);
      return;
    }

    const t = currentTheme;

    // 1. Background Fill
    ctx.fillStyle = t.canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative background arches/glow
    ctx.beginPath();
    ctx.arc(540, 200, 360, 0, Math.PI * 2);
    ctx.fillStyle = t.canvasNumBg;
    ctx.fill();

    // 2. Main Card Container
    const cardX = 90;
    const cardY = 220;
    const cardW = 900;
    const cardH = 1480;
    const radius = 48;

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;

    // Card shape
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fillStyle = t.canvasCardBg;
    ctx.fill();
    ctx.restore();

    // Border
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.strokeStyle = t.canvasAccent;
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Top Ribbon / Icon
    ctx.font = '54px serif';
    ctx.textAlign = 'center';
    ctx.fillText('💍', 540, cardY + 110);

    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = t.canvasAccent;
    ctx.fillText('OUR WEDDING COUNTDOWN', 540, cardY + 180);

    // 4. Couple Names
    ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
    ctx.fillStyle = t.canvasText;
    ctx.fillText(coupleName, 540, cardY + 280);

    // 5. Wedding Date & Venue
    ctx.font = '500 34px sans-serif';
    ctx.fillStyle = t.canvasSubText;
    ctx.fillText(formattedDate, 540, cardY + 350);

    if (venue) {
      ctx.font = 'italic 30px sans-serif';
      ctx.fillStyle = t.canvasAccent;
      ctx.fillText(`📍 ${venue}`, 540, cardY + 410);
    }

    // Divider Line
    ctx.beginPath();
    ctx.moveTo( cardX + 100, cardY + 460 );
    ctx.lineTo( cardX + cardW - 100, cardY + 460 );
    ctx.strokeStyle = t.canvasNumBg;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 6. Countdown Digits Grid
    const startY = cardY + 540;
    const units = [
      { label: 'DAYS', val: timeLeft.days },
      { label: 'HOURS', val: timeLeft.hours },
      { label: 'MINUTES', val: timeLeft.minutes },
      { label: 'SECONDS', val: timeLeft.seconds }
    ];

    const boxW = 340;
    const boxH = 180;
    const gapX = 40;
    const gapY = 30;

    units.forEach((u, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const bx = cardX + 90 + col * (boxW + gapX);
      const by = startY + row * (boxH + gapY);

      // Unit box
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 24);
      ctx.fillStyle = t.canvasNumBg;
      ctx.fill();

      // Number
      ctx.font = 'bold 74px monospace, sans-serif';
      ctx.fillStyle = t.canvasAccent;
      ctx.textAlign = 'center';
      ctx.fillText(String(u.val).padStart(2, '0'), bx + boxW / 2, by + 105);

      // Label
      ctx.font = 'bold 22px sans-serif';
      ctx.fillStyle = t.canvasSubText;
      ctx.fillText(u.label, bx + boxW / 2, by + 150);
    });

    // 7. Saturdays Counter Highlight
    const satY = startY + (boxH * 2) + gapY + 50;
    ctx.beginPath();
    ctx.roundRect(cardX + 90, satY, 720, 100, 24);
    ctx.fillStyle = t.canvasNumBg;
    ctx.fill();

    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = t.canvasAccent;
    ctx.textAlign = 'center';
    ctx.fillText(`🗓️ ${saturdaysLeft} Saturdays left to plan!`, 540, satY + 62);

    // 8. Bottom Branding Watermark
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = t.canvasSubText;
    ctx.fillText('Created with WeddingPlanningChecklists.org', 540, cardY + cardH - 60);

    // Trigger download
    setTimeout(() => {
      try {
        const link = document.createElement('a');
        const cleanName = (coupleName || 'wedding-countdown').toLowerCase().replace(/[^a-z0-9]/g, '-');
        link.download = `${cleanName}-countdown.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (e) {
        console.error('Download error:', e);
      } finally {
        setIsDownloading(false);
      }
    }, 150);
  };

  const isToday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && weddingDate;

  if (!dateLoaded) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="bg-white rounded-3xl border border-[#F3E8EA] p-8 h-80" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* 4-Step Navigation Tab Bar */}
      <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-[#F3E8EA] shadow-sm flex items-center justify-between gap-1 overflow-x-auto">
        {[
          { num: 1, label: 'Your Details', icon: User },
          { num: 2, label: 'Live Countdown', icon: Timer },
          { num: 3, label: 'Card & Download', icon: Palette },
          { num: 4, label: 'Share Link', icon: Share2 },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = step === item.num;
          const isPassed = step > item.num;
          return (
            <button
              key={item.num}
              onClick={() => {
                if (item.num === 1 || weddingDate) {
                  setStep(item.num as 1 | 2 | 3 | 4);
                }
              }}
              disabled={item.num > 1 && !weddingDate}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                isActive
                  ? 'bg-[#B76E79] text-white shadow-md'
                  : isPassed
                  ? 'bg-[#FCECF0] text-[#B76E79] hover:bg-[#FCECF0]/80'
                  : 'text-slate-400 hover:text-slate-700 disabled:opacity-40 disabled:hover:text-slate-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                isActive ? 'bg-white/20 text-white' : isPassed ? 'bg-[#B76E79] text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {isPassed ? '✓' : item.num}
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tool Content Container */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 sm:p-10 shadow-sm relative overflow-hidden">
        
        {/* STEP 1: Details & Setup */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Form Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B76E79]">Step 1 of 4</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                  Who is getting married, and when?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Enter your names and wedding date. Your live personalized countdown and shareable card are ready in seconds.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Partner 1 Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Sarah"
                        value={partner1}
                        onChange={(e) => setPartner1(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Partner 2 Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Michael"
                        value={partner2}
                        onChange={(e) => setPartner2(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Wedding Date</label>
                  <DatePickerInput
                    value={weddingDate}
                    onChange={(val) => setWeddingDate(val)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Wedding Venue / City <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. The Glasshouse, New York"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 outline-none text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!weddingDate}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#B76E79] hover:bg-[#a25d66] text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Start My Countdown <ArrowRight size={16} />
                </button>
                {!weddingDate && (
                  <p className="text-xs text-rose-500 mt-2">Please select your wedding date to continue.</p>
                )}
              </div>
            </div>

            {/* Live Mobile Mockup Preview Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 relative">
                {/* Speaker notch */}
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
                
                {/* Phone screen preview */}
                <div className={`rounded-[28px] p-5 text-center space-y-4 bg-gradient-to-b ${currentTheme.bgGradient} border ${currentTheme.border} min-h-[440px] flex flex-col justify-between`}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E79] block">
                      Live Preview
                    </span>
                    <h3 className="text-lg font-black text-[#1A1A1A] truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {coupleName}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">{formattedDate}</p>
                    {venue && <p className="text-[10px] text-[#B76E79] font-medium truncate">📍 {venue}</p>}
                  </div>

                  {/* Digits Grid Preview */}
                  <div className="grid grid-cols-2 gap-2 my-auto">
                    {[
                      { l: 'Days', v: timeLeft.days },
                      { l: 'Hours', v: timeLeft.hours },
                      { l: 'Mins', v: timeLeft.minutes },
                      { l: 'Secs', v: timeLeft.seconds },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-2.5 border border-white/60 shadow-xs">
                        <span className="text-xl font-black text-[#B76E79] font-mono block">
                          {weddingDate ? String(item.v).padStart(2, '0') : '--'}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{item.l}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/70 rounded-xl p-2 text-[10px] font-bold text-slate-600 border border-white">
                    🗓️ {weddingDate ? `${saturdaysLeft} Saturdays left` : 'Set date to calculate'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: Live Countdown Screen */}
        {step === 2 && (
          <div className="space-y-8 text-center">
            {isToday ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-[#FCECF0] via-white to-[#FFF5F7] rounded-3xl p-10 border border-[#B76E79]/30 shadow-xl space-y-4">
                <div className="text-6xl animate-bounce">💍</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#B76E79]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Today is Your Big Day!
                </h2>
                <p className="text-slate-700 text-base max-w-lg mx-auto">
                  Congratulations {coupleName}! Cherish every moment, smile at every toast, and celebrate your love together.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {/* Header Information */}
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#FCECF0] text-[#B76E79] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Sparkles size={14} /> Counting Down To
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {coupleName}
                  </h2>
                  <p className="text-sm sm:text-base font-medium text-slate-600">
                    {formattedDate} {venue && <span className="text-[#B76E79]">• 📍 {venue}</span>}
                  </p>
                </div>

                {/* Big Live Ticking Numbers Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {[
                    { label: 'Days Left', val: timeLeft.days },
                    { label: 'Hours', val: timeLeft.hours },
                    { label: 'Minutes', val: timeLeft.minutes },
                    { label: 'Seconds', val: timeLeft.seconds },
                  ].map((unit, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-b from-[#FCECF0]/50 to-slate-50 rounded-2xl border border-[#F3E8EA] p-5 sm:p-6 shadow-sm relative overflow-hidden group hover:border-[#B76E79]/40 transition-all"
                    >
                      <span className="text-4xl sm:text-6xl font-black text-[#B76E79] font-mono tracking-tight block">
                        {String(unit.val).padStart(2, '0')}
                      </span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Supporting Planning Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#FCECF0] flex items-center justify-center text-[#B76E79] shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Planning Weekends</p>
                      <p className="text-base sm:text-lg font-extrabold text-[#1A1A1A]">
                        {saturdaysLeft} Saturdays left to plan
                      </p>
                    </div>
                  </div>

                  {upcomingMilestone && (
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#FCECF0] flex items-center justify-center text-[#B76E79] shrink-0">
                        <Heart size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Focus</p>
                        <p className="text-sm sm:text-base font-extrabold text-[#1A1A1A] truncate">
                          {upcomingMilestone.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Action Navigation Bar */}
                <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#B76E79] hover:bg-[#a25d66] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    <Palette size={16} /> Choose Card Style & Download
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    <Share2 size={16} /> Share Countdown Link
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw size={14} /> Edit Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Card Styles & Canvas Image Download */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B76E79]">Step 3 of 4</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                Customize & Download Your Card
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose an aesthetic card style, then download a high-resolution story image to post on Instagram, Pinterest, or group chats.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Style Selection Controls */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Select Theme Palette (6 Styles)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {CARD_THEMES.map((theme) => {
                    const isSelected = selectedStyle === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedStyle(theme.id)}
                        className={`p-4 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? 'border-[#B76E79] ring-2 ring-[#B76E79]/20 shadow-md bg-white'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: theme.canvasAccent }} />
                          {isSelected && <span className="text-xs text-[#B76E79] font-black">✓</span>}
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-[#1A1A1A]">{theme.name}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Download CTA Button */}
                <div className="pt-4 space-y-3">
                  <button
                    onClick={downloadCardImage}
                    disabled={isDownloading}
                    className="w-full py-4 bg-[#B76E79] hover:bg-[#a25d66] text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 text-sm"
                  >
                    <Download size={18} />
                    {isDownloading ? 'Generating High-Res Image...' : 'Download Free Story Card (.PNG)'}
                  </button>
                  <p className="text-center text-[11px] text-slate-400">
                    High-resolution 1080×1920 story image ready for Instagram, WhatsApp status, and printing.
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Back to Live Clock
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="text-xs text-[#B76E79] hover:underline font-bold flex items-center gap-1"
                  >
                    Go to Share Link <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Rendered Live Card Preview in Phone Frame */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-[340px] bg-slate-900 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800">
                  <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
                  
                  {/* Dynamic Themed Card */}
                  <div className={`rounded-[32px] p-6 text-center space-y-5 bg-gradient-to-b ${currentTheme.bgGradient} border ${currentTheme.border} min-h-[500px] flex flex-col justify-between shadow-inner`}>
                    
                    <div className="space-y-1">
                      <div className="text-3xl mb-1">💍</div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${currentTheme.accentColor} block`}>
                        OUR WEDDING COUNTDOWN
                      </span>
                      <h3 className={`text-2xl font-black ${currentTheme.textColor}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                        {coupleName}
                      </h3>
                      <p className={`text-xs ${currentTheme.subTextColor}`}>{formattedDate}</p>
                      {venue && <p className={`text-[11px] font-semibold ${currentTheme.accentColor}`}>📍 {venue}</p>}
                    </div>

                    {/* Digits Grid */}
                    <div className="grid grid-cols-2 gap-2.5 my-auto">
                      {[
                        { l: 'DAYS', v: timeLeft.days },
                        { l: 'HOURS', v: timeLeft.hours },
                        { l: 'MINUTES', v: timeLeft.minutes },
                        { l: 'SECONDS', v: timeLeft.seconds },
                      ].map((item, idx) => (
                        <div key={idx} className={`${currentTheme.cardBg} rounded-2xl p-3.5 border ${currentTheme.border} shadow-xs`}>
                          <span className={`text-2xl sm:text-3xl font-black ${currentTheme.accentColor} font-mono block`}>
                            {String(item.v).padStart(2, '0')}
                          </span>
                          <span className={`text-[9px] font-bold ${currentTheme.subTextColor} uppercase tracking-wider`}>
                            {item.l}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className={`${currentTheme.numberBg} rounded-xl p-2.5 text-xs font-bold ${currentTheme.accentColor}`}>
                        🗓️ {saturdaysLeft} Saturdays to go!
                      </div>
                      <p className={`text-[9px] font-semibold ${currentTheme.subTextColor}`}>
                        weddingplanningchecklists.org
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: Shareable Link & Socials */}
        {step === 4 && (
          <div className="space-y-8 max-w-2xl mx-auto text-center">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B76E79]">Step 4 of 4</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                Share Your Countdown
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Anyone with this link will see your personalized wedding countdown timer automatically without configuring anything!
              </p>
            </div>

            {/* Generated Link Box */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="bg-transparent flex-1 text-xs text-slate-700 px-3 py-2 outline-none font-mono truncate"
              />
              <button
                onClick={copyShareLink}
                className="px-5 py-2.5 bg-[#B76E79] hover:bg-[#a25d66] text-white rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            {/* Direct Social Media Share Buttons */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Instant Share Options
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href={shareWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={shareFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Globe size={16} /> Facebook
                </a>
                <a
                  href={shareTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900/10 hover:bg-slate-900/20 border border-slate-900/20 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Send size={16} /> X / Twitter
                </a>
                <a
                  href={shareEmail}
                  className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Mail size={16} /> Email
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back to Live Clock
              </button>
              <button
                onClick={() => setStep(3)}
                className="text-xs text-[#B76E79] hover:underline font-bold flex items-center gap-1"
              >
                <Palette size={14} /> Customize Card Styles
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
