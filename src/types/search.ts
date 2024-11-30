export interface SearchResult {
  title: string;
  url: string;
  excerpt: string;
  category?: string;
  tags?: string[];
  date?: string;
  slug: string;          // URLスラッグ
  description?: string;  // 記事の説明
  content: string;       // 記事の本文
}

export interface SearchIndex {
  title: string;
  slug: string;
  description?: string;
  content: string;
  category?: string;
  tags?: string[];
  date: string;
}

export interface SearchProps {
  placeholder?: string;
  maxResults?: number;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error?: Error;
}