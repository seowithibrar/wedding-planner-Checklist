// Long-form guides keyed by language, page kind and slug.
type GuideModule = {
  Content: any;
  frontmatter?: { faqs?: { q: string; a: string }[] };
};

const modules = import.meta.glob<GuideModule>('./*/*/*.mdx', { eager: true });

export function getGuide(kind: string, slug: string, lang: string): GuideModule | null {
  return modules[`./${lang}/${kind}/${slug}.mdx`] || null;
}

/** FAQs written for a specific page, used for both the FAQ block and FAQ schema. */
export function getGuideFaqs(kind: string, slug: string, lang: string): { q: string; a: string }[] {
  return getGuide(kind, slug, lang)?.frontmatter?.faqs || [];
}
