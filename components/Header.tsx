import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="bg-gray-800 text-gray-100 w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0">
            <Image
              src="/images/logo.png"
              alt="myblog logo"
              width={40}
              height={40}
            />
            <span className="ml-3 text-xl">HafizDev</span>
          </a>
        </Link>
        <nav className="flex flex-wrap text-base md:ml-auto md:w-4/5 items-center justify-end">
          <Link href="/blog">
            <a className="mx-5 cursor-pointer hover:text-indigo-500">Blog</a>
          </Link>
          <Link href="/about">
            <a className="mx-5 cursor-pointer hover:text-indigo-500">About</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};
