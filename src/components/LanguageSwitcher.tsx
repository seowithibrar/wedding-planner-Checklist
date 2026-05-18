import React, { useEffect } from 'react';

// Extend the Window interface to include Google Translate properties
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export function LanguageSwitcher() {
  useEffect(() => {
    // Only initialize once
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative flex items-center z-50 translate-wrapper">
      <div id="google_translate_element" className="min-h-[38px] flex items-center"></div>
      <style>{`
        /* Hide the Google Translate banner */
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        /* Hide the "Powered by Google" logo */
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0px !important;
          display: flex;
          align-items: center;
        }
        /* Style the select dropdown */
        .goog-te-gadget .goog-te-combo {
          margin: 0;
          padding: 8px 32px 8px 12px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background-color: white;
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 12px top 50%;
          background-size: 10px auto;
        }
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #cbd5e1;
          background-color: #f8fafc;
        }
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #f43f5e;
          box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.1);
        }
        
        /* Fix Google translation popups */
        #goog-gt-tt {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
