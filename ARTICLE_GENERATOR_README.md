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

