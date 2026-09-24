'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NON_DEFAULT_LANGUAGES, type SupportedLanguage } from '@/i18n/config';
import { getLangFromPath, localizeUrl } from '@/i18n/utils';

const nativeNames: Record<string, string> = {
  ur: 'اردو',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ar: 'العربية',
};

const switchTexts: Record<string, string> = {
  ur: 'اردو میں دیکھیں',
  hi: 'हिन्दी में देखें',
  es: 'Ver en Español',
  fr: 'Voir en Français',
  de: 'Auf Deutsch ansehen',
  ar: 'عرض بالعربية',
};

export default function LanguagePromptBanner() {
  const pathname = usePathname() || '/';
  const [visible, setVisible] = useState(false);
  const [matchedLang, setMatchedLang] = useState<SupportedLanguage | null>(null);

  useEffect(() => {
    try {
      const currentLang = getLangFromPath(pathname);
      if (currentLang !== 'en') return;

      const saved = localStorage.getItem('preferred-language');
      if (saved) return;

      const browserLangs = navigator.languages || [navigator.language];
      let found: SupportedLanguage | null = null;

      for (const bLang of browserLangs) {
        const primary = bLang.split('-')[0].toLowerCase() as SupportedLanguage;
        if ((NON_DEFAULT_LANGUAGES as readonly string[]).includes(primary)) {
          found = primary;
          break;
        }
      }

      if (found) {
        setMatchedLang(found);
        const timer = setTimeout(() => {
          setVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // ignore
    }
  }, [pathname]);

  if (!visible || !matchedLang) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem('preferred-language', matchedLang);
    } catch (e) {}
    setVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('preferred-language', 'en');
    } catch (e) {}
    setVisible(false);
  };

  return (
    <div
      id="lang-detection-banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white border border-[#F3E8EA] rounded-2xl p-4 shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100"
      role="region"
      aria-label="Language recommendation"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#FCECF0] text-[#B76E79] flex items-center justify-center shrink-0 font-bold">
          🌐
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            Would you prefer to read in{' '}
            <strong className="text-[#B76E79]">{nativeNames[matchedLang]}</strong>?
          </p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href={localizeUrl(pathname, matchedLang)}
              onClick={handleAccept}
              className="bg-[#B76E79] hover:bg-[#a25d66] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
            >
              {switchTexts[matchedLang] || 'Switch Language'}
            </a>
            <button
              type="button"
              onClick={handleDismiss}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            >
              Keep English
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="w-11 h-11 flex items-center justify-center text-slate-500 hover:text-slate-700 text-base rounded-full hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
