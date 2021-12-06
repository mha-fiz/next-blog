export type FrontMatterProps = {
  title: string;
  date: Date;
  excerpt: string;
  cover_image: string;
  category: string;
  author: string;
  author_image: string;
};

export type PostProps = {
  slug?: string;
  frontMatter: FrontMatterProps;
};

export interface PostsProps {
  posts: PostProps[];
}
