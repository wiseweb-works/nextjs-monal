import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ src, alt }) => {
          if (!src) return null;
          return (
            <Image
              src={src}
              alt={alt || 'Markdown Image'}
              width={300}
              height={300}
              style={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto',
              }}
            />
          );
        },

        table: ({ children }) => (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            {children}
          </table>
        ),
        th: ({ children }) => (
          <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td style={{ padding: '8px', border: '1px solid #ddd' }}>{children}</td>
        ),

        h1: ({ children }) => <h1 className="text-4xl font-bold my-2 text-start">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold my-2 text-start">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold my-2 text-start">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold my-2 text-start">{children}</h4>,
        p: ({ children }) => (
          <div className="prose dark:prose-dark text-justify text-lg my-2">
            <p>{children}</p>
          </div>
        ),
        a: ({ children, href }) => {
          if (!href) return <>{children}</>;

          const isInternal = href.startsWith('/') || href.startsWith('#');

          return isInternal ? (
            <Link href={href} className="underline text-blue-600 dark:text-blue-400">
              {children}
            </Link>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              {children}
            </a>
          );
        },
        ul: ({ children }) => (
          <div className="prose dark:prose-dark text-justify text-lg">
            <ul className="list-inside list-disc my-4">{children}</ul>
          </div>
        ),
        ol: ({ children }) => (
          <div className="prose dark:prose-dark text-justify text-lg">
            <ol className="list-inside list-decimal my-4">{children}</ol>
          </div>
        ),
        li: ({ children }) => <li className="my-2">{children}</li>,
        hr: () => <hr className="border-t-3 border-gray-400 dark:border-gray-600 my-4" />,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-700 dark:text-gray-300 my-2">
            <em>{children}</em>
          </blockquote>
        ),
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        pre: ({ children }) => (
          <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200  p-4 rounded-md overflow-x-auto">
            {children}
          </pre>
        ),
        code: ({ children }) => (
          <code className="mx-1 px-2 py-1 text-[0.78em] leading-[1.5] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-sm">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
