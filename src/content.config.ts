import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    slug: z.string({
      required_error: "Blog post frontmatter must include a 'slug' field."
    })
      .min(1, "Slug cannot be empty.")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase, hyphen-separated, and contain no spaces or special characters (e.g. '18-month-wedding-planning-timeline')."
      ),
    title: z.string({ required_error: "Blog post title is required." }).min(1, "Title cannot be empty."),
    description: z.string(),
    pubDate: z.date().optional(),
    updatedDate: z.string().optional(),
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
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string()
      })
    ).optional()
  })
});

export const collections = { blog };
