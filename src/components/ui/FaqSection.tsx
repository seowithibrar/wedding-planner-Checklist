import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  HelpCircle, 
  Calendar, 
  DollarSign, 
  Users, 
  Store, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  Mail, 
  Clock, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export interface FaqItemData {
  num: number;
  category: 'Timeline' | 'Budget' | 'Vendors' | 'Guests';
  q: string;
  a: string;
  icon: any;
}

const faqsData: FaqItemData[] = [
  {
    num: 1,
    category: 'Timeline',
    q: 'What is a wedding planning checklist?',
    a: 'A wedding planning checklist is a step-by-step guide that helps couples organize every stage of their wedding, from setting a budget and booking a venue to sending invitations and preparing for the wedding day. It ensures no important task is overlooked.',
    icon: CheckCircle2
  },
  {
    num: 2,
    category: 'Timeline',
    q: 'When should you start planning your wedding?',
    a: 'Most wedding experts recommend starting 12 to 18 months before your wedding date. This gives you enough time to book popular venues, hire vendors, manage your budget, and avoid last-minute stress.',
    icon: Calendar
  },
  {
    num: 3,
    category: 'Vendors',
    q: 'What should be booked first when planning a wedding?',
    a: 'Your wedding venue should be booked first because it determines your wedding date. Once your venue is confirmed, you can book photographers, caterers, florists, entertainment, and other vendors.',
    icon: Store
  },
  {
    num: 4,
    category: 'Budget',
    q: 'How much does a typical wedding cost?',
    a: 'Wedding costs vary depending on location, guest count, and style. Your budget should include venue, catering, photography, decorations, attire, entertainment, transportation, and an emergency fund for unexpected expenses.',
    icon: DollarSign
  },
  {
    num: 5,
    category: 'Vendors',
    q: 'Can I plan a wedding without hiring a wedding planner?',
    a: 'Yes. Many couples successfully plan their weddings using detailed checklists, budget trackers, timelines, and planning tools. A day-of coordinator can still be helpful for managing the event itself.',
    icon: ShieldCheck
  },
  {
    num: 6,
    category: 'Budget',
    q: 'What should a wedding budget include?',
    a: 'A complete wedding budget should include venue rental, food, beverages, photography, videography, decorations, flowers, invitations, wedding attire, entertainment, transportation, favors, taxes, gratuities, and a contingency budget.',
    icon: DollarSign
  },
  {
    num: 7,
    category: 'Guests',
    q: 'How do I create a wedding guest list?',
    a: 'Start with immediate family and close friends, then add extended family, colleagues, and acquaintances based on your venue capacity and overall budget. Prioritize guests who are most important to you as a couple.',
    icon: Users
  },
  {
    num: 8,
    category: 'Vendors',
    q: 'What vendors should I hire for my wedding?',
    a: 'Most weddings require a venue, photographer, videographer, caterer, florist, DJ or live band, officiant, hair and makeup artist, transportation service, baker, and rental company.',
    icon: Store
  },
  {
    num: 9,
    category: 'Guests',
    q: 'How far in advance should wedding invitations be sent?',
    a: 'Save-the-date cards are usually sent 6 to 8 months before the wedding. Formal invitations are typically mailed 6 to 8 weeks before the ceremony, allowing guests enough time to RSVP.',
    icon: Mail
  },
  {
    num: 10,
    category: 'Timeline',
    q: 'What is included in a printable wedding checklist?',
    a: 'A printable wedding checklist typically includes monthly planning tasks, vendor booking timelines, guest list management, budgeting, ceremony planning, reception planning, honeymoon preparation, and wedding day essentials.',
    icon: CheckCircle2
  },
  {
    num: 11,
    category: 'Timeline',
    q: 'How do I stay organized while planning a wedding?',
    a: 'Use a digital or printable wedding planner to track tasks, deadlines, budgets, vendor contracts, guest RSVPs, and payment schedules. Reviewing your checklist weekly helps keep everything on schedule.',
    icon: Clock
  },
  {
    num: 12,
    category: 'Vendors',
    q: 'What is the most stressful part of wedding planning?',
    a: 'Couples often find managing the budget, finalizing the guest list, coordinating multiple vendors, and meeting deadlines to be the most challenging aspects of wedding planning.',
    icon: HelpCircle
  },
  {
    num: 13,
    category: 'Guests',
    q: 'What should be in a bridal emergency kit?',
    a: 'A bridal emergency kit should include safety pins, fashion tape, stain remover, tissues, pain relievers, bandages, deodorant, lipstick, hairpins, sewing kit, snacks, water, phone charger, and mints.',
    icon: Sparkles
  },
  {
    num: 14,
    category: 'Budget',
    q: 'How can I save money when planning a wedding?',
    a: 'Set a realistic budget, prioritize essential expenses, reduce your guest count, compare vendor quotes, consider off-season dates, and choose DIY decorations where appropriate.',
    icon: DollarSign
  },
  {
    num: 15,
    category: 'Timeline',
    q: 'What should be done one month before the wedding?',
    a: 'Confirm vendor bookings, finalize seating arrangements, obtain your marriage license, complete dress fittings, prepare vendor payments, and create a detailed wedding day timeline.',
    icon: Calendar
  },
  {
    num: 16,
    category: 'Vendors',
    q: 'How do I choose the perfect wedding venue?',
    a: 'Consider your guest count, budget, wedding style, location, accessibility, available services, parking, weather backup options, and vendor flexibility before making your decision.',
    icon: MapPin
  },
  {
    num: 17,
    category: 'Guests',
    q: 'Is a wedding website necessary?',
    a: 'While not required, a wedding website makes it easy to share event details, RSVP information, travel recommendations, gift registries, schedules, and updates with guests.',
    icon: Mail
  },
  {
    num: 18,
    category: 'Timeline',
    q: 'How long does it take to plan a wedding?',
    a: 'Most weddings take between 12 and 18 months to plan, although smaller weddings or elopements can often be organized within 3 to 6 months with careful planning.',
    icon: Clock
  },
  {
    num: 19,
    category: 'Timeline',
    q: 'What happens if I have only six months to plan my wedding?',
    a: 'Focus first on booking your venue, photographer, caterer, and officiant. Simplify decorations, reduce DIY projects, and use a structured checklist to prioritize essential tasks.',
    icon: Clock
  },
  {
    num: 20,
    category: 'Timeline',
    q: 'Where can I find a free wedding planning checklist?',
    a: 'You can download a free wedding planning checklist from WeddingPlanningChecklists.org. It includes monthly timelines, budget planning, vendor checklists, guest list organization, and wedding day preparation resources.',
    icon: Heart
  }
];

