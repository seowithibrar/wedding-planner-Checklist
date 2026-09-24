import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogArticlePage from '@/components/pages/BlogArticlePage';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { getArticleI18n, SITE_URL } from '@/i18n/utils';
import { DEFAULT_LANGUAGE } from '@/i18n/config';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const postI18n = getArticleI18n(slug, DEFAULT_LANGUAGE);
  const articleTitle = postI18n?.title || post.data.title;
  const pageTitle = postI18n?.seoTitle || post.data.seoTitle || articleTitle;
  const articleDescription = postI18n?.description || post.data.description;
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
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
      lang={DEFAULT_LANGUAGE}
    />
  );
}
