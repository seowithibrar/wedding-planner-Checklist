import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { LandingNav } from './LandingNav';
import { Footer } from './Footer';

interface ContactProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onContact: () => void;
}

export function Contact({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onContact }: ContactProps) {
  useEffect(() => {
    document.title = "Contact Us | Wedding Planning Checklists";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with the Wedding Planning Checklists team for support or inquiries.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} onPrivacy={onPrivacy} onContact={onContact} />

      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-50/50 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Contact <span className="text-rose-500">Us</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            We're here to help make your wedding planning journey seamless.
          </p>
        </div>
      </section>

      <section className="pb-24 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-sm">
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart size={32} fill="currentColor" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Get In Touch</h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Have a question about our checklists or need support with your digital planner? We'd love to hear from you.
              </p>
              
              <div className="pt-8 space-y-4 text-left border-t border-slate-100 mt-8">
                <div>
                  <p className="font-bold text-slate-900">Email Address</p>
                  <p className="text-rose-500 font-medium">support@weddingplanningchecklists.org</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Business Inquiries</p>
                  <p className="text-rose-500 font-medium">hello@weddingplanningchecklists.org</p>
                </div>
              </div>
            </div>
          </div>
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
