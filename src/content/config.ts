import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().optional(),
    updatedDate: z.string().optional(),
    category: z.string(),
    readTime: z.string(),
    author: z.string().default('Wedding Planning Checklists Team'),
    heroImage: z.string(),
    heroImageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    keyTakeaways: z.array(z.string()).optional(),
    tableOfContents: z.array(
      z.object({
        id: z.string(),
        label: z.string()
      })
    ).optional(),
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string()
      })
    ).optional()
  })
});

export const collections = {
  blog: blogCollection
};
