import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, NON_DEFAULT_LANGUAGES, type SupportedLanguage, isValidLanguage } from './config';

// Import English fallbacks statically
import enCommon from '../locales/en/common.json';
import enHome from '../locales/en/home.json';
import enTools from '../locales/en/tools.json';
import enChecklists from '../locales/en/checklists.json';
import enPages from '../locales/en/pages.json';
import enArticles from '../locales/en/articles.json';

// Import localized dictionaries
import urCommon from '../locales/ur/common.json';
import urHome from '../locales/ur/home.json';
import urTools from '../locales/ur/tools.json';
import urChecklists from '../locales/ur/checklists.json';
import urPages from '../locales/ur/pages.json';
import urArticles from '../locales/ur/articles.json';

import hiCommon from '../locales/hi/common.json';
import hiHome from '../locales/hi/home.json';
import hiTools from '../locales/hi/tools.json';
import hiChecklists from '../locales/hi/checklists.json';
import hiPages from '../locales/hi/pages.json';
import hiArticles from '../locales/hi/articles.json';

import esCommon from '../locales/es/common.json';
import esHome from '../locales/es/home.json';
import esTools from '../locales/es/tools.json';
import esChecklists from '../locales/es/checklists.json';
import esPages from '../locales/es/pages.json';
import esArticles from '../locales/es/articles.json';

import frCommon from '../locales/fr/common.json';
import frHome from '../locales/fr/home.json';
import frTools from '../locales/fr/tools.json';
import frChecklists from '../locales/fr/checklists.json';
import frPages from '../locales/fr/pages.json';
import frArticles from '../locales/fr/articles.json';

import deCommon from '../locales/de/common.json';
import deHome from '../locales/de/home.json';
import deTools from '../locales/de/tools.json';
import deChecklists from '../locales/de/checklists.json';
import dePages from '../locales/de/pages.json';
import deArticles from '../locales/de/articles.json';

import arCommon from '../locales/ar/common.json';
import arHome from '../locales/ar/home.json';
import arTools from '../locales/ar/tools.json';
import arChecklists from '../locales/ar/checklists.json';
import arPages from '../locales/ar/pages.json';
import arArticles from '../locales/ar/articles.json';

const translationsMap: Record<string, Record<string, any>> = {
  en: { common: enCommon, home: enHome, tools: enTools, checklists: enChecklists, pages: enPages, articles: enArticles },
  ur: { common: urCommon, home: urHome, tools: urTools, checklists: urChecklists, pages: urPages, articles: urArticles },
  hi: { common: hiCommon, home: hiHome, tools: hiTools, checklists: hiChecklists, pages: hiPages, articles: hiArticles },
  es: { common: esCommon, home: esHome, tools: esTools, checklists: esChecklists, pages: esPages, articles: esArticles },
  fr: { common: frCommon, home: frHome, tools: frTools, checklists: frChecklists, pages: frPages, articles: frArticles },
  de: { common: deCommon, home: deHome, tools: deTools, checklists: deChecklists, pages: dePages, articles: deArticles },
  ar: { common: arCommon, home: arHome, tools: arTools, checklists: arChecklists, pages: arPages, articles: arArticles }
};

export const SITE_URL = 'https://www.weddingplanningchecklists.org';

/**
 * Canonical tool path mapping for legacy aliases
 */
const CANONICAL_PATH_MAP: Record<string, string> = {
  '/tools/checklist-generator': '/tools/wedding-checklist-generator',
  '/tools/planning-timeline': '/tools/wedding-planning-timeline',
  '/tools/planning-calendar': '/tools/wedding-planning-calendar',
  '/tools/planning-dashboard': '/tools/wedding-planning-dashboard',
  '/tools/wedding-budget-planner': '/tools/budget-calculator',
  '/tools/wedding-seating-chart-maker': '/tools/guest-list-manager',
  '/tools/wedding-invitation-timeline': '/tools/wedding-planning-timeline',
  '/tools/wedding-task-generator': '/tools/wedding-checklist-generator',
  '/tools/wedding-milestone-tracker': '/tools/wedding-planning-dashboard',
  '/tools/wedding-progress-tracker': '/tools/wedding-planning-dashboard',
  '/tools/daily-wedding-planner': '/tools/wedding-planning-calendar',
  '/tools/weekly-wedding-planner': '/tools/wedding-planning-calendar',
  '/tools/monthly-wedding-planner': '/tools/wedding-planning-calendar'
};

/**
 * Normalizes a path by removing queries, hashes, duplicate slashes, and trailing slashes.
 */
