import * as fs from 'fs';
import * as path from 'path';
import { getPublishedBlogCollection } from '../src/utils/collections';
import type { BlogPost } from '../src/utils/collections';

/**
 * Interface for search index entry
 */
interface SearchIndexEntry {
  title: string;
  url: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
}

/**
 * Generates a search index JSON file from published blog posts
 * The index is used for client-side search functionality
 */
async function generateSearchIndex() {
  try {
    const publishedPosts = await getPublishedBlogCollection();

    const searchIndex: SearchIndexEntry[] = publishedPosts
      .map((post) => ({
        title: post.data.title,
        url: `/blog/${post.id.replace(/\.[^/.]+$/, "")}`, // Remove file extension from id
        content: post.data.body,
        category: post.data.category,
        tags: post.data.tags,
        date: post.data.pubDate.toISOString()
      }));

    const outputPath = path.join(process.cwd(), 'public/search-index.json');

    fs.writeFileSync(
      outputPath,
      JSON.stringify(searchIndex, null, 2) // Added formatting for better readability
    );

    console.log(`Search index generated successfully at ${outputPath}`);
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

// Execute the script
generateSearchIndex();