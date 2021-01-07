# JAMBook

Don't break the chain! :chains:  :writing\_hand: 

JAMBook is a project for people who want to use GitHub as their primary writing environment. All articles are written as basic markdown files and there is a calendar to help you not break the chain of your daily writing goal. It's deployable to Netlify and the word count function runs as a GitHub action so there is nothing for you to install or run locally.

## Use

1.  Click “Use this template” at the top of this page and name your copy whatever you want.
2.  Login into [Netlify](https://www.netlify.com/) and click “New site from Git” and select the repo you just created.
3.  Start created and editing your .md files in the `src/posts` folder
4.  Every time you commit your changes, the work count script will run and the updated site will be redeployed to Netlify

## Running Locally

You can also run this project locally if you prefer. After cloning the code to your local, go to the path, and install the dependencies:

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

This will make your blog post available under a unique url based on the slug like: `/blog/example-post`.

## Notes:

The default daily word count and document length goals are set to 200 and 1000 by default but can be adjusted on the metrics page. After adjustment, they will be saved in a cookie. 

The word count script is calculated as a pre-commit if writing locally (this results in a single Netlify build)

If the word count script is run by the GitHub action when writing through the browser (this results in a double-build on Netlify)

## Handy extensions if writing through the browser

*   [Grammarly](https://chrome.google.com/webstore/detail/grammarly-for-chrome/kbfnbcaeplbcioakkpcpgfkobkghlhen?hl=en)
*   [Speech to text](https://chrome.google.com/webstore/detail/voice-in-voice-typing/pjnefijmagpdjfhhkpljicbbpicelgko?hl=en)
*   [Rich text](https://chrome.google.com/webstore/detail/github-writer/diilnnhpcdjhhkjcbdljaonhmhapadap?hl=en-US)
