# Protocol Sentinel: workspace and verification guide

## Start in the right workspace

| Directory / script | Role |
|---|---|
| `blog/` | Protocol Sentinel's Hexo 7 publication, using Aurora |
| `create_article.py` | Recommended local generation entry point; writes files without automatic Git publication |
| `create_article_git.py`, `protocol_sentinal_blog_creator.py` | Other generator variants with Git staging/commit/push behavior; review before running |
| `blog/source/scripts/generate_post.py` | Issue-style helper using environment input; OpenAI or configured local LLM, optional Tavily |
| `lib/`, root `package.json`, `test/scripts/` | Inherited Hexo framework development copy and upstream framework tests |
| `src/`, `supabase/` | Separate TrueGrit construction application; not part of the blog build |
| `public/` | Committed generated snapshot; distinct from current build output at `blog/public/` |
| `test/` | Mixed historical directory containing framework tests and generated media |

There is no single command that builds all these projects coherently. The README deliberately leads with the publishing workflow. A future cleanup can split the inherited framework and TrueGrit into independent workspaces.

## Reproduce the checks

From `blog/`, run `npm install` then `npm run build`. The reviewed build installed dependencies with lifecycle scripts disabled and built through `node node_modules/hexo/bin/hexo generate`. The repository does not commit a blog lockfile, so future installs may resolve different compatible dependency versions.

From the repository root, run `node showcase/check-opengraph.cjs` for checks against the actual HTML filter. Python generator syntax was compiled without executing imports or calling providers.

Verified November 16, 2026 against source revision `1e4b2ee6285cc70a1a16d0fbfe43662ce9c1aad2` before documentation changes:

- Hexo build: succeeded, 556 files generated.
- Social metadata: missing fields, existing fields, attribute escaping, raw image URL normalization, relative covers, and no-head/no-data cases checked by the included script.
- Live publication: opened and visually reviewed in Chrome.
- No article generation, automatic Git generator, deployment, live provider call, or TrueGrit workflow was exercised.

## Current integration limits

- Model names are hard-coded across older helper variants. Availability and costs were not tested.
- The root Python requirements omit `requests`, which `create_article.py` imports. The README install command includes it explicitly.
- JSON cleanup uses hand-written brace scanning; braces inside strings and other response edge cases deserve stronger schema-based handling.
- The main script writes under `_posts`, not an isolated editorial draft queue. Review before building/publishing.
- Older helpers include random author-name generation. Do not treat generated names or honorifics as verified people or credentials. The main `create_article.py` prints that generated name but its final front matter does not include it.
- The HTML filter supplies metadata. It does not verify reporting, sources, publisher identity, or a social network's rendering behavior.
- The root framework tests are upstream Hexo coverage and are not evidence of tests authored for the Python generator.

## Presentation assets

Original SVG illustrations use Space Grotesk and JetBrains Mono with embedded subsets; licenses are included under `readme-assets/`. Cover art includes desktop, mobile, animated, and reduced-motion versions. Architecture diagrams are explanatory artwork, not UI captures.
