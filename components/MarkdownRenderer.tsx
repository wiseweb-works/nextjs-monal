import Image from 'next/image';
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
            <div style={{ position: 'relative', width: '300px', height: 'auto' }}>
              <Image
                src={src}
                alt={alt || 'Markdown Image'}
                width={300}
                height={300}
                layout="responsive"
              />
            </div>
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

        h1: ({ children }) => <h1 className="text-5xl font-bold mb-4 text-center">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold my-4 text-start">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold my-4 text-start">{children}</h3>,
        p: ({ children }) => (
          <div className="prose dark:prose-dark text-justify text-lg">
            <p>{children}</p>
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
