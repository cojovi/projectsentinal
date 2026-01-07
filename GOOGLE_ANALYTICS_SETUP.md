# Google Analytics Setup Documentation

## Overview
This document explains how Google Analytics (GA4) is integrated into the Protocol Sentinel blog.

## Implementation Details

### Tracking ID
- **Google Analytics Property ID**: `G-4PBBYC5R3L`
- **Account**: Protocol Sentinel

### Integration Method
Google Analytics is embedded **directly in the Aurora theme template** rather than using Hexo's injection system.

**Location**: `blog/themes/aurora/layout/index.ejs`

### Why Direct Template Integration?

The Aurora theme is a pre-built Single Page Application (SPA) using Vue.js. The theme's injection system (`_config.aurora.yml` → `injects.head_begin`) was not reliably loading the Google Analytics tag because:

1. The Aurora theme uses a compiled Vue.js app with minimal EJS templating
2. The injection hooks are processed after the initial HTML structure
3. Google's crawler and analytics verification needs the tag in the `<head>` before any JavaScript execution

### Implementation Code

The following code is placed at the very beginning of the `<head>` section in `index.ejs`:

```html
<!-- Google tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-4PBBYC5R3L"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4PBBYC5R3L');
</script>
```

### Verification

After implementation, verify Google Analytics is working:

1. **Check Generated HTML**: 
   ```bash
   grep "gtag('config'" blog/public/index.html
   ```
   Should return: `gtag('config', 'G-4PBBYC5R3L');`

2. **Google Analytics Real-Time Reports**:
   - Visit your site
   - Check Google Analytics → Reports → Real-time
   - Should show active users

3. **Google Tag Assistant**:
   - Install Google Tag Assistant Chrome extension
   - Visit your site
   - Verify GA4 tag is firing

### Regenerating the Site

After any changes to the theme template:

```bash
cd blog
hexo clean
hexo generate
```

### Important Notes

1. **Template Modifications**: Any updates to `blog/themes/aurora/layout/index.ejs` require regeneration
2. **Theme Updates**: If you update the Aurora theme, you'll need to re-add the Google Analytics code to the template
3. **Backup**: A backup of the original template exists at `index.ejs.backup`

### Configuration Files

- **Main Config**: `blog/_config.yml` - No GA configuration needed here
- **Theme Config**: `blog/_config.aurora.yml` - Contains a note about GA being in the template
- **Template File**: `blog/themes/aurora/layout/index.ejs` - Contains the actual GA code

### Troubleshooting

**Issue**: Google says "Tag not detected"
- **Solution**: Verify the tag is in the generated HTML files in `blog/public/`
- Check both `index.html` and individual post pages

**Issue**: Changes not appearing
- **Solution**: Run `hexo clean && hexo generate` to force regeneration

**Issue**: Theme update removed GA code
- **Solution**: Re-add the GA code to the beginning of the `<head>` section in `index.ejs`

## Date Implemented
January 7, 2026

## Last Updated
January 7, 2026

