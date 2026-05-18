import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { LandingNav } from './LandingNav';

interface TermsOfServiceProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onContact: () => void;
}

export function TermsOfService({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onContact }: TermsOfServiceProps) {
  useEffect(() => {
    document.title = "Terms of Service | Wedding Planning Checklists";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for Wedding Planning Checklists.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} onPrivacy={onPrivacy} onContact={onContact} />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-50/50 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
          </p>
        </div>
      </section>

      <section className="pb-24 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 space-y-12 text-slate-600">
          <div className="prose prose-slate prose-rose max-w-none prose-p:leading-relaxed prose-headings:text-slate-900 prose-a:text-rose-500 hover:prose-a:text-rose-600">
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Wedding Planning Checklists for personal, non-commercial transitory viewing only.</p>

            <h2 className="text-2xl font-bold mt-12 mb-4">3. Disclaimer</h2>
            <p>The materials on Wedding Planning Checklists's website are provided on an 'as is' basis. Wedding Planning Checklists makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </div>
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
