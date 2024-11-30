import * as fs from 'fs';
import * as path from 'path';
import { getPublishedBlogCollection } from '../src/utils/collections';
import type { BlogPost } from '../src/utils/collections';

async function generateSearchIndex() {
  const publishedPosts = await getPublishedBlogCollection();
  
  const searchIndex = publishedPosts
    .map(post => ({
      title: post.data.title,
      url: `/blog/${post.slug}`,
      content: post.body,
      category: post.data.category,
      tags: post.data.tags,
      date: post.data.pubDate.toISOString()
    }));

  fs.writeFileSync(
    path.join(process.cwd(), 'public/search-index.json'),
    JSON.stringify(searchIndex)
  );
}

generateSearchIndex();