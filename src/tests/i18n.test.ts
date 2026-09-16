import { describe, it, expect } from 'vitest';
import {
  getLangFromPath,
  stripLangPrefix,
  localizeUrl,
  getHreflangLinks,
  useTranslations,
  SITE_URL
} from '../i18n/utils';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../i18n/config';

describe('i18n Utility Suite', () => {
  describe('getLangFromPath', () => {
    it('should detect default language (en) for root path', () => {
      expect(getLangFromPath('/')).toBe('en');
    });

    it('should detect default language for non-localized paths', () => {
      expect(getLangFromPath('/blog/wedding-checklist')).toBe('en');
    });

    it('should correctly extract language code from path prefix', () => {
      expect(getLangFromPath('/ur/tools/budget-calculator')).toBe('ur');
      expect(getLangFromPath('/ar/blog')).toBe('ar');
      expect(getLangFromPath('/es/')).toBe('es');
      expect(getLangFromPath('/fr')).toBe('fr');
      expect(getLangFromPath('/de/checklists/12-month-checklist')).toBe('de');
      expect(getLangFromPath('/hi')).toBe('hi');
    });

    it('should fallback to default for unknown language prefix', () => {
      expect(getLangFromPath('/zz/some-path')).toBe('en');
    });
  });

  describe('stripLangPrefix', () => {
    it('should leave default language paths unchanged', () => {
      expect(stripLangPrefix('/blog/my-post')).toBe('/blog/my-post');
      expect(stripLangPrefix('/')).toBe('/');
    });

    it('should strip supported language prefix', () => {
      expect(stripLangPrefix('/ur/tools/budget-calculator')).toBe('/tools/budget-calculator');
      expect(stripLangPrefix('/ar/')).toBe('/');
      expect(stripLangPrefix('/es')).toBe('/');
    });
  });

  describe('localizeUrl', () => {
    it('should generate un-prefixed URL for default language', () => {
      expect(localizeUrl('/tools/budget-calculator', 'en')).toBe('/tools/budget-calculator');
      expect(localizeUrl('/', 'en')).toBe('/');
    });

    it('should generate prefixed URL for non-default languages', () => {
      expect(localizeUrl('/tools/budget-calculator', 'ur')).toBe('/ur/tools/budget-calculator');
      expect(localizeUrl('/', 'ar')).toBe('/ar');
      expect(localizeUrl('/blog', 'es')).toBe('/es/blog');
    });
  });

  describe('getHreflangLinks', () => {
    it('should generate reciprocal links for all supported languages plus x-default', () => {
      const links = getHreflangLinks('/tools/budget-calculator');
      const supportedCount = Object.keys(SUPPORTED_LANGUAGES).length;
      
      // Should include all supported languages + x-default
      expect(links.length).toBe(supportedCount + 1);

      const xDefault = links.find(l => l.lang === 'x-default');
      expect(xDefault).toBeDefined();
      expect(xDefault?.url).toBe(`${SITE_URL}/tools/budget-calculator`);

      const urLink = links.find(l => l.lang === 'ur');
      expect(urLink).toBeDefined();
      expect(urLink?.url).toBe(`${SITE_URL}/ur/tools/budget-calculator`);
    });
  });

  describe('useTranslations', () => {
    it('should load translation dictionaries for current language', () => {
      const { common, home } = useTranslations('ur');
      expect(common).toBeDefined();
      expect(common.nav).toBeDefined();
      expect(home).toBeDefined();
    });

    it('should fallback to English for missing keys or default language', () => {
      const { common } = useTranslations('en');
      expect(common.nav.home).toBe('Home');
    });
  });
});
