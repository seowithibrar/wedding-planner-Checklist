import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh-CN', name: '中文 (简体)' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' }
];

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // 1. Auto Detect Browser Language (Proxy for IP)
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    let savedLang = getCookie('googtrans');
    
    // If no language is saved, detect the browser's language
    if (!savedLang) {
      const browserLang = navigator.language.split('-')[0];
      const isSupported = LANGUAGES.some(l => l.code === browserLang);
      const targetLang = isSupported ? browserLang : 'en';
      
      if (targetLang !== 'en') {
        document.cookie = `googtrans=/en/${targetLang}; path=/`;
        document.cookie = `googtrans=/en/${targetLang}; domain=${window.location.hostname}; path=/`;
        savedLang = `/en/${targetLang}`;
      }
    }

    if (savedLang) {
      const code = savedLang.split('/')[2];
      if (code) setCurrentLang(code);
    }

    // 2. Initialize Google Translate Script
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 3. Aggressive Banner Removal via MutationObserver
    // Google sometimes forces inline styles to push the page down. This stops it permanently.
    const observer = new MutationObserver(() => {
      if (document.body.style.top || document.body.style.position) {
        document.body.style.top = '0px';
        document.body.style.position = 'static';
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setCurrentLang(lang);
    
    // Update cookies
    if (lang === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/`;
      document.cookie = `googtrans=/en/${lang}; domain=${window.location.hostname}; path=/`;
    }
    
    // Trigger Google's hidden native select to change the language without reloading
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback if the script hasn't fully parsed the combo yet
      window.location.reload();
    }
  };

  return (
    <div className="relative flex items-center z-[100]">
      {/* Hidden Google Element */}
      <div id="google_translate_element" className="opacity-0 absolute w-0 h-0 overflow-hidden pointer-events-none"></div>
      
      {/* Professional Custom Dropdown */}
      <div className="relative flex items-center shadow-sm rounded-xl">
        <Globe size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
        <select 
          value={currentLang}
          onChange={handleLanguageChange}
          className="appearance-none bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl pl-9 pr-8 py-2 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer w-[140px]"
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3 pointer-events-none text-slate-400">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Global CSS Overrides to nuke the Google UI */}
      <style>{`
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }
        .skiptranslate iframe {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
