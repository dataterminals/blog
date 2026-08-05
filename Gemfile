source "https://rubygems.org"

# The exact gem set GitHub Pages builds with — pinning it here means a local
# preview matches what actually deploys. It already bundles Jekyll, jekyll-feed
# and jekyll-seo-tag, so don't list those separately; the versions would fight.
gem "github-pages", group: :jekyll_plugins

# Ruby 3.0 dropped webrick from the standard library, and the Jekyll 3.x that
# github-pages pins still expects it there. Without this, `jekyll serve` dies
# with "cannot load such file -- webrick". Harmless on older Rubies.
gem "webrick", "~> 1.8"

# Windows and JRuby ship no zoneinfo database.
gem "tzinfo-data", platforms: [:mingw, :x64_mingw, :mswin, :jruby]