export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const clean = path.split(/[?#]/)[0].replace(/\/+/g, '/');
  const trimmed = clean.replace(/\/+$/, '');
  const normalized = trimmed || '/';
  return CANONICAL_PATH_MAP[normalized] || normalized;
}

/**
 * Strips any supported language prefix from a pathname and normalizes it.
 * E.g. '/ur/blog/test/' -> '/blog/test', '/ur' -> '/', '/blog/' -> '/blog'
 */
export function stripLangPrefix(pathname: string): string {
  if (!pathname) return '/';
  let clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  
  for (const lang of NON_DEFAULT_LANGUAGES) {
    if (clean === `/${lang}` || clean === `/${lang}/`) {
      return '/';
    }
    if (clean.startsWith(`/${lang}/`)) {
      clean = clean.slice(lang.length + 1);
      break;
    }
  }
  return normalizePath(clean);
}

/**
 * Extracts language code from a pathname.
 * Defaults to 'en'.
 */
export function getLangFromPath(pathname: string): SupportedLanguage {
  if (!pathname) return DEFAULT_LANGUAGE;
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  for (const lang of NON_DEFAULT_LANGUAGES) {
    if (clean === `/${lang}` || clean.startsWith(`/${lang}/`)) {
      return lang;
    }
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Localizes a relative URL to the target language.
 * E.g.
 * localizeUrl('/blog', 'ur') -> '/ur/blog'
 * localizeUrl('/', 'ur') -> '/ur'
 * localizeUrl('/ur/blog', 'en') -> '/blog'
 * localizeUrl('/ur/blog', 'hi') -> '/hi/blog'
 */
export function localizeUrl(path: string, targetLang: string = DEFAULT_LANGUAGE): string {
  if (!path) return targetLang === DEFAULT_LANGUAGE ? '/' : `/${targetLang}`;
  
  // External or anchor links
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }

  // Extract hash / query
  const [basePath, ...rest] = path.split(/([?#].*)/);
  const extra = rest.join('');
  const cleanPath = stripLangPrefix(basePath);

  if (targetLang === DEFAULT_LANGUAGE) {
    return (cleanPath || '/') + extra;
  }

  if (cleanPath === '/' || cleanPath === '') {
    return `/${targetLang}` + extra;
  }

  return `/${targetLang}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}` + extra;
}

/**
 * Generates reciprocal hreflang links for an absolute or relative path across all supported languages.
 * Always resolves to canonical URLs without trailing slashes (except root '/').
 */
export function getHreflangLinks(pathname: string): { lang: string; url: string }[] {
  const cleanPath = stripLangPrefix(pathname);
  const links: { lang: string; url: string }[] = [];

  // Default English version
  const enUrl = cleanPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}`;
  links.push({ lang: 'en', url: enUrl });

  // Non-default languages
  for (const lang of NON_DEFAULT_LANGUAGES) {
    const localizedPath = cleanPath === '/' ? `/${lang}` : `/${lang}${cleanPath}`;
    links.push({ lang, url: `${SITE_URL}${localizedPath}` });
  }

  // x-default points to English
  links.push({ lang: 'x-default', url: enUrl });

  return links;
}

/**
 * Deep getter for dictionary object with English fallback.
 */
function getDeepValue(obj: any, path: string): any {
  if (!obj) return undefined;
  const parts = path.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[part];
  }
  return curr;
}

/**
 * Returns a typed translator helper for a given language.
 */
export function useTranslations(lang: string = DEFAULT_LANGUAGE) {
  const targetDict = translationsMap[lang] || translationsMap[DEFAULT_LANGUAGE];
  const enDict = translationsMap[DEFAULT_LANGUAGE];

  return {
    t: (namespace: string, key: string, fallback?: string): string => {
      const localVal = getDeepValue(targetDict[namespace], key);
      if (localVal !== undefined && typeof localVal === 'string') {
        return localVal;
      }
      const enVal = getDeepValue(enDict[namespace], key);
      if (enVal !== undefined && typeof enVal === 'string') {
        return enVal;
      }
      return fallback || key;
    },
    common: targetDict.common || enDict.common,
    home: targetDict.home || enDict.home,
    tools: targetDict.tools || enDict.tools,
    checklists: targetDict.checklists || enDict.checklists,
    pages: targetDict.pages || enDict.pages,
    articles: targetDict.articles || enDict.articles
  };
}

/**
 * Safe article metadata getter with localized fallback.
 */
export function getArticleI18n(slug: string, lang: string = DEFAULT_LANGUAGE) {
  const targetArticles = translationsMap[lang]?.articles || {};
  const enArticles = translationsMap[DEFAULT_LANGUAGE]?.articles || {};

  return targetArticles[slug] || enArticles[slug] || null;
}
