import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
    slug: z.string({
      required_error: "Blog post frontmatter must include a 'slug' field."
    })
      .min(1, "Slug cannot be empty.")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase, hyphen-separated, and contain no spaces or special characters (e.g. '18-month-wedding-planning-timeline')."
      ),
    title: z.string({ required_error: "Blog post title is required." }).min(1, "Title cannot be empty."),
    seoTitle: z.string().optional(),
    description: z.string(),
    cardDescription: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.string().optional(),
    dateModified: z.string().optional(),
    category: z.string(),
    readTime: z.string(),
    author: z.string().default('Wedding Planning Checklists Team'),
    heroImage: z.string({ required_error: "Blog post heroImage is required." }).min(1, "heroImage path cannot be empty."),
    heroImageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    quickAnswer: z.string().optional(),
    keyTakeaways: z.array(z.string()).optional(),
    tableOfContents: z.array(
      z.object({
        id: z.string(),
        label: z.string()
      })
    ).optional(),
    about: z.array(z.string()).optional(),
    faqTitle: z.string().optional(),
    itemList: z.object({
      name: z.string(),
      items: z.array(z.string())
    }).optional(),
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string()
      })
    ).optional(),
    closingSection: z.object({
      title: z.string(),
      body: z.array(z.object({
        text: z.string(),
        url: z.string().optional()
      })).optional(),
      paragraphs: z.array(z.array(z.object({
        text: z.string(),
        url: z.string().optional()
      }))).optional()
    }).optional(),
    relatedLinks: z.array(
      z.object({
        title: z.string(),
        url: z.string()
      })
    ).optional(),
    howTo: z.object({
      name: z.string(),
      description: z.string(),
      step: z.array(
        z.object({
          name: z.string(),
          text: z.string()
        })
      )
    }).optional()
  });

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema
});

const blogTranslations = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog-translations',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, '').replace(/[\\/]/g, '-')
  }),
  schema: blogSchema.extend({
    lang: z.enum(['ur', 'hi', 'es', 'fr', 'de', 'ar']),
    sourceSlug: z.string()
  })
});

export const collections = { blog, blogTranslations };
