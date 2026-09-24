'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSelector from './LanguageSelector';
import LanguagePromptBanner from './LanguagePromptBanner';
import { useTranslations, localizeUrl, getLangFromPath } from '@/i18n/utils';
import { type SupportedLanguage } from '@/i18n/config';

export interface HeaderProps {
  lang?: string;
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname() || '/';
  const currentLang = (lang || getLangFromPath(pathname)) as SupportedLanguage;
  const { common } = useTranslations(currentLang);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#F3E8EA] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href={localizeUrl('/', currentLang)} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#B76E79] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              W
            </div>
            <span className="font-bold text-lg sm:text-xl text-[#1A1A1A] tracking-tight">
              WeddingPlanning<span className="text-[#B76E79]">Checklists</span>.org
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href={localizeUrl('/', currentLang)} className="hover:text-[#B76E79] transition-colors">
              {common.nav.home}
            </Link>
            <Link href={localizeUrl('/blog', currentLang)} className="hover:text-[#B76E79] transition-colors">
              {common.nav.blog}
            </Link>
            <Link
              href={localizeUrl('/tools/budget-calculator', currentLang)}
              className="hover:text-[#B76E79] transition-colors"
            >
              {common.nav.budgetCalculator}
            </Link>
            <Link
              href={localizeUrl('/tools/guest-list-manager', currentLang)}
              className="hover:text-[#B76E79] transition-colors"
            >
              {common.nav.guestList}
            </Link>
            <Link href={localizeUrl('/about-us', currentLang)} className="hover:text-[#B76E79] transition-colors">
              {common.nav.aboutUs}
            </Link>
            <Link href={localizeUrl('/contact', currentLang)} className="hover:text-[#B76E79] transition-colors">
              {common.nav.contact}
            </Link>
          </nav>

          {/* Header Actions (Language Selector + CTA + Mobile Toggle) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector currentLang={currentLang} />
            </div>

            {/* CTA Button */}
            <Link
              href={localizeUrl(
                '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding',
                currentLang
              )}
              className="hidden md:inline-flex bg-[#1A1A1A] hover:bg-[#B76E79] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md shrink-0"
            >
              {common.nav.getChecklists}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-nav-toggle"
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#B76E79] hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden bg-white border-b border-[#F3E8EA] px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="space-y-3 pt-2">
              {/* Mobile Language Selector */}
              <div className="pb-3 border-b border-slate-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {common.ui.selectLanguage}
                </label>
                <LanguageSelector currentLang={currentLang} isMobile={true} />
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
                <Link
                  href={localizeUrl('/', currentLang)}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#B76E79] transition-colors"
                >
                  {common.nav.home}
                </Link>
                <Link
                  href={localizeUrl('/blog', currentLang)}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#B76E79] transition-colors"
                >
                  {common.nav.blog}
                </Link>
                <Link
                  href={localizeUrl('/tools/budget-calculator', currentLang)}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#B76E79] transition-colors"
                >
                  {common.nav.budgetCalculator}
                </Link>
                <Link
                  href={localizeUrl('/tools/guest-list-manager', currentLang)}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#B76E79] transition-colors"
                >
                  {common.nav.guestList}
                </Link>
                <Link
                  href={localizeUrl('/about-us', currentLang)}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#B76E79] transition-colors"
                >
                  {common.nav.aboutUs}
                </Link>
                <Link
                  href={localizeUrl('/contact', currentLang)}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#B76E79] transition-colors"
                >
                  {common.nav.contact}
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  href={localizeUrl(
                    '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding',
                    currentLang
                  )}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center bg-[#1A1A1A] hover:bg-[#B76E79] text-white px-5 py-3 rounded-full text-xs font-bold transition-all shadow-md"
                >
                  {common.nav.getChecklists}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <LanguagePromptBanner />
    </>
  );
}
