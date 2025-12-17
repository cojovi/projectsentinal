# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **dual-purpose repository**:
1. **Hexo Core Framework** - A fork/development copy of the Hexo static site generator (Node.js/TypeScript)
2. **Protocol Sentinel Blog** - A live blog using Hexo with the Aurora theme, including an autonomous AI article generator

## Key Commands

### Hexo Core Development

```bash
# Build TypeScript source
npm run build

# Clean build artifacts
npm run clean

# Run tests (requires pre-build)
npm test

# Run tests with coverage
npm run test-cov

# Lint code
npm run eslint

# Full pre-publish flow
npm run prepublishOnly
```

### Blog Operations (in ./blog directory)

```bash
cd blog

# Start local server
hexo server

# Generate static files
hexo generate

# Create new post
hexo new "Post Title"

# Clean generated files
hexo clean
```

### Article Generation (Python)

```bash
# Run autonomous article generator
python create_article.py

# Requires OPENAI_API_KEY environment variable
export OPENAI_API_KEY='sk-...'
```

## Architecture Overview

### Hexo Core Structure

The Hexo framework follows a **plugin-based architecture** with these core systems:

**lib/hexo/** - Core framework
- Main entry point with event-driven initialization
- Manages site lifecycle, configuration, and database
- Uses Warehouse (MongoDB-like) for data storage

**lib/extend/** - Extension system (11 extension types)
- `Console` - CLI command registration
- `Deployer` - Deployment methods
- `Filter` - Data transformation pipeline
- `Generator` - Static file generation
- `Helper` - Template helper functions
- `Highlight` - Syntax highlighting
- `Injector` - HTML injection
- `Migrator` - Migration tools
- `Processor` - File processing
- `Renderer` - File rendering (Markdown, templates, etc.)
- `Tag` - Custom template tags

**lib/plugins/** - Built-in plugins organized by extension type
- `console/` - Built-in CLI commands
- `filter/` - Core filters for data processing
- `generator/` - Page/post/archive generators
- `helper/` - Template helpers
- `processor/` - Asset and post processors
- `renderer/` - Default renderers
- `tag/` - Built-in template tags

**lib/models/** - Data models (Warehouse schemas)
- `post.ts` - Blog post model
- `page.ts` - Static page model
- `category.ts` - Category taxonomy
- `tag.ts` - Tag taxonomy
- `asset.ts` - Static assets
- `cache.ts` - Build cache

**lib/theme/** - Theme system
- Theme loading and management
- View rendering with Nunjucks

### Blog Structure

**blog/** - Protocol Sentinel blog instance
- `_config.yml` - Main Hexo configuration
- `_config.aurora.yml` - Aurora theme configuration
- `source/_posts/` - Blog post markdown files
- `themes/aurora/` - Aurora theme files
- `public/` - Generated static site

### Article Generator

**create_article.py** - Autonomous article generator
- Accepts ideas, URLs, or text as input
- Analyzes existing posts to learn publication tone
- Generates 750-1150 word articles using OpenAI GPT-4
- Creates DALL-E 3 hero images
- Outputs Hexo-compatible markdown with proper front matter
- Saves to `blog/source/_posts/` with date prefix
- Images saved to `test/` directory

## Configuration Files

- `tsconfig.json` - TypeScript compilation (lib → dist)
- `.mocharc.yml` - Test runner config (parallel execution enabled)
- `.eslintrc.json` - Code style enforcement
- `.lintstagedrc.json` - Pre-commit linting
- `blog/_config.yml` - Blog site configuration
  - Site: Protocol Sentinel
  - URL: https://www.protocolsentinel.com
  - Theme: aurora
  - Permalink: /post/:title.html

## Testing

Tests are in `test/` directory using Mocha + Chai:
- `test/index.js` - Main test entry point
- Organized by feature area under `test/scripts/`
- Requires TypeScript build before running
- Parallel execution enabled for speed

Run single test file:
```bash
npm run pretest  # Build first
npx mocha test/scripts/specific-test.js --require ts-node/register
```

## Important Notes

### Hexo Core Development
- Source is TypeScript in `lib/`, compiled to CommonJS in `dist/`
- Must build before testing (`npm run pretest` does this)
- Uses Warehouse for database (like MongoDB but in-memory)
- Extension system is the primary way to add functionality
- Heavy use of Promises (Bluebird library)

### Blog Content
- Front matter format is critical - includes custom fields like `feature`, `cover`, `image`, `og_image`
- Posts use date prefix format: `YYYY-MM-DD-title.md`
- Categories and tags drive site navigation
- Aurora theme uses JSON API (`jsonContent` config)
- SEO optimization is heavily configured

### Article Generator
- Requires OpenAI API key in environment
- Analyzes 5 random existing posts for tone matching
- Generates images sized 1024x1024 (DALL-E 3)
- Uses GitHub raw URLs for image hosting
- Custom constants at top of script for configuration

### Directory Organization
- `/lib` - Hexo framework source
- `/dist` - Compiled framework (gitignored)
- `/blog` - Blog instance (has its own node_modules)
- `/test` - Framework tests + generated images
- `/bin` - CLI entry point

## Common Workflows

### Adding Hexo Core Features
1. Choose appropriate extension type in `lib/extend/`
2. Add implementation in `lib/plugins/[type]/`
3. Register in plugin's index file
4. Add tests in `test/scripts/[type]/`
5. Build and test

### Creating Blog Posts
**Manual:**
```bash
cd blog
hexo new "Post Title"
# Edit blog/source/_posts/YYYY-MM-DD-post-title.md
hexo server  # Preview
```

**Automated:**
```bash
python create_article.py
# Follow prompts (idea/URL/text input)
cd blog && hexo generate
```

### Debugging
- Check `blog/db.json` - Hexo's database cache
- Use `hexo clean` in blog/ to clear cache
- Framework: add breakpoints in `lib/` then `npm run build`
- Tests: use `--grep "test name"` to isolate specific tests
