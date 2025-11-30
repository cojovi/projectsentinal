// Aurora API Generator - Creates /api/posts.json for Aurora theme
'use strict';

const fs = require('fs');
const path = require('path');

hexo.extend.generator.register('aurora-api', function(locals) {
  return {
    path: 'api/posts.json',
    data: function() {
      // This will be called after all generators run
      // We need to read the content.json that was generated
      const publicDir = hexo.public_dir;
      const contentJson = path.join(publicDir, 'content.json');
      
      if (fs.existsSync(contentJson)) {
        const content = fs.readFileSync(contentJson, 'utf8');
        return content;
      }
      return '[]';
    }
  };
});

// Also use filter as backup
hexo.extend.filter.register('after_generate', function() {
  const publicDir = hexo.public_dir;
  const apiDir = path.join(publicDir, 'api');
  const contentJson = path.join(publicDir, 'content.json');
  const apiPostsJson = path.join(apiDir, 'posts.json');
  
  if (fs.existsSync(contentJson)) {
    if (!fs.existsSync(apiDir)) {
      fs.mkdirSync(apiDir, { recursive: true });
    }
    fs.copyFileSync(contentJson, apiPostsJson);
    hexo.log.info('Generated: api/posts.json');
  }
});

