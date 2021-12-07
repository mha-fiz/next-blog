import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchResults } from './SearchResult';
import { FrontMatterProps } from '@/types/index';

type ResultProps = {
  frontMatter: FrontMatterProps;
  slug?: string;
};

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<ResultProps[]>([]);

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === '') {
        setSearchResult([]);
      } else {
        const res = await fetch(`/api/search?q=${searchTerm}`);
        const data = await res.json();
        setSearchResult(data.results);
      }
    };

    getResults();
  }, [searchTerm]);

  //   console.log('searchTerm: ', searchTerm);
  //   console.log('searchResult: ', searchResult);

  return (
    <div className="relative bg-gray-600 p-4">
      <div className="container mx-auto flex items-center justify-center md:justify-end">
        <div className="relative text-gray-600 w-72">
          <form>
            <input
              type="search"
              id="search"
              name="search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search"
            />

            <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" />
          </form>
        </div>
      </div>
      <SearchResults results={searchResult} />
    </div>
  );
};
