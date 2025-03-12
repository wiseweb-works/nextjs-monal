'use client';

import { faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { calculateReadingTime } from '@/helpers/readingTime';
import type { Post } from '@/types/postTypes';

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/get-markdown');
      const data = await response.json();
      setPosts(data.reverse());
    };

    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-start">
        Posts{' '}
        <a href="https://monal-im.org/post/index.xml" className="text-2xl">
          <FontAwesomeIcon icon={faRss} />
        </a>
      </h1>

      {currentPosts.map((post: Post) => (
        <div
          key={post.fileName}
          className="bg-neutral-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden mb-6 p-6"
        >
          <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">
            <Link href={`/blog/${post.fileName.replace('.md', '')}`}>
              {post.metadata.title || post.fileName.replace('.md', '')}
            </Link>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">{post.content}</p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-1">
            <span>{new Date(post.metadata.date).toLocaleDateString('de-DE')}</span>
            <span>·</span>
            <span>{calculateReadingTime(post.content)} min read</span>
            <span>·</span>
            <span>{post.metadata.author}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPost >= posts.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </article>
  );
};

export default BlogPage;
