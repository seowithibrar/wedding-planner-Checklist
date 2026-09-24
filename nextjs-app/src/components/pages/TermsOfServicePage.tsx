import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';

export default function TermsOfServicePage({ lang = DEFAULT_LANGUAGE }: { lang?: string }) {
  const currentLang = (lang as SupportedLanguage) || DEFAULT_LANGUAGE;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header lang={currentLang} />

      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700 flex-grow">
        <h1 className="text-4xl font-bold text-[#1A1A1A]">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
        <div className="prose max-w-none space-y-4">
          <p>
            By accessing WeddingPlanningChecklists.org, you agree to comply with our usage guidelines and
            copyright terms.
          </p>
        </div>
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
