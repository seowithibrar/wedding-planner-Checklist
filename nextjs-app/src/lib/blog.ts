import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPostMeta {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  pubDate?: string;
  updatedDate?: string;
  dateModified?: string;
  category: string;
  readTime: string;
  author: string;
  heroImage: string;
  heroImageAlt?: string;
  featured?: boolean;
  quickAnswer?: string;
  keyTakeaways?: string[];
  tableOfContents?: { id: string; label: string }[];
  faqs?: { q: string; a: string }[];
  howTo?: {
    name: string;
    description: string;
    step: { name: string; text: string }[];
  };
}

export interface BlogPost {
  slug: string;
  data: BlogPostMeta;
  meta: BlogPostMeta;
  content: string;
  filename: string;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts: BlogPost[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) continue;

    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const fallbackSlug = fileName.replace(/\.(md|mdx)$/, '');
    const meta: BlogPostMeta = {
      slug: data.slug || fallbackSlug,
      title: data.title || '',
      seoTitle: data.seoTitle,
      description: data.description || '',
      pubDate: data.pubDate ? String(data.pubDate) : undefined,
      updatedDate: data.updatedDate,
      dateModified: data.dateModified,
      category: data.category || 'Planning',
      readTime: data.readTime || '8 Min Read',
      author: data.author || 'Wedding Planning Checklists Team',
      heroImage: data.heroImage || '',
      heroImageAlt: data.heroImageAlt,
      featured: Boolean(data.featured),
      quickAnswer: data.quickAnswer,
      keyTakeaways: data.keyTakeaways,
      tableOfContents: data.tableOfContents,
      faqs: data.faqs,
      howTo: data.howTo,
    };

    posts.push({
      slug: meta.slug,
      data: meta,
      meta,
      content,
      filename: fileName,
    });
  }

  return posts.sort((a, b) => {
    const isTargetA = a.slug.includes('the-ultimate-wedding-planning-checklists-guide');
    const isTargetB = b.slug.includes('the-ultimate-wedding-planning-checklists-guide');
    if (isTargetA) return -1;
    if (isTargetB) return 1;
    return (b.meta.featured ? 1 : 0) - (a.meta.featured ? 1 : 0);
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug || p.filename.replace(/\.(md|mdx)$/, '') === slug) || null;
}
