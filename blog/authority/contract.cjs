const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const cheerio = require('cheerio');
const registry = require('./registry.json');
const base = 'https://protocolsentinel.com';
const robots = {indexable:'index, follow, max-image-preview:large', noindex:'noindex, follow'};
const pillars = ['AI & Models','Big Tech & Platforms','Privacy & Power','Devices & Experiments','Signal vs Noise'];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeUrl(value) {
 try {const u = new URL(String(value)); return ['https:','http:'].includes(u.protocol) && !u.username && !u.password ? u.href : null;} catch {return null;}
}
function localAsset(value) {
 if(typeof value!=='string')return value;
 const match=value.match(/^https?:\/\/github\.com\/cojovi\/projectsentinal\/blob\/[^/]+\/(test\/[^?]+)(?:\?.*)?$/i);
 if(match){const relative=decodeURIComponent(match[1]);const file=path.resolve(__dirname,'../..',relative);const allowed=path.resolve(__dirname,'../../test')+path.sep;if(file.startsWith(allowed)&&fs.existsSync(file))return '/media/'+encodeURIComponent(path.basename(file));}
 return value.replace(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\//,'https://raw.githubusercontent.com/$1/$2/').replace(/\?raw=(true|1)$/,'');
}
function assetDimensions(value) {
 let file;
 if(value?.startsWith('/media/'))file=path.resolve(__dirname,'../../test',decodeURIComponent(value.slice(7)));
 else if(value?.startsWith('/'))file=path.resolve(__dirname,'../source',value.slice(1));
 if(file&&fs.existsSync(file)){const b=fs.readFileSync(file);if(b.length>24&&b.toString('ascii',1,4)==='PNG')return {width:b.readUInt32BE(16),height:b.readUInt32BE(20)};}
 return {};
}
function readSource(file) {
 const raw = fs.readFileSync(file,'utf8'); const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\s*\n/);
 if (!m) throw Error('Missing front matter: '+file);
 return {key:path.basename(file,'.md'), source:path.resolve(file), data:yaml.load(m[1]) || {}, body:raw.slice(m[0].length)};
}
function date(value) {const d = new Date(value); if (!value || !Number.isFinite(+d)) throw Error('Explicit valid date required'); return d.toISOString();}
function identity(input) {
 const name = typeof input === 'object' && input ? input.name : input;
 if (name === 'Cody Viveiros') return {...registry.owner, legacy:null};
 if (!name || ['Protocol Sentinel','Protocol Sentinel desk','protocol-sentinel'].includes(name)) return {...registry.desk, legacy:null};
 return {...registry.desk, legacy:String(name)};
}
function author(input) {
 const a=identity(input); return {name:a.name,slug:a.slug,avatar:'/brand/avatar.png',link:a.url,description:a.description,socials:{}};
}
function pillar(categories=[], title='') {
 const values = (Array.isArray(categories)?categories:[categories]).flat(Infinity).filter(Boolean);
 const exact = values.find(v=>pillars.includes(v)); if(exact) return exact;
 const text=values.join(' ').toLowerCase();
 if (/privacy|surveillance|politic|foreign|power|policy|legal|conservative/.test(text)) return pillars[2];
 if (/device|hardware|tinker|gadget|coding|diy/.test(text)) return pillars[3];
 if (/artificial|\bai\b|model|innovation/.test(text)) return pillars[0];
 if (/business|platform|big tech/.test(text)) return pillars[1];
 if (/conspira|media|culture|noise/.test(text)) return pillars[4];
 return /\bai\b|openai|chatgpt|agent|anthropic/i.test(title)?pillars[0]:pillars[4];
}
// Accept source contracts and Hexo models; either draft flag is authoritative.
function isPublished(source) {
 const data=source.data||source;
 return data.draft!==true && data.published!==false && !/(?:^|[\\/])_drafts[\\/]/.test(source.source||'');
}
function urlMap(sources) {
 const seen=new Map(); const articles=sources.filter(isPublished).map(s=>{
  if(!/^[\w-]+$/.test(s.key)) throw Error('Unsafe filename '+s.key);
  const p='/post/'+s.key;
  const aliases=new Set([p+'.html']);
  if (s.data.slug && s.data.slug !== s.key) {aliases.add('/post/'+s.data.slug);aliases.add('/post/'+s.data.slug+'.html');}
  if(s.data.permalink) {const u = new URL(s.data.permalink,base);if(u.origin!==base) throw Error('External permalink'); aliases.add(u.pathname);}
  for(const alias of aliases) {if(!/^\/post\/[\w-]+(?:\.html)?$/.test(alias)) throw Error('Unsafe alias '+alias);}
  return {key:s.key,path:p,api:'/api/articles/'+s.key+'.json',aliases:[...aliases].filter(x=>x!==p)};
 });
 for(const a of articles) for(const name of [a.path,...a.aliases]) {if(seen.has(name)&&seen.get(name)!==a.path) throw Error('Conflicting alias '+name);seen.set(name,a.path);}
 return {articles,aliases:Object.fromEntries(seen)};
}
function rewriteLinks(html, map) {
 const $=cheerio.load(html,{},false);
 $('a[href]').each((_,el)=>{const raw=$(el).attr('href');try{const u=new URL(raw,base);if(u.origin===base && map.aliases[u.pathname]) $(el).attr('href',map.aliases[u.pathname]+u.search+u.hash); else if(!['http:','https:','mailto:'].includes(u.protocol)) $(el).removeAttr('href');}catch{$(el).removeAttr('href');}});
 // Numbered URL lists in historical posts are text nodes: link only explicit URLs, never names.
 function linkify(node) {
  for(const child of [...(node.children||[])]) {
   if(child.type==='text' && /https?:\/\//.test(child.data) && !['a','code','pre','script','style'].includes(node.name)) {
    // Escape all non-link text as well before reparsing.
    const pieces=child.data.split(/(https?:\/\/[^\s<>"\[\]]+)/g).map((s,i)=>i%2?s.replace(/.*/,()=>{const trail=s.match(/[.,;:)]+$/)?.[0]||'';const u=s.slice(0,s.length-trail.length);return safeUrl(u)?`<a href="${esc(u)}" rel="noopener noreferrer">${esc(u)}</a>${esc(trail)}`:esc(s);}):esc(s));
    $(child).replaceWith(pieces.join(''));
   } else if(child.type!=='text' && !['a','code','pre','script','style'].includes(child.name)) linkify(child);
  }
 }
 linkify($.root()[0]);
 $('h1').each((_,el)=>{el.name='h2';el.tagName='h2';});
 $('a[target="_blank"]').attr('rel','noopener noreferrer');
 $('img').each((_,el)=>{const image=$(el);image.attr('src',localAsset(image.attr('src')));const dim=assetDimensions(image.attr('src'));if(dim.width)image.attr('width',dim.width).attr('height',dim.height);if(!image.attr('alt')) image.attr('alt','Editorial illustration; see image credit.');image.attr('loading',image.attr('fetchpriority')==='high'?'eager':'lazy').attr('decoding','async');});
 return $.html();
}
function evidence(s, html, review={}) {
 const $=cheerio.load(html);const urls=new Set();
 for(const item of [...(Array.isArray(s.data.sources)?s.data.sources:[]),...(review.sources||[])]) {const u=safeUrl(typeof item==='string'?item:item.url);if(u) urls.add(u);}
 $('a[href]').each((_,el)=>{const u=safeUrl($(el).attr('href'));if(u && new URL(u).origin!==base && !publication(s).withdrawn) urls.add(u);});
 if(review.source_sha256 && review.source_sha256!==require('node:crypto').createHash('sha256').update(s.body.trim()).digest('hex'))throw Error('Stale review body hash: '+s.key);
 const status=review.status || s.data.evidence_status || 'legacy-source-review-pending';
 const cutoff=review.reporting_cutoff || s.data.reporting_cutoff;
 const unknowns=review.unknowns || s.data.unknowns || ['Supporting links have not been independently rechecked under the current evidence contract. Historical claims remain subject to source review.'];
 if(review.reviewed === true || s.data.reviewed === true) throw Error('Unsupported reviewed flag: '+s.key);
 if(!['legacy-source-review-pending','source-review-pending','documented'].includes(status)) throw Error('Unsupported evidence status: '+s.key);
 if(status==='documented' && ((!urls.size && !publication(s).withdrawn) || !cutoff || !review.claims?.length || !review.source_sha256)) throw Error('Documented record needs sources, cutoff and claim ledger: '+s.key);
 return {status,scope:review.scope||null,checked_at:review.checked_at?date(review.checked_at):null,cutoff:cutoff?date(cutoff):null,unknowns:Array.isArray(unknowns)?unknowns:[unknowns],sources:[...urls]};
}
function publication(s) {
 const state=s.data.publication_state||'published';
 if(!['published','withdrawn'].includes(state))throw Error('Unknown publication state: '+s.key);
 return {publication_state:state,withdrawn:state==='withdrawn',robots:state==='withdrawn'?robots.noindex:robots.indexable};
}
function normalize(s, html, map, review={}) {
 if(!isPublished(s))throw Error('Cannot normalize unpublished article: '+s.key);
 const state=publication(s);
 const a=identity(s.data.author);const published=date(s.data.date);const updated=date(s.data.updated||s.data.date);
 if(updated<published) throw Error('Updated precedes publication: '+s.key);
 const type=(review.article_type||s.data.article_type||'analysis').toLowerCase();if(!['analysis','news','explainer','opinion','asset-brief','correction'].includes(type)) throw Error('Unknown article type '+s.key);
 const body=rewriteLinks(html,map);const e=evidence(s,body,review);const credit=s.data.hero_credit||s.data.image_credit||'Legacy image; provenance and production method unverified. Source review pending; do not treat this image as event evidence.';
 const cover=state.withdrawn?null:localAsset(s.data.cover||s.data.image);const dimensions=assetDimensions(cover);
 const safeCover=cover && (cover.startsWith('/') && !cover.startsWith('//') || safeUrl(cover)) ? cover : null;
 const corrections=review.corrections||s.data.corrections||[];
 const content=`<section class="sentinel-contract" data-key="${esc(s.key)}">${state.withdrawn?'<p class="withdrawal-status" role="note"><strong>Withdrawn — correction record</strong>. This URL preserves the public record.</p>':''}<p class="article-type">${esc(type)} · ${esc(pillar(s.data.categories,s.data.title))}</p>${a.legacy?`<p class="attribution">Historical attribution: ${esc(a.legacy)}. This legacy byline is preserved as a record; identity, qualifications and human review are unverified. Publication responsibility: <a href="${a.url}">${esc(a.name)}</a>.</p>`:''}<p class="article-dates">Published <time datetime="${published}">${published.slice(0,10)}</time>${updated!==published?` · Updated <time datetime="${updated}">${updated.slice(0,10)}</time>`:''}</p><aside class="evidence-limits" aria-label="Evidence and Limits"><h2>Evidence and Limits</h2><p>Status: <strong>${esc(e.status==='documented'?'documented source checks (limited scope)':e.status.replaceAll('-',' '))}</strong>. Reporting cutoff: ${e.cutoff?esc(e.cutoff):'not recorded; publication date is not a verification date'}.</p>${e.scope?`<p>${esc(e.scope)}${e.checked_at?` Check recorded ${esc(e.checked_at)}.`:''}</p>`:''}<p>AI-assisted research and drafting may be present. A source link is not a verification badge; multiple links to one underlying account are not independent corroboration.</p><ul>${e.unknowns.map(u=>`<li>${esc(u)}</li>`).join('')}</ul><h3>Supporting links recorded in this article</h3>${e.sources.length?`<ol class="source-list">${e.sources.map(u=>`<li><a href="${esc(u)}" rel="noopener noreferrer">${esc(u)}</a></li>`).join('')}</ol>`:(state.withdrawn?'<p>No supporting source substantiates the withdrawn reconstruction.</p>':'<p>No usable source URLs recorded. Legacy article: source review pending.</p>')}</aside>${safeCover?`<figure class="sentinel-hero"><img src="${esc(safeCover)}" alt="${esc(s.data.image_alt||'Editorial image for '+s.data.title)}" decoding="async" loading="eager" fetchpriority="high"${dimensions.width?` width="${dimensions.width}" height="${dimensions.height}"`:''}><figcaption>${esc(credit)} <a href="/ai-media-policy">Illustration policy</a></figcaption></figure>`:`<p class="image-credit">Image credit: ${esc(credit)}</p>`}<div class="article-body">${body}</div><section class="corrections"><h2>Corrections and record</h2>${corrections.length?`<ul>${corrections.map(c=>`<li>${esc(typeof c==='string'?c:[c.date,c.description,c.source].filter(Boolean).join(' — '))}</li>`).join('')}</ul>`:'<p>No correction entry recorded. This does not certify the historical claims.</p>'}<a href="/corrections">Report an error or review the corrections policy</a></section>${state.withdrawn?'':`<nav class="next-read" aria-label="Keep reading"><h2>Keep the signal</h2><p><a href="/topics/ai-agents-tests">Next read: AI agents and evaluation explainers</a> · <a href="/topics/privacy-platform-control">Privacy and platform control</a></p><p><a href="/rss.xml">Follow the RSS feed</a> for published articles. No newsletter signup or delivery promise.</p></nav>`}</section>`;
 const canonical=base+'/post/'+s.key;const schema={'@context':'https://schema.org','@type':type==='news'?'NewsArticle':'BlogPosting',headline:s.data.title,url:canonical,mainEntityOfPage:canonical,datePublished:published,dateModified:updated,...(state.withdrawn?{creativeWorkStatus:'Withdrawn'}:{}),author:{'@type':a.type,name:a.name,url:base+a.url},publisher:{'@type':'Organization',name:'Protocol Sentinel',url:base,logo:{'@type':'ImageObject',url:base+'/brand/logo.png'}},articleSection:pillar(s.data.categories,s.data.title),description:s.data.description||s.data.title,...(safeCover?{image:new URL(safeCover,base).href}:{})};
 return {...state,content,schema,title:s.data.title,description:s.data.description||s.data.title,published,updated,identity:a,evidence:e,credit,type};
}
module.exports={isPublished,robots,publication,localAsset,assetDimensions,base,registry,pillars,esc,safeUrl,readSource,date,identity,author,pillar,urlMap,rewriteLinks,evidence,normalize};
