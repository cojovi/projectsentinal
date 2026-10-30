#!/usr/bin/env python3
"""Compatibility CLI: ordinary articles are ineligible for the restricted Indexing API.

No credentials are read and no mutation is made. Sitemap discovery does not force
indexing. Submit the sitemap through the owner's verified Search Console property;
use its exact sitemap readback to confirm acceptance, not an article URL_UPDATED.
"""
import argparse
import sys
from pathlib import Path

def get_latest_articles(posts_dir, limit=1):
    """Read the generated URL contract rather than guessing a frontmatter slug."""
    import json
    manifest = Path(posts_dir).parent.parent / "public/authority-map.json"
    if not manifest.exists():
        return []
    items = json.loads(manifest.read_text())["articles"]
    items.sort(key=lambda item: item["published"], reverse=True)
    return ["https://protocolsentinel.com" + item["path"] for item in items[:limit]]

def notify_google(urls, key_path=None):
    raise RuntimeError("Article Indexing API notifications are disabled. Use ordinary sitemap discovery; no credential is read.")

def main():
    parser = argparse.ArgumentParser(description="Disabled article Indexing API; print ordinary sitemap discovery instructions")
    parser.add_argument("urls", nargs="*")
    parser.add_argument("--recent", type=int, default=0)
    parser.add_argument("--key", default="", help="Deprecated; ignored. No credentials are read.")
    parser.parse_args()
    print("DISABLED: ordinary articles must not use indexing.googleapis.com URL_UPDATED.")
    print("Discovery sitemap: https://protocolsentinel.com/sitemap.xml")
    print("Owner action: submit this exact sitemap in the verified Search Console property and read back that exact sitemap entry.")
    print("No submission was made. Sitemap discovery does not force crawling or indexing.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
