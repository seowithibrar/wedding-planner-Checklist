import React from 'react';
import { Heart, Mail, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onHome: () => void;
  onAbout: () => void;
  onGuide: () => void;
  onBlog: () => void;
  onContact: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
}

export function Footer({ onHome, onAbout, onGuide, onBlog, onContact, onPrivacy, onTerms }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); onHome(); }}>
              <img src="/logo.png" alt="Wedding Planning Checklists" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your ultimate companion for stress-free wedding planning. We provide couples with the tools, timelines, and templates they need to organize their dream wedding flawlessly.
            </p>
            <div className="flex gap-4">
              {/* Placeholder social icons */}
              {['Twitter', 'Instagram', 'Pinterest'].map((social) => (
                <div key={social} className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 hover:bg-rose-100 hover:text-rose-500 cursor-pointer transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Platform</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/" onClick={(e) => { e.preventDefault(); onHome(); }} className="hover:text-rose-500 transition-colors">Home</a></li>
              <li><a href="/guide" onClick={(e) => { e.preventDefault(); onGuide(); }} className="hover:text-rose-500 transition-colors">Checklists & Tools</a></li>
              <li><a href="/about-us" onClick={(e) => { e.preventDefault(); onAbout(); }} className="hover:text-rose-500 transition-colors">About Us</a></li>
              <li><a href="/blog" onClick={(e) => { e.preventDefault(); onBlog(); }} className="hover:text-rose-500 transition-colors">Wedding Blog</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Support & Legal</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); onContact(); }} className="hover:text-rose-500 transition-colors">Contact Us</a></li>
              <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onPrivacy(); }} className="hover:text-rose-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" onClick={(e) => { e.preventDefault(); onTerms(); }} className="hover:text-rose-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Get In Touch</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>support@weddingplanningchecklists.org</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Available worldwide for your planning needs.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Always free, always organized.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-400">
          <p>© {currentYear} Wedding Planning Checklists. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-rose-500 mx-1" fill="currentColor" /> for couples everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
