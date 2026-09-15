export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  locale: string;
  isDefault?: boolean;
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    locale: 'en-US',
    isDefault: true
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    dir: 'rtl',
    locale: 'ur-PK'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    dir: 'ltr',
    locale: 'hi-IN'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    locale: 'es-ES'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    locale: 'fr-FR'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    locale: 'de-DE'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    locale: 'ar-SA'
  }
};

export const DEFAULT_LANGUAGE = 'en';

export const NON_DEFAULT_LANGUAGES = ['ur', 'hi', 'es', 'fr', 'de', 'ar'] as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export function isValidLanguage(code: string): code is SupportedLanguage {
  return code in SUPPORTED_LANGUAGES;
}
