/* global hexo */
// Hexo swallows script-load errors. Register before requiring or initializing anything.
let initialized=false,initializationError;
hexo.extend.filter.register('before_generate',function() {
 if(!initialized)throw initializationError||Error('Authority initialization did not complete');
},-1000);
try {
const fs = require('node:fs');
const path = require('node:path');
const c = require('../authority/contract.cjs');
require('../authority/vendor/aurora/generators')(hexo);
const sourceDir=path.join(hexo.base_dir,'source/_posts');
const sources=fs.readdirSync(sourceDir).filter(f=>f.endsWith('.md')&&!f.startsWith('.')).map(f=>c.readSource(path.join(sourceDir,f)));
const map=c.urlMap(sources);
// All Hexo generators (HTML, index, feed and Aurora APIs) see the same published set.
const originalPosts=hexo.locals.getters.posts;
hexo.locals.set('posts',()=>originalPosts().filter(c.isPublished));
hexo.extend.filter.register('before_post_render', function(data) {
 if(!data.source?.startsWith('_posts/')) return data;
 const key=path.basename(data.source,'.md');const s=sources.find(s=>s.key===key);if(!s) throw Error('No source '+key);
 if(!c.isPublished(s)){data.published=false;return data;}
 data.publication_state=c.publication(s).publication_state;data.withdrawn=c.publication(s).withdrawn;
 if(data.withdrawn){data.feature=false;data.pinned=false;}
 data.slug=key;data.author=c.author(s.data.author);data.categories=[c.pillar(s.data.categories,s.data.title)];
 data.updated=require('moment')(c.date(s.data.updated||s.data.date));
 // Hexo has already parsed an explicit updated field; preserve it without filesystem mtime.
 if(s.data.updated) { const moment=require('moment');data.updated=moment(c.date(s.data.updated)); }
 data.tags=(Array.isArray(data.tags)?data.tags:[data.tags]).filter(Boolean).map(t=>String(t).toLowerCase());
 data.date=require('moment')(c.date(s.data.date));
 data.comments=false;
 return data;
}, 5);
hexo.extend.filter.register('after_post_render', function(data) {
 if(!data.source?.startsWith('_posts/')) return data;
 const key=path.basename(data.source,'.md');const source=sources.find(s=>s.key===key);
 if(!c.isPublished(source))return data;
 const file=path.join(hexo.base_dir,'reviews',key+'.json');const review=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):{};
 data.content=c.normalize(source,data.content,map,review).content;
 return data;
}, 50);
// Keep the existing analytics property; credentials and administration are outside this build.
hexo.extend.filter.register('after_render:html', function(html) {
 return html.replace('</body>',`<script async src="https://www.googletagmanager.com/gtag/js?id=G-4PBBYC5R3L"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-4PBBYC5R3L');</script></body>`);
});
hexo.extend.filter.register('before_generate', async function() {
 // Throw inside the lifecycle: Hexo logs script-load errors and can continue generating.
 require('../authority/quality.cjs').assertPublishable(sources,hexo.base_dir);
 hexo.locals.invalidate();
 for(const post of hexo.model('Post').toArray()) {
  const s=sources.find(s=>s.key===path.basename(post.source,'.md'));
  if(!c.isPublished(post)||(s&&!c.isPublished(s))){post.published=false;await post.setCategories([]);await post.setTags([]);continue;}
  if(!s)continue;
  await post.setCategories([c.pillar(s.data.categories,s.data.title)]);
  const tags=(Array.isArray(s.data.tags)?s.data.tags:[s.data.tags]).filter(Boolean).map(t=>String(t).toLowerCase());
  await post.setTags([...new Set(tags)]);
 }
 hexo.locals.invalidate();
});
 initialized=true;
} catch(error) {
 // Rethrow from the early lifecycle hook so direct Hexo generation cannot continue.
 initializationError=error;
}
