import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/Layout';
import { PostsProps, FrontMatterProps } from '@/types/index';
import { CardPost } from '@/components/CardPost';
import { ParsedUrlQuery } from 'querystring';
import { getPosts } from '@/utils/index';
import { CategoryList } from '@/components/CategoryList';

interface IParamsProps extends ParsedUrlQuery {
  category_name: string;
}

interface IBlogCategory extends PostsProps {
  category_name: string;
  categories: string[];
}

const BlogCategoryPage: NextPage<IBlogCategory> = ({
  posts,
  category_name,
  categories,
}) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Post(s) in {category_name}
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <CardPost key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const categories = files.map(fileName => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );

    const grayMatter = matter(markdownWithMeta);
    const frontMatter = grayMatter.data as FrontMatterProps;

    return frontMatter.category.toLowerCase();
  });

  const paths = categories.map(category => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category_name } = params as IParamsProps;

  const posts = getPosts();

  //get categories for sidebar
  const allCategories = posts.map(post => post.frontMatter.category);
  const uniqueCategories = Array.from(new Set(allCategories));

  const categoryPosts = posts.filter(
    post => post.frontMatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      category_name,
      categories: uniqueCategories,
    },
  };
};

export default BlogCategoryPage;
