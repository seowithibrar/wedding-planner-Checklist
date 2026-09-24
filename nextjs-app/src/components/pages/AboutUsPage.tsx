import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';
import { useTranslations } from '@/i18n/utils';

export default function AboutUsPage({ lang = DEFAULT_LANGUAGE }: { lang?: string }) {
  const currentLang = (lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const { common } = useTranslations(currentLang);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header lang={currentLang} />

      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-grow">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A]">
            About Wedding Planning Checklists
          </h1>
        </div>

        <div className="prose prose-lg prose-rose max-w-none text-slate-700 leading-relaxed bg-white p-8 rounded-3xl border border-[#F3E8EA] shadow-sm">
          <p className="text-sm font-semibold text-slate-500 mb-4">Last Updated: September 6, 2026</p>
          <p>
            WeddingPlanningChecklists.org was created with a single objective: to take the stress out of
            wedding planning by providing free, highly detailed, and actionable checklists for engaged
            couples worldwide. We believe that everyone deserves to have their dream wedding, regardless of
            their budget or timeline, and that starts with having the right organizational tools at your
            fingertips.
          </p>
          <p>
            From 18-month timelines and vendor contract guides to budget calculators and hairstyle
            roundups, our team of experienced planners curate every resource to empower you to plan with
            confidence. We&apos;ve helped thousands of couples navigate the complexities of venue booking,
            guest list management, and day-of coordination.
          </p>
          <h3 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">Our Editorial Team</h3>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F3E8EA] shadow-xs">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B76E79] to-[#a25d66] text-white flex items-center justify-center font-bold text-lg">
                SJ
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A]">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Lead Wedding Planner &amp; Editor</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#F3E8EA] shadow-xs">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B76E79] to-[#a25d66] text-white flex items-center justify-center font-bold text-lg">
                MR
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A]">Michael Rivera</p>
                <p className="text-xs text-slate-500">Budget &amp; Logistics Expert</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
