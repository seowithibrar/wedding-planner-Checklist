import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
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

  const { common } = useTranslations(lang);
  const canonicalUrl = `${SITE_URL}/${lang}/privacy-policy`;
  const title = `${common.footer.privacyPolicy} | WeddingPlanningChecklists.org`;

  return {
    title,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function MultilingualPrivacyPolicy({ params }: Props) {
  const { lang } = await params;
  if (!isNonDefaultLanguage(lang)) {
    notFound();
  }

  return <PrivacyPolicyPage lang={lang} />;
}
