import { FrontMatterProps } from '../types/index';

interface PostProps {
  post: {
    frontMatter: FrontMatterProps;
  };
}

export const Post = (props: PostProps) => {
  console.log('post: ', props.post);

  return <div></div>;
};
