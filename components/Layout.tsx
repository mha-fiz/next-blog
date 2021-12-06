import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Header } from './Header';
import { SearchBar } from './SearchBar';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

const Layout: FC<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <div>
      <Head>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <SearchBar />

      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: 'Welcome to my blog',
  description: 'Article on React and Nextjs best practice',
  keywords: 'web dev, programming, react, nextjs, frontend',
};

export default Layout;
