import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePage from '@/components/pages/HomePage';
import { NON_DEFAULT_LANGUAGES, isNonDefaultLanguage } from '@/i18n/config';
import { useTranslations, SITE_URL } from '@/i18n/utils';

interface Props {
  params: Promise<{
    lang: string;
  }>;
}

export function generateStaticParams() {
  return NON_DEFAULT_LANGUAGES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isNonDefaultLanguage(lang)) return {};

  const { home } = useTranslations(lang);
  const canonicalUrl = `${SITE_URL}/${lang}`;

  return {
    title: (home as any).meta?.title || 'Wedding Planning Checklist, Timelines & Free Tools',
    description: (home as any).meta?.description || 'Free wedding planning checklist, step-by-step guide, budget calculator & 14 planning tools.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: (home as any).meta?.title || 'Wedding Planning Checklist, Timelines & Free Tools',
      description: (home as any).meta?.description || 'Free wedding planning checklist, step-by-step guide, budget calculator & 14 planning tools.',
      url: canonicalUrl,
      images: [{ url: `${SITE_URL}/wedding-planning-checklist-hero.jpg` }],
    },
  };
}

export default async function MultilingualHomePage({ params }: Props) {
  const { lang } = await params;
  if (!isNonDefaultLanguage(lang)) {
    notFound();
  }

  return <HomePage lang={lang} />;
}
