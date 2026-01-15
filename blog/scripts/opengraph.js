/* global hexo */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, '');
}

function normalizeUrl(url, siteUrl) {
  if (!url) {
    return '';
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const base = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
  const path = url.replace(/^\/+/, '');
  return `${base}${path}`;
}

function extractFirstImage(html) {
  if (!html) {
    return '';
  }

  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
}

function detectImageType(url) {
  const lower = (url || '').toLowerCase();

  if (lower.endsWith('.png')) {
    return 'image/png';
  }

  if (lower.endsWith('.gif')) {
    return 'image/gif';
  }

  if (lower.endsWith('.webp')) {
    return 'image/webp';
  }

  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
    return 'image/jpeg';
  }

  return '';
}

hexo.extend.filter.register('after_render:html', function(html, data) {
  if (!html || !data) {
    return html;
  }

  if (!html.includes('</head>')) {
    return html;
  }

  if (/property=["']og:title["']/i.test(html)) {
    return html;
  }

  const page = data.page || data;
  const themeConfig = this.theme.config || {};
  const siteMeta = themeConfig.site_meta || {};
  const siteName = siteMeta.title || this.config.title || 'Protocol Sentinel';
  const siteUrl = this.config.url || '';

  const title = escapeHtml(page.title || siteName);
  const descriptionSource = page.description || page.excerpt || page.summary || siteMeta.description || '';
  const description = escapeHtml(stripHtml(descriptionSource).trim());
  const permalink = page.permalink || normalizeUrl(page.path || '', siteUrl);
  const pageType = page.layout === 'post' ? 'article' : 'website';
  const coverImage
    = page.cover || page.banner || page.thumbnail || extractFirstImage(html) || siteMeta.og_image || '';
  const imageUrl = normalizeUrl(coverImage, siteUrl);
  const imageType = detectImageType(imageUrl);
  const imageWidth = page.og_image_width || siteMeta.og_image_width || 1200;
  const imageHeight = page.og_image_height || siteMeta.og_image_height || 630;

  const tags = [
    '<!-- Open Graph / Facebook -->',
    `<meta property="og:type" content="${pageType}">`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}">`,
    `<meta property="og:title" content="${title}">`,
    description ? `<meta property="og:description" content="${description}">` : '',
    permalink ? `<meta property="og:url" content="${escapeHtml(permalink)}">` : '',
    imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}">` : '',
    imageUrl ? `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">` : '',
    imageType ? `<meta property="og:image:type" content="${imageType}">` : '',
    imageUrl ? `<meta property="og:image:width" content="${imageWidth}">` : '',
    imageUrl ? `<meta property="og:image:height" content="${imageHeight}">` : '',
    '<meta property="og:locale" content="en_US">',
    '<!-- Twitter / X Card -->',
    `<meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}">`,
    `<meta name="twitter:title" content="${title}">`,
    description ? `<meta name="twitter:description" content="${description}">` : '',
    imageUrl ? `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">` : ''
  ]
    .filter(Boolean)
    .join('\n');

  return html.replace('</head>', `${tags}\n</head>`);
});
