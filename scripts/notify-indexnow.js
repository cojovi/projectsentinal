#!/usr/bin/env node
/**
 * Notify IndexNow (Bing, DuckDuckGo, Yandex, Yahoo) of new/updated Protocol Sentinel URLs.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'protocolsentinel.com';
const INDEXNOW_KEY = '77f03d3c7a8573e6c5fc3413efbae282';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const POSTS_DIR = path.join(__dirname, '../blog/source/_posts');

function getLatestArticles(limit = 1) {
  const articles = [];
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR);
  for (const f of files) {
    if (f.endsWith('.md')) {
      const full = path.join(POSTS_DIR, f);
      try {
        const content = fs.readFileSync(full, 'utf-8');
        const match = content.match(/^date:\s*([^\n]+)/m);
        const dateVal = match ? match[1].trim().replace(/['"]/g, '') : f.substring(0, 10);
        const slug = path.basename(f, '.md');
        articles.push({ date: dateVal, url: `https://${HOST}/post/${slug}.html` });
      } catch (e) {
        // ignore
      }
    }
  }
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  return articles.slice(0, limit).map(a => a.url);
}

async function notifyIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.log('⚠️ No URLs to submit to IndexNow.');
    return;
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  console.log(`🌐 Submitting ${urls.length} Protocol Sentinel URL(s) to IndexNow...`);
  try {
    const resp = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (resp.status === 200 || resp.status === 202) {
      console.log(`  ✅ [${resp.status} OK] Submitted to IndexNow successfully.`);
      urls.forEach(u => console.log(`     - ${u}`));
    } else {
      const text = await resp.text();
      console.log(`  ⚠️ [${resp.status}] Response: ${text}`);
    }
  } catch (err) {
    console.error(`  ❌ Error notifying IndexNow: ${err.message}`);
  }
}

const args = process.argv.slice(2);
let targetUrls = [];

if (args.length > 0 && !args[0].startsWith('--')) {
  targetUrls = args;
} else {
  let count = 1;
  const recentIdx = args.indexOf('--recent');
  if (recentIdx !== -1 && args[recentIdx + 1]) {
    count = parseInt(args[recentIdx + 1], 10) || 1;
  }
  targetUrls = getLatestArticles(count);
}

notifyIndexNow(targetUrls);
