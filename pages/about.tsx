import { NextPage } from 'next';
import Layout from '../components/Layout';

const AboutPage: NextPage = () => {
  return (
    <Layout title="About">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
      <div className="w-1/2 bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5">HafizDev Blog</h3>
        <p className="mb-3">
          This is a blog created with Nextjs, Markdown, and Typescript.
        </p>
        <span className="font-bold">v1.0.0</span>
      </div>
    </Layout>
  );
};

export default AboutPage;
