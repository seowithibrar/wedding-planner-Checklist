import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';
import { useTranslations } from '@/i18n/utils';

export default function ContactPage({ lang = DEFAULT_LANGUAGE }: { lang?: string }) {
  const currentLang = (lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const { common, pages } = useTranslations(currentLang);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header lang={currentLang} />

      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-grow">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A]">
            {(pages as any)?.contact?.heading || 'Contact Us'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {(pages as any)?.contact?.subheading ||
              'Have questions about our wedding checklists, interactive tools, or guides? We would love to hear from you.'}
          </p>
        </div>

        <form className="bg-white p-8 sm:p-10 rounded-3xl border border-[#F3E8EA] shadow-sm space-y-6 max-w-xl mx-auto">
          <div>
            <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Your Email</label>
            <input
              type="email"
              placeholder="jane@example.com"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="How can we help you?"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79] text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1A1A1A] hover:bg-[#B76E79] text-white p-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
