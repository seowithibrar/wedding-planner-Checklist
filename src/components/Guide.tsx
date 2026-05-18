import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ListTodo, 
  Heart, 
  DollarSign, 
  Store, 
  FileText, 
  Info,
  ChevronDown,
  ArrowRight,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

import { LandingNav } from './LandingNav';

export function Guide({ onStart, onOpenGuide, onGoHome, onAbout }: { onStart: () => void; onOpenGuide: () => void; onGoHome: () => void; onAbout: () => void; }) {
  const sections = [
    {
      title: "12 Months Before",
      items: ["Set total wedding budget", "Decide guest count", "Define style/theme", "Book venue & date", "Book photographer/videographer"]
    },
    {
      title: "9 Months Before",
      items: ["Shop for wedding dress", "Hire florist & caterer", "Book cake designer", "Hire MUA & hair stylist", "Design save-the-dates"]
    },
    {
      title: "6 Months Before",
      items: ["Finalize guest list", "Order invitations", "Book honeymoon", "Plan rehearsal dinner", "Book wedding rentals"]
    }
  ];

  const faqs = [
    {
      q: "How far in advance should I start?",
      a: "Ideally the day after you get engaged. If your wedding is 12+ months away, you have a relaxed pace. If it's 6 months, start immediately."
    },
    {
      q: "What is the most important thing on a checklist?",
      a: "Booking your venue and date is the single most critical task. Everything else flows from that one decision."
    },
    {
      q: "Do I need a planner if I have a checklist?",
      a: "A checklist reduces dependence on a full planner, but a day-of coordinator is always recommended to manage the timeline so you can enjoy the day."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} />
      
      {/* Hero Section */}
      <section className="bg-rose-50/50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-[10px] font-bold text-rose-500 uppercase tracking-widest shadow-sm">
            <Heart size={12} fill="currentColor" />
            Complete Guide 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Wedding Planning Checklists: <br />
            <span className="text-rose-500">Stress-Free</span> Guide
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Plan your dream wedding without missing a single detail. From the first 12 months to the wedding morning.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-200"
            >
              Start Your Digital Checklist <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Article Content */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Intro Section */}
          <section className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Plan Your Dream Wedding Without Missing a Single Detail</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Planning a wedding is one of the most exciting journeys of your life — and one of the most overwhelming. With hundreds of tasks, dozens of vendors, and thousands of decisions to make, even the most organized couples can feel lost. That is exactly why having a well-structured wedding planning checklist is the single most important tool you can use from the moment you get engaged.
            </p>
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 my-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info size={20} className="text-rose-500" />
                Why You Need a Checklist
              </h3>
              <ul className="space-y-3">
                {["Avoid booking vendors too late", "Stay on top of budget tracking", "Never miss RSVP or payment deadlines", "Reduce stress in the final weeks"].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Timeline Section */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Month-by-Month Wedding Checklist</h2>
            <div className="space-y-8 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-px before:bg-slate-100">
              {/* 12 Months */}
              <div className="relative pl-20 group">
                <div className="absolute left-0 top-0 w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-rose-200 z-10">12</div>
                <div className="bg-white border border-slate-200 p-8 rounded-[32px] hover:border-rose-200 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tighter italic">Foundational Stage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-bold text-rose-500 text-xs uppercase tracking-widest">Budget & Vision</p>
                      <ul className="space-y-2 text-sm text-slate-500">
                        <li>• Set total wedding budget</li>
                        <li>• Decide guest count</li>
                        <li>• Define theme & style</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-rose-500 text-xs uppercase tracking-widest">Venue & Date</p>
                      <ul className="space-y-2 text-sm text-slate-500">
                        <li>• Visit & book venue</li>
                        <li>• Lock in official date</li>
                        <li>• Check local permits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9 Months */}
               <div className="relative pl-20 group">
                <div className="absolute left-0 top-0 w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-slate-100 z-10">9</div>
                <div className="bg-white border border-slate-200 p-8 rounded-[32px] hover:border-slate-300 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tighter italic">Vendor Selection</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 leading-relaxed italic">"Begin shopping for your wedding dress! Most custom gowns take 4-6 months to produce."</p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700 font-bold">
                      <li>Florist & Catering</li>
                      <li>Cake Designer</li>
                      <li>MUA & Hair Stylist</li>
                      <li>Save-the-dates</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6 Months */}
              <div className="relative pl-20 group">
                <div className="absolute left-0 top-0 w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black text-xl z-10 border-2 border-rose-100">6</div>
                <div className="bg-white border border-slate-200 p-8 rounded-[32px] hover:border-rose-100 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tighter italic">Communication & Setup</h3>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li>• Finalize guest list & order invitations</li>
                    <li>• Book honeymoon travel</li>
                    <li>• Plan rehearsal dinner</li>
                    <li>• Book wedding rentals (chairs, linens)</li>
                  </ul>
                </div>
              </div>

              {/* 1 Month */}
              <div className="relative pl-20 group">
                <div className="absolute left-0 top-0 w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center font-black text-xl z-10 border-2 border-emerald-100">1</div>
                <div className="bg-white border border-slate-200 p-8 rounded-[32px]">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tighter italic">Final Countdown</h3>
                  <div className="bg-emerald-50/50 p-4 rounded-xl text-xs text-emerald-700 font-medium mb-4">
                    Confirm all arrival times and attend dress alterations.
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 font-bold">
                    <li>✓ Obtain Marriage License</li>
                    <li>✓ Prepare emergency kit</li>
                    <li>✓ Break in shoes</li>
                    <li>✓ Delegate tasks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Bridal Kit Section */}
          <section className="bg-slate-900 text-white p-10 rounded-[48px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl" />
            <h2 className="text-3xl font-bold mb-8 relative z-10">Essential Bridal Emergency Kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-4">
                <h4 className="text-rose-400 font-bold uppercase tracking-widest text-xs">Beauty & Health</h4>
                <p className="text-sm text-slate-300">Lipstick, bobby pins, blotting papers, pain reliever, antacids, bandages.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-rose-400 font-bold uppercase tracking-widest text-xs">Wardrobe & Practical</h4>
                <p className="text-sm text-slate-300">Stain remover pen, fashion tape, safety pins, phone charger, cash, vendor list.</p>
              </div>
            </div>
          </section>

          {/* Budget Breakdown */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Budget Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { label: 'Venue & Catering', val: '40-45%' },
                 { label: 'Photo & Video', val: '10-12%' },
                 { label: 'Flowers & Decor', val: '8-10%' },
                 { label: 'Attire & Beauty', val: '7-11%' },
                 { label: 'Entertainment', val: '5-8%' },
                 { label: 'Buffer/Emergency', val: '5-10%' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <span className="font-bold text-slate-700">{item.label}</span>
                   <span className="text-rose-500 font-black">{item.val}</span>
                 </div>
               ))}
            </div>
            <p className="mt-6 text-sm text-slate-400 font-medium italic text-center text-balance px-4">
              *Pro Tip: Always keep a 5-10% buffer for unexpected costs like extra guest count or shipping fees.
            </p>
          </section>

          {/* FAQs */}
          <section className="space-y-6">
             <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
             {faqs.map((faq, i) => (
               <div key={i} className="p-6 bg-white border border-slate-200 rounded-[28px]">
                 <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                   <span className="w-6 h-6 bg-rose-100 text-rose-500 rounded-lg flex items-center justify-center text-xs">Q</span>
                   {faq.q}
                 </p>
                 <p className="text-slate-500 text-sm pl-8 leading-relaxed">{faq.a}</p>
               </div>
             ))}
          </section>

        </div>

        {/* Right: Sidebar / Sticky CTA */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
          
          {/* Download Box */}
          <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-[40px] shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Free PDF Checklist</h3>
            <p className="text-sm text-slate-500 text-center mb-6">Download our complete guide in a printable format for offline planning.</p>
            <button className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-4 rounded-3xl font-black text-sm hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200">
              <Download size={20} />
              Download Free PDF
            </button>
          </div>

          {/* App CTA */}
          <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            <h3 className="text-xl font-black mb-4">Planning Digitally?</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">Manage your guests, track costs, and book vendors in one smart dashboard.</p>
            <button 
              onClick={onStart}
              className="w-full bg-white text-slate-900 py-4 rounded-3xl font-black text-sm hover:bg-rose-500 hover:text-white transition-all shadow-xl"
            >
              Open Planning Tool
            </button>
          </div>

          {/* Keywords / Tags */}
          <div className="space-y-4 px-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Categories</p>
            <div className="flex flex-wrap gap-2">
              {['Timeline', 'Budget', 'Vendors', 'Guest List', 'RSVP', 'Wedding Kit'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold cursor-default hover:bg-rose-50 hover:text-rose-500 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Social Footer */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-bold text-slate-900">Start Planning Your Wedding Today — Stress-Free</h2>
          <p className="text-slate-500 font-medium">The difference between a stressful wedding planning experience and a joyful one comes down to one thing: organization.</p>
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-rose-500 text-white rounded-3xl font-black shadow-2xl shadow-rose-200 hover:scale-105 transition-transform"
          >
            Create Your Wedding Planner
          </button>
        </div>
      </section>
    </div>
  );
}
