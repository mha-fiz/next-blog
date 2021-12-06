import { FrontMatterProps } from '../types/index';
import { CardPost } from './CardPost';

type ResultProps = {
  frontMatter: FrontMatterProps;
  slug?: string;
};

type SearchResultsProps = {
  results: ResultProps[];
};

export const SearchResults = (props: SearchResultsProps) => {
  if (props.results.length === 0) return <></>;

  return (
    <div className="absolute top-20 right-0 md:right-10 z-10 border-4 border-gray-500 bg-white text-black w-full md:w-6/12 rounded-2xl">
      <div className="p-10">
        <h2 className="text-3xl mb-3">{props.results.length} Results</h2>
        {props.results.map((result, index) => (
          <CardPost key={index} post={result} compact={true} />
        ))}
      </div>
    </div>
  );
};
