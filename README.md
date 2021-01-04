# Content Ops

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/Content-Ops/JAMBook" rel="nofollow"><img src="https://camo.githubusercontent.com/417d890ba67c98ad5856b715343a61cdbf07d72b9bd5b79dd45d43de634c29ea/68747470733a2f2f7777772e6e65746c6966792e636f6d2f696d672f6465706c6f792f627574746f6e2e737667" alt="Deploy to Netlify" data-canonical-src="https://www.netlify.com/img/deploy/button.svg" style="max-width:100%;"></a>

Don't break the chain!

## Getting started

Once you have created a new project from [Content Ops](https://github.com/singularityhacker/Content_Ops), go to the path and install the dependencies:

```bash
cd <path-of-project>
npm install # or yarn install
```

In case you want to look at the project locally first, you can run the project in development mode:

```bash
npm run dev # or yarn dev
```

This will start the development server on [localhost:3000](http://localhost:3000).

## Display blog post changes

To be able to look at additions and subtraction for your blog posts, you need to put the blog post files into the `src/posts` folder. By default, you will only find a `example-post.md` file in the folder.

## Go through the dashboard on your deployed url on Netlify

Whenever you are done with updates to your blog posts located in the `src/posts` folder, make sure to commit and push the changes. This will run the `wordCount.js` script for you automatically in the background and the latest additions and subtractions will be calculated.

## View blog posts directly

If you want to be able to view your blog posts directly in the browser, you can find them under the `/blog` url or through clicking the "Blog" navigation item in the UI.

To connect the blog post articles correctly, you have to add frontmatter metadata to each of them like shown in the example post:

```yaml
---
title: 'Example post'
slug: 'example-post'
---

```

This will make your blog post available under a unique url based on the slug like `/blog/example-post`.
