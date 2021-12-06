import { NextPage } from 'next';
import Layout from '../components/Layout';

const NotFoundPage: NextPage = () => {
  return (
    <Layout title="Page not found">
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-4xl">Whoops!</h1>
        <h3 className="text-2xl text-gray-300">
          The page you are looking for does not exist.
        </h3>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
