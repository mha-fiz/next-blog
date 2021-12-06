import Link from 'next/link';
type PaginationProps = {
  currentPage: number;
  totalPagination: number;
};

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPagination } = props;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPagination;
  const nextPage = `/blog/page/${currentPage + 1}`;
  const previousPage = `/blog/page/${currentPage - 1}`;

  if (totalPagination === 1) return <></>;

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        {!isFirstPage && (
          <Link href={previousPage}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Previous
            </li>
          </Link>
        )}

        {Array.from({ length: totalPagination }, (_, index) => (
          <Link key={index} href={`/blog/page/${index + 1}`}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              {index + 1}
            </li>
          </Link>
        ))}

        {!isLastPage && (
          <Link href={nextPage}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};
