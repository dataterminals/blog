# blog

Long-form writing for [dataterminals](https://dataterminals.github.io/).

**Live:** https://dataterminals.github.io/blog/

Jekyll's [minima](https://github.com/jekyll/minima) structure — header wordmark
and nav, a reverse-chronological list of dates and titles, a three-column
footer — restyled in the landing page's house palette, over the same looping
background.

## How it works

- **Jekyll, built by GitHub Pages.** Push to `main` and Pages builds it. There
  is no workflow file and no local build artifact in the repo; `_site/` is
  ignored.
- **A project repo, not a user repo.** Pages serves `dataterminals/blog` at
  `/blog/`, which is why `_config.yml` sets `baseurl: "/blog"`. Every internal
  link goes through Jekyll's `relative_url` filter so it resolves both here and
  on a local preview. A bare `/assets/…` path works in exactly one of the two —
  use the filter.
- **The landing page is untouched.** It stays a hand-written, zero-build static
  page with its `.nojekyll` intact. This repo carries the Jekyll dependency
  alone.

## Writing a post

Add `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
layout: post
title: "Post title"
---
```

The filename's date sets the publication date and the URL
(`/blog/2026/08/05/slug/`). A future date holds the post out of the build until
that day, so scheduling is just naming.

`_posts/2026-08-05-colophon.md` is scaffolding — it renders every styled
element and doubles as a file to copy. Delete it whenever.

## Adding a page

Any `.md` in the root with a `title` in its front matter joins the header nav
automatically. Order them with `nav_order`, keep one out with
`nav_exclude: true` (which is how `404.md` stays out).

## Local preview

Needs Ruby. On Windows, install [RubyInstaller **with Devkit**](https://rubyinstaller.org/)
(pick a 3.x), reopen the terminal, then:

```bash
gem install bundler
```

```bash
bundle install
```

```bash
bundle exec jekyll serve --livereload
```

That serves <http://localhost:4000/blog/> — the same path as production, so
`baseurl` behaves identically. Drafts in `_drafts/` (undated filenames) show up
with `--drafts`.

Without Ruby you can still write and push; Pages builds it either way. You just
won't see it until it deploys.

## The one thing that lives in two repos

`assets/css/blog.css` opens with a copy of the landing page's design tokens —
the palette, the type stacks, `--maxw`, `--ease` — and `assets/bg.webm`,
`bg.mp4` and `poster.jpg` are copies of the hub's media. Nothing keeps either
in sync. Retune the palette or swap the loop over there, and copy it here.

That duplication is the cost of the blog being its own repo. It buys the
landing page's zero-build promise back.
