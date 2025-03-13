'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { calculateReadingTime } from '@/helpers/readingTime';
import type { Post } from '@/types/postTypes';

const PostPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPost = async () => {
      const slug = pathname?.split('/').pop();
      if (!slug) return;

      const response = await fetch(`/api/get-markdown`);
      const data = await response.json();
      const selectedPost = data.find((p: Post) => p.fileName.replace('.md', '') === slug);
      setPost(selectedPost);
    };

    fetchPost();
  }, [pathname]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100dvh-18rem)] my-20">
      <h1 className="text-5xl font-bold mb-4 text-center">{post.metadata.title}</h1>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-1 mb-4">
        <span>{new Date(post.metadata.date).toLocaleDateString('de-DE')}</span>
        <span>·</span>
        <span>{calculateReadingTime(post.content)} min read</span>
        <span>·</span>
        <span>{post.metadata.author}</span>
      </div>
      <MarkdownRenderer content={post.content} />
    </article>
  );
};

export default PostPage;
