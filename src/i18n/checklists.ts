import esChecklists from '../data/i18n/checklists.es.json';

/**
 * Translated checklist fields, keyed by language and then by checklist slug.
 * Any field missing from a translation falls back to the English source.
 */
const CHECKLIST_TRANSLATIONS: Record<string, Record<string, Record<string, unknown>>> = {
  es: esChecklists as Record<string, Record<string, unknown>>
};

export function localizeChecklist<T extends { slug: string }>(checklist: T, lang: string): T {
  const override = CHECKLIST_TRANSLATIONS[lang]?.[checklist.slug];
  return override ? { ...checklist, ...override } : checklist;
}

export function hasChecklistTranslation(slug: string, lang: string): boolean {
  return Boolean(CHECKLIST_TRANSLATIONS[lang]?.[slug]);
}
