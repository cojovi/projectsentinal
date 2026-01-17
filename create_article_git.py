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
import subprocess
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

# Static Blog Tone (Witty + Sarcastic + Precise)
BLOG_TONE = """Write like a sharp, jaded narrator who's extremely observant, slightly annoyed, and hilariously honest. The humor is witty, sarcastic, and punchy, but never confusing or sloppy. Keep the energy confident and conversational—like you're roasting the topic while still doing the homework better than everyone else.

ACCURACY FIRST: Comedy never replaces facts—jokes are layered on top of correct reporting and clear explanations. If something is uncertain, say so plainly ("We don't know yet," "This hasn't been confirmed," "Here's what's alleged vs proven"). Don't invent quotes, numbers, documents, or events.

HUMOR STYLE: Use sarcasm as seasoning, not the meal. Punch up the absurdity of situations, incentives, hypocrisy, and corporate/political doublespeak. Prefer dry one-liners, unexpected comparisons, and deadpan understatement. Avoid cringe: no try-hard meme speak, no "hello fellow kids," no endless exclamation points.

READABILITY: Short paragraphs. Clean flow. Skimmable structure. Mix sentence lengths: quick jabs + occasional longer "spiral rant" that lands back on the point. Use occasional rhetorical questions and asides in parentheses like: (which is a fancy way of saying: it's dumb but expensive)

STRUCTURE: Start with a hook that's funny and frames the topic clearly. Explain the topic in plain English first, then add nuance. Use headers that sound like a headline + a roast. Include bullet lists for clarity. Add a "What this means" section to translate implications. When referencing claims, label clearly: Fact / Claim / Allegation / Opinion. Include dates, names, and specifics.

TONE CALIBRATION: The narrator can be cynical, but not incoherent. The blog should feel like: "I'm laughing because otherwise I'd scream," while still being useful.

STYLE TOOLS (use often): "Translation:" lines ("Translation: ___", "What they mean is: ___"), reality checks ("Here's the part people skip…", "The boring detail that matters: ___"), controlled exaggeration (clearly comedic): "This is like ___, but with more paperwork and worse outcomes."

FORBIDDEN: Slurs, hate, harassment. Defamation presented as fact. Making up sources. Joke paragraphs that derail the subject for too long."""

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
    """Generate DALL-E prompt for retro arcade pixel art style image."""
    
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
    
    # NEW PROMPT - RETRO ARCADE PIXEL ART STYLE
    prompt = f"""Write a compelling DALL-E prompt for ultra-high-quality retro arcade pixel art illustration that captures the essence of this article.

Article title: {title}
Category: {category}
Article preview: {body_preview[:500]}

CRITICAL STYLE REQUIREMENTS - RETRO ARCADE PIXEL ART:
- Style: Ultra-high-quality retro arcade pixel art illustration in authentic 8-bit to 16-bit era style (NES → SNES/Genesis transition)
- Composition: Cinematic "attract screen" or game box-art composition with strong parallax depth: foreground pixel UI elements, midground central character/silhouette, and layered background environments
- Technical details: Bold pixel outlines, intentional dithering, limited but vibrant color palette with electric neon highlights, arcade glow effects, subtle CRT scanlines, light chromatic aberration for classic cabinet display feel
- Lighting: Dramatic and directional lighting, high contrast between illuminated elements and deep shadowed areas
- Shading: Pixel-accurate shading techniques (clustered pixels, stair-stepped highlights) rather than smooth gradients
- Interface elements: Symbolic interface elements (meters, icons, indicators) rendered as abstract pixel glyphs — NO readable text, NO logos, NO brands
- Composition: Poster-worthy and balanced, strong central focal point, environmental storytelling through shapes, lighting, and color contrast
- Visual tone: Cinematic, nostalgic, slightly surreal — blending retro video game aesthetics with modern depth and polish
- Quality: Crisp pixels (no blur), sharp edges, clean resolution
- Aspect ratio: 16:9 landscape format

OPTIONAL STYLE MODIFIERS (include 1-2 that fit the article's vibe):
- Arcade cabinet glow, neon rim-lighting
- SNES-era RPG box art detail level
- Genesis-style darker color palette
- Pixel-perfect CRT scanline overlay
- Parallax depth layers with subtle atmospheric haze
- Retro cyberpunk arcade aesthetic
- Classic attract-mode title screen energy

CRITICAL - MUST INCLUDE IN PROMPT:
- "Ultra-high-quality retro arcade pixel art illustration"
- "Authentic 8-bit to 16-bit era style" or "NES → SNES/Genesis transition style"
- "Cinematic attract screen" or "game box-art composition"
- "Strong parallax depth" with foreground, midground, and background layers
- "Bold pixel outlines, intentional dithering"
- "Limited but vibrant color palette with electric neon highlights"
- "Arcade glow effects, subtle CRT scanlines"
- "Pixel-accurate shading techniques"
- "Crisp pixels, sharp edges, clean resolution"
- Visual elements related to the article content (but rendered as pixel art symbols/silhouettes, NOT text/logos)

Generate a detailed 3-4 sentence prompt that creates a visually striking retro arcade pixel art illustration capturing the article's essence.

DALL-E prompt:"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-5.2",
            messages=[
                {"role": "system", "content": "You are a prompt engineer specializing in retro arcade pixel art image generation. You create detailed, authentic prompts for 8-bit to 16-bit era pixel art illustrations with cinematic composition, parallax depth, and arcade aesthetics. Always include technical pixel art specifications (dithering, pixel-accurate shading, CRT scanlines, etc.). Your response must be a valid DALL-E prompt, not empty."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_completion_tokens=300
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
            image_prompt = f"Ultra-high-quality retro arcade pixel art illustration, authentic 8-bit to 16-bit era style (NES → SNES/Genesis transition), cinematic attract screen composition with strong parallax depth: foreground pixel UI elements, midground central silhouette, layered background environments, bold pixel outlines, intentional dithering, limited vibrant color palette with electric neon highlights, arcade glow effects, subtle CRT scanlines, light chromatic aberration, dramatic directional lighting with high contrast, pixel-accurate shading techniques, symbolic interface elements as abstract pixel glyphs, {category.lower()} theme, {clean_title}, crisp pixels sharp edges clean resolution, cinematic nostalgic slightly surreal tone"
        
        return image_prompt
    except Exception as e:
        # Fallback prompt if API call fails
        print(f"⚠️  Warning: Image prompt generation failed: {e}, using fallback...")
        clean_title = re.sub(r'[^\w\s-]', '', title.lower())[:50]
        return f"Ultra-high-quality retro arcade pixel art illustration, authentic 8-bit to 16-bit era style (NES → SNES/Genesis transition), cinematic attract screen composition with strong parallax depth: foreground pixel UI elements, midground central silhouette, layered background environments, bold pixel outlines, intentional dithering, limited vibrant color palette with electric neon highlights, arcade glow effects, subtle CRT scanlines, light chromatic aberration, dramatic directional lighting with high contrast, pixel-accurate shading techniques, symbolic interface elements as abstract pixel glyphs, {category.lower()} theme, {clean_title}, crisp pixels sharp edges clean resolution, cinematic nostalgic slightly surreal tone"


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


def push_to_github(filepath: Path, image_filepath: Path, title: str) -> bool:
    """
    Add, commit, and push the new article and image to GitHub.
    Returns True if successful, False otherwise.
    """
    try:
        # Check if we're in a git repository
        result = subprocess.run(
            ["git", "rev-parse", "--git-dir"],
            capture_output=True,
            text=True,
            cwd=Path.cwd()
        )
        if result.returncode != 0:
            print("⚠️  Warning: Not in a git repository, skipping GitHub push")
            return False
        
        print("📤 Pushing to GitHub...")
        
        # Get relative paths for git add
        # Convert to relative paths from repo root
        repo_root = Path(subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True,
            text=True,
            check=True
        ).stdout.strip())
        
        article_rel_path = filepath.relative_to(repo_root) if filepath.is_absolute() else filepath
        image_rel_path = image_filepath.relative_to(repo_root) if image_filepath.is_absolute() else image_filepath
        
        # Stage the files
        subprocess.run(
            ["git", "add", str(article_rel_path), str(image_rel_path)],
            check=True,
            cwd=repo_root
        )
        print(f"✓ Staged: {article_rel_path}")
        print(f"✓ Staged: {image_rel_path}")
        
        # Commit with descriptive message
        commit_message = f"Add blog post: {title}"
        subprocess.run(
            ["git", "commit", "-m", commit_message],
            check=True,
            cwd=repo_root
        )
        print(f"✓ Committed: {commit_message}")
        
        # Push to remote (default branch, typically 'main')
        subprocess.run(
            ["git", "push"],
            check=True,
            cwd=repo_root
        )
        print("✓ Pushed to GitHub successfully")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"⚠️  Warning: Git operation failed: {e}")
        print("   You may need to manually commit and push the files")
        return False
    except Exception as e:
        print(f"⚠️  Warning: Failed to push to GitHub: {e}")
        print("   You may need to manually commit and push the files")
        return False


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
    
    # Use static blog tone
    tone = BLOG_TONE
    print(f"✓ Using blog tone: Witty, sarcastic, and precise")
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
        image_prompt = f"Ultra-high-quality retro arcade pixel art illustration, authentic 8-bit to 16-bit era style (NES → SNES/Genesis transition), cinematic attract screen composition with strong parallax depth: foreground pixel UI elements, midground central silhouette, layered background environments, bold pixel outlines, intentional dithering, limited vibrant color palette with electric neon highlights, arcade glow effects, subtle CRT scanlines, light chromatic aberration, dramatic directional lighting with high contrast, pixel-accurate shading techniques, symbolic interface elements as abstract pixel glyphs, {category.lower()} theme, {clean_title}, crisp pixels sharp edges clean resolution, cinematic nostalgic slightly surreal tone"
        print(f"✓ Using fallback prompt: {image_prompt[:80]}...")
    print()
    
    # Generate image
    print("🖼️  Generating image with DALL-E...")
    try:
        # Validate image prompt before generating
        if not image_prompt or len(image_prompt.strip()) == 0:
            print("⚠️  Warning: Image prompt is empty, generating fallback prompt...")
            clean_title = re.sub(r'[^\w\s-]', '', title.lower())[:50]
            image_prompt = f"Ultra-high-quality retro arcade pixel art illustration, authentic 8-bit to 16-bit era style (NES → SNES/Genesis transition), cinematic attract screen composition with strong parallax depth: foreground pixel UI elements, midground central silhouette, layered background environments, bold pixel outlines, intentional dithering, limited vibrant color palette with electric neon highlights, arcade glow effects, subtle CRT scanlines, light chromatic aberration, dramatic directional lighting with high contrast, pixel-accurate shading techniques, symbolic interface elements as abstract pixel glyphs, {category.lower()} theme, {clean_title}, crisp pixels sharp edges clean resolution, cinematic nostalgic slightly surreal tone"
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
    
    # Push to GitHub
    image_filepath = TEST_DIR / image_filename
    push_success = push_to_github(filepath, image_filepath, title)
    print()
    
    # Final summary
    print()
    print("=" * 70)
    print("✅ Article Successfully Generated!")
    print("=" * 70)
    print(f"Title: {title}")
    print(f"File: {filepath}")
    print(f"Image: {image_filepath}")
    print(f"Word count: {count_words(body)} words")
    print(f"Reading time: {reading_time} minutes")
    print()
    if push_success:
        print("✅ Successfully pushed to GitHub!")
        print("Next steps:")
        print("1. Review the article and image on GitHub")
        print("2. Deploy your Hexo site")
    else:
        print("Next steps:")
        print("1. Review the article and image")
        print("2. Manually commit and push to GitHub:")
        print(f"   git add {filepath.relative_to(Path.cwd()) if filepath.is_absolute() else filepath}")
        print(f"   git add {image_filepath.relative_to(Path.cwd()) if image_filepath.is_absolute() else image_filepath}")
        print(f'   git commit -m "Add blog post: {title}"')
        print("   git push")
        print("3. Deploy your Hexo site")
    print("=" * 70)


if __name__ == "__main__":
    main()

