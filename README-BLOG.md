# Blog — how it works

This site now has a Jekyll-powered blog bolted onto the existing static
portfolio. GitHub Pages builds Jekyll sites natively, so there's no local
build step, no npm, and nothing to install — you just push markdown files.

`index.html`, `portfolio.css`, `portfolio.js`, `vikas.jpg`, and `assets/`
have no Jekyll front matter, so Jekyll copies them through untouched. The
portfolio keeps working exactly as it did before.

## Writing a new post

1. Add a new file to `_posts/` named `YYYY-MM-DD-your-title.md`, for example:

   ```
   _posts/2026-08-01-new-hardware-build.md
   ```

2. Give it front matter like the example post:

   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2026-08-01 09:00:00 +0530
   tags: [robotics, embedded]
   excerpt: "One or two sentences shown on the blog listing page."
   ---

   Your post content in Markdown goes here.
   ```

3. `git add`, `git commit`, `git push` to `main`. GitHub Pages rebuilds the
   site automatically — no manual build step. The post shows up on
   `/blog.html` and at `/blog/2026/08/01/new-hardware-build/`.

That's it — no `bundle exec jekyll build`, no `_site/` to commit.

> **Watch out for future-dated posts.** GitHub Pages builds run in UTC and
> Jekyll silently skips any post whose `date:` is later than the build's
> current time — it won't error, it just won't appear. If you write a post
> in the evening in IST (UTC+5:30) and give it today's date with a late
> time (e.g. `18:00 +0530` = `12:30 UTC`), it can still be "in the future"
> relative to whenever the build actually runs. If a post you just pushed
> doesn't show up, this is the first thing to check — back the time down a
> few hours, or use an earlier date.

## Manual setup still required: Giscus comments

Comments are wired into `_layouts/post.html` via [giscus](https://giscus.app),
but giscus needs a one-time setup on your GitHub account before it will
actually load comments:

1. Go to this repo's **Settings → General → Features** and enable
   **Discussions**.
2. Install the [giscus GitHub App](https://github.com/apps/giscus) on this
   repository.
3. Visit [giscus.app](https://giscus.app), enter
   `mevikaskulkarni/mevikaskulkarni.github.io` as the repo, pick a
   Discussion category (e.g. "General" or "Announcements"), and it will
   generate a `data-repo-id` and `data-category-id` for you.
4. Open `_layouts/post.html` and replace `REPLACE_WITH_REPO_ID` and
   `REPLACE_WITH_CATEGORY_ID` in the `<script src="https://giscus.app/client.js">`
   tag with the real values (and update `data-category` if you picked a
   category other than "General").

Until step 4 is done, the "Comments" section on each post will render but
stay empty.

## Note on the like/dislike counters

Likes/dislikes use [CounterAPI](https://counterapi.dev) — a free counter
API that needs no signup; a counter is created automatically the first
time it's incremented. The workspace name is set in `_layouts/post.html`
(`workspace = 'vikaskulkarni-portfolio'`) — change it if you'd rather use
your own namespace. Voting is tracked per-browser via `localStorage` so
the same visitor can't spam the buttons.
