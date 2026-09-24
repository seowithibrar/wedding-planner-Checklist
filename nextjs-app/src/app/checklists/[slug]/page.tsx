import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ChecklistPage from '@/components/pages/ChecklistPage';
import checklistsData from '@/data/categorized-checklists.json';
import { SITE_URL } from '@/i18n/utils';
import { DEFAULT_LANGUAGE } from '@/i18n/config';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return checklistsData.checklists
    .filter(item => item.slug !== 'wedding-budget-calculator-10k' && item.slug !== 'wedding-budget-calculator-20k')
    .map(item => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const checklist = checklistsData.checklists.find(c => c.slug === slug);
  if (!checklist) return {};

  const title = `${checklist.title} (2026)`;
  const canonicalUrl = `${SITE_URL}/checklists/${checklist.slug}`;

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

export default async function ChecklistDetailPage({ params }: Props) {
  const { slug } = await params;
  const checklist = checklistsData.checklists.find(c => c.slug === slug);

  if (!checklist) {
    notFound();
  }

  return <ChecklistPage checklist={checklist} lang={DEFAULT_LANGUAGE} />;
}
