import React from 'react';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function MultilingualLayout({ children, params }: Props) {
  const { lang } = await params;
  const langConfig = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES.en;
  const dir = langConfig.dir || 'ltr';

  return (
    <div lang={lang} dir={dir} className="w-full">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(lang)};document.documentElement.dir=${JSON.stringify(dir)};`,
        }}
      />
      {children}
    </div>
  );
}
