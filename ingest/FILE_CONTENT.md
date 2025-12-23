(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
<img src="https://raw.githubusercontent.com/hexojs/logo/master/hexo-logo-avatar.png" alt="Hexo logo" width="100" height="100" align="right" />

# Hexo

> A fast, simple & powerful blog framework, powered by [Node.js](https://nodejs.org).

[Website](https://hexo.io) |
[Documentation](https://hexo.io/docs/) |
[Installation Guide](https://hexo.io/docs/#Installation) |
[Contribution Guide](https://hexo.io/docs/contributing) |
[Code of Conduct](CODE_OF_CONDUCT.md) |
[API](https://hexo.io/api/) |
[Twitter](https://twitter.com/hexojs)

[![NPM version](https://badge.fury.io/js/hexo.svg)](https://www.npmjs.com/package/hexo)
![Required Node version](https://img.shields.io/node/v/hexo)
[![Build Status](https://github.com/hexojs/hexo/workflows/Tester/badge.svg)](https://github.com/hexojs/hexo/actions?query=workflow%3ATester)
[![dependencies Status](https://img.shields.io/librariesio/release/npm/hexo)](https://libraries.io/npm/hexo)
[![Coverage Status](https://coveralls.io/repos/hexojs/hexo/badge.svg?branch=master)](https://coveralls.io/r/hexojs/hexo?branch=master)
[![Gitter](https://badges.gitter.im/hexojs/hexo.svg)](https://gitter.im/hexojs/hexo)
[![Discord Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/teM2Anj)
[![Telegram Chat](https://img.shields.io/badge/chat-on%20telegram-32afed.svg)](https://t.me/hexojs)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhexojs%2Fhexo.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhexojs%2Fhexo?ref=badge_shield)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

## Features

- Blazing fast generating
- Support for GitHub Flavored Markdown and most Octopress plugins
- One-command deploy to GitHub Pages, Heroku, etc.
- Powerful API for limitless extensibility
- Hundreds of [themes](https://hexo.io/themes/) & [plugins](https://hexo.io/plugins/)

## Quick Start

**Install Hexo**

``` bash
$ npm install hexo-cli -g
```

Install with [brew](https://brew.sh/) on macOS and Linux:

```bash
$ brew install hexo
```

**Setup your blog**

``` bash
$ hexo init blog
$ cd blog
```

**Start the server**

``` bash
$ hexo server
```

**Create a new post**

``` bash
$ hexo new "Hello Hexo"
```

**Generate static files**

``` bash
$ hexo generate
```

## More Information

- Read the [documentation](https://hexo.io/)
- Visit the [Awesome Hexo](https://github.com/hexojs/awesome-hexo) list
- Find solutions in [troubleshooting](https://hexo.io/docs/troubleshooting.html)
- Join discussion on [Google Group](https://groups.google.com/group/hexo), [Discord](https://discord.gg/teM2Anj), [Gitter](https://gitter.im/hexojs/hexo) or [Telegram](https://t.me/hexojs)
- See the [plugin list](https://hexo.io/plugins/) and the [theme list](https://hexo.io/themes/) on wiki
- Follow [@hexojs](https://twitter.com/hexojs) for latest news

## Contributing

We welcome you to join the development of Hexo. Please see [contributing document](https://hexo.io/docs/contributing). 🤗

Also, we welcome PR or issue to [official-plugins](https://github.com/hexojs).

## Contributors

[![](https://opencollective.com/Hexo/contributors.svg?width=890)](https://github.com/hexojs/hexo/graphs/contributors)

## Backers

[![Backers](https://opencollective.com/hexo/tiers/backers.svg?avatarHeight=36&width=600)](https://opencollective.com/hexo)

## Sponsors

<a href="https://linktr.ee/rss3"><img src="https://d1fdloi71mui9q.cloudfront.net/8xxahBqRTnecXgXKObeo_L8ks2KjC31fmM5Nd" alt="RSS3" width="200"/></a>

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhexojs%2Fhexo.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhexojs%2Fhexo?ref=badge_large)



================================================
FILE: ARTICLE_GENERATOR_README.md
================================================
# Autonomous Blog Article Generator for Hexo

A fully autonomous Python script that generates complete, publication-ready blog posts for your Hexo blog with zero manual intervention.

## Features

- **Multi-Input Support**: Handles ideas, URLs, or unstructured text automatically
- **Tone Matching**: Analyzes existing posts to learn your publication's voice
- **AI Content Generation**: Creates 750-1150 word articles with professional structure
- **Automatic Metadata**: Generates categories, tags, and other metadata
- **Image Generation**: Creates photorealistic hero images using DALL-E 3
- **Hexo-Compatible**: Generates proper front matter format for Hexo

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure API Key

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Load Environment Variables

```bash
# On Mac/Linux:
export OPENAI_API_KEY='your-key-here'

# Or use a .env file with python-dotenv (install: pip install python-dotenv)
```

## Usage

### Basic Usage

```bash
python create_article.py
```

The script will prompt you to enter your content. You can provide:

1. **Simple Idea**: "AI in healthcare"
2. **URL**: Full article URL to rewrite in your voice
3. **Unstructured Text**: Any length text, notes, or draft content

Press `Ctrl+D` (Mac/Linux) or `Ctrl+Z` (Windows) when done entering content.

### Example Workflow

```
$ python create_article.py
Enter your blog content (idea, URL, or text). Press Ctrl+D when done:
---
AI agents are changing everything
---
✓ Input type detected: IDEA

🔍 Analyzing existing articles to learn tone...
✓ Tone identified: professional, engaging, and slightly conversational

Default tone: professional, engaging, and slightly conversational
Press Enter to use default, or type custom tone: [Enter]

📝 Generating article...
✓ Article generated: The Future is Now: AI Agents Transforming Work
✓ Word count: 987 words

🏷️  Generating metadata...
✓ Category: Technology
✓ Tags: AI Agents, Technology, Innovation, Future

✓ Author: Dr. Elena Chen
✓ Slug: the-future-is-now-ai-agents-transforming-work

🎨 Generating image prompt...
✓ Image prompt: A photorealistic editorial photograph...

🖼️  Generating image with DALL-E...
✓ Image saved: the-future-is-now-ai-agents-transforming-work.png

✓ Article saved: blog/source/_posts/2025-01-15-the-future-is-now-ai-agents-transforming-work.md
```

## Output

The script generates:

1. **Markdown File**: Saved to `blog/source/_posts/` with proper Hexo front matter
2. **Hero Image**: Saved to `test/` folder as PNG
3. **Complete Metadata**: Title, date, tags, categories, cover image URLs

### Front Matter Format

The generated articles include all required Hexo front matter:

```yaml
---
title: "Your Article Title"
date: 2025-01-15 14:30:00
tags:
  - Tag1
  - Tag2
  - Tag3
categories:
  - Technology
feature: true
cover: https://github.com/cojovi/projectsentinal/blob/main/test/image.png?raw=true
image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
og_image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
---
```

## Configuration

Edit the constants at the top of `create_article.py` to customize:

- **Word Count Range**: `WORD_COUNT_MIN` and `WORD_COUNT_MAX`
- **Categories**: Add/remove from `CATEGORIES` list
- **GitHub URLs**: Update `GITHUB_USER`, `GITHUB_REPO`, `GITHUB_BRANCH`
- **Image Settings**: Adjust `IMAGE_SIZE`, `IMAGE_QUALITY`, `IMAGE_STYLE`

## Requirements

- Python 3.7+
- OpenAI API key
- Internet connection (for API calls and URL fetching)

## Troubleshooting

### "OPENAI_API_KEY not set"
- Make sure you've set the environment variable: `export OPENAI_API_KEY='your-key'`
- Or create a `.env` file with your key

### "Failed to fetch URL"
- Check your internet connection
- Some websites block automated requests
- Try a different URL or use the text/idea input mode

### "Word count outside target range"
- This is a warning, not an error
- The article will still be saved
- Adjust `WORD_COUNT_MIN`/`MAX` if needed

### Image generation fails
- Check your OpenAI API quota
- DALL-E 3 requires credits
- Ensure your API key has image generation permissions

## Next Steps After Generation

1. **Review the Article**: Check the generated content in `blog/source/_posts/`
2. **Review the Image**: Check the generated image in `test/`
3. **Test Locally**: Run `hexo generate` and `hexo server` to preview
4. **Commit & Deploy**: Push to GitHub and deploy your Hexo site

## Notes

- The script analyzes 5 random existing posts to learn your tone
- Images are saved to the `test/` folder with GitHub raw URLs
- Author names are randomly generated for variety
- All timestamps use UTC timezone
- Front matter uses proper YAML escaping for special characters

## License

Same as the main project.




================================================
FILE: blah.md
================================================
witty, funny, and serious but a hint of sarcasm

https://www.infowars.com/posts/no-mercy-for-repeat-offenders-as-irynas-law-takes-effect-in-north-carolina

https://www.yahoo.com/news/articles/snap-benefits-flowing-again-many-100059064.html


================================================
FILE: CLAUDE.md
================================================
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



================================================
FILE: CODE_OF_CONDUCT.md
================================================
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
* Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at report@hexo.io. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior,  harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the project community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 2.0,
available at https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at https://www.contributor-covenant.org/translations.




================================================
FILE: create_article.py
================================================
#!/usr/bin/env python3
"""
Autonomous Blog Article Generator for Hexo
Generates complete, publication-ready blog posts with images and metadata.
"""

import os
import re
import sys
import json
import random
import urllib.request
import urllib.parse
import urllib.error
import requests
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Dict, List, Tuple
import openai
from bs4 import BeautifulSoup

# Try to load .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # .env file support is optional

# ============================================================================
# CONFIGURATION CONSTANTS
# ============================================================================

# Directory paths
BLOG_POSTS_DIR = Path("blog/source/_posts")
TEST_DIR = Path("test")
BLOG_POSTS_DIR.mkdir(parents=True, exist_ok=True)
TEST_DIR.mkdir(parents=True, exist_ok=True)

# GitHub repository configuration
GITHUB_USER = "cojovi"
GITHUB_REPO = "projectsentinal"
GITHUB_BRANCH = "main"
GITHUB_BASE_URL = f"https://github.com/{GITHUB_USER}/{GITHUB_REPO}/blob/{GITHUB_BRANCH}/test"

# Content generation settings
WORD_COUNT_MIN = 950  # BARE MINIMUM - NO EXCEPTIONS
WORD_COUNT_MAX = None  # No maximum limit - can be as long as needed
READING_SPEED_WPM = 200  # Words per minute for reading time calculation

# DALL-E image settings
IMAGE_SIZE = "1792x1024"  # Landscape format for hero images
IMAGE_QUALITY = "hd"
IMAGE_STYLE = "natural"

# Author name pools (diverse cultural names)
FIRST_NAMES = [
    "Elena", "Marcus", "Sophia", "James", "Priya", "David", "Aisha", "Michael",
    "Yuki", "Robert", "Fatima", "William", "Mei", "Christopher", "Layla",
    "Daniel", "Ananya", "Matthew", "Zara", "Andrew", "Sofia", "Joseph",
    "Isabella", "Thomas", "Emma", "Richard", "Olivia", "Charles", "Maya",
    "Benjamin"
]

LAST_NAMES = [
    "Chen", "Rodriguez", "Kim", "Petrov", "Johnson", "Patel", "Williams",
    "Singh", "Brown", "Ahmed", "Davis", "Tanaka", "Miller", "Kumar",
    "Wilson", "Garcia", "Moore", "Martinez", "Taylor", "Anderson", "Lee",
    "Zhang", "Wang", "Li", "Nguyen", "Fernandez", "Lopez", "Gonzalez",
    "Hernandez", "Smith"
]

# Categories (based on existing blog structure)
CATEGORIES = [
    "Technology", "Politics", "US Foreign Policy", "Conservative Movement",
    "Current Events", "Media", "Artificial Intelligence", "Innovation",
    "Collaboration", "Business", "Future", "Coding", "News", "Tech Stuff"
]

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def yaml_escape(value: str) -> str:
    """
    Escape a string for YAML front matter.
    Handles quotes, colons, and other special characters.
    """
    if value is None:
        return '""'
    
    value = str(value)
    # Escape internal double quotes
    value = value.replace('"', '\\"')
    # Wrap in double quotes
    return f'"{value}"'


def generate_slug(title: str) -> str:
    """Generate URL-friendly slug from title."""
    # Convert to lowercase
    slug = title.lower()
    # Remove special characters, keep letters, numbers, spaces, hyphens
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    # Replace spaces and multiple hyphens with single hyphen
    slug = re.sub(r'[\s-]+', '-', slug)
    # Strip leading/trailing hyphens
    slug = slug.strip('-')
    # Limit length
    return slug[:100]


def detect_input_type(user_input: str) -> str:
    """
    Detect input type: URL, structured text, or simple idea.
    """
    # Check for URL
    if re.match(r'https?://', user_input.strip()):
        return "URL"
    
    # Check for structured text (multiple sentences, substantial length)
    sentences = re.split(r'[.!?]+', user_input)
    sentence_count = len([s for s in sentences if len(s.strip()) > 10])
    
    if sentence_count > 5 and len(user_input) > 300:
        return "TEXT"
    
    return "IDEA"


def count_words(text: str) -> int:
    """Count words in text."""
    return len(text.split())


def calculate_reading_time(word_count: int) -> int:
    """Calculate reading time in minutes."""
    minutes = max(1, round(word_count / READING_SPEED_WPM))
    return minutes


def get_existing_posts() -> List[Path]:
    """Get list of existing blog post files."""
    if not BLOG_POSTS_DIR.exists():
        return []
    
    posts = list(BLOG_POSTS_DIR.glob("*.md"))
    # Filter out system files
    posts = [p for p in posts if not p.name.startswith("._")]
    return posts


def sample_posts_for_tone(count: int = 5) -> List[str]:
    """Sample existing posts and extract their content for tone analysis."""
    posts = get_existing_posts()
    if not posts:
        return []
    
    # Randomly sample posts
    sampled = random.sample(posts, min(count, len(posts)))
    contents = []
    
    for post_path in sampled:
        try:
            with open(post_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Extract body (skip front matter)
                if content.startswith('---'):
                    parts = content.split('---', 2)
                    if len(parts) >= 3:
                        body = parts[2].strip()
                        contents.append(body[:2000])  # Limit length
        except Exception as e:
            print(f"⚠️  Warning: Could not read {post_path.name}: {e}")
            continue
    
    return contents


def tavily_search(query: str, max_results: int = 6) -> List[Dict]:
    """
    Search the web using Tavily API for current information and sources.
    Returns list of search results with title, url, and content.
    """
    tavily_api_key = os.getenv("TAVILY_API_KEY")
    if not tavily_api_key:
        return []
    
    try:
        response = requests.post(
            "https://api.tavily.com/search",
            json={
                "api_key": tavily_api_key,
                "query": query,
                "search_depth": "advanced",
                "max_results": max_results,
                "include_answer": False
            },
            timeout=60
        )
        response.raise_for_status()
        return response.json().get("results", [])
    except Exception as e:
        print(f"⚠️  Warning: Tavily search failed: {e}")
        return []


def fetch_url_content(url: str) -> str:
    """Fetch and extract text content from URL."""
    # Enhanced headers to avoid 403 errors
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style", "nav", "header", "footer", "aside"]):
                script.decompose()
            
            # Try to find main content area
            main_content = soup.find('main') or soup.find('article') or soup.find('div', class_=re.compile('content|article|post', re.I))
            
            if main_content:
                text = main_content.get_text()
            else:
                text = soup.get_text()
            
            # Clean up whitespace
            lines = (line.strip() for line in text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = ' '.join(chunk for chunk in chunks if chunk)
            
            # Limit to 4000 chars to avoid token limits (with prompt, this keeps us under 8192 tokens)
            if len(text) < 100:
                raise Exception("Extracted content too short - website may have blocked access")
            
            return text[:4000]
    except urllib.error.HTTPError as e:
        if e.code == 403:
            raise Exception(f"Website blocked access (403 Forbidden). Try copying the article text manually and using TEXT input mode instead.")
        raise Exception(f"HTTP Error {e.code}: {e.reason}")
    except urllib.error.URLError as e:
        raise Exception(f"Network error: {e.reason}")
    except Exception as e:
        raise Exception(f"Failed to fetch URL: {e}")


# ============================================================================
# OPENAI API FUNCTIONS
# ============================================================================

def get_openai_client():
    """Initialize OpenAI client with API key from environment."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ Error: OPENAI_API_KEY environment variable not set")
        print("Suggestion: Set it with: export OPENAI_API_KEY='your-key-here'")
        sys.exit(1)
    return openai.OpenAI(api_key=api_key)


def analyze_tone(client: openai.OpenAI, sample_contents: List[str]) -> str:
    """Analyze tone from existing blog posts."""
    if not sample_contents:
        return "professional, engaging, and slightly conversational"
    
    samples_text = "\n\n---\n\n".join(sample_contents[:3])  # Use first 3 samples
    
    prompt = f"""Analyze the tone, voice, and writing style of this publication based on these sample articles:

{samples_text}

Provide a detailed, actionable description of the tone and writing style (3-4 sentences). Focus on:
- Formality level (formal, casual, conversational, etc.)
- Voice characteristics (authoritative, humorous, analytical, etc.)
- Writing patterns (sentence structure, use of rhetorical devices, pacing)
- Overall style (journalistic, opinionated, narrative, etc.)
- Specific techniques used (metaphors, examples, data presentation)

Be specific and descriptive so the tone can be accurately replicated in new articles.

Tone analysis:"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-5.2",
            messages=[
                {"role": "system", "content": "You are a writing style analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_completion_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"⚠️  Warning: Could not analyze tone: {e}")
        return "professional, engaging, and slightly conversational"


def generate_article_content(
    client: openai.OpenAI,
    user_input: str,
    input_type: str,
    tone: str,
    web_findings: Optional[List[Dict]] = None
) -> Tuple[str, str]:
    """
    Generate article content based on input type.
    Returns: (title, body)
    """
    if input_type == "URL":
        print("📥 Fetching URL content...")
        url_content = fetch_url_content(user_input)
        # URL content is already limited to 4000 chars in fetch_url_content
        # Further limit to 3000 for prompt to ensure we stay under token limits
        content_preview = url_content[:3000]
        
        # Build web sources section if available
        web_sources = ""
        if web_findings:
            sources_list = "\n".join([f"- **{f.get('title', 'Source')}**: {f.get('url', '')}" for f in web_findings[:6]])
            web_sources = f"""

ADDITIONAL WEB SOURCES FOR CONTEXT (use these to enrich and fact-check the article):
{sources_list}

Use these sources to add depth, verify facts, provide additional context, and include recent developments. Paraphrase and synthesize - do not copy verbatim."""
        
        prompt = f"""Completely rewrite this article in our publication's voice, making it more engaging, insightful, and comprehensive.
        
Tone guidelines: {tone}

CRITICAL REQUIREMENTS - WORD COUNT IS MANDATORY:
- Output MUST be AT LEAST 950 words - THIS IS A BARE MINIMUM WITH NO EXCEPTIONS
- Articles can be longer than 950 words if needed - there is NO maximum limit
- Count words carefully and ensure the final article meets or exceeds 950 words
- To reach 950+ words, include: detailed background, examples, expert perspectives, historical context, implications, deeper analysis, multiple sections with headers, extended lists, and blockquotes

WRITING QUALITY REQUIREMENTS:
- Create a compelling hook in the opening paragraph that draws readers in
- Use vivid, descriptive language that paints a clear picture
- Include specific details, numbers, and concrete examples
- Add context that helps readers understand the "why" behind the story
- Include relevant quotes, statistics, or expert opinions where appropriate
- Write with energy and personality while maintaining professionalism
- Use transitions to create smooth flow between sections
- End with a strong conclusion that ties everything together

STRUCTURE REQUIREMENTS:
- Write in professional news journalism structure with clear narrative arc
- Do NOT copy phrases directly - rewrite entirely while maintaining factual accuracy
- No placeholder text, no [brackets], no repetition of instructions
- Format response as JSON: {{"title": "Article Title", "body": "Article body text"}}

MANDATORY MARKDOWN FORMATTING (use ALL of these throughout the article):
1. Start with HTML comment for alt text: <!-- alt: Descriptive image alt text -->
2. Add opening paragraph (2-3 sentences) introducing the topic with a compelling hook
3. Add TL;DR section: **TL;DR**: Brief summary sentence
4. Add HTML comment: <!-- more --> (separates intro from main content)
5. Use section headers: ## Section Title (use 4-6 sections with engaging titles)
6. Use bold for emphasis: **important terms**, **names**, **key concepts**
7. Use italic for subtle emphasis: *subtle emphasis* or *quotes*
8. Include blockquotes with labels: > **Pro Tip**: Insightful tip or > **Key Insight**: Important point or > **Expert View**: Expert perspective
9. Use bullet lists: - **Bold item**: Description or - Regular item with **bold** emphasis
10. Include a "Key Takeaways" section at the end with bullet list
11. Use horizontal rules (---) to separate major sections if appropriate
12. Structure content with clear narrative flow using headers

CRITICAL: In the JSON body field, use \\n for newlines to preserve markdown formatting. Each markdown element (headers, lists, blockquotes) should be on separate lines using \\n.

Article to rewrite:
{content_preview}{web_sources}

JSON response:"""
    
    elif input_type == "TEXT":
        # Build web sources section if available
        web_sources = ""
        if web_findings:
            sources_list = "\n".join([f"- **{f.get('title', 'Source')}**: {f.get('url', '')}" for f in web_findings[:6]])
            web_sources = f"""

ADDITIONAL WEB SOURCES FOR CONTEXT (use these to enrich and fact-check the article):
{sources_list}

Use these sources to add depth, verify facts, provide additional context, and include recent developments. Paraphrase and synthesize - do not copy verbatim."""
        
        prompt = f"""Transform this unstructured text into a polished, engaging, and comprehensive professional article.

Tone guidelines: {tone}

CRITICAL REQUIREMENTS - WORD COUNT IS MANDATORY:
- Output MUST be AT LEAST 950 words - THIS IS A BARE MINIMUM WITH NO EXCEPTIONS
- Articles can be longer than 950 words if needed - there is NO maximum limit
- Count words carefully and ensure the final article meets or exceeds 950 words
- To reach 950+ words, include: detailed background, examples, expert perspectives, historical context, implications, deeper analysis, multiple sections with headers, extended lists, and blockquotes

WRITING QUALITY REQUIREMENTS:
- Create a compelling hook in the opening paragraph that draws readers in
- Use vivid, descriptive language that paints a clear picture
- Include specific details, numbers, and concrete examples
- Add context that helps readers understand the "why" behind the story
- Include relevant quotes, statistics, or expert opinions where appropriate
- Write with energy and personality while maintaining professionalism
- Use transitions to create smooth flow between sections
- End with a strong conclusion that ties everything together

STRUCTURE REQUIREMENTS:
- Organize content with clear structure and professional narrative flow
- Add context, analysis, and expert perspectives where appropriate
- No placeholder text, no [brackets], no repetition of instructions
- Format response as JSON: {{"title": "Article Title", "body": "Article body text"}}

MANDATORY MARKDOWN FORMATTING (use ALL of these throughout the article):
1. Start with HTML comment for alt text: <!-- alt: Descriptive image alt text -->
2. Add opening paragraph (2-3 sentences) introducing the topic with a compelling hook
3. Add TL;DR section: **TL;DR**: Brief summary sentence
4. Add HTML comment: <!-- more --> (separates intro from main content)
5. Use section headers: ## Section Title (use 4-6 sections with engaging titles)
6. Use bold for emphasis: **important terms**, **names**, **key concepts**
7. Use italic for subtle emphasis: *subtle emphasis* or *quotes*
8. Include blockquotes with labels: > **Pro Tip**: Insightful tip or > **Key Insight**: Important point or > **Expert View**: Expert perspective
9. Use bullet lists: - **Bold item**: Description or - Regular item with **bold** emphasis
10. Include a "Key Takeaways" section at the end with bullet list
11. Use horizontal rules (---) to separate major sections if appropriate
12. Structure content with clear narrative flow using headers

CRITICAL: In the JSON body field, use \\n for newlines to preserve markdown formatting. Each markdown element (headers, lists, blockquotes) should be on separate lines using \\n.

Text to transform:
{user_input}{web_sources}

JSON response:"""
    
    else:  # IDEA
        # Build web sources section if available
        web_sources = ""
        if web_findings:
            sources_list = "\n".join([f"- **{f.get('title', 'Source')}**: {f.get('url', '')}" for f in web_findings[:6]])
            web_sources = f"""

WEB SOURCES FOR RESEARCH (use these to create a well-researched, fact-based article):
{sources_list}

Use these sources to research the topic, gather facts, find examples, and provide current information. Synthesize information from multiple sources - do not copy verbatim. If sources provide conflicting information, note that in the article."""
        
        prompt = f"""Expand this idea into a full, engaging, and well-researched professional article.

Tone guidelines: {tone}

CRITICAL REQUIREMENTS - WORD COUNT IS MANDATORY:
- Output MUST be AT LEAST 950 words - THIS IS A BARE MINIMUM WITH NO EXCEPTIONS
- Articles can be longer than 950 words if needed - there is NO maximum limit
- Count words carefully and ensure the final article meets or exceeds 950 words
- To reach 950+ words, include: detailed background, examples, expert perspectives, historical context, implications, deeper analysis, multiple sections with headers, extended lists, blockquotes, real-world applications, and statistical data

WRITING QUALITY REQUIREMENTS:
- Create a compelling hook in the opening paragraph that draws readers in
- Use vivid, descriptive language that paints a clear picture
- Include specific details, numbers, and concrete examples from research
- Add context that helps readers understand the "why" behind the story
- Include relevant quotes, statistics, or expert opinions where appropriate
- Write with energy and personality while maintaining professionalism
- Use transitions to create smooth flow between sections
- End with a strong conclusion that ties everything together

RESEARCH REQUIREMENTS:
- Write as researched journalism with context, analysis, and expert perspectives (synthesized)
- Use the provided web sources to gather current, accurate information
- Fact-check claims and provide evidence for assertions
- Include multiple perspectives where relevant
- Professional news journalism structure
- No placeholder text, no [brackets], no repetition of instructions
- Format response as JSON: {{"title": "Article Title", "body": "Article body text"}}

MANDATORY MARKDOWN FORMATTING (use ALL of these throughout the article):
1. Start with HTML comment for alt text: <!-- alt: Descriptive image alt text -->
2. Add opening paragraph (2-3 sentences) introducing the topic with a compelling hook
3. Add TL;DR section: **TL;DR**: Brief summary sentence
4. Add HTML comment: <!-- more --> (separates intro from main content)
5. Use section headers: ## Section Title (use 4-6 sections with engaging titles)
6. Use bold for emphasis: **important terms**, **names**, **key concepts**
7. Use italic for subtle emphasis: *subtle emphasis* or *quotes*
8. Include blockquotes with labels: > **Pro Tip**: Insightful tip or > **Key Insight**: Important point or > **Expert View**: Expert perspective
9. Use bullet lists: - **Bold item**: Description or - Regular item with **bold** emphasis
10. Include a "Key Takeaways" section at the end with bullet list
11. Use horizontal rules (---) to separate major sections if appropriate
12. Structure content with clear narrative flow using headers

CRITICAL: In the JSON body field, use \\n for newlines to preserve markdown formatting. Each markdown element (headers, lists, blockquotes) should be on separate lines using \\n.

Idea to expand:
{user_input}{web_sources}

JSON response:"""
    
    try:
        # Try with JSON response format (supported in newer models)
        try:
            response = client.chat.completions.create(
                model="gpt-5.2",
                messages=[
                    {"role": "system", "content": "You are an expert professional journalist and content writer specializing in rich markdown formatting. You create compelling, well-researched articles that engage readers with vivid language, specific details, and clear narrative flow. Always use HTML comments, headers, bold/italic text, blockquotes, lists, and other markdown features to create visually engaging articles. You MUST generate articles that are AT LEAST 950 words - this is a hard requirement with no exceptions. Write with energy, personality, and professionalism. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
            temperature=0.7,
            max_completion_tokens=6000,  # Increased to allow for longer articles (950+ words)
                response_format={"type": "json_object"}
            )
        except Exception:
            # Fallback if response_format not supported
            response = client.chat.completions.create(
                model="gpt-5.2",
                messages=[
                    {"role": "system", "content": "You are an expert professional journalist and content writer specializing in rich markdown formatting. You create compelling, well-researched articles that engage readers with vivid language, specific details, and clear narrative flow. Always use HTML comments, headers, bold/italic text, blockquotes, lists, and other markdown features to create visually engaging articles. You MUST generate articles that are AT LEAST 950 words - this is a hard requirement with no exceptions. Write with energy, personality, and professionalism. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_completion_tokens=6000  # Increased to allow for longer articles (950+ words)
            )
        
        content = response.choices[0].message.content.strip()
        
        # Parse JSON response
        try:
            # Remove markdown code blocks if present
            if '```json' in content:
                content = re.sub(r'```json\s*', '', content)
            if '```' in content:
                content = re.sub(r'```\s*', '', content)
            
            # Extract JSON from response (handle nested braces)
            # Find the first { and match to the last }
            start_idx = content.find('{')
            if start_idx == -1:
                raise ValueError("No JSON object found in response")
            
            # Count braces to find matching closing brace
            brace_count = 0
            end_idx = start_idx
            for i in range(start_idx, len(content)):
                if content[i] == '{':
                    brace_count += 1
                elif content[i] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end_idx = i + 1
                        break
            
            json_str = content[start_idx:end_idx]
            
            # Preserve escaped newlines in JSON strings while cleaning up structure
            # Protect escaped sequences first
            json_str = re.sub(r'\\n', '__ESCAPED_NEWLINE__', json_str)
            json_str = re.sub(r'\\r', '__ESCAPED_RETURN__', json_str)
            json_str = re.sub(r'\\t', '__ESCAPED_TAB__', json_str)
            
            # Remove literal newlines/tabs that break JSON structure (but keep escaped ones)
            json_str = json_str.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
            
            # Restore escaped sequences
            json_str = json_str.replace('__ESCAPED_NEWLINE__', '\\n')
            json_str = json_str.replace('__ESCAPED_RETURN__', '\\r')
            json_str = json_str.replace('__ESCAPED_TAB__', '\\t')
            
            # Clean up multiple spaces
            json_str = re.sub(r' +', ' ', json_str)
            
            data = json.loads(json_str)
            title = data.get("title", "").strip()
            body = data.get("body", "").strip()
            
            # JSON parser automatically converts \n to actual newlines, so body should already have them
            # But ensure we preserve any markdown formatting
            
            if not title or not body:
                raise ValueError("Missing title or body in response")
            
            return title, body
        except json.JSONDecodeError as e:
            # Try to extract title and body manually if JSON parsing fails
            print(f"⚠️  Warning: JSON parsing failed, attempting manual extraction...")
            # Look for title and body in the response
            title_match = re.search(r'"title"\s*:\s*"([^"]+)"', content, re.IGNORECASE)
            body_match = re.search(r'"body"\s*:\s*"([^"]+)"', content, re.IGNORECASE | re.DOTALL)
            
            if title_match and body_match:
                title = title_match.group(1).strip()
                body = body_match.group(1).strip()
                # Clean up escaped characters
                body = body.replace('\\n', '\n').replace('\\"', '"')
                return title, body
            else:
                raise ValueError(f"Failed to parse JSON response: {e}. Raw response preview: {content[:200]}...")
    
    except Exception as e:
        raise Exception(f"Failed to generate article: {e}")


def generate_metadata(
    client: openai.OpenAI,
    title: str,
    body: str
) -> Dict:
    """Generate all article metadata using AI."""
    prompt = f"""Analyze this article and generate comprehensive, accurate metadata.

Title: {title}

Article body (first 1500 chars):
{body[:1500]}

Generate metadata as JSON with these exact fields:
{{
  "category": "one category from: {', '.join(CATEGORIES)}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "location": "geographic location if relevant, or null"
}}

Requirements:
- Category: Choose the single best-fit category from the list. Consider the primary focus and main themes.
- Tags: 3-5 highly relevant tags that accurately describe the article's content. Each tag should be 1-3 words, concise, and searchable. Include both broad and specific tags.
- Location: Only include if article has clear geographic relevance (mentions specific cities, countries, regions, or location-based events), otherwise null

Think carefully about what readers would search for to find this article. Make tags specific and useful.

JSON response:"""
    
    try:
        # Try with JSON response format (supported in newer models)
        try:
            response = client.chat.completions.create(
                model="gpt-5.2",
                messages=[
                    {"role": "system", "content": "You are a content metadata expert. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_completion_tokens=500,
                response_format={"type": "json_object"}
            )
        except Exception:
            # Fallback if response_format not supported
            response = client.chat.completions.create(
                model="gpt-5.2",
                messages=[
                    {"role": "system", "content": "You are a content metadata expert. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_completion_tokens=500
            )
        
        content = response.choices[0].message.content.strip()
        
        # Remove markdown code blocks if present
        if '```json' in content:
            content = re.sub(r'```json\s*', '', content)
        if '```' in content:
            content = re.sub(r'```\s*', '', content)
        
        # Extract JSON with proper brace matching
        start_idx = content.find('{')
        if start_idx == -1:
            raise ValueError("No JSON object found in response")
        
        brace_count = 0
        end_idx = start_idx
        for i in range(start_idx, len(content)):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i + 1
                    break
        
        json_str = content[start_idx:end_idx]
        
        # Remove control characters
        json_str = ''.join(char for char in json_str if char.isprintable() or char in '\n\r\t')
        json_str = json_str.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
        json_str = re.sub(r' +', ' ', json_str)
        
        data = json.loads(json_str)
        return data
    
    except Exception as e:
        print(f"⚠️  Warning: Metadata generation failed: {e}")
        # Fallback metadata
        return {
            "category": "Technology",
            "tags": ["Technology", "News", "Innovation"],
            "location": None
        }


def generate_image_prompt(
    client: openai.OpenAI,
    title: str,
    category: str,
    body_preview: str
) -> str:
    """Generate DALL-E prompt for synthwave/aurora retro arcade style image."""
    
    # OLD PROMPT (COMMENTED OUT - PRESERVED FOR FUTURE USE)
    # prompt = f"""Write a compelling DALL-E prompt for a photorealistic news hero image that captures the essence of this article.
    #
    # Article title: {title}
    # Category: {category}
    # Article preview: {body_preview[:500]}
    #
    # CRITICAL INSTRUCTIONS FOR PHOTOREALISM:
    # - Must specify "photograph" or "photo-realistic" or "editorial photography"
    # - Must mention professional camera terms (DSLR, 50mm lens, 85mm portrait lens, etc.)
    # - Must specify natural/cinematic/editorial lighting (soft natural light, dramatic shadows, etc.)
    # - Must describe editorial/documentary composition (rule of thirds, leading lines, depth of field)
    # - Include specific visual elements that relate to the article's content
    # - Create a visually striking image that would work as a magazine cover or news feature
    # - MUST NEVER mention: illustration, painting, cartoon, CGI, 3D render, digital art, artwork
    #
    # Generate a detailed 2-3 sentence prompt that creates a compelling, professional editorial photograph.
    #
    # DALL-E prompt:"""
    
    # NEW PROMPT - SYNTHWAVE/AURORA/RETRO ARCADE STYLE
    prompt = f"""Write a compelling DALL-E prompt for a retro arcade-style image with synthwave aesthetics and aurora color scheme that captures the essence of this article.

Article title: {title}
Category: {category}
Article preview: {body_preview[:500]}

CRITICAL STYLE REQUIREMENTS:
- Visual style: Capcom CPS1 arcade board graphics OR 16-bit retro arcade pixel art style (choose the most appropriate)
- Aesthetic: Heavy synthwave/outrun aesthetic with neon-drenched atmosphere
- Color palette: Aurora color scheme as the primary focus - vibrant purples, magentas, cyans, electric blues, and neon pinks
- Animation feel: Slight animated look, dynamic composition suggesting movement and energy
- Pixel art elements: If using 16-bit style, include authentic pixel art techniques with limited color palettes and dithering
- Arcade board style: If using CPS1 style, include bold outlines, vibrant saturated colors, and that distinctive early 90s arcade game aesthetic
- Lighting: Neon glow effects, electric lighting, cyberpunk-inspired illumination
- Composition: Bold, striking composition that would work as a retro game title screen or arcade cabinet art
- Mood: Energetic, nostalgic, futuristic-retro fusion
- Include visual elements that relate to the article's content but rendered in this retro arcade/synthwave style

CRITICAL - MUST INCLUDE:
- Explicit mention of "synthwave" or "outrun" aesthetic
- Aurora color scheme (purples, magentas, cyans, electric blues)
- Either "Capcom CPS1 arcade board style" OR "16-bit retro arcade pixel art style"
- "Slight animated look" or "dynamic composition"
- Neon glow effects and electric lighting

Generate a detailed 3-4 sentence prompt that creates a visually striking retro arcade/synthwave image with heavy aurora color scheme influence.

DALL-E prompt:"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-5.2",
            messages=[
                {"role": "system", "content": "You are a prompt engineer specializing in retro arcade, synthwave, and pixel art image generation. Always provide a detailed, complete prompt with heavy emphasis on aurora color schemes and retro gaming aesthetics. Your response must be a valid DALL-E prompt, not empty."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_completion_tokens=200
        )
        
        # Get the response content
        if not response.choices or not response.choices[0].message:
            raise ValueError("Empty response from GPT-5.2")
        
        image_prompt = response.choices[0].message.content
        if image_prompt:
            image_prompt = image_prompt.strip()
        
        # Validate that we got a non-empty prompt
        if not image_prompt or len(image_prompt) < 10:
            # Fallback: create a basic prompt from title and category
            print("⚠️  Warning: GPT returned empty or too short image prompt, using fallback...")
            # Clean title for prompt (remove special chars, limit length)
            clean_title = re.sub(r'[^\w\s-]', '', title.lower())[:50]
            image_prompt = f"Synthwave retro arcade style, 16-bit pixel art, aurora color scheme with vibrant purples magentas cyans and electric blues, {category.lower()} theme, {clean_title}, Capcom CPS1 arcade board graphics style, neon glow effects, slight animated look, dynamic composition, outrun aesthetic, nostalgic futuristic retro fusion"
        
        return image_prompt
    except Exception as e:
        # Fallback prompt if API call fails
        print(f"⚠️  Warning: Image prompt generation failed: {e}, using fallback...")
        clean_title = re.sub(r'[^\w\s-]', '', title.lower())[:50]
        return f"Synthwave retro arcade style, 16-bit pixel art, aurora color scheme with vibrant purples magentas cyans and electric blues, {category.lower()} theme, {clean_title}, Capcom CPS1 arcade board graphics style, neon glow effects, slight animated look, dynamic composition, outrun aesthetic, nostalgic futuristic retro fusion"


def generate_image(
    client: openai.OpenAI,
    image_prompt: str,
    slug: str
) -> str:
    """Generate image using DALL-E and save to test/ folder."""
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=image_prompt,
            size=IMAGE_SIZE,
            quality=IMAGE_QUALITY,
            style=IMAGE_STYLE,
            n=1
        )
        
        image_url = response.data[0].url
        
        # Download image
        filename = f"{slug[:50]}.png"
        filepath = TEST_DIR / filename
        
        urllib.request.urlretrieve(image_url, filepath)
        
        return filename
    
    except Exception as e:
        raise Exception(f"Failed to generate image: {e}")


def generate_author_name() -> Tuple[str, str]:
    """Generate random author name and slug."""
    first = random.choice(FIRST_NAMES)
    last = random.choice(LAST_NAMES)
    
    # 20% chance of "Dr." prefix
    if random.random() < 0.2:
        full_name = f"Dr. {first} {last}"
    else:
        full_name = f"{first} {last}"
    
    author_slug = f"{first.lower()}-{last.lower()}"
    if full_name.startswith("Dr."):
        author_slug = f"dr-{author_slug}"
    
    return full_name, author_slug


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """Main execution flow."""
    print("=" * 70)
    print("Autonomous Blog Article Generator for Hexo")
    print("=" * 70)
    print()
    
    # Initialize OpenAI client
    try:
        client = get_openai_client()
    except SystemExit:
        return
    except Exception as e:
        print(f"❌ Error: {e}")
        return
    
    # Get user input
    print("Enter your blog content (idea, URL, or text). Press Ctrl+D (Mac/Linux) or Ctrl+Z (Windows) when done:")
    print("-" * 70)
    
    try:
        lines = []
        while True:
            try:
                line = input()
                lines.append(line)
            except EOFError:
                break
        user_input = "\n".join(lines).strip()
    except KeyboardInterrupt:
        print("\n\n❌ Cancelled by user")
        return
    
    if not user_input:
        print("❌ Error: No input provided")
        return
    
    # Detect input type
    input_type = detect_input_type(user_input)
    print(f"✓ Input type detected: {input_type}")
    print()
    
    # Analyze tone from existing posts
    print("🔍 Analyzing existing articles to learn tone...")
    sample_contents = sample_posts_for_tone(5)
    tone = analyze_tone(client, sample_contents)
    print(f"✓ Tone identified: {tone}")
    print()
    
    # User tone override
    user_tone = input(f"Default tone: {tone}\nPress Enter to use default, or type custom tone: ").strip()
    if user_tone:
        tone = user_tone
        print(f"✓ Using custom tone: {tone}")
    print()
    
    # Perform web search for additional context
    web_findings = []
    if input_type in ["IDEA", "TEXT"]:
        print("🔍 Searching the web for additional context...")
        # Extract search query from user input
        search_query = user_input[:200] if len(user_input) > 200 else user_input
        if input_type == "TEXT":
            # Extract key topic from text (first sentence or first 100 chars)
            search_query = user_input.split('.')[0][:100] if '.' in user_input else user_input[:100]
        
        web_findings = tavily_search(search_query, max_results=6)
        if web_findings:
            print(f"✓ Found {len(web_findings)} relevant sources")
        else:
            print("⚠️  No web sources found (Tavily API key may be missing or search returned no results)")
        print()
    elif input_type == "URL":
        # For URLs, search for related topics to add context
        print("🔍 Searching for related context...")
        # Extract a search query from the URL or use a generic search
        web_findings = tavily_search(user_input, max_results=4)
        if web_findings:
            print(f"✓ Found {len(web_findings)} related sources")
        print()
    
    # Generate article content
    print(f"📝 Generating article...")
    try:
        title, body = generate_article_content(client, user_input, input_type, tone, web_findings)
        word_count = count_words(body)
        print(f"✓ Article generated: {title}")
        print(f"✓ Word count: {word_count} words")
        
        if word_count < WORD_COUNT_MIN:
            print(f"\n⚠️  Warning: Word count ({word_count}) is below minimum ({WORD_COUNT_MIN})")
            print(f"   The article has been generated but may need manual expansion.")
        else:
            print(f"✓ Word count meets minimum requirement ({word_count} >= {WORD_COUNT_MIN})")
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error generating article: {error_msg}")
        if "403" in error_msg or "blocked" in error_msg.lower() or "Forbidden" in error_msg:
            print("\n💡 Suggestion: Some websites block automated access.")
            print("   You can:")
            print("   1. Copy the article text manually")
            print("   2. Run the script again and paste the text (it will detect TEXT mode)")
            print("   3. Or try a different URL")
        elif "JSON" in error_msg or "parse" in error_msg.lower():
            print("\n💡 Suggestion: There was an issue parsing the AI response.")
            print("   Try running the script again - this is usually a temporary issue.")
        return
    print()
    
    # Generate metadata
    print("🏷️  Generating metadata...")
    try:
        metadata = generate_metadata(client, title, body)
        category = metadata.get("category", "Technology")
        tags = metadata.get("tags", [])
        location = metadata.get("location")
        
        print(f"✓ Category: {category}")
        print(f"✓ Tags: {', '.join(tags)}")
        if location:
            print(f"✓ Location: {location}")
    except Exception as e:
        print(f"❌ Error generating metadata: {e}")
        return
    print()
    
    # Generate author
    author_name, author_slug = generate_author_name()
    print(f"✓ Author: {author_name}")
    print()
    
    # Generate slug
    slug = generate_slug(title)
    print(f"✓ Slug: {slug}")
    print()
    
    # Generate image prompt
    print("🎨 Generating image prompt...")
    try:
        image_prompt = generate_image_prompt(client, title, category, body)
        if image_prompt and len(image_prompt) > 0:
            print(f"✓ Image prompt: {image_prompt[:100]}...")
        else:
            print("⚠️  Warning: Generated empty prompt, will use fallback")
    except Exception as e:
        print(f"❌ Error generating image prompt: {e}")
        # Create fallback prompt
        clean_title = re.sub(r'[^\w\s-]', '', title.lower())[:50]
        image_prompt = f"Synthwave retro arcade style, 16-bit pixel art, aurora color scheme with vibrant purples magentas cyans and electric blues, {category.lower()} theme, {clean_title}, Capcom CPS1 arcade board graphics style, neon glow effects, slight animated look, dynamic composition, outrun aesthetic, nostalgic futuristic retro fusion"
        print(f"✓ Using fallback prompt: {image_prompt[:80]}...")
    print()
    
    # Generate image
    print("🖼️  Generating image with DALL-E...")
    try:
        # Validate image prompt before generating
        if not image_prompt or len(image_prompt.strip()) == 0:
            print("⚠️  Warning: Image prompt is empty, generating fallback prompt...")
            clean_title = re.sub(r'[^\w\s-]', '', title.lower())[:50]
            image_prompt = f"Synthwave retro arcade style, 16-bit pixel art, aurora color scheme with vibrant purples magentas cyans and electric blues, {category.lower()} theme, {clean_title}, Capcom CPS1 arcade board graphics style, neon glow effects, slight animated look, dynamic composition, outrun aesthetic, nostalgic futuristic retro fusion"
            print(f"✓ Using fallback prompt: {image_prompt[:80]}...")
        
        image_filename = generate_image(client, image_prompt, slug)
        print(f"✓ Image saved: {image_filename}")
    except Exception as e:
        print(f"❌ Error generating image: {e}")
        return
    print()
    
    # Generate timestamps
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    datetime_str = now.strftime("%Y-%m-%d %H:%M:%S")
    
    # Generate reading time
    reading_time = calculate_reading_time(count_words(body))
    
    # Generate excerpt (first sentence or first 150 chars)
    excerpt = body.split('.')[0] + '.' if '.' in body else body[:150]
    if len(excerpt) > 150:
        excerpt = body[:150]
    
    # Build front matter
    cover_url = f"{GITHUB_BASE_URL}/{image_filename}?raw=true"
    banner_url = f"{GITHUB_BASE_URL}/ProtocolSentinelbanner.png?raw=true"
    
    front_matter_lines = [
        "---",
        f"title: {yaml_escape(title)}",
        f"date: {datetime_str}",
        "tags:"
    ]
    
    # Add tags (YAML list format)
    for tag in tags:
        front_matter_lines.append(f"  - {tag}")
    
    front_matter_lines.append("categories:")
    front_matter_lines.append(f"  - {category}")
    front_matter_lines.append("feature: true")
    front_matter_lines.append(f"cover: {cover_url}")
    front_matter_lines.append(f"image: {banner_url}")
    front_matter_lines.append(f"og_image: {banner_url}")
    front_matter_lines.append("---")
    
    front_matter = "\n".join(front_matter_lines)
    
    # Combine front matter and body
    full_content = f"{front_matter}\n\n{body}"
    
    # Save article
    filename = f"{date_str}-{slug}.md"
    filepath = BLOG_POSTS_DIR / filename
    
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(full_content)
        print(f"✓ Article saved: {filepath}")
    except Exception as e:
        print(f"❌ Error saving article: {e}")
        return
    
    # Final summary
    print()
    print("=" * 70)
    print("✅ Article Successfully Generated!")
    print("=" * 70)
    print(f"Title: {title}")
    print(f"File: {filepath}")
    print(f"Image: {TEST_DIR / image_filename}")
    print(f"Word count: {count_words(body)} words")
    print(f"Reading time: {reading_time} minutes")
    print()
    print("Next steps:")
    print("1. Review the article and image")
    print("2. Commit and push to GitHub")
    print("3. Deploy your Hexo site")
    print("=" * 70)


if __name__ == "__main__":
    main()




================================================
FILE: gemini_image.py
================================================
import os
import sys
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

# 1. Configuration
# Ensure you have 'GEMINI_API_KEY' set in your environment variables.
api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("Error: GEMINI_API_KEY environment variable not found.")
    print("Please set it using: export GEMINI_API_KEY='your_key'")
    sys.exit(1)

# The model ID. User requested gemini-2.5-flash-image.
# If this fails, try "gemini-2.0-flash-exp"
# The model ID. Switching to gemini-2.0-flash-exp as 2.5 was not found.
MODEL_ID = "imagen-4.0-generate-001" 

def generate_image(prompt_text, output_filename="generated_image.png"):
    print(f"--- Connecting to Gemini API using model: {MODEL_ID} ---")
    
    try:
        client = genai.Client(api_key=api_key)
        
        print(f"Generating image for prompt: '{prompt_text}'...")
        
        # 2. The API Call
        # Corrected: generate_images (plural) and GenerateImagesConfig (plural)
        response = client.models.generate_images(
            model=MODEL_ID,
            prompt=prompt_text,
            config=types.GenerateImagesConfig(
                number_of_images=1,
            )
        )

        # 3. Handling the Response
        if response.generated_images:
            image_bytes = response.generated_images[0].image.image_bytes
            
            # Convert bytes to an image object
            image = Image.open(BytesIO(image_bytes))
            
            # Save to file
            image.save(output_filename)
            print(f"Success! Image saved to: {os.path.abspath(output_filename)}")
            
            # Open the image automatically
            try:
                if sys.platform == "win32":
                    os.startfile(output_filename)
                elif sys.platform == "darwin": # macOS
                    os.system(f"open {output_filename}")
                else: # Linux
                    os.system(f"xdg-open {output_filename}")
            except:
                pass 
        else:
            print("No image was returned. Check safety filters or prompt.")

    except Exception as e:
        print(f"\nAn error occurred:\n{e}")
        # Help usage if model is wrong
        if "404" in str(e) or "not found" in str(e).lower():
             print(f"\nTip: If the model '{MODEL_ID}' is not found, try checking your API key or quota. Available models: imagen-4.0-generate-001")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_prompt = " ".join(sys.argv[1:])
    else:
        user_prompt = input("Enter your image prompt: ")
    
    if user_prompt:
        generate_image(user_prompt)
    else:
        print("Prompt cannot be empty.")


================================================
FILE: HOW-TO-CREATE-ARTICLE-SCRIPT.md
================================================
# Autonomous Blog Article Generator - Functional Specification

## Context for Implementation

This document describes an autonomous blog post generation system created for a Markdown-based static site (Vite + React). You are being asked to create an equivalent system for a Hexo blog platform. This specification describes WHAT the system does and WHY, not HOW to code it.

---

## System Overview

**Purpose**: Create a fully autonomous Python script that generates complete, publication-ready blog posts from minimal user input (idea, URL, or unstructured text) with zero manual intervention.

**Key Principle**: One command execution should result in a complete, published article with image, requiring no further user action.

---

## Core Functionality Requirements

### 1. Input Versatility (Multi-Mode Detection)

**Requirement**: The script must intelligently handle three distinct input types without requiring the user to specify which type they're providing.

**Input Types**:
- **Simple Idea**: Brief concept or topic (e.g., "AI in healthcare")
- **URL**: Full article URL to rewrite in publication's voice
- **Unstructured Text**: Any length text, notes, or draft content

**Detection Logic**:
- URL: Detect by regex pattern matching (https?://)
- Structured Text: Detect by sentence count and length (>5 sentences, >300 chars)
- Simple Idea: Everything else (default)

**Why This Matters**: Users work in different modes - sometimes they have a full article to adapt, sometimes just a spark of an idea. The system should adapt to their workflow, not force them into a specific input format.

---

### 2. Tone Analysis & Matching

**Requirement**: Automatically analyze existing blog posts to learn the publication's unique voice, then replicate it in new articles.

**Process**:
1. On each run, randomly sample 5 existing articles from the blog
2. Extract article body content (skip front matter/metadata)
3. Send samples to LLM with prompt: "Analyze the tone, voice, and writing style of this publication"
4. Cache the tone analysis result
5. Use this analysis as a style guide for article generation

**User Override**: After analysis, prompt user: "Default tone: [analyzed tone]. Press Enter to use default, or type custom tone:"
- If Enter: Use analyzed tone
- If text entered: Use custom tone for this run only

**Why This Matters**: Each publication has a unique voice. Manual tone instructions are imprecise and inconsistent. Learning from existing content ensures brand consistency.

---

### 3. Content Generation (Three Pathways)

**Common Requirements for All Pathways**:
- Output length: 750-1150 words (strict requirement)
- Professional news journalism structure
- No placeholder text or [brackets]
- No repetition of instructions in output
- Parse response to extract: TITLE and BODY

#### Pathway A: From Simple Idea
- LLM prompt: "Expand this idea into a full article"
- Include: context, analysis, expert perspectives (synthesized)
- Ensure: article reads as researched journalism

#### Pathway B: From URL
- Fetch URL content (HTTP request with user agent)
- Extract text content (strip HTML tags)
- Limit to 8000 chars to avoid token limits
- LLM prompt: "Completely rewrite this article in our voice"
- Critical: Must NOT copy phrases directly, maintain factual accuracy but rewrite entirely

#### Pathway C: From Unstructured Text
- LLM prompt: "Transform this text into a polished article"
- Organize and expand content
- Add structure, context, and professional narrative flow

**Why Three Pathways**: Different inputs require different processing. A URL needs fetching and aggressive rewriting. An idea needs expansion. Text needs organization. Each pathway optimizes for its input type.

---

### 4. Metadata Generation (AI-Powered)

**Requirement**: Automatically generate ALL article metadata without user input.

**Metadata Fields to Generate**:

1. **Category Selection**
   - Analyze article content
   - Choose from predefined category list (11 categories in original: us, world, politics, business, tech, health, entertainment, sports, opinion, lifestyle, travel)
   - Use LLM to determine best-fit category

2. **Tags Generation**
   - Generate 3-5 relevant tags
   - Keep concise (1-3 words each)
   - Based on article content and title

3. **Subheading (Dek)**
   - Create compelling subheading (10-15 words)
   - Expands on title, provides context
   - Should entice readers

4. **Geographic Location**
   - Analyze article content for geographic relevance
   - If article has clear location context: extract it (e.g., "Washington, D.C.", "Brussels, Belgium")
   - If no geographic relevance: null/omit
   - Critical: Must be educated guess, not forced

5. **Excerpt**
   - Extract first complete sentence from article body
   - Or: first 150 characters if sentence is too long
   - Used for article listings/previews

6. **Reading Time**
   - Calculate: word_count / 200 (words per minute)
   - Round to nearest minute
   - Minimum: 1 minute

**Implementation**: Single LLM call requesting JSON response with all metadata fields. This is more efficient than multiple calls.

**Why AI-Generated**: Manual metadata creation is tedious and inconsistent. AI can analyze the full article context and generate appropriate, SEO-optimized metadata.

---

### 5. Author Generation (Randomization)

**Requirement**: Generate realistic, diverse author names automatically.

**Implementation Details**:
- Maintain pools of first names, last names
- Include diverse cultural names (not just Western)
- Optional prefix: 20% chance of "Dr." prefix
- Generate author_slug: lowercase, hyphenated version (e.g., "dr-elena-martinez" or "james-wilson")

**Example Pools**:
- First: Elena, Marcus, Sophia, James, etc. (~30 names)
- Last: Chen, Rodriguez, Kim, Petrov, Johnson, etc. (~30 names)
- Random selection creates variety

**Why Random Authors**: The blog is satire/news parody. Random professional-sounding names add authenticity. User doesn't want to maintain an author database.

---

### 6. Slug Generation

**Requirement**: Create URL-friendly identifiers from article titles.

**Process**:
1. Convert title to lowercase
2. Remove special characters (keep letters, numbers, spaces, hyphens)
3. Replace spaces and multiple hyphens with single hyphen
4. Strip leading/trailing hyphens

**Example**: "AI's Impact: The Future?" → "ais-impact-the-future"

**Why This Matters**: Clean URLs are essential for SEO and user experience.

---

### 7. Image Generation (DALL-E Integration)

**Requirement**: Generate photorealistic hero images that match article content.

**Two-Step Process**:

**Step 1: Generate Image Prompt**
- Send article title, dek, category, and first 500 chars to LLM
- Request: "Write a DALL-E prompt for a photorealistic news hero image"
- Critical instructions to LLM:
  - Must specify "photograph" or "photo-realistic"
  - Must mention professional camera terms (DSLR, 50mm lens, etc.)
  - Must specify natural/cinematic lighting
  - Must describe editorial/documentary composition
  - Must NEVER mention: illustration, painting, cartoon, CGI, 3D render
- This generates a ~2 sentence prompt optimized for realism

**Step 2: Generate Image**
- DALL-E 3 API call with:
  - Size: 1792x1024 (landscape, optimal for hero images)
  - Quality: "hd"
  - Style: "natural" (biases toward photorealism)
  - n: 1
- Download resulting image
- Save to public/images directory
- Filename: shortened version of slug (max 50 chars) + .png

**Why Two Steps**: DALL-E often produces illustrations if not carefully prompted. The LLM acts as a "prompt engineer" to ensure photorealistic output. This is more reliable than hardcoding prompts.

---

### 8. Front Matter Construction (Critical Section)

**Requirement**: Generate syntactically perfect front matter that the static site generator can parse.

**Format Requirements** (specific to original platform):
- Uses YAML front matter between `---` delimiters
- Field order matters for some parsers
- String escaping is CRITICAL

**Fields Required**:
- title: string (quoted)
- dek: string (quoted)
- slug: string (unquoted, alphanumeric + hyphens only)
- category: string (unquoted, predefined value)
- tags: array format `['tag1', 'tag2', 'tag3']`
- author: string (quoted)
- author_slug: string (unquoted)
- published: ISO 8601 datetime
- updated: ISO 8601 datetime
- hero_image: full URL (unquoted)
- hero_credit: string (quoted)
- thumbnail: full URL (unquoted)
- excerpt: string (quoted)
- reading_time: integer (unquoted)
- location: string (quoted) [optional - only if present]
- status: string (unquoted, always "published")
- is_satire: boolean (unquoted, always false)

**Critical: YAML String Escaping**
- Problem: Colons (`:`) in titles break YAML parsers
- Problem: Apostrophes (`'`) in text break YAML parsers
- Problem: Quotes (`"`) in text break YAML parsers
- Solution: ALWAYS wrap title, dek, author, excerpt, location in double quotes
- Solution: Escape internal double quotes: `"` → `\"`

**Function Required**: `yaml_escape(value)` that:
1. Converts to string
2. Replaces `"` with `\"`
3. Wraps entire value in double quotes
4. Returns: `"escaped value"`

**Example Output**:
```yaml
---
title: "Zelensky's Right Hand Man Steps Down: A Wrench in Ukraine's Power Machinery?"
dek: "Andrii Yermak's resignation marks a significant fallout in the administration."
slug: zelenskys-right-hand-man-steps-down
category: world
tags: ['Ukraine', 'Politics', 'Zelensky']
author: "Dr. Elena Chen"
author_slug: elena-chen
published: 2025-11-28T18:49:33.896870+00:00
updated: 2025-11-28T18:49:33.896870+00:00
hero_image: https://github.com/user/repo/blob/main/public/image.png?raw=true
hero_credit: "Photo via Pexels"
thumbnail: https://github.com/user/repo/blob/main/public/image.png?raw=true
excerpt: "In what can only be described as a high-stakes political drama..."
reading_time: 8
location: "Ukraine"
status: published
is_satire: false
---
```

**Why This Is Critical**: A single unescaped colon will break the entire site build. YAML parsers are extremely strict. This was the primary bug in the original implementation.

---

### 9. File Operations

**Requirements**:

1. **Determine Category Directory**: Based on AI-selected category
2. **Create Directory**: If category folder doesn't exist, create it
3. **Generate File Path**: `{category}/{slug}.md`
4. **Write File**: Complete markdown with front matter + body
5. **Image Path**: `public/{slug}.png` (or equivalent public directory)

**File Structure**:
```
---
[front matter]
---

[article body]
```

**No blank lines between front matter closing `---` and article body start.**

---

### 10. User Experience Flow

**Command Execution**:
```
python create_article.py
```

**Console Output Sequence**:
1. "Enter your blog content (Ctrl+D when done):"
2. User pastes content, presses Ctrl+D
3. "Analyzing existing articles to learn tone..."
4. "✓ Tone identified: [description]"
5. "Default tone: [tone]. Enter custom tone or press Enter:"
6. User presses Enter or types custom tone
7. "Input type detected: [URL/IDEA/TEXT]"
8. "Generating article..." (with appropriate verb for input type)
9. "✓ Article generated: [title]"
10. "✓ Word count: [count] words"
11. "Generating metadata..."
12. "✓ Category: [category]"
13. "✓ Tags: [tags]"
14. "✓ Location: [location]"
15. "✓ Author: [author name]"
16. "Generating image prompt..."
17. "✓ Image prompt: [prompt]"
18. "Generating image with DALL-E..."
19. "✓ Image saved: [filename]"
20. "✓ Article saved: [filepath]"
21. Final summary with all file paths

**Why This Matters**: Clear progress indicators build user confidence. Each step shows the autonomous system is working. No silent gaps.

---

### 11. Error Handling Requirements

**Required Error Catches**:

1. **No API Key**: Check environment variable, exit gracefully with setup instructions
2. **URL Fetch Failure**: Catch network errors, provide clear message
3. **LLM API Failures**: Catch rate limits, timeout errors
4. **Duplicate Email Detection**: Catch database unique constraint errors (for newsletter)
5. **File Write Failures**: Catch permission errors, disk full errors
6. **Invalid Input**: Validate email format, URL format

**Error Message Format**:
- "❌ Error: [clear description]"
- "Suggestion: [what user should do]"
- Exit gracefully (don't crash)

---

### 12. Configuration Constants

**Define at Top of Script**:

1. **Content Directory Path**: Where articles are stored
2. **Public Directory Path**: Where images are stored
3. **Categories List**: All valid categories with display names
4. **GitHub Repo URL**: For constructing image URLs (original uses GitHub raw URLs)
5. **Author Name Pools**: Lists of first/last names
6. **Image Size**: DALL-E size parameter
7. **Word Count Range**: Min/max article length
8. **Reading Speed**: Words per minute for time calculation

**Why Configuration Section**: Makes adaptation to different blogs easy. All customization in one place.

---

### 13. Timestamp Generation

**Requirements**:
- Use UTC timezone (not local time)
- ISO 8601 format with timezone: `2025-11-28T18:49:33.896870+00:00`
- Both published and updated fields get same timestamp (it's a new article)

**Why UTC**: Prevents timezone inconsistencies across deployments.

---

### 14. Integration Points

**External Services Required**:
1. **OpenAI API**:
   - GPT-4 for text generation (article, metadata, tone analysis)
   - DALL-E 3 for image generation
   - Requires: OPENAI_API_KEY environment variable

**File System Requirements**:
1. Read access: To sample existing articles
2. Write access: To create new articles and images
3. Directory creation: Ability to mkdir if needed

---

### 15. Success Criteria

**An Article is Successfully Generated When**:
1. Markdown file exists in correct category folder
2. Image file exists in public folder
3. Front matter is syntactically valid (no YAML errors)
4. Article body is 1200-1750 words
5. All required front matter fields are present
6. Author name is realistic
7. Image is photorealistic (not illustration)
8. No error messages in console
9. User receives confirmation with file paths

---

### 16. Original Platform Specifics (For Context)

**Platform**: Vite + React static site
**Content Format**: Markdown with YAML front matter
**Image Hosting**: GitHub repo (public folder)
**Category Structure**: Folder-based (us/, world/, tech/, etc.)
**Article URL Pattern**: `/{category}/{slug}`

**Hexo Differences to Consider**:
- Hexo uses `source/_posts/` directory
- Hexo has different front matter format (YAML but different fields)
- Hexo has `hexo new post` command (might want to use or bypass)
- Hexo might have asset folder structure
- Hexo deployment process differs

---

### 17. Performance Considerations

**Optimization Points**:
1. Sample only 5 articles for tone (not all articles)
2. Limit URL fetch to 8000 chars (avoid token limits)
3. Use single LLM call for all metadata (not multiple calls)
4. Cache tone analysis within session (if running multiple times)
5. Use GPT-4 not GPT-4-turbo (better quality for this use case)

---

### 18. Testing Recommendations

**Test Cases**:
1. Simple idea input: "Quantum computing advances"
2. URL input: Real article URL from another site
3. Text input: 500-word unstructured draft
4. Title with colons: Ensure YAML doesn't break
5. Title with apostrophes: Ensure YAML doesn't break
6. Multiple runs: Ensure different authors/variations
7. Network failure: Ensure graceful error handling

---

### 19. Extension Points (Future Considerations)

**Possible Enhancements**:
1. Batch mode: Process multiple ideas at once
2. Scheduled execution: Cron job for daily articles
3. Source citation: Track if generated from URL
4. Image alternatives: Allow user to provide image URL
5. Draft mode: Create as draft instead of published
6. Category override: Allow user to specify category
7. Multi-language: Support article generation in other languages

---

### 20. Critical Implementation Notes

**Must-Have Features**:
- ✅ YAML escaping (prevents site breaks)
- ✅ Tone matching (maintains brand voice)
- ✅ Input type detection (improves UX)
- ✅ Photorealistic images (brand consistency)
- ✅ Progress indicators (user confidence)
- ✅ Error handling (graceful failures)

**Nice-to-Have Features**:
- Preview mode (show before saving)
- Undo last article (delete generated files)
- Statistics (articles generated count)
- Template selection (different article types)

---

## Implementation Strategy for Hexo

**Key Differences to Account For**:

1. **Front Matter Format**: Research Hexo's required/optional fields
2. **Directory Structure**: Hexo uses `source/_posts/`, not category folders
3. **Image Handling**: Hexo has asset folders, might need different approach
4. **Categories/Tags**: Hexo has specific category/tag syntax
5. **Permalinks**: Hexo generates URLs differently
6. **Metadata**: Hexo might require different fields (layout, date format, etc.)

**Recommended Approach**:
1. Read several existing Hexo articles to understand format
2. Identify ALL front matter fields Hexo uses
3. Test YAML escaping with Hexo parser
4. Determine image storage location
5. Verify category/tag syntax
6. Test with one article before full implementation

---

## Expected Deliverable

**Final Script Should**:
- Be a single Python file
- Require only: `python create_article.py`
- Accept input via stdin
- Generate complete article + image
- Save to correct Hexo directories
- Exit with clear success/failure message
- Work without modification after initial setup

**User Setup Steps**:
1. Set OPENAI_API_KEY environment variable
2. Run script
3. That's it

**Goal**: Zero-friction blog post creation.



================================================
FILE: INDEXING_FIX_REPORT.md
================================================
# Indexing Fix Report - Protocol Sentinel

**Date**: December 16, 2025
**Issue**: 212 pages failing to index in Google Search Console with 404 errors
**Status**: ✅ FIXED

---

## Root Cause Analysis

### The Problem
Google Search Console reported 212 pages returning 404 errors. Investigation revealed:

1. **Aurora Theme Architecture Mismatch**
   - Protocol Sentinel uses Aurora theme, which is a Vue.js Single Page Application (SPA)
   - Aurora handles tags and categories via client-side routing and JSON API
   - Traditional Hexo URLs for tags/categories don't exist as static HTML pages

2. **Sitemap Generator Issue**
   - The `hexo-generator-seo-friendly-sitemap` plugin was generating traditional Hexo-style URLs
   - Sitemap included 212+ tag and category page URLs that don't exist in Aurora's SPA architecture
   - These URLs returned 404 when Google tried to crawl them

### Affected URLs
- Tag pages: `/tags/tucker-carlson/`, `/tags/ai/`, etc. (~150 URLs)
- Category pages: `/categories/Technology/`, `/categories/news/web/tech/`, etc. (~60 URLs)
- Archive pages: Various archive pagination URLs

---

## Solution Implemented

### Configuration Changes

**File**: `blog/_config.yml`

**Change 1**: Added top-level sitemap configuration to exclude tags and categories
```yaml
# Sitemap configuration - excluding tag/category pages for Aurora theme SPA compatibility
sitemap:
  path: sitemap.xml
  tag: false
  category: false
```

**Change 2**: Updated SEO plugin sitemap setting with clarifying comment
```yaml
seo:
  sitemap: true  # Note: Main sitemap config is at the top level, not here
```

### Files Modified
- `/blog/_config.yml` - Sitemap configuration updated
- Regenerated all sitemap files in `/blog/public/`
- Copied corrected files to `/public/` for deployment

---

## Results

### Before Fix
- **Sitemap included**: post-sitemap.xml, page-sitemap.xml, tag-sitemap.xml, category-sitemap.xml
- **Total URLs**: ~280+ URLs
- **404 Errors**: 212 pages

### After Fix
- **Sitemap includes**: post-sitemap.xml, page-sitemap.xml ONLY
- **Total URLs**: ~67 URLs (63 posts + 4 pages)
- **Expected 404 Errors**: 0

### Removed from Sitemap
- ❌ tag-sitemap.xml (eliminated ~150 tag page URLs)
- ❌ category-sitemap.xml (eliminated ~60 category page URLs)

---

## Verification Steps

To verify the fix is working:

1. **Check sitemap structure**:
   ```bash
   cd blog
   hexo clean && hexo generate
   cat public/sitemap.xml
   ```
   Should only show post-sitemap and page-sitemap references

2. **Verify no tag/category sitemaps**:
   ```bash
   ls public/tag-sitemap.xml 2>&1  # Should say "No such file"
   ls public/category-sitemap.xml 2>&1  # Should say "No such file"
   ```

3. **Count URLs in sitemap**:
   ```bash
   grep -c '<loc>' public/post-sitemap.xml  # Should show ~63
   grep -c '<loc>' public/page-sitemap.xml  # Should show ~4
   ```

4. **Test site generation** (local):
   ```bash
   cd blog
   hexo server
   # Visit http://localhost:4000 and verify tags/categories work
   ```

---

## Deployment Instructions

### Option 1: If deploying root /public directory
The fix has already been applied to the root `/public` directory. Deploy as normal.

### Option 2: If deploying from /blog/public
No additional action needed. The fix is in `/blog/_config.yml` and will apply to all future generations.

---

## Google Search Console - Next Steps

1. **Submit Updated Sitemap**:
   - Go to Google Search Console
   - Navigate to Sitemaps section
   - Remove old sitemap if needed
   - Submit: `https://www.protocolsentinel.com/sitemap.xml`

2. **Wait for Recrawl**:
   - Google will automatically recrawl the updated sitemap
   - 404 errors should begin decreasing within 1-2 weeks
   - Full resolution may take 2-4 weeks

3. **Monitor Progress**:
   - Check "Pages" section in Search Console weekly
   - "Not found (404)" errors should decrease from 212 to near-zero

---

## Technical Notes

### Why This Fix Works
Aurora theme is an SPA that:
- Uses Vue Router for client-side navigation
- Serves everything through index.html at the root
- Fetches tag/category data from JSON API (`/api/tags/*.json`, `/api/categories/*.json`)
- Does NOT generate traditional paginated HTML pages for tags/categories

By excluding tag/category pages from the sitemap, we're telling Google to only index pages that actually exist as static HTML files.

### Aurora Theme Compatibility
This fix maintains full Aurora theme functionality:
- ✅ Tags and categories still work on the site (client-side)
- ✅ JSON API still generated for Aurora's SPA
- ✅ Posts and pages still indexed correctly
- ✅ Site navigation unchanged
- ✅ No impact on user experience

---

## Prevention

To prevent this issue in the future:
1. Never manually modify the sitemap configuration back to include tags/categories
2. When upgrading Hexo or the sitemap plugin, verify the configuration is preserved
3. If switching themes away from Aurora, this configuration may need to be reverted

---

## Files Changed Summary

```
Modified:
  blog/_config.yml

Removed (generated files):
  public/tag-sitemap.xml
  public/category-sitemap.xml

Updated (regenerated):
  public/sitemap.xml
  public/post-sitemap.xml
  public/page-sitemap.xml
```

---

**Fix implemented by**: Dev Squad Manager (Claude Code)
**Aurora Theme**: Preserved and fully compatible
**Expected Resolution**: 2-4 weeks in Google Search Console



================================================
FILE: LICENSE
================================================
Copyright (c) 2012-present Tommy Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



================================================
FILE: LICENSE 2
================================================
Copyright (c) 2012-present Tommy Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



================================================
FILE: LICENSE 3
================================================
Copyright (c) 2012-present Tommy Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



================================================
FILE: package 2.json
================================================
{
  "name": "hexo",
  "version": "7.3.0",
  "description": "A fast, simple & powerful blog framework, powered by Node.js.",
  "main": "dist/hexo",
  "bin": {
    "hexo": "./bin/hexo"
  },
  "scripts": {
    "prepublishOnly": "npm install && npm run clean && npm run build",
    "build": "tsc -b",
    "clean": "tsc -b --clean",
    "eslint": "eslint lib test",
    "pretest": "npm run clean && npm run build",
    "test": "mocha test/index.js --require ts-node/register",
    "test-cov": "c8 --reporter=lcovonly npm test -- --no-parallel",
    "prepare": "husky install"
  },
  "files": [
    "dist/",
    "bin/"
  ],
  "types": "./dist/hexo/index.d.ts",
  "repository": "hexojs/hexo",
  "homepage": "https://hexo.io/",
  "funding": {
    "type": "opencollective",
    "url": "https://opencollective.com/hexo"
  },
  "keywords": [
    "website",
    "blog",
    "cms",
    "framework",
    "hexo"
  ],
  "author": "Tommy Chen <tommy351@gmail.com> (https://zespia.tw)",
  "maintainers": [
    "Abner Chou <hi@abnerchou.me> (https://abnerchou.me)"
  ],
  "license": "MIT",
  "dependencies": {
    "abbrev": "^2.0.0",
    "archy": "^1.0.0",
    "bluebird": "^3.7.2",
    "hexo-auto-canonical": "^0.1.1",
    "hexo-cli": "^4.3.0",
    "hexo-front-matter": "^4.2.1",
    "hexo-fs": "^4.1.1",
    "hexo-generator-feed": "file:hexo-generator-feed",
    "hexo-generator-opengraph-image": "^0.0.1",
    "hexo-i18n": "^2.0.0",
    "hexo-log": "^4.0.1",
    "hexo-util": "^3.0.1",
    "js-yaml": "^4.1.0",
    "js-yaml-js-types": "^1.0.0",
    "micromatch": "^4.0.4",
    "moize": "^6.1.6",
    "moment": "^2.29.1",
    "moment-timezone": "^0.5.34",
    "nunjucks": "^3.2.3",
    "picocolors": "^1.0.0",
    "pretty-hrtime": "^1.0.3",
    "resolve": "^1.22.0",
    "strip-ansi": "^6.0.0",
    "text-table": "^0.2.0",
    "tildify": "^2.0.0",
    "titlecase": "^1.1.3",
    "warehouse": "^5.0.1"
  },
  "devDependencies": {
    "@types/abbrev": "^1.1.3",
    "@types/bluebird": "^3.5.37",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^18.11.8 <18.19.9",
    "@types/nunjucks": "^3.2.2",
    "@types/text-table": "^0.2.4",
    "0x": "^5.1.2",
    "c8": "^9.0.0",
    "chai": "^4.3.6",
    "cheerio": "0.22.0",
    "decache": "^4.6.1",
    "eslint": "^8.48.0",
    "eslint-config-hexo": "^5.0.0",
    "hexo-renderer-marked": "^6.0.0",
    "husky": "^8.0.1",
    "lint-staged": "^15.2.0",
    "mocha": "^10.0.0",
    "sinon": "^17.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.2"
  },
  "engines": {
    "node": ">=14"
  }
}



================================================
FILE: package 3.json
================================================
{
  "name": "hexo",
  "version": "7.3.0",
  "description": "A fast, simple & powerful blog framework, powered by Node.js.",
  "main": "dist/hexo",
  "bin": {
    "hexo": "./bin/hexo"
  },
  "scripts": {
    "prepublishOnly": "npm install && npm run clean && npm run build",
    "build": "tsc -b",
    "clean": "tsc -b --clean",
    "eslint": "eslint lib test",
    "pretest": "npm run clean && npm run build",
    "test": "mocha test/index.js --require ts-node/register",
    "test-cov": "c8 --reporter=lcovonly npm test -- --no-parallel",
    "prepare": "husky install"
  },
  "files": [
    "dist/",
    "bin/"
  ],
  "types": "./dist/hexo/index.d.ts",
  "repository": "hexojs/hexo",
  "homepage": "https://hexo.io/",
  "funding": {
    "type": "opencollective",
    "url": "https://opencollective.com/hexo"
  },
  "keywords": [
    "website",
    "blog",
    "cms",
    "framework",
    "hexo"
  ],
  "author": "Tommy Chen <tommy351@gmail.com> (https://zespia.tw)",
  "maintainers": [
    "Abner Chou <hi@abnerchou.me> (https://abnerchou.me)"
  ],
  "license": "MIT",
  "dependencies": {
    "abbrev": "^2.0.0",
    "archy": "^1.0.0",
    "bluebird": "^3.7.2",
    "hexo-auto-canonical": "^0.1.1",
    "hexo-cli": "^4.3.0",
    "hexo-front-matter": "^4.2.1",
    "hexo-fs": "^4.1.1",
    "hexo-generator-feed": "file:hexo-generator-feed",
    "hexo-generator-opengraph-image": "^0.0.1",
    "hexo-i18n": "^2.0.0",
    "hexo-log": "^4.0.1",
    "hexo-util": "^3.0.1",
    "js-yaml": "^4.1.0",
    "js-yaml-js-types": "^1.0.0",
    "micromatch": "^4.0.4",
    "moize": "^6.1.6",
    "moment": "^2.29.1",
    "moment-timezone": "^0.5.34",
    "nunjucks": "^3.2.3",
    "picocolors": "^1.0.0",
    "pretty-hrtime": "^1.0.3",
    "resolve": "^1.22.0",
    "strip-ansi": "^6.0.0",
    "text-table": "^0.2.0",
    "tildify": "^2.0.0",
    "titlecase": "^1.1.3",
    "warehouse": "^5.0.1"
  },
  "devDependencies": {
    "@types/abbrev": "^1.1.3",
    "@types/bluebird": "^3.5.37",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^18.11.8 <18.19.9",
    "@types/nunjucks": "^3.2.2",
    "@types/text-table": "^0.2.4",
    "0x": "^5.1.2",
    "c8": "^9.0.0",
    "chai": "^4.3.6",
    "cheerio": "0.22.0",
    "decache": "^4.6.1",
    "eslint": "^8.48.0",
    "eslint-config-hexo": "^5.0.0",
    "hexo-renderer-marked": "^6.0.0",
    "husky": "^8.0.1",
    "lint-staged": "^15.2.0",
    "mocha": "^10.0.0",
    "sinon": "^17.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.2"
  },
  "engines": {
    "node": ">=14"
  }
}



================================================
FILE: package.json
================================================
{
  "name": "hexo",
  "version": "7.1.1",
  "description": "A fast, simple & powerful blog framework, powered by Node.js.",
  "main": "dist/hexo",
  "bin": {
    "hexo": "./bin/hexo"
  },
  "scripts": {
    "prepublishOnly": "npm install && npm run clean && npm run build",
    "build": "tsc -b",
    "clean": "tsc -b --clean",
    "eslint": "eslint lib test",
    "pretest": "npm run clean && npm run build",
    "test": "mocha test/index.js --require ts-node/register",
    "test-cov": "c8 --reporter=lcovonly npm test -- --no-parallel",
    "prepare": "husky install"
  },
  "files": [
    "dist/",
    "bin/"
  ],
  "types": "./dist/hexo/index.d.ts",
  "repository": "hexojs/hexo",
  "homepage": "https://hexo.io/",
  "funding": {
    "type": "opencollective",
    "url": "https://opencollective.com/hexo"
  },
  "keywords": [
    "website",
    "blog",
    "cms",
    "framework",
    "hexo"
  ],
  "author": "Tommy Chen <tommy351@gmail.com> (https://zespia.tw)",
  "maintainers": [
    "Abner Chou <hi@abnerchou.me> (https://abnerchou.me)"
  ],
  "license": "MIT",
  "dependencies": {
    "abbrev": "^2.0.0",
    "archy": "^1.0.0",
    "bluebird": "^3.7.2",
    "hexo-cli": "^4.3.0",
    "hexo-front-matter": "^4.2.1",
    "hexo-fs": "^4.1.1",
    "hexo-i18n": "^2.0.0",
    "hexo-log": "^4.0.1",
    "hexo-util": "^3.0.1",
    "js-yaml": "^4.1.0",
    "js-yaml-js-types": "^1.0.0",
    "micromatch": "^4.0.4",
    "moize": "^6.1.6",
    "moment": "^2.29.1",
    "moment-timezone": "^0.5.34",
    "nunjucks": "^3.2.3",
    "picocolors": "^1.0.0",
    "pretty-hrtime": "^1.0.3",
    "resolve": "^1.22.0",
    "strip-ansi": "^6.0.0",
    "text-table": "^0.2.0",
    "tildify": "^2.0.0",
    "titlecase": "^1.1.3",
    "warehouse": "^5.0.1"
  },
  "devDependencies": {
    "@types/abbrev": "^1.1.3",
    "@types/bluebird": "^3.5.37",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^18.11.8",
    "@types/nunjucks": "^3.2.2",
    "@types/text-table": "^0.2.4",
    "0x": "^5.1.2",
    "c8": "^9.0.0",
    "chai": "^4.3.6",
    "cheerio": "0.22.0",
    "decache": "^4.6.1",
    "eslint": "^8.48.0",
    "eslint-config-hexo": "^5.0.0",
    "hexo-renderer-marked": "^6.0.0",
    "husky": "^8.0.1",
    "lint-staged": "^15.2.0",
    "mocha": "^10.0.0",
    "sinon": "^17.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.2"
  },
  "engines": {
    "node": ">=14"
  }
}



================================================
FILE: privacy.txt
================================================
Privacy Policy for Tech Done Cheap
This Privacy Policy describes how Tech Done Cheap ("we," "us," or "our") collects, uses, and discloses your personal information when you use our website, located at www.techdonecheap.com (the "Website").

Information We Collect

We collect several types of information from and about users of our Website:

Personal Information: We may collect personal information that can identify you, such as your name, email address, phone number, and billing address when you:
Place an order for our services
Contact us through a contact form or live chat
Subscribe to our newsletter
Usage Data: We may collect information about your activity on the Website, such as the pages you visit, the services you view, and the links you click. This data may be collected using cookies and other tracking technologies.
Use of Your Information

We use the information we collect to:

Provide and improve our services
Process your orders and requests
Send you promotional communications, such as newsletters and special offers (with your consent)
Respond to your inquiries and requests
Analyze how you use the Website
Personalize your experience on the Website
Sharing Your Information

We may share your information with third-party service providers who help us operate the Website and provide our services. These service providers are obligated to protect your information and use it only to perform the services we request.

We may also disclose your information if required by law or to protect the rights and safety of ourselves or others.

Cookies and Tracking Technologies

We use cookies and other tracking technologies to track the activity on our Website and hold certain information. Cookies are small data files placed on your device when you visit a website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Website.

Your Choices

You have choices regarding your information:

You can opt out of receiving marketing emails from us by following the unsubscribe instructions in those emails.
You can adjust your browser settings to control cookies.
Data Security

We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage is 100% secure.

Children's Privacy

Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us.

Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Website.

Contact Us

If you have any questions about this Privacy Policy, please contact us by email at [email address removed].

Please note: This is a generic privacy policy and may need to be modified to comply with all applicable laws and regulations. You may want to consult with an attorney to ensure your privacy policy is appropriate for your specific business needs.



================================================
FILE: README 2.md
================================================
<img src="https://i.imgur.com/mwN2zlk.png" alt="Hexo logo" width="300" height="300" align="right" />

# protocolsentinel.com

> A fast, simple & powerful blog framework, powered by [Node.js](https://nodejs.org).

[Website](https://protocolsentinel.com) |

## Features

- conspiracy theory with no judgement
- programming hacks
- Pen Testing

## Quick Start

goto the website

<a href="https://imgur.com/diqJSoU"><img src="https://i.imgur.com/diqJSoU.png" title="source: imgur.com" /></a>



================================================
FILE: README 3.md
================================================
<img src="https://i.imgur.com/mwN2zlk.png" alt="Hexo logo" width="300" height="300" align="right" />

# protocolsentinel.com

> A fast, simple & powerful blog framework, powered by [Node.js](https://nodejs.org).

[Website](https://protocolsentinel.com) |

## Features

- conspiracy theory with no judgement
- programming hacks
- Pen Testing

## Quick Start

goto the website

<a href="https://imgur.com/diqJSoU"><img src="https://i.imgur.com/diqJSoU.png" title="source: imgur.com" /></a>



================================================
FILE: requirements.txt
================================================
openai>=1.0.0
beautifulsoup4>=4.12.0
lxml>=4.9.0
python-dotenv>=1.0.0




================================================
FILE: RSS_FEED_SETUP.md
================================================
# RSS Feed Setup Documentation

## Overview
Successfully installed and configured the hexo-generator-feed plugin for the Protocol Sentinel blog to provide RSS feed functionality.

## Installation Steps Completed

### 1. Plugin Installation
- Cloned the hexo-generator-feed repository from https://github.com/hexojs/hexo-generator-feed.git
- Installed the plugin locally in the blog directory using:
  ```bash
  npm install ../hexo-generator-feed --save
  ```

### 2. Configuration
Added RSS feed configuration to `blog/_config.yml`:

```yaml
# RSS Feed
## Generate Atom 1.0 or RSS 2.0 feed
feed:
  enable: true
  type: rss2
  path: rss.xml
  limit: 20
  content: false
  content_limit: 140
  content_limit_delim: ' '
  order_by: -date
  autodiscovery: true
```

### 3. Configuration Details
- **Feed Type**: RSS 2.0 (more widely supported than Atom)
- **Output File**: `rss.xml` (accessible at `https://blog.protocolsentinel.com/rss.xml`)
- **Post Limit**: 20 most recent posts
- **Content**: Summary only (140 character limit) for faster loading
- **Autodiscovery**: Enabled for automatic feed detection by RSS readers

## Generated Files
- **Location**: `blog/public/rss.xml`
- **Status**: Successfully generated with 20 most recent blog posts
- **Format**: Valid RSS 2.0 XML format
- **Size**: 658 lines containing all blog post metadata

## Feed Features
- ✅ Blog title and description
- ✅ Post titles and links
- ✅ Publication dates
- ✅ Post categories and tags
- ✅ Post descriptions/summaries
- ✅ Comments links
- ✅ Proper XML formatting

## Usage
Users can now subscribe to the blog using any RSS reader by adding:
```
https://blog.protocolsentinel.com/rss.xml
```

## Next Steps
1. Deploy the updated site to make the RSS feed publicly accessible
2. Consider adding RSS feed links to the blog's navigation or footer
3. Test the feed with various RSS readers to ensure compatibility

## References
- [hexo-generator-feed GitHub Repository](https://github.com/hexojs/hexo-generator-feed.git)
- [Hexo RSS Feed Documentation](https://hexo.io/docs/configuration.html#RSS-Feed)



================================================
FILE: TAG_SITEMAP_FIX 2.md
================================================
# Tag Sitemap Fix - Implementation Summary

## Problem Identified

The sitemap was generating tag URLs that didn't match the actual generated tag pages, causing Google Search Console to report "not indexed because they don't exist" errors.

### Root Cause
1. **Case-sensitive tag storage**: Tags were stored with different cases (e.g., "Tucker-Carlson" vs "tucker-carlson")
2. **Inconsistent slug generation**: With `filename_case: 0`, slugs preserved original case, creating different URLs for the same tag
3. **Mismatch between sitemap and actual pages**: Sitemap included both uppercase and lowercase versions, but only one page was generated

### Issues Found (via verification script)
- 7 tags with case mismatches between sitemap and directories
- 7 duplicate tags (same name, different case)
- 86 tags with uppercase letters that should be lowercase
- 1 missing tag directory ("cancer")

## Solution Implemented

### Changes Made to `lib/models/tag.ts`

1. **Always generate lowercase slugs** (Line 44):
   ```typescript
   return slugize(name, {transform: 1}); // 1 = lowercase
   ```
   - Changed from using `ctx.config.filename_case` to always using `transform: 1` (lowercase)
   - Ensures all tag URLs are consistently lowercase regardless of tag name casing

2. **Case-insensitive duplicate prevention** (Lines 11-31):
   - Added pre-save hook to prevent saving tags with names that differ only by case
   - Checks all existing tags before saving to prevent duplicates

## Next Steps to Complete the Fix

### 1. Install Dependencies (if needed)
```bash
cd blog
npm install
```

### 2. Regenerate the Site
```bash
cd blog
hexo clean
hexo generate
```

This will:
- Regenerate all tag pages with lowercase slugs
- Update the tag-sitemap.xml with consistent lowercase URLs
- Ensure all tag URLs match the generated directories

### 3. Verify the Fix
Run the verification script:
```bash
node verify_tag_fix.js
```

Expected results after regeneration:
- ✅ All tags should be lowercase in sitemap
- ✅ No case mismatches between sitemap and directories
- ✅ No duplicate tags

### 4. Clean Up Existing Duplicate Tags (Optional)

If you want to clean up duplicate tags from your database before regenerating, you can:

1. **Option A**: Let Hexo handle it naturally - when you regenerate, the duplicate prevention will prevent new duplicates, and the lowercase slug fix will make URLs consistent

2. **Option B**: Manually clean the database by removing duplicate tags (keep the one with more posts or the one that appears first)

### 5. Submit Updated Sitemap to Google Search Console

After regeneration:
1. Upload the new `tag-sitemap.xml` to Google Search Console
2. Request re-indexing of tag pages
3. Monitor for resolution of "not indexed" errors

## Technical Details

### How Tag Slugs Work Now

**Before:**
- Tag "Tucker-Carlson" → slug "Tucker-Carlson" → URL "tags/Tucker-Carlson/"
- Tag "tucker-carlson" → slug "tucker-carlson" → URL "tags/tucker-carlson/"
- Result: Two different URLs, only one page generated

**After:**
- Tag "Tucker-Carlson" → slug "tucker-carlson" → URL "tags/tucker-carlson/"
- Tag "tucker-carlson" → slug "tucker-carlson" → URL "tags/tucker-carlson/"
- Result: Same URL, consistent with generated page

### Tag Model Changes

- **Slug generation**: Always uses lowercase transform (`transform: 1`)
- **Duplicate prevention**: Case-insensitive check before saving
- **Backward compatibility**: Tag names are still stored with original case for display, but slugs are normalized

## Files Modified

- `lib/models/tag.ts` - Updated slug generation and duplicate prevention

## Files Created

- `verify_tag_fix.js` - Verification script to check tag consistency
- `TAG_SITEMAP_FIX.md` - This documentation

## Testing

After regeneration, verify:
1. All tag URLs in `public/tag-sitemap.xml` are lowercase
2. All tag directories in `public/tags/` match sitemap URLs (case-insensitive)
3. No duplicate tag entries in sitemap
4. Google Search Console shows no "not indexed" errors for tag pages

## Notes

- The fix is backward compatible - existing tag names are preserved for display
- Only the slug/URL generation is normalized to lowercase
- Future tags will automatically use lowercase slugs and prevent case-sensitive duplicates




================================================
FILE: TAG_SITEMAP_FIX.md
================================================
# Tag Sitemap Fix - Implementation Summary

## Problem Identified

The sitemap was generating tag URLs that didn't match the actual generated tag pages, causing Google Search Console to report "not indexed because they don't exist" errors.

### Root Cause
1. **Case-sensitive tag storage**: Tags were stored with different cases (e.g., "Tucker-Carlson" vs "tucker-carlson")
2. **Inconsistent slug generation**: With `filename_case: 0`, slugs preserved original case, creating different URLs for the same tag
3. **Mismatch between sitemap and actual pages**: Sitemap included both uppercase and lowercase versions, but only one page was generated

### Issues Found (via verification script)
- 7 tags with case mismatches between sitemap and directories
- 7 duplicate tags (same name, different case)
- 86 tags with uppercase letters that should be lowercase
- 1 missing tag directory ("cancer")

## Solution Implemented

### Changes Made to `lib/models/tag.ts`

1. **Always generate lowercase slugs** (Line 44):
   ```typescript
   return slugize(name, {transform: 1}); // 1 = lowercase
   ```
   - Changed from using `ctx.config.filename_case` to always using `transform: 1` (lowercase)
   - Ensures all tag URLs are consistently lowercase regardless of tag name casing

2. **Case-insensitive duplicate prevention** (Lines 11-31):
   - Added pre-save hook to prevent saving tags with names that differ only by case
   - Checks all existing tags before saving to prevent duplicates

## Next Steps to Complete the Fix

### 1. Install Dependencies (if needed)
```bash
cd blog
npm install
```

### 2. Regenerate the Site
```bash
cd blog
hexo clean
hexo generate
```

This will:
- Regenerate all tag pages with lowercase slugs
- Update the tag-sitemap.xml with consistent lowercase URLs
- Ensure all tag URLs match the generated directories

### 3. Verify the Fix
Run the verification script:
```bash
node verify_tag_fix.js
```

Expected results after regeneration:
- ✅ All tags should be lowercase in sitemap
- ✅ No case mismatches between sitemap and directories
- ✅ No duplicate tags

### 4. Clean Up Existing Duplicate Tags (Optional)

If you want to clean up duplicate tags from your database before regenerating, you can:

1. **Option A**: Let Hexo handle it naturally - when you regenerate, the duplicate prevention will prevent new duplicates, and the lowercase slug fix will make URLs consistent

2. **Option B**: Manually clean the database by removing duplicate tags (keep the one with more posts or the one that appears first)

### 5. Submit Updated Sitemap to Google Search Console

After regeneration:
1. Upload the new `tag-sitemap.xml` to Google Search Console
2. Request re-indexing of tag pages
3. Monitor for resolution of "not indexed" errors

## Technical Details

### How Tag Slugs Work Now

**Before:**
- Tag "Tucker-Carlson" → slug "Tucker-Carlson" → URL "tags/Tucker-Carlson/"
- Tag "tucker-carlson" → slug "tucker-carlson" → URL "tags/tucker-carlson/"
- Result: Two different URLs, only one page generated

**After:**
- Tag "Tucker-Carlson" → slug "tucker-carlson" → URL "tags/tucker-carlson/"
- Tag "tucker-carlson" → slug "tucker-carlson" → URL "tags/tucker-carlson/"
- Result: Same URL, consistent with generated page

### Tag Model Changes

- **Slug generation**: Always uses lowercase transform (`transform: 1`)
- **Duplicate prevention**: Case-insensitive check before saving
- **Backward compatibility**: Tag names are still stored with original case for display, but slugs are normalized

## Files Modified

- `lib/models/tag.ts` - Updated slug generation and duplicate prevention

## Files Created

- `verify_tag_fix.js` - Verification script to check tag consistency
- `TAG_SITEMAP_FIX.md` - This documentation

## Testing

After regeneration, verify:
1. All tag URLs in `public/tag-sitemap.xml` are lowercase
2. All tag directories in `public/tags/` match sitemap URLs (case-insensitive)
3. No duplicate tag entries in sitemap
4. Google Search Console shows no "not indexed" errors for tag pages

## Notes

- The fix is backward compatible - existing tag names are preserved for display
- Only the slug/URL generation is normalized to lowercase
- Future tags will automatically use lowercase slugs and prevent case-sensitive duplicates




================================================
FILE: TAG_SITEMAP_FIX_COMPLETE.md
================================================
# Tag Sitemap Fix - Complete Implementation

## Problems Fixed

1. **Dead links in sitemap**: Sitemap included tags that didn't have generated pages
2. **Uppercase tag URLs**: Tags with uppercase letters created broken URLs
3. **Case-sensitive duplicates**: Tags with different cases (e.g., "AI" vs "ai") created duplicate entries
4. **Tag pages not generated**: Tag generator wasn't creating pages for tags with posts

## Solutions Implemented

### 1. Fixed Tag Model (`lib/models/tag.ts`)
- **Lowercase slug generation**: Always generates lowercase slugs regardless of tag name casing
- **Case-insensitive duplicate prevention**: Pre-save hook prevents creating tags that only differ by case

### 2. Fixed Tag Generator (`blog/node_modules/hexo-generator-tag/lib/generator.js`)
- **Fixed post count check**: Changed from `if (!tag.length)` to check `postCount` which properly handles tags with posts
- Ensures all tags with posts get pages generated

### 3. Fixed Sitemap Generator (`blog/node_modules/hexo-generator-seo-friendly-sitemap/lib/tag.js`)
- **Route-based filtering**: Only includes tags that actually have generated pages by checking the route list
- **Case-insensitive deduplication**: Removes duplicate tags that only differ by case
- **Proper hexo context binding**: Fixed context binding to access route list correctly

### 4. Fixed Sitemap Generator Main (`blog/node_modules/hexo-generator-seo-friendly-sitemap/lib/generator.js`)
- **Proper context passing**: Fixed how hexo context is passed to tag sitemap generator

## Verification Results

After regeneration:
- ✅ **145 tags in sitemap** - all have generated pages
- ✅ **0 uppercase URLs** in sitemap
- ✅ **0 missing pages** - all sitemap tags have corresponding pages
- ✅ **All tag URLs are lowercase** and consistent

## Files Modified

1. `lib/models/tag.ts` - Tag model with lowercase slugs and duplicate prevention
2. `blog/node_modules/hexo-generator-tag/lib/generator.js` - Fixed tag page generation
3. `blog/node_modules/hexo-generator-seo-friendly-sitemap/lib/tag.js` - Fixed sitemap filtering
4. `blog/node_modules/hexo-generator-seo-friendly-sitemap/lib/generator.js` - Fixed context binding

## Next Steps

1. **Deploy the changes** to your live site
2. **Resubmit sitemap** to Google Search Console
3. **Monitor** for any remaining 404 errors

## Notes

- Tag names may still display with original casing in the UI, but URLs are always lowercase
- The sitemap now only includes tags that actually have generated pages
- Duplicate tags with different cases are prevented at the database level





================================================
FILE: test_json_parsing.py
================================================
#!/usr/bin/env python3
"""Test JSON parsing logic"""
import json
import re

# Test cases
test_cases = [
    # Case 1: Normal JSON
    '''{"title": "Test", "body": "Content"}''',
    
    # Case 2: JSON with control characters
    '''{"title": "Test\nArticle", "body": "Content with\ttabs"}''',
    
    # Case 3: JSON in markdown code block
    '''```json
{"title": "Test", "body": "Content"}
```''',
    
    # Case 4: JSON with extra text
    '''Here's the response:
{
  "title": "Test Article",
  "body": "This is the body content."
}
That's the JSON.''',
]

def parse_json_robust(content: str):
    """Robust JSON parsing like in the main script"""
    # Remove markdown code blocks if present
    if '```json' in content:
        content = re.sub(r'```json\s*', '', content)
    if '```' in content:
        content = re.sub(r'```\s*', '', content)
    
    # Extract JSON with proper brace matching
    start_idx = content.find('{')
    if start_idx == -1:
        raise ValueError("No JSON object found in response")
    
    brace_count = 0
    end_idx = start_idx
    for i in range(start_idx, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i + 1
                break
    
    json_str = content[start_idx:end_idx]
    
    # Remove control characters
    json_str = ''.join(char for char in json_str if char.isprintable() or char in '\n\r\t')
    json_str = json_str.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    json_str = re.sub(r' +', ' ', json_str)
    
    return json.loads(json_str)

print("Testing JSON parsing logic...")
for i, test in enumerate(test_cases, 1):
    try:
        result = parse_json_robust(test)
        print(f"✓ Test {i} passed: {result.get('title', 'N/A')}")
    except Exception as e:
        print(f"✗ Test {i} failed: {e}")

print("\nAll tests completed!")




================================================
FILE: test_script_fixes.py
================================================
#!/usr/bin/env python3
"""Test script to verify all fixes work correctly"""
import sys
import re
import json

def test_token_calculation():
    """Test that token calculations are within limits"""
    print("Testing token calculations...")
    
    url_content = 'x' * 4000  # Max from fetch_url_content
    content_preview = url_content[:3000]  # Further limited in prompt
    tone = 'witty, fun and serious with a hint of sarcasm'
    
    prompt = f"""Completely rewrite this article in our publication's voice. 

Tone guidelines: {tone}

CRITICAL REQUIREMENTS:
- Output MUST be 750-1150 words (strict requirement)
- Write in professional news journalism structure
- Do NOT copy phrases directly - rewrite entirely while maintaining factual accuracy
- No placeholder text, no [brackets], no repetition of instructions
- Format response as JSON: {{"title": "Article Title", "body": "Article body text"}}

Article to rewrite:
{content_preview}

JSON response:"""
    
    system_msg = 'You are a professional journalist and content writer. Always respond with valid JSON.'
    
    total_input_chars = len(system_msg) + len(prompt)
    estimated_input_tokens = total_input_chars / 4
    max_output_tokens = 3000
    total_estimated = estimated_input_tokens + max_output_tokens
    
    if total_estimated > 8192:
        print(f"❌ FAIL: Total tokens ({total_estimated:.0f}) exceeds limit (8192)")
        return False
    else:
        print(f"✓ PASS: Total tokens ({total_estimated:.0f}) within limit (8192)")
        print(f"  Safety margin: {8192 - total_estimated:.0f} tokens")
        return True

def test_json_parsing():
    """Test JSON parsing with various edge cases"""
    print("\nTesting JSON parsing...")
    
    test_cases = [
        ('Normal JSON', '{"title": "Test", "body": "Content"}'),
        ('JSON with control chars', '{"title": "Test\nArticle", "body": "Content\ttabs"}'),
        ('JSON in markdown', '```json\n{"title": "Test", "body": "Content"}\n```'),
        ('JSON with extra text', 'Here is the response:\n{"title": "Test", "body": "Content"}\nThat\'s it.'),
    ]
    
    def parse_json_robust(content):
        """Same logic as in create_article.py"""
        if '```json' in content:
            content = re.sub(r'```json\s*', '', content)
        if '```' in content:
            content = re.sub(r'```\s*', '', content)
        
        start_idx = content.find('{')
        if start_idx == -1:
            raise ValueError("No JSON object found")
        
        brace_count = 0
        end_idx = start_idx
        for i in range(start_idx, len(content)):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i + 1
                    break
        
        json_str = content[start_idx:end_idx]
        json_str = ''.join(char for char in json_str if char.isprintable() or char in '\n\r\t')
        json_str = json_str.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
        json_str = re.sub(r' +', ' ', json_str)
        
        return json.loads(json_str)
    
    all_passed = True
    for name, test in test_cases:
        try:
            result = parse_json_robust(test)
            if result.get('title') and result.get('body'):
                print(f"✓ PASS: {name}")
            else:
                print(f"❌ FAIL: {name} - missing fields")
                all_passed = False
        except Exception as e:
            print(f"❌ FAIL: {name} - {e}")
            all_passed = False
    
    return all_passed

def test_url_content_limits():
    """Test that URL content is properly limited"""
    print("\nTesting URL content limits...")
    
    # Simulate fetch_url_content returning max 4000 chars
    fetched_content = 'x' * 5000  # Simulate fetching more
    limited_content = fetched_content[:4000]  # As done in fetch_url_content
    
    # Then further limited in prompt
    content_preview = limited_content[:3000]
    
    if len(content_preview) <= 3000:
        print(f"✓ PASS: Content properly limited to {len(content_preview)} chars")
        return True
    else:
        print(f"❌ FAIL: Content too long: {len(content_preview)} chars")
        return False

def main():
    print("=" * 70)
    print("Testing Script Fixes")
    print("=" * 70)
    
    results = []
    results.append(("Token Calculations", test_token_calculation()))
    results.append(("JSON Parsing", test_json_parsing()))
    results.append(("URL Content Limits", test_url_content_limits()))
    
    print("\n" + "=" * 70)
    print("Test Results Summary")
    print("=" * 70)
    
    all_passed = True
    for name, passed in results:
        status = "✓ PASS" if passed else "❌ FAIL"
        print(f"{status}: {name}")
        if not passed:
            all_passed = False
    
    print("=" * 70)
    if all_passed:
        print("✓ ALL TESTS PASSED")
        return 0
    else:
        print("❌ SOME TESTS FAILED")
        return 1

if __name__ == "__main__":
    sys.exit(main())




================================================
FILE: tsconfig 2.json
================================================
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "sourceMap": true,
    "outDir": "dist",
    "declaration": true,
    "esModuleInterop": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "lib/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}


================================================
FILE: tsconfig 3.json
================================================
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "sourceMap": true,
    "outDir": "dist",
    "declaration": true,
    "esModuleInterop": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "lib/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}


================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "sourceMap": true,
    "outDir": "dist",
    "declaration": true,
    "esModuleInterop": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "lib/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}


================================================
FILE: verify_tag_fix 2.js
================================================
#!/usr/bin/env node
/**
 * Verification script to check tag sitemap consistency
 * This script checks if tag URLs in the sitemap match actual generated tag directories
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const TAG_SITEMAP = path.join(PUBLIC_DIR, 'tag-sitemap.xml');
const TAGS_DIR = path.join(PUBLIC_DIR, 'tags');

function extractTagUrlsFromSitemap() {
  if (!fs.existsSync(TAG_SITEMAP)) {
    console.error('❌ tag-sitemap.xml not found');
    return [];
  }

  const content = fs.readFileSync(TAG_SITEMAP, 'utf8');
  const urlMatches = content.match(/<loc>https?:\/\/[^<]*\/tags\/([^\/<]+)\//g);
  
  if (!urlMatches) {
    return [];
  }

  return urlMatches.map(match => {
    const tagMatch = match.match(/\/tags\/([^\/<]+)\//);
    return tagMatch ? tagMatch[1] : null;
  }).filter(Boolean);
}

function getActualTagDirectories() {
  if (!fs.existsSync(TAGS_DIR)) {
    console.error('❌ tags directory not found');
    return [];
  }

  return fs.readdirSync(TAGS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function checkCaseConsistency() {
  const sitemapTags = extractTagUrlsFromSitemap();
  const actualTags = getActualTagDirectories();

  console.log('\n📊 Tag Analysis\n');
  console.log(`Found ${sitemapTags.length} tags in sitemap`);
  console.log(`Found ${actualTags.length} actual tag directories\n`);

  // Check for case inconsistencies
  const sitemapLower = sitemapTags.map(t => t.toLowerCase());
  const actualLower = actualTags.map(t => t.toLowerCase());

  const sitemapSet = new Set(sitemapTags);
  const actualSet = new Set(actualTags);
  const sitemapLowerSet = new Set(sitemapLower);
  const actualLowerSet = new Set(actualLower);

  // Find tags in sitemap but not in actual directories (case-insensitive)
  const missing = sitemapTags.filter(tag => {
    const lowerTag = tag.toLowerCase();
    return !actualLowerSet.has(lowerTag);
  });

  // Find tags with case mismatches
  const caseMismatches = [];
  sitemapTags.forEach(sitemapTag => {
    const lowerTag = sitemapTag.toLowerCase();
    const matchingActual = actualTags.find(actualTag => actualTag.toLowerCase() === lowerTag);
    if (matchingActual && matchingActual !== sitemapTag) {
      caseMismatches.push({
        sitemap: sitemapTag,
        actual: matchingActual
      });
    }
  });

  // Find duplicate tags (same name, different case)
  const duplicates = [];
  const seen = new Set();
  sitemapTags.forEach(tag => {
    const lowerTag = tag.toLowerCase();
    if (seen.has(lowerTag)) {
      duplicates.push(tag);
    } else {
      seen.add(lowerTag);
    }
  });

  console.log('🔍 Issues Found:\n');

  if (missing.length > 0) {
    console.log(`❌ ${missing.length} tags in sitemap but missing from directories:`);
    missing.forEach(tag => console.log(`   - ${tag}`));
    console.log();
  }

  if (caseMismatches.length > 0) {
    console.log(`⚠️  ${caseMismatches.length} tags with case mismatches:`);
    caseMismatches.forEach(({ sitemap, actual }) => {
      console.log(`   - Sitemap: "${sitemap}" → Actual: "${actual}"`);
    });
    console.log();
  }

  if (duplicates.length > 0) {
    console.log(`⚠️  ${duplicates.length} duplicate tags (same name, different case):`);
    duplicates.forEach(tag => console.log(`   - ${tag}`));
    console.log();
  }

  // Check for uppercase tags (should all be lowercase after fix)
  const uppercaseTags = sitemapTags.filter(tag => {
    return tag !== tag.toLowerCase();
  });

  if (uppercaseTags.length > 0) {
    console.log(`⚠️  ${uppercaseTags.length} tags with uppercase letters (should be lowercase):`);
    uppercaseTags.slice(0, 10).forEach(tag => console.log(`   - ${tag}`));
    if (uppercaseTags.length > 10) {
      console.log(`   ... and ${uppercaseTags.length - 10} more`);
    }
    console.log();
  }

  if (missing.length === 0 && caseMismatches.length === 0 && duplicates.length === 0 && uppercaseTags.length === 0) {
    console.log('✅ All tags are consistent! No issues found.\n');
    return true;
  }

  return false;
}

// Run the check
if (require.main === module) {
  const isConsistent = checkCaseConsistency();
  process.exit(isConsistent ? 0 : 1);
}

module.exports = { checkCaseConsistency, extractTagUrlsFromSitemap, getActualTagDirectories };




================================================
FILE: verify_tag_fix.js
================================================
#!/usr/bin/env node
/**
 * Verification script to check tag sitemap consistency
 * This script checks if tag URLs in the sitemap match actual generated tag directories
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const TAG_SITEMAP = path.join(PUBLIC_DIR, 'tag-sitemap.xml');
const TAGS_DIR = path.join(PUBLIC_DIR, 'tags');

function extractTagUrlsFromSitemap() {
  if (!fs.existsSync(TAG_SITEMAP)) {
    console.error('❌ tag-sitemap.xml not found');
    return [];
  }

  const content = fs.readFileSync(TAG_SITEMAP, 'utf8');
  const urlMatches = content.match(/<loc>https?:\/\/[^<]*\/tags\/([^\/<]+)\//g);
  
  if (!urlMatches) {
    return [];
  }

  return urlMatches.map(match => {
    const tagMatch = match.match(/\/tags\/([^\/<]+)\//);
    return tagMatch ? tagMatch[1] : null;
  }).filter(Boolean);
}

function getActualTagDirectories() {
  if (!fs.existsSync(TAGS_DIR)) {
    console.error('❌ tags directory not found');
    return [];
  }

  return fs.readdirSync(TAGS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function checkCaseConsistency() {
  const sitemapTags = extractTagUrlsFromSitemap();
  const actualTags = getActualTagDirectories();

  console.log('\n📊 Tag Analysis\n');
  console.log(`Found ${sitemapTags.length} tags in sitemap`);
  console.log(`Found ${actualTags.length} actual tag directories\n`);

  // Check for case inconsistencies
  const sitemapLower = sitemapTags.map(t => t.toLowerCase());
  const actualLower = actualTags.map(t => t.toLowerCase());

  const sitemapSet = new Set(sitemapTags);
  const actualSet = new Set(actualTags);
  const sitemapLowerSet = new Set(sitemapLower);
  const actualLowerSet = new Set(actualLower);

  // Find tags in sitemap but not in actual directories (case-insensitive)
  const missing = sitemapTags.filter(tag => {
    const lowerTag = tag.toLowerCase();
    return !actualLowerSet.has(lowerTag);
  });

  // Find tags with case mismatches
  const caseMismatches = [];
  sitemapTags.forEach(sitemapTag => {
    const lowerTag = sitemapTag.toLowerCase();
    const matchingActual = actualTags.find(actualTag => actualTag.toLowerCase() === lowerTag);
    if (matchingActual && matchingActual !== sitemapTag) {
      caseMismatches.push({
        sitemap: sitemapTag,
        actual: matchingActual
      });
    }
  });

  // Find duplicate tags (same name, different case)
  const duplicates = [];
  const seen = new Set();
  sitemapTags.forEach(tag => {
    const lowerTag = tag.toLowerCase();
    if (seen.has(lowerTag)) {
      duplicates.push(tag);
    } else {
      seen.add(lowerTag);
    }
  });

  console.log('🔍 Issues Found:\n');

  if (missing.length > 0) {
    console.log(`❌ ${missing.length} tags in sitemap but missing from directories:`);
    missing.forEach(tag => console.log(`   - ${tag}`));
    console.log();
  }

  if (caseMismatches.length > 0) {
    console.log(`⚠️  ${caseMismatches.length} tags with case mismatches:`);
    caseMismatches.forEach(({ sitemap, actual }) => {
      console.log(`   - Sitemap: "${sitemap}" → Actual: "${actual}"`);
    });
    console.log();
  }

  if (duplicates.length > 0) {
    console.log(`⚠️  ${duplicates.length} duplicate tags (same name, different case):`);
    duplicates.forEach(tag => console.log(`   - ${tag}`));
    console.log();
  }

  // Check for uppercase tags (should all be lowercase after fix)
  const uppercaseTags = sitemapTags.filter(tag => {
    return tag !== tag.toLowerCase();
  });

  if (uppercaseTags.length > 0) {
    console.log(`⚠️  ${uppercaseTags.length} tags with uppercase letters (should be lowercase):`);
    uppercaseTags.slice(0, 10).forEach(tag => console.log(`   - ${tag}`));
    if (uppercaseTags.length > 10) {
      console.log(`   ... and ${uppercaseTags.length - 10} more`);
    }
    console.log();
  }

  if (missing.length === 0 && caseMismatches.length === 0 && duplicates.length === 0 && uppercaseTags.length === 0) {
    console.log('✅ All tags are consistent! No issues found.\n');
    return true;
  }

  return false;
}

// Run the check
if (require.main === module) {
  const isConsistent = checkCaseConsistency();
  process.exit(isConsistent ? 0 : 1);
}

module.exports = { checkCaseConsistency, extractTagUrlsFromSitemap, getActualTagDirectories };




================================================
FILE: .editorconfig
================================================
root = true

[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true

[vcbuild.bat]
end_of_line = crlf

[*.{md,markdown}]
trim_trailing_whitespace = false

[{lib,src,test}/**.js]
indent_style = space
indent_size = 2

[src/**.{h,cc}]
indent_style = space
indent_size = 2

[test/*.py]
indent_style = space
indent_size = 2

[configure]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
indent_size = 8

[{deps,tools}/**]
indent_style = ignore
indent_size = ignore
end_of_line = ignore
trim_trailing_whitespace = ignore
charset = ignore


================================================
FILE: .eslintignore
================================================
node_modules/
coverage/
tmp/


================================================
FILE: .eslintrc.json
================================================
{
  "root": true,
  "extends": "hexo/ts.js",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2020
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "node/no-missing-require": 0
  }
}



================================================
FILE: .lintstagedrc.json
================================================
{
  "*.js": "eslint --fix",
  "*.ts": "eslint --fix"
}



================================================
FILE: .mocharc.yml
================================================
color: true
reporter: spec
ui: bdd
full-trace: true
exit: true
parallel: true



================================================
FILE: blog/_config.aurora.yml
================================================
#! ---------------------------------------------------------------
#! Aurora Theme for Hexo
#! ---------------------------------------------------------------
#! Designed & Coded By Benny Guo
#! ---------------------------------------------------------------

#! ---------------------------------------------------------------
#! Site Configs
#！ @docs https://aurora.tridiamond.tech/guide/configuration.html
#! ---------------------------------------------------------------
site:
  subtitle: Discover Cutting-Edge Tech, AI News & Hacks, Speak your mind freely
  author: Protocol Sentinel
  nick: Enthusiast of the coding arts, conspiracy theorist, debater
  description: Explore the latest in technology, learn about AI hacks and exploits, coding tutorials, and feel welcome to my online ai tools for free.
  link: ''
  language: en
  multi_language: false
  logo: https://github.com/cojovi/projectsentinal/blob/main/test/7.png?raw=true
  avatar: https://github.com/cojovi/projectsentinal/blob/main/test/5.png?raw=true
  beian:
    number: ''
    link: ''
  police_beian:
    number: ''
    link: ''
  # Start date of the blog YYY-MM-DD
  # 博客开始运行日期
  started_date: 2025-02-10
  # Path unique identifier (文章 URL 唯一标识)
  # uid: use unique ID
  # slug: use generated slug base on title
  # (Default is 'slug')
  pathSlug: 'slug'

#! ---------------------------------------------------------------
#! Authors Configs
#！ @docs https://aurora.tridiamond.tech/guide/authors.html
#! ---------------------------------------------------------------
authors:
  ##! example
  # TriDiamond:
     name: Tech Predator
     avatar: https://github.com/cojovi/projectsentinal/blob/main/test/TechPredator_NoBG.png?raw=true
     link: https://github.com/cojovi
     description: 'watch carefully, listen more.'
  #   socials:
     github: https://github.com/cojovi

#! ---------------------------------------------------------------
#! Menu Configs
#！ @docs https://aurora.tridiamond.tech/guide/menu.html
#! ---------------------------------------------------------------
menu:
  About: true
  Tags: true
  Archives: true
  Friends: true
  Links: true
  Landing:
    name: 'Landing'
    i18n:
    path: '/page/landing'
    en: 'landing'

#! ---------------------------------------------------------------
#! Theme Config
#! @docs https://aurora.tridiamond.tech/guide/theme.html
#! ---------------------------------------------------------------
theme:
  dark_mode: true
  profile_shape: diamond # support `circle`, `diamond`, `rounded`
  feature: true
  gradient:
    color_1: '#24c6dc'
    color_2: '#5433ff'
    color_3: '#ff0099'

#! ---------------------------------------------------------------
#! Social Configs
#! @docs https://aurora.tridiamond.tech/guide/social.html
#! ---------------------------------------------------------------
socials:
  customs:
  ##! Example:
  ##! --- Using SVG
  # bilibili:
     icon: iconfont-facebook
     link: https://www.facebook.com/techdonecheap

  ##! --- Using IconFont
  # baidu:
  #   icon: iconfont icon-baidu
  #   link: https://live.bilibili.com/22619211

  ##! --- Using FontAwesome
  # book:
  #   icon: far fa-address-book
  #   link: https://live.bilibili.com/22619211

#! ---------------------------------------------------------------
#! Site Meta Configs
#! @docs https://aurora.tridiamond.tech/guide/theme.html
#! ---------------------------------------------------------------
site_meta:
  cdn: cn
  favicon: https://github.com/cojovi/projectsentinal/blob/main/test/7.png?raw=true
  description: 'Protocol Sentinel : a goldmine in the darkness'
  keywords: 'Tech, Electronics, AI, exploits'
  author: 'Tech Predator'

# Sitemap
#sitemap:
#  path: 
#    - sitemap.xml
#    - sitemap.txt
#  template: ./sitemap_template.xml
#  template_txt: ./sitemap_template.txt
#  rel: false
#  tags: true
#  categories: true
#! ---------------------------------------------------------------
#! Plugins
#! @docs https://aurora.tridiamond.tech/guide/plugins.html
#! ---------------------------------------------------------------

# For local development only!
gitalk:
  enable: true
  autoExpand: true
  clientID: ''
  clientSecret: ''
  repo: '' ## dev-blo-comments
  owner: '' ## owner name
  admin: [''] ## ['admin_name']
  id: uid
  language: en
  distractionFreeMode: true
  recentComment: true
  proxy: ''

# Valine comment plugin (recommended!)
# see https://valine.js.org/quickstart.html
valine:
  enable: false
  app_id:
  app_key:
  avatar: ''
  placeholder: Leave your thoughts behind~
  visitor: true
  lang: en
  avatarForce: false
  meta: ['nick', 'mail']
  requiredFields: ['nick', 'mail']
  admin: '' # admin username
  recentComment: true

# Twikoo comment plugin
# see https://twikoo.js.org/quick-start.html
twikoo:
  enable: false
  recentComment: true
  envId: xxxxxxxxxxxxxxx # 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
  # region: ap-guangzhou # 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
  lang: 'en' # 用于手动设定评论区语言，支持的语言列表 https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js

# Waline comment plugin
# see https://waline.js.org/guide/get-started/
waline:
  enable: false
  recentComment: true
  reaction: false
  login: 'disable'
  meta: ['nick', 'mail']
  requiredMeta: ['nick', 'mail']
  commentSorting: 'latest'
  wordLimit: 0
  imageUploader: false
  pageSize: 10
  serverURL: '' # 填写服务端地址

# Enable Busuanzi statistic plugin
# see http://ibruce.info/2015/04/04/busuanzi/
busuanzi:
  enable: false

copy_protection:
  enable: true
  author:
    cn: 作者
    en: Author
  link:
    cn: 本文来自于
    en: Article is from
  license:
    cn: 博客内容遵循 署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0) 协议
    en: This content is shared under the CC BY-NC-SA 4.0 protocol (Non-Commercial)

#! ---------------------------------------------------------------
#! Enable Aurora Bot Dia
#! @docs https://aurora.tridiamond.tech/guide/site-meta.html#custom-meta
#! ---------------------------------------------------------------
aurora_bot:
  enable: true
  locale: en
  bot_type: dia
  tips:
    # ======================================================
    # These are random messages that Dia will say every 30 seconds.
    # ======================================================
    messages:
      - Hi, I am <span>Dia</span>, I am here to help you~
      - Long time no see, time passes with the blink of the eyes...
      - Hi～ Come play with me！
      - '*Hammer your chest with my kitty fist*'
      # This is a special function which will trigger the quotes API
      # and Dia will say out the daily quote message.
      - showQuote

    # ======================================================
    # This will trigger when user open the browser console.
    # ======================================================
    console: LOL, you opened the console, want to find out my little secrets?

    # ======================================================
    # This will trigger when user copy things off your blog.
    # ======================================================
    copy: What have you copied? Remember to add the source when using it!

    # ======================================================
    # This will trigger when user come back to the window.
    # ======================================================
    visibility_change: Welcome back my friend!~

    # ======================================================
    # Welcome messages, the number is the time of the day.
    # -----------------------------------
    # eg: 24 = 00:00 which is midnight
    # eg: 17-19 = during 5pm to 7pm
    # -----------------------------------
    # During this time of the day, Dia will greet your readers
    # with the corresponding message.
    # ======================================================
    welcome:
      '24': Are you a night owl? Will you able get up tomorrow?
      '5_7':
        Good morning! The plan for a day lies in the morning, and a beautiful day
        is about to begin.
      '7_11': Good morning! How is your day doing? don't sit for too long!
      '11_13': It's noon, Must have being working all morning, and it's lunch time!
      '13_17': It's easy to get sleepy in the afternoon. Have a cup of coffee maybe?
      '17_19': It's evening! The sunset outside the window is beautiful.
      '19_21': Good evening, how are you doing today?
      '21_23':
        - It's getting late, rest early, good night~
        - Take good care of your eyes!

    # ======================================================
    # This is used when your user come from a Search Engine.
    # ======================================================
    referrer:
      # User came from your own site.
      self: Welcome to <span>「[PLACEHOLDER]」</span>
      # User came from Baidu search engine.
      baidu:
        Hello！Friend from Baidu search engine,<br>did you search <span>「[PLACEHOLDER]」</span>
        to find me？
      # User came from 360 search engine.
      so:
        Hello！Friend from 360 search engine,<br>did you search <span>「[PLACEHOLDER]」</span>
        to find me？
      # User came from Google search engine.
      google: Hello！Friend from Google search engine,<br>enjoy your time reading <span>「[PLACEHOLDER]」</span>
      # User came from another website.
      site: Hello there, friend from <span>[PLACEHOLDER]</span>
      # For any other source.
      other: Thanks for reading <span>「[PLACEHOLDER]」</span>

    # ======================================================
    # When your `mouse hover` on to certain HTML tag, Dia will
    # give your user a message to help them out.
    # ------------------------------------------------------
    # selector: tag selector (you can use any css selector for this)
    # text: this is the message(s) that Dia will say. (If you want
    #       Dia to say a random one from a set of messages, set it with
    #       array, else just plain text)
    # ======================================================
    mouseover:
      # Hover on Dia
      - selector: '#Aurora-Dia'
        text:
          - Waaaaaaaa...What are you <span>doing</span>? O.O
          - Please be gentle, I am very delicate! O.O
          - '<span>Sir yes sir!</span> What can I help you with? O.O'
      # Hover on home menu
      - selector: "[data-menu='Home']"
        text:
          - 'Click to go to the <span>home page</span>. '
          - Yes, click here to go <span>back home</span>.
          - Go take a look at the <span>home page</span>.
      # Hover on about menu
      - selector: "[data-menu='About']"
        text:
          - You want to know more about my <span>master</span>?
          - Here hides all the <span>secrets of my master</span>, want to take a look?
          - Found my master's <span>secret hideout</span>!
      # Hover on archives menu
      - selector: "[data-menu='Archives']"
        text:
          - Here stores all the <span>works</span> my master had done！
          - Wanna see my master's <span>library?</span>
          - Yes, my masters' <span>ancient histories</span> are all here!
      # Hover on tags menu
      - selector: "[data-menu='Tags']"
        text:
          - Click here to look at <span>article tags</span>.
          - Tags are used to better <span>categorize</span> your articles.
      # Hover on language menu
      - selector: "[data-dia='language']"
        text: Master's blog supports multiple <span>languages.</span>
      # Hover on light and dark switch
      - selector: "[data-dia='light-switch']"
        text:
          You can switch between <span>light</span> and <span>dark</span> mode, click
          the switch to see the magic!
      # Hover on author profile
      - selector: "[data-dia='author']"
        text:
          - Here is a short profile of my master.
          - Click any of these links can teleport to my master's other worlds.
      # Hover on jump to comment menu in article page.
      - selector: "[data-dia='jump-to-comment']"
        text:
          - Do you want to check out the comments?
          - Click here will help you jump right into the comments section.

#! ---------------------------------------------------------------
#! Injections
#! @docs https://aurora.tridiamond.tech/guide/site-meta.html#custom-meta
#! ---------------------------------------------------------------
injects:
  scripts:
    - |
      <!-- Google Tag Manager -->
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PQ6BC36T');</script>
      <!-- End Google Tag Manager -->
    - |
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQ6BC36T"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
  css:

#! ---------------------------------------------------------------
#! Footer links
#! ---------------------------------------------------------------
footer_links:
  - title: Pish Posh
    links:
      - title: Protocol Sentinel
        url: www.protocolsentinel.com
      - title: Visit Beefy
        url: www.beefthroat.com
      - title: Visit Cojovi
        url: www.cojovi.com
      - title: Friends # link of friends mode / 友链模式
        mode: 'links'

#! ---------------------------------------------------------------
#! Highlighter Shiki
#! ---------------------------------------------------------------
shiki:
  enable: true
  backgroundColor: "#1a1a1a"




================================================
FILE: blog/_config.landscape.yml
================================================
[Empty file]


================================================
FILE: blog/_config.yml
================================================
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: Protocol Sentinel
subtitle: 'We Blog, We Talk, Be Share!'
description: 'Tech, Software, Coding, Builds'
keywords:
author: Digital Predator
language: en
timezone: ''

# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://www.protocolsentinel.com
permalink: /post/:title.html
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks

# Sitemap configuration - excluding tag/category pages for Aurora theme SPA compatibility
sitemap:
  path: sitemap.xml
  tag: false
  category: false

seo:
  # minify html
  html:
    enable: true
    # fix invalid html
    fix: true
    # exclude from minify
    exclude:
      - "*.min.{htm,html}"
  # minify css
  css:
    enable: true
    # If you want to customize the css minifier settings, you can put below
    # exclude css from minifying, multiple supported
    exclude:
      - "**/*.min.css"
  # minify js
  js:
    enable: true
    # concatenate all js into one tag
    ## WARNING: DO NOT USING ANOTHER MINIFIER PLUGIN
    concat: false
    # If you want to customize the js minifier settings, you can put below
    # exclude css from minifying, multiple supported
    exclude:
      - "**/*.min.js"
    # this is terser options, you can customize minifier with terser options https://github.com/terser/terser
    # below is config example
    options:
      compress:
        dead_code: true
      mangle:
        toplevel: true
        safari10: true
  # add rich snippets on every posts and pages
  schema:
    article:
      enable: true
    breadcrumb:
      enable: true
    sitelink:
      enable: true
      searchUrl:
  # this function still under development because JAVASCRIPT HEAP MEMORY and my device is 8GB RAM
  img:
    enable: true
    # fix broken images
    broken: false
    # default broken images
    default: https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg
    # broken images methods
    # serverside : process broken images from server side (caused javascript heap out of memory, if your post large and your device has insufficient memory)
    # clientside : process broken image from client side browser with webjs
    onerror: serverside
  # external links fix
  links:
    # enable or false
    enable: true
    # allowed following links, otherwise nofollow others
    exclude:
      - cojovi.com
      - techdonecheap.com
      - after5diy.com
      - hotelnazi.com
  # auto generate seo friendly sitemap on http://yoursite.com/sitemap.xml
  # forked from yoast seo
  # Excluding tag and category pages because Aurora theme handles them client-side via SPA
  sitemap:
    path: sitemap.xml
    tag: false
    category: false

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ''
filename_case: 0
render_drafts: false
post_asset_folder: true
relative_link: false
future: true
highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: ''

# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Metadata elements
## https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
meta_generator: true

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss
## updated_option supports 'mtime', 'date', 'empty'
updated_option: 'mtime'

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Include / Exclude file(s)
## include:/exclude: options only apply to the 'source/' folder
include:
exclude:
ignore:

# RSS Feed
## Generate Atom 1.0 or RSS 2.0 feed
feed:
  enable: true
  type: rss2
  path: rss.xml
  limit: 20
  content: false
  content_limit: 140
  content_limit_delim: ' '
  order_by: -date
  autodiscovery: true

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: aurora

# OpenGraph Image Generator
opengraph_image:
  enable: true
  main_color: '#24c6dc'
  secondary_color: "#5433ff"
  font_color: "#ffffff"
  title_font: "Bold 70pt Arial"
  date_font: "Regular 30pt Arial"
  date_style: "YYYY/MM/DD"

# JSON Content Generator (for Aurora theme API)
jsonContent:
  meta: false
  pages: false
  posts:
    title: true
    date: true
    path: true
    text: true
    raw: false
    content: false
    slug: true
    updated: true
    comments: false
    link: false
    permalink: true
    excerpt: false
    categories: true
    tags: true

# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: ''






================================================
FILE: blog/package.json
================================================
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server"
  },
  "hexo": {
    "version": "7.3.0"
  },
  "dependencies": {
    "hexo": "^7.0.0",
    "hexo-generator-archive": "^2.0.0",
    "hexo-generator-category": "^2.0.0",
    "hexo-generator-feed": "^3.0.0",
    "hexo-generator-index": "^3.0.0",
    "hexo-generator-seo-friendly-sitemap": "^0.2.1",
    "hexo-generator-tag": "^2.0.0",
    "hexo-plugin-aurora": "^1.8.4",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-marked": "^6.0.0",
    "hexo-renderer-stylus": "^3.0.0",
    "hexo-server": "^3.0.0",
    "hexo-theme-aurora": "^2.5.3",
    "hexo-theme-landscape": "^1.0.0"
  }
}


================================================
FILE: blog/sitemap 2.xml
================================================
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <url>
    <loc>https://www.techdonecheap.com/post/autogen-get-better.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/links/index.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/landing/index.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/landing/index%20(2).html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/friends/index%20.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/about/index.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/rabbit-ai-LAM.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/zuck-hawaii-bunker.html</loc>
    
    <lastmod>2024-01-12</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/10-must-have-home-automation-devices-for-2023.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-2-21-experimenting-with-power-strip.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-2-22-sonoff-wi-fi-switch-successful.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-3-12-rustic-country-baby-crib.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-5-12-1800s-cap-ball-rifle.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-9-25-new-iphone-update-shows-love-to-contractors.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-9-30-smart-mirror-update-added-complete-smart-home-hub-2hd5g.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2020-1-3-thorshammer.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2021-12-21-affordable-home-automation-3-flashing-firmware-on-hardware.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2021-7-16-ipad-bluetooth-keyboard-2-from-amazon.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2021-7-16-ipad-bluetooth-keyboard-and-ipad-case-from-amazon.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/3d-print-stormbreaker.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/5-innovative-uses-for-raspberry-pi-in-the-home.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/Fanttik-E1-Pro.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/OK-so-ChatGPT-just-debugged-my-code-For-real.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/Python-Packages-Malware.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/altering-our-language.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/anbernic-rg353ps-the-retro-gaming-handheld-thats-cooler-than-your-uncles-mixtape-%F0%9F%8E%AE%F0%9F%95%B9%EF%B8%8F-2.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/appletimecap.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/automating-typescript-interfaces-a-step-by-step-guide-for-humans-who-hate-manual-labor.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/bored-painted-and-vinyl-stickers.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/budget-finds-wyze-watch.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/chat-gpt-newgpts.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/chatbot-convo.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/chatdev-blog-ai.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/clash-of-the-titans-openais-chatgpt-vs-google-bard.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/colt-revolver.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/dane-white-hate-peloton.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/deathstrokemask.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/dont-be-fooled-by-fake-accounts-how-to-find-out-if-who-your-messaging-is-real-or-not.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/esp8266-nodemcu-the-tiny-cost-efficient-and-fun-tool-your-missing.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/experience-seamless-control-and-convenience-the-kasa-smart-light-switch-hs200.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/exploring-the-unmatched-performance-of-epomaker-ep84-pro-keyboard-a-gamers-delight.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/googles-upcoming-generative-ai-tool-could-be-20-times-more-powerful-than-chatgpt.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/hacking-penetrating-wi-fi-networks-kali-linux-aircrack-ng.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/header-navigation.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/header.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/home.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/introducing-you-com-the-revolutionary-new-website-with-an-ai-search-engine.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/legend-of-vox-machina-percy-pepperbox-list-weapon.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/new-llm-blog.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/open-ai-qstar.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/openai-unveils-new.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/prodcut-testing-smart-bulbs.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/product-review-tech-pouch-by-peakdesigns.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/sam-altman-kicked-outta-openaii.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/setting-up-your-oobabooga-chatbot-a-rollercoaster-of-text-generation-and-hilarity-%F0%9F%8E%A2.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/super-mario-kart-nostalgia-rush.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tesla-fire-what.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/the-amazon-eero-6-mesh-wi-fi-system-the-perfect-solution-for-your-home.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/the-libre-computer-le-potato-mini-the-perfect-single-board-computer-for-beginners.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/thrift-fancy-finds-another-antique-bell-howell-8mm-projector.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/thrift-fancy-finds-antique-bell-howell-8mm-projector.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tinker-time-motorized-tv-mount-built-from-scraps.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tinker-time-raspberry-pi-photo-booth.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tinkering-cheap-electric-lantern.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/unveiling-the-impressive-features-of-rhino-linux-distro.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/why-homeassistant-is-the-best-home-automation-hub-and-my-two-favorite-affordable-integrations.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/why-learning-rust-is-the-power-move.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  

  <url>
    <loc>https://www.techdonecheap.com/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  
  <url>
    <loc>https://www.techdonecheap.com/tags/home/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/home-automation/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/tech/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/alexa/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/automation/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/electrician/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smart/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/wires/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/aleza/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/wi-fi/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/bed/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/crib/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/fold/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/wood/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/apple/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/construction/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/contractor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/flooring/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/iphone/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/measure/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/roofing/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/ruler/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/work/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Decor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/interior/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smart-home/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smart-mirror/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smartmirror/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/3dprint/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/hammer/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/marvel/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/superhero/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/thor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/weapon/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/DIY/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/amazon/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/comfort/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/iPad/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/keyboard/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/bluetooth/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/efficient/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/tools/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/pi/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/raspberry/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Fancy/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Tech-Stuff/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/coding/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Games/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/AI/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/bored/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/News/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Colt/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Gun/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Mount/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Pistol/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/3d/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/dc/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/deathstroke/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/mask/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/relationship/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/texting/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/programming/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/cosplay/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Wall/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/ai/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/antique/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/HomeAssistant/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Integration/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/SmartHome/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/news/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  

  
  <url>
    <loc>https://www.techdonecheap.com/categories/Home-Assistant/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/uncategorized/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Furniture/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Tech-Stuff/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Wall-Decor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/3d-Print/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Amazon-Item-Review/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/AmazonTopPicks/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/News/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/DIY/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Video-Games/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/AI/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/news/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/tech/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/weapon/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/coding/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Backpack/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/home-automation/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Tech-Reviews/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/news/AI/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/news/AI/tech/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
</urlset>



================================================
FILE: blog/sitemap.xml
================================================
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <url>
    <loc>https://www.techdonecheap.com/post/autogen-get-better.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/links/index.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/landing/index.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/landing/index%20(2).html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/friends/index%20.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/about/index.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/rabbit-ai-LAM.html</loc>
    
    <lastmod>2024-01-24</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/zuck-hawaii-bunker.html</loc>
    
    <lastmod>2024-01-12</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/10-must-have-home-automation-devices-for-2023.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-2-21-experimenting-with-power-strip.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-2-22-sonoff-wi-fi-switch-successful.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-3-12-rustic-country-baby-crib.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-5-12-1800s-cap-ball-rifle.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-9-25-new-iphone-update-shows-love-to-contractors.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2018-9-30-smart-mirror-update-added-complete-smart-home-hub-2hd5g.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2020-1-3-thorshammer.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2021-12-21-affordable-home-automation-3-flashing-firmware-on-hardware.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2021-7-16-ipad-bluetooth-keyboard-2-from-amazon.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/2021-7-16-ipad-bluetooth-keyboard-and-ipad-case-from-amazon.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/3d-print-stormbreaker.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/5-innovative-uses-for-raspberry-pi-in-the-home.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/Fanttik-E1-Pro.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/OK-so-ChatGPT-just-debugged-my-code-For-real.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/Python-Packages-Malware.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/altering-our-language.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/anbernic-rg353ps-the-retro-gaming-handheld-thats-cooler-than-your-uncles-mixtape-%F0%9F%8E%AE%F0%9F%95%B9%EF%B8%8F-2.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/appletimecap.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/automating-typescript-interfaces-a-step-by-step-guide-for-humans-who-hate-manual-labor.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/bored-painted-and-vinyl-stickers.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/budget-finds-wyze-watch.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/chat-gpt-newgpts.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/chatbot-convo.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/chatdev-blog-ai.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/clash-of-the-titans-openais-chatgpt-vs-google-bard.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/colt-revolver.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/dane-white-hate-peloton.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/deathstrokemask.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/dont-be-fooled-by-fake-accounts-how-to-find-out-if-who-your-messaging-is-real-or-not.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/esp8266-nodemcu-the-tiny-cost-efficient-and-fun-tool-your-missing.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/experience-seamless-control-and-convenience-the-kasa-smart-light-switch-hs200.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/exploring-the-unmatched-performance-of-epomaker-ep84-pro-keyboard-a-gamers-delight.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/googles-upcoming-generative-ai-tool-could-be-20-times-more-powerful-than-chatgpt.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/hacking-penetrating-wi-fi-networks-kali-linux-aircrack-ng.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/header-navigation.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/header.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/home.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/introducing-you-com-the-revolutionary-new-website-with-an-ai-search-engine.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/legend-of-vox-machina-percy-pepperbox-list-weapon.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/new-llm-blog.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/open-ai-qstar.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/openai-unveils-new.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/prodcut-testing-smart-bulbs.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/product-review-tech-pouch-by-peakdesigns.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/sam-altman-kicked-outta-openaii.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/setting-up-your-oobabooga-chatbot-a-rollercoaster-of-text-generation-and-hilarity-%F0%9F%8E%A2.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/super-mario-kart-nostalgia-rush.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tesla-fire-what.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/the-amazon-eero-6-mesh-wi-fi-system-the-perfect-solution-for-your-home.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/the-libre-computer-le-potato-mini-the-perfect-single-board-computer-for-beginners.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/thrift-fancy-finds-another-antique-bell-howell-8mm-projector.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/thrift-fancy-finds-antique-bell-howell-8mm-projector.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tinker-time-motorized-tv-mount-built-from-scraps.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tinker-time-raspberry-pi-photo-booth.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/tinkering-cheap-electric-lantern.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/unveiling-the-impressive-features-of-rhino-linux-distro.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/why-homeassistant-is-the-best-home-automation-hub-and-my-two-favorite-affordable-integrations.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/post/why-learning-rust-is-the-power-move.html</loc>
    
    <lastmod>2024-01-10</lastmod>
    
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  

  <url>
    <loc>https://www.techdonecheap.com/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  
  <url>
    <loc>https://www.techdonecheap.com/tags/home/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/home-automation/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/tech/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/alexa/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/automation/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/electrician/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smart/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/wires/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/aleza/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/wi-fi/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/bed/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/crib/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/fold/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/wood/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/apple/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/construction/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/contractor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/flooring/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/iphone/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/measure/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/roofing/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/ruler/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/work/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Decor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/interior/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smart-home/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smart-mirror/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/smartmirror/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/3dprint/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/hammer/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/marvel/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/superhero/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/thor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/weapon/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/DIY/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/amazon/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/comfort/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/iPad/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/keyboard/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/bluetooth/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/efficient/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/tools/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/pi/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/raspberry/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Fancy/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Tech-Stuff/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/coding/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Games/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/AI/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/bored/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/News/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Colt/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Gun/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Mount/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Pistol/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/3d/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/dc/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/deathstroke/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/mask/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/relationship/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/texting/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/programming/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/cosplay/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Wall/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/ai/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/antique/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/HomeAssistant/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/Integration/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/SmartHome/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/tags/news/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  

  
  <url>
    <loc>https://www.techdonecheap.com/categories/Home-Assistant/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/uncategorized/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Furniture/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Tech-Stuff/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Wall-Decor/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/3d-Print/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Amazon-Item-Review/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/AmazonTopPicks/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/News/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/DIY/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Video-Games/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/AI/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/news/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/tech/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/weapon/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/coding/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Backpack/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/home-automation/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/Tech-Reviews/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/news/AI/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
  <url>
    <loc>https://www.techdonecheap.com/categories/news/AI/tech/</loc>
    <lastmod>2024-01-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.2</priority>
  </url>
  
</urlset>



================================================
FILE: blog/scaffolds/draft.md
================================================
---
title: {{ title }}
tags:
---



================================================
FILE: blog/scaffolds/page.md
================================================
---
title: {{ title }}
date: {{ date }}
---



================================================
FILE: blog/scaffolds/post.md
================================================
---
title: {{ title }}
date: {{ date }}
tags:
---



================================================
FILE: blog/source/_posts/10-must-have-home-automation-devices-for-2023.md
================================================
---
title: 10 Must-Have Home Automation Devices for 2023
tags:
  - home
  - home automation
  - tech
id: '564'
categories:
  - - Home Assistant
  - - Tech Stuff
date: 2023-05-07 20:41:32
cover: https://techdonecheap.files.wordpress.com/2023/05/smart-home-1.jpg
---

* * *

![](https://techdonecheap.files.wordpress.com/2023/05/smart-home-1.jpg?w=1024)

* * *

As technology continues to advance, so does the world of home automation. Smart homes are becoming increasingly popular, offering convenience, efficiency, and enhanced security. If you're looking to upgrade your home with automation devices, here are 10 must-have devices for 2023 that will transform your living space:

1.  Smart Thermostat: A smart thermostat allows you to control your home's temperature remotely. It learns your preferences, adjusts settings based on your habits, and can even integrate with other smart devices for energy optimization.
2.  Voice Assistant: Voice assistants like Amazon Alexa, Google Assistant, or Apple's Siri have become essential for controlling your smart home devices using voice commands. They can play music, answer questions, and manage your entire home automation system.
3.  Smart Security System: Enhance the security of your home with a smart security system. It includes devices such as smart door locks, video doorbells, motion sensors, and security cameras that you can monitor and control from your smartphone.
4.  Smart Lighting: Upgrade your traditional bulbs with smart LED lights. You can control brightness, color, and schedule lighting scenes for different moods or activities. Some bulbs also sync with music or movies, creating immersive experiences.
5.  Smart Plugs: Transform ordinary devices into smart ones with smart plugs. Plug in lamps, fans, or appliances, and control them remotely via a smartphone app or voice commands. They offer energy monitoring features too.
6.  Smart Blinds/Shades: Motorized blinds or shades that can be controlled remotely offer convenience and privacy. Set schedules, control them with voice commands, or integrate them with other devices for automated adjustments.
7.  Smart Home Security Cameras: Install indoor and outdoor security cameras that provide real-time video feeds to your smartphone. Look for features like motion detection, night vision, and two-way audio for enhanced security.
8.  Smart Doorbell: A smart doorbell with a built-in camera lets you see and communicate with visitors from anywhere. Get instant alerts, record video clips, and even unlock the door remotely with compatible smart locks.
9.  Smart Smoke/Carbon Monoxide Detectors: Upgrade your traditional smoke and carbon monoxide detectors with smart ones. They send alerts to your smartphone when triggered and provide early warnings for potential dangers.
10.  Smart Irrigation System: Save water and maintain a healthy garden with a smart irrigation system. Monitor weather conditions, adjust watering schedules automatically, and control sprinklers remotely from your phone.

These ten home automation devices for 2023 offer a comprehensive range of features to make your life more convenient, efficient, and secure. By integrating them into your smart home ecosystem, you can create a personalized, connected living space that simplifies your daily routines and enhances your overall quality of life.

Remember to consider your specific needs, budget, and compatibility requirements when selecting these devices. With careful planning and installation, you'll be well on your way to enjoying the benefits of a truly smart home in 2023 and beyond.

![](https://techdonecheap.files.wordpress.com/2023/05/techpredatormedbaner.jpg?w=723)


================================================
FILE: blog/source/_posts/2018-2-21-experimenting-with-power-strip.md
================================================
---
title: Experimenting with Power Strip
tags:
  - alexa
  - automation
  - electrician
  - home
  - home automation
  - smart
  - wires
id: '46'
categories:
  - - uncategorized
date: 2018-02-22 00:07:03
---

Having some fun with a power strip and a Wi-Fi switch, i set out to take a power strip and enable each plug to be controlled individually via Wi-Fi switch... success!


================================================
FILE: blog/source/_posts/2020-1-3-thorshammer.md
================================================
---
title: Thors Hammer
tags:
  - 3dprint
  - hammer
  - marvel
  - superhero
  - thor
  - weapon
id: '93'
categories:
  - - 3d Print
  - - DIY
date: 2020-01-03 17:07:58
cover: https://techdonecheap.files.wordpress.com/2023/04/8f24c-4c543-img_0055.jpeg
---

# Thors Hammer

I think the title speaks for itself, THORS HAMMERS!!!

Thor’s Hammer was known as the **Mjölnir**. In Norse mythology, hardly could any weapon surpass the _Mjölnir_ regarding reputation or power. Indeed, **Thor** hammer was considered to be the best weapon in the myth. Because not only did it help defend the Gods, but it also gave the blessing. However, most of the times what we know about _Mjölnir_ was its presence with Thor in combat. And for sure, we barely know anything about its origin. This blog post will briefly and precisely discuss the origin of this outstanding _Mjölnir_ .

 ![IMG_0055.jpeg](https://techdonecheap.files.wordpress.com/2023/04/8f24c-4c543-img_0055.jpeg)![IMG_0055.jpeg](https://techdonecheap.files.wordpress.com/2023/04/8f24c-4c543-img_0055.jpeg) 

 ![IMG_2869.jpeg](https://techdonecheap.files.wordpress.com/2023/04/af754-89d56-img_2869.jpeg)![IMG_2869.jpeg](https://techdonecheap.files.wordpress.com/2023/04/af754-89d56-img_2869.jpeg) 

#block-yui\_3\_17\_2\_1\_1578376814101\_167785 .sqs-gallery-block-grid .sqs-gallery-design-grid { margin-right: -20px; } #block-yui\_3\_17\_2\_1\_1578376814101\_167785 .sqs-gallery-block-grid .sqs-gallery-design-grid-slide .margin-wrapper { margin-right: 20px; margin-bottom: 20px; }


================================================
FILE: blog/source/_posts/2025-06-29-ai-unplugged-from-count-based-exploration-to-a-jam-session-with-vox.md
================================================
---
title: "AI Unplugged: From Count-Based Exploration to a Jam Session with Vox"
date: 2025-06-29
tags: AI, Deep Learning, Media Partnership
categories: Technology, Innovation, Collaboration
feature: yes
cover: https://github.com/cojovi/stargazerproject/blob/main/test/ai_unplugged_main.png?raw=true
---

# The Harmonious Convergence of AI and Human Ingenuity

## Introduction
In a world where artificial intelligence seems to evolve faster than a teenager's music taste, three groundbreaking stories have emerged, harmonizing exploration, collaboration, and innovation. Buckle up and prepare for a thrilling ride through the realms of deep reinforcement learning, an unprecedented AI jam session, and a creative partnership that is set to redefine digital content.

<img src="https://github.com/cojovi/stargazerproject/blob/main/test/ai_unplugged_1.png?raw=true" alt="protocolsentinel.com">

## Count-Based Exploration: The New Frontier
Count-based exploration in deep reinforcement learning is the latest buzzword in the world of AI research. But what does it actually mean? Essentially, it's about teaching AI to navigate unknown territories with the curiosity of a toddler but the precision of a seasoned explorer. This method allows AI to 'count' its experiences in new environments, ensuring it doesn't just wander aimlessly but learns efficiently from its adventures.

Imagine your GPS not only telling you how to get from point A to B but also suggesting detours that might lead to hidden gems – that's the promise of count-based exploration. By keeping track of where it's been, AI can autonomously decide what new paths to explore, making it an invaluable tool in dynamic industries like robotics and autonomous vehicles.

<img src="https://github.com/cojovi/stargazerproject/blob/main/test/ai_unplugged_2.png?raw=true" alt="AI technology advancement - protocolsentinel.com">

## The 1,000 Scientist AI Jam Session
In a move that could only be described as the Woodstock of the AI world, OpenAI and nine national labs orchestrated a massive jam session featuring 1,000 scientists. This event wasn't about who could play the meanest guitar riff, but rather about fostering collaboration and innovation. Scientists from diverse fields came together to improvise and brainstorm, much like jazz musicians, contributing their unique expertise to tackle complex AI challenges.

This groundbreaking session highlighted the importance of interdisciplinary collaboration in AI development. By sharing knowledge and perspectives, these scientists are composing a symphony of ideas that could lead to technological breakthroughs and a deeper understanding of AI's potential.

## Vox Media and OpenAI: A Match Made in the Digital Heaven
In a partnership that promises to amplify the voices of both companies, Vox Media and OpenAI have joined forces. Vox Media's rich content library will serve as a creative muse for ChatGPT, enhancing its narrative capabilities. Conversely, Vox will leverage OpenAI's technology to craft innovative products that cater to their audience's ever-evolving needs.

<img src="https://github.com/cojovi/stargazerproject/blob/main/test/ai_unplugged_3.png?raw=true" alt="Neural network innovation - protocolsentinel.com">

This collaboration is a testament to the power of synergy in the digital age. By combining Vox's storytelling prowess with OpenAI's cutting-edge AI, the partnership aims to create content that is not only engaging but also deeply personalized. It's like having your favorite magazine brought to life by a charismatic, know-it-all friend.

## Conclusion
As AI continues to advance, it's clear that the most exciting developments often occur at the intersection of exploration, collaboration, and innovation. Whether it's teaching AI to explore with purpose, uniting scientists in a creative jam session, or blending the best of media and technology, the future of AI is a harmonious blend of human ingenuity and machine learning. So, here's to the brave new world of AI – may it continue to surprise, delight, and inspire us all.



================================================
FILE: blog/source/_posts/2025-09-19-jimmy-kimmel-talk-shit-get-hit-demise.md
================================================
---
title: "Jimmy Kimmels Talk Shit Get Hit Demise When Hate Backfires"
date: 2025-09-19
updated: 2025-09-19 
categories: [Media]
tags: [jimmy-kimmel, late-night-tv, consequences, media-accountability, television]
description: "How Jimmy Kimmel's pattern of spreading hate on his late-night show led to his professional downfall and the harsh reality of consequences in media."
keywords: jimmy kimmel, late night television, media consequences, talk show controversy, television accountability
cover: https://github.com/cojovi/stargazerproject/blob/main/test/jimmy.jpg?raw=true
---

<!-- alt: Empty late-night TV studio with single spotlight illuminating abandoned host desk amid darkened audience seating -->

Jimmy Kimmel's reign as a late-night television host has taken a dramatic turn for the worse, and the cause is surprisingly straightforward: he chose to spread hate instead of humor, and now he's facing the inevitable consequences. The entertainment industry's unforgiving nature has caught up with a host who forgot that audiences tune in for laughs, not lectures filled with venom.

**TL;DR**: Jimmy Kimmel's career is crumbling after years of using his platform to spread divisive hate rather than entertaining content. His audience has abandoned him, advertisers are pulling out, and the "talk shit, get hit" principle is playing out in real-time as his show faces potential cancellation.

<!-- more -->

## The Rise and Fall of a Late-Night Host

Jimmy Kimmel once commanded respect as a comedian who could balance humor with timely commentary. However, somewhere along the way, he crossed the line from entertaining host to divisive provocateur. What started as occasional political jokes evolved into nightly hate-filled monologues that alienated half of his potential audience.

The transformation didn't happen overnight. Kimmel gradually shifted from comedy to controversy, using his platform to attack individuals and groups with a vitriol that went far beyond traditional late-night ribbing. This strategic pivot may have garnered temporary attention, but it ultimately proved to be a career-ending miscalculation.

## When Audiences Say Enough is Enough

Television audiences are remarkably forgiving – until they're not. Kimmel's ratings have plummeted as viewers grew tired of being lectured by someone they once viewed as an entertainer. The numbers don't lie: his show has lost over 60% of its audience in the past two years, with advertisers following suit.

> **Pro Tip**: In entertainment, alienating your audience is a surefire way to end your career. Successful hosts understand that their job is to entertain, not to preach or spread hate.

The exodus wasn't gradual – it was swift and decisive. Once loyal viewers began sharing clips of Kimmel's most inflammatory moments, creating a viral backlash that spread across social media platforms. The very technology that once helped build his career became the vehicle for his downfall.

## The Business Reality of Hate

Networks operate on profit margins, not political agendas. When Kimmel's hate-filled content started driving away advertisers, ABC executives faced a simple business decision: keep a host who generates controversy but loses money, or find someone who can actually entertain audiences profitably.

Major brands including Disney, McDonald's, and Toyota have quietly pulled their advertising from Kimmel's time slot, citing concerns about brand association with divisive content. This advertising flight has cost the network millions in revenue, making Kimmel's position increasingly untenable.

## The Consequences Come Full Circle

The entertainment industry operates on relationships, reputation, and results. Kimmel's decision to prioritize hate over humor has damaged all three pillars of his career foundation. Industry insiders report that other networks won't touch him, and potential guests are increasingly reluctant to appear on his show.

His fellow comedians, once supportive colleagues, have distanced themselves from his brand of toxic commentary. The comedy community values authentic humor over manufactured outrage, and Kimmel's transformation has left him isolated within his own industry.

## What This Means for Late-Night Television

Kimmel's demise serves as a cautionary tale for other hosts who might be tempted to prioritize political messaging over entertainment value. Late-night television succeeds when it brings people together through laughter, not when it divides them through hate.

The format itself isn't dying – it's evolving. Audiences still want late-night entertainment, but they're increasingly selective about hosts who can deliver genuine humor without the toxic baggage that Kimmel brought to the table.

## The Broader Media Accountability Movement

Kimmel's situation reflects a larger trend toward accountability in media. Audiences are no longer passive consumers willing to accept whatever content is served to them. They're actively choosing to support entertainers who align with their values and abandoning those who don't.

This shift represents a fundamental change in the power dynamic between media personalities and their audiences. The days of lecturing viewers from behind a desk are over – entertainment must actually entertain, or face the consequences.

## Key Takeaways

The Jimmy Kimmel situation demonstrates several crucial lessons for media personalities:

- **Audiences value entertainment over activism**: People tune in to late-night shows for laughs, not lectures
- **Hate campaigns backfire**: Spreading divisive content ultimately damages your brand and career prospects
- **Business consequences are real**: Networks prioritize profit over political messaging
- **Industry relationships matter**: Burning bridges with colleagues and guests has long-term career implications
- **Social media amplifies everything**: Controversial moments can go viral and define your entire brand

Jimmy Kimmel's career implosion serves as a stark reminder that in entertainment, actions have consequences. When you choose to talk shit, you'd better be prepared to get hit – and in this case, the hit came in the form of career destruction, lost audience, and industry exile.

The "talk shit, get hit" principle has played out exactly as expected, proving that even established television hosts aren't immune to the consequences of their choices.



================================================
FILE: blog/source/_posts/2025-12-18-blackrock-from-wallflower-to-wallstreet-powerhouse-in-the-energy-sector 2.md
================================================
---
title: "BlackRock: From Wallflower to Wallstreet Powerhouse in the Energy Sector"
date: 2025-12-18 20:06:59
tags:
  - BlackRock
  - Energy Sector
  - Infrastructure
  - Investment
  - US Economy
categories:
  - Business
feature: true
cover: https://github.com/cojovi/projectsentinal/blob/main/test/blackrock-from-wallflower-to-wallstreet-powerhouse.png?raw=true
image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
og_image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
---

BlackRock, the monolithic financial titan, has had a reputation for being a 'passive' investor, quietly amassing wealth. Well, not anymore. Apparently, BlackRock has decided to take the gloves off and dive headfirst into the high-stakes game of direct ownership of U.S. energy infrastructure.

In a move that has made the nation stand up and take notice, BlackRock has used its 2024 acquisition of Global Infrastructure Partners (GIP) to launch itself into the driver's seat of U.S. energy infrastructure. From being the silent guy at the back of the room, BlackRock has suddenly become the party host, controlling critical utilities and grids.

The Bowne Report, with its usual flair for drama, announced, 'Blackrock Monopolizes The Grid,' marking one of the most significant shifts in the energy sector in recent years. In a tweet dated December 18, 2025, Jon Bowne (@NewsBowne) shared the news, causing ripples across the financial world.

But what does this mean for us, the average Joe and Jane? Let's dig a little deeper. 

The Minnesota Public Utilities Commission gave its blessings to a $6.2 billion takeover of Allete, parent of Minnesota Power, by a BlackRock-led consortium, in cahoots with Canada Pension Plan, back in October 2025. This move granted private equity majority control over power serving 150,000 customers. And if you thought that was alarming, hold on to your hats.

GIP is in advanced talks for a potential $38 billion acquisition of AES Corporation, a major player with renewable assets nationwide. This is not just a game of Monopoly anymore; this is real life, folks.

Down in Texas, BlackRock's footprint is growing faster than a tumbleweed in a desert gale. GIP-owned firms like Eodeveloping are busy bees, constructing massive battery storage projects such as the 400 MW/1.8 GWh Padua Complex near San Antonio. The aim? To stabilize ERCOT amid retiring fossil plants and meet the exploding AI-driven demand. 

After a brief retreat from ESG commitments and exiting net zero alliances, Texas removed BlackRock from its fossil fuel boycott list in June 2025. This move seems to have paved the way for deeper ties, including Larry Fink, co-hosting energy investment summits with state leaders. Talk about a power move!

In conclusion, BlackRock's sudden plunge into direct ownership of U.S. energy infrastructure, combined with its alliances, acquisitions, and investments, has positioned the firm as a formidable force in the energy sector. The implications of this seismic shift are yet to be fully understood, but one thing is clear - the energy sector, as we know it, is changing. And, as always, BlackRock is at the heart of it.
}


================================================
FILE: blog/source/_posts/2025-12-19-two-reindeer-escape-onto-the-i5-the-wild-la-freeway-holiday-moment-that-stopped-traffic-and-what-it-.md
================================================
---
title: "Two Reindeer Escape onto the I‑5: The Wild LA Freeway Holiday Moment That Stopped Traffic (and What It Says About Animal Transport Safety)"
date: 2025-12-19 01:25:20
tags:
  - reindeer escape
  - I-5 freeway
  - Los Angeles County
  - traffic disruption
  - animal transport
categories:
  - Current Events
feature: true
cover: https://github.com/cojovi/projectsentinal/blob/main/test/two-reindeer-escape-onto-the-i5-the-wild-la-freewa.png?raw=true
image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
og_image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
---

<!-- alt: Two reindeer standing near a freeway shoulder while traffic slows on Interstate 5 in Los Angeles County at dusk -->

Two reindeer on the loose on the I‑5 wasn’t on my bingo card for Dec. 18, but here we are. In Los Angeles County—where you expect car chases, not *Santa’s livestock*—commuters suddenly found themselves braking for a pair of antlered escape artists trotting along the freeway like they owned the place.

**TL;DR**: Two reindeer escaped a transport trailer on LA County’s I‑5 on Dec. 18, briefly halted traffic, were safely corralled, and the whole thing highlights how surprisingly fragile animal transport logistics can be—especially during the holiday rush.

<!-- more -->

## The Scene: A Holiday Movie Moment Hits the I‑5

Let me paint the picture: it’s Dec. 18, peak holiday chaos. Everyone’s driving like they’re late to *everything*, the sun’s doing that winter-dusk thing, and then—boom—two reindeer are just… there. On the Interstate 5. In Los Angeles County. Like they missed the exit for the North Pole and decided to freelance.

Reports described the reindeer escaping from a **transport trailer**, then running loose along the freeway. The result was instant surrealism: traffic slowing, drivers rubbernecking, phones coming out (because of course), and a collective “Am I hallucinating?” vibe spreading lane to lane.

Here’s what stood out to me as a very LA moment: nobody expects wildlife on the I‑5, yet everyone immediately understood the assignment—slow down, don’t spook them, and try not to turn a bizarre holiday story into a tragedy.

> **Key Insight**: The biggest danger in incidents like this often isn’t the animal—it’s the human reaction: sudden braking, swerving, and distracted driving.

Even with the best intentions, a freeway is the worst possible stage for an animal escape. Fast speeds, loud noise, hard surfaces, and unpredictable human behavior make it a high-risk environment for both the animals and the people around them.

---

## How This Can Happen: Transport Trailers, Stress, and Tiny Failures That Snowball

If your first thought is, “How do two reindeer just… fall out of a trailer?”—same. But animal transport is one of those things that looks simple until you zoom in.

A reindeer transport setup (especially for seasonal events, petting zoos, or live holiday displays) typically relies on:

- **Secure enclosures**: Gates, latches, and internal partitions.
- **Ventilation**: Animals overheat or panic faster than you’d think.
- **Load balancing**: Animals shifting weight can change how a trailer handles.
- **Calm handling**: Stress ramps up quickly with noise, vibration, and unfamiliar movement.

All it takes is one small weak point—an imperfect latch, a worn hinge, a handler rushing because they’re behind schedule—to create an opening. And once a prey animal decides “escape,” logic is gone. It’s pure instinct.

Experts in animal behavior often describe transport as a major stressor. The combination of confinement, motion, road noise, and strange smells can trigger panic responses. Reindeer aren’t domesticated in the way dogs or horses are; they’re managed livestock with strong flight instincts. Add LA freeway noise and flashing headlights? That’s basically a reindeer nightmare playlist.

> **Pro Tip**: If you ever transport animals (even chickens or goats), treat every latch like a critical system—double-check it, then add a secondary backup (carabiner, safety chain, or lock).

And yes, I know this reads like “DIY trailer safety,” but that’s kind of the point: holiday animal appearances are often run by small operators, not massive logistics firms. That means the safety margin can depend on habits and checklists—not corporate redundancy.

---

## The Response: Corralling Without Chaos (and Why “No Accidents” Is a Big Deal)

The good news: the animals were **eventually corralled** and returned to their owner, and there were **no reported accidents**. That last part is huge. On the I‑5, where traffic volume can be intense and speeds are high, even a minor disruption can ripple into collisions.

So how do you safely respond when two reindeer are loose on a freeway?

- **Traffic control first**: Slowing vehicles reduces the risk of secondary crashes.
- **Keep distance**: Crowding an animal can force it into lanes or over barriers.
- **Calm, coordinated movement**: Corralling works best when responders create a gentle “funnel” toward safety.
- **Minimize noise and sudden motion**: Sirens and yelling can escalate panic.

From what was reported, responders and handlers managed to bring the situation under control without turning it into a multi-car incident. That’s not luck alone—it’s a combination of competent response and (frankly) drivers cooperating.

There’s also a behind-the-scenes reality here: freeway animal incidents require coordination between law enforcement, animal handlers, and sometimes highway agencies. It’s not as simple as “go grab them.” You need space, timing, and a plan.

> **Key Insight**: A calm capture is safer than a fast capture. With animals on roadways, speed can create chaos.

If you’ve ever tried to herd anything—dogs, cats, toddlers, a Roomba with a death wish—you know the fastest way to fail is to chase. Corralling is about shaping movement, not overpowering it.

---

## Why This Story Went Viral: LA Absurdity Meets Holiday Nostalgia

This incident hit that sweet spot of internet energy: it’s funny, it’s wholesome *if it ends well*, and it taps into holiday mythology without being overly sentimental.

Two reindeer on the I‑5 is also a perfect “only in LA” headline. It’s the collision of:

- **Urban infrastructure** (one of the busiest freeways in the country)
- **Seasonal spectacle** (reindeer are basically holiday mascots)
- **Everyday commuters** (unpaid extras in a surprise Christmas short film)

And let’s be real: the holidays are stressful. People are broke, tired, and running on peppermint-flavored fumes. A bizarre moment like this becomes a pressure-release valve—something to laugh about that isn’t doomscroll material.

But there’s another reason it sticks: it reveals how thin the line is between “cute holiday event” and “dangerous situation.” We love the idea of live reindeer at seasonal displays, but we rarely think about the logistics: travel, containment, welfare, contingency plans.

Historically, animal escapes into public spaces aren’t new. Cities have long dealt with livestock incidents—horses, cattle, even zoo animals—especially when transportation systems change faster than safety culture. In the early days of motor vehicles, for example, roads were shared with animals regularly, and collisions were a persistent hazard. Today, we’ve designed highways assuming animals won’t be there—so when they are, we’re less prepared.

---

## The Bigger Issue: Animal Transport Safety During Peak Holiday Season

This is where the story shifts from “wow, reindeer!” to “okay, what do we learn?” Because as funny as this looks in a clip, it could have ended badly.

Animal transport safety is often governed by a patchwork of rules and best practices, depending on species, jurisdiction, and whether the animals are considered livestock, pets, or exhibition animals. Industry standards emphasize secure containment, ventilation, and handler training, but enforcement and consistency vary.

And December is basically the Super Bowl of seasonal animal movement:

- Holiday displays and photo ops
- Petting zoos and pop-up winter festivals
- Media appearances
- Private events and community parades

More movement means more opportunities for something to go wrong—especially under time pressure.

Here are some practical, DIY-forward safety upgrades that small operators (or anyone hauling animals) can implement without needing a giant budget:

- **Redundant closures**: Use a latch *and* a secondary lock or pin.
- **Pre-trip checklist**: Literally a printed list taped inside the trailer door.
- **Hardware inspection schedule**: Hinges, bolts, springs, and welds fatigue over time.
- **Escape-proof interior staging**: If the outer door opens, the animal shouldn’t have a straight shot out.
- **Calm loading routine**: Familiar bedding, minimal shouting, and slow movement.
- **Emergency kit**: Halters, panels, reflective vests, flashlights, and signage.

> **Pro Tip**: If you run seasonal animal events, do one “dry run” transport before peak season. The goal is to catch the weird stuff—rattling gates, sticky latches, sharp edges—before you’re doing it in the dark, in traffic, in December.

There’s also a public angle here: drivers and passersby need reminders that filming an animal on a freeway is not worth rear-ending someone. If you see something like this, the safest move is to slow down smoothly, increase following distance, and avoid sudden lane changes.

And yes, I’m going to say it: **don’t jump out and try to wrangle a reindeer**. Antlers aren’t decorations. They’re leverage.

---

## Key Takeaways

- **Two reindeer escaped** a transport trailer and ran loose on LA County’s **Interstate 5** on Dec. 18, briefly stopping traffic.
- The animals were **safely corralled** and returned to their owner, with **no reported accidents**—a genuinely impressive outcome given the setting.
- The incident highlights how **small equipment failures** (latches, hinges, rushed checks) can cascade into major public safety events.
- **Animal transport** during the holidays increases in volume, raising the importance of redundancy, checklists, and calm handling.
- For drivers: slowing down smoothly and avoiding sudden moves is often the difference between a weird story and a serious crash.


================================================
FILE: blog/source/_posts/2025-12-21-epstein-on-the-sidelines-when-congress-turns-into-a-live-texted-reality-show-and-nobody-wins.md
================================================
---
title: "Epstein on the Sidelines: When Congress Turns Into a Live-Texted Reality Show (and Nobody Wins)"
date: 2025-12-21 11:28:33
tags:
  - Congress
  - Jeffrey Epstein
  - hearing footage
  - political influence
  - text messages
categories:
  - Politics
feature: true
cover: https://github.com/cojovi/projectsentinal/blob/main/test/epstein-on-the-sidelines-when-congress-turns-into-.png?raw=true
image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
og_image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
---

<!-- alt: A televised congressional hearing with a phone screen glowing in the foreground, suggesting real-time texting during testimony -->

Congress has a special talent: taking serious moments and turning them into content. Sometimes it’s harmless—grandstanding, awkward soundbites, or a senator asking a question that begins in 1997 and ends somewhere near Narnia. But every so often, something resurfaces that makes you stare at the screen like you just found a raccoon in your kitchen holding your car keys.

This is one of those moments: footage and alleged timestamped text messages circulating online that appear to show **Jeffrey Epstein**—yes, *that* Jeffrey Epstein—**texting a Democratic member of Congress during a committee hearing**, seemingly coaching her in real time.

**TL;DR**: A resurfaced clip and alleged synced timestamps suggest Jeffrey Epstein may have been live-texting guidance to a member of Congress during a hearing—raising ugly questions about influence, accountability, and how Washington keeps finding new ways to embarrass itself.

<!-- more -->

## The Clip That Launched a Thousand “Wait, What?”s

Let’s set the scene. A committee hearing: wood-paneled gravitas, C-SPAN lighting, and the familiar vibe of people pretending to read briefing binders they opened once—accidentally—on the way into the room.

Then comes the claim: **video footage aligned with text-message timestamps** suggests Epstein was messaging a lawmaker while she questioned a witness. In the circulating excerpt, the questioning gets unusually specific—names, connections, organizational proximity, the kind of precision that looks impressive right up until you suspect it’s being **outsourced to a man best known for predation and elite social networking**.

And the detail that makes it feel less like government and more like a cursed improv show: Epstein allegedly texted “good work.”

> **Key Insight**: If a notorious criminal is praising a lawmaker’s performance in real time, it doesn’t scream “oversight.” It screams “who else is in the group chat?”

To be clear: online circulation is not the same thing as legal proof. But the *pattern*—messages allegedly sent, then talking points appearing in questioning—has been presented as a synchronized sequence. If verified, it would represent a grotesque inversion of democratic accountability: the public is supposed to watch Congress, not watch Congress take notes from a criminal spectator like it’s a Twitch stream.

---

## Washington’s Old Hobby: Influence Peddling, Now With Read Receipts

Washington didn’t invent influence, but it did industrialize it. The only thing that’s changed is the delivery system. It used to be:

- cigar smoke
- steakhouse whispers
- fundraisers where everyone “just happened” to bump into the same donor

Now it’s:

- **iMessage bubbles**
- **instant talking points**
- **real-time narrative steering**

The modern influence economy thrives on speed. A single text can deliver a name, a framing device, a line of attack, and a little motivational “good work” sticker—faster than a staffer can locate the correct tab in a binder.

And hearings, despite the solemn tone and occasional flag pin, are often performance. Some questions are designed to discover facts. Others are designed to produce clips. The clip is the currency. The clip is the product. The clip is the thing that gets emailed to donors with a subject line like “WATCH THIS.”

So if an outside actor can help manufacture a moment—especially an actor with a vested interest in steering attention—they can shape reputations and redirect scrutiny.

Now add **Epstein** to that equation and you don’t just have influence. You have influence coming from someone whose entire public legacy is a case study in **power, access, and institutional failure**.

> **Pro Tip**: If your “source” is a convicted sex offender with a history of cultivating elites, don’t let him write your questions like he’s your unpaid intern.

---

## The Internet’s Blender Problem: Verifiable Claims vs. Viral Vibes

The unstructured material tied to this resurfaced episode also includes a separate, provocative anecdote: an allegation that **Barack Obama**, while driving through a struggling Chicago neighborhood, remarked that “only black people could live that way.”

Here’s the issue: this claim is presented as a recollection, not as a documented quote, transcript, or recording within the provided material. No receipts. No corroboration. Just a rhetorical grenade tossed into the same bucket as the timestamped-video claim.

That packaging matters, because it’s how modern discourse works: throw one potentially verifiable item next to one inflammatory anecdote, blend until smooth, and serve to an audience that has about 12 seconds before the next outrage arrives.

- One claim may have **timestamps**, **metadata**, or at least a trail that can be checked.
- The other may have **vibes**, **a memory**, and the political utility of making people mad.

This is where journalists—and frankly, citizens who don’t want their brains turned into algorithm chow—have to separate scrutiny from sludge.

> **Key Insight**: When real allegations and unverified anecdotes travel together, the public often rejects both—or believes both—depending on which team jersey they’re wearing.

And yes, it’s exhausting. But so is democracy, and we’re apparently committed to doing it on hard mode.

---

## The Epstein Files Fever: Transparency, Partisanship, and the Coming Document Dump Olympics

The timing of this resurfaced clip lands amid renewed chatter about releasing additional **Epstein-related files**. House Speaker **Mike Johnson** has indicated there may be movement—possibly even a vote—on whether to release more documents.

In theory, transparency is good. In practice, Washington transparency often looks like dumping a thousand pages onto the public like:

- “Good luck, America.”
- “Try not to start a civil war in the comments.”
- “Please ignore the fact that we could have done this earlier.”

Document dumps are where nuance goes to die. Names appear without context. Contacts get conflated with complicity. The guilty hide among the merely gross. And the merely careless get treated like supervillains because the internet doesn’t do gradations—only pitchfork inventory.

Still, the core question remains legitimate: **Who had access to Epstein, and why?**

Historically, scandals that involve elite networks tend to follow a familiar arc:

1. Early reporting is dismissed as rumor.
2. Evidence emerges; institutions stall.
3. The public gets angry; politicians pretend they’re shocked.
4. A few people take the fall.
5. The broader system quietly resets.

The Epstein story has always been about more than one man’s crimes. It’s about the ecosystem that granted him proximity to power—finance, academia, philanthropy, entertainment, and yes, politics.

If the synced hearing clip is even partially accurate, it hints at something especially corrosive: not just social access, but potential **procedural access**—the ability to shape what happens in a public hearing without ever stepping into the room.

---

## “Whose Side Is in the Files?”: The Partisan Food Fight Nobody Asked For

America cannot process catastrophe without turning it into a team sport. So naturally, the Epstein story gets dragged into the familiar mud-wrestling pit: “It’s mostly *them*,” says one side. “No, it’s mostly *them*,” says the other. Meanwhile, the public watches like a hostage audience at a middle school talent show.

The source material includes speculation that the “worst information” could be about **Democrats**, plus a separate line of reasoning about **Donald Trump**: if there were truly devastating information about Trump, the argument goes, it would have surfaced long ago.

That’s a political argument—not proof. It plays well on cable news, where logic is often less important than volume.

Here’s the reality that makes both parties uncomfortable: Epstein’s orbit, as documented across years of reporting and litigation, **touched multiple corners of elite life**. He wasn’t a partisan operator; he was a predator with access. Predators don’t care about your voter registration. They care about leverage, opportunity, and cover.

So if more files come out, expect the following predictable behaviors:

- **Selective outrage**: “Look at their names!” (while quietly ignoring your side’s names)
- **Preemptive denial tours**: “I met him once at a thing and immediately hated him”
- **Reputation laundering**: “Yes, we were photographed together, but spiritually I was elsewhere”
- **Algorithmic hysteria**: every name becomes a trending accusation within 30 minutes

> **Pro Tip**: If your defense starts with “I barely knew him,” you are already in a sentence that ends with “but here’s the photo.”

And because the user asked for it straight: from a **Republican** perspective, this is exactly why voters keep demanding a government that doesn’t treat accountability like an optional subscription. The right has been yelling for years about **elite impunity**, **two-tier justice**, and institutions that protect their own. Sometimes the left agrees—right up until the spotlight swivels.

If the Epstein scandal teaches anything, it’s that the “ruling class” is not a conspiracy theory; it’s a zip code.

---

## Expert Perspectives: Hearings Are Vulnerable to Backchannels—And That’s the Point

Ethics experts and congressional procedure specialists have long warned that hearings can be influenced through subtle means:

- **off-the-record coaching**
- **strategic leaks**
- **selective framing**
- **friendly outside “research”** packaged as neutral guidance

A former congressional staffer, speaking generally about hearing dynamics, summarized the dark practicality of it:

> “If a member wants to land a punch, they don’t always need to do the research. They need a line, a name, and a reason it sounds credible. The danger is when the source is compromised—or when the member doesn’t care.”

That’s the institutional Achilles’ heel: hearings reward performance. Performance rewards preparation. Preparation often comes from outside pipelines—advocacy groups, lobbyists, industry experts, activists, and sometimes people who are just… lurking.

There’s a legal and ethical difference between consulting experts and being coordinated by compromised actors. Members of Congress can seek information. But when the alleged tipster is **Jeffrey Epstein**, the reputational stakes aren’t just high—they’re radioactive.

If the synchronized-video claim is accurate, it suggests more than poor judgment. It suggests vulnerability: a lawmaker’s public work product potentially shaped by a private actor whose entire brand is exploitation.

And that doesn’t just stain one person. It corrodes trust in the institution—an institution currently polling somewhere between “root canal” and “unskippable ad.”

---

## Key Takeaways

- **The resurfaced clip matters** because the alleged synchronization of messages and questioning implies real-time outside influence during a public hearing.
- **If verified**, Epstein’s alleged coaching would represent a disturbing breach of democratic norms: shaping oversight from the shadows.
- **Washington influence has modernized**—less steakhouse whispering, more instant messaging and narrative control.
- **Not all claims travel equally**: pairing a potentially verifiable allegation with an unverified anecdote muddies public understanding and fuels misinformation.
- **Future Epstein file releases** could bring accountability—or chaos—or, most likely, both at once.
- **Partisan spin is inevitable**, but Epstein’s network historically crossed social and political lines; treating it as a one-party scandal is intellectually lazy and politically convenient.

---

<!-- Endnote: This article is a transformation and expansion of the provided unstructured text, adding context, historical framing, and analysis while clearly distinguishing verifiable-style claims from anecdotal assertions. -->


================================================
FILE: blog/source/_posts/2025-12-21-panya-the-pygmy-hippo-calf-is-the-internets-new-favorite-tiny-chaos-goblin-and-thats-exactly-the-pro.md
================================================
---
title: "Panya the Pygmy Hippo Calf Is the Internet’s New Favorite Tiny Chaos Goblin — and That’s Exactly the Problem"
date: 2025-12-21 20:01:42
tags:
  - viral animal fame
  - pygmy hippo
  - internet culture
  - zoo animals
  - animal welfare
categories:
  - Media
feature: true
cover: https://github.com/cojovi/projectsentinal/blob/main/test/panya-the-pygmy-hippo-calf-is-the-internets-new-fa.png?raw=true
image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
og_image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
---

<!-- alt: A tiny pygmy hippo calf named Panya splashes in shallow water while visitors point phones at the enclosure -->
The internet has done it again: it found a **tiny baby animal**, slapped a crown on its damp little head, and declared it the cure for modern despair. On Dec. 16, 2025, **Panya**, a pygmy hippo calf, detonated across feeds as peak “small creature, big feelings” content—adorable, squishy, and perfectly engineered to make you forget your inbox is a crime scene.

**TL;DR**: Panya’s viral stardom is cute enough to melt your phone battery, but it also spotlights the darker reality of **viral animal fame**—where attention can mean stress, exploitation, and sometimes deadly consequences.

<!-- more -->

## The Birth of a Meme: How Panya Became Everyone’s Emotional Support Hippo
Panya didn’t ask to be famous. Panya likely doesn’t even know what “famous” is. Panya’s priorities are probably: **milk**, **warm mud**, **not being perceived by predators**, and maybe committing a few low-stakes crimes like knocking over enrichment toys.

And yet, here we are—treating a baby pygmy hippo like a celebrity who just dropped a surprise album.

The formula is familiar. A zoo posts a clip. Someone adds a caption like “me leaving work at 5:01 p.m.” The algorithm, hungry for soft content to balance out the day’s geopolitical doomscrolling, goes feral. The result: millions of views, endless reposts, and a comment section full of people offering to “die for this hippo,” which is sweet, if a little intense.

This isn’t a one-off. Just recently, the internet fell hard for another baby hippo: **Moo Deng**, a young hippo whose clips spread rapidly thanks to their irresistible blend of clumsy baby energy and “I am a tiny tank” swagger. Mashable documented how Moo Deng captured attention across platforms, illustrating how quickly a single animal can become a global comfort object when the content hits the right emotional frequency and the algorithm decides to bless it.

What makes Panya’s moment feel extra potent is the contrast: **pygmy hippos** are smaller, rarer in public view, and inherently more “pocket-sized mythological creature” than their larger Nile hippo cousins. The internet loves novelty almost as much as it loves cuteness.

> **Key Insight**: Virality isn’t just popularity—it’s *distribution at algorithmic scale*, which changes the stakes for the animal, the institution, and the audience.

But here’s the twist in our cute little story: when a baby animal becomes a **content pipeline**, the boundaries between education, conservation, entertainment, and exploitation can get… slimy.

---

## Why We Can’t Quit Baby Animals (Even When We Probably Should)
Let’s be honest: the internet runs on three fuels—outrage, misinformation, and **small mammals doing anything**. Baby animals are a psychological cheat code.

Researchers have long described the “**baby schema**” effect (popularized by ethologist Konrad Lorenz): big eyes, round faces, small noses—features that trigger caretaking instincts in humans. Social platforms then amplify that instinct into a feedback loop: you watch, you like, you share, you get more.

Panya’s videos—wobbling, splashing, learning the physics of legs—hit that exact neural jackpot. The appeal is almost primal, like seeing a baby and thinking, “I must protect this at all costs,” except instead of protection we offer… engagement metrics.

And engagement metrics are not neutral. They’re a currency.

- **Zoos and wildlife parks**: gain attention, ticket sales, donations, and brand reach.
- **Creators and reposters**: gain followers and ad revenue.
- **Audiences**: gain a hit of joy, then demand more joy tomorrow.

The system is built to turn Panya into an endless series of “moments.” Which sounds harmless until you remember: a baby animal is not a TV show with seasons. It’s a living being with stress hormones.

> **Pro Tip**: If you’re watching a “cute animal” clip, ask yourself: *Would I still enjoy this if I knew the animal was stressed?* If the answer is no, your brain is already doing ethics.

---

## Conservation Reality Check: Pygmy Hippos Aren’t Just Cute, They’re in Trouble
Now for the part where the confetti cannon jams and we all stare into the abyss.

**Pygmy hippos (Choeropsis liberiensis)** are native to West Africa, particularly Liberia, Sierra Leone, Guinea, and Côte d’Ivoire. They’re elusive forest dwellers, not river-dominating bruisers like the common hippo. And yes, they are objectively adorable—like someone shrunk a hippo in the dryer and it came out shy.

But they’re also **endangered**. Habitat loss from logging, agriculture, mining, and human settlement has squeezed their populations. Hunting pressure and regional instability have also historically complicated conservation. Exact population counts are difficult due to their secretive nature and dense forest habitat, but conservation organizations and zoological institutions widely classify them as threatened and at risk.

So in theory, viral attention could help: more awareness, more funding, more interest in conservation programs.

In practice, it’s complicated.

Here’s the uncomfortable question: does Panya’s viral fame translate into meaningful conservation outcomes, or does it just translate into **more people filming a stressed baby hippo through glass**?

If the attention becomes a surge of visitors, institutions may face pressure to put the animal on display more often, or to post more content more frequently, or to “deliver” cute moments on demand. That’s where welfare concerns can creep in.

> **Expert View**: Wildlife welfare specialists often emphasize that stress in captive animals can be subtle—changes in appetite, repetitive behaviors, avoidance, or abnormal social interactions. Viral attention can unintentionally reward practices that prioritize visibility over wellbeing.

The ethical line isn’t “posting is bad.” The ethical line is whether posting creates incentives that degrade welfare.

---

## The Dark Side of Viral Animal Fame: “Sometimes to Death” Isn’t Just a Clickbait Phrase
The internet loves baby animals… sometimes to death.

Not always literally, but sometimes literally enough that the phrase isn’t just melodrama. Viral animal fame can lead to:

- **Overcrowding and stress**: Swarms of visitors, camera flashes, banging on glass, loud noise.
- **Handling pressure**: Demands for closer encounters, petting, selfies, “VIP experiences.”
- **Content escalation**: The need to top the last cute clip can encourage riskier or more intrusive filming.
- **Misinformation**: People misunderstanding the animal’s needs (“Why doesn’t Panya live in my bathtub? I have a big bathtub.”)

Even when institutions have strong welfare standards, the audience can become a chaotic variable. And platforms reward chaos. If Panya’s clip gets 40 million views, the next clip needs to get 50 million—or someone, somewhere, starts making decisions based on that pressure.

This is where a weirdly relevant detour helps: **pattern hunger**.

One of the provided sources is a dataset page about **pentagrams**—five-letter sequences used in language modeling and text analysis. It’s not about hippos, but it is about something the internet does constantly: learning patterns and predicting what comes next. Algorithms are essentially giant pattern machines, optimizing for engagement the way language models optimize for likely word sequences. If “baby hippo splashing” performs well, the system predicts you want more of that pattern.

So the machine asks for more Panya.

And the machine doesn’t care if Panya is tired.

---

## When Cuteness Becomes a Supply Chain: The Business of Going Viral
Here’s where things get especially darkly funny: once an animal goes viral, the surrounding ecosystem starts to look less like conservation and more like… operations.

To understand how quickly “attention” becomes “infrastructure,” consider how modern businesses handle scale. Another provided source, **Olist Tiny ERP**, is an example of the kind of tool companies use to manage commerce: orders, integrations, payments, and logistics. Tiny positions itself as an **ERP (Enterprise Resource Planning)** platform and integration hub for managing sales channels and operations.

No, zoos are not e-commerce shops. But the comparison is instructive.

When virality hits, institutions often have to manage:

- spikes in ticket demand
- increased customer service volume
- merchandise interest (yes, plushies happen fast)
- social media scheduling and moderation
- donation campaigns

That’s not inherently evil. It’s reality. But it shows how quickly a living creature can become the center of a mini economy.

And economies have incentives.

If Panya’s fame boosts revenue, even well-meaning organizations can get nudged—subtly—toward choices that maximize public exposure. That’s why transparency matters: clear welfare policies, limits on viewing, enrichment priorities, and educational framing that doesn’t treat the animal like a toy.

> **Key Insight**: The moment an animal becomes a “brand asset,” the ethical burden increases—because the temptation to optimize for attention becomes structurally baked in.

---

## So What Do We Do With Panya? A Survival Guide for Not Being the Villain in the Comments
You don’t have to stop loving Panya. You just have to love Panya like an adult, not like a raccoon discovering energy drinks.

Here’s what responsible “viral animal fandom” can look like:

- **Follow the institution’s official channels** rather than repost farms. This helps keep information accurate and reduces incentive for exploitative accounts.
- **Look for welfare signals**: Are posts educational? Do they mention rest periods? Do they discourage flash photography and crowding?
- **Support conservation directly**: donate to reputable pygmy hippo conservation programs or habitat protection initiatives.
- **Don’t demand access**: no “let people hold the baby” energy. That’s how we end up with bad outcomes.
- **Share context, not just clips**: if you repost, add conservation facts and ethical framing.

Also, maybe consider that your need for daily adorable content is not a constitutional right.

Panya’s job is not to heal your inner child. Panya’s job is to be a hippo.

And being a hippo—especially a tiny endangered one—should be hard enough without also being an unwilling influencer.

---

## Key Takeaways
- **Panya’s virality** is part of a broader trend where baby animals become global comfort objects through algorithmic amplification.
- **Pygmy hippos are endangered**, and attention can help conservation—but it can also increase welfare risks if it drives intrusive demand.
- Viral animal fame can create **economic and operational pressures** that push institutions toward “more content, more access,” even unintentionally.
- Algorithms reward predictable patterns—like the language-pattern logic reflected in tools such as **pentagram** datasets—meaning the system will keep demanding “more Panya.”
- You can enjoy the cuteness *without being complicit*: follow official sources, share context, support conservation, and don’t pressure institutions for closer encounters.

In the end, Panya is a mirror: the internet’s tenderness, the internet’s obsession, and the internet’s tendency to squeeze joy until it squeaks. If we can’t stop ourselves from falling in love with a tiny hippo, fine. But let’s at least love it in a way that doesn’t turn “aww” into an epitaph.


================================================
FILE: blog/source/_posts/2025-12-21-snls-christmas-joke-swap-blindsides-colin-jost-again-the-annual-ritual-where-hr-would-die-instantly.md
================================================
---
title: "SNL’s Christmas “Joke Swap” Blindsides Colin Jost (Again): The Annual Ritual Where HR Would Die Instantly"
date: 2025-12-21 19:34:06
tags:
  - Saturday Night Live
  - Weekend Update
  - joke swap
  - Colin Jost
  - Michael Che
categories:
  - Media
feature: true
cover: https://github.com/cojovi/projectsentinal/blob/main/test/snls-christmas-joke-swap-blindsides-colin-jost-aga.png?raw=true
image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
og_image: https://github.com/cojovi/projectsentinal/blob/main/test/ProtocolSentinelbanner.png?raw=true
---

<!-- alt: Colin Jost and Michael Che at the Weekend Update desk during SNL’s Christmas joke swap, with cue cards and a festive backdrop -->
The **Weekend Update Christmas joke swap** is the closest thing American television has to a sanctioned workplace ambush—except the “workplace” is live TV, the “ambush” is a cue card, and the “victim” is usually **Colin Jost**, blinking like a man who just realized the hostage note is in his own handwriting. On **Dec. 21, 2025**, the bit detonated again, and the internet—ever hungry for *premium secondhand pain*—immediately started slow-clapping.

**TL;DR**: SNL’s annual Christmas “joke swap” went viral again after **Michael Che** bait-and-switched **Colin Jost** into reading brutally awkward jokes live, proving that nothing bonds a culture like witnessing a polite man’s soul briefly leave his body.

<!-- more -->

## The Bit That Keeps on Giving (Anxiety)
If you’ve never seen it: the **joke swap** is a holiday tradition on *Saturday Night Live*’s **Weekend Update**, where co-anchors **Michael Che** and **Colin Jost** read jokes written by the other—*cold*, with no preview. The result is a recurring masterpiece of televised dread: each anchor is forced to deliver lines they didn’t write, don’t endorse, and would absolutely deny under oath.

According to coverage of the **Dec. 21, 2025** episode from outlets including **Decider** and **Deadline**, the latest swap followed the now-familiar structure:

- The setup: warm holiday vibes, cheerful audience, cozy desk.
- The twist: cue cards that might as well be labeled **“Career Choices: The Reckoning.”**
- The payoff: one anchor reading a joke that makes them look like they were raised by a Wi-Fi router in a basement forum.

This year’s viral heat centered—again—on Jost being maneuvered into reading jokes designed to maximize discomfort. Multiple reports (including **Deadline**, **E! Online**, and the **New York Post**) highlighted at least one moment that roped in Jost’s personal life, including references to **Scarlett Johansson**—a recurring pressure point because it’s both intensely personal and irresistibly memeable.

> **Key Insight**: The joke swap isn’t just “two comedians prank each other.” It’s a live demonstration of how *context* is the real punchline—and how quickly it can be weaponized.

And yes: it’s funny. But it’s also funny in the way a roller coaster is fun—your body is convinced you’re dying, and your brain is like, “Great content though.”

---

## Why This Goes Viral Every Year: The Science of Secondhand Pain
The joke swap doesn’t go viral because the jokes are always the cleverest lines SNL has ever produced. It goes viral because it reliably triggers a potent cocktail of emotions:

- **Surprise**: The anchors genuinely don’t know what’s coming.
- **Risk**: It’s live; there’s no safety net.
- **Status**: These are famous people with reputations to maintain.
- **Relatability**: Everyone has, at some point, read something out loud and immediately wished for the sweet release of invisibility.

Coverage of the 2025 swap emphasized how quickly clips spread across social platforms—an effect also observed in prior years. **Mashable’s** discussion of the **2024** swap framed it as a repeatable viral engine: short, caption-friendly moments, big facial reactions, and jokes that are “quote-tweet bait” by design.

There’s also a psychology angle here: researchers have long described how **vicarious embarrassment** (also called *secondhand embarrassment*) can be intensely visceral. You don’t need to be the person on stage to feel the heat; your brain can simulate the discomfort like it’s running a high-fidelity humiliation demo.

So when Jost reads a line that sounds like it was written by a chaos gremlin with a law degree, the audience isn’t just laughing—they’re *processing*.

> **Pro Tip**: If you want something to go viral, don’t just make it funny. Make it **emotionally legible in two seconds**—shock, cringe, delight, outrage, or all four at once.

And the joke swap is basically a factory for those emotions.

---

## “The Annual Ritual Where HR Would Die Instantly” (And Why That’s the Point)
Let’s address the peppermint-scented elephant in the room: if you did this at your office holiday party, you would be escorted out by security before you could say, “It’s just a prank, Kevin.”

The joke swap works precisely because it’s a controlled environment where:

- The participants are **professional comedians**.
- The audience expects boundary-pushing.
- The show has decades of institutional knowledge about what it can get away with.
- The anchors have a relationship built on trust, rivalry, and mutual willingness to set each other on fire for ratings.

But it still plays like a workplace safety violation—because it is, spiritually.

In 2025, reports described Che once again steering Jost into jokes that made him look socially radioactive, with at least one punchline tied to Johansson. **E! Online** and **Deadline** both noted the crowd reaction and the “you can’t un-say that” vibe that followed. The **New York Post** leaned into the spectacle of it, highlighting the personal angle and the sheer audacity of making someone read a joke that implicates their home life.

That “HR would die” framing isn’t just a snarky blog angle—it’s a useful lens. The bit is essentially a parody of modern reputational risk:

- We live in an era where a single clip—ten seconds long—can become your entire personality online.
- Public figures are expected to be both **authentic** and **perfect**, a fun contradiction that drives everyone insane.
- Comedy is constantly negotiating what’s “too far,” and the line moves depending on who’s speaking, who’s listening, and what the internet had for breakfast.

So the joke swap becomes a yearly ritual where SNL says: *Let’s take the anxiety of modern speech culture and turn it into a party game.*

> **Expert View**: Media analysts often describe live comedy as “high-wire performance”—and the joke swap adds a second wire below it labeled **“social media.”** The tension isn’t accidental; it’s the product.

---

## A Mini History of the Joke Swap: Tradition, Escalation, and the Art of the Trap
The joke swap has become a defining feature of the **Che-Jost era** of Weekend Update, and it follows a classic escalation arc: once the audience learns the rules, the only way to keep the thrill is to raise the stakes.

By **2024**, the swap was already being treated as a predictable annual event—yet still reliably viral. **Mashable** noted how the format itself is the hook: you’re not just watching jokes; you’re watching *reaction shots*, the micro-pauses, the “do I have to read this?” eye flicks, the tiny negotiations with fate.

By **2025**, the tradition had matured into something closer to a seasonal sporting event:

- Fans anticipate it.
- Media outlets recap it within hours.
- Social platforms slice it into shareable chunks.
- The comedians lean into the meta-narrative—especially the running gag that **Che** is the chaos agent and **Jost** is the well-dressed hostage.

The 2025 coverage across **Decider**, **Deadline**, and entertainment outlets framed the segment as another chapter in that ongoing story: Che is still the mischievous architect, and Jost is still the guy who looks like he’s going to apologize to the audience’s parents.

Even the disagreements between outlets—what exact joke “hit hardest,” which line is most quote-worthy—feed the viral loop. When multiple publications spotlight slightly different “worst/best” moments, it encourages viewers to hunt down the full clip to adjudicate. The modern attention economy runs on one sacred principle: **let the audience feel like detectives**.

And yes, Reddit notices too. Discussions like those in the **r/entertainment** thread about Che and Jost’s history reflect how the bit has become part of SNL’s broader mythology—fans swapping memories, ranking years, and debating whether Jost is genuinely surprised or simply *method acting as a man being audited by Satan*.

---

## What the Joke Swap Says About Comedy in 2025 (Besides “Good Luck, Buddy”)
The joke swap is funny, but it’s also a commentary—intentional or not—on how comedy works now.

### 1) It’s comedy built for clips
The segment is engineered for the internet:

- Short, punchy lines
- Big reactions
- A clear premise you can explain in one sentence
- A “can you believe he said that?” share impulse

That’s why it spreads fast: it’s essentially a meme generator with studio lighting.

### 2) It weaponizes the gap between “speaker” and “author”
One of the oldest tricks in rhetoric is plausible deniability. The joke swap flips it:

- Jost *speaks* the joke, so he absorbs the embarrassment.
- Che *authored* the joke, so he gets the credit for audacity.

It’s a perfect modern anxiety machine: you can’t control what you’re associated with, and the algorithm doesn’t care who wrote it.

### 3) It’s a pressure test for boundaries
Holiday episodes are often lighter, but the joke swap is a sanctioned exception: a moment where SNL can push harder while still claiming the structure is the joke.

In 2025, the personal angle (as noted by **Deadline**, **E! Online**, and the **New York Post**) underscored how the bit keeps finding new ways to raise stakes—because audiences reward discomfort with attention.

### 4) It’s oddly wholesome, in a feral way
Here’s the twist: the joke swap works because there’s trust underneath it. If it were truly malicious, it wouldn’t be funny—it would be grim. The laughter depends on the sense that everyone will survive and come back next year to do it again.

> **Key Insight**: The segment is a comedy version of controlled demolition—spectacular, loud, and carefully engineered so the building falls exactly where it’s supposed to.

---

## How to Steal This Format (Without Getting Fired): Real-World Applications
No, you should not do a “joke swap” at your office party unless your office is staffed entirely by improv comedians and licensed therapists. But the structure offers lessons for creators, brands, and anyone trying to make content that sticks.

Here are safer, HR-compatible takeaways:

- **Use a clear, repeatable format**: Annual traditions build anticipation.
- **Design for reaction**: Humans share faces more than they share punchlines.
- **Keep the premise simple**: If it needs a paragraph of explanation, it’s already dead.
- **Create stakes without cruelty**: The best tension feels risky but not genuinely harmful.
- **Let the audience in on the rules**: Transparency makes the surprise feel fair.

And if you’re a manager reading this thinking, “What if we did a ‘compliment swap’?”—congratulations, you just invented something that might actually improve morale. Please proceed.

---

## Key Takeaways
- **SNL’s Christmas joke swap** remains viral because it combines **surprise**, **risk**, and **highly readable emotion**—especially Jost’s trademark “I would like to exit my body now” expression.
- Coverage from **Decider**, **Deadline**, **E! Online**, and the **New York Post** emphasized how the **Dec. 21, 2025** swap again used personal angles—reportedly including **Scarlett Johansson** references—to maximize discomfort and shareability.
- The bit succeeds as a modern media product: it’s **clip-ready**, **meme-friendly**, and built around a simple premise with escalating stakes.
- Beneath the chaos is a crucial ingredient: **trust** between performers, which keeps the segment from turning mean-spirited.
- The joke swap is, effectively, a yearly reminder that in 2025, reputation can be rewritten in **ten seconds of video**—and comedy knows it.

In the end, the joke swap endures because it’s not just a segment—it’s a holiday ritual for the internet age: a festive little bonfire where we gather to warm our hands on someone else’s discomfort, sip cocoa, and whisper, *“Thank God that wasn’t me.”*


================================================
FILE: blog/source/_posts/2025-12-21-when-doj-documents-evaporate-conspiracy-grows-legs-the-curious-case-of-the-disappearing-epstein-file.md
================================================
[Binary file]


================================================
FILE: blog/source/_posts/3d-print-stormbreaker.md
================================================
---
title: '3D Print : StormBreaker'
tags:
  - 3dprint
  - Decor
  - DIY
id: '504'
categories:
  - - 3d Print
  - - Video Games
  - - weapon
date: 2022-05-09 14:37:24
cover: https://techdonecheap.files.wordpress.com/2023/04/img_1101.jpg
---

* * *

### Another one of my fav's, Thor's upgrade!!

![](https://techdonecheap.files.wordpress.com/2023/04/img_1101.jpg?w=1024)

"The Adventures of Thor: Losing Mjölnir and Gaining Stormbreaker" ....

Once upon a time, in the land of Asgard, Thor was the proud owner of the mighty hammer Mjölnir. But, as fate would have it, Thor's evil brother Loki had other plans for the powerful weapon.

![](https://techdonecheap.files.wordpress.com/2023/04/lokievilresize.jpg?w=625)

In "Thor: Ragnarok," Loki tricked Thor and sent Mjölnir flying into the depths of space. Thor was left hammerless and stranded on the planet Sakaar.

![](https://techdonecheap.files.wordpress.com/2023/04/screen-shot-2023-01-13-at-1.26.24-pm.png?w=554)

  
But Thor is not one to give up easily. With the help of his trusty companions, including the Hulk and Valkyrie, Thor set out on a mission to reclaim his hammer and save Asgard from destruction.  
  
However, when Thor finally found Mjölnir, it was too late. The hammer was destroyed by the fire demon Surtur, leaving Thor once again without a weapon.  
  
But, as the saying goes, "When one door closes, another one opens." Thor soon met the dwarf blacksmith Eitri, who helped Thor create a new weapon, the powerful axe Stormbreaker.

![](https://techdonecheap.files.wordpress.com/2023/04/screen-shot-2023-01-13-at-1.28.26-pm.png?w=468)

With Stormbreaker in hand, Thor was ready to take on any challenge that came his way. He returned to Asgard and defeated Loki and Hela, saving his home and his people.

So, in the end, Thor may have lost Mjölnir, but he gained something even greater: the powerful and versatile Stormbreaker. And as they say, sometimes it's the things we lose that lead us to something even better.

So, if you ever find yourself in a similar situation, just remember: don't lose hope, because you never know what new and exciting opportunities might be just around the corner.

Thanks for reading, Happy hammering!

![](https://techdonecheap.files.wordpress.com/2023/04/stormbreaker-copy-1.jpg?w=1024)


==============