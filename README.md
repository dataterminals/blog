# blog

Long-form writing for [dataterminals](https://dataterminals.github.io/).

**Live:** https://dataterminals.github.io/blog/

Jekyll's [minima](https://github.com/jekyll/minima) structure — header wordmark
and nav, a reverse-chronological list of dates and titles, a three-column
footer — in the landing page's house style: its six themes, its theme switch,
its looping backgrounds, taken straight from the hub rather than copied.

The posts are also readable on the hub itself, in the blog viewer at the foot
of its page, which reads them from this site's `posts.json`. It starts folded
into a small drifting pane with nothing on it that says blog; clicking the pane
unfolds it.

## How it works

- **Jekyll, built by GitHub Pages.** Push to `main` and Pages builds it. There
  is no workflow file and no local build artifact in the repo; `_site/` is
  ignored.
- **A project repo, not a user repo.** Pages serves `dataterminals/blog` at
  `/blog/`, which is why `_config.yml` sets `baseurl: "/blog"`. Every internal
  link goes through Jekyll's `relative_url` filter so it resolves both here and
  on a local preview. A bare `/assets/…` path works in exactly one of the two —
  use the filter.
- **The landing page stays zero-build.** It's a hand-written static page with
  its `.nojekyll` intact. This repo carries the Jekyll dependency alone; what it
  borrows from the hub are plain files the hub serves anyway (see the last
  section).

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
element and doubles as a file to copy. Delete it whenever. (It shows in the
hub's blog viewer too, for as long as it's here.)

A post appears in the hub's blog viewer as soon as Pages has rebuilt this site;
nothing in the hub's repo needs touching.

## posts.json

[`posts.json`](posts.json) is every post, rendered, for the hub's blog viewer
(`blog.js` in `dataterminals/dataterminals.github.io`). Newest first, one object
per post:

```jsonc
{
  "title": "mundane",
  "date": "2026-08-09T00:00:00+00:00",   // sorted on; machine-readable
  "label": "Aug 9, 2026",                // shown; the same format the list here uses
  "url": "https://dataterminals.github.io/blog/2026/08/09/mundane/",
  "html": "<p>i feel like if there’s anything more…</p>"
}
```

`html` is the post body exactly as its own page carries it — kramdown's output,
Rouge's highlighting, every Liquid tag resolved, no layout around it — because
posts are built before pages, so by the time Jekyll reaches this file every post
is already HTML. That's why the hub never parses markdown: it shows what this
site built. `label` exists so the hub never formats a date itself; a post
stamped at midnight UTC would read as the day before anywhere west of Greenwich.

Adding a field is safe. Renaming or removing one breaks the viewer until
`blog.js` is told.

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

The preview still takes its look from the live hub (see the last section), so it
needs a network connection to look right. Offline, `blog.css` keeps it readable
in the default palette, without the background clip or the theme switch.

Without Ruby you can still write and push; Pages builds it either way. You just
won't see it until it deploys.

## Getting back to the hub

Two routes, one at each end of the page, because a reader arrives at the top and
leaves from wherever they stopped reading:

- **The header's `← the hub` link**, rendered whenever `_config.yml` sets
  `home_url`. It takes brighter ink than the in-site nav links and carries an
  arrow — the wordmark beside it goes to `/blog/`, not to the hub, so this is the
  only way home from the top.
- **The footer shelf's house icon.** Where the hub's own shelf carries the Blog
  icon, this one carries the hub, since each site's own entry would only point at
  the page you're already standing on. It's the one deliberate difference between
  the two copies of the shelf, and the only link in it that stays in this tab.

## What comes from the hub

The house style isn't kept here; it's loaded off the hub on every page:

- **`house.css`** — the six themes' palettes, the background layers, the theme
  switch, and `.prose`, which sets a post's body. The hub's blog viewer uses the
  same `.prose`, so a post reads the same in both places.
- **`theme.js`** — which theme is mounted, its background clip, and the switch in
  the top-right corner.
- **The clips** in the hub's `assets/`, which `theme.js` resolves against its own
  url.

This used to be copies — of the tokens, the ember loop and its poster — and the
copies drifted: the blog was left on one theme while the hub grew six, and kept
the ember loop from before its re-cut. Loading the originals means a retuned
palette or a new theme arrives here with no edit, and the two sites share an
origin, so they share one remembered theme choice (`dt:theme`) as well. A reader
coming from the hub usually has the clip cached already.

The cost is that the hub's token *names* are this site's API: rename one over
there and `blog.css` loses it too. Where the hub lives is `home_url` in
`_config.yml`, which also draws the header's `← the hub` link.

`blog.css` is only what's this site's own — minima's header, post list and
footer, set in the hub's tokens rather than hues — plus a floor of the default
palette in case the hub can't be reached, and one deliberate difference: a
heavier scrim, since a thousand words sit on it rather than a dozen. It's the
mounted theme's own scrim with a fixed amount laid on.

**Still copied:** the footer's link shelf and the pair of scripts behind it,
`assets/js/tip.js` (the shared cursor-anchored hover readout) and
`assets/js/shelf.js` (which binds the shelf to it), along with their rules in
`blog.css`. Nothing keeps those in sync. Change the shelf over there — add an
icon, swap one — and copy it here, minding the one intended difference above
(the hub icon in place of the Blog one).
