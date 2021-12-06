import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
// import Link from 'next/link';
import Layout from '@/components/Layout';
import { PostProps } from '@/types/index';
import { CardPost } from '@/components/CardPost';
import { FrontMatterProps } from '@/types/index';
import { ParsedUrlQuery } from 'querystring';
import { Pagination } from '@/components/Pagination';
import { getPosts } from '@/utils/index';
import { CategoryList } from '@/components/CategoryList';

interface IParamsProps extends ParsedUrlQuery {
  page_index: string;
}

type PageIndexProps = {
  params: {
    page_index: string;
  };
};

interface BlogPageProps {
  posts: PostProps[];
  currentPage: number;
  totalPagination: number;
  categories: string[];
}

const Blog: NextPage<BlogPageProps> = ({
  currentPage,
  totalPagination,
  posts,
  categories,
}) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <CardPost key={index} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPagination={totalPagination}
          />
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
  const POST_PER_PAGE = 3;

  const totalPagination = Math.ceil(files.length / POST_PER_PAGE);

  let paths = [] as PageIndexProps[];
  let page = 1;

  while (page <= totalPagination) {
    paths.push({ params: { page_index: page.toString() } });
    page++;
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const posts = getPosts();

  //get categories for sidebar
  const allCategories = posts.map(post => post.frontMatter.category);
  const uniqueCategories = Array.from(new Set(allCategories));

  let currentPage;

  if (!context.params) {
    currentPage = 1;
  } else {
    const { page_index } = context.params as IParamsProps;
    currentPage = parseInt(page_index);
  }

  const POSTS_PER_PAGE = 3;

  const pageIndex = currentPage - 1;
  const totalPagination = Math.ceil(posts.length / POSTS_PER_PAGE);
  const postsToShow = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: postsToShow,
      currentPage,
      totalPagination,
      categories: uniqueCategories,
    },
  };
};

export default Blog;
