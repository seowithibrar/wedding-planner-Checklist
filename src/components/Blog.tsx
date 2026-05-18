import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { LandingNav } from './LandingNav';

interface BlogProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onContact: () => void;
}

export function Blog({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onContact }: BlogProps) {
  useEffect(() => {
    document.title = "Blog | Wedding Planning Checklists";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the latest wedding planning tips, trends, and advice on our blog.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} onPrivacy={onPrivacy} onContact={onContact} />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-50/50 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Our <span className="text-rose-500">Blog</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Wedding planning tips, tricks, and inspiration to help you build the perfect day.
          </p>
        </div>
      </section>

      <section className="pb-24 border-b border-slate-100 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Coming Soon</h2>
          <p className="text-slate-500">We are currently writing amazing content for you. Check back later!</p>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onGoHome}>
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="text-lg font-black tracking-tight">Wedding Planner<span className="text-rose-500 ml-1">Checklists</span></span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onPrivacy(); }} className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); onTerms(); }} className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="/about-us" onClick={(e) => { e.preventDefault(); onAbout(); }} className="hover:text-slate-600 transition-colors">About Us</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); onContact(); }} className="hover:text-slate-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
