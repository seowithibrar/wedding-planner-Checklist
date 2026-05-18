import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingNavProps {
  onHome: () => void;
  onGuide: () => void;
  onStart: () => void;
}

export function LandingNav({ onHome, onGuide, onStart }: LandingNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
          <div className="w-9 h-9 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tight">Wedding Planner<span className="text-rose-500 ml-1">Checklists</span></span>
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={onHome} className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Home</button>
          <button className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">About Us</button>
          <button onClick={onGuide} className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Wedding Planning Checklists</button>
          <button className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Blog</button>
          <button className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Contact Us</button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onStart}
            className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-rose-500 transition-all shadow-lg shadow-slate-100"
          >
            Get Started
          </button>
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Sparkles size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              <button onClick={() => { setIsMenuOpen(false); onHome(); }} className="text-left text-sm font-bold text-slate-500">Home</button>
              <button className="text-left text-sm font-bold text-slate-500">About Us</button>
              <button onClick={() => { setIsMenuOpen(false); onGuide(); }} className="text-left text-sm font-bold text-slate-500">Wedding Planning Checklists</button>
              <button className="text-left text-sm font-bold text-slate-500">Blog</button>
              <button className="text-left text-sm font-bold text-slate-500">Contact Us</button>
              <button 
                onClick={onStart}
                className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-sm font-black"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
