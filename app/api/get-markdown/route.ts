import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const markdownFiles = fs.readdirSync(contentDirectory);

  const markdownContent = markdownFiles
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(contentDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { content, data } = matter(fileContent);

      return { fileName: file, content, metadata: data };
    });

  return new Response(JSON.stringify(markdownContent), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
