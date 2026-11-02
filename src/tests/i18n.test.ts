import { describe, it, expect } from 'vitest';
import {
  getLangFromPath,
  stripLangPrefix,
  localizeUrl,
  getHreflangLinks,
  useTranslations,
  SITE_URL
} from '../i18n/utils';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, INDEXED_LANGUAGES } from '../i18n/config';

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
    it('should generate reciprocal links for indexed languages plus x-default', () => {
      const links = getHreflangLinks('/tools/budget-calculator');

      // English + indexed languages + x-default
      expect(links.length).toBe(1 + INDEXED_LANGUAGES.length + 1);

      const xDefault = links.find(l => l.lang === 'x-default');
      expect(xDefault).toBeDefined();
      expect(xDefault?.url).toBe(`${SITE_URL}/tools/budget-calculator`);

      const esLink = links.find(l => l.lang === 'es');
      expect(esLink?.url).toBe(`${SITE_URL}/es/tools/budget-calculator`);

      // Untranslated languages must not be advertised to Google
      expect(links.find(l => l.lang === 'ur')).toBeUndefined();
    });

    it('should strip trailing slashes and resolve legacy aliases to canonical URLs', () => {
      const linksWithTrailingSlash = getHreflangLinks('/tools/budget-calculator/');
      const enLink = linksWithTrailingSlash.find(l => l.lang === 'en');
      expect(enLink?.url).toBe(`${SITE_URL}/tools/budget-calculator`);

      const legacyLinks = getHreflangLinks('/tools/checklist-generator');
      const legacyEn = legacyLinks.find(l => l.lang === 'en');
      expect(legacyEn?.url).toBe(`${SITE_URL}/tools/wedding-checklist-generator`);

      const legacyEs = legacyLinks.find(l => l.lang === 'es');
      expect(legacyEs?.url).toBe(`${SITE_URL}/es/tools/wedding-checklist-generator`);
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
