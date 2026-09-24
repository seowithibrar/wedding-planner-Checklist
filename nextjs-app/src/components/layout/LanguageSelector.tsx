'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';
import { getLangFromPath, localizeUrl } from '@/i18n/utils';

export interface LanguageSelectorProps {
  currentLang?: string;
  isMobile?: boolean;
}

export default function LanguageSelector({ currentLang: propLang, isMobile = false }: LanguageSelectorProps) {
  const pathname = usePathname() || '/';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = (propLang && propLang in SUPPORTED_LANGUAGES)
    ? (propLang as SupportedLanguage)
    : getLangFromPath(pathname);

  const currentLangConfig = SUPPORTED_LANGUAGES[currentLang] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];

  const languageOptions = Object.values(SUPPORTED_LANGUAGES).map((lang) => ({
    code: lang.code,
    name: lang.name,
    nativeName: lang.nativeName,
    dir: lang.dir,
    targetUrl: localizeUrl(pathname, lang.code),
    isActive: lang.code === currentLang,
  }));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLanguage = (langCode: string) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('preferred-language', langCode);
      } catch (e) {
        // ignore
      }
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left language-selector-root ${isMobile ? 'w-full' : ''}`}
      data-current-lang={currentLang}
    >
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`lang-toggle-btn inline-flex items-center justify-between gap-1.5 px-3 py-2 text-xs font-bold rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:ring-offset-1 ${
          isMobile
            ? 'w-full bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 justify-between'
            : 'bg-white/90 border-[#F3E8EA] text-slate-700 hover:text-[#B76E79] hover:border-[#B76E79]/40 shadow-sm'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select website language"
      >
        <span className="inline-flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-[#B76E79] shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path
              strokeWidth="2"
              d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
            />
          </svg>
          <span className="lang-btn-text tracking-wide">{currentLangConfig.nativeName}</span>
        </span>
        <svg
          className={`lang-chevron w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`lang-menu ${isOpen ? 'block' : 'hidden'} absolute z-50 mt-1.5 w-48 rounded-2xl bg-white shadow-xl border border-[#F3E8EA] py-1.5 focus:outline-none animate-in fade-in zoom-in-95 duration-150 ${
          isMobile ? 'left-0 right-0 w-full static mt-2 shadow-none border-slate-200' : 'ltr:right-0 rtl:left-0'
        }`}
        role="listbox"
        aria-label="Languages"
      >
        <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Select Language
        </div>

        {languageOptions.map((opt) => (
          <a
            key={opt.code}
            href={opt.targetUrl}
            onClick={() => handleSelectLanguage(opt.code)}
            className={`lang-option flex items-center justify-between px-3 py-2 text-xs transition-colors duration-150 ${
              opt.isActive
                ? 'bg-[#FCECF0] text-[#B76E79] font-bold'
                : 'text-slate-700 hover:bg-slate-50 hover:text-[#B76E79] font-medium'
            }`}
            role="option"
            aria-selected={opt.isActive}
            data-lang={opt.code}
            dir={opt.dir}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold">{opt.nativeName}</span>
              <span className="text-[10px] text-slate-400 font-normal">({opt.name})</span>
            </span>
            {opt.isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79] shrink-0" aria-hidden="true" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
