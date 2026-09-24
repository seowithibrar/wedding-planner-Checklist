import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ToolPage from '@/components/pages/ToolPage';
import toolRegistry from '@/data/tool-registry.json';
import { SITE_URL, useTranslations } from '@/i18n/utils';
import { NON_DEFAULT_LANGUAGES, isNonDefaultLanguage } from '@/i18n/config';

interface Props {
  params: Promise<{
    lang: string;
    tool: string;
  }>;
}

export async function generateStaticParams() {
  const paths: { lang: string; tool: string }[] = [];

  for (const lang of NON_DEFAULT_LANGUAGES) {
    for (const tool of toolRegistry.tools) {
      paths.push({
        lang,
        tool: tool.id,
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, tool } = await params;
  if (!isNonDefaultLanguage(lang)) return {};

  const toolItem = toolRegistry.tools.find(t => t.id === tool);
  if (!toolItem) return {};

  const { tools } = useTranslations(lang);
  const localizedTool = ((tools as any).tools as any)?.[tool] || toolItem;
  const title = `${localizedTool.title || toolItem.title} (2026)`;
  const description = localizedTool.description || toolItem.description;
  const canonicalUrl = `${SITE_URL}/${lang}/tools/${tool}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
  };
}

export default async function MultilingualToolDetailPage({ params }: Props) {
  const { lang, tool } = await params;
  if (!isNonDefaultLanguage(lang)) {
    notFound();
  }

  const toolItem = toolRegistry.tools.find(t => t.id === tool);
  if (!toolItem) {
    notFound();
  }

  return <ToolPage toolId={tool} lang={lang} />;
}
