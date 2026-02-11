export interface PostMetadata {
  title: string;
  description: string;
  author: string;
  date: string;
  tags?: string[];
}

export interface Post {
  id: string;
  slug: string;
  content: string;
  metadata: PostMetadata;
}
