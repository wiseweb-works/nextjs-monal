'use client';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { MarkdownContent } from '@/types/markdownTypes';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState<MarkdownContent[]>([]);
  const [allContent, setAllContent] = useState<MarkdownContent[]>([]);

  useEffect(() => {
    const fetchMarkdownFiles = async () => {
      const response = await fetch('/api/get-markdown');
      const data = await response.json();
      setAllContent(data);
      setFilteredContent(data);
    };
    fetchMarkdownFiles();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredContent([]);
      return;
    }

    const results = allContent.filter((file) =>
      file.content.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredContent(results);
  };

  const removeExtension = (fileName: string) => fileName.replace(/\.md$/, '');

  return (
    <div className="max-w-3xl mx-auto min-h-[calc(100dvh-18rem)] my-20 text-gray-900 dark:text-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Search <FontAwesomeIcon icon={faMagnifyingGlass} />
      </h1>

      <div className="w-full max-w-lg mb-8">
        <input
          type="text"
          placeholder="Type something to search..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="w-full max-w-4xl">
        {filteredContent.length > 0
          ? filteredContent.map((file, index) => (
              <div
                key={index}
                className="bg-neutral-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                  <Link href={`/blog/${removeExtension(file.fileName)}`}>
                    {file.metadata.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{file.content}</p>
              </div>
            ))
          : searchQuery !== '' && (
              <p className="text-center text-gray-500 dark:text-gray-400">No result found.</p>
            )}
      </div>
    </div>
  );
};

export default SearchPage;
