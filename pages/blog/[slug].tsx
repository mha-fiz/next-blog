import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { CategoryLabel } from '@/components/CategoryLabel';
import { FrontMatterProps } from '@/types/index';
import { ParsedUrlQuery } from 'querystring';

interface IParamsProps extends ParsedUrlQuery {
  slug: string;
}

type BlogPostProps = {
  frontMatter: FrontMatterProps;
  content: string;
  slug: string;
};

const BlogPost: NextPage<BlogPostProps> = props => {
  const { title, author, author_image, date, cover_image, category } =
    props.frontMatter;

  return (
    <Layout title={title}>
      <Link href="/blog">Go back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel category={category} />
        </div>

        <img src={cover_image} alt="" className="w-full rounded" />

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              alt=""
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{author}</h4>
          </div>

          <div className="mr-4">{date}</div>
        </div>

        <div className="blog-text mt-2">
          <div
            dangerouslySetInnerHTML={{ __html: marked(props.content) }}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map(fileName => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParamsProps;

  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);

  return {
    props: {
      slug,
      frontMatter,
      content,
    },
  };
};

export default BlogPost;
