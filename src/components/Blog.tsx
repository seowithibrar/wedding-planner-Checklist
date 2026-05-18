import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { LandingNav } from './LandingNav';
import { Footer } from './Footer';

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

      <Footer 
        onHome={onGoHome} 
        onAbout={onAbout} 
        onGuide={onOpenGuide} 
        onBlog={onBlog} 
        onContact={onContact} 
        onPrivacy={onPrivacy} 
        onTerms={onTerms} 
      />
    </div>
  );
}
