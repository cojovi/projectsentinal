const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
const cheerio=require('cheerio');const c=require('./contract.cjs');const assets=require('./assets.cjs');
const root=path.resolve(__dirname,'..');const out=path.join(root,'public');process.chdir(root);
function run(args) {const r=spawnSync(process.execPath,[require.resolve('hexo/bin/hexo'),...args],{encoding:'utf8'});if(r.status||/Plugin load failed|ERROR/.test(r.stdout+r.stderr)){process.stdout.write(r.stdout+r.stderr);throw Error('Hexo failed');}console.log(r.stdout.split('\n').filter(x=>/files generated|Start processing/.test(x)).join('\n'));}
// A clean output is required: obsolete HTML aliases must never shadow redirects.
console.log(`Build runtime: ${process.version} (${process.execPath}); Hexo children use this executable.`);
run(['clean']);
const sources=fs.readdirSync(path.join(root,'source/_posts')).filter(f=>f.endsWith('.md')&&!f.startsWith('.')).map(f=>c.readSource(path.join(root,'source/_posts',f))).filter(c.isPublished);
require('./quality.cjs').assertPublishable(sources,root);
run(['generate']);
const map=c.urlMap(sources);const write=(name,data)=>{const f=path.join(out,name);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,data);};
const read=name=>fs.readFileSync(path.join(out,name),'utf8');
// Emit the source-controlled runtime verbatim after Hexo; renderer/filter behavior must not decide whether these files ship.
for(const source of assets.sourceAssets(root)) write(path.relative(path.join(root,'source'),source),fs.readFileSync(source));
for(const [name,src] of [['lodash.min.js','lodash/lodash.min.js'],['md5.min.js','blueimp-md5/js/md5.min.js']]) write('authority/'+name,fs.readFileSync(require.resolve(src)));
for(const file of fs.readdirSync(path.join(out,'static/js'))) {const f=path.join(out,'static/js',file);fs.writeFileSync(f,fs.readFileSync(f,'utf8').replaceAll('https://unpkg.com/@waline/client@v2/dist/waline.mjs','/authority/comments-disabled.js'));}
const shell=read('index.html').replace('</head>','<script src="/authority/lodash.min.js"></script><script src="/authority/md5.min.js"></script></head>');
const nav=`<nav class="sentinel-nav" aria-label="Publication"><a href="/">Protocol Sentinel</a><a href="/topics">Five pillars</a><a href="/archives">Archive</a><a href="/about">About</a><a href="/editorial-standards">Standards</a><a href="/corrections">Corrections</a><a href="/rss.xml">RSS</a></nav>`;
const footer=`<footer class="sentinel-footer"><a href="/ownership">Ownership</a> · <a href="/contact">Contact</a> · <a href="/ai-media-policy">AI and media</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></footer>`;
function meta(document,item) {
 const $=cheerio.load(document);$('title,link[rel="canonical"],meta[property^="og:"],meta[name="description"],meta[name="robots"],meta[name="keywords"],meta[name^="twitter:"],script[type="application/ld+json"]').remove();
 $('head').append(`<title>${c.esc(item.title)}${item.title==='Protocol Sentinel'?'':' | Protocol Sentinel'}</title><link rel="canonical" href="${c.base+item.path}"><meta name="description" content="${c.esc(item.description)}"><meta name="robots" content="${item.robots||c.robots.indexable}"><meta property="og:title" content="${c.esc(item.title)}"><meta property="og:url" content="${c.base+item.path}"><meta property="og:type" content="${item.schema?.['@type']==='BlogPosting'||item.schema?.['@type']==='NewsArticle'?'article':'website'}"><meta property="og:site_name" content="Protocol Sentinel"><meta property="og:description" content="${c.esc(item.description)}"><meta property="og:image" content="${c.esc(item.schema?.image||c.base+'/brand/og.jpeg')}"><meta name="twitter:card" content="summary_large_image"><link rel="alternate" type="application/rss+xml" title="Protocol Sentinel" href="/rss.xml"><link rel="stylesheet" href="/authority/reader.css"><script defer src="/authority/reader.js"></script>`);
 if(item.schema) $('head').append(`<script id="sentinel-schema" type="application/ld+json">${JSON.stringify(item.schema).replace(/</g,'\\u003c')}</script>`);
 $('noscript').remove();return $.html();
}
function articleDoc(item,content) {
 const $=cheerio.load(meta(shell,item));$('body').prepend(`<main id="sentinel-prerender" class="sentinel-reader">${nav}<article><header><h1>${c.esc(item.title)}</h1>${item.identity?`<p>By <a href="${item.identity.url}">${c.esc(item.identity.name)}</a></p>`:""}</header>${content}</article>${footer}</main>`);return $.html();
}
function pageDoc(item,content) {
 const $=cheerio.load(meta(shell,item));$('#app').remove();$('script[type="module"]').remove();$('body').append(`<main class="sentinel-reader">${nav}<article><h1>${c.esc(item.title)}</h1>${content}</article>${footer}</main>`);return $.html();
}
const records=[];const redirects=[];
for(const entry of map.articles) {
 const s=sources.find(s=>s.key===entry.key);const apiFile=entry.api.slice(1);if(!fs.existsSync(path.join(out,apiFile))) throw Error('Missing Aurora API '+entry.api);
 const api=JSON.parse(read(apiFile));
 const reviewFile=path.join(root,'reviews',s.key+'.json');const review=fs.existsSync(reviewFile)?JSON.parse(fs.readFileSync(reviewFile)):{};
 // Contract metadata is derived from the same rendered article, excluding our existing wrapper.
 const $=cheerio.load(api.content);const body=$('.article-body').html();if(body===null) throw Error('Missing normalized body '+s.key);
 const normalized=c.normalize(s,body,map,review);Object.assign(api,{publication_state:normalized.publication_state,withdrawn:normalized.withdrawn,robots:normalized.robots,article_type:normalized.type,evidence:normalized.evidence,description:normalized.description});api.content=normalized.content;api.permalink=entry.path;api.updated=normalized.updated;api.author=c.author(s.data.author);api.cover=c.localAsset(api.cover);
 write(apiFile,JSON.stringify(api));const item={...entry,...normalized};delete item.content;
 records.push(item);write('post/'+s.key+'/index.html',articleDoc(item,api.content));
 for(const alias of entry.aliases) redirects.push(`${alias} ${entry.path} 301!`);
 // Physical index.html is served with a 200 rewrite; canonical requests never redirect through Pretty URLs.
 // Netlify normalizes trailing slashes before rule matching: slash-only 301s self-loop.
 redirects.push(`${entry.path} ${entry.path}/index.html 200!`);
}
// Rewrite API links, including list/feature/previous/next entries, from the explicit map.
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const f of walk(path.join(out,'api'))) {if(!f.endsWith('.json'))continue;let j=JSON.parse(fs.readFileSync(f));function visit(v){if(typeof v==='string')return v;if(Array.isArray(v))return v.map(visit);if(v&&typeof v==='object'){for(const key in v){if(typeof v[key]==='string'&&map.aliases[v[key]])v[key]=map.aliases[v[key]];else if(['cover','image','og_image','avatar','logo'].includes(key)&&typeof v[key]==='string')v[key]=c.localAsset(v[key]);else if(typeof v[key]==='object')visit(v[key]);}}return v;}j=visit(j);fs.writeFileSync(f,JSON.stringify(j));}
const pages=[];
for(const f of walk(path.join(root,'source')).filter(f=>f.endsWith('.md')&&!f.includes('/_posts/')&&!f.includes('/_drafts/')&&!path.basename(f).startsWith('.'))) {
 const s=c.readSource(f);const relative=path.relative(path.join(root,'source'),f).replace(/\.md$/,'');const route='/'+relative.replace(/\/index$/,'');
 const apiPath='api/pages/'+relative+'.json';if(!fs.existsSync(path.join(out,apiPath)))throw Error('Missing page API '+apiPath);
 const api=JSON.parse(read(apiPath));const item={robots:c.robots.indexable,path:route,title:s.data.title,description:s.data.description||s.data.title,schema:{'@context':'https://schema.org','@type':s.data.identity_type||'WebPage',name:s.data.title,url:c.base+route,...(s.data.identity_type==='Person'?{sameAs:'https://cojovi.com'}:{})}};
 const content=c.rewriteLinks(api.content,map);write(route.slice(1)+'/index.html',pageDoc(item,content));pages.push(item);
 redirects.push(`${route} ${route}/index.html 200!`);redirects.push(`/page/${relative} ${route} 301!`);redirects.push(`/page/${relative.replace(/\/index$/,'')} ${route} 301!`);
 // Remove Aurora's noncanonical custom page output; old routes redirect to the supported route.
 fs.rmSync(path.join(out,'page',relative+'.html'),{force:true});
}
// Ordinary archive discovery is complete with and without JS.
const sorted=records.toSorted((a,b)=>b.published.localeCompare(a.published));
const active=sorted.filter(a=>!a.withdrawn);
const list=items=>`<ul>${items.map(a=>`<li><time datetime="${a.published}">${a.published.slice(0,10)}</time> <a href="${a.path}">${a.withdrawn?'Withdrawn: ':''}${c.esc(a.title)}</a></li>`).join('')}</ul>`;
const home={robots:c.robots.indexable,path:'/',title:'Protocol Sentinel',description:'Signal over noise: AI, platforms, privacy, devices and evidence-aware analysis.'};
let $=cheerio.load(meta(shell,home));$('body').prepend(`<main id="sentinel-discovery" class="sentinel-reader">${nav}<h1>Protocol Sentinel</h1><p>Signal over noise. <a href="/topics">Explore the five pillars</a>. Historical articles carry source-review limits.</p><h2>Latest articles</h2>${list(active)}${footer}</main>`);write('index.html',$.html());
const archive={robots:c.robots.indexable,path:'/archives',title:'Archive',description:'Every published Protocol Sentinel article.'};write('archives/index.html',articleDoc(archive,`<h2>All articles</h2>${list(sorted)}`));redirects.push('/archives /archives/index.html 200!');
for(const p of c.pillars) {const slug=p.toLowerCase().replace(/ & /g,'-').replace(/\s+/g,'-');const route='/topics/'+slug;const item={robots:c.robots.indexable,path:route,title:p,description:'Articles and evidence limits from the '+p+' pillar.'};write(route.slice(1)+'/index.html',pageDoc(item,`<p>Existing articles, with their original claims and current evidence limits preserved.</p>${list(active.filter(a=>a.schema.articleSection===p))}`));pages.push(item);redirects.push(`${route} ${route}/index.html 200!`);}
// Legacy category API slugs stay useful, but canonical discovery is the five pillars.
const legacyCats=new Map();const slugize=require('hexo-util').slugize;
for(const source of sources.filter(s=>!c.publication(s).withdrawn)){
 const raw=Array.isArray(source.data.categories)?source.data.categories:[source.data.categories];
 const chains=raw.some(Array.isArray)?raw.map(x=>Array.isArray(x)?x:[x]):[raw];
 for(const chain of chains){const segments=[];for(const name of chain.filter(Boolean)){segments.push(slugize(String(name)));const slug=segments.join('/');if(!legacyCats.has(slug))legacyCats.set(slug,new Set());legacyCats.get(slug).add(source.key);}}
}
const categoryAliases=[];
for(const [slug,keys]of legacyCats){const file='api/categories/'+slug+'.json';if(!fs.existsSync(path.join(out,file))){write(file,JSON.stringify({name:slug,slug,count:keys.size,postlist:[...keys].map(key=>JSON.parse(read('api/articles/'+key+'.json')))}));categoryAliases.push({api:'/'+file,keys:[...keys]});}}
// Preserve old case-sensitive tag API requests at the host while emitting one normalized tag record.
for(const source of sources)for(const tag of (Array.isArray(source.data.tags)?source.data.tags:[source.data.tags]).filter(Boolean)){const old=slugize(String(tag));const current=slugize(String(tag).toLowerCase());if(old!==current)redirects.push(`/api/tags/${old}.json /api/tags/${current}.json 301!`);}
for(const source of sources){for(const value of [source.data.cover,source.data.image]){const asset=c.localAsset(value);if(asset?.startsWith('/media/'))write(decodeURIComponent(asset.slice(1)),fs.readFileSync(path.join(root,'../test',decodeURIComponent(asset.slice(7)))));}}
// Body illustrations that were localized use the same existing source-controlled asset directory.
for(const file of fs.readdirSync(path.join(root,'../test'))){if(!/\.(png|jpe?g|gif|webp)$/i.test(file))continue;const target='/media/'+encodeURIComponent(file);if(records.some(a=>read(a.api.slice(1)).includes(target)))write(decodeURIComponent(target.slice(1)),fs.readFileSync(path.join(root,'../test',file)));}
write('authority-map.json',JSON.stringify({version:1,robots:c.robots,categoryAliases,articles:records,pages:[home,archive,...pages]},null,2));
const xml=s=>c.esc(s);const xmlHeader='<?xml version="1.0" encoding="UTF-8"?>\n';
write('post-sitemap.xml',xmlHeader+'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+active.map(a=>`<url><loc>${xml(c.base+a.path)}</loc><lastmod>${a.updated}</lastmod></url>`).join('')+'</urlset>');
write('page-sitemap.xml',xmlHeader+'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[home,archive,...pages].map(a=>`<url><loc>${xml(c.base+a.path)}</loc></url>`).join('')+'</urlset>');
write('sitemap.xml',xmlHeader+'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>'+c.base+'/post-sitemap.xml</loc></sitemap><sitemap><loc>'+c.base+'/page-sitemap.xml</loc></sitemap></sitemapindex>');
write('rss.xml',xmlHeader+'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Protocol Sentinel</title><link>'+c.base+'</link><description>Signal over noise. Evidence and limits are disclosed with each article.</description><language>en</language><atom:link href="'+c.base+'/rss.xml" rel="self" type="application/rss+xml"/>'+active.map(a=>`<item><title>${xml(a.title)}</title><link>${xml(c.base+a.path)}</link><guid isPermaLink="true">${xml(c.base+a.path)}</guid><pubDate>${new Date(a.published).toUTCString()}</pubDate><description>${xml(a.description)}</description></item>`).join('')+'</channel></rss>');
write('404.html',pageDoc({robots:c.robots.noindex,path:'/404',title:'Page not found',description:'No article exists at this address.'},'<p>This address does not match a published page. <a href="/archives">Browse the archive</a>.</p>'));
write('_redirects','# Generated exact article aliases. Netlify forwards query strings by default. No SPA catch-all.\n'+[...new Set(redirects)].join('\n')+'\n');
write('_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/authority-map.json\n  Cache-Control: public, max-age=0, must-revalidate\n/api/*\n  Cache-Control: public, max-age=0, must-revalidate\n/post/*\n  Cache-Control: public, max-age=0, must-revalidate\n'+records.filter(a=>a.withdrawn).flatMap(a=>[a.path,a.path+'/',a.path+'/index.html',...a.aliases,a.api]).map(p=>p+'\n  X-Robots-Tag: noindex, follow\n').join(''));
// Remove all stale standalone Hexo post *.html outputs; only exact canonical directory documents remain.
for(const f of walk(path.join(out,'post')))if(f.endsWith('.html')&&!f.endsWith('/index.html'))fs.rmSync(f);
const audit=assets.assertAssets(root);
console.log(`Final asset audit: ${audit.htmlFilesScanned} HTML files, ${audit.uniqueLocalReferences} local references, ${audit.shimImports} comments shim imports; missing count ${audit.missingLocalAssets.length}.`);
console.log(`Authority output: ${records.length} complete articles, ${pages.length} pages, ${map.articles.reduce((n,a)=>n+a.aliases.length,0)} exact article aliases. Publish blog/public.`);