const categories = [
  { id: 'All', label: 'All Questions' },
  { id: 'Timeline', label: 'Timeline & Planning' },
  { id: 'Budget', label: 'Budget & Costs' },
  { id: 'Vendors', label: 'Vendors & Venue' },
  { id: 'Guests', label: 'Invites & Guests' },
];

export function FaqSection() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [openIds, setOpenIds] = useState<number[]>([1]); // First item open by default

  const toggleItem = (num: number) => {
    setOpenIds(prev =>
      prev.includes(num) ? prev.filter(id => id !== num) : [...prev, num]
    );
  };

  const filteredFaqs = activeTab === 'All'
    ? faqsData
    : faqsData.filter(item => item.category === activeTab);

  return (
    <div className="max-w-[700px] mx-auto px-4 py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          These are the most commonly asked questions about wedding planning. Have a question? Reach out to our team.
        </p>
      </div>

      {/* Pill Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                isActive
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion List (Untitled UI style) */}
      <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 sm:p-8 shadow-sm divide-y divide-slate-100">
        {filteredFaqs.map(item => {
          const isOpen = openIds.includes(item.num);
          const Icon = item.icon;

          return (
            <div key={item.num} className="py-5 first:pt-0 last:pb-0 transition-colors">
              <button
                onClick={() => toggleItem(item.num)}
                className="w-full flex items-start justify-between gap-4 text-left group focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#B76E79] shrink-0 group-hover:bg-[#FCECF0] transition-colors mt-0.5">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors leading-snug">
                      {item.q}
                    </h3>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#B76E79] shrink-0 transition-all mt-1">
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#B76E79]' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pl-14 pr-4 pt-3 text-sm text-slate-600 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
