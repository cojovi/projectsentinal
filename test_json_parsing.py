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

