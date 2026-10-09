#!/usr/bin/env python3
"""
Notify Google Web Search Indexing API of new or updated Protocol Sentinel articles.
"""

import os
import sys
import argparse
import re
from pathlib import Path

DEFAULT_KEY_PATHS = [
    os.environ.get("GOOGLE_INDEXING_KEY", ""),
    "/Users/cojovi/.hermes/profiles/loki/cmac-projects-05845f52986a.json",
    str(Path.home() / ".hermes/profiles/loki/cmac-projects-05845f52986a.json"),
    str(Path.home() / ".config/google/service_account.json"),
]

def find_key_file():
    for p in DEFAULT_KEY_PATHS:
        if p and os.path.exists(p):
            return p
    return None

def get_latest_articles(posts_dir, limit=1):
    articles = []
    for md_path in Path(posts_dir).glob("*.md"):
        try:
            text = md_path.read_text(encoding="utf-8")
            if not text.startswith("---"):
                continue
            parts = text.split("---", 2)
            if len(parts) < 3:
                continue
            fm = parts[1]
            date_m = re.search(r"^date:\s*([^\n]+)", fm, re.M)
            date_val = date_m.group(1).strip("'\"") if date_m else md_path.stem[:10]
            
            # Protocol Sentinel URLs follow /post/<slug>.html
            slug = md_path.stem
            url = f"https://protocolsentinel.com/post/{slug}.html"
            articles.append((date_val, url))
        except Exception:
            continue

    articles.sort(key=lambda x: x[0], reverse=True)
    return [url for _, url in articles[:limit]]

def notify_google(urls, key_path):
    from google.oauth2 import service_account
    from google.auth.transport.requests import Request
    import requests

    scopes = ["https://www.googleapis.com/auth/indexing"]
    credentials = service_account.Credentials.from_service_account_file(
        key_path, scopes=scopes
    )
    credentials.refresh(Request())

    api_url = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    headers = {
        "Authorization": f"Bearer {credentials.token}",
        "Content-Type": "application/json",
    }

    results = []
    print(f"🚀 Notifying Google Indexing API for {len(urls)} Protocol Sentinel URL(s)...")
    for u in urls:
        payload = {"url": u, "type": "URL_UPDATED"}
        try:
            resp = requests.post(api_url, headers=headers, json=payload, timeout=15)
            if resp.status_code == 200:
                print(f"  ✅ [200 OK] {u}")
                results.append((u, True, resp.text))
            else:
                print(f"  ❌ [{resp.status_code}] {u}: {resp.text}")
                results.append((u, False, resp.text))
        except Exception as e:
            print(f"  ❌ [ERROR] {u}: {e}")
            results.append((u, False, str(e)))

    return results

def main():
    parser = argparse.ArgumentParser(description="Submit URLs to Google Indexing API")
    parser.add_argument("urls", nargs="*", help="Specific URL(s) to index")
    parser.add_argument("--recent", type=int, default=0, help="Index top N recent articles")
    parser.add_argument("--key", default="", help="Path to Google Service Account JSON key")
    args = parser.parse_args()

    key_path = args.key or find_key_file()
    if not key_path:
        print("❌ Error: Google Service Account key file not found.", file=sys.stderr)
        print("Set GOOGLE_INDEXING_KEY env var or place key in ~/.hermes/profiles/loki/", file=sys.stderr)
        sys.exit(1)

    repo_root = Path(__file__).resolve().parent.parent
    posts_dir = repo_root / "blog/source/_posts"

    target_urls = []
    if args.urls:
        target_urls = args.urls
    elif args.recent > 0:
        target_urls = get_latest_articles(posts_dir, limit=args.recent)
    else:
        target_urls = get_latest_articles(posts_dir, limit=1)

    if not target_urls:
        print("⚠️ No target URLs found to index.")
        sys.exit(0)

    results = notify_google(target_urls, key_path)
    all_ok = all(r[1] for r in results)
    sys.exit(0 if all_ok else 1)

if __name__ == "__main__":
    main()
