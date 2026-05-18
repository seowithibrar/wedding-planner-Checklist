import React from 'react';
import { 
  Heart, 
  CheckCircle2, 
  Users, 
  Calendar, 
  BarChart3, 
  Store,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import { LandingNav } from './LandingNav';

interface LandingPageProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  couple: { partner1: string; partner2: string };
}

export function LandingPage({ onStart, onOpenGuide, onGoHome, couple }: LandingPageProps) {

  const features = [
    {
      title: 'Smart Checklist',
      description: 'Manage every detail with our priority-sorted task manager.',
      icon: CheckCircle2,
      color: 'bg-rose-50 text-rose-500'
    },
    {
      title: 'Guest List',
      description: 'Keep track of RSVPs, dietary needs, and plus-ones easily.',
      icon: Users,
      color: 'bg-blue-50 text-blue-500'
    },
    {
      title: 'Budget Tracker',
      description: 'Never overspend with real-time allocation and tracking.',
      icon: BarChart3,
      color: 'bg-emerald-50 text-emerald-500'
    },
    {
      title: 'Vendor Marketplace',
      description: 'Book and manage your favorite vendors in one place.',
      icon: Store,
      color: 'bg-amber-50 text-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles size={14} />
              The Ultimate Planning Experience
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              Planning your <span className="text-rose-500 underline decoration-rose-200 underline-offset-8">Perfect Day</span> is now easy.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 font-medium leading-relaxed"
            >
              Welcome, {couple.partner1} & {couple.partner2}. We\'ve built a dedicated suite of tools to help you manage your guest list, tracks budgets, and book vendors without the stress.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button 
                onClick={onStart}
                className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Start Planning Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-colors">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Your Planning Command Center</h2>
            <p className="text-slate-500 font-medium">Everything you need to orchestrate the wedding of your dreams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.color)}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-rose-500 rounded-[48px] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-2xl space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Join 10,000+ couples planning their dream wedding with us.</h2>
              <div className="flex gap-12">
                <div>
                  <p className="text-3xl font-bold">120k+</p>
                  <p className="text-rose-100 text-sm font-medium">Tasks Completed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50k+</p>
                  <p className="text-rose-100 text-sm font-medium">Guests Managed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">$20M+</p>
                  <p className="text-rose-100 text-sm font-medium">Budgets Saved</p>
                </div>
              </div>
              <button 
                onClick={onStart}
                className="bg-white text-rose-500 px-8 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-colors shadow-lg"
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="text-lg font-black tracking-tight">Wedding Planner<span className="text-rose-500 ml-1">Checklists</span></span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
