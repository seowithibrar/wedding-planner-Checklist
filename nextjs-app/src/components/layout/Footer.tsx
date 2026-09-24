import React from 'react';
import Link from 'next/link';
import { useTranslations, localizeUrl } from '@/i18n/utils';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';

export interface FooterProps {
  lang?: string;
}

export default function Footer({ lang = DEFAULT_LANGUAGE }: FooterProps) {
  const currentLang = lang as SupportedLanguage;
  const { common } = useTranslations(currentLang);
  const footer = common.footer;

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand / Intro */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#B76E79] text-white flex items-center justify-center font-bold text-base shrink-0">
              W
            </div>
            <span className="font-bold text-base text-white">WeddingPlanningChecklists</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{footer.aboutText}</p>
        </div>

        {/* Col 1: Planning Suite */}
        <div>
          <h4 className="font-bold text-xs text-[#B76E79] uppercase tracking-wider mb-4">
            {footer.suiteTitle}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link
                href={localizeUrl('/tools/wedding-planning-dashboard', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.planningDashboard}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/tools/budget-calculator', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.budgetCalculator}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/tools/guest-list-manager', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.guestListManager}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/tools/wedding-checklist-generator', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.checklistGenerator}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 2: Timelines & Schedule */}
        <div>
          <h4 className="font-bold text-xs text-[#B76E79] uppercase tracking-wider mb-4">
            {footer.timelinesTitle}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link
                href={localizeUrl('/tools/wedding-planning-timeline', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.planningTimeline}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/tools/timeline-generator', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.timelineGenerator}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/tools/wedding-planning-calendar', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.planningCalendar}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/tools/wedding-countdown', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.weddingCountdown}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Popular Guides */}
        <div>
          <h4 className="font-bold text-xs text-[#B76E79] uppercase tracking-wider mb-4">
            {footer.guidesTitle}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link
                href={localizeUrl('/blog/18-month-wedding-planning-timeline', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.timeline18Month}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/blog/14-month-wedding-planning-timeline', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.timeline14Month}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/blog/hairstyles-for-wedding', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.bridalHairstyles}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/blog/how-to-choose-wedding-venue', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.venueSelection}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Resources & Legal */}
        <div>
          <h4 className="font-bold text-xs text-[#B76E79] uppercase tracking-wider mb-4">
            {common.nav.blog} & Directory
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href={localizeUrl('/blog', currentLang)} className="hover:text-white transition-colors">
                {common.nav.blog}
              </Link>
            </li>
            <li>
              <Link href={localizeUrl('/sitemap', currentLang)} className="hover:text-white transition-colors">
                {footer.sitemap}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/privacy-policy', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link
                href={localizeUrl('/terms-of-service', currentLang)}
                className="hover:text-white transition-colors"
              >
                {footer.termsOfService}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        {footer.copyright}
      </div>
    </footer>
  );
}
