import { FrontMatterProps } from '../types/index';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface IPost {
  slug: string;
  frontMatter: FrontMatterProps;
}

export const sortPostsByDate = (posts: IPost[]) => {
  return posts.sort((a, b) => {
    const date1 = new Date(a.frontMatter.date).valueOf();
    const date2 = new Date(b.frontMatter.date).valueOf();
    return date2 - date1;
  });
};

const files = fs.readdirSync(path.join('posts'));

export const getPosts = () => {
  const posts = files.map(fileName => {
    const slug = fileName.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );

    const grayMatter = matter(markdownWithMeta);
    const frontMatter = grayMatter.data as FrontMatterProps;

    return { slug, frontMatter };
  });

  return sortPostsByDate(posts);
};
