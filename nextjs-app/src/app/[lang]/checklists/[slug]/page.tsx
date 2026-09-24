import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ChecklistPage from '@/components/pages/ChecklistPage';
import checklistsData from '@/data/categorized-checklists.json';
import { SITE_URL } from '@/i18n/utils';
import { NON_DEFAULT_LANGUAGES, isNonDefaultLanguage } from '@/i18n/config';

interface Props {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const checklists = checklistsData.checklists.filter(
    item => item.slug !== 'wedding-budget-calculator-10k' && item.slug !== 'wedding-budget-calculator-20k'
  );
  const paths: { lang: string; slug: string }[] = [];

  for (const lang of NON_DEFAULT_LANGUAGES) {
    for (const item of checklists) {
      paths.push({
        lang,
        slug: item.slug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isNonDefaultLanguage(lang)) return {};

  const checklist = checklistsData.checklists.find(c => c.slug === slug);
  if (!checklist) return {};

  const title = `${checklist.title} (2026)`;
  const canonicalUrl = `${SITE_URL}/${lang}/checklists/${checklist.slug}`;

  return {
    title,
    description: checklist.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: checklist.description,
      url: canonicalUrl,
    },
  };
}

export default async function MultilingualChecklistDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isNonDefaultLanguage(lang)) {
    notFound();
  }

  const checklist = checklistsData.checklists.find(c => c.slug === slug);
  if (!checklist) {
    notFound();
  }

  return <ChecklistPage checklist={checklist} lang={lang} />;
}
