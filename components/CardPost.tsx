import { PostProps } from '@/types/index';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryLabel } from './CategoryLabel';

type CardPostProps = {
  post: PostProps;
  compact?: boolean;
};

export const CardPost = (props: CardPostProps) => {
  const {
    post: { slug, frontMatter },
    compact,
  } = props;

  return (
    <>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        {!compact && (
          <Image
            src={frontMatter.cover_image}
            alt=""
            height={420}
            width={600}
            className="mb-4 rounded"
          />
        )}

        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">{frontMatter.date}</span>

          <CategoryLabel category={frontMatter.category} />
        </div>
        <div className="mt-2 h-32">
          <Link href={`/blog/${slug}`}>
            <a className="text-2xl text-gray-700 font-bold hover:underline">
              {frontMatter.title}
            </a>
          </Link>

          <p className="mt-2 text-gray-600">{frontMatter.excerpt}</p>
        </div>

        {!compact && (
          <div className="flex justify-between items-center mt-6">
            <Link href={`/blog/${slug}`}>
              <a className="text-gray-900 hover:text-blue-600">Read more</a>
            </Link>

            <div className="flex items-center">
              <img
                src={frontMatter.author_image}
                alt=""
                className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              />

              <h3 className="text-gray-700 font-bold">{frontMatter.author}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
