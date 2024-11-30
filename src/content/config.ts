import { defineCollection, z } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

const blog = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string().max(80),
            description: z.string(),
            pubDate: z
                .string()
                .or(z.date())
                .transform((val) => new Date(val)),
            updatedDate: z
                .string()
                .or(z.date())
                .transform((val) => new Date(val)),
            heroImage: image(),
            headline: z.string(),
            category: z.enum(CATEGORIES),
            tags: z.array(z.string()),
            series: z.object({
                name: z.string(),
                index: z.number()
            }).optional(),
            draft: z.boolean().default(false),
            readingTime: z.number()
        })
})

export const collections = { blog }