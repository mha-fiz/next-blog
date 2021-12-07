// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { FrontMatterProps } from '../../types/index';

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   let posts;

//   if (process.env.NODE_ENV === 'production') {
//     //todo - fetch from cache
//     posts = require('../../cache/data').posts
//   } else {
//     const files = fs.readdirSync(path.join('posts'));

//     posts = files.map(fileName => {
//       const slug = fileName.replace('.md', '');
//       const markdownWithMeta = fs.readFileSync(
//         path.join('posts', fileName),
//         'utf-8'
//       );

//       const grayMatter = matter(markdownWithMeta);
//       const frontMatter = grayMatter.data as FrontMatterProps;

//       return { frontMatter, slug };
//     });
//   }

//   const query = req.query.q as string;

//   const results = posts?.filter(
//     ({ frontMatter: { title, excerpt, category } }) =>
//       title.toLowerCase().indexOf(query) != -1 ||
//       excerpt.toLowerCase().indexOf(query) != -1 ||
//       category.toLowerCase().indexOf(query) != -1
//   );

//   res.status(200).json(JSON.stringify({ results }));
// };

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default (req, res) => {
  let posts;

  if (process.env.NODE_ENV === 'production') {
    //todo - fetch from cache
    posts = require('../../cache/data').posts;
  } else {
    const files = fs.readdirSync(path.join('posts'));

    posts = files.map(fileName => {
      const slug = fileName.replace('.md', '');
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', fileName),
        'utf-8'
      );

      const grayMatter = matter(markdownWithMeta);
      const { data: frontMatter } = grayMatter;

      return { frontMatter, slug };
    });
  }

  const query = req.query.q;

  const results = posts?.filter(
    ({ frontMatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(query) != -1 ||
      excerpt.toLowerCase().indexOf(query) != -1 ||
      category.toLowerCase().indexOf(query) != -1
  );

  res.status(200).json(JSON.stringify({ results }));
};
