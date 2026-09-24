import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogArticlePage from '@/components/pages/BlogArticlePage';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { getArticleI18n, SITE_URL } from '@/i18n/utils';
import { NON_DEFAULT_LANGUAGES, isNonDefaultLanguage } from '@/i18n/config';

interface Props {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const paths: { lang: string; slug: string }[] = [];

  for (const lang of NON_DEFAULT_LANGUAGES) {
    for (const post of posts) {
      paths.push({
        lang,
        slug: post.slug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isNonDefaultLanguage(lang)) return {};

  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const postI18n = getArticleI18n(slug, lang);
  const articleTitle = postI18n?.title || post.data.title;
  const pageTitle = postI18n?.seoTitle || post.data.seoTitle || articleTitle;
  const articleDescription = postI18n?.description || post.data.description;
  const canonicalUrl = `${SITE_URL}/${lang}/blog/${slug}`;

  return {
    title: pageTitle,
    description: articleDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: articleDescription,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: post.data.heroImage.startsWith('http') ? post.data.heroImage : `${SITE_URL}${post.data.heroImage}`,
          alt: post.data.heroImageAlt || articleTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: articleDescription,
      images: [post.data.heroImage.startsWith('http') ? post.data.heroImage : `${SITE_URL}${post.data.heroImage}`],
    },
  };
}

export default async function MultilingualBlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isNonDefaultLanguage(lang)) {
    notFound();
  }

  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts()
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <BlogArticlePage
      post={post}
      slug={slug}
      allPosts={allPosts}
      lang={lang}
    />
  );
}
