//create script to generate posts data, because vercel disable API Route for SSG

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function postData() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map(fileName => {
    const slug = fileName.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );
    const grayMatter = matter(markdownWithMeta);
    const frontMatter = grayMatter.data;

    return { frontMatter, slug };
  });

  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  fs.readdirSync('cache');
} catch (error) {
  fs.mkdirSync('cache');
}

fs.writeFile('cache/data.js', postData(), function (err) {
  if (err) return console.log(err);
  console.log('Post cached...');
});
