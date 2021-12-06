import Link from 'next/link';

type LabelProps = {
  category: string;
};

export const CategoryLabel = (props: LabelProps) => {
  const colorKey = {
    Javascript: 'indigo',
    React: 'yellow',
    CSS: 'blue',
    Python: 'green',
    PHP: 'purple',
    Other: 'red',
    Django: 'gray',
  };

  return (
    <div
      className={`px-2 py-1 bg-${
        colorKey[props.category]
      }-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${props.category.toLowerCase()}`}>
        {props.category}
      </Link>
    </div>
  );
};
