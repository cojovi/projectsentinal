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
WORD_COUNT_MIN = 750
WORD_COUNT_MAX = 1150
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

Provide a concise description of the tone and writing style (2-3 sentences). Focus on:
- Formality level
- Voice characteristics
- Writing patterns
- Overall style

Tone analysis:"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a writing style analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"⚠️  Warning: Could not analyze tone: {e}")
        return "professional, engaging, and slightly conversational"


def generate_article_content(
    client: openai.OpenAI,
    user_input: str,
    input_type: str,
    tone: str
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
    
    elif input_type == "TEXT":
        prompt = f"""Transform this unstructured text into a polished, professional article.

Tone guidelines: {tone}

CRITICAL REQUIREMENTS:
- Output MUST be 750-1150 words (strict requirement)
- Organize content with clear structure and professional narrative flow
- Add context, analysis, and expert perspectives where appropriate
- No placeholder text, no [brackets], no repetition of instructions
- Format response as JSON: {{"title": "Article Title", "body": "Article body text"}}

Text to transform:
{user_input}

JSON response:"""
    
    else:  # IDEA
        prompt = f"""Expand this idea into a full, professional article.

Tone guidelines: {tone}

CRITICAL REQUIREMENTS:
- Output MUST be 750-1150 words (strict requirement)
- Write as researched journalism with context, analysis, and expert perspectives (synthesized)
- Professional news journalism structure
- No placeholder text, no [brackets], no repetition of instructions
- Format response as JSON: {{"title": "Article Title", "body": "Article body text"}}

Idea to expand:
{user_input}

JSON response:"""
    
    try:
        # Try with JSON response format (supported in newer models)
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a professional journalist and content writer. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
            temperature=0.7,
            max_tokens=3000,
                response_format={"type": "json_object"}
            )
        except Exception:
            # Fallback if response_format not supported
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a professional journalist and content writer. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=3000
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
            
            # Remove control characters that break JSON parsing
            # Keep only printable characters and whitespace
            json_str = ''.join(char for char in json_str if char.isprintable() or char in '\n\r\t')
            
            # Clean up common JSON issues
            json_str = json_str.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
            # Remove multiple spaces
            json_str = re.sub(r' +', ' ', json_str)
            
            data = json.loads(json_str)
            title = data.get("title", "").strip()
            body = data.get("body", "").strip()
            
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
    prompt = f"""Analyze this article and generate appropriate metadata.

Title: {title}

Article body (first 1000 chars):
{body[:1000]}

Generate metadata as JSON with these exact fields:
{{
  "category": "one category from: {', '.join(CATEGORIES)}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "location": "geographic location if relevant, or null"
}}

Requirements:
- Category: Choose the single best-fit category from the list
- Tags: 3-5 relevant tags, each 1-3 words, concise
- Location: Only include if article has clear geographic relevance, otherwise null

JSON response:"""
    
    try:
        # Try with JSON response format (supported in newer models)
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a content metadata expert. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=500,
                response_format={"type": "json_object"}
            )
        except Exception:
            # Fallback if response_format not supported
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a content metadata expert. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=500
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
    """Generate DALL-E prompt for photorealistic hero image."""
    prompt = f"""Write a DALL-E prompt for a photorealistic news hero image.

Article title: {title}
Category: {category}
Article preview: {body_preview[:500]}

CRITICAL INSTRUCTIONS:
- Must specify "photograph" or "photo-realistic"
- Must mention professional camera terms (DSLR, 50mm lens, etc.)
- Must specify natural/cinematic lighting
- Must describe editorial/documentary composition
- MUST NEVER mention: illustration, painting, cartoon, CGI, 3D render

Generate a ~2 sentence prompt optimized for photorealism.

DALL-E prompt:"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a prompt engineer specializing in photorealistic image generation."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise Exception(f"Failed to generate image prompt: {e}")


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
    
    # Generate article content
    print(f"📝 Generating article...")
    try:
        title, body = generate_article_content(client, user_input, input_type, tone)
        word_count = count_words(body)
        print(f"✓ Article generated: {title}")
        print(f"✓ Word count: {word_count} words")
        
        if word_count < WORD_COUNT_MIN or word_count > WORD_COUNT_MAX:
            print(f"⚠️  Warning: Word count ({word_count}) is outside target range ({WORD_COUNT_MIN}-{WORD_COUNT_MAX})")
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
        print(f"✓ Image prompt: {image_prompt[:100]}...")
    except Exception as e:
        print(f"❌ Error generating image prompt: {e}")
        return
    print()
    
    # Generate image
    print("🖼️  Generating image with DALL-E...")
    try:
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

