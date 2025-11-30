// Auto-generate API structure for Aurora theme
'use strict';

const fs = require('fs');
const path = require('path');

hexo.on('generateAfter', function() {
  const publicDir = hexo.public_dir;
  const apiDir = path.join(publicDir, 'api');
  
  // Create API directory if it doesn't exist
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }
  
  // Copy content.json to api/posts.json if it exists
  const contentJson = path.join(publicDir, 'content.json');
  const apiPostsJson = path.join(apiDir, 'posts.json');
  
  if (fs.existsSync(contentJson)) {
    fs.copyFileSync(contentJson, apiPostsJson);
    hexo.log.info('Generated: api/posts.json');
  }
});

