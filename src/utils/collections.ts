import type { CollectionEntry } from "astro:content";
import { getCollection } from 'astro:content';

export interface BlogPost extends CollectionEntry<"blog"> {
    data: {
        title: string;
        pubDate: Date;
        draft?: boolean;
        tags: string[];
        category: string;
    };
}

/**
 * Get published blog posts
 * 
 * Filters out:
 * - Draft posts in production
 * - Posts with future publication dates in production
 * - Respects draft status in development
 *
 * @param posts - Collection of blog posts
 * @returns Filtered array of posts
 */
export const getPublishedPosts = (posts: BlogPost[]): BlogPost[] => {
    const now = new Date();

    return posts.filter((post) => {
        // Always show all posts in development
        if (!import.meta.env.PROD) return true;

        // In production:
        // 1. Filter out drafts
        // 2. Filter out future posts
        return (
            !post.data.draft &&
            new Date(post.data.pubDate) <= now
        );
    });
};

/**
 * Safely get published blog posts directly from collection
 * 
 * @returns Promise of filtered blog posts
 */
export const getPublishedBlogCollection = async (): Promise<BlogPost[]> => {
    const now = new Date();
    return await getCollection('blog', ({ data }: { data: BlogPost['data'] }) => {
        if (!import.meta.env.PROD) return true;
        return (
            !data.draft &&
            new Date(data.pubDate) <= now
        );
    }) as BlogPost[];
};