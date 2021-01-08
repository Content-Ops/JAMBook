const fs = require('fs');
const glob = require('glob');
const frontMatter = require('front-matter');
const marked = require('marked');

const posts = glob.sync('src/posts/**/*.md').map((postFilename) => {
  const postContent = fs.readFileSync(postFilename, {
    encoding: 'utf8',
  });
  const postFrontMatter = frontMatter(postContent);
  return {
    ...postFrontMatter.attributes,
    html: marked(postFrontMatter.body),
  };
});

posts.forEach((post) => {
  post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
