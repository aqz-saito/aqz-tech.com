import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'> & {
  slug: string;
  body: string;
};

export interface SearchIndex {
  title: string;
  url: string;
  content: string;
  tags?: string[];
}