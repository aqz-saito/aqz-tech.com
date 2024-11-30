import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import type { SearchResult, SearchProps } from "@/types/search.ts";

interface Props {
  placeholder?: string;
}

/**
 * SearchBar Component
 *
 * A search bar component that allows users to search articles.
 *
 * @param {string} [placeholder="Search..."] - Placeholder text for the search input.
 */
export default function SearchBar({ placeholder = "Search..." }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult>>();
  const searchRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load search index
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => {
        setFuse(
          new Fuse(data, {
            keys: ["title", "description", "tags"],
            threshold: 0.3,
            ignoreLocation: true,
          })
        );
      });
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (!fuse || value.length < 2) {
      setResults([]);
      return;
    }
    setResults(fuse.search(value).map(({ item }) => item));
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search articles..."
          className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Article Search"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => setQuery("")}
        >
          {query && (
            <React.Fragment>
              <span className="sr-only">Clear</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </React.Fragment>
          )}
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <ul className="max-h-96 overflow-auto py-2">
            {results.map((result) => (
              <li key={result.slug}>
                <a
                  href={`/blog/${result.slug}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {result.title}
                  </h3>
                  {result.description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {result.description}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
