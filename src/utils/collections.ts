import type { CollectionEntry } from "astro:content";
import { getCollection } from 'astro:content';

export type BlogPost = CollectionEntry<"blog">;

export const getPublishedPosts = (posts: BlogPost[]): BlogPost[] => {
    const currentDate = new Date();
    const isProd = process.env.NODE_ENV === 'production';

    return posts.filter((post) => {
        if (!isProd) return true;
        return (
            !post.data.draft &&
            new Date(post.data.pubDate) <= currentDate
        );
    });
};

export const getPublishedBlogCollection = async (): Promise<BlogPost[]> => {
    try {
        const currentDate = new Date();
        const isProd = process.env.NODE_ENV === 'production';

        console.log('Environment:', {
            isProd,
            currentDate,
            cwd: process.cwd()
        });

        const posts = await getCollection('blog', ({ data }) => {
            if (!isProd) return true;
            return (
                !data.draft &&
                new Date(data.pubDate) <= currentDate
            );
        });

        console.log('Retrieved posts:', posts.length);
        return posts;
    } catch (error) {
        console.error('Error in getPublishedBlogCollection:', error);
        return [];
    }
};