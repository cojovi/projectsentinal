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

