import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LandingNavProps {
  onHome: () => void;
  onGuide: () => void;
  onStart: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onBlog: () => void;
  onContact: () => void;
}

export function LandingNav({ onHome, onGuide, onStart, onAbout, onPrivacy, onBlog, onContact }: LandingNavProps) {
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
          <a href="/" onClick={(e) => { e.preventDefault(); onHome(); }} className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Home</a>
          <a href="/about-us" onClick={(e) => { e.preventDefault(); onAbout(); }} className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">About Us</a>
          <a href="/guide" onClick={(e) => { e.preventDefault(); onGuide(); }} className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Wedding Planning Checklists</a>
          <a href="/blog" onClick={(e) => { e.preventDefault(); onBlog(); }} className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Blog</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); onContact(); }} className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Contact Us</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
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
              <a href="/" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onHome(); }} className="block text-left text-sm font-bold text-slate-500">Home</a>
              <a href="/about-us" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onAbout(); }} className="block text-left text-sm font-bold text-slate-500">About Us</a>
              <a href="/guide" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onGuide(); }} className="block text-left text-sm font-bold text-slate-500">Wedding Planning Checklists</a>
              <a href="/blog" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onBlog(); }} className="block text-left text-sm font-bold text-slate-500">Blog</a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onContact(); }} className="block text-left text-sm font-bold text-slate-500">Contact Us</a>
              
              <div className="pt-4 border-t border-slate-100 md:hidden">
                <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Select Language</p>
                <LanguageSwitcher />
              </div>

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
