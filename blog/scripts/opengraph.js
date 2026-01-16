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

  const cleanedUrl = url.replace(/\?raw=1$|\?raw=true$/i, '');
  const githubBlobMatch = cleanedUrl.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/i
  );
  if (githubBlobMatch) {
    const [, owner, repo, path] = githubBlobMatch;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${path}`;
  }

  if (/^https?:\/\//i.test(url)) {
    return cleanedUrl;
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

  const hasMetaProperty = property => new RegExp(`property=["']${property}["']`, 'i').test(html);
  const hasMetaName = name => new RegExp(`name=["']${name}["']`, 'i').test(html);

  const tags = [
    !hasMetaProperty('og:type') ? `<meta property="og:type" content="${pageType}">` : '',
    !hasMetaProperty('og:site_name')
      ? `<meta property="og:site_name" content="${escapeHtml(siteName)}">`
      : '',
    !hasMetaProperty('og:title') ? `<meta property="og:title" content="${title}">` : '',
    description && !hasMetaProperty('og:description')
      ? `<meta property="og:description" content="${description}">`
      : '',
    permalink && !hasMetaProperty('og:url')
      ? `<meta property="og:url" content="${escapeHtml(permalink)}">`
      : '',
    imageUrl && !hasMetaProperty('og:image')
      ? `<meta property="og:image" content="${escapeHtml(imageUrl)}">`
      : '',
    imageUrl && !hasMetaProperty('og:image:secure_url')
      ? `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">`
      : '',
    imageType && !hasMetaProperty('og:image:type')
      ? `<meta property="og:image:type" content="${imageType}">`
      : '',
    imageUrl && !hasMetaProperty('og:image:width')
      ? `<meta property="og:image:width" content="${imageWidth}">`
      : '',
    imageUrl && !hasMetaProperty('og:image:height')
      ? `<meta property="og:image:height" content="${imageHeight}">`
      : '',
    !hasMetaProperty('og:locale') ? '<meta property="og:locale" content="en_US">' : '',
    !hasMetaName('twitter:card')
      ? `<meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}">`
      : '',
    !hasMetaName('twitter:title') ? `<meta name="twitter:title" content="${title}">` : '',
    description && !hasMetaName('twitter:description')
      ? `<meta name="twitter:description" content="${description}">`
      : '',
    imageUrl && !hasMetaName('twitter:image')
      ? `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`
      : ''
  ].filter(Boolean);

  if (tags.length === 0) {
    return html;
  }

  const block = ['<!-- Open Graph / Facebook -->', ...tags].join('\n');
  return html.replace('</head>', `${block}\n</head>`);
});
