export interface Post {
  fileName: string;
  content: string;
  metadata: {
    title?: string;
    date: string;
    author: string;
    [key: string]: any;
  };
}
